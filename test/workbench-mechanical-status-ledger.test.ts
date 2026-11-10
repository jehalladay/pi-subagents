/**
 * wb-mit9 [MNI-2026-11-09 P00b]: the historical requirement status ledger (EAT-R202) and the re-pin record (EAT-R201) of the
 * mechanical-native-interoperability-2026-11-09 program, judged by qa/workbench/mechanical-status-ledger.mjs. The requirement
 * text is docs/workbench/programs/mechanical-native-interoperability-2026-11-09/requirements/ATOMIC-REQUIREMENTS.md at
 * pi-subagents master 18b016b2b3e4 (blob 1fbe1b8e4eff; master only at this base). Quoted:
 *  EAT-R201 AC1 "Assert a machine-readable pre-cut record contains full Pi and MW source commits, tree IDs, branch/ref names,
 *    package manifest versions and the active Beads/feedback snapshot." AC2 "Assert the record compares Pi default branch with
 *    workbench/implementation-program by merge-base and marks each implicated change merged, machine-only, historical or
 *    proposed; no unmerged branch is certified as the default branch." AC3 "Assert a changed branch or package pin after a
 *    packet cut invalidates that cut's final-tree acceptance until re-pin and affected tests rerun."
 *  EAT-R202 AC1 "Assert every EAT-R001..R200 identifier has exactly one ledger row with Pi/MW source pin, real Beads id or
 *    explicit none, evidence link and class already-implemented/tested, partial/inert, or blocked; a tested class names its
 *    tested forms." AC2 "Assert rows for EAT-R001..R003, R012..R014 and the run-wide F10 control distinguish fixed, scoped
 *    forms from the witnessed pending parked per-agent skip/retry; no row says that WorktreePreservationFailedResult contains
 *    byte data." AC3 "Assert an unmapped B-* label or a fabricated wb-* id fails ledger validation; the 25-group total is not
 *    treated as 25 complete issues."
 *
 * Each planted case below edits one clone of a committed file (or the text a reader returns for one) and reads the judge's
 * findings; the expected finding is the rule's own text. The tested forms are judged in report mode by
 * test/workbench-mechanical-status-ledger.census.ts, which also reads that the cases this file registers are the ones the
 * lines below name.
 *
 * Cut #3 is authored in the rule-14 enumerate-the-resolvable form (refusal #2, guard R-B755, its second-stage cap engaged
 * by R-B757): the lines below claim exactly what their cases pin, every mode known to stay unpinned is a NAMED RESIDUAL
 * with its pinned quiet row, and every mode outside both is a NOT CLAIMED scope sentence.
 *
 * PINNED READER SET (one claim per line; each line names its cases before the colon; an input no case holds is NOT CLAIMED):
 *  - SL-LIVE-LEDGER: the committed ledger, judged with the repository tree, the Beads export and the census docs reader (sectionReader over docsSection of test/helpers/census.ts), gives no finding.
 *  - SL-LIVE-RECORD: the committed re-pin record gives no finding.
 *  - SL-SHAPE: the rows hold the frozen shape of this cut (rule 16): per row its id, group, class, tested-form count, evidence count and the digests of its title, of its tested forms and of its evidence with its partial source.
 *  - SL-COUNTS: 200 rows, 75 already-implemented/tested, 31 partial/inert and 94 blocked, and 3 of the 25 plan groups complete.
 *  - SL-R210: the tested forms of EAT-R001, EAT-R002 and EAT-R144 name the five PF cases of test/worktree.test.ts that plant EAT-R210's status, add, commit, HEAD rev-parse and branch-retry failures, each by its registered title and suite path (the census leg judges each in report mode).
 *  - SL-HEADER: these PINNED READER SET lines hold their recorded digests.
 *  - SL-CLI, SL-CLI-USAGE-BARE-ROOT, SL-CLI-USAGE-OTHER-FLAG, SL-CLI-USAGE-EXTRA-ARG, SL-CLI-UNREADABLE, SL-CLI-ROOT, SL-CLI-FINDINGS-LEDGER, SL-CLI-FINDINGS-RECORD: the CLI judges the committed files with exit 0 and two empty lists; --root with no directory, another flag with a directory, and --root <dir> with one more argument each exit 2 with the usage line and no output; a root that holds no ledger exits 2 naming unreadable input; and over a root whose other files are the committed ones (symlinks), the committed files exit 0 with two empty lists while a ledger finding alone or a record finding alone exits 1 with that one list non-empty.
 *  - SL-SCHEMA, SL-SCHEMA-LEDGER, SL-SCHEMA-ROWS, SL-SCHEMA-ROW, SL-SCHEMA-PI-PIN, SL-SCHEMA-MW-PIN, SL-SCHEMA-PIN-NOT-STRING, SL-SCHEMA-MW-PIN-NOT-STRING: a foreign schema, a ledger that is not an object, rows that are not an array, a row that is not an object, a ledger Pi or MW pin that is not 40-hex, and a ledger Pi or MW pin that is not a string (an array holding the 40-hex pin) are refused (L-SCHEMA).
 *  - SL-IDS-MISSING, SL-IDS-DUPLICATE, SL-IDS-ORDER, SL-IDS-FOREIGN, SL-IDS-ALONE-MISSING, SL-IDS-ALONE-DUPLICATE, SL-IDS-ALONE-FOREIGN: a missing, duplicated, out-of-order or foreign row id is refused, and a missing, a duplicated and a foreign row each give exactly their own L-IDS finding, with no order finding beside it (L-IDS, EAT-R202 AC1).
 *  - SL-EXPORT, SL-EXPORT-QUIET: a row deleted from the ledger is refused through the Beads export, which names every EAT-R001..EAT-R200 id on a wb-1a3t child, and an id named only outside the epic's children, below or above EAT-R001..EAT-R200 (EAT-R000, EAT-R201, EAT-R250) or inside a longer number (EAT-R1001) is not read (L-EXPORT).
 *  - SL-CLASS, SL-PIN, SL-PIN-MW, SL-PIN-NOT-SHA, SL-PIN-MW-NOT-SHA, SL-PIN-NOT-STRING, SL-PIN-MW-NOT-STRING: an unknown class, a row pin.pi or pin.mw other than the ledger's pin, a row pin equal to a ledger pin that is not 40-hex, and a row pin that is the ledger's own pin but not a string are refused (L-CLASS, L-PIN).
 *  - SL-BEAD-FABRICATED, SL-BEAD-UNNAMED, SL-BEAD-NOT-ID, SL-BEAD-PREFIXED, SL-BEAD-SUFFIXED, SL-BEAD-NOT-STRING, SL-BEAD-NONE: a fabricated wb- id, a bead that does not name the row's id and a bead that is no wb- id (a string that is not one, one with a character before or after a wb- id, or an array holding one) are refused (L-BEAD, EAT-R202 AC3); a row whose bead is none draws no L-BEAD finding, and L-GROUP refuses it as not its group's bead.
 *  - SL-GROUP-UNMAPPED, SL-GROUP-WRONG-BEAD, SL-GROUP-TAG, SL-GROUP-TAG-EMPTY, SL-GROUP-TAG-INSIDE, SL-GROUP-EXPORT-TAG, SL-GROUP-EXPORT-TAG-PARENT, SL-GROUP-BEAD-ABSENT, SL-GROUP-DROPPED, SL-GROUP-FOREIGN-LABEL: an unmapped group label, a row on another group's bead, a tag that does not start its bead's title (absent from it, empty, or held only after other text), a tag that is no wb-1a3t child tag in the export (a prefix of one, one found only on a bead outside the epic's children, or one that a child's title holds only after other text), a group bead the export does not hold, a dropped plan group and a foreign group label are refused (L-GROUP, EAT-R202 AC3).
 *  - SL-TESTED-NO-FORMS, SL-TESTED-NOT-OBJECT, SL-TESTED-NULL, SL-TESTED-NO-FILE-NAME, SL-TESTED-NO-TITLE, SL-TESTED-NO-SUITE, SL-TESTED-SUITE-ENTRY, SL-TESTED-NO-FILE, SL-TREE-ABSOLUTE, SL-TREE-ABSOLUTE-FULL, SL-TREE-PARENT: a tested row without a tested form, a form that is not an object (a string or null), that lacks a file or a title or whose suite is not an array of non-empty strings, and a form naming a file the tree does not hold are refused, and so is a form naming an absolute path (root-absolute, or the full path) or a path with a .. segment, even when it leads to a file the root holds (L-TESTED; no case text is read).
 *  - SL-PARTIAL-NO-REASON, SL-PARTIAL-NO-TEXT, SL-PARTIAL-NO-SOURCE: a partial/inert row without partialBecause, with an empty reason text, or whose source anchor its rendered section does not hold is refused (L-PARTIAL).
 *  - SL-BLOCKED-NO-BLOCKER, SL-BLOCKED-KIND, SL-BLOCKED-NO-DETAIL: a blocked row without blockedBy, with a kind outside BLOCKER_KINDS or with an empty detail is refused (L-BLOCKED).
 *  - SL-EVIDENCE-NONE, SL-EVIDENCE-NOT-OBJECT, SL-EVIDENCE-NULL, SL-EVIDENCE-EMPTY-ANCHOR, SL-EVIDENCE-NEITHER, SL-EVIDENCE-NO-FILE, SL-EVIDENCE-RAW, SL-EVIDENCE-BEAD-ABSENT, SL-EVIDENCE-BEAD: a row without evidence, an item that is not an object (a string or null) or has an empty anchor, an item naming neither a path nor a bead, a path the tree does not hold, an anchor the raw text of a file that is not markdown does not hold, a bead the export does not hold and an anchor a bead's description and notes do not hold are refused (L-EVIDENCE).
 *  - SL-SECTION-NONE, SL-SECTION-NOT-OBJECT, SL-SECTION-HEADING, SL-SECTION-DEPTH-FRACTION, SL-SECTION-DEPTH-LOW, SL-SECTION-DEPTH-HIGH, SL-SECTION-PARENTS, SL-SECTION-PARENT-ENTRY, SL-SECTION-UNBOUND, SL-SECTION-ANCHOR, SL-SECTION-COMMENTED, SL-SECTION-INLINE-COMMENTED, SL-SECTION-PARAGRAPH-COMMENTED: a markdown anchor without a section object, with an empty heading, a depth that is not an integer from 1 to 6, or parents that are not an array of non-empty strings, a section docsSection does not bind, an anchor its section's rendered text does not hold, and an anchor hidden in an HTML comment of its receipt (a comment block, the gate's GD1 plant; an inline comment inside its list item, the gate's GD2 plant; an inline comment inside a paragraph) are refused (L-EVIDENCE, L-PARTIAL).
 *  - SL-AC2-LISTS, SL-AC2-FIXED, SL-AC2-PENDING, SL-AC2-FIXED-BLANK, SL-AC2-WITNESS, SL-AC2-WITNESS-OTHER, SL-AC2-NOT-PENDING, SL-AC2-NOT-PARKED, SL-AC2-NOT-SKIP-OR-RETRY, SL-AC2-WORD-PARKED-START, SL-AC2-WORD-PARKED-END, SL-AC2-WORD-PENDING-START, SL-AC2-WORD-PENDING-END, SL-AC2-WORD-SKIP-START, SL-AC2-WORD-RETRY-END, SL-AC2-CASE-PARKED, SL-AC2-CASE-PENDING, SL-AC2-CASE-SKIP-OR-RETRY: the judge reads exactly the six AC2 rows and the sixteen containing verbs; each of the six AC2 rows is refused when it drops its fixed forms or its pending sentence; EAT-R001 is refused with an empty fixed form, and EAT-R012 when its pending sentence loses wb-9v02 (dropped, or naming wb-9v03 instead), the word pending, the word parked or the words skip or retry, or holds one of them only inside a longer word (unparked, parkeds, unpending, pendings, unskip or retry, skip or retrying) or only with capital letters (Parked, Pending, Skip or Retry) (L-AC2, EAT-R202 AC2).
 *  - SL-AC2-CONTROL, SL-AC2-CONTROL-NO-FORMS, SL-AC2-CONTROL-UNTESTED: the F10 control is refused without its fixed forms, without its pending sentence, when absent, with a form that lacks a title and, while tested, with no tested form; a control that is not tested may name none (L-AC2, L-TESTED).
 *  - SL-BYTES-VERB, SL-BYTES-SINGULAR, SL-BYTES-CASE, SL-BYTES-CONTROL, SL-BYTES-QUIET, SL-BYTES-QUIET-TYPE, SL-BYTES-QUIET-VERB-END, SL-BYTES-QUIET-VERB-START, SL-BYTES-QUIET-BYTE-START, SL-BYTES-QUIET-BYTE-END, SL-BYTES-QUIET-PERIOD-VERB: a row string naming WorktreePreservationFailedResult, then one of the sixteen pinned containing verbs, then bytes or the singular byte is refused, read in any letter case, as is such a string of the F10 control; the committed wording, a path that names where the bytes stay and a sentence break (after the type, or after the verb) are quiet, as are a longer type name (WorktreePreservationFailedResultSet), a containing verb inside a longer word (containment, miscarries) and the byte word inside a longer word (kilobytes, bytestream) (L-BYTES, EAT-R202 AC2).
 *  - SL-SUMMARY-25-COMPLETE, SL-SUMMARY-LABELS, SL-SUMMARY-LABELS-MISSING, SL-SUMMARY-ROWS, SL-SUMMARY-CLASS, SL-SUMMARY-PLAN-GROUPS, SL-SUMMARY-EMPTY-GROUP: a summary counting the 25 plan groups as complete, complete labels that differ from the groups whose every row is tested or are absent, a row, class or plan-group count that differs from the rows, and a complete count that includes a plan group left with no row are refused (L-SUMMARY, EAT-R202 AC3).
 *  - SL-SUCCESSORS-RANGE, SL-SUCCESSORS-EDGE, SL-SUCCESSORS-HIGH, SL-SUCCESSORS-NOT-ID, SL-SUCCESSORS-PREFIXED, SL-SUCCESSORS-SUFFIXED, SL-SUCCESSORS-TWICE, SL-SUCCESSORS-NOT-ARRAY: a successor below EAT-R201 (EAT-R150, EAT-R200), above EAT-R310 or not an EAT-R id (no EAT- prefix, a character before it, a fourth digit), a successor named twice and successors that are not an array are refused (L-SUCCESSORS).
 *  - SL-RECORD-SCHEMA, SL-RECORD-NOT-OBJECT, SL-RECORD-PI-MISSING, SL-RECORD-CHANGES-MISSING: a foreign schema, a record that is not an object, a missing pi and missing implicatedChanges are refused (R-SCHEMA).
 *  - SL-RECORD-SHORT-SHA, SL-RECORD-SHORT-COMMIT, SL-RECORD-SHORT-BLOB, SL-RECORD-UPPER-SHA, SL-RECORD-LONG-SHA, SL-RECORD-SHA-MERGE-BASE, SL-RECORD-SHA-MW, SL-RECORD-SHA-HISTORICAL, SL-RECORD-SHA-CHANGE, SL-RECORD-SHA-KEY-QUIET: a tree, commit or blob member that is not 40 lower-case hex is refused, an upper-case one and a 41-character one included, on a Pi ref, the merge-base, an MW ref, a historical pin and an implicated change, while a member whose key only starts with commit, tree or blob is not read (R-SHA).
 *  - SL-RECORD-BRANCH-UNNAMED, SL-RECORD-MACHINE-REF, SL-RECORD-REF-TWICE, SL-RECORD-PACKAGE, SL-RECORD-PACKAGE-NAME, SL-RECORD-REF-COMMIT, SL-RECORD-REF-TREE, SL-RECORD-BEADS-BLOB, SL-RECORD-BEADS-BLOB-MISSING, SL-RECORD-FEEDBACK, SL-RECORD-FEEDBACK-TREE-MISSING, SL-RECORD-MERGE-BASE, SL-RECORD-MERGE-BASE-TREE: an unnamed default branch, a branch with no ref or with two, a Pi ref without a package version or name, a commit, a tree, a Beads export (absent, or without its blob) or a feedback snapshot (absent, or without its tree), and a merge-base without a commit or a tree are refused (R-REFS, EAT-R201 AC1).
 *  - SL-RECORD-MW-EMPTY, SL-RECORD-MW-COMMIT, SL-RECORD-MW-TREE, SL-RECORD-MW-PACKAGES, SL-RECORD-MW-PACKAGE-NAME, SL-RECORD-MW-PACKAGE-VERSION: no MW ref, an MW ref without a commit, a tree or packages, and an MW package without a name or a version are refused (R-REFS, EAT-R201 AC1).
 *  - SL-RECORD-DEFAULT-IS-MACHINE, SL-RECORD-DEFAULT-NAME, SL-RECORD-DEFAULT-COMMIT, SL-RECORD-DEFAULT-NO-REF, SL-RECORD-DEFAULT-MACHINE-MERGED, SL-RECORD-DEFAULT-NO-MACHINE, SL-RECORD-DEFAULT-MASTER-MACHINE-ONLY: certifying the machine tip while the machine branch holds a commit the default lacks, a certified default named for another branch, a certified commit other than the default ref's and a certified default with no default ref are refused; certifying the machine tip while the machine branch holds no commit the default lacks is not read as an unmerged tip, nor is a certified default without a commit when no machine ref exists, nor the default ref's own commit while the machine branch holds commits the default lacks (R-DEFAULT, EAT-R201 AC2).
 *  - SL-RECORD-BEADS-STORE, SL-RECORD-BEADS-NO-EPICS, SL-RECORD-BEADS-EPIC-STATUS, SL-RECORD-BEADS-EPIC-CHILDREN: a Beads snapshot without a store, without epics, or with an epic lacking a status or children is refused (R-BEADS, EAT-R201 AC1).
 *  - SL-RECORD-MERGED-FLAGS, SL-RECORD-MERGED-FLAGS-MACHINE, SL-RECORD-MACHINE-FLAGS, SL-RECORD-MACHINE-FLAGS-MACHINE, SL-RECORD-MACHINE-FLAGS-AGREE, SL-RECORD-PROPOSED-FLAGS, SL-RECORD-PROPOSED-FLAGS-DEFAULT, SL-RECORD-HISTORICAL-ROLE, SL-RECORD-HISTORICAL-WRONG-ROLE, SL-RECORD-HISTORICAL-ROLE-UNDEFINED, SL-RECORD-UNKNOWN-CLASS, SL-RECORD-TWICE, SL-RECORD-CLASSES: each flag of each class is read: a merged change off the default or off the machine branch, a machine-only change on the default or off the machine branch, and a proposed change on the machine or off the default branch are refused, while a machine-only change off the default and on the machine branch is not; a historical change without a role (even where historicalPins holds a role-less pin of its commit) or with a role historicalPins does not name for it, an unknown class and a change listed twice are refused; and the committed record marks 23 merged, 5 proposed and 4 historical changes and no machine-only change, its machine branch holding no commit the default lacks (R-CHANGES, EAT-R201 AC2).
 *  - SL-STALE-NONE, SL-STALE-PI-COMMIT, SL-STALE-PI-PACKAGE, SL-STALE-MW, SL-STALE-NO-RECORD, SL-STALE-PI-UNMEASURED, SL-STALE-PI-PACKAGE-NAME, SL-STALE-MW-PACKAGE-REMOVED: staleRepin names nothing for the recorded measurement, and names a moved Pi or MW commit, a changed Pi package version or name, a changed, removed or added MW package, an unmeasured Pi or MW ref, and a record that is not an object (a string or null) or lacks its pi or its mw member (EAT-R201 AC3).
 *  - SL-RESIDUAL-HEADING-ANCHORS: the quiet row of the NAMED RESIDUAL R-HEADING-ANCHOR below: exactly 11 markdown anchors are substrings of their own section heading (evidence[0] of EAT-R015, EAT-R016, EAT-R022, EAT-R027, EAT-R161 and EAT-R162, evidence[1] of EAT-R160, the partial source of EAT-R077, EAT-R078, EAT-R079 and EAT-R164), and the section reader's text of each starts with that heading.
 *
 * NAMED RESIDUALS (a named family with its pinned quiet row, rule 19(d); a residual is a known escape, not a pass):
 *  R-HEADING-ANCHOR: the section reader puts a section's heading first in its rendered text, so for an anchor that is a
 *    substring of its own section heading L-EVIDENCE and L-PARTIAL read only that the section binds: deleting the anchor's
 *    words from the section's body keeps the ledger quiet. The 11 such anchors are pinned by SL-RESIDUAL-HEADING-ANCHORS,
 *    which reds when that set changes or when the reader's text stops starting with the heading.
 *  R-HX-CONTEXT: the census leg's residual (test/workbench-mechanical-status-ledger.census.ts, quiet row TF-RESIDUAL).
 *
 * NOT CLAIMED by this file: that a row's class is the true state of the program (the class is this ledger's reading of the
 * receipts, tests and Beads records the row cites); that a tested form is registered, run, passed or asserting (no case of
 * this file reads a case; the census leg does); what an anchor proves; a markdown anchor's visibility outside the rendered
 * text of its named section; the meaning of a raw-text anchor in a file that is not markdown or in a Beads record beyond its
 * bytes; a run of staleRepin against the live refs (the record was re-pinned at this cut's merged base by hand; the receipt
 * names the measurement); a re-run of any cited test or mutant; the titles against the master documents; a containing verb
 * outside BYTES_VERBS; Beads state outside the export files; Beads export lines that are not objects or carry no string id,
 * and a parent dependency whose depends_on_id is not a string (the committed export holds neither); whether the module runs
 * its CLI when it is imported rather than run; the joint P00/M00 rulings of EAT-R203..EAT-R209, which need the Mechanical
 * side.
 */
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, symlinkSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  AC2_ROWS,
  BYTES_VERBS,
  LEDGER_PATH,
  ledgerFindings,
  PLAN_GROUPS,
  RECORD_PATH,
  readBeadExport,
  repinFindings,
  sectionReader,
  staleRepin,
  treeReader,
} from "../qa/workbench/mechanical-status-ledger.mjs";
import { docsSection } from "./helpers/census.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

