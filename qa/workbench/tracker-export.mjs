#!/usr/bin/env node
/**
 * wb-294d (g10.24-K1): the tracker export kept under GitHub's 104,857,600-byte blob wall.
 * wb-137f (the structural-exit child of wb-294d, ruling R-B677): the fail-closed core - every non-empty line of every shard is parsed
 * whole, never read by its prefix alone, whichever shard holds it (R3 and C9 plant each form in the only shard, the older and the newer
 * of two and the middle of three; K3 and K7 plant the export's prefix forms in the older of two, K3 in the only shard too and K7 in the
 * newer of two); a month shard's name names a calendar month (C9, R4, K5); compact refuses a path it would write that is a directory,
 * a symlink or a FIFO (K14).
 *
 * WHY (measured at trunk fd90f9d3, not a case: the tracked export moves). The tracker's export writes every bead, closed ones with
 * their whole bodies, into the tracked .beads/issues.jsonl: 95,821,804 bytes there (1,304 rows; the 1,179 closed rows 93,125,889
 * bytes of it, nearly all notes), growing about 6 MB a day. Owner shape ruling (bound on wb-294d): closed beads become STUB rows in
 * the pushed export, their bodies move to append-only monthly shards beside it, a round trip proves nothing is lost (T1 runs it over
 * the tracked export), and a 95 MiB soft ceiling guards the export and every shard before any push. Wiring the ritual into the
 * machine's hop and push paths (under its commit lock) is the machine's, outside this repository. This module's only child process
 * is git (S1).
 *
 * CLAIMS. The parenthesized ids cite the cases that pin a sentence: C, R, K, T and S are cases of
 * test/workbench-tracker-export-compaction.test.ts, G cases of test/workbench-tracker-export-guard.test.ts. NOT CLAIMED, at the end of
 * this header, names modes outside what those cases pin.
 *
 * LAYOUT (under a store's .beads directory):
 *   issues.jsonl                              the MAIN export: one line per line of the full export, in its order (C2) - a
 *                                             non-closed row's line unchanged (C2), a closed row's STUB line holding the
 *                                             STUB_FIELDS the row has, in the row's own key order, and no other field (C1, C11),
 *                                             an empty line (no character at all) kept empty (C15) - ending with a newline
 *                                             exactly when the full export does (C2, C12); a line of whitespace alone is not
 *                                             empty, and the full export refuses as malformed (C8).
 *   archive/issues-closed-YYYY-MM.jsonl       append-only month SHARDS holding closed rows' full export lines, unchanged (C3); MM is
 *                                             a calendar month, 01 to 12 (C9, R4, K5).
 * ROUTING. A closed row's period is the UTC month of its close stamp (C3, C3b), or the run's month when the row has no close stamp
 * that is a UTC stamp (C14) or its close month is after the run's (C13). The row goes to its period's shard when the period is the
 * run's month or newer than every shard that exists before the run (C3, C4b, C5), and otherwise - a month before the run's and at or
 * before the newest existing shard's, whether or not that month has a shard - to the run month's shard (C4, C4b, C5b). A closed row
 * is appended, by that rule, when no shard holds its id (C3) or its full line differs from its id's latest archived line (C4, C4b,
 * R2), and never when it equals it (C6, K1). A shard only ever grows by whole lines at its end (C4b); a non-empty shard that does
 * not end with a newline refuses, whichever shard it is (C9); an empty shard holds no line, whichever shard it is (C9). The latest
 * line of an id - the last one, shards in name order - is its body (C4, R2). So no run appends to a shard that existed before it and
 * is of a month before its own (C4, C4b), and a run creates a past month's shard only for a month newer than every existing shard
 * (C5, C5b). The period is the UTC close MONTH, as the owner shape orders (ruling R-B670 on wb-294d).
 * Measured at fd90f9d3: the beads closed in 2026-10 hold 46,834,285 bytes, those closed 2026-11-01..06 46,291,604, so the running
 * month's shard is the one that grows toward the soft ceiling; a run that would take the main export or any shard to it refuses
 * (exit 2, nothing written: C7, K3).
 * STUB FIELDS (MEASURED, a rationale and not a case: no case reads or writes a tracker store). Two fields beyond the ruling's list (id,
 * title, status, closed stamp, close reason, dep edges): `_type` is the export's row discriminator, and `updated_at` keeps an import of
 * the main export inert against a store that already holds the full rows (the tracker's importer rewrites an issue only when a row's
 * updated_at is strictly newer and stamps an absent one with the import time; measured with a scratch store, as the compaction suite's
 * header states).
 *
 * READERS. trackerExportText(path) reads a main export. With no archive directory beside it holding a shard file - a regular file
 * named issues-closed-YYYY-MM.jsonl, MM 01 to 12 - it returns the file's text unchanged (R1, R4, R9). Beside one, each STUB line - a
 * line that parses as a JSON object whose status is exactly "closed" ("Closed" is not, R6) and that holds no field but STUB_FIELDS,
 * however its JSON is spaced (R8) - whose id has an archived line is replaced by that id's latest archived line (R2), and every other
 * line is kept as it is: a full closed row (R5), a stub-shaped row that is not closed (R6, C6), a stub whose id no shard holds (R7). So
 * a main export the compaction wrote reads as the full export it was cut from (R2, K2). Of the entries beside the shards, a file of
 * another name (a README, a day shard's name, a month 00 or 13 name), and a symlink or a directory of a shard's name, is not read (R4).
 * Every non-empty line of every shard is parsed whole, never read by its prefix alone, whichever shard holds it - R3 plants each form
 * below in the only shard, the older and the newer of two and the middle of three, at line 1 and at line 2 between two rows: a line
 * that does not parse (cut short, followed by other text, or with an id holding an invalid escape - each planted with the export's own
 * line prefix and without it - a line that opens like a comment, and a line of whitespace alone, which is not empty: spaces, tabs, a
 * vertical tab, a form feed, a no-break space, a byte order mark or a line separator), is not a JSON object (an array, null, a number)
 * or has no non-empty string id (none, an empty one, a number) throws one Error naming the shard and the line; an empty line - one
 * with no character at all - holds no row and is skipped, in each of those shards (R3). A process reads an archive directory's shards
 * once and reads them again when its shard names, or a shard's size or modification time, change; a rewrite that keeps all three
 * reads as the earlier content; another archive directory is read on its own, though its shards keep the names, sizes and
 * modification times of shards read before (R10). rehydrateTrackerExport(text, path) is the same for a text a reader already read
 * from path (R2).
 *
 * GUARD. The pushed commits and objects of a push of <tip> are what `git rev-list --objects <tip> --not <excluded...>` lists (G5).
 * The tracker export family is every blob a pushed commit writes to the repository path .beads/issues.jsonl or below .beads/archive/
 * - its diff against a parent, a merge's against each parent, a root commit's whole tree (G2, G3, G4, G18) - whatever other path
 * also holds that blob (G17); a blob only other paths hold - another directory's .beads/issues.jsonl, .beads/issues.jsonl.bak,
 * .beads/archive-old/, a file named .beads/archive - is not judged (G6, G16), nor is a family blob the push would not send (G19). The
 * push refuses (exit 2) when a family blob it would send is at or over the soft ceiling (G2, G3, G4): one typed line on stderr per
 * such blob for the whole judgement, naming one family path a pushed commit writes it to, its blob and its bytes, however many family
 * paths or judged pushes hold it (G12, G14). A family blob under the ceiling passes (G2). FW_EXPORT_SOFT_CEILING
 * - a positive whole number of bytes, with no sign, padding, exponent or leading zero, at most 2^53 - 1 - replaces the default 95 MiB
 * = 99,614,720; an empty or absent value keeps the default (G1).
 *
 * CLI. Exit 0 done; 2 refused at the soft ceiling; 3 refused or could not run, in exactly the cases each verb lists:
 *   node qa/workbench/tracker-export.mjs compact --full <full export file> --beads <.beads dir> [--now <UTC stamp>]
 *       writes <dir>/issues.jsonl and each shard it appends to under <dir>/archive/ - each whole, by a rename over its path, leaving
 *       no temporary file in <dir> - and no other shard: a shard it does not append to keeps its inode, bytes and modification time
 *       (K13); then it prints one JSON receipt line on stdout (K1); a re-run with nothing changed appends nothing (K1, K13). Its inputs
 *       are the archive's shard files: a file of another name (a README, a month 13 name), and a directory or a symlink of a shard's
 *       name, is neither an input nor touched (K5, K14). --now names the run's UTC month (K12); without it the run stamp is the current
 *       time (K11). A UTC stamp is YYYY-MM-DDTHH:MM:SS, then an optional fraction of 1 to 9 digits, then Z or an offset +HH:MM /
 *       -HH:MM, every field in range (a calendar day; hour 00-23; minute and second 00-59; offset hour 00-23 and offset minute 00-59),
 *       its offset applied, and the instant inside the years 0000-9999 (C9, C16, K12). Exit 2 at the soft ceiling (K3). Exit 3 on a
 *       usage error (K6), a bad FW_EXPORT_SOFT_CEILING (K8), an input it cannot read (K9), a run stamp that is not a UTC stamp (K4,
 *       K12), a malformed export (K3, C8) or shard (K3, C9), a round trip that is not byte-equal (K10), and a path it would write - a
 *       shard it appends to, or the main export - that exists and is a directory, a symlink (to a file, to a directory, or dangling)
 *       or a FIFO, one typed line per such path, shards in name order and then the main export (K14). It writes nothing when it
 *       exits 2 or 3 (K3, K4, K6, K8, K9, K10, K14).
 *   node qa/workbench/tracker-export.mjs rehydrate --beads <.beads dir>
 *       prints trackerExportText(<dir>/issues.jsonl) on stdout as it is, adding no final newline (K2); exit 3, printing nothing on
 *       stdout, on a usage error (K6) and when the read throws (K7).
 *   node qa/workbench/tracker-export.mjs guard <tip> [--not <rev>]...
 *       judges a push of <tip> that excludes every <rev> (G2-G6); exit 3 on a usage error (G15), a bad FW_EXPORT_SOFT_CEILING (G1)
 *       and a tip git cannot list (G8).
 *   node qa/workbench/tracker-export.mjs pre-push <remote> [<url>]
 *       the git pre-push hook (G7): reads git's `<local ref> <local sha> <remote ref> <remote sha>` lines on stdin and judges each
 *       line's push of its local sha (G9), excluding the line's remote sha when this repository has that commit (G10) and every
 *       remote-tracking ref of <remote>, --remotes=<remote> (G11); a line whose local sha is all zeros (a deleted ref) pushes nothing
 *       and is skipped (G9). Exit 3 on a usage error (G15), a bad FW_EXPORT_SOFT_CEILING (G1), a malformed line (G9: one of two, three
 *       or five fields, or one whose local or remote sha is one digit short of 40 or in upper case - each sha form planted at both
 *       positions) and a push it cannot judge (G13) - unless a judged push refuses at the
 *       soft ceiling, when the exit is 2 (G13). Install once per clone:
 *         printf '#!/bin/sh\nexec node %s pre-push "$@"\n' "$PWD/qa/workbench/tracker-export.mjs" > "$(git rev-parse --git-path hooks)/pre-push"
 *         chmod +x "$(git rev-parse --git-path hooks)/pre-push"
 *   Any other verb, or none, exits 3 with the verbs' usage line (G15).
 *
 * RESIDUALS: none named at this cut.
 * NOT CLAIMED: the machine wiring named above; line ends other than a bare newline and text that is not UTF-8; two compactions of one
 * .beads directory at once, a crash while one writes, and a write or a pre-write check that fails with an error (the error is thrown,
 * the exit is 1, and a file written before it stays written); where the temporary file sits; an archive directory, shard or export the
 * process cannot list or read (the read throws; the compaction exits 3, K9); an archive directory that is a symlink to a directory;
 * what the tracker's importer does with a main export (STUB FIELDS above is a measurement); the time a parse of the shards takes; a
 * family blob a successful `git rev-list --objects` lists that `git cat-file` cannot size; a submodule entry at a family path; a FIFO,
 * a socket or a device file of a shard's name in the archive directory (R4 and K5 plant only symlinks and directories there), and a
 * socket or a device file at a path compact would write (K14 plants directories, symlinks and FIFOs); a sha of 64 hex digits one digit
 * short or in upper case at the pre-push hook (G9 plants 40-digit shas).
 */
