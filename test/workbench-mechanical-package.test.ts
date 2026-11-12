/**
 * wb-y0n6 (mechanical-native-interoperability-2026-11-09 packet P02, "Installed producer descriptor/package admission"): the
 * package admission of src/workbench/mechanical-descriptor.ts (resolveMechanicalPackage, loadMechanicalPackage and
 * admitMechanicalPackage) and the descriptor boundary's duplicate-member refusal, at the V1 tier against a fixture host.
 *
 * Requirements (pi-subagents commit 18b016b2, docs/workbench/programs/mechanical-native-interoperability-2026-11-09/
 * requirements/ATOMIC-REQUIREMENTS.md); every case is titled by the requirement and acceptance criterion it pins:
 *  EAT-R217 AC2 "Assert the descriptor's canonical input/output refs resolve to shipped schema files whose bytes match adopted
 *   digests; missing file, wrong ref or changed schema byte refuses before import." AC3 "Assert a stale vendored Pi fixture
 *   replacing a one-byte-modified producer file causes the consumer test to fail."
 *  EAT-R219 AC2 "Assert independently mutate one extra field, duplicate JSON key, omitted field, wrong schema ref, path traversal
 *   and wrong schema version; each returns typed diagnostic before executable import." AC3 "Assert a permissive JSON parse that
 *   silently accepts duplicate keys is killed by the duplicate-key test." (The extra field, omitted field, schema ref, traversal
 *   and schema version forms are the landed wb-ocie cases R007-6, R007-7, R007-11, R009-2 and R009-8 of
 *   test/workbench-mechanical-descriptor.test.ts; this file adds the duplicate JSON key.)
 *  EAT-R222 AC1 "Assert lstat/realpath and approved canonical root checks reject traversal, absolute escape, symlink alias to
 *   outside root, non-file schema/artifact, directory or FIFO before import." AC2 "Assert changing a symlink target or
 *   installed bytes between initial measure and final load yields a typed changed/refused outcome and zero loader/writer/Forge
 *   calls." AC3 "Assert a valid regular-file packed-install control reaches the one reviewed importer." (The artifact's forms
 *   are the landed wb-ocie cases R011-1 to R011-16; this file adds the two schema files.)
 *  EAT-R224 AC1 "Assert two concurrent independent-consumer install attempts with the same immutable manifest either each verify
 *   their own exact bytes or one receives a bounded refusal; both completed attempts resolve the same approved package/export."
 *   AC2 "Assert if one attempt sees changed package bytes or symlink target, it refuses before import and does not corrupt or
 *   authorize the other; count zero writer and Forge effects for both fixture-safe attempts."
 *
 * PINNED READER SET (each case below by its id; the assertion target is the reading "<field> <reason> loads=<n>" or
 * "admitted loads=<n>", where loads counts the calls of a recording host loader that imports nothing):
 *  - R219-1 to R219-8: the duplicate-member refusal (step 3 of the module header) through admitMechanicalEntrypoint, its
 *    quiet rows and its order against the digest, the parse, the object test and the schema member.
 *  - R217-1 to R217-7: the package admission's schema pin, the two schema files read by the reviewed entry's names inside the
 *    host's schema directory and pinned by their bytes, and the order of the pin, the descriptor, the artifact and the schemas.
 *  - R222-1 to R222-6: containment, the file check and the load-time re-measure of the two schema files.
 *  - R224-1 to R224-3: two admissions run together.
 *  - R225-3: EAT-R225 AC3 "Assert the unadopted contract refuses with function-action-unadopted even if a caller supplies the
 *    candidate spelling", through decideExecute and dispatchFunctionWithAuthority (src/workbench/function-authority.ts) with
 *    the production contract; the reading is the boundary's stage and refusal and a dispatch count taken once it settles (a
 *    call landing later is NOT CLAIMED by this row).
 *  - R-VOCAB-1: the closed reason list holds member-duplicate.
 *  - R-SET-1 (the last case): this set, frozen by requirement, case and criterion as the file's describe and case titles spell
 *    them, and anchored outside this file's literals: the module header's step 3 and its PACKAGE ADMISSION section, read from
 *    src, cite exactly the R217, R219, R222 and R224 cases of this file (a case deleted, renamed or added, or a citation
 *    deleted or swapped in the header, reds it).
 *
 * THE SCHEMA FILES each case writes are stand-ins: a JSON text naming the reviewed schema name, written under that name in a
 * scratch schema directory, and pinned by its own SHA-256. The package admission compares bytes and never reads a schema's
 * content, so the stand-ins exercise every step it claims; that they are the producer's own schema files is NOT CLAIMED.
 *
 * EXPLICITLY PARTIAL (closure gates MW-INSTALLED-HOST and PI-MECHANICAL-ARTIFACT; external MechanicalWorkflows M01, the P00
 * joint ABI ruling and the P04 registered function branch). NOT CLAIMED by this file: an external consumer outside both
 * repositories, an installed or packed MechanicalWorkflows package, a producer release manifest and where any pin comes from
 * (EAT-R217 AC1, EAT-R220 and EAT-R221 AC1-AC2); a saved function-definition digest (EAT-R218: the registered workflow_execute
 * refuses every function definition before its source is read); a host API version (EAT-R221 AC3: the binding
 * mechanical.pi-host/v1 is a proposal, not adopted); model-provided import authority at the registered tool's input schema
 * (EAT-R223); every acceptance criterion's registered-path oracle PI-FUNCTION-REGISTERED (EAT-R217 AC4, EAT-R219 AC4,
 * EAT-R222 AC4, EAT-R224 AC3, EAT-R225 AC4, EAT-R226 AC3), which P04 and P08 carry; EAT-R225 AC1-AC2 (the landed wb-201v
 * rows of test/workbench-function-authority.test.ts pin them for fixture spellings: no action spelling is adopted, so no
 * request for the ratified binding can pass); EAT-R226 (its AC1 and the embedded half of its AC2 are the landed
 * registered-tool rows "with hostMode %s and %j held, a function definition refuses as %s" of that suite; the detached
 * positive control reaching one host preflight needs the function branch, P04, and the optional detached route, P11);
 * writer and Forge calls (this module makes none, so no case counts them);
 * the descriptor path's containment and a FIFO in the descriptor's place (the landed module header leaves the descriptor path
 * unbounded); a schema directory or schema file the host names through a path other than the reviewed name inside the
 * directory; the window between a realpath and the open of the same path; hard links; and the window between the load-time
 * re-measure and a host loader that re-opens a path instead of using the measured bytes.
 *
 * Display paths added: none (the admission returns closed-vocabulary diagnostics and composes no label or reply text).
 */
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { closeSync, constants, mkdirSync, openSync, readFileSync, renameSync, rmSync, symlinkSync, unlinkSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { afterAll, afterEach, describe, expect, it } from "vitest";
import { decideExecute, EXECUTE_GRANT, type ExecuteHostMode } from "../src/workbench/execute.js";
import { DETACH_GRANT } from "../src/workbench/execute-tool.js";
import { dispatchFunctionWithAuthority, FUNCTION_ACTION_CONTRACT, type FunctionAuthorityHost } from "../src/workbench/function-authority.js";
import {
  admitMechanicalEntrypoint,
  admitMechanicalPackage,
  loadMechanicalPackage,
  MECHANICAL_ENTRYPOINT_REASONS,
  MECHANICAL_ENTRYPOINT_SCHEMA,
  MECHANICAL_REVIEWED_ENTRYPOINTS,
  type MechanicalEntrypointLoad,
  type MechanicalExportLoader,
  type MechanicalLoadableArtifact,
  type MechanicalPackageOptions,
  type MechanicalResolvedPackage,
  type MechanicalReviewedEntrypoint,
  resolveMechanicalPackage,
} from "../src/workbench/mechanical-descriptor.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard(afterAll);
const scratches: string[] = [];
afterEach(() => removeScratch(...scratches.splice(0)));
const scratch = (): string => {
  const dir = makeScratch("wb-y0n6-mw-package-");
  scratches.push(dir);
  return dir;
};

/** The producer descriptor of record (wb-ocie R007-1 holds the fixture to MechanicalWorkflows f7c0a943's blob and this SHA-256). */
const DESCRIPTOR_BYTES = readFileSync(new URL("./fixtures/mw-development-entrypoint-v1.json", import.meta.url));
const DESCRIPTOR_TEXT = DESCRIPTOR_BYTES.toString("utf8");
const PRODUCER_DIGEST = "sha256:68cc312ba82c5837eff64bb6de39e0db09073c836d851d550e13aa458d192d0f";
const digestOf = (bytes: Uint8Array | string): string => `sha256:${createHash("sha256").update(bytes).digest("hex")}`;
const REVIEWED: MechanicalReviewedEntrypoint = MECHANICAL_REVIEWED_ENTRYPOINTS[0] as MechanicalReviewedEntrypoint;
const PRODUCER_OBJECT = JSON.parse(DESCRIPTOR_TEXT) as Readonly<Record<string, unknown>>;

const write = (path: string, data: string | Uint8Array): void => {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, data);
};
/** Flips one byte of a file in place: its first letter, XOR 0x01. */
const flipOneByte = (path: string): void => {
  const bytes = readFileSync(path);
  const at = bytes.findIndex(byte => (byte >= 0x61 && byte <= 0x7a) || (byte >= 0x41 && byte <= 0x5a));
  expect(at, "the file holds a letter to flip").toBeGreaterThanOrEqual(0);
  bytes[at] = (bytes[at] ?? 0) ^ 0x01;
  writeFileSync(path, bytes);
};
/** The bytes of a scratch ES module standing in for the packed artifact; no loader of this file imports it. */
const artifactText = (tag: string): string => [`export const develop = () => ${JSON.stringify(tag)};`, ""].join("\n");
/** A stand-in schema file's text: a JSON object naming the reviewed schema name (the file header's THE SCHEMA FILES). */
const schemaText = (name: string): string => `${JSON.stringify({ $id: name, type: "object", additionalProperties: false }, null, 2)}\n`;

