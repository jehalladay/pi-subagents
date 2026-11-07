/**
 * wb-294d (g10.24-K1): the tracker export kept under GitHub's 104,857,600-byte blob wall - the compaction ritual and the rehydrating
 * reader of qa/workbench/tracker-export.mjs, judged at their exported functions and at the CLI.
 *
 * Owner shape ruling (bound on the bead; this file pins elements 1-3 and the compaction half of element 4):
 *   1. STUB ROWS: the pushed main export keeps FULL rows only for non-closed beads; every closed bead becomes a STUB row carrying id,
 *      title, status, closed stamp, close reason and dep edges - no description/notes bodies.
 *   2. ARCHIVE SHARDS: closed-issue bodies move to append-only monthly shards .beads/archive/issues-closed-YYYY-MM.jsonl keyed by UTC
 *      close month; a shard is immutable once its month ends, and past months' shards are byte-unchanged at every export. The period
 *      is the MONTH the shape names (ruling R-B670 on wb-294d: the first cut's day period is outside the shape); a row of a sealed month
 *      that arrives or changes later goes to the run month's shard, which only ever grows by whole lines at its end.
 *   3. ROUND TRIP: the non-closed set byte-equal store-vs-export; a closed bead's full row recoverable by id from its shard; a dep edge
 *      into a closed bead resolves via the stub.
 *   4. (compaction half) the soft ceiling covers the main export and each shard: a compaction that would write either at or over it
 *      refuses and writes nothing. The pre-push half is test/workbench-tracker-export-guard.test.ts.
 * Two stub fields beyond the ruling's list, each for a measured reason: `_type` (bd export's row discriminator, which bd import reads)
 * and `updated_at` (bd import rewrites an existing issue only when a row's updated_at is strictly newer, and fills an absent one with
 * the import time - so a stub without it would bump every closed bead it touched; measured with a scratch bd 1.1.0-rc.1 store).
 * "The store" here is its projection: the full `bd export` text. No case reads or writes a bead store.
 * Each case's title claims what its assertions check and no more; the module header (qa/workbench/tracker-export.mjs) cites these case
 * ids (C, R, K, T, S) beside the guard suite's (G) for every sentence it claims, and names what it does not claim.
 */
