/**
 * wb-6b3z [413a-exit]: the fail-closed core of the replay-dependency basis (src/workbench/replay-dependencies.ts and the
 * readings src/index.ts hands the embedded Claude host) - the eight realized GP13 escape families of wb-413a refusal #3
 * (gate-prep-13, run g10-gate-s231, cut #3 66e8dd25, unmet U1-U7), each pinned red-first. The structural exit row R-B664
 * (M:61935) moved these families out of wb-413a's R-B646 claim set and into this bead; the parent's cured members stay
 * with its own suites (test/workbench-replay-dependency-readers.test.ts, test/workbench-replay-dependencies-wiring.test.ts
 * and test/workbench-claude-replay-dependencies.test.ts), which this cut leaves byte-identical.
 *
 * Each row plants a form on real files in a scratch directory, or hands a reader the strings, runs the module's reader and
 * asserts the WHOLE reading: the exact unknown reason, or a measured reading equal to a named twin, each beside a measured
 * control where a plant is involved. Every row is green on the real code and red under the gate member its family
 * answers; the receipt docs/workbench/receipts/wb-6b3z.md records the member counts.
 *
 * PINNED READER SET (this file; every row observed green on the cut):
 *  - FCB-UNSTAT-instructions, FCB-UNSTAT-provider: 99 plants each, each reading exactly {unknown, dependency-unreadable};
 *  - FCB-LINK-BELOW-FILE-instructions, FCB-LINK-BELOW-FILE-provider: 33 links each, each reading measured and equal;
 *  - FCB-CYCLE-INNER-instructions, FCB-CYCLE-INNER-provider: 61 links each, each reading exactly {unknown, dependency-cycle};
 *  - FCB-READ-AGAIN-instructions, FCB-READ-AGAIN-provider: 62 trees each, each measured, moving and equal to its copy twin;
 *  - FCB-RELATIVE-BASE-instructions, FCB-RELATIVE-BASE-provider: 80 relative bases each, each reading its base reason;
 *  - FCB-RELATIVE-HOME: 24 readings (8 directories, each checked and handed to both readers);
 *  - FCB-UNNAMED-SOURCES: 8 files changed, the resume replayed under equal readings; FCB-UNNAMED-SOURCES-CONTROL: the same 8
 *    files under the three sources, the resume live;
 *  - FCB-FAMILIES-SHAPE, FCB-CLAIMS-HEADER, FCB-ANCHOR-SRC, FCB-ANCHOR-RECEIPT: the table shape and its three anchors.
 *
 * CLAIMED here, each by the rows its family names, and nothing wider:
 *  - FCB-UNSTAT (U1 GP13-10): Each of three planted stat refusals is an unknown reading by dependency-unreadable, never
 *    a stable absent digest: for each file reader under the user source, at the named path and at each depth 1 to 32
 *    below the location, each plant (the directory the path lies in left listable but not searchable, two links naming
 *    each other, and a link naming a path with a 256-byte component) reads unknown where the same tree without the
 *    plant reads measured.
 *  - FCB-LINK-BELOW-FILE (U5 GP13-09): Planted under the user source, a link naming a path below a regular file reads
 *    as absent: for each file reader under the user source, with the link at the named path and at each depth 1 to 32
 *    below the location, the reading is measured and equal to the reading with the same link naming a missing path.
 *  - FCB-CYCLE-INNER (U2 GP13-01): Up to 31 levels below a user-source location, a link naming the directory it lies
 *    in, or the directory above that one, keeps the cycle reason: for each file reader under the user source, a link
 *    naming the directory it lies in, at each depth 1 to 31 below the location, and a link naming the directory one
 *    level above the one it lies in, at each depth 2 to 31, each read unknown by dependency-cycle where the same tree
 *    without the link reads measured.
 *  - FCB-READ-AGAIN (U4 GP13-05): Up to 31 levels below a user-source location, a directory first reached through one
 *    or two links that sort before it is read again, never as a cycle: for each file reader under the user source, at
 *    each depth 1 to 31 below the location, a directory named by one link that sorts before it, and one named by two
 *    links that both sort before it, give a measured reading that moves with that directory's bytes and equals the
 *    reading with each link replaced by a copy of the directory.
 *  - FCB-RELATIVE-BASE (U3 GP13-02 GP13-03): Ten relative bases are each an unknown reading under each of the eight
 *    sets of known sources (none, each one, each two and all three of user, project and local): the relative config
 *    directories config, ./config, ../config, . and the empty string beside an absolute cwd, the relative cwds
 *    repo/pkg, ./pkg, . and the empty string beside an absolute config directory, and repo/pkg beside config each read
 *    unknown by instruction-base-not-absolute for the instruction reader and by setting-base-not-absolute for the
 *    provider reader, where both bases absolute read measured.
 *  - FCB-RELATIVE-HOME (U7 GP13-08): Four relative homes stay relative: with CLAUDE_CONFIG_DIR unset or empty and an
 *    absolute cwd, claudeUserConfigDir gives operator/.claude for the homes operator and ./operator,
 *    ../operator/.claude for ../operator and .claude for the empty home, and each file reader handed that directory
 *    under the user source reads unknown by its base reason.
 *  - FCB-UNNAMED-SOURCES (U6 GP13-04): With settingSources unset the registered path replays across eight changed
 *    setting-source files: changing the user CLAUDE.md, a user skill and the user settings.json under
 *    CLAUDE_CONFIG_DIR, and a Git-ignored project CLAUDE.md, project skill, project settings.json, local
 *    CLAUDE.local.md and local settings.local.json, between the recording and the resume replays the recorded answer
 *    under readings equal to the recorded ones, where the same changes under the user, project and local sources
 *    decline it.
 * TABLE SHAPE: the family table, written out with its plant counts, claim lengths and rows (each row's subject and title
 * length; each row asserts the family, subject and count its judge returns) (FCB-FAMILIES-SHAPE), equals the claims
 * above (FCB-CLAIMS-HEADER), the family ids src/workbench/replay-dependencies.ts and src/index.ts cite at the claims'
 * sites (FCB-ANCHOR-SRC), and every line of this bead's receipt that carries the FAMILIES label (FCB-ANCHOR-RECEIPT).
 *
 * NOT CLAIMED by this suite: a read error no row plants (an I/O error among them); a FIFO, a link to a character device,
 * and a directory or a file the process may not read, at any depth (the readers suite claims them one level below a
 * location); the list-only plant under a process running as root (root searches any mode, so there that plant reads
 * measured, and the row asserts that instead); FCB-UNSTAT, FCB-LINK-BELOW-FILE, FCB-CYCLE-INNER and FCB-READ-AGAIN under
 * the project or local source; a link naming a directory two or more levels above the one it lies in; a directory first
 * reached through a link at the named path, or through three or more links; a relative string for either base other than
 * those FCB-RELATIVE-BASE hands; a relative home other than the four FCB-RELATIVE-HOME hands, CLAUDE_CONFIG_DIR set
 * beside a relative home, and a relative HOME at the registered path; settingSources set to the empty list at the
 * registered path; and which identity the registered path hands the provider reader.
 */