/** Every row reads files or parses JSON; each declares its own time budget (EAT-R168's form). */
const BUDGET = 30_000;
const REPO = join(import.meta.dirname, "..");
installScratchLeakGuard();

interface Form {
  file: string;
  title: string;
  suite: string[];
}
interface Section {
  heading: string;
  depth: number;
  parents: string[];
}
interface Anchor {
  path?: string;
  bead?: string;
  section?: Section;
  anchor: string;
}
interface Row {
  id: string;
  group: string;
  bead: string;
  title: string;
  class: string;
  pin: { pi: string; mw: string };
  testedForms: Form[];
  evidence: Anchor[];
  partialBecause?: { text: string; source: Anchor };
  blockedBy?: { kind: string; detail: string };
  fixedForms?: string[];
  pending?: string;
  successors: string[];
}
interface Control {
  id: string;
  class: string;
  testedForms: Form[];
  fixedForms: string[];
  pending: string;
}
interface Ledger {
  schema: string;
  pins: { pi: { commit: string }; mw: { commit: string } };
  groups: Array<{ label: string; bead: string; tag: string }>;
  summary: { rows: number; byClass: Record<string, number>; planGroups: number; planGroupsComplete: number; planGroupsCompleteLabels: string[] };
  controls: Control[];
  rows: Row[];
}
interface PiRef {
  name: string;
  commit: string;
  tree: string;
  package: { name: string; version: string };
  beadsExport?: { blob: string };
  feedback?: { tree: string };
}
interface MwRef {
  name: string;
  commit: string;
  tree?: string;
  packages: Array<{ name: string; version: string }>;
}
interface Change {
  commit: string;
  inDefault: boolean;
  inMachine: boolean;
  class: string;
  role?: string;
}
interface RepinRecord {
  schema: string;
  pi: {
    defaultBranch: string;
    machineBranch: string;
    refs: PiRef[];
    mergeBase: { commit?: string; tree?: string };
    divergence: { defaultOnlyCommits: number; machineOnlyCommits: number };
    certifiedDefault: { name: string; commit: string };
  };
  mw: { refs: MwRef[] };
  beads: { store: string; epics: Record<string, { status: string; children?: Record<string, string> }> };
  historicalPins: Array<{ side: string; commit: string; role?: string }>;
  implicatedChanges: Change[];
}

const readJson = (path: string): unknown => JSON.parse(readFileSync(join(REPO, path), "utf8"));
const ledger = (): Ledger => readJson(LEDGER_PATH) as Ledger;
const record = (): RepinRecord => readJson(RECORD_PATH) as RepinRecord;
const BEADS = readBeadExport(REPO);
const READ = treeReader(REPO);
const SECTIONS = sectionReader(docsSection);
const judgeWith = (value: unknown, readFile: (path: string) => string | null): string[] => ledgerFindings(value, { beads: BEADS, readFile, readSection: SECTIONS });
const judge = (value: unknown): string[] => judgeWith(value, READ);
const row = (value: Ledger, id: string): Row => {
  const found = value.rows.find(item => item.id === id);
  if (found === undefined) throw new Error(`no row ${id}`);
  return found;
};
const planted = (mutate: (value: Ledger) => void): string[] => {
  const value = ledger();
  mutate(value);
  return judge(value);
};
const plantedRecord = (mutate: (value: RepinRecord) => void): string[] => {
  const value = record();
  mutate(value);
  return repinFindings(value);
};
/** A section of a committed row's item, as the ledger holds it. */
const sectionOf = (item: Anchor | undefined): Section => {
  if (item?.section === undefined) throw new Error("the item names no section");
  return item.section;
};
const sha8 = (text: string): string => createHash("sha256").update(text).digest("hex").slice(0, 8);
const LETTER: Readonly<Record<string, string>> = { "already-implemented/tested": "T", "partial/inert": "P", blocked: "B" };
const shapeOf = (item: Row): string =>
  [
    item.id,
    item.group,
    LETTER[item.class],
    item.testedForms.length,
    item.evidence.length,
    sha8(item.title),
    sha8(JSON.stringify(item.testedForms)),
    sha8(JSON.stringify([item.evidence, item.partialBecause?.source ?? null])),
  ].join(":");

/** SL-AC2-LISTS: EAT-R202 AC2's rows "EAT-R001..R003, R012..R014", spelled out here so the judge's own list cannot shrink them. */
const AC2_ROW_IDS = ["EAT-R001", "EAT-R002", "EAT-R003", "EAT-R012", "EAT-R013", "EAT-R014"];
/** SL-AC2-LISTS: the containing verbs the bytes rule reads, pinned here so the judge's own list cannot shrink them. */
const VERBS = ["contain", "contains", "embed", "embeds", "carry", "carries", "hold", "holds", "include", "includes", "store", "stores", "pack", "packs", "wrap", "wraps"];
/** SL-R210: the five PF cases of test/worktree.test.ts that plant EAT-R210's failures, by registered title, and their suite. */
const PF_SUITE = ["cleanupWorktree — preservation failure keeps the edited bytes"];
const PF_TITLES = [
  "PF-R002-status: a failed step is not answered with the clean result",
  "PF-R002-add: a failed step is not answered with the clean result",
  "PF-R001-COMMIT: keeps the worktree and its exact bytes when the preservation commit fails",
  "PF-REVPARSE: a failed `rev-parse HEAD` after the agent committed its own work is answered with the failed variant and keeps that commit",
  "PF-R001-BRANCH: keeps the worktree and its committed bytes when every branch name is refused",
];

/** SL-HEADER: this file, its PINNED READER SET lines, and the digests those lines hold at this cut. */
const SOURCE = readFileSync(join(REPO, "test/workbench-mechanical-status-ledger.test.ts"), "utf8");
const HEADER_LINES = SOURCE.slice(0, SOURCE.indexOf("*/"))
  .split("\n")
  .filter(line => line.startsWith(" *  - SL-"))
  .map(line => line.slice(" *  - ".length));