import { spawnSync } from "node:child_process";
import { existsSync, lstatSync, mkdirSync, readdirSync, readFileSync, realpathSync, renameSync, statSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

/** The default soft ceiling: 95 MiB, under GitHub's 100 MiB (104,857,600-byte) hard block. */
export const DEFAULT_SOFT_CEILING = 95 * 1024 * 1024;
/** The environment variable that replaces the default soft ceiling (bytes). */
export const CEILING_ENV = "FW_EXPORT_SOFT_CEILING";
/** The main export, repository-relative. */
export const MAIN_EXPORT = ".beads/issues.jsonl";
/** The shard directory, repository-relative; the guard judges every blob below it. */
export const ARCHIVE_DIR = ".beads/archive";
/** The fields a closed row's stub may keep (C1); a stub holds the ones its row has, in the row's own key order (stubOf: C1, C11). */
export const STUB_FIELDS = Object.freeze(["_type", "id", "title", "status", "updated_at", "closed_at", "close_reason", "dependencies"]);

/** A month shard's file name: issues-closed-YYYY-MM.jsonl, MM a calendar month 01 to 12 (C9, R4, K5). */
const SHARD_FILE = /^issues-closed-(\d{4}-(?:0[1-9]|1[0-2]))\.jsonl$/;
const SHA = /^(?:[0-9a-f]{40}|[0-9a-f]{64})$/;
const ZERO_SHA = /^0+$/;
const WHOLE = /^[1-9][0-9]*$/;

/** @param {string} value @returns {string} printable ASCII only; everything else becomes ? */
const ascii = value => value.replace(/[^\x20-\x7e]/g, "?");

/** @param {string} month a UTC month, YYYY-MM @returns {string} */
export const shardName = month => `issues-closed-${month}.jsonl`;

/** A UTC stamp: date, time with seconds, an optional fraction, then Z or a +HH:MM / -HH:MM offset. */
const UTC_STAMP = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.\d{1,9})?(?:Z|([+-])(\d{2}):(\d{2}))$/;

