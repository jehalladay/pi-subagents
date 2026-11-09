/**
 * wb-ocie (mechanical-workflows-interop-2026-11-04 B-descriptor, slice PI-0): the Pi boundary for MechanicalWorkflows'
 * published entrypoint descriptor and the packed artifact it names, src/workbench/mechanical-descriptor.ts.
 *
 * Requirements (pi-subagents master 0b25e14e, triage/requirements/ATOMIC-REQUIREMENTS.md, group "descriptor"); every case is
 * titled by the requirement it pins:
 *  EAT-R007 "Pi MUST read the exact producer descriptor file." Acceptance: "Load the descriptor shipped with the pinned package
 *   and compare its byte digest with the producer release manifest; invoke the real installed host once, without an MW
 *   checkout. A hand-authored equivalent object is not accepted as the fixture source." Mutant: "Replace the corpus fixture
 *   with an object literal and change the producer file; the digest test fails."
 *  EAT-R008 "Pi MUST refuse artifact bytes that differ from their SHA-256 pin." Acceptance: "Flip one byte in a packed
 *   artifact after descriptor resolution; assert refusal before import and zero provider calls; exact installed bytes pass."
 *   Mutant: "Hash the filename or reuse an earlier digest without measuring bytes."
 *  EAT-R009 "Pi MUST refuse noncanonical schema references." Acceptance: "Consume bare canonical names; mutate to ../schemas,
 *   absolute path, URL and unknown schema. Assert refusal before import. Pin equality is the positive control, not an assumed
 *   mismatch." Mutant: "Normalize arbitrary traversal into an accepted basename."
 *  EAT-R010 "Pi MUST refuse package or export outside its fixed allowlist." Acceptance: "Using the actual descriptor fixture
 *   mutate package and export independently; assert no loader call; accepted ID resolves exactly one reviewed host export."
 *   Mutant: "Use caller package/export strings as import targets."
 *  EAT-R011 "Pi MUST refuse symlink escapes during artifact resolution." Acceptance: "Materialize an artifact link resolving
 *   outside approved root and a link changed between validation and load; assert refusal without executing an import side
 *   effect." Mutant: "Use lexical prefix containment without realpath or revalidation."
 *
 * THE FIXTURE: test/fixtures/mw-development-entrypoint-v1.json is MechanicalWorkflows' descriptor of record,
 * contracts/entrypoints/development.v1.json, vendored byte-identical with read-only git show at MechanicalWorkflows
 * f7c0a9431d6cc36a15b409b1788c945ef86ad5e2 (the program's environment pin mw@f7c0a9431d6c; git blob d4f43d38, 564 bytes).
 * R007-1 holds the file to that blob's SHA-256 and git blob id, so a hand-authored object or any edit to the file reds it.
 * Every descriptor case writes those bytes, or an edit of them, to a scratch file and hands the boundary the file's path: a
 * textual mutation (mutated, withMember), or the producer object's own two-space rendering after an edit (rendered: the
 * unedited rendering is the producer bytes, R007-15).
 *
 * EXPLICITLY PARTIAL (closure gate MW-INSTALLED-CONSUMER; external MW-CONTRACT and MW-PACKAGE): at the pin MechanicalWorkflows
 * ships no package carrying this descriptor and no release manifest, so the release pin each case hands the boundary carries the
 * producer file's own SHA-256 (measured above) and the SHA-256 of a scratch ES module the case writes as the artifact, not a
 * published tarball. EAT-R007's installed-host leg ("invoke the real installed host once, without an MW checkout") and every
 * installed-bytes reading are NOT RUN by this suite; the slice is not claimed live or closed.
 *
 * THE LOADERS record every call and import nothing, so a loader call count of zero witnesses that the loader the boundary was
 * handed never ran; that the boundary has no other path to an import is NOT CLAIMED by this suite, and no case adds a computed
 * load to the tree.
 *
 * Respin cut #2 (wb-ocie refusal #1, U3) adds the cases that pin the module header's numbered steps where cut #1's words were
 * wider than its pins: R007-9 to R007-15, R008-6 to R008-8, R009-5 and R009-6, R010-8 to R010-10, R011-10 to R011-14 and the
 * vocabulary lists.
 *
 * Respin cut #3 (wb-ocie refusal #2; the R-B655 second-stage cap on GUARD 3, the module header's words, in the
 * enumerate-the-resolvable form) adds the cases that plant the forms the header's steps newly enumerate, among them every
 * witness of refusal #2 (WN01-WN07, WN09, WN12, WN16, WN23 and WN24): R007-16 to R007-20 (R007-20 is the quiet row of the named residual R-DUPLICATE-MEMBER), R008-9 to
 * R008-12, R009-7 to R009-10, R010-11 to R010-13, R011-15 and R011-16. Each new table is frozen by name, and R008-12 and R009-10
 * are COMPUTED SCANS (every BMP code point through each exported grammar, every ASCII code point through the boundary). A case
 * title reads under the module header's FORM: it claims the forms its case plants.
 *
 * Follow-up cut (wb-mqpz; the R694 follow-up of the wb-ocie landing 1037 gate, its finding F1) plants the five forms that gate
 * realized on the boundary outside cut #3's tables (its witnesses WG01-WG05, each a form cut #3 left NOT CLAIMED), each case
 * red-first under the gate member it realizes: R007-21 (WG04, an own __proto__ member inside implementation; GX04), R007-22
 * (WG03, several absent members; GX03), R008-13 (WG02, a COMPUTED SCAN through the boundary of the fullwidth compatibility
 * form of each code point of a valid digest; GX02), R009-11 (WG01, the same scan over each reviewed schema name; GX01) and
 * R010-14 (WG05, an own accessor export; GX17).
 *
 * Follow-up cut (wb-dhfk; the R694 follow-up of the wb-mqpz landing 1047 gate, its finding F1, whose member
 * GQ-D17-PIN-AFTER-DEFERRED-READ reads the descriptor path ahead of the pin judgment and defers that read's failure) pins
 * the read order behind the words "before any file is read" (the module header's step 1 and the titles of R008-5, R008-6,
 * R008-9, R008-10, R008-12 and R008-13) with an observable descriptor read. Each of those six cases ends with its READ-ORDER
 * LEG (readOrderLeg): every pin the case plants as refused pin-malformed is handed to the boundary again, one at a time, with
 * a FIFO that no writer opens in the descriptor's place. An open of that path for reading waits for a writer, so a boundary
 * that opens it before it judges the pin either does not settle (the row reads "blocked": the GQ-D17 form, the read awaited)
 * or leaves a reader behind (the row ends " reader": an open started and not awaited). Each leg first runs its positive
 * control: with the producer pin, the resolution opens that FIFO for reading (the open waits until the control's own writer
 * appears), so the leg can see this boundary's descriptor read; that open is the only FIFO reading the legs claim. R008-14
 * holds the legs to the titles that carry the words and to each case's row count. NOT CLAIMED by the legs: an open of the
 * artifact path, or a stat or realpath of either path, ahead of the pin judgment (they watch the descriptor path only); a
 * synchronous read of the descriptor path (it would wait for a writer on the suite's own thread, so no case could report it);
 * and what the boundary reads from a FIFO, or returns, once it opens one (the module header's NOT CLAIMED list names a FIFO
 * descriptor path).
 *
 * Display paths added: none (the boundary returns closed-vocabulary diagnostics and composes no label or reply text).
 */
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { closeSync, constants, mkdirSync, openSync, readFileSync, realpathSync, symlinkSync, unlinkSync, writeFileSync } from "node:fs";
import { dirname, join, sep } from "node:path";
import { afterAll, afterEach, describe, expect, it } from "vitest";
import {
  admitMechanicalEntrypoint,
  loadMechanicalEntrypoint,
  MECHANICAL_DESCRIPTOR_MEMBERS,
  MECHANICAL_DESCRIPTOR_STATUS,
  MECHANICAL_DIGEST_PATTERN,
  MECHANICAL_ENTRYPOINT_FIELDS,
  MECHANICAL_ENTRYPOINT_REASONS,
  MECHANICAL_ENTRYPOINT_SCHEMA,
  MECHANICAL_REVIEWED_ENTRYPOINTS,
  MECHANICAL_SCHEMA_REF_PATTERN,
  type MechanicalEntrypointDiagnostic,
  type MechanicalEntrypointLoad,
  type MechanicalEntrypointOptions,
  type MechanicalExportLoader,
  type MechanicalLoadableArtifact,
  type MechanicalReleasePin,
  type MechanicalResolvedEntrypoint,
  type MechanicalReviewedEntrypoint,
  resolveMechanicalEntrypoint,
} from "../src/workbench/mechanical-descriptor.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard(afterAll);
const scratches: string[] = [];
afterEach(() => removeScratch(...scratches.splice(0)));
const scratch = (): string => {
  const dir = makeScratch("wb-ocie-mw-descriptor-");
  scratches.push(dir);
  return dir;
};

/** The producer file of record at MechanicalWorkflows f7c0a943, as measured by read-only git show. */
const PRODUCER = {
  commit: "f7c0a9431d6cc36a15b409b1788c945ef86ad5e2",
  path: "contracts/entrypoints/development.v1.json",
  blob: "d4f43d384446d692e6bafddf4f2a8a60c19df0cf",
  sha256: "68cc312ba82c5837eff64bb6de39e0db09073c836d851d550e13aa458d192d0f",
  bytes: 564,
} as const;
const DESCRIPTOR_BYTES = readFileSync(new URL("./fixtures/mw-development-entrypoint-v1.json", import.meta.url));
const DESCRIPTOR_TEXT = DESCRIPTOR_BYTES.toString("utf8");
const sha256Of = (bytes: Uint8Array | string): string => createHash("sha256").update(bytes).digest("hex");
const digestOf = (bytes: Uint8Array | string): string => `sha256:${sha256Of(bytes)}`;
const gitBlobOf = (bytes: Uint8Array): string =>
  createHash("sha1").update(Buffer.concat([Buffer.from(`blob ${bytes.length}\0`, "utf8"), bytes])).digest("hex");
const PRODUCER_DIGEST = `sha256:${PRODUCER.sha256}`;
const REVIEWED: MechanicalReviewedEntrypoint = MECHANICAL_REVIEWED_ENTRYPOINTS[0] as MechanicalReviewedEntrypoint;

/** The descriptor text with exactly one occurrence of `from` replaced by `to` (a one-member producer-file mutation). */
const mutated = (from: string, to: string): string => {
  expect(DESCRIPTOR_TEXT.split(from), `the producer file holds ${from} exactly once`).toHaveLength(2);
  return DESCRIPTOR_TEXT.replace(from, to);
};
/** The descriptor text with one member's value replaced by `value`, written as JSON. */
const withMember = (member: string, current: string, value: unknown): string =>
  mutated(`"${member}": ${JSON.stringify(current)}`, `"${member}": ${JSON.stringify(value)}`);

type DescriptorObject = Readonly<Record<string, unknown>>;
/** The producer object as the fixture's bytes parse; the file is its own two-space rendering plus a final line break (R007-15). */
const PRODUCER_OBJECT = JSON.parse(DESCRIPTOR_TEXT) as DescriptorObject;
/** The producer object's two-space rendering after an edit (members dropped, replaced or added), plus the final line break. */
const rendered = (edit: (object: DescriptorObject) => DescriptorObject): string => `${JSON.stringify(edit(PRODUCER_OBJECT), null, 2)}\n`;
/** The producer object without the named members. */
const without =
  (...names: string[]) =>
  (object: DescriptorObject): DescriptorObject =>
    Object.fromEntries(Object.entries(object).filter(([key]) => !names.includes(key)));
/** The producer object's implementation member, an object in the producer file. */
const implementationOf = (object: DescriptorObject): DescriptorObject => {
  const value = object.implementation;
  if (typeof value !== "object" || value === null || Array.isArray(value)) throw new Error("the producer file's implementation is an object");
  return value as DescriptorObject;
};

/** The bytes of a scratch ES module standing in for the packed artifact; the suite's loaders never import it. */
const artifactText = (tag: string): string =>
  [`export const develop = () => ${JSON.stringify(tag)};`, `export const developLive = () => "not the reviewed export";`, ""].join("\n");
const write = (path: string, data: string | Uint8Array): void => {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, data);
};
/** Flips one byte of a file in place (the first letter of the planted tag, XOR 0x01). */
const flipOneByte = (path: string): void => {
  const bytes = readFileSync(path);
  const at = bytes.indexOf("planted");
  expect(at, "the planted artifact holds its tag").toBeGreaterThanOrEqual(0);
  bytes[at] = (bytes[at] ?? 0) ^ 0x01;
  writeFileSync(path, bytes);
};

interface Planted {
  readonly root: string;
  readonly options: MechanicalEntrypointOptions;
  readonly artifactBytes: Buffer;
}
/**
 * One approved root holding the descriptor (the producer bytes unless `descriptorText` is given) and a scratch artifact module.
 * The release pin carries the producer digest for the producer bytes, and the mutated bytes' own digest for a mutation (a
 * manifest that pinned those bytes), so a mutated member is refused by the member's own check, never by the digest check.
 */
const plant = (descriptorText?: string, tag = "planted develop"): Planted => {
  const root = scratch();
  const descriptorPath = join(root, "contracts", "entrypoints", "development.v1.json");
  write(descriptorPath, descriptorText ?? DESCRIPTOR_BYTES);
  const artifactPath = join(root, "package", "index.mjs");
  write(artifactPath, artifactText(tag));
  const artifactBytes = readFileSync(artifactPath);
  const pin: MechanicalReleasePin = {
    descriptorDigest: descriptorText === undefined ? PRODUCER_DIGEST : digestOf(descriptorText),
    artifactDigest: digestOf(artifactBytes),
  };
  return { root, options: { descriptorPath, artifactPath, approvedRoot: root, pin }, artifactBytes };
};

