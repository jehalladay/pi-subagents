/**
 * wb-413a [MWI-replay]: the readers that MEASURE three dependencies of a recorded Claude agent answer, beyond its call
 * payload and the host's policy basis (src/workbench/replay-dependencies.ts). Program mechanical-workflows-interop-2026-11-04,
 * slice PI-4, EAT-R017..EAT-R020 (ATOMIC-REQUIREMENTS.md@0b25e14e, pi-subagents master); the acceptance lines are quoted
 * in test/workbench-claude-replay-dependencies.test.ts, which judges the host's use of these readings.
 *
 * Each row here judges one reader over real files in scratch directories, or a pure path list. This suite claims what
 * its rows pin, and nothing wider (cut #5: the R-B646 claim set after its structural exit, R-B664, and the
 * setting-source-unrecognized claim set R-B673 binds):
 *  - the source reading (EAT-R017) composes the HEAD commit, the HEAD tree and the candidate digest it is handed and
 *    moves with each one alone (R-SRC-EQUAL, R-SRC-COMMIT/TREE/DIRTY); it is unknown by fixed reasons for a candidate
 *    not measured or empty and a HEAD missing or lacking its commit or tree (R-SRC-UNKNOWN, R-SRC-UNKNOWN-REASONS);
 *    which Git forms move the candidate is test/workbench-replay-dependencies-wiring.test.ts's claim;
 *  - instructionPaths (EAT-R018), for an absolute cwd in normal form, is written out for a three-level cwd, the
 *    filesystem root and no source (R-INS-PATHS), and derived from the cwd's own segments for a 2047-level cwd and cwds
 *    below the home directory, a scratch in the temp directory and the working directory (R-INS-PATHS-DEEP); the
 *    instruction reading moves with a file at each instruction location and at each memory file of the parent and the
 *    grandparent (R-INS-<source>, R-INS-PATHS-READ), of the fourth and fifth proper ancestors (R-INS-ANCESTOR-FAR) and
 *    at and above a Git work tree's root (R-INS-ANCESTOR-ABOVE-GIT); handed no source it names no path
 *    (R-INS-ISOLATION, R-INS-ISOLATION-ALL); a disabled source's files leave it alone, in any source order (R-INS-SCOPE,
 *    R-INS-SCOPE-ALL); a missing path reads as absent (R-INS-ABSENT); links are followed (R-INS-SYMLINK,
 *    R-INS-SYMLINK-FILE); a .claude that is a regular file reads as absent below it (R-INS-BELOW-FILE);
 *  - the provider reading (EAT-R019) moves with each handed digest alone (R-PRV-VERSION) and with each enabled source's
 *    setting file and no other source's (R-PRV-SETTINGS-<source>); it refuses a missing or malformed identity
 *    (R-PRV-UNKNOWN, R-PRV-IDENTITY); a .claude that is a regular file reads as absent below it (R-PRV-BELOW-FILE);
 *  - both file readers walk a directory location as R-WALK-* pin: the exact readings of one planted tree each
 *    (R-WALK-instructions-exact, R-WALK-provider-exact), dot-named entries, a directory reached first by its own name
 *    and a second time through one link that sorts after it, a config directory that is a regular file, and two links
 *    naming each other (R-WALK-<reader>-*);
 *  - an unmeasurable dependency (EAT-R020) is an UNKNOWN reading with a fixed reason and no digest, never an empty or
 *    stable digest standing in for one (the requirement's adversarial mutant), in the cases R-UNK-* pin for both file
 *    readers, budgets counted within one location and across locations and sources among them, each one-level case's
 *    plant read back from the filesystem as the form its row names (R-UNK-<reader>-<case>), and the unrecognized
 *    setting-source names managed, User, 'user ' and the empty name, each handed alone or before or after one known
 *    source (R-UNK-<reader>-source, R-UNK-<reader>-source-beside);
 *  - the table shapes, each tied to an anchor outside its own literals (R-INS-PLANTS-SHAPE, R-PRV-SETTINGS-SHAPE,
 *    R-WALK-SHAPE, R-UNK-CASES-SHAPE, R-UNK-READERS-SHAPE), R-UNK-CASES-SHAPE to every line of this bead's receipt
 *    that carries its label;
 *  - the helpers: the config directory (R-CONFIG-DIR, R-CONFIG-DIR-BLANK), the measured shape (R-MEASURED,
 *    R-MEASURED-SHAPES, R-READING-SHAPE), the default budget (R-BUDGET-TABLE) and the source names (R-SOURCES).
 * RESIDUALS (named, each with its pinned quiet row): R-UNLISTED-CONFIG-FILES R-Q-UNLISTED-CONFIG; R-IMPORTED-MEMORY
 * R-Q-IMPORTED-MEMORY; R-NESTED-MEMORY R-Q-NESTED-MEMORY; R-MANAGED-POLICY R-Q-MANAGED-POLICY.
 * NOT CLAIMED by this suite: entry names other than those its rows plant; a cwd string longer than Linux's 4096-byte
 * PATH_MAX holds, a relative cwd and one not in normal form; a socket or a block device below a location; the reason
 * of an unknown form at another depth than its row plants; an absolute CLAUDE_CONFIG_DIR not in normal form; which
 * reason a reading meeting two unknown conditions gives; an unrecognized setting-source name other than the four its
 * rows plant, and one handed beside two or more sources or beside another unrecognized name. NOT CLAIMED and routed to
 * wb-6b3z (R-B664, the structural exit of the R-B646 claim set; the child owns the fail-closed basis core): a named path
 * the process may not stat, and any read error no row plants; a link below a location naming a path below a regular
 * file; which reason a link back to a directory inside a location gives; whether a directory first reached through a
 * link, or through two links, is read again; a relative cwd or config directory handed with any sources but the user
 * source alone; a relative home.
 * The locations are written out literally below rather than read back from the module, so dropping one from the module's
 * table reds both the frozen table row and that location's own row; R-INS-PLANTS-SHAPE ties the plant rows back to the
 * module's tables, so dropping a plant row reds as well.
 */

import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { appendFileSync, chmodSync, existsSync, lstatSync, mkdirSync, readdirSync, readFileSync, realpathSync, rmSync, type Stats, statSync, symlinkSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, isAbsolute, join, resolve } from "node:path";
import type { SettingSource } from "@anthropic-ai/claude-agent-sdk";
import { afterEach, describe, expect, it } from "vitest";
import { identityDigest } from "../src/workbench/identity.js";
import {
  CLAUDE_ANCESTOR_MEMORY,
  CLAUDE_INSTRUCTION_LOCATIONS,
  CLAUDE_SETTINGS_LOCATIONS,
  type ClaudeSettingSource,
  claudeUserConfigDir,
  DEPENDENCY_READ_LIMITS,
  type DependencyReadLimits,
  instructionDependency,
  instructionPaths,
  measuredDependency,
  providerDependency,
  type ReplayDependency,
  replayDependenciesMeasured,
  sourceDependency,
  unknownDependency,
} from "../src/workbench/replay-dependencies.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard();

const scratches: string[] = [];
afterEach(() => {
  for (const dir of scratches.splice(0)) {
    chmodTree(dir);
    removeScratch(dir);
  }
});
/**
 * Undo every permission plant before removal, so the scratch always goes: owner access comes back on each directory and
 * regular file below `dir`, wherever a row planted it, and a symbolic link is never followed. (Cut #1 undid two fixed
 * paths under <scratch>/cwd, which the layout never plants, so a red unreadable row leaked a mode-000 directory: wb-413a
 * refusal #1 U6.)
 */
function chmodTree(dir: string): void {
  let stats: Stats;
  try {
    stats = lstatSync(dir);
  } catch {
    return;
  }
  if (stats.isDirectory()) {
    chmodSync(dir, 0o700);
    for (const name of readdirSync(dir)) chmodTree(join(dir, name));
  } else if (stats.isFile()) {
    chmodSync(dir, 0o600);
  }
}

interface Layout {
  /** <scratch>/repo/pkg: the run's cwd, two levels below the scratch so its ancestors include <scratch>/repo. */
  cwd: string;
  /** <scratch>/repo: an ancestor of the cwd. */
  parent: string;
  /** <scratch>: the cwd's ancestor two levels up, the scratch itself (the grandparent base of the plant rows). */
  grandparent: string;
  /** <scratch>/config: the SDK's user config directory (what ~/.claude or CLAUDE_CONFIG_DIR names). */
  config: string;
  root: string;
}
function layout(): Layout {
  const root = makeScratch("replay-dependency-readers-");
  scratches.push(root);
  const parent = join(root, "repo");
  const cwd = join(parent, "pkg");
  const config = join(root, "config");
  mkdirSync(cwd, { recursive: true });
  mkdirSync(config, { recursive: true });
  return { cwd, parent, grandparent: root, config, root };
}
function write(path: string, text: string): void {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, text);
}

