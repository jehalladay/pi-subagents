/**
 * mechanical-coordination.ts — the Pi boundary for MechanicalWorkflows' one published pure coordination export (wb-0gbh;
 * mechanical-workflows-interop-2026-11-04 B-coordination, slice PI-7, requirements EAT-R071 and EAT-R072). Each claim below
 * names the cases of test/workbench-mechanical-coordination.test.ts that pin it.
 *
 * FORM: ENUMERATED, NOT GENERAL. Each step below is claimed for exactly the forms the cases it cites plant: a planted form the
 * cited case reads as admitted is claimed admitted, and a planted form it reads as refused is claimed refused with the field
 * and reason the step names. A form no cited case plants is NOT CLAIMED, whatever a step's wording seems to cover; the code's
 * rule is described beside each step so a reader can find it, and the description is not a claim beyond the planted forms.
 *
 * THE READ WINDOW (every count claimed below). The suite fakes setTimeout, setInterval and setImmediate around each call it
 * plants and reads the call's counts (grant reads, loader calls, export calls, other exports' calls, provider handle calls and
 * getter runs) only after the call has returned or thrown and every timer it scheduled has run, so a call deferred through
 * one of those timers, a microtask or a next tick is counted (C-SETTLE reads a call a planted loader defers in each of those
 * five ways, the setTimeout by sixty seconds). The grant read, the loader, every namespace function, every provider handle and
 * every getter a case hands the boundary are then sealed: a call after the read is recorded, and C-LATE, the suite's last
 * case, reads that none was made (and reads a planted late call).
 *
 * THE REVIEWED CONTRACT. MECHANICAL_COORDINATION_REVIEWED_DIGESTS holds the SHA-256 of the three files MechanicalWorkflows
 * publishes for its pure coordination export, at origin/main 469ee2e5: contracts/entrypoints/coordination-reconcile.v1.json
 * (the descriptor) and the input and output schema files it names. C-1 holds the suite's vendored copies of the three files to
 * their git blob ids and these digests, and MECHANICAL_COORDINATION_ENTRY to the descriptor's id, export and schema names. The
 * boundary trusts no other bytes: the producer's descriptor and schemas are read from the host's files on every call, and a
 * file whose bytes are not the reviewed ones refuses. Of the member names and enum values the two schema files define, the
 * module's code (its identifiers and string literals; comments aside) spells exactly the fifteen C-SPELLING lists: the members
 * the basis and budget echo reads (basis, workspaceId, revision, budget, compute, workers, queue and latencyMs), the
 * resolution members its result type names (admitted, rejected, conflicts and budgetUsed), authority and code, which it spells
 * as the observation's and the diagnostic's own members, and target, a local name of its schema judge. It spells no enum value
 * of either file, and judges every other part of a value by the schema it read, through the keywords C-KEYWORDS lists. Its
 * comments name schema words as prose, the enum value authorized-effect among them (steps 4 and 9).
 *
 * invokeMechanicalCoordination judges the steps below in order, and at the multi-fault calls C-ORDER plants the earliest failing
 * step's refusal is returned. It returns {ok, diagnostic} or {ok, observation}: an object of Object.prototype whose own keys
 * are exactly those two, each an enumerable data member. A diagnostic is {code: "mechanical-coordination-refused", field,
 * reason}, frozen, of Object.prototype, not a proxy, whose own keys (Reflect.ownKeys: string or symbol, enumerable or not) are
 * exactly those three, each an enumerable data member holding a string, field and reason from MECHANICAL_COORDINATION_FIELDS
 * and MECHANICAL_COORDINATION_REASONS, so it carries no path, member value or file text (readingOf in every refusal case;
 * C-VOCABULARY, C-TALLY). An error the loader or the export throws propagates (L-THROWS).
 *  1. The separate read-only grant (EAT-R071). The host's grant read is called once, as the host's method with no argument
 *     (G-1, G-FIRST; every planted call reads its arguments). Admitted: a read holding MECHANICAL_COORDINATION_GRANT,
 *     workbench:coordinate, alone or beside workbench:execute in either order, with the same observation (G-1, G-3). Refused
 *     missing-coordination-grant: workbench:execute, the blanket write grant function dispatch rests on, held alone (G-2, the
 *     mutant "reuse blanket write grant"); the empty list; and each of the 24 stand-ins G-STANDINS plants in the coordination
 *     grant's place, alone and beside workbench:execute. Refused unknown-permission-data: the 12 reads G-UNKNOWN plants. (The
 *     rule: an array of strings holding the grant by strict equality.) At G-FIRST's call (no coordination grant, a missing
 *     descriptor, schema directory and artifact, a malformed pin and an input of getters) the grant refusal returns with no
 *     input getter run, no loader call and no provider handle or other export called.
 *  2. The pin. Refused pin-malformed: the 13 artifact pins P-1 plants. (The rule: a string in MECHANICAL_DIGEST_PATTERN, the
 *     descriptor boundary's grammar.)
 *  3. The descriptor FILE. Refused descriptor unreadable: a missing path; not-a-file: a directory and a FIFO, read without
 *     blocking (D-READ). Refused digest-mismatch, with zero loader calls: the 19 byte-different descriptors D-DIGEST plants (the
 *     producer's JSON re-rendered, compacted, after a byte order mark, one member edited, extended or left out, among them
 *     another export, the development descriptor) and, in D-EXPORT, the producer descriptor naming as its export each of 16
 *     value exports of the coordination package other than reconcile (OTHER_EXPORTS, a subset of the package's value exports;
 *     how many the package holds is NOT CLAIMED) and each of 12 near spellings of reconcile (the mutant "allow arbitrary
 *     coordination exports").
 *  4. The two schema FILES, the descriptor's input and output schema names inside the host's schema directory, in that order.
 *     Refused unreadable under inputSchema or outputSchema: a missing directory and a missing file; not-a-file: a directory and a
 *     FIFO in a file's place (S-READ). Refused digest-mismatch: the 6 byte-different schema files S-DIGEST plants (each schema
 *     re-rendered, the other schema in its place, the input schema with a closed object opened, the output schema letting an
 *     admitted intent declare authorized-effect).
 *  5. The input, before any load. Refused input not-serialized-data, with no getter run: the 27 forms I-DATA plants (a function
 *     as the input, as memory, as a target uri, as a trace detail, as a list's second element, as an extra member and as an own
 *     toJSON: the "callable inputs" rows; a symbol, a bigint, undefined, NaN, either infinity, an accessor, a non-enumerable and
 *     a symbol-keyed member, a hole, an extra list member, a list subclass, a Date, a Map, a boxed string, a byte array, a class
 *     instance, a container shared by two proposals, a claim shared by two intents and a cycle). Admitted: the 9 forms I-DATA-OK
 *     plants. Containers nested MECHANICAL_COORDINATION_MAX_DEPTH (64) deep are admitted and 65 deep refused (I-DEPTH). Then
 *     refused input schema-invalid: the 58 forms I-SCHEMA plants; admitted: the 7 forms I-SCHEMA-OK plants. (The rule: null, a
 *     boolean, a string, a finite number, or a list of Array.prototype whose own keys are its indices and length or a record of
 *     Object.prototype or null whose own keys are strings, every member an enumerable data property, no container reached
 *     twice; then the input schema judged on the input's JSON copy.)
 *  6. The artifact FILE. Refused artifact unreadable: a missing path; not-a-file: a directory and a FIFO (A-READ);
 *     digest-mismatch: one byte flipped after the pin was taken and the descriptor's digest as the artifact pin (A-DIGEST). The
 *     same bytes under another file name are admitted (L-1b).
 *  7. The host loader is called once, with no receiver and exactly two arguments: MECHANICAL_COORDINATION_ENTRY and a frozen
 *     {digest, bytes} of Object.prototype whose own keys are exactly those two, holding the exact file bytes and the pinned
 *     digest (L-1, and every admitted call admittedOf reads). Of the loader results L-EXPORT plants, an empty object, a
 *     reconcile that is a string, a number, an object or null, an inherited reconcile, one under default, null, undefined and a
 *     string refuse loaded export-missing; a function holding reconcile, a frozen and a null-prototype object are admitted; a
 *     reconcile accessor refuses export-missing with its getter never run (L-EXPORT-ACCESSOR). In every case no export but
 *     reconcile is called.
 *  8. The export is called once, with no receiver and exactly one argument: plain data equal to the input (every container
 *     reachable from it through any own key a list of Array.prototype or a record of Object.prototype holding only enumerable
 *     data members with string keys, none a function) that is not the caller's and shares no container with it, so a producer
 *     mutating its argument leaves the caller's input unchanged (R-ROUNDTRIP-COPIES, and every admitted call admittedOf reads).
 *  9. The result. Refused resolution not-serialized-data: the 10 forms O-DATA plants (a promise from an async reconcile, a
 *     function, undefined, an own toJSON, an accessor, a Date member, the budget object reused as budgetUsed, a cycle, NaN, a
 *     class instance) and an extra member making the resolution 65 containers deep, where 64 deep reads schema-invalid
 *     (I-DEPTH). Refused schema-invalid: the 20 forms O-SCHEMA plants, an admitted intent declaring authorized-effect among
 *     them (X-AUTHORIZED). Refused basis-mismatch and budget-mismatch: another workspaceId or revision, and another value in
 *     each of the four budget dimensions; another budgetUsed is admitted (O-ECHO).
 * 10. Admitted: the observation, of Object.prototype, whose own keys are exactly entry, authority, descriptorDigest,
 *     artifactDigest and resolution: the entry's id, MECHANICAL_COORDINATION_AUTHORITY (observation-only), the reviewed
 *     descriptor digest, the pinned artifact digest and a resolution equal to what the export returned and not that object.
 *     Every object reachable from it through any own key (string or symbol, enumerable or not) is frozen, not a proxy, a record
 *     of Object.prototype or a list of Array.prototype, and holds only enumerable data members with string keys (a list's
 *     length aside), none a function; it equals itself after a JSON round trip (R-ROUNDTRIP, R-ROUNDTRIP-COPIES, and readingOf
 *     in every admitted case).
 *
 * OBSERVATION, NEVER AUTHORITY (EAT-R072). A resolution is a proposal. At X-NO-EFFECT's call, whose resolution admits a Beads
 * close, a Forge publish and a Furnace start, the three intents come back as data in an observation-only observation, and with
 * a provider handle for each action and every exact effect grant planted on the host no handle is called within the read
 * window (the mutant "auto-execute policy output as a command"). In every call the suite plants, G-FIRST's and L-THROWS's
 * included, the suite's provider handles see no call within it. The module's exports are exactly the eight X-SURFACE lists, and
 * no export but invokeMechanicalCoordination is or holds a function through any own key, accessor or prototype; that function's
 * own keys are its length and name. It imports only the bindings X-IMPORTS lists (import and export-from declarations,
 * import-equals, import() and require, read through the TypeScript parser), and its code names none of the names X-NO-LOAD
 * lists (process, globalThis, eval, Function, constructor, fetch, the timers and the rest), so it reaches no process, module,
 * network, worker or timer facility through them. An effect needs a separate resolver and exact authority this module does
 * not provide.
 *
 * NOT CLAIMED (explicitly partial; closure gate PI-COORDINATION-INSTALLED, external MW-COORDINATION): that a packed or installed
 * coordination package was read (every case hands a scratch file standing in for the artifact and a loader that imports
 * nothing); where a production pin, schema directory or descriptor comes from; the producer's resolution semantics (which
 * intents are admitted); a grant read, pin or host whose read throws or runs code; a grant revoked after the grant read; where
 * the files lie and whether a path passes through a link; file sizes; a loader result whose member read runs code other than
 * the accessor L-EXPORT-ACCESSOR plants (a proxy); a call without an options object of plain data members, or with members
 * beyond the seven it reads; a call deferred through another clock (an abort signal's timeout, an atomics wait, a finalization
 * callback) that lands after C-LATE ran, and a getter or other function a case does not hand the boundary that runs after its
 * case's read; a facility reached through a member name computed at run time (X-NO-LOAD reads names as written); and any form
 * of a step above that its cited cases do not plant.
 */
