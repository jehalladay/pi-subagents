/**
 * mechanical-descriptor.ts — the one Pi boundary for MechanicalWorkflows' published entrypoint descriptor and the packed
 * artifact it names (wb-ocie; mechanical-workflows-interop-2026-11-04 B-descriptor, requirements EAT-R007..EAT-R011, slice PI-0).
 *
 * MechanicalWorkflows' descriptor of record is contracts/entrypoints/development.v1.json (schema mechanical-workflows/entrypoint/v1,
 * status descriptor-only): metadata naming one deployable function, its package and export, its input and output schemas by bare
 * file name and its four application bindings. A descriptor is metadata, never executable authority. This boundary admits an
 * entrypoint in two phases, and every refusal is a closed-vocabulary diagnostic (code, field, reason) that never echoes a path, a
 * member value or file text:
 *
 * resolveMechanicalEntrypoint (validation), first refusal wins:
 *  - the release pin is two sha256:<64 lower-case hex> digests, the descriptor bytes' and the artifact bytes', checked before any
 *    file is read;
 *  - EAT-R007: the descriptor is read from its FILE as bytes, and their SHA-256 is compared with the pin before anything is
 *    parsed, so a byte-different file is refused even when its JSON content is equal; no entry point takes a descriptor object;
 *  - the bytes decode as UTF-8 and parse as one JSON object; the entrypoint schema version is judged first (only
 *    mechanical-workflows/entrypoint/v1); the member set is the producer file's own and closed (note is the one optional member,
 *    a string that is never read further), and implementation is the closed pair {package, export};
 *  - EAT-R010: the id, the package and the export are each compared with the FIXED allowlist MECHANICAL_REVIEWED_ENTRYPOINTS, so
 *    an accepted id resolves exactly one reviewed entry, and no string the descriptor spells is ever handed to a loader;
 *  - EAT-R009: each schema reference is a bare canonical file name (MECHANICAL_SCHEMA_REF_PATTERN: no directory or dot segment, no
 *    scheme, no separator of either kind) equal to the reviewed name; nothing is normalized, so a traversal never collapses into
 *    an accepted basename;
 *  - the bindings are the reviewed four, in order, and the status is descriptor-only;
 *  - EAT-R011 and EAT-R008: the approved root and the artifact are each resolved by realpath; the artifact must lie strictly inside
 *    the root by a separator-bounded relative path (realpath against realpath, so a root named through a link reads as its
 *    target, and a sibling sharing the root's name as a prefix is outside it), must be a regular file, opened without following
 *    a final link, and the SHA-256 of the bytes read must equal the pin.
 *
 * loadMechanicalEntrypoint (load): only a resolution this module minted is loadable. Immediately before the host loader runs, the
 * artifact is resolved and measured AGAIN: an artifact now outside the root is refused outside-root, a root or artifact whose
 * realpath changed since validation changed, and bytes that no longer hash to the pin digest-mismatch. The loader then runs once,
 * with the reviewed entry and the bytes just measured (a host that loads from those bytes never re-reads the path), and the
 * boundary reads the reviewed export name, never a descriptor string, from what it returns. A loader that throws propagates:
 * importing packed code executes trusted application code, so an unclear load is the host's to classify and is never retried
 * here. The boundary never calls the export, so it makes no provider call.
 *
 * NOT CLAIMED (explicitly partial; closure gate MW-INSTALLED-CONSUMER, external MW-CONTRACT and MW-PACKAGE): where the pin comes
 * from (MechanicalWorkflows publishes no release manifest at f7c0a943, so the host supplies the pin); that an installed package or
 * a published tarball was read; the invocation contract and its version (B-contract-choice, EAT-R005 and EAT-R006); dispatch,
 * grants, source admission and outcome validation; and the window between the load-phase measurement and a host that re-opens the
 * path instead of using the measured bytes.
 */
import { createHash } from "node:crypto";
import { constants } from "node:fs";
import { type FileHandle, open, readFile, realpath, stat } from "node:fs/promises";
import { isAbsolute, relative, sep } from "node:path";

