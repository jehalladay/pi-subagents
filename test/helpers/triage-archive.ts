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
 * THE ARCHIVE is the path docs/workbench/programs/<program>/triage - triage directly inside one program directory - together with
 * every path below it. The predicate reads paths, not file kinds. Nothing else is the archive: a program's own pages
 * (docs/workbench/programs/<program>/README.md), a triage directory at any other depth or under any other parent, a differently
 * cased TRIAGE, and a name that only begins with triage (triage.md, triaged/) stay live paths.
 *
 * Paths are repository-relative and "/"-separated, as git ls-files prints them. A census that routes a walk through this module
 * drops the archive from that walk; where the walk is held equal to git's listing, both lists drop it, so they still agree.
 * test/workbench-triage-archive-exclusion-census.test.ts pins this predicate, the roster of censuses that call it, each one's
 * ARCHIVE_SCOPE_LINE, and the npm boundary line that keeps the same archive out of the packed artifact.
 */

/** The archive as the root .npmignore boundary line spells it (gitignore syntax, anchored at the repository root). */
export const TRIAGE_ARCHIVE = "docs/workbench/programs/*/triage/";

/** The owner ruling's rationale sentence, verbatim as the wb-cbt4 bead quotes it (its dash is U+2014). */
export const OWNER_RATIONALE = `a quoted-evidence archive is out of scope for live-doc walks BY SPECIFICATION (owner ruling) ${String.fromCodePoint(0x2014)} that is a scope decision made at the spec level, distinct from a lane narrowing an assertion to fit its code.`;

/** The header line each census that routes a walk through this module carries, once, as a line of its leading comment. */
export const ARCHIVE_SCOPE_LINE =
  "ARCHIVE SCOPE (wb-cbt4; owner specification ruling M:60615 point 4): the triage archive, docs/workbench/programs/<program>/triage/ and every path below it, is NOT CLAIMED by this census; each walk the archive turned red at master's tree, with any listing that walk is held equal to, drops it through test/helpers/triage-archive.ts.";

/** One program directory below docs/workbench/programs/, then triage, then the end of the path or a "/". */
const ARCHIVE = /^docs\/workbench\/programs\/[^/]+\/triage(?:\/|$)/;

/** Whether a repository-relative, "/"-separated path is the triage archive directory or lies below it. */
export function isTriageArchivePath(path: string): boolean {
  return ARCHIVE.test(path);
}

/** The paths outside the triage archive, in their given order. */
export function withoutTriageArchive(paths: readonly string[]): string[] {
  return paths.filter(path => !isTriageArchivePath(path));
}
