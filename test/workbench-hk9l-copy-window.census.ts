/**
 * wb-hk9l copy-window census (owner completion v8), judged in REPORT MODE plus one sidecar read.
 *
 * test/workbench-identity.test.ts judges every node:fs / node:fs/promises copy call it observes against the copy window a
 * budgeted row's own body opens, and records every VIOLATION (an S-call outside an open window) both in process and in the
 * sidecar .forge/hk9l-copy-violations.jsonl, written through the unmocked builtin fs and created empty when the file loads. Its
 * in-file judges run at every row boundary and once at file end, but a runner callback can still run after the last
 * in-file callback (an around-all teardown, a cleanup returned by a hook). This leg closes that gap from OUTSIDE the
 * runner's hook order: it runs in the census tier after the test step and reds on any sidecar line, naming it.
 *
 * This file's exact bytes are digest-pinned (sha256) by the identity emit row, so any edit here - a one-token neuter, a
 * shadowed judge, a deleted, renamed or re-pointed row - reds that pinned row in the test tier before these rows even run.
 * Pinned by title in the test tier through judge(REPORT, PINS): the budgeted PACKAGE_COPY_ROWS rows and the emit census row
 * of test/workbench-identity.test.ts (collected once, passed and asserting in the gate's own report), the budgeted rows also
 * read as plain report records - every title read from test/fixtures/hk9l-scan-roster.json (the
 * anchor the identity file also pins itself to; never a count or a local list), so the sidecar read below is a read of THIS
 * gate's identity run. The identity file in turn pins THIS file's shape (its
 * row titles, its sidecar row, its judge call) from the same roster. NOT pinned: anything the identity file does not claim.
 */
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { type CasePin, DEFAULT_GATE_TIER, DEFAULT_TIER_REPORT, judge } from "./helpers/census.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const REPORT = join(ROOT, DEFAULT_TIER_REPORT);
const SIDECAR = join(ROOT, ".forge", "hk9l-copy-violations.jsonl");
const IDENTITY_FILE = "test/workbench-identity.test.ts";
/** The out-of-file anchor shared with the identity file: the budgeted suite and rows, and the emit census row's title. */
const roster = JSON.parse(readFileSync(join(ROOT, "test", "fixtures", "hk9l-scan-roster.json"), "utf8")) as { packageCopySuite: string; packageCopyRows: string[]; emitRowTitle: string };
const SUITE = roster.packageCopySuite;

const pin = (title: string): CasePin => ({ file: IDENTITY_FILE, title, suite: [SUITE], tier: DEFAULT_GATE_TIER });

/**
 * The judge()-pinned rows, by the roster's exact titles (never a count or a local list): the budgeted rows (literal test
 * functions whose first statement opens the synchronous copy window) and the emit census row, the in-process judge that
 * passes only when every budgeted row ran under its own window, every admitted row is a budgeted row and no S-call ran
 * outside a window. The row below additionally reads the budgeted rows' collection and pass state straight from the report.
 */
const PINS: readonly CasePin[] = [...roster.packageCopyRows, roster.emitRowTitle].map(pin);
/** The budgeted rows, read from the report as plain records (collected once, passed) - a presence read, not a census-grade judge. */
const BUDGETED_TITLES: readonly string[] = roster.packageCopyRows;
type ReportCase = { readonly fullName?: string; readonly ancestorTitles?: readonly string[]; readonly title?: string; readonly status?: string };
type ReportFile = { readonly name?: string; readonly assertionResults?: readonly ReportCase[] };
// NOT pinned here: the budget row ("wb-hk9l: every package-copy row runs under the explicit file-local budget ...") takes the
// test context to walk the file's tasks, which report mode cannot classify; the emit census row above asserts from the
// identity file's own AST that the budget row is registered once in the suite, so its deletion still reds a pinned row.

describe("wb-hk9l copy window (v8): the identity file's judged rows ran, and its violation sidecar is empty", () => {
  it("each-liveness: the roster names the emit census row and the budgeted rows this leg reads", () => {
    expect(PINS).toHaveLength(roster.packageCopyRows.length + 1);
    expect(PINS[PINS.length - 1]?.title).toBe(roster.emitRowTitle);
    expect(BUDGETED_TITLES.length, "the roster carries the budgeted rows the identity file anchors to").toBeGreaterThan(0);
    expect(new Set(PINS.map(entry => `${entry.file}\u0000${entry.title}`)).size).toBe(PINS.length);
  });

  it("every pinned identity row was collected once, passed in the test tier's report, and asserts", () => {
    const verdicts = judge(REPORT, PINS);
    expect(verdicts).toHaveLength(PINS.length);
    const red = verdicts.filter(verdict => !verdict.ok || verdict.cases !== 1).map(verdict => `${verdict.pin.title} [${verdict.code}, cases ${verdict.cases}]: ${verdict.why}`);
    expect(red, "every pinned identity row collected once, passed and asserting").toEqual([]);
  });

  it("every budgeted row of the roster was collected once and passed in the test tier's report, under the budgeted suite", () => {
    const report = JSON.parse(readFileSync(REPORT, "utf8")) as { readonly testResults?: readonly ReportFile[] };
    const identity = (report.testResults ?? []).filter(file => (file.name ?? "").endsWith(IDENTITY_FILE));
    expect(identity, "the identity file appears exactly once in the report").toHaveLength(1);
    const cases = identity[0]?.assertionResults ?? [];
    const found = BUDGETED_TITLES.map(title => {
      const hits = cases.filter(entry => entry.title === title && (entry.ancestorTitles ?? []).includes(SUITE));
      return `${title}: ${hits.length} case(s), ${hits.map(entry => entry.status).join("+") || "absent"}`;
    });
    expect(found, "each budgeted row: exactly one case under the budgeted suite, passed").toEqual(BUDGETED_TITLES.map(title => `${title}: 1 case(s), passed`));
  });

  it("the violation sidecar exists (the identity run armed it through the real fs when it loaded) and is empty: no copy call ran outside a copy window, whatever callback made it", () => {
    expect(existsSync(SIDECAR), `${SIDECAR} is created empty when test/workbench-identity.test.ts loads; absent means that file never ran in this checkout's test step`).toBe(true);
    const lines = readFileSync(SIDECAR, "utf8").split("\n").filter(line => line.length > 0);
    expect(lines, "every S-call outside a copy window the identity run recorded, as JSON lines {call, chain, at}").toEqual([]);
  });

  it("liveness: a title the report cannot hold is red, naming it (an accept-all judge cannot pass here)", () => {
    const [verdict] = judge(REPORT, [pin("no such identity row")]);
    expect(verdict?.ok).toBe(false);
    expect(verdict?.code).toBe("absent");
    expect(verdict?.why).toContain("no such identity row");
  });
});