const HEADER_DIGESTS = [
  "738fe4e0", "93c73990", "800b7f64", "daaf84d2", "992f9cbe", "69345ad2", "73ba3399", "552e681d",
  "e0b69ace", "2a36f154", "84bc4113", "e50a2f3b", "5a688fd0", "4a7ec06e", "02af6e93", "33aa9162",
  "d19adcf9", "65c72be9", "fae9fa2b", "5a0aee33", "2623bfcf", "f1469032", "c5e33b1b", "51822a1e",
  "1585c51a", "301346e5", "9762b539", "dad30887", "a517c1d8", "ee5e720f", "108c6790", "0ca71a45",
];

/** SL-SHAPE: the frozen shape of the 200 rows at this cut (rule 16), derived from the ledger as committed. */
const SHAPE = [
  "EAT-R001:B-preserve:T:2:1:c5ee9f32:fd48ef29:2dbcf7f6", "EAT-R002:B-preserve:T:4:1:03faeae0:b5b0531b:c1409488",
  "EAT-R003:B-preserve:T:10:1:3e0c4491:1b8e5577:12f4c999", "EAT-R004:B-docs:P:0:1:d2f34ffa:4f53cda1:ba3780de",
  "EAT-R005:B-contract-choice:B:0:1:972957b6:4f53cda1:6609343a", "EAT-R006:B-contract-choice:B:0:1:82d670e5:4f53cda1:7605873e",
  "EAT-R007:B-descriptor:P:0:1:f51563b6:4f53cda1:7f716c3a", "EAT-R008:B-descriptor:P:0:1:87470cf3:4f53cda1:a39b1847",
  "EAT-R009:B-descriptor:P:0:1:87c0ade0:4f53cda1:0c3980d6", "EAT-R010:B-descriptor:P:0:1:21c65a12:4f53cda1:9edd16e0",
  "EAT-R011:B-descriptor:P:0:1:88f91f39:4f53cda1:23a44dec", "EAT-R012:B-detached-grants:T:6:1:536fc018:f3af0b6f:9ed0e016",
  "EAT-R013:B-detached-grants:T:4:1:e44ba1f9:28ad87e3:5f482bee", "EAT-R014:B-detached-grants:T:4:1:1bbced83:2a2bcee7:fa620bed",
  "EAT-R015:B-cancel-repro:T:2:1:66cec65a:04a5a716:70fe0854", "EAT-R016:B-cancel-repro:T:2:1:a8bf3a36:f43befaf:70fe0854",
  "EAT-R017:B-replay:T:1:1:64a9982c:ac055758:ab18700b", "EAT-R018:B-replay:T:1:1:325b6058:78bb703e:897b7bd4",
  "EAT-R019:B-replay:T:1:1:4244a113:82b587b8:975d1840", "EAT-R020:B-replay:T:8:1:7e43d3e7:b96a08bf:974e0d06",
  "EAT-R021:B-replay:T:4:1:7c6763dd:70e760fc:d00d4b42", "EAT-R022:B-source:P:0:2:710370bc:4f53cda1:01e00cc4",
  "EAT-R023:B-source:P:0:2:38b4b589:4f53cda1:e439ec9d", "EAT-R024:B-source:P:0:2:f5197d9e:4f53cda1:be0dd4e6",
  "EAT-R025:B-source:P:0:2:4cfc79c8:4f53cda1:3cc6f2ec", "EAT-R026:B-source:P:0:2:357d1b41:4f53cda1:0516e576",
  "EAT-R027:B-source:P:0:2:190f8784:4f53cda1:e4e420f2", "EAT-R028:B-authority:P:0:1:43b44e78:4f53cda1:772f5264",
  "EAT-R029:B-authority:P:0:1:f629bad1:4f53cda1:49256d6d", "EAT-R030:B-authority:P:0:1:5e52d4b0:4f53cda1:680caac9",
  "EAT-R031:B-authority:P:0:1:41feba3c:4f53cda1:4f141e74", "EAT-R032:B-dispatch:B:0:1:144267a3:4f53cda1:b7e87f91",
  "EAT-R033:B-dispatch:B:0:1:940e502b:4f53cda1:41bb2aad", "EAT-R034:B-dispatch:B:0:1:d30e5a3d:4f53cda1:58b1db69",
  "EAT-R035:B-dispatch:B:0:1:dae2da21:4f53cda1:422aed73", "EAT-R036:B-outcomes:B:0:1:f86198d7:4f53cda1:ebe44bb1",
  "EAT-R037:B-outcomes:B:0:1:8421d297:4f53cda1:2bf783ec", "EAT-R038:B-outcomes:B:0:1:f7dea863:4f53cda1:3b5e0584",
  "EAT-R039:B-outcomes:B:0:1:40e3e288:4f53cda1:6b4f633c", "EAT-R040:B-outcomes:B:0:1:41adcd3c:4f53cda1:aee7e507",
  "EAT-R041:B-effects:B:0:1:d38a8ab2:4f53cda1:99b181f3", "EAT-R042:B-effects:B:0:1:318cfc36:4f53cda1:9499905f",
  "EAT-R043:B-effects:B:0:1:664dad70:4f53cda1:753dce6f", "EAT-R044:B-effects:B:0:1:fe93e1af:4f53cda1:b0b94f5d",
  "EAT-R045:B-controls:B:0:1:2d08d470:4f53cda1:0de71980", "EAT-R046:B-controls:B:0:1:7e54e917:4f53cda1:f0b911ed",
  "EAT-R047:B-controls:B:0:1:a2888649:4f53cda1:7e696589", "EAT-R048:B-controls:B:0:1:c89b14ef:4f53cda1:a7c18bf4",
  "EAT-R049:B-controls:B:0:1:85cc2c45:4f53cda1:2a04932b", "EAT-R050:B-controls:B:0:1:be7dc0e6:4f53cda1:55059af9",
  "EAT-R051:B-observe:B:0:1:7b355df4:4f53cda1:9db7924d", "EAT-R052:B-observe:B:0:1:fa0f660c:4f53cda1:8e8a5eee",
  "EAT-R053:B-git-census:B:0:1:28640ae1:4f53cda1:aafe1d6c", "EAT-R054:B-git-census:B:0:1:9ec5497a:4f53cda1:1a633328",
  "EAT-R055:B-git-census:B:0:1:b8adc283:4f53cda1:d9c4f436", "EAT-R056:B-git-census:B:0:1:2201b951:4f53cda1:2e0d84c7",
  "EAT-R057:B-hx-evidence:T:3:1:69d3a872:c0a65b71:483fd34f", "EAT-R058:B-hx-admit:B:0:1:d7f66936:4f53cda1:7ed57473",
  "EAT-R059:B-hx-admit:B:0:1:7c587ed3:4f53cda1:46ed013c", "EAT-R060:B-rf-admit:B:0:1:e7635cf8:4f53cda1:22eab537",
  "EAT-R061:B-rf-admit:B:0:1:7362931b:4f53cda1:4d99ce63", "EAT-R062:B-rf-admit:B:0:1:914fbdd4:4f53cda1:de6b906c",
  "EAT-R063:B-rf-admit:B:0:1:8c807743:4f53cda1:9e82eea6", "EAT-R064:B-detached-function:B:0:1:b3f4364f:4f53cda1:432536e3",
  "EAT-R065:B-detached-function:B:0:1:2b803f99:4f53cda1:3936621a", "EAT-R066:B-detached-function:B:0:1:e021e71f:4f53cda1:1bc2a521",
  "EAT-R067:B-detached-function:B:0:1:09721009:4f53cda1:3dcb20b5", "EAT-R068:B-furnace-function:B:0:1:b3dc4b16:4f53cda1:66e7a434",
  "EAT-R069:B-furnace-function:B:0:1:5222acc6:4f53cda1:face6d44", "EAT-R070:B-furnace-function:B:0:1:b366cd21:4f53cda1:261ea71d",
  "EAT-R071:B-coordination:P:0:1:5d0c6c6c:4f53cda1:8333aa56", "EAT-R072:B-coordination:P:0:1:f90f4579:4f53cda1:902e0984",
  "EAT-R073:B-limits:T:8:1:d6fe76bb:4e228009:f78ddb69", "EAT-R074:B-limits:P:0:2:3d68157a:4f53cda1:b0716491",
  "EAT-R075:B-limits:P:0:2:89051ae3:4f53cda1:111bcc5d", "EAT-R076:B-limits:P:0:2:855a4ecd:4f53cda1:5f99a2f9",
  "EAT-R077:B-telemetry:P:0:2:ce995cfc:4f53cda1:78afe461", "EAT-R078:B-telemetry:P:0:2:53c2f23d:4f53cda1:23865cf3",
  "EAT-R079:B-telemetry:P:0:2:0823baa4:4f53cda1:8d8fa0ad", "EAT-R080:B-unknowns:P:0:2:b17e161b:4f53cda1:249bfe86",
  "EAT-R081:B-unknowns:P:0:2:4d19151e:4f53cda1:8d094888", "EAT-R082:B-release:T:29:1:86111f5b:e4bab31b:986237af",
  "EAT-R083:B-release:T:22:1:43669bc3:5a766247:001711ab", "EAT-R084:B-release:T:27:1:9a3d1225:659e54f5:f4904dcd",
  "EAT-R085:B-release:T:21:1:e242f076:b620df07:2b05c610", "EAT-R086:B-release:T:30:1:2d6edc77:b3ab34f6:670e2c35",
  "EAT-R087:B-release:T:10:1:90f9c624:3e9ba432:8ddd5acc", "EAT-R088:mw-tracks:B:0:1:0856380e:4f53cda1:e17460fc",
  "EAT-R089:mw-tracks:B:0:1:baeb75ef:4f53cda1:b27e7f02", "EAT-R090:mw-tracks:B:0:1:851d2b93:4f53cda1:f8c8504e",
  "EAT-R091:mw-tracks:B:0:1:32432c73:4f53cda1:191dd092", "EAT-R092:mw-tracks:B:0:1:85d3ae13:4f53cda1:ee91b20c",
  "EAT-R093:mw-tracks:B:0:1:6af8521f:4f53cda1:137b0f40", "EAT-R094:B-docs:T:1:1:0fc7813c:be6ed50e:24897246",
  "EAT-R095:B-docs:T:1:1:d4c156f4:e999e7f1:0b8632a8", "EAT-R096:B-docs:T:1:1:00532bc4:c390c051:d55a656d",
  "EAT-R097:B-docs:T:1:1:f0a0278e:d9ea2aab:68d5ce69", "EAT-R098:B-docs:T:1:1:2240cb32:db9d25e7:372a5739",
  "EAT-R099:B-docs:T:1:1:eeb6d5d0:67461067:1da7806e", "EAT-R100:B-docs:T:1:1:06020255:29e3c14e:3a936771",
  "EAT-R101:B-docs:T:1:1:1fd9a28a:5b922ed9:43650b4c", "EAT-R102:B-docs:T:1:1:fcb34180:1cf1ddb7:29f3cdda",
  "EAT-R103:B-docs:T:1:1:e8eed32d:6ae86182:0de01bd3", "EAT-R104:B-docs:T:1:1:13c3c0bb:67cbe447:8906eae8",
  "EAT-R105:B-docs:T:1:1:4b27fe6e:f325d47f:de1710e0", "EAT-R106:B-docs:T:1:1:5217d989:d06dc588:936f20d9",
  "EAT-R107:B-docs:T:1:1:3a97874e:9c1704fd:06966503", "EAT-R108:B-docs:T:1:1:e60995ec:44b12570:d1a292bc",
  "EAT-R109:B-docs:T:1:1:5e0fe0e7:3a7ee3c5:eb36fcfd", "EAT-R110:B-docs:T:1:1:9fb24102:aecc1941:95ed9092",
  "EAT-R111:B-docs:T:1:1:f6219173:087367f6:29b44643", "EAT-R112:B-docs:T:1:1:7f8929db:59b6c528:b1bcee35",
  "EAT-R113:B-docs:T:1:1:851d41c1:9311615f:ead1072d", "EAT-R114:B-docs:T:1:1:92463629:ab6bb478:1d7597d4",
  "EAT-R115:B-docs:T:1:1:402907a8:be493919:0880b329", "EAT-R116:B-docs:T:1:1:bf7cc6a8:ca00fb6a:4f26d1b0",
  "EAT-R117:B-docs:T:1:1:76daf2c6:f059bc54:9324fe79", "EAT-R118:B-docs:T:1:1:a871cefe:58363056:35611963",
  "EAT-R119:B-docs:T:1:1:bfe8d6ec:14ffe5c5:57544142", "EAT-R120:B-docs:T:1:1:bbf77457:6e80b3f2:43d9b415",
  "EAT-R121:B-docs:T:1:1:f7bd66f1:56a38a81:77ddd4b7", "EAT-R122:B-docs:T:1:1:d21afa1d:66e9d6d5:96d78dbe",
  "EAT-R123:B-docs:T:1:1:a4384fc4:b01998ad:019cb9ee", "EAT-R124:B-docs:T:1:1:2e04b63f:05676cd9:8d8a7f30",
  "EAT-R125:B-docs:T:1:1:51077e06:cad8f4ef:53d95f46", "EAT-R126:B-docs:T:1:1:e83f5706:24cdb7c5:2e5dfb7d",
  "EAT-R127:B-docs:T:1:1:b90d00e8:d5540da5:6da3a75e", "EAT-R128:B-docs:T:1:1:74c8b376:09af903b:55704613",
  "EAT-R129:B-docs:T:1:1:ae577872:ba22c6ff:f546597c", "EAT-R130:B-docs:T:1:1:291a1a84:5f288113:ec8cbfa9",
  "EAT-R131:B-docs:T:1:1:be1f8efb:d11ee54d:1df8a5f0", "EAT-R132:B-docs:T:1:1:04b568d0:1548f8d7:e7802e88",
  "EAT-R133:B-docs:T:1:1:7d4fb80c:66265fbb:0c474d6a", "EAT-R134:B-docs:T:1:1:66abacb6:7fb51ce0:879e496c",
  "EAT-R135:B-docs:T:1:1:85f3ece9:9dc73ac8:ebe2a43b", "EAT-R136:B-docs:T:1:1:979c8c8f:c0a2febe:4f4377db",
  "EAT-R137:B-docs:T:1:1:499e8fde:58a73ef1:0b32d662", "EAT-R138:B-docs:T:1:1:87c79234:d85d8daa:45f42f32",
  "EAT-R139:B-docs:T:1:1:ed1a515a:8a5e8174:df0b10b7", "EAT-R140:B-docs:T:1:1:612f9079:6c7c42b0:8a7353f3",
  "EAT-R141:B-docs:T:1:1:57593c88:ebe384d5:f977514e", "EAT-R142:B-docs:T:1:1:47f532c4:46f6b337:bbf015a0",
  "EAT-R143:B-docs:T:1:1:87725b7d:42f0c7d4:1f47876b", "EAT-R144:B-preserve:T:5:1:dbe78b8a:f3aee250:52609ace",
  "EAT-R145:B-preserve:P:0:2:4dfbcfbb:4f53cda1:e57ea632", "EAT-R146:B-preserve:T:6:1:18edbb31:0fb5ef74:0c4f56d1",
  "EAT-R147:B-docs:B:0:1:670089cc:4f53cda1:bd48ba42", "EAT-R148:B-contract-choice:B:0:1:61ae2437:4f53cda1:d99f69dc",
  "EAT-R149:B-contract-choice:B:0:1:598474e2:4f53cda1:5c3f5966", "EAT-R150:B-contract-choice:B:0:1:9d277c7e:4f53cda1:7d325e8e",
  "EAT-R151:B-contract-choice:B:0:1:ba457cba:4f53cda1:825a568e", "EAT-R152:B-descriptor:B:0:1:59b9b12f:4f53cda1:33f4f2aa",
  "EAT-R153:B-descriptor:B:0:1:65f22712:4f53cda1:d60890b2", "EAT-R154:B-authority:P:0:1:c3008f13:4f53cda1:298164c7",
  "EAT-R155:B-dispatch:B:0:1:0ea0f52a:4f53cda1:d86074e7", "EAT-R156:B-outcomes:B:0:1:48096549:4f53cda1:50f619ce",
  "EAT-R157:B-outcomes:B:0:1:62038c7d:4f53cda1:625126d7", "EAT-R158:B-outcomes:B:0:1:463ab3d6:4f53cda1:94c552c8",
  "EAT-R159:B-git-census:B:0:1:d39da113:4f53cda1:011e6a2c", "EAT-R160:B-cancel-repro:B:0:2:466a482e:4f53cda1:ff1c4bac",
  "EAT-R161:B-replay:T:10:1:dc14af4e:72bb6365:553dcc65", "EAT-R162:B-replay:T:21:1:ab8f29ba:c98c70fa:a51e7683",
  "EAT-R163:B-hx-admit:B:0:1:311be2bc:4f53cda1:73658aa5", "EAT-R164:B-telemetry:P:0:2:20898013:4f53cda1:ea85560c",
  "EAT-R165:B-release:B:0:1:1e51d1e9:4f53cda1:87a6d6a4", "EAT-R166:B-release:B:0:1:d989a51b:4f53cda1:87a6d6a4",
  "EAT-R167:B-release:P:0:1:9c586727:4f53cda1:c3f4ac0c", "EAT-R168:B-release:P:0:1:edda22c7:4f53cda1:5d623ad8",
  "EAT-R169:B-release:B:0:1:0ef11c4c:4f53cda1:87a6d6a4", "EAT-R170:B-release:B:0:1:417814c6:4f53cda1:87a6d6a4",
  "EAT-R171:B-release:B:0:1:68e6e99e:4f53cda1:87a6d6a4", "EAT-R172:master-recon:B:0:1:2f55907c:4f53cda1:43012608",
  "EAT-R173:mw-tracks:B:0:1:97289c72:4f53cda1:2f1917e3", "EAT-R174:mw-tracks:B:0:1:8f7559aa:4f53cda1:81e4ca38",
  "EAT-R175:mw-tracks:B:0:1:90cab45c:4f53cda1:5bd779b6", "EAT-R176:mw-tracks:B:0:1:2d1487c5:4f53cda1:68af4792",
  "EAT-R177:mw-tracks:B:0:1:a97dc785:4f53cda1:9936bae0", "EAT-R178:B-docs:B:0:1:36c8eb6e:4f53cda1:bd48ba42",
  "EAT-R179:B-docs:B:0:1:acfa4405:4f53cda1:bd48ba42", "EAT-R180:B-docs:B:0:1:0432af3c:4f53cda1:bd48ba42",
  "EAT-R181:B-docs:B:0:1:e629bb59:4f53cda1:bd48ba42", "EAT-R182:B-docs:B:0:1:89a793a6:4f53cda1:bd48ba42",
  "EAT-R183:B-docs:B:0:1:23aa2ca6:4f53cda1:bd48ba42", "EAT-R184:B-docs:B:0:1:df6b0b5d:4f53cda1:bd48ba42",
  "EAT-R185:B-docs:B:0:1:407e2879:4f53cda1:bd48ba42", "EAT-R186:B-docs:B:0:1:d9fff258:4f53cda1:bd48ba42",
  "EAT-R187:B-docs:B:0:1:1584cb0e:4f53cda1:bd48ba42", "EAT-R188:B-docs:B:0:1:18d19351:4f53cda1:bd48ba42",
  "EAT-R189:B-docs:B:0:1:bbb59487:4f53cda1:bd48ba42", "EAT-R190:B-docs:B:0:1:d8cefc89:4f53cda1:bd48ba42",
  "EAT-R191:B-docs:B:0:1:d984f9b0:4f53cda1:bd48ba42", "EAT-R192:B-docs:B:0:1:989d71df:4f53cda1:bd48ba42",
  "EAT-R193:B-docs:B:0:1:8701c468:4f53cda1:bd48ba42", "EAT-R194:B-docs:B:0:1:6da75aa3:4f53cda1:bd48ba42",
  "EAT-R195:B-docs:B:0:1:615adc1b:4f53cda1:bd48ba42", "EAT-R196:B-docs:B:0:1:ac893618:4f53cda1:bd48ba42",
  "EAT-R197:B-docs:B:0:1:c3d93d31:4f53cda1:bd48ba42", "EAT-R198:B-docs:B:0:1:da9d790d:4f53cda1:bd48ba42",
  "EAT-R199:B-docs:B:0:1:7eb58a08:4f53cda1:bd48ba42", "EAT-R200:B-docs:B:0:1:1989c335:4f53cda1:bd48ba42",
];

