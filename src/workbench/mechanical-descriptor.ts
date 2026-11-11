/**
 * mechanical-descriptor.ts — a Pi boundary for MechanicalWorkflows' published entrypoint descriptor and the packed artifact it
 * names (wb-ocie; mechanical-workflows-interop-2026-11-04 B-descriptor, requirements EAT-R007..EAT-R011, slice PI-0), and the
 * package admission that adds the producer's schema files (wb-y0n6; mechanical-native-interoperability-2026-11-09 packet P02).
 * Each claim below names the cases that pin it: the wb-ocie cases of test/workbench-mechanical-descriptor.test.ts, and the
 * wb-y0n6 cases (R217-*, R219-*, R222-*, R224-*) of test/workbench-mechanical-package.test.ts.
 *
 * FORM (respin cut #3: the enumerate-the-resolvable form under the R-B655 second-stage cap on these words): ENUMERATED, NOT
 * GENERAL. Each step below is claimed for exactly the forms the cases it cites plant (the suite's named tables are each frozen
 * by name, and each COMPUTED SCAN plants every code point of its range): a planted form the cited case reads as admitted is
 * claimed admitted, and a planted form it reads as refused is claimed refused with the field and reason the step names. A form
 * no cited case plants is NOT CLAIMED, whatever a step's wording seems to cover. A known form within these steps that the
 * boundary reads otherwise than its wording suggests is a named RESIDUAL with a pinned quiet row (RESIDUALS below); a form
 * found later is a residual-list addition, not a claim. The follow-up cut wb-mqpz (the R694 follow-up of the wb-ocie landing 1037
 * gate, its finding F1) cites five more cases, R007-21, R007-22, R008-13, R009-11 and R010-14, which plant the forms that gate
 * realized outside cut #3's tables (its witnesses WG01-WG05).
 *
 * The descriptor of record is MechanicalWorkflows' contracts/entrypoints/development.v1.json at f7c0a943, metadata naming one
 * deployable function, vendored byte-identical as the suite's fixture (R007-1). The boundary reads a descriptor as metadata only:
 * its members are judged as steps 4 to 6 state, and the loader is handed the reviewed allowlist entry, never a member the
 * descriptor spells (R007-2, R010-1).
 *
 * resolveMechanicalEntrypoint (validation) judges in this order and returns the first refusal (R007-13, R011-13). A refusal is
 * returned, never thrown, as {code: "mechanical-entrypoint-refused", field, reason}, with field and reason from the closed lists
 * below and no other member, so it carries no path, member value or file text (every refusal case; the vocabulary cases).
 *  1. The pin is an object (plain, frozen, null-prototype, or holding its digests by inheritance: each admitted, R008-9) whose two
 *     digests are each a string sha256:<64 lower-case hex>. Refused pin-malformed before any file is read are the pins R008-6 and
 *     R008-9 plant (undefined, null, a string, a list with or without the digest members, a function carrying them, an object
 *     without one or both) and, in either member, the digests R008-5, R008-6 and R008-10 plant (the bare hex, 63 and 65 digits,
 *     upper-case hex, a letter that is no hex digit, sha512:, no colon, an upper-case or hyphenated algorithm, a space or a line
 *     break before or after, a carriage return or a line separator after, empty, a number, null, an object whose text is a
 *     digest), and those R008-13 plants (a valid digest with any one of its code points in its fullwidth compatibility form,
 *     which NFKC maps back to that digest: nothing is normalized first). The digest grammar is MECHANICAL_DIGEST_PATTERN: R008-12
 *     scans one digit's place of the artifact digest over every BMP code point through the pattern and over every ASCII code
 *     point through the boundary.
 *  2. The descriptor FILE: its bytes are read from the path (unreadable when missing or a directory: R007-4), and their SHA-256
 *     is compared with the pin before they are decoded or parsed (digest-mismatch: R007-3, R007-9, R007-16).
 *  3. The bytes decode as UTF-8, the decoder dropping one leading UTF-8 byte order mark (R007-16), and parse as JSON (malformed:
 *     bytes that are not UTF-8, bytes that are not JSON, a second order mark, a UTF-16 order mark: R007-5, R007-16); no one
 *     object of the text names a member twice, the names compared after JSON string decoding (member-duplicate at descriptor,
 *     wb-y0n6: each of the producer's eight members written a second time R219-2, status written twice in either order, three
 *     times and the schema written again last R219-3 and R007-20, package or export twice inside implementation R219-4, a
 *     second name spelled through a JSON escape R219-5, a name outside the member set and a name inside an object in a list
 *     R219-6; judged after the digest and the parse and before the object test and the schema member, R219-8); a member name
 *     inside a string value, names in two different objects and names that differ in case are not compared as one (R219-7),
 *     and the producer members written one per line, each once, are admitted under their own pin (R219-1); and the value is an
 *     object (wrong-type: a list, null, a string, a number, a boolean: R007-5, R007-10). The wb-y0n6 cases are in
 *     test/workbench-mechanical-package.test.ts.
 *  4. The schema member, compared by strict equality with mechanical-workflows/entrypoint/v1: refused schema-unsupported,
 *     whatever else the object holds, are the forms R007-6, R007-11, R007-12, R007-14 and R007-17 plant (another version, a
 *     missing schema, a number, case, padding, a longer or shorter id, another producer, lists of the id, ignorable,
 *     compatibility and line-break variants, empty).
 *  5. The member set, compared name for name with the producer file's eight: each extra name R007-7, R007-13 and R007-18 plant
 *     (among them case, padding, longer, shorter, empty, ignorable and compatibility variants of a member's name, and inherited
 *     object names) is member-unexpected; then each absent member but note is member-missing under its own name, and of several
 *     absent members the first in the producer file's order (R007-22); note may be absent (R007-11).
 *  6. Member by member, in the producer file's order (R007-13): id is a string (wrong-type: R007-12, R007-17) naming an entry
 *     of the fixed allowlist MECHANICAL_REVIEWED_ENTRYPOINTS by strict equality (not-allowlisted: the ids R010-4 and R007-17
 *     plant); implementation is an object (wrong-type: R007-12) whose member names are package and export, compared name for
 *     name (member-unexpected, then member-missing: R007-7, R007-11, R007-13, R007-18; an own __proto__ member: R007-21), each
 *     value compared by strict equality with the reviewed entry's (not-allowlisted: the values R010-2, R010-3 and R010-11
 *     plant, lists of the reviewed value among them); inputSchema and outputSchema are each a string (wrong-type: R007-12)
 *     matching MECHANICAL_SCHEMA_REF_PATTERN over the whole text with nothing normalized first (schema-ref-noncanonical: the
 *     forms R009-2, R009-6 and R009-7 plant, the ASCII code points R009-10 scans in inputSchema, and each reviewed name with
 *     any one of its code points in its fullwidth compatibility form, which NFKC maps back to that name, R009-11) and equal to
 *     the reviewed name (schema-ref-unknown: the canonical names R009-3, R009-8 and R009-10 plant); bindings are the reviewed
 *     four in order, each compared by strict equality (bindings-mismatch: the forms R007-8, R007-12 and R007-17 plant); status
 *     is descriptor-only by strict equality (status-unsupported: the forms R007-8, R007-12 and R007-17 plant); note, when
 *     present, is a string (wrong-type: R007-8, R007-12, R007-17) whose text is not judged further (R007-11).
 *  7. The approved root, then the artifact, each by realpath (unreadable, under root or artifact: R011-7, R011-13).
 *  8. Containment, realpath against realpath: the artifact lies strictly inside the root, read as a relative path that is not
 *     empty, not .. and does not start with ../ (outside-root: the root itself and its parent R011-10, a sibling sharing the
 *     root's name as a prefix R011-2, a sibling whose name differs from the root's only in case or in normalization form
 *     R011-16, a final, intermediate or chained link resolving outside R011-1, R011-8, R011-9). Admitted are a link resolving
 *     inside and a root named through a link (R011-3, R011-4), and the R011-15 forms: an artifact named ..planted.mjs, an
 *     artifact under a directory named ..d or x.., an artifact named through a dot-dot segment that returns inside, a root named
 *     with a trailing separator, and the root /.
 *  9. The artifact is a regular file, judged by stat before it is opened (not-a-file: a directory R011-7, a FIFO R011-12).
 * 10. The SHA-256 of the bytes read equals the pin (digest-mismatch: R008-2, R008-4).
 *
 * loadMechanicalEntrypoint (load): a resolution this module did not mint is refused unresolved (R010-7), and a minted one is
 * frozen (R010-10). Before the loader runs, steps 7 to 10 run again on the request as validated, and between steps 8 and 9 the
 * root's and the artifact's realpaths are compared with the ones validation recorded (changed: the artifact re-pointed R011-5,
 * the root re-pointed R011-11; the order R011-6, R011-14); each refusal there comes with no loader call (R008-3, R011-5,
 * R011-6, R011-11, R011-14). The loader then runs once, with the reviewed entry and the bytes the load measured with their
 * digest (R008-1, R010-1); a loader that throws or rejects propagates its own error and is not run again (R008-8). The export is
 * read from the loader's result, an object or a function (a list, a frozen and a null-prototype object among them: R010-12), by
 * the reviewed name, as that value's own member (an own accessor member read through its getter, run once: R010-14), and only
 * when the member is a function (export-missing: R010-6, R010-9, R010-14); the boundary never calls it (R008-3, R008-7,
 * R010-14).
 *
 * RESIDUALS: none named. R-DUPLICATE-MEMBER (a member written twice read as one member, the last written) was this header's
 * one named residual until wb-y0n6 cured it at step 3; R007-20, its former quiet row, now pins both orders refused
 * member-duplicate.
 *
 * PACKAGE ADMISSION (wb-y0n6; mechanical-native-interoperability-2026-11-09 packet P02, EAT-R217 AC2/AC3, EAT-R222 AC1-AC3
 * and EAT-R224 AC1-AC2 at the V1 tier; the cases are in test/workbench-mechanical-package.test.ts). resolveMechanicalPackage
 * (validation), loadMechanicalPackage (load) and admitMechanicalPackage (validation, then load) add the producer's two schema
 * files to the entrypoint's steps, each refusal in the closed vocabulary above, the field naming inputSchema or outputSchema:
 *  P1. The schema pin is an object whose two digests are each in MECHANICAL_DIGEST_PATTERN, judged before the entrypoint (pin
 *      pin-malformed: the eight pins R217-6 plants, with the descriptor path missing).
 *  P2. Steps 1 to 10 of the entrypoint; their refusals are returned as they are, before any schema file is read (a malformed
 *      release pin, a duplicate member, an unknown input schema name and a flipped artifact, each with the schema directory
 *      missing: R217-4, R217-7; the stale pin, a producer file changed by one byte under the fixture's digest: R217-5).
 *  P3. The input schema file, then the output schema file, each read by the REVIEWED entry's schema name inside the host's
 *      schema directory, never by a descriptor string: its realpath (unreadable: the file or the directory missing, R217-2) lies
 *      strictly inside the approved root's (outside-root: a file link and a directory link resolving outside, R222-1; a link
 *      resolving inside is admitted, R222-1), it is a regular file judged before it is opened (not-a-file: a directory and a
 *      FIFO, the FIFO's refusal arriving while no writer exists, R222-2), and the SHA-256 of its bytes equals the pin
 *      (digest-mismatch: one byte flipped in either file and the two files swapped, R217-3; the input before the output, R217-7).
 *  P4. Load: a package resolution this module did not mint is refused unresolved (R222-6); the entrypoint's load phase then
 *      runs steps 7 to 10 again on the artifact (an artifact changed after validation refuses as the artifact, before the schema
 *      files, R222-6).
 *  P5. Then each schema file is measured again as in P3, its realpath compared with the one validation recorded after
 *      containment and before the file check (digest-mismatch: a byte flipped after validation, R222-3; changed: a link
 *      re-pointed inside the root to the same bytes, R222-4; outside-root: re-pointed outside, R222-4; not-a-file: a FIFO put in
 *      the file's place, R222-5), and only then does the host loader run, once (R217-1, R222-3); every refusal of P1 to P5 comes
 *      with no loader call. Two admissions run together each judge their own files (R224-1: both admitted, each load with its
 *      own root's artifact; R224-2 and R224-3: the one with a changed schema byte or a re-pointed schema link refuses and the
 *      other is admitted, the shared loader running once).
 *
 * NOT CLAIMED (explicitly partial; closure gate MW-INSTALLED-CONSUMER, external MW-CONTRACT and MW-PACKAGE): where the pin
 * comes from (MechanicalWorkflows publishes no release manifest at f7c0a943, so the host supplies the pin); that an installed
 * package or a published tarball was read; the invocation contract and its version (B-contract-choice, EAT-R005 and EAT-R006);
 * dispatch, grants, source admission and outcome validation; a call without an options object of plain data members, or with a
 * loader that is not a function; where the descriptor file lies (no root bounds the descriptor path); a descriptor path that is
 * neither a readable file nor a directory (a FIFO, a device); a code point outside ASCII read through the boundary in a digest
 * or a schema reference other than the ones the cited cases plant (R008-12 and R009-10 scan the exported patterns, not the
 * boundary, over the BMP; R008-13 and R009-11 put fullwidth compatibility forms only through the boundary); the window between
 * a realpath and the open of the same path (the open asks O_NOFOLLOW where the platform has it and checks the opened handle as
 * a regular file again, but no case plants a swap inside that window); hard links; a loader result whose member read runs code
 * other than through the two own accessors R010-14 plants (a proxy, a getter that throws, an inherited accessor); and the
 * window between the load-phase measurement and a host that re-opens the path instead of using the measured bytes. Of the
 * package admission (closure gates MW-INSTALLED-HOST and PI-MECHANICAL-ARTIFACT): that the schema files the cases read are the
 * producer's own (they are stand-ins pinned by their own bytes); where the schema pin or the schema directory comes from; an
 * installed or packed package, its tarball bytes, its name, version or runtime closure, and a host API version (EAT-R217 AC1,
 * EAT-R220, EAT-R221); a saved function-definition digest (EAT-R218); import authority at the registered tool (EAT-R223);
 * every registered-path criterion (PI-FUNCTION-REGISTERED, carried by P04 and P08); writer and Forge calls (none exist here);
 * and the windows between a schema file's realpath and its open, and between its load-time measure and the host loader.
 */