const DIGEST = /^sha256:[0-9a-f]{64}$/;
const digestOf = (seed: string): string => `sha256:${createHash("sha256").update(seed).digest("hex")}`;
function digestFrom(reading: ReplayDependency): string {
  expect(reading.state).toBe("measured");
  if (reading.state !== "measured") throw new Error(`unmeasured reading: ${reading.reason}`);
  expect(reading.digest).toMatch(DIGEST);
  return reading.digest;
}
/** An unknown reading names a reason and carries no digest of any kind. */
function expectUnknown(reading: ReplayDependency): void {
  expect(reading.state).toBe("unknown");
  expect(reading).not.toHaveProperty("digest");
  if (reading.state === "unknown") expect(reading.reason).toMatch(/^[a-z][a-z-]*$/);
}
/** An unknown reading by exactly this fixed reason: the reading object is the reason alone. */
function expectUnknownBecause(reading: ReplayDependency, reason: string): void {
  expectUnknown(reading);
  expect(reading).toEqual({ state: "unknown", reason });
}

/** The module function a walk or unknown-reading table row runs: one of its two file readers. */
type FileReader = typeof instructionDependency | typeof providerDependency;
/**
 * The module's file readers, read from its source text rather than from this suite: each exported function whose body
 * calls readFiles, in source order (the anchor the walk and unknown-reading tables are tied to, outside their literals).
 */
function moduleFileReaders(): string[] {
  const source = readFileSync(new URL("../src/workbench/replay-dependencies.ts", import.meta.url), "utf8");
  return [...source.matchAll(/^export function (\w+)\([\s\S]*?^}$/gm)].filter(match => match[0].includes("readFiles(")).map(match => match[1] ?? "");
}
/**
 * The names each list of this bead's receipt gives, one list per receipt line carrying `label`, in receipt order: each
 * line read after the label up to the full stop and split at its commas (the anchor of the unknown-case table, outside
 * this suite's literals). Every such line is read, not only the last, so a line appended later cannot stand in for an
 * earlier one: the receipt is append-only, and a row tied to these lists reds when they disagree (refusal #4 F1, GT-05).
 */
function receiptLists(label: string): string[][] {
  const receipt = readFileSync(new URL("../docs/workbench/receipts/wb-413a.md", import.meta.url), "utf8");
  return receipt
    .split("\n")
    .filter(text => text.includes(label))
    .map(line => {
      const after = line.slice(line.indexOf(label) + label.length);
      return after.slice(0, after.indexOf(".")).split(",").map(name => name.trim()).filter(name => name !== "");
    });
}

describe("wb-413a source reading: the HEAD commit, the HEAD tree and the handed candidate digest (EAT-R017)", () => {
  const head = { commit: "c".repeat(40), tree: "t".repeat(40) };
  const candidate = { sourceBasis: digestOf("index + every Git-visible file, v1"), state: "measured" as const };

  it("R-SRC-EQUAL: equal readings give one measured digest", () => {
    expect(digestFrom(sourceDependency(head, candidate))).toBe(digestFrom(sourceDependency({ ...head }, { ...candidate })));
  });

  it("R-SRC-COMMIT, R-SRC-TREE, R-SRC-DIRTY: the digest moves with the commit alone, the tree alone and the candidate alone", () => {
    const base = digestFrom(sourceDependency(head, candidate));
    const commit = digestFrom(sourceDependency({ ...head, commit: "d".repeat(40) }, candidate));
    const tree = digestFrom(sourceDependency({ ...head, tree: "u".repeat(40) }, candidate));
    const dirty = digestFrom(sourceDependency(head, { ...candidate, sourceBasis: digestOf("index + every Git-visible file, v2") }));
    expect(new Set([base, commit, tree, dirty]).size).toBe(4);
  });

  it("R-SRC-UNKNOWN: an unmeasured candidate or an unreadable HEAD is an unknown reading, never a digest", () => {
    expectUnknown(sourceDependency(head, { sourceBasis: "unknown:git-unavailable", state: "unknown" }));
    expectUnknown(sourceDependency(undefined, candidate));
    expectUnknown(sourceDependency(undefined, { sourceBasis: "unknown:git-unavailable", state: "unknown" }));
  });

  it("R-SRC-UNKNOWN-REASONS: a candidate not measured or empty, and a HEAD missing or lacking its commit or its tree, are unknown by fixed reasons", () => {
    expectUnknownBecause(sourceDependency(head, { sourceBasis: "unknown:git-unavailable", state: "unknown" }), "source-candidate-unmeasured");
    expectUnknownBecause(sourceDependency(head, { sourceBasis: "", state: "measured" }), "source-candidate-unmeasured");
    expectUnknownBecause(sourceDependency(undefined, candidate), "source-head-unreadable");
    expectUnknownBecause(sourceDependency({ commit: "", tree: head.tree }, candidate), "source-head-unreadable");
    expectUnknownBecause(sourceDependency({ commit: head.commit, tree: "" }, candidate), "source-head-unreadable");
  });
});

