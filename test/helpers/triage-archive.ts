/**
 * triage-archive.ts: the owner-specified triage-archive exclusion of the walking censuses (wb-cbt4, [MWI-master-recon]).
 *
 * SOURCE: owner specification ruling 2026-11-06 (ruling-received M:60615 point 4, epic wb-1a3t). The mechanical-workflows-interop
 * triage tree (docs/workbench/programs/mechanical-workflows-interop-2026-11-04/triage/, 457 files at master 0b25e14e) is an
 * evidence archive that lives on master only and is never copied to trunk. The ruling's rationale, carried verbatim (and exported
 * below as OWNER_RATIONALE):
 * "a quoted-evidence archive is out of scope for live-doc walks BY SPECIFICATION (owner ruling) — that is a scope decision made at
 * the spec level, distinct from a lane narrowing an assertion to fit its code."
 *
 * THE ARCHIVE is what the regular expression ARCHIVE below matches; the predicate reads paths, not file kinds, and a path is
 * repository-relative and "/"-separated, as git ls-files prints it. What this comment claims of it is the PINNED FORMS lines below
 * and nothing more: test/workbench-triage-archive-exclusion-census.test.ts reads those lines (P1, P3) and judges one path per form.
 * The archive forms read as the archive (P1): the triage directory of a program, a file directly in it, a page two levels below it,
 * and that page under a one-character program and under a program named with capitals, digits, a space, a dot and an underscore.
 * The live forms read live (P2), one path each as the census's liveRowsFrom spells it: each segment of TRIAGE_ARCHIVE renamed,
 * extended, upper-cased and capitalized, the program segment absent and doubled, triage as a file, a program's own page, and the
 * path not anchored at the repository root. Every other spelling is NOT CLAIMED by this comment.
 * PINNED FORMS archive: directory, child, page, one-character-program, mixed-program
 * PINNED FORMS live: docs:renamed, docs:extended, docs:upper, docs:capitalized, workbench:renamed, workbench:extended, workbench:upper
 * PINNED FORMS live: workbench:capitalized, programs:renamed, programs:extended, programs:upper, programs:capitalized, *:none, *:two
 * PINNED FORMS live: triage:renamed, triage:extended, triage:upper, triage:capitalized, triage:file, *:page, anchor
 *
 * A census that routes a walk through this module drops the archive from that walk; where the walk is held equal to git's listing,
 * both lists drop it, so they still agree. test/workbench-triage-archive-exclusion-census.test.ts pins this predicate, the roster of
 * censuses that call it, each one's ARCHIVE_SCOPE_LINE, and the npm boundary line that keeps the same archive out of the packed
 * artifact.
 */

/** The archive as the root .npmignore boundary line spells it, in gitignore syntax (N1-N3 judge the line). */
export const TRIAGE_ARCHIVE = "docs/workbench/programs/*/triage/";

/** The owner ruling's rationale sentence, verbatim as the wb-cbt4 bead quotes it (its dash is U+2014). */
export const OWNER_RATIONALE = `a quoted-evidence archive is out of scope for live-doc walks BY SPECIFICATION (owner ruling) ${String.fromCodePoint(0x2014)} that is a scope decision made at the spec level, distinct from a lane narrowing an assertion to fit its code.`;

/** The header line each census that routes a walk through this module carries once, as a line of the /** block its file opens with (W2). */
export const ARCHIVE_SCOPE_LINE =
  "ARCHIVE SCOPE (wb-cbt4; owner specification ruling M:60615 point 4): the triage archive, docs/workbench/programs/<program>/triage/ and every path below it, is NOT CLAIMED by this census; each walk the archive turned red at master's tree, with any listing that walk is held equal to, drops it through test/helpers/triage-archive.ts.";

/** The regular expression that defines the archive; its judged forms are the PINNED FORMS lines of the comment above. */
const ARCHIVE = /^docs\/workbench\/programs\/[^/]+\/triage(?:\/|$)/;

/** Whether ARCHIVE matches a repository-relative, "/"-separated path. */
export function isTriageArchivePath(path: string): boolean {
  return ARCHIVE.test(path);
}

/** The given paths ARCHIVE does not match, in their given order, a repeated path kept each time (P2). */
export function withoutTriageArchive(paths: readonly string[]): string[] {
  return paths.filter(path => !isTriageArchivePath(path));
}
