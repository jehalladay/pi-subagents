/**
 * wb-3fop (the follow-up carrier of wb-294d acceptance (2), its headroom clause): the month boundary after an overflow-continued month -
 * the first compaction of a month whose previous month's shard was sealed at the soft ceiling and continued - judged at
 * compactTrackerExport and at the CLI of qa/workbench/tracker-export.mjs.
 *
 * CARRIER. The running-month shard rule this bead's CURE owed is the owner ruling of 2026-11-08 (OVERFLOW-CONTINUATION SHARDS, a
 * refinement of the owner shape's element 2, M:61843), bound on wb-tt43 as its implementation bead and landed at landing 1060 (merge
 * e41d9a1b): a month's shard is sealed at the soft ceiling and continued as issues-closed-YYYY-MM-b.jsonl, then -c, so a running month
 * that outgrows the ceiling continues instead of refusing. The compaction suite's M cases and T2 pin that rule within one month; the
 * module header's NOT CLAIMED list names "a continuation of a month other than the run's". This file pins the month boundary after a
 * continued month - the CURE's "past-month parts sealed" - and changes no module text; the module header cites none of its cases.
 *
 * FIXTURE. One soft ceiling throughout, CEILING: three November lines of one length fit a shard under it and a fourth does not. The
 * November run (2026-11-20) compacts an open row, an October row and five November rows of that length: the October row to
 * issues-closed-2026-10.jsonl, three November rows to issues-closed-2026-11.jsonl, which the fourth then seals, and two to its
 * continuation issues-closed-2026-11-b.jsonl. The December run (2026-12-01) compacts the next full export over those three shards: two
 * November rows changed after the close - one archived in the monthly shard, one in -b - a late November row never archived, and rows
 * closed in December.
 *
 * PINNED SET (each case's title claims what its assertions check and no more):
 *   B1  compactTrackerExport over the December rows issues-closed-2026-12.jsonl holds under CEILING: every one goes to it, in export
 *       order; the three shards that existed before the run are byte-unchanged and are the run's sealed list; every file stays under
 *       CEILING; the round trip is byte-equal.
 *   B2  compactTrackerExport over two more December rows of the November length: the first that issues-closed-2026-12.jsonl does not
 *       hold under CEILING seals it and opens issues-closed-2026-12-b.jsonl, which takes both - the run month's own letters, from -b; the
 *       three shards that existed before the run are byte-unchanged and are the run's sealed list; every file stays under CEILING; the
 *       round trip is byte-equal.
 *   B3  the CLI over B1's December run at FW_EXPORT_SOFT_CEILING=CEILING: compact exits 0 with an empty stderr and a receipt appending
 *       four lines to issues-closed-2026-12.jsonl alone; each shard file that existed before the run keeps its inode, modification time
 *       and bytes; the December shard holds the four lines; no temporary file stays in B3's scratch directory (the one holding .beads
 *       and the full export), in .beads or in the archive directory, each of the three listed whole after the run; rehydrate prints the
 *       full export.
 * NOT CLAIMED (scope sentences): the "sealed" refusal of a shard sealed before the run - no case reaches it, since the routing never
 * appends to such a shard (the module header says so); a past month with more than one continuation; a run more than one month after
 * the continued month; a late row of a month before the continued one (C4 of the compaction suite plants one beside a month without a
 * continuation); a ceiling other than CEILING, the default among them; any other layout of the archive before the run; a temporary
 * file anywhere outside B3's scratch directory, the system temporary directory that holds it and the working directory the CLI runs
 * in among them - no listing of B3's reaches it.
 * RESIDUALS: none named.
 */
