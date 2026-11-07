/**
 * wb-294d (g10.24-K1): the tracker export kept under GitHub's 104,857,600-byte blob wall - the compaction ritual and the rehydrating
 * reader of qa/workbench/tracker-export.mjs, judged at their exported functions and at the CLI.
 *
 * Owner shape ruling (bound on the bead; this file pins elements 1-3 and the compaction half of element 4):
 *   1. STUB ROWS: the pushed main export keeps FULL rows only for non-closed beads; every closed bead becomes a STUB row carrying id,
 *      title, status, closed stamp, close reason and dep edges - no description/notes bodies.
 *   2. ARCHIVE SHARDS: closed-issue bodies move to append-only shards under .beads/archive/ keyed by close period; a shard is immutable
 *      once its period ends, and past shards are byte-unchanged at every export. The period is one UTC DAY (issues-closed-YYYY-MM-DD.jsonl),
 *      not the ruling's default month: measured at trunk fd90f9d3, the 276 beads closed 2026-11-01..06 already carry 46,291,604 bytes, so
 *      a November month shard would reach the 99,614,720-byte soft ceiling mid-month; the largest close-day is 13,084,831 bytes.
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

/** The fixture export the routing cases share: two open rows, three closed rows on two close days, one edge into a closed bead. */
function fixtureRows(): Row[] {
  return [
    row("wb-o1", "open", { dependencies: [{ issue_id: "wb-o1", depends_on_id: "wb-c1", type: "blocks" }] }),
    row("wb-c1", "closed", { closed_at: "2026-11-02T23:59:59Z", updated_at: "2026-11-03T00:00:10Z" }),
    row("wb-c2", "closed", { closed_at: "2026-11-03T08:00:00Z", labels: ["urgent"], dependencies: [{ issue_id: "wb-c2", depends_on_id: "wb-c1", type: "related" }] }),
    row("wb-p1", "in_progress"),
    row("wb-c3", "closed", { closed_at: "2026-11-03T09:30:00Z", acceptance_criteria: "criteria body", comments: [{ id: 1, text: "c" }] }),
  ];
}

function cli(args: readonly string[], env: NodeJS.ProcessEnv = {}): ReturnType<typeof spawnSync> {
  return spawnSync(process.execPath, [TOOL, ...args], { cwd: REPO, encoding: "utf8", env: { PATH: process.env.PATH, ...env } });
}