describe("wb-413a instruction reading: the bytes at the instruction paths (EAT-R018)", () => {
  it("R-INS-TABLE: the instruction locations, written out (frozen shape of CLAUDE_INSTRUCTION_LOCATIONS and CLAUDE_ANCESTOR_MEMORY)", () => {
    expect(CLAUDE_INSTRUCTION_LOCATIONS).toEqual({
      user: ["CLAUDE.md", "skills", "agents", "commands", "output-styles", "rules"],
      project: ["CLAUDE.md", ".claude/CLAUDE.md", ".claude/skills", ".claude/agents", ".claude/commands", ".claude/output-styles", ".claude/rules"],
      local: ["CLAUDE.local.md"],
    });
    expect(CLAUDE_ANCESTOR_MEMORY).toEqual({ user: [], project: ["CLAUDE.md", ".claude/CLAUDE.md"], local: ["CLAUDE.local.md"] });
  });

  it("R-INS-ISOLATION: settingSources [] names no path, so four planted instruction files leave the reading alone", () => {
    const at = layout();
    const before = digestFrom(instructionDependency(at.cwd, [], at.config));
    write(join(at.cwd, "CLAUDE.md"), "project memory");
    write(join(at.cwd, ".claude", "skills", "review", "SKILL.md"), "project skill");
    write(join(at.config, "skills", "review", "SKILL.md"), "user skill");
    write(join(at.cwd, "CLAUDE.local.md"), "local memory");
    expect(digestFrom(instructionDependency(at.cwd, [], at.config))).toBe(before);
  });

  /**
   * [source, file planted (relative to its base), base]: every instruction location, one file each, and every ancestor
   * memory file at the parent and at the grandparent (two ancestor levels, so "every ancestor" is not the nearest alone).
   */
  const PLANTS: readonly (readonly ["user" | "project" | "local", string, "cwd" | "parent" | "grandparent" | "config"])[] = [
    ["project", "CLAUDE.md", "cwd"],
    ["project", ".claude/CLAUDE.md", "cwd"],
    ["project", ".claude/skills/review/SKILL.md", "cwd"],
    ["project", ".claude/agents/critic.md", "cwd"],
    ["project", ".claude/commands/ship.md", "cwd"],
    ["project", ".claude/output-styles/terse.md", "cwd"],
    ["project", ".claude/rules/style.md", "cwd"],
    ["project", "CLAUDE.md", "parent"],
    ["project", ".claude/CLAUDE.md", "parent"],
    ["user", "CLAUDE.md", "config"],
    ["user", "skills/review/SKILL.md", "config"],
    ["user", "agents/critic.md", "config"],
    ["user", "commands/ship.md", "config"],
    ["user", "output-styles/terse.md", "config"],
    ["user", "rules/style.md", "config"],
    ["local", "CLAUDE.local.md", "cwd"],
    ["local", "CLAUDE.local.md", "parent"],
    ["project", "CLAUDE.md", "grandparent"],
    ["project", ".claude/CLAUDE.md", "grandparent"],
    ["local", "CLAUDE.local.md", "grandparent"],
  ];

  for (const [source, relative, base] of PLANTS) {
    it(`R-INS-${source}: ${relative} under the ${base} moves the ${source} reading, and restoring its bytes restores the reading`, () => {
      const at = layout();
      const path = join(at[base], relative);
      write(path, "instruction bytes v1");
      const v1 = digestFrom(instructionDependency(at.cwd, [source], at.config));
      write(path, "instruction bytes v2");
      const v2 = digestFrom(instructionDependency(at.cwd, [source], at.config));
      write(path, "instruction bytes v1");
      const restored = digestFrom(instructionDependency(at.cwd, [source], at.config));
      rmSync(path);
      const absent = digestFrom(instructionDependency(at.cwd, [source], at.config));
      expect(v2).not.toBe(v1);
      expect(restored).toBe(v1);
      expect(absent).not.toBe(v1);
    });
  }

  it("R-INS-SCOPE: a disabled source's files leave the reading alone (a user skill under a project-only run)", () => {
    const at = layout();
    const before = digestFrom(instructionDependency(at.cwd, ["project"], at.config));
    write(join(at.config, "skills", "review", "SKILL.md"), "user skill");
    write(join(at.cwd, "CLAUDE.local.md"), "local memory");
    expect(digestFrom(instructionDependency(at.cwd, ["project"], at.config))).toBe(before);
    // ...and the order a run names its sources in is not a dependency of its own.
    expect(digestFrom(instructionDependency(at.cwd, ["user", "project"], at.config))).toBe(digestFrom(instructionDependency(at.cwd, ["project", "user", "project"], at.config)));
  });

  it("R-INS-SYMLINK: a user skill directory reached through a symbolic link is read as its target's bytes", () => {
    const at = layout();
    const target = join(at.root, "shared-skill", "SKILL.md");
    write(target, "shared skill v1");
    mkdirSync(join(at.config, "skills"), { recursive: true });
    symlinkSync(dirname(target), join(at.config, "skills", "shared"));
    const v1 = digestFrom(instructionDependency(at.cwd, ["user"], at.config));
    write(target, "shared skill v2");
    expect(digestFrom(instructionDependency(at.cwd, ["user"], at.config))).not.toBe(v1);
  });

  it("R-INS-UNKNOWN: a FIFO below the project skills location, a link two levels below the user skills location back to that location, a walk past an explicit budget of files or of bytes and the unrecognized source name managed, handed alone, each make the instruction reading unknown, never a partial or empty digest", () => {
    const fifo = layout();
    mkdirSync(join(fifo.cwd, ".claude", "skills"), { recursive: true });
    execFileSync("mkfifo", [join(fifo.cwd, ".claude", "skills", "pipe")]);
    expectUnknown(instructionDependency(fifo.cwd, ["project"], fifo.config));

    const cycle = layout();
    mkdirSync(join(cycle.config, "skills", "loop"), { recursive: true });
    symlinkSync(join(cycle.config, "skills"), join(cycle.config, "skills", "loop", "again"));
    expectUnknown(instructionDependency(cycle.cwd, ["user"], cycle.config));

    const over = layout();
    write(join(over.cwd, ".claude", "skills", "a", "SKILL.md"), "a");
    write(join(over.cwd, ".claude", "skills", "b", "SKILL.md"), "b");
    digestFrom(instructionDependency(over.cwd, ["project"], over.config, { files: 2, bytes: 1024 }));
    expectUnknown(instructionDependency(over.cwd, ["project"], over.config, { files: 1, bytes: 1024 }));
    expectUnknown(instructionDependency(over.cwd, ["project"], over.config, { files: 2, bytes: 1 }));

    expectUnknown(instructionDependency(over.cwd, ["managed"], over.config));
  });

  it("R-INS-UNREADABLE: a skill directory or file the process may not read is an unknown reading", () => {
    // Root reads through any mode, so the plant cannot make the entry unreadable there: the row then judges nothing.
    if (process.getuid?.() === 0) {
      expect(process.getuid?.()).toBe(0);
      return;
    }
    const at = layout();
    write(join(at.cwd, ".claude", "skills", "locked", "SKILL.md"), "locked");
    chmodSync(join(at.cwd, ".claude", "skills", "locked"), 0o000);
    expectUnknown(instructionDependency(at.cwd, ["project"], at.config));
    chmodSync(join(at.cwd, ".claude", "skills", "locked"), 0o700);
    write(join(at.cwd, ".claude", "skills", "locked.md"), "locked file");
    chmodSync(join(at.cwd, ".claude", "skills", "locked.md"), 0o000);
    expectUnknown(instructionDependency(at.cwd, ["project"], at.config));
  });

  it("R-INS-PLANTS-SHAPE: the plant rows, written out (frozen shape), plant every location of the module's tables once at its base and every ancestor memory file once at the parent and once at the grandparent", () => {
    expect(PLANTS.map(([source, relative, base]) => `${source}|${base}|${relative}`)).toEqual([
      "project|cwd|CLAUDE.md",
      "project|cwd|.claude/CLAUDE.md",
      "project|cwd|.claude/skills/review/SKILL.md",
      "project|cwd|.claude/agents/critic.md",
      "project|cwd|.claude/commands/ship.md",
      "project|cwd|.claude/output-styles/terse.md",
      "project|cwd|.claude/rules/style.md",
      "project|parent|CLAUDE.md",
      "project|parent|.claude/CLAUDE.md",
      "user|config|CLAUDE.md",
      "user|config|skills/review/SKILL.md",
      "user|config|agents/critic.md",
      "user|config|commands/ship.md",
      "user|config|output-styles/terse.md",
      "user|config|rules/style.md",
      "local|cwd|CLAUDE.local.md",
      "local|parent|CLAUDE.local.md",
      "project|grandparent|CLAUDE.md",
      "project|grandparent|.claude/CLAUDE.md",
      "local|grandparent|CLAUDE.local.md",
    ]);
    // Anchored outside the literals above: the module's own tables say which plant rows must exist, and how many.
    const bases = { user: "config", project: "cwd", local: "cwd" } as const;
    let expected = 0;
    for (const source of ["user", "project", "local"] as const) {
      for (const location of CLAUDE_INSTRUCTION_LOCATIONS[source]) {
        expected += 1;
        expect(PLANTS.filter(([s, relative, base]) => s === source && base === bases[source] && (relative === location || relative.startsWith(`${location}/`))), `${source} ${location}`).toHaveLength(1);
      }
      for (const memory of CLAUDE_ANCESTOR_MEMORY[source]) {
        for (const ancestor of ["parent", "grandparent"] as const) {
          expected += 1;
          expect(PLANTS.filter(([s, relative, base]) => s === source && base === ancestor && relative === memory), `${source} ${memory} at the ${ancestor}`).toHaveLength(1);
        }
      }
    }
    expect(PLANTS).toHaveLength(expected);
  });

  it("R-INS-PATHS: written out for a three-level cwd under every source, instructionPaths names each enabled source's locations under its base, then its memory files in each of the cwd's three proper ancestors and the filesystem root, nearest first; for the filesystem root as the cwd, and for no source, it is written out too", () => {
    expect(instructionPaths("/work/repo/pkg", ["local", "project", "user", "project"], "/home/operator/.claude")).toEqual([
      "/home/operator/.claude/CLAUDE.md",
      "/home/operator/.claude/skills",
      "/home/operator/.claude/agents",
      "/home/operator/.claude/commands",
      "/home/operator/.claude/output-styles",
      "/home/operator/.claude/rules",
      "/work/repo/pkg/CLAUDE.md",
      "/work/repo/pkg/.claude/CLAUDE.md",
      "/work/repo/pkg/.claude/skills",
      "/work/repo/pkg/.claude/agents",
      "/work/repo/pkg/.claude/commands",
      "/work/repo/pkg/.claude/output-styles",
      "/work/repo/pkg/.claude/rules",
      "/work/repo/CLAUDE.md",
      "/work/repo/.claude/CLAUDE.md",
      "/work/CLAUDE.md",
      "/work/.claude/CLAUDE.md",
      "/CLAUDE.md",
      "/.claude/CLAUDE.md",
      "/work/repo/pkg/CLAUDE.local.md",
      "/work/repo/CLAUDE.local.md",
      "/work/CLAUDE.local.md",
      "/CLAUDE.local.md",
    ]);
    // The filesystem root has no proper ancestor, and no enabled source names no path at all.
    expect(instructionPaths("/", ["project"], "/home/operator/.claude")).toEqual([
      "/CLAUDE.md",
      "/.claude/CLAUDE.md",
      "/.claude/skills",
      "/.claude/agents",
      "/.claude/commands",
      "/.claude/output-styles",
      "/.claude/rules",
    ]);
    expect(instructionPaths("/work/repo/pkg", [], "/home/operator/.claude")).toEqual([]);
  });

  it("R-INS-PATHS-READ: a file at each path instructionPaths names inside the scratch moves that source's reading: 6 user, 11 project and 3 local paths", () => {
    const counts: Record<string, number> = {};
    for (const source of ["user", "project", "local"] as const) {
      const at = layout();
      const paths = instructionPaths(at.cwd, [source], at.config).filter(path => path.startsWith(`${at.root}/`));
      counts[source] = paths.length;
      for (const path of paths) {
        write(path, "path bytes v1");
        const v1 = digestFrom(instructionDependency(at.cwd, [source], at.config));
        write(path, "path bytes v2");
        expect(digestFrom(instructionDependency(at.cwd, [source], at.config)), path).not.toBe(v1);
        rmSync(path);
      }
    }
    // user: its six locations; project: its seven locations and two memory files at each of the two ancestors inside
    // the scratch (the parent and the grandparent); local: its one location and one memory file at each of them.
    expect(counts).toEqual({ user: 6, project: 11, local: 3 });
  });

  it("R-INS-ISOLATION-ALL: with no source enabled no path is named, so a file at every plant location leaves the reading alone", () => {
    const at = layout();
    expect(instructionPaths(at.cwd, [], at.config)).toEqual([]);
    const before = digestFrom(instructionDependency(at.cwd, [], at.config));
    for (const [, relative, base] of PLANTS) write(join(at[base], relative), "planted under no source");
    expect(digestFrom(instructionDependency(at.cwd, [], at.config))).toBe(before);
  });

  it("R-INS-SCOPE-ALL: a file at every plant location of the other sources leaves each source's reading alone", () => {
    for (const source of ["user", "project", "local"] as const) {
      const at = layout();
      const before = digestFrom(instructionDependency(at.cwd, [source], at.config));
      for (const [other, relative, base] of PLANTS) if (other !== source) write(join(at[base], relative), "another source's bytes");
      expect(digestFrom(instructionDependency(at.cwd, [source], at.config)), source).toBe(before);
    }
  });

  it("R-INS-ABSENT: a missing path reads as absent, unlike an empty file at the same path, and removing the file restores the reading", () => {
    const at = layout();
    const memory = join(at.config, "CLAUDE.md");
    const absent = digestFrom(instructionDependency(at.cwd, ["user"], at.config));
    write(memory, "");
    const empty = digestFrom(instructionDependency(at.cwd, ["user"], at.config));
    write(memory, "bytes");
    const full = digestFrom(instructionDependency(at.cwd, ["user"], at.config));
    expect(new Set([absent, empty, full]).size).toBe(3);
    rmSync(memory);
    expect(digestFrom(instructionDependency(at.cwd, ["user"], at.config))).toBe(absent);
  });

  it("R-INS-SYMLINK-FILE: a memory file reached through a symbolic link is read as its target's bytes", () => {
    const at = layout();
    const target = join(at.root, "shared", "memory.md");
    write(target, "shared memory v1");
    symlinkSync(target, join(at.config, "CLAUDE.md"));
    const v1 = digestFrom(instructionDependency(at.cwd, ["user"], at.config));
    write(target, "shared memory v2");
    expect(digestFrom(instructionDependency(at.cwd, ["user"], at.config))).not.toBe(v1);
  });

  it("R-INS-PATHS-DEEP: for a 2047-level cwd (the deepest one-letter path PATH_MAX holds) and for cwds below the home directory, a scratch in the temp directory and the working directory, the project and local memory paths follow the locations in each proper ancestor of the cwd, nearest first, ending at the filesystem root, as the cwd's own segments spell them", () => {
    // The oracle spells each ancestor from the cwd's own segments, never through node:path.
    const ancestors = (cwd: string): string[] => {
      const segments = cwd.split("/").filter(Boolean);
      return segments.map((_, k) => `/${segments.slice(0, segments.length - 1 - k).join("/")}`);
    };
    const under = (directory: string, name: string): string => (directory === "/" ? `/${name}` : `${directory}/${name}`);
    const config = "/home/operator/.claude";
    const deepest = `/${Array.from({ length: 2047 }, () => "a").join("/")}`;
    expect(deepest).toHaveLength(4094);
    // A scratch is a child of the temp directory, so a cwd below one has the temp directory among its ancestors.
    for (const cwd of [deepest, resolve(homedir(), "work", "pkg"), join(layout().root, "work", "pkg"), process.cwd(), "/x"]) {
      const label = cwd.slice(0, 80);
      expect(ancestors(cwd).at(-1), label).toBe("/");
      expect(instructionPaths(cwd, ["project"], config), label).toEqual([
        ...["CLAUDE.md", ".claude/CLAUDE.md", ".claude/skills", ".claude/agents", ".claude/commands", ".claude/output-styles", ".claude/rules"].map(location => under(cwd, location)),
        ...ancestors(cwd).flatMap(ancestor => [under(ancestor, "CLAUDE.md"), under(ancestor, ".claude/CLAUDE.md")]),
      ]);
      expect(instructionPaths(cwd, ["local"], config), label).toEqual([under(cwd, "CLAUDE.local.md"), ...ancestors(cwd).map(ancestor => under(ancestor, "CLAUDE.local.md"))]);
      expect(instructionPaths(cwd, ["user"], config), label).toEqual(["CLAUDE.md", "skills", "agents", "commands", "output-styles", "rules"].map(location => under(config, location)));
    }
    // An explicit timeout, never a change to what the row asserts: the 2047-level cwd's oracle outran vitest's 5000 ms
    // default in 36 of 78 gate member runs at load1 121-235 (refusal #4 finding F2).
  }, 60_000);

  it("R-INS-ANCESTOR-FAR: a project CLAUDE.md and a local CLAUDE.local.md at the cwd's fourth proper ancestor, and a project .claude/CLAUDE.md and a local CLAUDE.local.md at its fifth, each move that source's reading", () => {
    const at = layout();
    // cwd = <scratch>/a/b/c/d/e: its fourth proper ancestor is <scratch>/a and its fifth is <scratch>.
    const cwd = join(at.root, "a", "b", "c", "d", "e");
    mkdirSync(cwd, { recursive: true });
    const plants: readonly (readonly [ClaudeSettingSource, string])[] = [
      ["project", join(at.root, "a", "CLAUDE.md")],
      ["local", join(at.root, "a", "CLAUDE.local.md")],
      ["project", join(at.root, ".claude", "CLAUDE.md")],
      ["local", join(at.root, "CLAUDE.local.md")],
    ];
    for (const [source, path] of plants) {
      write(path, "far ancestor v1");
      const v1 = digestFrom(instructionDependency(cwd, [source], at.config));
      write(path, "far ancestor v2");
      expect(digestFrom(instructionDependency(cwd, [source], at.config)), path).not.toBe(v1);
      rmSync(path);
    }
  });

  it("R-INS-ANCESTOR-ABOVE-GIT: for a cwd inside a Git work tree, a project CLAUDE.md at the work tree's root and one in the directory above it each move the reading", () => {
    const at = layout();
    const repo = join(at.root, "outer", "repo");
    const cwd = join(repo, "pkg");
    mkdirSync(cwd, { recursive: true });
    execFileSync("git", ["init", "-q", repo]);
    for (const memory of [join(repo, "CLAUDE.md"), join(at.root, "outer", "CLAUDE.md")]) {
      write(memory, "memory above the cwd v1");
      const v1 = digestFrom(instructionDependency(cwd, ["project"], at.config));
      write(memory, "memory above the cwd v2");
      expect(digestFrom(instructionDependency(cwd, ["project"], at.config)), memory).not.toBe(v1);
      rmSync(memory);
    }
  });

  it("R-INS-BELOW-FILE: a .claude that is a regular file, at the cwd or at its parent, leaves the project reading measured and equal to the reading with no .claude there (each path below it reads as absent)", () => {
    const at = layout();
    const absent = digestFrom(instructionDependency(at.cwd, ["project"], at.config));
    for (const base of [at.cwd, at.parent]) {
      writeFileSync(join(base, ".claude"), "a file, not a directory");
      expect(digestFrom(instructionDependency(at.cwd, ["project"], at.config)), base).toBe(absent);
      rmSync(join(base, ".claude"));
    }
  });

  it("R-SOURCES: the readers know exactly the SDK's setting-source names, user, project and local, and each table keys those alone", () => {
    const sdk: readonly SettingSource[] = ["user", "project", "local"];
    // Both assignments typecheck only while ClaudeSettingSource and the SDK's SettingSource are the same three names.
    const readers: readonly ClaudeSettingSource[] = sdk;
    const back: readonly SettingSource[] = readers;
    for (const table of [CLAUDE_INSTRUCTION_LOCATIONS, CLAUDE_ANCESTOR_MEMORY, CLAUDE_SETTINGS_LOCATIONS]) expect(Object.keys(table)).toEqual([...back]);
  });
});