interface PackagePlant {
  readonly root: string;
  readonly options: MechanicalPackageOptions;
  readonly inputSchemaPath: string;
  readonly outputSchemaPath: string;
}
/**
 * One approved root holding the descriptor (the producer bytes unless `descriptorText` is given), the two stand-in schema files
 * under the reviewed names in contracts/schemas, and a scratch artifact module. The release pin carries the producer digest for
 * the producer bytes and a mutation's own digest for a mutation; the schema pin carries the stand-ins' own digests.
 */
const plantPackage = (descriptorText?: string, tag = "planted develop"): PackagePlant => {
  const root = scratch();
  const descriptorPath = join(root, "contracts", "entrypoints", "development.v1.json");
  write(descriptorPath, descriptorText ?? DESCRIPTOR_BYTES);
  const schemaDirectory = join(root, "contracts", "schemas");
  const inputSchemaPath = join(schemaDirectory, REVIEWED.inputSchema);
  const outputSchemaPath = join(schemaDirectory, REVIEWED.outputSchema);
  write(inputSchemaPath, schemaText(REVIEWED.inputSchema));
  write(outputSchemaPath, schemaText(REVIEWED.outputSchema));
  const artifactPath = join(root, "package", "index.mjs");
  write(artifactPath, artifactText(tag));
  return {
    root,
    inputSchemaPath,
    outputSchemaPath,
    options: {
      descriptorPath,
      artifactPath,
      approvedRoot: root,
      schemaDirectory,
      pin: { descriptorDigest: descriptorText === undefined ? PRODUCER_DIGEST : digestOf(descriptorText), artifactDigest: digestOf(readFileSync(artifactPath)) },
      schemaPin: { inputSchemaDigest: digestOf(readFileSync(inputSchemaPath)), outputSchemaDigest: digestOf(readFileSync(outputSchemaPath)) },
    },
  };
};