describe("wb-mit9: the committed ledger and re-pin record (EAT-R201, EAT-R202)", { timeout: BUDGET }, () => {
  it("SL-LIVE-LEDGER: the committed ledger gives no finding against the tree, the Beads export and the census docs reader", () => {
    expect(judge(ledger())).toEqual([]);
  });

  it("SL-LIVE-RECORD: the committed re-pin record gives no finding", () => {
    expect(repinFindings(record())).toEqual([]);
  });

  it("SL-SHAPE: the rows hold the frozen shape of this cut", () => {
    expect(SHAPE).toHaveLength(200);
    expect(ledger().rows.map(shapeOf)).toEqual(SHAPE);
  });

  it("SL-COUNTS: 200 rows, 75 tested, 31 partial/inert, 94 blocked, and 3 of the 25 plan groups complete", () => {
    const value = ledger();
    expect(value.rows).toHaveLength(200);
    expect(value.summary.byClass).toEqual({ "already-implemented/tested": 75, "partial/inert": 31, blocked: 94 });
    expect([value.summary.planGroups, value.summary.planGroupsComplete]).toEqual([25, 3]);
    expect(value.summary.planGroupsCompleteLabels).toEqual(["B-detached-grants", "B-hx-evidence", "B-replay"]);
    expect(PLAN_GROUPS).toHaveLength(25);
  });

  it("SL-R210: the tested forms of EAT-R001, EAT-R002 and EAT-R144 name the five PF cases that plant EAT-R210's failures, by registered title and suite", () => {
    const value = ledger();
    const forms = ["EAT-R001", "EAT-R002", "EAT-R144"].flatMap(id => row(value, id).testedForms);
    for (const title of PF_TITLES) {
      expect(forms).toContainEqual({ file: "test/worktree.test.ts", suite: PF_SUITE, title });
    }
  });

  it("SL-HEADER: the PINNED READER SET lines hold their recorded digests", () => {
    expect(HEADER_LINES.map(sha8)).toEqual(HEADER_DIGESTS);
  });

  it("SL-CLI: the CLI judges the committed files, exit 0 with two empty lists", () => {
    const run = spawnSync(process.execPath, [join(REPO, "qa/workbench/mechanical-status-ledger.mjs")], { encoding: "utf8" });
    expect([run.status, run.stdout.trim()]).toEqual([0, '{"ledger":[],"record":[]}']);
  });
});

type Expected = string | ((base: Ledger) => string);
const resolved = (expected: Expected): string => (typeof expected === "string" ? expected : expected(ledger()));