import { execFileSync } from "node:child_process";
import { chmodSync, lstatSync, mkdirSync, readdirSync, readFileSync, type Stats, symlinkSync, unlinkSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import subagentsExtension from "../src/index.js";
import { sessionTaskDir } from "../src/output-file.js";
import { type ClaudeSettingSource, claudeUserConfigDir, instructionDependency, providerDependency, type ReplayDependency } from "../src/workbench/replay-dependencies.js";
import { readJournal, type WorkflowJournalEntry } from "../src/workflow/journal.js";
import { ctx, hermeticDir, makePi } from "./helpers/boot-extension.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard();

const CONFIG_ENV = "CLAUDE_CONFIG_DIR";
const priorConfig = process.env[CONFIG_ENV];
const scratches: string[] = [];
let sandbox: ReturnType<typeof hermeticDir> | undefined;
afterEach(() => {
  sandbox?.restore();
  sandbox = undefined;
  for (const dir of scratches.splice(0)) {
    restoreModes(dir);
    removeScratch(dir);
  }
  if (priorConfig === undefined) delete process.env[CONFIG_ENV];
  else process.env[CONFIG_ENV] = priorConfig;
});

/**
 * Owner access back on every directory and regular file below `path`, wherever a row planted a mode, so the scratch
 * always goes; a symbolic link is never followed.
 */
function restoreModes(path: string): void {
  let stats: Stats;
  try {
    stats = lstatSync(path);
  } catch {
    return;
  }
  if (stats.isDirectory()) {
    chmodSync(path, 0o700);
    for (const name of readdirSync(path)) restoreModes(join(path, name));
  } else if (stats.isFile()) {
    chmodSync(path, 0o600);
  }
}

/** One row's scratch directory, removed (modes restored first) after the row. */
function rowScratch(): string {
  const dir = makeScratch("replay-fail-closed-");
  scratches.push(dir);
  return dir;
}

interface Layout {
  /** <scratch>/<case>: the case's own root, where its link targets and regular files live. */
  readonly root: string;
  /** <scratch>/<case>/repo/pkg: an absolute cwd. */
  readonly cwd: string;
  /** <scratch>/<case>/config: the user config directory both readers read under the user source. */
  readonly config: string;
}
/** One case's layout below a row's scratch directory. */
function layoutIn(scratch: string, name: string): Layout {
  const root = join(scratch, name);
  const cwd = join(root, "repo", "pkg");
  const config = join(root, "config");
  mkdirSync(cwd, { recursive: true });
  mkdirSync(config, { recursive: true });
  return { root, cwd, config };
}
function write(path: string, text: string): void {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, text);
}
/** The directory `depth` levels below the directory `location` (depth 0 is `location` itself), made on the way. */
function levelDir(location: string, depth: number): string {
  const dir = join(location, ...Array.from({ length: depth }, (_, level) => `level-${String(level + 1).padStart(2, "0")}`));
  mkdirSync(dir, { recursive: true });
  return dir;
}

const DIGEST = /^sha256:[0-9a-f]{64}$/;
/** A measured reading's digest; `label` names the case in a failure. */
function measured(reading: ReplayDependency, label: string): string {
  expect(reading.state, label).toBe("measured");
  if (reading.state !== "measured") throw new Error(`${label}: unknown reading (${reading.reason})`);
  expect(reading.digest, label).toMatch(DIGEST);
  return reading.digest;
}
/** An unknown reading by exactly `reason`: the reading object is the reason alone, with no digest. */
function unknownBecause(reading: ReplayDependency, reason: string, label: string): void {
  expect(reading, label).toEqual({ state: "unknown", reason });
}

