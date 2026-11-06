/**
 * The measured dependencies of a recorded Claude agent answer (wb-413a; program mechanical-workflows-interop-2026-11-04,
 * slice PI-4, EAT-R017..EAT-R020). The Claude host's replay basis names the policy a call ran under: cwd, model pin,
 * permission mode, setting-source names, tools, roles, grants and principal (claude-host.ts). An answer also depends on
 * what that policy READS while the session runs, and this module holds the host's readings of three such dependencies:
 *
 *  - source: the workspace's Git HEAD commit and tree and the candidate digest over the index and every Git-visible
 *    file's bytes (tracked and untracked, ignored files excepted), so a dirty edit moves the reading as a commit does;
 *  - instructions: the bytes at every instruction location each enabled setting source loads
 *    (CLAUDE_INSTRUCTION_LOCATIONS, and the memory files of every ancestor directory, CLAUDE_ANCESTOR_MEMORY); the
 *    default settingSources [] loads none, so it reads none;
 *  - provider: the installed runtime artifact digest and the provider contract digest of the run's invocation identity
 *    (identity.ts), and the bytes of each enabled source's setting file (CLAUDE_SETTINGS_LOCATIONS).
 *
 * A reading is MEASURED, a domain-separated digest of what was read, or UNKNOWN, a fixed reason and no digest. An
 * unknown reading is never turned into a digest: two runs that could not measure a dependency would otherwise compare
 * equal on that absence and hand back a stale coding or verification answer. The host permits no settled-agent replay
 * while any reading is unknown (replayDependenciesMeasured), so "cannot measure" declines replay instead of matching.
 *
 * The readers read files only. The source reading takes the host's own Git readings as input (src/index.ts measures the
 * candidate and the HEAD), so no reader here starts a process.
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
  /** Git HEAD commit and tree plus the candidate digest of the index and every Git-visible file's bytes. */
  readonly source: ReplayDependency;
  /** The skill and system instruction files the enabled setting sources load. */
  readonly instructions: ReplayDependency;
  /** The installed runtime artifacts, the provider contracts and the enabled sources' setting files. */
  readonly provider: ReplayDependency;
}

/** The setting sources the Claude Agent SDK loads from the filesystem (Options.settingSources). */
export type ClaudeSettingSource = "user" | "project" | "local";

type SourceTable = Readonly<Record<ClaudeSettingSource, readonly string[]>>;

/**
 * Where each source's instruction files live, relative to the SDK's user config directory for "user"
 * (claudeUserConfigDir) and to the run's cwd for "project" and "local". A directory entry is read whole, recursively.
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

/** The memory files a source also loads from every ancestor directory of the cwd, up to the filesystem root. */
export const CLAUDE_ANCESTOR_MEMORY: SourceTable = Object.freeze({
  user: Object.freeze([]),
  project: Object.freeze(["CLAUDE.md", ".claude/CLAUDE.md"]),
  local: Object.freeze(["CLAUDE.local.md"]),
});

/** The setting file each source reads (model, environment, hooks, output style): the provider's settings. */
export const CLAUDE_SETTINGS_LOCATIONS: SourceTable = Object.freeze({
  user: Object.freeze(["settings.json"]),
  project: Object.freeze([".claude/settings.json"]),
  local: Object.freeze([".claude/settings.local.json"]),
});

/** The file readers' budget: a reading past it is unknown, never a digest of part of the files. */
export interface DependencyReadLimits {
  readonly files: number;
  readonly bytes: number;
}
export const DEPENDENCY_READ_LIMITS: DependencyReadLimits = Object.freeze({ files: 2_000, bytes: 32 * 1024 * 1024 });

const SOURCES: readonly ClaudeSettingSource[] = Object.freeze(["user", "project", "local"]);
const DIGEST = /^sha256:[0-9a-f]{64}$/;
/** Directory depth below one location past which a walk stops being a reading. */
const MAX_DEPTH = 32;

/** A reading of what the host read: the canonical JSON digest of `value` under its own domain. */
export function measuredDependency(domain: string, value: unknown): ReplayDependency {
  return Object.freeze({ state: "measured", digest: identityDigest(domain, value) });
}

/** A dependency the host could not read, by a fixed reason. */
export function unknownDependency(reason: string): ReplayDependency {
  return Object.freeze({ state: "unknown", reason });
}

/** Every reading measured, each with a well-formed digest: the only shape under which replay is permitted. */
export function replayDependenciesMeasured(dependencies: ClaudeReplayDependencies): boolean {
  return [dependencies.source, dependencies.instructions, dependencies.provider].every(
    reading => reading.state === "measured" && typeof reading.digest === "string" && DIGEST.test(reading.digest),
  );
}

/**
 * The source reading from the host's Git readings: HEAD's commit and tree (observedPackageHead) and the candidate
 * survey (workspaceCandidateBasis: the HEAD tree, the index and the bytes of every Git-visible file). Unknown when the
 * survey could not account for the workspace or HEAD could not be read.
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
 * The instruction reading: the bytes at every instruction location of each enabled source, in source order
 * (user, project, local), whatever order or repetition the run named them in.
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
  const paths: string[] = [];
  for (const source of enabled) {
    const base = source === "user" ? configDir : cwd;
    for (const location of CLAUDE_INSTRUCTION_LOCATIONS[source]) paths.push(join(base, location));
    for (const ancestor of ancestorsOf(cwd)) {
      for (const memory of CLAUDE_ANCESTOR_MEMORY[source]) paths.push(join(ancestor, memory));
    }
  }
  return readingOf(() => measuredDependency("claude-replay-instructions", { sources: [...enabled], files: readFiles(paths, limits) }));
}

/**
 * The provider reading: the run's installed runtime artifact digest and provider contract digest (an
 * InvocationSnapshot's), and the bytes of each enabled source's setting file.
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
 * The directory the SDK child reads its user configuration from: CLAUDE_CONFIG_DIR when set (the child inherits the
 * environment and resolves a relative value against its cwd), else <home>/.claude.
 */
export function claudeUserConfigDir(env: Readonly<Record<string, string | undefined>>, home: string, cwd: string): string {
  const configured = env.CLAUDE_CONFIG_DIR;
  return configured ? resolve(cwd, configured) : join(home, ".claude");
}

/** The enabled sources in canonical order, or undefined when one is not a source the SDK knows. */
function enabledSources(sources: readonly string[]): ClaudeSettingSource[] | undefined {
  if (!sources.every(source => (SOURCES as readonly string[]).includes(source))) return undefined;
  return SOURCES.filter(source => sources.includes(source));
}

/** Every proper ancestor of an absolute directory, nearest first, ending at the filesystem root. */
function ancestorsOf(directory: string): string[] {
  const ancestors: string[] = [];
  let current = directory;
  while (dirname(current) !== current) {
    current = dirname(current);
    ancestors.push(current);
  }
  return ancestors;
}

/** A dependency the walk could not read, by its fixed reason. */
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

interface FileReading {
  readonly path: string;
  /** sha256:<hex> of a regular file's bytes, "directory" for a directory, "absent" where nothing is. */
  readonly digest: string;
}

/**
 * Read every location, following symbolic links to what they name: a regular file by its bytes, a directory by every
 * entry below it in name order, a missing path as absent. Anything else, an unreadable entry, a directory cycle or a
 * walk past the budget makes the whole reading unmeasurable.
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