/** The one entrypoint descriptor schema version this boundary reads. */
export const MECHANICAL_ENTRYPOINT_SCHEMA = "mechanical-workflows/entrypoint/v1";
/** The one descriptor status this boundary admits: the producer's own descriptor-only metadata status. */
export const MECHANICAL_DESCRIPTOR_STATUS = "descriptor-only";
/** The descriptor's closed member set, in the producer file's order; note is the one optional member. */
export const MECHANICAL_DESCRIPTOR_MEMBERS = ["schema", "id", "implementation", "inputSchema", "outputSchema", "bindings", "status", "note"] as const;
const OPTIONAL_MEMBERS: readonly string[] = ["note"];
const IMPLEMENTATION_MEMBERS = ["package", "export"] as const;
/** The canonical schema-reference grammar: one bare file name, lower-case, opening with a letter or digit, ending .schema.json. */
export const MECHANICAL_SCHEMA_REF_PATTERN = /^[a-z0-9][a-z0-9.-]*\.schema\.json$/;
/** A release-pin digest: the SHA-256 of exact bytes, lower-case hex. */
export const MECHANICAL_DIGEST_PATTERN = /^sha256:[0-9a-f]{64}$/;

/** One reviewed entrypoint: the only package, export, schema names and bindings an admitted descriptor may carry for its id. */
export interface MechanicalReviewedEntrypoint {
  readonly id: string;
  readonly package: string;
  readonly export: string;
  readonly inputSchema: string;
  readonly outputSchema: string;
  readonly bindings: readonly string[];
}
/** The FIXED allowlist: each id resolves exactly one reviewed entry, and that entry names exactly one host export. */
export const MECHANICAL_REVIEWED_ENTRYPOINTS: readonly MechanicalReviewedEntrypoint[] = Object.freeze([
  Object.freeze({
    id: "mechanical.development.develop.v1",
    package: "@mechanical/workflows-development",
    export: "develop",
    inputSchema: "development-request.v1.schema.json",
    outputSchema: "development-outcome.v1.schema.json",
    bindings: Object.freeze(["discover", "compileContext", "implement", "verify"]),
  }),
]);

/** Where a refusal sits: the pin, the descriptor as a whole or one of its members, the root, the artifact, the resolution or what the loader returned. */
export const MECHANICAL_ENTRYPOINT_FIELDS = [
  "pin", "descriptor", "schema", "id", "implementation", "package", "export", "inputSchema", "outputSchema", "bindings", "status", "note",
  "root", "artifact", "resolution", "loaded",
] as const;
export type MechanicalEntrypointField = (typeof MECHANICAL_ENTRYPOINT_FIELDS)[number];
/** Why: the closed refusal vocabulary. */
export const MECHANICAL_ENTRYPOINT_REASONS = [
  "pin-malformed", "unreadable", "digest-mismatch", "malformed", "wrong-type", "member-unexpected", "member-missing", "schema-unsupported",
  "not-allowlisted", "schema-ref-noncanonical", "schema-ref-unknown", "bindings-mismatch", "status-unsupported", "not-a-file", "outside-root",
  "changed", "unresolved", "export-missing",
] as const;
export type MechanicalEntrypointReason = (typeof MECHANICAL_ENTRYPOINT_REASONS)[number];
/** One refusal: closed vocabulary only, never a path, a member value or file text. */
export interface MechanicalEntrypointDiagnostic {
  readonly code: "mechanical-entrypoint-refused";
  readonly field: MechanicalEntrypointField;
  readonly reason: MechanicalEntrypointReason;
}