/** Obviously fake digests: the provider reader needs a well-formed identity to reach its setting files. */
const IDENTITY = { runtimeArtifactDigest: `sha256:${"a".repeat(64)}`, providerContractDigest: `sha256:${"b".repeat(64)}` };
const ROOT_USER = process.getuid?.() === 0;

/** A file reader under the user source, with the location it reads below the config directory. */
interface UserReader {
  readonly name: "instructions" | "provider";
  /** The location the reader names below the config directory (a directory location when a row makes it one). */
  readonly location: string;
  readonly read: (at: Layout) => ReplayDependency;
  /** The reader with every argument handed, for the base rows. */
  readonly readWith: (cwd: string, sources: readonly ClaudeSettingSource[], configDir: string) => ReplayDependency;
  /** The fixed reason of a relative base. */
  readonly baseReason: string;
}
const INSTRUCTIONS: UserReader = {
  name: "instructions",
  location: "skills",
  read: at => instructionDependency(at.cwd, ["user"], at.config),
  readWith: (cwd, sources, configDir) => instructionDependency(cwd, sources, configDir),
  baseReason: "instruction-base-not-absolute",
};
const PROVIDER: UserReader = {
  name: "provider",
  location: "settings.json",
  read: at => providerDependency(IDENTITY, at.cwd, ["user"], at.config),
  readWith: (cwd, sources, configDir) => providerDependency(IDENTITY, cwd, sources, configDir),
  baseReason: "setting-base-not-absolute",
};

/** The three stat refusals FCB-UNSTAT plants. */
const STAT_REFUSALS = ["list-only directory", "two links naming each other", "a 256-byte component"] as const;
type StatRefusal = (typeof STAT_REFUSALS)[number];
/** The depths a walk stats an entry at: 0 (the named path) to 32 (a file 32 levels below the location is read). */
const STAT_DEPTHS: readonly number[] = Array.from({ length: 33 }, (_, depth) => depth);
/** The depths a directory or a link a walk follows can sit at below the location: 1 to 31. */
const WALK_DEPTHS: readonly number[] = Array.from({ length: 31 }, (_, depth) => depth + 1);

/** What a row judged: its family and subject, named by the judge itself, and the number of readings it judged. */
interface Judged {
  readonly family: string;
  readonly subject: string;
  readonly judged: number;
}

/** FCB-UNSTAT: each refusal at each depth, after a measured control on the same tree without the refusal. */
function judgeUnstat(reader: UserReader): Judged {
  const scratch = rowScratch();
  let judged = 0;
  for (const refusal of STAT_REFUSALS) {
    for (const depth of STAT_DEPTHS) {
      const label = `${reader.name}: ${refusal} at depth ${depth}`;
      const at = layoutIn(scratch, `${refusal.replace(/[^a-z0-9]+/g, "-")}-${depth}`);
      const named = join(at.config, reader.location);
      // The directory the refused path lies in: the config directory for the named path, else the level above it.
      const dir = depth === 0 ? at.config : levelDir(named, depth - 1);
      const path = depth === 0 ? named : join(dir, "entry.md");
      if (refusal === "list-only directory") write(path, "entry");
      measured(reader.read(at), `${label} (control)`);
      plantStatRefusal(refusal, dir, path);
      if (refusal === "list-only directory" && ROOT_USER) measured(reader.read(at), `${label} (root searches any mode)`);
      else unknownBecause(reader.read(at), "dependency-unreadable", label);
      judged += 1;
    }
  }
  return { family: "FCB-UNSTAT", subject: reader.name, judged };
}
function plantStatRefusal(refusal: StatRefusal, dir: string, path: string): void {
  if (refusal === "list-only directory") {
    chmodSync(dir, 0o600);
  } else if (refusal === "two links naming each other") {
    symlinkSync(`${path}.loop`, path);
    symlinkSync(path, `${path}.loop`);
  } else {
    symlinkSync(`/${"n".repeat(256)}`, path);
  }
}

/** FCB-LINK-BELOW-FILE: at each depth, the link naming a path below a regular file reads as the same link naming nothing. */
function judgeLinkBelowFile(reader: UserReader): Judged {
  const scratch = rowScratch();
  let judged = 0;
  for (const depth of STAT_DEPTHS) {
    const label = `${reader.name}: link at depth ${depth}`;
    const at = layoutIn(scratch, `link-${depth}`);
    write(join(at.root, "plain.txt"), "a regular file");
    const named = join(at.config, reader.location);
    const link = depth === 0 ? named : join(levelDir(named, depth - 1), "broken");
    symlinkSync(join(at.root, "nowhere"), link);
    const missing = measured(reader.read(at), `${label} naming a missing path`);
    unlinkSync(link);
    symlinkSync(join(at.root, "plain.txt", "below"), link);
    expect(measured(reader.read(at), `${label} naming a path below a regular file`), label).toBe(missing);
    judged += 1;
  }
  return { family: "FCB-LINK-BELOW-FILE", subject: reader.name, judged };
}

