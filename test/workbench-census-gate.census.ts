/**
 * wb-nl8: the census tier's first leg, and the gate's end-to-end proof (owner ruling u62 R1 = (b): report-driven).
 *
 * The default gate's test step (forge.toml test -> npm run test) writes vitest's own JSON report to
 * .forge/vitest-report.json (DEFAULT_TIER_REPORT); the census step (forge.toml census, listed after test and
 * consuming it) runs this tier (vitest.census.config.ts, include test/**\/*.census.ts) and judges that report in
 * REPORT MODE through the landed judge(): nothing is re-executed here, and the .census.ts suffix keeps this file
 * outside the default include, so the report can never record the judging file. NON-CLAIM: the census tier itself
 * is never vouched (its own [build.commands.census] table carries after and consumes, outside the closed step-key
 * read); the vouch covers the test tier the report came from, and a pin of any other tier is refused by judge().
 */
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { type CasePin, DEFAULT_GATE_TIER, DEFAULT_TIER_REPORT, judge } from "./helpers/census.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const REPORT = join(ROOT, DEFAULT_TIER_REPORT);
const readRepo = (path: string): string => readFileSync(join(ROOT, path), "utf8");
/** The one case the helper suite's FIND-1 anchor file holds; its report-mode twin is the helper suite's p-smoke row. */
const SMOKE: CasePin = { file: "test/workbench-census-helper-smoke.test.ts", title: "FIND-1 smoke anchor: the helper judges this case on the real default gate", tier: DEFAULT_GATE_TIER };
const GATE_LINE = 'gate = ["lint", "typing", "build", "test", "census", "workbench-shell", "package-smoke"]';
const CENSUS_BLOCK = '[build.commands.census]\ncommand = "npm run test:census"\ntimeout = 300\nafter = ["test"]\nconsumes = ["test"]\n';
const TEST_SCRIPT = "vitest run --reporter=default --reporter=json --outputFile=.forge/vitest-report.json --includeTaskLocation --expect.requireAssertions";
const PRETEST = "node -e \"require('fs').rmSync('.forge/vitest-report.json',{force:true})\"";

describe("census gate step (wb-nl8): the gate's own report, judged without re-execution", () => {
  it("the test step wrote vitest's JSON report: numTotalTests and per-file testResults", () => {
    expect(existsSync(REPORT), `${DEFAULT_TIER_REPORT} is written by the gate's test step (npm run test) and only judged here; run that step first`).toBe(true);
    const report: unknown = JSON.parse(readFileSync(REPORT, "utf8"));
    expect(report).toMatchObject({ numTotalTests: expect.any(Number), testResults: expect.any(Array) });
  });

  it("FIND-1: the smoke anchor is collected once, passed and asserting in the test tier's report", () => {
    const [verdict] = judge(REPORT, [SMOKE]);
    expect(verdict?.ok, verdict?.why).toBe(true);
    expect(verdict?.cases).toBe(1);
    expect(verdict?.why).toMatch(/collected once, passed in the test report, asserts/);
  });

  it("liveness: a title the report cannot hold is red, naming it (an accept-all judge cannot pass here)", () => {
    const [verdict] = judge(REPORT, [{ ...SMOKE, title: "no such case" }]);
    expect(verdict?.ok).toBe(false);
    expect(verdict?.code).toBe("absent");
    expect(verdict?.why).toContain("no such case");
  });
});

describe("census gate step (wb-nl8): wiring", () => {
  it("forge.toml lists census immediately after test in its one gate line and ends with the one census step, after and consuming test", () => {
    const toml = readRepo("forge.toml");
    expect(toml).toContain(`${GATE_LINE}\n`);
    expect(toml.match(/^gate = /gm)).toHaveLength(1);
    const steps = (/^gate = \[(.*)\]$/m.exec(toml)?.[1] ?? "").split(", ").map(step => JSON.parse(step) as string);
    expect(steps.indexOf("census")).toBe(steps.indexOf("test") + 1);
    expect(toml.endsWith(`\n${CENSUS_BLOCK}`)).toBe(true);
    expect(toml.match(/^\[build\.commands\.census\]$/gm)).toHaveLength(1);
    expect(toml).toContain('\ntest = "npm run test"\n');
  });

  it("package.json carries the report-emitting test script, its pretest rotation hook and the census tier script, each exact", () => {
    const pkg = JSON.parse(readRepo("package.json")) as { scripts?: Record<string, unknown> };
    expect(pkg.scripts?.test).toBe(TEST_SCRIPT);
    expect(pkg.scripts?.pretest).toBe(PRETEST);
    expect(pkg.scripts?.["test:census"]).toBe("vitest run --config vitest.census.config.ts");
    expect(TEST_SCRIPT).toContain(`--outputFile=${DEFAULT_TIER_REPORT} `);
  });

  it("vitest.census.config.ts includes only census legs, which the default include never selects", () => {
    const config = readRepo("vitest.census.config.ts");
    expect(config).toContain('include: ["test/**/*.census.ts"]');
    expect(config).toContain("allowOnly: false");
    expect(readRepo("vitest.config.ts")).toContain('include: ["test/**/*.test.ts"]');
    const self = fileURLToPath(import.meta.url);
    expect(self.endsWith(".census.ts")).toBe(true);
    expect(self.endsWith(".test.ts")).toBe(false);
  });
});
