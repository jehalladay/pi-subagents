/**
 * wb-00si: the tracked tracker export - the main export .beads/issues.jsonl and the month shards in .beads/archive/ - read where it is
 * tracked, against the owner shape ruling bound on wb-294d (M:61843). Each case title claims what its assertions check and no more.
 * L6 pins the bytes of the 2026-10 shard (owner shape element 2: a shard is immutable once its month ends).
 * NOT CLAIMED: what the tracker's importer (bd import) does with these files; whether a later export is compacted before it is
 * committed (the machine's hop, outside this repository); the bytes of a shard of a month after 2026-10; an edge whose depends_on_id
 * names no row of the main export; a shard line whose id has no row in the main export.
 */
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { copyFileSync, existsSync, lstatSync, mkdirSync, readdirSync, readFileSync, statSync } from "node:fs";
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
const SHARD_NAME = /^issues-closed-\d{4}-(?:0[1-9]|1[0-2])\.jsonl$/;
const SOFT_CEILING = 99_614_720;
const SEALED_SHARD = "issues-closed-2026-10.jsonl";

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

/** The archive directory's entry names in name order; none when it is absent. */
function shardNames(): string[] {
  return existsSync(ARCHIVE) ? readdirSync(ARCHIVE).sort() : [];
}

/** Each id's last archived line: shards in name order, lines in file order. */
function lastArchived(names: readonly string[]): Map<string, string> {
  const last = new Map<string, string>();
  for (const name of names) for (const line of nonEmpty(readFileSync(join(ARCHIVE, name), "utf8"))) last.set(String(parsed(line).id), line);
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

describe("wb-00si the tracked tracker export, read where it is tracked", { timeout: 180_000 }, () => {
  it("L1 STUBS: the tracked main export holds closed rows, and every closed row's fields are among _type, id, title, status, updated_at, closed_at, close_reason and dependencies", () => {
    const closed = mainRows().filter(row => row.status === "closed");
    expect(closed.length).toBeGreaterThan(0);
    expect(closed.filter(row => extraKeys(row).length > 0).length, "closed rows holding a field beyond the stub fields").toBe(0);
  });

  it("L2 SHARDS: .beads/archive/ holds one or more regular files, each named issues-closed-YYYY-MM.jsonl with MM 01 to 12; for every closed row of the tracked main export, its id's last archived line (shards in name order, lines in file order) is a closed row holding a field beyond those eight whose fields among them, in its own key order and written as JSON, are that row's main export line byte for byte", () => {
    const names = shardNames();
    expect(names.length).toBeGreaterThan(0);
    expect(names.filter(name => !SHARD_NAME.test(name) || !lstatSync(join(ARCHIVE, name)).isFile()), "entries that are not shard files").toEqual([]);
    const last = lastArchived(names);
    const unmet: string[] = [];
    for (const line of nonEmpty(readFileSync(MAIN, "utf8"))) {
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
      if (JSON.stringify(Object.fromEntries(Object.entries(full).filter(([key]) => STUB_KEYS.includes(key)))) !== line) unmet.push(`${String(row.id)}: stub line differs`);
    }
    expect(unmet).toEqual([]);
  });

  it("L3 ROUND TRIP: trackerExportText of the tracked main export has the main export's line count, with each non-closed line of the main export unchanged in its place and each closed line replaced by its id's last archived line; compactTrackerExport of that text against the tracked shards at the current time refuses nothing, appends to no shard, and returns the tracked main export's text and each tracked shard's text, byte for byte", () => {
    const main = readFileSync(MAIN, "utf8");
    const full = trackerExportText(MAIN);
    const names = shardNames();
    const last = lastArchived(names);
    const mainLines = main.split("\n");
    const fullLines = full.split("\n");
    const misplaced = mainLines.filter((line, index) => {
      if (line === "") return fullLines[index] !== "";
      const row = parsed(line);
      return fullLines[index] !== (row.status === "closed" ? last.get(String(row.id)) : line);
    }).length;
    const shards = new Map(names.map(name => [name, readFileSync(join(ARCHIVE, name), "utf8")] as const));
    const result = compactTrackerExport({ full, shards, now: new Date().toISOString() });
    expect({
      lineCount: fullLines.length,
      misplaced,
      refused: result.ok ? [] : result.lines,
      appended: result.ok ? Object.fromEntries([...result.appended].map(([name, ids]) => [name, ids.length])) : {},
      main: result.ok ? [result.main === main, differingLines(result.main, main)] : [false, -1],
      shardNames: result.ok ? [...result.shards.keys()] : [],
      shardsChanged: result.ok ? names.filter(name => result.shards.get(name) !== shards.get(name)) : names,
    }).toEqual({ lineCount: mainLines.length, misplaced: 0, refused: [], appended: {}, main: [true, 0], shardNames: names, shardsChanged: [] });
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
    const names = shardNames();
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
});
