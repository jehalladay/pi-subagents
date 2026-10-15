/**
 * Pure native executable identity observation (VC-7/W18-B).
 *
 * Answers "which file would a launcher run for this command, and what are its
 * bytes" without ever running it, and labels the answer honestly rather than
 * upgrading it:
 * - a command that names a path (it contains a separator) is resolved against
 *   the caller's cwd; a regular file with an execute bit is hashed with sha256
 *   and labelled digest-observed;
 * - a bare name is searched through the caller-supplied PATH; the selected file
 *   is hashed too but stays mutable-path, because editing PATH or any earlier
 *   entry changes the binary without changing the command;
 * - no command means an SDK default executable (such as the Claude Agent SDK's
 *   built-in binary): unresolved and unsupported, never guessed.
 *
 * Reads go through node:fs only (lstat, readlink, realpath, one descriptor with
 * fstat and bounded chunked reads). PATH, cwd and the observation time are
 * explicit inputs, so nothing ambient feeds the result. A missing, unreadable,
 * non-regular, non-executable, oversized or too-deeply-linked target is data
 * with a reason, never an exception; only programmer errors (a relative cwd or
 * an invalid bound) throw RangeError.
 *
 * Resolution follows the kernel rather than lexical normalization: paths and
 * relative link targets are joined without collapsing "..", and realpath is
 * the native one, so "dir-link/.." names what the kernel would open, not what
 * string normalization would guess. Any execute bit counts as executable;
 * whether the launching principal may execute the file is not evaluated.
 */
import { createHash } from "node:crypto";
import { closeSync, constants, fstatSync, lstatSync, openSync, readlinkSync, readSync, realpathSync, type Stats } from "node:fs";
import { delimiter, dirname, isAbsolute, sep } from "node:path";
import { redactWorkbenchText } from "./redaction.js";

export const EXECUTABLE_IDENTITY_CONTRACT = "workbench.executable-identity/v1";

/**
 * Frozen vocabulary; an observation's reasons never hold anything else.
 * - sdk-default-executable: no command was given, so the SDK launches a default executable this observer cannot see.
 * - not-found: nothing exists at the path (including a dangling link); for a PATH search, no searched entry held the name.
 * - not-a-file: the target is a directory, device, FIFO or socket.
 * - not-executable: the target is a regular file without an execute bit.
 * - symlink-depth: reaching the target needs more than maxSymlinkHops links, or the links loop.
 * - too-large: the target exceeds maxBytes, so it is never read and carries no digest.
 * - unreadable: the target or a directory on the way could not be inspected or read, or changed while it was read.
 * - path-resolved: the target was selected through PATH, which can change without the command changing.
 * - shadowed-candidates: more than one searched PATH entry holds a same-named executable.
 * - search-truncated: the search did not cover everything a launcher would consult: PATH held more than
 *   maxSearchEntries entries, or no PATH was supplied (a launcher then falls back to a platform default path).
 */
export type ExecutableIdentityReason =
  | "sdk-default-executable"
  | "not-found"
  | "not-a-file"
  | "not-executable"
  | "symlink-depth"
  | "too-large"
  | "unreadable"
  | "path-resolved"
  | "shadowed-candidates"
  | "search-truncated";

export interface ExecutableObservation {
  readonly contractVersion: typeof EXECUTABLE_IDENTITY_CONTRACT;
  /** The command as given, redacted; undefined when none was given (an SDK default executable). */
  readonly requested: string | undefined;
  /** absolute: a path-naming command was resolved; path-search: a bare name was selected from PATH; unresolved: nothing launchable was identified. */
  readonly resolution: "absolute" | "path-search" | "unresolved";
  /** The path examined for a path-naming command, or the PATH location selected; joined, never normalized; redacted. */
  readonly resolvedPath?: string;
  /** Canonical path of the selected executable after every link; redacted. */
  readonly realPath?: string;
  /** Final-component links followed on the way to the target. */
  readonly symlinkHops: number;
  /** sha256:<hex> of the selected executable's bytes; absent whenever they were not read. */
  readonly digest?: string;
  readonly sizeBytes?: number;
  /** Permission and special bits of the selected executable (st_mode & 0o7777). */
  readonly mode?: number;
  /** Searched entries holding a same-named executable; 1 for a resolved path-naming command. */
  readonly candidates: number;
  /** digest-observed only for a resolved path-naming command with a digest; mutable-path for every PATH selection; unsupported otherwise. */
  readonly immutability: "digest-observed" | "mutable-path" | "unsupported";
  /** Deduplicated, in the order the vocabulary above lists them. */
  readonly reasons: readonly ExecutableIdentityReason[];
  /** Supplied by the caller; this module never reads a clock. */
  readonly observedAt: string;
}