/** FCB-CYCLE-INNER: a link naming the directory it lies in, or the directory above that one, at each depth. */
function judgeCycleInner(reader: UserReader): Judged {
  const scratch = rowScratch();
  let judged = 0;
  for (const depth of WALK_DEPTHS) {
    const label = `${reader.name}: link at depth ${depth} naming the directory it lies in`;
    const at = layoutIn(scratch, `own-${depth}`);
    const dir = levelDir(join(at.config, reader.location), depth - 1);
    write(join(dir, "entry.md"), "entry");
    measured(reader.read(at), `${label} (control)`);
    symlinkSync(dir, join(dir, "again"));
    unknownBecause(reader.read(at), "dependency-cycle", label);
    judged += 1;
  }
  for (const depth of WALK_DEPTHS.filter(depth => depth >= 2)) {
    const label = `${reader.name}: link at depth ${depth} naming the directory above the one it lies in`;
    const at = layoutIn(scratch, `above-${depth}`);
    const above = levelDir(join(at.config, reader.location), depth - 2);
    write(join(above, "inner", "entry.md"), "entry");
    measured(reader.read(at), `${label} (control)`);
    symlinkSync(above, join(above, "inner", "again"));
    unknownBecause(reader.read(at), "dependency-cycle", label);
    judged += 1;
  }
  return { family: "FCB-CYCLE-INNER", subject: reader.name, judged };
}

/** The two FCB-READ-AGAIN shapes: [shape, the directory the links name, the links, each sorting before it]. */
const READ_AGAIN_SHAPES: readonly (readonly [string, string, readonly string[]])[] = [
  ["one link", "review", ["a"]],
  ["two links", "zeta", ["alias", "beta"]],
];
/** FCB-READ-AGAIN: at each depth, each shape is measured, moves with the named directory's bytes and equals its copy twin. */
function judgeReadAgain(reader: UserReader): Judged {
  const scratch = rowScratch();
  let judged = 0;
  for (const depth of WALK_DEPTHS) {
    for (const [shape, target, links] of READ_AGAIN_SHAPES) {
      const label = `${reader.name}: ${shape} at depth ${depth}`;
      const at = layoutIn(scratch, `${shape.replace(" ", "-")}-${depth}`);
      const dir = levelDir(join(at.config, reader.location), depth - 1);
      const entry = join(dir, target, "entry.md");
      write(entry, "named directory v1");
      for (const link of links) symlinkSync(join(dir, target), join(dir, link));
      const v1 = measured(reader.read(at), label);
      write(entry, "named directory v2");
      expect(measured(reader.read(at), `${label}, bytes changed`), label).not.toBe(v1);
      write(entry, "named directory v1");
      expect(measured(reader.read(at), `${label}, bytes restored`), label).toBe(v1);
      // The copy twin: each link replaced by a directory holding the same entry, so the walk read each reach in full.
      for (const link of links) {
        unlinkSync(join(dir, link));
        write(join(dir, link, "entry.md"), "named directory v1");
      }
      expect(measured(reader.read(at), `${label}, links replaced by copies`), label).toBe(v1);
      judged += 1;
    }
  }
  return { family: "FCB-READ-AGAIN", subject: reader.name, judged };
}

/** The eight sets of known sources: none, each one, each two and all three, written out. */
const SOURCE_SETS: readonly (readonly ClaudeSettingSource[])[] = [
  [],
  ["user"],
  ["project"],
  ["local"],
  ["user", "project"],
  ["user", "local"],
  ["project", "local"],
  ["user", "project", "local"],
];
const RELATIVE_CONFIGS: readonly string[] = ["config", "./config", "../config", ".", ""];
const RELATIVE_CWDS: readonly string[] = ["repo/pkg", "./pkg", ".", ""];
/** FCB-RELATIVE-BASE: every relative base under every source set reads the base reason; both bases absolute read measured. */
function judgeRelativeBase(reader: UserReader): Judged {
  const at = layoutIn(rowScratch(), "base");
  let judged = 0;
  for (const sources of SOURCE_SETS) {
    const label = `${reader.name} under ${JSON.stringify(sources)}`;
    measured(reader.readWith(at.cwd, sources, at.config), `${label}, both bases absolute (control)`);
    for (const configDir of RELATIVE_CONFIGS) {
      unknownBecause(reader.readWith(at.cwd, sources, configDir), reader.baseReason, `${label}, config directory ${JSON.stringify(configDir)}`);
      judged += 1;
    }
    for (const cwd of RELATIVE_CWDS) {
      unknownBecause(reader.readWith(cwd, sources, at.config), reader.baseReason, `${label}, cwd ${JSON.stringify(cwd)}`);
      judged += 1;
    }
    unknownBecause(reader.readWith("repo/pkg", sources, "config"), reader.baseReason, `${label}, both bases relative`);
    judged += 1;
  }
  return { family: "FCB-RELATIVE-BASE", subject: reader.name, judged };
}

/** [home, the config directory claudeUserConfigDir gives for it]: the relative homes FCB-RELATIVE-HOME hands. */
const RELATIVE_HOMES: readonly (readonly [string, string])[] = [
  ["operator", "operator/.claude"],
  ["./operator", "operator/.claude"],
  ["../operator", "../operator/.claude"],
  ["", ".claude"],
];
/** FCB-RELATIVE-HOME: each relative home, with CLAUDE_CONFIG_DIR unset and empty, stays relative and both readers refuse it. */
function judgeRelativeHome(): Judged {
  const at = layoutIn(rowScratch(), "home");
  let judged = 0;
  for (const env of [{}, { [CONFIG_ENV]: "" }]) {
    for (const [home, configDir] of RELATIVE_HOMES) {
      const label = `home ${JSON.stringify(home)} with ${JSON.stringify(env)}`;
      expect(claudeUserConfigDir(env, home, at.cwd), label).toBe(configDir);
      unknownBecause(INSTRUCTIONS.readWith(at.cwd, ["user"], configDir), INSTRUCTIONS.baseReason, `${label}, instructions`);
      unknownBecause(PROVIDER.readWith(at.cwd, ["user"], configDir), PROVIDER.baseReason, `${label}, provider`);
      judged += 3;
    }
  }
  return { family: "FCB-RELATIVE-HOME", subject: "claudeUserConfigDir", judged };
}

