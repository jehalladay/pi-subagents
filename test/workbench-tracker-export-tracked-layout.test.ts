/**
 * wb-00si: the tracked tracker export - the main export .beads/issues.jsonl and the month shards in .beads/archive/ - read where it is
 * tracked, against the owner shape ruling bound on wb-294d (M:61843). Each case title claims what its assertions check and no more.
 * L6 pins the bytes of the 2026-10 shard (owner shape element 2: a shard is immutable once its month ends).
 * wb-ff3w (R694 follow-up of wb-tt43 landing 1060, F1): a month's shards include its CONTINUATIONS (wb-tt43, owner ruling 2026-11-08 on
 * that bead), so SHARD_NAME takes the continuation form issues-closed-YYYY-MM-X.jsonl, X one letter b to z, and the archive listing
 * reads in NAME ORDER - each month's monthly shard, then its continuations in letter order, then the next month's shards - the order
 * qa/workbench/tracker-export.mjs reads and lists shards in (M2 of test/workbench-tracker-export-compaction.test.ts). L2, L3 and L5
 * read the tracked archive in that order. L7 and L8 read scratch copies of the tracked export with continuations planted beside the
 * copied shards: L7 three empty ones, L8 one holding a re-archived closed row's rewritten line.
 * NOT CLAIMED: what the tracker's importer (bd import) does with these files; whether a later export is compacted before it is
 * committed (the machine's hop, outside this repository); the bytes of a shard of a month after 2026-10; an edge whose depends_on_id
 * names no row of the main export; a shard line whose id has no row in the main export.
 * Also NOT CLAIMED: the FULL-rows half of owner shape element 1 (the main export keeps FULL rows for non-closed beads), and each part
 * of element 3 that compares the tracked files with the store (the non-closed set byte-equal store-vs-export among them).
 * Also NOT CLAIMED (wb-ff3w): the bytes of any continuation; a layout L7 and L8 do not plant - a continuation without its month's
 * monthly shard, a month whose continuations skip a letter, a plant in a month between the oldest and the newest, a planted name
 * outside the shard form, a continuation of a month after the newest, and a continuation holding a line of an id no other shard holds.
 * wb-nu12 (R694 follow-up of wb-ff3w landing 1068, F1): L9 plants three entries that are not shard files in a scratch copy of the tracked
 * export - a directory under the name of the next continuation after the newest month's latest shard, a regular file named README holding
 * text that is not JSON, and a regular file under that latest shard's name with .orig appended holding a closed row's rewritten line, the
 * copy's main export carrying that line's stub - and holds that L2's reading of the copy returns, lists the three, takes no archived line
 * from the .orig file, and that L2's assertions over that reading fail first at their named 'entries that are not shard files' assertion
 * although the reading also finds that row unmet.
 * Also NOT CLAIMED (wb-nu12): whether L2's reading opens or reads an entry that is not a shard file when doing so neither fails nor yields
 * an archived line; an entry L9 does not plant - a symbolic link, a FIFO or another special file, a regular file under a shard name whose
 * text does not parse, an entry that cannot be read; and what L3, L5, L7 and L8 do with an entry that is not a shard file.
 */
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { copyFileSync, existsSync, lstatSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { compactTrackerExport, DEFAULT_SOFT_CEILING, trackerExportText } from "../qa/workbench/tracker-export.mjs";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard();

const REPO = process.cwd();
const TOOL = join(REPO, "qa", "workbench", "tracker-export.mjs");
const MAIN = join(REPO, ".beads", "issues.jsonl");
const ARCHIVE = join(REPO, ".beads", "archive");
/** The eight stub fields: the owner shape's six (id, title, status, closed stamp, close reason, dep edges) with _type and updated_at. */
const STUB_KEYS: readonly string[] = ["_type", "id", "title", "status", "updated_at", "closed_at", "close_reason", "dependencies"];
/**
 * A shard's file name: a month's monthly shard issues-closed-YYYY-MM.jsonl, MM 01 to 12, or one of its continuations
 * issues-closed-YYYY-MM-X.jsonl, X one letter b to z (wb-tt43). Group 1 is the month, group 2 a continuation's letter.
 */
const SHARD_NAME = /^issues-closed-(\d{4}-(?:0[1-9]|1[0-2]))(?:-([b-z]))?\.jsonl$/;
/** A month's continuation letters in order: -b follows its monthly shard and each letter the one before it. */
const LETTERS = "bcdefghijklmnopqrstuvwxyz";
const SOFT_CEILING = 99_614_720;
const SEALED_SHARD = "issues-closed-2026-10.jsonl";
/** L8's and L9's rewritten updated_at; each case holds its rewritten stub unequal to the tracked line it rewrites. */
const REWRITTEN_UPDATED_AT = "2099-01-01T00:00:00Z";

type Row = { [key: string]: unknown };

const scratches: string[] = [];
afterEach(() => {
  for (const dir of scratches.splice(0)) removeScratch(dir);
});

const isRow = (value: unknown): value is Row => value !== null && typeof value === "object" && !Array.isArray(value);
const parsed = (line: string): Row => JSON.parse(line) as Row;
const nonEmpty = (text: string): string[] => text.split("\n").filter(line => line !== "");
const extraKeys = (row: Row): string[] => Object.keys(row).filter(key => !STUB_KEYS.includes(key));
const mainRows = (): Row[] => nonEmpty(readFileSync(MAIN, "utf8")).map(parsed);
const stubLine = (row: Row): string => JSON.stringify(Object.fromEntries(Object.entries(row).filter(([key]) => STUB_KEYS.includes(key))));

/** A name's NAME ORDER key: a shard's month's monthly shard name and its letter ("" for that monthly shard), any other name its own text. */
function nameKey(name: string): readonly [string, string] {
  const parts = SHARD_NAME.exec(name);
  return parts === null ? [name, ""] : [`issues-closed-${parts[1] ?? ""}.jsonl`, parts[2] ?? ""];
}

/** Two names in NAME ORDER: by their months' monthly shard names, then a month's monthly shard before its continuations, in letter order. */
function byName(a: string, b: string): number {
  const [left, leftLetter] = nameKey(a);
  const [right, rightLetter] = nameKey(b);
  if (left !== right) return left < right ? -1 : 1;
  return leftLetter < rightLetter ? -1 : leftLetter > rightLetter ? 1 : 0;
}

/** An archive directory's entry names in NAME ORDER; none when it is absent. */
function shardNames(archive: string): string[] {
  return existsSync(archive) ? readdirSync(archive).sort(byName) : [];
}

/** Each id's last archived line: the shards in the order given, lines in file order. */
function lastArchived(archive: string, names: readonly string[]): Map<string, string> {
  const last = new Map<string, string>();
  for (const name of names) for (const line of nonEmpty(readFileSync(join(archive, name), "utf8"))) last.set(String(parsed(line).id), line);
  return last;
}

/** How many lines two texts differ in: a count to report, never a diff of two exports. */
function differingLines(a: string, b: string): number {
  const left = a.split("\n");
  const right = b.split("\n");
  let count = 0;
  for (let index = 0; index < Math.max(left.length, right.length); index += 1) if (left[index] !== right[index]) count += 1;
  return count;
}

type ShardReading = { readonly names: string[]; readonly notShards: string[]; readonly unmet: string[] };

/**
 * L2's reading of a main export and the archive directory beside it: the archive's entries in name order, those that are not shard files
 * (a name outside SHARD_NAME, or an entry that is not a regular file), found before any entry is read, and, for every closed row of the
 * main export, what its id's last archived line (the shard files alone, in name order, lines in file order) lacks: it passes lastArchived
 * only the names it does not list as not shard files (wb-nu12).
 */
function shardReading(mainPath: string): ShardReading {
  const archive = join(dirname(mainPath), "archive");
  const names = shardNames(archive);
  const notShards = names.filter(name => !SHARD_NAME.test(name) || !lstatSync(join(archive, name)).isFile());
  const last = lastArchived(archive, names.filter(name => !notShards.includes(name)));
  const unmet: string[] = [];
  for (const line of nonEmpty(readFileSync(mainPath, "utf8"))) {
    const row = parsed(line);
    if (row.status !== "closed") continue;
    const archived = last.get(String(row.id));
    if (archived === undefined) {
      unmet.push(`${String(row.id)}: no archived line`);
      continue;
    }
    const full = parsed(archived);
    if (full.status !== "closed") unmet.push(`${String(row.id)}: archived row not closed`);
    if (extraKeys(full).length === 0) unmet.push(`${String(row.id)}: archived row holds no field beyond the stub fields`);
    if (stubLine(full) !== line) unmet.push(`${String(row.id)}: stub line differs`);
  }
  return { names, notShards, unmet };
}

/** L2's assertions over a reading, in this order: one or more entries; no entry that is not a shard file, the named assertion; nothing unmet. */
function expectShards(reading: ShardReading): void {
  expect(reading.names.length).toBeGreaterThan(0);
  expect(reading.notShards, "entries that are not shard files").toEqual([]);
  expect(reading.unmet).toEqual([]);
}

type RoundTrip = {
  readonly lineCount: number;
  readonly misplaced: number;
  readonly refused: string[];
  readonly appended: Record<string, number>;
  readonly main: [boolean, number];
  readonly shardNames: string[];
  readonly shardsChanged: string[];
};

/** L3's round trip of a main export and the archive directory beside it: what it reads, and what L3 holds that equal to. */
function roundTrip(mainPath: string): { readonly observed: RoundTrip; readonly expected: RoundTrip } {
  const archive = join(dirname(mainPath), "archive");
  const main = readFileSync(mainPath, "utf8");
  const full = trackerExportText(mainPath);
  const names = shardNames(archive);
  const last = lastArchived(archive, names);
  const mainLines = main.split("\n");
  const fullLines = full.split("\n");
  const misplaced = mainLines.filter((line, index) => {
    if (line === "") return fullLines[index] !== "";
    const row = parsed(line);
    return fullLines[index] !== (row.status === "closed" ? last.get(String(row.id)) : line);
  }).length;
  const shards = new Map(names.map(name => [name, readFileSync(join(archive, name), "utf8")] as const));
  const result = compactTrackerExport({ full, shards, now: new Date().toISOString() });
  return {
    observed: {
      lineCount: fullLines.length,
      misplaced,
      refused: result.ok ? [] : result.lines,
      appended: result.ok ? Object.fromEntries([...result.appended].map(([name, ids]) => [name, ids.length])) : {},
      main: result.ok ? [result.main === main, differingLines(result.main, main)] : [false, -1],
      shardNames: result.ok ? [...result.shards.keys()] : [],
      shardsChanged: result.ok ? names.filter(name => result.shards.get(name) !== shards.get(name)) : names,
    },
    expected: { lineCount: mainLines.length, misplaced: 0, refused: [], appended: {}, main: [true, 0], shardNames: names, shardsChanged: [] },
  };
}

/** Each month the given names hold a shard of, oldest first, with the name of its latest shard in name order. */
function latestByMonth(names: readonly string[]): Map<string, string> {
  const latest = new Map<string, string>();
  for (const name of names) {
    const month = SHARD_NAME.exec(name)?.[1];
    if (month === undefined) continue;
    const held = latest.get(month);
    if (held === undefined || byName(held, name) < 0) latest.set(month, name);
  }
  return new Map([...latest].sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0)));
}