interface LoaderCall {
  readonly entry: MechanicalReviewedEntrypoint;
  readonly artifact: MechanicalLoadableArtifact;
}
/** A host loader that records each call and answers with the reviewed export (no import at all). */
const recordingLoader = (): { readonly loader: MechanicalExportLoader; readonly calls: LoaderCall[] } => {
  const calls: LoaderCall[] = [];
  const loader: MechanicalExportLoader = async (entry, artifact) => {
    calls.push({ entry, artifact });
    return { develop: () => "planted develop" };
  };
  return { loader, calls };
};
const readingOfOutcome = (outcome: MechanicalEntrypointLoad): string => (outcome.ok ? "admitted" : `${outcome.diagnostic.field} ${outcome.diagnostic.reason}`);
/** The package admission's reading of one plant: its outcome and the recording loader's call count. */
async function packageReadingOf(options: MechanicalPackageOptions): Promise<string> {
  const { loader, calls } = recordingLoader();
  return `${readingOfOutcome(await admitMechanicalPackage(options, loader))} loads=${calls.length}`;
}
/** The descriptor boundary's own reading of one descriptor text, under that text's own pin (admitMechanicalEntrypoint). */
async function entrypointReadingOf(descriptorText: string, descriptorDigest = digestOf(descriptorText)): Promise<string> {
  const { options } = plantPackage(descriptorText);
  const { loader, calls } = recordingLoader();
  const outcome = await admitMechanicalEntrypoint({ ...options, pin: { ...options.pin, descriptorDigest } }, loader);
  return `${readingOfOutcome(outcome)} loads=${calls.length}`;
}
/** A package resolution, failing the case when the plant does not resolve. */
async function packageResolved(options: MechanicalPackageOptions): Promise<MechanicalResolvedPackage> {
  const resolution = await resolveMechanicalPackage(options);
  if (!resolution.ok) throw new Error(`the plant resolves (${resolution.diagnostic.field} ${resolution.diagnostic.reason})`);
  return resolution.resolved;
}
/** The load phase's reading of one package resolution. */
async function loadReadingOf(resolved: MechanicalResolvedPackage): Promise<string> {
  const { loader, calls } = recordingLoader();
  return `${readingOfOutcome(await loadMechanicalPackage(resolved, loader))} loads=${calls.length}`;
}
/** Settles a pending call that may be waiting on a FIFO: after 3 s without settling it reads "blocked", and a writer releases it. */
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

/** One member of a descriptor written as text: its name and its value, each as raw JSON text (so a name may repeat or be escaped). */
type WrittenMember = readonly [nameText: string, valueText: string];
/** The producer file's members in its order, each name and value written by JSON.stringify. */
const PRODUCER_MEMBERS: readonly WrittenMember[] = Object.entries(PRODUCER_OBJECT).map(([name, value]) => [JSON.stringify(name), JSON.stringify(value)]);
/** A descriptor text holding exactly the given members in order, one per line. */
const writtenAs = (members: readonly WrittenMember[]): string => `{\n${members.map(([nameText, valueText]) => `  ${nameText}: ${valueText}`).join(",\n")}\n}\n`;
/** The producer members with `extra` inserted right after the member named `after` (by its written name). */
const withAfter = (after: string, ...extra: WrittenMember[]): WrittenMember[] => {
  const at = PRODUCER_MEMBERS.findIndex(([nameText]) => nameText === JSON.stringify(after));
  expect(at, `the producer file holds ${after}`).toBeGreaterThanOrEqual(0);
  return [...PRODUCER_MEMBERS.slice(0, at + 1), ...extra, ...PRODUCER_MEMBERS.slice(at + 1)];
};
const memberOf = (name: string): WrittenMember => {
  const member = PRODUCER_MEMBERS.find(([nameText]) => nameText === JSON.stringify(name));
  if (member === undefined) throw new Error(`the producer file holds ${name}`);
  return member;
};
/** The producer members with the member named `name` replaced by `members` (none, one or several, in its place). */
const replacing = (name: string, ...members: WrittenMember[]): WrittenMember[] =>
  PRODUCER_MEMBERS.flatMap((member): WrittenMember[] => (member[0] === JSON.stringify(name) ? members : [member]));
const IMPLEMENTATION_PACKAGE = JSON.stringify(REVIEWED.package);
const IMPLEMENTATION_EXPORT = JSON.stringify(REVIEWED.export);