describe("wb-413a provider reading: the handed identity's two digests and the setting files (EAT-R019)", () => {
  const identity = { runtimeArtifactDigest: digestOf("installed SDK artifacts v1"), providerContractDigest: digestOf("provider contracts v1") };

  it("R-PRV-TABLE: the setting file of each source, written out (frozen shape of CLAUDE_SETTINGS_LOCATIONS)", () => {
    expect(CLAUDE_SETTINGS_LOCATIONS).toEqual({ user: ["settings.json"], project: [".claude/settings.json"], local: [".claude/settings.local.json"] });
  });

  it("R-PRV-VERSION: the digest moves with the handed runtime artifact digest alone and with the handed provider contract digest alone", () => {
    const at = layout();
    const base = digestFrom(providerDependency(identity, at.cwd, [], at.config));
    expect(digestFrom(providerDependency({ ...identity }, at.cwd, [], at.config))).toBe(base);
    const runtime = digestFrom(providerDependency({ ...identity, runtimeArtifactDigest: digestOf("installed SDK artifacts v2") }, at.cwd, [], at.config));
    const contracts = digestFrom(providerDependency({ ...identity, providerContractDigest: digestOf("provider contracts v2") }, at.cwd, [], at.config));
    expect(new Set([base, runtime, contracts]).size).toBe(3);
  });

  const SETTINGS: readonly (readonly ["user" | "project" | "local", string, "cwd" | "config"])[] = [
    ["user", "settings.json", "config"],
    ["project", ".claude/settings.json", "cwd"],
    ["local", ".claude/settings.local.json", "cwd"],
  ];
  for (const [source, relative, base] of SETTINGS) {
    it(`R-PRV-SETTINGS-${source}: ${relative} moves the ${source} provider reading and no other source's`, () => {
      const at = layout();
      const path = join(at[base], relative);
      write(path, '{"model":"claude-opus-5-5"}');
      const v1 = digestFrom(providerDependency(identity, at.cwd, [source], at.config));
      const others = (["user", "project", "local"] as const).filter(other => other !== source);
      const otherV1 = digestFrom(providerDependency(identity, at.cwd, others, at.config));
      write(path, '{"model":"claude-haiku-5-5"}');
      expect(digestFrom(providerDependency(identity, at.cwd, [source], at.config))).not.toBe(v1);
      expect(digestFrom(providerDependency(identity, at.cwd, others, at.config))).toBe(otherV1);
    });
  }

  it("R-PRV-SETTINGS-SHAPE: the setting-file rows, written out (frozen shape), plant every setting file of CLAUDE_SETTINGS_LOCATIONS once, at its source's base", () => {
    expect(SETTINGS.map(([source, relative, base]) => `${source}|${base}|${relative}`)).toEqual(["user|config|settings.json", "project|cwd|.claude/settings.json", "local|cwd|.claude/settings.local.json"]);
    // Anchored outside the literal above: the module's own table says which setting rows must exist, and how many.
    let expected = 0;
    for (const [source, locations] of Object.entries(CLAUDE_SETTINGS_LOCATIONS)) {
      for (const location of locations) {
        expected += 1;
        expect(SETTINGS.filter(([s, relative, base]) => s === source && relative === location && base === (source === "user" ? "config" : "cwd")), `${source} ${location}`).toHaveLength(1);
      }
    }
    expect(SETTINGS).toHaveLength(expected);
  });

  it("R-PRV-UNKNOWN: no invocation identity, an empty or bare-prefix digest, or a FIFO at the user setting file is an unknown reading", () => {
    const at = layout();
    expectUnknown(providerDependency(undefined, at.cwd, [], at.config));
    expectUnknown(providerDependency({ ...identity, runtimeArtifactDigest: "" }, at.cwd, [], at.config));
    expectUnknown(providerDependency({ ...identity, providerContractDigest: "sha256:" }, at.cwd, [], at.config));
    execFileSync("mkfifo", [join(at.config, "settings.json")]);
    expectUnknown(providerDependency(identity, at.cwd, ["user"], at.config));
    // The same pipe under a disabled source is never opened, so it leaves the reading measured.
    digestFrom(providerDependency(identity, at.cwd, ["project"], at.config));
  });

  it("R-PRV-IDENTITY: no identity, or either digest not sha256: with exactly 64 lowercase hex digits, is unknown by one fixed reason", () => {
    const at = layout();
    const hex = "a".repeat(64);
    expectUnknownBecause(providerDependency(undefined, at.cwd, [], at.config), "provider-identity-unmeasured");
    for (const bad of ["", "sha256:", `sha256:${hex.slice(1)}`, `sha256:${hex}0`, `SHA256:${hex}`, `sha256:${hex.toUpperCase()}`, hex]) {
      expectUnknownBecause(providerDependency({ ...identity, runtimeArtifactDigest: bad }, at.cwd, [], at.config), "provider-identity-unmeasured");
      expectUnknownBecause(providerDependency({ ...identity, providerContractDigest: bad }, at.cwd, [], at.config), "provider-identity-unmeasured");
    }
  });

  it("R-PRV-BELOW-FILE: a .claude that is a regular file at the cwd leaves the project and the local provider readings measured and equal to the readings with no .claude there (each setting path below it reads as absent)", () => {
    const at = layout();
    const absent = (["project", "local"] as const).map(source => digestFrom(providerDependency(identity, at.cwd, [source], at.config)));
    writeFileSync(join(at.cwd, ".claude"), "a file, not a directory");
    expect((["project", "local"] as const).map(source => digestFrom(providerDependency(identity, at.cwd, [source], at.config)))).toEqual(absent);
  });
});

