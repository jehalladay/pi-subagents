import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it } from "vitest";
import { buildReceipt, CONTRACT, DISCLAIMER, exitCodeFor, ITEMS, pinProblems } from "../qa/workbench/release-checklist-receipt.mjs";

interface Suite {
  path: string;
  negativeControls: readonly string[];
}
interface Item {
  item: number;
  text: string;
  suites: readonly Suite[];
}
interface SuiteResult {
  path: string;
  sha256: string | null;
  tests: number;
  passed: number;
  failed: number;
  skipped: number;
  skippedTitles: string[];
  negativeControls: { title: string; present: boolean }[];
}
interface Receipt {
  contract: string;
  revision: string;
  dirty: boolean;
  items: { item: number; text: string; suites: SuiteResult[]; unavailable: string[]; pass: boolean }[];
  pass: boolean;
  disclaimer: string;
}
interface Problem {
  item: number;
  path: string;
  kind: string;
  title?: string;
}

const items = ITEMS as readonly Item[];
const build = buildReceipt as (inputs: unknown) => Receipt;
const problemsOf = pinProblems as (root: string, items?: readonly Item[]) => Problem[];
const exitOf = exitCodeFor as (receipt: Receipt) => number;

const repo = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const fixtures = join(repo, "test", "fixtures", "release-checklist");
const meta = { utc: "2026-10-15T00:00:00.000Z", revision: "abc", dirty: false, node: "v24", vitest: "4", host: { platform: "linux", arch: "x64", cpus: 1 } };
const CONTROL = "denies the forged grant";
const fake: Item[] = [{ item: 6, text: "Authorized provider invocation and denial tests pass.", suites: [{ path: "test/fake-a.test.ts", negativeControls: [CONTROL] }] }];
const bytes = Buffer.from("fake suite bytes");
const roots: string[] = [];

function load(name: string): unknown {
  return JSON.parse(readFileSync(join(fixtures, `${name}.json`), "utf8"));
}
function receiptFor(reports: Record<number, unknown>, read: (path: string) => Buffer | undefined = () => bytes): Receipt {
  return build({ items: fake, root: "/repo", reports, read, meta });
}
afterEach(() => {
  for (const path of roots.splice(0)) rmSync(path, { recursive: true, force: true });
});

describe("pinned suite tables (docs/workbench/17 Release checklist items 6 and 7)", () => {
  it("restates the checklist lines verbatim for items 6 and 7 only", () => {
    expect(items.map((i) => [i.item, i.text])).toEqual([
      [6, "Authorized provider invocation and denial tests pass."],
      [7, "Abort/restart/side-effect ambiguity tests pass."],
    ]);
    const doc = readFileSync(join(repo, "docs", "workbench", "17-packaging-and-operations.md"), "utf8");
    expect(doc).toContain("6. Authorized provider invocation and denial tests pass.");
    expect(doc).toContain("7. Abort/restart/side-effect ambiguity tests pass.");
  });

  it("pins every suite path and every negative-control title to the tree, naming the path and title on drift", () => {
    expect(problemsOf(repo)).toEqual([]);
    for (const item of items) for (const suite of item.suites) expect(suite.negativeControls.length, suite.path).toBeGreaterThan(0);
  });

  it("goes red naming the path for a missing suite and the suite and title for an absent control", () => {
    const root = mkdtempSync(join(tmpdir(), "rc-pin-"));
    roots.push(root);
    mkdirSync(join(root, "test"));
    writeFileSync(join(root, "test", "fake-a.test.ts"), 'it("some other case", () => {});\n');
    expect(problemsOf(root, fake)).toEqual([{ item: 6, path: "test/fake-a.test.ts", kind: "missing-negative-control", title: CONTROL }]);
    const empty = mkdtempSync(join(tmpdir(), "rc-pin-"));
    roots.push(empty);
    expect(problemsOf(empty, fake)).toEqual([{ item: 6, path: "test/fake-a.test.ts", kind: "missing-suite" }]);
  });

  it("covers the named falsifier classes: journaled non-read refusal, abort with no new session, uncertain effect not success", () => {
    const titles = items.flatMap((i) => i.suites.flatMap((s) => s.negativeControls));
    expect(titles.some((t) => t.includes("neither re-runs nor replays a journaled write"))).toBe(true);
    expect(titles.some((t) => t.includes("zero query() calls"))).toBe(true);
    expect(titles.some((t) => t.includes("lost its answer instead of retrying"))).toBe(true);
  });
});

