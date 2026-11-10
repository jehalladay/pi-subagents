/**
 * wb-hhxs (the structural-exit child of wb-mit9, ruling R-B759): the tested forms of the historical requirement status ledger
 * (EAT-R202 AC1, "a tested class names its tested forms"), judged in wb-u62 REPORT MODE over the gate's own test report, and
 * the cases test/workbench-mechanical-status-ledger.test.ts registers, read from the same report.
 *
 * This file is a census-tier leg (vitest.census.config.ts, include test/**\/*.census.ts): it reads vitest's JSON report of
 * the gate's test step (DEFAULT_TIER_REPORT, written by `npm run test`) and runs no case of any subject; the .census.ts
 * suffix keeps it out of the report it reads. The forms come from test/fixtures/mechanical-historical-status-ledger.json:
 * each is {file, suite, title}, a case title exactly as registered under its describe path, owned by a row or by the F10
 * control.
 *
 * PINNED READER SET, every case in this file (the delivery note carries the measured counts of each falsifier):
 * - TF-SHAPE (frozen shape, rule 16): FORMS holds, per row that names tested forms and for the F10 control, the number of
 *   forms the ledger names, and 293 forms in all. Red under: a form deleted from a row (CT1, CT1b), a row's forms deleted
 *   (CT4).
 * - TF-JUDGE: judge() reads every tested form but the three of R-HX-CONTEXT collected once, passed in the test tier's report
 *   and asserting (ok, one case each, the helper's three legs). Red under, in a subject: a pinned case in a block comment,
 *   given a skip modifier, skipIf(true), renamed, registered twice, or its describe given a skip modifier; the subject
 *   excluded from the default tier; and in the ledger a form's title or suite path edited.
 * - TF-REPORT (the anchor outside this file's literals): for every tested form the report holds one entry for its file and
 *   lists its title under exactly its suite path once, with status passed (the three R-HX-CONTEXT forms included). Red
 *   under the same subject edits as TF-JUDGE and under the subject excluded.
 * - TF-RESIDUAL (quiet row of R-HX-CONTEXT): judge() reads the three EAT-R057 forms of
 *   test/workbench-hx-task-scope-probe.test.ts context-unknown, each verdict naming that file's beforeEach and
 *   task.file.tasks. Red when that verdict changes (the hook moved or removed, or the helper's reading changed), so the
 *   residual is revisited rather than silently kept.
 * - TF-LIVENESS: judge() reads a made-up title under the F10 suite of test/workbench-claude-cancel-faults.test.ts absent,
 *   naming it: the judge is not accept-all.
 * - TF-SUITE-IDS: the report holds one entry for test/workbench-mechanical-status-ledger.test.ts, every case it lists
 *   there is passed and its title starts with an SL id, and the set of those ids is the set the suite's PINNED READER SET
 *   lines name, each named once. Red under, in the suite: a case in a block comment, given a skip modifier, renamed, or a
 *   header line naming a case the suite lacks.
 *
 * RESIDUAL R-HX-CONTEXT (named family, pinned quiet row TF-RESIDUAL): test/workbench-hx-task-scope-probe.test.ts reads its
 * own collected task tree in a file-level beforeEach (task.file.tasks handed to a call), which report mode cannot bound, so
 * judge() fails closed on every case of that file. For EAT-R057's three forms this census claims only what TF-REPORT reads
 * (registered under their suite path, passed); their inversion and assertion legs are NOT CLAIMED by this census.
 *
 * NOT CLAIMED by this census: what any tested form asserts (an edit that keeps a case registered, passing and asserting
 * while changing what it checks stays green here); that a row's forms cover its requirement, or are every case that tests
 * it (the form list is the ledger's reading of the receipts and the subject files, and no source outside this census
 * enumerates it: a form removed from the ledger and from every literal of this census and of the suite together stays
 * green, measured at cut time as the seat's CT6-FORM probe); any tier but the default test
 * tier; the cases of the suite beyond their ids and statuses; and every mode the shared helper names as its own residual
 * (test/helpers/census.ts, the NAMED RESIDUALS in its header), which bounds each judge() reading here.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { type CasePin, DEFAULT_GATE_TIER, DEFAULT_TIER_REPORT, judge, type PinVerdict } from "./helpers/census.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const REPORT = join(ROOT, DEFAULT_TIER_REPORT);
/** judge() reads each subject's whole import closure: a loaded gate host needs far more than vitest's 5000 ms default. */
const JUDGE_TIMEOUT = 240_000;
const LEDGER = "test/fixtures/mechanical-historical-status-ledger.json";
const SUITE = "test/workbench-mechanical-status-ledger.test.ts";
/** R-HX-CONTEXT: the subject whose file-level beforeEach report mode cannot bound, and the row whose forms it holds. */
const HX_SUBJECT = "test/workbench-hx-task-scope-probe.test.ts";
const HX_ROW = "EAT-R057";

