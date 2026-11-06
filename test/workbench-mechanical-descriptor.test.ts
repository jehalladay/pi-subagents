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
 * Every descriptor case writes those bytes, or a one-member textual mutation of them, to a scratch file and hands the boundary
 * the file's path: the boundary takes no descriptor object at all.
 *
 * EXPLICITLY PARTIAL (closure gate MW-INSTALLED-CONSUMER; external MW-CONTRACT and MW-PACKAGE): at the pin MechanicalWorkflows
 * ships no package carrying this descriptor and no release manifest, so the release pin each case hands the boundary carries the
 * producer file's own SHA-256 (measured above) and the SHA-256 of a scratch ES module the case writes as the artifact, not a
 * published tarball. EAT-R007's installed-host leg ("invoke the real installed host once, without an MW checkout") and every
 * installed-bytes reading are NOT RUN by this suite; the slice is not claimed live or closed.
 *
 * THE LOADERS record every call and import nothing. The host loader is the boundary's only path to an import, so a loader call
 * count of zero is the boundary-level witness that no import side effect ran; no case adds a computed load to the tree.
 *
 * Display paths added: none (the boundary returns closed-vocabulary diagnostics and composes no label or reply text).
 */
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, realpathSync, symlinkSync, unlinkSync, writeFileSync } from "node:fs";
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
  expect(outcome).toEqual({ diagnostic: refused(field, reason), loads: 0 });
}
/** Resolves the planted options, asserting the resolution is admitted. */
async function resolved(options: MechanicalEntrypointOptions): Promise<MechanicalResolvedEntrypoint> {
  const resolution = await resolveMechanicalEntrypoint(options);
  expect(resolution.ok, "the resolution is admitted").toBe(true);
  if (!resolution.ok) throw new Error(`unreachable: refused ${resolution.diagnostic.field} ${resolution.diagnostic.reason}`);
  return resolution.resolved;
}
const loadRefusal = (load: MechanicalEntrypointLoad): MechanicalEntrypointDiagnostic | undefined => (load.ok ? undefined : load.diagnostic);

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

  for (const member of ["inputSchema", "outputSchema"] as const) {
    it.each(NONCANONICAL_FORMS)(`R009-2 ${member} mutated to the $form form is refused schema-ref-noncanonical with zero loads`, async ({ ref }) => {
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

  it.each([
    "@mechanical/workflows-coordination",
    "@mechanical/workflows-development-next",
    "workflows-development",
    "@mechanical/workflows-development/dist/index.js",
    "",
  ])("R010-2 the package mutated to %j is refused not-allowlisted with no loader call", async pkg => {
    await expectRefused(plant(withMember("package", REVIEWED.package, pkg)).options, "package", "not-allowlisted");
  });

  it.each(["developLive", "default", "constructor", "develop ", ""])("R010-3 the export mutated to %j is refused not-allowlisted with no loader call", async name => {
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
});

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
});