describe("wb-413a walks of both file readers below a directory location (EAT-R018, EAT-R019)", () => {
  const identity = { runtimeArtifactDigest: digestOf("installed SDK artifacts v1"), providerContractDigest: digestOf("provider contracts v1") };
  type Read = (at: Layout, sources?: readonly string[]) => ReplayDependency;
  /** [reader, the location it reads under the user source (below the config directory), a reading of it, its module reader]. */
  const WALKERS: readonly (readonly ["instructions" | "provider", string, Read, FileReader])[] = [
    ["instructions", "skills", (at, sources = ["user"]) => instructionDependency(at.cwd, sources, at.config), instructionDependency],
    ["provider", "settings.json", (at, sources = ["user"]) => providerDependency(identity, at.cwd, sources, at.config), providerDependency],
  ];
  /** One path written as v1, then as v2, then as v1 again: the reading moves and comes back. */
  function expectMovesAndRestores(at: Layout, read: Read, path: string): void {
    write(path, "walked bytes v1");
    const v1 = digestFrom(read(at));
    write(path, "walked bytes v2");
    expect(digestFrom(read(at)), path).not.toBe(v1);
    write(path, "walked bytes v1");
    expect(digestFrom(read(at)), path).toBe(v1);
  }

  for (const [reader, location, read] of WALKERS) {
    it(`R-WALK-${reader}-dotnames: below the ${location} location, a dot-named file one level down and two levels down, a file in a dot-named directory and a dot-named file in it each move the ${reader} reading, and restoring its bytes restores it`, () => {
      const at = layout();
      const dir = join(at.config, location);
      for (const relative of [".index.md", "review/.notes.md", ".drafts/plan.md", ".drafts/.hidden.md"]) expectMovesAndRestores(at, read, join(dir, relative));
    });

    it(`R-WALK-${reader}-diamond: below the ${location} location, a directory reached first by its own name and a second time through one link that sorts after it and is not below it is read again: the ${reader} reading is measured, moves with that directory's bytes, and moves when the link goes`, () => {
      const at = layout();
      const dir = join(at.config, location);
      write(join(dir, "a", "entry.md"), "shared entry v1");
      symlinkSync(join(dir, "a"), join(dir, "b"));
      const both = digestFrom(read(at));
      write(join(dir, "a", "entry.md"), "shared entry v2");
      expect(digestFrom(read(at))).not.toBe(both);
      write(join(dir, "a", "entry.md"), "shared entry v1");
      expect(digestFrom(read(at))).toBe(both);
      rmSync(join(dir, "b"));
      expect(digestFrom(read(at))).not.toBe(both);
    });

    it(`R-WALK-${reader}-below-file: a config directory that is a regular file leaves the ${reader} reading measured and equal to the reading with no config directory (each path below it reads as absent)`, () => {
      const at = layout();
      rmSync(at.config, { recursive: true });
      const absent = digestFrom(read(at));
      writeFileSync(at.config, "a file, not a directory");
      expect(digestFrom(read(at))).toBe(absent);
    });

    it(`R-WALK-${reader}-symlink-loop: below the ${location} location, two symbolic links naming each other make the ${reader} reading unknown (dependency-unreadable)`, () => {
      const at = layout();
      const dir = join(at.config, location);
      mkdirSync(dir, { recursive: true });
      digestFrom(read(at));
      symlinkSync(join(dir, "loop-b"), join(dir, "loop-a"));
      symlinkSync(join(dir, "loop-a"), join(dir, "loop-b"));
      expectUnknownBecause(read(at), "dependency-unreadable");
    });
  }

  it("R-WALK-SHAPE: the walk rows' readers, written out (frozen shape), are the module's file readers as its source text names them (each exported function that calls readFiles), one walker each", () => {
    expect(WALKERS.map(([reader, location, , fileReader]) => `${reader}|${location}|${fileReader.name}`)).toEqual(["instructions|skills|instructionDependency", "provider|settings.json|providerDependency"]);
    // Anchored outside the literal above: the module's source text names its file readers.
    expect(WALKERS.map(([, , , fileReader]) => fileReader.name)).toEqual(moduleFileReaders());
  });

  /** A file reading as the module records it: the path and the sha256 of the bytes planted there. */
  const file = (path: string, text: string): { path: string; digest: string } => ({ path, digest: digestOf(text) });
  const mark = (path: string, digest: "directory" | "absent"): { path: string; digest: string } => ({ path, digest });

  it("R-WALK-instructions-exact: the user instruction reading of a planted config directory is identityDigest of exactly the readings written out here: each named path in order; a directory as a mark, then its entries in UTF-16 code-unit name order, the eighteen planted names among them (dot-named files and directories, .git, node_modules, .DS_Store, a trailing tilde, a space, upper case, no extension, .json, a Latin-1 name, and a supplementary-plane and a fullwidth name that byte order would swap); a link to a directory inside or outside the location followed to its entries; a dangling link and a missing location as absent; and a location that is a regular file by its bytes", () => {
    const at = layout();
    const config = at.config;
    const skills = join(config, "skills");
    const resume = `r${String.fromCodePoint(0xe9)}sum${String.fromCodePoint(0xe9)}.md`;
    // A supplementary-plane name and a fullwidth name: UTF-16 code-unit order puts the first (a surrogate pair, 0xD83D)
    // before the second (0xFF21), while byte order (strcmp over UTF-8, the order the listing comes back in here) puts
    // the second (0xEF) before the first (0xF0), so this pair tells the two orders apart.
    const supplementary = `${String.fromCodePoint(0x1f600)}.md`;
    const fullwidth = `${String.fromCodePoint(0xff21)}.md`;
    // Planted out of name order, so a walk in listing order would not happen to match.
    write(join(skills, "with space.md"), "space");
    write(join(skills, "review", "SKILL.md"), "skill");
    write(join(skills, "review", ".notes.md"), "notes");
    write(join(skills, "a", "entry.md"), "entry");
    symlinkSync(join(skills, "a"), join(skills, "b"));
    write(join(skills, ".index.md"), "index");
    write(join(skills, "UPPER.MD"), "upper");
    write(join(skills, "noext"), "noext");
    write(join(skills, "data.json"), "{}");
    write(join(skills, ".drafts", "plan.md"), "plan");
    write(join(skills, "notes~"), "backup");
    write(join(skills, resume), "cv");
    write(join(skills, "node_modules", "x.js"), "x");
    write(join(skills, ".git", "HEAD"), "ref: main");
    write(join(skills, ".DS_Store"), "ds");
    write(join(skills, fullwidth), "fullwidth");
    write(join(skills, supplementary), "supplementary");
    symlinkSync(join(at.root, "nowhere"), join(skills, "dangling"));
    write(join(at.root, "shared-skill", "SKILL.md"), "shared");
    symlinkSync(join(at.root, "shared-skill"), join(skills, "shared"));
    write(join(config, "CLAUDE.md"), "memory");
    write(join(config, "commands"), "commands as a file");
    mkdirSync(join(config, "rules"));
    const files = [
      file(join(config, "CLAUDE.md"), "memory"),
      mark(skills, "directory"),
      file(join(skills, ".DS_Store"), "ds"),
      mark(join(skills, ".drafts"), "directory"),
      file(join(skills, ".drafts", "plan.md"), "plan"),
      mark(join(skills, ".git"), "directory"),
      file(join(skills, ".git", "HEAD"), "ref: main"),
      file(join(skills, ".index.md"), "index"),
      file(join(skills, "UPPER.MD"), "upper"),
      mark(join(skills, "a"), "directory"),
      file(join(skills, "a", "entry.md"), "entry"),
      mark(join(skills, "b"), "directory"),
      file(join(skills, "b", "entry.md"), "entry"),
      mark(join(skills, "dangling"), "absent"),
      file(join(skills, "data.json"), "{}"),
      mark(join(skills, "node_modules"), "directory"),
      file(join(skills, "node_modules", "x.js"), "x"),
      file(join(skills, "noext"), "noext"),
      file(join(skills, "notes~"), "backup"),
      mark(join(skills, "review"), "directory"),
      file(join(skills, "review", ".notes.md"), "notes"),
      file(join(skills, "review", "SKILL.md"), "skill"),
      file(join(skills, resume), "cv"),
      mark(join(skills, "shared"), "directory"),
      file(join(skills, "shared", "SKILL.md"), "shared"),
      file(join(skills, "with space.md"), "space"),
      file(join(skills, supplementary), "supplementary"),
      file(join(skills, fullwidth), "fullwidth"),
      mark(join(config, "agents"), "absent"),
      file(join(config, "commands"), "commands as a file"),
      mark(join(config, "output-styles"), "absent"),
      mark(join(config, "rules"), "directory"),
    ];
    expect(instructionDependency(at.cwd, ["user"], config)).toEqual({ state: "measured", digest: identityDigest("claude-replay-instructions", { sources: ["user"], files }) });
  });

  it("R-WALK-provider-exact: the provider reading under the local, user and project sources (named in that order) is identityDigest of the two handed digests, the sources in source order and exactly the setting readings written out here: the user file by its bytes, the missing project file as absent, and a local setting path that is a directory as a mark and then its entries in name order", () => {
    const at = layout();
    const local = join(at.cwd, ".claude", "settings.local.json");
    write(join(at.config, "settings.json"), '{"model":"claude-opus-5-5"}');
    write(join(local, "base.json"), "{}");
    write(join(local, ".override.json"), '{"x":1}');
    const settings = [
      file(join(at.config, "settings.json"), '{"model":"claude-opus-5-5"}'),
      mark(join(at.cwd, ".claude", "settings.json"), "absent"),
      mark(local, "directory"),
      file(join(local, ".override.json"), '{"x":1}'),
      file(join(local, "base.json"), "{}"),
    ];
    expect(providerDependency(identity, at.cwd, ["local", "user", "project"], at.config)).toEqual({
      state: "measured",
      digest: identityDigest("claude-replay-provider", {
        runtimeArtifacts: identity.runtimeArtifactDigest,
        providerContracts: identity.providerContractDigest,
        sources: ["user", "project", "local"],
        settings,
      }),
    });
  });
});