interface Form {
  readonly file: string;
  readonly suite: readonly string[];
  readonly title: string;
}
interface Owner {
  readonly id: string;
  readonly testedForms: readonly Form[];
}
interface LedgerFile {
  readonly rows: readonly Owner[];
  readonly controls: readonly Owner[];
}
interface Judged {
  readonly owner: string;
  readonly form: Form;
}

const ledger = JSON.parse(readFileSync(join(ROOT, LEDGER), "utf8")) as LedgerFile;
/** Every tested form of the ledger, its owner a row id or "control <id>", in ledger order. */
const JUDGED: readonly Judged[] = [
  ...ledger.rows.flatMap(row => row.testedForms.map(form => ({ owner: row.id, form }))),
  ...ledger.controls.flatMap(control => control.testedForms.map(form => ({ owner: `control ${control.id}`, form }))),
];
const pinOf = (form: Form): CasePin => ({ file: form.file, title: form.title, suite: [...form.suite], tier: DEFAULT_GATE_TIER });
const residual = (item: Judged): boolean => item.owner === HX_ROW && item.form.file === HX_SUBJECT;

/** TF-SHAPE: the pinned set's frozen shape at this cut (rule 16): per owner its number of tested forms, in ledger order. */
const FORMS = [
  "EAT-R001:2",
  "EAT-R002:4",
  "EAT-R003:10",
  "EAT-R012:6",
  "EAT-R013:4",
  "EAT-R014:4",
  "EAT-R015:2",
  "EAT-R016:2",
  "EAT-R017:1",
  "EAT-R018:1",
  "EAT-R019:1",
  "EAT-R020:8",
  "EAT-R021:4",
  "EAT-R057:3",
  "EAT-R073:8",
  "EAT-R082:29",
  "EAT-R083:22",
  "EAT-R084:27",
  "EAT-R085:21",
  "EAT-R086:30",
  "EAT-R087:10",
  "EAT-R094:1",
  "EAT-R095:1",
  "EAT-R096:1",
  "EAT-R097:1",
  "EAT-R098:1",
  "EAT-R099:1",
  "EAT-R100:1",
  "EAT-R101:1",
  "EAT-R102:1",
  "EAT-R103:1",
  "EAT-R104:1",
  "EAT-R105:1",
  "EAT-R106:1",
  "EAT-R107:1",
  "EAT-R108:1",
  "EAT-R109:1",
  "EAT-R110:1",
  "EAT-R111:1",
  "EAT-R112:1",
  "EAT-R113:1",
  "EAT-R114:1",
  "EAT-R115:1",
  "EAT-R116:1",
  "EAT-R117:1",
  "EAT-R118:1",
  "EAT-R119:1",
  "EAT-R120:1",
  "EAT-R121:1",
  "EAT-R122:1",
  "EAT-R123:1",
  "EAT-R124:1",
  "EAT-R125:1",
  "EAT-R126:1",
  "EAT-R127:1",
  "EAT-R128:1",
  "EAT-R129:1",
  "EAT-R130:1",
  "EAT-R131:1",
  "EAT-R132:1",
  "EAT-R133:1",
  "EAT-R134:1",
  "EAT-R135:1",
  "EAT-R136:1",
  "EAT-R137:1",
  "EAT-R138:1",
  "EAT-R139:1",
  "EAT-R140:1",
  "EAT-R141:1",
  "EAT-R142:1",
  "EAT-R143:1",
  "EAT-R144:5",
  "EAT-R146:6",
  "EAT-R161:10",
  "EAT-R162:21",
  "control F10:2",
];

interface ReportCase {
  readonly title?: string;
  readonly ancestorTitles?: readonly string[];
  readonly status?: string;
}
interface ReportFile {
  readonly name?: string;
  readonly assertionResults?: readonly ReportCase[];
}
const report = (): readonly ReportFile[] => (JSON.parse(readFileSync(REPORT, "utf8")) as { readonly testResults?: readonly ReportFile[] }).testResults ?? [];
const recordsOf = (files: readonly ReportFile[], file: string): readonly ReportFile[] => files.filter(entry => (entry.name ?? "").endsWith(`/${file}`));

/** Each verdict that is not ok or not collected exactly once, with the owner, the title and the cause the judge names. */
function refusals(items: readonly Judged[], verdicts: readonly PinVerdict[]): string[] {
  return verdicts.flatMap((verdict, index) => (verdict.ok && verdict.cases === 1 ? [] : [`${items[index]?.owner} ${verdict.pin.title} [${verdict.code}, cases ${verdict.cases}]: ${verdict.why}`]));
}

