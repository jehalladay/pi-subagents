/**
 * mechanical-installed-host.ts — Pi's adapter for MechanicalWorkflows' installed application host, the ./host subpath of the
 * installed rig package MECHANICAL_HOST_PACKAGE (wb-zwx5; mechanical-interop-integrity-2026-11-10, requirements EAT-R421, EAT-R422,
 * EAT-R423 and EAT-R425 of docs/workbench/programs/mechanical-interop-integrity-2026-11-10/requirements/ATOMIC-REQUIREMENTS.md
 * on pi-subagents master 53ac7f35). Each claim below names the cases of test/workbench-mechanical-installed-host.test.ts that
 * pin it, at the V1 tier: every case plants a stand-in installed consumer in a scratch directory (stand-in package files, a
 * stand-in tarball pinned by its own bytes, the producer descriptor vendored as test/fixtures/mw-development-entrypoint-v1.json)
 * and hands the adapter a recording importer that imports nothing. A form no cited case plants is NOT CLAIMED.
 *
 * WHAT THE HOST SUPPLIES (MechanicalInstalledHostOptions): the consumer root, the path of the packed rig tarball, the path of
 * the entrypoint descriptor, the allowlist entry, the runtime facts, and (at load) the importer. The entry holds the tarball
 * digest, the descriptor digest, the one export name the adapter reads (the composed export, whose name MechanicalWorkflows
 * and Pi have not ratified) and the content manifest: every regular file under the scope directory (the consumer root's
 * node_modules directory named by the host package's scope), by its path relative to that directory, with the SHA-256 of its
 * bytes. measureMechanicalInstalledContent is Pi's
 * own computation of that manifest for a host to persist at a first admission (R422-5). Pi ships no entry: where an entry
 * comes from is NOT CLAIMED.
 *
 * resolveMechanicalInstalledHost (validation) judges in this order and returns the first refusal, never throwing (R-ORDER-1).
 * A refusal is {code: "mechanical-installed-host-refused", field, reason}, frozen with its diagnostic (the suite's reader asserts
 * both and the code at every planted refusal; R-ENTRY-1 states it), with field and reason from the closed lists below
 * (R-VOCAB-1); a runtime-unavailable refusal also carries the runtime identity it measured (R425-1, R425-3).
 *  1. The entry: each digest in MECHANICAL_DIGEST_PATTERN, the export name a string identifier other than the legacy
 *     invokeDevelopmentHost, the manifest an object of one or more members, each named by a relative path of non-empty
 *     segments other than . and .., each a digest (entry-malformed at entry: the forms R-ENTRY-1 and R423-4 plant); then the
 *     runtime facts, an sdkUse label native or fixture and a nodeVersion that is a string when present (runtime-malformed
 *     at runtime: the forms R-ENTRY-1 plants).
 *  2. The consumer root, by realpath (unreadable at consumer: R-ORDER-1).
 *  3. The tarball: its realpath lies strictly inside the consumer root's (outside-root: R421-4), it is a regular file judged
 *     by stat before it is opened (not-a-file: a directory, R421-4; unreadable: missing, R421-4), and the SHA-256 of its bytes
 *     equals the entry's (artifact-mismatch: one byte flipped with the entry unchanged, R421-2).
 *  4. The descriptor: a regular file judged by stat before it is opened (unreadable: missing, and named through a link, which
 *     the O_NOFOLLOW open refuses, R421-4; not-a-file: a FIFO, refused while no writer exists, R421-4), and the SHA-256 of its
 *     bytes equals the entry's (descriptor-mismatch: one byte flipped with the entry unchanged, R421-2). Where the descriptor
 *     lies is not bounded.
 *  5. The installed content (field installed): the scope directory lies strictly inside the consumer root by realpath
 *     (outside-root: node_modules a link to a directory outside, R421-3); the walk under it, by lstat, refuses any symbolic link
 *     (installed-link: the package directory a link to a checkout outside the root, R421-3; a link to a file outside the root
 *     and a link to a file inside it, R422-3) and any entry that is neither a directory nor a regular file (not-a-file: a FIFO,
 *     R422-3); then, in this order (R-ORDER-1), each manifest path with no file on disk refuses installed-file-missing (R422-2),
 *     each file on disk the manifest does not name refuses installed-file-unlisted (R422-2), and each file whose SHA-256 differs
 *     from the manifest's refuses installed-content-mismatch (the rig's host module or the library's entry file flipped by one
 *     byte while the tarball is untouched, R422-1).
 *  6. The export map (field exports): the host package's package.json, a measured file, is JSON naming MECHANICAL_HOST_PACKAGE,
 *     whose exports member is an object mapping ./host to a target ("import", else "default", of an object, or a string; an
 *     import target wins over a differing default, R421-5) that is a ./ relative path naming a measured file of that package
 *     (export-map-invalid: the forms R421-5 plants, a null exports member among them).
 *  7. The runtime (R425): the identity is measured, then process.version (or the host's nodeVersion), of the form
 *     vMAJOR.MINOR.PATCH, must lie in the declared joint range MECHANICAL_HOST_NODE_MAJOR (runtime-unavailable at node:
 *     v22.23.2, v25.0.0 and a bare v24, R425-3; v24.20.0 admitted), then, for a run the host labels native, each of the Claude
 *     Agent SDK and the Forge SDK must have the identity below rather than null (runtime-unavailable at sdk.claude, then
 *     sdk.forge: R425-1, which plants the Claude SDK absent, linked to a directory outside the consumer root, naming another
 *     package, with the version latest, unparseable and JSON null, and the Forge SDK absent); a run labelled fixture records an
 *     absent SDK as null and is not refused (R425-4).
 *
 * THE RUNTIME IDENTITY (R425-2, R425-5): node (the version judged), sdkUse (the host's label for the run), tarballDigest,
 * packages (for each package directory under the scope directory in name order: its package.json name when it is the scope's
 * name for that directory, and its version when plain (three dot-separated digit runs with an optional hyphenated pre-release
 * tag), each else null (R425-5: a foreign name, the versions next and 1.2, and an unparseable package.json record null;
 * 0.2.0-rc.1 is kept), and contentDigest, the SHA-256 of its manifest lines "<path inside the package> <digest>" in path
 * order), and sdk.claude and sdk.forge: each the specifier, version and realpath of node_modules/<specifier> when that
 * realpath lies inside the consumer root and its package.json is a regular file naming that specifier with a plain version,
 * else null (R425-1, R425-2). Nothing here resolves a specifier by Node's algorithm.
 *
 * loadMechanicalInstalledHost (load): a resolution this module did not mint is refused unresolved (R-LOAD-1). Steps 2 to 6 run
 * again on the options as validated, a frozen copy (the caller's export name and content manifest changed after validation
 * reach no load, R-LOAD-1), and the consumer root's, the tarball's and the host module's realpaths are compared with the ones
 * validation recorded (changed: each re-pointed through a link after validation, R-LOAD-1); so a link or a changed byte
 * planted after validation refuses at load with no import (R422-4). Only then does the importer run, once, with the file: URL
 * of the host module's realpath and no other argument (R421-1, R421-3: never a bare specifier, and never a decoy package
 * NODE_PATH names outside the root; the minted resolution is frozen, so that URL cannot be reassigned, R-LOAD-1). The
 * namespace is then read by exactly two names, each as an own data member, so an accessor is never run and an inherited
 * member never read: HOST_API_VERSION, which must equal MECHANICAL_HOST_BINDING_CONTRACT (version-mismatch at loaded: another
 * version, absent, a number, an accessor, inherited, R423-2), and the entry's export name, which must be a function
 * (runtime-unavailable at loaded: absent while the legacy export is present, a string, an accessor, inherited, R423-3). The
 * legacy invokeDevelopmentHost is never read, and a stray export member of the options is ignored (R423-1). The export is
 * returned and never called (R423-1).
 *
 * NOT CLAIMED (explicitly partial): the V2 tier, an independently packed MechanicalWorkflows host installed in a fresh external
 * consumer, and the eight runtime exports of the real host (EAT-R421 AC1, EAT-R460: closure gate G-CONSUMER); the V3 tier
 * through the registered tools (G-REGISTERED); the composed export itself, its dispatch and the count of its calls (EAT-R423
 * AC1: MechanicalWorkflows 69cb016d ships no composed export); the four callbacks, SDK sessions, Forge requests and child
 * processes (DETECT-ZERO (b) to (e): this module dispatches nothing); the binding (EAT-R424, G-RATIFY); a producer-emitted
 * manifest (MechanicalWorkflows mw-03 H03) and the trust of a manifest computed at a first admission; files outside the
 * scope directory, and what the host module itself imports from elsewhere; real SDK identity on a native run
 * (EAT-R425 V4, G-NATIVE); hard links; the windows between a realpath or a stat and the open of the same path (the handle is
 * checked again there), between the walk and the re-read of a measured package.json (its digest is compared again there), and
 * between the load-time measure and the importer reading the file again; and a module cache that answers a second import of
 * the same URL.
 */