import { createHash } from "node:crypto";
import { constants } from "node:fs";
import { type FileHandle, open } from "node:fs/promises";
import { join } from "node:path";
import { MECHANICAL_DIGEST_PATTERN } from "./mechanical-descriptor.js";

/** The separate read-only grant a coordination call needs; workbench:execute, the blanket write grant, never stands in for it. */
export const MECHANICAL_COORDINATION_GRANT = "workbench:coordinate";
/** The authority every observation carries: a proposal is data, never permission. */
export const MECHANICAL_COORDINATION_AUTHORITY = "observation-only";
/** Containers a serialized value may nest (the top-level container is the first). */
export const MECHANICAL_COORDINATION_MAX_DEPTH = 64;

/** The one reviewed pure coordination export: its descriptor id, its export and its two schema file names. */
export interface MechanicalCoordinationEntry {
  readonly id: string;
  readonly export: string;
  readonly inputSchema: string;
  readonly outputSchema: string;
}
export const MECHANICAL_COORDINATION_ENTRY: MechanicalCoordinationEntry = Object.freeze({
  id: "mechanical.coordination.reconcile.v1",
  export: "reconcile",
  inputSchema: "coordination-resolver-input.v1.schema.json",
  outputSchema: "coordination-resolution.v1.schema.json",
});
/** The SHA-256 of the producer's published descriptor and schema files at MechanicalWorkflows 469ee2e5 (C-1). */
export const MECHANICAL_COORDINATION_REVIEWED_DIGESTS: Readonly<Record<"descriptor" | "inputSchema" | "outputSchema", string>> = Object.freeze({
  descriptor: "sha256:cae5c213da467a75fd407106c17058318c3679c269f11478e0abaf8f88622acf",
  inputSchema: "sha256:d3a3e99e512a793c2f1158eb19c30e5c9562d16c4a4c32e2e81b97c016026238",
  outputSchema: "sha256:3838bb34f466797cdb7ca88d3fbca6296192bc13fc8eb5f9b7f7243f343c94ba",
});

