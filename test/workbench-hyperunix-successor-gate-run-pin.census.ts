/**
 * wb-tz2.3 (HX-ORIGINAL-GOALS-CLOSURE-R3): the RUN PIN of test/workbench-hyperunix-successor-gate-census.test.ts, a census-tier leg
 * judged in wb-u62 REPORT MODE - judge() reads the gate's own test report (DEFAULT_TIER_REPORT, written by the test step) and never
 * re-executes the tier, and the .census.ts suffix keeps this file out of the report it judges. It holds the S row's REGISTRATION leg,
 * which the census's own file cannot read (the census runs inside the run whose report this file judges):
 * - REGISTERED: for each standing tag the owner filing names (the Standing item of the description of .beads/issues.jsonl row
 *   wb-tz2.3, read here as the census reads it), the cited suite's case 'H5: refuses <family> <tag> with a typed validation error and
 *   no snapshot' under 'HyperUnix hyperunix.find reader adapter' is collected once, passed in the test tier's report and asserting
 *   (judge()'s three legs, through the shared helper's roster), and judge() reads the H5 template pin collected once per table row
 *   (at least one row per standing tag), passed and asserting.
 * - LOCATED: the cited suite holds exactly one .each call whose title is the H5 template, and the report locates each standing case
 *   at that call's site (vitest's line:column of the call that registers the rows), so a same-title case registered from another
 *   call (a title computed at run time) is not the cited case.
 * The standing names are frozen here AND derived from the filing, so a name dropped from this file alone reds. The census pins this
 * file's bytes (sha256) and the census tier's collection of it (its S run pin), so this file is never deleted, skipped or edited
 * alone. LIVENESS proves the judge is not accept-all; READER runs the location reader over planted reports and planted suites.
 * NOT claimed here: the cited rows' readings (the census's S file pin binds them by position) and what the cited callback does
 * beyond its text (the census pins its digest).
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { SDK_REPRESENTATION } from "@hyperunix/sdk";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { HYPERUNIX_FIND_CONTRACT } from "../src/workbench/providers/hyperunix.js";
import { type CasePin, DEFAULT_GATE_TIER, DEFAULT_TIER_REPORT, judge, type PinVerdict } from "./helpers/census.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const REPORT = join(ROOT, DEFAULT_TIER_REPORT);
/** judge() reads the cited suite's whole import closure: a loaded gate host needs far more than vitest's 5000 ms default. */
const JUDGE_TIMEOUT = 240_000;
const BEAD = "wb-tz2.3";
const CITED = "test/workbench-hyperunix-observer.test.ts";
/** The cited case's describe path and its it.each template, frozen here (the census's S file pin reads the same path and title). */
const SUITE: readonly string[] = ["HyperUnix hyperunix.find reader adapter"];
const TEMPLATE = "H5: refuses %s with a typed validation error and no snapshot";
/** Each standing row's name, `<family> <tag>`, in filing order: frozen here, and derived from the filing below. */
const STANDING: readonly string[] = ["contract hyperunix.find/v2", "representation hyperunix.result/2"];
/** The tag each family accepts today: the registered provider's contract and the vendored SDK's representation. */
const FAMILY_TAGS: Readonly<Record<string, string>> = { contract: HYPERUNIX_FIND_CONTRACT, representation: SDK_REPRESENTATION };

