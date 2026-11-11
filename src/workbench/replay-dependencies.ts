/**
 * Readings of three dependencies of a recorded Claude agent answer (wb-413a; program mechanical-workflows-interop-2026-11-04,
 * slice PI-4, EAT-R017..EAT-R020), beyond the policy the Claude host's replay basis already names: cwd, model pin,
 * permission mode, setting-source names, tools, roles, grants and principal (claude-host.ts).
 *
 *  - source (sourceDependency): HEAD's commit and tree with the candidate digest the host hands in. src/index.ts hands
 *    in the identity capture's Git candidate (workspaceCandidateBasis). Of what that candidate covers, the claim is the
 *    forms the wiring suite plants at the registered path: a tracked file's working bytes at the top level, one and two
 *    directories down and dot-named, a tracked file deleted from the working tree, a staged change, a new untracked
 *    file Git does not ignore at the top level, in a subdirectory and dot-named, a new commit over the same tree and a
 *    committed change each move the reading; a Git-ignored file leaves it equal; it is unknown outside Git and for a
 *    committed symlink;
 *  - instructions (instructionDependency): what readFiles reads at the paths instructionPaths names for the sources it
 *    is handed, each source's CLAUDE_INSTRUCTION_LOCATIONS and CLAUDE_ANCESTOR_MEMORY files; handed no source, it names
 *    no path and reads no file;
 *  - provider (providerDependency): the runtime artifact digest and the provider contract digest of the identity it is
 *    handed, and what readFiles reads at the setting file (CLAUDE_SETTINGS_LOCATIONS) of each source it is handed.
 *
 * A reading is MEASURED, a digest of what was read, or UNKNOWN, a fixed reason and no digest.
 * replayDependenciesMeasured is true only for three measured readings with well-formed digests, and the Claude host
 * permits settled replay only then, so a reading a reader returns unknown declines replay instead of matching. Which
 * conditions a reader returns unknown is claimed only at the forms its export doc and readFiles name, as the readers
 * suite and the fail-closed suite (test/workbench-replay-dependency-fail-closed.test.ts, wb-6b3z, the structural exit
 * R-B664 of wb-413a's R-B646 claim set) plant them; each fail-closed claim names the family of that suite that pins it.
 *
 * NOT CLAIMED: that every condition the process cannot measure reads unknown (a read error no row plants, an I/O error
 * among them); any relative string for either base other than those instructionDependency's and providerDependency's
 * docs name; and the default config directory for a relative home other than those claudeUserConfigDir's doc names.
 */
import { createHash } from "node:crypto";
import { readdirSync, readFileSync, realpathSync, type Stats, statSync } from "node:fs";
import { dirname, isAbsolute, join, resolve } from "node:path";
import { identityDigest } from "./identity.js";

/** One dependency as the host read it. */
export type ReplayDependency =
  | { readonly state: "measured"; readonly digest: string }
  | { readonly state: "unknown"; readonly reason: string };

/** The three readings an agent answer is replayed under (ClaudeWorkflowHostOptions.replayDependencies). */
export interface ClaudeReplayDependencies {
  /** HEAD's commit and tree with the candidate digest (sourceDependency). */
  readonly source: ReplayDependency;
  /** What readFiles reads at the instruction paths of the sources instructionDependency is handed. */
  readonly instructions: ReplayDependency;
  /** The handed identity's runtime artifact and provider contract digests and the setting files (providerDependency). */
  readonly provider: ReplayDependency;
}

/** A setting-source name, the same three names as the Claude Agent SDK's Options.settingSources (SettingSource). */
export type ClaudeSettingSource = "user" | "project" | "local";

type SourceTable = Readonly<Record<ClaudeSettingSource, readonly string[]>>;

/**
 * The instruction locations the instruction reading reads for each source, relative to the source's base: the user
 * config directory (claudeUserConfigDir) for "user", the cwd for "project" and "local". Each is read as readFiles
 * reads a named path.
 */