describe("wb-mit9: planted ledgers each refused by their rule (EAT-R202)", { timeout: BUDGET }, () => {
  const R057_SECTION = (base: Ledger): string => sectionOf(row(base, "EAT-R057").evidence[0]).heading;
  const cases: Array<[string, (value: Ledger) => void, Expected]> = [
    ["SL-SCHEMA", value => {
      value.schema = "workbench.mechanical-status-ledger/v2";
    }, "L-SCHEMA: schema is not workbench.mechanical-status-ledger/v1"],
    ["SL-SCHEMA-ROWS", value => {
      (value as unknown as { rows: unknown }).rows = {};
    }, "L-SCHEMA: rows is not an array"],
    ["SL-SCHEMA-ROW", value => {
      (value.rows as unknown[]).push("EAT-R201");
    }, "L-SCHEMA: a row is not an object"],
    ["SL-SCHEMA-PI-PIN", value => {
      value.pins.pi.commit = value.pins.pi.commit.slice(0, 12);
    }, "L-SCHEMA: pins.pi.commit is not a 40-hex commit"],
    ["SL-SCHEMA-MW-PIN", value => {
      value.pins.mw.commit = value.pins.mw.commit.slice(0, 12);
    }, "L-SCHEMA: pins.mw.commit is not a 40-hex commit"],
    ["SL-SCHEMA-PIN-NOT-STRING", value => {
      (value.pins.pi as { commit: unknown }).commit = [value.pins.pi.commit];
    }, "L-SCHEMA: pins.pi.commit is not a 40-hex commit"],
    ["SL-SCHEMA-MW-PIN-NOT-STRING", value => {
      (value.pins.mw as { commit: unknown }).commit = [value.pins.mw.commit];
    }, "L-SCHEMA: pins.mw.commit is not a 40-hex commit"],
    ["SL-IDS-MISSING", value => value.rows.splice(99, 1), "L-IDS: EAT-R100 has no row"],
    ["SL-IDS-DUPLICATE", value => value.rows.splice(10, 0, structuredClone(row(value, "EAT-R010"))), "L-IDS: EAT-R010 has more than one row"],
    ["SL-IDS-ORDER", value => value.rows.reverse(), "L-IDS: the rows are not in EAT-R001..EAT-R200 order"],
    ["SL-IDS-FOREIGN", value => value.rows.push({ ...structuredClone(row(value, "EAT-R200")), id: "EAT-R201" }), "L-IDS: EAT-R201 is not EAT-R001..EAT-R200"],
    ["SL-EXPORT", value => value.rows.splice(99, 1), "L-EXPORT: EAT-R100 is named by a wb-1a3t child in the Beads export but has no row"],
    ["SL-CLASS", value => {
      row(value, "EAT-R057").class = "done";
    }, "L-CLASS: EAT-R057 class done is not one of the three"],
    ["SL-PIN", value => {
      row(value, "EAT-R057").pin.pi = "0".repeat(40);
    }, "L-PIN: EAT-R057 pin.pi is not the ledger's Pi pin"],
    ["SL-PIN-MW", value => {
      row(value, "EAT-R057").pin.mw = "0".repeat(40);
    }, "L-PIN: EAT-R057 pin.mw is not the ledger's MW pin"],
    ["SL-PIN-NOT-SHA", value => {
      value.pins.pi.commit = "not-a-commit";
      for (const item of value.rows) item.pin.pi = "not-a-commit";
    }, "L-PIN: EAT-R057 pin.pi is not the ledger's Pi pin"],
    ["SL-PIN-MW-NOT-SHA", value => {
      value.pins.mw.commit = "not-a-commit";
      for (const item of value.rows) item.pin.mw = "not-a-commit";
    }, "L-PIN: EAT-R057 pin.mw is not the ledger's MW pin"],
    ["SL-PIN-NOT-STRING", value => {
      const shared = [value.pins.pi.commit];
      (value.pins.pi as { commit: unknown }).commit = shared;
      for (const item of value.rows) (item.pin as { pi: unknown }).pi = shared;
    }, "L-PIN: EAT-R057 pin.pi is not the ledger's Pi pin"],
    ["SL-PIN-MW-NOT-STRING", value => {
      const shared = [value.pins.mw.commit];
      (value.pins.mw as { commit: unknown }).commit = shared;
      for (const item of value.rows) (item.pin as { mw: unknown }).mw = shared;
    }, "L-PIN: EAT-R057 pin.mw is not the ledger's MW pin"],
    ["SL-BEAD-FABRICATED", value => {
      row(value, "EAT-R057").bead = "wb-zz9q";
    }, "L-BEAD: EAT-R057 names wb-zz9q, a fabricated id the Beads export does not hold"],
    ["SL-BEAD-UNNAMED", value => {
      row(value, "EAT-R057").bead = "wb-ny54";
    }, "L-BEAD: EAT-R057 is not named by the description or notes of wb-ny54"],
    ["SL-BEAD-NOT-ID", value => {
      row(value, "EAT-R057").bead = "wb_f3wd";
    }, "L-BEAD: EAT-R057 bead wb_f3wd is not a wb- id or none"],
    ["SL-BEAD-PREFIXED", value => {
      row(value, "EAT-R057").bead = "xwb-f3wd";
    }, "L-BEAD: EAT-R057 bead xwb-f3wd is not a wb- id or none"],
    ["SL-BEAD-SUFFIXED", value => {
      row(value, "EAT-R057").bead = "wb-f3wd_x";
    }, "L-BEAD: EAT-R057 bead wb-f3wd_x is not a wb- id or none"],
    ["SL-BEAD-NOT-STRING", value => {
      (row(value, "EAT-R057") as { bead: unknown }).bead = ["wb-f3wd"];
    }, "L-BEAD: EAT-R057 bead wb-f3wd is not a wb- id or none"],
    ["SL-GROUP-UNMAPPED", value => {
      row(value, "EAT-R057").group = "B-hx-probe";
    }, "L-GROUP: EAT-R057 group B-hx-probe is an unmapped label"],
    ["SL-GROUP-WRONG-BEAD", value => {
      row(value, "EAT-R001").bead = "wb-wupg";
    }, "L-GROUP: EAT-R001 bead wb-wupg is not its group's bead wb-5ik5"],
    ["SL-GROUP-TAG", value => {
      value.groups[0].tag = "[MWI-preserved]";
    }, "L-GROUP: B-preserve's tag [MWI-preserved] does not start the title of wb-5ik5"],
    ["SL-GROUP-TAG-EMPTY", value => {
      value.groups[0].tag = "";
    }, "L-GROUP: B-preserve's tag  does not start the title of wb-5ik5"],
    ["SL-GROUP-EXPORT-TAG", value => {
      value.groups[0].tag = "[MWI-pre";
    }, "L-GROUP: the ledger tag [MWI-pre is no wb-1a3t child tag in the export"],
    ["SL-GROUP-BEAD-ABSENT", value => {
      value.groups[0].bead = "wb-zz9q";
    }, "L-GROUP: B-preserve names wb-zz9q, which the Beads export does not hold"],
    ["SL-GROUP-DROPPED", value => value.groups.splice(1, 1), "L-GROUP: the BEAD-PLAN group B-docs has no ledger group"],
    ["SL-GROUP-FOREIGN-LABEL", value => {
      value.groups[0].label = "B-preserve-2";
    }, "L-GROUP: B-preserve-2 is not a BEAD-PLAN group or a delta group"],
    ["SL-TESTED-NO-FORMS", value => {
      row(value, "EAT-R057").testedForms = [];
    }, "L-TESTED: EAT-R057 is tested but names no tested form"],
    ["SL-TESTED-NOT-OBJECT", value => {
      (row(value, "EAT-R057").testedForms as unknown[])[0] = "test/workbench-hx-task-scope-probe.test.ts";
    }, "L-TESTED: EAT-R057 testedForms[0] lacks a file, a title or a suite path"],
    ["SL-TESTED-NULL", value => {
      (row(value, "EAT-R057").testedForms as unknown[])[0] = null;
    }, "L-TESTED: EAT-R057 testedForms[0] lacks a file, a title or a suite path"],
    ["SL-TESTED-NO-FILE-NAME", value => {
      row(value, "EAT-R057").testedForms[0].file = "";
    }, "L-TESTED: EAT-R057 testedForms[0] lacks a file, a title or a suite path"],
    ["SL-TESTED-NO-TITLE", value => {
      row(value, "EAT-R057").testedForms[0].title = "";
    }, "L-TESTED: EAT-R057 testedForms[0] lacks a file, a title or a suite path"],
    ["SL-TESTED-NO-SUITE", value => {
      (row(value, "EAT-R057").testedForms[0] as { suite?: string[] }).suite = undefined;
    }, "L-TESTED: EAT-R057 testedForms[0] lacks a file, a title or a suite path"],
    ["SL-TESTED-SUITE-ENTRY", value => {
      row(value, "EAT-R057").testedForms[0].suite = [""];
    }, "L-TESTED: EAT-R057 testedForms[0] lacks a file, a title or a suite path"],
    ["SL-TESTED-NO-FILE", value => {
      row(value, "EAT-R057").testedForms[0].file = "test/workbench-hx-task-scope-probes.test.ts";
    }, "L-TESTED: EAT-R057 names test/workbench-hx-task-scope-probes.test.ts, which the tree does not hold"],
    ["SL-PARTIAL-NO-REASON", value => {
      row(value, "EAT-R004").partialBecause = undefined;
    }, "L-PARTIAL: EAT-R004 is partial/inert without a reason"],
    ["SL-PARTIAL-NO-TEXT", value => {
      const because = row(value, "EAT-R004").partialBecause;
      if (because !== undefined) because.text = "";
    }, "L-PARTIAL: EAT-R004 is partial/inert without a reason"],
    ["SL-PARTIAL-NO-SOURCE", value => {
      const because = row(value, "EAT-R004").partialBecause;
      if (because !== undefined) because.source.anchor = "a journey that is part of this cut";
    }, base => `L-PARTIAL: EAT-R004 partialBecause.source anchor not found in the rendered section "${sectionOf(row(base, "EAT-R004").partialBecause?.source).heading}" of docs/workbench/receipts/wb-12x1.md: a journey that is part of this cut`],
    ["SL-BLOCKED-NO-BLOCKER", value => {
      row(value, "EAT-R178").blockedBy = undefined;
    }, "L-BLOCKED: EAT-R178 is blocked without a blocker kind and detail"],
    ["SL-BLOCKED-KIND", value => {
      const blocker = row(value, "EAT-R178").blockedBy;
      if (blocker !== undefined) blocker.kind = "later";
    }, "L-BLOCKED: EAT-R178 is blocked without a blocker kind and detail"],
    ["SL-BLOCKED-NO-DETAIL", value => {
      const blocker = row(value, "EAT-R178").blockedBy;
      if (blocker !== undefined) blocker.detail = "";
    }, "L-BLOCKED: EAT-R178 is blocked without a blocker kind and detail"],
    ["SL-EVIDENCE-NONE", value => {
      row(value, "EAT-R178").evidence = [];
    }, "L-EVIDENCE: EAT-R178 cites no evidence"],
    ["SL-EVIDENCE-NOT-OBJECT", value => {
      (row(value, "EAT-R178").evidence as unknown[])[0] = "wb-12x1";
    }, "L-EVIDENCE: EAT-R178 evidence[0] has no anchor"],
    ["SL-EVIDENCE-NULL", value => {
      (row(value, "EAT-R178").evidence as unknown[])[0] = null;
    }, "L-EVIDENCE: EAT-R178 evidence[0] has no anchor"],
    ["SL-EVIDENCE-EMPTY-ANCHOR", value => {
      row(value, "EAT-R178").evidence[0].anchor = "";
    }, "L-EVIDENCE: EAT-R178 evidence[0] has no anchor"],
    ["SL-EVIDENCE-NEITHER", value => {
      row(value, "EAT-R178").evidence[0].bead = undefined;
    }, "L-EVIDENCE: EAT-R178 evidence[0] names neither a path nor a bead"],
    ["SL-EVIDENCE-NO-FILE", value => {
      row(value, "EAT-R007").evidence[0].path = "test/workbench-mechanical-descriptors.test.ts";
    }, "L-EVIDENCE: EAT-R007 evidence[0] names test/workbench-mechanical-descriptors.test.ts, which the tree does not hold"],
    ["SL-EVIDENCE-RAW", value => {
      row(value, "EAT-R007").evidence[0].anchor = "EAT-R007 is closed live";
    }, "L-EVIDENCE: EAT-R007 evidence[0] anchor not found in test/workbench-mechanical-descriptor.test.ts: EAT-R007 is closed live"],
    ["SL-EVIDENCE-BEAD-ABSENT", value => {
      row(value, "EAT-R178").evidence[0].bead = "wb-zz9q";
    }, "L-EVIDENCE: EAT-R178 evidence[0] names wb-zz9q, which the Beads export does not hold"],
    ["SL-EVIDENCE-BEAD", value => {
      row(value, "EAT-R178").evidence[0].anchor = "EAT-R178 landed";
    }, "L-EVIDENCE: EAT-R178 evidence[0] anchor not found in wb-12x1: EAT-R178 landed"],
    ["SL-SECTION-NONE", value => {
      row(value, "EAT-R057").evidence[0].section = undefined;
    }, "L-EVIDENCE: EAT-R057 evidence[0] names the markdown file docs/workbench/receipts/wb-f3wd.md without a section (heading, depth and parent headings)"],
    ["SL-SECTION-NOT-OBJECT", value => {
      (row(value, "EAT-R057").evidence[0] as { section?: unknown }).section = "receipt";
    }, "L-EVIDENCE: EAT-R057 evidence[0] names the markdown file docs/workbench/receipts/wb-f3wd.md without a section (heading, depth and parent headings)"],
    ["SL-SECTION-HEADING", value => {
      sectionOf(row(value, "EAT-R057").evidence[0]).heading = "";
    }, "L-EVIDENCE: EAT-R057 evidence[0] names the markdown file docs/workbench/receipts/wb-f3wd.md without a section (heading, depth and parent headings)"],
    ["SL-SECTION-DEPTH-FRACTION", value => {
      sectionOf(row(value, "EAT-R057").evidence[0]).depth = 2.5;
    }, "L-EVIDENCE: EAT-R057 evidence[0] names the markdown file docs/workbench/receipts/wb-f3wd.md without a section (heading, depth and parent headings)"],
    ["SL-SECTION-DEPTH-LOW", value => {
      sectionOf(row(value, "EAT-R057").evidence[0]).depth = 0;
    }, "L-EVIDENCE: EAT-R057 evidence[0] names the markdown file docs/workbench/receipts/wb-f3wd.md without a section (heading, depth and parent headings)"],
    ["SL-SECTION-DEPTH-HIGH", value => {
      sectionOf(row(value, "EAT-R057").evidence[0]).depth = 7;
    }, "L-EVIDENCE: EAT-R057 evidence[0] names the markdown file docs/workbench/receipts/wb-f3wd.md without a section (heading, depth and parent headings)"],
    ["SL-SECTION-PARENTS", value => {
      (sectionOf(row(value, "EAT-R057").evidence[0]) as { parents: unknown }).parents = "wb-f3wd";
    }, "L-EVIDENCE: EAT-R057 evidence[0] names the markdown file docs/workbench/receipts/wb-f3wd.md without a section (heading, depth and parent headings)"],
    ["SL-SECTION-PARENT-ENTRY", value => {
      sectionOf(row(value, "EAT-R057").evidence[0]).parents = [""];
    }, "L-EVIDENCE: EAT-R057 evidence[0] names the markdown file docs/workbench/receipts/wb-f3wd.md without a section (heading, depth and parent headings)"],
    ["SL-SECTION-UNBOUND", value => {
      sectionOf(row(value, "EAT-R057").evidence[0]).heading = "2026-11-06 receipt: a heading this receipt does not hold";
    }, "L-EVIDENCE: EAT-R057 evidence[0] section of docs/workbench/receipts/wb-f3wd.md is not bound: the rendered view has no level-2 heading \"2026-11-06 receipt: a heading this receipt does not hold\""],
    ["SL-SECTION-ANCHOR", value => {
      row(value, "EAT-R057").evidence[0].anchor = "EAT-R057 is closed live";
    }, base => `L-EVIDENCE: EAT-R057 evidence[0] anchor not found in the rendered section "${R057_SECTION(base)}" of docs/workbench/receipts/wb-f3wd.md: EAT-R057 is closed live`],
    ["SL-SUMMARY-25-COMPLETE", value => {
      value.summary.planGroupsComplete = 25;
    }, "L-SUMMARY: summary.planGroupsComplete 25 is not the 3 groups whose every row is tested"],
    ["SL-SUMMARY-LABELS", value => value.summary.planGroupsCompleteLabels.push("B-preserve"), "L-SUMMARY: summary.planGroupsCompleteLabels is not the groups whose every row is tested"],
    ["SL-SUMMARY-LABELS-MISSING", value => {
      (value.summary as { planGroupsCompleteLabels?: string[] }).planGroupsCompleteLabels = undefined;
    }, "L-SUMMARY: summary.planGroupsCompleteLabels is not the groups whose every row is tested"],
    ["SL-SUMMARY-ROWS", value => {
      value.summary.rows = 199;
    }, "L-SUMMARY: summary.rows 199 is not the 200 rows"],
    ["SL-SUMMARY-CLASS", value => {
      value.summary.byClass.blocked = 93;
    }, "L-SUMMARY: summary.byClass blocked 93 is not 94"],
    ["SL-SUMMARY-PLAN-GROUPS", value => {
      value.summary.planGroups = 24;
    }, "L-SUMMARY: summary.planGroups 24 is not 25"],
    ["SL-SUMMARY-EMPTY-GROUP", value => {
      const hx = row(value, "EAT-R057");
      hx.group = "B-hx-admit";
      hx.bead = "wb-pxvv";
    }, "L-SUMMARY: summary.planGroupsComplete 3 is not the 2 groups whose every row is tested"],
    ["SL-SUCCESSORS-RANGE", value => row(value, "EAT-R001").successors.push("EAT-R150"), "L-SUCCESSORS: EAT-R001 successor EAT-R150 is not EAT-R201..EAT-R310"],
    ["SL-SUCCESSORS-HIGH", value => row(value, "EAT-R001").successors.push("EAT-R311"), "L-SUCCESSORS: EAT-R001 successor EAT-R311 is not EAT-R201..EAT-R310"],
    ["SL-SUCCESSORS-NOT-ID", value => row(value, "EAT-R001").successors.push("R250"), "L-SUCCESSORS: EAT-R001 successor R250 is not EAT-R201..EAT-R310"],
    ["SL-SUCCESSORS-PREFIXED", value => row(value, "EAT-R001").successors.push("xEAT-R250"), "L-SUCCESSORS: EAT-R001 successor xEAT-R250 is not EAT-R201..EAT-R310"],
    ["SL-SUCCESSORS-SUFFIXED", value => row(value, "EAT-R001").successors.push("EAT-R2501"), "L-SUCCESSORS: EAT-R001 successor EAT-R2501 is not EAT-R201..EAT-R310"],
    ["SL-SUCCESSORS-EDGE", value => row(value, "EAT-R001").successors.push("EAT-R200"), "L-SUCCESSORS: EAT-R001 successor EAT-R200 is not EAT-R201..EAT-R310"],
    ["SL-SUCCESSORS-TWICE", value => row(value, "EAT-R001").successors.push("EAT-R210"), "L-SUCCESSORS: EAT-R001 names a successor twice"],
    ["SL-SUCCESSORS-NOT-ARRAY", value => {
      (row(value, "EAT-R001") as { successors: unknown }).successors = "EAT-R210";
    }, "L-SUCCESSORS: EAT-R001 successors is not an array"],
  ];
  it.each(cases)("%s: the planted ledger is refused", (_id, mutate, expected) => {
    expect(judge(ledger())).toEqual([]);
    expect(planted(mutate)).toContain(resolved(expected));
  });
  it("SL-SCHEMA-LEDGER: a ledger that is not an object is refused", () => {
    expect(judge(["EAT-R001"])).toEqual(["L-SCHEMA: the ledger is not an object"]);
  });
  it("SL-SECTION-COMMENTED: an anchor hidden in an HTML comment of its receipt is refused (the gate's GD1 plant on docs/workbench/receipts/wb-12x1.md)", () => {
    const value = ledger();
    const receipt = "docs/workbench/receipts/wb-12x1.md";
    const lines = String(READ(receipt)).split("\n");
    const at = lines.findIndex(line => line.startsWith("- EAT-R004, recorded per ruling point 1"));
    expect(at).toBeGreaterThan(0);
    const commented = [...lines.slice(0, at), "<!--", lines[at], "-->", ...lines.slice(at + 1)].join("\n");
    const findings = judgeWith(value, path => (path === receipt ? commented : READ(path)));
    const heading = sectionOf(row(value, "EAT-R004").evidence[0]).heading;
    expect(findings).toContain(`L-EVIDENCE: EAT-R004 evidence[0] anchor not found in the rendered section "${heading}" of ${receipt}: EAT-R004, recorded per ruling point 1`);
    expect(findings).toContain(`L-PARTIAL: EAT-R004 partialBecause.source anchor not found in the rendered section "${sectionOf(row(value, "EAT-R004").partialBecause?.source).heading}" of ${receipt}: The qa/workbench/mechanical-docs-cut journey is not part of this cut`);
  });
  const R004_RECEIPT = "docs/workbench/receipts/wb-12x1.md";
  const R004_EVIDENCE = "EAT-R004, recorded per ruling point 1";
  const R004_PARTIAL = "The qa/workbench/mechanical-docs-cut journey is not part of this cut";
  /** The two EAT-R004 findings a receipt read as the given text draws, in the committed sections. */
  const r004Findings = (receiptText: string): string[] => {
    const value = ledger();
    const findings = judgeWith(value, path => (path === R004_RECEIPT ? receiptText : READ(path)));
    const evidence = sectionOf(row(value, "EAT-R004").evidence[0]).heading;
    const partial = sectionOf(row(value, "EAT-R004").partialBecause?.source).heading;
    return findings.filter(
      finding =>
        finding === `L-EVIDENCE: EAT-R004 evidence[0] anchor not found in the rendered section "${evidence}" of ${R004_RECEIPT}: ${R004_EVIDENCE}` ||
        finding === `L-PARTIAL: EAT-R004 partialBecause.source anchor not found in the rendered section "${partial}" of ${R004_RECEIPT}: ${R004_PARTIAL}`,
    );
  };
  it("SL-SECTION-INLINE-COMMENTED: an anchor hidden in an inline HTML comment inside its list item is refused (the gate's GD2 plant on docs/workbench/receipts/wb-12x1.md)", () => {
    const text = String(READ(R004_RECEIPT));
    expect([text.split(`- ${R004_EVIDENCE}`).length, text.split(R004_PARTIAL).length]).toEqual([2, 2]);
    const commented = text.replace(`- ${R004_EVIDENCE}`, `- Recorded <!-- ${R004_EVIDENCE} -->`).replace(R004_PARTIAL, `<!-- ${R004_PARTIAL} -->`);
    expect(r004Findings(text)).toEqual([]);
    expect(r004Findings(commented)).toHaveLength(2);
  });
  it("SL-SECTION-PARAGRAPH-COMMENTED: an anchor hidden in an inline HTML comment inside a paragraph is refused", () => {
    const text = String(READ(R004_RECEIPT));
    const lines = text.split("\n");
    const at = lines.findIndex(line => line.startsWith(`- ${R004_EVIDENCE}`));
    expect(at).toBeGreaterThan(0);
    const paragraph = `Recorded <!-- ${R004_EVIDENCE} -->: <!-- ${R004_PARTIAL} -->.`;
    const planted = [...lines.slice(0, at), "", paragraph, "", ...lines.slice(at + 1)].join("\n");
    const section = sectionOf(row(ledger(), "EAT-R004").evidence[0]);
    const bound = docsSection(planted, section.heading, section.depth, section.parents);
    const read = bound.blocks.flatMap(block =>
      block.kind === "paragraph" && block.markdown.includes(R004_EVIDENCE) ? [[block.kind, block.text.includes(R004_EVIDENCE), block.text.includes(R004_PARTIAL)]] : [],
    );
    expect(read).toEqual([["paragraph", false, false]]);
    expect(r004Findings(planted)).toHaveLength(2);
  });
  const alone: Array<[string, string, (value: Ledger) => void, string]> = [
    ["SL-IDS-ALONE-MISSING", "a missing row", value => value.rows.splice(99, 1), "L-IDS: EAT-R100 has no row"],
    ["SL-IDS-ALONE-DUPLICATE", "a duplicated row", value => value.rows.splice(10, 0, structuredClone(row(value, "EAT-R010"))), "L-IDS: EAT-R010 has more than one row"],
    ["SL-IDS-ALONE-FOREIGN", "a foreign row", value => value.rows.push({ ...structuredClone(row(value, "EAT-R200")), id: "EAT-R201" }), "L-IDS: EAT-R201 is not EAT-R001..EAT-R200"],
  ];
  it.each(alone)("%s: %s gives exactly its own L-IDS finding, with no order finding beside it", (_id, _what, mutate, expected) => {
    expect(planted(mutate).filter(finding => finding.startsWith("L-IDS"))).toEqual([expected]);
  });
  it("SL-BEAD-NONE: a row whose bead is none draws no L-BEAD finding, and L-GROUP refuses it as not its group's bead", () => {
    const findings = planted(value => {
      row(value, "EAT-R057").bead = "none";
    });
    expect(findings.filter(finding => finding.startsWith("L-BEAD"))).toEqual([]);
    expect(findings).toContain("L-GROUP: EAT-R057 bead none is not its group's bead wb-f3wd");
  });
  const outside: Array<[string, string, string]> = [
    ["SL-TREE-ABSOLUTE", "a root-absolute path to a file the root holds (/package.json)", "/package.json"],
    ["SL-TREE-ABSOLUTE-FULL", "the full absolute path of a file the root holds", join(REPO, "package.json")],
    ["SL-TREE-PARENT", "a path with a .. segment to a file the root holds", "test/../package.json"],
  ];
  it.each(outside)("%s: a tested form naming %s names no file of the tree", (_id, _what, file) => {
    expect(READ("package.json")).not.toBeNull();
    expect(planted(value => {
        row(value, "EAT-R057").testedForms[0].file = file;
      })).toContain(`L-TESTED: EAT-R057 names ${file}, which the tree does not hold`);
  });
});