/**
 * The UTC month (YYYY-MM) of a UTC stamp, or undefined when the value is not one: the UTC_STAMP form with every field in range (a
 * calendar day, hour 00-23, minute and second 00-59, offset hour 00-23 and offset minute 00-59), the offset applied before the month
 * is taken, and the instant inside the years 0000-9999. Date.parse is not the judge: it reads a zone-less stamp in the process time
 * zone and rolls an invalid day into the next month.
 * @param {unknown} stamp
 * @returns {string | undefined}
 */
function utcMonth(stamp) {
  const form = typeof stamp === "string" ? UTC_STAMP.exec(stamp) : null;
  if (form === null) return undefined;
  const [year = 0, month = 0, day = 0, hour = 0, minute = 0, second = 0] = form.slice(1, 7).map(Number);
  const offsetHour = Number(form[8] ?? "0");
  const offsetMinute = Number(form[9] ?? "0");
  const lastDay = new Date(0);
  lastDay.setUTCFullYear(year, month, 0);
  if (month < 1 || month > 12 || day < 1 || day > lastDay.getUTCDate() || hour > 23 || minute > 59 || second > 59 || offsetHour > 23 || offsetMinute > 59) return undefined;
  const at = new Date(0);
  at.setUTCFullYear(year, month - 1, day);
  at.setUTCHours(hour, minute - (form[7] === "-" ? -1 : 1) * (offsetHour * 60 + offsetMinute), second, 0);
  const utcYear = at.getUTCFullYear();
  if (utcYear < 0 || utcYear > 9999) return undefined;
  return `${String(utcYear).padStart(4, "0")}-${String(at.getUTCMonth() + 1).padStart(2, "0")}`;
}

/**
 * A closed row in stub shape: every field it holds is a STUB_FIELDS field.
 * @param {Record<string, unknown>} value
 * @returns {boolean}
 */
const isStub = value => Object.keys(value).every(key => STUB_FIELDS.includes(key));

/**
 * The soft ceiling an environment names.
 * @param {Readonly<Record<string, string | undefined>>} env
 * @returns {{ ok: true, bytes: number } | { ok: false, got: string }}
 */
export function softCeiling(env) {
  const raw = env[CEILING_ENV];
  if (raw === undefined || raw === "") return { ok: true, bytes: DEFAULT_SOFT_CEILING };
  if (WHOLE.test(raw) && Number.isSafeInteger(Number(raw))) return { ok: true, bytes: Number(raw) };
  return { ok: false, got: raw };
}