import { spawnSync } from "node:child_process";
import { lstatSync, mkdirSync, readdirSync, readFileSync, utimesSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { compactTrackerExport, rehydrateTrackerText } from "../qa/workbench/tracker-export.mjs";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard();

const REPO = process.cwd();
const TOOL = join(REPO, "qa", "workbench", "tracker-export.mjs");

type Json = null | boolean | number | string | Json[] | { [key: string]: Json };
type Row = { [key: string]: Json };

const scratches: string[] = [];
afterEach(() => {
  for (const dir of scratches.splice(0)) removeScratch(dir);
});

/** One full bd-export row, built as the compaction suite builds its rows: a closed row carries a close stamp and a close reason. */
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
const bytesOf = (text: string): number => Buffer.byteLength(text);

const BODY = "n".repeat(1000);
/** A closed row of the November length: ids of five characters, a close stamp of one form and BODY as its notes. */
const long = (id: string, closedAt: string, extra: Row = {}): Row => row(id, "closed", { closed_at: closedAt, notes: BODY, ...extra });
/** The change after the close: a note appended and a later updated_at, so the row's line differs from its archived line. */
const AFTER_CLOSE: Row = { notes: `${BODY} + a note after the close`, updated_at: "2026-12-01T01:00:00Z" };

const OPEN = row("wb-o1", "open");
const OCTOBER = row("wb-k1", "closed", { closed_at: "2026-10-30T08:00:00Z", notes: "an october body" });
const NOVEMBER = ["wb-n1", "wb-n2", "wb-n3", "wb-n4", "wb-n5"].map(id => long(id, "2026-11-12T08:00:00Z"));
const LINE = bytesOf(textOf(NOVEMBER.slice(0, 1)));
/** Three lines of LINE bytes fit a shard under it and a fourth does not. */
const CEILING = 3 * LINE + 200;

/** The December run's rows past the November ones: a late November row never archived, then a short row closed in December. */
const LATE = row("wb-n6", "closed", { closed_at: "2026-11-29T08:00:00Z", notes: "a late november body" });
const DECEMBER = row("wb-d1", "closed", { closed_at: "2026-12-01T02:00:00Z", notes: "a december body" });
/** B1's full December export: wb-n2 (archived in the monthly shard) and wb-n5 (archived in -b) changed after the close. */
const december = (): Row[] => [
  OPEN,
  OCTOBER,
  ...NOVEMBER.map(r => (r.id === "wb-n2" || r.id === "wb-n5" ? { ...r, ...AFTER_CLOSE } : r)),
  LATE,
  DECEMBER,
];
const decemberLines = (rows: readonly Row[]): string => textOf(rows.filter(r => ["wb-n2", "wb-n5", "wb-n6", "wb-d1"].includes(String(r.id))));

/** The November run of the fixture: it seals issues-closed-2026-11.jsonl at its fourth line and continues it as -b. */
function novemberRun(): { main: string; shards: Map<string, string> } {
  const first = compactTrackerExport({ full: textOf([OPEN, OCTOBER, ...NOVEMBER]), shards: new Map(), now: "2026-11-20T00:00:00Z", ceiling: CEILING });
  if (!first.ok) throw new Error(first.lines.join("\n"));
  expect([...first.appended], "the November run continues its month at the ceiling").toEqual([
    ["issues-closed-2026-10.jsonl", ["wb-k1"]],
    ["issues-closed-2026-11.jsonl", ["wb-n1", "wb-n2", "wb-n3"]],
    ["issues-closed-2026-11-b.jsonl", ["wb-n4", "wb-n5"]],
  ]);
  return { main: first.main, shards: new Map(first.shards) };
}

/** One CLI run; a child that outlives 120 s is killed, so a hang fails the case. */
function cli(args: readonly string[], env: NodeJS.ProcessEnv = {}): ReturnType<typeof spawnSync> {
  return spawnSync(process.execPath, [TOOL, ...args], { cwd: REPO, encoding: "utf8", env: { PATH: process.env.PATH, ...env }, timeout: 120_000 });
}

describe("wb-3fop the month boundary after an overflow-continued month (owner ruling 2026-11-08, carried by wb-tt43)", { timeout: 120_000 }, () => {
  it("B1 PAST MONTH'S PARTS SEALED: at a 2026-12 run after 2026-11 was sealed at the ceiling and continued as 2026-11-b (beside 2026-10), the November row changed after its archive in the monthly shard, the one changed after its archive in -b, the late November row never archived and the row closed in December go to issues-closed-2026-12.jsonl in export order; the three shards that existed before the run are byte-unchanged and are the run's sealed list; every file stays under the ceiling; the round trip is byte-equal", () => {
    const before = novemberRun();
    const full = textOf(december());
    const run = compactTrackerExport({ full, shards: before.shards, now: "2026-12-01T03:00:00Z", ceiling: CEILING });
    if (!run.ok) throw new Error(run.lines.join("\n"));
    expect([...run.appended], "the December run's appended map").toEqual([["issues-closed-2026-12.jsonl", ["wb-n2", "wb-n5", "wb-n6", "wb-d1"]]]);
    expect([...run.shards.keys()], "the shards after the run, in name order").toEqual([
      "issues-closed-2026-10.jsonl",
      "issues-closed-2026-11.jsonl",
      "issues-closed-2026-11-b.jsonl",
      "issues-closed-2026-12.jsonl",
    ]);
    for (const [name, text] of before.shards) expect(run.shards.get(name), `${name} stays byte-unchanged`).toBe(text);
    expect(run.shards.get("issues-closed-2026-12.jsonl"), "the December shard holds the four lines in export order").toBe(decemberLines(december()));
    expect(run.sealed, "the run's sealed list: every shard that existed before it").toEqual(["issues-closed-2026-10.jsonl", "issues-closed-2026-11.jsonl", "issues-closed-2026-11-b.jsonl"]);
    expect([run.main, ...run.shards.values()].map(text => bytesOf(text) < CEILING), "every file under the ceiling").toEqual([true, true, true, true, true]);
    expect(rehydrateTrackerText(run.main, run.shards), "the round trip").toBe(full);
  });

  it("B2 RUN MONTH CONTINUES ITS OWN: at that 2026-12 run, two more December rows of the November length - the first that issues-closed-2026-12.jsonl does not hold under the ceiling seals it and opens issues-closed-2026-12-b.jsonl, which takes both; the three shards that existed before the run are byte-unchanged and are the run's sealed list; every file stays under the ceiling; the round trip is byte-equal", () => {
    const before = novemberRun();
    const rows = [...december(), long("wb-d2", "2026-12-01T02:00:00Z"), long("wb-d3", "2026-12-01T02:00:00Z")];
    const held = bytesOf(decemberLines(rows));
    expect([held < CEILING, held + LINE >= CEILING, 2 * LINE < CEILING], "the December shard holds B1's four lines and not wb-d2 beside them; an empty shard holds wb-d2 and wb-d3").toEqual([true, true, true]);
    const full = textOf(rows);
    const run = compactTrackerExport({ full, shards: before.shards, now: "2026-12-01T03:00:00Z", ceiling: CEILING });
    if (!run.ok) throw new Error(run.lines.join("\n"));
    expect([...run.appended], "the December run's appended map").toEqual([
      ["issues-closed-2026-12.jsonl", ["wb-n2", "wb-n5", "wb-n6", "wb-d1"]],
      ["issues-closed-2026-12-b.jsonl", ["wb-d2", "wb-d3"]],
    ]);
    expect([...run.shards.keys()], "the shards after the run, in name order").toEqual([
      "issues-closed-2026-10.jsonl",
      "issues-closed-2026-11.jsonl",
      "issues-closed-2026-11-b.jsonl",
      "issues-closed-2026-12.jsonl",
      "issues-closed-2026-12-b.jsonl",
    ]);
    for (const [name, text] of before.shards) expect(run.shards.get(name), `${name} stays byte-unchanged`).toBe(text);
    expect(run.shards.get("issues-closed-2026-12-b.jsonl"), "the December continuation holds wb-d2 and wb-d3").toBe(textOf(rows.slice(-2)));
    expect(run.sealed, "the run's sealed list: every shard that existed before it").toEqual(["issues-closed-2026-10.jsonl", "issues-closed-2026-11.jsonl", "issues-closed-2026-11-b.jsonl"]);
    expect([run.main, ...run.shards.values()].map(text => bytesOf(text) < CEILING), "every file under the ceiling").toEqual([true, true, true, true, true, true]);
    expect(rehydrateTrackerText(run.main, run.shards), "the round trip").toBe(full);
  });

  it("B3 CLI AT THE BOUNDARY: compact over a .beads directory holding the November run's main export and shards, at FW_EXPORT_SOFT_CEILING of the fixture's ceiling and a 2026-12 run stamp, exits 0 with an empty stderr and a receipt appending four lines to issues-closed-2026-12.jsonl alone; each shard file that existed before the run keeps its inode, modification time and bytes; the December shard holds the four lines; no temporary file stays in the scratch directory holding .beads and the full export, in .beads or in the archive directory, each of the three listed whole after the run; rehydrate prints the full export", () => {
    const before = novemberRun();
    const dir = makeScratch("tracker-export-month-boundary-");
    scratches.push(dir);
    const beads = join(dir, ".beads");
    const archive = join(beads, "archive");
    mkdirSync(archive, { recursive: true });
    writeFileSync(join(beads, "issues.jsonl"), before.main);
    const pinned = 1_790_000_000;
    for (const [name, text] of before.shards) {
      writeFileSync(join(archive, name), text);
      utimesSync(join(archive, name), pinned, pinned);
    }
    const kept = (): [string, number, number, string][] =>
      [...before.shards.keys()].map(name => [name, lstatSync(join(archive, name)).ino, lstatSync(join(archive, name)).mtimeMs, readFileSync(join(archive, name), "utf8")]);
    const keptBefore = kept();
    const fullPath = join(dir, "full.jsonl");
    writeFileSync(fullPath, textOf(december()));
    const env = { FW_EXPORT_SOFT_CEILING: String(CEILING) };
    const run = cli(["compact", "--full", fullPath, "--beads", beads, "--now", "2026-12-01T03:00:00Z"], env);
    const appended = String(run.stdout) === "" ? "no receipt" : (JSON.parse(String(run.stdout)) as Row).appended;
    expect([run.status, run.stderr, appended], "the December run").toEqual([0, "", { "issues-closed-2026-12.jsonl": 4 }]);
    expect(kept(), "each shard file that existed before the run").toEqual(keptBefore);
    expect(readFileSync(join(archive, "issues-closed-2026-12.jsonl"), "utf8"), "the December shard holds the four lines in export order").toBe(decemberLines(december()));
    // Every directory of B3's scratch tree - the scratch directory, .beads and the archive - listed whole (readdirSync's names sort by
    // UTF-16 code unit here, so a continuation sorts before its monthly shard: "-" precedes ".").
    expect(readdirSync(dir).sort(), "no temporary file stays in the scratch directory: .beads and the full export alone").toEqual([".beads", "full.jsonl"]);
    expect(readdirSync(beads).sort(), "no temporary file stays in .beads").toEqual(["archive", "issues.jsonl"]);
    expect(readdirSync(archive).sort(), "no temporary file stays in the archive directory: the three shards from before the run and the December shard alone").toEqual([
      "issues-closed-2026-10.jsonl",
      "issues-closed-2026-11-b.jsonl",
      "issues-closed-2026-11.jsonl",
      "issues-closed-2026-12.jsonl",
    ]);
    expect(cli(["rehydrate", "--beads", beads]).stdout, "rehydrate prints the full export").toBe(readFileSync(fullPath, "utf8"));
  });
});