/** Where a refusal sits. */
export const MECHANICAL_COORDINATION_FIELDS = ["grants", "pin", "descriptor", "inputSchema", "outputSchema", "input", "artifact", "loaded", "resolution"] as const;
export type MechanicalCoordinationField = (typeof MECHANICAL_COORDINATION_FIELDS)[number];
/** Why: the closed refusal vocabulary. */
export const MECHANICAL_COORDINATION_REASONS = [
  "unknown-permission-data", "missing-coordination-grant", "pin-malformed", "unreadable", "not-a-file", "digest-mismatch", "not-serialized-data",
  "schema-invalid", "export-missing", "basis-mismatch", "budget-mismatch",
] as const;
export type MechanicalCoordinationReason = (typeof MECHANICAL_COORDINATION_REASONS)[number];
/** One refusal: closed vocabulary only, never a path, a member value or file text. */
export interface MechanicalCoordinationDiagnostic {
  readonly code: "mechanical-coordination-refused";
  readonly field: MechanicalCoordinationField;
  readonly reason: MechanicalCoordinationReason;
}

/** JSON data as the serialized-data rule admits it. */
export type CoordinationJson = null | boolean | number | string | readonly CoordinationJson[] | { readonly [key: string]: CoordinationJson };
interface CoordinationBasis {
  readonly workspaceId: string;
  readonly revision: string;
}
interface CoordinationBudget {
  readonly compute: number;
  readonly workers: number;
  readonly queue: number;
  readonly latencyMs: number;
}
/** The members of a schema-valid input the boundary reads. */
interface CoordinationInputView {
  readonly basis: CoordinationBasis;
  readonly budget: CoordinationBudget;
}
/** A schema-valid resolution, in the members the boundary reads; the rest is the producer's data as its schema states it. */
export interface CoordinationResolution {
  readonly basis: CoordinationBasis;
  readonly budget: CoordinationBudget;
  readonly admitted: readonly CoordinationJson[];
  readonly rejected: readonly CoordinationJson[];
  readonly conflicts: readonly CoordinationJson[];
  readonly budgetUsed: CoordinationBudget;
}
/** What an admitted call returns: a frozen observation of the proposal, never an authorization. */
export interface MechanicalCoordinationObservation {
  readonly entry: string;
  readonly authority: typeof MECHANICAL_COORDINATION_AUTHORITY;
  readonly descriptorDigest: string;
  readonly artifactDigest: string;
  readonly resolution: CoordinationResolution;
}
export type MechanicalCoordinationResult =
  | { readonly ok: true; readonly observation: MechanicalCoordinationObservation }
  | { readonly ok: false; readonly diagnostic: MechanicalCoordinationDiagnostic };

