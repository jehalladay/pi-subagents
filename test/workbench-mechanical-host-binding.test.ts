/**
 * wb-w8fk [MWI-contract-choice] Adopt the Pi side of one versioned cross-repository invocation contract (B-contract-choice, slice
 * PI-0; the P00 ruling packet of mechanical-native-interoperability-2026-11-09): this suite pins
 * src/workbench/mechanical-host-binding.ts, Pi's consumer of MechanicalWorkflows' PROPOSED host binding mechanical.pi-host/v1.
 *
 * THE FIXTURE: test/fixtures/mechanical-host-binding.v1.schema.json is the producer's committed schema, MechanicalWorkflows
 * contracts/schemas/mechanical-host-binding.v1.schema.json at 6c2873043ce4 (MechanicalWorkflows-loexn.2), blob 1c20bc86f270 (the
 * same blob at MechanicalWorkflows main 69cb016dd293), vendored byte for byte. VALID holds the values of the producer suite's valid()
 * (apps/development-rig/test/host-binding.test.ts at 6c2873043ce4) except intent.allowedEffects, which carries the Pi suites'
 * fixture action fixture-fn:develop-write: no action spelling is adopted (FUNCTION_ACTION_CONTRACT stays unadopted).
 *
 * Every refusal row below is judged three ways: validateMechanicalHostBinding returns the row's diagnostic, the suite's own schema
 * reader (conforms, written here and limited to the keywords the vendored schema uses) refuses the same value, and
 * admitMechanicalHostBinding returns the same diagnostic with zero loader calls and zero provider calls.
 *
 * PINNED READER SET (case id: what it reads -> what it observes at this cut):
 *  - HB-SCHEMA-PIN: the SHA-256 of the vendored schema bytes -> the digest of blob 1c20bc86f270.
 *  - HB-SCHEMA-READER: conforms over a schema node holding a keyword the vendored schema does not use -> it throws.
 *  - HB-SCHEMA-SHAPE: the module's member lists, contract, descriptor id, package, export, writer, profile enumerations and
 *    patterns, against the vendored schema's required lists, property names, consts, enums and patterns at each of its four
 *    objects -> equal, and each object of the schema closed (additionalProperties false).
 *  - HB-VALID: VALID -> the schema reader conforms, the module admits it, the binding returned deep-equals VALID, each of its
 *    objects and its effect list is frozen, and the entry it resolves is the reviewed entry for mechanical.development.develop.v1.
 *  - HB-PROFILES: each pair of an evidenceProfile and a contextProfile from the vendored schema's enums -> admitted.
 *  - HB-ADMIT-ONCE: admitMechanicalHostBinding over VALID -> one loader call with the binding and the reviewed entry, the export
 *    the loader returns handed back and never called.
 *  - HB-ADMIT-REJECT: a loader that rejects -> its rejection propagates, after one loader call.
 *  - HB-MISSING <path>: each member the vendored schema requires, at each of its objects, deleted -> member-missing at that path.
 *  - HB-UNEXPECTED <object>: a member the schema does not name added to each schema object -> member-unexpected at that object.
 *  - HB-NOT-OBJECT <object>: each schema object replaced by a string -> not-an-object at that object.
 *  - HB-LEAF <path> <form>: each schema leaf set to a number, and to a value its const, enum, pattern, minLength or items refuse
 *    -> version-unsupported for a contract string, profile-unknown for an enum leaf, member-invalid otherwise.
 *  - HB-DERIVED-SHAPE: the HB-MISSING, HB-UNEXPECTED, HB-NOT-OBJECT and HB-LEAF rows the vendored schema yields -> the 60
 *    listed ids, reasons and fields, in order.
 *  - HB-R006-*, HB-R005-*, HB-R148-*, HB-R149-*, HB-R150-* (REQUIREMENT_ROWS, frozen with each row's planted change by
 *    HB-ROWS-SHAPE): the forms the requirement each row names spells out (EAT-R006: version, unknown member, wrong definition, version judged first; EAT-R005:
 *    the program's two other selector spellings, profile and mode, read from the 2026-11-04 protocol document's FunctionLaunch,
 *    beside the producer's selectors and in their place; EAT-R148: Pi's transport host modes, read from EXECUTE_HOST_MODES, as a
 *    binding member and in either profile slot, and each enum's values in the other slot; EAT-R149: the producer's result-side
 *    mode literal beside the selectors and as the only selector; EAT-R150: the tool reply and descriptor contracts, a real
 *    workflow_catalog reply and the vendored descriptor as bindings, each of their other members borrowed into a binding, and the
 *    artifact digests moved out of artifact) -> the diagnostic each row lists.
 *  - HB-COVERAGE: the forms each outside source yields (the vendored schema's paths, read by a second walk; EXECUTE_HOST_MODES;
 *    the module's two profile enumerations; MECHANICAL_DESCRIPTOR_MEMBERS; a real workflow_catalog reply's members; the protocol
 *    document's two spellings; the tool reply and descriptor contracts) -> each form has its row.
 *  - HB-SEAT-FORMS: the requirement rows no source outside this suite owes (neither HB-COVERAGE's ids nor its deltas) -> the 13
 *    listed seat-chosen forms (R-SEAT-FORMS below).
 *  - HB-LEDGER: the requirements the landed status ledger (test/fixtures/mechanical-historical-status-ledger.json) assigns to
 *    wb-w8fk -> exactly the requirements REQUIREMENT_ROWS tag, plus EAT-R151, which this suite does not claim.
 *  - HB-DIAGNOSTIC: every refusal of every row -> its own keys are exactly code, field and reason, it is frozen, code is
 *    mechanical-host-binding-refused, field and reason come from the module's closed lists, and its text holds no planted value.
 *  - HB-STANDING: MECHANICAL_HOST_BINDING_STANDING -> frozen {state: proposed, blockedOn: MW-CONTRACT}, and
 *    FUNCTION_ACTION_CONTRACT -> still unadopted.
 *
 * RESIDUAL R-SEAT-FORMS (named; quiet row HB-SEAT-FORMS): the 13 requirement rows HB-SEAT-FORMS lists are forms this seat chose
 * (a version beside other defects, a member named version, two other definition ids, both spellings at once, a missing
 * contextProfile, the producer's result-side mode literal, the two whole records, a digest moved to the top and the two
 * non-objects). No source outside this suite enumerates them, so HB-ROWS-SHAPE's literal and each row's own verdict are their
 * only anchors: a row removed together with its literal line and its HB-SEAT-FORMS entry stays green.
 *
 * NOT CLAIMED by this suite: that the binding is adopted (EAT-R151: a conformance run against a packed MechanicalWorkflows
 * artifact and the recorded acceptance of both owners); the function-action grant (EAT-R204); the joint rulings of EAT-R203 to
 * EAT-R206 (one jointly approved ABI, the digest mapping, compatibility policy and dependency DAG); a request-level selector stage
 * joining the request's hostMode with a binding, and the later refusal of the native profiles (EAT-R148's EAT-R062 leg); a Pi
 * projection of a producer result (EAT-R149 (i)) and the ruling's record of the producer's disposition of its result-side mode
 * (EAT-R149 (ii)); any wiring of a binding into workflow_execute, a loader, a dispatch or an effect; values that are not plain JSON
 * data (accessors, proxies, symbol keys, non-enumerable members, inherited members, sparse arrays); a string read by length where
 * JSON Schema counts code points (minLength over text outside the Basic Multilingual Plane).
 */
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { EXECUTE_HOST_MODES } from "../src/workbench/execute.js";
import { FUNCTION_ACTION_CONTRACT } from "../src/workbench/function-authority.js";
import { MECHANICAL_DESCRIPTOR_MEMBERS, MECHANICAL_ENTRYPOINT_SCHEMA, MECHANICAL_REVIEWED_ENTRYPOINTS } from "../src/workbench/mechanical-descriptor.js";
import {
  admitMechanicalHostBinding,
  MECHANICAL_CONTEXT_PROFILES,
  MECHANICAL_EVIDENCE_PROFILES,
  MECHANICAL_HOST_BINDING_CONTRACT,
  MECHANICAL_HOST_BINDING_FIELDS,
  MECHANICAL_HOST_BINDING_PATTERNS,
  MECHANICAL_HOST_BINDING_REASONS,
  MECHANICAL_HOST_BINDING_SHAPE,
  MECHANICAL_HOST_BINDING_STANDING,
  MECHANICAL_INTENT_WRITER,
  type MechanicalHostBindingDiagnostic,
  type MechanicalHostBindingField,
  type MechanicalHostBindingReason,
  validateMechanicalHostBinding,
} from "../src/workbench/mechanical-host-binding.js";
import { buildWorkflowCatalogReply, TOOL_REPLY_CONTRACT_VERSION } from "../src/workbench/tool-replies.js";