import { createHash } from "node:crypto";
import { constants, type Stats } from "node:fs";
import { type FileHandle, lstat, open, readdir, realpath, stat } from "node:fs/promises";
import { isAbsolute, join, relative, sep } from "node:path";
import { pathToFileURL } from "node:url";
import { MECHANICAL_DIGEST_PATTERN } from "./mechanical-descriptor.js";
import { MECHANICAL_HOST_BINDING_CONTRACT } from "./mechanical-host-binding.js";

/** The installed package and subpath this adapter consumes; the package name is the module's one spelling of the producer scope. */
export const MECHANICAL_HOST_PACKAGE = "@mechanical/development-rig";
export const MECHANICAL_HOST_SUBPATH = "./host";
/** The legacy export the adapter never reads: it takes caller-injected services and no binding, grant, source or lease. */
export const MECHANICAL_LEGACY_HOST_EXPORT = "invokeDevelopmentHost";
/** The one host API version this adapter reads, the landed binding consumer's contract (step 6 of load). */
export const MECHANICAL_HOST_API_VERSION = MECHANICAL_HOST_BINDING_CONTRACT;
/** The declared joint Node range: Pi's engines >=24 and the rig's >=22.18.0 <25 at MechanicalWorkflows 69cb016d overlap in major 24. */
export const MECHANICAL_HOST_NODE_MAJOR = 24;
/** The two native SDKs whose identity is recorded from the consumer root (step 7), by the field each is refused at. */
export const MECHANICAL_HOST_SDKS = Object.freeze({ "sdk.claude": "@anthropic-ai/claude-agent-sdk", "sdk.forge": "@forge/sdk" } as const);
/** The host package's scope and its directory inside the scope, both read off MECHANICAL_HOST_PACKAGE. */
const SCOPE_NAME = MECHANICAL_HOST_PACKAGE.slice(0, MECHANICAL_HOST_PACKAGE.indexOf("/"));
const HOST_DIRECTORY = MECHANICAL_HOST_PACKAGE.slice(MECHANICAL_HOST_PACKAGE.indexOf("/") + 1);
/** The scope directory the content manifest covers, relative to the consumer root. */
const SCOPE = ["node_modules", SCOPE_NAME] as const;

