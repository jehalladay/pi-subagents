/**
 * wb-9btr cut #5 (EAT-R326): the RUN PIN of test/workflow-compact-tool-description.test.ts, in the form of the run pin
 * test/workflow-script-syntax-refusal.census.ts. It is a census-tier leg (vitest.census.config.ts, include test/**\/*.census.ts): it
 * reads vitest's JSON report of the gate's own test step (DEFAULT_TIER_REPORT, written by `npm run test`) and runs no case of the
 * census file, and the .census.ts suffix keeps it out of the report it reads. It is that file's anchor outside itself for the one
 * mode the file's own cases cannot see: every registration of the file skipped at collection (a skipped wrapper that reaches C0
 * too), when vitest runs no case and no hook of the file and the run still exits 0.
 *
 * PINNED READER SET, this file's one case: RUN-REPORT reads the report's entries whose path ends with the census file's. There must
 * be exactly one, with status passed, and the cases it lists must be exactly the nine titles frozen below, each under its describe
 * path (the eight pinned cases under SUITE, C0 at file scope) and each with status passed. The census file's C0 holds this file's
 * sha256, so this file is never edited or deleted alone.
 * NOT CLAIMED by this run pin: what any case asserts; a case inverted with the fails option (the report records it as passed, and C0
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
const CENSUS = "test/workflow-compact-tool-description.test.ts";
/** The census file's one describe, holding its eight pinned cases; C0 sits at file scope, outside it. */
const SUITE = "wb-9btr EAT-R326: a compact SubagentWorkflow description under toolDescriptionMode compact";
/** The census file's registered tests, frozen here in registration order: each describe path and title. */
const CASES: readonly (readonly [readonly string[], string])[] = [
  [[SUITE], "R326-B1 under toolDescriptionMode compact the registered SubagentWorkflow description is compactWorkflowToolDescription and at most 4096 bytes"],
  [[SUITE], "R326-B2 under custom with a project template, full and an absent setting the registered SubagentWorkflow description is the full one with the custom Agent description's agent list in its placeholder"],
  [[SUITE], "R326-A1 the compact Globals list has one bullet per name the worker's sandbox setup installs, and no other bullet"],
  [[SUITE], "R326-A2 the compact agent() bullet lists every accepted option and no other, the effort levels in order and every resume exclusion, and writes no rejected opts.<name>"],
  [[SUITE], "R326-C1 the compact Caps line quotes the concurrency formula, the agent, item and nested caps and the registered script maxLength"],
  [[SUITE], "R326-E1 the compact description holds one example script, and it runs to completion through runWorkflow with a stub host and two files"],
  [[SUITE], "R326-P1 the thirteen pattern lines of the full description are left out of the compact one and kept in docs/workflows.md's Orchestration patterns section"],
  [[SUITE], "R326-R1 README.md's toolDescriptionMode paragraph is the re-trued line, and no README line keeps the Agent-only wording"],
  [[], "C0 census over ROWS, registered last at file scope: the header's claims block is exactly the row sentences, each row's sentence cites exactly its pins, the case ids src/workflow/tool-description.ts spells are exactly that set, every other test vitest registered here is one pinned case that ran before C0 in run mode and not inverted, and the run pin's bytes are held"],
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

describe("wb-9btr run pin: test/workflow-compact-tool-description.test.ts as the gate's own test report records it", () => {
  it("RUN-REPORT the report records the census file once, passed, with exactly its nine frozen titles under their describe paths, each passed", () => {
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