type Loose = Record<string, unknown>;
type Schema = { readonly [key: string]: unknown };

const SCHEMA_BYTES = readFileSync(new URL("./fixtures/mechanical-host-binding.v1.schema.json", import.meta.url));
const SCHEMA_DIGEST = "sha256:5928dbf6039bc82197dfec55c69747de3d503ba0839dcf51762cce9149f05aed";
const DESCRIPTOR_RECORD = JSON.parse(readFileSync(new URL("./fixtures/mw-development-entrypoint-v1.json", import.meta.url), "utf8")) as Loose;
const PROTOCOL_DOC = readFileSync(new URL("../docs/workbench/programs/mechanical-workflows-interop-2026-11-04/02-host-architecture-and-protocol.md", import.meta.url), "utf8");
const LEDGER = JSON.parse(readFileSync(new URL("./fixtures/mechanical-historical-status-ledger.json", import.meta.url), "utf8")) as { readonly rows: readonly Loose[] };

const isRecord = (value: unknown): value is Loose => value !== null && typeof value === "object" && !Array.isArray(value);
const asSchema = (value: unknown): Schema => {
  if (!isRecord(value)) throw new Error("a schema node is not an object");
  return value;
};
const SCHEMA = asSchema(JSON.parse(SCHEMA_BYTES.toString("utf8")));

/** The keywords the vendored schema uses; a node holding any other keyword throws, so a re-vendored schema cannot pass unread. */
const SCHEMA_KEYWORDS = new Set(["$schema", "$id", "title", "description", "type", "const", "enum", "pattern", "minLength", "required", "additionalProperties", "properties", "items"]);
/** The suite's own schema reader: written here, never the module's code, limited to SCHEMA_KEYWORDS. */
function conforms(schema: Schema, value: unknown): boolean {
  for (const key of Object.keys(schema)) if (!SCHEMA_KEYWORDS.has(key)) throw new Error(`unsupported schema keyword ${key}`);
  if (Object.hasOwn(schema, "const") && value !== schema.const) return false;
  if (Array.isArray(schema.enum) && !schema.enum.includes(value)) return false;
  if (schema.type === "string") {
    if (typeof value !== "string") return false;
    if (typeof schema.minLength === "number" && value.length < schema.minLength) return false;
    return typeof schema.pattern !== "string" || new RegExp(schema.pattern).test(value);
  }
  if (schema.type === "array") return Array.isArray(value) && value.every(item => conforms(asSchema(schema.items), item));
  if (schema.type === "object") {
    if (!isRecord(value)) return false;
    const required = Array.isArray(schema.required) ? schema.required : [];
    if (required.some(member => typeof member !== "string" || !Object.hasOwn(value, member))) return false;
    const properties = asSchema(schema.properties);
    for (const [key, member] of Object.entries(value)) {
      if (!Object.hasOwn(properties, key)) {
        if (schema.additionalProperties === false) return false;
        continue;
      }
      if (!conforms(asSchema(properties[key]), member)) return false;
    }
    return true;
  }
  if (schema.type === undefined) return true;
  throw new Error(`unsupported schema type ${String(schema.type)}`);
}

const sha = (digit: string): string => `sha256:${digit.repeat(64)}`;
/** The producer suite's valid() values, intent.allowedEffects excepted (see the header). */
const VALID_SOURCE = {
  contract: "mechanical.pi-host/v1",
  descriptorId: "mechanical.development.develop.v1",
  artifact: { package: "@mechanical/workflows-development", export: "develop", sha256: sha("a"), descriptorSha256: sha("b") },
  source: { workspaceRealpath: "/work/repo", baseCommit: "1".repeat(40), baseTree: "2".repeat(40), forgeManifestSha256: sha("c") },
  invocationId: "pi-inv-1",
  evidenceProfile: "git-census-v1",
  contextProfile: "plain-v1",
  intent: { task: "Add a test", writer: "single", allowedEffects: ["fixture-fn:develop-write"] },
};
const fresh = (): Loose => structuredClone(VALID_SOURCE);
const objectAt = (value: Loose, path: readonly string[]): Loose => {
  let at: unknown = value;
  for (const key of path) at = isRecord(at) ? at[key] : undefined;
  if (!isRecord(at)) throw new Error(`no object at ${path.join(".")}`);
  return at;
};
const planted = (mutate: (binding: Loose) => void): (() => Loose) => () => {
  const binding = fresh();
  mutate(binding);
  return binding;
};
/** VALID with one top-level member set to the value. */
const withMember = (key: string, value: unknown): (() => Loose) =>
  planted(binding => {
    binding[key] = value;
  });
/** VALID with the listed top-level members deleted. */
const without = (...keys: readonly string[]): (() => Loose) =>
  planted(binding => {
    for (const key of keys) delete binding[key];
  });
const fieldOf = (path: readonly string[]): MechanicalHostBindingField => {
  const field = path.length === 0 ? "binding" : path.join(".");
  const known = MECHANICAL_HOST_BINDING_FIELDS.find(candidate => candidate === field);
  if (known === undefined) throw new Error(`${field} is not a refusal field`);
  return known;
};