// The registered SubagentWorkflow path, driven as test/workbench-replay-dependencies-wiring.test.ts drives it: every
// agent call asks for worktree isolation, which the Claude host refuses before any SDK query, so a live call settles to
// null and a recorded answer can only come back through the journal, where the recording run's own row is planted as a
// settled answer. A resume then reads "replayed" (the planted answer, one call replayed) or "live" (null).
const PLANTED = "recorded verification answer";
const SCRIPT = 'export const meta={name:"replay-fail-closed",description:"fail-closed replay basis"};\nreturn await agent("verify the candidate", { isolation: "worktree" });';
interface Booted {
  readonly pi: ReturnType<typeof makePi>;
  readonly context: ReturnType<typeof ctx>;
  readonly dir: string;
}
async function boot(workbench: Record<string, unknown>): Promise<Booted> {
  sandbox = hermeticDir({ nonRepo: false, settings: { workflowsEnabled: true, workbench: { workflowAgentBackend: "claude", ...workbench } } });
  const pi = makePi();
  subagentsExtension(pi.pi);
  const context = ctx({ cwd: sandbox.dir });
  await pi.lifecycle.get("session_start")?.({}, context);
  return { pi, context, dir: sandbox.dir };
}
function git(dir: string, ...args: string[]): void {
  execFileSync("git", ["-C", dir, "-c", "user.name=Test Operator", "-c", "user.email=operator@example.invalid", ...args], { stdio: ["ignore", "pipe", "pipe"] });
}
function initRepo(dir: string, ignored: readonly string[]): void {
  execFileSync("git", ["init", "-q", dir]);
  writeFileSync(join(dir, "candidate.ts"), "export const candidate = 1;\n");
  writeFileSync(join(dir, ".gitignore"), ignored.map(path => `${path}\n`).join(""));
  git(dir, "add", "candidate.ts", ".gitignore");
  git(dir, "commit", "-qm", "baseline");
}
async function launch(booted: Booted, params: Record<string, unknown>): Promise<{ taskId: string; notice: string }> {
  const launched = await booted.pi.tools.get("SubagentWorkflow").execute("replay-fail-closed", params, undefined, undefined, booted.context);
  const taskId: unknown = launched.details?.taskId;
  if (typeof taskId !== "string") throw new Error(`SubagentWorkflow returned no task id: ${JSON.stringify(launched.content)}`);
  for (let i = 0; i < 1000; i++) {
    const notice = booted.pi.pi.sendMessage.mock.calls
      .map(([message]: [{ content?: unknown }]) => message?.content)
      .find((content: unknown): content is string => typeof content === "string" && content.includes(`<task-id>${taskId}</task-id>`));
    if (notice !== undefined) return { taskId, notice };
    await new Promise(resolve => setTimeout(resolve, 10));
  }
  throw new Error("workflow did not settle in the test window");
}
type Readings = Record<string, { state: string; digest?: string; reason?: string }>;
/** The readings element (the last of nine) of a journal row's recorded basis. */
function readingsOf(entry: WorkflowJournalEntry): Readings {
  const basis: unknown = JSON.parse(entry.basis ?? "null");
  if (!Array.isArray(basis)) throw new Error("the recorded basis is not an array");
  expect(basis).toHaveLength(9);
  return basis[8] as Readings;
}
/** Rewrite the recording run's one journal row as a settled answer, keeping its real key and basis; its readings. */
function plantAnswer(booted: Booted, taskId: string): Readings {
  const path = join(sessionTaskDir(booted.dir, "s1"), `${taskId}.workflow.jsonl`);
  const rows = readJournal(path);
  expect(rows).toEqual([expect.objectContaining({ index: 0, ok: false, basis: expect.any(String) })]);
  const recorded = rows[0];
  if (recorded === undefined) throw new Error("the recording run journaled no row");
  writeFileSync(path, `${JSON.stringify({ ...recorded, ok: true, text: PLANTED })}\n`);
  return readingsOf(recorded);
}
function outcomeOf(notice: string, from: string): "replayed" | "live" {
  const result = /<result>([\s\S]*?)<\/result>/.exec(notice)?.[1];
  const summary = /<summary>([\s\S]*?)<\/summary>/.exec(notice)?.[1] ?? "";
  if (result === PLANTED && summary.includes(`1 replayed from ${from}`)) return "replayed";
  if (result === "null" && !summary.includes("replayed")) return "live";
  throw new Error(`resume read neither replayed nor live: result ${JSON.stringify(result)}, summary ${JSON.stringify(summary)}`);
}
/** Resume the recording run with the same script and prompt: what came back, and the readings its own row recorded. */
async function resumedWith(booted: Booted, from: string): Promise<{ outcome: "replayed" | "live"; readings: Readings }> {
  const { taskId, notice } = await launch(booted, { script: SCRIPT, resumeFromRunId: from });
  const rows = readJournal(join(sessionTaskDir(booted.dir, "s1"), `${taskId}.workflow.jsonl`));
  const row = rows[0];
  expect(rows).toHaveLength(1);
  if (row === undefined) throw new Error("the resumed run journaled no row");
  return { outcome: outcomeOf(notice, from), readings: readingsOf(row) };
}