import { createHash } from "node:crypto";
import { constants } from "node:fs";
import { type FileHandle, open, readFile, realpath, stat } from "node:fs/promises";
import { isAbsolute, join, relative, sep } from "node:path";

/** The entrypoint descriptor schema id this boundary admits, compared by strict equality (step 4 and the forms it cites). */
export const MECHANICAL_ENTRYPOINT_SCHEMA = "mechanical-workflows/entrypoint/v1";
/** The descriptor status this boundary admits (step 6). */
export const MECHANICAL_DESCRIPTOR_STATUS = "descriptor-only";
/** The descriptor's member set in the producer file's order (pinned to the producer file's own keys); note may be absent (step 5). */
export const MECHANICAL_DESCRIPTOR_MEMBERS = ["schema", "id", "implementation", "inputSchema", "outputSchema", "bindings", "status", "note"] as const;
const OPTIONAL_MEMBERS: readonly string[] = ["note"];
const IMPLEMENTATION_MEMBERS = ["package", "export"] as const;
/** The canonical schema-reference grammar (step 6): lower-case ASCII letters, digits, dots and hyphens only, opening with a letter or a digit, ending .schema.json, over the whole text (R009-7; R009-10 scans it over every BMP code point at three positions). */
export const MECHANICAL_SCHEMA_REF_PATTERN = /^[a-z0-9][a-z0-9.-]*\.schema\.json$/;
/** A release-pin digest (step 1): sha256: then 64 lower-case hex digits, over the whole string (R008-10; R008-12 scans one digit's place over every BMP code point). */
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
/** The fixed allowlist, frozen with its entries and their bindings; each id names exactly one entry (R010-5). */
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
  "changed", "unresolved", "export-missing", "member-duplicate",
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
/** The artifact as the load phase hands it to the host loader: its realpath, the bytes the load read, and their digest (R008-1). */
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
/** O_NOFOLLOW where the platform has it (the realpath-to-open window is NOT CLAIMED: see the header). */
const READ_FLAGS = constants.O_RDONLY | (constants.O_NOFOLLOW ?? 0);