describe("wb-y0n6 EAT-R219: a member name written twice in one object of the descriptor text is refused member-duplicate (R-DUPLICATE-MEMBER cured)", () => {
  it("R219-1 the quiet control: the producer members written one per line, each once, are admitted under their own pin with one load, as are the producer bytes under the producer digest", async () => {
    expect(digestOf(DESCRIPTOR_BYTES), "the fixture is the wb-ocie descriptor of record").toBe(PRODUCER_DIGEST);
    expect([await entrypointReadingOf(writtenAs(PRODUCER_MEMBERS)), await entrypointReadingOf(DESCRIPTOR_TEXT, PRODUCER_DIGEST)]).toEqual(["admitted loads=1", "admitted loads=1"]);
  });

  it("R219-2 AC2/AC3 each of the producer's eight members written a second time with the same value, right after itself, is refused descriptor member-duplicate with zero loads (a parse keeping the last copy reads the producer object, so a permissive parse admits each)", async () => {
    const names = PRODUCER_MEMBERS.map(([nameText]) => JSON.parse(nameText) as string);
    expect(names).toEqual(["schema", "id", "implementation", "inputSchema", "outputSchema", "bindings", "status", "note"]);
    const texts = names.map(name => writtenAs(withAfter(name, memberOf(name))));
    for (const text of texts) expect(JSON.parse(text), "the last copy reads the producer object").toEqual(PRODUCER_OBJECT);
    expect(await Promise.all(texts.map(text => entrypointReadingOf(text)))).toEqual(names.map(() => "descriptor member-duplicate loads=0"));
  });

  it("R219-3 AC2 the residual's own forms: status written invocable then descriptor-only, descriptor-only then invocable, three times, and the schema member written again as the last member are each refused descriptor member-duplicate with zero loads", async () => {
    const status = (value: string): WrittenMember => ['"status"', JSON.stringify(value)];
    const texts = [
      writtenAs(replacing("status", status("invocable"), status("descriptor-only"))),
      writtenAs(withAfter("status", status("invocable"))),
      writtenAs(withAfter("status", status("descriptor-only"), status("descriptor-only"))),
      writtenAs([...PRODUCER_MEMBERS, memberOf("schema")]),
    ];
    expect(await Promise.all(texts.map(text => entrypointReadingOf(text)))).toEqual(texts.map(() => "descriptor member-duplicate loads=0"));
  });

  it("R219-4 AC2 inside the implementation object: package written twice and export written twice are each refused descriptor member-duplicate with zero loads", async () => {
    const implementation = (...members: string[]): WrittenMember => ['"implementation"', `{ ${members.join(", ")} }`];
    const pkg = `"package": ${IMPLEMENTATION_PACKAGE}`;
    const exp = `"export": ${IMPLEMENTATION_EXPORT}`;
    const texts = [writtenAs(replacing("implementation", implementation(pkg, pkg, exp))), writtenAs(replacing("implementation", implementation(pkg, exp, exp)))];
    for (const text of texts) expect(JSON.parse(text), "the last copy reads the producer object").toEqual(PRODUCER_OBJECT);
    expect(await Promise.all(texts.map(text => entrypointReadingOf(text)))).toEqual(["descriptor member-duplicate loads=0", "descriptor member-duplicate loads=0"]);
  });

  it("R219-5 AC2 names are compared after JSON string decoding: status beside st\\u0061tus, \\u0073tatus beside st\\u0061tus, and export beside \\u0065xport inside implementation are each refused descriptor member-duplicate with zero loads", async () => {
    const statusValue = memberOf("status")[1];
    const escaped: WrittenMember = ['"st\\u0061tus"', statusValue];
    const texts = [
      writtenAs(withAfter("status", escaped)),
      writtenAs([...replacing("status", ['"\\u0073tatus"', statusValue]), escaped]),
      writtenAs(replacing("implementation", ['"implementation"', `{ "package": ${IMPLEMENTATION_PACKAGE}, "export": ${IMPLEMENTATION_EXPORT}, "\\u0065xport": ${IMPLEMENTATION_EXPORT} }`])),
    ];
    for (const text of texts) expect(JSON.parse(text), "the last copy reads the producer object").toEqual(PRODUCER_OBJECT);
    expect(await Promise.all(texts.map(text => entrypointReadingOf(text)))).toEqual(texts.map(() => "descriptor member-duplicate loads=0"));
  });

  it("R219-6 AC2 any object of the text, the member set aside: a name outside the producer's members written twice (loader), and a name written twice in an object inside a list inside an extra member, are each refused descriptor member-duplicate, not member-unexpected, with zero loads", async () => {
    const texts = [writtenAs([...PRODUCER_MEMBERS, ['"loader"', "1"], ['"loader"', "1"]]), writtenAs([...PRODUCER_MEMBERS, ['"extra"', '[{ "a": 1, "a": 1 }]']])];
    expect(await Promise.all(texts.map(text => entrypointReadingOf(text)))).toEqual(["descriptor member-duplicate loads=0", "descriptor member-duplicate loads=0"]);
  });

  it("R219-7 quiet rows: a member name inside a string value is no member (a note whose text holds the quoted status member twice is admitted), names in two different objects are never compared (an extra member holding an object with a schema member reads member-unexpected), and names differing in case are two names (Status beside status reads member-unexpected)", async () => {
    const texts = [
      writtenAs(replacing("note", ['"note"', JSON.stringify('"status": "invocable", "status": "invocable"')])),
      writtenAs([...PRODUCER_MEMBERS, ['"extra"', '{ "schema": 1 }']]),
      writtenAs(withAfter("status", ['"Status"', memberOf("status")[1]])),
    ];
    expect(await Promise.all(texts.map(text => entrypointReadingOf(text)))).toEqual(["admitted loads=1", "descriptor member-unexpected loads=0", "descriptor member-unexpected loads=0"]);
  });

  it("R219-8 the order: the digest before the duplicate (a duplicate under the producer digest reads digest-mismatch), the parse before the duplicate (a duplicate in text that is not JSON reads malformed), the duplicate before the object test (a list holding an object with a duplicate reads member-duplicate, the same list without it wrong-type) and before the schema member (a duplicate beside another schema version reads member-duplicate)", async () => {
    const duplicate = writtenAs(withAfter("id", memberOf("id")));
    const otherVersion = withAfter("id", memberOf("id")).map((member): WrittenMember => (member[0] === '"schema"' ? ['"schema"', '"mechanical-workflows/entrypoint/v2"'] : member));
    const readings = [
      await entrypointReadingOf(duplicate, PRODUCER_DIGEST),
      await entrypointReadingOf(`${duplicate.trimEnd()},\n`),
      await entrypointReadingOf('[{ "a": 1, "a": 1 }]\n'),
      await entrypointReadingOf('[{ "a": 1 }]\n'),
      await entrypointReadingOf(writtenAs(otherVersion)),
    ];
    expect(readings).toEqual([
      "descriptor digest-mismatch loads=0",
      "descriptor malformed loads=0",
      "descriptor member-duplicate loads=0",
      "descriptor wrong-type loads=0",
      "descriptor member-duplicate loads=0",
    ]);
  });
});