interface LoaderCall {
  readonly entry: MechanicalReviewedEntrypoint;
  readonly artifact: MechanicalLoadableArtifact;
}
/** A host loader that records each call and answers with a fixed namespace (no import at all). */
const fixedLoader = (namespace: unknown): { readonly loader: MechanicalExportLoader; readonly calls: LoaderCall[] } => {
  const calls: LoaderCall[] = [];
  const loader: MechanicalExportLoader = async (entry, artifact) => {
    calls.push({ entry, artifact });
    return namespace;
  };
  return { loader, calls };
};
/** The recording loader every admission case uses: the reviewed export with a caller-named export beside it. */
const recordingLoader = (): { readonly loader: MechanicalExportLoader; readonly calls: LoaderCall[] } =>
  fixedLoader({ develop: () => "planted develop", developLive: () => "not the reviewed export" });

/** The refusal a host's one-shot admission returns, with the loader calls it caused (must be zero). */
async function refusalOf(options: MechanicalEntrypointOptions): Promise<{ diagnostic: MechanicalEntrypointDiagnostic; loads: number }> {
  const { loader, calls } = recordingLoader();
  const outcome = await admitMechanicalEntrypoint(options, loader);
  expect(outcome.ok, "the admission is refused").toBe(false);
  if (outcome.ok) throw new Error("unreachable: the admission was expected to be refused");
  return { diagnostic: outcome.diagnostic, loads: calls.length };
}
const refused = (field: string, reason: string): MechanicalEntrypointDiagnostic =>
  ({ code: "mechanical-entrypoint-refused", field, reason }) as MechanicalEntrypointDiagnostic;
async function expectRefused(options: MechanicalEntrypointOptions, field: string, reason: string): Promise<void> {
  const outcome = await refusalOf(options);
  expect(outcome).toStrictEqual({ diagnostic: refused(field, reason), loads: 0 });
}
/**
 * A refusal's reading: "<field> <reason>" when its diagnostic is closed (exactly code, field and reason in that order, the code
 * mechanical-entrypoint-refused), else "unclosed <field> <reason>", so a diagnostic that grows a member reds every reading.
 */
const diagnosticReading = (diagnostic: MechanicalEntrypointDiagnostic): string => {
  const closed = Object.keys(diagnostic).join(",") === "code,field,reason" && diagnostic.code === "mechanical-entrypoint-refused";
  return `${closed ? "" : "unclosed "}${diagnostic.field} ${diagnostic.reason}`;
};
/** An outcome's reading: "admitted", or its refusal's diagnosticReading. */
const readingOfOutcome = (outcome: MechanicalEntrypointLoad): string => (outcome.ok ? "admitted" : diagnosticReading(outcome.diagnostic));
/** The admission's reading of one descriptor text: "admitted", or "<field> <reason>" of its refusal (readingOfOutcome). */
async function readingOf(descriptorText: string): Promise<string> {
  const { loader } = recordingLoader();
  return readingOfOutcome(await admitMechanicalEntrypoint(plant(descriptorText).options, loader));
}
/** One fault of a ladder: the edit that plants it and the refusal it reads as while every earlier fault is cured. */
interface Fault {
  readonly reading: string;
  readonly edit: (object: DescriptorObject) => DescriptorObject;
}
/** A ladder's readings: all faults planted, then each cured in turn from the first, ending with none planted. */
async function ladderOf(faults: readonly Fault[]): Promise<string[]> {
  const readings: string[] = [];
  for (let cured = 0; cured <= faults.length; cured += 1) {
    readings.push(await readingOf(rendered(object => faults.slice(cured).reduce((edited, fault) => fault.edit(edited), object))));
  }
  return readings;
}
/** Resolves the planted options, asserting the resolution is admitted. */
async function resolved(options: MechanicalEntrypointOptions): Promise<MechanicalResolvedEntrypoint> {
  const resolution = await resolveMechanicalEntrypoint(options);
  expect(resolution.ok, "the resolution is admitted").toBe(true);
  if (!resolution.ok) throw new Error(`unreachable: refused ${resolution.diagnostic.field} ${resolution.diagnostic.reason}`);
  return resolution.resolved;
}
const loadRefusal = (load: MechanicalEntrypointLoad): MechanicalEntrypointDiagnostic | undefined => (load.ok ? undefined : load.diagnostic);

/** The rows each it.each case ran, by table; the last case holds them to the tables (a table emptied or cut at its call site reds it). */
const RAN: Record<string, string[]> = {};
const ran = (table: string, row: string): void => {
  RAN[table] = [...(RAN[table] ?? []), row];
};
/** The words whose read order the read-order legs pin (wb-dhfk): a case whose title carries them runs a leg (R008-14). */
const READ_ORDER_WORDS = "before any file is read";
/** The rows each read-order leg was handed, by the head of its case's title, in run order (R008-14 holds them). */
const READ_ORDER_LEGS: Record<string, number> = {};

/** The members whose absence step 5 refuses member-missing under their own name: the producer's own, but schema (step 4) and note. */
const REQUIRED_MEMBERS: readonly string[] = MECHANICAL_DESCRIPTOR_MEMBERS.filter(name => name !== "schema" && name !== "note");

/*
 * Respin cut #3 (wb-ocie refusal #2; the R-B655 SECOND-STAGE CAP on GUARD 3, the enumerate-the-resolvable form). The tables
 * below plant the forms the module header's steps enumerate, each table frozen by name (R007-19, R008-11, R009-9, R010-13),
 * among them every witness of refusal #2: WN01, WN04 and WN05 (VALUE_FORMS), WN02 and WN03 (IMPLEMENTATION_VALUE_FORMS),
 * WN06 and WN07 (R011-15), WN09 (MEMBER_NAME_FORMS), WN12 (R008-9), WN16 (R007-16), WN23 (DIGEST_FORMS) and WN24 (LINE_FORMS).
 * A code point a form plants that is not printable ASCII is built from its number, never written raw.
 */
const SOFT_HYPHEN = String.fromCodePoint(0xad);
const ZERO_WIDTH_SPACE = String.fromCodePoint(0x200b);
const LINE_SEPARATOR = String.fromCodePoint(0x2028);
/** The fullwidth compatibility variant of one printable ASCII character (NFKC maps it back to that character). */
const fullwidthOf = (character: string): string => String.fromCodePoint((character.codePointAt(0) ?? 0) + 0xfee0);
/** The text with `inserted` placed before its code unit at `at`. */
const insertAt = (text: string, at: number, inserted: string): string => `${text.slice(0, at)}${inserted}${text.slice(at)}`;
const FIRST_BINDING = REVIEWED.bindings[0] ?? "";
const LAST_BINDING_AT = REVIEWED.bindings.length - 1;
const NOTE_TEXT = (JSON.parse(DESCRIPTOR_TEXT) as { readonly note: string }).note;

/** One planted descriptor form: its name, the edit of the producer object that plants it, and the refusal it must read as. */
interface DescriptorForm {
  readonly form: string;
  readonly edit: (object: DescriptorObject) => DescriptorObject;
  readonly reading: string;
}
/** The producer object with one top-level member set to `value` (added last when the producer has no such member). */
const memberValue =
  (name: string, value: unknown) =>
  (object: DescriptorObject): DescriptorObject => ({ ...object, [name]: value });
/** The producer object with one implementation member set to `value` (added last when the producer has no such member). */
const implementationValue =
  (name: string, value: unknown) =>
  (object: DescriptorObject): DescriptorObject => ({ ...object, implementation: { ...implementationOf(object), [name]: value } });
/** The producer object with the binding at `index` replaced by `value`. */
const bindingAt =
  (index: number, value: unknown) =>
  (object: DescriptorObject): DescriptorObject => ({ ...object, bindings: REVIEWED.bindings.map((name, at) => (at === index ? value : name)) });
/** The admission's reading of one descriptor text with the loader calls it caused: "admitted loads=<n>", or "<field> <reason> loads=<n>". */
async function loadedReadingOf(descriptorText: string): Promise<string> {
  const { loader, calls } = recordingLoader();
  const outcome = await admitMechanicalEntrypoint(plant(descriptorText).options, loader);
  return `${readingOfOutcome(outcome)} loads=${calls.length}`;
}
/** Each form's reading by form name, so a form that reads otherwise is named in the diff. */
async function readingsByForm(forms: readonly DescriptorForm[]): Promise<Record<string, string>> {
  const readings = await Promise.all(forms.map(({ edit }) => loadedReadingOf(rendered(edit))));
  return Object.fromEntries(forms.map(({ form }, index) => [form, readings[index] ?? "no reading"]));
}
/** The readings a table claims: each form refused as its row says, with zero loads. */
const refusedReadings = (forms: readonly DescriptorForm[]): Record<string, string> => Object.fromEntries(forms.map(({ form, reading }) => [form, `${reading} loads=0`]));