/**
 * FCB-UNNAMED-SOURCES and its control: the same eight setting-source files under no named source and under all three,
 * changed between the recording and the resume. The project and local files are Git-ignored, so the source reading
 * cannot see them and only the instruction and provider readings could move.
 */
async function judgeUnnamedSources(sources: readonly ClaudeSettingSource[] | undefined): Promise<Judged> {
  const config = makeScratch("replay-fail-closed-config-");
  scratches.push(config);
  process.env[CONFIG_ENV] = config;
  const booted = await boot(sources === undefined ? {} : { settingSources: [...sources] });
  initRepo(booted.dir, ["CLAUDE.md", "CLAUDE.local.md", ".claude/"]);
  const files: readonly (readonly [string, string, string])[] = [
    [join(config, "CLAUDE.md"), "user memory v1\n", "user memory v2\n"],
    [join(config, "skills", "review", "SKILL.md"), "user skill v1\n", "user skill v2\n"],
    [join(config, "settings.json"), '{"model":"claude-opus-5-5"}\n', '{"model":"claude-haiku-5-5"}\n'],
    [join(booted.dir, "CLAUDE.md"), "project memory v1\n", "project memory v2\n"],
    [join(booted.dir, ".claude", "skills", "review", "SKILL.md"), "project skill v1\n", "project skill v2\n"],
    [join(booted.dir, ".claude", "settings.json"), '{"outputStyle":"default"}\n', '{"outputStyle":"explanatory"}\n'],
    [join(booted.dir, "CLAUDE.local.md"), "local memory v1\n", "local memory v2\n"],
    [join(booted.dir, ".claude", "settings.local.json"), '{"theme":"dark"}\n', '{"theme":"light"}\n'],
  ];
  for (const [path, before] of files) write(path, before);
  const recording = await launch(booted, { script: SCRIPT });
  const recorded = plantAnswer(booted, recording.taskId);
  expect((await resumedWith(booted, recording.taskId)).outcome).toBe("replayed");
  for (const [path, , after] of files) write(path, after);
  const changed = await resumedWith(booted, recording.taskId);
  expect(changed.readings.source).toEqual(recorded.source);
  if (sources === undefined) {
    expect(changed.outcome).toBe("replayed");
    expect(changed.readings).toEqual(recorded);
  } else {
    expect(changed.outcome).toBe("live");
    expect(changed.readings.instructions).not.toEqual(recorded.instructions);
    expect(changed.readings.provider).not.toEqual(recorded.provider);
  }
  return { family: "FCB-UNNAMED-SOURCES", subject: sources === undefined ? "settingSources unset" : `settingSources ${sources.join(", ")}`, judged: files.length };
}