/** What load re-measures against: the request as validated, held in a WeakMap keyed by the frozen resolution minted for it (R010-7, R010-10). */
interface MintedResolution {
  readonly artifactPath: string;
  readonly approvedRoot: string;
  readonly artifactDigest: string;
}
const MINTED = new WeakMap<MechanicalResolvedEntrypoint, MintedResolution>();

/** The reviewed entry for an id, or undefined unless the allowlist holds exactly one (R010-4, R010-5). */
function reviewedEntry(id: string): MechanicalReviewedEntrypoint | undefined {
  const matches = MECHANICAL_REVIEWED_ENTRYPOINTS.filter(entry => entry.id === id);
  return matches.length === 1 ? matches[0] : undefined;
}

/** A schema reference: a string in the canonical grammar, then the reviewed name by strict equality; nothing is normalized first (step 6 and the forms it cites). */
function schemaRefRefusal(field: "inputSchema" | "outputSchema", ref: unknown, reviewed: string): Refusal | undefined {
  if (typeof ref !== "string") return refused(field, "wrong-type");
  if (!MECHANICAL_SCHEMA_REF_PATTERN.test(ref)) return refused(field, "schema-ref-noncanonical");
  if (ref !== reviewed) return refused(field, "schema-ref-unknown");
  return undefined;
}