describe("wb-y0n6 EAT-R217: the package admission reads the reviewed schema files and pins them by their bytes", () => {
  it("R217-1 AC2 the positive control: the producer descriptor, the artifact and the two schema files under their pins are admitted with one load, which receives the reviewed entry and the artifact's measured bytes", async () => {
    const { options } = plantPackage();
    const { loader, calls } = recordingLoader();
    const outcome = await admitMechanicalPackage(options, loader);
    expect(readingOfOutcome(outcome)).toBe("admitted");
    expect(calls).toHaveLength(1);
    expect(calls[0]?.entry).toBe(REVIEWED);
    expect(calls[0]?.artifact.digest).toBe(options.pin.artifactDigest);
    expect(Buffer.from(calls[0]?.artifact.bytes ?? new Uint8Array())).toEqual(readFileSync(options.artifactPath));
  });

  it("R217-2 AC2 an absent schema file refuses with zero loads: the input file missing reads inputSchema unreadable, the output file missing outputSchema unreadable, and the schema directory missing inputSchema unreadable", async () => {
    const input = plantPackage();
    unlinkSync(input.inputSchemaPath);
    const output = plantPackage();
    unlinkSync(output.outputSchemaPath);
    const directory = plantPackage();
    rmSync(directory.options.schemaDirectory, { recursive: true });
    expect([await packageReadingOf(input.options), await packageReadingOf(output.options), await packageReadingOf(directory.options)]).toEqual([
      "inputSchema unreadable loads=0",
      "outputSchema unreadable loads=0",
      "inputSchema unreadable loads=0",
    ]);
  });

  it("R217-3 AC2 a changed schema byte refuses with zero loads: one byte flipped in the input file reads inputSchema digest-mismatch, in the output file outputSchema digest-mismatch, and the two files swapped read inputSchema digest-mismatch", async () => {
    const input = plantPackage();
    flipOneByte(input.inputSchemaPath);
    const output = plantPackage();
    flipOneByte(output.outputSchemaPath);
    const swapped = plantPackage();
    const held = join(swapped.root, "held.json");
    renameSync(swapped.inputSchemaPath, held);
    renameSync(swapped.outputSchemaPath, swapped.inputSchemaPath);
    renameSync(held, swapped.outputSchemaPath);
    expect([await packageReadingOf(input.options), await packageReadingOf(output.options), await packageReadingOf(swapped.options)]).toEqual([
      "inputSchema digest-mismatch loads=0",
      "outputSchema digest-mismatch loads=0",
      "inputSchema digest-mismatch loads=0",
    ]);
  });

  it("R217-4 AC2 a wrong ref refuses before any schema file is read: a descriptor naming another canonical input schema, with the schema directory missing, reads the boundary's inputSchema schema-ref-unknown with zero loads", async () => {
    const text = DESCRIPTOR_TEXT.replace(`"inputSchema": ${JSON.stringify(REVIEWED.inputSchema)}`, `"inputSchema": ${JSON.stringify(`x${REVIEWED.inputSchema}`)}`);
    expect(text, "the descriptor names another input schema").not.toBe(DESCRIPTOR_TEXT);
    const { options } = plantPackage(text);
    rmSync(options.schemaDirectory, { recursive: true });
    expect(await packageReadingOf(options)).toBe("inputSchema schema-ref-unknown loads=0");
  });

  it("R217-5 AC3 a stale pin: the producer file changed by one byte under the vendored fixture's digest reads descriptor digest-mismatch with zero loads, through the package admission and through the descriptor boundary alone", async () => {
    const changed = DESCRIPTOR_TEXT.replace("No remote host loader", "No remote host loadeR");
    expect(changed.length, "one byte changed").toBe(DESCRIPTOR_TEXT.length);
    const { options } = plantPackage(changed);
    const stale = { ...options, pin: { ...options.pin, descriptorDigest: PRODUCER_DIGEST } };
    expect([await packageReadingOf(stale), await entrypointReadingOf(changed, PRODUCER_DIGEST)]).toEqual(["descriptor digest-mismatch loads=0", "descriptor digest-mismatch loads=0"]);
  });

  it("R217-6 the schema pin is judged first: each of eight malformed schema pins reads pin pin-malformed with zero loads, with the descriptor path missing", async () => {
    const { options } = plantPackage();
    const missing = { ...options, descriptorPath: join(options.approvedRoot, "absent.json") };
    const valid = options.schemaPin.inputSchemaDigest;
    const pins: readonly unknown[] = [
      undefined,
      null,
      valid,
      [valid, valid],
      { inputSchemaDigest: valid },
      { outputSchemaDigest: valid },
      { inputSchemaDigest: valid.slice("sha256:".length), outputSchemaDigest: valid },
      { inputSchemaDigest: valid, outputSchemaDigest: valid.toUpperCase() },
    ];
    const readings = await Promise.all(pins.map(schemaPin => packageReadingOf({ ...missing, schemaPin } as MechanicalPackageOptions)));
    expect(readings).toEqual(pins.map(() => "pin pin-malformed loads=0"));
    expect(await packageReadingOf(missing), "a valid schema pin reaches the descriptor").toBe("descriptor unreadable loads=0");
  });

  it("R217-7 the order: the release pin, the descriptor and the artifact are judged before the schema files (each with the schema directory missing: a malformed release pin reads pin pin-malformed, a duplicate member descriptor member-duplicate, a flipped artifact artifact digest-mismatch), and the input schema before the output schema", async () => {
    const pinned = plantPackage();
    rmSync(pinned.options.schemaDirectory, { recursive: true });
    const duplicate = plantPackage(writtenAs(withAfter("note", memberOf("note"))));
    rmSync(duplicate.options.schemaDirectory, { recursive: true });
    const artifact = plantPackage();
    rmSync(artifact.options.schemaDirectory, { recursive: true });
    flipOneByte(artifact.options.artifactPath);
    const both = plantPackage();
    flipOneByte(both.inputSchemaPath);
    unlinkSync(both.outputSchemaPath);
    expect([
      await packageReadingOf({ ...pinned.options, pin: { ...pinned.options.pin, artifactDigest: "sha256:0" } }),
      await packageReadingOf(duplicate.options),
      await packageReadingOf(artifact.options),
      await packageReadingOf(both.options),
    ]).toEqual(["pin pin-malformed loads=0", "descriptor member-duplicate loads=0", "artifact digest-mismatch loads=0", "inputSchema digest-mismatch loads=0"]);
  });
});

