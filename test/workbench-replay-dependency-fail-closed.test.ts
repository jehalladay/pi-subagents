/**
 * wb-6b3z [413a-exit]: the fail-closed core of the replay-dependency basis (src/workbench/replay-dependencies.ts and the
 * readings src/index.ts hands the embedded Claude host) - the eight realized GP13 escape families of wb-413a refusal #3
 * (gate-prep-13, run g10-gate-s231, cut #3 66e8dd25, unmet U1-U7), each pinned red-first. The structural exit row R-B664
 * (M:61935) moved these families out of wb-413a's R-B646 claim set and into this bead; the parent's cured members stay
 * with its own suites (test/workbench-replay-dependency-readers.test.ts, test/workbench-replay-dependencies-wiring.test.ts
 * and test/workbench-claude-replay-dependencies.test.ts), which this cut leaves byte-identical. Cut #2 answered this
 * bead's refusal #1 (gate-prep-43, run g10-gate-s241, cut #1 ef8186d6, unmet U1-U6) under the guard binding R-B717
 * (M:65110). Cut #3 answers refusal #2 (gate-prep-6, run g10-gate-s243, cut #2 62d757dc, unmet U1-U5) in the
 * enumerate-the-resolvable form, under the second-stage cap R-B721 (M:65552) and the guard bindings R-B722 (M:65553) and
 * R-B723 (M:65554): each claim below is exactly what its rows plant and assert, each form refusal #2 realized is planted
 * by a family row (U1 to U4) or read by the word pin (U5), and every other form is NOT CLAIMED, as the last part of this
 * header lists.
 *
 * Each row plants a form on real files in a scratch directory, or hands a reader the strings, runs the module's reader and
 * asserts the WHOLE reading: the exact unknown reason, or a measured reading equal to a named twin, each beside a measured
 * control where a plant is involved. Every family row is green on the real code and red under the gate member its family
 * answers; the receipt docs/workbench/receipts/wb-6b3z.md records the member counts.
 *
 * PINNED READER SET (this file; every row observed green on the cut):
 *  - FCB-UNSTAT-instructions, FCB-UNSTAT-provider: 136 plants each, each reading exactly {unknown, dependency-unreadable};
 *  - FCB-LINK-BELOW-FILE-instructions, FCB-LINK-BELOW-FILE-provider: 66 links each, each reading measured and equal;
 *  - FCB-CYCLE-INNER-instructions, FCB-CYCLE-INNER-provider: 61 links each, each reading exactly {unknown, dependency-cycle};
 *  - FCB-READ-AGAIN-instructions, FCB-READ-AGAIN-provider: 186 trees each, each measured, moving with each planted rewrite
 *    of each of its files and equal to its copy twin;
 *  - FCB-RELATIVE-BASE-instructions, FCB-RELATIVE-BASE-provider: 80 readings each, each reading its base reason;
 *  - FCB-RELATIVE-HOME: 24 readings (8 directories, each checked and handed to both readers);
 *  - FCB-UNNAMED-SOURCES: 8 files changed, the resume replayed under equal readings; FCB-UNNAMED-SOURCES-CONTROL: the same 8
 *    files under the three sources, the resume live;
 *  - FCB-FAMILIES-SHAPE, FCB-CLAIMS-HEADER, FCB-PLANT-SETS: the table shape and this file's words, the header's one claim
 *    block and each claim's plant sets; FCB-ANCHOR-SRC, FCB-ANCHOR-RECEIPT, FCB-RECEIPT-CLAIMS: the three anchors outside
 *    this file.
 *
 * CLAIMED here, each by the rows its family names, and nothing wider:
 *  - FCB-UNSTAT (U1 GP13-10): Each of 136 planted stat refusals per file reader is an unknown reading by
 *    dependency-unreadable, never a stable absent digest: for each file reader under the user source, each of four plants
 *    (the directory the path lies in left at mode 0600 with the path listed in it, the directory the path lies in left at
 *    mode 0400 with the path listed in it, two links naming each other and a link naming a path with a 256-byte
 *    component) at the named path and at each depth 1 to 32 below the location, and each of four plants with the named
 *    path absent from the directory it lies in (the directory empty at mode 0600, the directory holding only an unrelated
 *    entry at mode 0600, the directory empty at mode 0400 and the directory holding only an unrelated entry at mode
 *    0400), at the named path, reads unknown where the same tree without the plant reads measured.
 *  - FCB-LINK-BELOW-FILE (U5 GP13-09): Planted under the user source, each of 66 links per file reader naming a path
 *    below a regular file reads as absent: for each file reader under the user source, a link naming each of two targets
 *    (the path one level below the file and the path two levels below the file), with the link at the named path and at
 *    each depth 1 to 32 below the location, reads measured and equal to the reading with the same link naming a missing
 *    path.
 *  - FCB-CYCLE-INNER (U2 GP13-01): Up to 31 levels below a user-source location, each of 61 links per file reader
 *    naming the directory it lies in, or the directory above that one, keeps the cycle reason: for each file reader under
 *    the user source, a link naming the directory it lies in, at each depth 1 to 31 below the location, and a link naming
 *    the directory one level above the one it lies in, at each depth 2 to 31, each read unknown by dependency-cycle where
 *    the same tree without the link reads measured.
 *  - FCB-READ-AGAIN (U4 GP13-05): Up to 31 levels below a user-source location, each of 186 trees per file reader, a
 *    directory first reached through one or two links that sort before it, is read again, never as a cycle: for each file
 *    reader under the user source, at each depth 1 to 31 below the location, each of two shapes (a directory named by one
 *    link that sorts before it and a directory named by two links that both sort before it), the directory holding each
 *    of three contents (one file (entry.md), two files (entry.md and second.md) and two files whose UTF-16 code-unit order
 *    and English collation order differ (B.md and a.md)), gives a measured reading that moves when each of its files in
 *    turn has its text (its name, a space and a version) rewritten from version v1 to version v2, the same length,
 *    returns when that file is restored and equals the reading with each link replaced by a copy of the directory.
 *  - FCB-RELATIVE-BASE (U3 GP13-02 GP13-03): Each of 80 readings per file reader is unknown, ten relative bases under
 *    each of the eight sets of known sources (none, each one, each two and all three of user, project and local): the
 *    relative config directories config, ./config, ../config, . and the empty string beside an absolute cwd, the relative
 *    cwds repo/pkg, ./pkg, . and the empty string beside an absolute config directory, and repo/pkg beside config each
 *    read unknown by instruction-base-not-absolute for the instruction reader and by setting-base-not-absolute for the
 *    provider reader, where both bases absolute read measured.
 *  - FCB-RELATIVE-HOME (U7 GP13-08): Each of 24 readings keeps a relative home relative, four relative homes under each
 *    of two CLAUDE_CONFIG_DIR settings (unset and empty) with three readings each: with an absolute cwd,
 *    claudeUserConfigDir gives operator/.claude for the homes operator and ./operator, ../operator/.claude for
 *    ../operator and .claude for the empty home, and each file reader handed that directory under the user source reads
 *    unknown by its base reason.
 *  - FCB-UNNAMED-SOURCES (U6 GP13-04): With settingSources unset the registered path replays across eight changed
 *    setting-source files: changing the user CLAUDE.md, a user skill and the user settings.json under CLAUDE_CONFIG_DIR,
 *    and a Git-ignored project CLAUDE.md, project skill, project settings.json, local CLAUDE.local.md and local
 *    settings.local.json, between the recording and the resume replays the recorded answer under readings equal to the
 *    recorded ones, where the same changes under the user, project and local sources decline it.
 * TABLE SHAPE: the family table, written out with its plant counts, claim lengths and rows (each row's subject and title
 * length; each row asserts the family, subject and count its judge returns), and this file's words (every comment as the
 * TypeScript parser's comment ranges give it, this header among them, and every group and case title as the test runner
 * registers it) as this cut delivers them (FCB-FAMILIES-SHAPE);
 * the table's claims are the claims above, this file's one claim block (FCB-CLAIMS-HEADER); each claim names its
 * family's plant count and, word for word, the forms, modes, depths, targets, contents, versions, bases, homes and files
 * its judge's data plants, and each row title names its family's plant count (FCB-PLANT-SETS); the src doc comments that
 * cite the families or this bead read word for word as this cut delivers them and cite exactly the families the table
 * names for each file (FCB-ANCHOR-SRC); and this bead's receipt, as marked 18 lexes it, carries no HTML, image, hard line
 * break or character reference, lists the families in every text carrying the FAMILIES label (FCB-ANCHOR-RECEIPT),
 * carries each claim word for word in its cut #3 entry and reads word for word as this cut delivers it
 * (FCB-RECEIPT-CLAIMS).
 *
 * NOT CLAIMED by this suite: a read error no row plants (an I/O error among them); a FIFO, a link to a character device,
 * and a directory or a file the process may not read, at any depth (the readers suite claims them one level below a
 * location); the list-only plants under a process running as root (root searches any mode, so there those plants read
 * measured, and the rows assert that instead); a directory left at any mode other than 0600 and 0400, a mode with group
 * or other permission bits set among them; a directory below the named path, at either mode, that lists no entry;
 * FCB-UNSTAT, FCB-LINK-BELOW-FILE, FCB-CYCLE-INNER and FCB-READ-AGAIN under the project or local source; a link naming a
 * path three or more levels below a regular file; a link naming a directory two or more levels above the one it lies in;
 * a directory first reached through a link at the named path, or through three or more links, or holding a
 * subdirectory, three or more entries or entries other than the three planted contents; a change to a file's bytes
 * other than the planted rewrite of its version; a relative string for either base other than those FCB-RELATIVE-BASE
 * hands; a relative home other than the four FCB-RELATIVE-HOME hands, CLAUDE_CONFIG_DIR set beside a relative home, and
 * a relative HOME at the registered path; settingSources set to the empty list at the registered path; which identity
 * the registered path hands the provider reader; the src doc words outside the comments FCB-ANCHOR-SRC holds; this
 * file's text other than its comments and its registered titles (its code, strings and identifiers), which
 * FCB-FAMILIES-SHAPE's word pin does not read; and that the receipt's texts other than its FAMILIES-labelled texts and
 * its cut #3 claim items, and this file's words other than its claims, state the pinned readings (those texts and words
 * are held to their delivered bytes only).
 */
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { chmodSync, existsSync, lstatSync, mkdirSync, readdirSync, readFileSync, readlinkSync, realpathSync, type Stats, statSync, symlinkSync, unlinkSync, writeFileSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import { marked, type Token, type Tokens } from "marked";
import ts from "typescript";
import { afterEach, describe, expect, it, type TestContext } from "vitest";
import subagentsExtension from "../src/index.js";
import { sessionTaskDir } from "../src/output-file.js";
import {
  CLAUDE_INSTRUCTION_LOCATIONS,
  CLAUDE_SETTINGS_LOCATIONS,
  type ClaudeSettingSource,
  claudeUserConfigDir,
  instructionDependency,
  instructionPaths,
  providerDependency,
  type ReplayDependency,
} from "../src/workbench/replay-dependencies.js";
import { readJournal, type WorkflowJournalEntry } from "../src/workflow/journal.js";
import { ctx, hermeticDir, makePi } from "./helpers/boot-extension.js";
import { docsSection } from "./helpers/census.js";
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

// How a claim spells what its judge's data plants (FCB-PLANT-SETS reads each family's claim through these).
const NUMBER_WORDS: readonly string[] = ["no", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
/** A count as the claims spell it: one to ten in words, a larger count in digits. */
function counted(count: number): string {
  return NUMBER_WORDS[count] ?? String(count);
}
/** Items as the claims list them: "a", "a and b", "a, b and c". */
function listed(items: readonly string[]): string {
  if (items.length <= 1) return items[0] ?? "";
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}
/** "<first> to <last>" for a run of depths each one more than the one before; a gap or a repeat fails the reading row. */
function depthRange(depths: readonly number[]): string {
  const first = depths[0] ?? 0;
  expect(depths, "a run of consecutive depths").toEqual(Array.from({ length: depths.length }, (_, step) => first + step));
  return `${first} to ${first + depths.length - 1}`;
}
/** A relative base as the claims spell it: the empty string by name. */
function spelled(base: string): string {
  return base === "" ? "the empty string" : base;
}

/** The depths a walk stats an entry at: 0 (the named path) to 32 (a file 32 levels below the location is read). */
const STAT_DEPTHS: readonly number[] = Array.from({ length: 33 }, (_, depth) => depth);
/** The depths a directory or a link a walk follows can sit at below the location: 1 to 31. */
const WALK_DEPTHS: readonly number[] = Array.from({ length: 31 }, (_, depth) => depth + 1);
/** The phrase a claim gives the named path and the depths below it that STAT_DEPTHS spans. */
function statDepthWords(): string {
  expect(STAT_DEPTHS[0], "the first stat depth is the named path").toBe(0);
  return `at the named path and at each depth ${depthRange(STAT_DEPTHS.slice(1))} below the location`;
}

/** What a row judged: its family and subject, named by the judge itself, and the number of readings it judged. */
interface Judged {
  readonly family: string;
  readonly subject: string;
  readonly judged: number;
}

/** A stat refusal FCB-UNSTAT plants: its words in the family's claim, its scratch key, and how it is planted. */
interface StatRefusal {
  readonly words: string;
  readonly key: string;
  /** A mode the process may not search, which a process running as root searches anyway. */
  readonly listOnly: boolean;
  /** What the measured control reads beside the plant: written in `dir`, the directory the path lies in, or at `path`. */
  readonly prepare: (dir: string, path: string) => void;
  readonly plant: (dir: string, path: string) => void;
  /** What the plant left, read back before the reading is judged: the form its words name, and no other. */
  readonly witness: (dir: string, path: string) => void;
}
const NOTHING_WRITTEN = (): void => {};
/** The modes FCB-UNSTAT leaves a directory at: rw------- and r--------, each a mode its owner may list but not search. */
const LIST_ONLY_MODES: readonly number[] = [0o600, 0o400];
/** A mode as the claims spell it: "mode 0600", "mode 0400". */
function modeWords(mode: number): string {
  return `mode ${mode.toString(8).padStart(4, "0")}`;
}
/** Leave a directory at `mode`. */
function listOnlyAt(mode: number): (dir: string) => void {
  return dir => chmodSync(dir, mode);
}
/** The directory left at `mode`, read back, its listing exactly `names`. */
function listOnlyListing(dir: string, mode: number, names: readonly string[]): void {
  expect(statSync(dir).mode & 0o777, `${dir}: left at ${modeWords(mode)}`).toBe(mode);
  expect(readdirSync(dir).sort(), `${dir}: its listing`).toEqual([...names].sort());
}
/** The four stat refusals FCB-UNSTAT plants at the named path and at each depth below the location (STAT_DEPTHS). */
const STAT_REFUSALS: readonly StatRefusal[] = [
  ...LIST_ONLY_MODES.map(
    (mode): StatRefusal => ({
      words: `the directory the path lies in left at ${modeWords(mode)} with the path listed in it`,
      key: `list-only-${mode.toString(8)}`,
      listOnly: true,
      prepare: (_dir, path) => write(path, "entry"),
      plant: listOnlyAt(mode),
      witness: (dir, path) => listOnlyListing(dir, mode, [basename(path)]),
    }),
  ),
  {
    words: "two links naming each other",
    key: "loop",
    listOnly: false,
    prepare: NOTHING_WRITTEN,
    plant: (_dir, path) => {
      symlinkSync(`${path}.loop`, path);
      symlinkSync(path, `${path}.loop`);
    },
    witness: (_dir, path) => {
      expect(readlinkSync(path), `${path}: names its twin`).toBe(`${path}.loop`);
      expect(readlinkSync(`${path}.loop`), `${path}.loop: names the path`).toBe(path);
    },
  },
  {
    words: "a link naming a path with a 256-byte component",
    key: "long-component",
    listOnly: false,
    prepare: NOTHING_WRITTEN,
    plant: (_dir, path) => symlinkSync(`/${"n".repeat(256)}`, path),
    witness: (_dir, path) => {
      expect(
        readlinkSync(path)
          .split("/")
          .map(component => Buffer.byteLength(component)),
        `${path}: a component of 256 bytes`,
      ).toContain(256);
    },
  },
];
/** The four stat refusals FCB-UNSTAT plants at the named path only, the named path absent from the directory it lies in. */
const NAMED_ABSENT: readonly StatRefusal[] = LIST_ONLY_MODES.flatMap((mode): StatRefusal[] => [
  {
    words: `the directory empty at ${modeWords(mode)}`,
    key: `absent-empty-${mode.toString(8)}`,
    listOnly: true,
    prepare: NOTHING_WRITTEN,
    plant: listOnlyAt(mode),
    witness: dir => listOnlyListing(dir, mode, []),
  },
  {
    words: `the directory holding only an unrelated entry at ${modeWords(mode)}`,
    key: `absent-unrelated-${mode.toString(8)}`,
    listOnly: true,
    prepare: dir => write(join(dir, "unrelated.txt"), "not a named path"),
    plant: listOnlyAt(mode),
    witness: dir => listOnlyListing(dir, mode, ["unrelated.txt"]),
  },
]);
/** FCB-UNSTAT: each refusal at each of its depths, after a measured control on the same tree without the refusal. */
function judgeUnstat(reader: UserReader): Judged {
  const scratch = rowScratch();
  let judged = 0;
  const judgeAt = (refusal: StatRefusal, depth: number): void => {
    const label = `${reader.name}: ${refusal.words} at depth ${depth}`;
    const at = layoutIn(scratch, `${refusal.key}-${depth}`);
    const named = join(at.config, reader.location);
    // The directory the refused path lies in: the config directory for the named path, else the level above it.
    const dir = depth === 0 ? at.config : levelDir(named, depth - 1);
    const path = depth === 0 ? named : join(dir, "entry.md");
    refusal.prepare(dir, path);
    measured(reader.read(at), `${label} (control)`);
    refusal.plant(dir, path);
    refusal.witness(dir, path);
    if (refusal.listOnly && ROOT_USER) measured(reader.read(at), `${label} (root searches any mode)`);
    else unknownBecause(reader.read(at), "dependency-unreadable", label);
    judged += 1;
  };
  for (const refusal of STAT_REFUSALS) for (const depth of STAT_DEPTHS) judgeAt(refusal, depth);
  for (const refusal of NAMED_ABSENT) judgeAt(refusal, 0);
  return { family: "FCB-UNSTAT", subject: reader.name, judged };
}

/** The paths below plain.txt, a regular file, that FCB-LINK-BELOW-FILE's links name: one level and two levels below it. */
const BELOW_FILE_TARGETS: readonly (readonly string[])[] = [["below"], ["inner", "below"]];
/** A target as the claims spell it: "the path one level below the file", "the path two levels below the file". */
function targetWords(segments: readonly string[]): string {
  return `the path ${counted(segments.length)} level${segments.length === 1 ? "" : "s"} below the file`;
}
/** FCB-LINK-BELOW-FILE: at each depth, a link naming each target below a regular file reads as the same link naming nothing. */
function judgeLinkBelowFile(reader: UserReader): Judged {
  const scratch = rowScratch();
  let judged = 0;
  for (const depth of STAT_DEPTHS) {
    for (const segments of BELOW_FILE_TARGETS) {
      const label = `${reader.name}: link at depth ${depth} naming ${targetWords(segments)}`;
      const at = layoutIn(scratch, `link-${segments.length}-${depth}`);
      write(join(at.root, "plain.txt"), "a regular file");
      const named = join(at.config, reader.location);
      const link = depth === 0 ? named : join(levelDir(named, depth - 1), "broken");
      symlinkSync(join(at.root, "nowhere"), link);
      expect([readlinkSync(link), existsSync(join(at.root, "nowhere"))], `${label}: names a missing path`).toEqual([join(at.root, "nowhere"), false]);
      const missing = measured(reader.read(at), `${label}, the link naming a missing path`);
      unlinkSync(link);
      const target = join(at.root, "plain.txt", ...segments);
      symlinkSync(target, link);
      expect([readlinkSync(link), lstatSync(join(at.root, "plain.txt")).isFile()], `${label}: names a path below a regular file`).toEqual([target, true]);
      expect(measured(reader.read(at), label), label).toBe(missing);
      judged += 1;
    }
  }
  return { family: "FCB-LINK-BELOW-FILE", subject: reader.name, judged };
}

/** The depths FCB-CYCLE-INNER plants a link naming the directory it lies in at: 1 to 31. */
const OWN_DEPTHS: readonly number[] = WALK_DEPTHS;
/** The depths FCB-CYCLE-INNER plants a link naming the directory above the one it lies in at: 2 to 31. */
const ABOVE_DEPTHS: readonly number[] = WALK_DEPTHS.filter(depth => depth >= 2);
/** FCB-CYCLE-INNER: a link naming the directory it lies in, or the directory above that one, at each depth. */
function judgeCycleInner(reader: UserReader): Judged {
  const scratch = rowScratch();
  let judged = 0;
  for (const depth of OWN_DEPTHS) {
    const label = `${reader.name}: link at depth ${depth} naming the directory it lies in`;
    const at = layoutIn(scratch, `own-${depth}`);
    const dir = levelDir(join(at.config, reader.location), depth - 1);
    write(join(dir, "entry.md"), "entry");
    measured(reader.read(at), `${label} (control)`);
    symlinkSync(dir, join(dir, "again"));
    expect(readlinkSync(join(dir, "again")), `${label}: names the directory it lies in`).toBe(dir);
    unknownBecause(reader.read(at), "dependency-cycle", label);
    judged += 1;
  }
  for (const depth of ABOVE_DEPTHS) {
    const label = `${reader.name}: link at depth ${depth} naming the directory above the one it lies in`;
    const at = layoutIn(scratch, `above-${depth}`);
    const above = levelDir(join(at.config, reader.location), depth - 2);
    write(join(above, "inner", "entry.md"), "entry");
    measured(reader.read(at), `${label} (control)`);
    symlinkSync(above, join(above, "inner", "again"));
    expect(readlinkSync(join(above, "inner", "again")), `${label}: names the directory above the one it lies in`).toBe(above);
    unknownBecause(reader.read(at), "dependency-cycle", label);
    judged += 1;
  }
  return { family: "FCB-CYCLE-INNER", subject: reader.name, judged };
}

/** An FCB-READ-AGAIN shape: its words in the claim, the directory the links name, and the links, each sorting before it. */
interface ReadAgainShape {
  readonly words: string;
  readonly target: string;
  readonly links: readonly string[];
}
const READ_AGAIN_SHAPES: readonly ReadAgainShape[] = [
  { words: "a directory named by one link that sorts before it", target: "review", links: ["a"] },
  { words: "a directory named by two links that both sort before it", target: "zeta", links: ["alias", "beta"] },
];
/**
 * The files the directory the links name holds, in UTF-16 code-unit name order: one file, two files, and two files whose
 * code-unit order and English collation order differ, so a reach listed in another order than its copy reads apart.
 */
const READ_AGAIN_CONTENTS: readonly (readonly string[])[] = [["entry.md"], ["entry.md", "second.md"], ["B.md", "a.md"]];
/** English collation, an order a reader could list a reached directory in instead of UTF-16 code-unit order. */
const ENGLISH = new Intl.Collator("en");
/** Whether UTF-16 code-unit order and English collation order put `files` in different orders. */
function sortsApart(files: readonly string[]): boolean {
  return JSON.stringify([...files].sort()) !== JSON.stringify([...files].sort(ENGLISH.compare));
}
/** The words a claim gives one content: "one file (entry.md)", "two files whose ... differ (B.md and a.md)". */
function contentWords(files: readonly string[]): string {
  const apart = sortsApart(files) ? " whose UTF-16 code-unit order and English collation order differ" : "";
  return `${counted(files.length)} file${files.length === 1 ? "" : "s"}${apart} (${listed(files)})`;
}
/** The two versions a file's text carries, after its name and a space: a rewrite from the first to the second keeps the length. */
const VERSIONS: readonly [string, string] = ["v1", "v2"];
function fileText(name: string, version: string): string {
  return `${name} ${version}`;
}
/**
 * FCB-READ-AGAIN: at each depth, each shape holding each content is measured, moves when each of its files in turn is
 * rewritten to its second version and back, and equals its copy twin.
 */
function judgeReadAgain(reader: UserReader): Judged {
  // The scratch path as the walk's real path: a directory reached by its own name reads with its path equal to its real
  // path, so only a reach through a link reads with a path apart from its real path.
  const scratch = realpathSync(rowScratch());
  const [before, after] = VERSIONS;
  let judged = 0;
  for (const depth of WALK_DEPTHS) {
    for (const shape of READ_AGAIN_SHAPES) {
      for (const [content, files] of READ_AGAIN_CONTENTS.entries()) {
        const label = `${reader.name}: ${shape.words}, holding ${contentWords(files)}, at depth ${depth}`;
        const at = layoutIn(scratch, `${shape.target}-${content}-${depth}`);
        const dir = levelDir(join(at.config, reader.location), depth - 1);
        const target = join(dir, shape.target);
        // The named directory, or a copy of it in a link's place: each file's text is its name and the first version.
        const fill = (directory: string): void => {
          for (const name of files) write(join(directory, name), fileText(name, before));
        };
        fill(target);
        for (const link of shape.links) symlinkSync(target, join(dir, link));
        expect(
          shape.links.map(link => [readlinkSync(join(dir, link)), link < shape.target]),
          `${label}: each link names the directory and sorts before it`,
        ).toEqual(shape.links.map(() => [target, true]));
        expect([realpathSync(target), readdirSync(target).sort()], `${label}: the directory's real path and its files`).toEqual([target, [...files]]);
        const v1 = measured(reader.read(at), label);
        for (const name of files) {
          expect(fileText(name, after).length, `${label}: ${name}'s rewrite keeps its length`).toBe(fileText(name, before).length);
          write(join(target, name), fileText(name, after));
          expect(measured(reader.read(at), `${label}, ${name} rewritten`), `${label}, ${name} rewritten`).not.toBe(v1);
          write(join(target, name), fileText(name, before));
          expect(measured(reader.read(at), `${label}, ${name} restored`), `${label}, ${name} restored`).toBe(v1);
        }
        // The copy twin: each link replaced by a directory holding the same files, so the walk read each reach in full.
        for (const link of shape.links) {
          unlinkSync(join(dir, link));
          fill(join(dir, link));
        }
        expect(
          shape.links.map(link => [lstatSync(join(dir, link)).isDirectory(), readdirSync(join(dir, link)).sort()]),
          `${label}: each link replaced by a copy`,
        ).toEqual(shape.links.map(() => [true, [...files]]));
        expect(measured(reader.read(at), `${label}, links replaced by copies`), label).toBe(v1);
        judged += 1;
      }
    }
  }
  return { family: "FCB-READ-AGAIN", subject: reader.name, judged };
}

/** The three known sources in source order, as the module's own location table names them. */
const SOURCE_NAMES = Object.keys(CLAUDE_INSTRUCTION_LOCATIONS) as ClaudeSettingSource[];
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
/** Every subset of the known sources, by size and then in source order: what "none, each one, each two and all three" spells. */
function sourceSubsets(): ClaudeSettingSource[][] {
  const subsets: ClaudeSettingSource[][] = [];
  const grow = (size: number, from: number, picked: ClaudeSettingSource[]): void => {
    if (picked.length === size) {
      subsets.push(picked);
      return;
    }
    for (let index = from; index < SOURCE_NAMES.length; index++) {
      const name = SOURCE_NAMES[index];
      if (name !== undefined) grow(size, index + 1, [...picked, name]);
    }
  };
  for (let size = 0; size <= SOURCE_NAMES.length; size++) grow(size, 0, []);
  return subsets;
}
const RELATIVE_CONFIGS: readonly string[] = ["config", "./config", "../config", ".", ""];
const RELATIVE_CWDS: readonly string[] = ["repo/pkg", "./pkg", ".", ""];
/** The bases both relative. */
const BOTH_RELATIVE = { cwd: "repo/pkg", configDir: "config" } as const;
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
    unknownBecause(reader.readWith(BOTH_RELATIVE.cwd, sources, BOTH_RELATIVE.configDir), reader.baseReason, `${label}, both bases relative`);
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
/** The CLAUDE_CONFIG_DIR settings each relative home is handed under, with their words in the claim. */
const HOME_ENVS: readonly { readonly words: string; readonly env: Readonly<Record<string, string>> }[] = [
  { words: "unset", env: {} },
  { words: "empty", env: { [CONFIG_ENV]: "" } },
];
/** The words a claim gives the relative homes: each directory with the homes that give it, in table order. */
function homesWords(): string {
  const groups: { readonly dir: string; readonly homes: string[] }[] = [];
  for (const [home, dir] of RELATIVE_HOMES) {
    const last = groups[groups.length - 1];
    if (last !== undefined && last.dir === dir) last.homes.push(home);
    else groups.push({ dir, homes: [home] });
  }
  return listed(
    groups.map(({ dir, homes }) =>
      homes.length > 1 ? `${dir} for the homes ${listed(homes)}` : homes[0] === "" ? `${dir} for the empty home` : `${dir} for ${homes[0] ?? ""}`,
    ),
  );
}
/** FCB-RELATIVE-HOME: each relative home, with CLAUDE_CONFIG_DIR unset and empty, stays relative and both readers refuse it. */
function judgeRelativeHome(): Judged {
  const at = layoutIn(rowScratch(), "home");
  let judged = 0;
  for (const { env } of HOME_ENVS) {
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
 * A setting-source file FCB-UNNAMED-SOURCES changes: its source (the user source's files lie under the config directory,
 * the project and local sources' under the cwd), its path there, its words in the claim, and its bytes.
 */
interface UnnamedFile {
  readonly source: ClaudeSettingSource;
  readonly path: readonly string[];
  readonly words: string;
  readonly before: string;
  readonly after: string;
}
const UNNAMED_FILES: readonly UnnamedFile[] = [
  { source: "user", path: ["CLAUDE.md"], words: "the user CLAUDE.md", before: "user memory v1\n", after: "user memory v2\n" },
  { source: "user", path: ["skills", "review", "SKILL.md"], words: "a user skill", before: "user skill v1\n", after: "user skill v2\n" },
  { source: "user", path: ["settings.json"], words: "the user settings.json", before: '{"model":"claude-opus-5-5"}\n', after: '{"model":"claude-haiku-5-5"}\n' },
  { source: "project", path: ["CLAUDE.md"], words: "project CLAUDE.md", before: "project memory v1\n", after: "project memory v2\n" },
  { source: "project", path: [".claude", "skills", "review", "SKILL.md"], words: "project skill", before: "project skill v1\n", after: "project skill v2\n" },
  { source: "project", path: [".claude", "settings.json"], words: "project settings.json", before: '{"outputStyle":"default"}\n', after: '{"outputStyle":"explanatory"}\n' },
  { source: "local", path: ["CLAUDE.local.md"], words: "local CLAUDE.local.md", before: "local memory v1\n", after: "local memory v2\n" },
  { source: "local", path: [".claude", "settings.local.json"], words: "local settings.local.json", before: '{"theme":"dark"}\n', after: '{"theme":"light"}\n' },
];
/**
 * Whether a changed file is one its source reads: a path the module's own tables name for that source (an instruction path
 * instructionPaths gives, or its CLAUDE_SETTINGS_LOCATIONS file under its base), or a file below one of them.
 */
function readByItsSource(file: UnnamedFile, cwd: string, configDir: string): boolean {
  const base = file.source === "user" ? configDir : cwd;
  const path = join(base, ...file.path);
  const named = [...instructionPaths(cwd, [file.source], configDir), ...CLAUDE_SETTINGS_LOCATIONS[file.source].map(location => join(base, location))];
  return named.some(location => path === location || path.startsWith(`${location}/`));
}
/** The sources the control names: all three, in source order. */
const CONTROL_SOURCES: readonly ClaudeSettingSource[] = ["user", "project", "local"];
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
  const pathOf = (file: UnnamedFile): string => join(file.source === "user" ? config : booted.dir, ...file.path);
  for (const file of UNNAMED_FILES) write(pathOf(file), file.before);
  const recording = await launch(booted, { script: SCRIPT });
  const recorded = plantAnswer(booted, recording.taskId);
  expect((await resumedWith(booted, recording.taskId)).outcome).toBe("replayed");
  for (const file of UNNAMED_FILES) write(pathOf(file), file.after);
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
  return { family: "FCB-UNNAMED-SOURCES", subject: sources === undefined ? "settingSources unset" : `settingSources ${sources.join(", ")}`, judged: UNNAMED_FILES.length };
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
  /** The unmet item of wb-413a refusal #3 and the gate member(s) the family answers. */
  readonly answers: string;
  /** The src file whose doc comments cite the family's id (FCB-ANCHOR-SRC holds those comments to their delivered words). */
  readonly site: string;
  /** The claim, verbatim in this file's header and in the receipt's cut #2 entry. */
  readonly claim: string;
  /** The readings each of its rows judges. */
  readonly plants: number;
  /** The readings its judge's data gives one row, computed from that data (FCB-PLANT-SETS holds it to `plants`). */
  readonly planted: () => number;
  /** What the claim must say, word for word, computed from its judge's data: the count and each planted set (FCB-PLANT-SETS). */
  readonly phrases: () => readonly string[];
  readonly rows: readonly FamilyRow[];
}
const MODULE = "src/workbench/replay-dependencies.ts";
const REGISTERED = "src/index.ts";
const FAMILIES: readonly Family[] = [
  {
    id: "FCB-UNSTAT",
    answers: "U1 GP13-10",
    site: MODULE,
    claim: "Each of 136 planted stat refusals per file reader is an unknown reading by dependency-unreadable, never a stable absent digest: for each file reader under the user source, each of four plants (the directory the path lies in left at mode 0600 with the path listed in it, the directory the path lies in left at mode 0400 with the path listed in it, two links naming each other and a link naming a path with a 256-byte component) at the named path and at each depth 1 to 32 below the location, and each of four plants with the named path absent from the directory it lies in (the directory empty at mode 0600, the directory holding only an unrelated entry at mode 0600, the directory empty at mode 0400 and the directory holding only an unrelated entry at mode 0400), at the named path, reads unknown where the same tree without the plant reads measured.",
    plants: 136,
    planted: () => STAT_REFUSALS.length * STAT_DEPTHS.length + NAMED_ABSENT.length,
    phrases: () => [
      `Each of ${STAT_REFUSALS.length * STAT_DEPTHS.length + NAMED_ABSENT.length} planted stat refusals per file reader`,
      `each of ${counted(STAT_REFUSALS.length)} plants (${listed(STAT_REFUSALS.map(refusal => refusal.words))}) ${statDepthWords()}`,
      `each of ${counted(NAMED_ABSENT.length)} plants with the named path absent from the directory it lies in (${listed(NAMED_ABSENT.map(refusal => refusal.words))}), at the named path`,
    ],
    rows: [
      { id: "FCB-UNSTAT-instructions", subject: "instructions", title: "each of the 136 planted stat refusals (four forms at each depth 0 to 32, four absent forms at the named path) is an unknown instruction reading (dependency-unreadable)", judge: () => judgeUnstat(INSTRUCTIONS) },
      { id: "FCB-UNSTAT-provider", subject: "provider", title: "each of the 136 planted stat refusals (four forms at each depth 0 to 32, four absent forms at the named path) is an unknown provider reading (dependency-unreadable)", judge: () => judgeUnstat(PROVIDER) },
    ],
  },
  {
    id: "FCB-LINK-BELOW-FILE",
    answers: "U5 GP13-09",
    site: MODULE,
    claim: "Planted under the user source, each of 66 links per file reader naming a path below a regular file reads as absent: for each file reader under the user source, a link naming each of two targets (the path one level below the file and the path two levels below the file), with the link at the named path and at each depth 1 to 32 below the location, reads measured and equal to the reading with the same link naming a missing path.",
    plants: 66,
    planted: () => STAT_DEPTHS.length * BELOW_FILE_TARGETS.length,
    phrases: () => [
      `each of ${STAT_DEPTHS.length * BELOW_FILE_TARGETS.length} links per file reader`,
      `each of ${counted(BELOW_FILE_TARGETS.length)} targets (${listed(BELOW_FILE_TARGETS.map(targetWords))})`,
      `with the link ${statDepthWords()}`,
    ],
    rows: [
      { id: "FCB-LINK-BELOW-FILE-instructions", subject: "instructions", title: "each of the 66 planted links naming the path one level or two levels below a regular file, at each depth 0 to 32, reads as the same link naming a missing path (instructions)", judge: () => judgeLinkBelowFile(INSTRUCTIONS) },
      { id: "FCB-LINK-BELOW-FILE-provider", subject: "provider", title: "each of the 66 planted links naming the path one level or two levels below a regular file, at each depth 0 to 32, reads as the same link naming a missing path (provider)", judge: () => judgeLinkBelowFile(PROVIDER) },
    ],
  },
  {
    id: "FCB-CYCLE-INNER",
    answers: "U2 GP13-01",
    site: MODULE,
    claim: "Up to 31 levels below a user-source location, each of 61 links per file reader naming the directory it lies in, or the directory above that one, keeps the cycle reason: for each file reader under the user source, a link naming the directory it lies in, at each depth 1 to 31 below the location, and a link naming the directory one level above the one it lies in, at each depth 2 to 31, each read unknown by dependency-cycle where the same tree without the link reads measured.",
    plants: 61,
    planted: () => OWN_DEPTHS.length + ABOVE_DEPTHS.length,
    phrases: () => [
      `Up to ${Math.max(...OWN_DEPTHS, ...ABOVE_DEPTHS)} levels below a user-source location`,
      `each of ${OWN_DEPTHS.length + ABOVE_DEPTHS.length} links per file reader`,
      `a link naming the directory it lies in, at each depth ${depthRange(OWN_DEPTHS)} below the location`,
      `a link naming the directory one level above the one it lies in, at each depth ${depthRange(ABOVE_DEPTHS)}`,
    ],
    rows: [
      { id: "FCB-CYCLE-INNER-instructions", subject: "instructions", title: "each of the 61 planted links naming the directory it lies in (depths 1 to 31) or the one above it (depths 2 to 31) is an unknown instruction reading (dependency-cycle)", judge: () => judgeCycleInner(INSTRUCTIONS) },
      { id: "FCB-CYCLE-INNER-provider", subject: "provider", title: "each of the 61 planted links naming the directory it lies in (depths 1 to 31) or the one above it (depths 2 to 31) is an unknown provider reading (dependency-cycle)", judge: () => judgeCycleInner(PROVIDER) },
    ],
  },
  {
    id: "FCB-READ-AGAIN",
    answers: "U4 GP13-05",
    site: MODULE,
    claim: "Up to 31 levels below a user-source location, each of 186 trees per file reader, a directory first reached through one or two links that sort before it, is read again, never as a cycle: for each file reader under the user source, at each depth 1 to 31 below the location, each of two shapes (a directory named by one link that sorts before it and a directory named by two links that both sort before it), the directory holding each of three contents (one file (entry.md), two files (entry.md and second.md) and two files whose UTF-16 code-unit order and English collation order differ (B.md and a.md)), gives a measured reading that moves when each of its files in turn has its text (its name, a space and a version) rewritten from version v1 to version v2, the same length, returns when that file is restored and equals the reading with each link replaced by a copy of the directory.",
    plants: 186,
    planted: () => WALK_DEPTHS.length * READ_AGAIN_SHAPES.length * READ_AGAIN_CONTENTS.length,
    phrases: () => [
      `Up to ${Math.max(...WALK_DEPTHS)} levels below a user-source location`,
      `each of ${WALK_DEPTHS.length * READ_AGAIN_SHAPES.length * READ_AGAIN_CONTENTS.length} trees per file reader`,
      `at each depth ${depthRange(WALK_DEPTHS)} below the location`,
      `each of ${counted(READ_AGAIN_SHAPES.length)} shapes (${listed(READ_AGAIN_SHAPES.map(shape => shape.words))})`,
      `the directory holding each of ${counted(READ_AGAIN_CONTENTS.length)} contents (${listed(READ_AGAIN_CONTENTS.map(contentWords))})`,
      `rewritten from version ${VERSIONS[0]} to version ${VERSIONS[1]}`,
    ],
    rows: [
      { id: "FCB-READ-AGAIN-instructions", subject: "instructions", title: "each of the 186 planted trees (one of three contents first reached through one link or two links sorting before it, at each depth 1 to 31) is read again as its copy would be and moves with each planted rewrite (instructions)", judge: () => judgeReadAgain(INSTRUCTIONS) },
      { id: "FCB-READ-AGAIN-provider", subject: "provider", title: "each of the 186 planted trees (one of three contents first reached through one link or two links sorting before it, at each depth 1 to 31) is read again as its copy would be and moves with each planted rewrite (provider)", judge: () => judgeReadAgain(PROVIDER) },
    ],
  },
  {
    id: "FCB-RELATIVE-BASE",
    answers: "U3 GP13-02 GP13-03",
    site: MODULE,
    claim: "Each of 80 readings per file reader is unknown, ten relative bases under each of the eight sets of known sources (none, each one, each two and all three of user, project and local): the relative config directories config, ./config, ../config, . and the empty string beside an absolute cwd, the relative cwds repo/pkg, ./pkg, . and the empty string beside an absolute config directory, and repo/pkg beside config each read unknown by instruction-base-not-absolute for the instruction reader and by setting-base-not-absolute for the provider reader, where both bases absolute read measured.",
    plants: 80,
    planted: () => SOURCE_SETS.length * (RELATIVE_CONFIGS.length + RELATIVE_CWDS.length + 1),
    phrases: () => [
      `Each of ${SOURCE_SETS.length * (RELATIVE_CONFIGS.length + RELATIVE_CWDS.length + 1)} readings per file reader`,
      `${counted(RELATIVE_CONFIGS.length + RELATIVE_CWDS.length + 1)} relative bases under each of the ${counted(SOURCE_SETS.length)} sets of known sources (none, each one, each two and all three of ${listed(SOURCE_NAMES)})`,
      `the relative config directories ${listed(RELATIVE_CONFIGS.map(spelled))} beside an absolute cwd`,
      `the relative cwds ${listed(RELATIVE_CWDS.map(spelled))} beside an absolute config directory`,
      `and ${BOTH_RELATIVE.cwd} beside ${BOTH_RELATIVE.configDir} each read unknown`,
    ],
    rows: [
      { id: "FCB-RELATIVE-BASE-instructions", subject: "instructions", title: "each of the 80 planted readings (ten relative bases under each of the eight source sets) is an unknown instruction reading (instruction-base-not-absolute)", judge: () => judgeRelativeBase(INSTRUCTIONS) },
      { id: "FCB-RELATIVE-BASE-provider", subject: "provider", title: "each of the 80 planted readings (ten relative bases under each of the eight source sets) is an unknown provider reading (setting-base-not-absolute)", judge: () => judgeRelativeBase(PROVIDER) },
    ],
  },
  {
    id: "FCB-RELATIVE-HOME",
    answers: "U7 GP13-08",
    site: MODULE,
    claim: "Each of 24 readings keeps a relative home relative, four relative homes under each of two CLAUDE_CONFIG_DIR settings (unset and empty) with three readings each: with an absolute cwd, claudeUserConfigDir gives operator/.claude for the homes operator and ./operator, ../operator/.claude for ../operator and .claude for the empty home, and each file reader handed that directory under the user source reads unknown by its base reason.",
    plants: 24,
    planted: () => RELATIVE_HOMES.length * HOME_ENVS.length * 3,
    phrases: () => [
      `Each of ${RELATIVE_HOMES.length * HOME_ENVS.length * 3} readings`,
      `${counted(RELATIVE_HOMES.length)} relative homes under each of ${counted(HOME_ENVS.length)} CLAUDE_CONFIG_DIR settings (${listed(HOME_ENVS.map(setting => setting.words))}) with three readings each`,
      `claudeUserConfigDir gives ${homesWords()}`,
    ],
    rows: [{ id: "FCB-RELATIVE-HOME", subject: "claudeUserConfigDir", title: "each of the 24 planted readings keeps one of four relative homes relative (CLAUDE_CONFIG_DIR unset and empty): claudeUserConfigDir gives a relative <home>/.claude and both readers refuse it by their base reasons", judge: judgeRelativeHome }],
  },
  {
    id: "FCB-UNNAMED-SOURCES",
    answers: "U6 GP13-04",
    site: REGISTERED,
    claim: "With settingSources unset the registered path replays across eight changed setting-source files: changing the user CLAUDE.md, a user skill and the user settings.json under CLAUDE_CONFIG_DIR, and a Git-ignored project CLAUDE.md, project skill, project settings.json, local CLAUDE.local.md and local settings.local.json, between the recording and the resume replays the recorded answer under readings equal to the recorded ones, where the same changes under the user, project and local sources decline it.",
    plants: 8,
    planted: () => UNNAMED_FILES.length,
    phrases: () => [
      `replays across ${counted(UNNAMED_FILES.length)} changed setting-source files`,
      `changing ${listed(UNNAMED_FILES.filter(file => file.source === "user").map(file => file.words))} under CLAUDE_CONFIG_DIR, and a Git-ignored ${listed(UNNAMED_FILES.filter(file => file.source !== "user").map(file => file.words))}`,
      `the same changes under the ${listed(CONTROL_SOURCES)} sources decline it`,
    ],
    rows: [
      { id: "FCB-UNNAMED-SOURCES", subject: "settingSources unset", title: "with settingSources unset, eight changed setting-source files replay the recorded answer under equal readings", judge: () => judgeUnnamedSources(undefined) },
      { id: "FCB-UNNAMED-SOURCES-CONTROL", subject: "settingSources user, project, local", title: "the same eight changed files under the user, project and local sources decline the recorded answer", judge: () => judgeUnnamedSources(CONTROL_SOURCES) },
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

/** The marker opening the header's claim block, joined here so this file's text spells it in its header only. */
const CLAIMS_OPEN = ["CLAIMED here,", "each by the rows its family names,", "and nothing wider:"].join(" ");
const CLAIMS_CLOSE = "TABLE SHAPE:";
/** The four parts of the header, in order. */
const HEADER_PARTS: readonly string[] = ["PINNED READER SET (this file; every row observed green on the cut):", CLAIMS_OPEN, CLAIMS_CLOSE, "NOT CLAIMED by this suite:"];
/** A claim bullet: "- <family id> (". */
const CLAIM_BULLET = /(?:^| )- FCB-[A-Z]+(?:-[A-Z]+)* \(/g;
/** Source text with each line's leading comment marker dropped and white space collapsed. */
function flattened(text: string): string {
  return text
    .split("\n")
    .map(line => line.replace(/^\s*(?:\/\*\*|\*\/|\*|\/\/)\s?/, ""))
    .join(" ")
    .replace(/\s+/g, " ");
}
function occurrences(text: string, part: string): number {
  return text.split(part).length - 1;
}
/** This file's text, and its header (its first doc comment) flattened. */
function ownText(): { readonly source: string; readonly header: string } {
  const source = readFileSync(new URL(import.meta.url), "utf8");
  return { source, header: flattened(source.slice(source.indexOf("/**"), source.indexOf("*/"))) };
}
/** The header's claim bullets, each as `<id> (<answers>): <claim>`, read from the claim block. */
function headerClaims(header: string): string[] {
  const start = header.indexOf(CLAIMS_OPEN);
  const end = header.indexOf(CLAIMS_CLOSE, start);
  if (start < 0 || end < 0) return [];
  return header
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
/** How many times a src file's text names each family it cites, anywhere in it (a code comment or a string too), as `<id>:<count>`. */
function citationCounts(file: string): string[] {
  const text = readFileSync(new URL(`../${file}`, import.meta.url), "utf8");
  const ids = text.match(/\bFCB-[A-Z]+(?:-[A-Z]+)*/g) ?? [];
  return [...new Set(ids)].sort().map(id => `${id}:${ids.filter(cited => cited === id).length}`);
}
const sha256Of = (text: string): string => createHash("sha256").update(text, "utf8").digest("hex");
/**
 * Every comment of a source, in file order and as written: the TypeScript parser's leading and trailing comment ranges of
 * every node and token (getChildren, whose last child of the SourceFile is its end-of-file token), a doc comment read
 * whole and never entered.
 */
function commentsOf(source: string): string[] {
  const file = ts.createSourceFile("census.ts", source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const found = new Map<number, number>();
  const add = (ranges: readonly ts.CommentRange[] | undefined): void => {
    for (const range of ranges ?? []) found.set(range.pos, range.end);
  };
  const visit = (node: ts.Node): void => {
    add(ts.getLeadingCommentRanges(source, node.pos));
    add(ts.getTrailingCommentRanges(source, node.end));
    for (const child of node.getChildren(file)) if (!ts.isJSDoc(child)) visit(child);
  };
  visit(file);
  return [...found].sort(([left], [right]) => left - right).map(([pos, end]) => source.slice(pos, end));
}
/** The tasks the test runner registered for this file (the vitest task tree the reporter reads). */
type RegisteredTasks = TestContext["task"]["file"]["tasks"];
/** Every group and case title the runner registered, in registration order, each with its kind. */
function registeredTitles(tasks: RegisteredTasks): string[] {
  return tasks.flatMap(task => (task.type === "suite" ? [`group: ${task.name}`, ...registeredTitles(task.tasks)] : [`case: ${task.name}`]));
}
/** This file's words, in order: every comment (commentsOf), then every group and case title the runner registered. */
function censusWords(source: string, tasks: RegisteredTasks): string[] {
  return [...commentsOf(source).map(comment => `comment: ${comment}`), ...registeredTitles(tasks)];
}
/** The sha-256 of this file's words (censusWords, joined by line feeds) as this cut delivers them. */
const CENSUS_WORDS_SHA256 = "408eb3cdca8e7a4ee5fce9c91136384ac8d9a75a53b7ac3676e97ae41707e180";

/** A src doc comment that cites a family or this bead: its file, the function it documents, the families it cites, its words' sha-256. */
interface SiteComment {
  readonly file: string;
  readonly documents: string;
  readonly cites: readonly string[];
  readonly sha256: string;
}
/** Each such comment as this cut delivers it, in file order (the sha-256 of its words, white space collapsed). */
const SITE_COMMENTS: readonly SiteComment[] = [
  { file: REGISTERED, documents: "claudeReplayDependencies", cites: ["FCB-UNNAMED-SOURCES"], sha256: "f6aee59ccd8699c8138a6a6fe86557650d1319460fcbbc0615716a8835a77a82" },
  { file: MODULE, documents: "module", cites: [], sha256: "5ff626bb7ed16e97244e9b4e1b90c5b39b98e4ed2a8f826e302df0efa4725d83" },
  { file: MODULE, documents: "instructionDependency", cites: ["FCB-RELATIVE-BASE"], sha256: "f7ba44bbe7b3e40019312c4085855973999b16bbc15c7e5ef756bf29ae6e3d77" },
  { file: MODULE, documents: "providerDependency", cites: ["FCB-RELATIVE-BASE"], sha256: "5a72fa83a592f105d0ecad9dac82b13e327e82c09373f76a3ac175c93877acbe" },
  { file: MODULE, documents: "claudeUserConfigDir", cites: ["FCB-RELATIVE-HOME"], sha256: "914d6eb3999514e2e44b8d51dd08c23fcbc26e32703eadf839cf616e1a5c50b3" },
  { file: MODULE, documents: "readFiles", cites: ["FCB-CYCLE-INNER", "FCB-LINK-BELOW-FILE", "FCB-READ-AGAIN", "FCB-UNSTAT"], sha256: "374649456dafff220006fb604345492dd316ca321cad64d74996cf4a89c258ab" },
];
/** Every doc comment of a src file whose words cite a family or this bead, in file order. */
function citingComments(file: string): SiteComment[] {
  const text = readFileSync(new URL(`../${file}`, import.meta.url), "utf8");
  const comments: SiteComment[] = [];
  for (const match of text.matchAll(/\/\*\*[\s\S]*?\*\//g)) {
    const words = flattened(match[0]).trim();
    if (!/\bFCB-[A-Z]|wb-6b3z/.test(words)) continue;
    const at = match.index ?? 0;
    const declared = /^\s*(?:export\s+)?(?:async\s+)?function\s+(\w+)/.exec(text.slice(at + match[0].length))?.[1];
    comments.push({ file, documents: declared ?? (at === 0 ? "module" : "unknown"), cites: [...new Set(words.match(/\bFCB-[A-Z]+(?:-[A-Z]+)*/g) ?? [])].sort(), sha256: sha256Of(words) });
  }
  return comments;
}

const RECEIPT = new URL("../docs/workbench/receipts/wb-6b3z.md", import.meta.url);
const RECEIPT_TITLE = "wb-6b3z: [413a-exit] fail-closed replay-dependency basis core: unreadable-is-unsafe, link/cycle and location truth pins for the 8 realized GP13 escape families red-first";
const CUT3_HEADING = "2026-11-08 receipt: cut #3, the respin of gate refusal #2 in the enumerate form (machine seat ws-13, run g10-work-s242)";
const RECEIPT_LABEL = "(FAMILIES, FCB-FAMILIES-SHAPE):";
/** The sha-256 of this bead's receipt, the whole file, as this cut delivers it. */
const RECEIPT_SHA256 = "803cc70f5f8a9e104ac0cff7b302945776179e1d638410032cab7f8722ae9dca";
/**
 * A character reference: an ampersand, then a number sign and decimal digits, a number sign, an x and hex digits, or a name
 * of ASCII letters, digits and underscores, then a semicolon (the forms marked 18 passes into its HTML as written).
 */
const CHARACTER_REFERENCE = /&(?:#[0-9]+|#[xX][0-9a-fA-F]+|\w+);/g;
const childTokens = (token: Token): readonly Token[] => ("tokens" in token && Array.isArray(token.tokens) ? token.tokens : []);
const isListToken = (token: Token): token is Tokens.List => token.type === "list";
const isTableToken = (token: Token): token is Tokens.Table => token.type === "table";
/** Every token of one type, in document order and at any depth: in a paragraph, a list item, a table cell or any token's children. */
function tokensOfType(tokens: readonly Token[], type: string): Token[] {
  return tokens.flatMap(token => [
    ...(token.type === type ? [token] : []),
    ...(isListToken(token) ? token.items.flatMap(item => tokensOfType(item.tokens, type)) : []),
    ...(isTableToken(token) ? [...token.header, ...token.rows.flat()].flatMap(cell => tokensOfType(cell.tokens, type)) : []),
    ...tokensOfType(childTokens(token), type),
  ]);
}
/**
 * What the receipt carries that its rendered text can hide or show apart from its source: each HTML token (a comment
 * included), image and hard line break at any depth, and each character reference of its source.
 */
function receiptHazards(markdown: string): string[] {
  const tokens = marked.lexer(markdown);
  return [
    ...["html", "image", "br"].flatMap(type => tokensOfType(tokens, type).map(token => `${type}: ${token.raw}`)),
    ...(markdown.match(CHARACTER_REFERENCE) ?? []).map(reference => `character reference: ${reference}`),
  ];
}
/** What a reader sees of inline tokens: a token with children its children's text, any other token its text as written. */
function inlineText(tokens: readonly Token[]): string {
  let out = "";
  for (const token of tokens) {
    const children = childTokens(token);
    if (children.length > 0) out += inlineText(children);
    else if ("text" in token && typeof token.text === "string") out += token.text;
  }
  return out;
}
/** Each text of a page as a reader sees it, in document order: every paragraph and heading, and each list item's own text. */
function pageTexts(tokens: readonly Token[]): string[] {
  return tokens.flatMap(token => {
    if (isListToken(token)) {
      return token.items.flatMap(item => [
        inlineText(item.tokens.filter(child => !isListToken(child))).replace(/\s+/g, " ").trim(),
        ...pageTexts(item.tokens.filter(isListToken)),
      ]);
    }
    if (token.type === "paragraph" || token.type === "heading") return [inlineText(childTokens(token)).replace(/\s+/g, " ").trim()];
    return pageTexts(childTokens(token));
  });
}
/** The family list a FAMILIES-labelled text gives: read up to the full stop after the label and split at commas. */
function familyList(text: string): string[] {
  const after = text.slice(text.indexOf(RECEIPT_LABEL) + RECEIPT_LABEL.length);
  return after
    .slice(0, after.indexOf("."))
    .split(",")
    .map(item => item.trim())
    .filter(item => item !== "");
}

describe("wb-6b3z the family table, its header and plant sets, and its anchors outside this file", () => {
  it("FCB-CLAIMS-HEADER: the header's claim bullets are the family table's claims, each with its id and the items it answers, in table order, in this file's one claim block: the CLAIMED marker occurs once in this file, the header's four parts once each and in order, and no claim bullet sits outside the block", () => {
    const { source, header } = ownText();
    expect(occurrences(flattened(source), CLAIMS_OPEN), "the CLAIMED marker in this file").toBe(1);
    expect(HEADER_PARTS.map(part => occurrences(header, part)), "each header part once").toEqual(HEADER_PARTS.map(() => 1));
    const starts = HEADER_PARTS.map(part => header.indexOf(part));
    expect(starts, "the header parts in order").toEqual([...starts].sort((left, right) => left - right));
    expect(flattened(source).match(CLAIM_BULLET)?.length ?? 0, "the claim bullets in this file").toBe(FAMILIES.length);
    expect(headerClaims(header)).toEqual(FAMILIES.map(family => `${family.id} (${family.answers}): ${family.claim}`));
  });

  it("FCB-PLANT-SETS: each family's claim names, word for word, its plant count and the forms, modes, depths, targets, contents, versions, bases, homes and files its judge's data plants, and each row title names its family's plant count; the source sets are every subset of the three sources, each reader's location and each changed file are ones the module's own tables name", () => {
    expect(SOURCE_SETS, "the source sets FCB-RELATIVE-BASE plants").toEqual(sourceSubsets());
    expect([CLAUDE_INSTRUCTION_LOCATIONS.user.includes(INSTRUCTIONS.location), CLAUDE_SETTINGS_LOCATIONS.user.includes(PROVIDER.location)], "each reader's location").toEqual([true, true]);
    expect(
      UNNAMED_FILES.filter(file => !readByItsSource(file, "/repo/pkg", "/config")).map(file => file.words),
      "the changed files their sources do not read",
    ).toEqual([]);
    expect(
      FAMILIES.flatMap(family => family.rows.filter(row => !row.title.includes(`${counted(family.plants)} `)).map(row => row.id)),
      "the row titles that do not name their family's plant count",
    ).toEqual([]);
    for (const family of FAMILIES) {
      expect(family.planted(), `${family.id}: the readings its judge's data gives one row`).toBe(family.plants);
      expect(
        family.phrases().filter(phrase => !family.claim.includes(phrase)),
        `${family.id}: what its data plants that its claim does not say`,
      ).toEqual([]);
    }
  });

  it("FCB-ANCHOR-SRC: each src site cites exactly the families the table names for it, each of its doc comments that cites a family or this bead reads word for word as this cut delivers it, and every citation of a family in the file lies in one of those comments", () => {
    const sites = [...new Set(FAMILIES.map(family => family.site))].sort();
    expect(sites).toEqual([REGISTERED, MODULE].sort());
    for (const site of sites) {
      expect(citedFamilies(site), site).toEqual(
        FAMILIES.filter(family => family.site === site)
          .map(family => family.id)
          .sort(),
      );
    }
    expect(sites.flatMap(citingComments)).toEqual(SITE_COMMENTS);
    expect(sites.map(site => `${site} ${citationCounts(site).join(" ")}`), "every citation of a family in each src file, each in one of those comments").toEqual(
      sites.map(site => {
        const cites = SITE_COMMENTS.filter(comment => comment.file === site).flatMap(comment => comment.cites);
        return `${site} ${[...new Set(cites)]
          .sort()
          .map(id => `${id}:${cites.filter(cited => cited === id).length}`)
          .join(" ")}`;
      }),
    );
  });

  it("FCB-ANCHOR-RECEIPT: this bead's receipt, as marked 18 lexes it, carries no HTML (a comment included), image, hard line break or character reference, and each of its texts carrying the FAMILIES label lists each family with the items it answers, in table order", () => {
    const markdown = readFileSync(RECEIPT, "utf8");
    expect(receiptHazards(markdown), "what the receipt's rendered text could hide").toEqual([]);
    const lists = pageTexts(marked.lexer(markdown))
      .filter(text => text.includes(RECEIPT_LABEL))
      .map(familyList);
    expect(lists.length).toBeGreaterThan(0);
    for (const list of lists) expect(list).toEqual(FAMILIES.map(family => `${family.id} ${family.answers}`));
  });

  it("FCB-RECEIPT-CLAIMS: the receipt's cut #3 entry, read from its rendered text, carries each family's claim word for word, with its id and the items it answers, in table order, and no other claim item, and the receipt reads word for word as this cut delivers it", () => {
    const markdown = readFileSync(RECEIPT, "utf8");
    expect(sha256Of(markdown), "the receipt's bytes").toBe(RECEIPT_SHA256);
    expect(receiptHazards(markdown), "what the receipt's rendered text could hide").toEqual([]);
    const section = docsSection(markdown, CUT3_HEADING, 2, [RECEIPT_TITLE]);
    expect({ why: section.why, hasHtml: section.hasHtml }, "the cut #3 entry's binding").toEqual({ why: "", hasHtml: false });
    const texts = section.blocks.flatMap(block => (block.kind === "list" ? block.items.map(item => item.text) : block.kind === "html" ? [] : [block.text]));
    expect(texts.filter(text => /^FCB-[A-Z]+(?:-[A-Z]+)* \(/.test(text))).toEqual(FAMILIES.map(family => `${family.id} (${family.answers}): ${family.claim}`));
  });

  it("FCB-FAMILIES-SHAPE: the family table, written out (frozen shape): each family's id, answered items, site, plants per row and claim length, then each row's id, subject and title length; and this file's words (every comment as the TypeScript parser's comment ranges give it, this header among them, and every group and case title as the test runner registers it) read word for word as this cut delivers them", ({ task }) => {
    expect(sha256Of(censusWords(ownText().source, task.file.tasks).join("\n")), "this file's words").toBe(CENSUS_WORDS_SHA256);
    expect(FAMILIES.map(family => `${family.id}|${family.answers}|${family.site}|${family.plants}|${family.claim.length}|${family.rows.map(row => `${row.id}:${row.subject}:${row.title.length}`).join(",")}`)).toEqual([
      "FCB-UNSTAT|U1 GP13-10|src/workbench/replay-dependencies.ts|136|851|FCB-UNSTAT-instructions:instructions:167,FCB-UNSTAT-provider:provider:164",
      "FCB-LINK-BELOW-FILE|U5 GP13-09|src/workbench/replay-dependencies.ts|66|429|FCB-LINK-BELOW-FILE-instructions:instructions:173,FCB-LINK-BELOW-FILE-provider:provider:169",
      "FCB-CYCLE-INNER|U2 GP13-01|src/workbench/replay-dependencies.ts|61|476|FCB-CYCLE-INNER-instructions:instructions:167,FCB-CYCLE-INNER-provider:provider:164",
      "FCB-READ-AGAIN|U4 GP13-05|src/workbench/replay-dependencies.ts|186|884|FCB-READ-AGAIN-instructions:instructions:224,FCB-READ-AGAIN-provider:provider:220",
      "FCB-RELATIVE-BASE|U3 GP13-02 GP13-03|src/workbench/replay-dependencies.ts|80|588|FCB-RELATIVE-BASE-instructions:instructions:154,FCB-RELATIVE-BASE-provider:provider:147",
      "FCB-RELATIVE-HOME|U7 GP13-08|src/workbench/replay-dependencies.ts|24|431|FCB-RELATIVE-HOME:claudeUserConfigDir:211",
      "FCB-UNNAMED-SOURCES|U6 GP13-04|src/index.ts|8|503|FCB-UNNAMED-SOURCES:settingSources unset:109,FCB-UNNAMED-SOURCES-CONTROL:settingSources user, project, local:98",
    ]);
  });
});