/** Where a refusal sits. */
export const MECHANICAL_INSTALLED_HOST_FIELDS = Object.freeze([
  "entry",
  "runtime",
  "consumer",
  "tarball",
  "descriptor",
  "installed",
  "exports",
  "node",
  "sdk.claude",
  "sdk.forge",
  "resolution",
  "loaded",
] as const);
export type MechanicalInstalledHostField = (typeof MECHANICAL_INSTALLED_HOST_FIELDS)[number];
/** Why: the closed refusal vocabulary. */
export const MECHANICAL_INSTALLED_HOST_REASONS = Object.freeze([
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
] as const);
export type MechanicalInstalledHostReason = (typeof MECHANICAL_INSTALLED_HOST_REASONS)[number];
export interface MechanicalInstalledHostDiagnostic {
  readonly code: "mechanical-installed-host-refused";
  readonly field: MechanicalInstalledHostField;
  readonly reason: MechanicalInstalledHostReason;
}

/** The allowlist entry the host holds for one installed host. */
export interface MechanicalInstalledHostEntry {
  readonly tarballDigest: string;
  readonly descriptorDigest: string;
  /** The one export name the adapter reads (the composed export; its name is unratified). */
  readonly composedExport: string;
  /** Every regular file under the scope directory, by its path relative to that directory, with its SHA-256. */
  readonly content: Readonly<Record<string, string>>;
}
export type MechanicalHostSdkUse = "native" | "fixture";
export interface MechanicalInstalledHostOptions {
  readonly consumerRoot: string;
  readonly tarballPath: string;
  readonly descriptorPath: string;
  readonly entry: MechanicalInstalledHostEntry;
  /** nodeVersion defaults to process.version; sdkUse is the host's label for the run. */
  readonly runtime: { readonly nodeVersion?: string; readonly sdkUse: MechanicalHostSdkUse };
}
export interface MechanicalSdkIdentity {
  readonly specifier: string;
  readonly version: string;
  readonly resolutionPath: string;
}
export interface MechanicalInstalledPackageIdentity {
  readonly directory: string;
  readonly name: string | null;
  readonly version: string | null;
  readonly contentDigest: string;
}
export interface MechanicalRuntimeIdentity {
  readonly node: string;
  readonly sdkUse: MechanicalHostSdkUse;
  readonly tarballDigest: string;
  readonly packages: readonly MechanicalInstalledPackageIdentity[];
  readonly sdk: { readonly claude: MechanicalSdkIdentity | null; readonly forge: MechanicalSdkIdentity | null };
}
/** A validated installed host, frozen; loadMechanicalInstalledHost loads only one this module minted (R-LOAD-1). */
export interface MechanicalResolvedInstalledHost {
  readonly consumerRoot: string;
  readonly hostModulePath: string;
  readonly hostModuleUrl: string;
  readonly descriptorDigest: string;
  readonly identity: MechanicalRuntimeIdentity;
}
type Refusal = {
  readonly ok: false;
  readonly diagnostic: MechanicalInstalledHostDiagnostic;
  readonly identity?: MechanicalRuntimeIdentity;
};
export type MechanicalInstalledHostResolution = { readonly ok: true; readonly resolved: MechanicalResolvedInstalledHost } | Refusal;
/** The host's importer: it receives the file: URL of the measured host module and nothing else (R421-1: one argument). */
export type MechanicalHostImporter = (url: string) => Promise<unknown>;
/** The composed export as loaded; the adapter never calls it. */
export type MechanicalComposedExport = (...args: never[]) => unknown;
export type MechanicalInstalledHostLoad =
  | { readonly ok: true; readonly resolved: MechanicalResolvedInstalledHost; readonly exported: MechanicalComposedExport }
  | Refusal;