/** R007-17: value forms of the schema, id, bindings, status and note members (a list of the exact value is the GN01/GN04/GN05 reading). */
const VALUE_FORMS: readonly DescriptorForm[] = [
  { form: "schema a one-element list of the id", edit: memberValue("schema", [MECHANICAL_ENTRYPOINT_SCHEMA]), reading: "schema schema-unsupported" },
  { form: "schema a nested list of the id", edit: memberValue("schema", [[MECHANICAL_ENTRYPOINT_SCHEMA]]), reading: "schema schema-unsupported" },
  { form: "schema a soft hyphen inside", edit: memberValue("schema", insertAt(MECHANICAL_ENTRYPOINT_SCHEMA, 10, SOFT_HYPHEN)), reading: "schema schema-unsupported" },
  { form: "schema a zero width space inside", edit: memberValue("schema", insertAt(MECHANICAL_ENTRYPOINT_SCHEMA, 20, ZERO_WIDTH_SPACE)), reading: "schema schema-unsupported" },
  { form: "schema a fullwidth solidus", edit: memberValue("schema", MECHANICAL_ENTRYPOINT_SCHEMA.replace("/", fullwidthOf("/"))), reading: "schema schema-unsupported" },
  { form: "schema a line break after", edit: memberValue("schema", `${MECHANICAL_ENTRYPOINT_SCHEMA}\n`), reading: "schema schema-unsupported" },
  { form: "schema a line break before", edit: memberValue("schema", `\n${MECHANICAL_ENTRYPOINT_SCHEMA}`), reading: "schema schema-unsupported" },
  { form: "schema empty", edit: memberValue("schema", ""), reading: "schema schema-unsupported" },
  { form: "id a one-element list of the reviewed id", edit: memberValue("id", [REVIEWED.id]), reading: "id wrong-type" },
  { form: "id padded before", edit: memberValue("id", ` ${REVIEWED.id}`), reading: "id not-allowlisted" },
  { form: "id padded after", edit: memberValue("id", `${REVIEWED.id} `), reading: "id not-allowlisted" },
  { form: "id upper-case", edit: memberValue("id", REVIEWED.id.toUpperCase()), reading: "id not-allowlisted" },
  { form: "id a prefix of the reviewed id", edit: memberValue("id", REVIEWED.id.slice(0, REVIEWED.id.lastIndexOf("."))), reading: "id not-allowlisted" },
  { form: "id the reviewed id extended by a segment", edit: memberValue("id", `${REVIEWED.id}.x`), reading: "id not-allowlisted" },
  { form: "id the reviewed id extended by a digit", edit: memberValue("id", `${REVIEWED.id}0`), reading: "id not-allowlisted" },
  { form: "id a soft hyphen inside", edit: memberValue("id", insertAt(REVIEWED.id, 10, SOFT_HYPHEN)), reading: "id not-allowlisted" },
  { form: "id a fullwidth full stop", edit: memberValue("id", REVIEWED.id.replace(".", fullwidthOf("."))), reading: "id not-allowlisted" },
  { form: "id a line break after", edit: memberValue("id", `${REVIEWED.id}\n`), reading: "id not-allowlisted" },
  { form: "id empty", edit: memberValue("id", ""), reading: "id not-allowlisted" },
  { form: "bindings the first a one-element list", edit: bindingAt(0, [FIRST_BINDING]), reading: "bindings bindings-mismatch" },
  { form: "bindings the last a one-element list", edit: bindingAt(LAST_BINDING_AT, [REVIEWED.bindings[LAST_BINDING_AT]]), reading: "bindings bindings-mismatch" },
  { form: "bindings each a one-element list", edit: memberValue("bindings", REVIEWED.bindings.map(name => [name])), reading: "bindings bindings-mismatch" },
  { form: "bindings the first capitalized", edit: bindingAt(0, `${FIRST_BINDING.charAt(0).toUpperCase()}${FIRST_BINDING.slice(1)}`), reading: "bindings bindings-mismatch" },
  { form: "bindings the first padded before", edit: bindingAt(0, ` ${FIRST_BINDING}`), reading: "bindings bindings-mismatch" },
  { form: "bindings the first padded after", edit: bindingAt(0, `${FIRST_BINDING} `), reading: "bindings bindings-mismatch" },
  { form: "bindings the first extended", edit: bindingAt(0, `${FIRST_BINDING}y`), reading: "bindings bindings-mismatch" },
  { form: "bindings the first cut short", edit: bindingAt(0, FIRST_BINDING.slice(0, 4)), reading: "bindings bindings-mismatch" },
  { form: "bindings a soft hyphen in the first", edit: bindingAt(0, insertAt(FIRST_BINDING, 4, SOFT_HYPHEN)), reading: "bindings bindings-mismatch" },
  { form: "bindings the first null", edit: bindingAt(0, null), reading: "bindings bindings-mismatch" },
  { form: "status a one-element list of descriptor-only", edit: memberValue("status", [MECHANICAL_DESCRIPTOR_STATUS]), reading: "status status-unsupported" },
  { form: "status a nested list of descriptor-only", edit: memberValue("status", [[MECHANICAL_DESCRIPTOR_STATUS]]), reading: "status status-unsupported" },
  { form: "status capitalized", edit: memberValue("status", `${MECHANICAL_DESCRIPTOR_STATUS.charAt(0).toUpperCase()}${MECHANICAL_DESCRIPTOR_STATUS.slice(1)}`), reading: "status status-unsupported" },
  { form: "status upper-case", edit: memberValue("status", MECHANICAL_DESCRIPTOR_STATUS.toUpperCase()), reading: "status status-unsupported" },
  { form: "status padded before", edit: memberValue("status", ` ${MECHANICAL_DESCRIPTOR_STATUS}`), reading: "status status-unsupported" },
  { form: "status padded after", edit: memberValue("status", `${MECHANICAL_DESCRIPTOR_STATUS} `), reading: "status status-unsupported" },
  { form: "status extended", edit: memberValue("status", `${MECHANICAL_DESCRIPTOR_STATUS}-v2`), reading: "status status-unsupported" },
  { form: "status cut short", edit: memberValue("status", MECHANICAL_DESCRIPTOR_STATUS.slice(0, MECHANICAL_DESCRIPTOR_STATUS.indexOf("-"))), reading: "status status-unsupported" },
  { form: "status a soft hyphen inside", edit: memberValue("status", insertAt(MECHANICAL_DESCRIPTOR_STATUS, 10, SOFT_HYPHEN)), reading: "status status-unsupported" },
  { form: "status a fullwidth hyphen-minus", edit: memberValue("status", MECHANICAL_DESCRIPTOR_STATUS.replace("-", fullwidthOf("-"))), reading: "status status-unsupported" },
  { form: "status a line break after", edit: memberValue("status", `${MECHANICAL_DESCRIPTOR_STATUS}\n`), reading: "status status-unsupported" },
  { form: "status empty", edit: memberValue("status", ""), reading: "status status-unsupported" },
  { form: "note a one-element list of its text", edit: memberValue("note", [NOTE_TEXT]), reading: "note wrong-type" },
  { form: "note an object", edit: memberValue("note", {}), reading: "note wrong-type" },
  { form: "note a boolean", edit: memberValue("note", true), reading: "note wrong-type" },
];
/** R007-18: extra top-level member names beside the producer's (the case-folded reading of a name is GN09). */
const MEMBER_NAME_FORMS: readonly DescriptorForm[] = [
  { form: "Status beside status", edit: memberValue("Status", "planted"), reading: "descriptor member-unexpected" },
  { form: "STATUS beside status", edit: memberValue("STATUS", "planted"), reading: "descriptor member-unexpected" },
  { form: "Note beside note", edit: memberValue("Note", "planted"), reading: "descriptor member-unexpected" },
  { form: "Note in place of note", edit: object => memberValue("Note", NOTE_TEXT)(without("note")(object)), reading: "descriptor member-unexpected" },
  { form: "status padded before", edit: memberValue(" status", "planted"), reading: "descriptor member-unexpected" },
  { form: "status padded after", edit: memberValue("status ", "planted"), reading: "descriptor member-unexpected" },
  { form: "statuses, a name extended", edit: memberValue("statuses", "planted"), reading: "descriptor member-unexpected" },
  { form: "stat, a name cut short", edit: memberValue("stat", "planted"), reading: "descriptor member-unexpected" },
  { form: "one letter", edit: memberValue("s", "planted"), reading: "descriptor member-unexpected" },
  { form: "the empty name", edit: memberValue("", "planted"), reading: "descriptor member-unexpected" },
  { form: "status with a soft hyphen inside", edit: memberValue(insertAt("status", 3, SOFT_HYPHEN), "planted"), reading: "descriptor member-unexpected" },
  { form: "status with a zero width space inside", edit: memberValue(insertAt("status", 3, ZERO_WIDTH_SPACE), "planted"), reading: "descriptor member-unexpected" },
  { form: "status with a fullwidth first letter", edit: memberValue(`${fullwidthOf("s")}tatus`, "planted"), reading: "descriptor member-unexpected" },
  { form: "constructor", edit: memberValue("constructor", "planted"), reading: "descriptor member-unexpected" },
  { form: "toString", edit: memberValue("toString", "planted"), reading: "descriptor member-unexpected" },
  { form: "hasOwnProperty", edit: memberValue("hasOwnProperty", "planted"), reading: "descriptor member-unexpected" },
  { form: "__proto__", edit: memberValue("__proto__", "planted"), reading: "descriptor member-unexpected" },
];
/** R007-18: extra member names inside implementation beside package and export. */
const IMPLEMENTATION_NAME_FORMS: readonly DescriptorForm[] = [
  { form: "Package beside package", edit: implementationValue("Package", "planted"), reading: "implementation member-unexpected" },
  { form: "EXPORT beside export", edit: implementationValue("EXPORT", "planted"), reading: "implementation member-unexpected" },
  { form: "export padded before", edit: implementationValue(" export", "planted"), reading: "implementation member-unexpected" },
  { form: "exports, a name extended", edit: implementationValue("exports", "planted"), reading: "implementation member-unexpected" },
  { form: "exp, a name cut short", edit: implementationValue("exp", "planted"), reading: "implementation member-unexpected" },
  { form: "the empty name", edit: implementationValue("", "planted"), reading: "implementation member-unexpected" },
  { form: "package with a soft hyphen inside", edit: implementationValue(insertAt("package", 3, SOFT_HYPHEN), "planted"), reading: "implementation member-unexpected" },
  { form: "package with a fullwidth first letter", edit: implementationValue(`${fullwidthOf("p")}ackage`, "planted"), reading: "implementation member-unexpected" },
  { form: "constructor", edit: implementationValue("constructor", "planted"), reading: "implementation member-unexpected" },
  { form: "toString", edit: implementationValue("toString", "planted"), reading: "implementation member-unexpected" },
];
/** R010-11: value forms of the implementation's package and export (a list of the reviewed value is the GN02/GN03 reading). */
const IMPLEMENTATION_VALUE_FORMS: readonly DescriptorForm[] = [
  { form: "package a one-element list", edit: implementationValue("package", [REVIEWED.package]), reading: "package not-allowlisted" },
  { form: "package a nested list", edit: implementationValue("package", [[REVIEWED.package]]), reading: "package not-allowlisted" },
  { form: "package upper-case", edit: implementationValue("package", REVIEWED.package.toUpperCase()), reading: "package not-allowlisted" },
  { form: "package padded before", edit: implementationValue("package", ` ${REVIEWED.package}`), reading: "package not-allowlisted" },
  { form: "package an npm: alias spelling", edit: implementationValue("package", `npm:${REVIEWED.package}`), reading: "package not-allowlisted" },
  { form: "package a soft hyphen inside", edit: implementationValue("package", insertAt(REVIEWED.package, 1, SOFT_HYPHEN)), reading: "package not-allowlisted" },
  { form: "package a fullwidth solidus", edit: implementationValue("package", REVIEWED.package.replace("/", fullwidthOf("/"))), reading: "package not-allowlisted" },
  { form: "package a line break after", edit: implementationValue("package", `${REVIEWED.package}\n`), reading: "package not-allowlisted" },
  { form: "package a number", edit: implementationValue("package", 7), reading: "package not-allowlisted" },
  { form: "package null", edit: implementationValue("package", null), reading: "package not-allowlisted" },
  { form: "export a one-element list", edit: implementationValue("export", [REVIEWED.export]), reading: "export not-allowlisted" },
  { form: "export a nested list", edit: implementationValue("export", [[REVIEWED.export]]), reading: "export not-allowlisted" },
  { form: "export capitalized", edit: implementationValue("export", `${REVIEWED.export.charAt(0).toUpperCase()}${REVIEWED.export.slice(1)}`), reading: "export not-allowlisted" },
  { form: "export upper-case", edit: implementationValue("export", REVIEWED.export.toUpperCase()), reading: "export not-allowlisted" },
  { form: "export padded before", edit: implementationValue("export", ` ${REVIEWED.export}`), reading: "export not-allowlisted" },
  { form: "export a prefixed name", edit: implementationValue("export", `_${REVIEWED.export}`), reading: "export not-allowlisted" },
  { form: "export a soft hyphen inside", edit: implementationValue("export", insertAt(REVIEWED.export, 3, SOFT_HYPHEN)), reading: "export not-allowlisted" },
  { form: "export a fullwidth first letter", edit: implementationValue("export", `${fullwidthOf(REVIEWED.export.charAt(0))}${REVIEWED.export.slice(1)}`), reading: "export not-allowlisted" },
  { form: "export a line break after", edit: implementationValue("export", `${REVIEWED.export}\n`), reading: "export not-allowlisted" },
  { form: "export a number", edit: implementationValue("export", 7), reading: "export not-allowlisted" },
  { form: "export null", edit: implementationValue("export", null), reading: "export not-allowlisted" },
];
/** R008-10: digest forms planted in either pin member (a line break after is the GN23 reading), each refused pin-malformed. */
const DIGEST_FORMS: readonly { readonly form: string; readonly digest: (hex: string) => string }[] = [
  { form: "a line break after", digest: hex => `sha256:${hex}\n` },
  { form: "a line break before", digest: hex => `\nsha256:${hex}` },
  { form: "a carriage return after", digest: hex => `sha256:${hex}\r` },
  { form: "a line separator after", digest: hex => `sha256:${hex}${LINE_SEPARATOR}` },
  { form: "sixty-five digits", digest: hex => `sha256:${hex}0` },
  { form: "a lower-case letter that is no hex digit", digest: hex => `sha256:${hex.slice(0, -1)}g` },
  { form: "no colon", digest: hex => `sha256${hex}` },
  { form: "an upper-case algorithm", digest: hex => `SHA256:${hex}` },
  { form: "a hyphenated algorithm", digest: hex => `sha-256:${hex}` },
  { form: "empty", digest: () => "" },
];
/** R009-7: line-terminator forms of a schema reference (a line break after is the GN24 reading), each refused schema-ref-noncanonical. */
const LINE_FORMS: readonly { readonly form: string; readonly ref: (name: string) => string }[] = [
  { form: "a line break after", ref: name => `${name}\n` },
  { form: "a line break before", ref: name => `\n${name}` },
  { form: "a carriage return after", ref: name => `${name}\r` },
  { form: "a line separator after", ref: name => `${name}${LINE_SEPARATOR}` },
  { form: "a line break inside", ref: name => name.replace(".schema.json", "\n.schema.json") },
];
/** R009-8: names in the canonical grammar other than the reviewed name, each refused schema-ref-unknown. */
const UNKNOWN_NAME_FORMS: readonly { readonly form: string; readonly ref: (name: string) => string }[] = [
  { form: "a letter before the name", ref: name => `x${name}` },
  { form: "the name after its first hyphen", ref: name => name.slice(name.indexOf("-") + 1) },
  { form: "a part inserted before the ending", ref: name => name.replace(".schema.json", ".x.schema.json") },
  { form: "the name extended by a second ending", ref: name => `${name}.schema.json` },
  { form: "another version number", ref: name => name.replace(".v1.", ".v10.") },
];

