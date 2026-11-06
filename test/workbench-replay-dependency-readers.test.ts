/**
 * wb-413a [MWI-replay]: the readers that MEASURE what a recorded Claude agent answer depends on beyond its call payload
 * (src/workbench/replay-dependencies.ts). Program mechanical-workflows-interop-2026-11-04, slice PI-4, EAT-R017..EAT-R020
 * (ATOMIC-REQUIREMENTS.md@0b25e14e, pi-subagents master); the acceptance lines are quoted in
 * test/workbench-claude-replay-dependencies.test.ts, which judges the host's use of these readings.
 *
 * Each row here judges one reader over real files in scratch directories:
 *  - the source reading (EAT-R017) composes the Git HEAD commit, the HEAD tree and the candidate digest (the index plus
 *    every Git-visible file's bytes, the dirty-file digest), and moves with each one alone;
 *  - the instruction reading (EAT-R018) reads the bytes at every instruction location of each enabled setting source and
 *    moves when any of them changes, and reads nothing for a disabled source (settingSources [] reads no file at all);
 *  - the provider reading (EAT-R019) composes the installed runtime artifact digest, the provider contract digest and the
 *    bytes of each enabled source's setting file;
 *  - an unmeasurable dependency (EAT-R020) is an UNKNOWN reading with a reason and no digest, never an empty or stable
 *    digest standing in for one (the requirement's adversarial mutant).
 * The locations are written out literally below rather than read back from the module, so dropping one from the module's
 * table reds both the frozen table row and that location's own row.
 */

import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { chmodSync, mkdirSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import {
  CLAUDE_ANCESTOR_MEMORY,
  CLAUDE_INSTRUCTION_LOCATIONS,
  CLAUDE_SETTINGS_LOCATIONS,
  claudeUserConfigDir,
  instructionDependency,
  providerDependency,
  type ReplayDependency,
  replayDependenciesMeasured,
  sourceDependency,
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
/** Undo a permission plant before removal, so the scratch always goes. */
function chmodTree(dir: string): void {
  for (const planted of [join(dir, "cwd", ".claude", "skills", "locked"), join(dir, "cwd", ".claude", "skills", "locked.md")]) {
    try { chmodSync(planted, 0o700); } catch { /* not planted in this row */ }
  }
}

interface Layout {
  /** <scratch>/repo/pkg: the run's cwd, two levels below the scratch so its ancestors include <scratch>/repo. */
  cwd: string;
  /** <scratch>/repo: an ancestor of the cwd. */
  parent: string;
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
  return { cwd, parent, config, root };
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

  /** [source, file planted (relative to its base), base]: every instruction location, one file each. */
  const PLANTS: readonly (readonly ["user" | "project" | "local", string, "cwd" | "parent" | "config"])[] = [
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
});