export type MechanicalInstalledContent = { readonly ok: true; readonly content: Readonly<Record<string, string>> } | Refusal;

const refused = (field: MechanicalInstalledHostField, reason: MechanicalInstalledHostReason, identity?: MechanicalRuntimeIdentity): Refusal =>
  Object.freeze({
    ok: false as const,
    diagnostic: Object.freeze({ code: "mechanical-installed-host-refused" as const, field, reason }),
    ...(identity === undefined ? {} : { identity }),
  });
const isRefusal = (value: unknown): value is Refusal => typeof value === "object" && value !== null && Object.hasOwn(value, "diagnostic");
const plain = (value: unknown): value is Readonly<Record<string, unknown>> => typeof value === "object" && value !== null && !Array.isArray(value);
const isDigest = (value: unknown): value is string => typeof value === "string" && MECHANICAL_DIGEST_PATTERN.test(value);
const digestOf = (bytes: Uint8Array | string): string => `sha256:${createHash("sha256").update(bytes).digest("hex")}`;
const IDENTIFIER = /^[A-Za-z_$][A-Za-z0-9_$]*$/;
const PLAIN_VERSION = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/;
const NODE_VERSION = /^v(\d+)\.\d+\.\d+$/;
const READ_FLAGS = constants.O_RDONLY | (constants.O_NOFOLLOW ?? 0);
const UTF8 = new TextDecoder("utf-8", { fatal: true });