interface Row {
  readonly id: string;
  readonly plant: () => unknown;
  readonly reason: MechanicalHostBindingReason;
  readonly field: MechanicalHostBindingField;
}
interface RequirementRow extends Row {
  readonly req: "EAT-R005" | "EAT-R006" | "EAT-R148" | "EAT-R149" | "EAT-R150";
}

/** Each object node of the vendored schema with its path, the root first, in property order. */
interface SchemaObject {
  readonly path: readonly string[];
  readonly node: Schema;
}
const schemaObjects = (node: Schema, path: readonly string[] = []): SchemaObject[] => {
  if (node.type !== "object") return [];
  const properties = asSchema(node.properties);
  return [{ path, node }, ...Object.keys(properties).flatMap(key => schemaObjects(asSchema(properties[key]), [...path, key]))];
};
/** Each leaf node (not an object) of the vendored schema with its path, in property order. */
const schemaLeaves = (node: Schema, path: readonly string[] = []): SchemaObject[] => {
  if (node.type !== "object") return [{ path, node }];
  const properties = asSchema(node.properties);
  return Object.keys(properties).flatMap(key => schemaLeaves(asSchema(properties[key]), [...path, key]));
};
const OBJECTS = schemaObjects(SCHEMA);
const LEAVES = schemaLeaves(SCHEMA);
const requiredOf = (node: Schema): string[] => (Array.isArray(node.required) ? node.required.filter((member): member is string => typeof member === "string") : []);
const enumOf = (node: Schema): string[] => (Array.isArray(node.enum) ? node.enum.filter((value): value is string => typeof value === "string") : []);
const propertySchema = (path: readonly string[]): Schema => path.reduce<Schema>((node, key) => asSchema(asSchema(node.properties)[key]), SCHEMA);
const setAt = (binding: Loose, path: readonly string[], value: unknown): void => {
  objectAt(binding, path.slice(0, -1))[path[path.length - 1] ?? ""] = value;
};

/** Schema-derived rows: each required member deleted, each object widened and replaced, each leaf mistyped and each constraint broken. */
const DERIVED_ROWS: readonly Row[] = [
  ...OBJECTS.flatMap(({ path, node }) =>
    requiredOf(node).map(member => ({
      id: `HB-MISSING ${[...path, member].join(".")}`,
      plant: planted(binding => {
        delete objectAt(binding, path)[member];
      }),
      reason: "member-missing" as const,
      field: fieldOf([...path, member]),
    })),
  ),
  ...OBJECTS.map(({ path }) => ({
    id: `HB-UNEXPECTED ${fieldOf(path)}`,
    plant: planted(binding => {
      objectAt(binding, path).unexpectedMember = "planted";
    }),
    reason: "member-unexpected" as const,
    field: fieldOf(path),
  })),
  ...OBJECTS.map(({ path }) => ({
    id: `HB-NOT-OBJECT ${fieldOf(path)}`,
    plant: path.length === 0 ? () => "planted" : planted(binding => setAt(binding, path, "planted")),
    reason: "not-an-object" as const,
    field: fieldOf(path),
  })),
  ...LEAVES.flatMap(({ path, node }) => {
    const field = fieldOf(path);
    const broken = (form: string, value: unknown, reason: MechanicalHostBindingReason): Row => ({ id: `HB-LEAF ${field} ${form}`, plant: planted(binding => setAt(binding, path, value)), reason, field });
    const constraintReason: MechanicalHostBindingReason = field === "contract" ? "version-unsupported" : Array.isArray(node.enum) ? "profile-unknown" : "member-invalid";
    const rows: Row[] = [broken("number", 7, Array.isArray(node.enum) ? "profile-unknown" : "member-invalid")];
    if (typeof node.const === "string") rows.push(broken("const", `${node.const}x`, constraintReason));
    if (Array.isArray(node.enum)) rows.push(broken("enum", "planted-v1", constraintReason));
    if (typeof node.pattern === "string") rows.push(broken("pattern", "planted", constraintReason));
    if (typeof node.minLength === "number") rows.push(broken("minLength", "", constraintReason));
    if (node.type === "array") rows.push(broken("items", [""], constraintReason), broken("items-number", [7], constraintReason));
    return rows;
  }),
];

/** The two other selector spellings of the 2026-11-04 protocol document (its FunctionLaunch line and the counterpart spelling it names). */
const ALIASES = ((): readonly [string, string] => {
  const line = /^\s*(\w+): "git-census" \| "native-task-scope"; \/\/ MW counterpart doc \([^)]*\) names this field `(\w+)`/m.exec(PROTOCOL_DOC);
  if (line?.[1] === undefined || line[2] === undefined) throw new Error("the protocol document no longer spells the two selector names");
  return [line[1], line[2]];
})();
const [PROFILE_ALIAS, MODE_ALIAS] = ALIASES;
/** The producer's shipped result-side mode literal (EAT-R149's evidence: LiveDevelopmentResult.mode at MechanicalWorkflows 97e18068). */
const RESULT_MODE = "live-claude-forge";
const CATALOG_REPLY = buildWorkflowCatalogReply([], []) as unknown as Loose;
const renamed = (from: string, to: string) =>
  planted(binding => {
    binding[to] = binding[from];
    delete binding[from];
  });
const moved = (from: readonly string[], to: readonly string[]) =>
  planted(binding => {
    const value = objectAt(binding, from.slice(0, -1))[from[from.length - 1] ?? ""];
    delete objectAt(binding, from.slice(0, -1))[from[from.length - 1] ?? ""];
    setAt(binding, to, value);
  });