/** The host's grant read (workbench.capabilityGrants), answered from host context. */
export interface MechanicalCoordinationHost {
  grants(): unknown;
}
/** The artifact as the loader receives it: the bytes the boundary measured and their digest. */
export interface MechanicalCoordinationArtifact {
  readonly digest: string;
  readonly bytes: Uint8Array;
}
/** The host's loader: it receives the reviewed entry and the measured artifact, and returns the loaded package's exports. */
export type MechanicalCoordinationLoader = (entry: MechanicalCoordinationEntry, artifact: MechanicalCoordinationArtifact) => Promise<unknown>;
export interface MechanicalCoordinationOptions {
  readonly host: MechanicalCoordinationHost;
  /** The producer's published descriptor file. */
  readonly descriptorPath: string;
  /** The directory holding the producer's published schema files under their published names. */
  readonly schemaDirectory: string;
  readonly artifactPath: string;
  /** The SHA-256 the host pins for the packed artifact's bytes. */
  readonly artifactDigest: string;
  readonly input: unknown;
  readonly loader: MechanicalCoordinationLoader;
}

/** One node of a published schema, in the keywords the boundary judges (C-KEYWORDS). */
interface SchemaNode {
  readonly $ref?: string;
  readonly type?: string;
  readonly additionalProperties?: boolean;
  readonly required?: readonly string[];
  readonly properties?: Readonly<Record<string, SchemaNode>>;
  readonly items?: SchemaNode;
  readonly minLength?: number;
  readonly minimum?: number;
  readonly enum?: readonly unknown[];
}
interface Schema extends SchemaNode {
  readonly $defs?: Readonly<Record<string, SchemaNode>>;
}