describe("wb-ocie EAT-R007: Pi reads the exact producer descriptor file", () => {
  it("R007-1 the vendored fixture is MechanicalWorkflows f7c0a943's contracts/entrypoints/development.v1.json byte for byte (SHA-256 and git blob pins)", () => {
    expect(DESCRIPTOR_BYTES.length).toBe(PRODUCER.bytes);
    expect(sha256Of(DESCRIPTOR_BYTES)).toBe(PRODUCER.sha256);
    expect(gitBlobOf(DESCRIPTOR_BYTES)).toBe(PRODUCER.blob);
  });

  it("R007-2 the producer bytes resolve under the producer digest to the one reviewed entrypoint", async () => {
    const { options } = plant();
    const resolution = await resolved(options);
    expect(resolution.entry).toBe(REVIEWED);
    expect(resolution.descriptorDigest).toBe(PRODUCER_DIGEST);
  });

  it("R007-3 a byte-different descriptor with equal JSON content is refused digest-mismatch: the bytes are compared, never a parsed object", async () => {
    const reindented = mutated(`  "status": "descriptor-only",`, `   "status": "descriptor-only",`);
    expect(JSON.parse(reindented)).toEqual(JSON.parse(DESCRIPTOR_TEXT));
    const { options } = plant(reindented);
    await expectRefused({ ...options, pin: { ...options.pin, descriptorDigest: PRODUCER_DIGEST } }, "descriptor", "digest-mismatch");
  });

  it("R007-4 a descriptor that is missing or a directory is refused unreadable", async () => {
    const { root, options } = plant();
    await expectRefused({ ...options, descriptorPath: join(root, "contracts", "entrypoints", "absent.v1.json") }, "descriptor", "unreadable");
    await expectRefused({ ...options, descriptorPath: join(root, "contracts", "entrypoints") }, "descriptor", "unreadable");
  });

  it("R007-5 descriptor bytes that are not UTF-8, not JSON or not an object are refused under their own pin", async () => {
    const notUtf8 = Buffer.concat([Buffer.from(DESCRIPTOR_TEXT.slice(0, 20), "utf8"), Buffer.from([0xc3, 0x28]), Buffer.from(DESCRIPTOR_TEXT.slice(20), "utf8")]);
    const { root, options } = plant();
    const at = join(root, "contracts", "entrypoints", "other.v1.json");
    write(at, notUtf8);
    await expectRefused({ ...options, descriptorPath: at, pin: { ...options.pin, descriptorDigest: digestOf(notUtf8) } }, "descriptor", "malformed");
    const notJson = DESCRIPTOR_TEXT.slice(0, -3);
    write(at, notJson);
    await expectRefused({ ...options, descriptorPath: at, pin: { ...options.pin, descriptorDigest: digestOf(notJson) } }, "descriptor", "malformed");
    const notObject = `[${DESCRIPTOR_TEXT}]`;
    write(at, notObject);
    await expectRefused({ ...options, descriptorPath: at, pin: { ...options.pin, descriptorDigest: digestOf(notObject) } }, "descriptor", "wrong-type");
  });

  it("R007-6 a descriptor of another entrypoint schema version is refused schema-unsupported before any other member is judged", async () => {
    await expectRefused(plant(withMember("schema", MECHANICAL_ENTRYPOINT_SCHEMA, "mechanical-workflows/entrypoint/v2")).options, "schema", "schema-unsupported");
    const unknownAndV2 = withMember("schema", MECHANICAL_ENTRYPOINT_SCHEMA, "mechanical-workflows/entrypoint/v2").replace(`"id":`, `"loader": "x",\n  "id":`);
    await expectRefused(plant(unknownAndV2).options, "schema", "schema-unsupported");
  });

  it("R007-7 the producer's member set is closed: an extra member (loader at the top level, entry inside implementation; R007-18 plants the other names) is refused member-unexpected, a missing one (status) member-missing", async () => {
    await expectRefused(plant(mutated(`  "status": "descriptor-only",`, `  "status": "descriptor-only",\n  "loader": "./dist/index.js",`)).options, "descriptor", "member-unexpected");
    await expectRefused(plant(mutated(`  "status": "descriptor-only",\n`, "")).options, "status", "member-missing");
    await expectRefused(plant(mutated(`"export": "develop"`, `"export": "develop",\n    "entry": "dist/index.js"`)).options, "implementation", "member-unexpected");
  });

  it("R007-8 bindings other than the reviewed four in order, a status other than descriptor-only and a non-string note are refused", async () => {
    await expectRefused(plant(mutated(`"discover",\n    "compileContext"`, `"compileContext",\n    "discover"`)).options, "bindings", "bindings-mismatch");
    await expectRefused(plant(mutated(`,\n    "verify"\n`, "\n")).options, "bindings", "bindings-mismatch");
    await expectRefused(plant(mutated(`"verify"\n`, `"verify",\n    "publish"\n`)).options, "bindings", "bindings-mismatch");
    await expectRefused(plant(withMember("status", MECHANICAL_DESCRIPTOR_STATUS, "invocable")).options, "status", "status-unsupported");
    const note = (JSON.parse(DESCRIPTOR_TEXT) as { readonly note: string }).note;
    await expectRefused(plant(withMember("note", note, 7)).options, "note", "wrong-type");
  });

  it("R007-9 the SHA-256 is compared before the bytes are decoded or parsed: bytes that are not UTF-8 or not JSON, under the producer digest, are refused digest-mismatch", async () => {
    const { root, options } = plant();
    const at = join(root, "contracts", "entrypoints", "other.v1.json");
    for (const bytes of [Buffer.concat([Buffer.from(DESCRIPTOR_TEXT.slice(0, 20), "utf8"), Buffer.from([0xc3, 0x28]), Buffer.from(DESCRIPTOR_TEXT.slice(20), "utf8")]), Buffer.from(DESCRIPTOR_TEXT.slice(0, -3), "utf8")]) {
      write(at, bytes);
      await expectRefused({ ...options, descriptorPath: at, pin: { ...options.pin, descriptorDigest: PRODUCER_DIGEST } }, "descriptor", "digest-mismatch");
    }
  });

  it("R007-10 descriptor bytes whose JSON value is null, a string, a number or a boolean are refused wrong-type under their own pin, never thrown", async () => {
    const { root, options } = plant();
    const at = join(root, "contracts", "entrypoints", "other.v1.json");
    for (const text of ["null", JSON.stringify(DESCRIPTOR_TEXT), "7", "true"]) {
      write(at, text);
      await expectRefused({ ...options, descriptorPath: at, pin: { ...options.pin, descriptorDigest: digestOf(text) } }, "descriptor", "wrong-type");
    }
  });

  it.each(REQUIRED_MEMBERS)("R007-11 the required %s member absent is refused member-missing under its own name", async name => {
    ran("R007-11", name);
    await expectRefused(plant(rendered(without(name))).options, name, "member-missing");
  });

  it("R007-11 a missing schema is refused schema-unsupported, an implementation without package or export member-missing (an extra member first), and note may be absent, empty or another text", async () => {
    await expectRefused(plant(rendered(without("schema"))).options, "schema", "schema-unsupported");
    for (const member of ["package", "export"]) {
      await expectRefused(plant(rendered(object => ({ ...object, implementation: without(member)(implementationOf(object)) }))).options, "implementation", "member-missing");
    }
    const extraAndMissing = rendered(object => ({ ...object, implementation: { ...without("export")(implementationOf(object)), entry: "dist/index.js" } }));
    await expectRefused(plant(extraAndMissing).options, "implementation", "member-unexpected");
    const notes = [rendered(without("note")), rendered(object => ({ ...object, note: "" })), rendered(object => ({ ...object, note: "another text, read no further" }))];
    expect(await Promise.all(notes.map(readingOf))).toEqual(["admitted", "admitted", "admitted"]);
  });

  it("R007-12 a member of the wrong JSON type is refused under its own name, never thrown (fourteen cases over the eight members)", async () => {
    const cases: readonly { readonly edit: (object: DescriptorObject) => DescriptorObject; readonly reading: string }[] = [
      { edit: object => ({ ...object, schema: 1 }), reading: "schema schema-unsupported" },
      { edit: object => ({ ...object, id: 7 }), reading: "id wrong-type" },
      { edit: object => ({ ...object, id: null }), reading: "id wrong-type" },
      { edit: object => ({ ...object, implementation: null }), reading: "implementation wrong-type" },
      { edit: object => ({ ...object, implementation: [REVIEWED.package, REVIEWED.export] }), reading: "implementation wrong-type" },
      { edit: object => ({ ...object, implementation: `${REVIEWED.package}#${REVIEWED.export}` }), reading: "implementation wrong-type" },
      { edit: object => ({ ...object, inputSchema: 7 }), reading: "inputSchema wrong-type" },
      { edit: object => ({ ...object, outputSchema: null }), reading: "outputSchema wrong-type" },
      { edit: object => ({ ...object, bindings: null }), reading: "bindings bindings-mismatch" },
      { edit: object => ({ ...object, bindings: REVIEWED.bindings.join(",") }), reading: "bindings bindings-mismatch" },
      { edit: object => ({ ...object, bindings: { ...REVIEWED.bindings, length: REVIEWED.bindings.length } }), reading: "bindings bindings-mismatch" },
      { edit: object => ({ ...object, bindings: "abcd" }), reading: "bindings bindings-mismatch" },
      { edit: object => ({ ...object, status: null }), reading: "status status-unsupported" },
      { edit: object => ({ ...object, note: null }), reading: "note wrong-type" },
    ];
    expect(await Promise.all(cases.map(({ edit }) => readingOf(rendered(edit))))).toEqual(cases.map(({ reading }) => reading));
    expect(cases).toHaveLength(14);
  });

  it("R007-13 the first refusal wins, in the header's order: the schema, the member set (an extra member, then an absent one), then member by member in the producer file's order", async () => {
    const setLevel: readonly Fault[] = [
      { reading: "schema schema-unsupported", edit: object => ({ ...object, schema: "mechanical-workflows/entrypoint/v2" }) },
      { reading: "descriptor member-unexpected", edit: object => ({ ...object, loader: "./dist/index.js" }) },
      { reading: "status member-missing", edit: without("status") },
      { reading: "id wrong-type", edit: object => ({ ...object, id: 7 }) },
    ];
    expect(await ladderOf(setLevel)).toEqual([...setLevel.map(({ reading }) => reading), "admitted"]);
    const memberLevel: readonly Fault[] = [
      { reading: "id not-allowlisted", edit: object => ({ ...object, id: "mechanical.development.develop.v2" }) },
      { reading: "implementation member-unexpected", edit: object => ({ ...object, implementation: { ...implementationOf(object), entry: "dist/index.js" } }) },
      { reading: "package not-allowlisted", edit: object => ({ ...object, implementation: { ...implementationOf(object), package: "@mechanical/workflows-coordination" } }) },
      { reading: "export not-allowlisted", edit: object => ({ ...object, implementation: { ...implementationOf(object), export: "developLive" } }) },
      { reading: "inputSchema schema-ref-noncanonical", edit: object => ({ ...object, inputSchema: `../schemas/${REVIEWED.inputSchema}` }) },
      { reading: "outputSchema schema-ref-unknown", edit: object => ({ ...object, outputSchema: REVIEWED.outputSchema.replace(".v1.", ".v2.") }) },
      { reading: "bindings bindings-mismatch", edit: object => ({ ...object, bindings: [...REVIEWED.bindings].reverse() }) },
      { reading: "status status-unsupported", edit: object => ({ ...object, status: "invocable" }) },
      { reading: "note wrong-type", edit: object => ({ ...object, note: 7 }) },
    ];
    expect(await ladderOf(memberLevel)).toEqual([...memberLevel.map(({ reading }) => reading), "admitted"]);
    expect([setLevel.length, memberLevel.length]).toEqual([4, 9]);
  });

  it("R007-14 the schema id is compared exactly: upper-case, padded, another version, another producer and the bare entrypoint/v1 are refused schema-unsupported", async () => {
    const spellings = [
      MECHANICAL_ENTRYPOINT_SCHEMA.toUpperCase(),
      ` ${MECHANICAL_ENTRYPOINT_SCHEMA}`,
      `${MECHANICAL_ENTRYPOINT_SCHEMA} `,
      MECHANICAL_ENTRYPOINT_SCHEMA.replace("/v1", "/v1.0"),
      MECHANICAL_ENTRYPOINT_SCHEMA.replace("mechanical-workflows/", "other-producer/"),
      MECHANICAL_ENTRYPOINT_SCHEMA.replace("mechanical-workflows/", ""),
    ];
    expect(await Promise.all(spellings.map(schema => readingOf(rendered(object => ({ ...object, schema })))))).toEqual(spellings.map(() => "schema schema-unsupported"));
    expect(spellings).toHaveLength(6);
  });

  it("R007-15 the suite's edits start from the producer bytes: the producer object's two-space rendering is those bytes, and the required members are the producer's own but schema and note", () => {
    expect(rendered(object => object)).toBe(DESCRIPTOR_TEXT);
    expect(REQUIRED_MEMBERS).toEqual(["id", "implementation", "inputSchema", "outputSchema", "bindings", "status"]);
  });

  it("R007-16 a UTF-8 byte order mark before the producer text is dropped by the decoder: those bytes are admitted under their own pin with one load and refused digest-mismatch under the producer digest; a second mark after the first and a UTF-16 mark are refused malformed under their own pins", async () => {
    const { root, options } = plant();
    const at = join(root, "contracts", "entrypoints", "marked.v1.json");
    const utf8Mark = Buffer.from([0xef, 0xbb, 0xbf]);
    const marked = Buffer.concat([utf8Mark, DESCRIPTOR_BYTES]);
    write(at, marked);
    const { loader, calls } = recordingLoader();
    const outcome = await admitMechanicalEntrypoint({ ...options, descriptorPath: at, pin: { ...options.pin, descriptorDigest: digestOf(marked) } }, loader);
    expect({ admitted: outcome.ok, loads: calls.length }).toEqual({ admitted: true, loads: 1 });
    await expectRefused({ ...options, descriptorPath: at }, "descriptor", "digest-mismatch");
    for (const bytes of [Buffer.concat([utf8Mark, utf8Mark, DESCRIPTOR_BYTES]), Buffer.concat([Buffer.from([0xff, 0xfe]), DESCRIPTOR_BYTES])]) {
      write(at, bytes);
      await expectRefused({ ...options, descriptorPath: at, pin: { ...options.pin, descriptorDigest: digestOf(bytes) } }, "descriptor", "malformed");
    }
  });

  it("R007-17 the schema, id, bindings, status and note members are judged by strict equality and by type: each of the forty-four value forms VALUE_FORMS plants (lists of the exact value, case, padding, a longer or shorter text, ignorable, compatibility and line-break variants, empty, wrong types) is refused under its own name with zero loads", async () => {
    expect(await readingsByForm(VALUE_FORMS)).toEqual(refusedReadings(VALUE_FORMS));
  });

  it("R007-18 the member sets are compared name for name: each of the seventeen extra names MEMBER_NAME_FORMS plants beside the producer's members is refused member-unexpected, and each of the ten IMPLEMENTATION_NAME_FORMS plants inside implementation is refused implementation member-unexpected, with zero loads", async () => {
    expect(await readingsByForm(MEMBER_NAME_FORMS)).toEqual(refusedReadings(MEMBER_NAME_FORMS));
    expect(await readingsByForm(IMPLEMENTATION_NAME_FORMS)).toEqual(refusedReadings(IMPLEMENTATION_NAME_FORMS));
  });

  it("R007-19 the cut #3 descriptor tables are frozen by name: forty-four value forms, seventeen member names and ten implementation member names", () => {
    expect(VALUE_FORMS.map(({ form }) => form)).toEqual(["schema a one-element list of the id", "schema a nested list of the id", "schema a soft hyphen inside", "schema a zero width space inside", "schema a fullwidth solidus", "schema a line break after", "schema a line break before", "schema empty", "id a one-element list of the reviewed id", "id padded before", "id padded after", "id upper-case", "id a prefix of the reviewed id", "id the reviewed id extended by a segment", "id the reviewed id extended by a digit", "id a soft hyphen inside", "id a fullwidth full stop", "id a line break after", "id empty", "bindings the first a one-element list", "bindings the last a one-element list", "bindings each a one-element list", "bindings the first capitalized", "bindings the first padded before", "bindings the first padded after", "bindings the first extended", "bindings the first cut short", "bindings a soft hyphen in the first", "bindings the first null", "status a one-element list of descriptor-only", "status a nested list of descriptor-only", "status capitalized", "status upper-case", "status padded before", "status padded after", "status extended", "status cut short", "status a soft hyphen inside", "status a fullwidth hyphen-minus", "status a line break after", "status empty", "note a one-element list of its text", "note an object", "note a boolean"]);
    expect(MEMBER_NAME_FORMS.map(({ form }) => form)).toEqual(["Status beside status", "STATUS beside status", "Note beside note", "Note in place of note", "status padded before", "status padded after", "statuses, a name extended", "stat, a name cut short", "one letter", "the empty name", "status with a soft hyphen inside", "status with a zero width space inside", "status with a fullwidth first letter", "constructor", "toString", "hasOwnProperty", "__proto__"]);
    expect(IMPLEMENTATION_NAME_FORMS.map(({ form }) => form)).toEqual(["Package beside package", "EXPORT beside export", "export padded before", "exports, a name extended", "exp, a name cut short", "the empty name", "package with a soft hyphen inside", "package with a fullwidth first letter", "constructor", "toString"]);
  });

  it("R007-20 RESIDUAL R-DUPLICATE-MEMBER, its quiet row: a member written twice reads as one member, the last written (JSON.parse keeps the last), so no duplicate is refused: status written invocable then descriptor-only is admitted under its own pin, and descriptor-only then invocable is refused status-unsupported", async () => {
    const twice = (first: string, last: string): string =>
      mutated(`  "status": "descriptor-only",`, `  "status": ${JSON.stringify(first)},\n  "status": ${JSON.stringify(last)},`);
    expect([await loadedReadingOf(twice("invocable", MECHANICAL_DESCRIPTOR_STATUS)), await loadedReadingOf(twice(MECHANICAL_DESCRIPTOR_STATUS, "invocable"))]).toEqual([
      "admitted loads=1",
      "status status-unsupported loads=0",
    ]);
  });

  it("R007-21 an implementation carrying an own member named __proto__ beside package and export (the gate's WG04 form; JSON.parse keeps __proto__ as an own member, the name MEMBER_NAME_FORMS plants at the top level) is refused implementation member-unexpected with zero loads", async () => {
    const text = rendered(implementationValue("__proto__", "planted"));
    expect(Object.keys(implementationOf(JSON.parse(text) as DescriptorObject)), "the planted implementation holds an own __proto__ member").toEqual(["package", "export", "__proto__"]);
    expect(await loadedReadingOf(text)).toBe("implementation member-unexpected loads=0");
  });

  it("R007-22 absent members are judged in the producer file's order (the gate's WG03 form): with id and status absent the refusal is id member-missing with zero loads, and with id, implementation, inputSchema, outputSchema, bindings and status all absent and each cured in turn from the first, the refusal names each next absent member, ending admitted", async () => {
    expect(await loadedReadingOf(rendered(without("id", "status")))).toBe("id member-missing loads=0");
    const absent: readonly Fault[] = REQUIRED_MEMBERS.map(name => ({ reading: `${name} member-missing`, edit: without(name) }));
    expect(absent.map(({ reading }) => reading)).toEqual(["id member-missing", "implementation member-missing", "inputSchema member-missing", "outputSchema member-missing", "bindings member-missing", "status member-missing"]);
    expect(await ladderOf(absent)).toEqual([...absent.map(({ reading }) => reading), "admitted"]);
  });
});