/** @typedef {{ readonly kind: "blank", readonly raw: string }} BlankLine */
/** @typedef {{ readonly kind: "row", readonly raw: string, readonly id: string, readonly status: string, readonly value: Record<string, unknown> }} RowLine */
/** @typedef {{ ok: true, lines: Array<BlankLine | RowLine>, trailing: boolean } | { ok: false, why: string }} Parsed */

/**
 * A JSON-lines export, line by line; every non-empty line must be a JSON object with a non-empty string id and a string status, ids
 * unique (C8): a line of whitespace alone is not empty (C8), and an empty line - no character at all - is kept as one (C15).
 * @param {string} text
 * @returns {Parsed}
 */
function parseExport(text) {
  const parts = text.split("\n");
  const trailing = parts.length > 1 && parts[parts.length - 1] === "";
  if (trailing || parts[parts.length - 1] === "") parts.pop();
  /** @type {Array<BlankLine | RowLine>} */
  const lines = [];
  const seen = new Set();
  for (let index = 0; index < parts.length; index += 1) {
    const raw = parts[index] ?? "";
    if (raw === "") {
      lines.push({ kind: "blank", raw });
      continue;
    }
    /** @type {unknown} */
    let value;
    try {
      value = JSON.parse(raw);
    } catch {
      return { ok: false, why: `line ${index + 1} is not JSON` };
    }
    if (value === null || typeof value !== "object" || Array.isArray(value)) return { ok: false, why: `line ${index + 1} is not a JSON object` };
    const record = /** @type {Record<string, unknown>} */ (value);
    if (typeof record.id !== "string" || record.id === "") return { ok: false, why: `line ${index + 1} has no string id` };
    if (typeof record.status !== "string") return { ok: false, why: `line ${index + 1} (${ascii(record.id)}) has no string status` };
    if (seen.has(record.id)) return { ok: false, why: `line ${index + 1} repeats id ${ascii(record.id)}` };
    seen.add(record.id);
    lines.push({ kind: "row", raw, id: record.id, status: record.status, value: record });
  }
  return { ok: true, lines, trailing };
}

/**
 * A closed row's stub: the STUB_FIELDS it has, in its own key order (C1, C11).
 * @param {Record<string, unknown>} value
 * @returns {Record<string, unknown>}
 */
function stubOf(value) {
  /** @type {Record<string, unknown>} */
  const stub = {};
  for (const key of Object.keys(value)) if (STUB_FIELDS.includes(key)) stub[key] = value[key];
  return stub;
}

/**
 * The id of one non-empty archived line of any shard, read from a parse of the WHOLE line and never from its prefix alone (R3, C9, K3,
 * K7; R3 and C9 plant each form in the only shard, the older and the newer of two and the middle of three): a line that does not parse
 * - a line of whitespace alone among them - is not a JSON object or has no non-empty string id throws one Error naming the shard and
 * the line.
 * @param {string} line
 * @param {string} where
 * @returns {string}
 */
function archivedId(line, where) {
  /** @type {unknown} */
  let value;
  try {
    value = JSON.parse(line);
  } catch {
    throw new Error(`tracker-export: archived ${where} does not parse`);
  }
  if (value === null || typeof value !== "object" || Array.isArray(value)) throw new Error(`tracker-export: archived ${where} is not a JSON object`);
  const id = /** @type {Record<string, unknown>} */ (value).id;
  if (typeof id !== "string" || id === "") throw new Error(`tracker-export: archived ${where} has no string id`);
  return id;
}

/**
 * Every id's latest archived line: shards in name order, lines in file order, the last one wins (C4, R2). Each non-empty line of each
 * shard goes through archivedId; only an empty line - no character at all - is skipped (R3, C9).
 * @param {Iterable<readonly [string, string]>} shards
 * @returns {Map<string, string>}
 */
function latestArchived(shards) {
  /** @type {Map<string, string>} */
  const latest = new Map();
  for (const [name, text] of [...shards].sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))) {
    const lines = text.split("\n");
    for (let index = 0; index < lines.length; index += 1) {
      const line = lines[index] ?? "";
      if (line === "") continue;
      latest.set(archivedId(line, `${name} line ${index + 1}`), line);
    }
  }
  return latest;
}

/**
 * A main export with each STUB line whose id has an archived line replaced by that id's latest archived line. A STUB line parses as a
 * JSON object whose status is "closed" and that holds no field but STUB_FIELDS, however its JSON is spaced; every other line - a full
 * closed row, a stub-shaped row that is not closed, a stub no shard holds, a line that does not parse - is kept as it is.
 * @param {string} main
 * @param {ReadonlyMap<string, string>} latest
 * @returns {string}
 */
function substitute(main, latest) {
  if (latest.size === 0) return main;
  const lines = main.split("\n");
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index] ?? "";
    if (line === "") continue;
    /** @type {unknown} */
    let value;
    try {
      value = JSON.parse(line);
    } catch {
      continue;
    }
    if (value === null || typeof value !== "object" || Array.isArray(value)) continue;
    const record = /** @type {Record<string, unknown>} */ (value);
    if (record.status !== "closed" || typeof record.id !== "string" || !isStub(record)) continue;
    const archived = latest.get(record.id);
    if (archived !== undefined) lines[index] = archived;
  }
  return lines.join("\n");
}

/**
 * The full export a main export and its shards stand for.
 * @param {string} main
 * @param {Iterable<readonly [string, string]>} shards shard file name -> text
 * @returns {string}
 */
export function rehydrateTrackerText(main, shards) {
  return substitute(main, latestArchived(shards));
}

/** @param {string | URL} path @returns {string} */
const fsPath = path => (path instanceof URL ? fileURLToPath(path) : path);

