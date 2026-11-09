/**
 * wb-g9g5 [6b3z-exit]: pins for the forms the structural exit R-B729 (M:65822) routes to this bead from wb-6b3z's R-B717
 * claim-word set, frozen at the R-B721 second-stage cap (wb-6b3z refusal #3: gate-prep-10 of g10-gate-s244 on cut #3
 * 6d332c30, unmet U1 to U5), and for the link-below-file form whose treatment R-B730 (M:65823) has ride this bead's cut
 * (U7). Each family plants, on real files in a scratch directory, the form of the gate witness that realized one member
 * of that refusal (W10-02, W10-01, W10-03, W10-04, W10-07 and W10-06, for GP10-02, GP10-01, GP10-03, GP10-04, GP10-07 and
 * GP10-06b), at the depths its title names, runs the module's file reader under the user source and asserts the WHOLE
 * reading: the exact unknown reason, or a measured reading equal to a named twin, each beside a measured control or a
 * measured twin. Every family row is green on the real code and red under the member its family answers.
 *
 * This bead's cut adds this suite and its receipt only: src/workbench/replay-dependencies.ts,
 * test/workbench-replay-dependency-fail-closed.test.ts and docs/workbench/receipts/wb-6b3z.md stay as the base has them.
 * The readFiles doc names these forms NOT CLAIMED for the fail-closed suite and routes them here, and RTF-ANCHOR-SRC holds
 * each family's routed words to that doc. Each row's claim is its title; RTF-PLANT-SETS holds each title to its family's
 * plant count and to the phrases it computes from the judge's data.
 *
 * PINNED READER SET (this file; every row observed green on the cut):
 *  - RTF-LISTED-BESIDE-instructions, RTF-LISTED-BESIDE-provider: 64 plants each, each reading exactly {unknown, dependency-unreadable};
 *  - RTF-LISTED-OTHER-NAME-instructions, RTF-LISTED-OTHER-NAME-provider: 64 plants each, each reading exactly {unknown, dependency-unreadable};
 *  - RTF-LISTED-NAMED-instructions: 2 plants, each reading exactly {unknown, dependency-unreadable};
 *  - RTF-RELATIVE-UNSTAT-instructions, RTF-RELATIVE-UNSTAT-provider: 66 plants each, each reading exactly {unknown, dependency-unreadable};
 *  - RTF-RELATIVE-READ-AGAIN-instructions, RTF-RELATIVE-READ-AGAIN-provider: 62 trees each, each reading measured and equal to its copy twin;
 *  - RTF-RELATIVE-BELOW-FILE-instructions, RTF-RELATIVE-BELOW-FILE-provider: 66 links each, each reading measured and equal to its missing-path twin;
 *  - RTF-PLANT-SETS, RTF-HEADER-SET, RTF-ANCHOR-SRC, RTF-ANCHOR-RECEIPT, RTF-FAMILIES-SHAPE: the titles' plant words, this header's set, the src routing and the receipt (the two anchors outside this file), and the table shape and this file's words.
 *
 * NOT CLAIMED by this suite: any instance of these forms that its rows do not plant, another depth, mode, file name,
 * number of entries, content, link name or target spelling among them; these forms under the project or local source;
 * the list-only plants under a process running as root (root searches any mode, so there those plants read measured,
 * and the rows assert that instead); the relative links naming the directory they lie in, or the one above it, which
 * wb-6b3z keeps under the R-B731 guard; and every other form of the two file readers.
 */
import { createHash } from "node:crypto";
import { chmodSync, existsSync, lstatSync, mkdirSync, readdirSync, readFileSync, readlinkSync, realpathSync, type Stats, statSync, symlinkSync, unlinkSync, writeFileSync } from "node:fs";
import { basename, dirname, isAbsolute, join, relative } from "node:path";
import { marked, type Token, type Tokens } from "marked";
import ts from "typescript";
import { afterEach, describe, expect, it, type TestContext } from "vitest";
import {
  CLAUDE_INSTRUCTION_LOCATIONS,
  CLAUDE_SETTINGS_LOCATIONS,
  instructionDependency,
  instructionPaths,
  providerDependency,
  type ReplayDependency,
} from "../src/workbench/replay-dependencies.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard();

