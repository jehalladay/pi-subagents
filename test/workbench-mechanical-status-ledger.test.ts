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
 * PINNED READER SET (one claim per line; each line names its cases before the colon; an input no case holds is NOT CLAIMED):
 *  - SL-LIVE-LEDGER: the committed ledger, read with the repository tree and the Beads export, gives no finding.
 *  - SL-LIVE-RECORD: the committed re-pin record gives no finding.
 *  - SL-SHAPE: the rows hold the frozen shape of this cut (rule 16): per row its id, group, class, tested-form count, evidence count and the digests of its title and tested forms.
 *  - SL-COUNTS: 200 rows, 75 already-implemented/tested, 31 partial/inert and 94 blocked, and 3 of the 25 plan groups complete.
 *  - SL-IDS-MISSING, SL-IDS-DUPLICATE, SL-IDS-ORDER, SL-IDS-FOREIGN: a missing, duplicated, out-of-order or foreign row id is refused (EAT-R202 AC1).
 *  - SL-EXPORT: a row deleted from the ledger is refused through the Beads export, which names every EAT-R001..EAT-R200 id on a wb-1a3t child.
 *  - SL-BEAD-FABRICATED, SL-BEAD-UNNAMED, SL-GROUP-UNMAPPED, SL-GROUP-WRONG-BEAD, SL-GROUP-TAG, SL-GROUP-DROPPED, SL-GROUP-FOREIGN-LABEL: a fabricated wb- id, a bead that does not name the row's id, an unmapped group label, a row on another group's bead, a tag that does not start its bead's title, a dropped plan group and a foreign group label are refused (EAT-R202 AC3).
 *  - SL-CLASS, SL-PIN, SL-TESTED-NO-FORMS, SL-TESTED-NO-CASE, SL-TESTED-NO-FILE, SL-PARTIAL-NO-REASON, SL-PARTIAL-NO-SOURCE, SL-BLOCKED-NO-BLOCKER, SL-BLOCKED-KIND, SL-EVIDENCE-NONE, SL-EVIDENCE-PATH, SL-EVIDENCE-BEAD: an unknown class, a foreign pin, a tested row without a resolvable tested form, a partial row without a resolvable reason, a blocked row without a blocker kind and detail, and a row without resolvable evidence are refused (EAT-R202 AC1).
 *  - SL-AC2-LISTS, SL-AC2-FIXED, SL-AC2-PENDING, SL-AC2-WITNESS, SL-AC2-CONTROL: each of the six AC2 rows and the F10 control is refused when it drops its fixed forms or its pending sentence naming the parked per-agent skip or retry and its witness wb-9v02 (EAT-R202 AC2).
 *  - SL-BYTES-VERB, SL-BYTES-QUIET: a row naming WorktreePreservationFailedResult with one of the sixteen pinned containing verbs and byte data is refused, and the quiet rows stay quiet (EAT-R202 AC2).
 *  - SL-SUMMARY-25-COMPLETE, SL-SUMMARY-LABELS, SL-SUMMARY-ROWS, SL-SUMMARY-CLASS, SL-SUMMARY-PLAN-GROUPS, SL-SUCCESSORS-RANGE, SL-SUCCESSORS-TWICE: a summary counting the 25 plan groups as complete or any count that differs from the rows, and a successor outside EAT-R201..EAT-R310 or named twice, are refused (EAT-R202 AC3).
 *  - SL-RECORD-MACHINE-REF, SL-RECORD-PACKAGE, SL-RECORD-SHORT-SHA, SL-RECORD-MERGE-BASE, SL-RECORD-MW-PACKAGES, SL-RECORD-DEFAULT-IS-MACHINE, SL-RECORD-DEFAULT-NAME, SL-RECORD-MERGED-FLAGS, SL-RECORD-MACHINE-FLAGS, SL-RECORD-PROPOSED-FLAGS, SL-RECORD-HISTORICAL-ROLE, SL-RECORD-UNKNOWN-CLASS, SL-RECORD-TWICE, SL-RECORD-CLASSES: a record missing a ref, a package version, a full id, a merge-base or MW packages, certifying the machine tip as the default branch, or misclassifying an implicated change is refused, and the committed record marks all four classes (EAT-R201 AC1, AC2).
 *  - SL-STALE-NONE, SL-STALE-PI-COMMIT, SL-STALE-PI-PACKAGE, SL-STALE-MW: staleRepin names a moved Pi or MW commit, a changed package version, an added MW package and an unmeasured ref, and nothing for the recorded measurement (EAT-R201 AC3).
 *  - SL-CLI: the CLI judges the committed files with exit 0 and two empty lists.
 *  - SL-R210: the tested forms name the PF rows of test/worktree.test.ts that plant EAT-R210's status, add, commit, HEAD rev-parse and branch-retry failures.
 *  - SL-HEADER: these PINNED READER SET lines hold their recorded digests and name exactly the cases this file defines.
 *
 * NOT CLAIMED: that a row's class is the true state of the program (the class is this ledger's reading of the receipts,
 * tests and Beads records the row cites; the census checks that each cited anchor exists, not that it proves the class); a
 * re-run of any cited test or mutant; the titles against the master documents; a containing verb outside BYTES_VERBS; Beads
 * state outside the export files; the joint P00/M00 rulings of EAT-R203..EAT-R209, which need the Mechanical side.
 */
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
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
  staleRepin,
  treeReader,
} from "../qa/workbench/mechanical-status-ledger.mjs";

