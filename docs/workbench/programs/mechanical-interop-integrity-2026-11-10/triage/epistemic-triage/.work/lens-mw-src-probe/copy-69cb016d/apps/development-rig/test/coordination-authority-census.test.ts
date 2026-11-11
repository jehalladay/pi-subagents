import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// MW-R7 EAT-R103 (bead MechanicalWorkflows-j1a9b): coordination output carries and confers no
// authority. R103(a) (advisory override/force/admit/pass is a refusal) stays pinned by
// packages/coordination/test/trust-zones.test.ts and the INTENT_AUTHORITY_EXCEEDED refusal by
// coordination-reconcile-host.test.ts; this file pins the two schema-and-structure legs those
// tests leave open.
//   1. authorization-token census over the two committed coordination schemas: no property name
//      or enum value names a grant, credential, capability, token, secret or authorize-kind
//      carrier, and the only authority enums are exactly the pinned ones;
//   2. effect-surface non-consumption census: no module that reaches a Beads/Forge/Furnace/Git
//      effect, directly or through relative imports, names the coordination resolver, its
//      Resolution/ResolverInput types or the pinned reconcile host.
// Both scanners walk structure (the JSON tree, multi-line-safe import statements), never single-line
// regexes over raw text. Mutant fixtures are labelled fixture evidence and never count as native PASS.

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(here, "..", "..", "..");
const rigSrc = join(here, "..", "src");
const readJson = (path: string): any => JSON.parse(readFileSync(join(repoRoot, path), "utf8"));
const RESOLUTION = "contracts/schemas/coordination-resolution.v1.schema.json";
const RESOLVER_INPUT = "contracts/schemas/coordination-resolver-input.v1.schema.json";

// ---- leg 1: authorization-token census over a JSON schema tree -------------------------------

const AUTHORIZATION_TOKEN = /(grant|credential|capabilit|token|secret|authoriz|permission|privilege|bearer|password|apikey|escalat)/i;
const AUTHORITY_ENUMS: Readonly<Record<string, Readonly<Record<string, readonly string[]>>>> = {
  [RESOLUTION]: {
    "/$defs/intent/properties/authority": ["propose-only", "authorized-effect"],
    "/$defs/admittedIntent/properties/authority": ["propose-only"],
  },
  [RESOLVER_INPUT]: {
    "/$defs/intent/properties/authority": ["propose-only", "authorized-effect"],
  },
};

/** Every violation of the authority-free schema laws, as `path: reason` lines (empty when clean). */
function authorityCensus(schemaName: string, schema: unknown): string[] {
  const violations: string[] = [];
  const authorityEnums = new Map<string, unknown>();
  const walk = (node: unknown, path: string): void => {
    if (Array.isArray(node)) { node.forEach((child, index) => walk(child, `${path}/${index}`)); return; }
    if (node === null || typeof node !== "object") return;
    const object = node as Record<string, unknown>;
    for (const [key, child] of Object.entries(object)) {
      const childPath = `${path}/${key}`;
      if (key === "properties" && child !== null && typeof child === "object" && !Array.isArray(child)) {
        for (const [name, definition] of Object.entries(child as Record<string, unknown>)) {
          if (AUTHORIZATION_TOKEN.test(name)) violations.push(`${childPath}/${name}: authorization-bearing property name`);
          if (name === "authority" && definition !== null && typeof definition === "object") authorityEnums.set(`${childPath}/${name}`, (definition as Record<string, unknown>).enum);
        }
      }
      if (key === "$defs" && child !== null && typeof child === "object") {
        for (const name of Object.keys(child as Record<string, unknown>)) if (AUTHORIZATION_TOKEN.test(name)) violations.push(`${childPath}/${name}: authorization-bearing definition name`);
      }
      if (key === "required" && Array.isArray(child)) {
        for (const name of child) if (typeof name === "string" && AUTHORIZATION_TOKEN.test(name)) violations.push(`${childPath}: authorization-bearing required name ${name}`);
      }
      if (key === "enum" && Array.isArray(child)) {
        for (const value of child) {
          if (typeof value === "string" && AUTHORIZATION_TOKEN.test(value) && !(path.endsWith("/properties/authority") && value === "authorized-effect")) violations.push(`${childPath}: authorization-bearing enum value ${value}`);
        }
      }
      walk(child, childPath);
    }
  };
  walk(schema, "");
  const pinned = AUTHORITY_ENUMS[schemaName] ?? {};
  for (const [path, expected] of Object.entries(pinned)) {
    if (JSON.stringify(authorityEnums.get(path)) !== JSON.stringify(expected)) violations.push(`${path}: authority enum is ${JSON.stringify(authorityEnums.get(path))}, pinned ${JSON.stringify(expected)}`);
  }
  for (const path of authorityEnums.keys()) if (!(path in pinned)) violations.push(`${path}: unpinned authority carrier`);
  return violations.sort();
}

