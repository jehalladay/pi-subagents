/**
 * wb-2ukh [MNI-2026-11-09 P03] cut #2: the chain suite's pinned reader set, judged in wb-u62 REPORT MODE over the gate's own
 * test report (refusal #1, U1 and F2).
 *
 * The subject is test/workbench-function-dispatch-chain.test.ts. This file is a census-tier leg (vitest.census.config.ts,
 * include test/**\/*.census.ts): it reads vitest's JSON report of the gate's test step (DEFAULT_TIER_REPORT, written by
 * `npm run test`) and runs no case of the subject; the .census.ts suffix keeps it out of the report it reads. No case here
 * reads the subject's text; judge() (test/helpers/census.ts) reads the subject's source for its own legs. GROUPS below holds
 * the subject's pin set a second time, outside the subject, so a pin removed from the subject's table, its frozen shape, its
 * header and its case together still reds here (the coordinated pin-level hollow of refusal #1, F2).
 *
 * PINNED READER SET, every case in this file, with the independent falsifiers measured red against it at the cut (one edit
 * each on a throwaway copy, restored byte-identical; the delivery note carries the counts):
 * - LEG-SHAPE (frozen shape): GROUPS holds the eight requirement groups EAT-R227..EAT-R234 with 11, 6, 7, 5, 5, 5, 5 and 12
 *   cases and the census group CENSUS with its one case, in that order. Red under: a case deleted from a group (CT1), a group
 *   deleted (CT4).
 * - LEG-REPORT (the anchor outside this file's literals): the report holds exactly one file entry for the subject, and its
 *   cases, read as "<describe id> > <case id>" in report order (an id is the text of a title before its first colon), are
 *   GROUPS's, each with status passed. Red under, in the subject: a skip modifier on a group's describe, a case's options
 *   { skip: true }, a case calling its context's skip function, a case inside a block comment, a group's options
 *   { skip: true }, a skipIf(true) case, a runIf(false) case, a todo case, and the subject excluded from the default tier; in
 *   this file: a case deleted from a group with the frozen shape kept (CT1) or edited to match (CT5), a case swapped for
 *   another (CT3), a group deleted (CT4), and a case removed from every literal here (CT6).
 * - LEG-JUDGE: judge() reads every case of GROUPS, by its exact title in the report under its describe path, collected once,
 *   passed in the test tier's report and asserting (the helper's three legs), and reads one made-up title in the EAT-R227
 *   group, R227-NO-SUCH-CASE, red as absent (an accept-all judge cannot pass here). Red under the LEG-REPORT members in the
 *   subject, and under a case's options { fails: true } with its first assertion inverted, which the report does not record
 *   and judge()'s source leg reads.
 * Green under a case title on its own line and a case registered through test(): the report holds the same titles.
 *
 * NOT CLAIMED by this census: what any case asserts (an edit that keeps a case registered, passing and asserting while
 * changing what it checks stays green here); any tier but the default test tier; and every mode the shared helper names as
 * its own residual (test/helpers/census.ts, the NAMED RESIDUALS in its header), which bounds each judge() reading here.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { type CasePin, DEFAULT_GATE_TIER, DEFAULT_TIER_REPORT, judge, type PinVerdict } from "./helpers/census.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const REPORT = join(ROOT, DEFAULT_TIER_REPORT);
/** judge() reads the subject's whole import closure: a loaded gate host needs far more than vitest's 5000 ms default. */
const JUDGE_TIMEOUT = 240_000;

/** The subject file; this file never edits or runs it. */
const SUBJECT = "test/workbench-function-dispatch-chain.test.ts";

/** The judged set, frozen here: each describe group's id and its case ids, in the subject's registration order. */
const GROUPS: readonly (readonly [string, readonly string[]])[] = [
  ["EAT-R227", ["R227-HELD", "R227-NO-SESSION", "R227-MISSING", "R227-REVOKED-PARKED", "R227-REQUEST-ONLY", "R227-INDEPENDENT", "R227-NOT-FORWARDED", "R227-UNKNOWN-CONFIG", "R227-ONE-ENTRY-READ", "R227-SAME-ENTRY-READ", "R227-AUTHORITY-FIRST"]],
  ["EAT-R228", ["R228-UNCHANGED", "R228-PARKED-CHANGES", "R228-REQUEST-IDENTITY", "R228-ENTRY-FIRST", "R228-ENTRY-COPIED", "R228-ACCESSOR-IDENTITY"]],
  ["EAT-R229", ["R229-CLEAN", "R229-SIBLING", "R229-SYMLINK-ESCAPE", "R229-DIRTY", "R229-UNMERGED", "R229-SUBMODULE", "R229-NO-WRITE-POLICY"]],
  ["EAT-R230", ["R230-GIT-DIR", "R230-HEAD-OBJECTS", "R230-INDEX-ENTRY", "R230-TOPLEVEL", "R230-FORGED-INPUT"]],
  ["EAT-R231", ["R231-BASIS", "R231-HEAD-MOVED", "R231-MANIFEST-BYTES", "R231-MANIFEST-PATH", "R231-MANIFEST-REMOVED"]],
  ["EAT-R232", ["R232-SAME-ROOT", "R232-ALIAS", "R232-INDEPENDENT", "R232-RELEASED", "R232-UNCERTAIN-RELEASES"]],
  ["EAT-R233", ["R233-CURRENT", "R233-ENTRY-FORMS", "R233-REQUEST-MINTED", "R233-REPLACED-PARKED", "R233-OTHER-OPERATOR"]],
  [
    "EAT-R234",
    [
      "R234-ONE-DISPATCH",
      "R234-NO-AWAIT",
      "R234-SINGLE-FAULTS",
      "R234-PACKAGE",
      "R234-RECEIPT",
      "R234-UNADOPTED",
      "R234-FIXED-REASONS",
      "R234-ONE-CALL-REJECTS",
      "R234-ONE-CALL-UNDEFINED",
      "R234-NO-LATE-EFFECT",
      "R234-PACKAGE-NOT-STRING",
      "R234-UNADOPTED-ORDER",
    ],
  ],
  ["CENSUS", ["CHAIN-CENSUS"]],
];
/** A made-up case of the EAT-R227 group: no cut registers it. */
const NO_SUCH_CASE = "R227-NO-SUCH-CASE: a title the chain suite never registers";