/**
 * The shard files of an archive directory - regular files named issues-closed-YYYY-MM.jsonl, MM 01 to 12; not a file of another name,
 * nor a symlink or a directory of a shard's name (R4) - with their sizes and modification times, under a key that names the directory
 * too (R10), or undefined when the path is not a directory (R9) or holds no shard file (R4).
 * @param {string} dir
 * @returns {{ key: string, names: string[] } | undefined}
 */
function archiveState(dir) {
  if (!existsSync(dir) || !statSync(dir).isDirectory()) return undefined;
  const names = readdirSync(dir, { withFileTypes: true })
    .filter(entry => entry.isFile() && SHARD_FILE.test(entry.name))
    .map(entry => entry.name)
    .sort();
  if (names.length === 0) return undefined;
  const key = names
    .map(name => {
      const stat = statSync(join(dir, name));
      return `${name}:${stat.size}:${stat.mtimeMs}`;
    })
    .join("|");
  return { key: `${dir}\0${key}`, names };
}

/** @type {{ key: string, latest: Map<string, string> } | undefined} */
let archivedMemo;
/** @type {{ key: string, text: string, out: string } | undefined} */
let readMemo;

/**
 * The full export for a main export text a reader already read from `mainPath` (R2): the text unchanged when no archive directory
 * beside it holds a shard file (R1, R4, R9).
 * @param {string} text
 * @param {string | URL} mainPath
 * @returns {string}
 */
export function rehydrateTrackerExport(text, mainPath) {
  const dir = join(dirname(fsPath(mainPath)), "archive");
  const state = archiveState(dir);
  if (state === undefined) return text;
  if (readMemo !== undefined && readMemo.key === state.key && readMemo.text === text) return readMemo.out;
  if (archivedMemo === undefined || archivedMemo.key !== state.key) {
    archivedMemo = { key: state.key, latest: latestArchived(state.names.map(name => /** @type {const} */ ([name, readFileSync(join(dir, name), "utf8")]))) };
  }
  const out = substitute(text, archivedMemo.latest);
  readMemo = { key: state.key, text, out };
  return out;
}

/**
 * The one read of a main export: the file's text, rehydrated from the archive directory beside it when that holds a shard file (R1,
 * R2, R9).
 * @param {string | URL} mainPath
 * @returns {string}
 */
export function trackerExportText(mainPath) {
  return rehydrateTrackerExport(readFileSync(mainPath, "utf8"), mainPath);
}

/**
 * @typedef {{ ok: true, main: string, shards: Map<string, string>, appended: Map<string, string[]>, rows: number, stubs: number, sealed: string[] }
 *   | { ok: false, code: "malformed" | "oversize" | "sealed" | "round-trip", lines: string[] }} CompactResult
 */

/**
 * Compacts a full export against the existing shards: the main export, every shard after the run, and what was appended where (C3,
 * C4, C4b). Refuses as "malformed" on a run stamp that is not a UTC stamp (C9), a shard name that is not a month shard's - a day
 * shard's, a month 00 or 13 (C9) - a non-empty shard that does not end with a newline, or a shard holding a non-empty line that does
 * not parse whole as a JSON object with a non-empty string id, opening with the export's own line prefix or not, a line of whitespace
 * alone among them - whichever shard it is: C9 plants each in the only shard, the older and the newer of two and the middle of three
 * (C9; an empty line, with no character at all, is skipped, and an empty shard holds no line) - a malformed export (C8) and a
 * stub-shaped closed row in the input - a main export passed where the full export belongs (C8); as "oversize" on a main export or
 * shard at or over the ceiling (C7); as "round-trip" when the compacted export does not rehydrate to the full export
 * (C10). The CLI then writes nothing (K3, K4, K10). A change to a shard that existed before the run and is of a month before the
 * run's refuses as "sealed": a backstop the routing rule never reaches, since no run appends to such a shard, so no case reaches it.
 * @param {{ full: string, shards: ReadonlyMap<string, string>, now: string, ceiling?: number, root?: string }} input
 * @returns {CompactResult}
 */