/** Every row reads files or parses JSON; each declares its own time budget (EAT-R168's form). */
const BUDGET = 30_000;
const REPO = join(import.meta.dirname, "..");

interface Form {
  file: string;
  case: string;
}
interface Anchor {
  path?: string;
  bead?: string;
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
}
interface MwRef {
  name: string;
  commit: string;
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
  pi: {
    refs: PiRef[];
    mergeBase: { commit?: string; tree?: string };
    certifiedDefault: { name: string; commit: string };
  };
  mw: { refs: MwRef[] };
  implicatedChanges: Change[];
}

const readJson = (path: string): unknown => JSON.parse(readFileSync(join(REPO, path), "utf8"));
const ledger = (): Ledger => readJson(LEDGER_PATH) as Ledger;
const record = (): RepinRecord => readJson(RECORD_PATH) as RepinRecord;
const BEADS = readBeadExport(REPO);
const READ = treeReader(REPO);
const judge = (value: unknown): string[] => ledgerFindings(value, { beads: BEADS, readFile: READ });
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
const sha8 = (text: string): string => createHash("sha256").update(text).digest("hex").slice(0, 8);
const LETTER: Readonly<Record<string, string>> = { "already-implemented/tested": "T", "partial/inert": "P", blocked: "B" };
const shapeOf = (item: Row): string =>
  [item.id, item.group, LETTER[item.class], item.testedForms.length, item.evidence.length, sha8(item.title), sha8(JSON.stringify(item.testedForms))].join(":");

/** SL-AC2-LISTS: EAT-R202 AC2's rows "EAT-R001..R003, R012..R014", spelled out here so the judge's own list cannot shrink them. */
const AC2_ROW_IDS = ["EAT-R001", "EAT-R002", "EAT-R003", "EAT-R012", "EAT-R013", "EAT-R014"];
/** SL-AC2-LISTS: the containing verbs the bytes rule reads, pinned here so the judge's own list cannot shrink them. */
const VERBS = ["contain", "contains", "embed", "embeds", "carry", "carries", "hold", "holds", "include", "includes", "store", "stores", "pack", "packs", "wrap", "wraps"];

/** SL-HEADER: this file, its PINNED READER SET lines, and the digests those lines hold at this cut. */
const SOURCE = readFileSync(join(REPO, "test/workbench-mechanical-status-ledger.test.ts"), "utf8");
const HEADER_LINES = SOURCE.slice(0, SOURCE.indexOf("*/"))
  .split("\n")
  .filter(line => line.startsWith(" *  - SL-"))
  .map(line => line.slice(" *  - ".length));
const HEADER_DIGESTS = ["74383b5b", "93c73990", "34c2d808", "daaf84d2", "8ef86d7d", "9d98cdf8", "2889b3fe", "fbe1c4f4", "bdb98fb4", "2978e22a", "1029e3be", "160824d3", "8c56d28f", "95ccead5", "7ae98cfc", "0e50e055"];