describe("wb-413a unknown readings of both file readers, by fixed reasons (EAT-R020)", () => {
  const identity = { runtimeArtifactDigest: digestOf("installed SDK artifacts v1"), providerContractDigest: digestOf("provider contracts v1") };
  type Read = (at: Layout, sources?: readonly string[], limits?: DependencyReadLimits) => ReplayDependency;
  /** [reader, the location it reads under the user source (below the config directory), a reading of it, its module reader]. */
  const READERS: readonly (readonly ["instructions" | "provider", string, Read, FileReader])[] = [
    ["instructions", "skills", (at, sources = ["user"], limits) => instructionDependency(at.cwd, sources, at.config, limits), instructionDependency],
    ["provider", "settings.json", (at, sources = ["user"], limits) => providerDependency(identity, at.cwd, sources, at.config, limits), providerDependency],
  ];
  /** The plant of each unknown case, one level below the location directory `dir`; each is named, so the frozen shape of CASES holds it. */
  function plantFifo(dir: string): void {
    execFileSync("mkfifo", [join(dir, "pipe")]);
  }
  function plantDeviceLink(dir: string): void {
    symlinkSync("/dev/null", join(dir, "null"));
  }
  function plantSelfLink(dir: string): void {
    symlinkSync(dir, join(dir, "again"));
  }
  function plantLockedDirectory(dir: string): void {
    write(join(dir, "locked", "entry.md"), "locked");
    chmodSync(join(dir, "locked"), 0o000);
  }
  function plantLockedFile(dir: string): void {
    write(join(dir, "locked.md"), "locked");
    chmodSync(join(dir, "locked.md"), 0o000);
  }
  /** Listable but not searchable (mode r--): the walk names the entry inside it, and statting that entry is refused. */
  function plantListableDirectory(dir: string): void {
    write(join(dir, "dark", "entry.md"), "dark");
    chmodSync(join(dir, "dark"), 0o400);
  }
  /**
   * What a plant left one level below the location `dir`, read back from the filesystem in the words of the CASES table
   * (refusal #4 F1: the frozen shape holds each plant's name, and this holds what its body plants): the one entry `dir`
   * holds, by lstat; a link by what it names; a file or a directory by its permission bits.
   */
  function plantedForm(dir: string): string {
    const entries = readdirSync(dir);
    if (entries.length !== 1) return `${entries.length} entries`;
    const path = join(dir, entries[0] as string);
    const entry = lstatSync(path);
    const mode = entry.mode & 0o777;
    if (entry.isFIFO()) return "a FIFO";
    if (entry.isSymbolicLink()) {
      const target = statSync(path);
      if (target.isCharacterDevice()) return "a link to a character device";
      if (target.isDirectory() && realpathSync(path) === realpathSync(dir)) return "a link back to the location's own directory";
      return "a link to another entry";
    }
    if (entry.isFile()) return mode === 0 ? "a file the process may not read" : `a file of mode ${mode.toString(8)}`;
    if (entry.isDirectory() && mode === 0) return "a directory the process may not read";
    if (entry.isDirectory() && mode === 0o400 && readdirSync(path).length > 0) return "a directory the process may list but not search, holding an entry";
    return `another entry of mode ${mode.toString(8)}`;
  }
  /** [case, what is planted one level below the location (a directory), its plant, the fixed reason]. */
  const CASES: readonly (readonly [string, string, (dir: string) => void, string])[] = [
    ["not-a-file", "a FIFO", plantFifo, "dependency-not-a-file"],
    ["device", "a link to a character device", plantDeviceLink, "dependency-not-a-file"],
    ["cycle", "a link back to the location's own directory", plantSelfLink, "dependency-cycle"],
    ["unreadable-directory", "a directory the process may not read", plantLockedDirectory, "dependency-unreadable"],
    ["unreadable-file", "a file the process may not read", plantLockedFile, "dependency-unreadable"],
    ["unsearchable-directory", "a directory the process may list but not search, holding an entry", plantListableDirectory, "dependency-unreadable"],
  ];
  /** Thirty-one directory levels below a location: the deepest level a walk reads directories at. */
  const LEVELS = Array.from({ length: 31 }, (_, level) => `level-${String(level + 1).padStart(2, "0")}`);

  for (const [reader, location, read] of READERS) {
    for (const [name, what, plant, reason] of CASES) {
      it(`R-UNK-${reader}-${name}: ${what}, one level below the ${location} location, is an unknown ${reader} reading (${reason})`, () => {
        const at = layout();
        const dir = join(at.config, location);
        mkdirSync(dir, { recursive: true });
        digestFrom(read(at));
        plant(dir);
        // The plant's body, read back: what it left one level below the location is the form this row's title names.
        expect(plantedForm(dir), name).toBe(what);
        // Root reads through any mode, so there an unreadable plant leaves the reading measured.
        if (reason === "dependency-unreadable" && process.getuid?.() === 0) digestFrom(read(at));
        else expectUnknownBecause(read(at), reason);
      });
    }

    it(`R-UNK-${reader}-depth: below the ${location} location a file 32 levels down moves the ${reader} reading, and a directory 32 levels down makes it unknown (dependency-over-budget)`, () => {
      const at = layout();
      const deepest = join(at.config, location, ...LEVELS);
      write(join(deepest, "notes.md"), "deep bytes v1");
      const v1 = digestFrom(read(at));
      write(join(deepest, "notes.md"), "deep bytes v2");
      expect(digestFrom(read(at))).not.toBe(v1);
      mkdirSync(join(deepest, "level-32"));
      expectUnknownBecause(read(at), "dependency-over-budget");
      rmSync(join(deepest, "level-32"), { recursive: true });
      expect(digestFrom(read(at))).not.toBe(v1);
    });

    it(`R-UNK-${reader}-budget: within one location, two 4-byte files are measured under {files: 2, bytes: 8}, and the ${reader} reading is unknown (dependency-over-budget) under {files: 1} or {bytes: 7}`, () => {
      const at = layout();
      write(join(at.config, location, "a.md"), "1234");
      write(join(at.config, location, "b.md"), "5678");
      digestFrom(read(at, ["user"], { files: 2, bytes: 8 }));
      expectUnknownBecause(read(at, ["user"], { files: 1, bytes: 8 }), "dependency-over-budget");
      expectUnknownBecause(read(at, ["user"], { files: 2, bytes: 7 }), "dependency-over-budget");
    });

    it(`R-UNK-${reader}-default-budget: in one location under the default budget, 2000 files are measured and a 2001st makes the ${reader} reading unknown, and a 32 MiB file is measured and one byte more makes it unknown`, () => {
      const many = layout();
      const dir = join(many.config, location);
      mkdirSync(dir, { recursive: true });
      for (let file = 0; file < 2000; file++) writeFileSync(join(dir, `f${file}.md`), "x");
      digestFrom(read(many));
      writeFileSync(join(dir, "f2000.md"), "x");
      expectUnknownBecause(read(many), "dependency-over-budget");

      const big = layout();
      const blob = join(big.config, location, "blob.bin");
      mkdirSync(dirname(blob), { recursive: true });
      writeFileSync(blob, Buffer.alloc(32 * 1024 * 1024));
      digestFrom(read(big));
      appendFileSync(blob, "x");
      expectUnknownBecause(read(big), "dependency-over-budget");
    }, 60_000);

    it(`R-UNK-${reader}-source: the unrecognized setting-source names managed, User, 'user ' and the empty name, each handed alone or after the user source, are an unknown ${reader} reading (setting-source-unrecognized)`, () => {
      const at = layout();
      expectUnknownBecause(read(at, ["managed"]), "setting-source-unrecognized");
      expectUnknownBecause(read(at, ["user", "managed"]), "setting-source-unrecognized");
      // A known name in another case or with a trailing space, and the empty name, are not known names either.
      for (const unrecognized of ["User", "user ", ""]) {
        expectUnknownBecause(read(at, [unrecognized]), "setting-source-unrecognized");
        expectUnknownBecause(read(at, ["user", unrecognized]), "setting-source-unrecognized");
      }
    });

    it(`R-UNK-${reader}-source-beside: each of those four names handed before or after one known source (user, project and local, the keys of the module's own tables) is an unknown ${reader} reading (setting-source-unrecognized)`, () => {
      const at = layout();
      // The known sources come from the module's table, outside this row's literals (R-SOURCES pins its keys to the SDK's three names).
      for (const known of Object.keys(CLAUDE_SETTINGS_LOCATIONS)) {
        for (const unrecognized of ["managed", "User", "user ", ""]) {
          for (const sources of [[known, unrecognized], [unrecognized, known]]) {
            expect(read(at, sources), JSON.stringify(sources)).toEqual({ state: "unknown", reason: "setting-source-unrecognized" });
          }
        }
      }
    });
  }

  it("R-UNK-relative: with the user source handed alone, a relative cwd and a relative config directory are each an unknown reading for both file readers", () => {
    const at = layout();
    expectUnknownBecause(instructionDependency("repo/pkg", ["user"], at.config), "instruction-base-not-absolute");
    expectUnknownBecause(instructionDependency(at.cwd, ["user"], "config"), "instruction-base-not-absolute");
    expectUnknownBecause(providerDependency(identity, "repo/pkg", ["user"], at.config), "setting-base-not-absolute");
    expectUnknownBecause(providerDependency(identity, at.cwd, ["user"], "config"), "setting-base-not-absolute");
  });

  it("R-UNK-CASES-SHAPE: the unknown cases each file reader plants one level below its location, written out (frozen shape) with their plants and reasons, are the cases every line of this bead's receipt carrying the CASES label lists, one row each", () => {
    expect(CASES.map(([name, what, plant, reason]) => `${name}|${reason}|${plant.name}|${what}`)).toEqual([
      "not-a-file|dependency-not-a-file|plantFifo|a FIFO",
      "device|dependency-not-a-file|plantDeviceLink|a link to a character device",
      "cycle|dependency-cycle|plantSelfLink|a link back to the location's own directory",
      "unreadable-directory|dependency-unreadable|plantLockedDirectory|a directory the process may not read",
      "unreadable-file|dependency-unreadable|plantLockedFile|a file the process may not read",
      "unsearchable-directory|dependency-unreadable|plantListableDirectory|a directory the process may list but not search, holding an entry",
    ]);
    // Anchored outside the literal above: every receipt line carrying the label lists the one-level cases this suite
    // claims, so a line appended later restating another list reds against the earlier one (refusal #4 F1, GT-05).
    const lists = receiptLists("(CASES, R-UNK-CASES-SHAPE):");
    expect(lists.length).toBeGreaterThan(0);
    for (const list of lists) expect(CASES.map(([name]) => name)).toEqual(list);
  });

  it("R-UNK-READERS-SHAPE: the unknown rows' readers, written out (frozen shape), are the module's file readers as its source text names them (each exported function that calls readFiles), one row each", () => {
    expect(READERS.map(([reader, location, , fileReader]) => `${reader}|${location}|${fileReader.name}`)).toEqual(["instructions|skills|instructionDependency", "provider|settings.json|providerDependency"]);
    // Anchored outside the literal above: the module's source text names its file readers.
    expect(READERS.map(([, , , fileReader]) => fileReader.name)).toEqual(moduleFileReaders());
  });
});