describe("wb-y0n6 EAT-R222: the schema files are confined to the approved root, judged as regular files, and measured again at load", () => {
  it("R222-1 AC1/AC3 a schema file named through a link: a link resolving outside the approved root (to the same bytes) reads inputSchema outside-root with zero loads, a link resolving inside the root is admitted with one load, and a schema directory link resolving outside reads inputSchema outside-root", async () => {
    const outside = plantPackage();
    const elsewhere = scratch();
    write(join(elsewhere, REVIEWED.inputSchema), readFileSync(outside.inputSchemaPath));
    unlinkSync(outside.inputSchemaPath);
    symlinkSync(join(elsewhere, REVIEWED.inputSchema), outside.inputSchemaPath);
    const inside = plantPackage();
    const kept = join(inside.root, "kept", REVIEWED.inputSchema);
    write(kept, readFileSync(inside.inputSchemaPath));
    unlinkSync(inside.inputSchemaPath);
    symlinkSync(kept, inside.inputSchemaPath);
    const directory = plantPackage();
    const away = scratch();
    write(join(away, REVIEWED.inputSchema), readFileSync(directory.inputSchemaPath));
    write(join(away, REVIEWED.outputSchema), readFileSync(directory.outputSchemaPath));
    rmSync(directory.options.schemaDirectory, { recursive: true });
    symlinkSync(away, directory.options.schemaDirectory);
    expect([await packageReadingOf(outside.options), await packageReadingOf(inside.options), await packageReadingOf(directory.options)]).toEqual([
      "inputSchema outside-root loads=0",
      "admitted loads=1",
      "inputSchema outside-root loads=0",
    ]);
  });

  it("R222-2 AC1 a directory in the input schema's place reads inputSchema not-a-file and a FIFO in the output schema's place outputSchema not-a-file, each with zero loads, the FIFO's refusal arriving while no writer exists", { timeout: 30_000 }, async () => {
    const directory = plantPackage();
    unlinkSync(directory.inputSchemaPath);
    mkdirSync(directory.inputSchemaPath);
    const fifo = plantPackage();
    unlinkSync(fifo.outputSchemaPath);
    execFileSync("mkfifo", [fifo.outputSchemaPath]);
    expect(await packageReadingOf(directory.options)).toBe("inputSchema not-a-file loads=0");
    expect(await settledWithoutWriter(fifo.outputSchemaPath, packageReadingOf(fifo.options))).toBe("outputSchema not-a-file loads=0");
  });

  it("R222-3 AC2 installed bytes changed between resolution and load: one byte flipped in the input schema reads inputSchema digest-mismatch at load, and in the output schema outputSchema digest-mismatch, each with zero loads; the unchanged resolution loads once", async () => {
    const input = plantPackage();
    const inputResolved = await packageResolved(input.options);
    flipOneByte(input.inputSchemaPath);
    const output = plantPackage();
    const outputResolved = await packageResolved(output.options);
    flipOneByte(output.outputSchemaPath);
    const unchanged = plantPackage();
    const unchangedResolved = await packageResolved(unchanged.options);
    expect([await loadReadingOf(inputResolved), await loadReadingOf(outputResolved), await loadReadingOf(unchangedResolved)]).toEqual([
      "inputSchema digest-mismatch loads=0",
      "outputSchema digest-mismatch loads=0",
      "admitted loads=1",
    ]);
  });

  it("R222-4 AC2 a symlink target changed between resolution and load: the output schema's link re-pointed to another file inside the root holding the same bytes reads outputSchema changed, and re-pointed outside the root outputSchema outside-root, each with zero loads", async () => {
    const plantLinked = async (): Promise<{ readonly plant: PackagePlant; readonly resolved: MechanicalResolvedPackage }> => {
      const plant = plantPackage();
      const first = join(plant.root, "first", REVIEWED.outputSchema);
      write(first, readFileSync(plant.outputSchemaPath));
      unlinkSync(plant.outputSchemaPath);
      symlinkSync(first, plant.outputSchemaPath);
      return { plant, resolved: await packageResolved(plant.options) };
    };
    const repoint = (path: string, target: string, bytes: Buffer): void => {
      write(target, bytes);
      unlinkSync(path);
      symlinkSync(target, path);
    };
    const inside = await plantLinked();
    repoint(inside.plant.outputSchemaPath, join(inside.plant.root, "second", REVIEWED.outputSchema), readFileSync(join(inside.plant.root, "first", REVIEWED.outputSchema)));
    const outside = await plantLinked();
    repoint(outside.plant.outputSchemaPath, join(scratch(), REVIEWED.outputSchema), readFileSync(join(outside.plant.root, "first", REVIEWED.outputSchema)));
    expect([await loadReadingOf(inside.resolved), await loadReadingOf(outside.resolved)]).toEqual(["outputSchema changed loads=0", "outputSchema outside-root loads=0"]);
  });

  it("R222-5 AC2 a FIFO put in the input schema's place after resolution reads inputSchema not-a-file at load with zero loads, while no writer exists", { timeout: 30_000 }, async () => {
    const { options, inputSchemaPath } = plantPackage();
    const resolved = await packageResolved(options);
    unlinkSync(inputSchemaPath);
    execFileSync("mkfifo", [inputSchemaPath]);
    expect(await settledWithoutWriter(inputSchemaPath, loadReadingOf(resolved))).toBe("inputSchema not-a-file loads=0");
  });

  it("R222-6 the load's order and its minting: the artifact is measured again before the schema files (both changed after resolution reads artifact digest-mismatch), and a package resolution the admission did not mint reads resolution unresolved, each with zero loads", async () => {
    const both = plantPackage();
    const bothResolved = await packageResolved(both.options);
    flipOneByte(both.options.artifactPath);
    flipOneByte(both.inputSchemaPath);
    const forged = plantPackage();
    const minted = await packageResolved(forged.options);
    const copy: MechanicalResolvedPackage = Object.freeze({ ...minted });
    expect([await loadReadingOf(bothResolved), await loadReadingOf(copy), await loadReadingOf(minted)]).toEqual([
      "artifact digest-mismatch loads=0",
      "resolution unresolved loads=0",
      "admitted loads=1",
    ]);
  });
});

