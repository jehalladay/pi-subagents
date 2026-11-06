/**
 * wb-413a [MWI-replay]: the readers that MEASURE three dependencies of a recorded Claude agent answer, beyond its call
 * payload and the host's policy basis (src/workbench/replay-dependencies.ts). Program mechanical-workflows-interop-2026-11-04,
 * slice PI-4, EAT-R017..EAT-R020 (ATOMIC-REQUIREMENTS.md@0b25e14e, pi-subagents master); the acceptance lines are quoted
 * in test/workbench-claude-replay-dependencies.test.ts, which judges the host's use of these readings.
 *
 * Each row here judges one reader over real files in scratch directories:
 *  - the source reading (EAT-R017) composes the Git HEAD commit, the HEAD tree and the candidate digest it is handed, and
 *    moves with each one alone; what the candidate covers (the index and the file bytes) is judged over a real
 *    repository by test/workbench-replay-dependencies-wiring.test.ts;
 *  - the instruction reading (EAT-R018) reads the bytes at the paths instructionPaths names for each enabled setting
 *    source (written out in R-INS-PATHS) and moves when the file at any of them changes; with no source enabled it reads
 *    no file;
 *  - the provider reading (EAT-R019) composes the runtime artifact digest and the provider contract digest it is handed
 *    with the bytes of each enabled source's setting file;
 *  - an unmeasurable dependency (EAT-R020) is an UNKNOWN reading with a fixed reason and no digest, never an empty or
 *    stable digest standing in for one (the requirement's adversarial mutant); R-UNK-* pin each case for both file readers.
 * The locations are written out literally below rather than read back from the module, so dropping one from the module's
 * table reds both the frozen table row and that location's own row; R-INS-PLANTS-SHAPE ties the plant rows back to the
 * module's tables, so dropping a plant row reds as well.
 */