/** A manifest path: relative, "/"-separated, of non-empty segments other than . and .. (step 1). */
const canonicalRelative = (path: string): boolean =>
  path.length > 0 && !path.startsWith("/") && !path.includes("\0") && path.split("/").every(segment => segment !== "" && segment !== "." && segment !== "..");
const insideRoot = (root: string, path: string): boolean => {
  const rel = relative(root, path);
  return rel !== "" && rel !== ".." && !rel.startsWith(`..${sep}`) && !isAbsolute(rel);
};

/** Step 1: the entry's shape. */
function entryRefusal(entry: unknown): Refusal | undefined {
  if (!plain(entry)) return refused("entry", "entry-malformed");
  const { tarballDigest, descriptorDigest, composedExport, content } = entry;
  if (!isDigest(tarballDigest) || !isDigest(descriptorDigest)) return refused("entry", "entry-malformed");
  if (typeof composedExport !== "string" || !IDENTIFIER.test(composedExport) || composedExport === MECHANICAL_LEGACY_HOST_EXPORT) return refused("entry", "entry-malformed");
  if (!plain(content)) return refused("entry", "entry-malformed");
  const paths = Object.keys(content);
  if (paths.length === 0 || paths.some(path => !canonicalRelative(path) || !isDigest(content[path]))) return refused("entry", "entry-malformed");
  return undefined;
}

/** Step 1, continued: the runtime facts are an object whose sdkUse label is native or fixture and whose nodeVersion, when present, is a string. */
function runtimeRefusal(runtime: unknown): Refusal | undefined {
  if (!plain(runtime) || (runtime.sdkUse !== "native" && runtime.sdkUse !== "fixture")) return refused("runtime", "runtime-malformed");
  if (Object.hasOwn(runtime, "nodeVersion") && runtime.nodeVersion !== undefined && typeof runtime.nodeVersion !== "string") return refused("runtime", "runtime-malformed");
  return undefined;
}