/** The continuation `step` letters after a shard of its month: -b is the first after the month's monthly shard. */
function continuationAfter(name: string, step: number): string {
  const parts = SHARD_NAME.exec(name);
  const letter = LETTERS[(parts?.[2] === undefined ? -1 : LETTERS.indexOf(parts[2])) + step];
  if (parts === null || letter === undefined) throw new Error(`no continuation ${step} after ${name}`);
  return `issues-closed-${parts[1] ?? ""}-${letter}.jsonl`;
}

/** The row of an archive's last line, shards in name order and lines in file order, that `wanted` holds. */
function lastArchivedRow(archive: string, wanted: (row: Row) => boolean): Row | undefined {
  for (const name of shardNames(archive).reverse()) {
    const row = nonEmpty(readFileSync(join(archive, name), "utf8")).map(parsed).reverse().find(wanted);
    if (row !== undefined) return row;
  }
  return undefined;
}

/** A scratch copy of the tracked export: the main export at <dir>/.beads/issues.jsonl and each tracked shard in <dir>/.beads/archive/. */
function copyTrackedExport(dir: string): { readonly main: string; readonly archive: string } {
  const archive = join(dir, ".beads", "archive");
  mkdirSync(archive, { recursive: true });
  const main = join(dir, ".beads", "issues.jsonl");
  copyFileSync(MAIN, main);
  for (const name of shardNames(ARCHIVE)) copyFileSync(join(ARCHIVE, name), join(archive, name));
  return { main, archive };
}