describe("receipt builder over committed reporter fixtures", () => {
  it("all-pass: exit 0, counts, sha256 and control presence recorded, disclaimer restated", () => {
    const receipt = receiptFor({ 6: { report: load("all-pass"), command: "vitest run" } });
    expect(exitOf(receipt)).toBe(0);
    expect(receipt.pass).toBe(true);
    expect(receipt.contract).toBe(CONTRACT);
    expect(receipt.disclaimer).toBe(DISCLAIMER);
    expect(receipt.disclaimer).toContain("not release proof");
    const suite = receipt.items[0].suites[0];
    expect(suite).toMatchObject({ path: "test/fake-a.test.ts", tests: 2, passed: 2, failed: 0, skipped: 0 });
    expect(suite.sha256).toMatch(/^[0-9a-f]{64}$/);
    expect(suite.negativeControls).toEqual([{ title: CONTROL, present: true }]);
  });

  it("one-fail: exit 1 naming the failed count, item not passed", () => {
    const receipt = receiptFor({ 6: { report: load("one-fail") } });
    expect(exitOf(receipt)).toBe(1);
    expect(receipt.pass).toBe(false);
    expect(receipt.items[0].suites[0]).toMatchObject({ failed: 1, passed: 1 });
  });

  it("one-skipped: skipped is listed, never counted as passed, and a skipped control is not present", () => {
    const receipt = receiptFor({ 6: { report: load("one-skipped") } });
    const suite = receipt.items[0].suites[0];
    expect(suite).toMatchObject({ passed: 1, skipped: 1, failed: 0 });
    expect(suite.skippedTitles).toEqual([`fake ${CONTROL}`]);
    expect(suite.negativeControls).toEqual([{ title: CONTROL, present: false }]);
    expect(receipt.pass).toBe(false);
    expect(exitOf(receipt)).toBe(1);
  });

  it("missing suite: exit 2 naming the path, never an empty pass", () => {
    const receipt = receiptFor({ 6: { report: load("all-pass") } }, () => undefined);
    expect(exitOf(receipt)).toBe(2);
    expect(receipt.pass).toBe(false);
    expect(receipt.items[0].unavailable).toContain("missing suite test/fake-a.test.ts");
    expect(receipt.items[0].suites[0].sha256).toBeNull();
  });

  it("absent or unparseable reporter output: exit 2 with the reason, never a pass", () => {
    const receipt = receiptFor({ 6: { unavailable: "reporter file absent" } });
    expect(exitOf(receipt)).toBe(2);
    expect(receipt.pass).toBe(false);
    expect(receipt.items[0].unavailable).toContain("reporter file absent");
    expect(exitOf(receiptFor({}))).toBe(2);
  });

  it("a reporter that omits the pinned suite is unavailable, not a pass", () => {
    const receipt = receiptFor({ 6: { report: { testResults: [] } } });
    expect(exitOf(receipt)).toBe(2);
    expect(receipt.items[0].unavailable[0]).toContain("reporter has no result for test/fake-a.test.ts");
  });
});

describe("CLI contract", () => {
  it("is declared in forge.toml outside the default gate, and the gate list is unchanged", () => {
    const toml = readFileSync(join(repo, "forge.toml"), "utf8");
    expect(toml).toContain("[build.commands.release-checklist]");
    expect(toml).toContain('command = "node qa/workbench/release-checklist-receipt.mjs"');
    expect(toml).toContain('gate = ["lint", "typing", "build", "test", "workbench-shell", "package-smoke"]');
  });

  it("source reads the reporter file only from a scratch dir it removes, and imports nothing from src or dist", () => {
    const source = readFileSync(join(repo, "qa", "workbench", "release-checklist-receipt.mjs"), "utf8");
    expect(source).toMatch(/rmSync\(scratch, \{ recursive: true, force: true \}\)/);
    expect(source).not.toMatch(/from '\.\.\/\.\.\/(src|dist)/);
    const run = spawnSync(process.execPath, ["--check", join(repo, "qa", "workbench", "release-checklist-receipt.mjs")], { encoding: "utf8" });
    expect(run.status).toBe(0);
  });
});