describe("wb-y0n6 EAT-R224: two admissions run together", () => {
  it("R224-1 AC1 two admissions started together on two roots holding the same bytes under the same pins are both admitted, each load receiving its own root's artifact, with the same reviewed entry", async () => {
    const first = plantPackage();
    const second = plantPackage();
    expect(second.options.pin).toEqual(first.options.pin);
    expect(second.options.schemaPin).toEqual(first.options.schemaPin);
    const { loader, calls } = recordingLoader();
    const outcomes = await Promise.all([admitMechanicalPackage(first.options, loader), admitMechanicalPackage(second.options, loader)]);
    expect(outcomes.map(readingOfOutcome)).toEqual(["admitted", "admitted"]);
    expect(calls.map(({ artifact }) => artifact.realPath).sort()).toEqual(outcomes.map(outcome => (outcome.ok ? outcome.artifact.realPath : "refused")).sort());
    expect(new Set(calls.map(({ artifact }) => artifact.realPath)).size).toBe(2);
    expect(calls.every(({ entry }) => entry === REVIEWED)).toBe(true);
  });

  it("R224-2 AC2 started together with one root's input schema changed by one byte, that admission reads inputSchema digest-mismatch and the other is admitted: the shared loader runs once, for the clean root's artifact", async () => {
    const clean = plantPackage();
    const changed = plantPackage();
    flipOneByte(changed.inputSchemaPath);
    const { loader, calls } = recordingLoader();
    const [changedOutcome, cleanOutcome] = await Promise.all([admitMechanicalPackage(changed.options, loader), admitMechanicalPackage(clean.options, loader)]);
    expect([changedOutcome, cleanOutcome].map(readingOfOutcome)).toEqual(["inputSchema digest-mismatch", "admitted"]);
    expect(calls.map(({ artifact }) => artifact.realPath)).toEqual([cleanOutcome.ok ? cleanOutcome.artifact.realPath : "refused"]);
  });

  it("R224-3 AC2 two resolutions loaded together after one root's output schema link was re-pointed: that load reads outputSchema changed and the other is admitted, the shared loader running once, for the unchanged root", async () => {
    const steady = plantPackage();
    const moved = plantPackage();
    const first = join(moved.root, "first", REVIEWED.outputSchema);
    write(first, readFileSync(moved.outputSchemaPath));
    unlinkSync(moved.outputSchemaPath);
    symlinkSync(first, moved.outputSchemaPath);
    const [steadyResolved, movedResolved] = await Promise.all([packageResolved(steady.options), packageResolved(moved.options)]);
    const second = join(moved.root, "second", REVIEWED.outputSchema);
    write(second, readFileSync(first));
    unlinkSync(moved.outputSchemaPath);
    symlinkSync(second, moved.outputSchemaPath);
    const { loader, calls } = recordingLoader();
    const outcomes = await Promise.all([loadMechanicalPackage(movedResolved, loader), loadMechanicalPackage(steadyResolved, loader)]);
    expect(outcomes.map(readingOfOutcome)).toEqual(["outputSchema changed", "admitted"]);
    expect(calls.map(({ artifact }) => artifact.realPath)).toEqual([steadyResolved.entrypoint.artifact.realPath]);
  });
});

