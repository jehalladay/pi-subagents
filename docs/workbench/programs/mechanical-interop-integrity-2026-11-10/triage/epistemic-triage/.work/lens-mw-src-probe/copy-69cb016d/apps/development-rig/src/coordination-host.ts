/**
 * Read-only host for the one pure coordination function, `reconcile` (PIWB-MW6-R001).
 *
 * It admits exactly the committed descriptor contracts/entrypoints/coordination-reconcile.v1.json: zero application
 * callbacks, the coordination package, the `reconcile` export and the two published schemas. It verifies the pinned
 * artifact digest, validates the serialized input and the returned Resolution against those published schema files,
 * and returns the Resolution as data. It holds no service and no path to any tracker, build or process authority:
 * an admitted intent is admissibility, never an authorized effect, and this module never applies one.
 */
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { Resolution, ResolverInput } from "@mechanical/workflows-coordination";
import { closedDescriptor, digestFile, SCHEMA, type EntrypointDescriptor } from "./entrypoint-host.js";

export interface PinnedReconcileOptions {
  readonly artifactPath: string;
  readonly artifactDigest: string;
  readonly descriptor: EntrypointDescriptor;
  readonly entrypointId: string;
  readonly contractVersion: string;
  /** Directory holding the published schema files the descriptor names (contracts/schemas). */
  readonly schemaDirectory: string;
  /** Host-owned loader: only load the checked artifact; the loaded function receives data and nothing else. */
  readonly load: () => Promise<{ readonly reconcile: (input: ResolverInput) => unknown }>;
}
const NAME = "mechanical.coordination.reconcile.v1";
const PACKAGE = "@mechanical/workflows-coordination";
const INPUT_SCHEMA = "coordination-resolver-input.v1.schema.json";
const OUTPUT_SCHEMA = "coordination-resolution.v1.schema.json";

type Json = Record<string, unknown>;
const object = (value: unknown): Json | null => value !== null && typeof value === "object" && !Array.isArray(value) ? value as Json : null;
const ANNOTATIONS = new Set(["$schema", "$id", "title", "description", "$defs"]);
const KEYWORDS = new Set(["type", "properties", "required", "additionalProperties", "items", "minLength", "minimum", "enum", "$ref"]);

