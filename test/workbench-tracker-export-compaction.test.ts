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
 * ids (C, R, K, T, S, P) beside the guard suite's (G) for every sentence it claims, and names what it does not claim. P1 holds the plant
 * tables' shape and the module header's PLANTED SHARD LINES block equal to them (wb-137f refusal #2 F4); P2 holds the cut #4 tables
 * (UTF8_CHARACTERS, NAMES_OUTSIDE_THE_FORM, SHARD_NAMES_IN_THE_FORM, STATUSES_NOT_CLOSED, FIELDS_BEYOND_STUB) equal to the module
 * header's CUT #4 PLANT TABLES lists, and K14 its variant labels to the header's K14 variants list (wb-137f refusal #3); K3 holds its
 * ceiling plant labels equal to the header's K3 CEILING PLANTS list (wb-xkto, refusal #4 of wb-137f), and C7 its ceiling plant labels
 * equal to the header's C7 CEILING PLANTS list (wb-xkto, its own refusal #1).
 * wb-tt43 (owner ruling 2026-11-08 on the bead, a refinement of element 2: OVERFLOW-CONTINUATION SHARDS): the M cases and T2 pin a
 * month's continuation shards issues-closed-YYYY-MM-X.jsonl (X one letter b to z), the seal at the soft ceiling and the name order;
 * C7's two growing plants and its fixture ceiling at the run-month shard's bytes now continue instead of refusing; P3 holds the
 * continuation name tables equal to the module header's CONTINUATION PLANT TABLES lists.
 */
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, lstatSync, mkdirSync, readdirSync, readFileSync, readlinkSync, renameSync, symlinkSync, unlinkSync, utimesSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
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
 * #1, its witness the first row); the characters past the space and the tab are written by code point. P1 holds this table's shape.
 */
const WHITESPACE_LINES: readonly (readonly [label: string, line: string])[] = [
  ["a line of one space", " "],
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
 * of wb-294d refusal #3; W8-01 and W8-02 of wb-137f refusal #1; W2-02a and W2-02b of wb-137f refusal #2, the // and /* comment forms).
 * The four prefix forms open with the export's own line prefix. P1 holds this table's shape and holds the module header's PLANTED SHARD
 * LINES lists equal to it, reason by reason.
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
  ["a line that opens like a # comment", "# a note", "does not parse"],
  ["a line that opens like a // comment", "// a note", "does not parse"],
  ["a line that opens like a /* comment", "/* a note */", "does not parse"],
  ["a line that opens like a -- comment", "-- a note", "does not parse"],
  ["a line that opens like a ; comment", "; a note", "does not parse"],
  ["a line that opens like a <!-- comment", "<!-- a note -->", "does not parse"],
  ...WHITESPACE_LINES.map(([label, line]) => [label, line, "does not parse"] as const),
];

/** The whole shards a layout sets beside its planted shard: a sealed month's older body of wb-c1, and the fixture's own shard lines. */
const WHOLE_SHARDS: ReadonlyMap<string, string> = new Map([
  ["issues-closed-2026-09.jsonl", `${lineOf(row("wb-c1", "closed", { closed_at: "2026-09-30T00:00:00Z", notes: "an older body of wb-c1" }))}\n`],
  ["issues-closed-2026-10.jsonl", `${lineOf(fixtureRows()[1] ?? {})}\n`],
  ["issues-closed-2026-11.jsonl", `${lineOf(fixtureRows()[2] ?? {})}\n${lineOf(fixtureRows()[4] ?? {})}\n`],
]);

/**
 * Where R3, C9 and R11 plant a shard, by name - the order the shards are read in: the only shard, the older and the newer of two, and the
 * middle of three; every other shard of the layout is whole. P1 holds this table's shape and the module header's list of it.
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

/**
 * A planted shard with `bad` at line 1 before a whole row, at line 2 between two whole rows, or at line 3 after two whole rows, each line
 * ended by a newline. P1 holds this table's shape and the module header's list of it.
 */
const PLANT_AT: readonly (readonly [at: number, label: string, text: (bad: string) => string])[] = [
  [1, "line 1 before a whole row", bad => `${bad}\n${lineOf(row("wb-c3", "closed"))}\n`],
  [2, "line 2 between two whole rows", bad => `${lineOf(row("wb-c3", "closed"))}\n${bad}\n${lineOf(row("wb-c4", "closed"))}\n`],
  [3, "line 3 after two whole rows", bad => `${lineOf(row("wb-c3", "closed"))}\n${lineOf(row("wb-c4", "closed"))}\n${bad}\n`],
];

/** The four prefix forms of BAD_SHARD_LINES, which K3 and K7 plant in the older of two month shards at the CLI. */
const PREFIX_FORMS = BAD_SHARD_LINES.filter(([label]) => label.startsWith("the prefix form"));

/** The six comment forms of BAD_SHARD_LINES (W2-02a/W2-02b of wb-137f refusal #2), which K3 and K7 plant at the CLI as well. */
const COMMENT_FORMS = BAD_SHARD_LINES.filter(([label]) => label.startsWith("a line that opens like a "));

/** What K3 and K7 plant in the older of two month shards at the CLI: the four prefix forms, then the six comment forms. */
const CLI_FORMS = [...PREFIX_FORMS, ...COMMENT_FORMS];

/**
 * The characters beyond ASCII that R1, R2, K1, K2, K13 and C2 plant in rows' text (wb-137f refusal #3 U1, GP1-15/16/17), each written
 * by code point under its label: a two-byte, a three-byte and a four-byte UTF-8 character, a no-break space, a letter with a combining
 * mark after it, and a line separator inside a JSON string. P2 holds this table's shape and the module header's list of it.
 */
const UTF8_CHARACTERS: readonly (readonly [label: string, text: string])[] = [
  ["U+00E9", String.fromCodePoint(0xe9)],
  ["U+2014", String.fromCodePoint(0x2014)],
  ["U+1F600", String.fromCodePoint(0x1f600)],
  ["U+00A0", String.fromCodePoint(0xa0)],
  ["U+0065 U+0301", `e${String.fromCodePoint(0x301)}`],
  ["U+2028", String.fromCodePoint(0x2028)],
];

/** A text holding every character of UTF8_CHARACTERS, and the byte order mark R1 sets before a main export's first line. */
const UTF8_TEXT = `text beyond ASCII: ${UTF8_CHARACTERS.map(([, text]) => text).join(" ")}`;
const BYTE_ORDER_MARK = String.fromCodePoint(0xfeff);

/** The fixture with UTF8_TEXT in an open row's title, in a closed row's title and notes in each close month, and in a third closed row. */
function utf8Rows(): Row[] {
  return fixtureRows().map(r =>
    r.id === "wb-o1" ? { ...r, title: `wb-o1 ${UTF8_TEXT}` } : r.id === "wb-c1" || r.id === "wb-c2" ? { ...r, title: `${String(r.id)} ${UTF8_TEXT}`, notes: `notes of ${String(r.id)}: ${UTF8_TEXT}` } : r.id === "wb-c3" ? { ...r, notes: UTF8_TEXT } : r,
  );
}

/**
 * K3's big-shard fixture with UTF8_TEXT after its closed row's note (wb-xkto, refusal #4 of wb-137f U2): its one month shard outweighs
 * its ASCII main export and holds more UTF-8 bytes than UTF-16 code units. C7 and K3 plant it at the ceiling.
 */
function utf8BigShardRows(): Row[] {
  return [row("wb-o1", "open"), row("wb-c9", "closed", { closed_at: "2026-11-03T08:00:00Z", notes: `${"x".repeat(4000)} ${UTF8_TEXT}` })];
}

/** The text of a file decoded as UTF-8 by a decoder of its own: invalid UTF-8 throws, and a byte order mark is kept. */
const utf8Of = (path: string): string => new TextDecoder("utf-8", { fatal: true, ignoreBOM: true }).decode(readFileSync(path));

/**
 * wb-tt43 (owner ruling 2026-11-08 on the bead, OVERFLOW-CONTINUATION SHARDS): continuation shard names, issues-closed-YYYY-MM-X.jsonl
 * with X one lower-case letter b to z, that M1 plants as an archive's only shard beside a main export and passes alone to
 * compactTrackerExport: -b, -c and -z of 2026-11, -b of 2026-01, -y of 2026-12, and the years 0000 and 9999. P3 holds this table and
 * the module header's list of it.
 */
const CONTINUATION_NAMES_IN_THE_FORM: readonly string[] = [
  "issues-closed-2026-11-b.jsonl",
  "issues-closed-2026-11-c.jsonl",
  "issues-closed-2026-11-z.jsonl",
  "issues-closed-2026-01-b.jsonl",
  "issues-closed-2026-12-y.jsonl",
  "issues-closed-0000-01-b.jsonl",
  "issues-closed-9999-12-z.jsonl",
];

/**
 * Names beside the continuation form that M1 plants the same way, each never a shard (wb-tt43): the letter a (a month's monthly shard
 * is its first shard), an upper-case letter, two letters, a digit, no letter, no dash and an underscore before the letter, two dashes,
 * two suffixes, a day shard's name with a letter, a month 13 and a month 00, another extension, a backup suffix, a prefix, and the name
 * in upper case. P3 holds this table and the module header's list of it.
 */
const CONTINUATION_NAMES_OUTSIDE_THE_FORM: readonly string[] = [
  "issues-closed-2026-11-a.jsonl",
  "issues-closed-2026-11-B.jsonl",
  "issues-closed-2026-11-bb.jsonl",
  "issues-closed-2026-11-1.jsonl",
  "issues-closed-2026-11-.jsonl",
  "issues-closed-2026-11b.jsonl",
  "issues-closed-2026-11_b.jsonl",
  "issues-closed-2026-11--b.jsonl",
  "issues-closed-2026-11-b-c.jsonl",
  "issues-closed-2026-11-03-b.jsonl",
  "issues-closed-2026-13-b.jsonl",
  "issues-closed-2026-00-b.jsonl",
  "issues-closed-2026-11-b.json",
  "issues-closed-2026-11-b.jsonl.bak",
  "old-issues-closed-2026-11-b.jsonl",
  "ISSUES-CLOSED-2026-11-B.JSONL",
];

/** A shard file's name: a month's monthly shard or one of its continuations, -b to -z (wb-tt43; the suite's own, not the module's). */
const SHARD_FILE_NAME = /^issues-closed-\d{4}-(?:0[1-9]|1[0-2])(?:-[b-z])?\.jsonl$/;

/**
 * Name order (wb-tt43): a month's continuations after its monthly shard, in letter order, and before the next month's shards; the
 * order of the names' text otherwise. The suite's own key, not the module's: a continuation's letter moved after its monthly shard's name.
 */
const NAME_ORDER_SEPARATOR = String.fromCodePoint(0);
const nameOrderKey = (name: string): string => name.replace(/^(issues-closed-\d{4}-(?:0[1-9]|1[0-2]))-([b-z])\.jsonl$/, `$1.jsonl${NAME_ORDER_SEPARATOR}$2`);
const byNameOrder = (a: string, b: string): number => {
  const left = nameOrderKey(a);
  const right = nameOrderKey(b);
  return left < right ? -1 : left > right ? 1 : 0;
};

/**
 * The shard files of the archive directory beside a main export, each decoded by utf8Of: regular files of the shard form - a monthly
 * shard's or a continuation's (wb-tt43) - in name order.
 */
function shardFilesBeside(main: string): [string, string][] {
  const archive = join(dirname(main), "archive");
  if (!existsSync(archive) || !lstatSync(archive).isDirectory()) return [];
  return readdirSync(archive, { withFileTypes: true })
    .filter(entry => entry.isFile() && SHARD_FILE_NAME.test(entry.name))
    .map(entry => [entry.name, utf8Of(join(archive, entry.name))] as [string, string])
    .sort(([a], [b]) => byNameOrder(a, b));
}

/** How many lines two texts differ in, line by line: a count to report, never a diff of two exports. */
function differingLines(a: string, b: string): number {
  const left = a.split("\n");
  const right = b.split("\n");
  let count = 0;
  for (let index = 0; index < Math.max(left.length, right.length); index += 1) if (left[index] !== right[index]) count += 1;
  return count;
}

/**
 * File names outside the shard form issues-closed-YYYY-MM.jsonl (YYYY four digits, MM 01 to 12) that R4 plants beside a main export,
 * C9 passes to compactTrackerExport and K5 plants in the archive at the CLI (wb-137f refusal #3 U2, GP1-01..05): each is a regular
 * file of a stale body, never a shard. P2 holds this table's shape and the module header's list of it.
 */
const NAMES_OUTSIDE_THE_FORM: readonly string[] = [
  "README.md",
  "issues-closed-2026-11-03.jsonl",
  "issues-closed-2026-00.jsonl",
  "issues-closed-2026-13.jsonl",
  "issues-closed-2026-14.jsonl",
  "issues-closed-2026-20.jsonl",
  "issues-closed-2026-1.jsonl",
  "issues-closed-2026-.jsonl",
  "issues-closed-202611.jsonl",
  "issues-closed-202-11.jsonl",
  "issues-closed-20261-11.jsonl",
  "issues-closed-YYYY-11.jsonl",
  "issues-closed-2026-11.jsonl.bak",
  "old-issues-closed-2026-11.jsonl",
  "ISSUES-CLOSED-2026-11.JSONL",
  "issues-closed-2026-11.json",
  "issues-closed-2026-11xjsonl",
];

/** Shard file names in the form that R4 and C9 plant as each archive's only shard: each month 01 to 12, and the years 0000, 1999 and 9999. P2 holds this table. */
const SHARD_NAMES_IN_THE_FORM: readonly string[] = [
  ...Array.from({ length: 12 }, (_, index) => `issues-closed-2026-${String(index + 1).padStart(2, "0")}.jsonl`),
  "issues-closed-0000-01.jsonl",
  "issues-closed-1999-01.jsonl",
  "issues-closed-9999-12.jsonl",
];

/**
 * Statuses that are not "closed" which R6 sets on a stub-shaped row beside an archive and C2 on a full row (wb-137f refusal #3 U4,
 * GP1-08): two in other letter cases, "closed" with a space or a tab around it, with a newline after it, and inside a longer word.
 * P2 holds this table's shape (each as its JSON string) and the module header's list of it.
 */
const STATUSES_NOT_CLOSED: readonly string[] = ["open", "Closed", "CLOSED", "closed ", " closed", "closed\t", "closed\n", "unclosed", "closedx"];

/**
 * Fields beyond STUB_FIELDS that R5 adds, one at a time, to a closed row of STUB_FIELDS beside an archive, and C8 to such a row in a
 * full export (wb-137f refusal #3 U4, GP1-09): an underscore field, two body fields, another stamp field, a number, an array, a longer
 * name that begins with a stub field's name, and a shorter one inside a stub field's name. P2 holds this table and the module header's list of it.
 */
const FIELDS_BEYOND_STUB: readonly string[] = ["_note", "notes", "description", "created_at", "priority", "labels", "titles", "type"];

/**
 * A list the module header names in its PLANTED SHARD LINES block, read back: the text after `  <key>: ` on its line, joined with its
 * continuation lines (indented four spaces past the comment's "* "), split at " | ". An absent key reads as no list.
 */
function headerList(key: string): string[] {
  const source = readFileSync(TOOL, "utf8");
  const lines = source
    .slice(0, source.indexOf("*/"))
    .split("\n")
    .map(line => line.replace(/^ \* ?/, ""));
  const start = lines.findIndex(line => line.startsWith(`  ${key}: `));
  if (start === -1) return [];
  const parts = [(lines[start] ?? "").slice(`  ${key}: `.length)];
  for (const line of lines.slice(start + 1)) {
    if (!line.startsWith("    ")) break;
    parts.push(line.trim());
  }
  return parts.join(" ").split(" | ");
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

  it("C2 NON-CLOSED BYTE-EQUAL: every non-closed line of the main export is its full-export line, in the full export's row order - the fixture's, a row with each status of STATUSES_NOT_CLOSED, rows holding UTF8_CHARACTERS, a line of spaced JSON and a line holding a \\u escape; and a closed line of spaced JSON goes to its shard byte for byte", () => {
    const rows = fixtureRows();
    const full = textOf(rows);
    const result = compactTrackerExport({ full, shards: new Map(), now: "2026-11-03T12:00:00Z" });
    if (!result.ok) throw new Error(result.lines.join("\n"));
    const mainLines = linesOf(result.main);
    expect(mainLines.map(line => parsed(line).id)).toEqual(rows.map(r => r.id));
    const openLines = rows.filter(r => r.status !== "closed").map(lineOf);
    expect(mainLines.filter(line => parsed(line).status !== "closed")).toEqual(openLines);
    expect(result.main.endsWith("\n")).toBe(true);
    // wb-137f refusal #3 U1 and U4 (GP1-08 at the compaction's own status test): lines that are not closed, kept as they are.
    const statusLines = STATUSES_NOT_CLOSED.map((status, index) => lineOf(row(`wb-s${index}`, status)));
    const spaced = `{"_type": "issue", "id": "wb-sp", "title": "a spaced line", "status": "open"}`;
    const escaped = `{"_type":"issue","id":"wb-es","title":"an escape: caf\\u00e9","status":"open"}`;
    expect(JSON.parse(escaped).title).toBe(`an escape: caf${String.fromCodePoint(0xe9)}`);
    const kept = [...statusLines, ...textOf(utf8Rows().filter(r => r.status !== "closed")).split("\n").filter(line => line.length > 0), spaced, escaped];
    const closedSpaced = `{"_type": "issue", "id": "wb-cs", "title": "a spaced closed line", "status": "closed", "closed_at": "2026-11-02T00:00:00Z", "notes": "a body"}`;
    const mixed = `${[...kept, closedSpaced].join("\n")}\n`;
    const compacted = compactTrackerExport({ full: mixed, shards: new Map(), now: "2026-11-03T12:00:00Z" });
    if (!compacted.ok) throw new Error(compacted.lines.join("\n"));
    expect(linesOf(compacted.main).slice(0, kept.length), "each line that is not closed, byte for byte").toEqual(kept);
    expect([...compacted.shards], "the spaced closed line, byte for byte, in its month's shard").toEqual([["issues-closed-2026-11.jsonl", `${closedSpaced}\n`]]);
    expect(rehydrateTrackerText(compacted.main, compacted.shards)).toBe(mixed);
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

  it("C7 CEILING at each of its eighteen plants - the fixture's main export; the UTF-8 fixture's main export; the open-rows fixture's main export; the UTF-8 open-rows fixture's main export; the closed-rows fixture's main export; the UTF-8 closed-rows fixture's main export; the big-shard fixture's run-month shard, which the run creates; the UTF-8 big-shard fixture's run-month shard, which the run creates; the gap-month fixture's past-month shard, which the run creates; the UTF-8 gap-month fixture's past-month shard, which the run creates; the growing fixture's run-month shard, which exists before the run and grows; the UTF-8 growing fixture's run-month shard, which exists before the run and grows; the sealed fixture's past-month shard, which the run does not append to; the UTF-8 sealed fixture's past-month shard, which the run does not append to; the re-run fixture's run-month shard, which the run does not append to; the UTF-8 re-run fixture's run-month shard, which the run does not append to; the later-month fixture's later-month shard, which the run does not append to; the UTF-8 later-month fixture's later-month shard, which the run does not append to - at every plant but the two growing ones compactTrackerExport refuses as oversize with exactly one typed line naming the plant's file and the UTF-8 bytes the unrefused run gives it, at a ceiling of those bytes and at one byte under them, and at the two growing ones passes there, the shard kept and the run's line its -b continuation; at every plant it passes at one byte over them; the file is the unrefused run's largest, every other file under it, and holds fewer UTF-16 code units than UTF-8 bytes exactly at the nine UTF-8 plants; and, over the fixture, a ceiling at its main export's bytes refuses naming that file, one at its run-month shard's bytes names the main export alone (the shard's second line goes to -b), and one byte over every file passes", ({ task }) => {
    const full = textOf(fixtureRows());
    const open = compactTrackerExport({ full, shards: new Map(), now: "2026-11-03T12:00:00Z" });
    if (!open.ok) throw new Error(open.lines.join("\n"));
    const mainBytes = Buffer.byteLength(open.main);
    const shardBytes = Buffer.byteLength(open.shards.get("issues-closed-2026-11.jsonl") ?? "");
    // wb-tt43 (owner ruling 2026-11-08, OVERFLOW-CONTINUATION SHARDS): at a ceiling of the run-month shard's bytes its second line, wb-c3's,
    // would put it at the ceiling while an empty shard holds that line under it, so the line goes to the shard's -b continuation and no
    // shard is at or over the ceiling; the main export, larger than the shard, is, and the run refuses naming it alone.
    expect(mainBytes, "the fixture's main export outweighs its run-month shard").toBeGreaterThan(shardBytes);
    const atShard = compactTrackerExport({ full, shards: new Map(), now: "2026-11-03T12:00:00Z", ceiling: shardBytes });
    expect(atShard).toEqual({
      ok: false,
      code: "oversize",
      lines: [`tracker-export: REFUSED .beads/issues.jsonl would be ${mainBytes} bytes, at or over the soft ceiling of ${shardBytes} bytes (FW_EXPORT_SOFT_CEILING); nothing is written`],
    });
    const atMain = compactTrackerExport({ full, shards: new Map(), now: "2026-11-03T12:00:00Z", ceiling: mainBytes });
    expect(atMain.ok).toBe(false);
    if (atMain.ok) return;
    expect(atMain.lines.filter(line => line.includes(".beads/issues.jsonl"))).toEqual([
      `tracker-export: REFUSED .beads/issues.jsonl would be ${mainBytes} bytes, at or over the soft ceiling of ${mainBytes} bytes (FW_EXPORT_SOFT_CEILING); nothing is written`,
    ]);
    const under = compactTrackerExport({ full, shards: new Map(), now: "2026-11-03T12:00:00Z", ceiling: Math.max(mainBytes, shardBytes) + 1 });
    expect(under.ok).toBe(true);
    // A shard the run does not append to - a sealed month's, holding a row the full export no longer carries - at the ceiling.
    const big = `${lineOf(row("wb-c9", "closed", { closed_at: "2026-09-15T00:00:00Z", notes: "x".repeat(4096) }))}\n`;
    const bigBytes = Buffer.byteLength(big);
    expect(bigBytes).toBeGreaterThan(Math.max(mainBytes, shardBytes));
    const untouched = compactTrackerExport({ full, shards: new Map([["issues-closed-2026-09.jsonl", big]]), now: "2026-11-03T12:00:00Z", ceiling: bigBytes });
    expect(untouched).toEqual({
      ok: false,
      code: "oversize",
      lines: [`tracker-export: REFUSED .beads/archive/issues-closed-2026-09.jsonl would be ${bigBytes} bytes, at or over the soft ceiling of ${bigBytes} bytes (FW_EXPORT_SOFT_CEILING); nothing is written`],
    });
    const passes = compactTrackerExport({ full, shards: new Map([["issues-closed-2026-09.jsonl", big]]), now: "2026-11-03T12:00:00Z", ceiling: bigBytes + 1 });
    if (!passes.ok) throw new Error(passes.lines.join("\n"));
    expect(passes.appended.has("issues-closed-2026-09.jsonl")).toBe(false);
    // wb-xkto (refusal #4 of wb-137f, U2: GP45-04, GP45-05; witness W-GP45-04/05): the ceiling counts UTF-8 bytes. Each file below holds
    // text beyond ASCII - more UTF-8 bytes than UTF-16 code units - and is alone at its ceiling: the UTF-8 fixture's main export, the
    // UTF-8 big-shard fixture's shard the run appends to, and a sealed month's shard the run does not append to. Each refuses as oversize
    // with the one typed line naming its UTF-8 bytes, and one byte over it passes.
    const unitsUnderBytes = (text: string): boolean => text.length < Buffer.byteLength(text);
    const oversizeLine = (file: string, bytes: number): string => `tracker-export: REFUSED .beads/${file} would be ${bytes} bytes, at or over the soft ceiling of ${bytes} bytes (FW_EXPORT_SOFT_CEILING); nothing is written`;
    const utf8Full = textOf(utf8Rows());
    const utf8Open = compactTrackerExport({ full: utf8Full, shards: new Map(), now: "2026-11-03T12:00:00Z" });
    if (!utf8Open.ok) throw new Error(utf8Open.lines.join("\n"));
    const utf8MainBytes = Buffer.byteLength(utf8Open.main);
    expect([unitsUnderBytes(utf8Open.main), [...utf8Open.shards.values()].every(shard => Buffer.byteLength(shard) < utf8MainBytes)], "the UTF-8 main export: more bytes than code units, every shard under it").toEqual([true, true]);
    expect(compactTrackerExport({ full: utf8Full, shards: new Map(), now: "2026-11-03T12:00:00Z", ceiling: utf8MainBytes }), "the UTF-8 main export at its ceiling").toEqual({ ok: false, code: "oversize", lines: [oversizeLine("issues.jsonl", utf8MainBytes)] });
    expect(compactTrackerExport({ full: utf8Full, shards: new Map(), now: "2026-11-03T12:00:00Z", ceiling: utf8MainBytes + 1 }).ok, "one byte over the UTF-8 main export").toBe(true);
    const bigFull = textOf(utf8BigShardRows());
    const bigOpen = compactTrackerExport({ full: bigFull, shards: new Map(), now: "2026-11-03T12:00:00Z" });
    if (!bigOpen.ok) throw new Error(bigOpen.lines.join("\n"));
    const appendedShard = bigOpen.shards.get("issues-closed-2026-11.jsonl") ?? "";
    const appendedBytes = Buffer.byteLength(appendedShard);
    expect([bigOpen.appended.has("issues-closed-2026-11.jsonl"), unitsUnderBytes(appendedShard), Buffer.byteLength(bigOpen.main) < appendedBytes], "the UTF-8 big shard: appended to, more bytes than code units, the main export under it").toEqual([true, true, true]);
    expect(compactTrackerExport({ full: bigFull, shards: new Map(), now: "2026-11-03T12:00:00Z", ceiling: appendedBytes }), "the UTF-8 shard the run appends to at its ceiling").toEqual({ ok: false, code: "oversize", lines: [oversizeLine("archive/issues-closed-2026-11.jsonl", appendedBytes)] });
    expect(compactTrackerExport({ full: bigFull, shards: new Map(), now: "2026-11-03T12:00:00Z", ceiling: appendedBytes + 1 }).ok, "one byte over the UTF-8 shard the run appends to").toBe(true);
    const sealedUtf8 = `${lineOf(row("wb-c9", "closed", { closed_at: "2026-09-15T00:00:00Z", notes: `${"x".repeat(4096)} ${UTF8_TEXT}` }))}\n`;
    const sealedBytes = Buffer.byteLength(sealedUtf8);
    expect([unitsUnderBytes(sealedUtf8), sealedBytes > Math.max(mainBytes, shardBytes)], "the sealed UTF-8 shard: more bytes than code units, over every file the run writes").toEqual([true, true]);
    expect(compactTrackerExport({ full, shards: new Map([["issues-closed-2026-09.jsonl", sealedUtf8]]), now: "2026-11-03T12:00:00Z", ceiling: sealedBytes }), "the sealed UTF-8 shard at its ceiling").toEqual({ ok: false, code: "oversize", lines: [oversizeLine("archive/issues-closed-2026-09.jsonl", sealedBytes)] });
    const sealedPasses = compactTrackerExport({ full, shards: new Map([["issues-closed-2026-09.jsonl", sealedUtf8]]), now: "2026-11-03T12:00:00Z", ceiling: sealedBytes + 1 });
    if (!sealedPasses.ok) throw new Error(sealedPasses.lines.join("\n"));
    expect(sealedPasses.appended.has("issues-closed-2026-09.jsonl"), "one byte over the sealed UTF-8 shard: passes, not appended to").toBe(false);
    // wb-xkto (refusal #1 of wb-xkto, U4: GX8-10, GX8-12, GX8-15; U5: GX8-13, GX8-14; witnesses W-GX8-10/12/15 and W-GX8-13/14): the
    // eighteen plants of the module header's C7 CEILING PLANTS. Each names one file of one fixture's unrefused run (the default ceiling),
    // that run's largest file, every other file under it; its forms read every file the run writes against that file's bytes, each shard
    // with whether the run appends to it and whether it existed before the run. The main export is planted over a full export holding
    // open and closed rows, open rows only and closed rows only; a shard the run appends to, one it creates of the run's month and of a
    // past month, and one that exists before the run; a shard it does not append to, of a past month, of the run's month on a re-run and
    // of a later month - each over ASCII rows and over rows holding UTF8_TEXT. At a ceiling of the file's bytes, and of one byte under
    // them, the run refuses as oversize with the one typed line naming the file; at one byte over them it passes.
    type CeilingInput = { readonly full: string; readonly shards: ReadonlyMap<string, string> };
    const plantNow = "2026-11-03T12:00:00Z";
    const beyond = ` ${UTF8_TEXT}`;
    const closedLine = (id: string, closedAt: string, notes: string): string => `${lineOf(row(id, "closed", { closed_at: closedAt, notes }))}\n`;
    const closedRowsOf = (suffix: string): Row[] =>
      [["wb-c1", "2026-09-15T00:00:00Z"], ["wb-c2", "2026-10-15T00:00:00Z"], ["wb-c3", "2026-11-02T00:00:00Z"]].map(([id = "", at = ""]) => row(id, "closed", { closed_at: at, title: `title of ${id}${suffix}` }));
    const reRun = (notes: string): CeilingInput => {
      const reRunFull = textOf([row("wb-o1", "open"), row("wb-c1", "closed", { closed_at: "2026-11-02T08:00:00Z", notes })]);
      const first = compactTrackerExport({ full: reRunFull, shards: new Map<string, string>(), now: plantNow });
      if (!first.ok) throw new Error(first.lines.join("\n"));
      expect([...first.appended.keys()], "the re-run fixture's first run appends to the run-month shard").toEqual(["issues-closed-2026-11.jsonl"]);
      return { full: reRunFull, shards: first.shards };
    };
    const ceilingInputs = {
      fixture: (): CeilingInput => ({ full: textOf(fixtureRows()), shards: new Map<string, string>() }),
      utf8: (): CeilingInput => ({ full: textOf(utf8Rows()), shards: new Map<string, string>() }),
      openRows: (): CeilingInput => ({ full: textOf([row("wb-o1", "open"), row("wb-p1", "in_progress")]), shards: new Map<string, string>() }),
      utf8OpenRows: (): CeilingInput => ({ full: textOf([row("wb-o1", "open", { title: `title of wb-o1${beyond}`, notes: UTF8_TEXT }), row("wb-p1", "in_progress")]), shards: new Map<string, string>() }),
      closedRows: (): CeilingInput => ({ full: textOf(closedRowsOf("")), shards: new Map<string, string>() }),
      utf8ClosedRows: (): CeilingInput => ({ full: textOf(closedRowsOf(beyond)), shards: new Map<string, string>() }),
      bigShard: (): CeilingInput => ({ full: textOf([row("wb-o1", "open"), row("wb-c9", "closed", { closed_at: "2026-11-03T08:00:00Z", notes: "x".repeat(4000) })]), shards: new Map<string, string>() }),
      utf8BigShard: (): CeilingInput => ({ full: textOf(utf8BigShardRows()), shards: new Map<string, string>() }),
      gapMonth: (): CeilingInput => ({ full: textOf([row("wb-o1", "open"), row("wb-c9", "closed", { closed_at: "2026-10-15T08:00:00Z", notes: "x".repeat(4000) })]), shards: new Map<string, string>() }),
      utf8GapMonth: (): CeilingInput => ({ full: textOf([row("wb-o1", "open"), row("wb-c9", "closed", { closed_at: "2026-10-15T08:00:00Z", notes: `${"x".repeat(4000)}${beyond}` })]), shards: new Map<string, string>() }),
      growing: (): CeilingInput => ({
        full: textOf([row("wb-o1", "open"), row("wb-c9", "closed", { closed_at: "2026-11-02T08:00:00Z", notes: "x".repeat(2000) })]),
        shards: new Map([["issues-closed-2026-11.jsonl", closedLine("wb-c8", "2026-11-01T08:00:00Z", "x".repeat(2000))]]),
      }),
      utf8Growing: (): CeilingInput => ({
        full: textOf([row("wb-o1", "open"), row("wb-c9", "closed", { closed_at: "2026-11-02T08:00:00Z", notes: `${"x".repeat(2000)}${beyond}` })]),
        shards: new Map([["issues-closed-2026-11.jsonl", closedLine("wb-c8", "2026-11-01T08:00:00Z", `${"x".repeat(2000)}${beyond}`)]]),
      }),
      sealed: (): CeilingInput => ({ full: textOf(fixtureRows()), shards: new Map([["issues-closed-2026-09.jsonl", closedLine("wb-c9", "2026-09-15T00:00:00Z", "x".repeat(4096))]]) }),
      utf8Sealed: (): CeilingInput => ({ full: textOf(fixtureRows()), shards: new Map([["issues-closed-2026-09.jsonl", closedLine("wb-c9", "2026-09-15T00:00:00Z", `${"x".repeat(4096)}${beyond}`)]]) }),
      rerun: (): CeilingInput => reRun("n".repeat(1000)),
      utf8Rerun: (): CeilingInput => reRun(`${"n".repeat(1000)}${beyond}`),
      laterMonth: (): CeilingInput => ({ full: textOf(fixtureRows()), shards: new Map([["issues-closed-2026-12.jsonl", closedLine("wb-c9", "2026-12-15T00:00:00Z", "x".repeat(4096))]]) }),
      utf8LaterMonth: (): CeilingInput => ({ full: textOf(fixtureRows()), shards: new Map([["issues-closed-2026-12.jsonl", closedLine("wb-c9", "2026-12-15T00:00:00Z", `${"x".repeat(4096)}${beyond}`)]]) }),
    } satisfies Record<string, () => CeilingInput>;
    /** The inputs whose rows hold UTF8_TEXT: at their plants the file holds fewer UTF-16 code units than UTF-8 bytes. */
    const utf8Inputs: ReadonlySet<keyof typeof ceilingInputs> = new Set<keyof typeof ceilingInputs>(["utf8", "utf8OpenRows", "utf8ClosedRows", "utf8BigShard", "utf8GapMonth", "utf8Growing", "utf8Sealed", "utf8Rerun", "utf8LaterMonth"]);
    const c7Plants: readonly { readonly plant: string; readonly input: keyof typeof ceilingInputs; readonly file: string; readonly forms: readonly string[] }[] = [
      { plant: "the fixture's main export", input: "fixture", file: "issues.jsonl", forms: ["issues.jsonl:at", "archive/issues-closed-2026-10.jsonl:under:appended:created", "archive/issues-closed-2026-11.jsonl:under:appended:created"] },
      { plant: "the UTF-8 fixture's main export", input: "utf8", file: "issues.jsonl", forms: ["issues.jsonl:at", "archive/issues-closed-2026-10.jsonl:under:appended:created", "archive/issues-closed-2026-11.jsonl:under:appended:created"] },
      { plant: "the open-rows fixture's main export", input: "openRows", file: "issues.jsonl", forms: ["issues.jsonl:at"] },
      { plant: "the UTF-8 open-rows fixture's main export", input: "utf8OpenRows", file: "issues.jsonl", forms: ["issues.jsonl:at"] },
      { plant: "the closed-rows fixture's main export", input: "closedRows", file: "issues.jsonl", forms: ["issues.jsonl:at", "archive/issues-closed-2026-09.jsonl:under:appended:created", "archive/issues-closed-2026-10.jsonl:under:appended:created", "archive/issues-closed-2026-11.jsonl:under:appended:created"] },
      { plant: "the UTF-8 closed-rows fixture's main export", input: "utf8ClosedRows", file: "issues.jsonl", forms: ["issues.jsonl:at", "archive/issues-closed-2026-09.jsonl:under:appended:created", "archive/issues-closed-2026-10.jsonl:under:appended:created", "archive/issues-closed-2026-11.jsonl:under:appended:created"] },
      { plant: "the big-shard fixture's run-month shard, which the run creates", input: "bigShard", file: "archive/issues-closed-2026-11.jsonl", forms: ["issues.jsonl:under", "archive/issues-closed-2026-11.jsonl:at:appended:created"] },
      { plant: "the UTF-8 big-shard fixture's run-month shard, which the run creates", input: "utf8BigShard", file: "archive/issues-closed-2026-11.jsonl", forms: ["issues.jsonl:under", "archive/issues-closed-2026-11.jsonl:at:appended:created"] },
      { plant: "the gap-month fixture's past-month shard, which the run creates", input: "gapMonth", file: "archive/issues-closed-2026-10.jsonl", forms: ["issues.jsonl:under", "archive/issues-closed-2026-10.jsonl:at:appended:created"] },
      { plant: "the UTF-8 gap-month fixture's past-month shard, which the run creates", input: "utf8GapMonth", file: "archive/issues-closed-2026-10.jsonl", forms: ["issues.jsonl:under", "archive/issues-closed-2026-10.jsonl:at:appended:created"] },
      { plant: "the growing fixture's run-month shard, which exists before the run and grows", input: "growing", file: "archive/issues-closed-2026-11.jsonl", forms: ["issues.jsonl:under", "archive/issues-closed-2026-11.jsonl:at:appended:existed"] },
      { plant: "the UTF-8 growing fixture's run-month shard, which exists before the run and grows", input: "utf8Growing", file: "archive/issues-closed-2026-11.jsonl", forms: ["issues.jsonl:under", "archive/issues-closed-2026-11.jsonl:at:appended:existed"] },
      { plant: "the sealed fixture's past-month shard, which the run does not append to", input: "sealed", file: "archive/issues-closed-2026-09.jsonl", forms: ["issues.jsonl:under", "archive/issues-closed-2026-09.jsonl:at:kept:existed", "archive/issues-closed-2026-10.jsonl:under:appended:created", "archive/issues-closed-2026-11.jsonl:under:appended:created"] },
      { plant: "the UTF-8 sealed fixture's past-month shard, which the run does not append to", input: "utf8Sealed", file: "archive/issues-closed-2026-09.jsonl", forms: ["issues.jsonl:under", "archive/issues-closed-2026-09.jsonl:at:kept:existed", "archive/issues-closed-2026-10.jsonl:under:appended:created", "archive/issues-closed-2026-11.jsonl:under:appended:created"] },
      { plant: "the re-run fixture's run-month shard, which the run does not append to", input: "rerun", file: "archive/issues-closed-2026-11.jsonl", forms: ["issues.jsonl:under", "archive/issues-closed-2026-11.jsonl:at:kept:existed"] },
      { plant: "the UTF-8 re-run fixture's run-month shard, which the run does not append to", input: "utf8Rerun", file: "archive/issues-closed-2026-11.jsonl", forms: ["issues.jsonl:under", "archive/issues-closed-2026-11.jsonl:at:kept:existed"] },
      { plant: "the later-month fixture's later-month shard, which the run does not append to", input: "laterMonth", file: "archive/issues-closed-2026-12.jsonl", forms: ["issues.jsonl:under", "archive/issues-closed-2026-11.jsonl:under:appended:created", "archive/issues-closed-2026-12.jsonl:at:kept:existed"] },
      { plant: "the UTF-8 later-month fixture's later-month shard, which the run does not append to", input: "utf8LaterMonth", file: "archive/issues-closed-2026-12.jsonl", forms: ["issues.jsonl:under", "archive/issues-closed-2026-11.jsonl:under:appended:created", "archive/issues-closed-2026-12.jsonl:at:kept:existed"] },
    ];
    expect(c7Plants.map(entry => `${entry.input}|${entry.plant}|${entry.forms.join(",")}`), "C7's eighteen ceiling plants (frozen shape)").toEqual([
      "fixture|the fixture's main export|issues.jsonl:at,archive/issues-closed-2026-10.jsonl:under:appended:created,archive/issues-closed-2026-11.jsonl:under:appended:created",
      "utf8|the UTF-8 fixture's main export|issues.jsonl:at,archive/issues-closed-2026-10.jsonl:under:appended:created,archive/issues-closed-2026-11.jsonl:under:appended:created",
      "openRows|the open-rows fixture's main export|issues.jsonl:at",
      "utf8OpenRows|the UTF-8 open-rows fixture's main export|issues.jsonl:at",
      "closedRows|the closed-rows fixture's main export|issues.jsonl:at,archive/issues-closed-2026-09.jsonl:under:appended:created,archive/issues-closed-2026-10.jsonl:under:appended:created,archive/issues-closed-2026-11.jsonl:under:appended:created",
      "utf8ClosedRows|the UTF-8 closed-rows fixture's main export|issues.jsonl:at,archive/issues-closed-2026-09.jsonl:under:appended:created,archive/issues-closed-2026-10.jsonl:under:appended:created,archive/issues-closed-2026-11.jsonl:under:appended:created",
      "bigShard|the big-shard fixture's run-month shard, which the run creates|issues.jsonl:under,archive/issues-closed-2026-11.jsonl:at:appended:created",
      "utf8BigShard|the UTF-8 big-shard fixture's run-month shard, which the run creates|issues.jsonl:under,archive/issues-closed-2026-11.jsonl:at:appended:created",
      "gapMonth|the gap-month fixture's past-month shard, which the run creates|issues.jsonl:under,archive/issues-closed-2026-10.jsonl:at:appended:created",
      "utf8GapMonth|the UTF-8 gap-month fixture's past-month shard, which the run creates|issues.jsonl:under,archive/issues-closed-2026-10.jsonl:at:appended:created",
      "growing|the growing fixture's run-month shard, which exists before the run and grows|issues.jsonl:under,archive/issues-closed-2026-11.jsonl:at:appended:existed",
      "utf8Growing|the UTF-8 growing fixture's run-month shard, which exists before the run and grows|issues.jsonl:under,archive/issues-closed-2026-11.jsonl:at:appended:existed",
      "sealed|the sealed fixture's past-month shard, which the run does not append to|issues.jsonl:under,archive/issues-closed-2026-09.jsonl:at:kept:existed,archive/issues-closed-2026-10.jsonl:under:appended:created,archive/issues-closed-2026-11.jsonl:under:appended:created",
      "utf8Sealed|the UTF-8 sealed fixture's past-month shard, which the run does not append to|issues.jsonl:under,archive/issues-closed-2026-09.jsonl:at:kept:existed,archive/issues-closed-2026-10.jsonl:under:appended:created,archive/issues-closed-2026-11.jsonl:under:appended:created",
      "rerun|the re-run fixture's run-month shard, which the run does not append to|issues.jsonl:under,archive/issues-closed-2026-11.jsonl:at:kept:existed",
      "utf8Rerun|the UTF-8 re-run fixture's run-month shard, which the run does not append to|issues.jsonl:under,archive/issues-closed-2026-11.jsonl:at:kept:existed",
      "laterMonth|the later-month fixture's later-month shard, which the run does not append to|issues.jsonl:under,archive/issues-closed-2026-11.jsonl:under:appended:created,archive/issues-closed-2026-12.jsonl:at:kept:existed",
      "utf8LaterMonth|the UTF-8 later-month fixture's later-month shard, which the run does not append to|issues.jsonl:under,archive/issues-closed-2026-11.jsonl:under:appended:created,archive/issues-closed-2026-12.jsonl:at:kept:existed",
    ]);
    // The plant labels against the module header's C7 CEILING PLANTS list, an anchor outside the suite, and against the title.
    expect(headerList("C7 ceiling plants"), "the module header's C7 ceiling plants").toEqual(c7Plants.map(entry => entry.plant));
    expect(task.name.split(" - ")[1]?.split("; "), "the title names exactly C7's ceiling plants, in order").toEqual(c7Plants.map(entry => entry.plant));
    const countWords = ["no", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen", "twenty"];
    expect(task.name.startsWith(`C7 CEILING at each of its ${countWords[c7Plants.length]} plants - `), "the title counts C7's ceiling plants").toBe(true);
    const plantLine = (file: string, bytes: number, ceiling: number): string =>
      `tracker-export: REFUSED .beads/${file} would be ${bytes} bytes, at or over the soft ceiling of ${ceiling} bytes (FW_EXPORT_SOFT_CEILING); nothing is written`;
    // wb-tt43 (owner ruling 2026-11-08, OVERFLOW-CONTINUATION SHARDS): at the two growing plants the shard exists before the run and holds
    // a line, and the run's line would put it at or over the ceiling while an empty shard holds that line under it - so at a ceiling of
    // the shard's bytes and of one byte under them the run passes, the shard keeping its bytes and the run's line the whole of the
    // shard's -b continuation (M3); every other plant refuses at those two ceilings.
    const continuing: ReadonlySet<keyof typeof ceilingInputs> = new Set<keyof typeof ceilingInputs>(["growing", "utf8Growing"]);
    expect([...continuing], "the plants where the run continues (frozen shape)").toEqual(["growing", "utf8Growing"]);
    for (const { plant, input, file, forms } of c7Plants) {
      const { full: plantFull, shards: plantShards } = ceilingInputs[input]();
      const unrefused = compactTrackerExport({ full: plantFull, shards: plantShards, now: plantNow });
      if (!unrefused.ok) throw new Error(`${plant}: ${unrefused.lines.join("\n")}`);
      const files = new Map<string, string>([["issues.jsonl", unrefused.main], ...[...unrefused.shards].map(([name, text]): [string, string] => [`archive/${name}`, text])]);
      const text = files.get(file) ?? "";
      const bytes = Buffer.byteLength(text);
      const relation = (other: string): string => {
        const otherBytes = Buffer.byteLength(other);
        return otherBytes > bytes ? "over" : otherBytes === bytes ? "at" : "under";
      };
      const formOf = ([name, other]: [string, string]): string => {
        if (name === "issues.jsonl") return `${name}:${relation(other)}`;
        const shard = name.slice("archive/".length);
        return `${name}:${relation(other)}:${unrefused.appended.has(shard) ? "appended" : "kept"}:${plantShards.has(shard) ? "existed" : "created"}`;
      };
      expect([...files].map(formOf), `${plant}: the plant's forms`).toEqual(forms);
      expect(text.length < bytes, `${plant}: fewer UTF-16 code units than UTF-8 bytes exactly at the UTF-8 plants`).toBe(utf8Inputs.has(input));
      if (continuing.has(input)) {
        const shard = file.slice("archive/".length);
        const continuation = shard.replace(/\.jsonl$/, "-b.jsonl");
        const runIds = unrefused.appended.get(shard) ?? [];
        const runLines = runIds.map(id => `${linesOf(plantFull).find(line => parsed(line).id === id) ?? ""}\n`).join("");
        for (const [label, ceiling] of [["a ceiling of its bytes", bytes], ["a ceiling one byte under its bytes", bytes - 1]] as const) {
          const continued = compactTrackerExport({ full: plantFull, shards: plantShards, now: plantNow, ceiling });
          if (!continued.ok) throw new Error(`${plant}: ${label}: ${continued.lines.join("\n")}`);
          expect([[...continued.shards], [...continued.appended], continued.main === unrefused.main], `${plant}: ${label}: the shard sealed, the run's line its -b continuation`).toEqual([
            [
              [shard, plantShards.get(shard)],
              [continuation, runLines],
            ],
            [[continuation, runIds]],
            true,
          ]);
        }
      } else {
        expect(compactTrackerExport({ full: plantFull, shards: plantShards, now: plantNow, ceiling: bytes }), `${plant}: a ceiling of its bytes`).toEqual({ ok: false, code: "oversize", lines: [plantLine(file, bytes, bytes)] });
        expect(compactTrackerExport({ full: plantFull, shards: plantShards, now: plantNow, ceiling: bytes - 1 }), `${plant}: a ceiling one byte under its bytes`).toEqual({ ok: false, code: "oversize", lines: [plantLine(file, bytes, bytes - 1)] });
      }
      expect(compactTrackerExport({ full: plantFull, shards: plantShards, now: plantNow, ceiling: bytes + 1 }).ok, `${plant}: a ceiling one byte over its bytes`).toBe(true);
    }
  });

  it("C8 MALFORMED: each line below refuses as malformed - an unparseable line (each of the eight lines of whitespace alone among them), null, an array, a number or a string, a row whose id is none, empty, a number or null, a row whose status is none, a number or null, a duplicate id, and a closed row already in stub shape; that closed row with one field of FIELDS_BEYOND_STUB added (each alone) is not in stub shape and compacts, its stub without the field and its shard line the row's", () => {
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
      ["a number id", `${good}${JSON.stringify({ _type: "issue", id: 7, status: "open", title: "x" })}\n`],
      ["a null id", `${good}${JSON.stringify({ _type: "issue", id: null, status: "open", title: "x" })}\n`],
      ["no status", `${good}${JSON.stringify({ _type: "issue", id: "wb-x", title: "x" })}\n`],
      ["a number status", `${good}${JSON.stringify({ _type: "issue", id: "wb-x", status: 5, title: "x" })}\n`],
      ["a null status", `${good}${JSON.stringify({ _type: "issue", id: "wb-x", status: null, title: "x" })}\n`],
      ["duplicate", `${good}${lineOf(row("wb-o1", "open"))}\n`],
      ["a stub row: a compacted main export passed where bd's full export belongs", `${good}${JSON.stringify({ _type: "issue", id: "wb-s1", title: "stub", status: "closed", updated_at: "2026-11-03T10:00:05Z", closed_at: "2026-11-03T10:00:00Z", close_reason: "r" })}\n`],
    ];
    expect(cases).toHaveLength(22);
    for (const [label, full] of cases) {
      const result = compactTrackerExport({ full, shards: new Map(), now: "2026-11-03T12:00:00Z" });
      expect(result.ok, label).toBe(false);
      if (!result.ok) expect(result.code, label).toBe("malformed");
    }
    // wb-137f refusal #3 U4 (GP1-09): the stub row above with one field beyond STUB_FIELDS is a full closed row.
    const stubRow: Row = { _type: "issue", id: "wb-s1", title: "stub", status: "closed", updated_at: "2026-11-03T10:00:05Z", closed_at: "2026-11-03T10:00:00Z", close_reason: "r" };
    for (const field of FIELDS_BEYOND_STUB) {
      const extended = lineOf({ ...stubRow, [field]: "a field beyond the stub fields" });
      const result = compactTrackerExport({ full: `${good}${extended}\n`, shards: new Map(), now: "2026-11-03T12:00:00Z" });
      if (!result.ok) throw new Error(`${field}: ${result.lines.join("\n")}`);
      expect(linesOf(result.main).at(-1), `${field}: its stub`).toBe(lineOf(stubRow));
      expect(linesOf(result.shards.get("issues-closed-2026-11.jsonl") ?? "").at(-1), `${field}: its shard line`).toBe(extended);
      expect(rehydrateTrackerText(result.main, result.shards), field).toBe(`${good}${extended}\n`);
    }
  });

  it("C9 REFUSED INPUTS: each form below refuses as malformed with one typed line - 24 run stamps that are not UTC stamps (a fraction of no digit, an instant outside the years 0000-9999 and February 29 of 2100, a century year that is not a leap year, among them), a shard name that is not a month shard's (a day shard's, a month 00 or 13, a README, and each name of NAMES_OUTSIDE_THE_FORM alone), while each name of SHARD_NAMES_IN_THE_FORM alone is a shard's, a non-empty shard not ending with a newline in each layout of SHARD_LAYOUTS, and each of the 27 lines of BAD_SHARD_LINES at each position of PLANT_AT (line 1, 2 or 3) in each layout of SHARD_LAYOUTS (the only shard, the older or the newer of two, the middle of three), naming the shard, the line and the reason; an empty shard, and an empty line between two rows, hold no line, in each of those layouts", () => {
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
      "2026-11-03T12:00:00.Z",
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
      "2100-02-29T00:00:00Z",
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
    // wb-137f refusal #3 U2 (GP1-01..05): each name outside the form alone refuses; each name in the form alone is accepted as a shard
    // (it holds a body of wb-x1, an id the full export does not carry) and comes back with its text as its prefix.
    for (const name of NAMES_OUTSIDE_THE_FORM) {
      expect(compactTrackerExport({ full, shards: new Map([[name, shard]]), now: "2026-11-03T12:00:00Z" }), name).toEqual({
        ok: false,
        code: "malformed",
        lines: [`tracker-export: REFUSED ${name} is not a month shard name (issues-closed-YYYY-MM.jsonl); nothing is written`],
      });
    }
    const other = `${lineOf(row("wb-x1", "closed", { closed_at: "2026-11-01T00:00:00Z" }))}\n`;
    for (const name of SHARD_NAMES_IN_THE_FORM) {
      const result = compactTrackerExport({ full, shards: new Map([[name, other]]), now: "2026-11-03T12:00:00Z" });
      if (!result.ok) throw new Error(`${name}: ${result.lines.join("\n")}`);
      expect(result.shards.get(name)?.startsWith(other), `${name}: accepted as a shard, its text kept as its prefix`).toBe(true);
    }
    // wb-137f refusals #1 (U1 W8-01, U2 W8-02, U5) and #2 (U1 W2-02a/W2-02b): each shard-line form in each layout, at each position of
    // PLANT_AT; a non-empty shard not ending with a newline in each layout; an empty line between two rows in each layout holds no line.
    expect(stamps).toHaveLength(24);
    const now = "2026-11-03T12:00:00Z";
    for (const [layout, plant, whole] of SHARD_LAYOUTS) {
      for (const [label, bad, reason] of BAD_SHARD_LINES) {
        for (const [at, , text] of PLANT_AT) {
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

  it("C12 NO FINAL NEWLINE: a full export without a final newline compacts to a main export without one and reads back as the same bytes; the empty full export compacts to the empty main export with no shard, and a full export of one empty line to that line", () => {
    const full = textOf(fixtureRows()).replace(/\n$/, "");
    const result = compactTrackerExport({ full, shards: new Map(), now: "2026-11-03T12:00:00Z" });
    if (!result.ok) throw new Error(result.lines.join("\n"));
    expect(result.main.endsWith("\n")).toBe(false);
    expect(rehydrateTrackerText(result.main, result.shards)).toBe(full);
    // wb-137f refusal #3 U6 (GP1-14): the empty full export, and one empty line.
    for (const text of ["", "\n"]) {
      const empty = compactTrackerExport({ full: text, shards: new Map(), now: "2026-11-03T12:00:00Z" });
      if (!empty.ok) throw new Error(`${JSON.stringify(text)}: ${empty.lines.join("\n")}`);
      expect([empty.main, empty.shards.size, empty.appended.size, empty.rows, empty.stubs], JSON.stringify(text)).toEqual([text, 0, 0, 0, 0]);
      expect(rehydrateTrackerText(empty.main, empty.shards), JSON.stringify(text)).toBe(text);
    }
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

  it("C16 RUN STAMP FORMS: a fraction of 1 to 9 digits, Z and a +HH:MM or -HH:MM offset are UTC stamps, the offset applied before the run's month is taken - offsets of +23:59 and -23:59 among them; a leap day is a calendar day, February 29 of 2028 and of 2000; the last day of a 31-day, a 30-day and a 28-day month is one; and the first instant of the year 0000 and the last of 9999 are inside the years 0000-9999", () => {
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
      // wb-137f refusal #3 U6 (GP1-13 and the other edges of the CLI's stamp words).
      ["2000-02-29T12:00:00Z", "issues-closed-2000-02.jsonl"],
      ["2026-12-01T12:00:00+23:59", "issues-closed-2026-11.jsonl"],
      ["2026-11-30T12:00:00-23:59", "issues-closed-2026-12.jsonl"],
      ["2026-01-31T00:00:00Z", "issues-closed-2026-01.jsonl"],
      ["2026-04-30T00:00:00Z", "issues-closed-2026-04.jsonl"],
      ["2026-02-28T00:00:00Z", "issues-closed-2026-02.jsonl"],
      ["0000-01-01T00:00:00Z", "issues-closed-0000-01.jsonl"],
      ["9999-12-31T23:59:59.999999999Z", "issues-closed-9999-12.jsonl"],
    ];
    for (const [now, shard] of cases) {
      const result = compactTrackerExport({ full, shards: new Map(), now });
      if (!result.ok) throw new Error(`${now}: ${result.lines.join("\n")}`);
      expect([...result.shards.keys()], now).toEqual([shard]);
    }
  });

  it("C17 SHARD MAP ORDER: a shard Map passed out of name order - two shards in reverse name order, three in neither name order nor its reverse - is read in name order, as the same shards in name order are: an id the shards hold has the newest month's line as its latest, so compactTrackerExport appends nothing when the full export's line equals it and appends the line once to the run month's shard when it equals an older month's, and rehydrateTrackerText reads the newest month's line; and a late row of a month before the newest existing shard goes to the run month's shard, no shard of its month created", () => {
    // wb-137f refusal #2 U2 (W2-12a) and U3 (W2-15a); each Map is judged out of name order and, as the control, in name order.
    const c1 = (notes: string): Row => row("wb-c1", "closed", { closed_at: "2026-10-31T23:59:59Z", notes });
    const oldest = ["issues-closed-2026-09.jsonl", `${lineOf(c1("the oldest body"))}\n`] as const;
    const older = ["issues-closed-2026-10.jsonl", `${lineOf(c1("an older body"))}\n`] as const;
    const later = ["issues-closed-2026-11.jsonl", `${lineOf(c1("the later body"))}\n`] as const;
    const now = "2026-11-04T12:00:00Z";
    const orders = [
      ["two shards in reverse name order", new Map([later, older]), [older, later]],
      ["three shards in neither name order nor its reverse", new Map([older, later, oldest]), [oldest, older, later]],
      ["two shards in name order", new Map([older, later]), [older, later]],
      ["three shards in name order", new Map([oldest, older, later]), [oldest, older, later]],
    ] as const;
    for (const [order, shards, byName] of orders) {
      const same = compactTrackerExport({ full: textOf([row("wb-o1", "open"), c1("the later body")]), shards, now });
      if (!same.ok) throw new Error(`${order}: ${same.lines.join("\n")}`);
      expect([...same.appended], `${order}: W2-12a the export's line equals the latest`).toEqual([]);
      expect([...same.shards], `${order}: W2-12a every shard unchanged, in name order`).toEqual(byName);
      const back = compactTrackerExport({ full: textOf([row("wb-o1", "open"), c1("an older body")]), shards, now });
      if (!back.ok) throw new Error(`${order}: ${back.lines.join("\n")}`);
      expect([...back.appended], `${order}: the export's line equals the older month's, not the latest`).toEqual([["issues-closed-2026-11.jsonl", ["wb-c1"]]]);
      expect(back.shards.get("issues-closed-2026-11.jsonl"), order).toBe(`${later[1]}${lineOf(c1("an older body"))}\n`);
      const stub = linesOf(same.main)[1] ?? "";
      expect(parsed(stub).status, order).toBe("closed");
      expect(rehydrateTrackerText(`${stub}\n`, shards), `${order}: rehydrateTrackerText reads the later month's line`).toBe(`${lineOf(c1("the later body"))}\n`);
    }
    const c2 = row("wb-c2", "closed", { closed_at: "2026-11-03T08:00:00Z" });
    const c9 = row("wb-c9", "closed", { closed_at: "2026-08-15T00:00:00Z" });
    const c5 = row("wb-c5", "closed", { closed_at: "2026-10-20T00:00:00Z" });
    const nov = ["issues-closed-2026-11.jsonl", `${lineOf(c2)}\n`] as const;
    const aug = ["issues-closed-2026-08.jsonl", `${lineOf(c9)}\n`] as const;
    const c7 = row("wb-c7", "closed", { closed_at: "2026-09-10T00:00:00Z" });
    const sep = ["issues-closed-2026-09.jsonl", `${lineOf(c7)}\n`] as const;
    const routings = [
      ["two shards in reverse name order", new Map([nov, aug]), [row("wb-o1", "open"), c9, c5, c2]],
      ["three shards in neither name order nor its reverse", new Map([aug, nov, sep]), [row("wb-o1", "open"), c9, c7, c5, c2]],
      ["two shards in name order", new Map([aug, nov]), [row("wb-o1", "open"), c9, c5, c2]],
      ["three shards in name order", new Map([aug, sep, nov]), [row("wb-o1", "open"), c9, c7, c5, c2]],
    ] as const;
    for (const [order, shards, rows] of routings) {
      const result = compactTrackerExport({ full: textOf(rows), shards, now });
      if (!result.ok) throw new Error(`${order}: ${result.lines.join("\n")}`);
      expect([...result.appended], `${order}: W2-15a the late 2026-10 row goes to the run month's shard`).toEqual([["issues-closed-2026-11.jsonl", ["wb-c5"]]]);
      expect([...result.shards.keys()], `${order}: no 2026-10 shard is created`).toEqual([...shards.keys()].sort());
      expect([...result.shards.keys()], order).not.toContain("issues-closed-2026-10.jsonl");
    }
  });

  it("C18 APPENDED IN NAME ORDER: a run's appended map and its shards list the shards in name order though the full export lists the later month's closed row first; each shard's ids are in export order", () => {
    // wb-137f refusal #2 U4 (W2-17a), at the exported function: wb-c2 (closed 2026-11) is listed before wb-c1 (closed 2026-10).
    const rows = [
      row("wb-o1", "open"),
      row("wb-c2", "closed", { closed_at: "2026-11-03T08:00:00Z" }),
      row("wb-c1", "closed", { closed_at: "2026-10-31T23:59:59Z" }),
      row("wb-c3", "closed", { closed_at: "2026-11-03T09:30:00Z" }),
    ];
    const result = compactTrackerExport({ full: textOf(rows), shards: new Map(), now: "2026-11-03T12:00:00Z" });
    if (!result.ok) throw new Error(result.lines.join("\n"));
    expect([...result.appended]).toEqual([
      ["issues-closed-2026-10.jsonl", ["wb-c1"]],
      ["issues-closed-2026-11.jsonl", ["wb-c2", "wb-c3"]],
    ]);
    expect([...result.shards.keys()]).toEqual(["issues-closed-2026-10.jsonl", "issues-closed-2026-11.jsonl"]);
    expect(rehydrateTrackerText(result.main, result.shards)).toBe(textOf(rows));
  });
});

describe("wb-294d rehydrating reader: the one read every export reader routes through", () => {
  it("R1 NO ARCHIVE: trackerExportText returns the main export's bytes unchanged as UTF-8 text - ASCII rows, rows holding each character of UTF8_CHARACTERS, and those rows led by a byte order mark - given a string path or a file URL", () => {
    const dir = scratch("tracker-export-reader-");
    mkdirSync(join(dir, ".beads"));
    const main = join(dir, ".beads", "issues.jsonl");
    const text = textOf(fixtureRows());
    writeFileSync(main, text);
    expect(trackerExportText(main)).toBe(text);
    expect(trackerExportText(pathToFileURL(main))).toBe(text);
    // wb-137f refusal #3 U1 (GP1-16): the main export's own text beyond ASCII, read with no archive beside it.
    for (const [label, utf8] of [
      ["UTF8_CHARACTERS", textOf(utf8Rows())],
      ["UTF8_CHARACTERS led by a byte order mark", `${BYTE_ORDER_MARK}${textOf(utf8Rows())}`],
    ] as const) {
      writeFileSync(main, utf8);
      expect(readFileSync(main).length, `${label}: the file holds bytes beyond ASCII`).toBeGreaterThan(utf8.length);
      for (const at of [main, pathToFileURL(main)]) {
        expect(trackerExportText(at), `${label}: ${String(at)}`).toBe(utf8);
        expect(Buffer.from(trackerExportText(at), "utf8").equals(readFileSync(main)), `${label}: the bytes, ${String(at)}`).toBe(true);
      }
      expect(trackerExportText(main), `${label}: the file's text, decoded by a UTF-8 decoder of the suite's own`).toBe(utf8Of(main));
    }
  });

  it("R2 ARCHIVE: beside an archive directory the stub lines read as their latest archived lines - the full export, byte for byte - through trackerExportText and rehydrateTrackerExport, each given a string path or a file URL (one whose path holds a space among them); and so does a compaction of rows holding each character of UTF8_CHARACTERS, read from its main export and shard files", () => {
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
    // wb-137f refusal #2 U6 (W2-03a): a file URL of the same main export, beside the same archive.
    expect(trackerExportText(pathToFileURL(main)), "trackerExportText given a file URL").toBe(textOf(later));
    expect(rehydrateTrackerExport(second.main, pathToFileURL(main)), "rehydrateTrackerExport given a file URL").toBe(textOf(later));
    expect(rehydrateTrackerExport("", pathToFileURL(main)), "rehydrateTrackerExport given a file URL and another text").toBe("");
    // The same main export and archive under a directory whose name holds a space, which the file URL percent-encodes.
    const spaced = join(scratch("tracker-export-reader-"), "a dir with spaces");
    mkdirSync(join(spaced, ".beads", "archive"), { recursive: true });
    const spacedMain = join(spaced, ".beads", "issues.jsonl");
    writeFileSync(spacedMain, second.main);
    for (const [name, text] of second.shards) writeFileSync(join(spaced, ".beads", "archive", name), text);
    expect(pathToFileURL(spacedMain).href).toContain("a%20dir%20with%20spaces");
    expect(trackerExportText(pathToFileURL(spacedMain)), "trackerExportText given a file URL whose path holds a space").toBe(textOf(later));
    expect(rehydrateTrackerExport(second.main, pathToFileURL(spacedMain)), "rehydrateTrackerExport given a file URL whose path holds a space").toBe(textOf(later));
    // wb-137f refusal #3 U1 (GP1-15, GP1-16): the stubs and both month shards hold text beyond ASCII, read back from the files.
    const utf8 = scratch("tracker-export-reader-");
    mkdirSync(join(utf8, ".beads", "archive"), { recursive: true });
    const utf8Full = textOf(utf8Rows());
    const utf8Compacted = compactTrackerExport({ full: utf8Full, shards: new Map(), now: "2026-11-03T12:00:00Z" });
    if (!utf8Compacted.ok) throw new Error(utf8Compacted.lines.join("\n"));
    const utf8Main = join(utf8, ".beads", "issues.jsonl");
    writeFileSync(utf8Main, utf8Compacted.main);
    for (const [name, text] of utf8Compacted.shards) writeFileSync(join(utf8, ".beads", "archive", name), text);
    expect([...utf8Compacted.shards.keys()]).toEqual(["issues-closed-2026-10.jsonl", "issues-closed-2026-11.jsonl"]);
    for (const path of [utf8Main, ...[...utf8Compacted.shards.keys()].map(name => join(utf8, ".beads", "archive", name))]) {
      const bytes = readFileSync(path);
      expect(bytes.length, `${path} holds bytes beyond ASCII`).toBeGreaterThan(bytes.toString("utf8").length);
    }
    expect(trackerExportText(utf8Main), "UTF8_CHARACTERS: trackerExportText").toBe(utf8Full);
    expect(trackerExportText(pathToFileURL(utf8Main)), "UTF8_CHARACTERS: trackerExportText given a file URL").toBe(utf8Full);
    expect(rehydrateTrackerExport(utf8Of(utf8Main), utf8Main), "UTF8_CHARACTERS: rehydrateTrackerExport").toBe(utf8Full);
  });

  it("R3 CORRUPT SHARD: each of the 27 lines of BAD_SHARD_LINES - the four prefix forms (cut short, followed by other text, an id holding an invalid escape, an empty id) and the same four without the prefix, an array, null, a number, no id, a number id, the six comment forms (opening with #, //, /*, --, ; or <!--) and the eight lines of whitespace alone - at each position of PLANT_AT (line 1, 2 or 3) in each layout of SHARD_LAYOUTS (the only shard, the older or the newer of two, the middle of three) fails trackerExportText with one Error naming the shard, the line and the reason; an empty line between two rows holds no row and is skipped, in each of those layouts", () => {
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
    // wb-137f refusals #1 (U1 W8-01, U2 W8-02) and #2 (U1 W2-02a/W2-02b): each form in each layout, at each position of PLANT_AT; in
    // each layout an empty line between two rows reads as the same shard without it.
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
        for (const [at, , text] of PLANT_AT) {
          expect(thrownBy(() => trackerExportText(plantIn(text(bad)))), `${layout}: ${label} at line ${at}`).toBe(`Error: tracker-export: archived ${plant} line ${at} ${reason}`);
        }
      }
      expect(trackerExportText(plantIn(PLANT_ROWS_EMPTY_LINE)), `${layout}: an empty line between two rows is skipped`).toBe(trackerExportText(plantIn(PLANT_ROWS)));
    }
  });

  it("R4 SHARD FILES ONLY: a file of another name beside the shards (a README, a day shard's name, a month 00 or a month 13 name, and each name of NAMES_OUTSIDE_THE_FORM alone), a symlink of a month shard's name - to a file, to a directory, or dangling - and a directory of one, is never read - beside the shards the read is the full export, with no shard file it is the main export unchanged; a regular file of each name of SHARD_NAMES_IN_THE_FORM, alone beside the main export, is read", () => {
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
    symlinkSync(join(dir, "no-such-target.jsonl"), join(archive, "issues-closed-2026-07.jsonl"));
    mkdirSync(join(dir, "target-dir"));
    symlinkSync(join(dir, "target-dir"), join(archive, "issues-closed-2026-06.jsonl"));
    expect(trackerExportText(main), "no month shard file beside the main export: its bytes unchanged").toBe(result.main);
    for (const [name, text] of result.shards) writeFileSync(join(archive, name), text);
    expect(trackerExportText(main)).toBe(textOf(rows));
    // wb-137f refusal #3 U2 (GP1-01..05): each name of NAMES_OUTSIDE_THE_FORM alone beside the main export, holding a stale body of
    // wb-c2, is not read - nor beside the shards; each name of SHARD_NAMES_IN_THE_FORM alone, holding the same body, is read.
    const stale = `${lineOf(row("wb-c2", "closed", { notes: "a stale body of wb-c2" }))}`;
    const withStale = linesOf(result.main).map(line => (parsed(line).id === "wb-c2" ? stale : line));
    expect(withStale).not.toEqual(linesOf(result.main));
    const beside = (names: readonly string[], shards: ReadonlyMap<string, string>): string => {
      const at = scratch("tracker-export-reader-");
      mkdirSync(join(at, ".beads", "archive"), { recursive: true });
      writeFileSync(join(at, ".beads", "issues.jsonl"), result.main);
      for (const name of names) writeFileSync(join(at, ".beads", "archive", name), `${stale}\n`);
      for (const [name, text] of shards) writeFileSync(join(at, ".beads", "archive", name), text);
      return join(at, ".beads", "issues.jsonl");
    };
    for (const name of NAMES_OUTSIDE_THE_FORM) {
      expect(trackerExportText(beside([name], new Map())), `${name} alone: not read`).toBe(result.main);
      expect(trackerExportText(beside([name], result.shards)), `${name} beside the shards: not read`).toBe(textOf(rows));
    }
    for (const name of SHARD_NAMES_IN_THE_FORM) {
      expect(trackerExportText(beside([name], new Map())), `${name} alone: read`).toBe(`${withStale.join("\n")}\n`);
    }
  });

  it("R5 FULL ROWS STAY: beside an archive a closed row that is not a stub reads as itself, never as an archived line of its id - a full row, and a row of wb-c2's stub fields with one field of FIELDS_BEYOND_STUB added (each alone)", () => {
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
    // wb-137f refusal #3 U4 (GP1-09): wb-c2's stub with one field beyond STUB_FIELDS is a full row, kept though a shard holds wb-c2.
    const stub = parsed(linesOf(first.main).find(line => parsed(line).id === "wb-c2") ?? "{}");
    expect(Object.keys(stub).every(key => STUB_FIELDS.includes(key))).toBe(true);
    for (const field of FIELDS_BEYOND_STUB) {
      expect(STUB_FIELDS.includes(field), field).toBe(false);
      const extended = `${JSON.stringify({ ...stub, [field]: "a field beyond the stub fields" })}\n`;
      writeFileSync(main, extended);
      expect(trackerExportText(main), `${field}: read as itself`).toBe(extended);
    }
  });

  it("R6 NOT CLOSED STAYS: beside an archive a stub-shaped row that is not closed reads as itself, never as an archived line of its id - an open one, though a dependency edge of it spells a closed status, one whose status is \"Closed\", and one with each status of STATUSES_NOT_CLOSED (other letter cases, a space or a tab around \"closed\", a newline after it, a longer word)", () => {
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
    // wb-137f refusal #3 U4 (GP1-08): wb-c2's stub with each status of STATUSES_NOT_CLOSED, a shard holding wb-c2's closed line.
    const stub = parsed(linesOf(first.main).find(line => parsed(line).id === "wb-c2") ?? "{}");
    for (const status of STATUSES_NOT_CLOSED) {
      expect(status, JSON.stringify(status)).not.toBe("closed");
      const line = `${JSON.stringify({ ...stub, status })}\n`;
      writeFileSync(main, line);
      expect(trackerExportText(main), `status ${JSON.stringify(status)} is not "closed"`).toBe(line);
    }
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

  it("R10 READ MEMO: a process reads the shards again when a shard's size or modification time changes - the last shard by name, or an older one; the modification time moved by 60 s, by 0.5 s inside one second, or by 0.3 ms inside one millisecond - or a shard is added (after the others, or before them), renamed (its size and modification time kept) or removed (the last one, or an older one); a rewrite that keeps names, sizes and modification times reads as the earlier content, the last shard's or an older one's; another archive directory, whose shards keep the names, sizes and modification times of shards read before, is read on its own; and a main export rewritten at the same length between two reads - in its first line, then in its last, in its middle line, at its first character and at its last character, with its middle and its last line swapped and with its first and its last line swapped, and in its last line where no newline ends it - is read again, as is another text of the same length given to rehydrateTrackerExport", () => {
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
    // wb-137f refusal #2 U5 (W2-04a): two shards holding wb-c1 bodies of equal length, their modification times pinned; one renamed so
    // that the names change while the sizes and modification times are kept, then the last one removed: each is read again.
    const named = scratch("tracker-export-reader-");
    const namedArchive = join(named, ".beads", "archive");
    mkdirSync(namedArchive, { recursive: true });
    const c1 = (notes: string): Row => row("wb-c1", "closed", { closed_at: "2026-10-31T23:59:59Z", notes });
    const c1Stub = compactTrackerExport({ full: textOf([c1("body XXXX")]), shards: new Map(), now: "2026-11-03T12:00:00Z" });
    if (!c1Stub.ok) throw new Error(c1Stub.lines.join("\n"));
    const namedMain = join(named, ".beads", "issues.jsonl");
    writeFileSync(namedMain, c1Stub.main);
    writeFileSync(join(namedArchive, "issues-closed-2026-10.jsonl"), `${lineOf(c1("body XXXX"))}\n`);
    writeFileSync(join(namedArchive, "issues-closed-2026-11.jsonl"), `${lineOf(c1("body YYYY"))}\n`);
    for (const name of ["issues-closed-2026-10.jsonl", "issues-closed-2026-11.jsonl"]) utimesSync(join(namedArchive, name), pinned, pinned);
    expect(trackerExportText(namedMain), "W2-04a: the later month's body").toBe(`${lineOf(c1("body YYYY"))}\n`);
    renameSync(join(namedArchive, "issues-closed-2026-11.jsonl"), join(namedArchive, "issues-closed-2026-09.jsonl"));
    expect(
      readdirSync(namedArchive)
        .sort()
        .map(name => [name, lstatSync(join(namedArchive, name)).size, lstatSync(join(namedArchive, name)).mtimeMs]),
      "W2-04a: the names change; the sizes and modification times are kept",
    ).toEqual([
      ["issues-closed-2026-09.jsonl", Buffer.byteLength(`${lineOf(c1("body YYYY"))}\n`), pinned * 1000],
      ["issues-closed-2026-10.jsonl", Buffer.byteLength(`${lineOf(c1("body XXXX"))}\n`), pinned * 1000],
    ]);
    expect(trackerExportText(namedMain), "W2-04a: a shard renamed: read again").toBe(`${lineOf(c1("body XXXX"))}\n`);
    unlinkSync(join(namedArchive, "issues-closed-2026-10.jsonl"));
    expect(trackerExportText(namedMain), "a shard removed: read again").toBe(`${lineOf(c1("body YYYY"))}\n`);
    // A change to a shard that is not the last by name - a rewrite keeping its size and modification time, then its modification time,
    // then its size, then a shard added before the others and removed again: the main export holds stubs of wb-c8 and wb-c9, each held
    // by an older shard only, and of wb-c1, held by the last shard.
    const older = scratch("tracker-export-reader-");
    const olderArchive = join(older, ".beads", "archive");
    mkdirSync(olderArchive, { recursive: true });
    const c9 = (notes: string): Row => row("wb-c9", "closed", { closed_at: "2026-10-05T00:00:00Z", notes });
    const c8 = row("wb-c8", "closed", { closed_at: "2026-08-05T00:00:00Z", notes: "the only body of wb-c8" });
    const olderStubs = compactTrackerExport({ full: textOf([c8, c9("body AAAA"), c1("body BBBB")]), shards: new Map(), now: "2026-11-03T12:00:00Z" });
    if (!olderStubs.ok) throw new Error(olderStubs.lines.join("\n"));
    const c8Stub = linesOf(olderStubs.main)[0] ?? "";
    expect(parsed(c8Stub).id).toBe("wb-c8");
    const olderMain = join(older, ".beads", "issues.jsonl");
    writeFileSync(olderMain, olderStubs.main);
    const olderShard = join(olderArchive, "issues-closed-2026-10.jsonl");
    writeFileSync(olderShard, `${lineOf(c9("body AAAA"))}\n`);
    writeFileSync(join(olderArchive, "issues-closed-2026-11.jsonl"), `${lineOf(c1("body BBBB"))}\n`);
    for (const name of ["issues-closed-2026-10.jsonl", "issues-closed-2026-11.jsonl"]) utimesSync(join(olderArchive, name), pinned, pinned);
    const olderRead = (c8Line: string, c9Body: string): string => `${c8Line}\n${lineOf(c9(c9Body))}\n${lineOf(c1("body BBBB"))}\n`;
    expect(trackerExportText(olderMain), "the older shard's body").toBe(olderRead(c8Stub, "body AAAA"));
    writeFileSync(olderShard, `${lineOf(c9("body CCCC"))}\n`);
    utimesSync(olderShard, pinned, pinned);
    expect(trackerExportText(olderMain), "the older shard rewritten, its name, size and modification time kept: the earlier content").toBe(olderRead(c8Stub, "body AAAA"));
    utimesSync(olderShard, pinned + 60, pinned + 60);
    expect(trackerExportText(olderMain), "the older shard's modification time changed: read again").toBe(olderRead(c8Stub, "body CCCC"));
    writeFileSync(olderShard, `${lineOf(c9("body CCCC, longer"))}\n`);
    utimesSync(olderShard, pinned + 60, pinned + 60);
    expect(trackerExportText(olderMain), "the older shard's size changed: read again").toBe(olderRead(c8Stub, "body CCCC, longer"));
    writeFileSync(join(olderArchive, "issues-closed-2026-08.jsonl"), `${lineOf(c8)}\n`);
    utimesSync(join(olderArchive, "issues-closed-2026-08.jsonl"), pinned, pinned);
    expect(trackerExportText(olderMain), "a shard added before the others: read again").toBe(olderRead(lineOf(c8), "body CCCC, longer"));
    unlinkSync(join(olderArchive, "issues-closed-2026-08.jsonl"));
    expect(trackerExportText(olderMain), "an older shard removed: read again").toBe(olderRead(c8Stub, "body CCCC, longer"));
    // wb-137f refusal #3 U3 (GP1-06): a same-size rewrite whose modification time moves by 0.5 s inside one whole second, or by 0.3 ms
    // inside one whole millisecond - at the last shard by name (wb-c1's) and at an older one (wb-c9's) - is read again.
    const fine = scratch("tracker-export-reader-");
    const fineArchive = join(fine, ".beads", "archive");
    mkdirSync(fineArchive, { recursive: true });
    const fineMain = join(fine, ".beads", "issues.jsonl");
    writeFileSync(fineMain, olderStubs.main);
    const fineShards = { older: join(fineArchive, "issues-closed-2026-10.jsonl"), last: join(fineArchive, "issues-closed-2026-11.jsonl") };
    const fineBodies = { older: "body AAAA", last: "body BBBB" };
    const fineText = (at: "older" | "last", body: string): string => `${lineOf(at === "older" ? c9(body) : c1(body))}\n`;
    const fineRead = (): string => `${c8Stub}\n${lineOf(c9(fineBodies.older))}\n${lineOf(c1(fineBodies.last))}\n`;
    const wholeSecond = pinned + 1000;
    const steps = [
      ["0.5 s inside one second", wholeSecond + 0.1, wholeSecond + 0.6, (ms: number) => Math.floor(ms / 1000)],
      ["0.3 ms inside one millisecond", wholeSecond + 0.0001, wholeSecond + 0.0004, (ms: number) => Math.floor(ms)],
    ] as const;
    let round = 0;
    for (const at of ["last", "older"] as const) {
      for (const [step, before, after, unit] of steps) {
        round += 1;
        for (const where of ["older", "last"] as const) {
          writeFileSync(fineShards[where], fineText(where, fineBodies[where]));
          utimesSync(fineShards[where], before, before);
        }
        expect(trackerExportText(fineMain), `${at}, ${step}: the first read`).toBe(fineRead());
        const was = lstatSync(fineShards[at]);
        fineBodies[at] = `body ${String(round).repeat(4)}`;
        writeFileSync(fineShards[at], fineText(at, fineBodies[at]));
        utimesSync(fineShards[at], after, after);
        const now = lstatSync(fineShards[at]);
        expect([now.size, now.mtimeMs === was.mtimeMs, unit(now.mtimeMs)], `${at}, ${step}: the size kept, the modification time moved inside one unit`).toEqual([was.size, false, unit(was.mtimeMs)]);
        expect(trackerExportText(fineMain), `${at}, ${step}: read again`).toBe(fineRead());
      }
    }
    // wb-137f refusal #3 U3 (GP1-11): the main export rewritten at the same length between two reads, the shards unchanged - first in
    // its first line (wb-c8's stub, which no shard holds), then in its last (wb-c1's stub becomes wb-c9's) - is read again; and another
    // text of the same length given to rehydrateTrackerExport is its own.
    expect(trackerExportText(fineMain), "the main export as written").toBe(fineRead());
    const [c8Line = "", c9Line = "", c1Line = ""] = linesOf(olderStubs.main);
    const firstEdit = `${c8Line.replace("title of wb-c8", "TITLE OF WB-C8")}\n${c9Line}\n${c1Line}\n`;
    const lastEdit = `${c8Line.replace("title of wb-c8", "TITLE OF WB-C8")}\n${c9Line}\n${c1Line.replace('"id":"wb-c1"', '"id":"wb-c9"')}\n`;
    expect([firstEdit.length, lastEdit.length]).toEqual([olderStubs.main.length, olderStubs.main.length]);
    expect(lastEdit).not.toBe(firstEdit);
    writeFileSync(fineMain, firstEdit);
    expect(trackerExportText(fineMain), "the first line rewritten at the same length: read again").toBe(`${c8Line.replace("title of wb-c8", "TITLE OF WB-C8")}\n${lineOf(c9(fineBodies.older))}\n${lineOf(c1(fineBodies.last))}\n`);
    writeFileSync(fineMain, lastEdit);
    expect(trackerExportText(fineMain), "the last line rewritten at the same length: read again").toBe(`${c8Line.replace("title of wb-c8", "TITLE OF WB-C8")}\n${lineOf(c9(fineBodies.older))}\n${lineOf(c9(fineBodies.older))}\n`);
    expect(rehydrateTrackerExport(firstEdit, fineMain), "another text of the same length given to rehydrateTrackerExport").toBe(`${c8Line.replace("title of wb-c8", "TITLE OF WB-C8")}\n${lineOf(c9(fineBodies.older))}\n${lineOf(c1(fineBodies.last))}\n`);
    // wb-xkto (refusal #4 of wb-137f, U3: GP45-12, witness W-GP45-12): the main export rewritten at the same length between two reads -
    // in its middle line (wb-c9's stub becomes wb-c1's), at its first character ('{' of wb-c8's stub becomes '[': a line that does not
    // parse, kept as it is, R12's kind) and at its last character (its final newline becomes 'x': wb-c1's stub line no longer parses and
    // is kept as it is) - each after a read of the main export as written, is read again.
    const asWritten = olderStubs.main;
    const sameLength: readonly (readonly [label: string, rewrite: string, read: string])[] = [
      ["in its middle line", `${c8Line}\n${c9Line.replace('"id":"wb-c9"', '"id":"wb-c1"')}\n${c1Line}\n`, `${c8Line}\n${lineOf(c1(fineBodies.last))}\n${lineOf(c1(fineBodies.last))}\n`],
      ["at its first character", `[${asWritten.slice(1)}`, `[${c8Line.slice(1)}\n${lineOf(c9(fineBodies.older))}\n${lineOf(c1(fineBodies.last))}\n`],
      ["at its last character", `${asWritten.slice(0, -1)}x`, `${c8Line}\n${lineOf(c9(fineBodies.older))}\n${c1Line}x`],
    ];
    expect(asWritten.endsWith("\n"), "the main export as written ends with its newline").toBe(true);
    for (const [label, rewrite, read] of sameLength) {
      expect([rewrite.length, rewrite === asWritten], `${label}: the same length, another text`).toEqual([asWritten.length, false]);
      writeFileSync(fineMain, asWritten);
      expect(trackerExportText(fineMain), `${label}: the main export as written`).toBe(fineRead());
      writeFileSync(fineMain, rewrite);
      expect(trackerExportText(fineMain), `${label}: rewritten at the same length, read again`).toBe(read);
    }
    // wb-xkto (refusal #1 of wb-xkto, U6: GX8-31, witness W-GX8-31): two lines of the main export swapped - a rewrite at the same length
    // whose lines are the lines as written - its middle and its last line, then its first and its last, each after a read of the main
    // export as written, is read again.
    const middleLastSwapped = `${c8Line}\n${c1Line}\n${c9Line}\n`;
    const firstLastSwapped = `${c1Line}\n${c9Line}\n${c8Line}\n`;
    expect([middleLastSwapped.length, firstLastSwapped.length, middleLastSwapped === asWritten, firstLastSwapped === asWritten], "two swaps: the same length, other texts").toEqual([asWritten.length, asWritten.length, false, false]);
    writeFileSync(fineMain, asWritten);
    expect(trackerExportText(fineMain), "before the middle and last lines' swap: the main export as written").toBe(fineRead());
    writeFileSync(fineMain, middleLastSwapped);
    expect(trackerExportText(fineMain), "its middle and its last line swapped: read again").toBe(`${c8Line}\n${lineOf(c1(fineBodies.last))}\n${lineOf(c9(fineBodies.older))}\n`);
    writeFileSync(fineMain, asWritten);
    expect(trackerExportText(fineMain), "before the first and last lines' swap: the main export as written").toBe(fineRead());
    writeFileSync(fineMain, firstLastSwapped);
    expect(trackerExportText(fineMain), "its first and its last line swapped: read again").toBe(`${lineOf(c1(fineBodies.last))}\n${lineOf(c9(fineBodies.older))}\n${c8Line}\n`);
    // wb-xkto (refusal #1 of wb-xkto, U7: GX8-32, witness W-GX8-32): a main export that no newline ends - the form compaction writes for
    // a full export without a final newline (C12) - rewritten at the same length in its last line (wb-c1's stub becomes wb-c9's) after a
    // read of it as written, is read again.
    const unterminated = asWritten.slice(0, -1);
    const unterminatedLastEdit = `${c8Line}\n${c9Line}\n${c1Line.replace('"id":"wb-c1"', '"id":"wb-c9"')}`;
    expect([unterminated.endsWith("\n"), unterminatedLastEdit.endsWith("\n"), unterminatedLastEdit.length, unterminatedLastEdit === unterminated], "no final newline, the same length, another text").toEqual([false, false, unterminated.length, false]);
    writeFileSync(fineMain, unterminated);
    expect(trackerExportText(fineMain), "no final newline: the main export as written").toBe(fineRead().slice(0, -1));
    writeFileSync(fineMain, unterminatedLastEdit);
    expect(trackerExportText(fineMain), "no final newline, its last line rewritten at the same length: read again").toBe(`${c8Line}\n${lineOf(c9(fineBodies.older))}\n${lineOf(c9(fineBodies.older))}`);
  });

  it("R11 UNTERMINATED LAST LINE: trackerExportText and rehydrateTrackerText parse a shard's last line though no newline ends it - a whole row there is read as that row, and the prefix form cut short there fails the read with one Error naming the shard and the line - in each layout of SHARD_LAYOUTS", () => {
    // wb-137f refusal #2 U7 (W2-01a, W2-01b): wb-u1's whole row, or the cut-short prefix form, as the planted shard's last line.
    const unterminated = row("wb-u1", "closed", { closed_at: "2026-11-02T00:00:00Z", notes: "the last row, no newline after it" });
    const compacted = compactTrackerExport({ full: textOf([...fixtureRows(), unterminated]), shards: new Map(), now: "2026-11-03T12:00:00Z" });
    if (!compacted.ok) throw new Error(compacted.lines.join("\n"));
    const cutShort = PREFIX_FORMS.find(([label]) => label === "the prefix form cut short")?.[1] ?? "";
    expect(cutShort).toMatch(/^\{"_type":"issue","id":"wb-c2"/);
    const ends = { whole: `${lineOf(row("wb-c4", "closed"))}\n${lineOf(unterminated)}`, cutShort: `${lineOf(row("wb-c4", "closed"))}\n${cutShort}` };
    for (const [layout, plant, whole] of SHARD_LAYOUTS) {
      const plantIn = (text: string): string => {
        const at = scratch("tracker-export-reader-");
        mkdirSync(join(at, ".beads", "archive"), { recursive: true });
        const atMain = join(at, ".beads", "issues.jsonl");
        writeFileSync(atMain, compacted.main);
        for (const [name, shardText] of layoutShards(plant, whole, text)) writeFileSync(join(at, ".beads", "archive", name), shardText);
        return atMain;
      };
      const terminated = trackerExportText(plantIn(`${ends.whole}\n`));
      expect(linesOf(terminated).find(line => parsed(line).id === "wb-u1"), `${layout}: the row read with its newline`).toBe(lineOf(unterminated));
      expect(trackerExportText(plantIn(ends.whole)), `${layout}: W2-01a the whole row with no newline after it`).toBe(terminated);
      expect(thrownBy(() => trackerExportText(plantIn(ends.cutShort))), `${layout}: W2-01b the cut-short line with no newline after it`).toBe(`Error: tracker-export: archived ${plant} line 2 does not parse`);
      expect(rehydrateTrackerText(compacted.main, layoutShards(plant, whole, ends.whole)), `${layout}: rehydrateTrackerText, the whole row`).toBe(rehydrateTrackerText(compacted.main, layoutShards(plant, whole, `${ends.whole}\n`)));
      expect(linesOf(rehydrateTrackerText(compacted.main, layoutShards(plant, whole, ends.whole))).find(line => parsed(line).id === "wb-u1"), `${layout}: rehydrateTrackerText reads the row`).toBe(lineOf(unterminated));
      expect(thrownBy(() => rehydrateTrackerText(compacted.main, layoutShards(plant, whole, ends.cutShort))), `${layout}: rehydrateTrackerText, the cut-short line`).toBe(`Error: tracker-export: archived ${plant} line 2 does not parse`);
    }
  });

  it("R12 OTHER MAIN LINES STAY: beside an archive a main export line that is empty, does not parse, is not a JSON object (null, an array, a number, a string) or is a closed stub-shaped row whose id is a number reads as itself, through trackerExportText and rehydrateTrackerExport, while the stub beside them reads as its archived line", () => {
    const dir = scratch("tracker-export-reader-");
    mkdirSync(join(dir, ".beads", "archive"), { recursive: true });
    const held = row("wb-c1", "closed", { closed_at: "2026-11-02T00:00:00Z" });
    const compacted = compactTrackerExport({ full: textOf([held]), shards: new Map(), now: "2026-11-03T12:00:00Z" });
    if (!compacted.ok) throw new Error(compacted.lines.join("\n"));
    for (const [name, text] of compacted.shards) writeFileSync(join(dir, ".beads", "archive", name), text);
    const heldStub = linesOf(compacted.main)[0] ?? "";
    const others = ["", "{", "not json", "null", "[1]", "5", '"text"', '{"_type":"issue","id":7,"title":"t","status":"closed"}'];
    expect(others).toHaveLength(8);
    const text = `${[...others, heldStub].join("\n")}\n`;
    const main = join(dir, ".beads", "issues.jsonl");
    writeFileSync(main, text);
    expect(trackerExportText(main)).toBe(`${[...others, lineOf(held)].join("\n")}\n`);
    expect(rehydrateTrackerExport(text, main)).toBe(`${[...others, lineOf(held)].join("\n")}\n`);
  });
});

// Each case below spawns the CLI up to some tens of times; at the 5 s default a loaded host (load1 136 when the run began) timed K5
// out at 5.8 s and K7 ran 4.1 s, so the block carries its own bound, as T1 does.
describe("wb-294d compaction ritual at the CLI: writes, receipt, refusals", { timeout: 120_000 }, () => {
  function beadsDir(): { readonly dir: string; readonly beads: string; readonly full: string } {
    const dir = scratch("tracker-export-cli-");
    const beads = join(dir, ".beads");
    mkdirSync(beads);
    const full = join(dir, "full.jsonl");
    writeFileSync(full, textOf(fixtureRows()));
    return { dir, beads, full };
  }

  it("K1 compact writes the main export and the month shards, prints one JSON receipt line ended by a newline and nothing else on stdout, and a re-run with no change appends nothing - over the fixture's rows, and over rows holding each character of UTF8_CHARACTERS in both month shards, where each shard keeps its bytes", () => {
    const { beads, full } = beadsDir();
    const run = cli(["compact", "--full", full, "--beads", beads, "--now", "2026-11-03T12:00:00Z"]);
    expect(run.stderr).toBe("");
    expect(run.status).toBe(0);
    // wb-xkto (refusal #4 of wb-137f, F4 rider: GP45-06): stdout is the receipt's own JSON text and one newline, nothing else - no
    // carriage return, no second line - at each run below.
    const oneLine = (stdout: unknown): boolean => String(stdout) === `${JSON.stringify(JSON.parse(String(stdout)))}\n`;
    expect(oneLine(run.stdout), "the first run's receipt line").toBe(true);
    const receipt = JSON.parse(String(run.stdout)) as Row;
    expect(receipt).toMatchObject({ verb: "compact", rows: 5, stubs: 3, appended: { "issues-closed-2026-10.jsonl": 1, "issues-closed-2026-11.jsonl": 2 }, shards: 2, sealedUnchanged: true, roundTrip: true });
    expect(readdirSync(join(beads, "archive")).sort()).toEqual(["issues-closed-2026-10.jsonl", "issues-closed-2026-11.jsonl"]);
    const mainAfter = readFileSync(join(beads, "issues.jsonl"), "utf8");
    expect(linesOf(mainAfter).filter(line => parsed(line).status === "closed").every(line => !("notes" in parsed(line)))).toBe(true);
    const again = cli(["compact", "--full", full, "--beads", beads, "--now", "2026-11-03T13:00:00Z"]);
    expect(again.status).toBe(0);
    expect(oneLine(again.stdout), "the re-run's receipt line").toBe(true);
    expect((JSON.parse(String(again.stdout)) as Row).appended).toEqual({});
    expect(readFileSync(join(beads, "issues.jsonl"), "utf8")).toBe(mainAfter);
    // wb-137f refusal #3 U1 (GP1-17): the CLI reads its shards back as UTF-8 - a re-run appends nothing and rewrites no shard.
    const utf8 = beadsDir();
    writeFileSync(utf8.full, textOf(utf8Rows()));
    const first = cli(["compact", "--full", utf8.full, "--beads", utf8.beads, "--now", "2026-11-03T12:00:00Z"]);
    expect([first.status, first.stderr, oneLine(first.stdout)]).toEqual([0, "", true]);
    expect((JSON.parse(String(first.stdout)) as Row).appended).toEqual({ "issues-closed-2026-10.jsonl": 1, "issues-closed-2026-11.jsonl": 2 });
    const shardBytes = () => ["issues-closed-2026-10.jsonl", "issues-closed-2026-11.jsonl"].map(name => readFileSync(join(utf8.beads, "archive", name)));
    const before = shardBytes();
    for (const bytes of before) expect(bytes.length, "a shard holds bytes beyond ASCII").toBeGreaterThan(bytes.toString("utf8").length);
    const rerun = cli(["compact", "--full", utf8.full, "--beads", utf8.beads, "--now", "2026-11-03T13:00:00Z"]);
    expect([rerun.status, rerun.stderr, oneLine(rerun.stdout)]).toEqual([0, "", true]);
    expect((JSON.parse(String(rerun.stdout)) as Row).appended, "UTF8_CHARACTERS: the re-run appends nothing").toEqual({});
    expect(shardBytes(), "UTF8_CHARACTERS: each shard keeps its bytes").toEqual(before);
  });

  it("K2 rehydrate prints the full export from the main export and its shards, byte for byte: with a final newline when the export ends with one, and without one when it does not, and over rows holding each character of UTF8_CHARACTERS", () => {
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
    // wb-137f refusal #3 U1 (GP1-15, GP1-16 at the CLI): the printed bytes are the full export's UTF-8 bytes.
    const utf8 = beadsDir();
    writeFileSync(utf8.full, textOf(utf8Rows()));
    expect(cli(["compact", "--full", utf8.full, "--beads", utf8.beads, "--now", "2026-11-03T12:00:00Z"]).status).toBe(0);
    const printed = spawnSync(process.execPath, [TOOL, "rehydrate", "--beads", utf8.beads], { cwd: REPO, env: { PATH: process.env.PATH }, timeout: 120_000 });
    expect(printed.status).toBe(0);
    expect(Buffer.compare(printed.stdout, readFileSync(utf8.full)), "UTF8_CHARACTERS: the printed bytes").toBe(0);
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
  it("K3 at each of its seven soft-ceiling plants - the fixture's main export and both its month shards over a 64-byte ceiling; the fixture's main export alone over its ceiling; the fixture's main export alone exactly at its ceiling; the big-shard fixture's one month shard alone over its ceiling; the big-shard fixture's one month shard alone exactly at its ceiling; the UTF-8 fixture's main export alone exactly at its ceiling; the UTF-8 big-shard fixture's one month shard alone exactly at its ceiling - compact exits 2, prints nothing on stdout, prints on stderr exactly one typed line for each file at or over the ceiling, naming the file under --beads and the bytes the unrefused run writes to it - its UTF-8 bytes, which outnumber its UTF-16 code units at the two UTF-8 plants - and leaves the .beads directory empty; a full export whose text is {not json and a newline exits 3 with the typed line and leaves the .beads directory empty; a month shard whose only line is the prefix form cut short, and each of the four prefix forms (cut short, followed by other text, an id holding an invalid escape, an empty id) and the six comment forms (opening with #, //, /*, --, ; or <!--) as line 1 of the older of two month shards, exit 3 with the typed line naming the shard and write nothing", ({ task }) => {
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
    expect(malformed.stderr).toBe("tracker-export: REFUSED the full export: line 1 is not JSON; nothing is written\n");
    expect(existsSync(join(beads, "archive"))).toBe(false);
    expect(readdirSync(beads)).toEqual([]);
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
    // wb-137f refusal #1 (U1, W8-01) and #2 (U1, W2-02a/W2-02b): each prefix form and each comment form in the OLDER of two month
    // shards, beside a whole running-month shard.
    expect(CLI_FORMS).toHaveLength(10);
    for (const [label, bad, reason] of CLI_FORMS) {
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
    // The five ceiling plants (refusal #6 of wb-294d, U1: GP3P-A1, A2, A3, A4 and B3; F5: GP3P-B1 and B2). A plant's forms read each
    // file the unrefused run writes against the plant's ceiling: over it, exactly at it, or under it. wb-xkto (refusal #4 of wb-137f,
    // U2: GP45-04, GP45-05; witness W-GP45-04/05) adds two plants over rows holding text beyond ASCII, the UTF-8 fixture's and the
    // UTF-8 big-shard fixture's, whose file at the ceiling holds more UTF-8 bytes than UTF-16 code units.
    const inputs = {
      fixture: textOf(fixtureRows()),
      bigShard: textOf([row("wb-o1", "open"), row("wb-c9", "closed", { closed_at: "2026-11-03T08:00:00Z", notes: "x".repeat(4000) })]),
      utf8: textOf(utf8Rows()),
      utf8BigShard: textOf(utf8BigShardRows()),
    };
    type Input = keyof typeof inputs;
    /** The inputs whose rows hold text beyond ASCII (wb-xkto): at their plants each file at or over the ceiling has fewer UTF-16 code units than UTF-8 bytes. */
    const beyondAscii: ReadonlySet<Input> = new Set<Input>(["utf8", "utf8BigShard"]);
    /** The UTF-16 code units of each file the unrefused run writes, by input, read from disk beside its bytes. */
    const unitsOf = new Map<Input, ReadonlyMap<string, number>>();
    /** The bytes of each file compact writes for the input when nothing refuses (the default ceiling), read from disk: main export first, then the shards in name order. */
    const unrefused = (input: Input): ReadonlyMap<string, number> => {
      const layout = beadsDir();
      writeFileSync(layout.full, inputs[input]);
      expect(cli(["compact", "--full", layout.full, "--beads", layout.beads, "--now", "2026-11-03T12:00:00Z"]).status, `the unrefused run over the ${input} input`).toBe(0);
      const shards = readdirSync(join(layout.beads, "archive")).sort();
      unitsOf.set(input, new Map([["issues.jsonl", readFileSync(join(layout.beads, "issues.jsonl"), "utf8").length], ...shards.map((name): [string, number] => [`archive/${name}`, readFileSync(join(layout.beads, "archive", name), "utf8").length])]));
      return new Map([["issues.jsonl", readFileSync(join(layout.beads, "issues.jsonl")).length], ...shards.map((name): [string, number] => [`archive/${name}`, readFileSync(join(layout.beads, "archive", name)).length])]);
    };
    const written = { fixture: unrefused("fixture"), bigShard: unrefused("bigShard"), utf8: unrefused("utf8"), utf8BigShard: unrefused("utf8BigShard") };
    const bytesOf = (sizes: ReadonlyMap<string, number>, file: string): number => sizes.get(file) ?? Number.NaN;
    const plants: readonly { readonly plant: string; readonly input: Input; readonly ceiling: (sizes: ReadonlyMap<string, number>) => number; readonly forms: readonly string[] }[] = [
      { plant: "the fixture's main export and both its month shards over a 64-byte ceiling", input: "fixture", ceiling: () => 64, forms: ["issues.jsonl:over", "archive/issues-closed-2026-10.jsonl:over", "archive/issues-closed-2026-11.jsonl:over"] },
      { plant: "the fixture's main export alone over its ceiling", input: "fixture", ceiling: sizes => bytesOf(sizes, "archive/issues-closed-2026-11.jsonl") + 1, forms: ["issues.jsonl:over", "archive/issues-closed-2026-10.jsonl:under", "archive/issues-closed-2026-11.jsonl:under"] },
      { plant: "the fixture's main export alone exactly at its ceiling", input: "fixture", ceiling: sizes => bytesOf(sizes, "issues.jsonl"), forms: ["issues.jsonl:at", "archive/issues-closed-2026-10.jsonl:under", "archive/issues-closed-2026-11.jsonl:under"] },
      { plant: "the big-shard fixture's one month shard alone over its ceiling", input: "bigShard", ceiling: sizes => bytesOf(sizes, "issues.jsonl") + 1, forms: ["issues.jsonl:under", "archive/issues-closed-2026-11.jsonl:over"] },
      { plant: "the big-shard fixture's one month shard alone exactly at its ceiling", input: "bigShard", ceiling: sizes => bytesOf(sizes, "archive/issues-closed-2026-11.jsonl"), forms: ["issues.jsonl:under", "archive/issues-closed-2026-11.jsonl:at"] },
      { plant: "the UTF-8 fixture's main export alone exactly at its ceiling", input: "utf8", ceiling: sizes => bytesOf(sizes, "issues.jsonl"), forms: ["issues.jsonl:at", "archive/issues-closed-2026-10.jsonl:under", "archive/issues-closed-2026-11.jsonl:under"] },
      { plant: "the UTF-8 big-shard fixture's one month shard alone exactly at its ceiling", input: "utf8BigShard", ceiling: sizes => bytesOf(sizes, "archive/issues-closed-2026-11.jsonl"), forms: ["issues.jsonl:under", "archive/issues-closed-2026-11.jsonl:at"] },
    ];
    expect(plants.map(entry => `${entry.input}|${entry.plant}|${entry.forms.join(",")}`), "K3's seven ceiling plants (frozen shape)").toEqual([
      "fixture|the fixture's main export and both its month shards over a 64-byte ceiling|issues.jsonl:over,archive/issues-closed-2026-10.jsonl:over,archive/issues-closed-2026-11.jsonl:over",
      "fixture|the fixture's main export alone over its ceiling|issues.jsonl:over,archive/issues-closed-2026-10.jsonl:under,archive/issues-closed-2026-11.jsonl:under",
      "fixture|the fixture's main export alone exactly at its ceiling|issues.jsonl:at,archive/issues-closed-2026-10.jsonl:under,archive/issues-closed-2026-11.jsonl:under",
      "bigShard|the big-shard fixture's one month shard alone over its ceiling|issues.jsonl:under,archive/issues-closed-2026-11.jsonl:over",
      "bigShard|the big-shard fixture's one month shard alone exactly at its ceiling|issues.jsonl:under,archive/issues-closed-2026-11.jsonl:at",
      "utf8|the UTF-8 fixture's main export alone exactly at its ceiling|issues.jsonl:at,archive/issues-closed-2026-10.jsonl:under,archive/issues-closed-2026-11.jsonl:under",
      "utf8BigShard|the UTF-8 big-shard fixture's one month shard alone exactly at its ceiling|issues.jsonl:under,archive/issues-closed-2026-11.jsonl:at",
    ]);
    // wb-xkto: the plant labels against the module header's K3 CEILING PLANTS list, an anchor outside the suite.
    expect(headerList("K3 ceiling plants"), "the module header's K3 ceiling plants").toEqual(plants.map(entry => entry.plant));
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
      if (beyondAscii.has(input)) {
        for (const file of typed) expect(unitsOf.get(input)?.get(file) ?? Number.NaN, `${plant}: ${file} holds fewer UTF-16 code units than UTF-8 bytes`).toBeLessThan(bytesOf(sizes, file));
      }
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

  it("K5 compact reads only the archive's month shard files: a file of another name (a README, a month 13 name, and the names of NAMES_OUTSIDE_THE_FORM together in one archive, each holding a stale body of wb-c2), a directory of a shard's name, and a symlink of a shard's name to a file outside the archive, in it are neither inputs nor touched", () => {
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
    // wb-137f refusal #3 U2 (GP1-01..05 at the CLI): the names outside the form together in one archive, each a regular file of a
    // stale body of wb-c2 - one compaction and one read, so a mutant that admits any one of them changes the receipt or the round trip.
    const state = beadsDir();
    mkdirSync(join(state.beads, "archive"));
    const bodies = new Map(NAMES_OUTSIDE_THE_FORM.map(name => [name, `${lineOf(row("wb-c2", "closed", { notes: `a stale body in ${name}` }))}\n`]));
    for (const [name, body] of bodies) writeFileSync(join(state.beads, "archive", name), body);
    const named = cli(["compact", "--full", state.full, "--beads", state.beads, "--now", "2026-11-03T12:00:00Z"]);
    expect([named.status, named.stderr]).toEqual([0, ""]);
    const namedReceipt = JSON.parse(String(named.stdout)) as Row;
    expect([namedReceipt.shards, namedReceipt.appended]).toEqual([2, { "issues-closed-2026-10.jsonl": 1, "issues-closed-2026-11.jsonl": 2 }]);
    expect(readdirSync(join(state.beads, "archive")).sort()).toEqual([...NAMES_OUTSIDE_THE_FORM, "issues-closed-2026-10.jsonl", "issues-closed-2026-11.jsonl"].sort());
    for (const [name, body] of bodies) expect(readFileSync(join(state.beads, "archive", name), "utf8"), `${name}: untouched`).toBe(body);
    expect(cli(["rehydrate", "--beads", state.beads]).stdout).toBe(readFileSync(state.full, "utf8"));
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

  it("K7 rehydrate exits 3 with the typed line, printing nothing on stdout, when the read throws: a month shard holding a line that does not parse (one with no prefix, and two in the export's own line prefix form: cut short, and an id holding an invalid escape - each appended to the newer of the two shards a compaction wrote), each of the four prefix forms (cut short, followed by other text, an id holding an invalid escape, an empty id) and the six comment forms (opening with #, //, /*, --, ; or <!--) appended to the older of the two, and a missing main export", () => {
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
    // wb-137f refusal #1 (U1) and #2 (U1, W2-02a/W2-02b): each prefix form and each comment form appended to the OLDER of the two
    // month shards a compaction wrote.
    for (const [label, bad, reason] of CLI_FORMS) {
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

  it("K13 WRITES: compact writes the main export and each shard it appends to, each whole by a rename over its path - so each is a new file and no temporary file stays in the .beads directory - and never writes a shard it does not append to: a past month's shard beside an append, and both shards of a run that appends nothing, keep their inode, bytes and modification time; over rows holding each character of UTF8_CHARACTERS the shard a run appends to keeps its old bytes as the prefix of its new ones", () => {
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
    // wb-137f refusal #3 U1 (GP1-17 against C4b's words at the CLI): the running month's shard holds text beyond ASCII; wb-c2 gains a
    // note and the run appends its new line - the shard's old bytes stay its prefix, byte for byte, and the past month's shard is kept.
    const utf8 = beadsDir();
    const utf8Rowset = utf8Rows();
    writeFileSync(utf8.full, textOf(utf8Rowset));
    expect(cli(["compact", "--full", utf8.full, "--beads", utf8.beads, "--now", "2026-11-03T12:00:00Z"]).status).toBe(0);
    const utf8Past = join(utf8.beads, "archive", "issues-closed-2026-10.jsonl");
    const utf8Running = join(utf8.beads, "archive", "issues-closed-2026-11.jsonl");
    const pastBytesBefore = readFileSync(utf8Past);
    const runningBefore = readFileSync(utf8Running);
    expect(runningBefore.length, "the running month's shard holds bytes beyond ASCII").toBeGreaterThan(runningBefore.toString("utf8").length);
    const noted = utf8Rowset.map(r => (r.id === "wb-c2" ? { ...r, notes: `${String(r.notes)} + a note after the first run`, updated_at: "2026-11-04T00:00:00Z" } : r));
    writeFileSync(utf8.full, textOf(noted));
    const appendRun = cli(["compact", "--full", utf8.full, "--beads", utf8.beads, "--now", "2026-11-04T12:00:00Z"]);
    expect([appendRun.status, appendRun.stderr]).toEqual([0, ""]);
    expect((JSON.parse(String(appendRun.stdout)) as Row).appended).toEqual({ "issues-closed-2026-11.jsonl": 1 });
    const runningAfter = readFileSync(utf8Running);
    expect(Buffer.compare(runningAfter.subarray(0, runningBefore.length), runningBefore), "the old bytes are the new bytes' prefix").toBe(0);
    expect(runningAfter.subarray(runningBefore.length).toString("utf8"), "the appended line").toBe(`${lineOf(noted.find(r => r.id === "wb-c2") ?? {})}\n`);
    expect(Buffer.compare(readFileSync(utf8Past), pastBytesBefore), "the past month's shard keeps its bytes").toBe(0);
  });

  it("K14 NOT A FILE: when a path compact would write - a shard it appends to, or the main export - exists and is not a regular file (a directory, a symlink to a file, a symlink to a directory, a dangling symlink, or a FIFO), compact exits 3 with one typed line per such path, shards in name order and then the main export - also when the full export lists the later month's closed row first - printing nothing on stdout and writing nothing; its variants are the module header's K14 variants list", () => {
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
        "W2-17a directories at both shard names it appends to and at the main export, the full export listing wb-c2 (closed 2026-11) before wb-c1 (closed 2026-10)",
        (beads, dir) => {
          const rows = fixtureRows();
          writeFileSync(join(dir, "full.jsonl"), textOf([rows[0], rows[2], rows[1], rows[3], rows[4]].map(r => r ?? {})));
          const at = [join(beads, "archive", "issues-closed-2026-10.jsonl"), join(beads, "archive", "issues-closed-2026-11.jsonl"), join(beads, "issues.jsonl")];
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
    expect(variants.map(([label]) => label)).toEqual([
      "W-GP4-04 a directory at the running month's shard name",
      "a symlink to a file at the running month's shard name",
      "directories at both shard names it appends to",
      "a directory at the main export",
      "a symlink to a file at the main export",
      "a directory at a shard name and at the main export",
      "W2-17a directories at both shard names it appends to and at the main export, the full export listing wb-c2 (closed 2026-11) before wb-c1 (closed 2026-10)",
      "W8-03 a FIFO at the main export",
      "a FIFO at the running month's shard name",
      "a dangling symlink at the main export",
      "a symlink to a directory at the past month's shard name",
    ]);
    // wb-137f refusal #3 F4 (the seat's H10 of cut #3): the variant labels against the module header's list, outside the suite.
    expect(headerList("K14 variants"), "the module header's K14 variants").toEqual(variants.map(([label]) => label));
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

  it("K15 RECEIPT ORDER: compact's receipt line names the shards it appended to, with their counts, in name order though the full export lists the later month's closed row first", () => {
    // wb-137f refusal #2 U4 (the receipt's appended order): wb-c2 (closed 2026-11) is listed before wb-c1 (closed 2026-10).
    const { beads, full } = beadsDir();
    const rows = fixtureRows();
    writeFileSync(full, textOf([rows[0], rows[2], rows[1], rows[3], rows[4]].map(r => r ?? {})));
    const run = cli(["compact", "--full", full, "--beads", beads, "--now", "2026-11-03T12:00:00Z"]);
    expect(run.stderr).toBe("");
    expect(run.status).toBe(0);
    const receipt = JSON.parse(String(run.stdout)) as Row;
    expect(Object.entries(receipt.appended as Row)).toEqual([
      ["issues-closed-2026-10.jsonl", 1],
      ["issues-closed-2026-11.jsonl", 2],
    ]);
    expect(cli(["rehydrate", "--beads", beads]).stdout).toBe(readFileSync(full, "utf8"));
  });
});

describe("wb-tt43 overflow-continuation shards: a month's shard sealed at the soft ceiling and continued (owner ruling 2026-11-08)", { timeout: 120_000 }, () => {
  /** A closed row of 2026-11 with `notes`: rows of ids of one length and one note length have lines of one length. */
  const closedNov = (id: string, notes: string, extra: Row = {}): Row => row(id, "closed", { closed_at: "2026-11-02T08:00:00Z", notes, ...extra });
  const lineBytes = (value: Row): number => Buffer.byteLength(`${lineOf(value)}\n`);
  const oversize = (file: string, bytes: number, ceiling: number): string =>
    `tracker-export: REFUSED .beads/${file} would be ${bytes} bytes, at or over the soft ceiling of ${ceiling} bytes (FW_EXPORT_SOFT_CEILING); nothing is written`;

  it("M1 CONTINUATION NAMES: each name of CONTINUATION_NAMES_IN_THE_FORM (issues-closed-YYYY-MM-X.jsonl, X one letter b to z) alone is a shard - compactTrackerExport keeps its text as its prefix and trackerExportText reads a file of that name beside a main export - and each name of CONTINUATION_NAMES_OUTSIDE_THE_FORM alone is not: compactTrackerExport refuses it as malformed with the typed line naming it and trackerExportText leaves the main export unchanged", () => {
    const full = textOf(fixtureRows());
    const now = "2026-11-03T12:00:00Z";
    const other = `${lineOf(row("wb-x1", "closed", { closed_at: "2026-11-01T00:00:00Z" }))}\n`;
    for (const name of CONTINUATION_NAMES_IN_THE_FORM) {
      const result = compactTrackerExport({ full, shards: new Map([[name, other]]), now });
      if (!result.ok) throw new Error(`${name}: ${result.lines.join("\n")}`);
      expect(result.shards.get(name)?.startsWith(other), `${name}: accepted as a shard, its text kept as its prefix`).toBe(true);
    }
    for (const name of CONTINUATION_NAMES_OUTSIDE_THE_FORM) {
      expect(compactTrackerExport({ full, shards: new Map([[name, other]]), now }), name).toEqual({
        ok: false,
        code: "malformed",
        lines: [`tracker-export: REFUSED ${name} is not a month shard name (issues-closed-YYYY-MM.jsonl); nothing is written`],
      });
    }
    // The reader: the fixture's main export beside one file of the name, holding wb-c2's full line.
    const compacted = compactTrackerExport({ full, shards: new Map(), now });
    if (!compacted.ok) throw new Error(compacted.lines.join("\n"));
    const c2 = lineOf(fixtureRows()[2] ?? {});
    const withC2 = compacted.main
      .split("\n")
      .map(line => (line !== "" && parsed(line).id === "wb-c2" ? c2 : line))
      .join("\n");
    expect(withC2, "the stub of wb-c2 is replaced").not.toBe(compacted.main);
    const readBeside = (name: string): string => {
      const dir = scratch("tracker-export-continuation-");
      mkdirSync(join(dir, "archive"));
      writeFileSync(join(dir, "issues.jsonl"), compacted.main);
      writeFileSync(join(dir, "archive", name), `${c2}\n`);
      return trackerExportText(join(dir, "issues.jsonl"));
    };
    for (const name of CONTINUATION_NAMES_IN_THE_FORM) expect(readBeside(name), `${name}: read as a shard`).toBe(withC2);
    for (const name of CONTINUATION_NAMES_OUTSIDE_THE_FORM) expect(readBeside(name), `${name}: not read`).toBe(compacted.main);
  });

  it("M2 NAME ORDER: a month's continuations are read after its monthly shard, in letter order, and before the next month's shards: wb-c1 (in 2026-11, -b and -c) reads as its -c line and wb-c5 (in 2026-11-c and 2026-12) as its 2026-12 line, via rehydrateTrackerText in three Map orders and via trackerExportText; compactTrackerExport appends nothing when wb-c1's line equals its -c line and appends it to -c when it equals the monthly shard's", () => {
    const c1 = (notes: string): Row => row("wb-c1", "closed", { closed_at: "2026-11-02T08:00:00Z", notes });
    const c5 = (notes: string): Row => row("wb-c5", "closed", { closed_at: "2026-11-20T08:00:00Z", notes });
    const monthly = ["issues-closed-2026-11.jsonl", `${lineOf(c1("the monthly shard's body"))}\n`] as const;
    const b = ["issues-closed-2026-11-b.jsonl", `${lineOf(c1("the -b body"))}\n`] as const;
    const c = ["issues-closed-2026-11-c.jsonl", `${lineOf(c1("the -c body"))}\n${lineOf(c5("the -c body"))}\n`] as const;
    const dec = ["issues-closed-2026-12.jsonl", `${lineOf(c5("the 2026-12 body"))}\n`] as const;
    const now = "2026-11-25T12:00:00Z";
    expect([b, c, monthly, dec].map(([name]) => name), "the order of the names' text").toEqual([monthly, b, c, dec].map(([name]) => name).sort());
    const stubbed = compactTrackerExport({ full: textOf([row("wb-o1", "open"), c1("any body"), c5("any body")]), shards: new Map(), now });
    if (!stubbed.ok) throw new Error(stubbed.lines.join("\n"));
    const expected = textOf([row("wb-o1", "open"), c1("the -c body"), c5("the 2026-12 body")]);
    const orders = [
      ["name order", [monthly, b, c, dec]],
      ["its reverse", [dec, c, b, monthly]],
      ["the order of the names' text", [b, c, monthly, dec]],
    ] as const;
    for (const [order, entries] of orders) {
      expect(rehydrateTrackerText(stubbed.main, new Map<string, string>(entries)), `${order}: rehydrateTrackerText`).toBe(expected);
    }
    const dir = scratch("tracker-export-continuation-");
    mkdirSync(join(dir, "archive"));
    writeFileSync(join(dir, "issues.jsonl"), stubbed.main);
    for (const [name, text] of [monthly, b, c, dec]) writeFileSync(join(dir, "archive", name), text);
    expect(trackerExportText(join(dir, "issues.jsonl")), "trackerExportText beside the shard files").toBe(expected);
    const novOrders = [
      ["name order", [monthly, b, c]],
      ["its reverse", [c, b, monthly]],
      ["the order of the names' text", [b, c, monthly]],
    ] as const;
    for (const [order, entries] of novOrders) {
      const shards = new Map<string, string>(entries);
      const same = compactTrackerExport({ full: textOf([row("wb-o1", "open"), c1("the -c body")]), shards, now });
      if (!same.ok) throw new Error(`${order}: ${same.lines.join("\n")}`);
      expect([[...same.appended], [...same.shards.keys()]], `${order}: the full line equals the -c line, the latest`).toEqual([[], [monthly[0], b[0], c[0]]]);
      const back = compactTrackerExport({ full: textOf([row("wb-o1", "open"), c1("the monthly shard's body")]), shards, now });
      if (!back.ok) throw new Error(`${order}: ${back.lines.join("\n")}`);
      expect([[...back.appended], [...back.shards.keys()], back.shards.get(c[0])], `${order}: the full line equals the monthly shard's line, so it is appended to -c`).toEqual([
        [[c[0], ["wb-c1"]]],
        [monthly[0], b[0], c[0]],
        `${c[1]}${lineOf(c1("the monthly shard's body"))}\n`,
      ]);
    }
  });

  it("M3 SEAL AND CONTINUE: a line that would put its month's latest shard at or over the ceiling, while an empty shard holds it under it, seals that shard and opens the next continuation: seven equal lines at a three-line ceiling fill the monthly shard, -b and -c (3, 3, 1) in export order; with an existing -b, a run appends to -b, never to the monthly shard, then opens -c; maps in name order, every file under the ceiling, round trip byte-equal", () => {
    const notes = "n".repeat(1000);
    const seven = ["wb-m1", "wb-m2", "wb-m3", "wb-m4", "wb-m5", "wb-m6", "wb-m7"].map(id => closedNov(id, notes));
    const size = lineBytes(seven[0] ?? {});
    expect(seven.map(lineBytes), "seven lines of one length").toEqual(seven.map(() => size));
    const full = textOf([row("wb-o1", "open"), ...seven]);
    const ceiling = 3 * size + 1;
    const first = compactTrackerExport({ full, shards: new Map(), now: "2026-11-03T12:00:00Z", ceiling });
    if (!first.ok) throw new Error(first.lines.join("\n"));
    expect([...first.appended], "the first compaction's appended map").toEqual([
      ["issues-closed-2026-11.jsonl", ["wb-m1", "wb-m2", "wb-m3"]],
      ["issues-closed-2026-11-b.jsonl", ["wb-m4", "wb-m5", "wb-m6"]],
      ["issues-closed-2026-11-c.jsonl", ["wb-m7"]],
    ]);
    expect([...first.shards], "the first compaction's shards").toEqual([
      ["issues-closed-2026-11.jsonl", textOf(seven.slice(0, 3))],
      ["issues-closed-2026-11-b.jsonl", textOf(seven.slice(3, 6))],
      ["issues-closed-2026-11-c.jsonl", textOf(seven.slice(6))],
    ]);
    expect([first.main, ...first.shards.values()].map(text => Buffer.byteLength(text) < ceiling), "every file under the ceiling").toEqual([true, true, true, true]);
    expect(rehydrateTrackerText(first.main, first.shards), "the first compaction's round trip").toBe(full);
    // A month whose -b continuation exists beside a monthly shard with room: the run appends to -b, then opens -c.
    const older = closedNov("wb-m1", "an older body");
    const monthly = textOf([older]);
    const continued = textOf([closedNov("wb-m2", notes)]);
    const later = [row("wb-o1", "open"), closedNov("wb-m1", notes), closedNov("wb-m2", notes), closedNov("wb-m3", notes), closedNov("wb-m4", notes)];
    const laterFull = textOf(later);
    expect(Buffer.byteLength(monthly) + 2 * size < ceiling, "the monthly shard has room for two of the run's lines").toBe(true);
    const run = compactTrackerExport({ full: laterFull, shards: new Map([["issues-closed-2026-11-b.jsonl", continued], ["issues-closed-2026-11.jsonl", monthly]]), now: "2026-11-04T12:00:00Z", ceiling });
    if (!run.ok) throw new Error(run.lines.join("\n"));
    expect([...run.appended], "the later run's appended map").toEqual([
      ["issues-closed-2026-11-b.jsonl", ["wb-m1", "wb-m3"]],
      ["issues-closed-2026-11-c.jsonl", ["wb-m4"]],
    ]);
    expect([...run.shards], "the later run's shards").toEqual([
      ["issues-closed-2026-11.jsonl", monthly],
      ["issues-closed-2026-11-b.jsonl", `${continued}${textOf([closedNov("wb-m1", notes), closedNov("wb-m3", notes)])}`],
      ["issues-closed-2026-11-c.jsonl", textOf([closedNov("wb-m4", notes)])],
    ]);
    expect([run.main, ...run.shards.values()].map(text => Buffer.byteLength(text) < ceiling), "every file under the ceiling").toEqual([true, true, true, true]);
    expect(rehydrateTrackerText(run.main, run.shards), "the later run's round trip").toBe(laterFull);
  });

  it("M4 NO CONTINUATION: a line no empty shard holds under the ceiling stays with the monthly shard, which refuses as oversize naming it; a line that would put -z at the ceiling goes to -z, which refuses as oversize naming -z alone; and a latest shard already at the ceiling takes no line - the run refuses with one typed line naming it at its own bytes", () => {
    const now = "2026-11-03T12:00:00Z";
    const c8 = closedNov("wb-c8", "x".repeat(2000));
    const c9 = closedNov("wb-c9", "x".repeat(2000));
    const full = textOf([row("wb-o1", "open"), c9]);
    const monthly = textOf([c8]);
    const lineCeiling = lineBytes(c9);
    expect(compactTrackerExport({ full, shards: new Map([["issues-closed-2026-11.jsonl", monthly]]), now, ceiling: lineCeiling }), "a line an empty shard would not hold").toEqual({
      ok: false,
      code: "oversize",
      lines: [oversize("archive/issues-closed-2026-11.jsonl", Buffer.byteLength(monthly) + lineBytes(c9), lineCeiling)],
    });
    const last = textOf([c8]);
    const zCeiling = Buffer.byteLength(last) + lineBytes(c9);
    expect(compactTrackerExport({ full, shards: new Map([["issues-closed-2026-11.jsonl", textOf([closedNov("wb-c7", "a body")])], ["issues-closed-2026-11-z.jsonl", last]]), now, ceiling: zCeiling }), "no continuation after -z").toEqual({
      ok: false,
      code: "oversize",
      lines: [oversize("archive/issues-closed-2026-11-z.jsonl", zCeiling, zCeiling)],
    });
    const atCeiling = textOf([closedNov("wb-c8", "x".repeat(4096))]);
    const atBytes = Buffer.byteLength(atCeiling);
    expect(lineBytes(c9) < atBytes, "the run's line is under the existing shard's bytes").toBe(true);
    expect(compactTrackerExport({ full, shards: new Map([["issues-closed-2026-11.jsonl", atCeiling]]), now, ceiling: atBytes }), "a latest shard already at the ceiling").toEqual({
      ok: false,
      code: "oversize",
      lines: [oversize("archive/issues-closed-2026-11.jsonl", atBytes, atBytes)],
    });
  });

  it("M5 CLI CONTINUATION: under an FW_EXPORT_SOFT_CEILING at which the monthly shard cannot take the run's line, compact writes the line to a new -b continuation and leaves the monthly shard's inode, bytes and mtime unchanged, its receipt naming -b once, no temporary file left; rehydrate prints the full export; a re-run appends nothing; and at the default ceiling a third row goes to -b, not to the monthly shard", () => {
    const dir = scratch("tracker-export-continuation-cli-");
    const beads = join(dir, ".beads");
    mkdirSync(beads);
    const fullPath = join(dir, "full.jsonl");
    const now = "2026-11-03T12:00:00Z";
    const c8 = closedNov("wb-c8", "x".repeat(2000));
    const c9 = closedNov("wb-c9", "x".repeat(2000));
    const c7 = closedNov("wb-c7", "a short body");
    const appendedOf = (stdout: unknown): Json => (String(stdout) === "" ? "no receipt" : ((JSON.parse(String(stdout)) as Row).appended ?? null));
    writeFileSync(fullPath, textOf([row("wb-o1", "open"), c8]));
    const first = cli(["compact", "--full", fullPath, "--beads", beads, "--now", now]);
    expect([first.status, first.stderr, appendedOf(first.stdout)], "the first run").toEqual([0, "", { "issues-closed-2026-11.jsonl": 1 }]);
    const monthly = join(beads, "archive", "issues-closed-2026-11.jsonl");
    const continuation = join(beads, "archive", "issues-closed-2026-11-b.jsonl");
    const pinned = 1_790_000_000;
    utimesSync(monthly, pinned, pinned);
    const kept = (): readonly [number, number, string] => [lstatSync(monthly).ino, lstatSync(monthly).mtimeMs, readFileSync(monthly, "utf8")];
    const monthlyBefore = kept();
    const ceiling = Buffer.byteLength(textOf([c8])) + 1;
    expect([lineBytes(c9) < ceiling, Buffer.byteLength(textOf([c8])) + lineBytes(c9) >= ceiling], "the run's line fits an empty shard and not the monthly one").toEqual([true, true]);
    writeFileSync(fullPath, textOf([row("wb-o1", "open"), c8, c9]));
    const env = { FW_EXPORT_SOFT_CEILING: String(ceiling) };
    const second = cli(["compact", "--full", fullPath, "--beads", beads, "--now", now], env);
    expect([second.status, second.stderr, appendedOf(second.stdout)], "the run under the ceiling").toEqual([0, "", { "issues-closed-2026-11-b.jsonl": 1 }]);
    expect(kept(), "the sealed monthly shard is not written").toEqual(monthlyBefore);
    expect(readFileSync(continuation, "utf8"), "the -b continuation holds the run's line").toBe(textOf([c9]));
    expect(readdirSync(beads).sort(), "no temporary file stays").toEqual(["archive", "issues.jsonl"]);
    expect(cli(["rehydrate", "--beads", beads]).stdout, "rehydrate prints the full export").toBe(readFileSync(fullPath, "utf8"));
    const rerun = cli(["compact", "--full", fullPath, "--beads", beads, "--now", now], env);
    expect([rerun.status, rerun.stderr, appendedOf(rerun.stdout)], "the re-run").toEqual([0, "", {}]);
    writeFileSync(fullPath, textOf([row("wb-o1", "open"), c8, c9, c7]));
    const third = cli(["compact", "--full", fullPath, "--beads", beads, "--now", now]);
    expect([third.status, third.stderr, appendedOf(third.stdout)], "the run at the default ceiling").toEqual([0, "", { "issues-closed-2026-11-b.jsonl": 1 }]);
    expect(kept(), "the monthly shard is not written at the default ceiling either").toEqual(monthlyBefore);
    expect(readFileSync(continuation, "utf8"), "-b grows by the third row's line").toBe(textOf([c9, c7]));
    expect(cli(["rehydrate", "--beads", beads]).stdout, "rehydrate prints the full export again").toBe(readFileSync(fullPath, "utf8"));
  });

  it("M6 READ MEMO: a continuation written beside an archive a process has read is read - trackerExportText of one main export, before and after issues-closed-2026-11-b.jsonl is written beside its monthly shard, reads the stub of wb-c9 as itself and then as the continuation's line", () => {
    const dir = scratch("tracker-export-continuation-");
    mkdirSync(join(dir, "archive"));
    const rows = [row("wb-o1", "open"), closedNov("wb-c8", "a body"), closedNov("wb-c9", "a body")];
    const compacted = compactTrackerExport({ full: textOf(rows), shards: new Map(), now: "2026-11-03T12:00:00Z" });
    if (!compacted.ok) throw new Error(compacted.lines.join("\n"));
    const main = join(dir, "issues.jsonl");
    writeFileSync(main, compacted.main);
    writeFileSync(join(dir, "archive", "issues-closed-2026-11.jsonl"), textOf([rows[1] ?? {}]));
    const stub = linesOf(compacted.main)[2] ?? "";
    expect(parsed(stub).id).toBe("wb-c9");
    expect(trackerExportText(main), "before the continuation").toBe(`${lineOf(rows[0] ?? {})}\n${lineOf(rows[1] ?? {})}\n${stub}\n`);
    writeFileSync(join(dir, "archive", "issues-closed-2026-11-b.jsonl"), textOf([rows[2] ?? {}]));
    expect(trackerExportText(main), "after the continuation").toBe(textOf(rows));
  });
});

describe("wb-294d round trip over the tracked export (owner element 3, read through the rehydrating reader)", () => {
  it("T1 the tracked export compacts under the ceiling and rehydrates byte-equal; non-closed rows byte-equal; every closed row recoverable by id; every edge into a closed bead resolves to its stub; its read equals the tracked file's text decoded as UTF-8 by the suite's own decoder; the compaction, written to files, reads back as that export; and the CLI compacting it twice appends nothing the second time and keeps each shard's bytes", () => {
    const full = trackerExportText(TRACKED_EXPORT);
    // wb-137f refusal #3 U1 (GP1-16 on the repository's own export): the read against the suite's own UTF-8 decode of the file - of
    // its shard files too, when an archive beside it holds any (the tracked layout holds none at this cut).
    const decoded = rehydrateTrackerText(utf8Of(TRACKED_EXPORT), shardFilesBeside(TRACKED_EXPORT));
    expect([full === decoded, differingLines(full, decoded)], "the read equals the tracked file's UTF-8 text").toEqual([true, 0]);
    const now = new Date().toISOString();
    const result = compactTrackerExport({ full, shards: new Map(), now });
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
    // wb-137f refusal #3 U1 (GP1-15 and GP1-17 on the repository's own export): the CLI compacts the export to files - the same bytes
    // as the compaction above - which read back as the export; a second run appends nothing and keeps each shard's bytes.
    const dir = scratch("tracker-export-tracked-");
    const beads = join(dir, ".beads");
    mkdirSync(beads);
    const fullPath = join(dir, "full.jsonl");
    writeFileSync(fullPath, full);
    const first = cli(["compact", "--full", fullPath, "--beads", beads, "--now", now]);
    expect([first.status, first.stderr]).toEqual([0, ""]);
    expect(Buffer.compare(readFileSync(join(beads, "issues.jsonl")), Buffer.from(result.main, "utf8")), "the CLI's main export").toBe(0);
    expect(readdirSync(join(beads, "archive")).sort(byNameOrder)).toEqual([...result.shards.keys()]);
    const shardBytes = (): Buffer[] => [...result.shards.keys()].map(name => readFileSync(join(beads, "archive", name)));
    const written = shardBytes();
    expect(written.map((bytes, index) => Buffer.compare(bytes, Buffer.from([...result.shards.values()][index] ?? "", "utf8"))), "the CLI's shards").toEqual(written.map(() => 0));
    const readBack = trackerExportText(join(beads, "issues.jsonl"));
    expect([readBack === full, differingLines(readBack, full)], "the files read back as the export").toEqual([true, 0]);
    const again = cli(["compact", "--full", fullPath, "--beads", beads, "--now", now]);
    expect([again.status, again.stderr]).toEqual([0, ""]);
    expect((JSON.parse(String(again.stdout)) as Row).appended, "the second run appends nothing").toEqual({});
    expect(shardBytes().map((bytes, index) => Buffer.compare(bytes, written[index] ?? Buffer.alloc(0))), "each shard keeps its bytes").toEqual(written.map(() => 0));
  }, 180_000);

  it("T2 MULTI-PART MONTH (wb-tt43): five closed rows of 2026-11 at a two-line ceiling compact into the monthly shard, -b and -c (2, 2, 1) and round-trip byte-equal; non-closed rows byte-equal; each closed row recoverable from its shard; each edge into a closed bead resolves to its stub, wb-n3 (-b) -> wb-n1 (monthly) and wb-o1 -> wb-n5 (-c) among them; the CLI writes the same files, read back as the export, and a re-run appends nothing", () => {
    const notes = "t".repeat(1000);
    const edge = (from: string, to: string): Row => ({ issue_id: from, depends_on_id: to, type: "blocks" });
    const closed = (id: string, deps: readonly string[] = []): Row => row(id, "closed", { closed_at: "2026-11-02T08:00:00Z", notes, dependencies: deps.map(to => edge(id, to)) });
    const rows = [row("wb-o1", "open", { dependencies: [edge("wb-o1", "wb-n5")] }), closed("wb-n1"), closed("wb-n2"), row("wb-p1", "in_progress"), closed("wb-n3", ["wb-n1"]), closed("wb-n4"), closed("wb-n5")];
    const full = textOf(rows);
    const closedRows = rows.filter(r => r.status === "closed");
    const sizes = closedRows.map(r => Buffer.byteLength(`${lineOf(r)}\n`)).sort((a, b) => b - a);
    const ceiling = (sizes[0] ?? 0) + (sizes[1] ?? 0) + 1;
    expect(3 * Math.min(...sizes) >= ceiling, "no three of the lines are under the ceiling").toBe(true);
    const now = "2026-11-03T12:00:00Z";
    const result = compactTrackerExport({ full, shards: new Map(), now, ceiling });
    if (!result.ok) throw new Error(result.lines.join("\n"));
    expect([...result.appended], "two, two and one line").toEqual([
      ["issues-closed-2026-11.jsonl", ["wb-n1", "wb-n2"]],
      ["issues-closed-2026-11-b.jsonl", ["wb-n3", "wb-n4"]],
      ["issues-closed-2026-11-c.jsonl", ["wb-n5"]],
    ]);
    expect(rehydrateTrackerText(result.main, result.shards), "the round trip").toBe(full);
    const fullLines = linesOf(full);
    const mainLines = linesOf(result.main);
    expect(mainLines.length).toBe(fullLines.length);
    expect(mainLines.filter(line => parsed(line).status !== "closed"), "the non-closed rows").toEqual(fullLines.filter(line => parsed(line).status !== "closed"));
    const archived = new Map<string, string>();
    const holder = new Map<string, string>();
    for (const [name, text] of result.shards) {
      for (const line of linesOf(text)) {
        archived.set(String(parsed(line).id), line);
        holder.set(String(parsed(line).id), name);
      }
    }
    for (const value of closedRows) expect(archived.get(String(value.id)), String(value.id)).toBe(lineOf(value));
    const stubs = new Map(mainLines.map(parsed).filter(value => value.status === "closed").map(value => [String(value.id), value]));
    const closedIds = new Set(closedRows.map(value => String(value.id)));
    const edges = fullLines
      .map(parsed)
      .flatMap(value => (Array.isArray(value.dependencies) ? value.dependencies : []).map(dep => [String(value.id), dep !== null && typeof dep === "object" && !Array.isArray(dep) ? String(dep.depends_on_id) : ""] as const))
      .filter(([, to]) => closedIds.has(to));
    expect(edges.map(([from, to]) => `${from} (${holder.get(from) ?? "the main export"}) -> ${to} (${holder.get(to) ?? "no shard"})`), "the edges into closed beads, by the shard holding each end").toEqual([
      "wb-o1 (the main export) -> wb-n5 (issues-closed-2026-11-c.jsonl)",
      "wb-n3 (issues-closed-2026-11-b.jsonl) -> wb-n1 (issues-closed-2026-11.jsonl)",
    ]);
    for (const [, to] of edges) {
      const stub = stubs.get(to);
      expect(stub?.status, to).toBe("closed");
      expect(Object.keys(stub ?? {}).every(key => EXPECTED_STUB_FIELDS.includes(key)), to).toBe(true);
    }
    const dir = scratch("tracker-export-multi-part-");
    const beads = join(dir, ".beads");
    mkdirSync(beads);
    const fullPath = join(dir, "full.jsonl");
    writeFileSync(fullPath, full);
    const env = { FW_EXPORT_SOFT_CEILING: String(ceiling) };
    const first = cli(["compact", "--full", fullPath, "--beads", beads, "--now", now], env);
    expect([first.status, first.stderr]).toEqual([0, ""]);
    const mainPath = join(beads, "issues.jsonl");
    expect(Buffer.compare(readFileSync(mainPath), Buffer.from(result.main, "utf8")), "the CLI's main export").toBe(0);
    expect(readdirSync(join(beads, "archive")).sort(byNameOrder), "the shards, in name order").toEqual([...result.shards.keys()]);
    const shardBytes = (): Buffer[] => [...result.shards.keys()].map(name => readFileSync(join(beads, "archive", name)));
    const written = shardBytes();
    expect(written.map((bytes, index) => Buffer.compare(bytes, Buffer.from([...result.shards.values()][index] ?? "", "utf8"))), "the CLI's shards").toEqual([0, 0, 0]);
    expect(trackerExportText(mainPath), "the files read back as the export").toBe(full);
    expect(rehydrateTrackerText(utf8Of(mainPath), shardFilesBeside(mainPath)), "the suite's own decode of the files").toBe(full);
    const again = cli(["compact", "--full", fullPath, "--beads", beads, "--now", now], env);
    expect([again.status, again.stderr]).toEqual([0, ""]);
    expect((JSON.parse(String(again.stdout)) as Row).appended, "the second run appends nothing").toEqual({});
    expect(shardBytes().map((bytes, index) => Buffer.compare(bytes, written[index] ?? Buffer.alloc(0))), "each shard keeps its bytes").toEqual([0, 0, 0]);
  }, 120_000);

});

describe("wb-137f plant tables: their shape, and the module header's list of them (refusal #2 F4)", () => {
  it("P1 PLANT TABLES: WHITESPACE_LINES, BAD_SHARD_LINES, SHARD_LAYOUTS, PLANT_AT, PREFIX_FORMS, COMMENT_FORMS and CLI_FORMS hold exactly the rows below, and the module header's PLANTED SHARD LINES block names exactly BAD_SHARD_LINES reason by reason, SHARD_LAYOUTS and PLANT_AT, each in its table's order, and carries the sha256 of BAD_SHARD_LINES, SHARD_LAYOUTS and PLANT_AT's rows, every label, line and reason", () => {
    expect(WHITESPACE_LINES.map(([label, line]) => [label, [...line].map(char => char.codePointAt(0))])).toEqual([
      ["a line of one space", [0x20]],
      ["a line of one tab", [0x09]],
      ["a line of spaces and a tab", [0x20, 0x20, 0x09, 0x20]],
      ["a line of a vertical tab", [0x0b]],
      ["a line of a form feed", [0x0c]],
      ["a line of a no-break space", [0xa0]],
      ["a line of a byte order mark", [0xfeff]],
      ["a line of a line separator", [0x2028]],
    ]);
    const parse = "does not parse";
    expect(BAD_SHARD_LINES.map(([label, , reason]) => [label, reason])).toEqual([
      ["the prefix form cut short", parse],
      ["the prefix form followed by other text", parse],
      ["the prefix form with an id holding an invalid escape", parse],
      ["the prefix form with an empty id", "has no string id"],
      ["no prefix, cut short", parse],
      ["no prefix, followed by other text", parse],
      ["no prefix, an id holding an invalid escape", parse],
      ["no prefix, an empty id", "has no string id"],
      ["an array", "is not a JSON object"],
      ["null", "is not a JSON object"],
      ["a number", "is not a JSON object"],
      ["no id", "has no string id"],
      ["a number id", "has no string id"],
      ["a line that opens like a # comment", parse],
      ["a line that opens like a // comment", parse],
      ["a line that opens like a /* comment", parse],
      ["a line that opens like a -- comment", parse],
      ["a line that opens like a ; comment", parse],
      ["a line that opens like a <!-- comment", parse],
      ...WHITESPACE_LINES.map(([label]) => [label, parse]),
    ]);
    expect(BAD_SHARD_LINES).toHaveLength(27);
    expect(SHARD_LAYOUTS).toEqual([
      ["the only shard", "issues-closed-2026-11.jsonl", []],
      ["the older of two shards", "issues-closed-2026-10.jsonl", ["issues-closed-2026-11.jsonl"]],
      ["the newer of two shards", "issues-closed-2026-11.jsonl", ["issues-closed-2026-10.jsonl"]],
      ["the middle of three shards", "issues-closed-2026-10.jsonl", ["issues-closed-2026-09.jsonl", "issues-closed-2026-11.jsonl"]],
    ]);
    const c3 = lineOf(row("wb-c3", "closed"));
    const c4 = lineOf(row("wb-c4", "closed"));
    expect(PLANT_AT.map(([at, label, text]) => [at, label, text("BAD")])).toEqual([
      [1, "line 1 before a whole row", `BAD\n${c3}\n`],
      [2, "line 2 between two whole rows", `${c3}\nBAD\n${c4}\n`],
      [3, "line 3 after two whole rows", `${c3}\n${c4}\nBAD\n`],
    ]);
    expect(PREFIX_FORMS.map(([label]) => label)).toEqual(["the prefix form cut short", "the prefix form followed by other text", "the prefix form with an id holding an invalid escape", "the prefix form with an empty id"]);
    expect(COMMENT_FORMS.map(([, line]) => line)).toEqual(["# a note", "// a note", "/* a note */", "-- a note", "; a note", "<!-- a note -->"]);
    expect(CLI_FORMS.map(([label]) => label)).toEqual([...PREFIX_FORMS, ...COMMENT_FORMS].map(([label]) => label));
    for (const reason of [parse, "is not a JSON object", "has no string id"]) {
      expect(headerList(reason), `the module header's "${reason}" list`).toEqual(BAD_SHARD_LINES.filter(([, , planted]) => planted === reason).map(([label]) => label));
    }
    expect(headerList("layouts"), "the module header's layouts list").toEqual(SHARD_LAYOUTS.map(([label]) => label));
    expect(headerList("positions"), "the module header's positions list").toEqual(PLANT_AT.map(([, label]) => label));
    // The tables' every row, its line text included, against the digest the module header carries: a row's line swapped for another
    // planted line, or a row dropped from the table and from every literal above, reds here.
    const tables = JSON.stringify({ BAD_SHARD_LINES, SHARD_LAYOUTS, PLANT_AT: PLANT_AT.map(([at, label, text]) => [at, label, text("BAD")]) });
    expect(headerList("plant tables sha256"), "the module header's digest of the plant tables").toEqual([createHash("sha256").update(tables).digest("hex")]);
  });
});

describe("wb-137f cut #4 plant tables: their shape, and the module header's lists of them (refusal #3 U1, U2, U4)", () => {
  it("P2 PLANT TABLES: UTF8_CHARACTERS, NAMES_OUTSIDE_THE_FORM, SHARD_NAMES_IN_THE_FORM, STATUSES_NOT_CLOSED and FIELDS_BEYOND_STUB hold exactly the rows below, and the module header lists each of them exactly, in its table's order, under its own key", () => {
    const codePoints = (text: string): string => [...text].map(char => `U+${(char.codePointAt(0) ?? 0).toString(16).toUpperCase().padStart(4, "0")}`).join(" ");
    expect(UTF8_CHARACTERS.map(([label, text]) => [label, codePoints(text)])).toEqual([
      ["U+00E9", "U+00E9"],
      ["U+2014", "U+2014"],
      ["U+1F600", "U+1F600"],
      ["U+00A0", "U+00A0"],
      ["U+0065 U+0301", "U+0065 U+0301"],
      ["U+2028", "U+2028"],
    ]);
    expect(UTF8_CHARACTERS.map(([, text]) => Buffer.byteLength(text))).toEqual([2, 3, 4, 2, 3, 3]);
    expect(codePoints(BYTE_ORDER_MARK)).toBe("U+FEFF");
    expect(NAMES_OUTSIDE_THE_FORM).toEqual([
      "README.md",
      "issues-closed-2026-11-03.jsonl",
      "issues-closed-2026-00.jsonl",
      "issues-closed-2026-13.jsonl",
      "issues-closed-2026-14.jsonl",
      "issues-closed-2026-20.jsonl",
      "issues-closed-2026-1.jsonl",
      "issues-closed-2026-.jsonl",
      "issues-closed-202611.jsonl",
      "issues-closed-202-11.jsonl",
      "issues-closed-20261-11.jsonl",
      "issues-closed-YYYY-11.jsonl",
      "issues-closed-2026-11.jsonl.bak",
      "old-issues-closed-2026-11.jsonl",
      "ISSUES-CLOSED-2026-11.JSONL",
      "issues-closed-2026-11.json",
      "issues-closed-2026-11xjsonl",
    ]);
    expect(SHARD_NAMES_IN_THE_FORM).toEqual([
      "issues-closed-2026-01.jsonl",
      "issues-closed-2026-02.jsonl",
      "issues-closed-2026-03.jsonl",
      "issues-closed-2026-04.jsonl",
      "issues-closed-2026-05.jsonl",
      "issues-closed-2026-06.jsonl",
      "issues-closed-2026-07.jsonl",
      "issues-closed-2026-08.jsonl",
      "issues-closed-2026-09.jsonl",
      "issues-closed-2026-10.jsonl",
      "issues-closed-2026-11.jsonl",
      "issues-closed-2026-12.jsonl",
      "issues-closed-0000-01.jsonl",
      "issues-closed-1999-01.jsonl",
      "issues-closed-9999-12.jsonl",
    ]);
    expect(STATUSES_NOT_CLOSED.map(status => JSON.stringify(status))).toEqual(['"open"', '"Closed"', '"CLOSED"', '"closed "', '" closed"', '"closed\\t"', '"closed\\n"', '"unclosed"', '"closedx"']);
    expect(FIELDS_BEYOND_STUB).toEqual(["_note", "notes", "description", "created_at", "priority", "labels", "titles", "type"]);
    expect(headerList("UTF-8 characters"), "the module header's UTF-8 characters list").toEqual(UTF8_CHARACTERS.map(([label]) => label));
    expect(headerList("names outside the form"), "the module header's names outside the form").toEqual([...NAMES_OUTSIDE_THE_FORM]);
    expect(headerList("shard names in the form"), "the module header's shard names in the form").toEqual([...SHARD_NAMES_IN_THE_FORM]);
    expect(headerList("statuses not closed"), "the module header's statuses not closed").toEqual(STATUSES_NOT_CLOSED.map(status => JSON.stringify(status)));
    expect(headerList("fields beyond STUB_FIELDS"), "the module header's fields beyond STUB_FIELDS").toEqual([...FIELDS_BEYOND_STUB]);
  });
});

describe("wb-tt43 plant tables: their shape, and the module header's lists of them", () => {
  it("P3 PLANT TABLES: CONTINUATION_NAMES_IN_THE_FORM and CONTINUATION_NAMES_OUTSIDE_THE_FORM hold exactly the rows below, and the module header lists each of them exactly, in its table's order, under its own key", () => {
    expect(CONTINUATION_NAMES_IN_THE_FORM).toEqual([
      "issues-closed-2026-11-b.jsonl",
      "issues-closed-2026-11-c.jsonl",
      "issues-closed-2026-11-z.jsonl",
      "issues-closed-2026-01-b.jsonl",
      "issues-closed-2026-12-y.jsonl",
      "issues-closed-0000-01-b.jsonl",
      "issues-closed-9999-12-z.jsonl",
    ]);
    expect(CONTINUATION_NAMES_OUTSIDE_THE_FORM).toEqual([
      "issues-closed-2026-11-a.jsonl",
      "issues-closed-2026-11-B.jsonl",
      "issues-closed-2026-11-bb.jsonl",
      "issues-closed-2026-11-1.jsonl",
      "issues-closed-2026-11-.jsonl",
      "issues-closed-2026-11b.jsonl",
      "issues-closed-2026-11_b.jsonl",
      "issues-closed-2026-11--b.jsonl",
      "issues-closed-2026-11-b-c.jsonl",
      "issues-closed-2026-11-03-b.jsonl",
      "issues-closed-2026-13-b.jsonl",
      "issues-closed-2026-00-b.jsonl",
      "issues-closed-2026-11-b.json",
      "issues-closed-2026-11-b.jsonl.bak",
      "old-issues-closed-2026-11-b.jsonl",
      "ISSUES-CLOSED-2026-11-B.JSONL",
    ]);
    expect(headerList("continuation names in the form"), "the module header's continuation names in the form").toEqual([...CONTINUATION_NAMES_IN_THE_FORM]);
    expect(headerList("continuation names outside the form"), "the module header's continuation names outside the form").toEqual([...CONTINUATION_NAMES_OUTSIDE_THE_FORM]);
  });
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