/** SL-SHAPE: the frozen shape of the 200 rows at this cut (rule 16), derived from the ledger as committed. */
const SHAPE = [
  "EAT-R001:B-preserve:T:2:1:c5ee9f32:77352bae", "EAT-R002:B-preserve:T:4:1:03faeae0:4be24748", "EAT-R003:B-preserve:T:2:1:3e0c4491:bff7708a",
  "EAT-R004:B-docs:P:0:1:d2f34ffa:4f53cda1", "EAT-R005:B-contract-choice:B:0:1:972957b6:4f53cda1", "EAT-R006:B-contract-choice:B:0:1:82d670e5:4f53cda1",
  "EAT-R007:B-descriptor:P:0:1:f51563b6:4f53cda1", "EAT-R008:B-descriptor:P:0:1:87470cf3:4f53cda1", "EAT-R009:B-descriptor:P:0:1:87c0ade0:4f53cda1",
  "EAT-R010:B-descriptor:P:0:1:21c65a12:4f53cda1", "EAT-R011:B-descriptor:P:0:1:88f91f39:4f53cda1", "EAT-R012:B-detached-grants:T:1:1:536fc018:f8e45be7",
  "EAT-R013:B-detached-grants:T:1:1:e44ba1f9:4970015a", "EAT-R014:B-detached-grants:T:1:1:1bbced83:771a913b", "EAT-R015:B-cancel-repro:T:2:1:66cec65a:b18515ee",
  "EAT-R016:B-cancel-repro:T:2:1:a8bf3a36:f0ce1288", "EAT-R017:B-replay:T:1:1:64a9982c:1698e0fe", "EAT-R018:B-replay:T:1:1:325b6058:8f250a1f",
  "EAT-R019:B-replay:T:1:1:4244a113:8636ca0a", "EAT-R020:B-replay:T:1:1:7e43d3e7:44e378e7", "EAT-R021:B-replay:T:1:1:7c6763dd:c54a0743",
  "EAT-R022:B-source:P:0:2:710370bc:4f53cda1", "EAT-R023:B-source:P:0:2:38b4b589:4f53cda1", "EAT-R024:B-source:P:0:2:f5197d9e:4f53cda1",
  "EAT-R025:B-source:P:0:2:4cfc79c8:4f53cda1", "EAT-R026:B-source:P:0:2:357d1b41:4f53cda1", "EAT-R027:B-source:P:0:2:190f8784:4f53cda1",
  "EAT-R028:B-authority:P:0:1:43b44e78:4f53cda1", "EAT-R029:B-authority:P:0:1:f629bad1:4f53cda1", "EAT-R030:B-authority:P:0:1:5e52d4b0:4f53cda1",
  "EAT-R031:B-authority:P:0:1:41feba3c:4f53cda1", "EAT-R032:B-dispatch:B:0:1:144267a3:4f53cda1", "EAT-R033:B-dispatch:B:0:1:940e502b:4f53cda1",
  "EAT-R034:B-dispatch:B:0:1:d30e5a3d:4f53cda1", "EAT-R035:B-dispatch:B:0:1:dae2da21:4f53cda1", "EAT-R036:B-outcomes:B:0:1:f86198d7:4f53cda1",
  "EAT-R037:B-outcomes:B:0:1:8421d297:4f53cda1", "EAT-R038:B-outcomes:B:0:1:f7dea863:4f53cda1", "EAT-R039:B-outcomes:B:0:1:40e3e288:4f53cda1",
  "EAT-R040:B-outcomes:B:0:1:41adcd3c:4f53cda1", "EAT-R041:B-effects:B:0:1:d38a8ab2:4f53cda1", "EAT-R042:B-effects:B:0:1:318cfc36:4f53cda1",
  "EAT-R043:B-effects:B:0:1:664dad70:4f53cda1", "EAT-R044:B-effects:B:0:1:fe93e1af:4f53cda1", "EAT-R045:B-controls:B:0:1:2d08d470:4f53cda1",
  "EAT-R046:B-controls:B:0:1:7e54e917:4f53cda1", "EAT-R047:B-controls:B:0:1:a2888649:4f53cda1", "EAT-R048:B-controls:B:0:1:c89b14ef:4f53cda1",
  "EAT-R049:B-controls:B:0:1:85cc2c45:4f53cda1", "EAT-R050:B-controls:B:0:1:be7dc0e6:4f53cda1", "EAT-R051:B-observe:B:0:1:7b355df4:4f53cda1",
  "EAT-R052:B-observe:B:0:1:fa0f660c:4f53cda1", "EAT-R053:B-git-census:B:0:1:28640ae1:4f53cda1", "EAT-R054:B-git-census:B:0:1:9ec5497a:4f53cda1",
  "EAT-R055:B-git-census:B:0:1:b8adc283:4f53cda1", "EAT-R056:B-git-census:B:0:1:2201b951:4f53cda1", "EAT-R057:B-hx-evidence:T:3:1:69d3a872:178b045f",
  "EAT-R058:B-hx-admit:B:0:1:d7f66936:4f53cda1", "EAT-R059:B-hx-admit:B:0:1:7c587ed3:4f53cda1", "EAT-R060:B-rf-admit:B:0:1:e7635cf8:4f53cda1",
  "EAT-R061:B-rf-admit:B:0:1:7362931b:4f53cda1", "EAT-R062:B-rf-admit:B:0:1:914fbdd4:4f53cda1", "EAT-R063:B-rf-admit:B:0:1:8c807743:4f53cda1",
  "EAT-R064:B-detached-function:B:0:1:b3f4364f:4f53cda1", "EAT-R065:B-detached-function:B:0:1:2b803f99:4f53cda1", "EAT-R066:B-detached-function:B:0:1:e021e71f:4f53cda1",
  "EAT-R067:B-detached-function:B:0:1:09721009:4f53cda1", "EAT-R068:B-furnace-function:B:0:1:b3dc4b16:4f53cda1", "EAT-R069:B-furnace-function:B:0:1:5222acc6:4f53cda1",
  "EAT-R070:B-furnace-function:B:0:1:b366cd21:4f53cda1", "EAT-R071:B-coordination:P:0:1:5d0c6c6c:4f53cda1", "EAT-R072:B-coordination:P:0:1:f90f4579:4f53cda1",
  "EAT-R073:B-limits:T:2:1:d6fe76bb:a456298d", "EAT-R074:B-limits:P:0:2:3d68157a:4f53cda1", "EAT-R075:B-limits:P:0:2:89051ae3:4f53cda1",
  "EAT-R076:B-limits:P:0:2:855a4ecd:4f53cda1", "EAT-R077:B-telemetry:P:0:2:ce995cfc:4f53cda1", "EAT-R078:B-telemetry:P:0:2:53c2f23d:4f53cda1",
  "EAT-R079:B-telemetry:P:0:2:0823baa4:4f53cda1", "EAT-R080:B-unknowns:P:0:2:b17e161b:4f53cda1", "EAT-R081:B-unknowns:P:0:2:4d19151e:4f53cda1",
  "EAT-R082:B-release:T:1:1:86111f5b:63564c02", "EAT-R083:B-release:T:1:1:43669bc3:661e4a27", "EAT-R084:B-release:T:1:1:9a3d1225:6a936177",
  "EAT-R085:B-release:T:1:1:e242f076:258b7395", "EAT-R086:B-release:T:1:1:2d6edc77:6d02ddd3", "EAT-R087:B-release:T:1:1:90f9c624:26a891bc",
  "EAT-R088:mw-tracks:B:0:1:0856380e:4f53cda1", "EAT-R089:mw-tracks:B:0:1:baeb75ef:4f53cda1", "EAT-R090:mw-tracks:B:0:1:851d2b93:4f53cda1",
  "EAT-R091:mw-tracks:B:0:1:32432c73:4f53cda1", "EAT-R092:mw-tracks:B:0:1:85d3ae13:4f53cda1", "EAT-R093:mw-tracks:B:0:1:6af8521f:4f53cda1",
  "EAT-R094:B-docs:T:1:1:0fc7813c:8b3101fd", "EAT-R095:B-docs:T:1:1:d4c156f4:e325a2d9", "EAT-R096:B-docs:T:1:1:00532bc4:020f548b",
  "EAT-R097:B-docs:T:1:1:f0a0278e:3c3c6e41", "EAT-R098:B-docs:T:1:1:2240cb32:d0139e84", "EAT-R099:B-docs:T:1:1:eeb6d5d0:69c0ad74",
  "EAT-R100:B-docs:T:1:1:06020255:bb130ecb", "EAT-R101:B-docs:T:1:1:1fd9a28a:8fe5edf5", "EAT-R102:B-docs:T:1:1:fcb34180:005b0fe2",
  "EAT-R103:B-docs:T:1:1:e8eed32d:86228a50", "EAT-R104:B-docs:T:1:1:13c3c0bb:8d8bc364", "EAT-R105:B-docs:T:1:1:4b27fe6e:e772999c",
  "EAT-R106:B-docs:T:1:1:5217d989:c34ee6fe", "EAT-R107:B-docs:T:1:1:3a97874e:3407c184", "EAT-R108:B-docs:T:1:1:e60995ec:dddabe1a",
  "EAT-R109:B-docs:T:1:1:5e0fe0e7:e1b2055e", "EAT-R110:B-docs:T:1:1:9fb24102:e3119685", "EAT-R111:B-docs:T:1:1:f6219173:aec42466",
  "EAT-R112:B-docs:T:1:1:7f8929db:32221355", "EAT-R113:B-docs:T:1:1:851d41c1:cf5699a7", "EAT-R114:B-docs:T:1:1:92463629:20db7418",
  "EAT-R115:B-docs:T:1:1:402907a8:6ebf222b", "EAT-R116:B-docs:T:1:1:bf7cc6a8:b3033fb0", "EAT-R117:B-docs:T:1:1:76daf2c6:71545f75",
  "EAT-R118:B-docs:T:1:1:a871cefe:92bfe620", "EAT-R119:B-docs:T:1:1:bfe8d6ec:8d242542", "EAT-R120:B-docs:T:1:1:bbf77457:e60411a6",
  "EAT-R121:B-docs:T:1:1:f7bd66f1:f08f5978", "EAT-R122:B-docs:T:1:1:d21afa1d:2ded63d1", "EAT-R123:B-docs:T:1:1:a4384fc4:22ab042a",
  "EAT-R124:B-docs:T:1:1:2e04b63f:2bd68ac5", "EAT-R125:B-docs:T:1:1:51077e06:4e10b6b3", "EAT-R126:B-docs:T:1:1:e83f5706:68b033d2",
  "EAT-R127:B-docs:T:1:1:b90d00e8:84e8a1ba", "EAT-R128:B-docs:T:1:1:74c8b376:b2609223", "EAT-R129:B-docs:T:1:1:ae577872:dbc001c5",
  "EAT-R130:B-docs:T:1:1:291a1a84:9a0f5776", "EAT-R131:B-docs:T:1:1:be1f8efb:10f2b39c", "EAT-R132:B-docs:T:1:1:04b568d0:7a620558",
  "EAT-R133:B-docs:T:1:1:7d4fb80c:0aba1d0b", "EAT-R134:B-docs:T:1:1:66abacb6:74353837", "EAT-R135:B-docs:T:1:1:85f3ece9:67614560",
  "EAT-R136:B-docs:T:1:1:979c8c8f:125c7661", "EAT-R137:B-docs:T:1:1:499e8fde:413c9664", "EAT-R138:B-docs:T:1:1:87c79234:cf7fb130",
  "EAT-R139:B-docs:T:1:1:ed1a515a:7229fb1b", "EAT-R140:B-docs:T:1:1:612f9079:155c245c", "EAT-R141:B-docs:T:1:1:57593c88:30d51965",
  "EAT-R142:B-docs:T:1:1:47f532c4:a402a6bb", "EAT-R143:B-docs:T:1:1:87725b7d:85a8f4b4", "EAT-R144:B-preserve:T:5:1:dbe78b8a:83b2161b",
  "EAT-R145:B-preserve:P:0:2:4dfbcfbb:4f53cda1", "EAT-R146:B-preserve:T:1:1:18edbb31:134f7871", "EAT-R147:B-docs:B:0:1:670089cc:4f53cda1",
  "EAT-R148:B-contract-choice:B:0:1:61ae2437:4f53cda1", "EAT-R149:B-contract-choice:B:0:1:598474e2:4f53cda1", "EAT-R150:B-contract-choice:B:0:1:9d277c7e:4f53cda1",
  "EAT-R151:B-contract-choice:B:0:1:ba457cba:4f53cda1", "EAT-R152:B-descriptor:B:0:1:59b9b12f:4f53cda1", "EAT-R153:B-descriptor:B:0:1:65f22712:4f53cda1",
  "EAT-R154:B-authority:P:0:1:c3008f13:4f53cda1", "EAT-R155:B-dispatch:B:0:1:0ea0f52a:4f53cda1", "EAT-R156:B-outcomes:B:0:1:48096549:4f53cda1",
  "EAT-R157:B-outcomes:B:0:1:62038c7d:4f53cda1", "EAT-R158:B-outcomes:B:0:1:463ab3d6:4f53cda1", "EAT-R159:B-git-census:B:0:1:d39da113:4f53cda1",
  "EAT-R160:B-cancel-repro:B:0:2:466a482e:4f53cda1", "EAT-R161:B-replay:T:1:1:dc14af4e:0f5a5339", "EAT-R162:B-replay:T:1:1:ab8f29ba:ef361d43",
  "EAT-R163:B-hx-admit:B:0:1:311be2bc:4f53cda1", "EAT-R164:B-telemetry:P:0:2:20898013:4f53cda1", "EAT-R165:B-release:B:0:1:1e51d1e9:4f53cda1",
  "EAT-R166:B-release:B:0:1:d989a51b:4f53cda1", "EAT-R167:B-release:P:0:1:9c586727:4f53cda1", "EAT-R168:B-release:P:0:1:edda22c7:4f53cda1",
  "EAT-R169:B-release:B:0:1:0ef11c4c:4f53cda1", "EAT-R170:B-release:B:0:1:417814c6:4f53cda1", "EAT-R171:B-release:B:0:1:68e6e99e:4f53cda1",
  "EAT-R172:master-recon:B:0:1:2f55907c:4f53cda1", "EAT-R173:mw-tracks:B:0:1:97289c72:4f53cda1", "EAT-R174:mw-tracks:B:0:1:8f7559aa:4f53cda1",
  "EAT-R175:mw-tracks:B:0:1:90cab45c:4f53cda1", "EAT-R176:mw-tracks:B:0:1:2d1487c5:4f53cda1", "EAT-R177:mw-tracks:B:0:1:a97dc785:4f53cda1",
  "EAT-R178:B-docs:B:0:1:36c8eb6e:4f53cda1", "EAT-R179:B-docs:B:0:1:acfa4405:4f53cda1", "EAT-R180:B-docs:B:0:1:0432af3c:4f53cda1",
  "EAT-R181:B-docs:B:0:1:e629bb59:4f53cda1", "EAT-R182:B-docs:B:0:1:89a793a6:4f53cda1", "EAT-R183:B-docs:B:0:1:23aa2ca6:4f53cda1",
  "EAT-R184:B-docs:B:0:1:df6b0b5d:4f53cda1", "EAT-R185:B-docs:B:0:1:407e2879:4f53cda1", "EAT-R186:B-docs:B:0:1:d9fff258:4f53cda1",
  "EAT-R187:B-docs:B:0:1:1584cb0e:4f53cda1", "EAT-R188:B-docs:B:0:1:18d19351:4f53cda1", "EAT-R189:B-docs:B:0:1:bbb59487:4f53cda1",
  "EAT-R190:B-docs:B:0:1:d8cefc89:4f53cda1", "EAT-R191:B-docs:B:0:1:d984f9b0:4f53cda1", "EAT-R192:B-docs:B:0:1:989d71df:4f53cda1",
  "EAT-R193:B-docs:B:0:1:8701c468:4f53cda1", "EAT-R194:B-docs:B:0:1:6da75aa3:4f53cda1", "EAT-R195:B-docs:B:0:1:615adc1b:4f53cda1",
  "EAT-R196:B-docs:B:0:1:ac893618:4f53cda1", "EAT-R197:B-docs:B:0:1:c3d93d31:4f53cda1", "EAT-R198:B-docs:B:0:1:da9d790d:4f53cda1",
  "EAT-R199:B-docs:B:0:1:7eb58a08:4f53cda1", "EAT-R200:B-docs:B:0:1:1989c335:4f53cda1",
];

