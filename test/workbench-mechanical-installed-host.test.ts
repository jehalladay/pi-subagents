/**
 * wb-zwx5 ("[MII P02+] Installed host via shipped @mechanical/development-rig/host"): src/workbench/mechanical-installed-host.ts,
 * Pi's adapter for MechanicalWorkflows' installed application host, at the V1 tier against stand-in installed consumers.
 *
 * Requirements (pi-subagents master 53ac7f35, docs/workbench/programs/mechanical-interop-integrity-2026-11-10/requirements/
 * ATOMIC-REQUIREMENTS.md); every case is titled by the requirement and acceptance criterion it pins:
 *  EAT-R421 AC1 "when the adapter is pointed at it with the allowlist digests, then `import()` resolves
 *   `@mechanical/development-rig/host` from that installed root (assert the resolved module URL is under the consumer root)".
 *   AC2 "Given the same configuration with the rig tarball's digest changed by one byte, or a descriptor byte changed with the
 *   ref digest unchanged, then the adapter refuses before `import()` with the typed category and DETECT-ZERO (a) reads 0; the
 *   untouched positive control reads 1." AC3 "Given a `NODE_PATH`/checkout-resolvable `@mechanical/development-rig` outside
 *   the installed root, then the adapter never resolves it (assert the importer seam was handed a `file:` URL under the
 *   installed root, never a bare specifier)."
 *  EAT-R422 AC1 "when `dist/index.js` (rig) or a transitive library file is mutated after extraction with the tarball
 *   untouched, then the adapter refuses `installed-content-mismatch` and DETECT-ZERO (a),(b) read 0; the untouched control
 *   imports once." AC2 "Given a runtime file present on disk but absent from the admitted manifest (an added file), then the
 *   adapter refuses; given a manifest entry with no file, then it refuses with a distinct typed reason (not ENOENT)." AC3
 *   "Given a symlink introduced under the installed root pointing outside it, then the adapter refuses before import (path
 *   confinement is re-asserted at the final load, not only at measure time)."
 *  EAT-R423 AC2 "Given an installed host whose `HOST_API_VERSION` differs from the ratified literal, then admission refuses"
 *   (the refusal arm). AC3 "assert the module namespace is read by the allowlisted name only; an injected `input.export` is
 *   ignored". AC4 "falling back to the legacy export when COMPOSED-EXPORT is absent turns criterion 1 red; the correct
 *   behaviour is a typed refusal `runtime-unavailable`."
 *  EAT-R425 AC1 "Given an installed consumer with no SDKs, when a function request is admitted for a native-labelled run, then
 *   the admission record carries `sdk.claude: null`, `sdk.forge: null`, the refusal is `runtime-unavailable` naming the missing
 *   specifier". AC2 "Given the SDKs are installed in the consumer root, then the admission record carries their resolved
 *   version strings and resolution paths under the consumer root, and a test asserts the paths are not under either
 *   repository checkout." AC3 "Given `process.version` is v22.x under a Pi host declaring >=24, then admission refuses
 *   `runtime-unavailable` with the measured version in the reason; given v24.x it proceeds (positive control)."
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
 * run (EAT-R425 V4); and the forms the module header lists as NOT CLAIMED.
 *
 * Display paths added: none (the adapter returns closed-vocabulary diagnostics and a measured identity record; it composes no
 * label or reply text).
 */
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { lstatSync, mkdirSync, readdirSync, readFileSync, realpathSync, renameSync, rmSync, symlinkSync, unlinkSync, writeFileSync } from "node:fs";
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
  readonly rigPackage?: string;
  readonly sdks?: readonly (keyof typeof MECHANICAL_HOST_SDKS)[];
  readonly sdkUse?: "native" | "fixture";
  readonly nodeVersion?: string;
}
/** One stand-in consumer root, its entry holding the stand-ins' own digests and the suite's own manifest of the scope. */
const plantConsumer = (shape: PlantShape = {}): ConsumerPlant => {
  const root = scratch();
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

interface Recording {
  readonly importModule: (url: string) => Promise<unknown>;
  readonly urls: string[];
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
  const importModule = async (url: string): Promise<unknown> => {
    urls.push(url);
    return namespace;
  };
  return { importModule, urls, reads, calls };
};
const readingOf = (outcome: MechanicalInstalledHostLoad | MechanicalInstalledHostResolution): string =>
  outcome.ok ? "admitted" : `${outcome.diagnostic.field} ${outcome.diagnostic.reason}`;
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
  it("R421-1 AC1 an admitted stand-in consumer hands the importer one file: URL, the realpath of the export map's ./host import target under the consumer root, also when the root is named through a link", async () => {
    const plant = plantConsumer();
    const direct = recordingImporter();
    expect(await admitReading(plant.options, direct)).toBe("admitted imports=1");
    expect(direct.urls).toEqual([hostUrlOf(plant.root)]);
    expect(direct.urls[0]?.startsWith(`${pathToFileURL(realpathSync(plant.root)).href}/`)).toBe(true);
    const link = join(scratch(), "consumer-link");
    symlinkSync(plant.root, link);
    const linked = recordingImporter();
    expect(await admitReading({ ...plant.options, consumerRoot: link }, linked)).toBe("admitted imports=1");
    expect(linked.urls).toEqual(direct.urls);
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

  it("R421-3 AC3 a decoy rig outside the consumer root that NODE_PATH names is never handed to the importer, and a rig directory or node_modules linked to that checkout refuses before any import", async () => {
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
  });

  it("R421-4 a tarball outside the consumer root, a directory in its place, a missing tarball, a missing descriptor and a FIFO in the descriptor's place each refuse before any import", async () => {
    const outside = plantConsumer();
    const elsewhere = join(scratch(), "rig.tgz");
    writeFileSync(elsewhere, readFileSync(outside.tarballPath));
    expect(await admitReading({ ...outside.options, tarballPath: elsewhere })).toBe("tarball outside-root imports=0");
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
    const fifo = plantConsumer();
    rmSync(fifo.descriptorPath);
    execFileSync("mkfifo", [fifo.descriptorPath]);
    expect(await admitReading(fifo.options)).toBe("descriptor not-a-file imports=0");
  });

  it("R421-5 an export map without ./host, with a target outside the package, naming no measured file, under another package name, or not JSON refuses export-map-invalid before any import; a string target and a default-only target are admitted", async () => {
    const mapped = (exportsMember: unknown, name = "@mechanical/development-rig"): string => `${JSON.stringify({ ...RIG_PACKAGE, name, exports: exportsMember })}\n`;
    const refusedForms: readonly string[] = [
      mapped({ "./package.json": "./package.json" }),
      mapped({ "./host": "../escape.js" }),
      mapped({ "./host": "dist/host.js" }),
      mapped({ "./host": "./dist/absent.js" }),
      mapped({ "./host": { types: "./dist/host.d.ts" } }),
      mapped("./dist/host.js"),
      mapped({ "./host": "./dist/host.js" }, "@mechanical/development-rig-fork"),
      "{ not json\n",
    ];
    const readings: string[] = [];
    for (const rigPackage of refusedForms) readings.push(await admitReading(plantConsumer({ rigPackage }).options));
    expect(readings).toEqual(refusedForms.map(() => "exports export-map-invalid imports=0"));
    expect(await admitReading(plantConsumer({ rigPackage: mapped({ "./host": "./dist/host.js" }) }).options)).toBe("admitted imports=1");
    expect(await admitReading(plantConsumer({ rigPackage: mapped({ "./host": { default: "./dist/host.js" } }) }).options)).toBe("admitted imports=1");
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

  it("R423-2 AC2 a host whose HOST_API_VERSION is another version, absent or a number refuses version-mismatch after reading that one name", async () => {
    const forms: readonly ((members: Record<string, unknown>) => Record<string, unknown>)[] = [
      members => ({ ...members, HOST_API_VERSION: `${MECHANICAL_HOST_BINDING_CONTRACT.slice(0, -1)}2` }),
      ({ HOST_API_VERSION: _absent, ...members }) => members,
      members => ({ ...members, HOST_API_VERSION: 1 }),
    ];
    for (const form of forms) {
      const recording = recordingImporter(form);
      expect(await admitReading(plantConsumer().options, recording)).toBe("loaded version-mismatch imports=1");
      expect(recording.reads).toEqual(["HOST_API_VERSION"]);
    }
  });

  it("R423-3 AC4 a host without the composed export but with the legacy one, with a string in its place, or with an accessor there refuses runtime-unavailable, the legacy export never read and the accessor never run", async () => {
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
    ];
    for (const form of forms) {
      const recording = recordingImporter(form);
      expect(await admitReading(plantConsumer().options, recording)).toBe("loaded runtime-unavailable imports=1");
      expect(recording.reads).toEqual(["HOST_API_VERSION", COMPOSED]);
      expect(recording.reads).not.toContain(MECHANICAL_LEGACY_HOST_EXPORT);
      expect(recording.calls).toEqual([]);
    }
    expect(getterRuns).toBe(0);
  });

  it("R423-4 an entry naming the legacy export as its export refuses entry-malformed before any import", async () => {
    const plant = plantConsumer();
    expect(await admitReading({ ...plant.options, entry: { ...plant.options.entry, composedExport: MECHANICAL_LEGACY_HOST_EXPORT } })).toBe("entry entry-malformed imports=0");
  });
});

describe("wb-zwx5 EAT-R425: the runtime identity is recorded at admission and an incompatible runtime refuses", () => {
  it("R425-1 AC1 a native-labelled run in a consumer with no SDKs refuses runtime-unavailable at sdk.claude, recording both SDKs null, and with only the Claude SDK at sdk.forge", async () => {
    const none = await resolveMechanicalInstalledHost(plantConsumer({ sdkUse: "native" }).options);
    expect(readingOf(none)).toBe("sdk.claude runtime-unavailable");
    expect(none.ok ? undefined : none.identity?.sdk).toEqual({ claude: null, forge: null });
    const claudeOnly = await resolveMechanicalInstalledHost(plantConsumer({ sdkUse: "native", sdks: ["sdk.claude"] }).options);
    expect(readingOf(claudeOnly)).toBe("sdk.forge runtime-unavailable");
    expect(claudeOnly.ok ? undefined : claudeOnly.identity?.sdk.forge).toBeNull();
    expect(await admitReading(plantConsumer({ sdkUse: "native" }).options)).toBe("sdk.claude runtime-unavailable imports=0");
  });

  it("R425-2 AC2 a native-labelled run with both SDKs in the consumer root records each version and its realpath under the consumer root, not under the Pi checkout", async () => {
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
    }
    expect(await admitReading(plant.options)).toBe("admitted imports=1");
  });

  it("R425-3 AC3 node v22.23.2 and v25.0.0 refuse runtime-unavailable at node carrying the measured version; v24.20.0 is admitted; an absent nodeVersion records process.version", async () => {
    for (const nodeVersion of ["v22.23.2", "v25.0.0"]) {
      const outcome = await resolveMechanicalInstalledHost(plantConsumer({ nodeVersion }).options);
      expect(readingOf(outcome)).toBe("node runtime-unavailable");
      expect(outcome.ok ? undefined : outcome.identity?.node).toBe(nodeVersion);
    }
    expect(await admitReading(plantConsumer({ nodeVersion: "v24.20.0" }).options)).toBe("admitted imports=1");
    const plant = plantConsumer();
    const defaulted = await resolveMechanicalInstalledHost({ ...plant.options, runtime: { sdkUse: "fixture" } });
    expect(defaulted.ok ? defaulted.resolved.identity.node : defaulted.identity?.node).toBe(process.version);
    expect(MECHANICAL_HOST_NODE_MAJOR).toBe(24);
  });

  it("R425-4 a fixture-labelled run in a consumer with no SDKs is admitted, recording both SDKs null and the label fixture", async () => {
    const resolved = await resolvedOf(plantConsumer({ sdkUse: "fixture" }).options);
    expect(resolved.identity.sdkUse).toBe("fixture");
    expect(resolved.identity.sdk).toEqual({ claude: null, forge: null });
  });

  it("R425-5 the identity records the node version judged, the tarball digest, and each scope package's name, version and manifest-line digest", async () => {
    const plant = plantConsumer();
    const resolved = await resolvedOf(plant.options);
    const content = contentOf(plant.root);
    const linesOf = (directory: string): string =>
      Object.entries(content)
        .filter(([path]) => path.startsWith(`${directory}/`))
        .map(([path, digest]) => `${path.slice(directory.length + 1)} ${digest}\n`)
        .join("");
    expect(resolved.identity).toEqual({
      node: "v24.20.0",
      sdkUse: "fixture",
      tarballDigest: plant.options.entry.tarballDigest,
      packages: [
        { directory: "development-rig", name: "@mechanical/development-rig", version: "0.1.0", contentDigest: digestOf(linesOf("development-rig")) },
        { directory: "workflows-development", name: "@mechanical/workflows-development", version: "0.1.0", contentDigest: digestOf(linesOf("workflows-development")) },
      ],
      sdk: { claude: null, forge: null },
    });
  });
});

describe("wb-zwx5: the entry, the order, the load-time checks and the vocabulary", () => {
  it("R-ENTRY-1 malformed entries refuse entry-malformed and malformed runtime facts runtime-malformed, each before any import", async () => {
    const plant = plantConsumer();
    const { entry } = plant.options;
    const entries: readonly unknown[] = [
      undefined,
      { ...entry, tarballDigest: entry.tarballDigest.slice(7) },
      { ...entry, descriptorDigest: entry.descriptorDigest.toUpperCase() },
      { ...entry, composedExport: "" },
      { ...entry, composedExport: "not-an-identifier" },
      { ...entry, content: {} },
      { ...entry, content: [] },
      { ...entry, content: { "../escape.js": entry.tarballDigest } },
      { ...entry, content: { "/abs.js": entry.tarballDigest } },
      { ...entry, content: { "a//b.js": entry.tarballDigest } },
      { ...entry, content: { "a/./b.js": entry.tarballDigest } },
      { ...entry, content: { "a.js": "sha256:short" } },
    ];
    const readings: string[] = [];
    for (const malformed of entries) readings.push(await admitReading({ ...plant.options, entry: malformed as MechanicalInstalledHostOptions["entry"] }));
    expect(readings).toEqual(entries.map(() => "entry entry-malformed imports=0"));
    const runtimes: readonly unknown[] = [undefined, {}, { sdkUse: "nativ" }, { sdkUse: "native", nodeVersion: 24 }];
    const runtimeReadings: string[] = [];
    for (const runtime of runtimes) runtimeReadings.push(await admitReading({ ...plant.options, runtime: runtime as MechanicalInstalledHostOptions["runtime"] }));
    expect(runtimeReadings).toEqual(runtimes.map(() => "runtime runtime-malformed imports=0"));
  });

  it("R-ORDER-1 the first failing step answers: entry, runtime, consumer, tarball, descriptor, installed, exports, node, then the SDKs", async () => {
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

  it("R-LOAD-1 a resolution the module did not mint refuses unresolved, a tarball link re-pointed after validation refuses changed, and a caller's entry changed after validation reaches no load", async () => {
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
    const mutable = plantConsumer();
    const entry: { tarballDigest: string; descriptorDigest: string; composedExport: string; content: Readonly<Record<string, string>> } = { ...mutable.options.entry };
    const options: MechanicalInstalledHostOptions = { ...mutable.options, entry };
    const mutableResolved = await resolvedOf(options);
    entry.composedExport = MECHANICAL_LEGACY_HOST_EXPORT;
    const recording = recordingImporter();
    expect(await loadReading(mutableResolved, recording)).toBe("admitted imports=1");
    expect(recording.reads).toEqual(["HOST_API_VERSION", COMPOSED]);
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
