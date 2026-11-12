/**
 * wb-9btr cut #2, refusal #1's U1 ("Fail closed on a file-level skip"): the RUN PIN of test/workflow-script-syntax-refusal.test.ts.
 * Cut #3 (refusal #2) narrows R0's title words, so R0's frozen title below moves with them.
 * It is a census-tier leg (vitest.census.config.ts, include test/**\/*.census.ts): it reads vitest's JSON report of the gate's own
 * test step (DEFAULT_TIER_REPORT, written by `npm run test`) and runs no case of the census file, and the .census.ts suffix keeps
 * it out of the report it reads. It is that file's anchor outside itself for the one mode the file's own cases cannot see: every
 * registration of the file skipped at collection (a skipped wrapper that reaches R0 too), when vitest runs no case and no hook of
 * the file and the run still exits 0.
 *
 * PINNED READER SET, this file's one case: RUN-REPORT reads the report's entries whose path ends with the census file's. There must
 * be exactly one, with status passed, and the cases it lists must be exactly the 13 titles frozen below, each under its describe
 * path (the twelve pinned cases under SUITE, R0 at file scope) and each with status passed. The census file's R0 holds this file's
 * sha256, so this file is never edited or deleted alone. Falsifiers measured red at cut time (the delivery note carries the counts):
 * every registration of the census file skipped at collection, a pinned case skipped or deleted, R0 skipped, and the census file's
 * file-end judge failing.
 * NOT CLAIMED by this run pin: what any case asserts; a case inverted with the fails option (the report records it as passed, and R0
 * reads the inversion from the task tree); any tier but the default test tier; a run of the census file outside the complete gate's
 * census step.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { DEFAULT_TIER_REPORT } from "./helpers/census.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const REPORT = join(ROOT, DEFAULT_TIER_REPORT);
/** The census file this run pin reads the report for. */
const CENSUS = "test/workflow-script-syntax-refusal.test.ts";
/** The census file's one describe, holding its twelve pinned cases; R0 sits at file scope, outside it. */
const SUITE = "wb-9btr EAT-R323 + EAT-R322 (2)(3): a script that does not compile is refused at launch, located, and hinted";
/** The census file's registered tests, frozen here in registration order: each describe path and title. */
const CASES: readonly (readonly [readonly string[], string])[] = [
  [[SUITE], "R323-S1 the check locates each probed syntax mistake at the author's line and column and names it in the workflow.js:<line>:<column> form"],
  [[SUITE], "R323-S2 the check never runs the body: a host-global write and an endless loop stay unexecuted"],
  [[SUITE], "R323-S3 the check compiles the program the worker compiles: the same wrapper line, prelude and offset, and the same verdicts"],
  [[SUITE], "R323-E1 workflow_execute refuses with definition-syntax-invalid and the location in both hostModes; neither launcher runs, and a compiling definition still launches"],
  [[SUITE], "R323-E2 the registered workflow_execute refuses the saved broken definition synchronously: no run is persisted or notified"],
  [[SUITE], "R323-W1 the registered SubagentWorkflow refuses the broken script with its location before scheduling, and a compiling script still starts"],
  [[SUITE], "R323-D1 both refusal texts carry the author's meta name and V8's message only through the shared sanitizer's display form"],
  [[SUITE], "R322-V1 the registered workflow_validate locates the broken saved source where workflow_execute's refusal does"],
  [[SUITE], "R322-V2 for every syntax case, the designer's SCRIPT_SYNTAX diagnostic carries the check's line, column and message, and the workflow_validate reply item buildWorkflowValidateReply makes from it carries the line and column"],
  [[SUITE], "R322-H1 a ReferenceError on require, process, fetch or setTimeout, a dynamic import and an import statement end with the no-Node-APIs hint"],
  [[SUITE], "R322-H2 a ReferenceError on another name, a TypeError and a thrown Error quoting the Node wording carry no hint"],
  [[SUITE], "R322-H3 node() on a host without a capability registry names workbench.workflowAgentBackend: \"claude\""],
  [[], "R0 census over ROWS, registered last at file scope: the header's claims block is exactly the row sentences, each row pins its cases, the src comments cite exactly that set, every other test vitest registered here is one pinned case that ran before R0 in run mode and not inverted, SYNTAX_CASES holds the six shapes the receipt's rendered SYNTAX_CASES item lists and every each-shape case reached them, and the run pin's bytes are held"],
];

interface ReportCase {
  readonly title?: string;
  readonly ancestorTitles?: readonly string[];
  readonly status?: string;
}
interface ReportFile {
  readonly name?: string;
  readonly status?: string;
  readonly assertionResults?: readonly ReportCase[];
}

/** The report's records of the census file: every file entry whose path ends with the census file's. */
function censusRecords(): readonly ReportFile[] {
  const report = JSON.parse(readFileSync(REPORT, "utf8")) as { readonly testResults?: readonly ReportFile[] };
  return (report.testResults ?? []).filter(file => (file.name ?? "").endsWith(`/${CENSUS}`));
}

describe("wb-9btr run pin: test/workflow-script-syntax-refusal.test.ts as the gate's own test report records it", () => {
  it("RUN-REPORT the report records the census file once, passed, with exactly its 13 frozen titles under their describe paths, each passed", () => {
    const records = censusRecords();
    const cases = records[0]?.assertionResults ?? [];
    expect({
      recorded: records.length,
      file: records[0]?.status ?? "<no status>",
      cases: cases.map(entry => [entry.ancestorTitles ?? [], entry.title ?? "<untitled>", entry.status ?? "<no status>"]),
    }).toStrictEqual({
      recorded: 1,
      file: "passed",
      cases: CASES.map(([path, title]) => [[...path], title, "passed"]),
    });
  });
});