describe("wb-ocie EAT-R008: Pi refuses artifact bytes that differ from their SHA-256 pin", () => {
  it("R008-1 the exact pinned bytes pass: one load receives those measured bytes and their digest, and the reviewed export comes back", async () => {
    const { options, artifactBytes } = plant();
    const { loader, calls } = recordingLoader();
    const outcome = await admitMechanicalEntrypoint(options, loader);
    expect(outcome.ok).toBe(true);
    if (!outcome.ok) return;
    expect(calls).toHaveLength(1);
    expect(Buffer.from(calls[0]?.artifact.bytes ?? new Uint8Array()).equals(artifactBytes)).toBe(true);
    expect(calls[0]?.artifact.digest).toBe(options.pin.artifactDigest);
    expect(outcome.artifact.digest).toBe(options.pin.artifactDigest);
    expect(outcome.exported()).toBe("planted develop");
  });

  it("R008-2 one byte flipped before resolution is refused digest-mismatch with zero loads", async () => {
    const { options } = plant();
    flipOneByte(options.artifactPath);
    await expectRefused(options, "artifact", "digest-mismatch");
  });

  it("R008-3 one byte flipped after descriptor resolution is refused at load: zero loads, zero provider calls", async () => {
    const { options } = plant();
    const resolution = await resolved(options);
    flipOneByte(options.artifactPath);
    let providerCalls = 0;
    const { loader, calls } = fixedLoader({
      develop: () => {
        providerCalls += 1;
      },
    });
    const load = await loadMechanicalEntrypoint(resolution, loader);
    expect(loadRefusal(load)).toEqual(refused("artifact", "digest-mismatch"));
    expect({ loads: calls.length, providerCalls }).toEqual({ loads: 0, providerCalls: 0 });
  });

  it("R008-4 the digest is of the bytes, not the name: the same bytes under another file name pass, and the pin of the name's text fails", async () => {
    const { root, options, artifactBytes } = plant();
    const renamed = join(root, "package", "renamed-artifact.mjs");
    write(renamed, artifactBytes);
    const { loader, calls } = recordingLoader();
    const outcome = await admitMechanicalEntrypoint({ ...options, artifactPath: renamed }, loader);
    expect(outcome.ok).toBe(true);
    expect(calls).toHaveLength(1);
    await expectRefused({ ...options, pin: { ...options.pin, artifactDigest: digestOf(options.artifactPath) } }, "artifact", "digest-mismatch");
  });

  it("R008-5 a malformed release pin is refused before any file is read", { timeout: 30_000 }, async ({ task }) => {
    const { options } = plant();
    const hex = sha256Of(readFileSync(options.artifactPath));
    const artifactDigests = [hex, `sha256:${hex.slice(1)}`, `sha256:${hex.toUpperCase()}`, `sha512:${hex}`, `sha256:${hex} `];
    for (const artifactDigest of artifactDigests) {
      await expectRefused({ ...options, descriptorPath: join(options.approvedRoot, "absent.json"), pin: { ...options.pin, artifactDigest } }, "pin", "pin-malformed");
    }
    await expectRefused({ ...options, pin: { ...options.pin, descriptorDigest: PRODUCER.sha256 } }, "pin", "pin-malformed");
    const rows: LegRow[] = [
      ...artifactDigests.map((artifactDigest, index): LegRow => [`artifactDigest ${index}`, { ...options.pin, artifactDigest }]),
      ["descriptorDigest the bare hex", { ...options.pin, descriptorDigest: PRODUCER.sha256 }],
    ];
    expect(await readOrderLeg(task.name, options, rows)).toStrictEqual(legRefused(rows));
  });

  it("R008-6 each pin digest is a string sha256:<64 lower-case hex>, judged before any file is read: nine malformed forms in either digest, and four pins that are not a digest pair object, are refused pin-malformed", { timeout: 30_000 }, async ({ task }) => {
    const { options } = plant();
    const hex = sha256Of(readFileSync(options.artifactPath));
    const absent = join(options.approvedRoot, "absent.json");
    const forms: readonly unknown[] = [hex, `sha256:${hex.slice(1)}`, `sha256:${hex.toUpperCase()}`, `sha512:${hex}`, `sha256:${hex} `, ` sha256:${hex}`, 7, null, { toString: () => `sha256:${hex}` }];
    for (const member of ["descriptorDigest", "artifactDigest"] as const) {
      for (const digest of forms) {
        const pin = { ...options.pin, [member]: digest } as unknown as MechanicalReleasePin;
        await expectRefused({ ...options, descriptorPath: absent, pin }, "pin", "pin-malformed");
      }
    }
    const notPins: readonly unknown[] = [undefined, null, `sha256:${hex}`, [options.pin.descriptorDigest, options.pin.artifactDigest]];
    for (const pin of notPins) {
      await expectRefused({ ...options, descriptorPath: absent, pin: pin as unknown as MechanicalReleasePin }, "pin", "pin-malformed");
    }
    expect([forms.length, notPins.length]).toEqual([9, 4]);
    const rows: LegRow[] = [
      ...(["descriptorDigest", "artifactDigest"] as const).flatMap(member => forms.map((digest, index): LegRow => [`${member} ${index}`, { ...options.pin, [member]: digest }])),
      ...notPins.map((pin, index): LegRow => [`not a pin ${index}`, pin]),
    ];
    expect(await readOrderLeg(task.name, options, rows)).toStrictEqual(legRefused(rows));
  });

  it("R008-7 an admitted load never calls the export: the reviewed export comes back uncalled, as the loader returned it", async () => {
    const { options } = plant();
    let exportCalls = 0;
    const develop = (): string => {
      exportCalls += 1;
      return "called";
    };
    const { loader, calls } = fixedLoader({ develop });
    const outcome = await admitMechanicalEntrypoint(options, loader);
    expect(outcome.ok).toBe(true);
    if (!outcome.ok) return;
    expect({ loads: calls.length, exportCalls, returned: outcome.exported === develop }).toEqual({ loads: 1, exportCalls: 0, returned: true });
  });

  it("R008-8 a loader that throws or rejects propagates its own error from the admission and is run once, never again", async () => {
    for (const mode of ["throws", "rejects"] as const) {
      const { options } = plant();
      const failure = new Error(`the host loader ${mode}`);
      let loads = 0;
      const loader: MechanicalExportLoader =
        mode === "throws"
          ? () => {
              loads += 1;
              throw failure;
            }
          : async () => {
              loads += 1;
              throw failure;
            };
      await expect(admitMechanicalEntrypoint(options, loader)).rejects.toBe(failure);
      expect(loads, mode).toBe(1);
    }
  });

  it("R008-9 a pin is read as an object holding the two digests: a list or a function carrying both digest members, an empty object and an object missing one digest are refused pin-malformed before any file is read; an object whose digests are inherited, a null-prototype object and a frozen object are each admitted with one load", { timeout: 30_000 }, async ({ task }) => {
    const { options } = plant();
    const absent = join(options.approvedRoot, "absent.json");
    const { descriptorDigest, artifactDigest } = options.pin;
    const digests = { descriptorDigest, artifactDigest };
    const notObjects: readonly unknown[] = [
      Object.assign([descriptorDigest, artifactDigest], digests),
      Object.assign(() => digests, digests),
      {},
      { descriptorDigest },
      { artifactDigest },
    ];
    for (const pin of notObjects) {
      await expectRefused({ ...options, descriptorPath: absent, pin: pin as MechanicalReleasePin }, "pin", "pin-malformed");
    }
    expect(notObjects).toHaveLength(5);
    const objects: readonly unknown[] = [Object.create(digests), Object.assign(Object.create(null), digests), Object.freeze({ ...digests })];
    const readings: string[] = [];
    for (const pin of objects) {
      const { loader, calls } = recordingLoader();
      const outcome = await admitMechanicalEntrypoint({ ...options, pin: pin as MechanicalReleasePin }, loader);
      readings.push(`${readingOfOutcome(outcome)} loads=${calls.length}`);
    }
    expect(readings).toEqual(["admitted loads=1", "admitted loads=1", "admitted loads=1"]);
    expect(objects).toHaveLength(3);
    const rows = notObjects.map((pin, index): LegRow => [`not an object ${index}`, pin]);
    expect(await readOrderLeg(task.name, options, rows)).toStrictEqual(legRefused(rows));
  });

  it("R008-10 the digest grammar is anchored at the whole string: each of the ten DIGEST_FORMS (a line break, carriage return or line separator before or after, sixty-five digits, a letter that is no hex digit, no colon, an upper-case or hyphenated algorithm, empty) is refused pin-malformed in either digest before any file is read", { timeout: 30_000 }, async ({ task }) => {
    const { options } = plant();
    const absent = join(options.approvedRoot, "absent.json");
    const readings: Record<string, string> = {};
    for (const name of ["descriptorDigest", "artifactDigest"] as const) {
      const hex = options.pin[name].slice("sha256:".length);
      for (const { form, digest } of DIGEST_FORMS) {
        const outcome = await refusalOf({ ...options, descriptorPath: absent, pin: { ...options.pin, [name]: digest(hex) } });
        readings[`${name} ${form}`] = `${diagnosticReading(outcome.diagnostic)} loads=${outcome.loads}`;
      }
    }
    const names = ["descriptorDigest", "artifactDigest"];
    expect(readings).toEqual(Object.fromEntries(names.flatMap(name => DIGEST_FORMS.map(({ form }) => [`${name} ${form}`, "pin pin-malformed loads=0"]))));
    const rows = (["descriptorDigest", "artifactDigest"] as const).flatMap(name =>
      DIGEST_FORMS.map(({ form, digest }): LegRow => [`${name} ${form}`, { ...options.pin, [name]: digest(options.pin[name].slice("sha256:".length)) }]),
    );
    expect(await readOrderLeg(task.name, options, rows)).toStrictEqual(legRefused(rows));
  });

  it("R008-11 the digest forms are frozen by name: ten", () => {
    expect(DIGEST_FORMS.map(({ form }) => form)).toEqual(["a line break after", "a line break before", "a carriage return after", "a line separator after", "sixty-five digits", "a lower-case letter that is no hex digit", "no colon", "an upper-case algorithm", "a hyphenated algorithm", "empty"]);
  });

  it("R008-12 COMPUTED SCAN of the digest grammar: with one digit of a valid artifact digest replaced by each BMP code point (0000-ffff, each lone surrogate included), MECHANICAL_DIGEST_PATTERN admits exactly the sixteen lower-case hex digits; through the boundary, each of the 128 ASCII code points in that place is refused pin-malformed before any file is read unless it is a lower-case hex digit, which reaches the absent descriptor (unreadable)", { timeout: 30_000 }, async ({ task }) => {
    const { options } = plant();
    const hex = options.pin.artifactDigest.slice("sha256:".length);
    const at = (point: number): string => `sha256:${hex.slice(0, 31)}${String.fromCodePoint(point)}${hex.slice(32)}`;
    const admitted: string[] = [];
    for (let point = 0; point <= 0xffff; point += 1) if (MECHANICAL_DIGEST_PATTERN.test(at(point))) admitted.push(String.fromCodePoint(point));
    expect(admitted.join("")).toBe("0123456789abcdef");
    const absent = join(options.approvedRoot, "absent.json");
    const readings = await Promise.all(
      Array.from({ length: 128 }, async (_, point) => {
        const outcome = await refusalOf({ ...options, descriptorPath: absent, pin: { ...options.pin, artifactDigest: at(point) } });
        return diagnosticReading(outcome.diagnostic);
      }),
    );
    const isHexDigit = (point: number): boolean => (point >= 0x30 && point <= 0x39) || (point >= 0x61 && point <= 0x66);
    expect(readings).toEqual(Array.from({ length: 128 }, (_, point) => (isHexDigit(point) ? "descriptor unreadable" : "pin pin-malformed")));
    const rows = Array.from({ length: 128 }, (_, point) => point)
      .filter(point => !isHexDigit(point))
      .map((point): LegRow => [`U+${point.toString(16).padStart(4, "0")}`, { ...options.pin, artifactDigest: at(point) }]);
    expect(await readOrderLeg(task.name, options, rows)).toStrictEqual(legRefused(rows));
  });

  it("R008-13 COMPUTED SCAN of compatibility forms through the boundary (the gate's WG02 form): with each of the 71 code points of a valid digest (sha256: and its 64 hex digits), one place at a time, replaced by its fullwidth compatibility form, which NFKC maps back to that digest, each of the 142 pins (either digest member in turn) is refused pin-malformed with zero loads before any file is read", { timeout: 30_000 }, async ({ task }) => {
    const { options } = plant();
    const absent = join(options.approvedRoot, "absent.json");
    const planted: { readonly at: string; readonly pin: MechanicalReleasePin }[] = [];
    for (const member of ["descriptorDigest", "artifactDigest"] as const) {
      const digest = options.pin[member];
      for (let at = 0; at < digest.length; at += 1) {
        const form = `${digest.slice(0, at)}${fullwidthOf(digest.charAt(at))}${digest.slice(at + 1)}`;
        expect(form.normalize("NFKC"), `${member} ${at}: NFKC maps the form back to the digest`).toBe(digest);
        planted.push({ at: `${member} ${at}`, pin: { ...options.pin, [member]: form } });
      }
    }
    const readings = await Promise.all(
      planted.map(async ({ at, pin }) => {
        const outcome = await refusalOf({ ...options, descriptorPath: absent, pin });
        return `${at} ${diagnosticReading(outcome.diagnostic)} loads=${outcome.loads}`;
      }),
    );
    expect(readings).toEqual(planted.map(({ at }) => `${at} pin pin-malformed loads=0`));
    expect(planted).toHaveLength(142);
    const rows = planted.map(({ at, pin }): LegRow => [at, pin]);
    expect(await readOrderLeg(task.name, options, rows)).toStrictEqual(legRefused(rows));
  });

  it("R008-14 the read-order legs (wb-dhfk): the cases of this file whose titles carry the order words of the module header's step 1 are exactly the cases that ran a leg, in run order, and each leg was handed its case's rows (R008-5 6, R008-6 22, R008-9 5, R008-10 20, R008-12 112, R008-13 142), so a leg cut at its call site or moved to another case reds here", ({ task }) => {
    const titled: string[] = [];
    const walk = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test" && child.name.includes(READ_ORDER_WORDS)) titled.push(titleHeadOf(child.name));
        else if (child.type === "suite") walk(child.tasks);
      }
    };
    walk(task.file.tasks);
    expect(Object.keys(READ_ORDER_LEGS), "the cases that ran a read-order leg, in run order").toEqual(titled);
    expect(READ_ORDER_LEGS).toStrictEqual({ "R008-5": 6, "R008-6": 22, "R008-9": 5, "R008-10": 20, "R008-12": 112, "R008-13": 142 });
  });
});