export interface ExecutableIdentityInput {
  /** The command a launcher would be given; undefined or empty means the SDK picks its default executable. */
  readonly command: string | undefined;
  /** Absolute directory a relative command and relative or empty PATH entries resolve against. */
  readonly cwd: string;
  /** The PATH the launch would search, passed explicitly; undefined means none was supplied. */
  readonly path: string | undefined;
  readonly observedAt: string;
  /** Largest file hashed, in bytes (default 512 MiB). */
  readonly maxBytes?: number;
  /** PATH entries searched (default 64); later entries are ignored and reported as search-truncated. */
  readonly maxSearchEntries?: number;
  /** Links followed per candidate (default 16). */
  readonly maxSymlinkHops?: number;
}

/** Fields compared on reattach, in the order differences lists them. */
export type ExecutableIdentityField = "contractVersion" | "digest" | "realPath" | "sizeBytes" | "mode" | "immutability" | "resolution";

export interface ExecutableIdentityComparison {
  readonly verdict: "same" | "changed" | "unknown";
  readonly differences: readonly ExecutableIdentityField[];
}

const DEFAULT_MAX_BYTES = 512 * 1024 * 1024;
const DEFAULT_MAX_SEARCH_ENTRIES = 64;
const DEFAULT_MAX_SYMLINK_HOPS = 16;
/** Linux PATH_MAX: a reported path is bounded for display, never below what the kernel accepts. */
const MAX_REPORTED_PATH = 4096;
const CHUNK_BYTES = 1024 * 1024;
const REASON_ORDER: Readonly<Record<ExecutableIdentityReason, number>> = {
  "sdk-default-executable": 0,
  "not-found": 1,
  "not-a-file": 2,
  "not-executable": 3,
  "symlink-depth": 4,
  "too-large": 5,
  unreadable: 6,
  "path-resolved": 7,
  "shadowed-candidates": 8,
  "search-truncated": 9,
};
const COMPARED_FIELDS: readonly ExecutableIdentityField[] = ["contractVersion", "digest", "realPath", "sizeBytes", "mode", "immutability", "resolution"];

interface Bounds {
  readonly maxBytes: number;
  readonly maxSearchEntries: number;
  readonly maxSymlinkHops: number;
}
type Inspection =
  | { readonly kind: "rejected"; readonly reason: ExecutableIdentityReason; readonly hops: number }
  | { readonly kind: "executable"; readonly path: string; readonly entry: Stats; readonly hops: number };
type Executable = Extract<Inspection, { kind: "executable" }>;
interface Pinned {
  readonly realPath?: string;
  readonly digest?: string;
  readonly sizeBytes: number;
  readonly mode: number;
  readonly reasons: readonly ExecutableIdentityReason[];
}
interface Draft extends Partial<Omit<Pinned, "reasons">> {
  readonly resolution: ExecutableObservation["resolution"];
  readonly resolvedPath?: string;
  readonly symlinkHops: number;
  readonly candidates: number;
  readonly reasons: readonly ExecutableIdentityReason[];
}

/** Observe, never execute, the native executable a launcher would run for a command. */
export function observeExecutableIdentity(input: ExecutableIdentityInput): ExecutableObservation {
  const bounds: Bounds = {
    maxBytes: bound("maxBytes", input.maxBytes, DEFAULT_MAX_BYTES),
    maxSearchEntries: bound("maxSearchEntries", input.maxSearchEntries, DEFAULT_MAX_SEARCH_ENTRIES),
    maxSymlinkHops: bound("maxSymlinkHops", input.maxSymlinkHops, DEFAULT_MAX_SYMLINK_HOPS),
  };
  if (!isAbsolute(input.cwd)) throw new RangeError("observeExecutableIdentity: cwd must be an absolute path.");
  const { command } = input;
  if (command === undefined || command === "") return seal(input, { resolution: "unresolved", symlinkHops: 0, candidates: 0, reasons: ["sdk-default-executable"] });
  const namesPath = command.includes("/") || command.includes(sep);
  return seal(input, namesPath ? explicitPath(command, input.cwd, bounds) : searchPath(command, input.cwd, input.path, bounds));
}

/**
 * Reattach verdict. same needs equal digests on two digest-observed sides;
 * changed needs two digests that differ; everything else, including a
 * mutable-path or unsupported side or another contract version, is unknown.
 */