export const CLAUDE_INSTRUCTION_LOCATIONS: SourceTable = Object.freeze({
  user: Object.freeze(["CLAUDE.md", "skills", "agents", "commands", "output-styles", "rules"]),
  project: Object.freeze([
    "CLAUDE.md",
    ".claude/CLAUDE.md",
    ".claude/skills",
    ".claude/agents",
    ".claude/commands",
    ".claude/output-styles",
    ".claude/rules",
  ]),
  local: Object.freeze(["CLAUDE.local.md"]),
});

/** The memory files the instruction reading also reads for each source in each proper ancestor of the cwd (instructionPaths). */
export const CLAUDE_ANCESTOR_MEMORY: SourceTable = Object.freeze({
  user: Object.freeze([]),
  project: Object.freeze(["CLAUDE.md", ".claude/CLAUDE.md"]),
  local: Object.freeze(["CLAUDE.local.md"]),
});

/** The setting file the provider reading reads for each source, relative to the same base as its instruction locations. */
export const CLAUDE_SETTINGS_LOCATIONS: SourceTable = Object.freeze({
  user: Object.freeze(["settings.json"]),
  project: Object.freeze([".claude/settings.json"]),
  local: Object.freeze([".claude/settings.local.json"]),
});

/**
 * A file reader's budget, counted over the whole reading: each regular file readFiles reads, at any path the reading
 * names, counts one file and its size in bytes, and a reading with more files or more bytes than the budget is unknown
 * (dependency-over-budget), never a digest of part of the files. How a file reached through two paths of one reading
 * counts is NOT CLAIMED.
 */
export interface DependencyReadLimits {
  readonly files: number;
  readonly bytes: number;
}
/** The default budget of both file readers: 2000 files and 32 MiB (33554432 bytes). */
export const DEPENDENCY_READ_LIMITS: DependencyReadLimits = Object.freeze({ files: 2_000, bytes: 32 * 1024 * 1024 });

const SOURCES: readonly ClaudeSettingSource[] = Object.freeze(["user", "project", "local"]);
const DIGEST = /^sha256:[0-9a-f]{64}$/;
/**
 * How deep a walk reads below a named path: a file 32 levels below it is read, and a directory 32 levels below it makes
 * the reading unknown (dependency-over-budget).
 */
const MAX_DEPTH = 32;

/** A reading of what the host read: identityDigest of `value` under `domain`. */
export function measuredDependency(domain: string, value: unknown): ReplayDependency {
  return Object.freeze({ state: "measured", digest: identityDigest(domain, value) });
}

/** A dependency the host could not read: its fixed reason and no digest. */
export function unknownDependency(reason: string): ReplayDependency {
  return Object.freeze({ state: "unknown", reason });
}

/**
 * True only when all three readings are measured and each digest is well formed (sha256: and 64 lowercase hex digits):
 * the only shape under which the Claude host permits settled replay.
 */
export function replayDependenciesMeasured(dependencies: ClaudeReplayDependencies): boolean {
  return [dependencies.source, dependencies.instructions, dependencies.provider].every(dependencyMeasured);
}

/** One reading of replayDependenciesMeasured: measured, with a well-formed digest. */
export function dependencyMeasured(reading: ReplayDependency): boolean {
  return reading.state === "measured" && typeof reading.digest === "string" && DIGEST.test(reading.digest);
}

/**
 * The source reading: HEAD's commit and tree with the candidate digest the host hands in, the reading moving with each
 * one alone. Unknown when the candidate is not measured or is empty, or when HEAD is missing or lacks its commit or tree.
 */
export function sourceDependency(
  head: { readonly commit: string; readonly tree: string } | undefined,
  candidate: { readonly sourceBasis: string; readonly state: "measured" | "unknown" },
): ReplayDependency {
  if (candidate.state !== "measured" || !candidate.sourceBasis) return unknownDependency("source-candidate-unmeasured");
  if (head === undefined || !head.commit || !head.tree) return unknownDependency("source-head-unreadable");
  return measuredDependency("claude-replay-source", { commit: head.commit, tree: head.tree, candidate: candidate.sourceBasis });
}