test("authorization-token census: both committed coordination schemas carry no grant, credential, capability or authorize-kind property and pin their authority enums", () => {
  for (const name of [RESOLUTION, RESOLVER_INPUT]) assert.deepEqual(authorityCensus(name, readJson(name)), [], name);
});
test("authorization-token census is not vacuous: each seeded violation is detected on a copy of the committed schema (fixture mutants, not native evidence)", () => {
  const withProperty = readJson(RESOLUTION);
  withProperty.$defs.admittedIntent.properties.authorize = { type: "boolean" };
  assert.deepEqual(authorityCensus(RESOLUTION, withProperty), ["/$defs/admittedIntent/properties/authorize: authorization-bearing property name"]);

  const widened = readJson(RESOLUTION);
  widened.$defs.admittedIntent.properties.authority = { enum: ["propose-only", "authorized-effect"] };
  assert.deepEqual(authorityCensus(RESOLUTION, widened), [
    "/$defs/admittedIntent/properties/authority: authority enum is [\"propose-only\",\"authorized-effect\"], pinned [\"propose-only\"]",
  ]);

  const credential = readJson(RESOLVER_INPUT);
  credential.properties.credentials = { type: "string" };
  credential.$defs.intent.properties.authority.enum.push("granted");
  assert.deepEqual(authorityCensus(RESOLVER_INPUT, credential), [
    "/$defs/intent/properties/authority/enum: authorization-bearing enum value granted",
    "/$defs/intent/properties/authority: authority enum is [\"propose-only\",\"authorized-effect\",\"granted\"], pinned [\"propose-only\",\"authorized-effect\"]",
    "/properties/credentials: authorization-bearing property name",
  ]);

  const smuggled = readJson(RESOLUTION);
  smuggled.$defs.intent.properties.grant = { type: "string" };
  smuggled.properties.rejected.items.properties.code.enum.push("INTENT_TOKEN_ISSUED");
  smuggled.$defs.sessionToken = { type: "string" };
  const found = authorityCensus(RESOLUTION, smuggled);
  assert.equal(found.length, 3);
  assert.ok(found.some(line => line.includes("/$defs/intent/properties/grant")));
  assert.ok(found.some(line => line.includes("INTENT_TOKEN_ISSUED")));
  assert.ok(found.some(line => line.includes("/$defs/sessionToken")));

  const unpinned = readJson(RESOLUTION);
  unpinned.properties.verdict = { type: "object", properties: { authority: { enum: ["propose-only"] } } };
  assert.deepEqual(authorityCensus(RESOLUTION, unpinned), ["/properties/verdict/properties/authority: unpinned authority carrier"]);
});

// ---- leg 2: effect-surface non-consumption census --------------------------------------------

const EFFECT_MODULES = ["beads-claim", "beads-host", "furnace-gate", "furnace-process-executor", "git-source-publication", "live-gate"] as const;
const COORDINATION_PACKAGE = "@mechanical/workflows-coordination";
/** Names of the coordination package an effect module may import (policy-neutral keys and types only). */
const PERMITTED_COORDINATION_NAMES: Readonly<Record<string, readonly string[]>> = {
  "git-source-publication": ["Basis", "NativePublicationDecision", "PublicationCandidate", "SourcePublicationPort", "publicationSemanticKey"],
};
/**
 * Dynamic imports whose specifier is not a literal cannot be censused by name; they are pinned per module
 * in the effect closure. Each is a host-SDK loader (Forge connection, Claude agent SDK) and a new opaque
 * loader there needs a conscious pin change rather than a silent pass.
 */
const PERMITTED_OPAQUE_DYNAMIC_IMPORTS: Readonly<Record<string, number>> = { "claude-implement": 1, "claude-review": 1, "live-gate": 1 };
const CONSUMPTION_IDENTIFIER = /\b(Resolution|ResolverInput|Rejection|RejectionCode|Conflict|reconcile|invokePinnedReconcile|PinnedReconcileOptions|admittedIntent|AdmittedIntent)\b/;