describe("wb-mit9: the AC2 rows and the F10 control separate fixed forms from the pending skip or retry (EAT-R202 AC2)", { timeout: BUDGET }, () => {
  it("SL-AC2-LISTS: the judge reads exactly the six AC2 rows and the sixteen containing verbs", () => {
    expect([...AC2_ROWS]).toEqual(AC2_ROW_IDS);
    expect([...BYTES_VERBS]).toEqual(VERBS);
  });
  it.each(AC2_ROW_IDS)("SL-AC2-FIXED %s: dropping the fixed forms is refused", id => {
    expect(planted(value => {
        row(value, id).fixedForms = [];
      })).toContain(`L-AC2: ${id} names no fixed, scoped form`);
  });
  it("SL-AC2-FIXED-BLANK: a fixed form that is an empty string is no fixed form", () => {
    expect(planted(value => {
        row(value, "EAT-R001").fixedForms = [""];
      })).toContain("L-AC2: EAT-R001 names no fixed, scoped form");
  });
  it.each(AC2_ROW_IDS)("SL-AC2-PENDING %s: dropping the pending sentence is refused", id => {
    expect(planted(value => {
        row(value, id).pending = undefined;
      })).toContain(`L-AC2: ${id} does not separate the pending parked per-agent skip or retry (witness wb-9v02)`);
  });
  const words: Array<[string, string, string]> = [
    ["SL-AC2-WITNESS", "wb-9v02", "the repro"],
    ["SL-AC2-WITNESS-OTHER", "wb-9v02", "wb-9v03"],
    ["SL-AC2-NOT-PENDING", "status pending", "status open"],
    ["SL-AC2-NOT-PARKED", "is parked", "is held"],
    ["SL-AC2-NOT-SKIP-OR-RETRY", "skip or retry", "skip"],
  ];
  it.each(words)("%s: a pending sentence with %s replaced is refused", (_id, from, to) => {
    const pending = String(row(ledger(), "EAT-R012").pending);
    expect(pending).toContain(from);
    expect(planted(value => {
        row(value, "EAT-R012").pending = pending.replace(from, to);
      })).toContain("L-AC2: EAT-R012 does not separate the pending parked per-agent skip or retry (witness wb-9v02)");
  });
  const inWords: Array<[string, string, string]> = [
    ["SL-AC2-WORD-PARKED-START", "is parked", "is unparked"],
    ["SL-AC2-WORD-PARKED-END", "is parked", "is parkeds"],
    ["SL-AC2-WORD-PENDING-START", "status pending", "status unpending"],
    ["SL-AC2-WORD-PENDING-END", "status pending", "status pendings"],
    ["SL-AC2-WORD-SKIP-START", "skip or retry", "unskip or retry"],
    ["SL-AC2-WORD-RETRY-END", "skip or retry", "skip or retrying"],
    ["SL-AC2-CASE-PARKED", "is parked", "is Parked"],
    ["SL-AC2-CASE-PENDING", "status pending", "status Pending"],
    ["SL-AC2-CASE-SKIP-OR-RETRY", "skip or retry", "Skip or Retry"],
  ];
  it.each(inWords)("%s: a pending sentence that holds %s only as %s is refused", (_id, from, to) => {
    const pending = String(row(ledger(), "EAT-R012").pending);
    expect(pending.split(from)).toHaveLength(2);
    expect(planted(value => {
        row(value, "EAT-R012").pending = pending.replace(from, to);
      })).toContain("L-AC2: EAT-R012 does not separate the pending parked per-agent skip or retry (witness wb-9v02)");
  });
  it("SL-AC2-CONTROL: the F10 control is refused without its fixed forms, without its pending sentence, when absent and with a form that lacks a title", () => {
    expect(planted(value => {
        value.controls[0].fixedForms = [];
      })).toContain("L-AC2: control F10 names no fixed, scoped form");
    expect(planted(value => {
        value.controls[0].pending = "";
      })).toContain("L-AC2: control F10 does not separate the pending parked per-agent skip or retry (witness wb-9v02)");
    expect(planted(value => value.controls.splice(0, 1))).toContain("L-AC2: the F10 control has no entry");
    expect(planted(value => {
        value.controls[0].testedForms[0].title = "";
      })).toContain("L-TESTED: control F10 testedForms[0] lacks a file, a title or a suite path");
  });
  it("SL-AC2-CONTROL-NO-FORMS: the tested F10 control with no tested form is refused", () => {
    expect(planted(value => {
        value.controls[0].testedForms = [];
      })).toContain("L-TESTED: control F10 is tested but names no tested form");
  });
  it("SL-AC2-CONTROL-UNTESTED: a control that is not tested may name no tested form", () => {
    const findings = planted(value => {
      value.controls[0].class = "partial/inert";
      value.controls[0].testedForms = [];
    });
    expect(findings.filter(finding => finding.startsWith("L-TESTED: control F10"))).toEqual([]);
  });
  it.each(VERBS)("SL-BYTES-VERB %s: a row naming WorktreePreservationFailedResult with that verb and byte data is refused", verb => {
    const findings = planted(value => row(value, "EAT-R002").fixedForms?.push(`WorktreePreservationFailedResult ${verb} the edited bytes`));
    expect(findings).toContain("L-BYTES: EAT-R002.fixedForms[1] says WorktreePreservationFailedResult contains byte data");
  });
  it("SL-BYTES-QUIET: the committed wording, a path that names where the bytes stay, and a sentence break are quiet", () => {
    expect(planted(value => row(value, "EAT-R002").fixedForms?.push("WorktreePreservationFailedResult names the path where the edited bytes stay"))).toEqual([]);
    expect(planted(value => row(value, "EAT-R002").fixedForms?.push("WorktreePreservationFailedResult is typed. The kept worktree holds the bytes"))).toEqual([]);
  });
  it("SL-BYTES-SINGULAR: a row naming WorktreePreservationFailedResult with a containing verb and the singular byte is refused", () => {
    const findings = planted(value => row(value, "EAT-R002").fixedForms?.push("WorktreePreservationFailedResult contains the edited byte"));
    expect(findings).toContain("L-BYTES: EAT-R002.fixedForms[1] says WorktreePreservationFailedResult contains byte data");
  });
  it("SL-BYTES-CASE: the type, the verb and the byte word are read in any letter case", () => {
    const findings = planted(value => row(value, "EAT-R002").fixedForms?.push("worktreepreservationfailedresult CONTAINS the edited BYTES"));
    expect(findings).toContain("L-BYTES: EAT-R002.fixedForms[1] says WorktreePreservationFailedResult contains byte data");
  });
  it("SL-BYTES-CONTROL: a string of the F10 control naming WorktreePreservationFailedResult with a containing verb and bytes is refused", () => {
    const findings = planted(value => value.controls[0].fixedForms.push("WorktreePreservationFailedResult contains the edited bytes"));
    expect(findings).toContain("L-BYTES: control F10.fixedForms[1] says WorktreePreservationFailedResult contains byte data");
  });
  const quietWords: Array<[string, string, string]> = [
    ["SL-BYTES-QUIET-TYPE", "a longer type name", "WorktreePreservationFailedResultSet contains the edited bytes"],
    ["SL-BYTES-QUIET-VERB-END", "a containing verb followed by more letters", "WorktreePreservationFailedResult containment names the edited bytes"],
    ["SL-BYTES-QUIET-VERB-START", "a containing verb after other letters", "WorktreePreservationFailedResult miscarries the edited bytes"],
    ["SL-BYTES-QUIET-BYTE-START", "the byte word after other letters", "WorktreePreservationFailedResult contains the edited kilobytes"],
    ["SL-BYTES-QUIET-BYTE-END", "the byte word followed by more letters", "WorktreePreservationFailedResult contains the edited bytestream"],
    ["SL-BYTES-QUIET-PERIOD-VERB", "a sentence break between the verb and the byte word", "WorktreePreservationFailedResult holds a path. The edited bytes stay in the kept worktree"],
  ];
  it.each(quietWords)("%s: %s is quiet", (_id, _what, text) => {
    expect(planted(value => row(value, "EAT-R002").fixedForms?.push(text))).toEqual([]);
  });
});

