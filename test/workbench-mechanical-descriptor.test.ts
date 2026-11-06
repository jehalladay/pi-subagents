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
 * Display paths added: none (the boundary returns closed-vocabulary diagnostics and composes no label or reply text).
 */
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { closeSync, constants, mkdirSync, openSync, readFileSync, realpathSync, symlinkSync, unlinkSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { afterAll, afterEach, describe, expect, it } from "vitest";
import {
  admitMechanicalEntrypoint,
  loadMechanicalEntrypoint,
  MECHANICAL_DESCRIPTOR_MEMBERS,
  MECHANICAL_DESCRIPTOR_STATUS,
  MECHANICAL_ENTRYPOINT_FIELDS,
  MECHANICAL_ENTRYPOINT_REASONS,
  MECHANICAL_ENTRYPOINT_SCHEMA,
  MECHANICAL_REVIEWED_ENTRYPOINTS,
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
/** The admission's reading of one descriptor text: "admitted", or "<field> <reason>" of its refusal. */
async function readingOf(descriptorText: string): Promise<string> {
  const { loader } = recordingLoader();
  const outcome = await admitMechanicalEntrypoint(plant(descriptorText).options, loader);
  return outcome.ok ? "admitted" : `${outcome.diagnostic.field} ${outcome.diagnostic.reason}`;
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

/** The members whose absence step 5 refuses member-missing under their own name: the producer's own, but schema (step 4) and note. */
const REQUIRED_MEMBERS: readonly string[] = MECHANICAL_DESCRIPTOR_MEMBERS.filter(name => name !== "schema" && name !== "note");

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

  it("R007-7 the producer's member set is closed: an extra member is refused member-unexpected, a missing one member-missing", async () => {
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
  });

  it("R007-15 the suite's edits start from the producer bytes: the producer object's two-space rendering is those bytes, and the required members are the producer's own but schema and note", () => {
    expect(rendered(object => object)).toBe(DESCRIPTOR_TEXT);
    expect(REQUIRED_MEMBERS).toEqual(["id", "implementation", "inputSchema", "outputSchema", "bindings", "status"]);
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

  it("R008-5 a malformed release pin is refused before any file is read", async () => {
    const { options } = plant();
    const hex = sha256Of(readFileSync(options.artifactPath));
    for (const artifactDigest of [hex, `sha256:${hex.slice(1)}`, `sha256:${hex.toUpperCase()}`, `sha512:${hex}`, `sha256:${hex} `]) {
      await expectRefused({ ...options, descriptorPath: join(options.approvedRoot, "absent.json"), pin: { ...options.pin, artifactDigest } }, "pin", "pin-malformed");
    }
    await expectRefused({ ...options, pin: { ...options.pin, descriptorDigest: PRODUCER.sha256 } }, "pin", "pin-malformed");
  });

  it("R008-6 each pin digest is a string sha256:<64 lower-case hex>, judged before any file is read: nine malformed forms in either digest, and four pins that are not a digest pair object, are refused pin-malformed", async () => {
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
    for (const pin of [undefined, null, `sha256:${hex}`, [options.pin.descriptorDigest, options.pin.artifactDigest]]) {
      await expectRefused({ ...options, descriptorPath: absent, pin: pin as unknown as MechanicalReleasePin }, "pin", "pin-malformed");
    }
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