/** The pin the host holds for one release: the SHA-256 of the exact descriptor bytes and of the exact artifact bytes. */
export interface MechanicalReleasePin {
  readonly descriptorDigest: string;
  readonly artifactDigest: string;
}
/** What the host hands the boundary: the descriptor FILE, the artifact, the root the artifact must resolve inside, and the pin. */
export interface MechanicalEntrypointOptions {
  readonly descriptorPath: string;
  readonly artifactPath: string;
  readonly approvedRoot: string;
  readonly pin: MechanicalReleasePin;
}
/** The artifact as validation measured it: the root's and the artifact's realpaths and the digest of the bytes read. */
export interface MechanicalArtifactMeasure {
  readonly root: string;
  readonly realPath: string;
  readonly digest: string;
}
/** The artifact as the load phase hands it to the host loader: re-measured, with the very bytes that were hashed. */
export interface MechanicalLoadableArtifact {
  readonly realPath: string;
  readonly digest: string;
  readonly bytes: Uint8Array;
}
/** A validated entrypoint; loadMechanicalEntrypoint loads only one this module minted. */
export interface MechanicalResolvedEntrypoint {
  readonly entry: MechanicalReviewedEntrypoint;
  readonly descriptorDigest: string;
  readonly artifact: MechanicalArtifactMeasure;
}
export type MechanicalEntrypointResolution =
  | { readonly ok: true; readonly resolved: MechanicalResolvedEntrypoint }
  | { readonly ok: false; readonly diagnostic: MechanicalEntrypointDiagnostic };
/** The host's loader: it receives the reviewed entry and the re-measured artifact, never a string the descriptor spelled. */
export type MechanicalExportLoader = (entry: MechanicalReviewedEntrypoint, artifact: MechanicalLoadableArtifact) => Promise<unknown>;
/** The reviewed export as loaded; the boundary never calls it. */
export type MechanicalExportFunction = (...args: never[]) => unknown;
export type MechanicalEntrypointLoad =
  | {
      readonly ok: true;
      readonly entry: MechanicalReviewedEntrypoint;
      readonly artifact: MechanicalArtifactMeasure;
      readonly exported: MechanicalExportFunction;
    }
  | { readonly ok: false; readonly diagnostic: MechanicalEntrypointDiagnostic };

type Refusal = { readonly ok: false; readonly diagnostic: MechanicalEntrypointDiagnostic };
const refused = (field: MechanicalEntrypointField, reason: MechanicalEntrypointReason): Refusal => ({
  ok: false,
  diagnostic: Object.freeze({ code: "mechanical-entrypoint-refused", field, reason }),
});
const plain = (value: unknown): value is Readonly<Record<string, unknown>> => typeof value === "object" && value !== null && !Array.isArray(value);
const isDigest = (value: unknown): value is string => typeof value === "string" && MECHANICAL_DIGEST_PATTERN.test(value);
const digestOf = (bytes: Uint8Array): string => `sha256:${createHash("sha256").update(bytes).digest("hex")}`;
const isExportFunction = (value: unknown): value is MechanicalExportFunction => typeof value === "function";
const UTF8 = new TextDecoder("utf-8", { fatal: true });
/** O_NOFOLLOW where the platform has it: a final link swapped in after realpath makes the open fail instead of being followed. */
const READ_FLAGS = constants.O_RDONLY | (constants.O_NOFOLLOW ?? 0);

/** What load re-measures against: the request as validated, held privately so a resolution cannot be forged or retargeted. */
interface MintedResolution {
  readonly artifactPath: string;
  readonly approvedRoot: string;
  readonly artifactDigest: string;
}
const MINTED = new WeakMap<MechanicalResolvedEntrypoint, MintedResolution>();

/** The one reviewed entry for an id, or undefined when the allowlist holds none (or, never by construction, more than one). */
function reviewedEntry(id: string): MechanicalReviewedEntrypoint | undefined {
  const matches = MECHANICAL_REVIEWED_ENTRYPOINTS.filter(entry => entry.id === id);
  return matches.length === 1 ? matches[0] : undefined;
}

/** A schema reference: a string in the canonical grammar, then exactly the reviewed name; nothing is normalized first. */
function schemaRefRefusal(field: "inputSchema" | "outputSchema", ref: unknown, reviewed: string): Refusal | undefined {
  if (typeof ref !== "string") return refused(field, "wrong-type");
  if (!MECHANICAL_SCHEMA_REF_PATTERN.test(ref)) return refused(field, "schema-ref-noncanonical");
  if (ref !== reviewed) return refused(field, "schema-ref-unknown");
  return undefined;
}