/**
 * The paths the instruction reading reads, in order, for an absolute cwd in normal form (one node:path's resolve leaves
 * as it is): for each source handed, in source order (user, project, local), its CLAUDE_INSTRUCTION_LOCATIONS under its
 * base (configDir for "user", the cwd for "project" and "local"), then its CLAUDE_ANCESTOR_MEMORY files in each proper
 * ancestor of the cwd, nearest first, ending at the filesystem root: the ancestors the cwd's own segments spell, at any
 * depth a path within Linux's 4096-byte PATH_MAX can hold (2047 one-letter levels at most). The order and repetition of
 * `sources` do not change the paths. A relative cwd, or one not in normal form, is NOT CLAIMED.
 */
export function instructionPaths(cwd: string, sources: readonly ClaudeSettingSource[], configDir: string): string[] {
  const paths: string[] = [];
  for (const source of SOURCES.filter(known => sources.includes(known))) {
    const base = source === "user" ? configDir : cwd;
    for (const location of CLAUDE_INSTRUCTION_LOCATIONS[source]) paths.push(join(base, location));
    for (const ancestor of ancestorsOf(cwd)) {
      for (const memory of CLAUDE_ANCESTOR_MEMORY[source]) paths.push(join(ancestor, memory));
    }
  }
  return paths;
}

/**
 * The instruction reading: what readFiles reads at the paths instructionPaths names for the sources it is handed,
 * whatever order or repetition they come in. Unknown, by a fixed reason, when a source is managed, User, "user " or the
 * empty name (none of them user, project or local), handed alone or beside one known source, before or after it
 * (setting-source-unrecognized); when a base is relative (instruction-base-not-absolute), under each of the eight sets
 * of known sources (none, each one, each two, all three), for the config directories config, ./config, ../config, .
 * and the empty string beside an absolute cwd, the cwds repo/pkg, ./pkg, . and the empty string beside an absolute
 * config directory, and repo/pkg beside config (FCB-RELATIVE-BASE; R-UNK-relative plants two of these under the user
 * source alone); and in the forms readFiles names. Which reason a reading meeting two of these conditions gives is NOT
 * CLAIMED; so are any other unrecognized name, an unrecognized name beside two or more sources or beside another
 * unrecognized name, and any other relative string for either base.
 */
export function instructionDependency(
  cwd: string,
  sources: readonly string[],
  configDir: string,
  limits: DependencyReadLimits = DEPENDENCY_READ_LIMITS,
): ReplayDependency {
  const enabled = enabledSources(sources);
  if (enabled === undefined) return unknownDependency("setting-source-unrecognized");
  if (!isAbsolute(cwd) || !isAbsolute(configDir)) return unknownDependency("instruction-base-not-absolute");
  const paths = instructionPaths(cwd, enabled, configDir);
  return readingOf(() => measuredDependency("claude-replay-instructions", { sources: [...enabled], files: readFiles(paths, limits) }));
}

/**
 * The provider reading: the runtime artifact digest and the provider contract digest of the identity it is handed, and
 * what readFiles reads at the setting file of each source it is handed, under the source's base. Unknown, by a fixed
 * reason, when no identity is handed or either digest is not sha256: and 64 lowercase hex digits
 * (provider-identity-unmeasured); when a source is managed, User, "user " or the empty name (none of them user, project
 * or local), handed alone or beside one known source, before or after it (setting-source-unrecognized); with a
 * well-formed identity, when a base is relative (setting-base-not-absolute), under each of the eight sets of known
 * sources and for the relative strings instructionDependency's doc names (FCB-RELATIVE-BASE; R-UNK-relative plants two
 * of these under the user source alone); and in the forms readFiles names. Which reason a reading meeting two of these
 * conditions gives is NOT CLAIMED; so are any other unrecognized name, an unrecognized name beside two or more sources
 * or beside another unrecognized name, and any other relative string for either base.
 */