interface FamilyRow {
  readonly id: string;
  /** What the row judges: the reader, the helper or the settingSources form its judge names in what it returns. */
  readonly subject: string;
  readonly title: string;
  /** Run the row's plants; what it judged. */
  readonly judge: () => Judged | Promise<Judged>;
}
interface Family {
  readonly id: string;
  /** The refusal #3 unmet item and the gate member(s) the family answers. */
  readonly answers: string;
  /** The src file whose doc words carry the family's claim and cite its id. */
  readonly site: string;
  /** The claim, verbatim in this file's header. */
  readonly claim: string;
  /** The readings each of its rows judges. */
  readonly plants: number;
  readonly rows: readonly FamilyRow[];
}
const MODULE = "src/workbench/replay-dependencies.ts";
const REGISTERED = "src/index.ts";
const FAMILIES: readonly Family[] = [
  {
    id: "FCB-UNSTAT",
    answers: "U1 GP13-10",
    site: MODULE,
    claim: "Each of three planted stat refusals is an unknown reading by dependency-unreadable, never a stable absent digest: for each file reader under the user source, at the named path and at each depth 1 to 32 below the location, each plant (the directory the path lies in left listable but not searchable, two links naming each other, and a link naming a path with a 256-byte component) reads unknown where the same tree without the plant reads measured.",
    plants: 99,
    rows: [
      { id: "FCB-UNSTAT-instructions", subject: "instructions", title: "each stat refusal at each depth 0 to 32 is an unknown instruction reading (dependency-unreadable)", judge: () => judgeUnstat(INSTRUCTIONS) },
      { id: "FCB-UNSTAT-provider", subject: "provider", title: "each stat refusal at each depth 0 to 32 is an unknown provider reading (dependency-unreadable)", judge: () => judgeUnstat(PROVIDER) },
    ],
  },
  {
    id: "FCB-LINK-BELOW-FILE",
    answers: "U5 GP13-09",
    site: MODULE,
    claim: "Planted under the user source, a link naming a path below a regular file reads as absent: for each file reader under the user source, with the link at the named path and at each depth 1 to 32 below the location, the reading is measured and equal to the reading with the same link naming a missing path.",
    plants: 33,
    rows: [
      { id: "FCB-LINK-BELOW-FILE-instructions", subject: "instructions", title: "a link naming a path below a regular file, at each depth 0 to 32, reads as the same link naming a missing path (instructions)", judge: () => judgeLinkBelowFile(INSTRUCTIONS) },
      { id: "FCB-LINK-BELOW-FILE-provider", subject: "provider", title: "a link naming a path below a regular file, at each depth 0 to 32, reads as the same link naming a missing path (provider)", judge: () => judgeLinkBelowFile(PROVIDER) },
    ],
  },
  {
    id: "FCB-CYCLE-INNER",
    answers: "U2 GP13-01",
    site: MODULE,
    claim: "Up to 31 levels below a user-source location, a link naming the directory it lies in, or the directory above that one, keeps the cycle reason: for each file reader under the user source, a link naming the directory it lies in, at each depth 1 to 31 below the location, and a link naming the directory one level above the one it lies in, at each depth 2 to 31, each read unknown by dependency-cycle where the same tree without the link reads measured.",
    plants: 61,
    rows: [
      { id: "FCB-CYCLE-INNER-instructions", subject: "instructions", title: "a link naming the directory it lies in (depths 1 to 31) or the one above it (depths 2 to 31) is an unknown instruction reading (dependency-cycle)", judge: () => judgeCycleInner(INSTRUCTIONS) },
      { id: "FCB-CYCLE-INNER-provider", subject: "provider", title: "a link naming the directory it lies in (depths 1 to 31) or the one above it (depths 2 to 31) is an unknown provider reading (dependency-cycle)", judge: () => judgeCycleInner(PROVIDER) },
    ],
  },
  {
    id: "FCB-READ-AGAIN",
    answers: "U4 GP13-05",
    site: MODULE,
    claim: "Up to 31 levels below a user-source location, a directory first reached through one or two links that sort before it is read again, never as a cycle: for each file reader under the user source, at each depth 1 to 31 below the location, a directory named by one link that sorts before it, and one named by two links that both sort before it, give a measured reading that moves with that directory's bytes and equals the reading with each link replaced by a copy of the directory.",
    plants: 62,
    rows: [
      { id: "FCB-READ-AGAIN-instructions", subject: "instructions", title: "a directory first reached through one link or two links sorting before it, at each depth 1 to 31, is read again as its copy would be (instructions)", judge: () => judgeReadAgain(INSTRUCTIONS) },
      { id: "FCB-READ-AGAIN-provider", subject: "provider", title: "a directory first reached through one link or two links sorting before it, at each depth 1 to 31, is read again as its copy would be (provider)", judge: () => judgeReadAgain(PROVIDER) },
    ],
  },
  {
    id: "FCB-RELATIVE-BASE",
    answers: "U3 GP13-02 GP13-03",
    site: MODULE,
    claim: "Ten relative bases are each an unknown reading under each of the eight sets of known sources (none, each one, each two and all three of user, project and local): the relative config directories config, ./config, ../config, . and the empty string beside an absolute cwd, the relative cwds repo/pkg, ./pkg, . and the empty string beside an absolute config directory, and repo/pkg beside config each read unknown by instruction-base-not-absolute for the instruction reader and by setting-base-not-absolute for the provider reader, where both bases absolute read measured.",
    plants: 80,
    rows: [
      { id: "FCB-RELATIVE-BASE-instructions", subject: "instructions", title: "every relative base under each of the eight source sets is an unknown instruction reading (instruction-base-not-absolute)", judge: () => judgeRelativeBase(INSTRUCTIONS) },
      { id: "FCB-RELATIVE-BASE-provider", subject: "provider", title: "every relative base under each of the eight source sets is an unknown provider reading (setting-base-not-absolute)", judge: () => judgeRelativeBase(PROVIDER) },
    ],
  },
  {
    id: "FCB-RELATIVE-HOME",
    answers: "U7 GP13-08",
    site: MODULE,
    claim: "Four relative homes stay relative: with CLAUDE_CONFIG_DIR unset or empty and an absolute cwd, claudeUserConfigDir gives operator/.claude for the homes operator and ./operator, ../operator/.claude for ../operator and .claude for the empty home, and each file reader handed that directory under the user source reads unknown by its base reason.",
    plants: 24,
    rows: [{ id: "FCB-RELATIVE-HOME", subject: "claudeUserConfigDir", title: "a relative home gives a relative <home>/.claude, and both readers refuse it by their base reasons", judge: judgeRelativeHome }],
  },
  {
    id: "FCB-UNNAMED-SOURCES",
    answers: "U6 GP13-04",
    site: REGISTERED,
    claim: "With settingSources unset the registered path replays across eight changed setting-source files: changing the user CLAUDE.md, a user skill and the user settings.json under CLAUDE_CONFIG_DIR, and a Git-ignored project CLAUDE.md, project skill, project settings.json, local CLAUDE.local.md and local settings.local.json, between the recording and the resume replays the recorded answer under readings equal to the recorded ones, where the same changes under the user, project and local sources decline it.",
    plants: 8,
    rows: [
      { id: "FCB-UNNAMED-SOURCES", subject: "settingSources unset", title: "with settingSources unset, eight changed setting-source files replay the recorded answer under equal readings", judge: () => judgeUnnamedSources(undefined) },
      { id: "FCB-UNNAMED-SOURCES-CONTROL", subject: "settingSources user, project, local", title: "the same eight changed files under the user, project and local sources decline the recorded answer", judge: () => judgeUnnamedSources(["user", "project", "local"]) },
    ],
  },
];

for (const family of FAMILIES) {
  describe(`wb-6b3z ${family.id} (${family.answers})`, () => {
    for (const row of family.rows) {
      it(`${row.id}: ${row.title}`, async () => {
        expect(await row.judge()).toEqual({ family: family.id, subject: row.subject, judged: family.plants });
      }, 120_000);
    }
  });
}

