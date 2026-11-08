#!/usr/bin/env node
/**
 * wb-294d (g10.24-K1): the tracker export kept under GitHub's 104,857,600-byte blob wall.
 * wb-137f (the structural-exit child of wb-294d, ruling R-B677): the fail-closed core - each shard line PLANTED SHARD LINES names is
 * parsed whole, never read by its prefix alone, and throws, or refuses as malformed, at each position and in each layout it names (R3,
 * C9), and so do its four prefix forms and six comment forms at the CLI, as the older of two shards' line (K3, K7); a month shard's
 * name is issues-closed-YYYY-MM.jsonl, a year of four digits and a calendar month: each name SHARD NAMES IN THE FORM lists is read as
 * a shard and each name NAMES OUTSIDE THE FORM lists is not (C9, R4, K5); compact refuses a path it would write that is a directory, a
 * symlink or a FIFO (K14). Cut #4 (refusal #3): the main export and the shards are read as UTF-8 - rows holding each character UTF-8
 * CHARACTERS lists read back unchanged at the reader and at the CLI (R1, R2, K1, K2, K13) - and the tracked export reads as its own
 * file's UTF-8 text, compacted to files reads back, and compacts twice at the CLI with nothing appended the second time (T1).
 *
 * WHY (measured at trunk fd90f9d3, not a case: the tracked export moves). The tracker's export writes every bead, closed ones with
 * their whole bodies, into the tracked .beads/issues.jsonl: 95,821,804 bytes there (1,304 rows; the 1,179 closed rows 93,125,889
 * bytes of it, nearly all notes), growing about 6 MB a day. Owner shape ruling (bound on wb-294d): closed beads become STUB rows in
 * the pushed export, their bodies move to append-only monthly shards beside it, a round trip proves nothing is lost (T1 runs it over
 * the tracked export), and a 95 MiB soft ceiling guards the export and every shard before any push. Wiring the ritual into the
 * machine's hop and push paths (under its commit lock) is the machine's, outside this repository. This module's only child process
 * is git (S1).
 *
 * CLAIMS. The parenthesized ids cite the cases that pin a sentence: C, R, K, T, S and P are cases of
 * test/workbench-tracker-export-compaction.test.ts, G cases of test/workbench-tracker-export-guard.test.ts. Each sentence claims the
 * inputs its cited cases plant and no more: where a sentence names a kind of input, it means the planted members of that kind it lists
 * or its cases plant. NOT CLAIMED, at the end of this header, names modes outside those inputs.
 *
 * LAYOUT (under a store's .beads directory):
 *   issues.jsonl                              the MAIN export: one line per line of the full export, in its order (C2, C15) - a
 *                                             non-closed row's line unchanged, byte for byte (C2 plants the fixture's rows, a row
 *                                             with each status STATUSES NOT CLOSED lists, rows holding UTF-8 CHARACTERS, a line of
 *                                             spaced JSON and one holding a \u escape), a closed row's STUB line holding the
 *                                             STUB_FIELDS the row has, in the row's own key order, and no other field (C1, C8, C11),
 *                                             an empty line (no character at all) kept empty (C15) - ending with a newline
 *                                             exactly when the full export does (C2, C12); the empty full export compacts to the
 *                                             empty main export and no shard (C12); a full export holding one of the eight lines of
 *                                             whitespace alone PLANTED SHARD LINES names (none of them is empty) refuses as
 *                                             malformed (C8).
 *   archive/issues-closed-YYYY-MM.jsonl       append-only month SHARDS holding closed rows' full export lines, unchanged (C3; C2
 *                                             plants a line of spaced JSON); YYYY is a year of four digits and MM a calendar
 *                                             month, 01 to 12 (C9, R4, K5).
 * ROUTING. A closed row's period is the UTC month of its close stamp (C3, C3b), or the run's month when the row's close stamp is not
 * a UTC stamp - C14 plants none, a zone-less one, one on a day that does not exist, a word and a number - or its close month is after
 * the run's (C13). The row goes to its period's shard when the period is the run's month or newer than every shard that exists before
 * the run (C3, C4b, C5), and otherwise - a month before the run's and at or before the newest existing shard's, whether or not that
 * month has a shard - to the run month's shard (C4, C4b, C5b); the newest existing shard is the newest by name, the shards given out of
 * name order too (C17). A closed row is appended, by that rule, when no shard holds its id (C3) or its full line differs from its id's
 * latest archived line (C4, C4b, C17, R2), and never when it equals it (C6, C17, K1). A shard only ever grows by whole lines at its end
 * (C4b), and at the CLI the old bytes of a shard a run appends to - rows holding UTF-8 CHARACTERS among them - stay the prefix of its
 * new bytes (K13); in each layout PLANTED SHARD LINES names, a non-empty shard that does not end with a newline refuses and an empty
 * shard holds no line (C9). The latest line of an id - the last one, shards in name order - is its body (C4, R2), the shards given out
 * of name order too (C17). So no run appends to a shard that existed before it and is of a month before its own (C4, C4b), and a run
 * creates a past month's shard only for a month newer than every existing shard (C5, C5b, C17). The period is the UTC close MONTH, as
 * the owner shape orders (ruling R-B670 on wb-294d).
 * Measured at fd90f9d3: the beads closed in 2026-10 hold 46,834,285 bytes, those closed 2026-11-01..06 46,291,604, so the running
 * month's shard is the one that grows toward the soft ceiling; a run after which the main export, a shard it appends to or a shard it
 * does not append to would be at or over it refuses (exit 2, nothing written: C7, K3).
 * STUB FIELDS (MEASURED, a rationale and not a case: no case reads or writes a tracker store). Two fields beyond the ruling's list (id,
 * title, status, closed stamp, close reason, dep edges): `_type` is the export's row discriminator, and `updated_at` keeps an import of
 * the main export inert against a store that already holds the full rows (the tracker's importer rewrites an issue only when a row's
 * updated_at is strictly newer and stamps an absent one with the import time; measured with a scratch store, as the compaction suite's
 * header states).
 *
 * READERS. trackerExportText(path) reads a main export as UTF-8, given a string path or a file URL (R1, R2). With no archive directory
 * beside it holding a shard file - a regular file named issues-closed-YYYY-MM.jsonl, YYYY four digits and MM 01 to 12, each name SHARD
 * NAMES IN THE FORM lists among them (R4) - it returns the file's text unchanged (R1, R4, R9): R1 plants ASCII rows, rows holding
 * each character UTF-8 CHARACTERS lists, and those rows led by a byte order mark, and holds the read's UTF-8 bytes equal to the
 * file's. Beside one, each STUB line - a line that parses as a JSON object whose status is the string "closed" and that holds no field
 * but STUB_FIELDS, however its JSON is spaced (R8) - whose id has an archived line is replaced by that id's latest archived line (R2),
 * and these other lines are kept as they are: a full closed row (R5: one with its body fields, and wb-c2's stub fields with one field
 * FIELDS BEYOND STUB_FIELDS lists added), a stub-shaped row whose status is not "closed" (R6: "open", with an edge that spells a
 * closed status, and each status STATUSES NOT CLOSED lists; C6), a stub whose id no shard holds (R7), an empty line, a line that does
 * not parse, a line that is null, an array, a number or a string, and a closed stub-shaped row whose id is a number (R12). So a main
 * export the compaction wrote reads as the full export it was cut from (R2, K2), rows holding each character UTF-8 CHARACTERS lists
 * among them - read from the main export's and the two shards' files (R2) and printed by the CLI as the full export's UTF-8 bytes
 * (K2). Of the entries beside the shards, a file of another name (a README, a day shard's name, a month 00 or 13 name, and each name
 * NAMES OUTSIDE THE FORM lists, alone or beside the shards), a symlink of a shard's name - to a file, to a directory, or dangling - and
 * a directory of one, is not read (R4). Each line PLANTED SHARD LINES names is parsed whole, never read by its prefix alone, and
 * throws one Error naming the shard, the line and the reason, at each position and in each layout it names; an empty line - one with
 * no character at all - between two rows holds no row and is skipped, in each of those layouts (R3). In each of those layouts a
 * shard's last line is parsed though no newline ends it: a whole row there is read as that row, and the prefix form cut short there
 * throws, naming the shard and the line (R11). A process reads an archive directory's shards once and reads them again when a shard's
 * size or modification time changes, or a shard is added, renamed (its size and modification time kept) or removed - R10 plants each
 * change at the last shard by name and at an older one, the modification time moved by 60 s, by 0.5 s inside one second and by 0.3 ms
 * inside one millisecond, and adds a shard after the others and before them; a rewrite that keeps names, sizes and modification times
 * reads as the earlier content; another archive directory is read on its own, though its shards keep the names, sizes and
 * modification times of shards read before (R10). A main export rewritten at the same length between two reads - in its first line,
 * then in its last - is read again (R10). rehydrateTrackerExport(text, path) is the same for a text a reader already read from path,
 * given a string path or a file URL (R2), another text of the same length among them (R10); rehydrateTrackerText(main, shards) is the
 * same for a main export's text and its shards, read in name order though given out of it (C17), the shard's last line parsed though
 * no newline ends it (R11).
 *
 * PLANTED SHARD LINES (the compaction suite's plant tables, by label; its case P1 reads each list below back and holds it equal to its
 * table, and holds the plant tables sha256 equal to the digest of the JSON of BAD_SHARD_LINES, SHARD_LAYOUTS and PLANT_AT - every
 * label, line and reason, each position's text with the line BAD planted). R3 (trackerExportText) and C9 (compactTrackerExport) plant
 * each line of BAD_SHARD_LINES at each position of PLANT_AT in the planted shard of each layout of SHARD_LAYOUTS - the shards named in
 * name order, every other shard of the layout whole - and each throws, or refuses as malformed, with the Error "tracker-export:
 * archived <shard> line <n> <reason>" (C9's typed line adds "; nothing is written"), its reason the one it is listed under:
 *   layouts: the only shard | the older of two shards | the newer of two shards | the middle of three shards
 *   positions: line 1 before a whole row | line 2 between two whole rows | line 3 after two whole rows
 *   does not parse: the prefix form cut short | the prefix form followed by other text | the prefix form with an id holding an
 *     invalid escape | no prefix, cut short | no prefix, followed by other text | no prefix, an id holding an invalid escape | a line
 *     that opens like a # comment | a line that opens like a // comment | a line that opens like a /* comment | a line that opens like
 *     a -- comment | a line that opens like a ; comment | a line that opens like a <!-- comment | a line of one space | a line of one
 *     tab | a line of spaces and a tab | a line of a vertical tab | a line of a form feed | a line of a no-break space | a line of a
 *     byte order mark | a line of a line separator
 *   is not a JSON object: an array | null | a number
 *   has no string id: the prefix form with an empty id | no prefix, an empty id | no id | a number id
 *   plant tables sha256: b1ccc67bbe3bb0797485f823927dbccf28ea9560a59a72a8b2c712e83595b46b
 * The four prefix forms open with the export's own line prefix; each comment form is its opener and " a note" (the two block forms
 * closed after it); the eight lines of whitespace alone are, by code point: U+0020; U+0009; U+0020 U+0020 U+0009 U+0020; U+000B;
 * U+000C; U+00A0; U+FEFF; U+2028.
 *
 * CUT #4 PLANT TABLES (wb-137f refusal #3: the compaction suite's tables UTF8_CHARACTERS, NAMES_OUTSIDE_THE_FORM,
 * SHARD_NAMES_IN_THE_FORM, STATUSES_NOT_CLOSED and FIELDS_BEYOND_STUB, by label, in table order; its case P2 reads each list below
 * back and holds it equal to its table, and K14 holds its variant labels equal to the K14 variants list). UTF-8 CHARACTERS are a
 * two-, a three- and a four-byte character, a no-break space, a letter with a combining mark after it, and a line separator inside a
 * JSON string, each by code point; R1 also leads a main export with U+FEFF. Each status is written as its JSON string.
 *   UTF-8 characters: U+00E9 | U+2014 | U+1F600 | U+00A0 | U+0065 U+0301 | U+2028
 *   names outside the form: README.md | issues-closed-2026-11-03.jsonl | issues-closed-2026-00.jsonl | issues-closed-2026-13.jsonl |
 *     issues-closed-2026-14.jsonl | issues-closed-2026-20.jsonl | issues-closed-2026-1.jsonl | issues-closed-2026-.jsonl |
 *     issues-closed-202611.jsonl | issues-closed-202-11.jsonl | issues-closed-20261-11.jsonl | issues-closed-YYYY-11.jsonl |
 *     issues-closed-2026-11.jsonl.bak | old-issues-closed-2026-11.jsonl | ISSUES-CLOSED-2026-11.JSONL | issues-closed-2026-11.json |
 *     issues-closed-2026-11xjsonl
 *   shard names in the form: issues-closed-2026-01.jsonl | issues-closed-2026-02.jsonl | issues-closed-2026-03.jsonl |
 *     issues-closed-2026-04.jsonl | issues-closed-2026-05.jsonl | issues-closed-2026-06.jsonl | issues-closed-2026-07.jsonl |
 *     issues-closed-2026-08.jsonl | issues-closed-2026-09.jsonl | issues-closed-2026-10.jsonl | issues-closed-2026-11.jsonl |
 *     issues-closed-2026-12.jsonl | issues-closed-0000-01.jsonl | issues-closed-1999-01.jsonl | issues-closed-9999-12.jsonl
 *   statuses not closed: "open" | "Closed" | "CLOSED" | "closed " | " closed" | "closed\t" | "closed\n" | "unclosed" | "closedx"
 *   fields beyond STUB_FIELDS: _note | notes | description | created_at | priority | labels | titles | type
 *   K14 variants: W-GP4-04 a directory at the running month's shard name | a symlink to a file at the running month's shard name |
 *     directories at both shard names it appends to | a directory at the main export | a symlink to a file at the main export | a directory
 *     at a shard name and at the main export | W2-17a directories at both shard names it appends to and at the main export, the full export
 *     listing wb-c2 (closed 2026-11) before wb-c1 (closed 2026-10) | W8-03 a FIFO at the main export | a FIFO at the running month's shard
 *     name | a dangling symlink at the main export | a symlink to a directory at the past month's shard name
 *
 * GUARD. The pushed commits and objects of a push of <tip> are what `git rev-list --objects <tip> --not <excluded...>` lists (G5).
 * The tracker export family is every blob a pushed commit writes to the repository path .beads/issues.jsonl or below .beads/archive/
 * - its diff against a parent, a merge's against each parent, a root commit's whole tree (G2, G3, G4, G18) - whatever other path
 * also holds that blob (G17); a blob only other paths hold - another directory's .beads/issues.jsonl, .beads/issues.jsonl.bak,
 * .beads/archive-old/, a file named .beads/archive - is not judged (G6, G16), nor is a family blob the push would not send (G19). The
 * push refuses (exit 2) when a family blob it would send is at or over the soft ceiling (G2, G3, G4): one typed line on stderr per
 * such blob for the whole judgement, naming one family path a pushed commit writes it to, its blob and its bytes, however many family
 * paths or judged pushes hold it (G12, G14), and a line for each of two different blobs two commits write to one family path, of two
 * sizes or of one size (G4). A family blob under the ceiling passes (G2). FW_EXPORT_SOFT_CEILING - a positive whole number of bytes,
 * with no sign, padding, exponent or leading zero, at most 2^53 - 1 (G1 takes 2^53 - 1 and refuses 2^53 and 2^53 + 1) - replaces the
 * default 95 MiB = 99,614,720; an empty or absent value keeps the default (G1).
 *
 * CLI. Exit 0 done; 2 refused at the soft ceiling; 3 refused or could not run, in exactly the cases each verb lists:
 *   node qa/workbench/tracker-export.mjs compact --full <full export file> --beads <.beads dir> [--now <UTC stamp>]
 *       writes <dir>/issues.jsonl and each shard it appends to under <dir>/archive/ - each whole, by a rename over its path, leaving no
 *       temporary file in <dir> - and no other shard: a shard it does not append to keeps its inode, bytes and modification time (K13);
 *       then it prints one JSON receipt line on stdout (K1), whose appended map names each shard it appended to, with its count, in
 *       name order (K15 plants a full export listing the later month's closed row first); a re-run with nothing changed appends nothing
 *       (K1, K13), over rows holding each character UTF-8 CHARACTERS lists too, each shard keeping its bytes (K1). Its inputs are the
 *       archive's shard files: a file of another name (a README, a month 13 name, and the names NAMES OUTSIDE THE FORM lists, together
 *       in one archive), a directory of a shard's name and a symlink of one to a file outside the archive are neither inputs nor touched
 *       (K5). --now names the run's UTC month (K12); without it the run stamp is the current time (K11). A UTC stamp is
 *       YYYY-MM-DDTHH:MM:SS, then an optional fraction of 1 to 9 digits, then Z or an offset +HH:MM / -HH:MM, every field in range (a
 *       calendar day - C9 refuses February 29 of 2026 and of 2100, a November 31 and a day 00, and C16 takes February 29 of 2028 and
 *       of 2000 and the last day of a 31-day, a 30-day and a 28-day month; hour 00-23; minute and second 00-59; offset hour 00-23 and
 *       offset minute 00-59, C16 taking +23:59 and -23:59), its offset applied, and the instant inside the years 0000-9999 (C16 takes
 *       the first instant of 0000 and the last of 9999) (C9, C16, K12). Exit 2 at the soft ceiling (K3). Exit 3 on a usage error (K6),
 *       a bad FW_EXPORT_SOFT_CEILING (K8), a full export it cannot read - a missing file, a directory (K9) - a run stamp that is not a
 *       UTC stamp (K4, K12), the one malformed export K3 plants - a full export whose only line is `{not json` - and the malformed
 *       shards K3 plants (the prefix form cut short as the only shard's line, and the four prefix forms and the six comment forms
 *       PLANTED SHARD LINES names as the older of two shards' line), a round trip that is not byte-equal (K10), and a path it would
 *       write - a shard it appends to, or the main export -
 *       that exists and is a directory, a symlink (to a file, to a directory, or dangling) or a FIFO, one typed line per such path,
 *       shards in name order and then the main export, also when the full export lists the later month's closed row first (K14). It
 *       writes nothing when it exits 2 or 3 (K3, K4, K6, K8, K9, K10, K14). Which exit compact gives, and what it writes, over a
 *       full export malformed in any form but K3's - the forms C8 plants at compactTrackerExport, a duplicate id among them
 *       (refusal #4 of wb-294d, F3: GP2-K03) - is NOT CLAIMED at the CLI.
 *   node qa/workbench/tracker-export.mjs rehydrate --beads <.beads dir>
 *       prints trackerExportText(<dir>/issues.jsonl) on stdout as it is, adding no final newline (K2), the full export's UTF-8 bytes
 *       for rows holding each character UTF-8 CHARACTERS lists (K2); exit 3, printing nothing on stdout, on a usage error (K6) and
 *       when the read throws (K7: a missing main export; a shard line that does not parse appended to the newer of the two shards a
 *       compaction wrote - one with no prefix, the prefix form cut short and one with an id holding an invalid escape - and the four
 *       prefix forms and the six comment forms PLANTED SHARD LINES names appended to the older of them).
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
 * RESIDUALS: none named at this cut - every member refusals #1, #2 and #3 of wb-137f named is planted (refusal #2's U1-U7 by C9, C17,
 * C18, K3, K7, K14, K15, R2, R3, R10, R11; refusal #3's U1-U6 by C2, C8, C9, C12, C16, G1, G4, K1, K2, K5, K13, R1, R2, R4, R5, R6,
 * R10 and T1), and every other mode known is a scope sentence of NOT CLAIMED.
 * NOT CLAIMED: the machine wiring named above; line ends other than a bare newline and text that is not UTF-8; a character beyond
 * ASCII that UTF-8 CHARACTERS does not list, outside the tracked export T1 reads; two compactions of one .beads directory at once, a
 * crash while one writes, and a write or a pre-write check that fails with an error (the error is thrown, the exit is 1, and a file
 * written before it stays written); where the temporary file sits; an archive directory or a shard the process cannot list or read,
 * and a full export it cannot read for a cause other than K9's two; an archive directory that is a symlink to a directory; what the
 * tracker's importer does with a main export (STUB FIELDS above is a measurement); the time a parse of the shards takes; a family
 * blob a successful `git rev-list --objects` lists that `git cat-file` cannot size; a submodule entry at a family path; a FIFO, a
 * socket or a device file of a shard's name in the archive directory (R4 and K5 plant only symlinks and directories there), and a
 * socket or a device file at a path compact would write (K14 plants directories, symlinks and FIFOs); a sha of 64 hex digits one
 * digit short or in upper case at the pre-push hook (G9 plants 40-digit shas); a non-empty shard line that PLANTED SHARD LINES does
 * not name - another comment opener, another line of whitespace alone, another malformed form - and a named line at a position or in
 * a layout it does not name; at the CLI, a shard line R3 and C9 plant but K3 and K7 do not; a shard Map whose order C17 does not
 * plant (it plants name order, two shards in reverse name order and three in neither); a file name outside the shard form that NAMES
 * OUTSIDE THE FORM does not list, and one in the form that SHARD NAMES IN THE FORM does not list; on a stub-shaped row beside an
 * archive, a status other than "closed" that STATUSES NOT CLOSED does not list, and a field beyond STUB_FIELDS that FIELDS BEYOND
 * STUB_FIELDS does not list; a change to a shard's modification time of a size R10 does not plant - one under a microsecond among
 * them, which the read memo's key, the modification time in milliseconds as a double, may not resolve; a main export line beside an
 * archive of a kind R5-R8 and R12 do not plant; a close stamp, a run stamp or a soft-ceiling value of a form the cited cases do not
 * plant.
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

/**
 * A month shard's file name: issues-closed-YYYY-MM.jsonl, YYYY four digits and MM a calendar month 01 to 12 - each name SHARD NAMES IN
 * THE FORM lists, and no name NAMES OUTSIDE THE FORM lists (C9, R4, K5).
 */
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
 * A closed row in stub shape: every field it holds is a STUB_FIELDS field; wb-c2's stub fields with one field FIELDS BEYOND
 * STUB_FIELDS lists added are not in stub shape (R5, C8).
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
 * A JSON-lines export, line by line; an empty line - no character at all - is kept as one (C15), and each line C8 plants refuses: one
 * that does not parse (the eight lines of whitespace alone among them), null, an array, a number or a string, a row whose id is none,
 * empty, a number or null, a row whose status is none, a number or null, and a row repeating an id (C8).
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
 * The id of an archived line, read from a parse of the WHOLE line and never from its prefix alone: each line PLANTED SHARD LINES names
 * throws one Error naming the shard and the line - it does not parse, is not a JSON object, or has no non-empty string id - at each
 * position and in each layout it names (R3, C9), and so do its four prefix forms and six comment forms at the CLI (K3, K7) and the
 * prefix form cut short as a shard's last line with no newline after it (R11).
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
 * Every id's latest archived line: shards in name order, the shards given out of name order too (C17), lines in file order, the last
 * one wins (C4, R2). Each line PLANTED SHARD LINES names goes through archivedId at each position and in each layout it names (R3, C9),
 * and so does a shard's last line with no newline after it (R11); an empty line between two rows is skipped (R3, C9).
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
 * A main export with each STUB line whose id has an archived line replaced by that id's latest archived line (R2). A STUB line parses
 * as a JSON object whose status is the string "closed" and that holds no field but STUB_FIELDS, however its JSON is spaced (R6, R8);
 * these other lines are kept as they are: a full closed row (R5, with one field FIELDS BEYOND STUB_FIELDS lists added to a stub's
 * fields among them), a stub-shaped row whose status is not "closed" (R6: "open", "Closed" and each status STATUSES NOT CLOSED lists),
 * a stub no shard holds (R7), and the lines R12 plants - an empty line, a line that does not parse, null, an array, a number, a string
 * and a closed stub-shaped row whose id is a number.
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
 * The full export a main export and its shards stand for: the shards read in name order, given out of it too (C17), a shard's last line
 * parsed though no newline ends it (R11).
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
 * The shard files of an archive directory - regular files named issues-closed-YYYY-MM.jsonl, YYYY four digits and MM 01 to 12, each name
 * SHARD NAMES IN THE FORM lists among them; not the files of other names (each name NAMES OUTSIDE THE FORM lists among them), the
 * symlinks (to a file, to a directory, dangling) and the directories of a shard's name R4 plants - under a key of the directory and each
 * shard's name, size and modification time, so that each change R10 plants is read again (a size; a modification time moved by 60 s,
 * by 0.5 s inside one second or by 0.3 ms inside one millisecond; a shard added, renamed or removed; another directory), or undefined
 * when no entry is at the path (R1), it is a file (R9) or it holds no shard file (R4).
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
 * The full export for a main export text a reader already read from `mainPath`, a string path or a file URL (R2), another text of the
 * same length among them (R10): the text unchanged when no archive directory beside it holds a shard file (R1, R4, R9); its shards
 * are read as UTF-8 (R2).
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
 * The one read of a main export, at a string path or a file URL (R1, R2): the file's text read as UTF-8 (R1 plants each character UTF-8
 * CHARACTERS lists, and a leading byte order mark, which it keeps), rehydrated from the archive directory beside it when that holds a
 * shard file (R1, R2, R9).
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
 * Compacts a full export against the existing shards, read in name order though given out of it (C17): the main export, every shard
 * after the run and what was appended where, the shards and the appended map in name order also when the full export lists the later
 * month's closed row first (C3, C4, C4b, C18). Refuses as "malformed" on a run stamp that is not a UTC stamp (C9 plants 24), a shard
 * name that is not a month shard's - a day shard's, a month 00 or 13, a README, each name NAMES OUTSIDE THE FORM lists (C9) - while
 * each name SHARD NAMES IN THE FORM lists is one (C9); in each layout PLANTED SHARD LINES names a
 * non-empty shard that does not end with a newline, and a shard holding a line PLANTED SHARD LINES names at a position it names (C9;
 * an empty line between two rows is skipped and an empty shard holds no line, in each of those layouts), a malformed export (C8) and a
 * stub-shaped closed row in the input - a main export passed where the full export belongs (C8; that row with one field FIELDS BEYOND
 * STUB_FIELDS lists added is a full row, compacted to its stub, C8); as "oversize" on a main export, a
 * shard the run appends to or a shard it does not append to at or over the ceiling after the run (C7); as "round-trip" when the
 * compacted export does not rehydrate to the full export it was cut from (C10). The CLI then writes nothing (K3, K4, K10). A change to
 * a shard that existed before the run and is of a month before the run's refuses as "sealed": a backstop the routing rule never
 * reaches, since no run appends to such a shard, so no case reaches it.
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
    // Only month shard files are inputs, as only they are read back (archiveState); K5's files of another name (the names NAMES OUTSIDE
    // THE FORM lists among them), directory of a shard's name and symlink of one to a file are neither. The shards are read as UTF-8,
    // so a re-run over rows holding UTF-8 CHARACTERS appends nothing (K1).
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
  // Every path the run writes - each shard it appends to, in name order (also when the full export lists the later month's row
  // first), then the main export - is checked before the first write: one that exists and is not a regular file (K14 plants a
  // directory, a symlink to a file, to a directory or dangling, and a FIFO) refuses with one typed line each, and nothing is written
  // (K14).
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
