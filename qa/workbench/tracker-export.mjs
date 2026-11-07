#!/usr/bin/env node
/**
 * wb-294d (g10.24-K1): the tracker export kept under GitHub's 104,857,600-byte blob wall.
 *
 * WHY. The tracker's export writes every bead, closed ones with their whole bodies, into the tracked .beads/issues.jsonl. At trunk
 * fd90f9d3 that blob was 95,821,804 bytes (1,304 rows; the 1,179 closed rows 93,125,889 bytes of it, nearly all notes) and it grew
 * about 6 MB a day, so the landing hop push was days from a refusal no retry cures. Owner shape ruling (bound on wb-294d): closed beads become STUB rows
 * in the pushed export, their bodies move to append-only monthly shards beside it, a round trip proves nothing is lost, and a 95 MiB
 * soft ceiling guards the export and every shard before any push. The tracker's store stays the source of truth: this module spawns only
 * git, opens no store, and wiring the ritual into the machine's hop and push paths (under its commit lock) is the machine's, outside
 * this repository.
 *
 * LAYOUT (under a store's .beads directory):
 *   issues.jsonl                              the MAIN export: the full export's own line, unchanged, for every non-closed row, in the
 *                                             export's row order; for every closed row a STUB line - the STUB_FIELDS it has, in its
 *                                             own key order, and nothing else (no description, notes, acceptance criteria or comments).
 *   archive/issues-closed-YYYY-MM.jsonl       append-only SHARDS holding closed rows' full export lines, unchanged, one shard
 *                                             per UTC month. A row goes to the shard of its UTC close month when that month is the
 *                                             run's or newer than every existing shard; otherwise (its month is past and sealed) to
 *                                             the run month's. A closed row is appended again, to the shard the same rule picks,
 *                                             whenever its full line differs from its latest archived line (a note written after the
 *                                             close); a shard only ever grows by whole lines at its end. The latest line of an id -
 *                                             the last one, shards in name order - is its body. No run changes a shard of a month
 *                                             before its own UTC month, so a past month's shard is byte-unchanged at every later export.
 * The period is the UTC close MONTH, as the owner shape orders (ruling R-B670 on wb-294d: the first cut's day period is outside the
 * shape). Measured at fd90f9d3: the beads closed in 2026-10 hold 46,834,285 bytes, those closed 2026-11-01..06 46,291,604, so the
 * running month's shard is the one that grows toward the soft ceiling, and a run that would take any shard to it refuses (exit 2,
 * nothing written). Two stub fields beyond the ruling's list (id, title, status, closed stamp, close reason, dep edges), each measured:
 * `_type` is the export's row discriminator, and `updated_at` keeps an import of the main export inert against a store that already
 * holds the full rows (the tracker's importer rewrites an issue only when a row's updated_at is strictly newer and stamps an absent one
 * with the import time; measured with a scratch store - test/workbench-tracker-export-compaction.test.ts states the measurement).
 *
 * READERS. trackerExportText(path) is the one read of a main export: beside no archive directory holding a shard file it returns the
 * file's bytes unchanged; beside one it replaces each closed STUB line (a closed row holding no field but STUB_FIELDS) that has an
 * archived line by its id's latest archived line and keeps every other line as it is, so a main export the compaction wrote reads as
 * the same bytes as the full export it was cut from (compaction refuses any run whose own round trip is not byte-equal), and a full
 * row beside an archive reads as itself. Only the archive's shard files (issues-closed-YYYY-MM.jsonl) are read; a file of any other name
 * beside them is not. rehydrateTrackerExport(text, path) is the same for a text a reader already read.
 *
 * GUARD. The tracker export family is .beads/issues.jsonl plus every blob under .beads/archive/. A push of <tip> refuses when any family
 * blob among the objects it would send (`git rev-list --objects <tip> --not <excluded...>`) is at or over the soft ceiling: one typed
 * line per such blob on stderr, naming its path, blob and bytes - one line per blob for the whole judgement, however many of the
 * judged pushes would send it. FW_EXPORT_SOFT_CEILING (bytes, a positive whole number) replaces the
 * default 95 MiB = 99,614,720. A large blob outside the family is not judged.
 *
 * CLI (exit 0 done; 2 refused at the soft ceiling; 3 could not run - usage, malformed input, git failure, a bad ceiling):
 *   node qa/workbench/tracker-export.mjs compact --full <full export file> --beads <.beads dir> [--now <UTC stamp>]
 *       compacts the full export into <dir>/issues.jsonl and <dir>/archive/, then prints one JSON receipt line on stdout. It writes
 *       nothing at all when it refuses. --now defaults to the current time; it names the run's UTC month, and a value that is not a
 *       UTC timestamp refuses (exit 3).
 *   node qa/workbench/tracker-export.mjs rehydrate --beads <.beads dir>        prints the full export on stdout
 *   node qa/workbench/tracker-export.mjs guard <tip> [--not <rev>]...          judges a push of <tip> before `git push` runs
 *   node qa/workbench/tracker-export.mjs pre-push <remote> [<url>]             the git pre-push hook: reads git's
 *       `<local ref> <local sha> <remote ref> <remote sha>` lines on stdin and judges each push, excluding the line's remote sha (when
 *       this repository has that commit) and every remote-tracking ref of <remote> (--remotes=<remote>); a deleted-ref line pushes
 *       nothing and is skipped. Install once per clone:
 *         printf '#!/bin/sh\nexec node %s pre-push "$@"\n' "$PWD/qa/workbench/tracker-export.mjs" > "$(git rev-parse --git-path hooks)/pre-push"
 *         chmod +x "$(git rev-parse --git-path hooks)/pre-push"
 */
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, readFileSync, realpathSync, renameSync, statSync, writeFileSync } from "node:fs";
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
/** The fields a closed row keeps in the main export, in the export's own key order. */
export const STUB_FIELDS = Object.freeze(["_type", "id", "title", "status", "updated_at", "closed_at", "close_reason", "dependencies"]);