const sameBindings = (value: unknown, reviewed: readonly string[]): boolean =>
  Array.isArray(value) && value.length === reviewed.length && value.every((binding: unknown, index) => binding === reviewed[index]);

/** Read one parsed descriptor against the allowlist, member by member in the producer file's order; the first refusal wins. */
function readDescriptor(value: unknown): { readonly ok: true; readonly entry: MechanicalReviewedEntrypoint } | Refusal {
  if (!plain(value)) return refused("descriptor", "wrong-type");
  if (!Object.hasOwn(value, "schema") || value.schema !== MECHANICAL_ENTRYPOINT_SCHEMA) return refused("schema", "schema-unsupported");
  const members: readonly string[] = MECHANICAL_DESCRIPTOR_MEMBERS;
  for (const key of Object.keys(value)) if (!members.includes(key)) return refused("descriptor", "member-unexpected");
  for (const name of MECHANICAL_DESCRIPTOR_MEMBERS) if (!OPTIONAL_MEMBERS.includes(name) && !Object.hasOwn(value, name)) return refused(name, "member-missing");
  const { id, implementation, inputSchema, outputSchema, bindings, status } = value;
  if (typeof id !== "string") return refused("id", "wrong-type");
  const entry = reviewedEntry(id);
  if (entry === undefined) return refused("id", "not-allowlisted");
  if (!plain(implementation)) return refused("implementation", "wrong-type");
  const implementationMembers: readonly string[] = IMPLEMENTATION_MEMBERS;
  for (const key of Object.keys(implementation)) if (!implementationMembers.includes(key)) return refused("implementation", "member-unexpected");
  for (const name of IMPLEMENTATION_MEMBERS) if (!Object.hasOwn(implementation, name)) return refused("implementation", "member-missing");
  if (implementation.package !== entry.package) return refused("package", "not-allowlisted");
  if (implementation.export !== entry.export) return refused("export", "not-allowlisted");
  const inputRefusal = schemaRefRefusal("inputSchema", inputSchema, entry.inputSchema);
  if (inputRefusal !== undefined) return inputRefusal;
  const outputRefusal = schemaRefRefusal("outputSchema", outputSchema, entry.outputSchema);
  if (outputRefusal !== undefined) return outputRefusal;
  if (!sameBindings(bindings, entry.bindings)) return refused("bindings", "bindings-mismatch");
  if (status !== MECHANICAL_DESCRIPTOR_STATUS) return refused("status", "status-unsupported");
  if (Object.hasOwn(value, "note") && typeof value.note !== "string") return refused("note", "wrong-type");
  return { ok: true, entry };
}

/** Strictly inside: a relative path from the root that is neither empty, nor the parent, nor under it, nor absolute. */
function insideRoot(root: string, path: string): boolean {
  const rel = relative(root, path);
  return rel !== "" && rel !== ".." && !rel.startsWith(`..${sep}`) && !isAbsolute(rel);
}

/** The bytes of a regular file at a realpath: checked as a file before it is opened, opened without following a final link. */
async function readRegularFile(path: string): Promise<{ readonly ok: true; readonly bytes: Buffer } | Refusal> {
  try {
    if (!(await stat(path)).isFile()) return refused("artifact", "not-a-file");
  } catch {
    return refused("artifact", "unreadable");
  }
  let handle: FileHandle | undefined;
  try {
    handle = await open(path, READ_FLAGS);
    if (!(await handle.stat()).isFile()) return refused("artifact", "not-a-file");
    return { ok: true, bytes: await handle.readFile() };
  } catch {
    return refused("artifact", "unreadable");
  } finally {
    await handle?.close().catch(() => undefined);
  }
}

interface ArtifactReading extends MechanicalArtifactMeasure {
  readonly ok: true;
  readonly bytes: Buffer;
}
/**
 * Resolve and measure the artifact: the root and the artifact by realpath, containment, then (at load) the realpaths validation
 * recorded, then a regular file whose bytes hash to the pin.
 */