describe("wb-413a budgets counted over the whole reading (EAT-R020)", () => {
  const identity = { runtimeArtifactDigest: digestOf("installed SDK artifacts v1"), providerContractDigest: digestOf("provider contracts v1") };

  it("R-UNK-instructions-budget-across: the budget counts every path of one instruction reading: a 4-byte file in each of two user locations, and a 4-byte file under each of the user and project sources, are unknown under {files: 1} or {bytes: 7} (dependency-over-budget) and measured under {files: 2, bytes: 8}", () => {
    const locations = layout();
    write(join(locations.config, "skills", "a.md"), "1234");
    write(join(locations.config, "agents", "b.md"), "5678");
    const sources = layout();
    write(join(sources.config, "skills", "a.md"), "1234");
    write(join(sources.cwd, "CLAUDE.md"), "5678");
    for (const [at, enabled] of [[locations, ["user"]], [sources, ["user", "project"]]] as const) {
      digestFrom(instructionDependency(at.cwd, enabled, at.config, { files: 2, bytes: 8 }));
      expectUnknownBecause(instructionDependency(at.cwd, enabled, at.config, { files: 1, bytes: 8 }), "dependency-over-budget");
      expectUnknownBecause(instructionDependency(at.cwd, enabled, at.config, { files: 2, bytes: 7 }), "dependency-over-budget");
    }
  });

  it("R-UNK-provider-budget-across: the budget counts every setting path of one provider reading: the user and the project setting files of 4 bytes each are unknown under {files: 1} or {bytes: 7} (dependency-over-budget) and measured under {files: 2, bytes: 8}", () => {
    const at = layout();
    write(join(at.config, "settings.json"), "1234");
    write(join(at.cwd, ".claude", "settings.json"), "5678");
    digestFrom(providerDependency(identity, at.cwd, ["user", "project"], at.config, { files: 2, bytes: 8 }));
    expectUnknownBecause(providerDependency(identity, at.cwd, ["user", "project"], at.config, { files: 1, bytes: 8 }), "dependency-over-budget");
    expectUnknownBecause(providerDependency(identity, at.cwd, ["user", "project"], at.config, { files: 2, bytes: 7 }), "dependency-over-budget");
  });
});