/** Fail closed: a schema keyword this subset validator does not implement can never silently pass an input. */
function supported(schema: unknown, root: Json, path: string): string | null {
  const s = object(schema);
  if (!s) return path + " is not a schema object";
  for (const key of Object.keys(s)) if (!KEYWORDS.has(key) && !(path === "#" && ANNOTATIONS.has(key))) return "unsupported schema keyword " + key + " at " + path;
  const ref = s["$ref"];
  if (ref !== undefined) {
    const name = typeof ref === "string" ? /^#\/\$defs\/([A-Za-z0-9]+)$/.exec(ref)?.[1] : undefined;
    if (name === undefined || !object(root["$defs"]) || !object(object(root["$defs"])![name])) return "unresolvable $ref at " + path;
  }
  for (const [key, sub] of Object.entries(object(s["properties"]) ?? {})) { const bad = supported(sub, root, path + "/" + key); if (bad) return bad; }
  if (s["items"] !== undefined) { const bad = supported(s["items"], root, path + "/*"); if (bad) return bad; }
  if (path === "#") for (const [key, sub] of Object.entries(object(s["$defs"]) ?? {})) { const bad = supported(sub, root, "#/$defs/" + key); if (bad) return bad; }
  return null;
}
function check(schema: Json, root: Json, value: unknown, path: string, errors: string[]): void {
  const ref = schema["$ref"];
  if (typeof ref === "string") return check(object(object(root["$defs"])![ref.slice("#/$defs/".length)])!, root, value, path, errors);
  const type = schema["type"];
  const actual = Array.isArray(value) ? "array" : value === null ? "null" : typeof value;
  if (type !== undefined && actual !== type) return void errors.push(path + " must be " + String(type));
  if (type === "number" && !Number.isFinite(value)) return void errors.push(path + " must be a finite number");
  if (typeof value === "number" && typeof schema["minimum"] === "number" && value < schema["minimum"]) errors.push(path + " is below " + String(schema["minimum"]));
  if (typeof value === "string" && typeof schema["minLength"] === "number" && value.length < schema["minLength"]) errors.push(path + " is shorter than " + String(schema["minLength"]));
  if (Array.isArray(schema["enum"]) && !schema["enum"].includes(value)) errors.push(path + " is outside the allowed values");
  if (Array.isArray(value) && object(schema["items"])) value.forEach((item, index) => check(object(schema["items"])!, root, item, path + "[" + String(index) + "]", errors));
  const record = object(value);
  if (!record) return;
  const properties = object(schema["properties"]) ?? {};
  for (const key of Array.isArray(schema["required"]) ? schema["required"] as string[] : []) if (!Object.hasOwn(record, key)) errors.push(path + "." + key + " is required");
  for (const key of Object.keys(record)) {
    const sub = object(properties[key]);
    if (sub) check(sub, root, record[key], path + "." + key, errors);
    else if (schema["additionalProperties"] === false) errors.push(path + "." + key + " is not allowed");
  }
}
function violations(schema: Json, value: unknown): string {
  const errors: string[] = [];
  check(schema, schema, value, "$", errors);
  return errors.slice(0, 3).join("; ");
}
async function publishedSchema(directory: string, ref: string): Promise<Json> {
  let parsed: unknown;
  try { parsed = JSON.parse(await readFile(join(directory, ref), "utf8")); } catch { throw new Error("ENTRYPOINT_CONTRACT_INVALID: published schema " + ref + " is unreadable"); }
  const schema = object(parsed);
  const bad = schema ? supported(schema, schema, "#") : "schema is not an object";
  if (!schema || bad) throw new Error("ENTRYPOINT_CONTRACT_INVALID: " + (bad ?? "schema is not an object"));
  return schema;
}
/** A successful return means only the local function's schema-valid Resolution; it authorizes no effect. */
export async function invokePinnedReconcile(options: PinnedReconcileOptions, input: unknown): Promise<Resolution> {
  const d = options.descriptor;
  const implementation = object(d?.implementation);
  if (!closedDescriptor(d) || d.schema !== SCHEMA || options.contractVersion !== SCHEMA || d.id !== NAME || options.entrypointId !== NAME ||
      !implementation || implementation["package"] !== PACKAGE || implementation["export"] !== "reconcile" ||
      !Array.isArray(d.bindings) || d.bindings.length !== 0 || d.status !== "descriptor-only" ||
      d.inputSchema !== INPUT_SCHEMA || d.outputSchema !== OUTPUT_SCHEMA) {
    throw new Error("ENTRYPOINT_CONTRACT_INVALID: unsupported descriptor, schema or entrypoint");
  }
  const inputSchema = await publishedSchema(options.schemaDirectory, d.inputSchema);
  const outputSchema = await publishedSchema(options.schemaDirectory, d.outputSchema);
  const inputProblems = violations(inputSchema, input);
  if (inputProblems) throw new Error("COORDINATION_INPUT_INVALID: " + inputProblems);
  if (!/^sha256:[a-f0-9]{64}$/.test(options.artifactDigest) || await digestFile(options.artifactPath) !== options.artifactDigest) {
    throw new Error("ENTRYPOINT_ARTIFACT_MISMATCH: immutable artifact digest differs");
  }
  // Never retry: the loaded function runs once on a pinned artifact.
  const loaded = await options.load();
  if (typeof loaded?.reconcile !== "function") throw new Error("ENTRYPOINT_EXPORT_INVALID: expected reconcile function");
  const raw = loaded.reconcile(structuredClone(input) as ResolverInput);
  const outputProblems = violations(outputSchema, raw);
  if (outputProblems) throw new Error("COORDINATION_OUTPUT_INVALID: " + outputProblems);
  const given = input as ResolverInput, out = raw as Resolution;
  if (JSON.stringify([out.basis.workspaceId, out.basis.revision]) !== JSON.stringify([given.basis.workspaceId, given.basis.revision]) ||
      (["compute", "workers", "queue", "latencyMs"] as const).some(key => out.budget[key] !== given.budget[key])) {
    throw new Error("COORDINATION_OUTPUT_INVALID: resolution basis or budget differs from the input");
  }
  return out;
}