import { spawnSync } from "node:child_process";
import { existsSync, lstatSync, mkdirSync, readdirSync, readFileSync, readlinkSync, symlinkSync, utimesSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { afterEach, describe, expect, it } from "vitest";
import {
  compactTrackerExport,
  DEFAULT_SOFT_CEILING,
  rehydrateTrackerExport,
  rehydrateTrackerText,
  STUB_FIELDS,
  trackerExportText,
} from "../qa/workbench/tracker-export.mjs";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard();

const REPO = process.cwd();
const TOOL = join(REPO, "qa", "workbench", "tracker-export.mjs");
const TRACKED_EXPORT = join(REPO, ".beads", "issues.jsonl");
/** The ruling's stub fields plus the two measured additions, in the order bd export writes them. */
const EXPECTED_STUB_FIELDS = ["_type", "id", "title", "status", "updated_at", "closed_at", "close_reason", "dependencies"];
const BODY_FIELDS = ["description", "notes", "acceptance_criteria", "comments", "design"];

type Json = null | boolean | number | string | Json[] | { [key: string]: Json };
type Row = { [key: string]: Json };

const scratches: string[] = [];
afterEach(() => {
  for (const dir of scratches.splice(0)) removeScratch(dir);
});

function scratch(prefix: string): string {
  const dir = makeScratch(prefix);
  scratches.push(dir);
  return dir;
}

/** One full bd-export row; closed rows get a close stamp and reason unless overridden. */
function row(id: string, status: string, extra: Row = {}): Row {
  const base: Row = {
    _type: "issue",
    id,
    title: `title of ${id}`,
    description: `description body of ${id}`,
    notes: `notes body of ${id}`,
    status,
    priority: 2,
    issue_type: "task",
    owner: "owner@example.invalid",
    created_at: "2026-10-01T00:00:00Z",
    created_by: "flywheel",
    updated_at: "2026-11-03T10:00:05Z",
  };
  if (status === "closed") {
    base.closed_at = "2026-11-03T10:00:00Z";
    base.close_reason = `landing of ${id}`;
  }
  return { ...base, ...extra, dependency_count: 0, dependent_count: 0, comment_count: 0 };
}

const lineOf = (value: Row): string => JSON.stringify(value);
const textOf = (rows: readonly Row[]): string => rows.map(r => `${lineOf(r)}\n`).join("");
const parsed = (line: string): Row => JSON.parse(line) as Row;
const linesOf = (text: string): string[] => text.split("\n").filter(line => line.length > 0);

/** What `read` throws - its class and message - or "no throw". */
function thrownBy(read: () => unknown): string {
  try {
    read();
  } catch (error) {
    return error instanceof Error ? `${error.constructor.name}: ${error.message}` : String(error);
  }
  return "no throw";
}

/**
 * Every entry below `root`, in name order: a directory as `<path>/`, a symlink as `<path> -> <target>`, a FIFO as `<path> (fifo)` - never
 * opened, since a read of a FIFO waits for a writer - and a file as `<path> = <text>`.
 */
function snapshot(root: string): string[] {
  const out: string[] = [];
  const walk = (rel: string): void => {
    for (const name of readdirSync(join(root, rel)).sort()) {
      const path = join(rel, name);
      const stat = lstatSync(join(root, path));
      if (stat.isSymbolicLink()) {
        out.push(`${path} -> ${readlinkSync(join(root, path))}`);
      } else if (stat.isDirectory()) {
        out.push(`${path}/`);
        walk(path);
      } else if (stat.isFIFO()) {
        out.push(`${path} (fifo)`);
      } else {
        out.push(`${path} = ${readFileSync(join(root, path), "utf8")}`);
      }
    }
  };
  walk("");
  return out;
}

/** The fixture export the routing cases share: two open rows, three closed rows in two close months, one edge into a closed bead. */
function fixtureRows(): Row[] {
  return [
    row("wb-o1", "open", { dependencies: [{ issue_id: "wb-o1", depends_on_id: "wb-c1", type: "blocks" }] }),
    row("wb-c1", "closed", { closed_at: "2026-10-31T23:59:59Z", updated_at: "2026-11-01T00:00:10Z" }),
    row("wb-c2", "closed", { closed_at: "2026-11-03T08:00:00Z", labels: ["urgent"], dependencies: [{ issue_id: "wb-c2", depends_on_id: "wb-c1", type: "related" }] }),
    row("wb-p1", "in_progress"),
    row("wb-c3", "closed", { closed_at: "2026-11-03T09:30:00Z", acceptance_criteria: "criteria body", comments: [{ id: 1, text: "c" }] }),
  ];
}

/** One CLI run; a child that outlives 120 s is killed, so a read that waits (of a FIFO) fails its case instead of hanging the run. */
function cli(args: readonly string[], env: NodeJS.ProcessEnv = {}): ReturnType<typeof spawnSync> {
  return spawnSync(process.execPath, [TOOL, ...args], { cwd: REPO, encoding: "utf8", env: { PATH: process.env.PATH, ...env }, timeout: 120_000 });
}

/**
 * Lines of whitespace alone - none of them empty - that C8 plants in a full export and R3 and C9 in a shard (W8-02 of wb-137f refusal
 * #1); the characters past the space and the tab are written by code point.
 */
const WHITESPACE_LINES: readonly (readonly [label: string, line: string])[] = [
  ["W8-02 a line of one space", " "],
  ["a line of one tab", "\t"],
  ["a line of spaces and a tab", "  \t "],
  ["a line of a vertical tab", String.fromCodePoint(0x0b)],
  ["a line of a form feed", String.fromCodePoint(0x0c)],
  ["a line of a no-break space", String.fromCodePoint(0xa0)],
  ["a line of a byte order mark", String.fromCodePoint(0xfeff)],
  ["a line of a line separator", String.fromCodePoint(0x2028)],
];

/**
 * The shard lines R3 and C9 plant, each a non-empty line that must fail the parse, beside the reason its typed Error names (W-GP4-01..03b
 * of wb-294d refusal #3; W8-01 and W8-02 of wb-137f refusal #1). The four prefix forms open with the export's own line prefix.
 */
const BAD_SHARD_LINES: readonly (readonly [label: string, line: string, reason: string])[] = [
  ["the prefix form cut short", '{"_type":"issue","id":"wb-c2","title":"title of wb-c2","status":"closed"', "does not parse"],
  ["the prefix form followed by other text", `${lineOf(row("wb-c2", "closed", { closed_at: "2026-11-03T08:00:00Z" }))} garbage`, "does not parse"],
  ["the prefix form with an id holding an invalid escape", '{"_type":"issue","id":"wb-\\q","title":"t","status":"closed"}', "does not parse"],
  ["the prefix form with an empty id", '{"_type":"issue","id":"","title":"t","status":"closed"}', "has no string id"],
  ["no prefix, cut short", '{"id":', "does not parse"],
  ["no prefix, followed by other text", '{"id":"wb-c2","status":"closed"} garbage', "does not parse"],
  ["no prefix, an id holding an invalid escape", '{"id":"wb-\\q","status":"closed"}', "does not parse"],
  ["no prefix, an empty id", '{"id":"","status":"closed"}', "has no string id"],
  ["an array", "[1]", "is not a JSON object"],
  ["null", "null", "is not a JSON object"],
  ["a number", "5", "is not a JSON object"],
  ["no id", '{"status":"closed"}', "has no string id"],
  ["a number id", '{"_type":"issue","id":7,"status":"closed"}', "has no string id"],
  ["a line that opens like a comment", "# a note", "does not parse"],
  ...WHITESPACE_LINES.map(([label, line]) => [label, line, "does not parse"] as const),
];

/** The whole shards a layout sets beside its planted shard: a sealed month's older body of wb-c1, and the fixture's own shard lines. */
const WHOLE_SHARDS: ReadonlyMap<string, string> = new Map([
  ["issues-closed-2026-09.jsonl", `${lineOf(row("wb-c1", "closed", { closed_at: "2026-09-30T00:00:00Z", notes: "an older body of wb-c1" }))}\n`],
  ["issues-closed-2026-10.jsonl", `${lineOf(fixtureRows()[1] ?? {})}\n`],
  ["issues-closed-2026-11.jsonl", `${lineOf(fixtureRows()[2] ?? {})}\n${lineOf(fixtureRows()[4] ?? {})}\n`],
]);

/**
 * Where R3 and C9 plant a shard, by name - the order the shards are read in: the only shard, the older and the newer of two, and the
 * middle of three; every other shard of the layout is whole.
 */
const SHARD_LAYOUTS: readonly (readonly [label: string, plant: string, whole: readonly string[]])[] = [
  ["the only shard", "issues-closed-2026-11.jsonl", []],
  ["the older of two shards", "issues-closed-2026-10.jsonl", ["issues-closed-2026-11.jsonl"]],
  ["the newer of two shards", "issues-closed-2026-11.jsonl", ["issues-closed-2026-10.jsonl"]],
  ["the middle of three shards", "issues-closed-2026-10.jsonl", ["issues-closed-2026-09.jsonl", "issues-closed-2026-11.jsonl"]],
];

/** The shards of one layout: its whole shards, then the planted shard holding `text`. */
const layoutShards = (plant: string, whole: readonly string[], text: string): Map<string, string> =>
  new Map([...whole.map(name => [name, WHOLE_SHARDS.get(name) ?? ""] as const), [plant, text] as const]);

/** Two whole rows of a planted shard, and the same two rows with an empty line between them. */
const PLANT_ROWS = `${lineOf(row("wb-c3", "closed"))}\n${lineOf(row("wb-c4", "closed"))}\n`;
const PLANT_ROWS_EMPTY_LINE = `${lineOf(row("wb-c3", "closed"))}\n\n${lineOf(row("wb-c4", "closed"))}\n`;

/** A planted shard with `bad` at line 1, before a whole row, or at line 2, between two whole rows. */
const PLANT_AT: readonly (readonly [at: number, text: (bad: string) => string])[] = [
  [1, bad => `${bad}\n${lineOf(row("wb-c3", "closed"))}\n`],
  [2, bad => `${lineOf(row("wb-c3", "closed"))}\n${bad}\n${lineOf(row("wb-c4", "closed"))}\n`],
];

/** The four prefix forms of BAD_SHARD_LINES, which K3 and K7 plant in the older of two month shards at the CLI. */
const PREFIX_FORMS = BAD_SHARD_LINES.filter(([label]) => label.startsWith("the prefix form"));

describe("wb-294d compaction: stub rows, month shards, round trip (owner shape elements 1-3)", () => {
  it("C1 STUB SHAPE: every closed fixture row - its keys in the export's order - becomes exactly the stub fields it has, in that order, with its own values and no body field", () => {
    expect([...STUB_FIELDS]).toEqual(EXPECTED_STUB_FIELDS);
    const full = textOf(fixtureRows());
    const result = compactTrackerExport({ full, shards: new Map(), now: "2026-11-03T12:00:00Z" });
    if (!result.ok) throw new Error(result.lines.join("\n"));
    const main = linesOf(result.main).map(parsed);
    const byId = new Map(fixtureRows().map(r => [String(r.id), r]));
    const closed = main.filter(r => r.status === "closed");
    expect(closed.map(r => r.id)).toEqual(["wb-c1", "wb-c2", "wb-c3"]);
    for (const stub of closed) {
      const source = byId.get(String(stub.id)) ?? {};
      expect(Object.keys(stub)).toEqual(EXPECTED_STUB_FIELDS.filter(field => field in source));
      for (const field of Object.keys(stub)) expect(stub[field]).toEqual(source[field]);
      for (const field of BODY_FIELDS) expect(stub).not.toHaveProperty(field);
    }
    expect(Object.keys(closed[0] ?? {})).not.toContain("dependencies");
    expect(closed[1]?.dependencies).toEqual([{ issue_id: "wb-c2", depends_on_id: "wb-c1", type: "related" }]);
    expect(closed.every(stub => "updated_at" in stub)).toBe(true);
  });

  it("C2 NON-CLOSED BYTE-EQUAL: every non-closed line of the main export is its full-export line, in the full export's row order", () => {
    const rows = fixtureRows();
    const full = textOf(rows);
    const result = compactTrackerExport({ full, shards: new Map(), now: "2026-11-03T12:00:00Z" });
    if (!result.ok) throw new Error(result.lines.join("\n"));
    const mainLines = linesOf(result.main);
    expect(mainLines.map(line => parsed(line).id)).toEqual(rows.map(r => r.id));
    const openLines = rows.filter(r => r.status !== "closed").map(lineOf);
    expect(mainLines.filter(line => parsed(line).status !== "closed")).toEqual(openLines);
    expect(result.main.endsWith("\n")).toBe(true);
  });

  it("C3 FIRST COMPACTION: with no shard yet, each closed full line whose UTC close month is at or before the run's goes to that month's shard, in export order; the round trip is byte-equal", () => {
    const rows = fixtureRows();
    const full = textOf(rows);
    const result = compactTrackerExport({ full, shards: new Map(), now: "2026-11-03T12:00:00Z" });
    if (!result.ok) throw new Error(result.lines.join("\n"));
    expect([...result.shards.keys()]).toEqual(["issues-closed-2026-10.jsonl", "issues-closed-2026-11.jsonl"]);
    expect(result.shards.get("issues-closed-2026-10.jsonl")).toBe(`${lineOf(rows[1] ?? {})}\n`);
    expect(result.shards.get("issues-closed-2026-11.jsonl")).toBe(`${lineOf(rows[2] ?? {})}\n${lineOf(rows[4] ?? {})}\n`);
    expect([...result.appended.entries()]).toEqual([
      ["issues-closed-2026-10.jsonl", ["wb-c1"]],
      ["issues-closed-2026-11.jsonl", ["wb-c2", "wb-c3"]],
    ]);
    expect(rehydrateTrackerText(result.main, result.shards)).toBe(full);
  });

  it("C3b UTC MONTH: a close stamp with an offset is filed under its UTC month (the offset is applied before the month is taken)", () => {
    const rows = [row("wb-z1", "closed", { closed_at: "2026-11-01T01:30:00+02:00" }), row("wb-z2", "closed", { closed_at: "2026-10-31T23:30:00-03:00" })];
    const result = compactTrackerExport({ full: textOf(rows), shards: new Map(), now: "2026-11-03T12:00:00Z" });
    if (!result.ok) throw new Error(result.lines.join("\n"));
    expect([...result.appended.entries()]).toEqual([
      ["issues-closed-2026-10.jsonl", ["wb-z1"]],
      ["issues-closed-2026-11.jsonl", ["wb-z2"]],
    ]);
  });

  it("C4 SEALED SHARDS: a later compaction never changes a past month's shard - late and changed closed rows go to the run month's shard", () => {
    const rows = fixtureRows();
    const first = compactTrackerExport({ full: textOf(rows), shards: new Map(), now: "2026-11-03T12:00:00Z" });
    if (!first.ok) throw new Error(first.lines.join("\n"));
    const before = new Map(first.shards);
    // Next month: wb-c2 gains a note after its close; wb-c4 closed in 2026-10 (a sealed month) shows up late; wb-c5 closes this month.
    const later = rows.map(r => (r.id === "wb-c2" ? { ...r, notes: `${String(r.notes)} + a note after the close`, updated_at: "2026-12-01T01:00:00Z" } : r));
    later.push(row("wb-c4", "closed", { closed_at: "2026-10-15T10:00:00Z" }), row("wb-c5", "closed", { closed_at: "2026-12-01T02:00:00Z" }));
    const full = textOf(later);
    const second = compactTrackerExport({ full, shards: before, now: "2026-12-01T03:00:00Z" });
    if (!second.ok) throw new Error(second.lines.join("\n"));
    for (const [name, text] of before) expect(second.shards.get(name), `${name} stays byte-unchanged`).toBe(text);
    expect([...second.appended.entries()]).toEqual([["issues-closed-2026-12.jsonl", ["wb-c2", "wb-c4", "wb-c5"]]]);
    expect(second.shards.get("issues-closed-2026-12.jsonl")).toBe([later[2], later[5], later[6]].map(r => `${lineOf(r ?? {})}\n`).join(""));
    expect(rehydrateTrackerText(second.main, second.shards)).toBe(full);
  });

  it("C4b RUNNING MONTH APPENDS: within the run month its own shard grows by whole lines at its end - a changed row of the month and a late row of a sealed month are appended, its old bytes kept as its prefix", () => {
    const rows = fixtureRows();
    const first = compactTrackerExport({ full: textOf(rows), shards: new Map(), now: "2026-11-03T12:00:00Z" });
    if (!first.ok) throw new Error(first.lines.join("\n"));
    const running = first.shards.get("issues-closed-2026-11.jsonl") ?? "";
    // Later the same month: wb-c3 (closed this month) gains a note; wb-c7 closed in 2026-10 (sealed) shows up late; wb-c8 closes.
    const later = rows.map(r => (r.id === "wb-c3" ? { ...r, notes: "wb-c3 notes after the close", updated_at: "2026-11-20T00:00:01Z" } : r));
    later.push(row("wb-c7", "closed", { closed_at: "2026-10-20T10:00:00Z" }), row("wb-c8", "closed", { closed_at: "2026-11-19T09:00:00Z" }));
    const full = textOf(later);
    const second = compactTrackerExport({ full, shards: first.shards, now: "2026-11-20T06:00:00Z" });
    if (!second.ok) throw new Error(second.lines.join("\n"));
    expect(second.shards.get("issues-closed-2026-10.jsonl"), "the sealed month's shard stays byte-unchanged").toBe(first.shards.get("issues-closed-2026-10.jsonl"));
    expect([...second.appended.entries()]).toEqual([["issues-closed-2026-11.jsonl", ["wb-c3", "wb-c7", "wb-c8"]]]);
    expect(second.shards.get("issues-closed-2026-11.jsonl")).toBe(`${running}${[later[4], later[5], later[6]].map(r => `${lineOf(r ?? {})}\n`).join("")}`);
    expect(rehydrateTrackerText(second.main, second.shards)).toBe(full);
  });

  it("C5 GAP MONTH: a close month newer than every existing shard gets its own shard even when it is already past", () => {
    const rows = fixtureRows();
    const first = compactTrackerExport({ full: textOf(rows), shards: new Map(), now: "2026-11-03T12:00:00Z" });
    if (!first.ok) throw new Error(first.lines.join("\n"));
    const gap = [...rows, row("wb-c6", "closed", { closed_at: "2026-12-20T20:00:00Z" })];
    const later = compactTrackerExport({ full: textOf(gap), shards: first.shards, now: "2027-01-05T00:30:00Z" });
    if (!later.ok) throw new Error(later.lines.join("\n"));
    expect([...later.appended.entries()]).toEqual([["issues-closed-2026-12.jsonl", ["wb-c6"]]]);
  });

  it("C5b NO SHARD BEHIND THE NEWEST: a late row of a past month that has no shard but is at or before the newest existing shard's month goes to the run month's shard, and no shard of its month is created", () => {
    const rows = [row("wb-s9", "closed", { closed_at: "2026-09-10T00:00:00Z" }), row("wb-s11", "closed", { closed_at: "2026-11-10T00:00:00Z" })];
    const first = compactTrackerExport({ full: textOf(rows), shards: new Map(), now: "2026-11-20T00:00:00Z" });
    if (!first.ok) throw new Error(first.lines.join("\n"));
    expect([...first.shards.keys()]).toEqual(["issues-closed-2026-09.jsonl", "issues-closed-2026-11.jsonl"]);
    const later = [...rows, row("wb-s10", "closed", { closed_at: "2026-10-10T00:00:00Z" })];
    const second = compactTrackerExport({ full: textOf(later), shards: first.shards, now: "2026-12-05T00:00:00Z" });
    if (!second.ok) throw new Error(second.lines.join("\n"));
    expect([...second.appended.entries()]).toEqual([["issues-closed-2026-12.jsonl", ["wb-s10"]]]);
    expect([...second.shards.keys()]).toEqual(["issues-closed-2026-09.jsonl", "issues-closed-2026-11.jsonl", "issues-closed-2026-12.jsonl"]);
    expect(rehydrateTrackerText(second.main, second.shards)).toBe(textOf(later));
  });

  it("C6 IDEMPOTENT + REOPEN: an unchanged export appends nothing; a reopened bead is a full row again with no new archive line, read as itself though its metadata holds a status key", () => {
    const rows = fixtureRows();
    const first = compactTrackerExport({ full: textOf(rows), shards: new Map(), now: "2026-11-03T12:00:00Z" });
    if (!first.ok) throw new Error(first.lines.join("\n"));
    const again = compactTrackerExport({ full: textOf(rows), shards: first.shards, now: "2026-11-03T13:00:00Z" });
    if (!again.ok) throw new Error(again.lines.join("\n"));
    expect(again.appended.size).toBe(0);
    expect(again.main).toBe(first.main);
    const reopenedRow = row("wb-c3", "open", { metadata: { status: "closed", source: "a status key inside metadata" } });
    const reopened = rows.map(r => (r.id === "wb-c3" ? reopenedRow : r));
    const third = compactTrackerExport({ full: textOf(reopened), shards: first.shards, now: "2026-11-03T14:00:00Z" });
    if (!third.ok) throw new Error(third.lines.join("\n"));
    expect(third.appended.size).toBe(0);
    expect(linesOf(third.main).find(line => parsed(line).id === "wb-c3")).toBe(lineOf(reopenedRow));
    expect(rehydrateTrackerText(third.main, third.shards)).toBe(textOf(reopened));
  });

  it("C7 CEILING: a main export or a shard that would reach the soft ceiling refuses with one typed line per file, naming path and bytes", () => {
    const full = textOf(fixtureRows());
    const open = compactTrackerExport({ full, shards: new Map(), now: "2026-11-03T12:00:00Z" });
    if (!open.ok) throw new Error(open.lines.join("\n"));
    const mainBytes = Buffer.byteLength(open.main);
    const shardBytes = Buffer.byteLength(open.shards.get("issues-closed-2026-11.jsonl") ?? "");
    const atShard = compactTrackerExport({ full, shards: new Map(), now: "2026-11-03T12:00:00Z", ceiling: shardBytes });
    expect(atShard.ok).toBe(false);
    if (atShard.ok) return;
    expect(atShard.code).toBe("oversize");
    const shardOnly = shardBytes > mainBytes ? atShard.lines : atShard.lines.filter(line => line.includes("archive/"));
    expect(shardOnly).toEqual([
      `tracker-export: REFUSED .beads/archive/issues-closed-2026-11.jsonl would be ${shardBytes} bytes, at or over the soft ceiling of ${shardBytes} bytes (FW_EXPORT_SOFT_CEILING); nothing is written`,
    ]);
    const atMain = compactTrackerExport({ full, shards: new Map(), now: "2026-11-03T12:00:00Z", ceiling: mainBytes });
    expect(atMain.ok).toBe(false);
    if (atMain.ok) return;
    expect(atMain.lines.filter(line => line.includes(".beads/issues.jsonl"))).toEqual([
      `tracker-export: REFUSED .beads/issues.jsonl would be ${mainBytes} bytes, at or over the soft ceiling of ${mainBytes} bytes (FW_EXPORT_SOFT_CEILING); nothing is written`,
    ]);
    const under = compactTrackerExport({ full, shards: new Map(), now: "2026-11-03T12:00:00Z", ceiling: Math.max(mainBytes, shardBytes) + 1 });
    expect(under.ok).toBe(true);
  });

  it("C8 MALFORMED: an unparseable line (a line of whitespace alone too), a line that is not a JSON object, a row without a non-empty string id or without a string status, a duplicate id, or a closed row already in stub shape refuses as malformed", () => {
    const good = textOf(fixtureRows());
    const cases: readonly [string, string][] = [
      ["not json", `${good}{"id":\n`],
      ...WHITESPACE_LINES.map(([label, line]) => [label, `${good}${line}\n`] as [string, string]),
      ["null", `${good}null\n`],
      ["an array", `${good}[1]\n`],
      ["a number", `${good}5\n`],
      ["a string", `${good}"text"\n`],
      ["an empty id", `${good}${JSON.stringify({ _type: "issue", id: "", status: "open", title: "x" })}\n`],
      ["no id", `${good}${JSON.stringify({ _type: "issue", status: "open", title: "x" })}\n`],
      ["no status", `${good}${JSON.stringify({ _type: "issue", id: "wb-x", title: "x" })}\n`],
      ["duplicate", `${good}${lineOf(row("wb-o1", "open"))}\n`],
      ["a stub row: a compacted main export passed where bd's full export belongs", `${good}${JSON.stringify({ _type: "issue", id: "wb-s1", title: "stub", status: "closed", updated_at: "2026-11-03T10:00:05Z", closed_at: "2026-11-03T10:00:00Z", close_reason: "r" })}\n`],
    ];
    for (const [label, full] of cases) {
      const result = compactTrackerExport({ full, shards: new Map(), now: "2026-11-03T12:00:00Z" });
      expect(result.ok, label).toBe(false);
      if (!result.ok) expect(result.code, label).toBe("malformed");
    }
  });

  it("C9 REFUSED INPUTS: each form below refuses as malformed with one typed line - a run stamp that is not a UTC stamp (an instant outside the years 0000-9999 too), a shard name that is not a month shard's (a day shard's, a month 00 or 13), a non-empty shard not ending with a newline, a non-empty shard line not parsing whole as a JSON object with a non-empty string id (four open with the export's own line prefix; each of R3's forms, at line 1 and at line 2), the shard the only one, the older or the newer of two or the middle of three; an empty shard, and an empty line between two rows, hold no line, in each of those shards", () => {
    const full = textOf(fixtureRows());
    const shard = `${lineOf(row("wb-c2", "closed", { closed_at: "2026-11-03T08:00:00Z" }))}\n`;
    const stamps = [
      "not-a-stamp",
      "2026",
      "Nov 3 2026",
      "2026-11-03",
      "2026-11-03T12:00:00",
      "2026-11-03T12:00Z",
      "2026-11-03t12:00:00z",
      "2026-11-03 12:00:00Z",
      "2026-11-03T12:00:00+0200",
      "2026-11-03T12:00:00.1234567890Z",
      "2026-02-29T00:00:00Z",
      "2026-11-31T00:00:00Z",
      "2026-13-01T00:00:00Z",
      "2026-00-10T00:00:00Z",
      "2026-11-00T00:00:00Z",
      "2026-11-03T24:00:00Z",
      "2026-11-03T12:60:00Z",
      "2026-11-03T12:00:60Z",
      "2026-11-03T12:00:00+24:00",
      "2026-11-03T12:00:00+01:60",
      "9999-12-31T23:30:00-01:00",
      "0000-01-01T00:30:00+01:00",
    ];
    for (const now of stamps) {
      expect(compactTrackerExport({ full, shards: new Map(), now }), now).toEqual({ ok: false, code: "malformed", lines: [`tracker-export: REFUSED the run stamp "${now}" is not a UTC timestamp; nothing is written`] });
    }
    const empty = compactTrackerExport({ full, shards: new Map([["issues-closed-2026-11.jsonl", ""]]), now: "2026-11-03T12:00:00Z" });
    if (!empty.ok) throw new Error(empty.lines.join("\n"));
    // The empty 2026-11 shard is the newest existing shard, so wb-c1 (closed 2026-10) goes to the run month's shard with the rest.
    expect([...empty.appended.entries()]).toEqual([["issues-closed-2026-11.jsonl", ["wb-c1", "wb-c2", "wb-c3"]]]);
    expect(empty.shards.get("issues-closed-2026-11.jsonl")).toBe([1, 2, 4].map(index => `${lineOf(fixtureRows()[index] ?? {})}\n`).join(""));
    const blankLine = compactTrackerExport({ full, shards: new Map([["issues-closed-2026-11.jsonl", `${shard}\n${lineOf(row("wb-c3", "closed"))}\n`]]), now: "2026-11-03T12:00:00Z" });
    if (!blankLine.ok) throw new Error(blankLine.lines.join("\n"));
    expect([...blankLine.appended.entries()]).toEqual([["issues-closed-2026-11.jsonl", ["wb-c1", "wb-c2", "wb-c3"]]]);
    const cases: readonly [string, { now: string; shards: Map<string, string> }, string][] = [
      ["a day shard's name", { now: "2026-11-03T12:00:00Z", shards: new Map([["issues-closed-2026-11-03.jsonl", shard]]) }, "tracker-export: REFUSED issues-closed-2026-11-03.jsonl is not a month shard name (issues-closed-YYYY-MM.jsonl); nothing is written"],
      ["a file of another name", { now: "2026-11-03T12:00:00Z", shards: new Map([["README.md", "# shards\n"]]) }, "tracker-export: REFUSED README.md is not a month shard name (issues-closed-YYYY-MM.jsonl); nothing is written"],
      ["a shard line that does not parse", { now: "2026-11-03T12:00:00Z", shards: new Map([["issues-closed-2026-11.jsonl", `${shard}{"id":\n`]]) }, "tracker-export: archived issues-closed-2026-11.jsonl line 2 does not parse; nothing is written"],
      ["a shard line that is no object", { now: "2026-11-03T12:00:00Z", shards: new Map([["issues-closed-2026-11.jsonl", `${shard}[1]\n`]]) }, "tracker-export: archived issues-closed-2026-11.jsonl line 2 is not a JSON object; nothing is written"],
      ["a shard line with no id", { now: "2026-11-03T12:00:00Z", shards: new Map([["issues-closed-2026-11.jsonl", `${shard}{"status":"closed"}\n`]]) }, "tracker-export: archived issues-closed-2026-11.jsonl line 2 has no string id; nothing is written"],
      ["a shard line with an empty id", { now: "2026-11-03T12:00:00Z", shards: new Map([["issues-closed-2026-11.jsonl", `${shard}{"id":"","status":"closed"}\n`]]) }, "tracker-export: archived issues-closed-2026-11.jsonl line 2 has no string id; nothing is written"],
      ["W-GP4-02 a line in the export's prefix form cut short", { now: "2026-11-03T12:00:00Z", shards: new Map([["issues-closed-2026-11.jsonl", '{"_type":"issue","id":"wb-zz","title":"t"\n']]) }, "tracker-export: archived issues-closed-2026-11.jsonl line 1 does not parse; nothing is written"],
      ["W-GP4-02b a full line followed by other text", { now: "2026-11-03T12:00:00Z", shards: new Map([["issues-closed-2026-11.jsonl", `${shard.replace(/\n$/, "")} garbage\n`]]) }, "tracker-export: archived issues-closed-2026-11.jsonl line 1 does not parse; nothing is written"],
      ["W-GP4-02c a line in the export's prefix form with an empty id", { now: "2026-11-03T12:00:00Z", shards: new Map([["issues-closed-2026-11.jsonl", '{"_type":"issue","id":"","title":"t","status":"closed"}\n']]) }, "tracker-export: archived issues-closed-2026-11.jsonl line 1 has no string id; nothing is written"],
      ["a line in the export's prefix form whose id holds an invalid escape", { now: "2026-11-03T12:00:00Z", shards: new Map([["issues-closed-2026-11.jsonl", `${shard}{"_type":"issue","id":"wb-\\q","title":"t","status":"closed"}\n`]]) }, "tracker-export: archived issues-closed-2026-11.jsonl line 2 does not parse; nothing is written"],
      ["W-GP4-05 a month 13 shard name", { now: "2026-11-03T12:00:00Z", shards: new Map([["issues-closed-2026-13.jsonl", shard]]) }, "tracker-export: REFUSED issues-closed-2026-13.jsonl is not a month shard name (issues-closed-YYYY-MM.jsonl); nothing is written"],
      ["W-GP4-05 a month 00 shard name", { now: "2026-11-03T12:00:00Z", shards: new Map([["issues-closed-2026-00.jsonl", shard]]) }, "tracker-export: REFUSED issues-closed-2026-00.jsonl is not a month shard name (issues-closed-YYYY-MM.jsonl); nothing is written"],
      ["a shard without a final newline", { now: "2026-11-03T12:00:00Z", shards: new Map([["issues-closed-2026-11.jsonl", shard.replace(/\n$/, "")]]) }, "tracker-export: REFUSED .beads/archive/issues-closed-2026-11.jsonl does not end with a newline (a shard holds whole lines); nothing is written"],
    ];
    for (const [label, input, line] of cases) {
      const result = compactTrackerExport({ full, ...input });
      expect(result, label).toEqual({ ok: false, code: "malformed", lines: [line] });
    }
    // wb-137f refusal #1 (U1 W8-01, U2 W8-02, U5): each shard-line form in each layout, at line 1 and at line 2 between two rows; a
    // non-empty shard not ending with a newline in each layout; an empty line between two rows in each layout holds no line.
    const now = "2026-11-03T12:00:00Z";
    for (const [layout, plant, whole] of SHARD_LAYOUTS) {
      for (const [label, bad, reason] of BAD_SHARD_LINES) {
        for (const [at, text] of PLANT_AT) {
          expect(compactTrackerExport({ full, shards: layoutShards(plant, whole, text(bad)), now }), `${layout}: ${label} at line ${at}`).toEqual({
            ok: false,
            code: "malformed",
            lines: [`tracker-export: archived ${plant} line ${at} ${reason}; nothing is written`],
          });
        }
      }
      expect(compactTrackerExport({ full, shards: layoutShards(plant, whole, PLANT_ROWS.replace(/\n$/, "")), now }), `${layout}: a shard not ending with a newline`).toEqual({
        ok: false,
        code: "malformed",
        lines: [`tracker-export: REFUSED .beads/archive/${plant} does not end with a newline (a shard holds whole lines); nothing is written`],
      });
      const emptyShard = compactTrackerExport({ full, shards: layoutShards(plant, whole, ""), now });
      if (!emptyShard.ok) throw new Error(`${layout}: an empty shard: ${emptyShard.lines.join("\n")}`);
      const appendedToPlant = (emptyShard.appended.get(plant) ?? []).map(id => `${lineOf(fixtureRows().find(r => r.id === id) ?? {})}\n`).join("");
      expect(emptyShard.shards.get(plant), `${layout}: an empty shard holds no line - after the run it holds only what the run appended`).toBe(appendedToPlant);
      const withEmptyLine = compactTrackerExport({ full, shards: layoutShards(plant, whole, PLANT_ROWS_EMPTY_LINE), now });
      const without = compactTrackerExport({ full, shards: layoutShards(plant, whole, PLANT_ROWS), now });
      if (!withEmptyLine.ok) throw new Error(`${layout}: ${withEmptyLine.lines.join("\n")}`);
      if (!without.ok) throw new Error(`${layout}: ${without.lines.join("\n")}`);
      expect([withEmptyLine.main, [...withEmptyLine.appended]], `${layout}: an empty line between two rows holds no line`).toEqual([without.main, [...without.appended]]);
    }
  });

  it("C10 ROUND TRIP REFUSED: a run whose own archive would not read back as its full export refuses - a run month behind an existing shard that holds the row's older line", () => {
    const rows = fixtureRows();
    const older = rows.find(r => r.id === "wb-c2") ?? {};
    // A later month's run already re-appended wb-c2 to 2026-12; a run whose clock reads 2026-11 now files wb-c2's newer line under
    // 2026-11, which the reader (shards in name order, the last line wins) would read past.
    const shards = new Map([["issues-closed-2026-12.jsonl", `${lineOf(older)}\n`]]);
    const newer = rows.map(r => (r.id === "wb-c2" ? { ...r, notes: "a note the run must not lose", updated_at: "2026-11-20T00:00:00Z" } : r));
    const result = compactTrackerExport({ full: textOf(newer), shards, now: "2026-11-20T06:00:00Z" });
    expect(result).toEqual({ ok: false, code: "round-trip", lines: ["tracker-export: REFUSED the compacted export does not rehydrate to the full export it was cut from; nothing is written"] });
    const unchanged = compactTrackerExport({ full: textOf(rows), shards, now: "2026-11-20T06:00:00Z" });
    expect(unchanged.ok, "the same run without the newer line reads back and passes").toBe(true);
  });

  it("C11 OWN KEY ORDER: a closed row whose keys are not in bd's order keeps its own order in its stub", () => {
    const source = row("wb-k1", "closed", { closed_at: "2026-11-03T08:00:00Z", dependencies: [{ issue_id: "wb-k1", depends_on_id: "wb-o1", type: "blocks" }] });
    const reordered: Row = Object.fromEntries(Object.entries(source).reverse());
    const full = textOf([row("wb-o1", "open"), reordered]);
    const result = compactTrackerExport({ full, shards: new Map(), now: "2026-11-03T12:00:00Z" });
    if (!result.ok) throw new Error(result.lines.join("\n"));
    const stub = linesOf(result.main).map(parsed).find(r => r.id === "wb-k1") ?? {};
    expect(Object.keys(stub)).toEqual(Object.keys(reordered).filter(key => EXPECTED_STUB_FIELDS.includes(key)));
    expect(Object.keys(stub)).not.toEqual(EXPECTED_STUB_FIELDS.filter(key => key in reordered));
    expect(rehydrateTrackerText(result.main, result.shards)).toBe(full);
  });

  it("C12 NO FINAL NEWLINE: a full export without a final newline compacts to a main export without one and reads back as the same bytes", () => {
    const full = textOf(fixtureRows()).replace(/\n$/, "");
    const result = compactTrackerExport({ full, shards: new Map(), now: "2026-11-03T12:00:00Z" });
    if (!result.ok) throw new Error(result.lines.join("\n"));
    expect(result.main.endsWith("\n")).toBe(false);
    expect(rehydrateTrackerText(result.main, result.shards)).toBe(full);
  });

  it("C13 FUTURE CLOSE MONTH: a close month after the run's counts as the run's month - the row goes to the run month's shard and no shard of a later month is created", () => {
    const rows = [row("wb-o1", "open"), row("wb-f1", "closed", { closed_at: "2026-12-02T00:00:00Z" })];
    const result = compactTrackerExport({ full: textOf(rows), shards: new Map(), now: "2026-11-20T00:00:00Z" });
    if (!result.ok) throw new Error(result.lines.join("\n"));
    expect([...result.shards.keys()]).toEqual(["issues-closed-2026-11.jsonl"]);
    expect([...result.appended.entries()]).toEqual([["issues-closed-2026-11.jsonl", ["wb-f1"]]]);
    expect(rehydrateTrackerText(result.main, result.shards)).toBe(textOf(rows));
  });

  it("C14 NO UTC CLOSE STAMP: a closed row with no close stamp, a zone-less one, one on a day that does not exist, a non-stamp or a number goes to the run month's shard", () => {
    const missing = row("wb-n1", "closed");
    delete missing.closed_at;
    const rows = [
      row("wb-o1", "open"),
      missing,
      row("wb-n2", "closed", { closed_at: "2026-10-15T10:00:00" }),
      row("wb-n3", "closed", { closed_at: "2026-09-31T10:00:00Z" }),
      row("wb-n4", "closed", { closed_at: "last tuesday" }),
      row("wb-n5", "closed", { closed_at: 1_790_000_000 }),
    ];
    const result = compactTrackerExport({ full: textOf(rows), shards: new Map(), now: "2026-11-20T00:00:00Z" });
    if (!result.ok) throw new Error(result.lines.join("\n"));
    expect([...result.appended.entries()]).toEqual([["issues-closed-2026-11.jsonl", ["wb-n1", "wb-n2", "wb-n3", "wb-n4", "wb-n5"]]]);
    expect(rehydrateTrackerText(result.main, result.shards)).toBe(textOf(rows));
  });

  it("C15 EMPTY LINE: an empty line (no character at all) of the full export stays an empty line of the main export, in its place, and the round trip is byte-equal", () => {
    const rows = fixtureRows();
    const full = `${lineOf(rows[0] ?? {})}\n\n${rows.slice(1).map(lineOf).join("\n")}\n`;
    const result = compactTrackerExport({ full, shards: new Map(), now: "2026-11-03T12:00:00Z" });
    if (!result.ok) throw new Error(result.lines.join("\n"));
    const mainLines = result.main.split("\n");
    expect(mainLines.length).toBe(full.split("\n").length);
    expect(mainLines[1]).toBe("");
    expect(mainLines.filter(line => line === "")).toHaveLength(2);
    expect(rehydrateTrackerText(result.main, result.shards)).toBe(full);
  });

  it("C16 RUN STAMP FORMS: a fraction of 1 to 9 digits, Z and a +HH:MM or -HH:MM offset are UTC stamps, the offset applied before the run's month is taken; a leap day is a calendar day", () => {
    const missing = row("wb-n0", "closed");
    delete missing.closed_at;
    const full = textOf([missing]);
    const cases: readonly [string, string][] = [
      ["2026-11-03T12:00:00.1Z", "issues-closed-2026-11.jsonl"],
      ["2026-11-03T12:00:00.123456789Z", "issues-closed-2026-11.jsonl"],
      ["2026-11-03T12:00:00+00:00", "issues-closed-2026-11.jsonl"],
      ["2026-12-01T01:00:00+02:00", "issues-closed-2026-11.jsonl"],
      ["2026-11-30T23:30:00-01:00", "issues-closed-2026-12.jsonl"],
      ["2026-12-31T23:59:59-00:01", "issues-closed-2027-01.jsonl"],
      ["2028-02-29T12:00:00Z", "issues-closed-2028-02.jsonl"],
    ];
    for (const [now, shard] of cases) {
      const result = compactTrackerExport({ full, shards: new Map(), now });
      if (!result.ok) throw new Error(`${now}: ${result.lines.join("\n")}`);
      expect([...result.shards.keys()], now).toEqual([shard]);
    }
  });
});

describe("wb-294d rehydrating reader: the one read every export reader routes through", () => {
  it("R1 NO ARCHIVE: trackerExportText returns the main export's bytes unchanged (string path or file URL)", () => {
    const dir = scratch("tracker-export-reader-");
    mkdirSync(join(dir, ".beads"));
    const main = join(dir, ".beads", "issues.jsonl");
    const text = textOf(fixtureRows());
    writeFileSync(main, text);
    expect(trackerExportText(main)).toBe(text);
    expect(trackerExportText(pathToFileURL(main))).toBe(text);
  });

  it("R2 ARCHIVE: beside an archive directory the stub lines read as their latest archived lines - the full export, byte for byte", () => {
    const dir = scratch("tracker-export-reader-");
    mkdirSync(join(dir, ".beads", "archive"), { recursive: true });
    const rows = fixtureRows();
    const first = compactTrackerExport({ full: textOf(rows), shards: new Map(), now: "2026-11-03T12:00:00Z" });
    if (!first.ok) throw new Error(first.lines.join("\n"));
    const later = rows.map(r => (r.id === "wb-c1" ? { ...r, notes: "rewritten after close", updated_at: "2026-11-04T00:00:01Z" } : r));
    const second = compactTrackerExport({ full: textOf(later), shards: first.shards, now: "2026-11-04T01:00:00Z" });
    if (!second.ok) throw new Error(second.lines.join("\n"));
    const main = join(dir, ".beads", "issues.jsonl");
    writeFileSync(main, second.main);
    for (const [name, text] of second.shards) writeFileSync(join(dir, ".beads", "archive", name), text);
    expect(readFileSync(main, "utf8")).not.toBe(textOf(later));
    expect(trackerExportText(main)).toBe(textOf(later));
    expect(rehydrateTrackerExport(second.main, main)).toBe(textOf(later));
    expect(rehydrateTrackerExport("", main)).toBe("");
  });

  it("R3 CORRUPT SHARD: every non-empty shard line is parsed whole, in the only shard, the older and the newer of two and the middle of three, at line 1 and at line 2 between two rows - a line that does not parse (cut short, followed by other text, or with an id holding an invalid escape: each with the export's own line prefix and without it; a line that opens like a comment; a line of whitespace alone), is not a JSON object (an array, null, a number) or has no non-empty string id (none, an empty one with and without the prefix, a number) fails the read with one Error naming the shard and the line; an empty line between two rows holds no row and is skipped, in each of those shards", () => {
    const dir = scratch("tracker-export-reader-");
    mkdirSync(join(dir, ".beads", "archive"), { recursive: true });
    const main = join(dir, ".beads", "issues.jsonl");
    writeFileSync(main, textOf(fixtureRows()));
    writeFileSync(join(dir, ".beads", "archive", "issues-closed-2026-11.jsonl"), `${lineOf(row("wb-c2", "closed"))}\n{"id":\n`);
    expect(() => trackerExportText(main)).toThrow("issues-closed-2026-11.jsonl line 2");
    expect(thrownBy(() => trackerExportText(main))).toBe("Error: tracker-export: archived issues-closed-2026-11.jsonl line 2 does not parse");
    const compacted = compactTrackerExport({ full: textOf(fixtureRows()), shards: new Map(), now: "2026-11-03T12:00:00Z" });
    if (!compacted.ok) throw new Error(compacted.lines.join("\n"));
    const held = `${lineOf(row("wb-c3", "closed"))}\n`;
    const plants: readonly (readonly [string, string, string])[] = [
      ["W-GP4-01 the prefix form cut short", '{"_type":"issue","id":"wb-c2","title":"title of wb-c2","status":"closed"\n', "line 1 does not parse"],
      ["W-GP4-01b the prefix form followed by other text", `${held}${lineOf(row("wb-c2", "closed", { closed_at: "2026-11-03T08:00:00Z" }))} garbage\n`, "line 2 does not parse"],
      ["W-GP4-01c the prefix form with an id holding an invalid escape", `${held}{"_type":"issue","id":"wb-\\q","title":"t","status":"closed"}\n`, "line 2 does not parse"],
      ["no prefix, followed by other text", `${held}{"id":"wb-c2","status":"closed"} garbage\n`, "line 2 does not parse"],
      ["no prefix, an id holding an invalid escape", `${held}{"id":"wb-\\q","status":"closed"}\n`, "line 2 does not parse"],
      ["no prefix, an empty id", `${held}{"id":"","status":"closed"}\n`, "line 2 has no string id"],
      ["not a JSON object", `${held}[1]\n`, "line 2 is not a JSON object"],
      ["null", `${held}null\n`, "line 2 is not a JSON object"],
      ["a number", `${held}5\n`, "line 2 is not a JSON object"],
      ["no id", `${held}{"status":"closed"}\n`, "line 2 has no string id"],
      ["the prefix form with an empty id", `${held}{"_type":"issue","id":"","title":"t","status":"closed"}\n`, "line 2 has no string id"],
      ["a number id", `${held}{"_type":"issue","id":7,"status":"closed"}\n`, "line 2 has no string id"],
    ];
    for (const [label, shard, where] of plants) {
      const beside = scratch("tracker-export-reader-");
      mkdirSync(join(beside, ".beads", "archive"), { recursive: true });
      const compactedMain = join(beside, ".beads", "issues.jsonl");
      writeFileSync(compactedMain, compacted.main);
      writeFileSync(join(beside, ".beads", "archive", "issues-closed-2026-11.jsonl"), shard);
      expect(thrownBy(() => trackerExportText(compactedMain)), label).toBe(`Error: tracker-export: archived issues-closed-2026-11.jsonl ${where}`);
    }
    const blank = scratch("tracker-export-reader-");
    mkdirSync(join(blank, ".beads", "archive"), { recursive: true });
    writeFileSync(join(blank, ".beads", "issues.jsonl"), compacted.main);
    for (const [name, text] of compacted.shards) writeFileSync(join(blank, ".beads", "archive", name), name === "issues-closed-2026-11.jsonl" ? text.replace("\n", "\n\n") : text);
    expect(linesOf(readFileSync(join(blank, ".beads", "archive", "issues-closed-2026-11.jsonl"), "utf8"))).toHaveLength(2);
    expect(readFileSync(join(blank, ".beads", "archive", "issues-closed-2026-11.jsonl"), "utf8")).toContain("\n\n");
    expect(trackerExportText(join(blank, ".beads", "issues.jsonl")), "an empty line between two rows is skipped").toBe(textOf(fixtureRows()));
    // wb-137f refusal #1 (U1 W8-01, U2 W8-02): each form in each layout, at line 1 and at line 2 between two rows; in each layout an
    // empty line between two rows reads as the same shard without it.
    for (const [layout, plant, whole] of SHARD_LAYOUTS) {
      const plantIn = (text: string): string => {
        const at = scratch("tracker-export-reader-");
        mkdirSync(join(at, ".beads", "archive"), { recursive: true });
        const atMain = join(at, ".beads", "issues.jsonl");
        writeFileSync(atMain, compacted.main);
        for (const [name, shardText] of layoutShards(plant, whole, text)) writeFileSync(join(at, ".beads", "archive", name), shardText);
        return atMain;
      };
      for (const [label, bad, reason] of BAD_SHARD_LINES) {
        for (const [at, text] of PLANT_AT) {
          expect(thrownBy(() => trackerExportText(plantIn(text(bad)))), `${layout}: ${label} at line ${at}`).toBe(`Error: tracker-export: archived ${plant} line ${at} ${reason}`);
        }
      }
      expect(trackerExportText(plantIn(PLANT_ROWS_EMPTY_LINE)), `${layout}: an empty line between two rows is skipped`).toBe(trackerExportText(plantIn(PLANT_ROWS)));
    }
  });

  it("R4 SHARD FILES ONLY: a file of another name beside the shards (a README, a day shard's name, a month 00 or a month 13 name), and a symlink or a directory of a month shard's name, is never read - beside the shards the read is the full export, with no shard file it is the main export unchanged", () => {
    const dir = scratch("tracker-export-reader-");
    const archive = join(dir, ".beads", "archive");
    mkdirSync(archive, { recursive: true });
    const rows = fixtureRows();
    const result = compactTrackerExport({ full: textOf(rows), shards: new Map(), now: "2026-11-03T12:00:00Z" });
    if (!result.ok) throw new Error(result.lines.join("\n"));
    const main = join(dir, ".beads", "issues.jsonl");
    writeFileSync(main, result.main);
    writeFileSync(join(archive, "README.md"), "# the closed rows' bodies\n");
    writeFileSync(join(archive, "issues-closed-2026-11-03.jsonl"), `${lineOf(row("wb-c2", "closed", { notes: "a day shard's stale body" }))}\n`);
    writeFileSync(join(archive, "issues-closed-2026-13.jsonl"), `${lineOf(row("wb-c2", "closed", { notes: "a month-13 name's stale body" }))}\n`);
    writeFileSync(join(archive, "issues-closed-2026-00.jsonl"), `${lineOf(row("wb-c3", "closed", { notes: "a month-00 name's stale body" }))}\n`);
    const elsewhere = join(dir, "stale-body.jsonl");
    writeFileSync(elsewhere, `${lineOf(row("wb-c2", "closed", { notes: "a symlinked stale body" }))}\n`);
    symlinkSync(elsewhere, join(archive, "issues-closed-2026-09.jsonl"));
    mkdirSync(join(archive, "issues-closed-2026-08.jsonl"));
    expect(trackerExportText(main), "no month shard file beside the main export: its bytes unchanged").toBe(result.main);
    for (const [name, text] of result.shards) writeFileSync(join(archive, name), text);
    expect(trackerExportText(main)).toBe(textOf(rows));
  });

  it("R5 FULL ROWS STAY: beside an archive a closed row that is not a stub reads as itself, never as an archived line of its id", () => {
    const dir = scratch("tracker-export-reader-");
    mkdirSync(join(dir, ".beads", "archive"), { recursive: true });
    const rows = fixtureRows();
    const first = compactTrackerExport({ full: textOf(rows), shards: new Map(), now: "2026-11-03T12:00:00Z" });
    if (!first.ok) throw new Error(first.lines.join("\n"));
    for (const [name, text] of first.shards) writeFileSync(join(dir, ".beads", "archive", name), text);
    // A full export written beside the archive after wb-c2 gained a note: its own line is the current body.
    const later = rows.map(r => (r.id === "wb-c2" ? { ...r, notes: "the note after the archive was cut", updated_at: "2026-11-04T00:00:00Z" } : r));
    const main = join(dir, ".beads", "issues.jsonl");
    writeFileSync(main, textOf(later));
    expect(trackerExportText(main)).toBe(textOf(later));
  });

  it("R6 NOT CLOSED STAYS: beside an archive a stub-shaped row that is not closed reads as itself, never as an archived line of its id - an open one, though a dependency edge of it spells a closed status, and one whose status is \"Closed\" (the status is compared exactly)", () => {
    const dir = scratch("tracker-export-reader-");
    mkdirSync(join(dir, ".beads", "archive"), { recursive: true });
    const rows = fixtureRows();
    const first = compactTrackerExport({ full: textOf(rows), shards: new Map(), now: "2026-11-03T12:00:00Z" });
    if (!first.ok) throw new Error(first.lines.join("\n"));
    for (const [name, text] of first.shards) writeFileSync(join(dir, ".beads", "archive", name), text);
    // wb-c3 reopened, in stub shape (no field beyond STUB_FIELDS), beside the archive that holds its closed body; its edge's own
    // metadata spells "status":"closed", so only the row's own status keeps the archived line out.
    const edge = { issue_id: "wb-c3", depends_on_id: "wb-c1", type: "blocks", metadata: { status: "closed" } };
    const reopened = `${JSON.stringify({ _type: "issue", id: "wb-c3", title: "title of wb-c3", status: "open", updated_at: "2026-11-04T00:00:00Z", dependencies: [edge] })}\n`;
    expect(reopened).toContain('"status":"closed"');
    const main = join(dir, ".beads", "issues.jsonl");
    writeFileSync(main, reopened);
    expect(trackerExportText(main)).toBe(reopened);
    const capital = `${JSON.stringify({ _type: "issue", id: "wb-c2", title: "title of wb-c2", status: "Closed", updated_at: "2026-11-03T10:00:05Z", closed_at: "2026-11-03T08:00:00Z", close_reason: "landing of wb-c2" })}\n`;
    writeFileSync(main, capital);
    expect(trackerExportText(main), 'a status of "Closed" is not "closed"').toBe(capital);
  });

  it("R7 UNARCHIVED STUB: beside an archive a closed stub whose id no shard holds reads as itself, while a stub whose id a shard holds reads as its archived line", () => {
    const dir = scratch("tracker-export-reader-");
    mkdirSync(join(dir, ".beads", "archive"), { recursive: true });
    const open = row("wb-o1", "open");
    const held = row("wb-c1", "closed", { closed_at: "2026-11-02T00:00:00Z" });
    const compacted = compactTrackerExport({ full: textOf([open, held]), shards: new Map(), now: "2026-11-03T12:00:00Z" });
    if (!compacted.ok) throw new Error(compacted.lines.join("\n"));
    const heldStub = linesOf(compacted.main)[1] ?? "";
    const orphan = JSON.stringify({ _type: "issue", id: "wb-x9", title: "title of wb-x9", status: "closed", updated_at: "2026-11-03T10:00:05Z", closed_at: "2026-11-03T10:00:00Z", close_reason: "no shard holds it" });
    for (const [name, text] of compacted.shards) writeFileSync(join(dir, ".beads", "archive", name), text);
    const main = join(dir, ".beads", "issues.jsonl");
    writeFileSync(main, `${lineOf(open)}\n${orphan}\n${heldStub}\n`);
    expect(trackerExportText(main)).toBe(`${lineOf(open)}\n${orphan}\n${lineOf(held)}\n`);
  });

  it("R8 SPACED STUB: a stub line whose JSON is spaced is a STUB line all the same - beside a shard holding its full line it reads as that line", () => {
    const dir = scratch("tracker-export-reader-");
    mkdirSync(join(dir, ".beads", "archive"), { recursive: true });
    const held = row("wb-c2", "closed", { closed_at: "2026-11-03T08:00:00Z" });
    const compacted = compactTrackerExport({ full: textOf([held]), shards: new Map(), now: "2026-11-03T12:00:00Z" });
    if (!compacted.ok) throw new Error(compacted.lines.join("\n"));
    for (const [name, text] of compacted.shards) writeFileSync(join(dir, ".beads", "archive", name), text);
    const stub = parsed(linesOf(compacted.main)[0] ?? "{}");
    const spaced = `{${Object.entries(stub).map(([key, value]) => `${JSON.stringify(key)}: ${JSON.stringify(value)}`).join(", ")}}`;
    expect(spaced).toContain('"status": "closed"');
    const main = join(dir, ".beads", "issues.jsonl");
    writeFileSync(main, `${spaced}\n`);
    expect(trackerExportText(main)).toBe(`${lineOf(held)}\n`);
  });

  it("R9 ARCHIVE NOT A DIRECTORY: a file named archive beside the main export holds no shard - the read is the main export unchanged", () => {
    const dir = scratch("tracker-export-reader-");
    mkdirSync(join(dir, ".beads"));
    const compacted = compactTrackerExport({ full: textOf(fixtureRows()), shards: new Map(), now: "2026-11-03T12:00:00Z" });
    if (!compacted.ok) throw new Error(compacted.lines.join("\n"));
    writeFileSync(join(dir, ".beads", "archive"), [...compacted.shards.values()].join(""));
    const main = join(dir, ".beads", "issues.jsonl");
    writeFileSync(main, compacted.main);
    expect(trackerExportText(main)).toBe(compacted.main);
    expect(rehydrateTrackerExport(compacted.main, main)).toBe(compacted.main);
  });

  it("R10 READ MEMO: a process reads the shards again when a shard's size or modification time changes or a shard is added; a rewrite that keeps names, sizes and modification times reads as the earlier content; another archive directory, whose shards keep the names, sizes and modification times of shards read before, is read on its own", () => {
    const dir = scratch("tracker-export-reader-");
    const archive = join(dir, ".beads", "archive");
    mkdirSync(archive, { recursive: true });
    const rows = fixtureRows();
    const compacted = compactTrackerExport({ full: textOf(rows), shards: new Map(), now: "2026-11-03T12:00:00Z" });
    if (!compacted.ok) throw new Error(compacted.lines.join("\n"));
    const main = join(dir, ".beads", "issues.jsonl");
    writeFileSync(main, compacted.main);
    const shard = join(archive, "issues-closed-2026-11.jsonl");
    const pinned = 1_790_000_000;
    for (const [name, text] of compacted.shards) {
      writeFileSync(join(archive, name), text);
      utimesSync(join(archive, name), pinned, pinned);
    }
    expect(trackerExportText(main)).toBe(textOf(rows));
    const original = compacted.shards.get("issues-closed-2026-11.jsonl") ?? "";
    const sameSize = original.replace("notes body of wb-c3", "NOTES BODY OF WB-C3");
    expect(sameSize).not.toBe(original);
    expect(Buffer.byteLength(sameSize)).toBe(Buffer.byteLength(original));
    const sameSizeRows = rows.map(r => (r.id === "wb-c3" ? { ...r, notes: "NOTES BODY OF WB-C3" } : r));
    writeFileSync(shard, sameSize);
    utimesSync(shard, pinned, pinned);
    expect(trackerExportText(main), "names, sizes and modification times kept: the earlier content").toBe(textOf(rows));
    utimesSync(shard, pinned + 60, pinned + 60);
    expect(trackerExportText(main), "a modification time changed: read again").toBe(textOf(sameSizeRows));
    const longer = original.replace("notes body of wb-c3", "notes body of wb-c3, longer");
    writeFileSync(shard, longer);
    utimesSync(shard, pinned + 60, pinned + 60);
    expect(trackerExportText(main), "a size changed: read again").toBe(textOf(rows.map(r => (r.id === "wb-c3" ? { ...r, notes: "notes body of wb-c3, longer" } : r))));
    const added = row("wb-c1", "closed", { closed_at: "2026-10-31T23:59:59Z", updated_at: "2026-11-01T00:00:10Z", notes: "a later body from a new shard" });
    writeFileSync(join(archive, "issues-closed-2026-12.jsonl"), `${lineOf(added)}\n`);
    utimesSync(join(archive, "issues-closed-2026-12.jsonl"), pinned, pinned);
    expect(trackerExportText(main), "a shard added: read again").toBe(textOf(rows.map(r => (r.id === "wb-c3" ? { ...r, notes: "notes body of wb-c3, longer" } : r.id === "wb-c1" ? added : r))));
    // wb-137f refusal #1 F5 (W8-06): two archive directories whose shards share names, sizes and modification times, read one after the other.
    const [first = "", second = ""] = [0, 1].map(() => {
      const at = scratch("tracker-export-reader-");
      mkdirSync(join(at, ".beads", "archive"), { recursive: true });
      writeFileSync(join(at, ".beads", "issues.jsonl"), compacted.main);
      return at;
    });
    for (const [name, text] of compacted.shards) {
      writeFileSync(join(first, ".beads", "archive", name), text);
      writeFileSync(join(second, ".beads", "archive", name), name === "issues-closed-2026-11.jsonl" ? sameSize : text);
      for (const at of [first, second]) utimesSync(join(at, ".beads", "archive", name), pinned, pinned);
    }
    expect(trackerExportText(join(first, ".beads", "issues.jsonl")), "W8-06: the first archive directory").toBe(textOf(rows));
    expect(trackerExportText(join(second, ".beads", "issues.jsonl")), "W8-06: another archive directory with the same shard names, sizes and modification times").toBe(textOf(sameSizeRows));
  });
});

describe("wb-294d compaction ritual at the CLI: writes, receipt, refusals", () => {
  function beadsDir(): { readonly dir: string; readonly beads: string; readonly full: string } {
    const dir = scratch("tracker-export-cli-");
    const beads = join(dir, ".beads");
    mkdirSync(beads);
    const full = join(dir, "full.jsonl");
    writeFileSync(full, textOf(fixtureRows()));
    return { dir, beads, full };
  }

  it("K1 compact writes the main export and the month shards, prints one JSON receipt line, and a re-run with no change appends nothing", () => {
    const { beads, full } = beadsDir();
    const run = cli(["compact", "--full", full, "--beads", beads, "--now", "2026-11-03T12:00:00Z"]);
    expect(run.stderr).toBe("");
    expect(run.status).toBe(0);
    const receipt = JSON.parse(String(run.stdout)) as Row;
    expect(receipt).toMatchObject({ verb: "compact", rows: 5, stubs: 3, appended: { "issues-closed-2026-10.jsonl": 1, "issues-closed-2026-11.jsonl": 2 }, shards: 2, sealedUnchanged: true, roundTrip: true });
    expect(readdirSync(join(beads, "archive")).sort()).toEqual(["issues-closed-2026-10.jsonl", "issues-closed-2026-11.jsonl"]);
    const mainAfter = readFileSync(join(beads, "issues.jsonl"), "utf8");
    expect(linesOf(mainAfter).filter(line => parsed(line).status === "closed").every(line => !("notes" in parsed(line)))).toBe(true);
    const again = cli(["compact", "--full", full, "--beads", beads, "--now", "2026-11-03T13:00:00Z"]);
    expect(again.status).toBe(0);
    expect((JSON.parse(String(again.stdout)) as Row).appended).toEqual({});
    expect(readFileSync(join(beads, "issues.jsonl"), "utf8")).toBe(mainAfter);
  });

  it("K2 rehydrate prints the full export from the main export and its shards, byte for byte: with a final newline when the export ends with one, and without one when it does not", () => {
    const { beads, full } = beadsDir();
    expect(cli(["compact", "--full", full, "--beads", beads, "--now", "2026-11-03T12:00:00Z"]).status).toBe(0);
    const run = cli(["rehydrate", "--beads", beads]);
    expect(run.status).toBe(0);
    expect(run.stdout).toBe(readFileSync(full, "utf8"));
    const bare = beadsDir();
    writeFileSync(bare.full, textOf(fixtureRows()).replace(/\n$/, ""));
    expect(cli(["compact", "--full", bare.full, "--beads", bare.beads, "--now", "2026-11-03T12:00:00Z"]).status).toBe(0);
    const unterminated = cli(["rehydrate", "--beads", bare.beads]);
    expect(unterminated.status).toBe(0);
    expect(unterminated.stdout).toBe(readFileSync(bare.full, "utf8"));
    expect(String(unterminated.stdout).endsWith("\n")).toBe(false);
  });

  it("K3 at the soft ceiling compact exits 2 with the typed line and writes nothing; a malformed export, a month shard holding a line in the export's own line prefix form that does not parse, and each of the four prefix forms (cut short, followed by other text, an id holding an invalid escape, an empty id) in the older of two month shards, exit 3 with the typed line naming the shard and write nothing", () => {
    const { beads, full } = beadsDir();
    const refused = cli(["compact", "--full", full, "--beads", beads, "--now", "2026-11-03T12:00:00Z"], { FW_EXPORT_SOFT_CEILING: "64" });
    expect(refused.status).toBe(2);
    expect(String(refused.stderr)).toMatch(/^tracker-export: REFUSED \S+issues\.jsonl would be \d+ bytes, at or over the soft ceiling of 64 bytes \(FW_EXPORT_SOFT_CEILING\); nothing is written$/m);
    expect(existsSync(join(beads, "issues.jsonl"))).toBe(false);
    expect(existsSync(join(beads, "archive"))).toBe(false);
    writeFileSync(full, "{not json\n");
    const malformed = cli(["compact", "--full", full, "--beads", beads, "--now", "2026-11-03T12:00:00Z"]);
    expect(malformed.status).toBe(3);
    expect(existsSync(join(beads, "issues.jsonl"))).toBe(false);
    expect(malformed.stderr).toBe("tracker-export: REFUSED the full export: line 1 is not JSON; nothing is written\n");
    expect(existsSync(join(beads, "archive"))).toBe(false);
    // W-GP4-03: a month shard holding a line in the export's own line prefix form, cut short.
    writeFileSync(full, textOf(fixtureRows()));
    mkdirSync(join(beads, "archive"));
    const shard = join(beads, "archive", "issues-closed-2026-11.jsonl");
    const cutShort = '{"_type":"issue","id":"wb-zz","title":"t"\n';
    writeFileSync(shard, cutShort);
    const corrupt = cli(["compact", "--full", full, "--beads", beads, "--now", "2026-11-03T12:00:00Z"]);
    expect(corrupt.status).toBe(3);
    expect(corrupt.stdout).toBe("");
    expect(corrupt.stderr).toBe("tracker-export: archived issues-closed-2026-11.jsonl line 1 does not parse; nothing is written\n");
    expect(readdirSync(beads)).toEqual(["archive"]);
    expect(readdirSync(join(beads, "archive"))).toEqual(["issues-closed-2026-11.jsonl"]);
    expect(readFileSync(shard, "utf8")).toBe(cutShort);
    // wb-137f refusal #1 (U1, W8-01): each prefix form in the OLDER of two month shards, beside a whole running-month shard.
    for (const [label, bad, reason] of PREFIX_FORMS) {
      const state = beadsDir();
      const archive = join(state.beads, "archive");
      mkdirSync(archive);
      const older = `${bad}\n`;
      const newer = WHOLE_SHARDS.get("issues-closed-2026-11.jsonl") ?? "";
      writeFileSync(join(archive, "issues-closed-2026-10.jsonl"), older);
      writeFileSync(join(archive, "issues-closed-2026-11.jsonl"), newer);
      const run = cli(["compact", "--full", state.full, "--beads", state.beads, "--now", "2026-11-03T12:00:00Z"]);
      expect(run.status, label).toBe(3);
      expect(run.stdout, label).toBe("");
      expect(run.stderr, label).toBe(`tracker-export: archived issues-closed-2026-10.jsonl line 1 ${reason}; nothing is written\n`);
      expect(readdirSync(state.beads), label).toEqual(["archive"]);
      expect(
        readdirSync(archive)
          .sort()
          .map(name => [name, readFileSync(join(archive, name), "utf8")]),
        label,
      ).toEqual([
        ["issues-closed-2026-10.jsonl", older],
        ["issues-closed-2026-11.jsonl", newer],
      ]);
    }
  });

  it("K4 a --now that is not a UTC timestamp exits 3 with the typed line and writes nothing", () => {
    const { beads, full } = beadsDir();
    const run = cli(["compact", "--full", full, "--beads", beads, "--now", "not-a-stamp"]);
    expect(run.status).toBe(3);
    expect(String(run.stderr)).toBe('tracker-export: REFUSED the run stamp "not-a-stamp" is not a UTC timestamp; nothing is written\n');
    expect(run.stdout).toBe("");
    expect(readdirSync(beads)).toEqual([]);
  });

  it("K5 compact reads only the archive's month shard files: a file of another name (a README, a month 13 name), a directory of a shard's name, and a symlink of a shard's name to a file outside the archive, in it are neither inputs nor touched", () => {
    const { beads, full } = beadsDir();
    mkdirSync(join(beads, "archive"));
    writeFileSync(join(beads, "archive", "README.md"), "# the closed rows' bodies\n");
    mkdirSync(join(beads, "archive", "issues-closed-2026-09.jsonl"));
    const run = cli(["compact", "--full", full, "--beads", beads, "--now", "2026-11-03T12:00:00Z"]);
    expect(run.stderr).toBe("");
    expect(run.status).toBe(0);
    expect(readdirSync(join(beads, "archive")).sort()).toEqual(["README.md", "issues-closed-2026-09.jsonl", "issues-closed-2026-10.jsonl", "issues-closed-2026-11.jsonl"]);
    expect(readdirSync(join(beads, "archive", "issues-closed-2026-09.jsonl"))).toEqual([]);
    expect(readFileSync(join(beads, "archive", "README.md"), "utf8")).toBe("# the closed rows' bodies\n");
    expect(cli(["rehydrate", "--beads", beads]).stdout).toBe(readFileSync(full, "utf8"));
    const linked = beadsDir();
    const archive = join(linked.beads, "archive");
    mkdirSync(archive);
    const elsewhere = join(linked.dir, "elsewhere.jsonl");
    const stale = `${lineOf(row("wb-c2", "closed", { notes: "a stale body outside the archive" }))}\n`;
    writeFileSync(elsewhere, stale);
    symlinkSync(elsewhere, join(archive, "issues-closed-2026-09.jsonl"));
    const thirteen = `${lineOf(row("wb-c2", "closed", { notes: "a month-13 name's stale body" }))}\n`;
    writeFileSync(join(archive, "issues-closed-2026-13.jsonl"), thirteen);
    const linkedRun = cli(["compact", "--full", linked.full, "--beads", linked.beads, "--now", "2026-11-03T12:00:00Z"]);
    expect(linkedRun.stderr).toBe("");
    expect(linkedRun.status).toBe(0);
    const receipt = JSON.parse(String(linkedRun.stdout)) as Row;
    expect([receipt.shards, receipt.appended]).toEqual([2, { "issues-closed-2026-10.jsonl": 1, "issues-closed-2026-11.jsonl": 2 }]);
    expect(readdirSync(archive).sort()).toEqual(["issues-closed-2026-09.jsonl", "issues-closed-2026-10.jsonl", "issues-closed-2026-11.jsonl", "issues-closed-2026-13.jsonl"]);
    expect(lstatSync(join(archive, "issues-closed-2026-09.jsonl")).isSymbolicLink()).toBe(true);
    expect(readFileSync(elsewhere, "utf8")).toBe(stale);
    expect(readFileSync(join(archive, "issues-closed-2026-13.jsonl"), "utf8")).toBe(thirteen);
    expect(cli(["rehydrate", "--beads", linked.beads]).stdout).toBe(readFileSync(linked.full, "utf8"));
  });

  it("K6 USAGE: compact and rehydrate refuse a missing, repeated or unknown option, an option whose value is missing or starts with a dash, and a positional argument with exit 3 and their usage line, printing nothing on stdout and writing nothing", () => {
    const { beads, full } = beadsDir();
    const stamp = "2026-11-03T12:00:00Z";
    const compactUsage = "tracker-export: usage: compact --full <full export file> --beads <.beads dir> [--now <UTC stamp>]; nothing is written\n";
    const compactCases: readonly (readonly string[])[] = [
      [],
      ["--beads", beads],
      ["--full", full],
      ["--full", full, "--beads", beads, "extra"],
      ["--full", full, "--full", full, "--beads", beads],
      ["--full", full, "--beads", beads, "--beads", beads],
      ["--full", full, "--beads", beads, "--now", stamp, "--now", stamp],
      ["--full", full, "--beads", beads, "--force"],
      ["--full", full, "--beads"],
      ["--full", "--beads", beads],
      ["--full", full, "--beads", beads, "--now", "-01:00"],
    ];
    for (const args of compactCases) {
      const run = cli(["compact", ...args]);
      expect(run.status, args.join(" ")).toBe(3);
      expect(run.stderr, args.join(" ")).toBe(compactUsage);
      expect(run.stdout).toBe("");
      expect(readdirSync(beads)).toEqual([]);
    }
    const rehydrateUsage = "tracker-export: usage: rehydrate --beads <.beads dir>\n";
    const rehydrateCases: readonly (readonly string[])[] = [[], [beads], ["--beads"], ["--beads", beads, "--beads", beads], ["--beads", beads, "extra"], ["--full", full]];
    for (const args of rehydrateCases) {
      const run = cli(["rehydrate", ...args]);
      expect(run.status, args.join(" ")).toBe(3);
      expect(run.stderr, args.join(" ")).toBe(rehydrateUsage);
      expect(run.stdout).toBe("");
    }
  });

  it("K7 rehydrate exits 3 with the typed line, printing nothing on stdout, when the read throws: a month shard holding a line that does not parse (one with no prefix, and two in the export's own line prefix form: cut short, and an id holding an invalid escape - each appended to the newer of the two shards a compaction wrote), each of the four prefix forms (cut short, followed by other text, an id holding an invalid escape, an empty id) appended to the older of the two, and a missing main export", () => {
    const { beads, full } = beadsDir();
    expect(cli(["compact", "--full", full, "--beads", beads, "--now", "2026-11-03T12:00:00Z"]).status).toBe(0);
    const shard = join(beads, "archive", "issues-closed-2026-11.jsonl");
    const lines = linesOf(readFileSync(shard, "utf8")).length;
    writeFileSync(shard, `${readFileSync(shard, "utf8")}{"id":\n`);
    const corrupt = cli(["rehydrate", "--beads", beads]);
    expect(corrupt.status).toBe(3);
    expect(corrupt.stdout).toBe("");
    expect(corrupt.stderr).toBe(`tracker-export: could not rehydrate (tracker-export: archived issues-closed-2026-11.jsonl line ${lines + 1} does not parse)\n`);
    const prefixed: readonly (readonly [string, string])[] = [
      ["W-GP4-03b the prefix form cut short", '{"_type":"issue","id":"wb-zz","title":"t"'],
      ["the prefix form with an id holding an invalid escape", '{"_type":"issue","id":"wb-\\q","title":"t","status":"closed"}'],
    ];
    for (const [label, bad] of prefixed) {
      const state = beadsDir();
      expect(cli(["compact", "--full", state.full, "--beads", state.beads, "--now", "2026-11-03T12:00:00Z"]).status, label).toBe(0);
      const at = join(state.beads, "archive", "issues-closed-2026-11.jsonl");
      const count = linesOf(readFileSync(at, "utf8")).length;
      writeFileSync(at, `${readFileSync(at, "utf8")}${bad}\n`);
      const read = cli(["rehydrate", "--beads", state.beads]);
      expect(read.status, label).toBe(3);
      expect(read.stdout, label).toBe("");
      expect(read.stderr, label).toBe(`tracker-export: could not rehydrate (tracker-export: archived issues-closed-2026-11.jsonl line ${count + 1} does not parse)\n`);
    }
    // wb-137f refusal #1 (U1): each prefix form appended to the OLDER of the two month shards a compaction wrote.
    for (const [label, bad, reason] of PREFIX_FORMS) {
      const state = beadsDir();
      expect(cli(["compact", "--full", state.full, "--beads", state.beads, "--now", "2026-11-03T12:00:00Z"]).status, label).toBe(0);
      expect(readdirSync(join(state.beads, "archive")).sort(), label).toEqual(["issues-closed-2026-10.jsonl", "issues-closed-2026-11.jsonl"]);
      const at = join(state.beads, "archive", "issues-closed-2026-10.jsonl");
      const count = linesOf(readFileSync(at, "utf8")).length;
      writeFileSync(at, `${readFileSync(at, "utf8")}${bad}\n`);
      const read = cli(["rehydrate", "--beads", state.beads]);
      expect(read.status, label).toBe(3);
      expect(read.stdout, label).toBe("");
      expect(read.stderr, label).toBe(`tracker-export: could not rehydrate (tracker-export: archived issues-closed-2026-10.jsonl line ${count + 1} ${reason})\n`);
    }
    const empty = beadsDir();
    const missing = cli(["rehydrate", "--beads", empty.beads]);
    expect(missing.status).toBe(3);
    expect(missing.stdout).toBe("");
    expect(String(missing.stderr)).toMatch(/^tracker-export: could not rehydrate \(ENOENT[^\n]*\)\n$/);
  });

  it("K8 compact with an FW_EXPORT_SOFT_CEILING that is not a positive whole number exits 3 with the typed line and writes nothing", () => {
    const { beads, full } = beadsDir();
    for (const bad of ["0", "ten", "-5", "1e3", "012"]) {
      const run = cli(["compact", "--full", full, "--beads", beads, "--now", "2026-11-03T12:00:00Z"], { FW_EXPORT_SOFT_CEILING: bad });
      expect(run.status, bad).toBe(3);
      expect(run.stderr).toBe(`tracker-export: FW_EXPORT_SOFT_CEILING must be a positive whole number of bytes (got "${bad}"); nothing is written\n`);
      expect(run.stdout).toBe("");
      expect(readdirSync(beads)).toEqual([]);
    }
  });

  it("K9 compact exits 3 with the typed line and writes nothing when it cannot read its full export: a missing file, and a directory", () => {
    const { dir, beads } = beadsDir();
    for (const input of [join(dir, "absent.jsonl"), dir]) {
      const run = cli(["compact", "--full", input, "--beads", beads, "--now", "2026-11-03T12:00:00Z"]);
      expect(run.status, input).toBe(3);
      expect(String(run.stderr)).toMatch(/^tracker-export: could not read the inputs \([^\n]+\); nothing is written\n$/);
      expect(run.stdout).toBe("");
      expect(readdirSync(beads)).toEqual([]);
    }
  });

  it("K10 compact exits 3 with the round-trip line and writes nothing when its own archive would not read back as the full export", () => {
    const { beads, full } = beadsDir();
    const rows = fixtureRows();
    const older = rows.find(r => r.id === "wb-c2") ?? {};
    mkdirSync(join(beads, "archive"));
    const shard = join(beads, "archive", "issues-closed-2026-12.jsonl");
    writeFileSync(shard, `${lineOf(older)}\n`);
    writeFileSync(full, textOf(rows.map(r => (r.id === "wb-c2" ? { ...r, notes: "a note the run must not lose", updated_at: "2026-11-20T00:00:00Z" } : r))));
    const run = cli(["compact", "--full", full, "--beads", beads, "--now", "2026-11-20T06:00:00Z"]);
    expect(run.status).toBe(3);
    expect(run.stderr).toBe("tracker-export: REFUSED the compacted export does not rehydrate to the full export it was cut from; nothing is written\n");
    expect(run.stdout).toBe("");
    expect(readdirSync(beads)).toEqual(["archive"]);
    expect(readdirSync(join(beads, "archive"))).toEqual(["issues-closed-2026-12.jsonl"]);
    expect(readFileSync(shard, "utf8")).toBe(`${lineOf(older)}\n`);
  });

  it("K11 without --now the run stamp is the current time: the receipt's now lies between the clock read before and after the run, and a row with no close stamp goes to the shard of that UTC month", () => {
    const { beads, full } = beadsDir();
    const missing = row("wb-n0", "closed");
    delete missing.closed_at;
    writeFileSync(full, textOf([row("wb-o1", "open"), missing]));
    const before = Date.now();
    const run = cli(["compact", "--full", full, "--beads", beads]);
    const after = Date.now();
    expect(run.stderr).toBe("");
    expect(run.status).toBe(0);
    const now = String((JSON.parse(String(run.stdout)) as Row).now);
    expect(Date.parse(now)).toBeGreaterThanOrEqual(before);
    expect(Date.parse(now)).toBeLessThanOrEqual(after);
    expect(readdirSync(join(beads, "archive"))).toEqual([`issues-closed-${now.slice(0, 7)}.jsonl`]);
    expect([new Date(before).toISOString().slice(0, 7), new Date(after).toISOString().slice(0, 7)]).toContain(now.slice(0, 7));
  });

  it("K12 --now is judged as a UTC stamp in any process time zone: a stamp with no zone, a date and a year exit 3 writing nothing, and a stamp with a zone names its UTC month under TZ=UTC and TZ=Pacific/Kiritimati", () => {
    for (const zone of ["UTC", "Pacific/Kiritimati"]) {
      const { beads, full } = beadsDir();
      for (const bad of ["2026", "2026-11-03", "2026-11-30T15:00:00"]) {
        const run = cli(["compact", "--full", full, "--beads", beads, "--now", bad], { TZ: zone });
        expect(run.status, `${zone} ${bad}`).toBe(3);
        expect(run.stderr).toBe(`tracker-export: REFUSED the run stamp "${bad}" is not a UTC timestamp; nothing is written\n`);
        expect(readdirSync(beads)).toEqual([]);
      }
      const missing = row("wb-n0", "closed");
      delete missing.closed_at;
      writeFileSync(full, textOf([missing]));
      const run = cli(["compact", "--full", full, "--beads", beads, "--now", "2026-11-30T15:00:00Z"], { TZ: zone });
      expect(run.status, zone).toBe(0);
      expect(readdirSync(join(beads, "archive")), zone).toEqual(["issues-closed-2026-11.jsonl"]);
    }
  });

  it("K13 WRITES: compact writes the main export and each shard it appends to, each whole by a rename over its path - so each is a new file and no temporary file stays in the .beads directory - and never writes a shard it does not append to: a past month's shard beside an append, and both shards of a run that appends nothing, keep their inode, bytes and modification time", () => {
    const { beads, full } = beadsDir();
    expect(cli(["compact", "--full", full, "--beads", beads, "--now", "2026-11-03T12:00:00Z"]).status).toBe(0);
    const past = join(beads, "archive", "issues-closed-2026-10.jsonl");
    const running = join(beads, "archive", "issues-closed-2026-11.jsonl");
    const main = join(beads, "issues.jsonl");
    const pinned = 1_790_000_000;
    for (const path of [past, running, main]) utimesSync(path, pinned, pinned);
    const pastBefore = lstatSync(past);
    const pastBytes = readFileSync(past, "utf8");
    const runningInode = lstatSync(running).ino;
    const mainInode = lstatSync(main).ino;
    // wb-c2 gains a note after the first run: the second run appends its new line to the running month's shard only.
    writeFileSync(full, textOf(fixtureRows().map(r => (r.id === "wb-c2" ? { ...r, notes: "a note after the first run", updated_at: "2026-11-04T00:00:00Z" } : r))));
    const run = cli(["compact", "--full", full, "--beads", beads, "--now", "2026-11-04T12:00:00Z"]);
    expect(run.stderr).toBe("");
    expect(run.status).toBe(0);
    expect((JSON.parse(String(run.stdout)) as Row).appended).toEqual({ "issues-closed-2026-11.jsonl": 1 });
    const pastAfter = lstatSync(past);
    expect([pastAfter.ino, pastAfter.mtimeMs, readFileSync(past, "utf8")]).toEqual([pastBefore.ino, pastBefore.mtimeMs, pastBytes]);
    expect(lstatSync(running).ino).not.toBe(runningInode);
    expect(lstatSync(main).ino).not.toBe(mainInode);
    expect(readdirSync(beads).sort()).toEqual(["archive", "issues.jsonl"]);
    expect(cli(["rehydrate", "--beads", beads]).stdout).toBe(readFileSync(full, "utf8"));
    // A third run with nothing changed appends nothing, so it writes no shard: both keep their inode, bytes and modification time.
    for (const path of [past, running]) utimesSync(path, pinned, pinned);
    const shardsBefore = [past, running].map(path => [lstatSync(path).ino, lstatSync(path).mtimeMs, readFileSync(path, "utf8")]);
    const idle = cli(["compact", "--full", full, "--beads", beads, "--now", "2026-11-04T13:00:00Z"]);
    expect(idle.status).toBe(0);
    expect((JSON.parse(String(idle.stdout)) as Row).appended).toEqual({});
    expect([past, running].map(path => [lstatSync(path).ino, lstatSync(path).mtimeMs, readFileSync(path, "utf8")])).toEqual(shardsBefore);
  });

  it("K14 NOT A FILE: when a path compact would write - a shard it appends to, or the main export - exists and is not a regular file (a directory, a symlink to a file, a symlink to a directory, a dangling symlink, or a FIFO), compact exits 3 with one typed line per such path, shards in name order and then the main export, printing nothing on stdout and writing nothing", () => {
    const variants: readonly (readonly [string, (beads: string, dir: string) => string[]])[] = [
      [
        "W-GP4-04 a directory at the running month's shard name",
        beads => {
          const at = join(beads, "archive", "issues-closed-2026-11.jsonl");
          mkdirSync(at, { recursive: true });
          return [at];
        },
      ],
      [
        "a symlink to a file at the running month's shard name",
        (beads, dir) => {
          mkdirSync(join(beads, "archive"));
          const at = join(beads, "archive", "issues-closed-2026-11.jsonl");
          writeFileSync(join(dir, "target.jsonl"), "");
          symlinkSync(join(dir, "target.jsonl"), at);
          return [at];
        },
      ],
      [
        "directories at both shard names it appends to",
        beads => {
          const at = [join(beads, "archive", "issues-closed-2026-10.jsonl"), join(beads, "archive", "issues-closed-2026-11.jsonl")];
          for (const path of at) mkdirSync(path, { recursive: true });
          return at;
        },
      ],
      [
        "a directory at the main export",
        beads => {
          const at = join(beads, "issues.jsonl");
          mkdirSync(at);
          return [at];
        },
      ],
      [
        "a symlink to a file at the main export",
        (beads, dir) => {
          const at = join(beads, "issues.jsonl");
          writeFileSync(join(dir, "target.jsonl"), "kept\n");
          symlinkSync(join(dir, "target.jsonl"), at);
          return [at];
        },
      ],
      [
        "a directory at a shard name and at the main export",
        beads => {
          const at = [join(beads, "archive", "issues-closed-2026-10.jsonl"), join(beads, "issues.jsonl")];
          for (const path of at) mkdirSync(path, { recursive: true });
          return at;
        },
      ],
      [
        "W8-03 a FIFO at the main export",
        beads => {
          const at = join(beads, "issues.jsonl");
          expect(spawnSync("mkfifo", [at]).status).toBe(0);
          return [at];
        },
      ],
      [
        "a FIFO at the running month's shard name",
        beads => {
          mkdirSync(join(beads, "archive"));
          const at = join(beads, "archive", "issues-closed-2026-11.jsonl");
          expect(spawnSync("mkfifo", [at]).status).toBe(0);
          return [at];
        },
      ],
      [
        "a dangling symlink at the main export",
        (beads, dir) => {
          const at = join(beads, "issues.jsonl");
          symlinkSync(join(dir, "no-such-target.jsonl"), at);
          return [at];
        },
      ],
      [
        "a symlink to a directory at the past month's shard name",
        (beads, dir) => {
          mkdirSync(join(beads, "archive"));
          mkdirSync(join(dir, "target-dir"));
          const at = join(beads, "archive", "issues-closed-2026-10.jsonl");
          symlinkSync(join(dir, "target-dir"), at);
          return [at];
        },
      ],
    ];
    for (const [label, plant] of variants) {
      const { dir, beads, full } = beadsDir();
      const blocked = plant(beads, dir);
      const before = snapshot(dir);
      const run = cli(["compact", "--full", full, "--beads", beads, "--now", "2026-11-03T12:00:00Z"]);
      expect(run.status, label).toBe(3);
      expect(run.stdout, label).toBe("");
      expect(run.stderr, label).toBe(blocked.map(path => `tracker-export: REFUSED ${path} is not a regular file; nothing is written\n`).join(""));
      expect(snapshot(dir), label).toEqual(before);
    }
  });
});

describe("wb-294d round trip over the tracked export (owner element 3, read through the rehydrating reader)", () => {
  it("T1 the tracked export compacts under the ceiling and rehydrates byte-equal; non-closed rows byte-equal; every closed row recoverable by id; every edge into a closed bead resolves to its stub", () => {
    const full = trackerExportText(TRACKED_EXPORT);
    const result = compactTrackerExport({ full, shards: new Map(), now: new Date().toISOString() });
    if (!result.ok) throw new Error(result.lines.join("\n"));
    expect(rehydrateTrackerText(result.main, result.shards)).toBe(full);
    const fullLines = linesOf(full);
    const mainLines = linesOf(result.main);
    expect(mainLines.length).toBe(fullLines.length);
    const fullById = new Map(fullLines.map(line => [String(parsed(line).id), line]));
    const nonClosed = fullLines.filter(line => parsed(line).status !== "closed");
    expect(mainLines.filter(line => parsed(line).status !== "closed")).toEqual(nonClosed);
    const archived = new Map<string, string>();
    for (const [, text] of result.shards) for (const line of linesOf(text)) archived.set(String(parsed(line).id), line);
    const closedIds = fullLines.map(parsed).filter(r => r.status === "closed").map(r => String(r.id));
    expect(closedIds.length).toBeGreaterThan(0);
    for (const id of closedIds) expect(archived.get(id), id).toBe(fullById.get(id));
    const stubs = new Map(mainLines.map(parsed).filter(r => r.status === "closed").map(r => [String(r.id), r]));
    const closedSet = new Set(closedIds);
    const edges = fullLines
      .map(parsed)
      .flatMap(r => (Array.isArray(r.dependencies) ? r.dependencies : []))
      .map(edge => (edge !== null && typeof edge === "object" && !Array.isArray(edge) ? String(edge.depends_on_id) : ""))
      .filter(target => closedSet.has(target));
    expect(edges.length).toBeGreaterThan(0);
    for (const target of edges) {
      const stub = stubs.get(target);
      expect(stub?.status, target).toBe("closed");
      expect(Object.keys(stub ?? {}).every(key => EXPECTED_STUB_FIELDS.includes(key)), target).toBe(true);
    }
    expect(Buffer.byteLength(result.main)).toBeLessThan(DEFAULT_SOFT_CEILING);
    for (const [name, text] of result.shards) expect(Buffer.byteLength(text), name).toBeLessThan(DEFAULT_SOFT_CEILING);
  }, 180_000);
});

describe("wb-294d module source: what it runs", () => {
  it("S1 ONLY GIT: the module's only child process is git - every spawnSync call names \"git\", spawnSync is all it imports from node:child_process, and it calls no other process launcher", () => {
    const source = readFileSync(TOOL, "utf8");
    const calls = [...source.matchAll(/\bspawnSync\(\s*([^,)]*)/g)].map(match => match[1] ?? "");
    expect(calls.length).toBeGreaterThan(0);
    expect(calls.filter(call => call !== '"git"')).toEqual([]);
    expect(source.match(/from "node:child_process"/g)).toEqual(['from "node:child_process"']);
    expect(source).toMatch(/^import \{ spawnSync \} from "node:child_process";$/m);
    // A launcher is called by its bare name; RegExp exec calls (UTC_STAMP.exec, SHARD_FILE.exec) are member calls.
    expect(source).not.toMatch(/(?<![.\w])(?:exec|execFile|execSync|execFileSync|fork|spawn)\s*\(|child_process"\)|\bimport\s*\(/);
  });
});