/** The case ids the suite's PINNED READER SET lines name (the text before each line's first colon), in line order. */
function claimedIds(): string[] {
  const source = readFileSync(join(ROOT, SUITE), "utf8");
  return source
    .slice(0, source.indexOf("*/"))
    .split("\n")
    .filter(line => line.startsWith(" *  - SL-"))
    .flatMap(line => line.slice(" *  - ".length, line.indexOf(":")).split(", "));
}

describe("wb-hhxs EAT-R202 AC1: the ledger's tested forms judged from the gate's own test report, and the SL cases of its suite", () => {
  it("TF-SHAPE frozen shape: per row naming tested forms and for the F10 control, the number of tested forms; 293 in all", () => {
    const owners = [...new Set(JUDGED.map(item => item.owner))];
    expect(owners.map(owner => `${owner}:${JUDGED.filter(item => item.owner === owner).length}`)).toEqual(FORMS);
    expect(JUDGED).toHaveLength(293);
  });

  it("TF-JUDGE judge() reads every tested form but the three of R-HX-CONTEXT collected once, passed in the test tier's report and asserting", { timeout: JUDGE_TIMEOUT }, () => {
    const items = JUDGED.filter(item => !residual(item));
    const verdicts = judge(REPORT, items.map(item => pinOf(item.form)));
    expect({ judged: verdicts.length, refused: refusals(items, verdicts) }).toStrictEqual({ judged: 290, refused: [] });
  });

  it("TF-REPORT the report holds one entry for each form's file and lists each form's title under exactly its suite path once, passed", () => {
    const files = report();
    const misses = JUDGED.flatMap(item => {
      const records = recordsOf(files, item.form.file);
      if (records.length !== 1) return [`${item.owner} ${item.form.file}: ${records.length} report entries`];
      const listed = (records[0]?.assertionResults ?? []).filter(entry => entry.title === item.form.title && JSON.stringify(entry.ancestorTitles ?? []) === JSON.stringify(item.form.suite));
      const statuses = listed.map(entry => entry.status ?? "<no status>");
      return statuses.length === 1 && statuses[0] === "passed" ? [] : [`${item.owner} ${item.form.title}: ${JSON.stringify(statuses)}`];
    });
    expect({ forms: JUDGED.length, misses }).toStrictEqual({ forms: 293, misses: [] });
  });

  it("TF-RESIDUAL R-HX-CONTEXT quiet row: judge() reads the three EAT-R057 forms context-unknown, naming the file's beforeEach and task.file.tasks", { timeout: JUDGE_TIMEOUT }, () => {
    const items = JUDGED.filter(residual);
    const verdicts = judge(REPORT, items.map(item => pinOf(item.form)));
    expect(verdicts.map(verdict => [verdict.code, verdict.why.includes("beforeEach") && verdict.why.includes("task.file.tasks")])).toStrictEqual(items.map(() => ["context-unknown", true]));
    expect(items).toHaveLength(3);
  });

  it("TF-LIVENESS judge() reads a made-up title in the F10 suite red, as absent, naming it (an accept-all judge cannot pass here)", { timeout: JUDGE_TIMEOUT }, () => {
    const suite = ["an abort that lands during the host's pre-dispatch await (wb-a2g.5, live finding init-after-abort)"];
    const [verdict] = judge(REPORT, [{ file: "test/workbench-claude-cancel-faults.test.ts", title: "F10 no such tested form", suite, tier: DEFAULT_GATE_TIER }]);
    expect({ ok: verdict?.ok, code: verdict?.code, named: verdict?.why.includes("F10 no such tested form") }).toStrictEqual({ ok: false, code: "absent", named: true });
  });

  it("TF-SUITE-IDS the report lists the suite once, every case passed and titled by an SL id, and those ids are the ones its PINNED READER SET lines name, each once", () => {
    const records = recordsOf(report(), SUITE);
    const cases = records[0]?.assertionResults ?? [];
    const ids = cases.map(entry => /^(SL-[A-Z0-9-]+)[ :]/.exec(entry.title ?? "")?.[1] ?? `<untitled: ${entry.title}>`);
    expect({
      recorded: records.length,
      notPassed: cases.filter(entry => entry.status !== "passed").map(entry => entry.title),
      ids: [...new Set(ids)].sort(),
    }).toStrictEqual({ recorded: 1, notPassed: [], ids: [...new Set(claimedIds())].sort() });
    expect(claimedIds()).toHaveLength(new Set(claimedIds()).size);
  });
});