import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { appendFileSync, chmodSync, existsSync, lstatSync, mkdirSync, readdirSync, rmSync, type Stats, statSync, symlinkSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
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

describe("wb-413a source reading: Git commit, tree and dirty-file digest (EAT-R017)", () => {
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

describe("wb-413a instruction reading: skill and system instruction bytes (EAT-R018)", () => {
  it("R-INS-TABLE: the instruction locations, written out (frozen shape of CLAUDE_INSTRUCTION_LOCATIONS and CLAUDE_ANCESTOR_MEMORY)", () => {
    expect(CLAUDE_INSTRUCTION_LOCATIONS).toEqual({
      user: ["CLAUDE.md", "skills", "agents", "commands", "output-styles", "rules"],
      project: ["CLAUDE.md", ".claude/CLAUDE.md", ".claude/skills", ".claude/agents", ".claude/commands", ".claude/output-styles", ".claude/rules"],
      local: ["CLAUDE.local.md"],
    });
    expect(CLAUDE_ANCESTOR_MEMORY).toEqual({ user: [], project: ["CLAUDE.md", ".claude/CLAUDE.md"], local: ["CLAUDE.local.md"] });
  });

  it("R-INS-ISOLATION: settingSources [] reads no file, so no instruction file moves the reading", () => {
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

  it("R-INS-SYMLINK: a skill reached through a symbolic link is read as its target's bytes", () => {
    const at = layout();
    const target = join(at.root, "shared-skill", "SKILL.md");
    write(target, "shared skill v1");
    mkdirSync(join(at.config, "skills"), { recursive: true });
    symlinkSync(dirname(target), join(at.config, "skills", "shared"));
    const v1 = digestFrom(instructionDependency(at.cwd, ["user"], at.config));
    write(target, "shared skill v2");
    expect(digestFrom(instructionDependency(at.cwd, ["user"], at.config))).not.toBe(v1);
  });

  it("R-INS-UNKNOWN: an entry the reader cannot read is an unknown reading, never a partial or empty digest", () => {
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

  it("R-INS-PATHS: instructionPaths names each enabled source's locations under its base, then its memory files in every proper ancestor of the cwd, nearest first, ending at the filesystem root", () => {
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

  it("R-INS-PATHS-READ: a file at each path instructionPaths names inside the scratch moves that source's reading, so the reader reads every path it names", () => {
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

  it("R-SOURCES: the readers know exactly the SDK's setting-source names, user, project and local, and each table keys those alone", () => {
    const sdk: readonly SettingSource[] = ["user", "project", "local"];
    // Both assignments typecheck only while ClaudeSettingSource and the SDK's SettingSource are the same three names.
    const readers: readonly ClaudeSettingSource[] = sdk;
    const back: readonly SettingSource[] = readers;
    for (const table of [CLAUDE_INSTRUCTION_LOCATIONS, CLAUDE_ANCESTOR_MEMORY, CLAUDE_SETTINGS_LOCATIONS]) expect(Object.keys(table)).toEqual([...back]);
  });
});

describe("wb-413a provider reading: effective provider version and settings (EAT-R019)", () => {
  const identity = { runtimeArtifactDigest: digestOf("installed SDK artifacts v1"), providerContractDigest: digestOf("provider contracts v1") };

  it("R-PRV-TABLE: the setting file of each source, written out (frozen shape of CLAUDE_SETTINGS_LOCATIONS)", () => {
    expect(CLAUDE_SETTINGS_LOCATIONS).toEqual({ user: ["settings.json"], project: [".claude/settings.json"], local: [".claude/settings.local.json"] });
  });

  it("R-PRV-VERSION: the digest moves with the installed runtime artifacts alone and with the provider contracts alone", () => {
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

  it("R-PRV-UNKNOWN: no invocation identity, a malformed digest or an unreadable setting file is an unknown reading", () => {
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
});

describe("wb-413a unknown readings of both file readers, by fixed reasons (EAT-R020)", () => {
  const identity = { runtimeArtifactDigest: digestOf("installed SDK artifacts v1"), providerContractDigest: digestOf("provider contracts v1") };
  type Read = (at: Layout, sources?: readonly string[], limits?: DependencyReadLimits) => ReplayDependency;
  /** [reader, the location it reads under the user source (below the config directory), a reading of it]. */
  const READERS: readonly (readonly ["instructions" | "provider", string, Read])[] = [
    ["instructions", "skills", (at, sources = ["user"], limits) => instructionDependency(at.cwd, sources, at.config, limits)],
    ["provider", "settings.json", (at, sources = ["user"], limits) => providerDependency(identity, at.cwd, sources, at.config, limits)],
  ];
  /** [case, what is planted below the location (a directory), the fixed reason]. */
  const CASES: readonly (readonly [string, (dir: string) => void, string])[] = [
    ["not-a-file", dir => { execFileSync("mkfifo", [join(dir, "pipe")]); }, "dependency-not-a-file"],
    ["cycle", dir => { symlinkSync(dir, join(dir, "again")); }, "dependency-cycle"],
    ["unreadable-directory", dir => { write(join(dir, "locked", "entry.md"), "locked"); chmodSync(join(dir, "locked"), 0o000); }, "dependency-unreadable"],
    ["unreadable-file", dir => { write(join(dir, "locked.md"), "locked"); chmodSync(join(dir, "locked.md"), 0o000); }, "dependency-unreadable"],
    // Listable but not searchable (mode r--): the walk names the entry inside it, and statting that entry is refused.
    ["unsearchable-directory", dir => { write(join(dir, "dark", "entry.md"), "dark"); chmodSync(join(dir, "dark"), 0o400); }, "dependency-unreadable"],
  ];
  /** Thirty-one directory levels below a location: the deepest level a walk reads directories at. */
  const LEVELS = Array.from({ length: 31 }, (_, level) => `level-${String(level + 1).padStart(2, "0")}`);

  for (const [reader, location, read] of READERS) {
    for (const [name, plant, reason] of CASES) {
      it(`R-UNK-${reader}-${name}: ${name} below the ${location} location is an unknown ${reader} reading (${reason})`, () => {
        const at = layout();
        const dir = join(at.config, location);
        mkdirSync(dir, { recursive: true });
        digestFrom(read(at));
        plant(dir);
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

    it(`R-UNK-${reader}-budget: past an explicit budget of files or of bytes the ${reader} reading is unknown (dependency-over-budget), and at the budget it is measured`, () => {
      const at = layout();
      write(join(at.config, location, "a.md"), "1234");
      write(join(at.config, location, "b.md"), "5678");
      digestFrom(read(at, ["user"], { files: 2, bytes: 8 }));
      expectUnknownBecause(read(at, ["user"], { files: 1, bytes: 8 }), "dependency-over-budget");
      expectUnknownBecause(read(at, ["user"], { files: 2, bytes: 7 }), "dependency-over-budget");
    });

    it(`R-UNK-${reader}-default-budget: under the default budget 2000 files are measured and a 2001st makes the ${reader} reading unknown, and 32 MiB is measured and one byte more makes it unknown`, () => {
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

    it(`R-UNK-${reader}-source: an unrecognized setting source, alone or beside a known one, is an unknown ${reader} reading (setting-source-unrecognized)`, () => {
      const at = layout();
      expectUnknownBecause(read(at, ["managed"]), "setting-source-unrecognized");
      expectUnknownBecause(read(at, ["user", "managed"]), "setting-source-unrecognized");
    });
  }

  it("R-UNK-relative: a relative cwd or config directory is an unknown reading for both file readers", () => {
    const at = layout();
    expectUnknownBecause(instructionDependency("repo/pkg", ["user"], at.config), "instruction-base-not-absolute");
    expectUnknownBecause(instructionDependency(at.cwd, ["user"], "config"), "instruction-base-not-absolute");
    expectUnknownBecause(providerDependency(identity, "repo/pkg", ["user"], at.config), "setting-base-not-absolute");
    expectUnknownBecause(providerDependency(identity, at.cwd, ["user"], "config"), "setting-base-not-absolute");
  });
});

describe("wb-413a reading helpers", () => {
  it("R-CONFIG-DIR: the SDK's user config directory is CLAUDE_CONFIG_DIR when set (resolved against the cwd), else <home>/.claude", () => {
    expect(claudeUserConfigDir({}, "/home/operator", "/work/repo")).toBe("/home/operator/.claude");
    expect(claudeUserConfigDir({ CLAUDE_CONFIG_DIR: "" }, "/home/operator", "/work/repo")).toBe("/home/operator/.claude");
    expect(claudeUserConfigDir({ CLAUDE_CONFIG_DIR: "/etc/claude-profile" }, "/home/operator", "/work/repo")).toBe("/etc/claude-profile");
    expect(claudeUserConfigDir({ CLAUDE_CONFIG_DIR: "profile" }, "/home/operator", "/work/repo")).toBe("/work/repo/profile");
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