export function compareExecutableIdentity(recorded: ExecutableObservation, current: ExecutableObservation): ExecutableIdentityComparison {
  const differences = Object.freeze(COMPARED_FIELDS.filter(field => recorded[field] !== current[field]));
  const comparable = recorded.contractVersion === EXECUTABLE_IDENTITY_CONTRACT && current.contractVersion === EXECUTABLE_IDENTITY_CONTRACT;
  let verdict: ExecutableIdentityComparison["verdict"] = "unknown";
  if (comparable && recorded.digest !== undefined && current.digest !== undefined) {
    if (recorded.digest !== current.digest) verdict = "changed";
    else if (recorded.immutability === "digest-observed" && current.immutability === "digest-observed") verdict = "same";
  }
  return Object.freeze({ verdict, differences });
}

function explicitPath(command: string, cwd: string, bounds: Bounds): Draft {
  const resolvedPath = isAbsolute(command) ? command : under(cwd, command);
  const target = inspect(resolvedPath, bounds.maxSymlinkHops);
  if (target.kind === "rejected") return { resolution: "unresolved", resolvedPath, symlinkHops: target.hops, candidates: 0, reasons: [target.reason] };
  return { resolution: "absolute", resolvedPath, symlinkHops: target.hops, candidates: 1, ...pin(target, bounds.maxBytes) };
}

function searchPath(command: string, cwd: string, path: string | undefined, bounds: Bounds): Draft {
  const entries = path === undefined ? [] : path.split(delimiter);
  // No PATH is not an empty search: a launcher then falls back to a platform default path this observer never assumes.
  const truncated = path === undefined || entries.length > bounds.maxSearchEntries;
  const rejected = new Set<ExecutableIdentityReason>();
  let selected: { readonly resolvedPath: string; readonly target: Executable } | undefined;
  let candidates = 0;
  for (const entry of entries.slice(0, bounds.maxSearchEntries)) {
    const resolvedPath = under(entry === "" ? cwd : isAbsolute(entry) ? entry : under(cwd, entry), command);
    const target = inspect(resolvedPath, bounds.maxSymlinkHops);
    if (target.kind === "rejected") {
      rejected.add(target.reason);
    } else {
      candidates += 1;
      selected ??= { resolvedPath, target };
    }
  }
  if (selected === undefined) {
    // A truncated search never claims a certain not-found; specific rejections explain more than not-found does.
    const specific = [...rejected].filter(reason => reason !== "not-found");
    const reasons: ExecutableIdentityReason[] = truncated ? [...specific, "search-truncated"] : specific.length > 0 ? specific : ["not-found"];
    return { resolution: "unresolved", symlinkHops: 0, candidates: 0, reasons };
  }
  const pinned = pin(selected.target, bounds.maxBytes);
  // An entry that could not be inspected may be what a launcher would run (or fail on) instead, and leaves candidates a lower bound.
  const reasons: ExecutableIdentityReason[] = [...pinned.reasons, ...[...rejected].filter(reason => reason === "symlink-depth" || reason === "unreadable"), "path-resolved"];
  if (candidates > 1) reasons.push("shadowed-candidates");
  if (truncated) reasons.push("search-truncated");
  return { resolution: "path-search", resolvedPath: selected.resolvedPath, symlinkHops: selected.target.hops, candidates, ...pinned, reasons };
}

/** Follow final-component links hop by hop to a regular file with an execute bit, or say why not. */
function inspect(start: string, maxHops: number): Inspection {
  let current = start;
  for (let hops = 0; ; hops += 1) {
    let entry: Stats;
    try {
      entry = lstatSync(current);
    } catch (error) {
      return { kind: "rejected", reason: failure(error), hops };
    }
    if (!entry.isSymbolicLink()) {
      if (!entry.isFile()) return { kind: "rejected", reason: "not-a-file", hops };
      if ((entry.mode & 0o111) === 0) return { kind: "rejected", reason: "not-executable", hops };
      return { kind: "executable", path: current, entry, hops };
    }
    if (hops >= maxHops) return { kind: "rejected", reason: "symlink-depth", hops };
    try {
      const target = readlinkSync(current);
      // The link's directory as reached, joined unnormalized: the kernel resolves it to the directory it just found the link in.
      current = isAbsolute(target) ? target : under(dirname(current), target);
    } catch (error) {
      return { kind: "rejected", reason: failure(error), hops };
    }
  }
}