/** The requirement forms, each row tagged with the requirement it reads. */
const REQUIREMENT_ROWS: readonly RequirementRow[] = [
  { req: "EAT-R006", id: "HB-R006-VERSION-NEXT", plant: withMember("contract", "mechanical.pi-host/v2"), reason: "version-unsupported", field: "contract" },
  { req: "EAT-R006", id: "HB-R006-VERSION-CASE", plant: withMember("contract", "MECHANICAL.PI-HOST/V1"), reason: "version-unsupported", field: "contract" },
  { req: "EAT-R006", id: "HB-R006-VERSION-PADDED", plant: withMember("contract", " mechanical.pi-host/v1"), reason: "version-unsupported", field: "contract" },
  {
    req: "EAT-R006",
    id: "HB-R006-VERSION-FIRST",
    plant: planted(b => {
      b.contract = "mechanical.pi-host/v2";
      delete b.invocationId;
      b.unexpectedMember = "planted";
      b.descriptorId = "planted";
    }),
    reason: "version-unsupported",
    field: "contract",
  },
  { req: "EAT-R006", id: "HB-R006-UNKNOWN-MEMBER", plant: withMember("version", 1), reason: "member-unexpected", field: "binding" },
  { req: "EAT-R006", id: "HB-R006-DEFINITION-OTHER", plant: withMember("descriptorId", "mechanical.development.reconcile.v1"), reason: "member-invalid", field: "descriptorId" },
  { req: "EAT-R006", id: "HB-R006-DEFINITION-SCRIPT", plant: withMember("descriptorId", "review.js"), reason: "member-invalid", field: "descriptorId" },
  { req: "EAT-R005", id: "HB-R005-PROFILE-BESIDE", plant: withMember(PROFILE_ALIAS, "git-census"), reason: "member-unexpected", field: "binding" },
  { req: "EAT-R005", id: "HB-R005-MODE-BESIDE", plant: withMember(MODE_ALIAS, "git-census"), reason: "member-unexpected", field: "binding" },
  { req: "EAT-R005", id: "HB-R005-PROFILE-INSTEAD", plant: renamed("evidenceProfile", PROFILE_ALIAS), reason: "member-missing", field: "evidenceProfile" },
  { req: "EAT-R005", id: "HB-R005-MODE-INSTEAD", plant: renamed("contextProfile", MODE_ALIAS), reason: "member-missing", field: "contextProfile" },
  {
    req: "EAT-R005",
    id: "HB-R005-BOTH-INSTEAD",
    plant: planted(b => {
      b[PROFILE_ALIAS] = b.evidenceProfile;
      b[MODE_ALIAS] = b.contextProfile;
      delete b.evidenceProfile;
      delete b.contextProfile;
    }),
    reason: "member-missing",
    field: "evidenceProfile",
  },
  ...EXECUTE_HOST_MODES.flatMap((hostMode): RequirementRow[] => [
    { req: "EAT-R148", id: `HB-R148-HOSTMODE-MEMBER ${hostMode}`, plant: withMember("hostMode", hostMode), reason: "member-unexpected", field: "binding" },
    { req: "EAT-R148", id: `HB-R148-TRANSPORT-IN-EVIDENCE ${hostMode}`, plant: withMember("evidenceProfile", hostMode), reason: "profile-unknown", field: "evidenceProfile" },
    { req: "EAT-R148", id: `HB-R148-TRANSPORT-IN-CONTEXT ${hostMode}`, plant: withMember("contextProfile", hostMode), reason: "profile-unknown", field: "contextProfile" },
  ]),
  ...enumOf(propertySchema(["contextProfile"])).map((value): RequirementRow => ({ req: "EAT-R148", id: `HB-R148-SWAPPED-IN-EVIDENCE ${value}`, plant: withMember("evidenceProfile", value), reason: "profile-unknown", field: "evidenceProfile" })),
  ...enumOf(propertySchema(["evidenceProfile"])).map((value): RequirementRow => ({ req: "EAT-R148", id: `HB-R148-SWAPPED-IN-CONTEXT ${value}`, plant: withMember("contextProfile", value), reason: "profile-unknown", field: "contextProfile" })),
  { req: "EAT-R148", id: "HB-R148-CONTEXT-NOT-DEFAULTED", plant: without("contextProfile"), reason: "member-missing", field: "contextProfile" },
  { req: "EAT-R149", id: "HB-R149-RESULT-MODE-BESIDE", plant: withMember("mode", RESULT_MODE), reason: "member-unexpected", field: "binding" },
  {
    req: "EAT-R149",
    id: "HB-R149-RESULT-MODE-ONLY",
    plant: planted(b => {
      b.mode = RESULT_MODE;
      delete b.evidenceProfile;
      delete b.contextProfile;
    }),
    reason: "member-missing",
    field: "evidenceProfile",
  },
  { req: "EAT-R150", id: "HB-R150-TOOL-REPLY-CONTRACT", plant: withMember("contract", TOOL_REPLY_CONTRACT_VERSION), reason: "version-unsupported", field: "contract" },
  { req: "EAT-R150", id: "HB-R150-DESCRIPTOR-CONTRACT", plant: withMember("contract", MECHANICAL_ENTRYPOINT_SCHEMA), reason: "version-unsupported", field: "contract" },
  { req: "EAT-R150", id: "HB-R150-TOOL-REPLY-RECORD", plant: () => structuredClone(CATALOG_REPLY), reason: "version-unsupported", field: "contract" },
  { req: "EAT-R150", id: "HB-R150-DESCRIPTOR-RECORD", plant: () => structuredClone(DESCRIPTOR_RECORD), reason: "member-missing", field: "contract" },
  ...Object.keys(DESCRIPTOR_RECORD).map((member): RequirementRow => ({ req: "EAT-R150", id: `HB-R150-BORROW-DESCRIPTOR ${member}`, plant: withMember(member, structuredClone(DESCRIPTOR_RECORD[member])), reason: "member-unexpected", field: "binding" })),
  ...Object.keys(CATALOG_REPLY)
    .filter(member => member !== "contract")
    .map((member): RequirementRow => ({ req: "EAT-R150", id: `HB-R150-BORROW-REPLY ${member}`, plant: withMember(member, structuredClone(CATALOG_REPLY[member])), reason: "member-unexpected", field: "binding" })),
  { req: "EAT-R150", id: "HB-R150-DIGEST-INTO-SOURCE", plant: moved(["artifact", "sha256"], ["source", "sha256"]), reason: "member-missing", field: "artifact.sha256" },
  { req: "EAT-R150", id: "HB-R150-DESCRIPTOR-DIGEST-INTO-SOURCE", plant: moved(["artifact", "descriptorSha256"], ["source", "descriptorSha256"]), reason: "member-missing", field: "artifact.descriptorSha256" },
  { req: "EAT-R150", id: "HB-R150-DIGEST-TO-TOP", plant: moved(["artifact", "sha256"], ["sha256"]), reason: "member-unexpected", field: "binding" },
  { req: "EAT-R150", id: "HB-R150-NOT-OBJECT-NULL", plant: () => null, reason: "not-an-object", field: "binding" },
  { req: "EAT-R150", id: "HB-R150-NOT-OBJECT-LIST", plant: () => [fresh()], reason: "not-an-object", field: "binding" },
];
const ALL_ROWS: readonly Row[] = [...DERIVED_ROWS, ...REQUIREMENT_ROWS];
const MARKERS = ["planted", "unexpectedMember", RESULT_MODE] as const;
const clip = (value: unknown): string => {
  const text = JSON.stringify(value) ?? String(value);
  return text.length > 48 ? `${text.slice(0, 45)}...` : text;
};
/** How a planted value differs from VALID, member by member: -path deleted, +path=value added, ~path=value changed. */
const deltaOf = (value: unknown): string => {
  if (!isRecord(value)) return `value ${clip(value)}`;
  const changes: string[] = [];
  const walk = (base: unknown, plantedValue: unknown, path: string): void => {
    if (isRecord(base) && isRecord(plantedValue)) {
      for (const key of Object.keys(base)) if (!Object.hasOwn(plantedValue, key)) changes.push(`-${path}${key}`);
      for (const key of Object.keys(plantedValue)) {
        if (!Object.hasOwn(base, key)) changes.push(`+${path}${key}=${clip(plantedValue[key])}`);
        else walk(base[key], plantedValue[key], `${path}${key}.`);
      }
      return;
    }
    if (JSON.stringify(base) !== JSON.stringify(plantedValue)) changes.push(`~${path.slice(0, -1)}=${clip(plantedValue)}`);
  };
  walk(VALID_SOURCE, value, "");
  return changes.join(" ");
};
/** A second, independent walk of the vendored schema: its object paths, its required member paths and its leaf paths. */
const schemaPaths = (): { readonly objects: string[]; readonly required: string[]; readonly leaves: string[] } => {
  const found = { objects: [] as string[], required: [] as string[], leaves: [] as string[] };
  const join = (path: string, key: string): string => (path === "" ? key : `${path}.${key}`);
  const visit = (at: Schema, path: string): void => {
    if (at.type !== "object") {
      found.leaves.push(path);
      return;
    }
    found.objects.push(path === "" ? "binding" : path);
    for (const member of requiredOf(at)) found.required.push(join(path, member));
    for (const [key, child] of Object.entries(asSchema(at.properties))) visit(asSchema(child), join(path, key));
  };
  visit(SCHEMA, "");
  return found;
};