describe("wb-00si the tracked tracker export, read where it is tracked", { timeout: 180_000 }, () => {
  it("L1 STUBS: the tracked main export holds closed rows, and every closed row's fields are among _type, id, title, status, updated_at, closed_at, close_reason and dependencies", () => {
    const closed = mainRows().filter(row => row.status === "closed");
    expect(closed.length).toBeGreaterThan(0);
    expect(closed.filter(row => extraKeys(row).length > 0).length, "closed rows holding a field beyond the stub fields").toBe(0);
  });

  it("L2 SHARDS: .beads/archive/ holds one or more regular files, each named issues-closed-YYYY-MM.jsonl with MM 01 to 12 or issues-closed-YYYY-MM-X.jsonl with X one letter b to z; for every closed row of the tracked main export, its id's last archived line (shards in name order - each month's monthly shard, then its continuations in letter order, then the next month's shards - lines in file order) is a closed row holding a field beyond those eight whose fields among them, in its own key order and written as JSON, are that row's main export line byte for byte", () => {
    expectShards(shardReading(MAIN));
  });

  it("L3 ROUND TRIP: trackerExportText of the tracked main export has the main export's line count, with each non-closed line of the main export unchanged in its place and each closed line replaced by its id's last archived line; compactTrackerExport of that text against the tracked shards at the current time refuses nothing, appends to no shard, and returns the tracked main export's text and each tracked shard's text, byte for byte, its shards in the archive listing's name order", () => {
    const trip = roundTrip(MAIN);
    expect(trip.observed).toEqual(trip.expected);
  });

  it("L4 DEP EDGES: a non-closed row of the tracked main export holds an edge into a closed bead, and every edge of a main export row whose depends_on_id is the id of a closed row of the main export reaches a row whose fields are among the eight stub fields", () => {
    const rows = mainRows();
    const byId = new Map(rows.map(row => [String(row.id), row]));
    let fromNonClosed = 0;
    const unmet: string[] = [];
    for (const row of rows) {
      const edges: unknown[] = Array.isArray(row.dependencies) ? row.dependencies : [];
      for (const edge of edges) {
        const target = byId.get(String(isRow(edge) ? edge.depends_on_id : ""));
        if (target === undefined || target.status !== "closed") continue;
        if (row.status !== "closed") fromNonClosed += 1;
        if (extraKeys(target).length > 0) unmet.push(`${String(row.id)} -> ${String(target.id)}`);
      }
    }
    expect(fromNonClosed).toBeGreaterThan(0);
    expect(unmet.length, "edges into a closed bead whose row holds a field beyond the stub fields").toBe(0);
  });

  it("L5 CEILING: the tracked main export and each tracked shard are under the default soft ceiling of 99,614,720 bytes, and the guard verb over a scratch repository whose one commit holds copies of them at .beads/issues.jsonl and in .beads/archive/ exits 0 with nothing on stdout or stderr", () => {
    expect(DEFAULT_SOFT_CEILING).toBe(SOFT_CEILING);
    const names = shardNames(ARCHIVE);
    const files = [MAIN, ...names.map(name => join(ARCHIVE, name))];
    expect(files.filter(path => statSync(path).size >= SOFT_CEILING).map(path => `${path} ${statSync(path).size}`)).toEqual([]);
    const dir = makeScratch("tracker-export-tracked-layout-");
    scratches.push(dir);
    const env: NodeJS.ProcessEnv = {
      PATH: `${dirname(process.execPath)}:${process.env.PATH ?? ""}`,
      HOME: dir,
      LC_ALL: "C",
      GIT_CONFIG_GLOBAL: "/dev/null",
      GIT_CONFIG_SYSTEM: "/dev/null",
      GIT_AUTHOR_NAME: "t",
      GIT_AUTHOR_EMAIL: "t@example.invalid",
      GIT_COMMITTER_NAME: "t",
      GIT_COMMITTER_EMAIL: "t@example.invalid",
    };
    const git = (...args: string[]): number | null => spawnSync("git", args, { cwd: dir, env, encoding: "utf8" }).status;
    expect(git("init", "-q")).toBe(0);
    mkdirSync(join(dir, ".beads", "archive"), { recursive: true });
    copyFileSync(MAIN, join(dir, ".beads", "issues.jsonl"));
    for (const name of names) copyFileSync(join(ARCHIVE, name), join(dir, ".beads", "archive", name));
    expect([git("add", "--", ".beads"), git("commit", "-q", "-m", "the tracked export")]).toEqual([0, 0]);
    const run = spawnSync(process.execPath, [TOOL, "guard", "HEAD"], { cwd: dir, env, encoding: "utf8" });
    expect([run.status, run.stdout, run.stderr]).toEqual([0, "", ""]);
  });

  it("L6 SEALED: .beads/archive/issues-closed-2026-10.jsonl holds 46,834,285 bytes whose sha256 is fbe14d7fc6cd048bcf8eab2d64e50b8a4e4393aa9349c93a5dcf5a64e72194d3", () => {
    const path = join(ARCHIVE, SEALED_SHARD);
    const bytes = existsSync(path) ? readFileSync(path) : Buffer.alloc(0);
    expect([bytes.length, createHash("sha256").update(bytes).digest("hex")]).toEqual([46_834_285, "fbe14d7fc6cd048bcf8eab2d64e50b8a4e4393aa9349c93a5dcf5a64e72194d3"]);
  });

  it("L7 EMPTY CONTINUATIONS: in a scratch copy of the tracked main export and shards with three empty continuations planted - the next after the oldest month's latest shard and the next two after the newest month's latest shard - the archive listing puts the oldest month's plant right after that month's latest shard and right before the next month's monthly shard, and the newest month's two plants last, in letter order; L2's reading of the copy lists the three plants, finds no entry that is not a shard file and nothing unmet, and L3's round trip of the copy holds every equality L3 holds of the tracked export", () => {
    const dir = makeScratch("tracker-export-tracked-layout-");
    scratches.push(dir);
    const copy = copyTrackedExport(dir);
    const months = [...latestByMonth(shardNames(ARCHIVE))];
    expect(months.length, "months the tracked archive holds a shard of").toBeGreaterThan(1);
    const [oldestMonth = "", oldestLatest = ""] = months[0] ?? [];
    const [nextMonth = ""] = months[1] ?? [];
    const [, newestLatest = ""] = months[months.length - 1] ?? [];
    const plants = [continuationAfter(oldestLatest, 1), continuationAfter(newestLatest, 1), continuationAfter(newestLatest, 2)];
    for (const plant of plants) writeFileSync(join(copy.archive, plant), "");
    const listing = shardNames(copy.archive);
    const at = listing.indexOf(plants[0] ?? "");
    expect([oldestMonth < nextMonth, listing.slice(at - 1, at + 2), listing.slice(-3)], "each plant's place in the copy's listing").toEqual([
      true,
      [oldestLatest, plants[0], `issues-closed-${nextMonth}.jsonl`],
      [newestLatest, plants[1], plants[2]],
    ]);
    const reading = shardReading(copy.main);
    expect({ plants: plants.filter(plant => reading.names.includes(plant)), notShards: reading.notShards, unmet: reading.unmet }).toEqual({ plants, notShards: [], unmet: [] });
    const trip = roundTrip(copy.main);
    expect(trip.observed).toEqual(trip.expected);
  });

  it("L8 RE-ARCHIVED ROW: in a scratch copy of the tracked export in which the row of the tracked archive's last line, in name order, whose id is a closed row of the tracked main export is re-archived - that line with updated_at and notes rewritten planted as the next continuation after the newest month's latest shard, the copy's main export carrying the rewritten line's stub in place of the tracked line, which differs from it - the id's last archived line in the copy and trackerExportText's line for it are the rewritten line; L2's reading of the copy finds no entry that is not a shard file and nothing unmet, and L3's round trip of the copy holds every equality L3 holds of the tracked export", () => {
    const dir = makeScratch("tracker-export-tracked-layout-");
    scratches.push(dir);
    const copy = copyTrackedExport(dir);
    const newestLatest = [...latestByMonth(shardNames(ARCHIVE)).values()].at(-1) ?? "";
    const mainLines = readFileSync(MAIN, "utf8").split("\n");
    const closedIds = new Set(mainLines.filter(line => line !== "").map(parsed).filter(row => row.status === "closed").map(row => String(row.id)));
    const original = lastArchivedRow(ARCHIVE, row => closedIds.has(String(row.id)));
    if (original === undefined) throw new Error("no archived line names a closed row of the tracked main export");
    const id = String(original.id);
    const rewritten: Row = { ...original, updated_at: REWRITTEN_UPDATED_AT, notes: `${typeof original.notes === "string" ? original.notes : ""}\nwb-ff3w L8: this row re-archived` };
    const rewrittenLine = JSON.stringify(rewritten);
    const index = mainLines.findIndex(line => line !== "" && String(parsed(line).id) === id);
    expect([index >= 0, stubLine(rewritten) === mainLines[index]], "the tracked main export's line for the id, and the rewritten stub unequal to it").toEqual([true, false]);
    mainLines[index] = stubLine(rewritten);
    writeFileSync(copy.main, mainLines.join("\n"));
    writeFileSync(join(copy.archive, continuationAfter(newestLatest, 1)), `${rewrittenLine}\n`);
    expect({ last: lastArchived(copy.archive, shardNames(copy.archive)).get(id), read: trackerExportText(copy.main).split("\n")[index] }).toEqual({ last: rewrittenLine, read: rewrittenLine });
    const reading = shardReading(copy.main);
    expect({ notShards: reading.notShards, unmet: reading.unmet }).toEqual({ notShards: [], unmet: [] });
    const trip = roundTrip(copy.main);
    expect(trip.observed).toEqual(trip.expected);
  });

  it("L9 NON-SHARD ENTRIES: in a scratch copy of the tracked export with three entries that are not shard files planted in its archive - a directory under the name of the next continuation after the newest month's latest shard, a regular file named README holding text that is not JSON, and a regular file under that latest shard's name with .orig appended holding one line, the main export's first closed row with updated_at rewritten and a notes field added, the copy's main export carrying that line's stub in place of the row's tracked line, which differs from it - L2's reading of the copy returns, lists the .orig file last and the three plants in name order (README first) as the entries that are not shard files, and finds exactly that row's stub line differing from its id's last archived line, so it takes no archived line from the .orig file; and L2's assertions over that reading fail first at their named 'entries that are not shard files' assertion", () => {
    const dir = makeScratch("tracker-export-tracked-layout-");
    scratches.push(dir);
    const copy = copyTrackedExport(dir);
    const newestLatest = [...latestByMonth(shardNames(ARCHIVE)).values()].at(-1) ?? "";
    const directory = continuationAfter(newestLatest, 1);
    const readme = "README";
    const orig = `${newestLatest}.orig`;
    const mainLines = readFileSync(MAIN, "utf8").split("\n");
    const index = mainLines.findIndex(line => line !== "" && parsed(line).status === "closed");
    if (index < 0) throw new Error("the tracked main export holds no closed row");
    const mainLine = mainLines[index] ?? "";
    const planted: Row = { ...parsed(mainLine), updated_at: REWRITTEN_UPDATED_AT, notes: "wb-nu12 L9: a line in an entry that is not a shard file" };
    expect(stubLine(planted) === mainLine, "the .orig line's stub equal to its row's tracked main export line").toBe(false);
    mainLines[index] = stubLine(planted);
    writeFileSync(copy.main, mainLines.join("\n"));
    mkdirSync(join(copy.archive, directory));
    writeFileSync(join(copy.archive, readme), "not a shard\n");
    writeFileSync(join(copy.archive, orig), `${JSON.stringify(planted)}\n`);
    const reading = shardReading(copy.main);
    expect({ last: reading.names.at(-1), notShards: reading.notShards, unmet: reading.unmet }).toEqual({
      last: orig,
      notShards: [readme, directory, orig],
      unmet: [`${String(planted.id)}: stub line differs`],
    });
    expect(() => expectShards(reading)).toThrow(/^entries that are not shard files: /);
  });
});