export function compactTrackerExport({ full, shards, now, ceiling = DEFAULT_SOFT_CEILING, root = ".beads" }) {
  const refuse = (/** @type {"malformed" | "oversize" | "sealed" | "round-trip"} */ code, /** @type {string[]} */ lines) => /** @type {CompactResult} */ ({ ok: false, code, lines });
  const month = utcMonth(now);
  if (month === undefined) return refuse("malformed", [`tracker-export: REFUSED the run stamp "${ascii(String(now))}" is not a UTC timestamp; nothing is written`]);
  for (const [name, text] of shards) {
    if (!SHARD_FILE.test(name)) return refuse("malformed", [`tracker-export: REFUSED ${ascii(name)} is not a month shard name (issues-closed-YYYY-MM.jsonl); nothing is written`]);
    if (text !== "" && !text.endsWith("\n")) return refuse("malformed", [`tracker-export: REFUSED ${root}/archive/${ascii(name)} does not end with a newline (a shard holds whole lines); nothing is written`]);
  }
  /** @type {Map<string, string>} */
  let latest;
  try {
    latest = latestArchived(shards);
  } catch (error) {
    return refuse("malformed", [`${error instanceof Error ? error.message : String(error)}; nothing is written`]);
  }
  const parsed = parseExport(full);
  if (!parsed.ok) return refuse("malformed", [`tracker-export: REFUSED the full export: ${parsed.why}; nothing is written`]);
  const newest = [...shards.keys()].map(name => SHARD_FILE.exec(name)?.[1] ?? "").reduce((a, b) => (b > a ? b : a), "");
  /** @type {string[]} */
  const mainLines = [];
  /** @type {Map<string, string[]>} */
  const appended = new Map();
  /** @type {Map<string, string[]>} */
  const appendLines = new Map();
  let rows = 0;
  let stubs = 0;
  for (const line of parsed.lines) {
    if (line.kind === "blank") {
      mainLines.push(line.raw);
      continue;
    }
    rows += 1;
    if (line.status !== "closed") {
      mainLines.push(line.raw);
      continue;
    }
    if (isStub(line.value)) {
      return refuse("malformed", [`tracker-export: REFUSED the full export carries a stub row (${ascii(line.id)}): pass the tracker's full export, never a compacted main export; nothing is written`]);
    }
    stubs += 1;
    mainLines.push(JSON.stringify(stubOf(line.value)));
    if (latest.get(line.id) === line.raw) continue;
    const closed = utcMonth(line.value.closed_at) ?? month;
    const period = closed < month ? closed : month;
    const name = shardName(period === month || period > newest ? period : month);
    appended.set(name, [...(appended.get(name) ?? []), line.id]);
    appendLines.set(name, [...(appendLines.get(name) ?? []), line.raw]);
  }
  const main = `${mainLines.join("\n")}${parsed.trailing ? "\n" : ""}`;
  /** @type {Map<string, string>} */
  const out = new Map([...shards]);
  for (const [name, lines] of appendLines) out.set(name, `${shards.get(name) ?? ""}${lines.map(line => `${line}\n`).join("")}`);
  const sorted = new Map([...out].sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0)));
  const sealed = [...shards.keys()].filter(name => (SHARD_FILE.exec(name)?.[1] ?? "") < month).sort();
  const changed = sealed.filter(name => sorted.get(name) !== shards.get(name));
  if (changed.length > 0) return refuse("sealed", changed.map(name => `tracker-export: REFUSED ${root}/archive/${name} is a past month's shard and would change; nothing is written`));
  /** @type {string[]} */
  const over = [];
  const mainBytes = Buffer.byteLength(main);
  if (mainBytes >= ceiling) over.push(ceilingLine(`${root}/issues.jsonl`, mainBytes, ceiling));
  for (const [name, text] of sorted) {
    const bytes = Buffer.byteLength(text);
    if (bytes >= ceiling) over.push(ceilingLine(`${root}/archive/${name}`, bytes, ceiling));
  }
  if (over.length > 0) return refuse("oversize", over);
  if (rehydrateTrackerText(main, sorted) !== full) return refuse("round-trip", ["tracker-export: REFUSED the compacted export does not rehydrate to the full export it was cut from; nothing is written"]);
  return { ok: true, main, shards: sorted, appended: new Map([...appended].sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))), rows, stubs, sealed };
}

/** @param {string} path @param {number} bytes @param {number} ceiling @returns {string} */
const ceilingLine = (path, bytes, ceiling) =>
  `tracker-export: REFUSED ${ascii(path)} would be ${bytes} bytes, at or over the soft ceiling of ${ceiling} bytes (${CEILING_ENV}); nothing is written`;

/** @typedef {{ readonly path: string, readonly blob: string, readonly bytes: number }} Offender */

/**
 * Every tracker-export-family blob among the objects a push of `tip` would send that is at or over `ceiling` (G2-G6, G14, G16, G17).
 * A family blob is one a pushed commit writes to .beads/issues.jsonl or below .beads/archive/ (its diff against a parent, or a root
 * commit's whole tree), whatever other path also holds it: `git rev-list --objects` names each object once, by the first path it
 * meets, so that name alone would miss a family blob another path also holds (G17).
 * @param {{ cwd: string, tip: string, exclude?: readonly string[], ceiling: number, env?: NodeJS.ProcessEnv }} options
 * @returns {{ ok: true, offenders: Offender[] } | { ok: false, why: string }}
 */
export function oversizedExportBlobs({ cwd, tip, exclude = [], ceiling, env = process.env }) {
  const listed = spawnSync("git", ["rev-list", "--objects", tip, ...(exclude.length > 0 ? ["--not", ...exclude] : [])], { cwd, env, encoding: "utf8", maxBuffer: 1 << 30 });
  if (listed.error !== undefined || listed.status !== 0) return { ok: false, why: `git rev-list --objects ${ascii(tip)} exited ${listed.status ?? "without a status"}` };
  /** @type {Set<string>} */
  const sent = new Set();
  /** @type {string[]} */
  const commits = [];
  for (const line of listed.stdout.split("\n")) {
    const space = line.indexOf(" ");
    if (space === -1 && SHA.test(line)) commits.push(line);
    const sha = space === -1 ? line : line.slice(0, space);
    if (SHA.test(sha)) sent.add(sha);
  }
  /** @type {Map<string, string>} */
  const wanted = new Map();
  if (commits.length > 0) {
    const written = spawnSync("git", ["diff-tree", "--stdin", "-r", "-m", "--root", "--no-renames", "--no-commit-id", "-z", "--", MAIN_EXPORT, ARCHIVE_DIR], { cwd, env, input: `${commits.join("\n")}\n`, encoding: "utf8", maxBuffer: 1 << 30 });
    if (written.error !== undefined || written.status !== 0) return { ok: false, why: `git diff-tree --stdin exited ${written.status ?? "without a status"}` };
    const fields = written.stdout.split("\0");
    for (let index = 0; index + 1 < fields.length; index += 2) {
      const blob = (fields[index] ?? "").split(" ")[3] ?? "";
      const path = fields[index + 1] ?? "";
      if ((path === MAIN_EXPORT || path.startsWith(`${ARCHIVE_DIR}/`)) && sent.has(blob) && !wanted.has(blob)) wanted.set(blob, path);
    }
  }
  if (wanted.size === 0) return { ok: true, offenders: [] };
  const sized = spawnSync("git", ["cat-file", "--batch-check=%(objectname) %(objecttype) %(objectsize)"], { cwd, env, input: `${[...wanted.keys()].join("\n")}\n`, encoding: "utf8", maxBuffer: 1 << 26 });
  if (sized.error !== undefined || sized.status !== 0) return { ok: false, why: `git cat-file --batch-check exited ${sized.status ?? "without a status"}` };
  /** @type {Offender[]} */
  const offenders = [];
  for (const line of sized.stdout.split("\n")) {
    const [blob = "", type = "", size = ""] = line.split(" ");
    const path = wanted.get(blob);
    if (type !== "blob" || path === undefined) continue;
    const bytes = Number(size);
    if (bytes >= ceiling) offenders.push({ path, blob, bytes });
  }
  return { ok: true, offenders };
}