type Refusal = { readonly ok: false; readonly diagnostic: MechanicalCoordinationDiagnostic };
const refused = (field: MechanicalCoordinationField, reason: MechanicalCoordinationReason): Refusal => ({
  ok: false,
  diagnostic: Object.freeze({ code: "mechanical-coordination-refused", field, reason }),
});
const record = (value: unknown): value is Readonly<Record<string, unknown>> => typeof value === "object" && value !== null && !Array.isArray(value);
const digestOf = (bytes: Uint8Array): string => `sha256:${createHash("sha256").update(bytes).digest("hex")}`;
/** Non-blocking, so a FIFO opens and is judged by its handle instead of blocking the open. */
const READ_FLAGS = constants.O_RDONLY | constants.O_NONBLOCK;

/** Steps 3, 4 and 6's read: one handle, judged a regular file, read whole. */
async function readRegular(field: "descriptor" | "inputSchema" | "outputSchema" | "artifact", path: string): Promise<{ readonly ok: true; readonly bytes: Buffer } | Refusal> {
  let handle: FileHandle;
  try {
    handle = await open(path, READ_FLAGS);
  } catch {
    return refused(field, "unreadable");
  }
  try {
    if (!(await handle.stat()).isFile()) return refused(field, "not-a-file");
    return { ok: true, bytes: await handle.readFile() };
  } catch {
    return refused(field, "unreadable");
  } finally {
    await handle.close().catch(() => undefined);
  }
}
/** Steps 3 and 4: a file whose bytes are the reviewed ones, or the refusal. */
async function readReviewed(field: "descriptor" | "inputSchema" | "outputSchema", path: string): Promise<{ readonly ok: true; readonly bytes: Buffer } | Refusal> {
  const read = await readRegular(field, path);
  if (!read.ok) return read;
  return digestOf(read.bytes) === MECHANICAL_COORDINATION_REVIEWED_DIGESTS[field] ? read : refused(field, "digest-mismatch");
}