const sameBindings = (value: unknown, reviewed: readonly string[]): boolean =>
  Array.isArray(value) && value.length === reviewed.length && value.every((binding: unknown, index) => binding === reviewed[index]);

/**
 * Step 3's duplicate test over text JSON.parse accepted: true when one object of the text names a member twice, the names
 * compared after JSON string decoding (so an escaped spelling is the same name). A string value is never a member name, and
 * names in two different objects are never compared (R219-5, R219-6, R219-7).
 */
function holdsDuplicateMember(text: string): boolean {
  // One entry per open object (its member names so far) or list (undefined), innermost last.
  const containers: (Set<string> | undefined)[] = [];
  // True where the next string of the text is a member name: after "{" and after "," inside an object.
  let nameNext = false;
  let at = 0;
  while (at < text.length) {
    const unit = text[at];
    if (unit === '"') {
      let end = at + 1;
      while (end < text.length && text[end] !== '"') end += text[end] === "\\" ? 2 : 1;
      const names = containers.at(-1);
      if (nameNext && names !== undefined) {
        const name: unknown = JSON.parse(text.slice(at, end + 1));
        if (typeof name === "string") {
          if (names.has(name)) return true;
          names.add(name);
        }
      }
      nameNext = false;
      at = end + 1;
      continue;
    }
    if (unit === "{") {
      containers.push(new Set<string>());
      nameNext = true;
    } else if (unit === "[") {
      containers.push(undefined);
      nameNext = false;
    } else if (unit === "}" || unit === "]") {
      containers.pop();
      nameNext = false;
    } else if (unit === ",") {
      nameNext = containers.at(-1) !== undefined;
    } else if (unit === ":") {
      nameNext = false;
    }
    at += 1;
  }
  return false;
}