const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === "object" && value !== null && !Array.isArray(value);
const stem = (tag: string): string | undefined => /^(.*?)\d+$/.exec(tag)?.[1];
/** `<family> <tag>` for every version tag the Standing item of the bead's one export row names, the family read from the tag's stem. */
function derivedNames(exported: string): string[] {
  const rows = exported.split("\n").filter(line => line.trim() !== "").map((line): unknown => JSON.parse(line)).filter(row => isRecord(row) && row.id === BEAD);
  if (rows.length !== 1) return [`<${rows.length} export rows for ${BEAD}>`];
  const [row] = rows;
  const description = isRecord(row) && typeof row.description === "string" ? row.description : "";
  const standing = [...description.matchAll(/(["'])(Standing: .*?)\1(?=, |\])/g)].map(match => match[2] ?? "");
  if (standing.length !== 1) return [`<${standing.length} Standing items>`];
  return [...(standing[0] ?? "").matchAll(/hyperunix\.(?:find\/v\d+|result\/\d+)/g)].map(match => {
    const family = Object.keys(FAMILY_TAGS).find(key => stem(FAMILY_TAGS[key] ?? "") === stem(match[0]));
    return `${family ?? "<no family>"} ${match[0]}`;
  });
}
const titleOf = (name: string): string => TEMPLATE.replace("%s", name);

/** The `line:column` vitest records for every .each call whose title argument is the template: the position of the call that registers the rows. */
function templateSites(file: string, text: string): string[] {
  const source = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const sites: string[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isCallExpression(node) && ts.isCallExpression(node.expression) && ts.isPropertyAccessExpression(node.expression.expression) &&
      node.expression.expression.name.text === "each") {
      const [title] = node.arguments;
      if (title !== undefined && ts.isStringLiteralLike(title) && title.text === TEMPLATE) {
        const { line, character } = source.getLineAndCharacterOfPosition(node.expression.getEnd());
        sites.push(`${line + 1}:${character + 1}`);
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return sites;
}

interface ReportCase {
  readonly title?: unknown;
  readonly ancestorTitles?: unknown;
  readonly status?: unknown;
  readonly location?: unknown;
}
/** The cited suite's cases in a vitest JSON report: the one test file entry whose name ends with the cited path, or why there is none. */
function citedCases(report: unknown): readonly ReportCase[] | string {
  const results = isRecord(report) && Array.isArray(report.testResults) ? report.testResults : undefined;
  if (results === undefined) return "<the report holds no testResults>";
  const entries = results.filter(entry => isRecord(entry) && typeof entry.name === "string" && entry.name.endsWith(`/${CITED}`));
  if (entries.length !== 1) return `<${entries.length} report entries for ${CITED}>`;
  const [entry] = entries;
  const cases = isRecord(entry) && Array.isArray(entry.assertionResults) ? entry.assertionResults : undefined;
  return cases === undefined ? `<the report entry for ${CITED} holds no assertionResults>` : cases.filter(isRecord);
}
const locationOf = (entry: ReportCase): string => (isRecord(entry.location) ? `${String(entry.location.line)}:${String(entry.location.column)}` : "<no location>");
const pathOf = (entry: ReportCase): string => (Array.isArray(entry.ancestorTitles) ? entry.ancestorTitles.map(String).join(" > ") : "<no path>");
/** For each standing name: how the report records its case - once, under the cited path, passed, at the template's one call site - or what differs. */
function locatedLines(report: unknown, sites: readonly string[], names: readonly string[]): string[] {
  const cases = citedCases(report);
  if (typeof cases === "string") return [cases];
  if (sites.length !== 1) return [`<${sites.length} .each calls in ${CITED} are titled the template>`];
  const [site] = sites;
  return names.map(name => {
    const matching = cases.filter(entry => entry.title === titleOf(name));
    if (matching.length !== 1) return `${name}: <${matching.length} report cases titled ${titleOf(name)}>`;
    const [entry] = matching;
    if (entry === undefined) return `${name}: <no case>`;
    const path = pathOf(entry);
    const status = String(entry.status);
    const at = locationOf(entry);
    const problems = [
      ...(path === SUITE.join(" > ") ? [] : [`under ${path}`]),
      ...(status === "passed" ? [] : [`status ${status}`]),
      ...(at === site ? [] : [`at ${at}, not the template's call site ${site}`]),
    ];
    return problems.length === 0 ? `${name}: once, passed, at the template's call site` : `${name}: <${problems.join("; ")}>`;
  });
}
const SOUND = (names: readonly string[]): string[] => names.map(name => `${name}: once, passed, at the template's call site`);

/** Each verdict that is not ok, as its own attribution (the why names the title and the cause). */
const refusals = (verdicts: readonly PinVerdict[]): string[] =>
  verdicts.filter(verdict => !verdict.ok).map(verdict => `${verdict.pin.title} [${verdict.code}, cases ${verdict.cases}]: ${verdict.why}`);
function pinsOf(names: readonly string[]): CasePin[] {
  return [
    ...names.map(name => ({ file: CITED, title: titleOf(name), suite: SUITE, tier: DEFAULT_GATE_TIER })),
    { file: CITED, title: TEMPLATE, suite: SUITE, tier: DEFAULT_GATE_TIER, each: { minCases: names.length } },
  ];
}

describe("wb-tz2.3 HyperUnix successor gate run pin: the S row's registration leg, judged from the gate's own test report", () => {
  it("FROZEN: the standing names frozen here are exactly the ones the owner filing's Standing item derives", () => {
    const derived = derivedNames(readFileSync(join(ROOT, ".beads/issues.jsonl"), "utf8"));
    expect(derived).toEqual([...STANDING]);
    expect(STANDING.map(titleOf)).toEqual([
      "H5: refuses contract hyperunix.find/v2 with a typed validation error and no snapshot",
      "H5: refuses representation hyperunix.result/2 with a typed validation error and no snapshot",
    ]);
  });

  it("LOCATED: one .each call in the cited suite is titled the H5 template, and the report records each standing case once there, passed", () => {
    const sites = templateSites(CITED, readFileSync(join(ROOT, CITED), "utf8"));
    expect(sites).toHaveLength(1);
    const report: unknown = JSON.parse(readFileSync(REPORT, "utf8"));
    expect(locatedLines(report, sites, STANDING)).toEqual(SOUND(STANDING));
  });

  it("REGISTERED: judge() reads each standing case and the H5 template collected, passed in the test tier's report and asserting", { timeout: JUDGE_TIMEOUT }, () => {
    const verdicts = judge(REPORT, pinsOf(STANDING));
    expect({
      refused: refusals(verdicts),
      codes: verdicts.map(verdict => verdict.code),
      standingCases: verdicts.slice(0, STANDING.length).map(verdict => verdict.cases),
      templateHoldsEveryStandingRow: (verdicts[STANDING.length]?.cases ?? 0) >= STANDING.length,
    }).toStrictEqual({ refused: [], codes: [...STANDING.map(() => "ok"), "ok"], standingCases: STANDING.map(() => 1), templateHoldsEveryStandingRow: true });
  });

  it("LIVENESS: a standing title the report cannot hold is red, naming it (an accept-all judge cannot pass here)", { timeout: JUDGE_TIMEOUT }, () => {
    const [verdict] = judge(REPORT, [{ file: CITED, title: titleOf("contract hyperunix.find/v9"), suite: SUITE, tier: DEFAULT_GATE_TIER }]);
    expect({ ok: verdict?.ok, code: verdict?.code, named: verdict?.why.includes("hyperunix.find/v9") }).toStrictEqual({ ok: false, code: "absent", named: true });
  });

  it("READER: the location reader shows a missing, duplicated, skipped, moved or elsewhere-located standing case, and a lost or twinned template", () => {
    const at = (line: number, column: number): Record<string, number> => ({ line, column });
    const entry = (name: string, overrides: Record<string, unknown> = {}): Record<string, unknown> =>
      ({ title: titleOf(name), ancestorTitles: [...SUITE], status: "passed", location: at(5, 20), ...overrides });
    const report = (cases: readonly Record<string, unknown>[], name = `/repo/${CITED}`): unknown => ({ testResults: [{ name, assertionResults: cases }] });
    const [first = "", second = ""] = STANDING;
    const sound = report([entry(first), entry(second)]);
    expect(locatedLines(sound, ["5:20"], STANDING)).toEqual(SOUND(STANDING));
    expect(locatedLines(report([entry(second)]), ["5:20"], STANDING)[0]).toBe(`${first}: <0 report cases titled ${titleOf(first)}>`);
    expect(locatedLines(report([entry(first), entry(first), entry(second)]), ["5:20"], STANDING)[0]).toBe(`${first}: <2 report cases titled ${titleOf(first)}>`);
    expect(locatedLines(report([entry(first, { status: "skipped" }), entry(second)]), ["5:20"], STANDING)[0]).toBe(`${first}: <status skipped>`);
    expect(locatedLines(report([entry(first, { ancestorTitles: ["elsewhere"] }), entry(second)]), ["5:20"], STANDING)[0]).toBe(`${first}: <under elsewhere>`);
    expect(locatedLines(report([entry(first, { location: at(9, 3) }), entry(second)]), ["5:20"], STANDING)[0])
      .toBe(`${first}: <at 9:3, not the template's call site 5:20>`);
    expect(locatedLines({ testResults: [] }, ["5:20"], STANDING)).toEqual([`<0 report entries for ${CITED}>`]);
    expect(locatedLines(sound, [], STANDING)).toEqual([`<0 .each calls in ${CITED} are titled the template>`]);
    // The call-site reader: the template's one .each call, at the position vitest records (the call that registers the rows).
    const suite = ["import {describe, it} from 'vitest';", "describe('s', () => {", `  it.each(rows)('${TEMPLATE}', (_n, v) => { check(v); });`, "});", ""].join("\n");
    expect(templateSites("test/planted.test.ts", suite)).toEqual(["3:16"]);
    const twinned = suite.replace("\n});\n", `\n  it.each(more)('${TEMPLATE}', (_n, v) => { check(v); });\n});\n`);
    expect(templateSites("test/planted.test.ts", twinned)).toEqual(["3:16", "4:16"]);
    expect(templateSites("test/planted.test.ts", suite.replace(TEMPLATE, "H5: refuses %s"))).toEqual([]);
    // The derivation: one export row, one Standing item, each tag's family read from its stem.
    const exported = (description: string): string => JSON.stringify({ id: BEAD, description });
    expect(derivedNames(exported(`ACCEPTANCE: ["Standing: hyperunix.find/v2 and hyperunix.result/2 refused."]`))).toEqual([...STANDING]);
    expect(derivedNames([exported("a"), exported("b")].join("\n"))).toEqual([`<2 export rows for ${BEAD}>`]);
    expect(derivedNames(exported(`ACCEPTANCE: ["Standing: a.", "Standing: b."]`))).toEqual(["<2 Standing items>"]);
  });
});