function pin(target: Executable, maxBytes: number): Pinned {
  const sizeBytes = target.entry.size;
  const mode = target.entry.mode & 0o7777;
  let realPath: string;
  try {
    realPath = realpathSync.native(target.path);
  } catch {
    return { sizeBytes, mode, reasons: ["unreadable"] };
  }
  if (sizeBytes > maxBytes) return { realPath, sizeBytes, mode, reasons: ["too-large"] };
  const digest = digestUnchanged(realPath, target.entry);
  return digest === undefined ? { realPath, sizeBytes, mode, reasons: ["unreadable"] } : { realPath, digest, sizeBytes, mode, reasons: [] };
}

/**
 * sha256 of a canonical path's bytes through one descriptor in bounded chunks,
 * only when the opened inode is the one inspected and it is unchanged after
 * the read. O_NONBLOCK keeps a file swapped for a FIFO from blocking the open;
 * the swap itself then fails the inode check.
 */
function digestUnchanged(path: string, inspected: Stats): string | undefined {
  let fd: number;
  try {
    fd = openSync(path, constants.O_RDONLY | constants.O_NOFOLLOW | constants.O_NONBLOCK);
  } catch {
    return undefined;
  }
  try {
    if (!unchanged(inspected, fstatSync(fd))) return undefined;
    const hash = createHash("sha256");
    const chunk = Buffer.alloc(Math.min(CHUNK_BYTES, inspected.size + 1));
    let total = 0;
    for (;;) {
      const read = readSync(fd, chunk, 0, chunk.length, total);
      if (read === 0) break;
      total += read;
      if (total > inspected.size) return undefined;
      hash.update(chunk.subarray(0, read));
    }
    return total === inspected.size && unchanged(inspected, fstatSync(fd)) ? `sha256:${hash.digest("hex")}` : undefined;
  } catch {
    return undefined;
  } finally {
    try {
      closeSync(fd);
    } catch {
      // A read-only descriptor's close failure cannot change the bytes already hashed.
    }
  }
}

function unchanged(inspected: Stats, now: Stats): boolean {
  return inspected.dev === now.dev && inspected.ino === now.ino && inspected.size === now.size && inspected.mode === now.mode && inspected.mtimeMs === now.mtimeMs && inspected.ctimeMs === now.ctimeMs;
}

function failure(error: unknown): ExecutableIdentityReason {
  const code = error instanceof Error && "code" in error ? error.code : undefined;
  if (code === "ENOENT" || code === "ENOTDIR") return "not-found";
  return code === "ELOOP" ? "symlink-depth" : "unreadable";
}

/** Join without lexical normalization, leaving ".." after a symlinked directory to the kernel. */
function under(directory: string, name: string): string {
  return directory.endsWith(sep) ? `${directory}${name}` : `${directory}${sep}${name}`;
}

function bound(name: string, value: number | undefined, fallback: number): number {
  if (value === undefined) return fallback;
  if (!Number.isSafeInteger(value) || value < 0) throw new RangeError(`observeExecutableIdentity: ${name} must be a non-negative safe integer.`);
  return value;
}

function shown(path: string): string {
  return redactWorkbenchText(path, MAX_REPORTED_PATH);
}

function seal(input: ExecutableIdentityInput, draft: Draft): ExecutableObservation {
  const reasons = Object.freeze([...new Set(draft.reasons)].sort((left, right) => REASON_ORDER[left] - REASON_ORDER[right]));
  let immutability: ExecutableObservation["immutability"] = "unsupported";
  if (draft.resolution === "path-search") immutability = "mutable-path";
  else if (draft.resolution === "absolute" && draft.digest !== undefined) immutability = "digest-observed";
  return Object.freeze({
    contractVersion: EXECUTABLE_IDENTITY_CONTRACT,
    requested: input.command === undefined ? undefined : shown(input.command),
    resolution: draft.resolution,
    ...(draft.resolvedPath === undefined ? {} : { resolvedPath: shown(draft.resolvedPath) }),
    ...(draft.realPath === undefined ? {} : { realPath: shown(draft.realPath) }),
    symlinkHops: draft.symlinkHops,
    ...(draft.digest === undefined ? {} : { digest: draft.digest }),
    ...(draft.sizeBytes === undefined ? {} : { sizeBytes: draft.sizeBytes }),
    ...(draft.mode === undefined ? {} : { mode: draft.mode }),
    candidates: draft.candidates,
    immutability,
    reasons,
    observedAt: input.observedAt,
  });
}