/** Steps 3 (the object test) to 6 of the header over one parsed value; the first refusal wins (R007-13). */
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

/** Step 8: the relative path from the root is not empty, not .., does not start with ../ and is not absolute (on POSIX relative() returns no absolute path). */
function insideRoot(root: string, path: string): boolean {
  const rel = relative(root, path);
  return rel !== "" && rel !== ".." && !rel.startsWith(`..${sep}`) && !isAbsolute(rel);
}

/** The files judged as regular files: the artifact (steps 9 and 10) and the two schema files (package step P3). */
type MeasuredFileField = "artifact" | "inputSchema" | "outputSchema";
/** Step 9 and step 10's read: stat says a regular file before any open (R011-12); the open asks O_NOFOLLOW and checks the handle again (that window is NOT CLAIMED). */
async function readRegularFile(path: string, field: MeasuredFileField): Promise<{ readonly ok: true; readonly bytes: Buffer } | Refusal> {
  try {
    if (!(await stat(path)).isFile()) return refused(field, "not-a-file");
  } catch {
    return refused(field, "unreadable");
  }
  let handle: FileHandle | undefined;
  try {
    handle = await open(path, READ_FLAGS);
    if (!(await handle.stat()).isFile()) return refused(field, "not-a-file");
    return { ok: true, bytes: await handle.readFile() };
  } catch {
    return refused(field, "unreadable");
  } finally {
    await handle?.close().catch(() => undefined);
  }
}