async function measureArtifact(artifactPath: string, approvedRoot: string, pinned: string, validated?: MechanicalArtifactMeasure): Promise<ArtifactReading | Refusal> {
  let root: string;
  try {
    root = await realpath(approvedRoot);
  } catch {
    return refused("root", "unreadable");
  }
  let realPath: string;
  try {
    realPath = await realpath(artifactPath);
  } catch {
    return refused("artifact", "unreadable");
  }
  if (!insideRoot(root, realPath)) return refused("artifact", "outside-root");
  if (validated !== undefined && (root !== validated.root || realPath !== validated.realPath)) return refused("artifact", "changed");
  const read = await readRegularFile(realPath);
  if (!read.ok) return read;
  const digest = digestOf(read.bytes);
  if (digest !== pinned) return refused("artifact", "digest-mismatch");
  return { ok: true, root, realPath, digest, bytes: read.bytes };
}

/** Validation: the pin, the exact descriptor bytes, the descriptor against the allowlist, then the artifact (see the header). */
export async function resolveMechanicalEntrypoint(options: MechanicalEntrypointOptions): Promise<MechanicalEntrypointResolution> {
  const { descriptorDigest, artifactDigest } = options.pin;
  if (!isDigest(descriptorDigest) || !isDigest(artifactDigest)) return refused("pin", "pin-malformed");
  let bytes: Buffer;
  try {
    bytes = await readFile(options.descriptorPath);
  } catch {
    return refused("descriptor", "unreadable");
  }
  if (digestOf(bytes) !== descriptorDigest) return refused("descriptor", "digest-mismatch");
  let value: unknown;
  try {
    value = JSON.parse(UTF8.decode(bytes));
  } catch {
    return refused("descriptor", "malformed");
  }
  const reading = readDescriptor(value);
  if (!reading.ok) return reading;
  const measured = await measureArtifact(options.artifactPath, options.approvedRoot, artifactDigest);
  if (!measured.ok) return measured;
  const resolved: MechanicalResolvedEntrypoint = Object.freeze({
    entry: reading.entry,
    descriptorDigest,
    artifact: Object.freeze({ root: measured.root, realPath: measured.realPath, digest: measured.digest }),
  });
  MINTED.set(resolved, Object.freeze({ artifactPath: options.artifactPath, approvedRoot: options.approvedRoot, artifactDigest }));
  return { ok: true, resolved };
}

/** The reviewed export read off what the loader returned, by the reviewed name only, when it is an own function member. */
function reviewedExport(namespace: unknown, name: string): MechanicalExportFunction | undefined {
  if ((typeof namespace !== "object" && typeof namespace !== "function") || namespace === null || !Object.hasOwn(namespace, name)) return undefined;
  const value: unknown = Reflect.get(namespace, name);
  return isExportFunction(value) ? value : undefined;
}

/** Load: revalidate the minted resolution's artifact, run the host loader once with the re-measured bytes, read the reviewed export. */
export async function loadMechanicalEntrypoint(resolved: MechanicalResolvedEntrypoint, loader: MechanicalExportLoader): Promise<MechanicalEntrypointLoad> {
  const minted = MINTED.get(resolved);
  if (minted === undefined) return refused("resolution", "unresolved");
  const measured = await measureArtifact(minted.artifactPath, minted.approvedRoot, minted.artifactDigest, resolved.artifact);
  if (!measured.ok) return measured;
  const namespace = await loader(resolved.entry, Object.freeze({ realPath: measured.realPath, digest: measured.digest, bytes: measured.bytes }));
  const exported = reviewedExport(namespace, resolved.entry.export);
  if (exported === undefined) return refused("loaded", "export-missing");
  return { ok: true, entry: resolved.entry, artifact: resolved.artifact, exported };
}

/** The host's one-shot admission: validation, then load, the first refusal returned as is. */
export async function admitMechanicalEntrypoint(options: MechanicalEntrypointOptions, loader: MechanicalExportLoader): Promise<MechanicalEntrypointLoad> {
  const resolution = await resolveMechanicalEntrypoint(options);
  if (!resolution.ok) return resolution;
  return loadMechanicalEntrypoint(resolution.resolved, loader);
}
