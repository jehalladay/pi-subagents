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
 */
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
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

function cli(args: readonly string[], env: NodeJS.ProcessEnv = {}): ReturnType<typeof spawnSync> {
  return spawnSync(process.execPath, [TOOL, ...args], { cwd: REPO, encoding: "utf8", env: { PATH: process.env.PATH, ...env } });
}

describe("wb-294d compaction: stub rows, month shards, round trip (owner shape elements 1-3)", () => {
  it("C1 STUB SHAPE: every closed row becomes exactly the stub fields it has, in bd's order, with its own values and no body", () => {
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

  it("C3 FIRST COMPACTION: each closed full line goes to the shard of its UTC close month, in export order; the round trip is byte-equal", () => {
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

  it("C8 MALFORMED: an unparseable line, a row without a string id or status, a duplicate id, or a closed row already in stub shape refuses as malformed", () => {
    const good = textOf(fixtureRows());
    const cases: readonly [string, string][] = [
      ["not json", `${good}{"id":\n`],
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

  it("C9 REFUSED INPUTS: a run stamp that is not a UTC timestamp, a shard name that is not a month shard's (a day shard's included) and a shard line that does not parse each refuse as malformed with one typed line", () => {
    const full = textOf(fixtureRows());
    const shard = `${lineOf(row("wb-c2", "closed", { closed_at: "2026-11-03T08:00:00Z" }))}\n`;
    const cases: readonly [string, { now: string; shards: Map<string, string> }, string][] = [
      ["a run stamp that is no timestamp", { now: "not-a-stamp", shards: new Map() }, 'tracker-export: REFUSED the run stamp "not-a-stamp" is not a UTC timestamp; nothing is written'],
      ["a day shard's name", { now: "2026-11-03T12:00:00Z", shards: new Map([["issues-closed-2026-11-03.jsonl", shard]]) }, "tracker-export: REFUSED issues-closed-2026-11-03.jsonl is not a month shard name (issues-closed-YYYY-MM.jsonl); nothing is written"],
      ["a file of another name", { now: "2026-11-03T12:00:00Z", shards: new Map([["README.md", "# shards\n"]]) }, "tracker-export: REFUSED README.md is not a month shard name (issues-closed-YYYY-MM.jsonl); nothing is written"],
      ["a shard line that does not parse", { now: "2026-11-03T12:00:00Z", shards: new Map([["issues-closed-2026-11.jsonl", `${shard}{"id":\n`]]) }, "tracker-export: archived issues-closed-2026-11.jsonl line 2 does not parse; nothing is written"],
    ];
    for (const [label, input, line] of cases) {
      const result = compactTrackerExport({ full, ...input });
      expect(result, label).toEqual({ ok: false, code: "malformed", lines: [line] });
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

  it("R3 CORRUPT SHARD: a shard line that does not parse fails the read loudly, naming the shard and line", () => {
    const dir = scratch("tracker-export-reader-");
    mkdirSync(join(dir, ".beads", "archive"), { recursive: true });
    const main = join(dir, ".beads", "issues.jsonl");
    writeFileSync(main, textOf(fixtureRows()));
    writeFileSync(join(dir, ".beads", "archive", "issues-closed-2026-11.jsonl"), `${lineOf(row("wb-c2", "closed"))}\n{"id":\n`);
    expect(() => trackerExportText(main)).toThrow("issues-closed-2026-11.jsonl line 2");
  });

  it("R4 SHARD FILES ONLY: a file of another name beside the shards (a README, a day shard's name) is never read - beside the shards the read is the full export, with no shard it is the main export unchanged", () => {
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
    expect(trackerExportText(main), "no month shard beside the main export: its bytes unchanged").toBe(result.main);
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

  it("R6 NOT CLOSED STAYS: beside an archive a stub-shaped row that is not closed reads as itself, though a dependency edge of it spells a closed status, never as an archived line of its id", () => {
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

  it("K2 rehydrate prints the full export from the main export and its shards", () => {
    const { beads, full } = beadsDir();
    expect(cli(["compact", "--full", full, "--beads", beads, "--now", "2026-11-03T12:00:00Z"]).status).toBe(0);
    const run = cli(["rehydrate", "--beads", beads]);
    expect(run.status).toBe(0);
    expect(run.stdout).toBe(readFileSync(full, "utf8"));
  });

  it("K3 at the soft ceiling compact exits 2 with the typed line and writes nothing; a malformed export exits 3 and writes nothing", () => {
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
  });

  it("K4 a --now that is not a UTC timestamp exits 3 with the typed line and writes nothing", () => {
    const { beads, full } = beadsDir();
    const run = cli(["compact", "--full", full, "--beads", beads, "--now", "not-a-stamp"]);
    expect(run.status).toBe(3);
    expect(String(run.stderr)).toBe('tracker-export: REFUSED the run stamp "not-a-stamp" is not a UTC timestamp; nothing is written\n');
    expect(run.stdout).toBe("");
    expect(readdirSync(beads)).toEqual([]);
  });

  it("K5 compact reads only the archive's month shards: a file of another name in it is neither an input nor touched", () => {
    const { beads, full } = beadsDir();
    mkdirSync(join(beads, "archive"));
    writeFileSync(join(beads, "archive", "README.md"), "# the closed rows' bodies\n");
    const run = cli(["compact", "--full", full, "--beads", beads, "--now", "2026-11-03T12:00:00Z"]);
    expect(run.stderr).toBe("");
    expect(run.status).toBe(0);
    expect(readdirSync(join(beads, "archive")).sort()).toEqual(["README.md", "issues-closed-2026-10.jsonl", "issues-closed-2026-11.jsonl"]);
    expect(readFileSync(join(beads, "archive", "README.md"), "utf8")).toBe("# the closed rows' bodies\n");
    expect(cli(["rehydrate", "--beads", beads]).stdout).toBe(readFileSync(full, "utf8"));
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
    const edges = fullLines
      .map(parsed)
      .flatMap(r => (Array.isArray(r.dependencies) ? r.dependencies : []))
      .map(edge => (edge !== null && typeof edge === "object" && !Array.isArray(edge) ? String(edge.depends_on_id) : ""))
      .filter(target => stubs.has(target));
    expect(edges.length).toBeGreaterThan(0);
    for (const target of edges) expect(stubs.get(target)?.status, target).toBe("closed");
    expect(Buffer.byteLength(result.main)).toBeLessThan(DEFAULT_SOFT_CEILING);
    for (const [name, text] of result.shards) expect(Buffer.byteLength(text), name).toBeLessThan(DEFAULT_SOFT_CEILING);
  }, 180_000);
});