/** The noncanonical forms one schema reference is mutated to; each must be refused before import. */
const NONCANONICAL_FORMS: readonly { readonly form: string; readonly ref: (name: string) => string }[] = [
  { form: "parent traversal", ref: name => `../schemas/${name}` },
  { form: "absolute path", ref: name => `/contracts/schemas/${name}` },
  { form: "URL", ref: name => `https://example.invalid/contracts/schemas/${name}` },
  { form: "file URL", ref: name => `file:///contracts/schemas/${name}` },
  { form: "directory segment", ref: name => `schemas/${name}` },
  { form: "dot segment", ref: name => `./${name}` },
  { form: "backslash traversal", ref: name => `..\\schemas\\${name}` },
  { form: "trailing traversal", ref: name => `${name}/../${name}` },
];
/** The grammar forms (MECHANICAL_SCHEMA_REF_PATTERN's words: lower-case, the opening code point, the .schema.json ending, the code point classes) a reference is mutated to. */
const GRAMMAR_FORMS: readonly { readonly form: string; readonly ref: (name: string) => string }[] = [
  { form: "capitalized", ref: name => `${name.charAt(0).toUpperCase()}${name.slice(1)}` },
  { form: "upper-case", ref: name => name.toUpperCase() },
  { form: "leading hyphen", ref: name => `-${name}` },
  { form: "leading dot", ref: name => `.${name}` },
  { form: "underscore", ref: name => name.replace("-", "_") },
  { form: "no .schema infix", ref: name => name.replace(".schema.json", ".json") },
  { form: "suffix after .schema.json", ref: name => `${name}.bak` },
  { form: "trailing space", ref: name => `${name} ` },
  { form: "empty", ref: () => "" },
];

describe("wb-ocie EAT-R009: Pi refuses noncanonical schema references", () => {
  it("R009-1 the producer's bare canonical names are the positive control: pin equality with the reviewed names", async () => {
    const producer = JSON.parse(DESCRIPTOR_TEXT) as { readonly inputSchema: string; readonly outputSchema: string };
    expect([producer.inputSchema, producer.outputSchema]).toEqual([REVIEWED.inputSchema, REVIEWED.outputSchema]);
    const resolution = await resolved(plant().options);
    expect([resolution.entry.inputSchema, resolution.entry.outputSchema]).toEqual([producer.inputSchema, producer.outputSchema]);
  });

  it("R009-4 the mutation forms are frozen: the acceptance's ../schemas, absolute path and URL first, then five more", () => {
    expect(NONCANONICAL_FORMS.map(({ form }) => form)).toEqual([
      "parent traversal", "absolute path", "URL", "file URL", "directory segment", "dot segment", "backslash traversal", "trailing traversal",
    ]);
    expect(NONCANONICAL_FORMS[0]?.ref("x.schema.json")).toBe("../schemas/x.schema.json");
  });

  it("R009-5 the grammar forms are frozen: case, the opening code point, the ending and the code point classes, nine by name", () => {
    expect(GRAMMAR_FORMS.map(({ form }) => form)).toEqual([
      "capitalized", "upper-case", "leading hyphen", "leading dot", "underscore", "no .schema infix", "suffix after .schema.json", "trailing space", "empty",
    ]);
    expect(GRAMMAR_FORMS.map(({ ref }) => ref("ab-c.v1.schema.json"))).toEqual([
      "Ab-c.v1.schema.json", "AB-C.V1.SCHEMA.JSON", "-ab-c.v1.schema.json", ".ab-c.v1.schema.json", "ab_c.v1.schema.json", "ab-c.v1.json", "ab-c.v1.schema.json.bak", "ab-c.v1.schema.json ", "",
    ]);
  });

  for (const member of ["inputSchema", "outputSchema"] as const) {
    it.each(NONCANONICAL_FORMS)(`R009-2 ${member} mutated to the $form form is refused schema-ref-noncanonical with zero loads`, async ({ form, ref }) => {
      ran(`R009-2 ${member}`, form);
      const name = REVIEWED[member];
      await expectRefused(plant(withMember(member, name, ref(name))).options, member, "schema-ref-noncanonical");
    });

    it.each(GRAMMAR_FORMS)(`R009-6 ${member} mutated to the $form grammar form is refused schema-ref-noncanonical with zero loads`, async ({ form, ref }) => {
      ran(`R009-6 ${member}`, form);
      const name = REVIEWED[member];
      await expectRefused(plant(withMember(member, name, ref(name))).options, member, "schema-ref-noncanonical");
    });

    it(`R009-3 ${member} mutated to an unknown canonical schema is refused schema-ref-unknown with zero loads`, async () => {
      const name = REVIEWED[member];
      await expectRefused(plant(withMember(member, name, name.replace(".v1.", ".v2."))).options, member, "schema-ref-unknown");
      const other = member === "inputSchema" ? REVIEWED.outputSchema : REVIEWED.inputSchema;
      await expectRefused(plant(withMember(member, name, other)).options, member, "schema-ref-unknown");
    });
  }

  it("R009-7 the schema-reference grammar is anchored at the whole text: each of the five LINE_FORMS (a line break before, after or inside, a carriage return or line separator after) is refused schema-ref-noncanonical in either member with zero loads", async () => {
    const readings: Record<string, string> = {};
    for (const name of ["inputSchema", "outputSchema"] as const) {
      for (const { form, ref } of LINE_FORMS) readings[`${name} ${form}`] = await loadedReadingOf(rendered(memberValue(name, ref(REVIEWED[name]))));
    }
    const names = ["inputSchema", "outputSchema"];
    expect(readings).toEqual(Object.fromEntries(names.flatMap(name => LINE_FORMS.map(({ form }) => [`${name} ${form}`, `${name} schema-ref-noncanonical loads=0`]))));
  });

  it("R009-8 a canonical name is admitted only when it equals the reviewed name: each of the five UNKNOWN_NAME_FORMS (a letter before it, its part after the first hyphen, a part inserted before the ending, a second ending, another version number) is refused schema-ref-unknown in either member with zero loads", async () => {
    const readings: Record<string, string> = {};
    for (const name of ["inputSchema", "outputSchema"] as const) {
      for (const { form, ref } of UNKNOWN_NAME_FORMS) readings[`${name} ${form}`] = await loadedReadingOf(rendered(memberValue(name, ref(REVIEWED[name]))));
    }
    const names = ["inputSchema", "outputSchema"];
    expect(readings).toEqual(Object.fromEntries(names.flatMap(name => UNKNOWN_NAME_FORMS.map(({ form }) => [`${name} ${form}`, `${name} schema-ref-unknown loads=0`]))));
  });

  it("R009-9 the line and unknown-name forms are frozen by name: five each, and every unknown-name form of each reviewed name is in the canonical grammar", () => {
    expect(LINE_FORMS.map(({ form }) => form)).toEqual(["a line break after", "a line break before", "a carriage return after", "a line separator after", "a line break inside"]);
    expect(UNKNOWN_NAME_FORMS.map(({ form }) => form)).toEqual(["a letter before the name", "the name after its first hyphen", "a part inserted before the ending", "the name extended by a second ending", "another version number"]);
    const canonical = /^[a-z0-9][a-z0-9.-]*\.schema\.json$/;
    for (const name of [REVIEWED.inputSchema, REVIEWED.outputSchema]) {
      expect(UNKNOWN_NAME_FORMS.map(({ ref }) => canonical.test(ref(name)) && ref(name) !== name)).toEqual(UNKNOWN_NAME_FORMS.map(() => true));
    }
  });

  it("R009-10 COMPUTED SCAN of the schema-reference grammar: with each BMP code point (0000-ffff, each lone surrogate included) inserted at the start, after the first code point and before the ending of each reviewed name, MECHANICAL_SCHEMA_REF_PATTERN admits exactly the lower-case ASCII letters, digits, dots and hyphens (no dot or hyphen at the start); through the boundary, each of the 128 ASCII code points after the first code point of inputSchema is refused schema-ref-unknown when it is one of those and schema-ref-noncanonical otherwise, with zero loads", async () => {
    const grammar = "abcdefghijklmnopqrstuvwxyz0123456789";
    const positions: readonly { readonly name: string; readonly at: (name: string) => number; readonly admits: string }[] = [
      { name: "start", at: () => 0, admits: grammar },
      { name: "after the first code point", at: () => 1, admits: `${grammar}.-` },
      { name: "before the ending", at: name => name.length - ".schema.json".length, admits: `${grammar}.-` },
    ];
    expect(positions.map(({ name }) => name)).toEqual(["start", "after the first code point", "before the ending"]);
    for (const name of [REVIEWED.inputSchema, REVIEWED.outputSchema]) {
      for (const position of positions) {
        const where = position.at(name);
        const admitted: string[] = [];
        for (let point = 0; point <= 0xffff; point += 1) {
          if (MECHANICAL_SCHEMA_REF_PATTERN.test(insertAt(name, where, String.fromCodePoint(point)))) admitted.push(String.fromCodePoint(point));
        }
        expect([...admitted].sort().join(""), `${name} ${position.name}`).toBe([...position.admits].sort().join(""));
      }
    }
    const readings = await Promise.all(
      Array.from({ length: 128 }, (_, point) => loadedReadingOf(rendered(memberValue("inputSchema", insertAt(REVIEWED.inputSchema, 1, String.fromCodePoint(point)))))),
    );
    const inGrammar = (point: number): boolean => `${grammar}.-`.includes(String.fromCodePoint(point));
    expect(readings).toEqual(Array.from({ length: 128 }, (_, point) => `inputSchema ${inGrammar(point) ? "schema-ref-unknown" : "schema-ref-noncanonical"} loads=0`));
  });

  it("R009-11 COMPUTED SCAN of compatibility forms through the boundary (the gate's WG01 form): with each code point of each reviewed name, one place at a time, replaced by its fullwidth compatibility form, which NFKC maps back to the reviewed name, each of the 68 references is refused schema-ref-noncanonical in its own member with zero loads: nothing is normalized first", async () => {
    const planted: { readonly member: "inputSchema" | "outputSchema"; readonly at: number; readonly form: string }[] = [];
    for (const member of ["inputSchema", "outputSchema"] as const) {
      const name = REVIEWED[member];
      for (let at = 0; at < name.length; at += 1) {
        const form = `${name.slice(0, at)}${fullwidthOf(name.charAt(at))}${name.slice(at + 1)}`;
        expect(form.normalize("NFKC"), `${member} ${at}: NFKC maps the form back to the reviewed name`).toBe(name);
        planted.push({ member, at, form });
      }
    }
    const readings = await Promise.all(planted.map(async ({ member, at, form }) => `${member} ${at} ${await loadedReadingOf(rendered(memberValue(member, form)))}`));
    expect(readings).toEqual(planted.map(({ member, at }) => `${member} ${at} ${member} schema-ref-noncanonical loads=0`));
    expect(planted).toHaveLength(68);
  });
});

/** The package mutations R010-2 judges, frozen by R010-8. */
const PACKAGE_MUTATIONS: readonly string[] = [
  "@mechanical/workflows-coordination",
  "@mechanical/workflows-development-next",
  "workflows-development",
  "@mechanical/workflows-development/dist/index.js",
  "",
];
/** The export mutations R010-3 judges, frozen by R010-8. */
const EXPORT_MUTATIONS: readonly string[] = ["developLive", "default", "constructor", "develop ", ""];