describe("wb-mit9: planted re-pin records each refused by their rule (EAT-R201 AC1, AC2)", { timeout: BUDGET }, () => {
  const cases: Array<[string, (value: RepinRecord) => void, string]> = [
    ["SL-RECORD-SCHEMA", value => {
      value.schema = "workbench.mechanical-repin-record/v2";
    }, "R-SCHEMA: schema is not workbench.mechanical-repin-record/v1"],
    ["SL-RECORD-PI-MISSING", value => {
      (value as { pi?: unknown }).pi = undefined;
    }, "R-SCHEMA: pi is missing"],
    ["SL-RECORD-CHANGES-MISSING", value => {
      (value as { implicatedChanges?: unknown }).implicatedChanges = undefined;
    }, "R-SCHEMA: implicatedChanges is missing"],
    ["SL-RECORD-SHORT-SHA", value => {
      value.pi.refs[0].tree = value.pi.refs[0].tree.slice(0, 12);
    }, "R-SHA: record.pi.refs[0].tree is not a 40-hex id"],
    ["SL-RECORD-SHORT-COMMIT", value => {
      value.pi.refs[0].commit = value.pi.refs[0].commit.slice(0, 12);
    }, "R-SHA: record.pi.refs[0].commit is not a 40-hex id"],
    ["SL-RECORD-SHORT-BLOB", value => {
      const exported = value.pi.refs[0].beadsExport;
      if (exported !== undefined) exported.blob = exported.blob.slice(0, 12);
    }, "R-SHA: record.pi.refs[0].beadsExport.blob is not a 40-hex id"],
    ["SL-RECORD-UPPER-SHA", value => {
      value.pi.refs[0].tree = value.pi.refs[0].tree.toUpperCase();
    }, "R-SHA: record.pi.refs[0].tree is not a 40-hex id"],
    ["SL-RECORD-LONG-SHA", value => {
      value.pi.refs[0].tree = `0${value.pi.refs[0].tree}`;
    }, "R-SHA: record.pi.refs[0].tree is not a 40-hex id"],
    ["SL-RECORD-BRANCH-UNNAMED", value => {
      value.pi.defaultBranch = "";
    }, "R-REFS: the default or the machine branch is not named"],
    ["SL-RECORD-MACHINE-REF", value => value.pi.refs.splice(1, 1), "R-REFS: pi.refs holds 0 refs named workbench/implementation-program"],
    ["SL-RECORD-REF-TWICE", value => value.pi.refs.push(structuredClone(value.pi.refs[0])), "R-REFS: pi.refs holds 2 refs named master"],
    ["SL-RECORD-PACKAGE", value => {
      value.pi.refs[0].package.version = "";
    }, "R-REFS: master has no package name and version"],
    ["SL-RECORD-PACKAGE-NAME", value => {
      value.pi.refs[0].package.name = "";
    }, "R-REFS: master has no package name and version"],
    ["SL-RECORD-REF-COMMIT", value => {
      (value.pi.refs[0] as { commit?: string }).commit = undefined;
    }, "R-REFS: master has no commit and tree"],
    ["SL-RECORD-REF-TREE", value => {
      (value.pi.refs[0] as { tree?: string }).tree = undefined;
    }, "R-REFS: master has no commit and tree"],
    ["SL-RECORD-BEADS-BLOB", value => {
      value.pi.refs[0].beadsExport = undefined;
    }, "R-REFS: master has no Beads export blob"],
    ["SL-RECORD-FEEDBACK", value => {
      value.pi.refs[0].feedback = undefined;
    }, "R-REFS: master has no feedback snapshot"],
    ["SL-RECORD-BEADS-BLOB-MISSING", value => {
      value.pi.refs[0].beadsExport = { path: ".beads/issues.jsonl" } as unknown as { blob: string };
    }, "R-REFS: master has no Beads export blob"],
    ["SL-RECORD-FEEDBACK-TREE-MISSING", value => {
      value.pi.refs[0].feedback = { path: "new-feedback" } as unknown as { tree: string };
    }, "R-REFS: master has no feedback snapshot"],
    ["SL-RECORD-MERGE-BASE", value => {
      value.pi.mergeBase.commit = undefined;
    }, "R-REFS: pi.mergeBase has no commit and tree"],
    ["SL-RECORD-MERGE-BASE-TREE", value => {
      value.pi.mergeBase.tree = undefined;
    }, "R-REFS: pi.mergeBase has no commit and tree"],
    ["SL-RECORD-MW-EMPTY", value => {
      value.mw.refs = [];
    }, "R-REFS: mw.refs is empty"],
    ["SL-RECORD-MW-COMMIT", value => {
      (value.mw.refs[0] as { commit?: string }).commit = undefined;
    }, "R-REFS: mw main has no commit and tree"],
    ["SL-RECORD-MW-TREE", value => {
      value.mw.refs[0].tree = undefined;
    }, "R-REFS: mw main has no commit and tree"],
    ["SL-RECORD-MW-PACKAGES", value => {
      value.mw.refs[0].packages = [];
    }, "R-REFS: mw main has no package names and versions"],
    ["SL-RECORD-MW-PACKAGE-NAME", value => {
      value.mw.refs[0].packages[1].name = "";
    }, "R-REFS: mw main has no package names and versions"],
    ["SL-RECORD-MW-PACKAGE-VERSION", value => {
      value.mw.refs[0].packages[1].version = "";
    }, "R-REFS: mw main has no package names and versions"],
    ["SL-RECORD-DEFAULT-IS-MACHINE", value => {
      value.pi.certifiedDefault.commit = value.pi.refs[1].commit;
      value.pi.divergence.machineOnlyCommits = 1;
    }, "R-DEFAULT: the machine branch's unmerged tip is certified as the default branch"],
    ["SL-RECORD-DEFAULT-NAME", value => {
      value.pi.certifiedDefault.name = "workbench/implementation-program";
    }, "R-DEFAULT: certifiedDefault is not the default branch's own commit"],
    ["SL-RECORD-DEFAULT-COMMIT", value => {
      value.pi.certifiedDefault.commit = value.pi.mergeBase.commit ?? "";
    }, "R-DEFAULT: certifiedDefault is not the default branch's own commit"],
    ["SL-RECORD-DEFAULT-NO-REF", value => {
      value.pi.refs.splice(0, 1);
      (value.pi.certifiedDefault as { commit?: string }).commit = undefined;
    }, "R-DEFAULT: certifiedDefault is not the default branch's own commit"],
    ["SL-RECORD-BEADS-STORE", value => {
      value.beads.store = "";
    }, "R-BEADS: the Beads snapshot has no store, epic status or children"],
    ["SL-RECORD-BEADS-NO-EPICS", value => {
      value.beads.epics = {};
    }, "R-BEADS: the Beads snapshot has no store, epic status or children"],
    ["SL-RECORD-BEADS-EPIC-STATUS", value => {
      value.beads.epics["wb-rhyt"].status = "";
    }, "R-BEADS: the Beads snapshot has no store, epic status or children"],
    ["SL-RECORD-BEADS-EPIC-CHILDREN", value => {
      value.beads.epics["wb-rhyt"].children = undefined;
    }, "R-BEADS: the Beads snapshot has no store, epic status or children"],
    ["SL-RECORD-MERGED-FLAGS", value => {
      value.implicatedChanges[7].inDefault = false;
    }, "R-CHANGES: implicated {change 7} is merged but not on both branches"],
    ["SL-RECORD-MERGED-FLAGS-MACHINE", value => {
      value.implicatedChanges[7].inMachine = false;
    }, "R-CHANGES: implicated {change 7} is merged but not on both branches"],
    ["SL-RECORD-MACHINE-FLAGS", value => {
      value.implicatedChanges[7].class = "machine-only";
    }, "R-CHANGES: implicated {change 7} is machine-only but not on the machine branch alone"],
    ["SL-RECORD-MACHINE-FLAGS-MACHINE", value => {
      const change = value.implicatedChanges[7];
      change.class = "machine-only";
      change.inDefault = false;
      change.inMachine = false;
    }, "R-CHANGES: implicated {change 7} is machine-only but not on the machine branch alone"],
    ["SL-RECORD-PROPOSED-FLAGS", value => {
      value.implicatedChanges[2].inMachine = true;
    }, "R-CHANGES: implicated {change 2} is proposed but not on the default branch alone"],
    ["SL-RECORD-PROPOSED-FLAGS-DEFAULT", value => {
      value.implicatedChanges[2].inDefault = false;
    }, "R-CHANGES: implicated {change 2} is proposed but not on the default branch alone"],
    ["SL-RECORD-HISTORICAL-ROLE", value => {
      value.implicatedChanges[0].role = undefined;
    }, "R-CHANGES: implicated {change 0} is historical without a role historicalPins names"],
    ["SL-RECORD-HISTORICAL-WRONG-ROLE", value => {
      value.implicatedChanges[0].role = "a role historicalPins does not name";
    }, "R-CHANGES: implicated {change 0} is historical without a role historicalPins names"],
    ["SL-RECORD-HISTORICAL-ROLE-UNDEFINED", value => {
      value.implicatedChanges[0].role = undefined;
      const pins = (value as unknown as { historicalPins: Array<{ role?: string }> }).historicalPins;
      pins[0].role = undefined;
    }, "R-CHANGES: implicated {change 0} is historical without a role historicalPins names"],
    ["SL-RECORD-UNKNOWN-CLASS", value => {
      value.implicatedChanges[7].class = "landed";
    }, "R-CHANGES: implicated {change 7} class landed is not one of the four"],
    ["SL-RECORD-TWICE", value => value.implicatedChanges.push(structuredClone(value.implicatedChanges[7])), "R-CHANGES: implicated {change 7} is listed twice"],
  ];
  it.each(cases)("%s: the planted record is refused", (_id, mutate, expected) => {
    const base = record();
    expect(repinFindings(base)).toEqual([]);
    expect(plantedRecord(mutate)).toContain(expected.replace(/\{change (\d+)\}/g, (_match, index: string) => base.implicatedChanges[Number(index)].commit));
  });
  it("SL-RECORD-DEFAULT-MACHINE-MERGED: certifying the machine tip while the machine branch holds no commit the default lacks is not read as an unmerged tip", () => {
    const value = record();
    value.pi.certifiedDefault.commit = value.pi.refs[1].commit;
    (value.pi as { divergence?: { machineOnlyCommits: number } }).divergence = { machineOnlyCommits: 0 };
    const findings = repinFindings(value);
    expect(findings).toContain("R-DEFAULT: certifiedDefault is not the default branch's own commit");
    expect(findings).not.toContain("R-DEFAULT: the machine branch's unmerged tip is certified as the default branch");
  });
  it("SL-RECORD-DEFAULT-NO-MACHINE: with no machine ref, a certified default without a commit is not read as the machine branch's unmerged tip", () => {
    const value = record();
    value.pi.refs.splice(1, 1);
    (value.pi.certifiedDefault as { commit?: string }).commit = undefined;
    const findings = repinFindings(value);
    expect(findings).toContain("R-REFS: pi.refs holds 0 refs named workbench/implementation-program");
    expect(findings).not.toContain("R-DEFAULT: the machine branch's unmerged tip is certified as the default branch");
  });
  it("SL-RECORD-NOT-OBJECT: a record that is not an object is refused", () => {
    expect(repinFindings("record")).toEqual(["R-SCHEMA: the record is not an object"]);
  });
  it("SL-RECORD-DEFAULT-MASTER-MACHINE-ONLY: a certified default that is the default ref's own commit is not refused while the machine branch holds commits the default lacks", () => {
    const value = record();
    value.pi.divergence.machineOnlyCommits = 3;
    expect(repinFindings(value).filter(finding => finding.startsWith("R-DEFAULT"))).toEqual([]);
  });
  it("SL-RECORD-SHA-KEY-QUIET: a member whose key only starts with commit, tree or blob is not read as an id", () => {
    const value = record();
    (value.pi.refs[0] as unknown as Record<string, unknown>).treeNote = "a note, not an id";
    (value.pi.refs[0] as unknown as Record<string, unknown>).commitMessage = "a message, not an id";
    (value.pi.refs[0] as unknown as Record<string, unknown>).blobPath = "a path, not an id";
    expect(repinFindings(value)).toEqual([]);
  });
  it("SL-RECORD-MACHINE-FLAGS-AGREE: a machine-only change off the default branch and on the machine branch draws no finding", () => {
    const value = record();
    const change = value.implicatedChanges[7];
    change.class = "machine-only";
    change.inDefault = false;
    change.inMachine = true;
    expect(repinFindings(value)).toEqual([]);
  });
  const anywhere: Array<[string, string, (value: RepinRecord) => void]> = [
    ["SL-RECORD-SHA-MERGE-BASE", "record.pi.mergeBase.commit", value => {
      value.pi.mergeBase.commit = String(value.pi.mergeBase.commit).slice(0, 12);
    }],
    ["SL-RECORD-SHA-MW", "record.mw.refs[0].tree", value => {
      value.mw.refs[0].tree = String(value.mw.refs[0].tree).slice(0, 12);
    }],
    ["SL-RECORD-SHA-HISTORICAL", "record.historicalPins[0].commit", value => {
      value.historicalPins[0].commit = value.historicalPins[0].commit.slice(0, 12);
    }],
    ["SL-RECORD-SHA-CHANGE", "record.implicatedChanges[7].commit", value => {
      value.implicatedChanges[7].commit = value.implicatedChanges[7].commit.slice(0, 12);
    }],
  ];
  it.each(anywhere)("%s: a short id at %s is refused", (_id, where, mutate) => {
    expect(plantedRecord(mutate)).toContain(`R-SHA: ${where} is not a 40-hex id`);
  });
  it("SL-RECORD-CLASSES: the committed record marks 23 merged, 5 proposed and 4 historical changes, and no machine-only change while the machine branch holds no commit the default lacks", () => {
    const value = record();
    const counts: Record<string, number> = {};
    for (const change of value.implicatedChanges) counts[change.class] = (counts[change.class] ?? 0) + 1;
    expect(counts).toEqual({ historical: 4, merged: 23, proposed: 5 });
    expect(value.pi.divergence.machineOnlyCommits).toBe(0);
  });
});