describe("wb-mit9: the committed ledger and re-pin record (EAT-R201, EAT-R202)", { timeout: BUDGET }, () => {
  it("SL-LIVE-LEDGER: the committed ledger gives no finding against the tree and the Beads export", () => {
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

  it("SL-R210: the tested forms name the PF rows that plant EAT-R210's status, add, commit, HEAD rev-parse and branch-retry failures", () => {
    const value = ledger();
    const forms = ["EAT-R001", "EAT-R002", "EAT-R144"].flatMap(id => row(value, id).testedForms.map(form => `${form.file} ${form.case}`));
    for (const id of ["PF-R002-status", "PF-R002-add", "PF-R001-COMMIT", "PF-REVPARSE", "PF-R001-BRANCH"]) {
      expect(forms).toContain(`test/worktree.test.ts ${id}`);
    }
  });

  it("SL-HEADER: the PINNED READER SET lines hold their digests and name exactly the cases this file defines", () => {
    expect(HEADER_LINES.map(sha8)).toEqual(HEADER_DIGESTS);
    const claimed = HEADER_LINES.flatMap(line => line.slice(0, line.indexOf(":")).split(", "));
    const defined = [...SOURCE.matchAll(/^\s*(?:it(?:\.each\([A-Za-z0-9_]+\))?\("|\[")(SL-[A-Z0-9-]+)[ :"]/gm)].map(match => match[1]);
    expect(new Set(defined).size).toBe(defined.length);
    expect([...defined].sort()).toEqual([...claimed].sort());
  });

  it("SL-CLI: the CLI judges the committed files, exit 0 with two empty lists", () => {
    const run = spawnSync(process.execPath, [join(REPO, "qa/workbench/mechanical-status-ledger.mjs")], { encoding: "utf8" });
    expect([run.status, run.stdout.trim()]).toEqual([0, '{"ledger":[],"record":[]}']);
  });
});

describe("wb-mit9: planted ledgers each refused by their rule (EAT-R202)", { timeout: BUDGET }, () => {
  const cases: Array<[string, (value: Ledger) => void, string]> = [
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
    ["SL-BEAD-FABRICATED", value => {
      row(value, "EAT-R057").bead = "wb-zz9q";
    }, "L-BEAD: EAT-R057 names wb-zz9q, a fabricated id the Beads export does not hold"],
    ["SL-BEAD-UNNAMED", value => {
      row(value, "EAT-R057").bead = "wb-ny54";
    }, "L-BEAD: EAT-R057 is not named by the description or notes of wb-ny54"],
    ["SL-GROUP-UNMAPPED", value => {
      row(value, "EAT-R057").group = "B-hx-probe";
    }, "L-GROUP: EAT-R057 group B-hx-probe is an unmapped label"],
    ["SL-GROUP-WRONG-BEAD", value => {
      row(value, "EAT-R001").bead = "wb-wupg";
    }, "L-GROUP: EAT-R001 bead wb-wupg is not its group's bead wb-5ik5"],
    ["SL-GROUP-TAG", value => {
      value.groups[0].tag = "[MWI-preserved]";
    }, "L-GROUP: B-preserve's tag [MWI-preserved] does not start the title of wb-5ik5"],
    ["SL-GROUP-DROPPED", value => value.groups.splice(1, 1), "L-GROUP: the BEAD-PLAN group B-docs has no ledger group"],
    ["SL-GROUP-FOREIGN-LABEL", value => {
      value.groups[0].label = "B-preserve-2";
    }, "L-GROUP: B-preserve-2 is not a BEAD-PLAN group or a delta group"],
    ["SL-TESTED-NO-FORMS", value => {
      row(value, "EAT-R057").testedForms = [];
    }, "L-TESTED: EAT-R057 is tested but names no tested form"],
    ["SL-TESTED-NO-CASE", value => {
      row(value, "EAT-R057").testedForms[0].case = "A1-PRODUCER-PIN-NOT-A-CASE";
    }, "L-TESTED: EAT-R057 case not found in test/workbench-hx-task-scope-probe.test.ts: A1-PRODUCER-PIN-NOT-A-CASE"],
    ["SL-TESTED-NO-FILE", value => {
      row(value, "EAT-R057").testedForms[0].file = "test/workbench-hx-task-scope-probes.test.ts";
    }, "L-TESTED: EAT-R057 names test/workbench-hx-task-scope-probes.test.ts, which the tree does not hold"],
    ["SL-PARTIAL-NO-REASON", value => {
      row(value, "EAT-R004").partialBecause = undefined;
    }, "L-PARTIAL: EAT-R004 is partial/inert without a reason"],
    ["SL-PARTIAL-NO-SOURCE", value => {
      const because = row(value, "EAT-R004").partialBecause;
      if (because !== undefined) because.source.anchor = "a journey that is part of this cut";
    }, "L-PARTIAL: EAT-R004 partialBecause.source anchor not found in docs/workbench/receipts/wb-12x1.md: a journey that is part of this cut"],
    ["SL-BLOCKED-NO-BLOCKER", value => {
      row(value, "EAT-R178").blockedBy = undefined;
    }, "L-BLOCKED: EAT-R178 is blocked without a blocker kind and detail"],
    ["SL-BLOCKED-KIND", value => {
      const blocker = row(value, "EAT-R178").blockedBy;
      if (blocker !== undefined) blocker.kind = "later";
    }, "L-BLOCKED: EAT-R178 is blocked without a blocker kind and detail"],
    ["SL-EVIDENCE-NONE", value => {
      row(value, "EAT-R178").evidence = [];
    }, "L-EVIDENCE: EAT-R178 cites no evidence"],
    ["SL-EVIDENCE-PATH", value => {
      row(value, "EAT-R057").evidence[0].anchor = "EAT-R057 is closed live";
    }, "L-EVIDENCE: EAT-R057 evidence[0] anchor not found in docs/workbench/receipts/wb-f3wd.md: EAT-R057 is closed live"],
    ["SL-EVIDENCE-BEAD", value => {
      row(value, "EAT-R178").evidence[0].anchor = "EAT-R178 landed";
    }, "L-EVIDENCE: EAT-R178 evidence[0] anchor not found in wb-12x1: EAT-R178 landed"],
    ["SL-SUMMARY-25-COMPLETE", value => {
      value.summary.planGroupsComplete = 25;
    }, "L-SUMMARY: summary.planGroupsComplete 25 is not the 3 groups whose every row is tested"],
    ["SL-SUMMARY-LABELS", value => value.summary.planGroupsCompleteLabels.push("B-preserve"), "L-SUMMARY: summary.planGroupsCompleteLabels is not the groups whose every row is tested"],
    ["SL-SUMMARY-ROWS", value => {
      value.summary.rows = 199;
    }, "L-SUMMARY: summary.rows 199 is not the 200 rows"],
    ["SL-SUMMARY-CLASS", value => {
      value.summary.byClass.blocked = 93;
    }, "L-SUMMARY: summary.byClass blocked 93 is not 94"],
    ["SL-SUMMARY-PLAN-GROUPS", value => {
      value.summary.planGroups = 24;
    }, "L-SUMMARY: summary.planGroups 24 is not 25"],
    ["SL-SUCCESSORS-RANGE", value => row(value, "EAT-R001").successors.push("EAT-R150"), "L-SUCCESSORS: EAT-R001 successor EAT-R150 is not EAT-R201..EAT-R310"],
    ["SL-SUCCESSORS-TWICE", value => row(value, "EAT-R001").successors.push("EAT-R210"), "L-SUCCESSORS: EAT-R001 names a successor twice"],
  ];
  it.each(cases)("%s: the planted ledger is refused", (_id, mutate, expected) => {
    expect(judge(ledger())).toEqual([]);
    expect(planted(mutate)).toContain(expected);
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
  it.each(AC2_ROW_IDS)("SL-AC2-PENDING %s: dropping the pending sentence is refused", id => {
    expect(planted(value => {
        row(value, id).pending = undefined;
      })).toContain(`L-AC2: ${id} does not separate the pending parked per-agent skip or retry (witness wb-9v02)`);
  });
  it("SL-AC2-WITNESS: a pending sentence without its witness wb-9v02 is refused", () => {
    expect(planted(value => {
        row(value, "EAT-R012").pending = String(row(value, "EAT-R012").pending).replace("wb-9v02", "the repro");
      })).toContain(
      "L-AC2: EAT-R012 does not separate the pending parked per-agent skip or retry (witness wb-9v02)",
    );
  });
  it("SL-AC2-CONTROL: the F10 control is refused without its fixed forms, without its pending sentence and when absent", () => {
    expect(planted(value => {
        value.controls[0].fixedForms = [];
      })).toContain("L-AC2: control F10 names no fixed, scoped form");
    expect(planted(value => {
        value.controls[0].pending = "";
      })).toContain("L-AC2: control F10 does not separate the pending parked per-agent skip or retry (witness wb-9v02)");
    expect(planted(value => value.controls.splice(0, 1))).toContain("L-AC2: the F10 control has no entry");
    expect(planted(value => {
        value.controls[0].testedForms[0].case = "F10 a run abort that never happened";
      })).toContain(
      "L-TESTED: control F10 case not found in test/workbench-claude-cancel-faults.test.ts: F10 a run abort that never happened",
    );
  });
  it.each(VERBS)("SL-BYTES-VERB %s: a row naming WorktreePreservationFailedResult with that verb and byte data is refused", verb => {
    const findings = planted(value => row(value, "EAT-R002").fixedForms?.push(`WorktreePreservationFailedResult ${verb} the edited bytes`));
    expect(findings).toContain("L-BYTES: EAT-R002.fixedForms[1] says WorktreePreservationFailedResult contains byte data");
  });
  it("SL-BYTES-QUIET: the committed wording, a path that names where the bytes stay, and a sentence break are quiet", () => {
    expect(planted(value => row(value, "EAT-R002").fixedForms?.push("WorktreePreservationFailedResult names the path where the edited bytes stay"))).toEqual([]);
    expect(planted(value => row(value, "EAT-R002").fixedForms?.push("WorktreePreservationFailedResult is typed. The kept worktree holds the bytes"))).toEqual([]);
  });
});

describe("wb-mit9: planted re-pin records each refused by their rule (EAT-R201 AC1, AC2)", { timeout: BUDGET }, () => {
  const cases: Array<[string, (value: RepinRecord) => void, string]> = [
    ["SL-RECORD-MACHINE-REF", value => value.pi.refs.splice(1, 1), "R-REFS: pi.refs holds 0 refs named workbench/implementation-program"],
    ["SL-RECORD-PACKAGE", value => {
      value.pi.refs[0].package.version = "";
    }, "R-REFS: master has no package name and version"],
    ["SL-RECORD-SHORT-SHA", value => {
      value.pi.refs[0].tree = value.pi.refs[0].tree.slice(0, 12);
    }, "R-SHA: record.pi.refs[0].tree is not a 40-hex id"],
    ["SL-RECORD-MERGE-BASE", value => {
      value.pi.mergeBase.commit = undefined;
    }, "R-REFS: pi.mergeBase has no commit and tree"],
    ["SL-RECORD-MW-PACKAGES", value => {
      value.mw.refs[0].packages = [];
    }, "R-REFS: mw main has no package names and versions"],
    ["SL-RECORD-DEFAULT-IS-MACHINE", value => {
      value.pi.certifiedDefault.commit = value.pi.refs[1].commit;
    }, "R-DEFAULT: the machine branch's unmerged tip is certified as the default branch"],
    ["SL-RECORD-DEFAULT-NAME", value => {
      value.pi.certifiedDefault.name = "workbench/implementation-program";
    }, "R-DEFAULT: certifiedDefault is not the default branch's own commit"],
    ["SL-RECORD-MERGED-FLAGS", value => {
      value.implicatedChanges[7].inDefault = false;
    }, `R-CHANGES: implicated {change 7} is merged but not on both branches`],
    ["SL-RECORD-MACHINE-FLAGS", value => {
      value.implicatedChanges[22].inDefault = true;
    }, `R-CHANGES: implicated {change 22} is machine-only but not on the machine branch alone`],
    ["SL-RECORD-PROPOSED-FLAGS", value => {
      value.implicatedChanges[2].inMachine = true;
    }, `R-CHANGES: implicated {change 2} is proposed but not on the default branch alone`],
    ["SL-RECORD-HISTORICAL-ROLE", value => {
      value.implicatedChanges[0].role = undefined;
    }, `R-CHANGES: implicated {change 0} is historical without a role historicalPins names`],
    ["SL-RECORD-UNKNOWN-CLASS", value => {
      value.implicatedChanges[7].class = "landed";
    }, `R-CHANGES: implicated {change 7} class landed is not one of the four`],
    ["SL-RECORD-TWICE", value => value.implicatedChanges.push(structuredClone(value.implicatedChanges[7])), `R-CHANGES: implicated {change 7} is listed twice`],
  ];
  it.each(cases)("%s: the planted record is refused", (_id, mutate, expected) => {
    const base = record();
    expect(repinFindings(base)).toEqual([]);
    expect(plantedRecord(mutate)).toContain(expected.replace(/\{change (\d+)\}/g, (_match, index: string) => base.implicatedChanges[Number(index)].commit));
  });
  it("SL-RECORD-CLASSES: the committed record marks merged, machine-only, historical and proposed changes", () => {
    expect([...new Set(record().implicatedChanges.map(change => change.class))].sort()).toEqual(["historical", "machine-only", "merged", "proposed"]);
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