describe("wb-ocie EAT-R010: Pi refuses a package or export outside its fixed allowlist", () => {
  it("R010-1 the actual descriptor resolves exactly one reviewed host export: one load call with the reviewed entry, the export read by the reviewed name", async () => {
    const { options } = plant();
    const develop = (): string => "reviewed develop";
    const { loader, calls } = fixedLoader({ develop, developLive: () => "caller-named export" });
    const outcome = await admitMechanicalEntrypoint(options, loader);
    expect(outcome.ok).toBe(true);
    if (!outcome.ok) return;
    expect(calls).toHaveLength(1);
    expect(calls[0]?.entry).toBe(REVIEWED);
    expect(outcome.entry).toBe(REVIEWED);
    expect(outcome.exported).toBe(develop);
  });

  it.each(PACKAGE_MUTATIONS)("R010-2 the package mutated to %j is refused not-allowlisted with no loader call", async pkg => {
    ran("R010-2", pkg);
    await expectRefused(plant(withMember("package", REVIEWED.package, pkg)).options, "package", "not-allowlisted");
  });

  it.each(EXPORT_MUTATIONS)("R010-3 the export mutated to %j is refused not-allowlisted with no loader call", async name => {
    ran("R010-3", name);
    await expectRefused(plant(withMember("export", REVIEWED.export, name)).options, "export", "not-allowlisted");
  });

  it("R010-4 an id outside the allowlist is refused not-allowlisted with no loader call", async () => {
    await expectRefused(plant(withMember("id", REVIEWED.id, "mechanical.development.develop.v2")).options, "id", "not-allowlisted");
    await expectRefused(plant(withMember("id", REVIEWED.id, "mechanical.coordination.evaluate.v1")).options, "id", "not-allowlisted");
  });

  it("R010-5 the allowlist is fixed: frozen, and each id names exactly one reviewed entry", () => {
    expect(Object.isFrozen(MECHANICAL_REVIEWED_ENTRYPOINTS)).toBe(true);
    for (const entry of MECHANICAL_REVIEWED_ENTRYPOINTS) {
      expect(Object.isFrozen(entry)).toBe(true);
      expect(Object.isFrozen(entry.bindings)).toBe(true);
      expect(MECHANICAL_REVIEWED_ENTRYPOINTS.filter(other => other.id === entry.id)).toHaveLength(1);
    }
    expect(MECHANICAL_REVIEWED_ENTRYPOINTS.map(entry => entry.id)).toEqual(["mechanical.development.develop.v1"]);
  });

  it("R010-6 a loaded namespace whose reviewed export is absent or not a function is refused export-missing", async () => {
    for (const namespace of [{ developLive: () => "caller-named export" }, { develop: "not a function" }, null, "module"]) {
      const { options } = plant();
      const { loader, calls } = fixedLoader(namespace);
      const outcome = await admitMechanicalEntrypoint(options, loader);
      expect(loadRefusal(outcome)).toEqual(refused("loaded", "export-missing"));
      expect(calls).toHaveLength(1);
    }
  });

  it("R010-7 a resolution the boundary did not mint is refused unresolved with no loader call", async () => {
    const real = await resolved(plant().options);
    const forged: MechanicalResolvedEntrypoint = { ...real };
    const { loader, calls } = fixedLoader({ develop: () => "forged" });
    expect(loadRefusal(await loadMechanicalEntrypoint(forged, loader))).toEqual(refused("resolution", "unresolved"));
    expect(calls).toHaveLength(0);
  });

  it("R010-8 the R010-2 and R010-3 mutation tables are frozen: five package forms and five export forms, by name", () => {
    expect(PACKAGE_MUTATIONS).toEqual(["@mechanical/workflows-coordination", "@mechanical/workflows-development-next", "workflows-development", "@mechanical/workflows-development/dist/index.js", ""]);
    expect(EXPORT_MUTATIONS).toEqual(["developLive", "default", "constructor", "develop ", ""]);
  });

  it("R010-9 the reviewed export is the loader result's own member: an inherited develop, undefined and a number are refused export-missing, and a function result holding develop as its own member is admitted", async () => {
    const develop = (): string => "own develop";
    const inherited: unknown = Object.create({ develop });
    for (const namespace of [inherited, undefined, 7]) {
      const { options } = plant();
      const { loader, calls } = fixedLoader(namespace);
      expect(loadRefusal(await admitMechanicalEntrypoint(options, loader))).toEqual(refused("loaded", "export-missing"));
      expect(calls).toHaveLength(1);
    }
    const { options } = plant();
    const { loader } = fixedLoader(Object.assign(() => "the result itself", { develop }));
    const outcome = await admitMechanicalEntrypoint(options, loader);
    expect(outcome.ok && outcome.exported).toBe(develop);
  });

  it("R010-10 a resolution is frozen, its artifact measure too, and its entry is the frozen reviewed entry, so it cannot be retargeted", async () => {
    const resolution = await resolved(plant().options);
    expect([Object.isFrozen(resolution), Object.isFrozen(resolution.artifact), resolution.entry === REVIEWED, Object.isFrozen(resolution.entry)]).toEqual([true, true, true, true]);
    const retarget = (): void => {
      (resolution as { entry: unknown }).entry = { ...REVIEWED, export: "developLive" };
    };
    expect(retarget).toThrow(TypeError);
    expect(resolution.entry).toBe(REVIEWED);
  });

  it("R010-11 the package and the export are each judged by strict equality with the reviewed entry's: each of the twenty-one IMPLEMENTATION_VALUE_FORMS (lists of the reviewed value, case, padding, a prefixed or alias spelling, ignorable, compatibility and line-break variants, a number, null) is refused not-allowlisted under its own name with zero loads", async () => {
    expect(await readingsByForm(IMPLEMENTATION_VALUE_FORMS)).toEqual(refusedReadings(IMPLEMENTATION_VALUE_FORMS));
  });

  it("R010-12 the loader's result is read as an object or a function: a list holding develop as its own member, a frozen object and a null-prototype object are each admitted with the reviewed export", async () => {
    const develop = (): string => "own develop";
    const results: readonly unknown[] = [Object.assign([], { develop }), Object.freeze({ develop }), Object.assign(Object.create(null), { develop })];
    const readings: unknown[] = [];
    for (const namespace of results) {
      const { options } = plant();
      const { loader } = fixedLoader(namespace);
      const outcome = await admitMechanicalEntrypoint(options, loader);
      readings.push(outcome.ok && outcome.exported === develop);
    }
    expect(readings).toEqual([true, true, true]);
  });

  it("R010-13 the implementation value forms are frozen by name: twenty-one", () => {
    expect(IMPLEMENTATION_VALUE_FORMS.map(({ form }) => form)).toEqual(["package a one-element list", "package a nested list", "package upper-case", "package padded before", "package an npm: alias spelling", "package a soft hyphen inside", "package a fullwidth solidus", "package a line break after", "package a number", "package null", "export a one-element list", "export a nested list", "export capitalized", "export upper-case", "export padded before", "export a prefixed name", "export a soft hyphen inside", "export a fullwidth first letter", "export a line break after", "export a number", "export null"]);
  });

  it("R010-14 an own accessor member is read through its getter (the gate's WG05 form): a loader result whose develop is an own accessor returning a function is admitted with that function as the reviewed export, the getter run once and the export uncalled, and one whose accessor returns a string is refused export-missing", async () => {
    let getterRuns = 0;
    let exportCalls = 0;
    const develop = (): string => {
      exportCalls += 1;
      return "called";
    };
    const accessor: unknown = Object.defineProperty({}, "develop", {
      enumerable: true,
      get: () => {
        getterRuns += 1;
        return develop;
      },
    });
    const { loader, calls } = fixedLoader(accessor);
    const outcome = await admitMechanicalEntrypoint(plant().options, loader);
    expect({ reading: readingOfOutcome(outcome), loads: calls.length, getterRuns, exportCalls, returned: outcome.ok && outcome.exported === develop }).toEqual({
      reading: "admitted",
      loads: 1,
      getterRuns: 1,
      exportCalls: 0,
      returned: true,
    });
    const notAFunction: unknown = Object.defineProperty({}, "develop", { enumerable: true, get: () => "planted develop" });
    const second = fixedLoader(notAFunction);
    expect(readingOfOutcome(await admitMechanicalEntrypoint(plant().options, second.loader))).toBe("loaded export-missing");
  });
});

/**
 * What `pending` settles to while no writer holds the FIFO at `fifo`, or "blocked" when it has not settled within 3 s (an open
 * waiting for a writer); a blocked open is released with one writer so the waiting read settles before the case reports.
 */
async function settledWithoutWriter<T>(fifo: string, pending: Promise<T>): Promise<T | "blocked"> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const waited = new Promise<"blocked">(resolve => {
    timer = setTimeout(() => resolve("blocked"), 3_000);
  });
  const first = await Promise.race([pending, waited]);
  clearTimeout(timer);
  if (first === "blocked") {
    closeSync(openSync(fifo, constants.O_WRONLY | constants.O_NONBLOCK));
    await pending.catch(() => undefined);
  }
  return first;
}

/** One row of a read-order leg: its label and the pin the boundary is handed. */
type LegRow = readonly [at: string, pin: unknown];
/** A read-order leg's reading. */
interface LegReading {
  readonly control: string;
  readonly readings: readonly string[];
}
/** The head of a case title: its requirement id (R008-5, R008-14). */
const titleHeadOf = (title: string): string => title.slice(0, title.indexOf(" "));
/** What a read-order leg reads when the boundary judges every row's pin before it opens the descriptor path. */
const legRefused = (rows: readonly LegRow[]): LegReading => ({ control: "opened", readings: rows.map(([at]) => `${at} pin pin-malformed loads=0`) });
/**
 * Whether a reader holds the FIFO at `fifo` open or waits in an open of it: a writer open that does not wait (O_NONBLOCK)
 * succeeds only then and fails ENXIO while no reader exists; closing that writer at once lets such a reader read end of file.
 */
function readerAt(fifo: string): boolean {
  try {
    closeSync(openSync(fifo, constants.O_WRONLY | constants.O_NONBLOCK));
    return true;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENXIO") return false;
    throw error;
  }
}
/**
 * A read-order leg's positive control: the producer pin's request, with the FIFO at `fifo` in the descriptor's place, opens it
 * for reading, so a reader appears ("opened") within 3 s; the writer open that sees it lets the read end, and the resolution is
 * awaited to its end before the leg's rows. What it then reads from the FIFO, or returns, is NOT CLAIMED.
 */
async function controlOpens(fifo: string, request: MechanicalEntrypointOptions): Promise<string> {
  const pending = resolveMechanicalEntrypoint(request).then(
    () => undefined,
    () => undefined,
  );
  const deadline = Date.now() + 3_000;
  while (!readerAt(fifo)) {
    if (Date.now() > deadline) return "no reader within 3 s";
    await new Promise(resolve => setTimeout(resolve, 5));
  }
  await pending;
  return "opened";
}
/**
 * A case's read-order leg (wb-dhfk; the suite header's follow-up paragraph), recorded under its case's title head for R008-14:
 * the control, then each row's pin handed to the boundary with the FIFO in the descriptor's place, one row at a time, read as
 * "<at> <field> <reason> loads=<n>" while no writer exists (settledWithoutWriter), with " reader" appended when a reader then
 * holds or waits in an open of the FIFO. A row that does not settle reads "<at> blocked" and ends the leg, so a blocked
 * boundary costs one wait.
 */
async function readOrderLeg(title: string, options: MechanicalEntrypointOptions, rows: readonly LegRow[]): Promise<LegReading> {
  READ_ORDER_LEGS[titleHeadOf(title)] = rows.length;
  const fifo = join(options.approvedRoot, "contracts", "entrypoints", "development.v1.fifo");
  execFileSync("mkfifo", [fifo]);
  /** The planted request with the FIFO in the descriptor's place, for the control and every row alike. */
  const handed = (pin: unknown): MechanicalEntrypointOptions => ({ ...options, descriptorPath: fifo, pin: pin as MechanicalReleasePin });
  const control = await controlOpens(fifo, handed(options.pin));
  const readings: string[] = [];
  for (const [at, pin] of rows) {
    const outcome = await settledWithoutWriter(fifo, refusalOf(handed(pin)));
    if (outcome === "blocked") {
      readings.push(`${at} blocked`);
      break;
    }
    await new Promise(resolve => setImmediate(resolve));
    readings.push(`${at} ${diagnosticReading(outcome.diagnostic)} loads=${outcome.loads}${readerAt(fifo) ? " reader" : ""}`);
  }
  return { control, readings };
}