describe("wb-mit9: staleRepin invalidates a cut whose pins moved (EAT-R201 AC3)", { timeout: BUDGET }, () => {
  const measured = (value: RepinRecord) => ({
    pi: value.pi.refs.map(ref => ({ name: ref.name, commit: ref.commit, package: { ...ref.package } })),
    mw: value.mw.refs.map(ref => ({ name: ref.name, commit: ref.commit, packages: ref.packages.map(pkg => ({ name: pkg.name, version: pkg.version })) })),
  });
  it("SL-STALE-NONE: the recorded measurement is not stale", () => {
    expect(staleRepin(record(), measured(record()))).toEqual([]);
  });
  it("SL-STALE-PI-COMMIT: a moved machine branch is named", () => {
    const now = measured(record());
    now.pi[1].commit = "f".repeat(40);
    expect(staleRepin(record(), now)).toEqual([`pi workbench/implementation-program: commit ${record().pi.refs[1].commit} -> ${"f".repeat(40)}`]);
  });
  it("SL-STALE-PI-PACKAGE: a changed Pi package version is named", () => {
    const now = measured(record());
    now.pi[0].package.version = "0.21.0";
    expect(staleRepin(record(), now)).toEqual(["pi master: package @tintinweb/pi-subagents@0.20.0 -> @tintinweb/pi-subagents@0.21.0"]);
  });
  it("SL-STALE-MW: a moved MW tip, a changed MW package version, an added MW package and an unmeasured ref are named", () => {
    const now = measured(record());
    now.mw[0].commit = "e".repeat(40);
    now.mw[0].packages[1].version = "0.2.0";
    now.mw[0].packages.push({ name: "@mechanical/pi-host", version: "0.1.0" });
    expect(staleRepin(record(), now)).toEqual([
      `mw main: commit ${record().mw.refs[0].commit} -> ${"e".repeat(40)}`,
      "mw main: package @mechanical/development-rig@0.1.0 -> @mechanical/development-rig@0.2.0",
      "mw main: package @mechanical/pi-host added",
    ]);
    expect(staleRepin(record(), { pi: measured(record()).pi, mw: [] })).toEqual(["mw main: not measured"]);
  });
});

describe("wb-mit9: staleRepin names every change it reads (EAT-R201 AC3)", { timeout: BUDGET }, () => {
  const measured = (value: RepinRecord) => ({
    pi: value.pi.refs.map(ref => ({ name: ref.name, commit: ref.commit, package: { ...ref.package } })),
    mw: value.mw.refs.map(ref => ({ name: ref.name, commit: ref.commit, packages: ref.packages.map(pkg => ({ name: pkg.name, version: pkg.version })) })),
  });
  it("SL-STALE-NO-RECORD: a record that is not an object (a string or null), or lacks its pi or its mw member, is named", () => {
    const { pi, mw } = record();
    expect(staleRepin("record", measured(record()))).toEqual(["the record has no pi and mw refs"]);
    expect(staleRepin({ pi }, measured(record()))).toEqual(["the record has no pi and mw refs"]);
    expect(staleRepin({ mw }, measured(record()))).toEqual(["the record has no pi and mw refs"]);
    expect(staleRepin(null, measured(record()))).toEqual(["the record has no pi and mw refs"]);
  });
  it("SL-STALE-PI-UNMEASURED: a recorded Pi ref the measurement lacks is named", () => {
    const now = measured(record());
    now.pi.splice(0, 1);
    expect(staleRepin(record(), now)).toEqual(["pi master: not measured"]);
  });
  it("SL-STALE-PI-PACKAGE-NAME: a changed Pi package name is named", () => {
    const now = measured(record());
    now.pi[0].package.name = "@tintinweb/pi-subagents-next";
    expect(staleRepin(record(), now)).toEqual(["pi master: package @tintinweb/pi-subagents@0.20.0 -> @tintinweb/pi-subagents-next@0.20.0"]);
  });
  it("SL-STALE-MW-PACKAGE-REMOVED: a recorded MW package the measurement lacks is named", () => {
    const now = measured(record());
    now.mw[0].packages.splice(1, 1);
    expect(staleRepin(record(), now)).toEqual(["mw main: package @mechanical/development-rig removed"]);
  });
});

describe("wb-mit9: planted Beads exports, each read by its rule (EAT-R202 AC1, AC3)", { timeout: BUDGET }, () => {
  type BeadRecord = { title: string; text: string; parent: string | null };
  const judgeBeads = (value: unknown, edit: (beads: Map<string, BeadRecord>) => void): string[] => {
    const beads = new Map<string, BeadRecord>([...BEADS].map(([id, entry]): [string, BeadRecord] => [id, { ...entry }]));
    edit(beads);
    return ledgerFindings(value, { beads, readFile: READ, readSection: SECTIONS });
  };
  it("SL-EXPORT-QUIET: an id named only outside the epic's children, below or above EAT-R001..EAT-R200 (EAT-R000, EAT-R201, EAT-R250) or inside a longer number (EAT-R1001) is not read as a missing row", () => {
    const value = ledger();
    value.rows.splice(99, 1);
    const findings = judgeBeads(value, beads => {
      const docs = beads.get("wb-12x1");
      if (docs === undefined) throw new Error("no wb-12x1");
      docs.text = docs.text.replaceAll("EAT-R100", "EAT-R10O");
      beads.set("wb-zz01", { title: "a bead outside the epic", text: "names EAT-R100", parent: "wb-rhyt" });
      beads.set("wb-zz02", { title: "a child of the epic", text: "names EAT-R000, EAT-R201, EAT-R250 and EAT-R1001", parent: "wb-1a3t" });
    });
    expect(findings).toContain("L-IDS: EAT-R100 has no row");
    expect(findings.filter(finding => finding.startsWith("L-EXPORT"))).toEqual([]);
  });
  it("SL-GROUP-EXPORT-TAG-PARENT: a group tag found only on a bead outside the epic's children is refused", () => {
    const findings = judgeBeads(ledger(), beads => {
      const preserve = beads.get("wb-5ik5");
      if (preserve === undefined) throw new Error("no wb-5ik5");
      preserve.parent = "wb-rhyt";
    });
    expect(findings).toContain("L-GROUP: the ledger tag [MWI-preserve] is no wb-1a3t child tag in the export");
  });
  it("SL-GROUP-TAG-INSIDE: a group tag that its bead's export title holds only after other text does not start that title and is refused", () => {
    const findings = judgeBeads(ledger(), beads => {
      const preserve = beads.get("wb-5ik5");
      if (preserve === undefined) throw new Error("no wb-5ik5");
      preserve.title = `Moved ${preserve.title}`;
    });
    expect(findings).toContain("L-GROUP: B-preserve's tag [MWI-preserve] does not start the title of wb-5ik5");
    expect(findings).toContain("L-GROUP: the ledger tag [MWI-preserve] is no wb-1a3t child tag in the export");
  });
});

/** Each CLI run reads the Beads export and loads test/helpers/census.ts (about 3 s here); SL-CLI-FINDINGS runs it three times. */
const CLI_BUDGET = 4 * BUDGET;

describe("wb-mit9: the CLI's exit codes (qa/workbench/mechanical-status-ledger.mjs)", { timeout: CLI_BUDGET }, () => {
  const CLI = join(REPO, "qa/workbench/mechanical-status-ledger.mjs");
  const cli = (args: readonly string[]): [number | null, string, string] => {
    const run = spawnSync(process.execPath, [CLI, ...args], { encoding: "utf8" });
    return [run.status, run.stdout.trim(), run.stderr.trim()];
  };
  /** Writes the ledger and record given under dir; every other file the ledger reads, and the Beads export, is a symlink to this repository's. */
  const rootWith = (dir: string, ledgerValue: Ledger, recordValue: RepinRecord): void => {
    const paths = new Set<string>();
    for (const item of ledgerValue.rows) {
      for (const form of item.testedForms) paths.add(form.file);
      for (const anchor of [...item.evidence, ...(item.partialBecause === undefined ? [] : [item.partialBecause.source])]) {
        if (anchor.path !== undefined) paths.add(anchor.path);
      }
    }
    for (const control of ledgerValue.controls) for (const form of control.testedForms) paths.add(form.file);
    for (const path of paths) {
      if (!existsSync(join(dir, path))) {
        mkdirSync(dirname(join(dir, path)), { recursive: true });
        symlinkSync(join(REPO, path), join(dir, path));
      }
    }
    if (!existsSync(join(dir, ".beads"))) symlinkSync(join(REPO, ".beads"), join(dir, ".beads"));
    mkdirSync(join(dir, "test/fixtures"), { recursive: true });
    writeFileSync(join(dir, LEDGER_PATH), JSON.stringify(ledgerValue));
    writeFileSync(join(dir, RECORD_PATH), JSON.stringify(recordValue));
  };
  const usage: Array<[string, string, string[]]> = [
    ["SL-CLI-USAGE-BARE-ROOT", "--root with no directory", ["--root"]],
    ["SL-CLI-USAGE-OTHER-FLAG", "another flag with a directory", ["--rot", REPO]],
    ["SL-CLI-USAGE-EXTRA-ARG", "--root <dir> with one more argument", ["--root", REPO, "--root"]],
  ];
  it.each(usage)("%s: %s exits 2 with the usage line and no output", (_id, _what, args) => {
    expect(cli(args)).toEqual([2, "", "usage: node qa/workbench/mechanical-status-ledger.mjs [--root <dir>]"]);
  });
  it("SL-CLI-UNREADABLE: a root that holds no ledger exits 2 naming unreadable input", () => {
    const dir = makeScratch("wb-mit9-cli-");
    try {
      const [status, stdout, stderr] = cli(["--root", dir]);
      expect([status, stdout, stderr.startsWith("unreadable input: ")]).toEqual([2, "", true]);
    } finally {
      removeScratch(dir);
    }
  });
  const verdicts: Array<[string, string, () => [Ledger, RepinRecord], [number, string]]> = [
    ["SL-CLI-ROOT", "the committed files", () => [ledger(), record()], [0, '{"ledger":[],"record":[]}']],
    ["SL-CLI-FINDINGS-LEDGER", "a ledger finding alone", () => [{ ...ledger(), schema: "workbench.mechanical-status-ledger/v2" }, record()], [1, '{"ledger":["L-SCHEMA: schema is not workbench.mechanical-status-ledger/v1"],"record":[]}']],
    ["SL-CLI-FINDINGS-RECORD", "a record finding alone", () => [ledger(), { ...record(), schema: "workbench.mechanical-repin-record/v2" }], [1, '{"ledger":[],"record":["R-SCHEMA: schema is not workbench.mechanical-repin-record/v1"]}']],
  ];
  it.each(verdicts)("%s: over a root whose other files are the committed ones, %s gives this exit status and stdout", (_id, _what, files, expected) => {
    const dir = makeScratch("wb-mit9-cli-");
    try {
      const [ledgerValue, recordValue] = files();
      rootWith(dir, ledgerValue, recordValue);
      // stderr carries node's module-type warning for test/helpers/census.ts, as SL-CLI's run does, so it is not compared.
      expect(cli(["--root", dir]).slice(0, 2)).toEqual(expected);
    } finally {
      removeScratch(dir);
    }
  });
});

describe("wb-mit9: the NAMED RESIDUAL R-HEADING-ANCHOR and its pinned quiet row (rule-14 enumerate form)", { timeout: BUDGET }, () => {
  const HEADING_ANCHORS = [
    "EAT-R015 evidence[0]",
    "EAT-R016 evidence[0]",
    "EAT-R022 evidence[0]",
    "EAT-R027 evidence[0]",
    "EAT-R077 partialBecause.source",
    "EAT-R078 partialBecause.source",
    "EAT-R079 partialBecause.source",
    "EAT-R160 evidence[1]",
    "EAT-R161 evidence[0]",
    "EAT-R162 evidence[0]",
    "EAT-R164 partialBecause.source",
  ];
  it("SL-RESIDUAL-HEADING-ANCHORS: exactly these 11 markdown anchors are substrings of their own section heading, and the section reader's text starts with that heading", () => {
    const found: string[] = [];
    for (const item of ledger().rows) {
      const anchors: Array<[string, Anchor]> = item.evidence.map((anchor, index): [string, Anchor] => [`${item.id} evidence[${index}]`, anchor]);
      if (item.partialBecause !== undefined) anchors.push([`${item.id} partialBecause.source`, item.partialBecause.source]);
      for (const [where, anchor] of anchors) {
        const section = anchor.section;
        if (anchor.path === undefined || !anchor.path.endsWith(".md") || section === undefined || !section.heading.includes(anchor.anchor)) continue;
        found.push(where);
        expect(SECTIONS(String(READ(anchor.path)), section).text.startsWith(section.heading)).toBe(true);
      }
    }
    expect(found).toEqual(HEADING_ANCHORS);
  });
});