/** The row ids HB-COVERAGE owes, each computed from a source outside this suite's literals. */
const owedIds = (): string[] => {
  const paths = schemaPaths();
  return [
    ...paths.required.map(path => `HB-MISSING ${path}`),
    ...paths.objects.flatMap(path => [`HB-UNEXPECTED ${path}`, `HB-NOT-OBJECT ${path}`]),
    ...paths.leaves.map(path => `HB-LEAF ${path} number`),
    ...EXECUTE_HOST_MODES.flatMap(mode => [`HB-R148-HOSTMODE-MEMBER ${mode}`, `HB-R148-TRANSPORT-IN-EVIDENCE ${mode}`, `HB-R148-TRANSPORT-IN-CONTEXT ${mode}`]),
    ...MECHANICAL_CONTEXT_PROFILES.map(value => `HB-R148-SWAPPED-IN-EVIDENCE ${value}`),
    ...MECHANICAL_EVIDENCE_PROFILES.map(value => `HB-R148-SWAPPED-IN-CONTEXT ${value}`),
    ...MECHANICAL_DESCRIPTOR_MEMBERS.map(member => `HB-R150-BORROW-DESCRIPTOR ${member}`),
    ...Object.keys(buildWorkflowCatalogReply([], []))
      .filter(member => member !== "contract")
      .map(member => `HB-R150-BORROW-REPLY ${member}`),
  ];
};
/** The exact plant deltas HB-COVERAGE owes: the two other contracts, the schema contract's next, upper-case and padded variants, the protocol document's two spellings beside and in place of the selectors, and each artifact digest moved into source. */
const owedDeltas = (): string[] => {
  const contract = String(propertySchema(["contract"]).const);
  const digestLeaves = LEAVES.filter(({ path, node }) => path[0] === "artifact" && node.pattern === MECHANICAL_HOST_BINDING_PATTERNS.digest).map(({ path }) => path[1] ?? "");
  return [
    ...[TOOL_REPLY_CONTRACT_VERSION, MECHANICAL_ENTRYPOINT_SCHEMA].map(other => `~contract=${clip(other)}`),
    ...[contract.replace(/\/v(\d+)$/, (_all, major: string) => `/v${Number(major) + 1}`), contract.toUpperCase(), ` ${contract}`].map(variant => `~contract=${clip(variant)}`),
    ...ALIASES.map(alias => `+${alias}=${clip("git-census")}`),
    `-evidenceProfile +${PROFILE_ALIAS}=${clip(VALID_SOURCE.evidenceProfile)}`,
    `-contextProfile +${MODE_ALIAS}=${clip(VALID_SOURCE.contextProfile)}`,
    ...digestLeaves.map(leaf => `-artifact.${leaf} +source.${leaf}=${clip(objectAt(fresh(), ["artifact"])[leaf])}`),
  ];
};

describe("wb-w8fk: the vendored producer schema and the module's closed shape", () => {
  it("HB-SCHEMA-PIN the vendored schema bytes are the producer's blob 1c20bc86f270", () => {
    expect(`sha256:${createHash("sha256").update(SCHEMA_BYTES).digest("hex")}`).toBe(SCHEMA_DIGEST);
  });

  it("HB-SCHEMA-READER the suite's schema reader throws on a keyword the vendored schema does not use", () => {
    expect(() => conforms({ type: "string", format: "uri" }, "x")).toThrow("unsupported schema keyword format");
  });

  it("HB-SCHEMA-SHAPE the module's member lists, literals, enumerations and patterns equal the vendored schema's", () => {
    const [entry] = MECHANICAL_REVIEWED_ENTRYPOINTS;
    expect(OBJECTS.map(({ path, node }) => [fieldOf(path), requiredOf(node), Object.keys(asSchema(node.properties)), node.additionalProperties])).toEqual(
      (["binding", "artifact", "source", "intent"] as const).map(name => [name, [...MECHANICAL_HOST_BINDING_SHAPE[name]], [...MECHANICAL_HOST_BINDING_SHAPE[name]], false]),
    );
    expect(propertySchema(["contract"]).const).toBe(MECHANICAL_HOST_BINDING_CONTRACT);
    expect(MECHANICAL_REVIEWED_ENTRYPOINTS.map(reviewed => reviewed.id)).toEqual([propertySchema(["descriptorId"]).const]);
    expect([propertySchema(["artifact", "package"]).const, propertySchema(["artifact", "export"]).const]).toEqual([entry?.package, entry?.export]);
    expect(propertySchema(["intent", "writer"]).const).toBe(MECHANICAL_INTENT_WRITER);
    expect([enumOf(propertySchema(["evidenceProfile"])), enumOf(propertySchema(["contextProfile"]))]).toEqual([[...MECHANICAL_EVIDENCE_PROFILES], [...MECHANICAL_CONTEXT_PROFILES]]);
    expect(LEAVES.filter(({ node }) => typeof node.pattern === "string").map(({ path, node }) => [fieldOf(path), node.pattern])).toEqual([
      ["artifact.sha256", MECHANICAL_HOST_BINDING_PATTERNS.digest],
      ["artifact.descriptorSha256", MECHANICAL_HOST_BINDING_PATTERNS.digest],
      ["source.workspaceRealpath", MECHANICAL_HOST_BINDING_PATTERNS.realpath],
      ["source.baseCommit", MECHANICAL_HOST_BINDING_PATTERNS.gitId],
      ["source.baseTree", MECHANICAL_HOST_BINDING_PATTERNS.gitId],
      ["source.forgeManifestSha256", MECHANICAL_HOST_BINDING_PATTERNS.digest],
    ]);
  });
});