describe("wb-ocie EAT-R011: Pi refuses symlink escapes during artifact resolution", () => {
  it("R011-1 an artifact link inside the approved root that resolves outside it is refused outside-root with zero loads", async () => {
    const { options, artifactBytes } = plant();
    const outside = join(scratch(), "index.mjs");
    write(outside, artifactBytes);
    unlinkSync(options.artifactPath);
    symlinkSync(outside, options.artifactPath);
    await expectRefused(options, "artifact", "outside-root");
  });

  it("R011-2 a sibling directory sharing the root's name as a prefix is outside the root", async () => {
    const base = scratch();
    const { options, artifactBytes } = plant();
    const root = join(base, "root");
    const sibling = join(base, "root-sibling", "index.mjs");
    mkdirSync(root, { recursive: true });
    write(sibling, artifactBytes);
    await expectRefused({ ...options, approvedRoot: root, artifactPath: sibling }, "artifact", "outside-root");
  });

  it("R011-3 a link resolving inside the approved root is admitted: containment is by realpath, not a ban on links", async () => {
    const { root, options, artifactBytes } = plant();
    const target = join(root, "package", "dist", "index.mjs");
    write(target, artifactBytes);
    unlinkSync(options.artifactPath);
    symlinkSync(target, options.artifactPath);
    const { loader, calls } = recordingLoader();
    const outcome = await admitMechanicalEntrypoint(options, loader);
    expect(outcome.ok).toBe(true);
    expect(calls[0]?.artifact.realPath).toBe(realpathSync(target));
  });

  it("R011-4 an approved root named through a link is compared realpath against realpath", async () => {
    const { root, options } = plant();
    const rootLink = join(scratch(), "root-link");
    symlinkSync(root, rootLink);
    for (const artifactPath of [options.artifactPath, join(rootLink, "package", "index.mjs")]) {
      const { loader, calls } = fixedLoader({ develop: () => "linked root" });
      const outcome = await admitMechanicalEntrypoint({ ...options, approvedRoot: rootLink, artifactPath }, loader);
      expect(outcome.ok, artifactPath).toBe(true);
      expect(calls).toHaveLength(1);
    }
  });

  it("R011-5 a link re-pointed between validation and load is refused changed with zero loads", async () => {
    const { root, options, artifactBytes } = plant();
    const first = join(root, "package", "a.mjs");
    const second = join(root, "package", "b.mjs");
    write(first, artifactBytes);
    write(second, artifactBytes);
    unlinkSync(options.artifactPath);
    symlinkSync(first, options.artifactPath);
    const resolution = await resolved(options);
    unlinkSync(options.artifactPath);
    symlinkSync(second, options.artifactPath);
    const { loader, calls } = recordingLoader();
    expect(loadRefusal(await loadMechanicalEntrypoint(resolution, loader))).toEqual(refused("artifact", "changed"));
    expect(calls).toHaveLength(0);
  });

  it("R011-6 a link re-pointed outside the root between validation and load is refused outside-root at load", async () => {
    const { root, options, artifactBytes } = plant();
    const first = join(root, "package", "a.mjs");
    write(first, artifactBytes);
    const outside = join(scratch(), "index.mjs");
    write(outside, artifactBytes);
    unlinkSync(options.artifactPath);
    symlinkSync(first, options.artifactPath);
    const resolution = await resolved(options);
    unlinkSync(options.artifactPath);
    symlinkSync(outside, options.artifactPath);
    const { loader, calls } = recordingLoader();
    expect(loadRefusal(await loadMechanicalEntrypoint(resolution, loader))).toEqual(refused("artifact", "outside-root"));
    expect(calls).toHaveLength(0);
  });

  it("R011-7 a directory in the artifact's place and a missing artifact are refused before any load", async () => {
    const { root, options } = plant();
    await expectRefused({ ...options, artifactPath: join(root, "package") }, "artifact", "not-a-file");
    await expectRefused({ ...options, artifactPath: join(root, "package", "absent.mjs") }, "artifact", "unreadable");
    await expectRefused({ ...options, approvedRoot: join(root, "absent-root") }, "root", "unreadable");
  });

  it("R011-8 an intermediate directory link inside the approved root that resolves outside it is refused outside-root with zero loads", async () => {
    const { root, options, artifactBytes } = plant();
    const outsideDir = join(scratch(), "package");
    write(join(outsideDir, "index.mjs"), artifactBytes);
    const linked = join(root, "linked-package");
    symlinkSync(outsideDir, linked);
    await expectRefused({ ...options, artifactPath: join(linked, "index.mjs") }, "artifact", "outside-root");
  });

  it("R011-9 a chain of links inside the approved root whose last hop leaves it is refused outside-root with zero loads", async () => {
    const { root, options, artifactBytes } = plant();
    const outside = join(scratch(), "index.mjs");
    write(outside, artifactBytes);
    const hop = join(root, "package", "hop.mjs");
    symlinkSync(outside, hop);
    unlinkSync(options.artifactPath);
    symlinkSync(hop, options.artifactPath);
    await expectRefused(options, "artifact", "outside-root");
  });

  it("R011-10 the artifact must lie strictly inside the root: the root itself (an approved root that is the artifact file, or the root directory as the artifact) and the root's parent are refused outside-root with zero loads", async () => {
    const { root, options } = plant();
    await expectRefused({ ...options, approvedRoot: options.artifactPath }, "artifact", "outside-root");
    await expectRefused({ ...options, artifactPath: root }, "artifact", "outside-root");
    await expectRefused({ ...options, artifactPath: dirname(root) }, "artifact", "outside-root");
  });

  it("R011-11 a root whose realpath changed between validation and load is refused changed with zero loads: its link re-pointed to the root's parent, the artifact still inside both", async () => {
    const { root, options } = plant();
    const rootLink = join(scratch(), "root-link");
    symlinkSync(root, rootLink);
    const resolution = await resolved({ ...options, approvedRoot: rootLink });
    unlinkSync(rootLink);
    symlinkSync(dirname(root), rootLink);
    const { loader, calls } = recordingLoader();
    expect(loadRefusal(await loadMechanicalEntrypoint(resolution, loader))).toEqual(refused("artifact", "changed"));
    expect(calls).toHaveLength(0);
  });

  it("R011-12 a FIFO in the artifact's place is refused not-a-file before it is opened, at validation and at load: each refusal arrives while no writer exists (an open would wait for one)", { timeout: 30_000 }, async () => {
    const { root, options } = plant();
    const fifo = join(root, "package", "fifo.mjs");
    execFileSync("mkfifo", [fifo]);
    expect(await settledWithoutWriter(fifo, refusalOf({ ...options, artifactPath: fifo }))).toStrictEqual({ diagnostic: refused("artifact", "not-a-file"), loads: 0 });
    // At load: the artifact replaced by a FIFO at the same path (its realpath unchanged, so the load reaches the file check).
    const resolution = await resolved(options);
    unlinkSync(options.artifactPath);
    execFileSync("mkfifo", [options.artifactPath]);
    const { loader, calls } = recordingLoader();
    const load = loadMechanicalEntrypoint(resolution, loader).then(loadRefusal);
    expect(await settledWithoutWriter(options.artifactPath, load)).toEqual(refused("artifact", "not-a-file"));
    expect(calls).toHaveLength(0);
  });

  it("R011-13 validation runs the descriptor before the artifact, the root before the artifact, and containment before the file check and the digest", async () => {
    const { root, options } = plant();
    const absentRoot = join(root, "absent-root");
    const absentArtifact = join(root, "package", "absent.mjs");
    await expectRefused({ ...options, descriptorPath: join(root, "absent.json"), approvedRoot: absentRoot, artifactPath: absentArtifact }, "descriptor", "unreadable");
    const refusedDescriptor = plant(withMember("package", REVIEWED.package, "@mechanical/workflows-coordination")).options;
    await expectRefused({ ...refusedDescriptor, approvedRoot: absentRoot, artifactPath: absentArtifact }, "package", "not-allowlisted");
    await expectRefused({ ...options, approvedRoot: absentRoot, artifactPath: absentArtifact }, "root", "unreadable");
    await expectRefused({ ...options, artifactPath: scratch() }, "artifact", "outside-root");
    const outsideOther = join(scratch(), "other.mjs");
    write(outsideOther, "other bytes");
    await expectRefused({ ...options, artifactPath: outsideOther }, "artifact", "outside-root");
  });

  it("R011-14 the load runs steps 7 to 10 again, comparing the recorded realpaths after containment and before the file and digest checks; each refusal comes with zero loads", async () => {
    const { root, options, artifactBytes } = plant();
    const first = join(root, "package", "a.mjs");
    write(first, artifactBytes);
    const directory = join(root, "package", "directory");
    mkdirSync(directory);
    const otherBytes = join(root, "package", "c.mjs");
    write(otherBytes, "other bytes");
    unlinkSync(options.artifactPath);
    symlinkSync(first, options.artifactPath);
    const resolution = await resolved(options);
    const readings: (MechanicalEntrypointDiagnostic | undefined)[] = [];
    const { loader, calls } = recordingLoader();
    for (const target of [directory, otherBytes, join(root, "package", "absent.mjs")]) {
      unlinkSync(options.artifactPath);
      symlinkSync(target, options.artifactPath);
      readings.push(loadRefusal(await loadMechanicalEntrypoint(resolution, loader)));
    }
    unlinkSync(options.artifactPath);
    symlinkSync(first, options.artifactPath);
    unlinkSync(first);
    readings.push(loadRefusal(await loadMechanicalEntrypoint(resolution, loader)));
    expect(readings).toEqual([refused("artifact", "changed"), refused("artifact", "changed"), refused("artifact", "unreadable"), refused("artifact", "unreadable")]);
    // Step 9 at load: a directory at the artifact's own path (its realpath unchanged) is refused not-a-file.
    const third = plant();
    const atLoad = await resolved(third.options);
    unlinkSync(third.options.artifactPath);
    mkdirSync(third.options.artifactPath);
    expect(loadRefusal(await loadMechanicalEntrypoint(atLoad, loader))).toEqual(refused("artifact", "not-a-file"));
    const second = plant();
    const rootLink = join(scratch(), "root-link");
    symlinkSync(second.root, rootLink);
    const linked = await resolved({ ...second.options, approvedRoot: rootLink, artifactPath: join(rootLink, "package", "index.mjs") });
    unlinkSync(rootLink);
    expect(loadRefusal(await loadMechanicalEntrypoint(linked, loader))).toEqual(refused("root", "unreadable"));
    expect(calls).toHaveLength(0);
  });

  it("R011-15 containment reads the relative path from the root by its segments: an artifact named ..planted.mjs, an artifact under a directory named ..d or x.., an artifact named through a dot-dot segment that returns inside, an approved root named with a trailing separator, and an approved root of / are each admitted with one load", async () => {
    const { root, options, artifactBytes } = plant();
    const admitted = async (overrides: Partial<MechanicalEntrypointOptions>): Promise<string> => {
      const { loader, calls } = recordingLoader();
      const outcome = await admitMechanicalEntrypoint({ ...options, ...overrides }, loader);
      return `${readingOfOutcome(outcome)} loads=${calls.length}`;
    };
    const dotted = join(root, "..planted.mjs");
    const underDotDirectory = join(root, "..d", "index.mjs");
    const underTrailingDots = join(root, "x..", "index.mjs");
    for (const path of [dotted, underDotDirectory, underTrailingDots]) write(path, artifactBytes);
    expect({
      "an artifact named ..planted.mjs": await admitted({ artifactPath: dotted }),
      "an artifact under a directory named ..d": await admitted({ artifactPath: underDotDirectory }),
      "an artifact under a directory named x..": await admitted({ artifactPath: underTrailingDots }),
      "a dot-dot segment that returns inside": await admitted({ artifactPath: [root, "package", "..", "package", "index.mjs"].join(sep) }),
      "an approved root with a trailing separator": await admitted({ approvedRoot: `${root}${sep}` }),
      "an approved root of /": await admitted({ approvedRoot: sep }),
    }).toEqual({
      "an artifact named ..planted.mjs": "admitted loads=1",
      "an artifact under a directory named ..d": "admitted loads=1",
      "an artifact under a directory named x..": "admitted loads=1",
      "a dot-dot segment that returns inside": "admitted loads=1",
      "an approved root with a trailing separator": "admitted loads=1",
      "an approved root of /": "admitted loads=1",
    });
  });

  it("R011-16 containment compares realpaths code point for code point: a sibling of the root whose name differs from the root's only in case, and one whose name is the root's in the other Unicode normalization form, are refused outside-root with zero loads", async () => {
    const base = scratch();
    const { options, artifactBytes } = plant();
    const lower = join(base, "root");
    mkdirSync(lower, { recursive: true });
    const upper = join(base, "ROOT", "index.mjs");
    write(upper, artifactBytes);
    const composed = join(base, `caf${String.fromCodePoint(0xe9)}`);
    mkdirSync(composed, { recursive: true });
    const decomposed = join(base, `cafe${String.fromCodePoint(0x301)}`, "index.mjs");
    write(decomposed, artifactBytes);
    await expectRefused({ ...options, approvedRoot: lower, artifactPath: upper }, "artifact", "outside-root");
    await expectRefused({ ...options, approvedRoot: composed, artifactPath: decomposed }, "artifact", "outside-root");
  });
});

describe("wb-ocie: the refusal vocabulary", () => {
  it("a refusal is closed vocabulary (code, field, reason) and never echoes the refused text", async () => {
    const samples = [
      await refusalOf(plant(withMember("inputSchema", REVIEWED.inputSchema, "../schemas/secret-name.schema.json")).options),
      await refusalOf(plant(withMember("package", REVIEWED.package, "@mechanical/secret-package")).options),
      await refusalOf(plant(withMember("export", REVIEWED.export, "secretExport")).options),
    ];
    for (const { diagnostic } of samples) {
      expect(Object.keys(diagnostic)).toEqual(["code", "field", "reason"]);
      expect(diagnostic.code).toBe("mechanical-entrypoint-refused");
      expect(MECHANICAL_ENTRYPOINT_FIELDS).toContain(diagnostic.field);
      expect(MECHANICAL_ENTRYPOINT_REASONS).toContain(diagnostic.reason);
      expect(JSON.stringify(diagnostic)).not.toMatch(/secret/);
    }
  });

  it("the closed member set is the producer file's own member set", () => {
    expect(Object.keys(JSON.parse(DESCRIPTOR_TEXT) as object)).toEqual([...MECHANICAL_DESCRIPTOR_MEMBERS]);
  });

  it("the closed field and reason lists are frozen as written: sixteen fields and eighteen reasons", () => {
    expect(MECHANICAL_ENTRYPOINT_FIELDS).toEqual([
      "pin", "descriptor", "schema", "id", "implementation", "package", "export", "inputSchema", "outputSchema", "bindings", "status", "note", "root", "artifact", "resolution", "loaded",
    ]);
    expect(MECHANICAL_ENTRYPOINT_REASONS).toEqual([
      "pin-malformed", "unreadable", "digest-mismatch", "malformed", "wrong-type", "member-unexpected", "member-missing", "schema-unsupported", "not-allowlisted",
      "schema-ref-noncanonical", "schema-ref-unknown", "bindings-mismatch", "status-unsupported", "not-a-file", "outside-root", "changed", "unresolved", "export-missing",
    ]);
  });
});

describe("wb-ocie: each-liveness (the last case of this file)", () => {
  it("every it.each table ran each of its rows, in order: a table emptied or cut at its call site reds here", () => {
    const forms = (table: readonly { readonly form: string }[]): string[] => table.map(({ form }) => form);
    expect(RAN).toEqual({
      "R007-11": [...REQUIRED_MEMBERS],
      "R009-2 inputSchema": forms(NONCANONICAL_FORMS),
      "R009-6 inputSchema": forms(GRAMMAR_FORMS),
      "R009-2 outputSchema": forms(NONCANONICAL_FORMS),
      "R009-6 outputSchema": forms(GRAMMAR_FORMS),
      "R010-2": [...PACKAGE_MUTATIONS],
      "R010-3": [...EXPORT_MUTATIONS],
    });
  });
});
