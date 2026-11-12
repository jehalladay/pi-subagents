/**
 * wb-zwx5 ("[MII P02+] Installed host via shipped @mechanical/development-rig/host"): src/workbench/mechanical-installed-host.ts,
 * Pi's adapter for MechanicalWorkflows' installed application host, at the V1 tier against stand-in installed consumers.
 *
 * Requirements (pi-subagents master 53ac7f35, docs/workbench/programs/mechanical-interop-integrity-2026-11-10/requirements/
 * ATOMIC-REQUIREMENTS.md); every case is titled by the requirement and acceptance criterion it pins:
 *  EAT-R421 AC1 "(assert the resolved module URL is under the consumer root)" (R421-1 pins the file: URL the importer is
 *   handed; the criterion's "`import()` resolves `@mechanical/development-rig/host` from that installed root" is NOT CLAIMED
 *   by this file, since the recording importer imports nothing). AC2 "Given the same configuration with the rig tarball's
 *   digest changed by one byte, or a descriptor byte changed with the ref digest unchanged, then the adapter refuses before
 *   `import()` with the typed category and DETECT-ZERO (a) reads 0; the untouched positive control reads 1." (R421-2 plants it
 *   in a stand-in consumer: one byte of the stand-in tarball or of the descriptor flipped, its entry digest unchanged.) AC3 "Given a `NODE_PATH`/checkout-resolvable `@mechanical/development-rig` outside
 *   the installed root, then the adapter never resolves it (assert the importer seam was handed a `file:` URL under the
 *   installed root, never a bare specifier)."
 *  EAT-R422 AC1 "is mutated after extraction with the tarball untouched, then the adapter refuses
 *   `installed-content-mismatch`" and "the untouched control imports once" (R422-1 mutates the stand-in rig's host module
 *   dist/host.js and the library's entry file dist/index.js and reads DETECT-ZERO (a) at 0; the criterion's "`dist/index.js`
 *   (rig)", its "transitive library file" and DETECT-ZERO (b) are NOT CLAIMED by this file). AC2 "Given a runtime file present on disk but absent from the admitted manifest (an added file), then the
 *   adapter refuses; given a manifest entry with no file, then it refuses with a distinct typed reason (not ENOENT)." AC3
 *   "Given a symlink introduced under the installed root pointing outside it, then the adapter refuses before import (path
 *   confinement is re-asserted at the final load, not only at measure time)." (R422-3 and R422-4 plant the links under the
 *   scope directory node_modules/@mechanical; a link elsewhere under the consumer root is NOT CLAIMED by this file.)
 *  EAT-R423 AC2 "Given an installed host whose `HOST_API_VERSION` differs from the ratified literal, then admission refuses"
 *   (the refusal arm; R423-2 compares with MECHANICAL_HOST_BINDING_CONTRACT, whose ratification is NOT CLAIMED by this
 *   file). AC3 "an injected `input.export` is ignored" (R423-1 plants it as a stray export member of the options, and pins the
 *   namespace read by exactly two names, HOST_API_VERSION and the entry's export name, so the criterion's "read by the
 *   allowlisted name only" is NOT CLAIMED by this file as worded). AC4 "the correct behaviour is a typed refusal
 *   `runtime-unavailable`" (R423-3; the criterion's "turns criterion 1 red" is NOT CLAIMED by this file, which pins no
 *   criterion 1 case).
 *  EAT-R425 AC1 "Given an installed consumer with no SDKs, when a function request is admitted for a native-labelled run, then
 *   the admission record carries `sdk.claude: null`, `sdk.forge: null`, the refusal is `runtime-unavailable`" (R425-1 pins the
 *   refusal's field, sdk.claude or sdk.forge; the refusal carries no specifier text, so the criterion's "naming the missing
 *   specifier" is NOT CLAIMED by this file). AC2 "Given the SDKs are installed in the consumer root, then the admission record
 *   carries their resolved version strings and resolution paths under the consumer root, and a test asserts the paths are not
 *   under" the Pi checkout (R425-2; the criterion's "either repository checkout" is NOT CLAIMED by this file, since no case
 *   reads the MechanicalWorkflows checkout). AC3 "Given `process.version` is v22.x under a Pi host declaring >=24, then
 *   admission refuses `runtime-unavailable`" and "given v24.x it proceeds (positive control)" (R425-3 plants v22.23.2 for v22.x
 *   and v24.20.0 for v24.x, and pins the measured version in the refusal's recorded identity; the reason is the closed token
 *   runtime-unavailable, so the criterion's "with the measured version in the reason" is NOT CLAIMED by this file, and neither
 *   is any v24.x spelling but v24.20.0: R425-3 plants v24, v24.20 and v24.20.0-nightly, each refused).
 *
 * PINNED READER SET (each case below by its id; the assertion target is the reading "<field> <reason> imports=<n>" or
 * "admitted imports=<n>", where imports is DETECT-ZERO (a), the call count of a recording importer that imports nothing and
 * answers with a stand-in namespace recording each name read):
 *  - R421-1 to R421-5 (EAT-R421): the importer's one file: URL, and the digest, checkout, file-form and export-map refusals.
 *  - R422-1 to R422-5 (EAT-R422): the content manifest's changed, added, missing, linked and special files, at both phases.
 *  - R423-1 to R423-4 (EAT-R423): the two names read off the namespace, the version and composed-export refusals, no legacy.
 *  - R425-1 to R425-5 (EAT-R425): the runtime identity recorded at admission and its node and SDK refusals.
 *  - R-ENTRY-1 to R-VOCAB-1 (shared): the entry and runtime shapes, the step order, the load-time checks and the vocabulary.
 *  - R-SET-1 (the last case): this set, frozen by requirement, case and criterion as the describe and case titles spell them,
 *    and anchored outside its own literal twice: the module header, read from src, cites exactly these cases, and the lines
 *    above, read from this file's own header, span exactly each requirement's cases.
 *
 * THE STAND-INS: each case's consumer root is a scratch directory holding node_modules/@mechanical/development-rig (its
 * package.json carries the export map MechanicalWorkflows 69cb016d ships, apps/development-rig/package.json:13-19) and
 * node_modules/@mechanical/workflows-development, each with stand-in module files; a stand-in tarball whose bytes are pinned by
 * their own SHA-256; and a copy of the producer descriptor test/fixtures/mw-development-entrypoint-v1.json (the wb-ocie R007-1
 * fixture). No case imports a planted file. That the stand-ins are the producer's packed artifacts is NOT CLAIMED.
 *
 * NOT CLAIMED by this file: the V2 tier (an independently packed MechanicalWorkflows host installed in a fresh external
 * consumer: EAT-R421 AC1's eight runtime exports, EAT-R422 at V2, EAT-R460) and the V3 tier through the registered tools; the
 * composed export's dispatch and call count (EAT-R423 AC1, BLOCKED: no composed export at MechanicalWorkflows 69cb016d);
 * DETECT-ZERO (b) to (e), the four callbacks, SDK sessions, Forge requests and child processes (the adapter dispatches
 * nothing, so no positive control for them exists here); EAT-R424 (the binding, G-RATIFY); a real SDK resolution on a native
 * run (EAT-R425 V4); and the forms the module header lists as NOT CLAIMED. Each case claims only the forms it plants, as its
 * title and the module header list them; a form no case plants is NOT CLAIMED by this file.
 *
 * FORM (respin cut #3, the enumerate-the-resolvable form): the module header's RESIDUALS name the known forms the adapter
 * reads otherwise than its wording suggests, each with its quiet row in a case of this file (R-OPTIONS-NOT-OBJECT in
 * R-ENTRY-1, R-STRAY-SCOPE-FILE in R425-5); a form found later joins that list, it is not a claim.
 *
 * Display paths added: none (the adapter returns closed-vocabulary diagnostics and a measured identity record; it composes no
 * label or reply text).
 */
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { cpSync, lstatSync, mkdirSync, readdirSync, readFileSync, realpathSync, renameSync, rmSync, symlinkSync, unlinkSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { afterAll, afterEach, describe, expect, it } from "vitest";
import { MECHANICAL_HOST_BINDING_CONTRACT } from "../src/workbench/mechanical-host-binding.js";
import {
  admitMechanicalInstalledHost,
  loadMechanicalInstalledHost,
  MECHANICAL_HOST_NODE_MAJOR,
  MECHANICAL_HOST_SDKS,
  MECHANICAL_INSTALLED_HOST_FIELDS,
  MECHANICAL_INSTALLED_HOST_REASONS,
  MECHANICAL_LEGACY_HOST_EXPORT,
  type MechanicalInstalledHostLoad,
  type MechanicalInstalledHostOptions,
  type MechanicalInstalledHostResolution,
  type MechanicalResolvedInstalledHost,
  type MechanicalRuntimeIdentity,
  type MechanicalSdkIdentity,
  measureMechanicalInstalledContent,
  resolveMechanicalInstalledHost,
} from "../src/workbench/mechanical-installed-host.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard(afterAll);
const scratches: string[] = [];
afterEach(() => removeScratch(...scratches.splice(0)));
const scratch = (): string => {
  const dir = makeScratch("wb-zwx5-installed-host-");
  scratches.push(dir);
  return dir;
};

/** The producer descriptor of record and its SHA-256 (wb-ocie R007-1 holds the fixture to these bytes). */
const DESCRIPTOR_BYTES = readFileSync(new URL("./fixtures/mw-development-entrypoint-v1.json", import.meta.url));
const PRODUCER_DIGEST = "sha256:68cc312ba82c5837eff64bb6de39e0db09073c836d851d550e13aa458d192d0f";
/** The composed export's name mw-02 section 1 proposes; unratified, so the stand-in entry names it as the host's choice. */
const COMPOSED = "invokeAuthorizedDevelopmentHost";
/** The Pi checkout this suite runs from: an SDK resolution path must not lie under it (R425-2). */
const PI_CHECKOUT = realpathSync(fileURLToPath(new URL("..", import.meta.url)));
const digestOf = (bytes: Uint8Array | string): string => `sha256:${createHash("sha256").update(bytes).digest("hex")}`;

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

/** JSON text whose string member holds the byte 0xff, which is not UTF-8: the given head, that byte, then the given tail. */
const notUtf8 = (head: string, tail: string): Uint8Array => Buffer.concat([Buffer.from(head, "utf8"), Buffer.from([0xff]), Buffer.from(tail, "utf8")]);

/** The rig's package.json as MechanicalWorkflows 69cb016d ships its export map. */
const RIG_PACKAGE: Readonly<Record<string, unknown>> = Object.freeze({
  name: "@mechanical/development-rig",
  version: "0.1.0",
  type: "module",
  exports: { "./host": { types: "./dist/host.d.ts", import: "./dist/host.js", default: "./dist/host.js" }, "./package.json": "./package.json" },
});
const LIBRARY_PACKAGE: Readonly<Record<string, unknown>> = Object.freeze({
  name: "@mechanical/workflows-development",
  version: "0.1.0",
  type: "module",
  exports: { ".": "./dist/index.js" },
});
/** Writes one stand-in @mechanical scope directory: the rig (host module, a transitive local file, a README) and the library. */
const writeScope = (scope: string, tag: string, rigPackage: string): void => {
  write(join(scope, "development-rig", "package.json"), rigPackage);
  write(join(scope, "development-rig", "dist", "host.js"), `import { CONTRACT } from "./host-binding.js";\nexport const HOST_API_VERSION = CONTRACT;\nexport const TAG = ${JSON.stringify(tag)};\n`);
  write(join(scope, "development-rig", "dist", "host-binding.js"), `export const CONTRACT = ${JSON.stringify(MECHANICAL_HOST_BINDING_CONTRACT)};\n`);
  write(join(scope, "development-rig", "README.md"), `stand-in rig ${tag}\n`);
  write(join(scope, "workflows-development", "package.json"), `${JSON.stringify(LIBRARY_PACKAGE, null, 2)}\n`);
  write(join(scope, "workflows-development", "dist", "index.js"), `export const develop = () => ${JSON.stringify(tag)};\n`);
};
/** The suite's own manifest reader: every regular file under node_modules/@mechanical with the SHA-256 of its bytes. */
const contentOf = (root: string): Record<string, string> => {
  const scope = join(root, "node_modules", "@mechanical");
  const content: Record<string, string> = {};
  const visit = (directory: string, prefix: string): void => {
    for (const name of readdirSync(directory).sort()) {
      const path = join(directory, name);
      const key = prefix === "" ? name : `${prefix}/${name}`;
      if (lstatSync(path).isDirectory()) visit(path, key);
      else content[key] = digestOf(readFileSync(path));
    }
  };
  visit(scope, "");
  return content;
};

interface ConsumerPlant {
  readonly root: string;
  readonly rig: string;
  readonly library: string;
  readonly tarballPath: string;
  readonly descriptorPath: string;
  readonly options: MechanicalInstalledHostOptions;
}
interface PlantShape {
  /** The directory to plant the consumer in (an existing empty directory); a fresh scratch directory by default. */
  readonly root?: string;
  readonly rigPackage?: string;
  readonly sdks?: readonly (keyof typeof MECHANICAL_HOST_SDKS)[];
  readonly sdkUse?: "native" | "fixture";
  readonly nodeVersion?: string;
}
/** One stand-in consumer root, its entry holding the stand-ins' own digests and the suite's own manifest of the scope. */
const plantConsumer = (shape: PlantShape = {}): ConsumerPlant => {
  const root = shape.root ?? scratch();
  write(join(root, "package.json"), `${JSON.stringify({ name: "fresh-consumer", private: true, type: "module" })}\n`);
  const scope = join(root, "node_modules", "@mechanical");
  writeScope(scope, "planted", shape.rigPackage ?? `${JSON.stringify(RIG_PACKAGE, null, 2)}\n`);
  const versions: Readonly<Record<keyof typeof MECHANICAL_HOST_SDKS, string>> = { "sdk.claude": "0.3.300", "sdk.forge": "0.1.0" };
  for (const field of shape.sdks ?? []) {
    const specifier = MECHANICAL_HOST_SDKS[field];
    write(join(root, "node_modules", ...specifier.split("/"), "package.json"), `${JSON.stringify({ name: specifier, version: versions[field] })}\n`);
  }
  const tarballPath = join(root, "artifacts", "mechanical-development-rig-0.1.0.tgz");
  write(tarballPath, "stand-in rig tarball bytes\n");
  const descriptorPath = join(root, "reviewed", "development.v1.json");
  write(descriptorPath, DESCRIPTOR_BYTES);
  return {
    root,
    rig: join(scope, "development-rig"),
    library: join(scope, "workflows-development"),
    tarballPath,
    descriptorPath,
    options: {
      consumerRoot: root,
      tarballPath,
      descriptorPath,
      entry: { tarballDigest: digestOf(readFileSync(tarballPath)), descriptorDigest: PRODUCER_DIGEST, composedExport: COMPOSED, content: contentOf(root) },
      runtime: { nodeVersion: shape.nodeVersion ?? "v24.20.0", sdkUse: shape.sdkUse ?? "fixture" },
    },
  };
};

/** The manifest lines of one scope package in the suite's own reading, "<path inside the package> <digest>" in path order. */
const linesOf = (content: Readonly<Record<string, string>>, directory: string): string =>
  Object.entries(content)
    .filter(([path]) => path.startsWith(`${directory}/`))
    .map(([path, digest]) => `${path.slice(directory.length + 1)} ${digest}\n`)
    .join("");
/** The identity the suite's own reader expects of a standard plant (both scope packages at 0.1.0), with the given SDK members. */
const identityOf = (plant: ConsumerPlant, sdk: MechanicalRuntimeIdentity["sdk"]): MechanicalRuntimeIdentity => {
  const content = contentOf(plant.root);
  return {
    node: plant.options.runtime.nodeVersion ?? process.version,
    sdkUse: plant.options.runtime.sdkUse,
    tarballDigest: plant.options.entry.tarballDigest,
    packages: [
      { directory: "development-rig", name: "@mechanical/development-rig", version: "0.1.0", contentDigest: digestOf(linesOf(content, "development-rig")) },
      { directory: "workflows-development", name: "@mechanical/workflows-development", version: "0.1.0", contentDigest: digestOf(linesOf(content, "workflows-development")) },
    ],
    sdk,
  };
};
/** The identity the adapter records for one SDK planted by plantConsumer. */
const sdkOf = (plant: ConsumerPlant, field: keyof typeof MECHANICAL_HOST_SDKS): MechanicalSdkIdentity => ({
  specifier: MECHANICAL_HOST_SDKS[field],
  version: field === "sdk.claude" ? "0.3.300" : "0.1.0",
  resolutionPath: join(realpathSync(plant.root), "node_modules", ...MECHANICAL_HOST_SDKS[field].split("/")),
});

interface Recording {
  readonly importModule: (url: string) => Promise<unknown>;
  readonly urls: string[];
  /** The number of arguments of each importer call. */
  readonly argCounts: number[];
  /** Each name the adapter read off the namespace, the promise machinery's own "then" lookup on the awaited value excluded. */
  readonly reads: string[];
  readonly calls: string[];
}
/** A stand-in host namespace: the eight runtime exports MechanicalWorkflows 69cb016d's host.ts lists, plus the composed export. */
const hostMembers = (calls: string[]): Record<string, unknown> => {
  const exported = (name: string) => (): string => {
    calls.push(name);
    return `${name} stand-in`;
  };
  return {
    HOST_API_VERSION: MECHANICAL_HOST_BINDING_CONTRACT,
    HostAdmissionError: class StandInHostAdmissionError extends Error {},
    HostBindingError: class StandInHostBindingError extends Error {},
    WRITE_GRANT: "stand-in-grant",
    admitHostBinding: exported("admitHostBinding"),
    dispatchWriteAtFinalBoundary: exported("dispatchWriteAtFinalBoundary"),
    validateHostBinding: exported("validateHostBinding"),
    invokeDevelopmentHost: exported("invokeDevelopmentHost"),
    [COMPOSED]: exported(COMPOSED),
  };
};
/** A recording importer: it imports nothing, records each URL, and answers with a namespace proxy that records each name read. */
const recordingImporter = (shape: (members: Record<string, unknown>) => Record<string, unknown> = members => members): Recording => {
  const urls: string[] = [];
  const argCounts: number[] = [];
  const reads: string[] = [];
  const calls: string[] = [];
  const target = shape(hostMembers(calls));
  const note = (key: string | symbol): void => {
    if (key !== "then") reads.push(String(key));
  };
  const namespace = new Proxy(target, {
    get(object, key, receiver) {
      note(key);
      return Reflect.get(object, key, receiver);
    },
    getOwnPropertyDescriptor(object, key) {
      note(key);
      return Reflect.getOwnPropertyDescriptor(object, key);
    },
    has(object, key) {
      note(key);
      return Reflect.has(object, key);
    },
    ownKeys(object) {
      reads.push("(own keys)");
      return Reflect.ownKeys(object);
    },
  });
  const importModule = async (...args: unknown[]): Promise<unknown> => {
    argCounts.push(args.length);
    urls.push(String(args[0]));
    return namespace;
  };
  return { importModule, urls, argCounts, reads, calls };
};
/** The reading of one outcome; every refusal it reads must be frozen, its diagnostic frozen too, and carry the one refusal code. */
const readingOf = (outcome: MechanicalInstalledHostLoad | MechanicalInstalledHostResolution): string => {
  if (outcome.ok) return "admitted";
  expect([Object.isFrozen(outcome), Object.isFrozen(outcome.diagnostic), outcome.diagnostic.code], "a refusal is frozen with its diagnostic and the one code").toEqual([
    true,
    true,
    "mechanical-installed-host-refused",
  ]);
  return `${outcome.diagnostic.field} ${outcome.diagnostic.reason}`;
};
/** The one-shot admission's reading of one consumer: its outcome and the importer's call count. */
async function admitReading(options: MechanicalInstalledHostOptions, recording: Recording = recordingImporter()): Promise<string> {
  return `${readingOf(await admitMechanicalInstalledHost(options, recording.importModule))} imports=${recording.urls.length}`;
}
/** A resolution, failing the case when the plant does not resolve. */
async function resolvedOf(options: MechanicalInstalledHostOptions): Promise<MechanicalResolvedInstalledHost> {
  const resolution = await resolveMechanicalInstalledHost(options);
  if (!resolution.ok) throw new Error(`the plant resolves (${resolution.diagnostic.field} ${resolution.diagnostic.reason})`);
  return resolution.resolved;
}
/** The load phase's reading of one resolution. */
async function loadReading(resolved: MechanicalResolvedInstalledHost, recording: Recording = recordingImporter()): Promise<string> {
  return `${readingOf(await loadMechanicalInstalledHost(resolved, recording.importModule))} imports=${recording.urls.length}`;
}
const hostUrlOf = (root: string): string => pathToFileURL(join(realpathSync(root), "node_modules", "@mechanical", "development-rig", "dist", "host.js")).href;

describe("wb-zwx5 EAT-R421: the installed rig host is read only from the digest-pinned installed artifact", () => {
  it("R421-1 AC1 an admitted stand-in consumer hands the importer one file: URL and no other argument, the realpath of the export map's ./host import target under the consumer root, also when the root is named through a link", async () => {
    const plant = plantConsumer();
    const direct = recordingImporter();
    expect(await admitReading(plant.options, direct)).toBe("admitted imports=1");
    expect(direct.urls).toEqual([hostUrlOf(plant.root)]);
    expect(direct.argCounts).toEqual([1]);
    expect(direct.urls[0]?.startsWith(`${pathToFileURL(realpathSync(plant.root)).href}/`)).toBe(true);
    const link = join(scratch(), "consumer-link");
    symlinkSync(plant.root, link);
    const linked = recordingImporter();
    expect(await admitReading({ ...plant.options, consumerRoot: link }, linked)).toBe("admitted imports=1");
    expect(linked.urls).toEqual(direct.urls);
    expect(linked.argCounts).toEqual([1]);
  });

  it("R421-2 AC2 a rig tarball or a descriptor flipped by one byte, its entry digest unchanged, refuses before any import, and the untouched control imports once", async () => {
    expect(await admitReading(plantConsumer().options)).toBe("admitted imports=1");
    const tarball = plantConsumer();
    flipOneByte(tarball.tarballPath);
    expect(await admitReading(tarball.options)).toBe("tarball artifact-mismatch imports=0");
    const descriptor = plantConsumer();
    flipOneByte(descriptor.descriptorPath);
    expect(await admitReading(descriptor.options)).toBe("descriptor descriptor-mismatch imports=0");
  });

  it("R421-3 AC3 a decoy rig outside the consumer root that NODE_PATH names is never handed to the importer; a rig directory or node_modules linked to that checkout, and the scope directory linked to the consumer root itself, each refuse before any import", async () => {
    const checkout = scratch();
    writeScope(join(checkout, "node_modules", "@mechanical"), "decoy", `${JSON.stringify(RIG_PACKAGE)}\n`);
    const plant = plantConsumer();
    const saved = process.env.NODE_PATH;
    process.env.NODE_PATH = join(checkout, "node_modules");
    const recording = recordingImporter();
    try {
      expect(await admitReading(plant.options, recording)).toBe("admitted imports=1");
    } finally {
      if (saved === undefined) Reflect.deleteProperty(process.env, "NODE_PATH");
      else process.env.NODE_PATH = saved;
    }
    const [url = ""] = recording.urls;
    expect(url.startsWith("file:")).toBe(true);
    expect(url.startsWith(`${pathToFileURL(realpathSync(plant.root)).href}/`)).toBe(true);
    expect(url.startsWith(`${pathToFileURL(realpathSync(checkout)).href}/`)).toBe(false);
    const linkedRig = plantConsumer();
    rmSync(linkedRig.rig, { recursive: true });
    symlinkSync(join(checkout, "node_modules", "@mechanical", "development-rig"), linkedRig.rig);
    expect(await admitReading(linkedRig.options)).toBe("installed installed-link imports=0");
    const linkedModules = plantConsumer();
    rmSync(join(linkedModules.root, "node_modules"), { recursive: true });
    symlinkSync(join(checkout, "node_modules"), join(linkedModules.root, "node_modules"));
    expect(await admitReading(linkedModules.options)).toBe("installed outside-root imports=0");
    const scopeAtRoot = plantConsumer();
    const scopeDirectory = join(scopeAtRoot.root, "node_modules", "@mechanical");
    rmSync(scopeDirectory, { recursive: true });
    symlinkSync(scopeAtRoot.root, scopeDirectory);
    expect(await admitReading(scopeAtRoot.options)).toBe("installed outside-root imports=0");
  });

  it("R421-4 a tarball in another directory, at the consumer root itself or at its parent directory refuses outside-root; a directory in its place, a missing tarball, a missing descriptor, a descriptor named through a link and a FIFO in the descriptor's place each refuse before any import; a descriptor outside the consumer root is admitted", async () => {
    const outside = plantConsumer();
    const elsewhere = join(scratch(), "rig.tgz");
    writeFileSync(elsewhere, readFileSync(outside.tarballPath));
    expect(await admitReading({ ...outside.options, tarballPath: elsewhere })).toBe("tarball outside-root imports=0");
    const atRoot = plantConsumer();
    expect(await admitReading({ ...atRoot.options, tarballPath: atRoot.root })).toBe("tarball outside-root imports=0");
    const parent = scratch();
    const atParent = plantConsumer({ root: join(parent, "consumer") });
    expect(await admitReading({ ...atParent.options, tarballPath: parent })).toBe("tarball outside-root imports=0");
    const outsideDescriptor = plantConsumer();
    const reviewed = join(scratch(), "development.v1.json");
    writeFileSync(reviewed, DESCRIPTOR_BYTES);
    expect(await admitReading({ ...outsideDescriptor.options, descriptorPath: reviewed })).toBe("admitted imports=1");
    const directory = plantConsumer();
    rmSync(directory.tarballPath);
    mkdirSync(directory.tarballPath);
    expect(await admitReading(directory.options)).toBe("tarball not-a-file imports=0");
    const missing = plantConsumer();
    rmSync(missing.tarballPath);
    expect(await admitReading(missing.options)).toBe("tarball unreadable imports=0");
    const noDescriptor = plantConsumer();
    rmSync(noDescriptor.descriptorPath);
    expect(await admitReading(noDescriptor.options)).toBe("descriptor unreadable imports=0");
    const linkedDescriptor = plantConsumer();
    const descriptorTarget = join(linkedDescriptor.root, "reviewed", "development.v1.target.json");
    renameSync(linkedDescriptor.descriptorPath, descriptorTarget);
    symlinkSync(descriptorTarget, linkedDescriptor.descriptorPath);
    expect(await admitReading(linkedDescriptor.options)).toBe("descriptor unreadable imports=0");
    const fifo = plantConsumer();
    rmSync(fifo.descriptorPath);
    execFileSync("mkfifo", [fifo.descriptorPath]);
    expect(await admitReading(fifo.options)).toBe("descriptor not-a-file imports=0");
  });

  it("R421-5 refuses export-map-invalid for exports null, a string or without ./host; ./host null or types-only; a target not led by ./ (dist/host.js, ~/dist/host.js), escaping the package (../escape.js, ./../ into the library) or naming no measured file (a string, or an import beside a measured default); another package name; a package.json not JSON; admits a string, a default-only target, an import beside a differing default (handed over) and a default beside a non-string import", async () => {
    const mapped = (exportsMember: unknown, name = "@mechanical/development-rig"): string => `${JSON.stringify({ ...RIG_PACKAGE, name, exports: exportsMember })}\n`;
    const refusedForms: readonly string[] = [
      mapped({ "./package.json": "./package.json" }),
      mapped(null),
      mapped({ "./host": "../escape.js" }),
      mapped({ "./host": "dist/host.js" }),
      mapped({ "./host": "./dist/absent.js" }),
      mapped({ "./host": { types: "./dist/host.d.ts" } }),
      mapped("./dist/host.js"),
      mapped({ "./host": null }),
      mapped({ "./host": "~/dist/host.js" }),
      mapped({ "./host": "./../workflows-development/dist/index.js" }),
      mapped({ "./host": { import: "./dist/absent.js", default: "./dist/host.js" } }),
      mapped({ "./host": "./dist/host.js" }, "@mechanical/development-rig-fork"),
      "{ not json\n",
    ];
    const readings: string[] = [];
    for (const rigPackage of refusedForms) readings.push(await admitReading(plantConsumer({ rigPackage }).options));
    expect(readings).toEqual(refusedForms.map(() => "exports export-map-invalid imports=0"));
    expect(await admitReading(plantConsumer({ rigPackage: mapped({ "./host": "./dist/host.js" }) }).options)).toBe("admitted imports=1");
    expect(await admitReading(plantConsumer({ rigPackage: mapped({ "./host": { default: "./dist/host.js" } }) }).options)).toBe("admitted imports=1");
    const importFirst = plantConsumer({
      rigPackage: mapped({ "./host": { import: "./dist/host.js", default: "./dist/other.js" } }),
    });
    write(join(importFirst.rig, "dist", "other.js"), "export const decoy = true;\n");
    const importFirstOptions: MechanicalInstalledHostOptions = {
      ...importFirst.options,
      entry: { ...importFirst.options.entry, content: contentOf(importFirst.root) },
    };
    const importFirstRecording = recordingImporter();
    expect(await admitReading(importFirstOptions, importFirstRecording)).toBe("admitted imports=1");
    expect(importFirstRecording.urls).toEqual([hostUrlOf(importFirst.root)]);
    const nonStringImport = plantConsumer({ rigPackage: mapped({ "./host": { import: 7, default: "./dist/host.js" } }) });
    const nonStringRecording = recordingImporter();
    expect(await admitReading(nonStringImport.options, nonStringRecording)).toBe("admitted imports=1");
    expect(nonStringRecording.urls).toEqual([hostUrlOf(nonStringImport.root)]);
  });
});

describe("wb-zwx5 EAT-R422: the installed runtime files are verified against the admitted manifest before the import", () => {
  it("R422-1 AC1 the rig's host module or the library's entry file flipped by one byte after extraction, the tarball untouched, refuses installed-content-mismatch before any import; the untouched control imports once", async () => {
    expect(await admitReading(plantConsumer().options)).toBe("admitted imports=1");
    const rig = plantConsumer();
    flipOneByte(join(rig.rig, "dist", "host.js"));
    expect(digestOf(readFileSync(rig.tarballPath))).toBe(rig.options.entry.tarballDigest);
    expect(await admitReading(rig.options)).toBe("installed installed-content-mismatch imports=0");
    const library = plantConsumer();
    flipOneByte(join(library.library, "dist", "index.js"));
    expect(await admitReading(library.options)).toBe("installed installed-content-mismatch imports=0");
  });

  it("R422-2 AC2 a file added under the scope refuses installed-file-unlisted, and a manifest entry with no file refuses installed-file-missing, never unreadable", async () => {
    const added = plantConsumer();
    write(join(added.rig, "dist", "extra.js"), "export const extra = 1;\n");
    expect(await admitReading(added.options)).toBe("installed installed-file-unlisted imports=0");
    const missing = plantConsumer();
    unlinkSync(join(missing.library, "dist", "index.js"));
    const reading = await admitReading(missing.options);
    expect(reading).toBe("installed installed-file-missing imports=0");
    expect(reading).not.toContain("unreadable");
    const inheritedName = plantConsumer();
    write(join(inheritedName.root, "node_modules", "@mechanical", "constructor"), "a file named like an inherited member\n");
    expect(await admitReading(inheritedName.options)).toBe("installed installed-file-unlisted imports=0");
  });

  it("R422-3 AC3 a link under the scope to a file outside the consumer root or inside it refuses installed-link, and a FIFO refuses not-a-file, each before any import", async () => {
    const outsideFile = join(scratch(), "outside.js");
    writeFileSync(outsideFile, "export const outside = 1;\n");
    const outward = plantConsumer();
    symlinkSync(outsideFile, join(outward.rig, "dist", "escape.js"));
    expect(await admitReading(outward.options)).toBe("installed installed-link imports=0");
    const inward = plantConsumer();
    symlinkSync(join(inward.rig, "dist", "host.js"), join(inward.rig, "dist", "alias.js"));
    expect(await admitReading(inward.options)).toBe("installed installed-link imports=0");
    const fifo = plantConsumer();
    execFileSync("mkfifo", [join(fifo.rig, "dist", "pipe")]);
    expect(await admitReading(fifo.options)).toBe("installed not-a-file imports=0");
  });

  it("R422-4 AC3 after validation, a link planted under the scope, a byte flipped or a file added refuses at load with no import", async () => {
    const linked = plantConsumer();
    const linkedResolved = await resolvedOf(linked.options);
    const outsideFile = join(scratch(), "outside.js");
    writeFileSync(outsideFile, "export const outside = 1;\n");
    symlinkSync(outsideFile, join(linked.rig, "dist", "escape.js"));
    expect(await loadReading(linkedResolved)).toBe("installed installed-link imports=0");
    const flipped = plantConsumer();
    const flippedResolved = await resolvedOf(flipped.options);
    flipOneByte(join(flipped.rig, "dist", "host-binding.js"));
    expect(await loadReading(flippedResolved)).toBe("installed installed-content-mismatch imports=0");
    const added = plantConsumer();
    const addedResolved = await resolvedOf(added.options);
    write(join(added.library, "dist", "late.js"), "export const late = 1;\n");
    expect(await loadReading(addedResolved)).toBe("installed installed-file-unlisted imports=0");
    const control = plantConsumer();
    expect(await loadReading(await resolvedOf(control.options))).toBe("admitted imports=1");
  });

  it("R422-5 Pi's own manifest of a stand-in consumer equals the suite's own reader of the scope, and a link under the scope refuses installed-link", async () => {
    const plant = plantConsumer();
    const measured = await measureMechanicalInstalledContent(plant.root);
    expect(measured.ok ? measured.content : readingOf(measured)).toEqual(contentOf(plant.root));
    expect(Object.keys(contentOf(plant.root))).toEqual([
      "development-rig/README.md",
      "development-rig/dist/host-binding.js",
      "development-rig/dist/host.js",
      "development-rig/package.json",
      "workflows-development/dist/index.js",
      "workflows-development/package.json",
    ]);
    symlinkSync(join(plant.rig, "dist", "host.js"), join(plant.rig, "dist", "alias.js"));
    const linked = await measureMechanicalInstalledContent(plant.root);
    expect(linked.ok ? "measured" : readingOf(linked)).toBe("installed installed-link");
  });
});

describe("wb-zwx5 EAT-R423: the namespace is read by the allowlisted names only, and the legacy export never", () => {
  it("R423-1 AC3 an admitted host returns the composed export uncalled after reading exactly HOST_API_VERSION and the entry's export name, a stray export member of the options ignored", async () => {
    const plant = plantConsumer();
    const recording = recordingImporter();
    const outcome = await admitMechanicalInstalledHost(plant.options, recording.importModule);
    expect(readingOf(outcome)).toBe("admitted");
    expect(recording.reads).toEqual(["HOST_API_VERSION", COMPOSED]);
    expect(recording.calls).toEqual([]);
    const stray: MechanicalInstalledHostOptions & { readonly export: string } = { ...plant.options, export: MECHANICAL_LEGACY_HOST_EXPORT };
    const strayRecording = recordingImporter();
    const strayOutcome = await admitMechanicalInstalledHost(stray, strayRecording.importModule);
    expect(strayOutcome.ok && typeof strayOutcome.exported).toBe("function");
    expect(strayRecording.reads).toEqual(["HOST_API_VERSION", COMPOSED]);
    if (strayOutcome.ok) strayOutcome.exported();
    expect(strayRecording.calls).toEqual([COMPOSED]);
  });

  it("R423-2 AC2 a host whose HOST_API_VERSION is another version, absent, a number, an accessor or only inherited refuses version-mismatch after reading that one name, the accessor never run", async () => {
    let getterRuns = 0;
    const forms: readonly ((members: Record<string, unknown>) => Record<string, unknown>)[] = [
      members => ({ ...members, HOST_API_VERSION: `${MECHANICAL_HOST_BINDING_CONTRACT.slice(0, -1)}2` }),
      ({ HOST_API_VERSION: _absent, ...members }) => members,
      members => ({ ...members, HOST_API_VERSION: 1 }),
      members =>
        Object.defineProperty({ ...members }, "HOST_API_VERSION", {
          enumerable: true,
          get() {
            getterRuns += 1;
            return MECHANICAL_HOST_BINDING_CONTRACT;
          },
        }),
      ({ HOST_API_VERSION: inherited, ...members }) => Object.assign(Object.create({ HOST_API_VERSION: inherited }) as Record<string, unknown>, members),
    ];
    for (const form of forms) {
      const recording = recordingImporter(form);
      expect(await admitReading(plantConsumer().options, recording)).toBe("loaded version-mismatch imports=1");
      expect(recording.reads).toEqual(["HOST_API_VERSION"]);
    }
    expect(getterRuns).toBe(0);
  });

  it("R423-3 AC4 a host without the composed export but with the legacy one, with a string in its place, with an accessor there, or with it only inherited, and an entry naming the one-letter export x the host lacks, each refuse runtime-unavailable, the legacy export never read and the accessor never run", async () => {
    let getterRuns = 0;
    const forms: readonly ((members: Record<string, unknown>) => Record<string, unknown>)[] = [
      ({ [COMPOSED]: _absent, ...members }) => members,
      members => ({ ...members, [COMPOSED]: "not a function" }),
      members =>
        Object.defineProperty({ ...members }, COMPOSED, {
          enumerable: true,
          get() {
            getterRuns += 1;
            return () => "accessor";
          },
        }),
      ({ [COMPOSED]: inherited, ...members }) => Object.assign(Object.create({ [COMPOSED]: inherited }) as Record<string, unknown>, members),
    ];
    for (const form of forms) {
      const recording = recordingImporter(form);
      expect(await admitReading(plantConsumer().options, recording)).toBe("loaded runtime-unavailable imports=1");
      expect(recording.reads).toEqual(["HOST_API_VERSION", COMPOSED]);
      expect(recording.reads).not.toContain(MECHANICAL_LEGACY_HOST_EXPORT);
      expect(recording.calls).toEqual([]);
    }
    expect(getterRuns).toBe(0);
    const oneLetter = plantConsumer();
    const oneLetterRecording = recordingImporter();
    expect(await admitReading({ ...oneLetter.options, entry: { ...oneLetter.options.entry, composedExport: "x" } }, oneLetterRecording)).toBe("loaded runtime-unavailable imports=1");
    expect(oneLetterRecording.reads).toEqual(["HOST_API_VERSION", "x"]);
  });

  it("R423-4 an entry naming the legacy export as its export refuses entry-malformed before any import", async () => {
    const plant = plantConsumer();
    expect(await admitReading({ ...plant.options, entry: { ...plant.options.entry, composedExport: MECHANICAL_LEGACY_HOST_EXPORT } })).toBe("entry entry-malformed imports=0");
  });
});

describe("wb-zwx5 EAT-R425: the runtime identity is recorded at admission and an incompatible runtime refuses", () => {
  it("R425-1 AC1 a native-labelled run refuses runtime-unavailable at sdk.claude, the refusal carrying the identity it measured with sdk.claude null, for a Claude SDK absent, linked to a directory outside the consumer root or to the root itself, naming another package, with the version latest, 1.2, 0.3.300+build.5 or an array, with its package.json a link to a manifest inside or outside the root, unparseable, not UTF-8 or JSON null; and at sdk.forge with only the Claude SDK", async () => {
    const nonePlant = plantConsumer({ sdkUse: "native" });
    const none = await resolveMechanicalInstalledHost(nonePlant.options);
    expect(readingOf(none)).toBe("sdk.claude runtime-unavailable");
    expect(none.ok ? undefined : none.identity).toEqual(identityOf(nonePlant, { claude: null, forge: null }));
    const claudeOnlyPlant = plantConsumer({ sdkUse: "native", sdks: ["sdk.claude"] });
    const claudeOnly = await resolveMechanicalInstalledHost(claudeOnlyPlant.options);
    expect(readingOf(claudeOnly)).toBe("sdk.forge runtime-unavailable");
    expect(claudeOnly.ok ? undefined : claudeOnly.identity).toEqual(identityOf(claudeOnlyPlant, { claude: sdkOf(claudeOnlyPlant, "sdk.claude"), forge: null }));
    expect(await admitReading(plantConsumer({ sdkUse: "native" }).options)).toBe("sdk.claude runtime-unavailable imports=0");

    const claudeSpecifier = MECHANICAL_HOST_SDKS["sdk.claude"];
    const outside = scratch();
    write(join(outside, "package.json"), `${JSON.stringify({ name: claudeSpecifier, version: "0.3.300" })}\n`);
    const claudeDirectory = (plant: ConsumerPlant): string => join(plant.root, "node_modules", ...claudeSpecifier.split("/"));
    const manifestText =
      (text: string) =>
      (plant: ConsumerPlant): void =>
        write(join(claudeDirectory(plant), "package.json"), text);
    const linkedManifest =
      (target: (plant: ConsumerPlant) => string) =>
      (plant: ConsumerPlant): void => {
        const manifest = join(claudeDirectory(plant), "package.json");
        rmSync(manifest);
        symlinkSync(target(plant), manifest);
      };
    const claudeForms: readonly ((plant: ConsumerPlant) => void)[] = [
      plant => {
        rmSync(claudeDirectory(plant), { recursive: true });
        symlinkSync(outside, claudeDirectory(plant));
      },
      plant => {
        write(join(plant.root, "package.json"), `${JSON.stringify({ name: claudeSpecifier, version: "0.3.300" })}\n`);
        rmSync(claudeDirectory(plant), { recursive: true });
        symlinkSync(plant.root, claudeDirectory(plant));
      },
      manifestText(`${JSON.stringify({ name: "@anthropic-ai/other", version: "0.3.300" })}\n`),
      manifestText(`${JSON.stringify({ name: claudeSpecifier, version: "latest" })}\n`),
      manifestText(`${JSON.stringify({ name: claudeSpecifier, version: "1.2" })}\n`),
      manifestText(`${JSON.stringify({ name: claudeSpecifier, version: "0.3.300+build.5" })}\n`),
      manifestText(`${JSON.stringify({ name: claudeSpecifier, version: ["0.3.300"] })}\n`),
      linkedManifest(plant => {
        const inside = join(plant.root, "manifests", "claude.json");
        write(inside, `${JSON.stringify({ name: claudeSpecifier, version: "0.3.300" })}\n`);
        return inside;
      }),
      linkedManifest(() => join(outside, "package.json")),
      manifestText("{ not json\n"),
      plant => write(join(claudeDirectory(plant), "package.json"), notUtf8(`{"name":"${claudeSpecifier}","version":"0.3.300","note":"`, `"}\n`)),
      manifestText("null\n"),
    ];
    for (const form of claudeForms) {
      const invalid = plantConsumer({ sdkUse: "native", sdks: ["sdk.claude", "sdk.forge"] });
      form(invalid);
      const outcome = await resolveMechanicalInstalledHost(invalid.options);
      expect([readingOf(outcome), outcome.ok ? "admitted" : outcome.identity]).toEqual([
        "sdk.claude runtime-unavailable",
        identityOf(invalid, { claude: null, forge: sdkOf(invalid, "sdk.forge") }),
      ]);
      expect(await admitReading(invalid.options)).toBe("sdk.claude runtime-unavailable imports=0");
    }
  });

  it("R425-2 AC2 a native-labelled run with both SDKs in the consumer root records each version and its realpath under the consumer root, not under the Pi checkout, each SDK record frozen", async () => {
    const plant = plantConsumer({ sdkUse: "native", sdks: ["sdk.claude", "sdk.forge"] });
    const resolved = await resolvedOf(plant.options);
    const root = realpathSync(plant.root);
    expect(resolved.identity.sdk).toEqual({
      claude: { specifier: "@anthropic-ai/claude-agent-sdk", version: "0.3.300", resolutionPath: join(root, "node_modules", "@anthropic-ai", "claude-agent-sdk") },
      forge: { specifier: "@forge/sdk", version: "0.1.0", resolutionPath: join(root, "node_modules", "@forge", "sdk") },
    });
    for (const sdk of [resolved.identity.sdk.claude, resolved.identity.sdk.forge]) {
      expect(sdk?.resolutionPath.startsWith(`${root}/`)).toBe(true);
      expect(sdk?.resolutionPath.startsWith(`${PI_CHECKOUT}/`)).toBe(false);
      expect(Object.isFrozen(sdk)).toBe(true);
    }
    expect(await admitReading(plant.options)).toBe("admitted imports=1");
  });

  it("R425-3 AC3 node v22.23.2, v25.0.0, a bare v24, v24.20, v24.20.0-nightly and v24.20.0 after a space each refuse runtime-unavailable at node, the refusal carrying the identity it measured with that version; v24.20.0 is admitted; an absent or undefined nodeVersion records process.version", async () => {
    for (const nodeVersion of ["v22.23.2", "v25.0.0", "v24", "v24.20", "v24.20.0-nightly", " v24.20.0"]) {
      const refusedPlant = plantConsumer({ nodeVersion });
      const outcome = await resolveMechanicalInstalledHost(refusedPlant.options);
      expect(readingOf(outcome)).toBe("node runtime-unavailable");
      expect(outcome.ok ? undefined : outcome.identity).toEqual(identityOf(refusedPlant, { claude: null, forge: null }));
    }
    expect(await admitReading(plantConsumer({ nodeVersion: "v24.20.0" }).options)).toBe("admitted imports=1");
    const plant = plantConsumer();
    const runtimes: readonly MechanicalInstalledHostOptions["runtime"][] = [{ sdkUse: "fixture" }, { sdkUse: "fixture", nodeVersion: undefined }];
    for (const runtime of runtimes) {
      const defaulted = await resolveMechanicalInstalledHost({ ...plant.options, runtime });
      expect(defaulted.ok ? defaulted.resolved.identity.node : defaulted.identity?.node).toBe(process.version);
    }
    expect(MECHANICAL_HOST_NODE_MAJOR).toBe(24);
  });

  it("R425-4 a fixture-labelled run in a consumer with no SDKs is admitted, recording both SDKs null and the label fixture", async () => {
    const resolved = await resolvedOf(plantConsumer({ sdkUse: "fixture" }).options);
    expect(resolved.identity.sdkUse).toBe("fixture");
    expect(resolved.identity.sdk).toEqual({ claude: null, forge: null });
  });

  it("R425-5 the identity, frozen throughout, records the node version judged, the tarball digest and each scope package's name, version and manifest-line digest, its lines in UTF-16 code-unit order; a foreign name, the versions next, 1.2, 0.1.0+build.5, ^0.1.0, 0.1.0- and an array, an unparseable package.json and one that is not UTF-8 record null; 0.2.0-rc.1 and 0.2.0-rc-1 are kept; quiet row of R-STRAY-SCOPE-FILE", async () => {
    const plant = plantConsumer();
    const resolved = await resolvedOf(plant.options);
    const content = contentOf(plant.root);
    expect(resolved.identity).toEqual({
      node: "v24.20.0",
      sdkUse: "fixture",
      tarballDigest: plant.options.entry.tarballDigest,
      packages: [
        { directory: "development-rig", name: "@mechanical/development-rig", version: "0.1.0", contentDigest: digestOf(linesOf(content, "development-rig")) },
        { directory: "workflows-development", name: "@mechanical/workflows-development", version: "0.1.0", contentDigest: digestOf(linesOf(content, "workflows-development")) },
      ],
      sdk: { claude: null, forge: null },
    });
    const { identity } = resolved;
    expect([resolved, identity, identity.packages, ...identity.packages, identity.sdk].map(record => Object.isFrozen(record))).toEqual([true, true, true, true, true, true]);

    const library = "@mechanical/workflows-development";
    const libraryForms: readonly (readonly [string | Uint8Array, { readonly name: string | null; readonly version: string | null }])[] = [
      [`${JSON.stringify({ name: "@other/workflows-development", version: "0.1.0" })}\n`, { name: null, version: "0.1.0" }],
      [`${JSON.stringify({ name: library, version: "next" })}\n`, { name: library, version: null }],
      [`${JSON.stringify({ name: library, version: "1.2" })}\n`, { name: library, version: null }],
      [`${JSON.stringify({ name: library, version: "0.1.0+build.5" })}\n`, { name: library, version: null }],
      [`${JSON.stringify({ name: library, version: "^0.1.0" })}\n`, { name: library, version: null }],
      [`${JSON.stringify({ name: library, version: "0.1.0-" })}\n`, { name: library, version: null }],
      [`${JSON.stringify({ name: library, version: ["0.1.0"] })}\n`, { name: library, version: null }],
      [`${JSON.stringify({ name: library, version: "0.2.0-rc.1" })}\n`, { name: library, version: "0.2.0-rc.1" }],
      [`${JSON.stringify({ name: library, version: "0.2.0-rc-1" })}\n`, { name: library, version: "0.2.0-rc-1" }],
      ["{ not json\n", { name: null, version: null }],
      [notUtf8(`{"name":"${library}","version":"0.1.0","note":"`, `"}\n`), { name: null, version: null }],
    ];
    const identities: unknown[] = [];
    for (const [text] of libraryForms) {
      const invalid = plantConsumer();
      write(join(invalid.library, "package.json"), text);
      const options: MechanicalInstalledHostOptions = { ...invalid.options, entry: { ...invalid.options.entry, content: contentOf(invalid.root) } };
      const outcome = await resolveMechanicalInstalledHost(options);
      const entry = outcome.ok ? outcome.resolved.identity.packages[1] : undefined;
      identities.push(entry === undefined ? readingOf(outcome) : { name: entry.name, version: entry.version });
    }
    expect(identities).toEqual(libraryForms.map(([, expected]) => expected));

    const highBmp = `${String.fromCodePoint(0xff01)}.js`;
    const astral = `${String.fromCodePoint(0x1f600)}.js`;
    expect([[highBmp, astral].sort(), Buffer.compare(Buffer.from(highBmp, "utf8"), Buffer.from(astral, "utf8"))], "the two orders differ for these names").toEqual([[astral, highBmp], -1]);
    const ordered = plantConsumer();
    write(join(ordered.library, "dist", highBmp), "export const high = 1;\n");
    write(join(ordered.library, "dist", astral), "export const astral = 1;\n");
    const orderedContent = contentOf(ordered.root);
    const orderedResolved = await resolvedOf({ ...ordered.options, entry: { ...ordered.options.entry, content: orderedContent } });
    expect(orderedResolved.identity.packages[1]?.contentDigest).toBe(digestOf(linesOf(orderedContent, "workflows-development")));

    const stray = plantConsumer();
    write(join(stray.root, "node_modules", "@mechanical", "NOTES.txt"), "a regular file directly under the scope directory\n");
    const strayResolved = await resolvedOf({ ...stray.options, entry: { ...stray.options.entry, content: contentOf(stray.root) } });
    expect(strayResolved.identity.packages.map(entry => entry.directory)).toEqual(["NOTES.txt", "development-rig", "workflows-development"]);
    expect(strayResolved.identity.packages[0]).toEqual({ directory: "NOTES.txt", name: null, version: null, contentDigest: digestOf("") });
  });
});

describe("wb-zwx5: the entry, the order, the load-time checks and the vocabulary", () => {
  it("R-ENTRY-1 an entry absent, with a tarball digest unprefixed or a descriptor digest upper-case, an export name empty, hyphenated, led by a digit or an array, or a content manifest empty, an empty array, an array with a member, null, keyed by a malformed path or holding a short digest refuses entry-malformed, and runtime facts absent, unlabelled, mislabelled or with a numeric nodeVersion refuse runtime-malformed, each frozen and before import; quiet row of R-OPTIONS-NOT-OBJECT", async () => {
    const plant = plantConsumer();
    const { entry } = plant.options;
    const entries: readonly unknown[] = [
      undefined,
      { ...entry, tarballDigest: entry.tarballDigest.slice(7) },
      { ...entry, descriptorDigest: entry.descriptorDigest.toUpperCase() },
      { ...entry, composedExport: "" },
      { ...entry, composedExport: "not-an-identifier" },
      { ...entry, composedExport: "1invokeAuthorizedDevelopmentHost" },
      { ...entry, composedExport: [COMPOSED] },
      { ...entry, content: {} },
      { ...entry, content: [] },
      { ...entry, content: [entry.tarballDigest] },
      { ...entry, content: null },
      { ...entry, content: { "../escape.js": entry.tarballDigest } },
      { ...entry, content: { "/abs.js": entry.tarballDigest } },
      { ...entry, content: { "a//b.js": entry.tarballDigest } },
      { ...entry, content: { "a/./b.js": entry.tarballDigest } },
      { ...entry, content: { "a.js": "sha256:short" } },
    ];
    const readings: string[] = [];
    for (const malformed of entries) readings.push(await admitReading({ ...plant.options, entry: malformed as MechanicalInstalledHostOptions["entry"] }));
    expect(readings).toEqual(entries.map(() => "entry entry-malformed imports=0"));
    const frozenRefusal = await resolveMechanicalInstalledHost({ ...plant.options, entry: undefined as never });
    expect(frozenRefusal.ok ? "admitted" : [Object.isFrozen(frozenRefusal), Object.isFrozen(frozenRefusal.diagnostic)]).toEqual([true, true]);
    const runtimes: readonly unknown[] = [undefined, {}, { sdkUse: "nativ" }, { sdkUse: "native", nodeVersion: 24 }];
    const runtimeReadings: string[] = [];
    for (const runtime of runtimes) runtimeReadings.push(await admitReading({ ...plant.options, runtime: runtime as MechanicalInstalledHostOptions["runtime"] }));
    expect(runtimeReadings).toEqual(runtimes.map(() => "runtime runtime-malformed imports=0"));
    await expect(resolveMechanicalInstalledHost(undefined as never)).rejects.toThrow(TypeError);
  });

  it("R-ORDER-1 the first failing step answers: entry, runtime, consumer, tarball, descriptor, installed (a link, then a missing, an unlisted and a changed file), exports, node, then the SDKs", async () => {
    const plant = (shape: PlantShape = {}): ConsumerPlant => plantConsumer(shape);
    const readings: string[] = [];
    const both = plant();
    readings.push(await admitReading({ ...both.options, consumerRoot: join(both.root, "absent"), entry: { ...both.options.entry, composedExport: "" } }));
    readings.push(await admitReading({ ...both.options, consumerRoot: join(both.root, "absent"), runtime: { sdkUse: "neither" } as unknown as MechanicalInstalledHostOptions["runtime"] }));
    readings.push(await admitReading({ ...both.options, consumerRoot: join(both.root, "absent") }));
    const tarball = plant();
    flipOneByte(tarball.tarballPath);
    flipOneByte(tarball.descriptorPath);
    readings.push(await admitReading(tarball.options));
    const descriptor = plant();
    flipOneByte(descriptor.descriptorPath);
    flipOneByte(join(descriptor.rig, "dist", "host.js"));
    readings.push(await admitReading(descriptor.options));
    const installed = plant({ rigPackage: "{ not json\n", nodeVersion: "v22.23.2" });
    write(join(installed.rig, "dist", "extra.js"), "export const extra = 1;\n");
    readings.push(await admitReading(installed.options));
    const outsideFile = join(scratch(), "outside.js");
    writeFileSync(outsideFile, "export const outside = 1;\n");
    const linkFirst = plant();
    symlinkSync(outsideFile, join(linkFirst.rig, "dist", "escape.js"));
    unlinkSync(join(linkFirst.library, "dist", "index.js"));
    const missingFirst = plant();
    unlinkSync(join(missingFirst.library, "dist", "index.js"));
    write(join(missingFirst.rig, "dist", "extra.js"), "export const extra = 1;\n");
    const unlistedFirst = plant();
    write(join(unlistedFirst.rig, "dist", "extra.js"), "export const extra = 1;\n");
    flipOneByte(join(unlistedFirst.rig, "dist", "host.js"));
    const withinInstalled: string[] = [];
    for (const form of [linkFirst, missingFirst, unlistedFirst]) withinInstalled.push(await admitReading(form.options));
    expect(withinInstalled).toEqual(["installed installed-link imports=0", "installed installed-file-missing imports=0", "installed installed-file-unlisted imports=0"]);
    readings.push(await admitReading(plant({ rigPackage: "{ not json\n", nodeVersion: "v22.23.2" }).options));
    readings.push(await admitReading(plant({ nodeVersion: "v22.23.2", sdkUse: "native" }).options));
    readings.push(await admitReading(plant({ sdkUse: "native" }).options));
    expect(readings).toEqual([
      "entry entry-malformed imports=0",
      "runtime runtime-malformed imports=0",
      "consumer unreadable imports=0",
      "tarball artifact-mismatch imports=0",
      "descriptor descriptor-mismatch imports=0",
      "installed installed-file-unlisted imports=0",
      "exports export-map-invalid imports=0",
      "node runtime-unavailable imports=0",
      "sdk.claude runtime-unavailable imports=0",
    ]);
  });

  it("R-LOAD-1 an unminted resolution refuses unresolved; a tarball, node_modules or consumer-root link re-pointed after validation refuses changed; the caller's export name and content manifest changed after validation reach no load; the minted URL cannot be reassigned", async () => {
    const plant = plantConsumer();
    const resolved = await resolvedOf(plant.options);
    expect(await loadReading({ ...resolved })).toBe("resolution unresolved imports=0");
    const repointed = plantConsumer();
    const target = join(repointed.root, "artifacts", "first.tgz");
    renameSync(repointed.tarballPath, target);
    symlinkSync(target, repointed.tarballPath);
    const repointedResolved = await resolvedOf(repointed.options);
    const second = join(repointed.root, "artifacts", "second.tgz");
    writeFileSync(second, readFileSync(target));
    unlinkSync(repointed.tarballPath);
    symlinkSync(second, repointed.tarballPath);
    expect(await loadReading(repointedResolved)).toBe("resolution changed imports=0");
    const relinked = plantConsumer();
    const firstModules = join(relinked.root, "modules-first");
    renameSync(join(relinked.root, "node_modules"), firstModules);
    symlinkSync(firstModules, join(relinked.root, "node_modules"));
    const relinkedResolved = await resolvedOf(relinked.options);
    const secondModules = join(relinked.root, "modules-second");
    cpSync(firstModules, secondModules, { recursive: true });
    unlinkSync(join(relinked.root, "node_modules"));
    symlinkSync(secondModules, join(relinked.root, "node_modules"));
    expect(await loadReading(relinkedResolved)).toBe("resolution changed imports=0");
    const outer = scratch();
    const inner = join(outer, "consumer");
    mkdirSync(inner);
    const nested = plantConsumer({ root: inner });
    const rootLink = join(scratch(), "consumer-link");
    symlinkSync(inner, rootLink);
    const nestedResolved = await resolvedOf({ ...nested.options, consumerRoot: rootLink });
    symlinkSync(join(inner, "node_modules"), join(outer, "node_modules"));
    unlinkSync(rootLink);
    symlinkSync(outer, rootLink);
    expect(await loadReading(nestedResolved)).toBe("resolution changed imports=0");
    const mutable = plantConsumer();
    const entry: { tarballDigest: string; descriptorDigest: string; composedExport: string; content: Readonly<Record<string, string>> } = { ...mutable.options.entry };
    const options: MechanicalInstalledHostOptions = { ...mutable.options, entry };
    const mutableResolved = await resolvedOf(options);
    entry.composedExport = MECHANICAL_LEGACY_HOST_EXPORT;
    const recording = recordingImporter();
    expect(await loadReading(mutableResolved, recording)).toBe("admitted imports=1");
    expect(recording.reads).toEqual(["HOST_API_VERSION", COMPOSED]);

    const contentMutable = plantConsumer();
    const content: Record<string, string> = { ...contentMutable.options.entry.content };
    const contentOptions: MechanicalInstalledHostOptions = {
      ...contentMutable.options,
      entry: { ...contentMutable.options.entry, content },
    };
    const contentResolved = await resolvedOf(contentOptions);
    const hostPath = join(contentMutable.rig, "dist", "host.js");
    writeFileSync(hostPath, "export const HOST_API_VERSION = 'changed';\n");
    content["development-rig/dist/host.js"] = digestOf(readFileSync(hostPath));
    expect(await loadReading(contentResolved)).toBe("installed installed-content-mismatch imports=0");

    const URL_DECOY = "file:///wb-zwx5-decoy/host.js";
    const urlPlant = plantConsumer();
    const urlResolved = await resolvedOf(urlPlant.options);
    expect(() => {
      (urlResolved as { hostModuleUrl: string }).hostModuleUrl = URL_DECOY;
    }).toThrow();
    const urlRecording = recordingImporter();
    expect(await loadReading(urlResolved, urlRecording)).toBe("admitted imports=1");
    expect(urlRecording.urls).toEqual([hostUrlOf(urlPlant.root)]);
  });

  it("R-VOCAB-1 the closed field and reason lists", () => {
    expect([...MECHANICAL_INSTALLED_HOST_FIELDS]).toEqual(["entry", "runtime", "consumer", "tarball", "descriptor", "installed", "exports", "node", "sdk.claude", "sdk.forge", "resolution", "loaded"]);
    expect([...MECHANICAL_INSTALLED_HOST_REASONS]).toEqual([
      "entry-malformed",
      "runtime-malformed",
      "unreadable",
      "outside-root",
      "not-a-file",
      "artifact-mismatch",
      "descriptor-mismatch",
      "installed-link",
      "installed-file-missing",
      "installed-file-unlisted",
      "installed-content-mismatch",
      "export-map-invalid",
      "runtime-unavailable",
      "changed",
      "unresolved",
      "version-mismatch",
    ]);
  });
});

/** The module's own source and this file's own source: R-SET-1 reads their leading comments. */
const MODULE_SOURCE = readFileSync(new URL("../src/workbench/mechanical-installed-host.ts", import.meta.url), "utf8");
const SUITE_SOURCE = readFileSync(new URL(import.meta.url), "utf8");
const CASE_ID = /\bR(?:42[1-5]-\d+|-(?:ENTRY|ORDER|LOAD|VOCAB)-1)\b/g;

describe("wb-zwx5: the pinned reader set (the last case of this file)", () => {
  it("R-SET-1 the file's cases are the pinned reader set its header lists, frozen by requirement, case and criterion, and the module header, read from src, cites exactly its cases", ({ task }) => {
    const rows: string[] = [];
    const walk = (tasks: typeof task.file.tasks, requirement: string): void => {
      for (const child of tasks) {
        if (child.type === "suite") walk(child.tasks, /^wb-zwx5 (EAT-R\d{3}):/.exec(child.name)?.[1] ?? "-");
        else if (child.type === "test") {
          const [head = "", label = ""] = child.name.split(" ");
          rows.push(/^AC\d(?:\/AC\d)*$/.test(label) ? `${requirement} ${head} ${label}` : `${requirement} ${head}`);
        }
      }
    };
    walk(task.file.tasks, "-");
    expect(rows).toEqual([
      "EAT-R421 R421-1 AC1",
      "EAT-R421 R421-2 AC2",
      "EAT-R421 R421-3 AC3",
      "EAT-R421 R421-4",
      "EAT-R421 R421-5",
      "EAT-R422 R422-1 AC1",
      "EAT-R422 R422-2 AC2",
      "EAT-R422 R422-3 AC3",
      "EAT-R422 R422-4 AC3",
      "EAT-R422 R422-5",
      "EAT-R423 R423-1 AC3",
      "EAT-R423 R423-2 AC2",
      "EAT-R423 R423-3 AC4",
      "EAT-R423 R423-4",
      "EAT-R425 R425-1 AC1",
      "EAT-R425 R425-2 AC2",
      "EAT-R425 R425-3 AC3",
      "EAT-R425 R425-4",
      "EAT-R425 R425-5",
      "- R-ENTRY-1",
      "- R-ORDER-1",
      "- R-LOAD-1",
      "- R-VOCAB-1",
      "- R-SET-1",
    ]);
    const header = MODULE_SOURCE.slice(0, MODULE_SOURCE.indexOf("*/"));
    const cited = [...new Set(header.match(CASE_ID) ?? [])].sort();
    const cases = rows.map(row => row.split(" ")[1] ?? "").filter(head => head !== "R-SET-1");
    expect(cited, "the module header cites exactly this file's cases").toEqual([...cases].sort());
    const suiteHeader = SUITE_SOURCE.slice(0, SUITE_SOURCE.indexOf("*/"));
    const spans = ["EAT-R421", "EAT-R422", "EAT-R423", "EAT-R425", "-"].map(requirement => {
      const heads = rows.filter(row => row.split(" ")[0] === requirement).map(row => row.split(" ")[1] ?? "").filter(head => head !== "R-SET-1");
      return `${heads[0]} to ${heads.at(-1)} (${requirement === "-" ? "shared" : requirement})`;
    });
    expect(spans).toEqual(["R421-1 to R421-5 (EAT-R421)", "R422-1 to R422-5 (EAT-R422)", "R423-1 to R423-4 (EAT-R423)", "R425-1 to R425-5 (EAT-R425)", "R-ENTRY-1 to R-VOCAB-1 (shared)"]);
    for (const span of spans) expect(suiteHeader, `this file's header spans ${span}`).toContain(` *  - ${span}: `);
  });
});