describe("wb-y0n6 EAT-R225: the candidate action spelling under the unadopted contract", () => {
  /** The program's proposed one-colon action spelling (pi-02 P00 "mechanical:develop-write"), not adopted by any contract. */
  const CANDIDATE = "mechanical:develop-write";

  it("R225-3 AC3 the production contract is unadopted: in each host mode, a function request for the reviewed definition whose caller policy and input name the candidate spelling, with the host holding workbench:execute, workbench:detach and the candidate, refuses at entry as function-action-unadopted with zero dispatch calls once the boundary settles", async () => {
    expect(FUNCTION_ACTION_CONTRACT).toEqual({ state: "unadopted", blockedOn: "MW-CONTRACT" });
    const held = [EXECUTE_GRANT, DETACH_GRANT, CANDIDATE];
    const host: FunctionAuthorityHost = { grants: () => held, identity: () => ({ principal: "local-operator:1000:s1", sessionId: "s1" }) };
    const readings: string[] = [];
    for (const hostMode of ["embedded", "detached"] as const satisfies readonly ExecuteHostMode[]) {
      const decision = decideExecute(
        {
          definitionRef: { kind: "function", id: REVIEWED.id, schemaVersion: MECHANICAL_ENTRYPOINT_SCHEMA, artifactDigest: PRODUCER_DIGEST },
          input: { task: "t", actionGrant: CANDIDATE },
          hostMode,
          policy: { actionGrant: CANDIDATE, grants: held },
        },
        { grants: held, invocationId: "fn_0123456789ab" },
      );
      if (decision.decision !== "admitted") throw new Error(`the request is admitted by decideExecute (${decision.policy})`);
      let dispatched = 0;
      const result = await dispatchFunctionWithAuthority({
        admission: decision.admission,
        contract: FUNCTION_ACTION_CONTRACT,
        host,
        dispatch: async () => {
          dispatched += 1;
          return "dispatched";
        },
      });
      readings.push(`${hostMode} ${result.status === "refused" ? `${result.stage} ${result.refusal.policy}` : "dispatched"} dispatches=${dispatched}`);
    }
    expect(readings).toEqual(["embedded entry function-action-unadopted dispatches=0", "detached entry function-action-unadopted dispatches=0"]);
  });
});

describe("wb-y0n6: the closed reason list", () => {
  it("R-VOCAB-1 the closed reason list holds member-duplicate exactly once, after the eighteen wb-ocie reasons", () => {
    expect(MECHANICAL_ENTRYPOINT_REASONS.filter(reason => reason === "member-duplicate")).toEqual(["member-duplicate"]);
    expect(MECHANICAL_ENTRYPOINT_REASONS.indexOf("member-duplicate")).toBe(18);
  });
});

/** The module's own source: R-SET-1 reads the header's step 3 and its PACKAGE ADMISSION section from it. */
const MODULE_SOURCE = readFileSync(new URL("../src/workbench/mechanical-descriptor.ts", import.meta.url), "utf8");
/** The module header's text from the line starting `start` up to the first later line starting `end`, comment markers dropped. */
function headerSection(start: string, end: string): string {
  const lines = MODULE_SOURCE.split("\n");
  const from = lines.findIndex(line => line.startsWith(start));
  const to = lines.findIndex((line, index) => index > from && line.startsWith(end));
  expect(from >= 0 && to > from, `the module header holds ${start} and then ${end}`).toBe(true);
  return lines
    .slice(from, to)
    .map(line => line.replace(/^ \*\s*/, ""))
    .join(" ");
}
/** Orders case ids by group, then number (R217-2 before R217-10). */
const byCase = (left: string, right: string): number => {
  const [leftGroup = "", leftNumber = "0"] = left.split("-");
  const [rightGroup = "", rightNumber = "0"] = right.split("-");
  return leftGroup === rightGroup ? Number(leftNumber) - Number(rightNumber) : leftGroup < rightGroup ? -1 : 1;
};

describe("wb-y0n6: the pinned reader set (the last case of this file)", () => {
  it("R-SET-1 the file's cases are the pinned reader set its header lists, frozen by requirement, case and criterion, and the module header's step 3 and PACKAGE ADMISSION section, read from src, cite exactly its R217, R219, R222 and R224 cases", ({ task }) => {
    const rows: string[] = [];
    const walk = (tasks: typeof task.file.tasks, requirement: string): void => {
      for (const child of tasks) {
        if (child.type === "suite") walk(child.tasks, /^wb-y0n6 (EAT-R\d{3}):/.exec(child.name)?.[1] ?? "-");
        else if (child.type === "test") {
          const [head = "", label = ""] = child.name.split(" ");
          rows.push(/^AC\d(?:\/AC\d)*$/.test(label) ? `${requirement} ${head} ${label}` : `${requirement} ${head}`);
        }
      }
    };
    walk(task.file.tasks, "-");
    expect(rows).toEqual([
      "EAT-R219 R219-1",
      "EAT-R219 R219-2 AC2/AC3",
      "EAT-R219 R219-3 AC2",
      "EAT-R219 R219-4 AC2",
      "EAT-R219 R219-5 AC2",
      "EAT-R219 R219-6 AC2",
      "EAT-R219 R219-7",
      "EAT-R219 R219-8",
      "EAT-R217 R217-1 AC2",
      "EAT-R217 R217-2 AC2",
      "EAT-R217 R217-3 AC2",
      "EAT-R217 R217-4 AC2",
      "EAT-R217 R217-5 AC3",
      "EAT-R217 R217-6",
      "EAT-R217 R217-7",
      "EAT-R222 R222-1 AC1/AC3",
      "EAT-R222 R222-2 AC1",
      "EAT-R222 R222-3 AC2",
      "EAT-R222 R222-4 AC2",
      "EAT-R222 R222-5 AC2",
      "EAT-R222 R222-6",
      "EAT-R224 R224-1 AC1",
      "EAT-R224 R224-2 AC2",
      "EAT-R224 R224-3 AC2",
      "EAT-R225 R225-3 AC3",
      "- R-VOCAB-1",
      "- R-SET-1",
    ]);
    const header = `${headerSection(" *  3. ", " *  4. ")} ${headerSection(" * PACKAGE ADMISSION", " * NOT CLAIMED")}`;
    const cited = [...new Set(header.match(/\bR2(?:17|19|22|24)-\d+\b/g) ?? [])].sort(byCase);
    const cases = rows.flatMap(row => row.split(" ").slice(1, 2)).filter(head => /^R2(?:17|19|22|24)-\d+$/.test(head));
    expect(cited, "the header's step 3 and PACKAGE ADMISSION section cite exactly this file's R217, R219, R222 and R224 cases").toEqual([...cases].sort(byCase));
  });
});