const scratches: string[] = [];
afterEach(() => {
  for (const dir of scratches.splice(0)) {
    restoreModes(dir);
    removeScratch(dir);
  }
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

/** One row's scratch directory, as its real path, removed (modes restored first) after the row. */
function rowScratch(): string {
  const dir = makeScratch("replay-routed-forms-");
  scratches.push(dir);
  return realpathSync(dir);
}

interface Layout {
  /** <scratch>/<case>: the case directory, where a link's regular file and missing path live. */
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

/** Obviously fake digests: the provider reader needs a well-formed identity to reach its setting file. */
const IDENTITY = { runtimeArtifactDigest: `sha256:${"a".repeat(64)}`, providerContractDigest: `sha256:${"b".repeat(64)}` };
const ROOT_USER = process.getuid?.() === 0;

/** A file reader under the user source, with the location it reads below the config directory. */
interface UserReader {
  readonly name: "instructions" | "provider";
  /** How a title names the reading: "instruction", "provider". */
  readonly word: string;
  /** The location the reader names below the config directory (a directory location when a row makes it one). */
  readonly location: string;
  readonly read: (at: Layout) => ReplayDependency;
}
const INSTRUCTIONS: UserReader = { name: "instructions", word: "instruction", location: "skills", read: at => instructionDependency(at.cwd, ["user"], at.config) };
const PROVIDER: UserReader = { name: "provider", word: "provider", location: "settings.json", read: at => providerDependency(IDENTITY, at.cwd, ["user"], at.config) };

// How a title spells what its judge's data plants (RTF-PLANT-SETS reads each title through these).
const NUMBER_WORDS: readonly string[] = ["no", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
/** A count as the titles spell it: one to ten in words, a larger count in digits. */
function counted(count: number): string {
  return NUMBER_WORDS[count] ?? String(count);
}
/** Items as the titles list them: "a", "a and b", "a, b and c". */
function listed(items: readonly string[]): string {
  if (items.length <= 1) return items[0] ?? "";
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}
/** Alternatives as the titles list them: "a", "a or b", "a, b or c". */
function either(items: readonly string[]): string {
  if (items.length <= 1) return items[0] ?? "";
  return `${items.slice(0, -1).join(", ")} or ${items[items.length - 1]}`;
}
/** "<first> to <last>" for a run of depths each one more than the one before; a gap or a repeat fails the reading row. */
function depthRange(depths: readonly number[]): string {
  const first = depths[0] ?? 0;
  expect(depths, "a run of consecutive depths").toEqual(Array.from({ length: depths.length }, (_, step) => first + step));
  return `${first} to ${first + depths.length - 1}`;
}

/** The depths a walk stats an entry at: 0 (the named path) to 32 (a file 32 levels below the location is read). */
const STAT_DEPTHS: readonly number[] = Array.from({ length: 33 }, (_, depth) => depth);
/** The stat depths below the named path: 1 to 32. */
const BELOW_DEPTHS: readonly number[] = STAT_DEPTHS.filter(depth => depth >= 1);
/** The depths a directory a walk follows can sit at below the location: 1 to 31. */
const WALK_DEPTHS: readonly number[] = Array.from({ length: 31 }, (_, depth) => depth + 1);
/** The phrase a title gives the named path and the depths below it that STAT_DEPTHS spans. */
function statDepthWords(): string {
  expect(STAT_DEPTHS[0], "the first stat depth is the named path").toBe(0);
  return `at the named path and at each depth ${depthRange(BELOW_DEPTHS)} below the location`;
}
/** The path a stat depth names: the named path at depth 0, else `name` in the directory `depth` - 1 levels below it. */
function pathAt(named: string, depth: number, name: string): string {
  return depth === 0 ? named : join(levelDir(named, depth - 1), name);
}

/** What a row judged: its family and subject, named by the judge itself, and the number of readings it judged. */
interface Judged {
  readonly family: string;
  readonly subject: string;
  readonly judged: number;
}

/** The modes a listed family leaves a directory at: rw------- and r--------, each a mode its owner may list but not search. */
const LIST_ONLY_MODES: readonly number[] = [0o600, 0o400];
/** A mode as the titles spell it: "mode 0600", "mode 0400". */
function modeWords(mode: number): string {
  return `mode ${mode.toString(8).padStart(4, "0")}`;
}
/** The directory left at `mode`, read back, its listing exactly `names`. */
function listOnlyListing(dir: string, mode: number, names: readonly string[]): void {
  expect(statSync(dir).mode & 0o777, `${dir}: left at ${modeWords(mode)}`).toBe(mode);
  expect(readdirSync(dir).sort(), `${dir}: its listing`).toEqual([...names].sort());
}
/** The words a listed title gives one directory's plant: the path first, then everything its directory lists. */
function listedWords(files: readonly string[]): string {
  return `(a path, ${files[0] ?? ""}, at each depth ${depthRange(BELOW_DEPTHS)} below the location, in a directory listing only ${listed(files)}, left at ${either(LIST_ONLY_MODES.map(modeWords))})`;
}
/** The files RTF-LISTED-BESIDE's directory holds: the path, entry.md, and the entry beside it, second.md (W10-02). */
const BESIDE_FILES: readonly string[] = ["entry.md", "second.md"];
/** The one file RTF-LISTED-OTHER-NAME's directory holds: the path, a name without .md (W10-01). */
const OTHER_NAME_FILES: readonly string[] = ["notes.txt"];
/**
 * RTF-LISTED-BESIDE and RTF-LISTED-OTHER-NAME: at each depth below the location and at each mode, the directory the path
 * lies in holds exactly `files` (the path first) and is left at the mode, after a measured control on the same tree.
 */
function judgeListed(reader: UserReader, family: string, files: readonly string[]): Judged {
  const scratch = rowScratch();
  let judged = 0;
  for (const mode of LIST_ONLY_MODES) {
    for (const depth of BELOW_DEPTHS) {
      const label = `${reader.name}: ${listed(files)} at depth ${depth}, ${modeWords(mode)}`;
      const at = layoutIn(scratch, `${mode.toString(8)}-${depth}`);
      const path = pathAt(join(at.config, reader.location), depth, files[0] ?? "");
      const dir = dirname(path);
      for (const name of files) write(join(dir, name), `${name} entry`);
      measured(reader.read(at), `${label} (control)`);
      chmodSync(dir, mode);
      listOnlyListing(dir, mode, files);
      if (ROOT_USER) measured(reader.read(at), `${label} (root searches any mode)`);
      else unknownBecause(reader.read(at), "dependency-unreadable", label);
      judged += 1;
    }
  }
  return { family, subject: reader.name, judged };
}

/** The user source's instruction locations, the paths the instruction reader names below the config directory (W10-03). */
const USER_LOCATIONS: readonly string[] = CLAUDE_INSTRUCTION_LOCATIONS.user;
/**
 * RTF-LISTED-NAMED: at each mode, the config directory holds a regular file at each user instruction location, so the
 * directory lists every path the instruction reader names there, and is left at the mode, after a measured control.
 */
function judgeListedNamed(): Judged {
  const scratch = rowScratch();
  let judged = 0;
  for (const mode of LIST_ONLY_MODES) {
    const label = `instructions: the config directory listing every user instruction location, ${modeWords(mode)}`;
    const at = layoutIn(scratch, `named-${mode.toString(8)}`);
    expect(instructionPaths(at.cwd, ["user"], at.config), `${label}: the paths the reader names`).toEqual(USER_LOCATIONS.map(location => join(at.config, location)));
    for (const location of USER_LOCATIONS) write(join(at.config, location), `${location} entry`);
    expect(USER_LOCATIONS.map(location => lstatSync(join(at.config, location)).isFile()), `${label}: each a regular file`).toEqual(USER_LOCATIONS.map(() => true));
    measured(INSTRUCTIONS.read(at), `${label} (control)`);
    chmodSync(at.config, mode);
    listOnlyListing(at.config, mode, USER_LOCATIONS);
    if (ROOT_USER) measured(INSTRUCTIONS.read(at), `${label} (root searches any mode)`);
    else unknownBecause(INSTRUCTIONS.read(at), "dependency-unreadable", label);
    judged += 1;
  }
  return { family: "RTF-LISTED-NAMED", subject: INSTRUCTIONS.name, judged };
}

/** A stat refusal RTF-RELATIVE-UNSTAT plants at a path: its words in the title, its scratch key, its plant and witness. */
interface RelativeRefusal {
  readonly words: string;
  readonly key: string;
  readonly plant: (path: string) => void;
  /** What the plant left, read back before the reading is judged: each link's relative target, as its words name it. */
  readonly witness: (path: string) => void;
}
/** The 256-byte component RTF-RELATIVE-UNSTAT's long link names, relative to the link's directory (W10-04). */
const LONG_COMPONENT = "n".repeat(256);
/** The two stat refusals RTF-RELATIVE-UNSTAT plants at the named path and at each depth below the location (W10-04). */
const RELATIVE_REFUSALS: readonly RelativeRefusal[] = [
  {
    words: "two links naming each other by name, the path naming its own name followed by .loop and the link of that name beside it naming the path's name",
    key: "loop",
    plant: path => {
      symlinkSync(`${basename(path)}.loop`, path);
      symlinkSync(basename(path), `${path}.loop`);
    },
    witness: path => {
      expect([readlinkSync(path), readlinkSync(`${path}.loop`)], `${path}: each link names the other by name`).toEqual([`${basename(path)}.loop`, basename(path)]);
    },
  },
  {
    words: `a link naming n repeated ${Buffer.byteLength(LONG_COMPONENT)} times, a relative path of one ${Buffer.byteLength(LONG_COMPONENT)}-byte component`,
    key: "long",
    plant: path => symlinkSync(LONG_COMPONENT, path),
    witness: path => {
      expect(readlinkSync(path), `${path}: names one 256-byte relative component`).toBe(LONG_COMPONENT);
    },
  },
];
/** RTF-RELATIVE-UNSTAT: each refusal at each stat depth, after a measured control on the same tree without the links. */
function judgeRelativeUnstat(reader: UserReader): Judged {
  const scratch = rowScratch();
  let judged = 0;
  for (const refusal of RELATIVE_REFUSALS) {
    for (const depth of STAT_DEPTHS) {
      const label = `${reader.name}: ${refusal.key} at depth ${depth}`;
      const at = layoutIn(scratch, `${refusal.key}-${depth}`);
      const path = pathAt(join(at.config, reader.location), depth, "entry.md");
      measured(reader.read(at), `${label} (control)`);
      refusal.plant(path);
      refusal.witness(path);
      expect(isAbsolute(readlinkSync(path)), `${label}: a relative target`).toBe(false);
      unknownBecause(reader.read(at), "dependency-unreadable", label);
      judged += 1;
    }
  }
  return { family: "RTF-RELATIVE-UNSTAT", subject: reader.name, judged };
}

/** An RTF-RELATIVE-READ-AGAIN shape: its words in the title, the directory the links name, and the links. */
interface RelativeShape {
  readonly words: string;
  readonly target: string;
  readonly links: readonly string[];
}
/** The shapes RTF-RELATIVE-READ-AGAIN plants, each link naming its directory by the directory's name alone (W10-07). */
const RELATIVE_SHAPES: readonly RelativeShape[] = [
  { words: "review through one link, a", target: "review", links: ["a"] },
  { words: "zeta through two links, alias and beta", target: "zeta", links: ["alias", "beta"] },
];
/** The file each planted directory holds, and its text. */
const READ_AGAIN_FILE = "entry.md";
const READ_AGAIN_TEXT = "entry.md v1";
/** The words a read-again title gives the shapes: "<a>; <b>". */
function shapeWords(): string {
  return RELATIVE_SHAPES.map(shape => shape.words).join("; ");
}
/**
 * RTF-RELATIVE-READ-AGAIN: at each walk depth, each shape's directory, first reached through links naming it by a
 * relative path, is measured and equals the reading with each link replaced by a directory holding the same file.
 */
function judgeRelativeReadAgain(reader: UserReader): Judged {
  const scratch = rowScratch();
  let judged = 0;
  for (const depth of WALK_DEPTHS) {
    for (const shape of RELATIVE_SHAPES) {
      const label = `${reader.name}: ${shape.target} through ${listed(shape.links)} at depth ${depth}`;
      const at = layoutIn(scratch, `${shape.target}-${depth}`);
      const dir = levelDir(join(at.config, reader.location), depth - 1);
      const target = join(dir, shape.target);
      write(join(target, READ_AGAIN_FILE), READ_AGAIN_TEXT);
      for (const link of shape.links) symlinkSync(shape.target, join(dir, link));
      expect(
        shape.links.map(link => [readlinkSync(join(dir, link)), isAbsolute(readlinkSync(join(dir, link))), realpathSync(join(dir, link)), link < shape.target]),
        `${label}: each link names the directory by a relative path and sorts before it`,
      ).toEqual(shape.links.map(() => [shape.target, false, target, true]));
      const linked = measured(reader.read(at), label);
      for (const link of shape.links) {
        unlinkSync(join(dir, link));
        write(join(dir, link, READ_AGAIN_FILE), READ_AGAIN_TEXT);
      }
      expect(
        shape.links.map(link => [lstatSync(join(dir, link)).isDirectory(), readdirSync(join(dir, link)), readFileSync(join(dir, link, READ_AGAIN_FILE), "utf8")]),
        `${label}: each link replaced by a copy`,
      ).toEqual(shape.links.map(() => [true, [READ_AGAIN_FILE], READ_AGAIN_TEXT]));
      expect(measured(reader.read(at), `${label}, links replaced by copies`), label).toBe(linked);
      judged += 1;
    }
  }
  return { family: "RTF-RELATIVE-READ-AGAIN", subject: reader.name, judged };
}

/** The regular file in the case directory, and the paths below it RTF-RELATIVE-BELOW-FILE's links name (W10-06). */
const PLAIN_FILE = "plain.txt";
const BELOW_FILE_TARGETS: readonly (readonly string[])[] = [["below"], ["inner", "below"]];
/** The missing path in the case directory the twin link names. */
const MISSING = "nowhere";
/** A target as the titles spell it: "plain.txt/below", "plain.txt/inner/below". */
function targetWords(segments: readonly string[]): string {
  return [PLAIN_FILE, ...segments].join("/");
}
/**
 * RTF-RELATIVE-BELOW-FILE: at each stat depth, a link naming each target below the regular file by the relative path
 * from its own directory reads as the same link naming the missing path that way.
 */
function judgeRelativeBelowFile(reader: UserReader): Judged {
  const scratch = rowScratch();
  let judged = 0;
  for (const depth of STAT_DEPTHS) {
    for (const segments of BELOW_FILE_TARGETS) {
      const label = `${reader.name}: link at depth ${depth} naming ${targetWords(segments)}`;
      const at = layoutIn(scratch, `below-${segments.length}-${depth}`);
      write(join(at.root, PLAIN_FILE), "a regular file");
      const link = pathAt(join(at.config, reader.location), depth, "broken");
      const missing = relative(dirname(link), join(at.root, MISSING));
      symlinkSync(missing, link);
      expect([readlinkSync(link), isAbsolute(missing), existsSync(join(at.root, MISSING))], `${label}: names a missing path by a relative path`).toEqual([missing, false, false]);
      const twin = measured(reader.read(at), `${label}, the link naming a missing path`);
      unlinkSync(link);
      const target = relative(dirname(link), join(at.root, PLAIN_FILE, ...segments));
      symlinkSync(target, link);
      expect([readlinkSync(link), isAbsolute(target), lstatSync(join(at.root, PLAIN_FILE)).isFile()], `${label}: names a path below a regular file by a relative path`).toEqual([target, false, true]);
      expect(measured(reader.read(at), label), label).toBe(twin);
      judged += 1;
    }
  }
  return { family: "RTF-RELATIVE-BELOW-FILE", subject: reader.name, judged };
}

interface FamilyRow {
  readonly id: string;
  /** The reader the row judges, as its judge names it in what it returns. */
  readonly subject: "instructions" | "provider";
  /** The row's claim: its planted count and, word for word, what its judge's data plants (RTF-PLANT-SETS). */
  readonly title: string;
  readonly judge: () => Judged;
}
interface Family {
  readonly id: string;
  /** The unmet item of wb-6b3z refusal #3 and the gate member the family answers. */
  readonly answers: string;
  /** The gate witness of that refusal whose form the family plants. */
  readonly witness: string;
  /** The words of the readFiles doc's routing to this bead that name the family's form (RTF-ANCHOR-SRC). */
  readonly routed: readonly string[];
  /** The readings each of its rows judges. */
  readonly plants: number;
  /** What the header calls one planted reading: plants, trees, links. */
  readonly unit: string;
  /** What the header says each reading reads. */
  readonly reading: string;
  /** The readings its judge's data gives one row, computed from that data (RTF-PLANT-SETS holds it to `plants`). */
  readonly planted: () => number;
  /** What every row title must say, word for word, computed from its judge's data (RTF-PLANT-SETS). */
  readonly phrases: () => readonly string[];
  readonly rows: readonly FamilyRow[];
}
const UNREADABLE = "exactly {unknown, dependency-unreadable}";
/** The words an unknown-reading title closes on for a reader. */
function unknownWords(reader: UserReader): string {
  return `is an unknown ${reader.word} reading (dependency-unreadable)`;
}
const FAMILIES: readonly Family[] = [
  {
    id: "RTF-LISTED-BESIDE",
    answers: "U1 GP10-02",
    witness: "W10-02",
    routed: ["a directory left at mode 0600 or 0400 listing another entry beside the path"],
    plants: 64,
    unit: "plants",
    reading: UNREADABLE,
    planted: () => LIST_ONLY_MODES.length * BELOW_DEPTHS.length,
    phrases: () => [`each of the ${LIST_ONLY_MODES.length * BELOW_DEPTHS.length} planted stat refusals`, listedWords(BESIDE_FILES)],
    rows: [
      { id: "RTF-LISTED-BESIDE-instructions", subject: "instructions", title: "each of the 64 planted stat refusals (a path, entry.md, at each depth 1 to 32 below the location, in a directory listing only entry.md and second.md, left at mode 0600 or mode 0400) is an unknown instruction reading (dependency-unreadable)", judge: () => judgeListed(INSTRUCTIONS, "RTF-LISTED-BESIDE", BESIDE_FILES) },
      { id: "RTF-LISTED-BESIDE-provider", subject: "provider", title: "each of the 64 planted stat refusals (a path, entry.md, at each depth 1 to 32 below the location, in a directory listing only entry.md and second.md, left at mode 0600 or mode 0400) is an unknown provider reading (dependency-unreadable)", judge: () => judgeListed(PROVIDER, "RTF-LISTED-BESIDE", BESIDE_FILES) },
    ],
  },
  {
    id: "RTF-LISTED-OTHER-NAME",
    answers: "U2 GP10-01",
    witness: "W10-01",
    routed: ["below the location, listing a path named other than entry.md"],
    plants: 64,
    unit: "plants",
    reading: UNREADABLE,
    planted: () => LIST_ONLY_MODES.length * BELOW_DEPTHS.length,
    phrases: () => [`each of the ${LIST_ONLY_MODES.length * BELOW_DEPTHS.length} planted stat refusals`, listedWords(OTHER_NAME_FILES)],
    rows: [
      { id: "RTF-LISTED-OTHER-NAME-instructions", subject: "instructions", title: "each of the 64 planted stat refusals (a path, notes.txt, at each depth 1 to 32 below the location, in a directory listing only notes.txt, left at mode 0600 or mode 0400) is an unknown instruction reading (dependency-unreadable)", judge: () => judgeListed(INSTRUCTIONS, "RTF-LISTED-OTHER-NAME", OTHER_NAME_FILES) },
      { id: "RTF-LISTED-OTHER-NAME-provider", subject: "provider", title: "each of the 64 planted stat refusals (a path, notes.txt, at each depth 1 to 32 below the location, in a directory listing only notes.txt, left at mode 0600 or mode 0400) is an unknown provider reading (dependency-unreadable)", judge: () => judgeListed(PROVIDER, "RTF-LISTED-OTHER-NAME", OTHER_NAME_FILES) },
    ],
  },
  {
    id: "RTF-LISTED-NAMED",
    answers: "U3 GP10-03",
    witness: "W10-03",
    routed: ["at the named path, such a directory listing the instruction reader's CLAUDE.md"],
    plants: 2,
    unit: "plants",
    reading: UNREADABLE,
    planted: () => LIST_ONLY_MODES.length,
    phrases: () => [
      `each of the ${counted(LIST_ONLY_MODES.length)} planted stat refusals`,
      `(the config directory listing only a regular file at each of the ${counted(USER_LOCATIONS.length)} user instruction locations, ${listed(USER_LOCATIONS)}, left at ${either(LIST_ONLY_MODES.map(modeWords))})`,
    ],
    rows: [
      { id: "RTF-LISTED-NAMED-instructions", subject: "instructions", title: "each of the two planted stat refusals (the config directory listing only a regular file at each of the six user instruction locations, CLAUDE.md, skills, agents, commands, output-styles and rules, left at mode 0600 or mode 0400) is an unknown instruction reading (dependency-unreadable)", judge: judgeListedNamed },
    ],
  },
  {
    id: "RTF-RELATIVE-UNSTAT",
    answers: "U4 GP10-04",
    witness: "W10-04",
    routed: ["two links naming each other", "a link naming a path with a 256-byte component"],
    plants: 66,
    unit: "plants",
    reading: UNREADABLE,
    planted: () => RELATIVE_REFUSALS.length * STAT_DEPTHS.length,
    phrases: () => [`each of the ${RELATIVE_REFUSALS.length * STAT_DEPTHS.length} planted stat refusals`, `(${listed(RELATIVE_REFUSALS.map(refusal => refusal.words))}, each ${statDepthWords()})`],
    rows: [
      { id: "RTF-RELATIVE-UNSTAT-instructions", subject: "instructions", title: "each of the 66 planted stat refusals (two links naming each other by name, the path naming its own name followed by .loop and the link of that name beside it naming the path's name and a link naming n repeated 256 times, a relative path of one 256-byte component, each at the named path and at each depth 1 to 32 below the location) is an unknown instruction reading (dependency-unreadable)", judge: () => judgeRelativeUnstat(INSTRUCTIONS) },
      { id: "RTF-RELATIVE-UNSTAT-provider", subject: "provider", title: "each of the 66 planted stat refusals (two links naming each other by name, the path naming its own name followed by .loop and the link of that name beside it naming the path's name and a link naming n repeated 256 times, a relative path of one 256-byte component, each at the named path and at each depth 1 to 32 below the location) is an unknown provider reading (dependency-unreadable)", judge: () => judgeRelativeUnstat(PROVIDER) },
    ],
  },
  {
    id: "RTF-RELATIVE-READ-AGAIN",
    answers: "U5 GP10-07",
    witness: "W10-07",
    routed: ["a link through which a directory is first reached"],
    plants: 62,
    unit: "trees",
    reading: "measured and equal to its copy twin",
    planted: () => WALK_DEPTHS.length * RELATIVE_SHAPES.length,
    phrases: () => [
      `each of the ${WALK_DEPTHS.length * RELATIVE_SHAPES.length} planted trees`,
      `(at each depth ${depthRange(WALK_DEPTHS)} below the location, each of ${counted(RELATIVE_SHAPES.length)} directories holding ${READ_AGAIN_FILE} with the text ${READ_AGAIN_TEXT} and first reached through links that sort before it and name it by its name alone: ${shapeWords()})`,
      `is read as its copy would be: measured and equal to the reading with each link replaced by a directory holding the same file`,
    ],
    rows: [
      { id: "RTF-RELATIVE-READ-AGAIN-instructions", subject: "instructions", title: "each of the 62 planted trees (at each depth 1 to 31 below the location, each of two directories holding entry.md with the text entry.md v1 and first reached through links that sort before it and name it by its name alone: review through one link, a; zeta through two links, alias and beta) is read as its copy would be: measured and equal to the reading with each link replaced by a directory holding the same file (instructions)", judge: () => judgeRelativeReadAgain(INSTRUCTIONS) },
      { id: "RTF-RELATIVE-READ-AGAIN-provider", subject: "provider", title: "each of the 62 planted trees (at each depth 1 to 31 below the location, each of two directories holding entry.md with the text entry.md v1 and first reached through links that sort before it and name it by its name alone: review through one link, a; zeta through two links, alias and beta) is read as its copy would be: measured and equal to the reading with each link replaced by a directory holding the same file (provider)", judge: () => judgeRelativeReadAgain(PROVIDER) },
    ],
  },
  {
    id: "RTF-RELATIVE-BELOW-FILE",
    answers: "U7 GP10-06b",
    witness: "W10-06",
    routed: ["a link naming a path below a regular file"],
    plants: 66,
    unit: "links",
    reading: "measured and equal to its missing-path twin",
    planted: () => STAT_DEPTHS.length * BELOW_FILE_TARGETS.length,
    phrases: () => [
      `each of the ${STAT_DEPTHS.length * BELOW_FILE_TARGETS.length} planted links`,
      `${statDepthWords()}, naming by the relative path from its own directory ${either(BELOW_FILE_TARGETS.map(targetWords))} in the case directory, where ${PLAIN_FILE} is a regular file,`,
      `reads as the same link naming ${MISSING}, a missing path in the case directory, by the relative path from its own directory`,
    ],
    rows: [
      { id: "RTF-RELATIVE-BELOW-FILE-instructions", subject: "instructions", title: "each of the 66 planted links, at the named path and at each depth 1 to 32 below the location, naming by the relative path from its own directory plain.txt/below or plain.txt/inner/below in the case directory, where plain.txt is a regular file, reads as the same link naming nowhere, a missing path in the case directory, by the relative path from its own directory (instructions)", judge: () => judgeRelativeBelowFile(INSTRUCTIONS) },
      { id: "RTF-RELATIVE-BELOW-FILE-provider", subject: "provider", title: "each of the 66 planted links, at the named path and at each depth 1 to 32 below the location, naming by the relative path from its own directory plain.txt/below or plain.txt/inner/below in the case directory, where plain.txt is a regular file, reads as the same link naming nowhere, a missing path in the case directory, by the relative path from its own directory (provider)", judge: () => judgeRelativeBelowFile(PROVIDER) },
    ],
  },
];

for (const family of FAMILIES) {
  describe(`wb-g9g5 ${family.id} (${family.answers}, ${family.witness})`, () => {
    for (const row of family.rows) {
      it(`${row.id}: ${row.title}`, () => {
        expect(row.judge()).toEqual({ family: family.id, subject: row.subject, judged: family.plants });
      }, 120_000);
    }
  });
}

/** The header's two markers, in order: its pinned reader set, then its scope sentence. */
const SET_OPEN = "PINNED READER SET (this file; every row observed green on the cut):";
const SET_CLOSE = "NOT CLAIMED by this suite:";
/** The header's bullet for the rows outside the family table. */
const SHAPE_BULLET =
  "RTF-PLANT-SETS, RTF-HEADER-SET, RTF-ANCHOR-SRC, RTF-ANCHOR-RECEIPT, RTF-FAMILIES-SHAPE: the titles' plant words, this header's set, the src routing and the receipt (the two anchors outside this file), and the table shape and this file's words.";
/** A family's bullet in the header's pinned reader set, computed from the table. */
function familyBullet(family: Family): string {
  return `${family.rows.map(row => row.id).join(", ")}: ${family.plants} ${family.unit}${family.rows.length > 1 ? " each" : ""}, each reading ${family.reading};`;
}
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
const CENSUS_WORDS_SHA256 = "c7e4b35d173128b9ff8eb1c3a75e56107f521b3756a2784f03b67337aa88341a";

const MODULE = new URL("../src/workbench/replay-dependencies.ts", import.meta.url);
/** The readFiles doc comment's words, white space collapsed: the doc comment directly before `function readFiles`. */
function readFilesDoc(): string {
  const text = readFileSync(MODULE, "utf8");
  const docs = [...text.matchAll(/\/\*\*[\s\S]*?\*\//g)].filter(match => /^\s*function\s+readFiles\b/.test(text.slice((match.index ?? 0) + match[0].length)));
  expect(docs, "one doc comment directly before function readFiles").toHaveLength(1);
  return flattened(docs[0]?.[0] ?? "").trim();
}
/** Where the readFiles doc's routing to this bead opens and closes: the forms it names lie between the two. */
const ROUTING_OPEN = "the ones the structural exit R-B729 routes to wb-g9g5 (the relative link below a regular file with them, as R-B730 has its treatment ride wb-g9g5's claims-equal-pins cut), namely ";
const ROUTING_CLOSE = "; and, under the R-B731 guard on the cycle words,";
/** The routing's words once every family's routed words are cut out (each marked |): only the words joining the forms. */
const ROUTING_JOINS = "|, or, |; |; and |, |, | and |, each naming its target by a relative path";

const RECEIPT = new URL("../docs/workbench/receipts/wb-g9g5.md", import.meta.url);
const RECEIPT_LABEL = "(FAMILIES, RTF-FAMILIES-SHAPE):";
/** The sha-256 of this bead's receipt, the whole file, as this cut delivers it. */
const RECEIPT_SHA256 = "917dc586ba418310cb6bc4baffbdeb9d2d69e0f87c54a087881504413b6645de";
/**
 * A character reference: an ampersand, then a number sign and decimal digits, a number sign, an x and hex digits, or a name
 * of ASCII letters, digits and underscores, then a semicolon (the forms marked passes into its HTML as written).
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

describe("wb-g9g5 the family table, its titles and header, and its anchors outside this file", () => {
  it("RTF-PLANT-SETS: each row title names its family's plant count and, word for word, each phrase its family computes from its judge's data, and closes on its reader; each reader's location and the instruction paths RTF-LISTED-NAMED lists are the module's own", () => {
    expect([CLAUDE_INSTRUCTION_LOCATIONS.user.includes(INSTRUCTIONS.location), CLAUDE_SETTINGS_LOCATIONS.user.includes(PROVIDER.location)], "each reader's location").toEqual([true, true]);
    expect(instructionPaths("/repo/pkg", ["user"], "/config"), "the instruction paths under the user source alone").toEqual(USER_LOCATIONS.map(location => join("/config", location)));
    for (const family of FAMILIES) {
      expect(family.planted(), `${family.id}: the readings its judge's data gives one row`).toBe(family.plants);
      for (const row of family.rows) {
        const reader = row.subject === "instructions" ? INSTRUCTIONS : PROVIDER;
        const closing = family.reading === UNREADABLE ? unknownWords(reader) : `(${reader.name})`;
        expect(
          [`each of the ${counted(family.plants)} `, ...family.phrases(), closing].filter(phrase => !row.title.includes(phrase)),
          `${row.id}: what its data plants and asserts that its title does not say`,
        ).toEqual([]);
        expect(row.title.endsWith(closing), `${row.id}: its title closes on its reader's reading`).toBe(true);
      }
    }
  });

  it("RTF-HEADER-SET: the header's pinned reader set lists each family's rows, plant count and reading in table order, then the rows outside the table, its two markers once each and in order", () => {
    const { header } = ownText();
    expect([SET_OPEN, SET_CLOSE].map(part => occurrences(header, part)), "each marker once").toEqual([1, 1]);
    const start = header.indexOf(SET_OPEN);
    const end = header.indexOf(SET_CLOSE);
    expect(start, "the set before the scope sentence").toBeLessThan(end);
    const bullets = header
      .slice(start + SET_OPEN.length, end)
      .split(/(?:^| )- (?=RTF-)/)
      .map(item => item.trim())
      .filter(item => item !== "");
    expect(bullets).toEqual([...FAMILIES.map(familyBullet), SHAPE_BULLET]);
  });

  it("RTF-ANCHOR-SRC: the readFiles doc of src/workbench/replay-dependencies.ts routes to this bead exactly the forms the families answer: each family's routed words occur once in the routing, and cut out they leave only the words joining the forms", () => {
    const doc = readFilesDoc();
    expect([ROUTING_OPEN, ROUTING_CLOSE].map(part => occurrences(doc, part)), "the routing's bounds, once each").toEqual([1, 1]);
    const routing = doc.slice(doc.indexOf(ROUTING_OPEN) + ROUTING_OPEN.length, doc.indexOf(ROUTING_CLOSE));
    const routed = FAMILIES.flatMap(family => family.routed);
    expect(
      routed.map(words => `${words}:${occurrences(routing, words)}`),
      "each family's routed words, once in the routing",
    ).toEqual(routed.map(words => `${words}:1`));
    expect(routed.reduce((rest, words) => rest.replace(words, "|"), routing), "the routing with every family's words cut out").toBe(ROUTING_JOINS);
  });

  it("RTF-ANCHOR-RECEIPT: this bead's receipt, as marked lexes it, carries no HTML (a comment included), image, hard line break or character reference, each of its texts carrying the FAMILIES label lists each family with the item, member and witness it answers, in table order, and the receipt reads word for word as this cut delivers it", () => {
    const markdown = readFileSync(RECEIPT, "utf8");
    expect(receiptHazards(markdown), "what the receipt's rendered text could hide").toEqual([]);
    const lists = pageTexts(marked.lexer(markdown))
      .filter(text => text.includes(RECEIPT_LABEL))
      .map(familyList);
    expect(lists.length, "the FAMILIES-labelled texts").toBeGreaterThan(0);
    for (const list of lists) expect(list).toEqual(FAMILIES.map(family => `${family.id} ${family.answers} ${family.witness}`));
    expect(sha256Of(markdown), "the receipt's bytes").toBe(RECEIPT_SHA256);
  });

  it("RTF-FAMILIES-SHAPE: the family table, written out (frozen shape): each family's id, answered item and member, witness, routed words, plants per row, unit, then each row's id, subject and title length; and this file's words (every comment as the TypeScript parser's comment ranges give it, this header among them, and every group and case title as the test runner registers it) read word for word as this cut delivers them", ({ task }) => {
    expect(sha256Of(censusWords(ownText().source, task.file.tasks).join("\n")), "this file's words").toBe(CENSUS_WORDS_SHA256);
    expect(FAMILIES.map(family => `${family.id}|${family.answers}|${family.witness}|${family.routed.join("+")}|${family.plants}|${family.unit}|${family.rows.map(row => `${row.id}:${row.subject}:${row.title.length}`).join(",")}`)).toEqual([
      "RTF-LISTED-BESIDE|U1 GP10-02|W10-02|a directory left at mode 0600 or 0400 listing another entry beside the path|64|plants|RTF-LISTED-BESIDE-instructions:instructions:239,RTF-LISTED-BESIDE-provider:provider:236",
      "RTF-LISTED-OTHER-NAME|U2 GP10-01|W10-01|below the location, listing a path named other than entry.md|64|plants|RTF-LISTED-OTHER-NAME-instructions:instructions:227,RTF-LISTED-OTHER-NAME-provider:provider:224",
      "RTF-LISTED-NAMED|U3 GP10-03|W10-03|at the named path, such a directory listing the instruction reader's CLAUDE.md|2|plants|RTF-LISTED-NAMED-instructions:instructions:286",
      "RTF-RELATIVE-UNSTAT|U4 GP10-04|W10-04|two links naming each other+a link naming a path with a 256-byte component|66|plants|RTF-RELATIVE-UNSTAT-instructions:instructions:390,RTF-RELATIVE-UNSTAT-provider:provider:387",
      "RTF-RELATIVE-READ-AGAIN|U5 GP10-07|W10-07|a link through which a directory is first reached|62|trees|RTF-RELATIVE-READ-AGAIN-instructions:instructions:429,RTF-RELATIVE-READ-AGAIN-provider:provider:425",
      "RTF-RELATIVE-BELOW-FILE|U7 GP10-06b|W10-06|a link naming a path below a regular file|66|links|RTF-RELATIVE-BELOW-FILE-instructions:instructions:379,RTF-RELATIVE-BELOW-FILE-provider:provider:375",
    ]);
  });
});