const CLAIMS_OPEN = "CLAIMED here, each by the rows its family names, and nothing wider:";
const CLAIMS_CLOSE = "TABLE SHAPE:";
/** This file's header claim bullets, each as `<id> (<answers>): <claim>`, read from the header's own text. */
function headerClaims(): string[] {
  const source = readFileSync(new URL(import.meta.url), "utf8");
  const header = source.slice(source.indexOf("/**"), source.indexOf("*/"));
  const text = header
    .split("\n")
    .map(line => line.replace(/^\s*\/?\*+ ?/, ""))
    .join(" ")
    .replace(/\s+/g, " ");
  const start = text.indexOf(CLAIMS_OPEN);
  const end = text.indexOf(CLAIMS_CLOSE, start);
  if (start < 0 || end < 0) return [];
  return text
    .slice(start + CLAIMS_OPEN.length, end)
    .split(/(?:^| )- (?=FCB-)/)
    .map(item => item.trim())
    .filter(item => item !== "");
}
/** The FCB family ids a src file's text cites, each once, sorted. */
function citedFamilies(file: string): string[] {
  const text = readFileSync(new URL(`../${file}`, import.meta.url), "utf8");
  return [...new Set(text.match(/\bFCB-[A-Z]+(?:-[A-Z]+)*/g) ?? [])].sort();
}
const RECEIPT_LABEL = "(FAMILIES, FCB-FAMILIES-SHAPE):";
/** The list each line of this bead's receipt carrying the FAMILIES label gives, read up to the full stop and split at commas. */
function receiptFamilyLists(): string[][] {
  const receipt = readFileSync(new URL("../docs/workbench/receipts/wb-6b3z.md", import.meta.url), "utf8");
  return receipt
    .split("\n")
    .filter(line => line.includes(RECEIPT_LABEL))
    .map(line => {
      const after = line.slice(line.indexOf(RECEIPT_LABEL) + RECEIPT_LABEL.length);
      return after
        .slice(0, after.indexOf("."))
        .split(",")
        .map(item => item.trim())
        .filter(item => item !== "");
    });
}

describe("wb-6b3z the family table and its anchors outside its own literals", () => {
  it("FCB-CLAIMS-HEADER: the header's claim bullets are the family table's claims, each with its id and the items it answers, in table order", () => {
    expect(headerClaims()).toEqual(FAMILIES.map(family => `${family.id} (${family.answers}): ${family.claim}`));
  });

  it("FCB-ANCHOR-SRC: each src site cites exactly the families whose claims its doc words carry", () => {
    const sites = [...new Set(FAMILIES.map(family => family.site))].sort();
    expect(sites).toEqual([REGISTERED, MODULE].sort());
    for (const site of sites) {
      expect(citedFamilies(site), site).toEqual(
        FAMILIES.filter(family => family.site === site)
          .map(family => family.id)
          .sort(),
      );
    }
  });

  it("FCB-ANCHOR-RECEIPT: every line of this bead's receipt carrying the FAMILIES label lists each family with the items it answers, in table order", () => {
    const lists = receiptFamilyLists();
    expect(lists.length).toBeGreaterThan(0);
    for (const list of lists) expect(list).toEqual(FAMILIES.map(family => `${family.id} ${family.answers}`));
  });

  it("FCB-FAMILIES-SHAPE: the family table, written out (frozen shape): each family's id, answered items, site, plants per row and claim length, then each row's id, subject and title length", () => {
    expect(FAMILIES.map(family => `${family.id}|${family.answers}|${family.site}|${family.plants}|${family.claim.length}|${family.rows.map(row => `${row.id}:${row.subject}:${row.title.length}`).join(",")}`)).toEqual([
      "FCB-UNSTAT|U1 GP13-10|src/workbench/replay-dependencies.ts|99|447|FCB-UNSTAT-instructions:instructions:97,FCB-UNSTAT-provider:provider:94",
      "FCB-LINK-BELOW-FILE|U5 GP13-09|src/workbench/replay-dependencies.ts|33|302|FCB-LINK-BELOW-FILE-instructions:instructions:125,FCB-LINK-BELOW-FILE-provider:provider:121",
      "FCB-CYCLE-INNER|U2 GP13-01|src/workbench/replay-dependencies.ts|61|450|FCB-CYCLE-INNER-instructions:instructions:145,FCB-CYCLE-INNER-provider:provider:142",
      "FCB-READ-AGAIN|U4 GP13-05|src/workbench/replay-dependencies.ts|62|478|FCB-READ-AGAIN-instructions:instructions:147,FCB-READ-AGAIN-provider:provider:143",
      "FCB-RELATIVE-BASE|U3 GP13-02 GP13-03|src/workbench/replay-dependencies.ts|80|568|FCB-RELATIVE-BASE-instructions:instructions:121,FCB-RELATIVE-BASE-provider:provider:114",
      "FCB-RELATIVE-HOME|U7 GP13-08|src/workbench/replay-dependencies.ts|24|342|FCB-RELATIVE-HOME:claudeUserConfigDir:97",
      "FCB-UNNAMED-SOURCES|U6 GP13-04|src/index.ts|8|503|FCB-UNNAMED-SOURCES:settingSources unset:109,FCB-UNNAMED-SOURCES-CONTROL:settingSources user, project, local:98",
    ]);
  });
});