/** @param {Offender} offender @param {number} ceiling @returns {string} */
export const refusalLine = (offender, ceiling) =>
  `tracker-export: REFUSED ${ascii(offender.path)} blob ${offender.blob.slice(0, 12)} is ${offender.bytes} bytes, at or over the soft ceiling of ${ceiling} bytes (${CEILING_ENV}); nothing is pushed`;

/**
 * @param {readonly string[]} args
 * @param {readonly string[]} flags
 * @returns {{ ok: true, values: Map<string, string[]>, positional: string[] } | { ok: false }}
 */
function options(args, flags) {
  /** @type {Map<string, string[]>} */
  const values = new Map();
  /** @type {string[]} */
  const positional = [];
  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index] ?? "";
    if (flags.includes(arg)) {
      const value = args[index + 1];
      if (value === undefined || value.startsWith("-")) return { ok: false };
      values.set(arg, [...(values.get(arg) ?? []), value]);
      index += 1;
    } else if (arg.startsWith("-")) {
      return { ok: false };
    } else {
      positional.push(arg);
    }
  }
  return { ok: true, values, positional };
}

/**
 * Writes a file whole through a temporary file renamed over the target: the target is a new file afterwards and no temporary file stays
 * in the .beads directory (K13). Where the temporary file sits while it is written, and atomicity under a crash, are NOT CLAIMED.
 * @param {string} beads
 * @param {string} target
 * @param {string} text
 */
function writeWhole(beads, target, text) {
  const temporary = join(beads, `.tracker-export-${process.pid}.tmp`);
  writeFileSync(temporary, text);
  renameSync(temporary, target);
}

/**
 * @param {readonly string[]} args
 * @param {(line: string) => void} err
 * @param {(text: string) => void} out
 * @returns {number}
 */
function compactCli(args, err, out) {
  const parsed = options(args, ["--full", "--beads", "--now"]);
  const full = parsed.ok ? parsed.values.get("--full") : undefined;
  const beads = parsed.ok ? parsed.values.get("--beads") : undefined;
  const now = parsed.ok ? parsed.values.get("--now") : undefined;
  if (!parsed.ok || parsed.positional.length > 0 || full?.length !== 1 || beads?.length !== 1 || (now !== undefined && now.length !== 1)) {
    err("tracker-export: usage: compact --full <full export file> --beads <.beads dir> [--now <UTC stamp>]; nothing is written");
    return 3;
  }
  const ceiling = softCeiling(process.env);
  if (!ceiling.ok) {
    err(`tracker-export: ${CEILING_ENV} must be a positive whole number of bytes (got "${ascii(ceiling.got)}"); nothing is written`);
    return 3;
  }
  const fullPath = full[0] ?? "";
  const dir = beads[0] ?? "";
  const archive = join(dir, "archive");
  /** @type {string} */
  let fullText;
  /** @type {Map<string, string>} */
  const shards = new Map();
  try {
    fullText = readFileSync(fullPath, "utf8");
    // Only month shard files are inputs, as only they are read back (archiveState); a file of any other name beside them is neither.
    if (existsSync(archive)) {
      for (const entry of readdirSync(archive, { withFileTypes: true })) {
        if (entry.isFile() && SHARD_FILE.test(entry.name)) shards.set(entry.name, readFileSync(join(archive, entry.name), "utf8"));
      }
    }
  } catch (error) {
    err(`tracker-export: could not read the inputs (${ascii(error instanceof Error ? error.message : String(error))}); nothing is written`);
    return 3;
  }
  const stamp = now?.[0] ?? new Date().toISOString();
  const result = compactTrackerExport({ full: fullText, shards, now: stamp, ceiling: ceiling.bytes, root: dir });
  if (!result.ok) {
    for (const line of result.lines) err(line);
    return result.code === "oversize" ? 2 : 3;
  }
  // Every path the run writes - each shard it appends to, in name order, then the main export - is checked before the first write: one
  // that exists and is not a regular file (K14 plants a directory, a symlink to a file, to a directory or dangling, and a FIFO) refuses
  // with one typed line each, and nothing is written (K14).
  const blocked = [...[...result.appended.keys()].map(name => join(archive, name)), join(dir, "issues.jsonl")].filter(target => lstatSync(target, { throwIfNoEntry: false })?.isFile() === false);
  if (blocked.length > 0) {
    for (const target of blocked) err(`tracker-export: REFUSED ${ascii(target)} is not a regular file; nothing is written`);
    return 3;
  }
  if (result.appended.size > 0) mkdirSync(archive, { recursive: true });
  for (const name of result.appended.keys()) writeWhole(dir, join(archive, name), result.shards.get(name) ?? "");
  writeWhole(dir, join(dir, "issues.jsonl"), result.main);
  const largest = [...result.shards].map(([name, text]) => ({ name, bytes: Buffer.byteLength(text) })).reduce((a, b) => (a === undefined || b.bytes > a.bytes ? b : a), /** @type {{ name: string, bytes: number } | undefined} */ (undefined));
  out(
    `${JSON.stringify({
      verb: "compact",
      now: stamp,
      fullBytes: Buffer.byteLength(fullText),
      mainBytes: Buffer.byteLength(result.main),
      rows: result.rows,
      stubs: result.stubs,
      appended: Object.fromEntries([...result.appended].map(([name, ids]) => [name, ids.length])),
      shards: result.shards.size,
      largestShard: largest ?? null,
      ceiling: ceiling.bytes,
      sealedUnchanged: true,
      roundTrip: true,
    })}\n`,
  );
  return 0;
}