describe("wb-294d compaction: stub rows, day shards, round trip (owner shape elements 1-3)", () => {
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

  it("C3 FIRST COMPACTION: each closed full line goes to the shard of its UTC close day, in export order; the round trip is byte-equal", () => {
    const rows = fixtureRows();
    const full = textOf(rows);
    const result = compactTrackerExport({ full, shards: new Map(), now: "2026-11-03T12:00:00Z" });
    if (!result.ok) throw new Error(result.lines.join("\n"));
    expect([...result.shards.keys()]).toEqual(["issues-closed-2026-11-02.jsonl", "issues-closed-2026-11-03.jsonl"]);
    expect(result.shards.get("issues-closed-2026-11-02.jsonl")).toBe(`${lineOf(rows[1] ?? {})}\n`);
    expect(result.shards.get("issues-closed-2026-11-03.jsonl")).toBe(`${lineOf(rows[2] ?? {})}\n${lineOf(rows[4] ?? {})}\n`);
    expect([...result.appended.entries()]).toEqual([
      ["issues-closed-2026-11-02.jsonl", ["wb-c1"]],
      ["issues-closed-2026-11-03.jsonl", ["wb-c2", "wb-c3"]],
    ]);
    expect(rehydrateTrackerText(result.main, result.shards)).toBe(full);
  });

  it("C3b UTC DAY: a close stamp with an offset is filed under its UTC day (the offset is applied before the day is taken)", () => {
    const rows = [row("wb-z1", "closed", { closed_at: "2026-11-03T01:30:00+02:00" }), row("wb-z2", "closed", { closed_at: "2026-11-02T23:30:00-03:00" })];
    const result = compactTrackerExport({ full: textOf(rows), shards: new Map(), now: "2026-11-03T12:00:00Z" });
    if (!result.ok) throw new Error(result.lines.join("\n"));
    expect([...result.appended.entries()]).toEqual([
      ["issues-closed-2026-11-02.jsonl", ["wb-z1"]],
      ["issues-closed-2026-11-03.jsonl", ["wb-z2"]],
    ]);
  });

  it("C4 SEALED SHARDS: a later compaction never changes a past day's shard - late and changed closed rows go to today's shard", () => {
    const rows = fixtureRows();
    const first = compactTrackerExport({ full: textOf(rows), shards: new Map(), now: "2026-11-03T12:00:00Z" });
    if (!first.ok) throw new Error(first.lines.join("\n"));
    const before = new Map(first.shards);
    // Next day: wb-c2 gains a note after its close; wb-c4 closed on 11-02 (a sealed day) shows up late; wb-c5 closes today.
    const later = rows.map(r => (r.id === "wb-c2" ? { ...r, notes: `${String(r.notes)} + a note after the close`, updated_at: "2026-11-04T01:00:00Z" } : r));
    later.push(row("wb-c4", "closed", { closed_at: "2026-11-02T10:00:00Z" }), row("wb-c5", "closed", { closed_at: "2026-11-04T02:00:00Z" }));
    const full = textOf(later);
    const second = compactTrackerExport({ full, shards: before, now: "2026-11-04T03:00:00Z" });
    if (!second.ok) throw new Error(second.lines.join("\n"));
    for (const [name, text] of before) expect(second.shards.get(name), `${name} stays byte-unchanged`).toBe(text);
    expect([...second.appended.entries()]).toEqual([["issues-closed-2026-11-04.jsonl", ["wb-c2", "wb-c4", "wb-c5"]]]);
    expect(second.shards.get("issues-closed-2026-11-04.jsonl")).toBe([later[2], later[5], later[6]].map(r => `${lineOf(r ?? {})}\n`).join(""));
    expect(rehydrateTrackerText(second.main, second.shards)).toBe(full);
  });

  it("C5 GAP DAY: a close day newer than every existing shard gets its own shard even when it is already past", () => {
    const rows = fixtureRows();
    const first = compactTrackerExport({ full: textOf(rows), shards: new Map(), now: "2026-11-03T12:00:00Z" });
    if (!first.ok) throw new Error(first.lines.join("\n"));
    const gap = [...rows, row("wb-c6", "closed", { closed_at: "2026-11-04T20:00:00Z" })];
    const later = compactTrackerExport({ full: textOf(gap), shards: first.shards, now: "2026-11-06T00:30:00Z" });
    if (!later.ok) throw new Error(later.lines.join("\n"));
    expect([...later.appended.entries()]).toEqual([["issues-closed-2026-11-04.jsonl", ["wb-c6"]]]);
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
    const shardBytes = Buffer.byteLength(open.shards.get("issues-closed-2026-11-03.jsonl") ?? "");
    const atShard = compactTrackerExport({ full, shards: new Map(), now: "2026-11-03T12:00:00Z", ceiling: shardBytes });
    expect(atShard.ok).toBe(false);
    if (atShard.ok) return;
    expect(atShard.code).toBe("oversize");
    const shardOnly = shardBytes > mainBytes ? atShard.lines : atShard.lines.filter(line => line.includes("archive/"));
    expect(shardOnly).toEqual([
      `tracker-export: REFUSED .beads/archive/issues-closed-2026-11-03.jsonl would be ${shardBytes} bytes, at or over the soft ceiling of ${shardBytes} bytes (FW_EXPORT_SOFT_CEILING); nothing is written`,
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
    writeFileSync(join(dir, ".beads", "archive", "issues-closed-2026-11-03.jsonl"), `${lineOf(row("wb-c2", "closed"))}\n{"id":\n`);
    expect(() => trackerExportText(main)).toThrow("issues-closed-2026-11-03.jsonl line 2");
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

  it("K1 compact writes the main export and the day shards, prints one JSON receipt line, and a re-run with no change appends nothing", () => {
    const { beads, full } = beadsDir();
    const run = cli(["compact", "--full", full, "--beads", beads, "--now", "2026-11-03T12:00:00Z"]);
    expect(run.stderr).toBe("");
    expect(run.status).toBe(0);
    const receipt = JSON.parse(String(run.stdout)) as Row;
    expect(receipt).toMatchObject({ verb: "compact", rows: 5, stubs: 3, appended: { "issues-closed-2026-11-02.jsonl": 1, "issues-closed-2026-11-03.jsonl": 2 }, shards: 2, sealedUnchanged: true, roundTrip: true });
    expect(readdirSync(join(beads, "archive")).sort()).toEqual(["issues-closed-2026-11-02.jsonl", "issues-closed-2026-11-03.jsonl"]);
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