/** A regular file judged by stat before it is opened; the open asks O_NOFOLLOW (a link refuses unreadable, R421-4) and checks the handle again. */
async function readRegularFile(path: string, field: "tarball" | "descriptor" | "installed"): Promise<{ readonly ok: true; readonly bytes: Buffer } | Refusal> {
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

/** The walk of step 5: every regular file under the scope directory by its relative path and digest; a link or a special file refuses. */
async function walkScope(scope: string): Promise<{ readonly ok: true; readonly files: Map<string, string> } | Refusal> {
  const files = new Map<string, string>();
  const visit = async (directory: string, prefix: string): Promise<Refusal | undefined> => {
    let names: string[];
    try {
      names = (await readdir(directory)).sort((left, right) => (left < right ? -1 : left > right ? 1 : 0));
    } catch {
      return refused("installed", "unreadable");
    }
    for (const entryName of names) {
      const path = join(directory, entryName);
      const name = prefix === "" ? entryName : `${prefix}/${entryName}`;
      let kind: Stats;
      try {
        kind = await lstat(path);
      } catch {
        return refused("installed", "unreadable");
      }
      if (kind.isSymbolicLink()) return refused("installed", "installed-link");
      if (kind.isDirectory()) {
        const inner = await visit(path, name);
        if (inner !== undefined) return inner;
        continue;
      }
      if (!kind.isFile()) return refused("installed", "not-a-file");
      const read = await readRegularFile(path, "installed");
      if (!read.ok) return read;
      files.set(name, digestOf(read.bytes));
    }
    return undefined;
  };
  const refusal = await visit(scope, "");
  return refusal ?? { ok: true, files };
}

/** The scope directory's realpath, strictly inside the consumer root's (step 5). */
async function scopeOf(root: string): Promise<string | Refusal> {
  let scope: string;
  try {
    scope = await realpath(join(root, ...SCOPE));
  } catch {
    return refused("installed", "unreadable");
  }
  return insideRoot(root, scope) ? scope : refused("installed", "outside-root");
}

/** Pi's own content manifest of a consumer root: every regular file under the scope directory with its SHA-256 (R422-5). */
export async function measureMechanicalInstalledContent(consumerRoot: string): Promise<MechanicalInstalledContent> {
  let root: string;
  try {
    root = await realpath(consumerRoot);
  } catch {
    return refused("consumer", "unreadable");
  }
  const scope = await scopeOf(root);
  if (isRefusal(scope)) return scope;
  const walked = await walkScope(scope);
  if (!walked.ok) return walked;
  return Object.freeze({ ok: true as const, content: Object.freeze(Object.fromEntries(walked.files)) });
}

/** The parsed JSON of a measured file read again, its bytes compared with the measured digest (a change between the walk and this read is NOT CLAIMED); else undefined, also for bytes that are not JSON (R421-5, R425-5). */
async function measuredJson(path: string, digest: string | undefined): Promise<unknown> {
  const read = await readRegularFile(path, "installed");
  if (!read.ok || digest === undefined || digestOf(read.bytes) !== digest) return undefined;
  try {
    return JSON.parse(UTF8.decode(read.bytes));
  } catch {
    return undefined;
  }
}

/** Step 6: the ./host target of the rig's export map, as a path relative to the scope directory, when it names a measured file. */
async function hostTarget(scope: string, files: ReadonlyMap<string, string>): Promise<string | undefined> {
  const manifest = await measuredJson(join(scope, HOST_DIRECTORY, "package.json"), files.get(`${HOST_DIRECTORY}/package.json`));
  if (!plain(manifest) || manifest.name !== MECHANICAL_HOST_PACKAGE || !plain(manifest.exports)) return undefined;
  const mapped = manifest.exports[MECHANICAL_HOST_SUBPATH];
  const target = typeof mapped === "string" ? mapped : plain(mapped) ? (typeof mapped.import === "string" ? mapped.import : mapped.default) : undefined;
  if (typeof target !== "string" || !target.startsWith("./")) return undefined;
  const inside = target.slice(2);
  if (!canonicalRelative(inside)) return undefined;
  const key = `${HOST_DIRECTORY}/${inside}`;
  return files.has(key) ? key : undefined;
}

interface Measured {
  readonly root: string;
  readonly tarballPath: string;
  readonly tarballDigest: string;
  readonly descriptorDigest: string;
  readonly scope: string;
  readonly files: ReadonlyMap<string, string>;
  readonly hostModulePath: string;
}

/** Steps 2 to 6 of the header, the first refusal returned. */
async function measure(options: MechanicalInstalledHostOptions): Promise<Measured | Refusal> {
  const { entry } = options;
  let root: string;
  try {
    root = await realpath(options.consumerRoot);
  } catch {
    return refused("consumer", "unreadable");
  }
  let tarballPath: string;
  try {
    tarballPath = await realpath(options.tarballPath);
  } catch {
    return refused("tarball", "unreadable");
  }
  if (!insideRoot(root, tarballPath)) return refused("tarball", "outside-root");
  const tarball = await readRegularFile(tarballPath, "tarball");
  if (!tarball.ok) return tarball;
  const tarballDigest = digestOf(tarball.bytes);
  if (tarballDigest !== entry.tarballDigest) return refused("tarball", "artifact-mismatch");
  const descriptor = await readRegularFile(options.descriptorPath, "descriptor");
  if (!descriptor.ok) return descriptor;
  const descriptorDigest = digestOf(descriptor.bytes);
  if (descriptorDigest !== entry.descriptorDigest) return refused("descriptor", "descriptor-mismatch");
  const scope = await scopeOf(root);
  if (isRefusal(scope)) return scope;
  const walked = await walkScope(scope);
  if (!walked.ok) return walked;
  const listed = Object.keys(entry.content);
  for (const path of listed) if (!walked.files.has(path)) return refused("installed", "installed-file-missing");
  for (const path of walked.files.keys()) if (!Object.hasOwn(entry.content, path)) return refused("installed", "installed-file-unlisted");
  for (const [path, digest] of walked.files) if (entry.content[path] !== digest) return refused("installed", "installed-content-mismatch");
  const target = await hostTarget(scope, walked.files);
  if (target === undefined) return refused("exports", "export-map-invalid");
  return { root, tarballPath, tarballDigest, descriptorDigest, scope, files: walked.files, hostModulePath: join(scope, ...target.split("/")) };
}

/** One installed package directory's identity: its package.json name and plain version, and the digest of its manifest lines. */
async function packageIdentity(scope: string, directory: string, files: ReadonlyMap<string, string>): Promise<MechanicalInstalledPackageIdentity> {
  const prefix = `${directory}/`;
  const lines = [...files]
    .filter(([path]) => path.startsWith(prefix))
    .map(([path, digest]) => `${path.slice(prefix.length)} ${digest}\n`)
    .join("");
  const manifest = await measuredJson(join(scope, directory, "package.json"), files.get(`${prefix}package.json`));
  const name = plain(manifest) && typeof manifest.name === "string" && manifest.name === `${SCOPE_NAME}/${directory}` ? manifest.name : null;
  const version = plain(manifest) && typeof manifest.version === "string" && PLAIN_VERSION.test(manifest.version) ? manifest.version : null;
  return Object.freeze({ directory, name, version, contentDigest: digestOf(lines) });
}

/** One SDK as seen from the consumer root: node_modules/<specifier>, its realpath inside the root, whose package.json is a regular file naming it with a plain version (R425-1, R425-2). */
async function sdkIdentity(root: string, specifier: string): Promise<MechanicalSdkIdentity | null> {
  let directory: string;
  try {
    directory = await realpath(join(root, "node_modules", ...specifier.split("/")));
  } catch {
    return null;
  }
  if (!insideRoot(root, directory)) return null;
  const read = await readRegularFile(join(directory, "package.json"), "installed");
  if (!read.ok) return null;
  let manifest: unknown;
  try {
    manifest = JSON.parse(UTF8.decode(read.bytes));
  } catch {
    return null;
  }
  if (!plain(manifest) || manifest.name !== specifier || typeof manifest.version !== "string" || !PLAIN_VERSION.test(manifest.version)) return null;
  return Object.freeze({ specifier, version: manifest.version, resolutionPath: directory });
}

/** What load re-measures against: the options as validated, keyed by the frozen resolution minted for them (R-LOAD-1). */
interface Minted {
  readonly options: MechanicalInstalledHostOptions;
  readonly measured: Measured;
}
const MINTED = new WeakMap<MechanicalResolvedInstalledHost, Minted>();

/** A frozen copy of the options as validated, so a later change to the caller's entry (its export name or content manifest, R-LOAD-1) reaches no load. */
function snapshot(options: MechanicalInstalledHostOptions): MechanicalInstalledHostOptions {
  const { entry, runtime } = options;
  return Object.freeze({
    consumerRoot: options.consumerRoot,
    tarballPath: options.tarballPath,
    descriptorPath: options.descriptorPath,
    entry: Object.freeze({
      tarballDigest: entry.tarballDigest,
      descriptorDigest: entry.descriptorDigest,
      composedExport: entry.composedExport,
      content: Object.freeze(Object.fromEntries(Object.keys(entry.content).map(path => [path, entry.content[path] ?? ""]))),
    }),
    runtime: Object.freeze({ ...(runtime.nodeVersion === undefined ? {} : { nodeVersion: runtime.nodeVersion }), sdkUse: runtime.sdkUse }),
  });
}

/** Validation: steps 1 to 7 of the header, the first refusal returned. */
export async function resolveMechanicalInstalledHost(raw: MechanicalInstalledHostOptions): Promise<MechanicalInstalledHostResolution> {
  const entryProblem = entryRefusal(raw.entry) ?? runtimeRefusal(raw.runtime);
  if (entryProblem !== undefined) return entryProblem;
  const options = snapshot(raw);
  const measured = await measure(options);
  if (isRefusal(measured)) return measured;
  const directories = [...new Set([...measured.files.keys()].map(path => path.split("/")[0] ?? ""))].sort();
  const packages = await Promise.all(directories.map(directory => packageIdentity(measured.scope, directory, measured.files)));
  const node = options.runtime.nodeVersion ?? process.version;
  const sdkUse = options.runtime.sdkUse;
  const claude = await sdkIdentity(measured.root, MECHANICAL_HOST_SDKS["sdk.claude"]);
  const forge = await sdkIdentity(measured.root, MECHANICAL_HOST_SDKS["sdk.forge"]);
  const identity: MechanicalRuntimeIdentity = Object.freeze({
    node,
    sdkUse,
    tarballDigest: measured.tarballDigest,
    packages: Object.freeze(packages),
    sdk: Object.freeze({ claude, forge }),
  });
  const major = NODE_VERSION.exec(node)?.[1];
  if (major === undefined || Number(major) !== MECHANICAL_HOST_NODE_MAJOR) return refused("node", "runtime-unavailable", identity);
  if (sdkUse === "native") {
    if (claude === null) return refused("sdk.claude", "runtime-unavailable", identity);
    if (forge === null) return refused("sdk.forge", "runtime-unavailable", identity);
  }
  const resolved: MechanicalResolvedInstalledHost = Object.freeze({
    consumerRoot: measured.root,
    hostModulePath: measured.hostModulePath,
    hostModuleUrl: pathToFileURL(measured.hostModulePath).href,
    descriptorDigest: measured.descriptorDigest,
    identity,
  });
  MINTED.set(resolved, Object.freeze({ options, measured }));
  return Object.freeze({ ok: true as const, resolved });
}

/** One name read off the namespace as an own data member; an accessor is never run, an inherited member never read (R423-2, R423-3). */
function ownData(namespace: unknown, name: string): unknown {
  if ((typeof namespace !== "object" && typeof namespace !== "function") || namespace === null) return undefined;
  const descriptor = Reflect.getOwnPropertyDescriptor(namespace, name);
  return descriptor !== undefined && Object.hasOwn(descriptor, "value") ? descriptor.value : undefined;
}
const isComposedExport = (value: unknown): value is MechanicalComposedExport => typeof value === "function";

/** Load: revalidate the minted resolution, import the host module once by its file: URL, read the two names. */
export async function loadMechanicalInstalledHost(resolved: MechanicalResolvedInstalledHost, importModule: MechanicalHostImporter): Promise<MechanicalInstalledHostLoad> {
  const minted = MINTED.get(resolved);
  if (minted === undefined) return refused("resolution", "unresolved");
  const again = await measure(minted.options);
  if (isRefusal(again)) return again;
  if (again.root !== minted.measured.root || again.tarballPath !== minted.measured.tarballPath || again.hostModulePath !== minted.measured.hostModulePath) return refused("resolution", "changed");
  const namespace = await importModule(resolved.hostModuleUrl);
  if (ownData(namespace, "HOST_API_VERSION") !== MECHANICAL_HOST_API_VERSION) return refused("loaded", "version-mismatch");
  const exported = ownData(namespace, minted.options.entry.composedExport);
  if (!isComposedExport(exported)) return refused("loaded", "runtime-unavailable");
  return Object.freeze({ ok: true as const, resolved, exported });
}

/** The host's one-shot admission: validation, then load, the first refusal returned as is. */
export async function admitMechanicalInstalledHost(options: MechanicalInstalledHostOptions, importModule: MechanicalHostImporter): Promise<MechanicalInstalledHostLoad> {
  const resolution = await resolveMechanicalInstalledHost(options);
  if (!resolution.ok) return resolution;
  return loadMechanicalInstalledHost(resolution.resolved, importModule);
}