describe("wb-w8fk: bindings the producer's schema admits", () => {
  it("HB-VALID the valid fixture conforms, is admitted, round-trips frozen and resolves to the reviewed entry", () => {
    expect(conforms(SCHEMA, fresh())).toBe(true);
    const verdict = validateMechanicalHostBinding(fresh());
    if (!verdict.ok) throw new Error(`refused: ${verdict.diagnostic.reason} ${verdict.diagnostic.field}`);
    expect(verdict.binding).toEqual(VALID_SOURCE);
    expect([verdict.binding, verdict.binding.artifact, verdict.binding.source, verdict.binding.intent, verdict.binding.intent.allowedEffects, verdict].map(Object.isFrozen)).toEqual([true, true, true, true, true, true]);
    expect(verdict.entry).toBe(MECHANICAL_REVIEWED_ENTRYPOINTS[0]);
  });

  it.each(enumOf(propertySchema(["evidenceProfile"])).flatMap(evidence => enumOf(propertySchema(["contextProfile"])).map(context => [evidence, context] as const)))(
    "HB-PROFILES evidenceProfile %s with contextProfile %s is admitted",
    (evidence, context) => {
      const binding = { ...fresh(), evidenceProfile: evidence, contextProfile: context };
      expect([conforms(SCHEMA, binding), validateMechanicalHostBinding(binding).ok]).toEqual([true, true]);
    },
  );

  it("HB-ADMIT-ONCE admission calls the loader once with the binding and the reviewed entry and never calls the export", async () => {
    const calls: unknown[][] = [];
    let provided = 0;
    const develop = (): void => {
      provided += 1;
    };
    const admission = await admitMechanicalHostBinding(fresh(), async (binding, entry) => {
      calls.push([binding, entry]);
      return develop;
    });
    if (!admission.ok) throw new Error(`refused: ${admission.diagnostic.reason} ${admission.diagnostic.field}`);
    expect(calls).toEqual([[VALID_SOURCE, MECHANICAL_REVIEWED_ENTRYPOINTS[0]]]);
    expect([admission.loaded, admission.binding, provided]).toEqual([develop, VALID_SOURCE, 0]);
  });

  it("HB-ADMIT-REJECT a loader that rejects propagates its rejection after one call", async () => {
    let loads = 0;
    const failure = new Error("loader failed");
    await expect(
      admitMechanicalHostBinding(fresh(), async () => {
        loads += 1;
        throw failure;
      }),
    ).rejects.toBe(failure);
    expect(loads).toBe(1);
  });
});