export function providerDependency(
  identity: { readonly runtimeArtifactDigest: string; readonly providerContractDigest: string } | undefined,
  cwd: string,
  sources: readonly string[],
  configDir: string,
  limits: DependencyReadLimits = DEPENDENCY_READ_LIMITS,
): ReplayDependency {
  if (identity === undefined || !DIGEST.test(identity.runtimeArtifactDigest) || !DIGEST.test(identity.providerContractDigest)) {
    return unknownDependency("provider-identity-unmeasured");
  }
  const enabled = enabledSources(sources);
  if (enabled === undefined) return unknownDependency("setting-source-unrecognized");
  if (!isAbsolute(cwd) || !isAbsolute(configDir)) return unknownDependency("setting-base-not-absolute");
  const paths = enabled.flatMap(source => CLAUDE_SETTINGS_LOCATIONS[source].map(location => join(source === "user" ? configDir : cwd, location)));
  return readingOf(() =>
    measuredDependency("claude-replay-provider", {
      runtimeArtifacts: identity.runtimeArtifactDigest,
      providerContracts: identity.providerContractDigest,
      sources: [...enabled],
      settings: readFiles(paths, limits),
    }),
  );
}

/**
 * The user config directory both readers read under the "user" source, for an absolute cwd: for an absolute home,
 * CLAUDE_CONFIG_DIR when it is set to anything but the empty string, an absolute value in normal form as it is and a
 * relative one (a whitespace-only value among them) resolved against the cwd, else <home>/.claude; with CLAUDE_CONFIG_DIR
 * unset or empty and one of the relative homes FCB-RELATIVE-HOME hands, the relative directory node:path's join gives
 * (operator/.claude for operator and ./operator, ../operator/.claude for ../operator and .claude for the empty home),
 * which both readers refuse by their base reasons. An absolute value not in normal form, a relative cwd,
 * CLAUDE_CONFIG_DIR set beside a relative home and any other relative home are NOT CLAIMED.
 */
export function claudeUserConfigDir(env: Readonly<Record<string, string | undefined>>, home: string, cwd: string): string {
  const configured = env.CLAUDE_CONFIG_DIR;
  return configured ? resolve(cwd, configured) : join(home, ".claude");
}

/**
 * The enabled sources in source order (user, project, local), or undefined for a handed source outside those three:
 * claimed at the unrecognized names and places instructionDependency's and providerDependency's docs name, other names
 * and places NOT CLAIMED.
 */
function enabledSources(sources: readonly string[]): ClaudeSettingSource[] | undefined {
  if (!sources.every(source => (SOURCES as readonly string[]).includes(source))) return undefined;
  return SOURCES.filter(source => sources.includes(source));
}

/** Each proper ancestor of an absolute directory, nearest first, ending at the filesystem root. */
function ancestorsOf(directory: string): string[] {
  const ancestors: string[] = [];
  let current = directory;
  while (dirname(current) !== current) {
    current = dirname(current);
    ancestors.push(current);
  }
  return ancestors;
}

/** A dependency a walk could not read, by its fixed reason. */
class UnmeasurableDependency extends Error {
  constructor(readonly reason: string) {
    super(reason);
    this.name = "UnmeasurableDependency";
  }
}

function readingOf(read: () => ReplayDependency): ReplayDependency {
  try {
    return read();
  } catch (error) {
    return unknownDependency(error instanceof UnmeasurableDependency ? error.reason : "dependency-unreadable");
  }
}

/** One path a walk read, and what it found there. */
interface FileReading {
  readonly path: string;
  readonly digest: string;
}