/** Step 1: the grant read as an array of strings, or undefined for unknown permission data. */
function grantList(value: unknown): readonly string[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const grants: unknown[] = Array.from(value);
  return grants.every((grant): grant is string => typeof grant === "string") ? grants : undefined;
}

/** An own data property's value, read through its descriptor so a getter never runs; undefined for anything else. */
function dataMember(holder: object, key: string): unknown {
  const descriptor = Object.getOwnPropertyDescriptor(holder, key);
  return descriptor !== undefined && Object.hasOwn(descriptor, "value") ? descriptor.value : undefined;
}

/** Step 5's serialized-data rule over one value at one depth; seen holds every container already reached. */
function serialized(value: unknown, depth: number, seen: Set<object>): boolean {
  if (value === null || typeof value === "string" || typeof value === "boolean") return true;
  if (typeof value === "number") return Number.isFinite(value);
  if (typeof value !== "object") return false;
  if (depth >= MECHANICAL_COORDINATION_MAX_DEPTH || seen.has(value)) return false;
  seen.add(value);
  const keys = Reflect.ownKeys(value);
  const members = (names: readonly string[]): boolean =>
    names.every(name => {
      const descriptor = Object.getOwnPropertyDescriptor(value, name);
      return descriptor !== undefined && descriptor.enumerable === true && Object.hasOwn(descriptor, "value") && serialized(descriptor.value, depth + 1, seen);
    });
  if (Array.isArray(value)) {
    if (Object.getPrototypeOf(value) !== Array.prototype || keys.length !== value.length + 1) return false;
    return members(Array.from({ length: value.length }, (_, index) => String(index)));
  }
  const prototype: unknown = Object.getPrototypeOf(value);
  if (prototype !== Object.prototype && prototype !== null) return false;
  const names: string[] = [];
  for (const key of keys) {
    if (typeof key !== "string") return false;
    names.push(key);
  }
  return members(names);
}
/** The JSON copy of a value the serialized-data rule admits, or undefined when it refuses it. */
function jsonCopy(value: unknown): CoordinationJson | undefined {
  if (!serialized(value, 0, new Set())) return undefined;
  return JSON.parse(JSON.stringify(value)) as CoordinationJson;
}

function typed(type: string, value: CoordinationJson): boolean {
  if (type === "object") return record(value);
  if (type === "array") return Array.isArray(value);
  return typeof value === type;
}
/** Steps 5 and 9's schema judgment of one JSON value against one node of a published schema. */
function conforms(schema: Schema, node: SchemaNode, value: CoordinationJson): boolean {
  if (node.$ref !== undefined) {
    const target = schema.$defs?.[node.$ref.slice("#/$defs/".length)];
    if (target === undefined) throw new Error("a reviewed schema holds an unresolved reference");
    return conforms(schema, target, value);
  }
  if (node.type !== undefined && !typed(node.type, value)) return false;
  if (node.minLength !== undefined && typeof value === "string" && Array.from(value).length < node.minLength) return false;
  if (node.minimum !== undefined && typeof value === "number" && value < node.minimum) return false;
  if (node.enum !== undefined && !node.enum.includes(value)) return false;
  const { items } = node;
  if (items !== undefined && Array.isArray(value) && !value.every(item => conforms(schema, items, item))) return false;
  if (!record(value)) return true;
  const properties = node.properties ?? {};
  if (node.required !== undefined && !node.required.every(name => Object.hasOwn(value, name))) return false;
  for (const [name, member] of Object.entries(value)) {
    const property = Object.hasOwn(properties, name) ? properties[name] : undefined;
    if (property === undefined) {
      if (node.additionalProperties === false) return false;
    } else if (!conforms(schema, property, member)) return false;
  }
  return true;
}

