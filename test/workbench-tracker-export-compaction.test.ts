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
import { existsSync, mkdirSync, readdirSync, readFileSync, symlinkSync, utimesSync, writeFileSync } from "node:fs";
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

  it("C8 MALFORMED: an unparseable line, a line that is not a JSON object, a row without a non-empty string id or without a string status, a duplicate id, or a closed row already in stub shape refuses as malformed", () => {
    const good = textOf(fixtureRows());
    const cases: readonly [string, string][] = [
      ["not json", `${good}{"id":\n`],
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

  it("C9 REFUSED INPUTS: a run stamp that is not a UTC stamp (each form below), the shard names of a day shard (issues-closed-2026-11-03.jsonl) and README.md, a non-empty shard that does not end with a newline and the shard lines {\"id\":, [1] and {\"status\":\"closed\"} after a full line each refuse as malformed with one typed line; an empty shard is read as holding no line", () => {
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
    ];
    for (const now of stamps) {
      expect(compactTrackerExport({ full, shards: new Map(), now }), now).toEqual({ ok: false, code: "malformed", lines: [`tracker-export: REFUSED the run stamp "${now}" is not a UTC timestamp; nothing is written`] });
    }
    const empty = compactTrackerExport({ full, shards: new Map([["issues-closed-2026-11.jsonl", ""]]), now: "2026-11-03T12:00:00Z" });
    if (!empty.ok) throw new Error(empty.lines.join("\n"));
    // The empty 2026-11 shard is the newest existing shard, so wb-c1 (closed 2026-10) goes to the run month's shard with the rest.
    expect([...empty.appended.entries()]).toEqual([["issues-closed-2026-11.jsonl", ["wb-c1", "wb-c2", "wb-c3"]]]);
    expect(empty.shards.get("issues-closed-2026-11.jsonl")).toBe([1, 2, 4].map(index => `${lineOf(fixtureRows()[index] ?? {})}\n`).join(""));
    const cases: readonly [string, { now: string; shards: Map<string, string> }, string][] = [
      ["a day shard's name", { now: "2026-11-03T12:00:00Z", shards: new Map([["issues-closed-2026-11-03.jsonl", shard]]) }, "tracker-export: REFUSED issues-closed-2026-11-03.jsonl is not a month shard name (issues-closed-YYYY-MM.jsonl); nothing is written"],
      ["a file of another name", { now: "2026-11-03T12:00:00Z", shards: new Map([["README.md", "# shards\n"]]) }, "tracker-export: REFUSED README.md is not a month shard name (issues-closed-YYYY-MM.jsonl); nothing is written"],
      ["a shard line that does not parse", { now: "2026-11-03T12:00:00Z", shards: new Map([["issues-closed-2026-11.jsonl", `${shard}{"id":\n`]]) }, "tracker-export: archived issues-closed-2026-11.jsonl line 2 does not parse; nothing is written"],
      ["a shard line that is no object", { now: "2026-11-03T12:00:00Z", shards: new Map([["issues-closed-2026-11.jsonl", `${shard}[1]\n`]]) }, "tracker-export: archived issues-closed-2026-11.jsonl line 2 is not a JSON object; nothing is written"],
      ["a shard line with no id", { now: "2026-11-03T12:00:00Z", shards: new Map([["issues-closed-2026-11.jsonl", `${shard}{"status":"closed"}\n`]]) }, "tracker-export: archived issues-closed-2026-11.jsonl line 2 has no string id; nothing is written"],
      ["a shard without a final newline", { now: "2026-11-03T12:00:00Z", shards: new Map([["issues-closed-2026-11.jsonl", shard.replace(/\n$/, "")]]) }, "tracker-export: REFUSED .beads/archive/issues-closed-2026-11.jsonl does not end with a newline (a shard holds whole lines); nothing is written"],
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

  it("C15 BLANK LINE: a blank line of the full export stays a blank line of the main export, in its place, and the round trip is byte-equal", () => {
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

  it("R3 CORRUPT SHARD: the shard line {\"id\": after a full line fails the read loudly, naming the shard and line", () => {
    const dir = scratch("tracker-export-reader-");
    mkdirSync(join(dir, ".beads", "archive"), { recursive: true });
    const main = join(dir, ".beads", "issues.jsonl");
    writeFileSync(main, textOf(fixtureRows()));
    writeFileSync(join(dir, ".beads", "archive", "issues-closed-2026-11.jsonl"), `${lineOf(row("wb-c2", "closed"))}\n{"id":\n`);
    expect(() => trackerExportText(main)).toThrow("issues-closed-2026-11.jsonl line 2");
  });

  it("R4 SHARD FILES ONLY: a file of another name beside the shards (a README, a day shard's name), and a symlink or a directory of a month shard's name, is never read - beside the shards the read is the full export, with no shard file it is the main export unchanged", () => {
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

  it("R10 READ MEMO: a process reads the shards again when a shard's size or modification time changes or a shard is added; a rewrite that keeps names, sizes and modification times reads as the earlier content", () => {
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

  // What compact writes anywhere outside the .beads directory at K3's plants - the full export file and the directory that holds
  // .beads among them - is NOT CLAIMED by K3 (refusal #5 of wb-294d, U1: GP3-W01, GP3-W02, GP3-W03 and GP3-W04).
  // K3 claims nothing beyond its plants. At any other ceiling form - another set of files at or over the ceiling (two shards without
  // the main export, the main export with one shard, one file exactly at the ceiling and another over it), a shard that exists before
  // the run at or over the ceiling, and a --beads path spelled other than K3's absolute scratch path (relative, ending with a slash, or
  // holding a character outside printable ASCII) - compact's exit, stdout, stderr and .beads directory are NOT CLAIMED by K3 (refusal
  // #6 of wb-294d, U1: the ceiling domain beyond K3's five ceiling plants); so is the CLI over a full export {not json with no final
  // newline (refusal #6 of wb-294d, F5: GP3P-D1 and GP3P-D3). The big-shard fixture is one open row and one closed row whose
  // 4,000-character note makes its one month shard outweigh its main export.
  it("K3 at each of its five soft-ceiling plants - the fixture's main export and both its month shards over a 64-byte ceiling; the fixture's main export alone over its ceiling; the fixture's main export alone exactly at its ceiling; the big-shard fixture's one month shard alone over its ceiling; the big-shard fixture's one month shard alone exactly at its ceiling - compact exits 2, prints nothing on stdout, prints on stderr exactly one typed line for each file at or over the ceiling, naming the file under --beads and the bytes the unrefused run writes to it, and leaves the .beads directory empty; a full export whose text is {not json and a newline exits 3 and leaves the .beads directory empty", ({ task }) => {
    const { beads, full } = beadsDir();
    const refused = cli(["compact", "--full", full, "--beads", beads, "--now", "2026-11-03T12:00:00Z"], { FW_EXPORT_SOFT_CEILING: "64" });
    expect(refused.status).toBe(2);
    expect(String(refused.stderr)).toMatch(/^tracker-export: REFUSED \S+issues\.jsonl would be \d+ bytes, at or over the soft ceiling of 64 bytes \(FW_EXPORT_SOFT_CEILING\); nothing is written$/m);
    expect(existsSync(join(beads, "issues.jsonl"))).toBe(false);
    expect(existsSync(join(beads, "archive"))).toBe(false);
    expect(readdirSync(beads)).toEqual([]);
    writeFileSync(full, "{not json\n");
    const malformed = cli(["compact", "--full", full, "--beads", beads, "--now", "2026-11-03T12:00:00Z"]);
    expect(malformed.status).toBe(3);
    expect(existsSync(join(beads, "issues.jsonl"))).toBe(false);
    expect(readdirSync(beads)).toEqual([]);
    // The five ceiling plants (refusal #6 of wb-294d, U1: GP3P-A1, A2, A3, A4 and B3; F5: GP3P-B1 and B2). A plant's forms read each
    // file the unrefused run writes against the plant's ceiling: over it, exactly at it, or under it.
    const inputs = { fixture: textOf(fixtureRows()), bigShard: textOf([row("wb-o1", "open"), row("wb-c9", "closed", { closed_at: "2026-11-03T08:00:00Z", notes: "x".repeat(4000) })]) };
    type Input = keyof typeof inputs;
    /** The bytes of each file compact writes for the input when nothing refuses (the default ceiling), read from disk: main export first, then the shards in name order. */
    const unrefused = (input: Input): ReadonlyMap<string, number> => {
      const layout = beadsDir();
      writeFileSync(layout.full, inputs[input]);
      expect(cli(["compact", "--full", layout.full, "--beads", layout.beads, "--now", "2026-11-03T12:00:00Z"]).status, `the unrefused run over the ${input} input`).toBe(0);
      const shards = readdirSync(join(layout.beads, "archive")).sort();
      return new Map([["issues.jsonl", readFileSync(join(layout.beads, "issues.jsonl")).length], ...shards.map((name): [string, number] => [`archive/${name}`, readFileSync(join(layout.beads, "archive", name)).length])]);
    };
    const written = { fixture: unrefused("fixture"), bigShard: unrefused("bigShard") };
    const bytesOf = (sizes: ReadonlyMap<string, number>, file: string): number => sizes.get(file) ?? Number.NaN;
    const plants: readonly { readonly plant: string; readonly input: Input; readonly ceiling: (sizes: ReadonlyMap<string, number>) => number; readonly forms: readonly string[] }[] = [
      { plant: "the fixture's main export and both its month shards over a 64-byte ceiling", input: "fixture", ceiling: () => 64, forms: ["issues.jsonl:over", "archive/issues-closed-2026-10.jsonl:over", "archive/issues-closed-2026-11.jsonl:over"] },
      { plant: "the fixture's main export alone over its ceiling", input: "fixture", ceiling: sizes => bytesOf(sizes, "archive/issues-closed-2026-11.jsonl") + 1, forms: ["issues.jsonl:over", "archive/issues-closed-2026-10.jsonl:under", "archive/issues-closed-2026-11.jsonl:under"] },
      { plant: "the fixture's main export alone exactly at its ceiling", input: "fixture", ceiling: sizes => bytesOf(sizes, "issues.jsonl"), forms: ["issues.jsonl:at", "archive/issues-closed-2026-10.jsonl:under", "archive/issues-closed-2026-11.jsonl:under"] },
      { plant: "the big-shard fixture's one month shard alone over its ceiling", input: "bigShard", ceiling: sizes => bytesOf(sizes, "issues.jsonl") + 1, forms: ["issues.jsonl:under", "archive/issues-closed-2026-11.jsonl:over"] },
      { plant: "the big-shard fixture's one month shard alone exactly at its ceiling", input: "bigShard", ceiling: sizes => bytesOf(sizes, "archive/issues-closed-2026-11.jsonl"), forms: ["issues.jsonl:under", "archive/issues-closed-2026-11.jsonl:at"] },
    ];
    expect(plants.map(entry => `${entry.input}|${entry.plant}|${entry.forms.join(",")}`), "K3's five ceiling plants (frozen shape)").toEqual([
      "fixture|the fixture's main export and both its month shards over a 64-byte ceiling|issues.jsonl:over,archive/issues-closed-2026-10.jsonl:over,archive/issues-closed-2026-11.jsonl:over",
      "fixture|the fixture's main export alone over its ceiling|issues.jsonl:over,archive/issues-closed-2026-10.jsonl:under,archive/issues-closed-2026-11.jsonl:under",
      "fixture|the fixture's main export alone exactly at its ceiling|issues.jsonl:at,archive/issues-closed-2026-10.jsonl:under,archive/issues-closed-2026-11.jsonl:under",
      "bigShard|the big-shard fixture's one month shard alone over its ceiling|issues.jsonl:under,archive/issues-closed-2026-11.jsonl:over",
      "bigShard|the big-shard fixture's one month shard alone exactly at its ceiling|issues.jsonl:under,archive/issues-closed-2026-11.jsonl:at",
    ]);
    // The title is the outside anchor of the plant table: its plant list is the table's plants, in order, and its count is theirs.
    expect(task.name.split(" - ")[1]?.split("; "), "the title names exactly K3's ceiling plants, in order").toEqual(plants.map(entry => entry.plant));
    expect(task.name.startsWith(`K3 at each of its ${["no", "one", "two", "three", "four", "five", "six", "seven"][plants.length]} soft-ceiling plants - `), "the title counts K3's ceiling plants").toBe(true);
    for (const { plant, input, ceiling: ceilingOf, forms } of plants) {
      const sizes = written[input];
      const ceiling = ceilingOf(sizes);
      expect([...sizes].map(([file, bytes]) => `${file}:${bytes > ceiling ? "over" : bytes === ceiling ? "at" : "under"}`), `${plant}: the plant's forms`).toEqual(forms);
      const layout = beadsDir();
      writeFileSync(layout.full, inputs[input]);
      const run = cli(["compact", "--full", layout.full, "--beads", layout.beads, "--now", "2026-11-03T12:00:00Z"], { FW_EXPORT_SOFT_CEILING: String(ceiling) });
      expect(run.status, plant).toBe(2);
      expect(run.stdout, plant).toBe("");
      const typed = forms.filter(form => !form.endsWith(":under")).map(form => form.slice(0, form.lastIndexOf(":")));
      expect(run.stderr, plant).toBe(
        typed.map(file => `tracker-export: REFUSED ${layout.beads}/${file} would be ${bytesOf(sizes, file)} bytes, at or over the soft ceiling of ${ceiling} bytes (FW_EXPORT_SOFT_CEILING); nothing is written\n`).join(""),
      );
      expect(readdirSync(layout.beads), plant).toEqual([]);
    }
  }, 60_000);

  it("K4 a --now that is not a UTC timestamp exits 3 with the typed line and writes nothing", () => {
    const { beads, full } = beadsDir();
    const run = cli(["compact", "--full", full, "--beads", beads, "--now", "not-a-stamp"]);
    expect(run.status).toBe(3);
    expect(String(run.stderr)).toBe('tracker-export: REFUSED the run stamp "not-a-stamp" is not a UTC timestamp; nothing is written\n');
    expect(run.stdout).toBe("");
    expect(readdirSync(beads)).toEqual([]);
  });

  it("K5 compact reads only the archive's month shard files: a file of another name, or a directory of a shard's name, in it is neither an input nor touched", () => {
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

  it("K7 rehydrate exits 3 with the typed line, printing nothing on stdout, when the read throws: a month shard whose last line is {\"id\":, and a missing main export", () => {
    const { beads, full } = beadsDir();
    expect(cli(["compact", "--full", full, "--beads", beads, "--now", "2026-11-03T12:00:00Z"]).status).toBe(0);
    const shard = join(beads, "archive", "issues-closed-2026-11.jsonl");
    const lines = linesOf(readFileSync(shard, "utf8")).length;
    writeFileSync(shard, `${readFileSync(shard, "utf8")}{"id":\n`);
    const corrupt = cli(["rehydrate", "--beads", beads]);
    expect(corrupt.status).toBe(3);
    expect(corrupt.stdout).toBe("");
    expect(corrupt.stderr).toBe(`tracker-export: could not rehydrate (tracker-export: archived issues-closed-2026-11.jsonl line ${lines + 1} does not parse)\n`);
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