/**
 * Read each named path in order, following symbolic links: a regular file by its bytes; a directory as a "directory"
 * mark and then the entries its listing names in UTF-16 code-unit name order, each subdirectory the same way (the names
 * claimed are those the readers suite plants, dot-named files and directories among them; other names are NOT
 * CLAIMED); a missing named path, a named path below a regular file and a link below a location naming a missing path
 * as absent. A directory reached first by its own name and a second time through one link that sorts after it and is
 * not below it is read again. The whole reading is unknown, by a fixed reason, for these forms one level below a
 * directory location: a FIFO and a link to a character device (dependency-not-a-file); a directory or a file the process
 * may not read, a directory it may list but not search that holds an entry, and two links naming each other
 * (dependency-unreadable); and a link back to the location's own directory (dependency-cycle). It is unknown too for a
 * reading past its budget (dependency-over-budget, DependencyReadLimits) and for a directory MAX_DEPTH levels below a
 * named path (dependency-over-budget).
 *
 * The fail-closed core (wb-6b3z) is claimed only at the instances the fail-closed suite plants, for each file reader
 * under the user source: each of the 136 planted stat refusals (four forms at each depth 0 to 32, four absent forms at
 * the named path) is an unknown reading (dependency-unreadable) (FCB-UNSTAT); each of the 66 planted links naming the
 * path one level or two levels below a regular file, at each depth 0 to 32, reads as the same link naming a missing
 * path (FCB-LINK-BELOW-FILE); each of the 61 planted links naming the directory it lies in (depths 1 to 31) or the one
 * above it (depths 2 to 31) is an unknown reading (dependency-cycle) (FCB-CYCLE-INNER); and each of the 186 planted
 * trees (one of three contents first reached through one link or two links sorting before it, at each depth 1 to 31)
 * is read again as its copy would be and moves with each planted rewrite (FCB-READ-AGAIN).
 *
 * NOT CLAIMED: any instance of the fail-closed core that the fail-closed suite does not plant. Among those, the forms
 * wb-6b3z's refusal #3 realized beyond the plants: the ones the structural exit R-B729 routes to wb-g9g5 (the relative
 * link below a regular file with them, as R-B730 has its treatment ride wb-g9g5's claims-equal-pins cut), namely a
 * directory left at mode 0600 or 0400 listing another entry beside the path, or, below the location, listing a path
 * named other than entry.md; at the named path, such a directory listing the instruction reader's CLAUDE.md; and two
 * links naming each other, a link naming a path with a 256-byte component, a link naming a path below a regular file
 * and a link through which a directory is first reached, each naming its target by a relative path; and, under the
 * R-B731 guard on the cycle words, a link naming the directory it lies in, or the one above it, by a relative path.
 * Also NOT CLAIMED: the list-only plants under a process running as root; any other read error no row plants; a socket
 * and a block device; the reason for a FIFO, a link to a character device, and a directory or a file the process may
 * not read at another depth than one level below a location; a directory left at any mode other than 0600 and 0400 (a
 * mode with group or other permission bits set among them); a directory below a named path, at either mode, that lists
 * no entry; a link naming a path three or more levels below a regular file; a link naming a directory two or more
 * levels above the one it lies in; a directory first reached through a link at the named path, or through three or more
 * links, or holding a subdirectory, three or more entries or entries other than the three planted contents; a change to
 * a file's bytes other than the planted rewrite; and these fail-closed forms under the project or local source.
 */
function readFiles(paths: readonly string[], limits: DependencyReadLimits): FileReading[] {
  const readings: FileReading[] = [];
  const walking = new Set<string>();
  let files = 0;
  let bytes = 0;
  const visit = (path: string, depth: number): void => {
    let stats: Stats;
    try {
      stats = statSync(path);
    } catch (error) {
      const code = (error as NodeJS.ErrnoException).code;
      if (code === "ENOENT" || code === "ENOTDIR") {
        readings.push({ path, digest: "absent" });
        return;
      }
      throw new UnmeasurableDependency("dependency-unreadable");
    }
    if (stats.isFile()) {
      files += 1;
      bytes += stats.size;
      if (files > limits.files || bytes > limits.bytes) throw new UnmeasurableDependency("dependency-over-budget");
      let content: Buffer;
      try {
        content = readFileSync(path);
      } catch {
        throw new UnmeasurableDependency("dependency-unreadable");
      }
      readings.push({ path, digest: `sha256:${createHash("sha256").update(content).digest("hex")}` });
      return;
    }
    if (!stats.isDirectory()) throw new UnmeasurableDependency("dependency-not-a-file");
    if (depth >= MAX_DEPTH) throw new UnmeasurableDependency("dependency-over-budget");
    let real: string;
    let names: string[];
    try {
      real = realpathSync(path);
      names = readdirSync(path);
    } catch {
      throw new UnmeasurableDependency("dependency-unreadable");
    }
    if (walking.has(real)) throw new UnmeasurableDependency("dependency-cycle");
    walking.add(real);
    readings.push({ path, digest: "directory" });
    for (const name of [...names].sort()) visit(join(path, name), depth + 1);
    walking.delete(real);
  };
  for (const path of paths) visit(path, 0);
  return readings;
}