/**
 * @param {readonly string[]} args
 * @param {(line: string) => void} err
 * @param {(text: string) => void} out
 * @returns {number}
 */
function rehydrateCli(args, err, out) {
  const parsed = options(args, ["--beads"]);
  const beads = parsed.ok ? parsed.values.get("--beads") : undefined;
  if (!parsed.ok || parsed.positional.length > 0 || beads?.length !== 1) {
    err("tracker-export: usage: rehydrate --beads <.beads dir>");
    return 3;
  }
  try {
    out(trackerExportText(join(beads[0] ?? "", "issues.jsonl")));
  } catch (error) {
    err(`tracker-export: could not rehydrate (${ascii(error instanceof Error ? error.message : String(error))})`);
    return 3;
  }
  return 0;
}

/**
 * Judges pushes and reports: 2 when any blob is at or over the ceiling, else 3 when any push could not be judged, else 0 (G2, G8,
 * G13).
 * @param {ReadonlyArray<{ tip: string, exclude: readonly string[] }>} pushes
 * @param {number} ceiling
 * @param {(line: string) => void} err
 * @returns {number}
 */
function judge(pushes, ceiling, err) {
  let unjudged = false;
  const reported = new Set();
  for (const push of pushes) {
    const result = oversizedExportBlobs({ cwd: process.cwd(), tip: push.tip, exclude: push.exclude, ceiling });
    if (!result.ok) {
      err(`tracker-export: could not judge a push of ${ascii(push.tip)} (${result.why}); nothing is pushed`);
      unjudged = true;
      continue;
    }
    for (const offender of result.offenders) {
      if (reported.has(offender.blob)) continue;
      reported.add(offender.blob);
      err(refusalLine(offender, ceiling));
    }
  }
  return reported.size > 0 ? 2 : unjudged ? 3 : 0;
}

/**
 * @param {readonly string[]} args
 * @param {(line: string) => void} err
 * @returns {number}
 */
function guardCli(args, err) {
  const parsed = options(args, ["--not"]);
  if (!parsed.ok || parsed.positional.length !== 1) {
    err("tracker-export: usage: guard <tip> [--not <rev>]...; nothing is pushed");
    return 3;
  }
  const ceiling = softCeiling(process.env);
  if (!ceiling.ok) {
    err(`tracker-export: ${CEILING_ENV} must be a positive whole number of bytes (got "${ascii(ceiling.got)}"); nothing is pushed`);
    return 3;
  }
  return judge([{ tip: parsed.positional[0] ?? "", exclude: parsed.values.get("--not") ?? [] }], ceiling.bytes, err);
}

/**
 * @param {readonly string[]} args
 * @param {string} stdin
 * @param {(line: string) => void} err
 * @returns {number}
 */
function prePushCli(args, stdin, err) {
  const remote = args[0];
  if (remote === undefined || args.length > 2) {
    err("tracker-export: usage: pre-push <remote> [<url>] (git pre-push hook; ref lines on stdin); nothing is pushed");
    return 3;
  }
  const ceiling = softCeiling(process.env);
  if (!ceiling.ok) {
    err(`tracker-export: ${CEILING_ENV} must be a positive whole number of bytes (got "${ascii(ceiling.got)}"); nothing is pushed`);
    return 3;
  }
  /** @type {Array<{ tip: string, exclude: string[] }>} */
  const pushes = [];
  let malformed = false;
  for (const line of stdin.split("\n")) {
    if (line === "") continue;
    const fields = line.split(" ");
    const [, localSha = "", , remoteSha = ""] = fields;
    if (fields.length !== 4 || !SHA.test(localSha) || !SHA.test(remoteSha)) {
      err(`tracker-export: malformed pre-push line refused (${line.length} chars); nothing is pushed`);
      malformed = true;
      continue;
    }
    if (ZERO_SHA.test(localSha)) continue;
    const known = !ZERO_SHA.test(remoteSha) && spawnSync("git", ["cat-file", "-e", `${remoteSha}^{commit}`], { cwd: process.cwd(), stdio: "ignore" }).status === 0;
    pushes.push({ tip: localSha, exclude: [...(known ? [remoteSha] : []), `--remotes=${remote}`] });
  }
  const verdict = judge(pushes, ceiling.bytes, err);
  return verdict === 0 && malformed ? 3 : verdict;
}

/**
 * The CLI.
 * @param {readonly string[]} argv
 * @returns {number}
 */
export function main(argv) {
  const err = (/** @type {string} */ line) => process.stderr.write(`${line}\n`);
  const out = (/** @type {string} */ text) => process.stdout.write(text);
  const [verb, ...rest] = argv;
  if (verb === "compact") return compactCli(rest, err, out);
  if (verb === "rehydrate") return rehydrateCli(rest, err, out);
  if (verb === "guard") return guardCli(rest, err);
  if (verb === "pre-push") return prePushCli(rest, readFileSync(0, "utf8"), err);
  err("tracker-export: usage: compact | rehydrate | guard | pre-push (see the header of qa/workbench/tracker-export.mjs)");
  return 3;
}

const entry = process.argv[1];
if (entry !== undefined && import.meta.url === pathToFileURL(realpathSync(entry)).href) process.exitCode = main(process.argv.slice(2));