describe("wb-413a reading helpers", () => {
  it("R-CONFIG-DIR: for an absolute home and cwd, an unset and an empty CLAUDE_CONFIG_DIR give <home>/.claude, an absolute one in normal form is itself, and a relative one is resolved against the cwd", () => {
    expect(claudeUserConfigDir({}, "/home/operator", "/work/repo")).toBe("/home/operator/.claude");
    expect(claudeUserConfigDir({ CLAUDE_CONFIG_DIR: "" }, "/home/operator", "/work/repo")).toBe("/home/operator/.claude");
    expect(claudeUserConfigDir({ CLAUDE_CONFIG_DIR: "/etc/claude-profile" }, "/home/operator", "/work/repo")).toBe("/etc/claude-profile");
    expect(claudeUserConfigDir({ CLAUDE_CONFIG_DIR: "profile" }, "/home/operator", "/work/repo")).toBe("/work/repo/profile");
    expect(claudeUserConfigDir({ CLAUDE_CONFIG_DIR: "../alt" }, "/home/operator", "/work/repo")).toBe("/work/alt");
  });

  it("R-CONFIG-DIR-BLANK: a whitespace-only CLAUDE_CONFIG_DIR (a space, a tab, two spaces) is set and not the empty string, so it is resolved against the cwd as a relative path", () => {
    for (const value of [" ", "\t", "  "]) expect(claudeUserConfigDir({ CLAUDE_CONFIG_DIR: value }, "/home/operator", "/work/repo"), JSON.stringify(value)).toBe(`/work/repo/${value}`);
  });

  it("R-MEASURED: every reading measured with a well-formed digest is the only shape that permits replay", () => {
    const ok: ReplayDependency = { state: "measured", digest: digestOf("x") };
    expect(replayDependenciesMeasured({ source: ok, instructions: ok, provider: ok })).toBe(true);
    for (const bad of [
      { state: "unknown", reason: "unmeasurable" },
      { state: "measured", digest: "" },
      { state: "measured", digest: digestOf("x").toUpperCase() },
      { state: "measured", digest: "sha256:abc" },
    ] as const) {
      expect(replayDependenciesMeasured({ source: bad, instructions: ok, provider: ok })).toBe(false);
      expect(replayDependenciesMeasured({ source: ok, instructions: bad, provider: ok })).toBe(false);
      expect(replayDependenciesMeasured({ source: ok, instructions: ok, provider: bad })).toBe(false);
    }
  });

  it("R-MEASURED-SHAPES: a digest is well formed only as sha256: followed by exactly 64 lowercase hex digits, in each of the three readings", () => {
    const ok: ReplayDependency = { state: "measured", digest: digestOf("x") };
    const hex = "a".repeat(64);
    expect(replayDependenciesMeasured({ source: { state: "measured", digest: `sha256:${hex}` }, instructions: ok, provider: ok })).toBe(true);
    for (const digest of [`sha256:${hex}0`, `sha256:${hex.slice(1)}`, `sha256:${hex}\n`, ` sha256:${hex}`, `SHA256:${hex}`, `sha512:${hex}`, `sha256:${"g".repeat(64)}`, hex]) {
      for (const dimension of ["source", "instructions", "provider"] as const) {
        expect(replayDependenciesMeasured({ source: ok, instructions: ok, provider: ok, [dimension]: { state: "measured", digest } }), `${dimension} ${JSON.stringify(digest)}`).toBe(false);
      }
    }
  });

  it("R-READING-SHAPE: a measured reading is identityDigest of what was read under its domain, and an unknown reading is its reason alone", () => {
    expect(measuredDependency("claude-replay-probe", { read: ["bytes"] })).toEqual({ state: "measured", digest: identityDigest("claude-replay-probe", { read: ["bytes"] }) });
    expect(measuredDependency("claude-replay-probe-b", { read: ["bytes"] })).not.toEqual(measuredDependency("claude-replay-probe", { read: ["bytes"] }));
    expect(unknownDependency("probe-unmeasurable")).toEqual({ state: "unknown", reason: "probe-unmeasurable" });
  });

  it("R-BUDGET-TABLE: the default budget of both file readers, written out (frozen shape of DEPENDENCY_READ_LIMITS: 2000 files, 32 MiB)", () => {
    expect(DEPENDENCY_READ_LIMITS).toEqual({ files: 2000, bytes: 32 * 1024 * 1024 });
  });
});

describe("wb-413a named residuals of the file readers: each quiet row reds when its escape stops being quiet", () => {
  const identity = { runtimeArtifactDigest: digestOf("installed SDK artifacts v1"), providerContractDigest: digestOf("provider contracts v1") };

  it("R-Q-UNLISTED-CONFIG (R-UNLISTED-CONFIG-FILES): a plugin's skill under <config>/plugins, <config>/.claude.json and a transcript under <config>/projects lie outside every listed location, so changing them leaves the user instruction reading and the user provider reading equal", () => {
    const at = layout();
    const unlisted = [
      join(at.config, "plugins", "marketplace", "demo", "skills", "review", "SKILL.md"),
      join(at.config, ".claude.json"),
      join(at.config, "projects", "repo", "session.jsonl"),
    ];
    for (const path of unlisted) write(path, "unlisted v1");
    const instructions = digestFrom(instructionDependency(at.cwd, ["user"], at.config));
    const provider = digestFrom(providerDependency(identity, at.cwd, ["user"], at.config));
    for (const path of unlisted) write(path, "unlisted v2");
    expect(digestFrom(instructionDependency(at.cwd, ["user"], at.config))).toBe(instructions);
    expect(digestFrom(providerDependency(identity, at.cwd, ["user"], at.config))).toBe(provider);
  });

  it("R-Q-IMPORTED-MEMORY (R-IMPORTED-MEMORY): a file a memory file imports with @path, outside every listed location, is not read: changing it leaves the user and the project instruction readings equal", () => {
    const at = layout();
    write(join(at.config, "CLAUDE.md"), "@notes/style.md\n");
    write(join(at.cwd, "CLAUDE.md"), "@docs/rules.md\n");
    const imported: readonly (readonly [ClaudeSettingSource, string])[] = [
      ["user", join(at.config, "notes", "style.md")],
      ["project", join(at.cwd, "docs", "rules.md")],
    ];
    for (const [source, path] of imported) {
      write(path, "imported v1");
      const v1 = digestFrom(instructionDependency(at.cwd, [source], at.config));
      write(path, "imported v2");
      expect(digestFrom(instructionDependency(at.cwd, [source], at.config)), path).toBe(v1);
    }
  });

  it("R-Q-NESTED-MEMORY (R-NESTED-MEMORY): memory files in a directory below the cwd (sub/CLAUDE.md, sub/.claude/CLAUDE.md, sub/CLAUDE.local.md) are not read: changing them leaves the project and the local instruction readings equal", () => {
    const at = layout();
    const nested = [join(at.cwd, "sub", "CLAUDE.md"), join(at.cwd, "sub", ".claude", "CLAUDE.md"), join(at.cwd, "sub", "CLAUDE.local.md")];
    for (const path of nested) write(path, "nested v1");
    const project = digestFrom(instructionDependency(at.cwd, ["project"], at.config));
    const local = digestFrom(instructionDependency(at.cwd, ["local"], at.config));
    for (const path of nested) write(path, "nested v2");
    expect(digestFrom(instructionDependency(at.cwd, ["project"], at.config))).toBe(project);
    expect(digestFrom(instructionDependency(at.cwd, ["local"], at.config))).toBe(local);
  });

  it("R-Q-MANAGED-POLICY (R-MANAGED-POLICY): neither reader names a managed policy path: instructionPaths under every source names no path below /etc or /Library, and every instruction and setting location is relative to its base", () => {
    const paths = instructionPaths("/work/repo/pkg", ["user", "project", "local"], "/home/operator/.claude");
    expect(paths.filter(path => path.startsWith("/etc/") || path.startsWith("/Library/"))).toEqual([]);
    for (const table of [CLAUDE_INSTRUCTION_LOCATIONS, CLAUDE_ANCESTOR_MEMORY, CLAUDE_SETTINGS_LOCATIONS]) {
      for (const locations of Object.values(table)) expect(locations.filter(location => isAbsolute(location))).toEqual([]);
    }
  });
});

describe("wb-413a readers suite hygiene", () => {
  it("R-HYGIENE: the permission undo reaches plants at the layout's own cwd, so a red unreadable row still leaves no scratch behind", () => {
    const at = layout();
    const locked = join(at.cwd, ".claude", "skills", "locked");
    const lockedFile = join(at.cwd, ".claude", "skills", "locked.md");
    write(join(locked, "SKILL.md"), "locked");
    write(lockedFile, "locked file");
    chmodSync(lockedFile, 0o000);
    chmodSync(locked, 0o000);
    chmodTree(at.root);
    expect(statSync(locked).mode & 0o777).toBe(0o700);
    expect(statSync(lockedFile).mode & 0o777).toBe(0o600);
    removeScratch(at.root);
    expect(existsSync(at.root)).toBe(false);
  });
});