/** Drops comments while keeping string literals, so commented-out imports are not edges. */
function stripComments(source: string): string {
  let out = ""; let i = 0;
  while (i < source.length) {
    const c = source[i]!; const n = source[i + 1];
    if (c === "/" && n === "/") { while (i < source.length && source[i] !== "\n") i++; continue; }
    if (c === "/" && n === "*") { const end = source.indexOf("*/", i + 2); i = end < 0 ? source.length : end + 2; out += " "; continue; }
    if (c === "\"" || c === "'" || c === "`") {
      const quote = c; out += c; i++;
      while (i < source.length && source[i] !== quote) { if (source[i] === "\\") { out += source[i]!; i++; } out += source[i] ?? ""; i++; }
      out += quote; i++; continue;
    }
    out += c; i++;
  }
  return out;
}

interface ImportEdge { readonly specifier: string; readonly names: readonly string[]; readonly namespace: boolean }
interface SourceCensus { readonly edges: ImportEdge[]; readonly opaqueDynamicImports: number }

/** Multi-line-safe census of static, re-export, dynamic, require and import-type edges of a source text. */
function importCensus(raw: string): SourceCensus {
  const source = stripComments(raw);
  const edges: ImportEdge[] = [];
  const specifierNames = (clause: string): { names: string[]; namespace: boolean } => {
    const names: string[] = []; let namespace = /\*\s*(as\s+\w+)?/.test(clause);
    const braces = clause.match(/\{([\s\S]*?)\}/);
    if (braces) for (const part of braces[1]!.split(",")) { const name = part.replace(/^\s*type\s+/, "").trim().split(/\s+as\s+/)[0]!.trim(); if (name) names.push(name); }
    const head = clause.replace(/\{[\s\S]*?\}/, "").replace(/\*\s*(as\s+\w+)?/, "").replace(/^\s*type\s+/, "").replace(/,/g, " ").trim();
    if (head) names.push("default");
    return { names, namespace };
  };
  for (const m of source.matchAll(/\b(?:import|export)\s+(?!\()([^"'`;]*?)\s*\bfrom\s*["'`]([^"'`]+)["'`]/g)) edges.push({ specifier: m[2]!, ...specifierNames(m[1]!) });
  for (const m of source.matchAll(/\bimport\s*["'`]([^"'`]+)["'`]/g)) edges.push({ specifier: m[1]!, names: [], namespace: false });
  for (const m of source.matchAll(/\bimport\s*\(\s*["'`]([^"'`]+)["'`]\s*\)/g)) edges.push({ specifier: m[1]!, names: [], namespace: true });
  for (const m of source.matchAll(/\brequire\s*\(\s*["'`]([^"'`]+)["'`]\s*\)/g)) edges.push({ specifier: m[1]!, names: [], namespace: true });
  const literalDynamic = [...source.matchAll(/\bimport\s*\(\s*["'`]/g)].length;
  const allDynamic = [...source.matchAll(/\bimport\s*\(/g)].length;
  return { edges, opaqueDynamicImports: allDynamic - literalDynamic };
}

const relativeModule = (specifier: string): string | undefined => (specifier.startsWith(".") ? specifier.replace(/^\.\//, "").replace(/\.js$/, "") : undefined);

/** Violations of the non-consumption law for one module's source text. */
function consumptionViolations(module: string, source: string): string[] {
  const census = importCensus(source); const violations: string[] = [];
  const permitted = PERMITTED_COORDINATION_NAMES[module] ?? [];
  for (const edge of census.edges) {
    if (edge.specifier === COORDINATION_PACKAGE || edge.specifier.startsWith(COORDINATION_PACKAGE + "/")) {
      if (edge.namespace) violations.push(`${module}: namespace or dynamic import of ${edge.specifier}`);
      for (const name of edge.names) if (!permitted.includes(name)) violations.push(`${module}: imports ${name} from ${edge.specifier}`);
    }
    const local = relativeModule(edge.specifier);
    if (local !== undefined && /(^|\/)coordination[\w-]*$/.test(local)) violations.push(`${module}: imports the coordination host module ${local}`);
  }
  if (census.opaqueDynamicImports !== (PERMITTED_OPAQUE_DYNAMIC_IMPORTS[module] ?? 0)) violations.push(`${module}: ${census.opaqueDynamicImports} opaque dynamic imports, pinned ${PERMITTED_OPAQUE_DYNAMIC_IMPORTS[module] ?? 0}`);
  const code = stripComments(source);
  const identifier = code.replace(/(["'`])(?:\\.|(?!\1)[^\\])*\1/g, "\"\"").match(CONSUMPTION_IDENTIFIER);
  if (identifier) violations.push(`${module}: names ${identifier[1]}`);
  return violations;
}

/** The relative-import closure of the effect modules, reading real sources from src. */
function effectClosure(read: (module: string) => string): string[] {
  const seen = new Set<string>(); const queue: string[] = [...EFFECT_MODULES];
  while (queue.length > 0) {
    const module = queue.shift()!;
    if (seen.has(module)) continue;
    seen.add(module);
    for (const edge of importCensus(read(module)).edges) { const local = relativeModule(edge.specifier); if (local !== undefined) queue.push(local); }
  }
  return [...seen].sort();
}
const readSrc = (module: string): string => readFileSync(join(rigSrc, module + ".ts"), "utf8");

test("effect-surface census: no Beads, Forge, Furnace or Git effect module (nor anything they import) consumes coordination output as authorization", () => {
  const closure = effectClosure(readSrc);
  for (const module of EFFECT_MODULES) assert.ok(closure.includes(module), `${module} is in the census closure`);
  assert.equal(closure.includes("coordination-host"), false, "the pinned reconcile host is not reachable from an effect module");
  for (const module of closure) assert.deepEqual(consumptionViolations(module, readSrc(module)), [], module);
});
test("effect-surface census: the only coordination imports reachable from an effect module are the pinned publication-key names", () => {
  const closure = effectClosure(readSrc);
  const imported = closure.flatMap(module => {
    const names = importCensus(readSrc(module)).edges.filter(edge => edge.specifier === COORDINATION_PACKAGE).flatMap(edge => edge.names);
    return names.length === 0 ? [] : [`${module}: ${[...names].sort().join(",")}`];
  });
  assert.deepEqual(imported, ["git-source-publication: Basis,NativePublicationDecision,PublicationCandidate,SourcePublicationPort,publicationSemanticKey"]);
});
test("effect-surface census is not vacuous: seeded consumers are detected, multi-line and dynamic forms included (fixture mutants, not native evidence)", () => {
  const multiLine = "import {\n  reconcile,\n  type Resolution,\n} from \"@mechanical/workflows-coordination\";\nconst x = 1;";
  assert.deepEqual(consumptionViolations("beads-claim", multiLine), [
    "beads-claim: imports reconcile from @mechanical/workflows-coordination",
    "beads-claim: imports Resolution from @mechanical/workflows-coordination",
    "beads-claim: names reconcile",
  ]);
  assert.deepEqual(consumptionViolations("live-gate", "import { invokePinnedReconcile } from \"./coordination-host.js\";\nexport const z = 1;").slice(0, 1), ["live-gate: imports the coordination host module coordination-host"]);
  assert.deepEqual(consumptionViolations("furnace-gate", "const m = await import(\"@mechanical/workflows-coordination\");\n"), ["furnace-gate: namespace or dynamic import of @mechanical/workflows-coordination"]);
  assert.deepEqual(consumptionViolations("furnace-gate", "export * from \"@mechanical/workflows-coordination\";"), ["furnace-gate: namespace or dynamic import of @mechanical/workflows-coordination"]);
  assert.deepEqual(consumptionViolations("beads-host", "const m = await import(name);"), ["beads-host: 1 opaque dynamic imports, pinned 0"]);
  assert.deepEqual(consumptionViolations("git-source-publication", "import {publicationSemanticKey} from \"@mechanical/workflows-coordination\";\nimport {reconcile} from \"@mechanical/workflows-coordination\";"), [
    "git-source-publication: imports reconcile from @mechanical/workflows-coordination",
    "git-source-publication: names reconcile",
  ]);
  assert.deepEqual(consumptionViolations("beads-claim", "// import { reconcile } from \"@mechanical/workflows-coordination\";\n/* Resolution */ const note = \"Resolution\";"), [], "comments and string text are not consumption");
  const reach = effectClosure(module => (module === "live-gate" ? "import \"./relay.js\";" : module === "relay" ? "import \"./coordination-host.js\";" : ""));
  assert.ok(reach.includes("coordination-host"), "a transitive edge into the coordination host is reachable in the closure");
});