const SHARD_FILE = /^issues-closed-(\d{4}-\d{2})\.jsonl$/;
const SHA = /^(?:[0-9a-f]{40}|[0-9a-f]{64})$/;
const ZERO_SHA = /^0+$/;
const WHOLE = /^[1-9][0-9]*$/;
/** The export's own line prefix; the id is read from it without parsing the whole body, and from a full parse otherwise. */
const EXPORT_PREFIX = /^\{"_type":"(?:[^"\\]|\\.)*","id":"((?:[^"\\]|\\.)*)"/;

/** @param {string} value @returns {string} printable ASCII only; everything else becomes ? */
const ascii = value => value.replace(/[^\x20-\x7e]/g, "?");

/** @param {string} month a UTC month, YYYY-MM @returns {string} */
export const shardName = month => `issues-closed-${month}.jsonl`;

/**
 * The UTC month (YYYY-MM) of an ISO-8601 timestamp, or undefined when the value is not one.
 * @param {unknown} stamp
 * @returns {string | undefined}
 */
function utcMonth(stamp) {
  if (typeof stamp !== "string" || !/^\d{4}-\d{2}-\d{2}T/.test(stamp)) return undefined;
  const at = Date.parse(stamp);
  return Number.isNaN(at) ? undefined : new Date(at).toISOString().slice(0, 7);
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
 * A JSON-lines export, line by line; every non-empty line must be an object with a string id and a string status, ids unique.
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
 * A closed row's stub: the STUB_FIELDS it has, in its own key order.
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
 * The id of one archived line: from the export's line prefix, else from a full parse.
 * @param {string} line
 * @param {string} where
 * @returns {string}
 */
function archivedId(line, where) {
  const prefixed = EXPORT_PREFIX.exec(line);
  if (prefixed) return /** @type {string} */ (JSON.parse(`"${prefixed[1] ?? ""}"`));
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
 * Every id's latest archived line: shards in name order, lines in file order, the last one wins.
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
 * A main export with each closed stub line that has an archived line replaced by its latest archived line; every other line, a full
 * closed row included, is kept as it is.
 * @param {string} main
 * @param {ReadonlyMap<string, string>} latest
 * @returns {string}
 */
function substitute(main, latest) {
  if (latest.size === 0) return main;
  const lines = main.split("\n");
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index] ?? "";
    if (!line.includes('"status":"closed"')) continue;
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
 * The shard files of an archive directory (issues-closed-YYYY-MM.jsonl only) with their sizes and mtimes, or undefined when it holds
 * none.
 * @param {string} dir
 * @returns {{ key: string, names: string[] } | undefined}
 */
function archiveState(dir) {
  if (!existsSync(dir)) return undefined;
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
 * The full export for a main export text a reader already read from `mainPath`: unchanged when no archive directory with shards sits
 * beside it.
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
 * The one read of a main export: the file's text, rehydrated from the archive beside it when there is one.
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
 * Compacts a full export against the existing shards: the main export, every shard after the run, and what was appended where.
 * Refuses (and the CLI then writes nothing) on a run stamp that is not a UTC timestamp, a shard name that is not a month shard's, a
 * malformed export or shard, a stub-shaped closed row in the input (a main export passed where the full export belongs), an output at
 * or over the ceiling, or a round trip that is not byte-equal. A change to a past month's shard refuses as well: a backstop the
 * routing rule never reaches, since no run appends to a shard of a month before its own.
 * @param {{ full: string, shards: ReadonlyMap<string, string>, now: string, ceiling?: number, root?: string }} input
 * @returns {CompactResult}
 */
export function compactTrackerExport({ full, shards, now, ceiling = DEFAULT_SOFT_CEILING, root = ".beads" }) {
  const refuse = (/** @type {"malformed" | "oversize" | "sealed" | "round-trip"} */ code, /** @type {string[]} */ lines) => /** @type {CompactResult} */ ({ ok: false, code, lines });
  const month = utcMonth(now);
  if (month === undefined) return refuse("malformed", [`tracker-export: REFUSED the run stamp "${ascii(String(now))}" is not a UTC timestamp; nothing is written`]);
  for (const name of shards.keys()) {
    if (!SHARD_FILE.test(name)) return refuse("malformed", [`tracker-export: REFUSED ${ascii(name)} is not a month shard name (issues-closed-YYYY-MM.jsonl); nothing is written`]);
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
 * Every tracker-export-family blob among the objects a push of `tip` would send that is at or over `ceiling`.
 * @param {{ cwd: string, tip: string, exclude?: readonly string[], ceiling: number, env?: NodeJS.ProcessEnv }} options
 * @returns {{ ok: true, offenders: Offender[] } | { ok: false, why: string }}
 */
export function oversizedExportBlobs({ cwd, tip, exclude = [], ceiling, env = process.env }) {
  const listed = spawnSync("git", ["rev-list", "--objects", tip, ...(exclude.length > 0 ? ["--not", ...exclude] : [])], { cwd, env, encoding: "utf8", maxBuffer: 1 << 30 });
  if (listed.error !== undefined || listed.status !== 0) return { ok: false, why: `git rev-list --objects ${ascii(tip)} exited ${listed.status ?? "without a status"}` };
  /** @type {Map<string, string>} */
  const wanted = new Map();
  for (const line of listed.stdout.split("\n")) {
    const space = line.indexOf(" ");
    if (space !== 40 && space !== 64) continue;
    const path = line.slice(space + 1);
    const blob = line.slice(0, space);
    if ((path === MAIN_EXPORT || path.startsWith(`${ARCHIVE_DIR}/`)) && !wanted.has(blob)) wanted.set(blob, path);
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
 * Writes a file whole: a temporary file beside the store directory, then a rename over the target.
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
 * Judges pushes and reports: 2 when any blob is at or over the ceiling, else 3 when any push could not be judged, else 0.
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