interface ReportCase {
  readonly title?: string;
  readonly ancestorTitles?: readonly string[];
  readonly status?: string;
}
interface ReportFile {
  readonly name?: string;
  readonly assertionResults?: readonly ReportCase[];
}

/** A title's id: the text before its first colon (a title without one reads whole). */
const idOf = (title: string): string => (title.includes(":") ? title.slice(0, title.indexOf(":")) : title);
/** The report's records of the subject: every file entry whose path ends with the subject's. */
function subjectRecords(): readonly ReportFile[] {
  const report = JSON.parse(readFileSync(REPORT, "utf8")) as { readonly testResults?: readonly ReportFile[] };
  return (report.testResults ?? []).filter(file => (file.name ?? "").endsWith(`/${SUBJECT}`));
}
/** Where a report case sits: "<describe id> > ... > <case id>". */
const placeOf = (entry: ReportCase): string => [...(entry.ancestorTitles ?? []), entry.title ?? "<untitled>"].map(idOf).join(" > ");
/** Each verdict that is not ok, or not collected exactly once, with the title and the cause the judge names. */
function refusals(verdicts: readonly PinVerdict[]): string[] {
  return verdicts.filter(verdict => !verdict.ok || verdict.cases !== 1).map(verdict => `${verdict.pin.title} [${verdict.code}, cases ${verdict.cases}]: ${verdict.why}`);
}

describe("wb-2ukh chain suite: its pinned cases, judged from the gate's own test report", () => {
  it("LEG-SHAPE frozen shape: the eight requirement groups with 11, 6, 7, 5, 5, 5, 5 and 12 cases, then the census group's one case", () => {
    expect(GROUPS.map(([id, cases]) => `${id}:${cases.length}`)).toEqual(["EAT-R227:11", "EAT-R228:6", "EAT-R229:7", "EAT-R230:5", "EAT-R231:5", "EAT-R232:5", "EAT-R233:5", "EAT-R234:12", "CENSUS:1"]);
  });

  it("LEG-REPORT the report holds one entry for the subject, whose cases, by describe id and case id in report order, are GROUPS's, each passed", () => {
    const records = subjectRecords();
    const cases = records[0]?.assertionResults ?? [];
    expect({ recorded: records.length, places: cases.map(placeOf), statuses: cases.map(entry => entry.status ?? "<no status>") }).toStrictEqual({
      recorded: 1,
      places: GROUPS.flatMap(([id, pins]) => pins.map(pin => `${id} > ${pin}`)),
      statuses: GROUPS.flatMap(([, pins]) => pins.map(() => "passed")),
    });
  });

  it("LEG-JUDGE judge() reads every case of GROUPS collected once, passed in the test tier's report and asserting, and a made-up EAT-R227 title absent", { timeout: JUDGE_TIMEOUT }, () => {
    const cases = subjectRecords()[0]?.assertionResults ?? [];
    const pins: CasePin[] = GROUPS.flatMap(([id, ids]) =>
      ids.map(caseId => {
        const entry = cases.find(candidate => idOf(candidate.title ?? "") === caseId && idOf(candidate.ancestorTitles?.[0] ?? "") === id);
        return { file: SUBJECT, title: entry?.title ?? `${caseId}: <no such case in the report>`, suite: entry?.ancestorTitles ?? [], tier: DEFAULT_GATE_TIER };
      }),
    );
    const group = cases.find(candidate => idOf(candidate.ancestorTitles?.[0] ?? "") === "EAT-R227")?.ancestorTitles ?? [];
    const verdicts = judge(REPORT, [...pins, { file: SUBJECT, title: NO_SUCH_CASE, suite: group, tier: DEFAULT_GATE_TIER }]);
    const liveness = verdicts[pins.length];
    expect({
      judged: verdicts.length,
      refused: refusals(verdicts.slice(0, pins.length)),
      codes: verdicts.slice(0, pins.length).map(verdict => `${verdict.code}:${verdict.cases}`),
      liveness: { ok: liveness?.ok, code: liveness?.code, named: liveness?.why.includes(NO_SUCH_CASE) },
    }).toStrictEqual({
      judged: pins.length + 1,
      refused: [],
      codes: pins.map(() => "ok:1"),
      liveness: { ok: false, code: "absent", named: true },
    });
  });
});