describe("wb-w8fk: bindings refused before any loader call", () => {
  it.each(ALL_ROWS.map(row => [row.id, row] as const))("%s", async (_id, row) => {
    const value = row.plant();
    const verdict = validateMechanicalHostBinding(value);
    const expected: MechanicalHostBindingDiagnostic = { code: "mechanical-host-binding-refused", field: row.field, reason: row.reason };
    expect(verdict.ok ? "admitted" : verdict.diagnostic).toEqual(expected);
    expect(conforms(SCHEMA, row.plant())).toBe(false);
    let loads = 0;
    let provided = 0;
    const admission = await admitMechanicalHostBinding(row.plant(), async () => {
      loads += 1;
      return () => {
        provided += 1;
      };
    });
    expect([admission.ok ? "admitted" : admission.diagnostic, loads, provided]).toEqual([expected, 0, 0]);
  });

  it("HB-ROWS-SHAPE the requirement rows are the listed forms, in order", () => {
    expect(REQUIREMENT_ROWS.map(row => `${row.req} ${row.id}: ${row.reason} ${row.field} <- ${deltaOf(row.plant())}`)).toEqual([
      "EAT-R006 HB-R006-VERSION-NEXT: version-unsupported contract <- ~contract=\"mechanical.pi-host/v2\"",
      "EAT-R006 HB-R006-VERSION-CASE: version-unsupported contract <- ~contract=\"MECHANICAL.PI-HOST/V1\"",
      "EAT-R006 HB-R006-VERSION-PADDED: version-unsupported contract <- ~contract=\" mechanical.pi-host/v1\"",
      "EAT-R006 HB-R006-VERSION-FIRST: version-unsupported contract <- -invocationId ~contract=\"mechanical.pi-host/v2\" ~descriptorId=\"planted\" +unexpectedMember=\"planted\"",
      "EAT-R006 HB-R006-UNKNOWN-MEMBER: member-unexpected binding <- +version=1",
      "EAT-R006 HB-R006-DEFINITION-OTHER: member-invalid descriptorId <- ~descriptorId=\"mechanical.development.reconcile.v1\"",
      "EAT-R006 HB-R006-DEFINITION-SCRIPT: member-invalid descriptorId <- ~descriptorId=\"review.js\"",
      "EAT-R005 HB-R005-PROFILE-BESIDE: member-unexpected binding <- +profile=\"git-census\"",
      "EAT-R005 HB-R005-MODE-BESIDE: member-unexpected binding <- +mode=\"git-census\"",
      "EAT-R005 HB-R005-PROFILE-INSTEAD: member-missing evidenceProfile <- -evidenceProfile +profile=\"git-census-v1\"",
      "EAT-R005 HB-R005-MODE-INSTEAD: member-missing contextProfile <- -contextProfile +mode=\"plain-v1\"",
      "EAT-R005 HB-R005-BOTH-INSTEAD: member-missing evidenceProfile <- -evidenceProfile -contextProfile +profile=\"git-census-v1\" +mode=\"plain-v1\"",
      "EAT-R148 HB-R148-HOSTMODE-MEMBER embedded: member-unexpected binding <- +hostMode=\"embedded\"",
      "EAT-R148 HB-R148-TRANSPORT-IN-EVIDENCE embedded: profile-unknown evidenceProfile <- ~evidenceProfile=\"embedded\"",
      "EAT-R148 HB-R148-TRANSPORT-IN-CONTEXT embedded: profile-unknown contextProfile <- ~contextProfile=\"embedded\"",
      "EAT-R148 HB-R148-HOSTMODE-MEMBER detached: member-unexpected binding <- +hostMode=\"detached\"",
      "EAT-R148 HB-R148-TRANSPORT-IN-EVIDENCE detached: profile-unknown evidenceProfile <- ~evidenceProfile=\"detached\"",
      "EAT-R148 HB-R148-TRANSPORT-IN-CONTEXT detached: profile-unknown contextProfile <- ~contextProfile=\"detached\"",
      "EAT-R148 HB-R148-SWAPPED-IN-EVIDENCE plain-v1: profile-unknown evidenceProfile <- ~evidenceProfile=\"plain-v1\"",
      "EAT-R148 HB-R148-SWAPPED-IN-EVIDENCE rf-committed-v1: profile-unknown evidenceProfile <- ~evidenceProfile=\"rf-committed-v1\"",
      "EAT-R148 HB-R148-SWAPPED-IN-CONTEXT git-census-v1: profile-unknown contextProfile <- ~contextProfile=\"git-census-v1\"",
      "EAT-R148 HB-R148-SWAPPED-IN-CONTEXT hx-task-scope-v1: profile-unknown contextProfile <- ~contextProfile=\"hx-task-scope-v1\"",
      "EAT-R148 HB-R148-CONTEXT-NOT-DEFAULTED: member-missing contextProfile <- -contextProfile",
      "EAT-R149 HB-R149-RESULT-MODE-BESIDE: member-unexpected binding <- +mode=\"live-claude-forge\"",
      "EAT-R149 HB-R149-RESULT-MODE-ONLY: member-missing evidenceProfile <- -evidenceProfile -contextProfile +mode=\"live-claude-forge\"",
      "EAT-R150 HB-R150-TOOL-REPLY-CONTRACT: version-unsupported contract <- ~contract=\"workbench.tool-reply/v1\"",
      "EAT-R150 HB-R150-DESCRIPTOR-CONTRACT: version-unsupported contract <- ~contract=\"mechanical-workflows/entrypoint/v1\"",
      "EAT-R150 HB-R150-TOOL-REPLY-RECORD: version-unsupported contract <- -descriptorId -artifact -source -invocationId -evidenceProfile -contextProfile -intent ~contract=\"workbench.tool-reply/v1\" +tool=\"workflow_catalog\" +ok=true +invoked=false +limit=20 +matched=0 +offered=0 +returned=0 +rows=[]",
      "EAT-R150 HB-R150-DESCRIPTOR-RECORD: member-missing contract <- -contract -descriptorId -artifact -source -invocationId -evidenceProfile -contextProfile -intent +schema=\"mechanical-workflows/entrypoint/v1\" +id=\"mechanical.development.develop.v1\" +implementation={\"package\":\"@mechanical/workflows-development... +inputSchema=\"development-request.v1.schema.json\" +outputSchema=\"development-outcome.v1.schema.json\" +bindings=[\"discover\",\"compileContext\",\"implement\",\"ver... +status=\"descriptor-only\" +note=\"No remote host loader or generic invocation ...",
      "EAT-R150 HB-R150-BORROW-DESCRIPTOR schema: member-unexpected binding <- +schema=\"mechanical-workflows/entrypoint/v1\"",
      "EAT-R150 HB-R150-BORROW-DESCRIPTOR id: member-unexpected binding <- +id=\"mechanical.development.develop.v1\"",
      "EAT-R150 HB-R150-BORROW-DESCRIPTOR implementation: member-unexpected binding <- +implementation={\"package\":\"@mechanical/workflows-development...",
      "EAT-R150 HB-R150-BORROW-DESCRIPTOR inputSchema: member-unexpected binding <- +inputSchema=\"development-request.v1.schema.json\"",
      "EAT-R150 HB-R150-BORROW-DESCRIPTOR outputSchema: member-unexpected binding <- +outputSchema=\"development-outcome.v1.schema.json\"",
      "EAT-R150 HB-R150-BORROW-DESCRIPTOR bindings: member-unexpected binding <- +bindings=[\"discover\",\"compileContext\",\"implement\",\"ver...",
      "EAT-R150 HB-R150-BORROW-DESCRIPTOR status: member-unexpected binding <- +status=\"descriptor-only\"",
      "EAT-R150 HB-R150-BORROW-DESCRIPTOR note: member-unexpected binding <- +note=\"No remote host loader or generic invocation ...",
      "EAT-R150 HB-R150-BORROW-REPLY tool: member-unexpected binding <- +tool=\"workflow_catalog\"",
      "EAT-R150 HB-R150-BORROW-REPLY ok: member-unexpected binding <- +ok=true",
      "EAT-R150 HB-R150-BORROW-REPLY invoked: member-unexpected binding <- +invoked=false",
      "EAT-R150 HB-R150-BORROW-REPLY limit: member-unexpected binding <- +limit=20",
      "EAT-R150 HB-R150-BORROW-REPLY matched: member-unexpected binding <- +matched=0",
      "EAT-R150 HB-R150-BORROW-REPLY offered: member-unexpected binding <- +offered=0",
      "EAT-R150 HB-R150-BORROW-REPLY returned: member-unexpected binding <- +returned=0",
      "EAT-R150 HB-R150-BORROW-REPLY rows: member-unexpected binding <- +rows=[]",
      "EAT-R150 HB-R150-DIGEST-INTO-SOURCE: member-missing artifact.sha256 <- -artifact.sha256 +source.sha256=\"sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa...",
      "EAT-R150 HB-R150-DESCRIPTOR-DIGEST-INTO-SOURCE: member-missing artifact.descriptorSha256 <- -artifact.descriptorSha256 +source.descriptorSha256=\"sha256:bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb...",
      "EAT-R150 HB-R150-DIGEST-TO-TOP: member-unexpected binding <- -artifact.sha256 +sha256=\"sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa...",
      "EAT-R150 HB-R150-NOT-OBJECT-NULL: not-an-object binding <- value null",
      "EAT-R150 HB-R150-NOT-OBJECT-LIST: not-an-object binding <- value [{\"contract\":\"mechanical.pi-host/v1\",\"descrip...",
    ]);
    expect(Object.keys(DESCRIPTOR_RECORD)).toEqual([...MECHANICAL_DESCRIPTOR_MEMBERS]);
  });

  it("HB-DERIVED-SHAPE the schema-derived rows are the listed forms, in order", () => {
    expect(DERIVED_ROWS.map(row => `${row.id}: ${row.reason} ${row.field}`)).toEqual([
      "HB-MISSING contract: member-missing contract",
      "HB-MISSING descriptorId: member-missing descriptorId",
      "HB-MISSING artifact: member-missing artifact",
      "HB-MISSING source: member-missing source",
      "HB-MISSING invocationId: member-missing invocationId",
      "HB-MISSING evidenceProfile: member-missing evidenceProfile",
      "HB-MISSING contextProfile: member-missing contextProfile",
      "HB-MISSING intent: member-missing intent",
      "HB-MISSING artifact.package: member-missing artifact.package",
      "HB-MISSING artifact.export: member-missing artifact.export",
      "HB-MISSING artifact.sha256: member-missing artifact.sha256",
      "HB-MISSING artifact.descriptorSha256: member-missing artifact.descriptorSha256",
      "HB-MISSING source.workspaceRealpath: member-missing source.workspaceRealpath",
      "HB-MISSING source.baseCommit: member-missing source.baseCommit",
      "HB-MISSING source.baseTree: member-missing source.baseTree",
      "HB-MISSING source.forgeManifestSha256: member-missing source.forgeManifestSha256",
      "HB-MISSING intent.task: member-missing intent.task",
      "HB-MISSING intent.writer: member-missing intent.writer",
      "HB-MISSING intent.allowedEffects: member-missing intent.allowedEffects",
      "HB-UNEXPECTED binding: member-unexpected binding",
      "HB-UNEXPECTED artifact: member-unexpected artifact",
      "HB-UNEXPECTED source: member-unexpected source",
      "HB-UNEXPECTED intent: member-unexpected intent",
      "HB-NOT-OBJECT binding: not-an-object binding",
      "HB-NOT-OBJECT artifact: not-an-object artifact",
      "HB-NOT-OBJECT source: not-an-object source",
      "HB-NOT-OBJECT intent: not-an-object intent",
      "HB-LEAF contract number: member-invalid contract",
      "HB-LEAF contract const: version-unsupported contract",
      "HB-LEAF descriptorId number: member-invalid descriptorId",
      "HB-LEAF descriptorId const: member-invalid descriptorId",
      "HB-LEAF artifact.package number: member-invalid artifact.package",
      "HB-LEAF artifact.package const: member-invalid artifact.package",
      "HB-LEAF artifact.export number: member-invalid artifact.export",
      "HB-LEAF artifact.export const: member-invalid artifact.export",
      "HB-LEAF artifact.sha256 number: member-invalid artifact.sha256",
      "HB-LEAF artifact.sha256 pattern: member-invalid artifact.sha256",
      "HB-LEAF artifact.descriptorSha256 number: member-invalid artifact.descriptorSha256",
      "HB-LEAF artifact.descriptorSha256 pattern: member-invalid artifact.descriptorSha256",
      "HB-LEAF source.workspaceRealpath number: member-invalid source.workspaceRealpath",
      "HB-LEAF source.workspaceRealpath pattern: member-invalid source.workspaceRealpath",
      "HB-LEAF source.baseCommit number: member-invalid source.baseCommit",
      "HB-LEAF source.baseCommit pattern: member-invalid source.baseCommit",
      "HB-LEAF source.baseTree number: member-invalid source.baseTree",
      "HB-LEAF source.baseTree pattern: member-invalid source.baseTree",
      "HB-LEAF source.forgeManifestSha256 number: member-invalid source.forgeManifestSha256",
      "HB-LEAF source.forgeManifestSha256 pattern: member-invalid source.forgeManifestSha256",
      "HB-LEAF invocationId number: member-invalid invocationId",
      "HB-LEAF invocationId minLength: member-invalid invocationId",
      "HB-LEAF evidenceProfile number: profile-unknown evidenceProfile",
      "HB-LEAF evidenceProfile enum: profile-unknown evidenceProfile",
      "HB-LEAF contextProfile number: profile-unknown contextProfile",
      "HB-LEAF contextProfile enum: profile-unknown contextProfile",
      "HB-LEAF intent.task number: member-invalid intent.task",
      "HB-LEAF intent.task minLength: member-invalid intent.task",
      "HB-LEAF intent.writer number: member-invalid intent.writer",
      "HB-LEAF intent.writer const: member-invalid intent.writer",
      "HB-LEAF intent.allowedEffects number: member-invalid intent.allowedEffects",
      "HB-LEAF intent.allowedEffects items: member-invalid intent.allowedEffects",
      "HB-LEAF intent.allowedEffects items-number: member-invalid intent.allowedEffects",
    ]);
  });

  it("HB-COVERAGE each outside source's forms have their rows: the schema's paths, the transport host modes, the profile enums, the descriptor members, a real reply's members, the protocol document's two spellings, the two other contracts, the schema contract's variants and the artifact digests moved", () => {
    const ids = new Set(ALL_ROWS.map(row => row.id));
    const deltas = new Set(ALL_ROWS.map(row => deltaOf(row.plant())));
    expect(owedIds().filter(id => !ids.has(id))).toEqual([]);
    expect(owedDeltas().filter(delta => !deltas.has(delta))).toEqual([]);
  });

  it("HB-SEAT-FORMS (R-SEAT-FORMS quiet row) the requirement rows no outside source owes are the listed seat-chosen forms", () => {
    const ids = new Set(owedIds());
    const deltas = new Set(owedDeltas());
    expect(REQUIREMENT_ROWS.filter(row => !ids.has(row.id) && !deltas.has(deltaOf(row.plant()))).map(row => row.id)).toEqual([
      "HB-R006-VERSION-FIRST",
      "HB-R006-UNKNOWN-MEMBER",
      "HB-R006-DEFINITION-OTHER",
      "HB-R006-DEFINITION-SCRIPT",
      "HB-R005-BOTH-INSTEAD",
      "HB-R148-CONTEXT-NOT-DEFAULTED",
      "HB-R149-RESULT-MODE-BESIDE",
      "HB-R149-RESULT-MODE-ONLY",
      "HB-R150-TOOL-REPLY-RECORD",
      "HB-R150-DESCRIPTOR-RECORD",
      "HB-R150-DIGEST-TO-TOP",
      "HB-R150-NOT-OBJECT-NULL",
      "HB-R150-NOT-OBJECT-LIST",
    ]);
  });

  it("HB-LEDGER the landed status ledger assigns wb-w8fk exactly the requirements the rows tag, plus EAT-R151, which is not claimed", () => {
    const assigned = LEDGER.rows.filter(row => row.bead === "wb-w8fk").map(row => String(row.id));
    expect(assigned).toEqual([...new Set([...REQUIREMENT_ROWS.map(row => row.req), "EAT-R151"])].sort());
  });

  it("HB-DIAGNOSTIC every refusal is a frozen closed-vocabulary diagnostic holding no planted text", () => {
    const failures: string[] = [];
    for (const row of ALL_ROWS) {
      const verdict = validateMechanicalHostBinding(row.plant());
      if (verdict.ok) {
        failures.push(`${row.id}: admitted`);
        continue;
      }
      const { diagnostic } = verdict;
      const text = JSON.stringify(diagnostic);
      if (Reflect.ownKeys(diagnostic).join(",") !== "code,field,reason") failures.push(`${row.id}: keys ${Reflect.ownKeys(diagnostic).map(String).join(",")}`);
      if (!Object.isFrozen(diagnostic) || !Object.isFrozen(verdict)) failures.push(`${row.id}: not frozen`);
      if (diagnostic.code !== "mechanical-host-binding-refused") failures.push(`${row.id}: code ${diagnostic.code}`);
      if (!MECHANICAL_HOST_BINDING_REASONS.some(reason => reason === diagnostic.reason)) failures.push(`${row.id}: reason ${diagnostic.reason}`);
      if (!MECHANICAL_HOST_BINDING_FIELDS.some(field => field === diagnostic.field)) failures.push(`${row.id}: field ${diagnostic.field}`);
      for (const marker of MARKERS) if (text.includes(marker)) failures.push(`${row.id}: carries ${marker}`);
    }
    expect(failures).toEqual([]);
  });

  it("HB-STANDING the binding stands proposed, blocked on MW-CONTRACT, and the function action stays unadopted", () => {
    expect([MECHANICAL_HOST_BINDING_STANDING, Object.isFrozen(MECHANICAL_HOST_BINDING_STANDING), FUNCTION_ACTION_CONTRACT.state]).toEqual([{ state: "proposed", blockedOn: "MW-CONTRACT" }, true, "unadopted"]);
  });
});