interface ArtifactReading extends MechanicalArtifactMeasure {
  readonly ok: true;
  readonly bytes: Buffer;
}
/**
 * Steps 7 to 10 of the header; with validated (the load phase) the realpaths validation recorded are compared between steps 8
 * and 9 (R011-6, R011-14).
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
  const read = await readRegularFile(realPath, "artifact");
  if (!read.ok) return read;
  const digest = digestOf(read.bytes);
  if (digest !== pinned) return refused("artifact", "digest-mismatch");
  return { ok: true, root, realPath, digest, bytes: read.bytes };
}

/** Validation: steps 1 to 10 of the header, the first refusal returned. */
export async function resolveMechanicalEntrypoint(options: MechanicalEntrypointOptions): Promise<MechanicalEntrypointResolution> {
  const pin: unknown = options.pin;
  const descriptorDigest = plain(pin) ? pin.descriptorDigest : undefined;
  const artifactDigest = plain(pin) ? pin.artifactDigest : undefined;
  if (!isDigest(descriptorDigest) || !isDigest(artifactDigest)) return refused("pin", "pin-malformed");
  let bytes: Buffer;
  try {
    bytes = await readFile(options.descriptorPath);
  } catch {
    return refused("descriptor", "unreadable");
  }
  if (digestOf(bytes) !== descriptorDigest) return refused("descriptor", "digest-mismatch");
  let text: string;
  let value: unknown;
  try {
    text = UTF8.decode(bytes);
    value = JSON.parse(text);
  } catch {
    return refused("descriptor", "malformed");
  }
  if (holdsDuplicateMember(text)) return refused("descriptor", "member-duplicate");
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

/** The reviewed export read off the loader's result (an object or a function) by the reviewed name, as its own member, when that member is a function (R010-6, R010-9, R010-12). */
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

/** The digests the host adopted for the reviewed entry's two schema files: the SHA-256 of their exact bytes (package step P1). */
export interface MechanicalSchemaPin {
  readonly inputSchemaDigest: string;
  readonly outputSchemaDigest: string;
}
/** What the host hands the package admission: the entrypoint options, the directory holding the producer's schema files, and their pin. */
export interface MechanicalPackageOptions extends MechanicalEntrypointOptions {
  readonly schemaDirectory: string;
  readonly schemaPin: MechanicalSchemaPin;
}
/** One schema file as the package admission measured it: its realpath and the digest of the bytes read. */
export interface MechanicalSchemaMeasure {
  readonly realPath: string;
  readonly digest: string;
}
/** A validated package: the entrypoint resolution and the two schema measures; loadMechanicalPackage loads only one this module minted. */
export interface MechanicalResolvedPackage {
  readonly entrypoint: MechanicalResolvedEntrypoint;
  readonly inputSchema: MechanicalSchemaMeasure;
  readonly outputSchema: MechanicalSchemaMeasure;
}
export type MechanicalPackageResolution =
  | { readonly ok: true; readonly resolved: MechanicalResolvedPackage }
  | { readonly ok: false; readonly diagnostic: MechanicalEntrypointDiagnostic };

/** What the load phase re-measures the schema files against: the request as validated, keyed by the frozen package resolution (R222-6). */
interface MintedPackage {
  readonly schemaDirectory: string;
  readonly inputSchemaDigest: string;
  readonly outputSchemaDigest: string;
}
const MINTED_PACKAGES = new WeakMap<MechanicalResolvedPackage, MintedPackage>();
type SchemaField = "inputSchema" | "outputSchema";

/**
 * Package steps P3 and P5: one schema file, by the reviewed entry's name inside the host's schema directory; its realpath lies
 * strictly inside the root's, it is a regular file judged before it is opened, and the SHA-256 of its bytes equals the pin; at
 * load (validated given) its realpath equals the one validation recorded, judged after containment and before the file check.
 */
async function measureSchema(path: string, root: string, pinned: string, field: SchemaField, validated?: string): Promise<({ readonly ok: true } & MechanicalSchemaMeasure) | Refusal> {
  let realPath: string;
  try {
    realPath = await realpath(path);
  } catch {
    return refused(field, "unreadable");
  }
  if (!insideRoot(root, realPath)) return refused(field, "outside-root");
  if (validated !== undefined && realPath !== validated) return refused(field, "changed");
  const read = await readRegularFile(realPath, field);
  if (!read.ok) return read;
  const digest = digestOf(read.bytes);
  if (digest !== pinned) return refused(field, "digest-mismatch");
  return { ok: true, realPath, digest };
}

/** Package validation: the schema pin (P1), steps 1 to 10 of the entrypoint (P2), then the input and the output schema file (P3). */
export async function resolveMechanicalPackage(options: MechanicalPackageOptions): Promise<MechanicalPackageResolution> {
  const schemaPin: unknown = options.schemaPin;
  const inputSchemaDigest = plain(schemaPin) ? schemaPin.inputSchemaDigest : undefined;
  const outputSchemaDigest = plain(schemaPin) ? schemaPin.outputSchemaDigest : undefined;
  if (!isDigest(inputSchemaDigest) || !isDigest(outputSchemaDigest)) return refused("pin", "pin-malformed");
  const resolution = await resolveMechanicalEntrypoint(options);
  if (!resolution.ok) return resolution;
  const { entry, artifact } = resolution.resolved;
  const inputMeasure = await measureSchema(join(options.schemaDirectory, entry.inputSchema), artifact.root, inputSchemaDigest, "inputSchema");
  if (!inputMeasure.ok) return inputMeasure;
  const outputMeasure = await measureSchema(join(options.schemaDirectory, entry.outputSchema), artifact.root, outputSchemaDigest, "outputSchema");
  if (!outputMeasure.ok) return outputMeasure;
  const resolved: MechanicalResolvedPackage = Object.freeze({
    entrypoint: resolution.resolved,
    inputSchema: Object.freeze({ realPath: inputMeasure.realPath, digest: inputMeasure.digest }),
    outputSchema: Object.freeze({ realPath: outputMeasure.realPath, digest: outputMeasure.digest }),
  });
  MINTED_PACKAGES.set(resolved, Object.freeze({ schemaDirectory: options.schemaDirectory, inputSchemaDigest, outputSchemaDigest }));
  return { ok: true, resolved };
}

/**
 * Package load (P4 and P5): a package resolution this module did not mint is refused unresolved; the entrypoint's load phase
 * re-measures the artifact, then the two schema files are measured again, and only then does the host loader run, once.
 */
export async function loadMechanicalPackage(resolved: MechanicalResolvedPackage, loader: MechanicalExportLoader): Promise<MechanicalEntrypointLoad> {
  const minted = MINTED_PACKAGES.get(resolved);
  if (minted === undefined) return refused("resolution", "unresolved");
  const { entrypoint } = resolved;
  const root = entrypoint.artifact.root;
  const held: { refusal?: Refusal } = {};
  const outcome = await loadMechanicalEntrypoint(entrypoint, async (entry, artifact) => {
    const inputMeasure = await measureSchema(join(minted.schemaDirectory, entry.inputSchema), root, minted.inputSchemaDigest, "inputSchema", resolved.inputSchema.realPath);
    if (!inputMeasure.ok) {
      held.refusal = inputMeasure;
      return undefined;
    }
    const outputMeasure = await measureSchema(join(minted.schemaDirectory, entry.outputSchema), root, minted.outputSchemaDigest, "outputSchema", resolved.outputSchema.realPath);
    if (!outputMeasure.ok) {
      held.refusal = outputMeasure;
      return undefined;
    }
    return loader(entry, artifact);
  });
  return held.refusal ?? outcome;
}

/** The host's one-shot package admission: package validation, then the package load, the first refusal returned as is. */
export async function admitMechanicalPackage(options: MechanicalPackageOptions, loader: MechanicalExportLoader): Promise<MechanicalEntrypointLoad> {
  const resolution = await resolveMechanicalPackage(options);
  if (!resolution.ok) return resolution;
  return loadMechanicalPackage(resolution.resolved, loader);
}