const BUDGET_DIMENSIONS = ["compute", "workers", "queue", "latencyMs"] as const;

function deepFreeze<T>(value: T): T {
  if (typeof value === "object" && value !== null && !Object.isFrozen(value)) {
    Object.freeze(value);
    for (const member of Object.values(value)) deepFreeze(member);
  }
  return value;
}

/** Steps 1 to 10 of the header: the first refusal, or the observation of one admitted call. */
export async function invokeMechanicalCoordination(options: MechanicalCoordinationOptions): Promise<MechanicalCoordinationResult> {
  const grants = grantList(options.host.grants());
  if (grants === undefined) return refused("grants", "unknown-permission-data");
  if (!grants.includes(MECHANICAL_COORDINATION_GRANT)) return refused("grants", "missing-coordination-grant");
  const artifactDigest: unknown = options.artifactDigest;
  if (typeof artifactDigest !== "string" || !MECHANICAL_DIGEST_PATTERN.test(artifactDigest)) return refused("pin", "pin-malformed");
  const descriptor = await readReviewed("descriptor", options.descriptorPath);
  if (!descriptor.ok) return descriptor;
  const entry = MECHANICAL_COORDINATION_ENTRY;
  const inputSchemaFile = await readReviewed("inputSchema", join(options.schemaDirectory, entry.inputSchema));
  if (!inputSchemaFile.ok) return inputSchemaFile;
  const outputSchemaFile = await readReviewed("outputSchema", join(options.schemaDirectory, entry.outputSchema));
  if (!outputSchemaFile.ok) return outputSchemaFile;
  // The reviewed bytes are the producer's published JSON (C-1), so they parse.
  const inputSchema = JSON.parse(inputSchemaFile.bytes.toString("utf8")) as Schema;
  const outputSchema = JSON.parse(outputSchemaFile.bytes.toString("utf8")) as Schema;
  const input = jsonCopy(options.input);
  if (input === undefined) return refused("input", "not-serialized-data");
  if (!conforms(inputSchema, inputSchema, input)) return refused("input", "schema-invalid");
  const artifact = await readRegular("artifact", options.artifactPath);
  if (!artifact.ok) return artifact;
  const measured = digestOf(artifact.bytes);
  if (measured !== artifactDigest) return refused("artifact", "digest-mismatch");
  const { loader } = options;
  const loaded = await loader(entry, Object.freeze({ digest: measured, bytes: artifact.bytes }));
  const exported = (typeof loaded === "object" && loaded !== null) || typeof loaded === "function" ? dataMember(loaded, entry.export) : undefined;
  if (typeof exported !== "function") return refused("loaded", "export-missing");
  const produced: unknown = exported(JSON.parse(JSON.stringify(input)));
  const resolution = jsonCopy(produced);
  if (resolution === undefined) return refused("resolution", "not-serialized-data");
  if (!conforms(outputSchema, outputSchema, resolution)) return refused("resolution", "schema-invalid");
  const given = input as unknown as CoordinationInputView;
  const result = resolution as unknown as CoordinationResolution;
  if (result.basis.workspaceId !== given.basis.workspaceId || result.basis.revision !== given.basis.revision) return refused("resolution", "basis-mismatch");
  if (BUDGET_DIMENSIONS.some(dimension => result.budget[dimension] !== given.budget[dimension])) return refused("resolution", "budget-mismatch");
  const observation: MechanicalCoordinationObservation = deepFreeze({
    entry: entry.id,
    authority: MECHANICAL_COORDINATION_AUTHORITY,
    descriptorDigest: MECHANICAL_COORDINATION_REVIEWED_DIGESTS.descriptor,
    artifactDigest,
    resolution: result,
  });
  return { ok: true, observation };
}
