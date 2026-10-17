import { spawnSync } from "node:child_process";
import { chmodSync, copyFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { arch, cpus, platform, tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it } from "vitest";
import { buildReceipt, CONTRACT, DISCLAIMER, exitCodeFor, ITEMS, pinProblems, repoIdentity } from "../qa/workbench/release-checklist-receipt.mjs";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

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
  fileStatus: string | null;
  fileMessage: string | null;
}
interface Receipt {
  contract: string;
  revision: string;
  dirty: boolean;
  items: { item: number; text: string; suites: SuiteResult[]; unavailable: string[]; pass: boolean; vitestExit: number | null | undefined; vitestSuccess: boolean | null }[];
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
const identityOf = repoIdentity as (root: string) => { revision: string; dirty: boolean | string };

const repo = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const fixtures = join(repo, "test", "fixtures", "release-checklist");
const meta = { utc: "2026-10-15T00:00:00.000Z", revision: "abc", dirty: false, node: "v24", vitest: "4", host: { platform: "linux", arch: "x64", cpus: 1 } };
const CONTROL = "denies the forged grant";
const fake: Item[] = [{ item: 6, text: "Authorized provider invocation and denial tests pass.", suites: [{ path: "test/fake-a.test.ts", negativeControls: [CONTROL] }] }];
const bytes = Buffer.from(`it("${CONTROL}", () => {});\n`);
const roots: string[] = [];
installScratchLeakGuard();

function load(name: string): unknown {
  return JSON.parse(readFileSync(join(fixtures, `${name}.json`), "utf8"));
}
function receiptFor(reports: Record<number, unknown>, read: (path: string) => Buffer | undefined = () => bytes): Receipt {
  return build({ items: fake, root: "/repo", reports, read, meta });
}
afterEach(() => {
  removeScratch(...roots.splice(0));
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
    const root = makeScratch("rc-pin-");
    roots.push(root);
    mkdirSync(join(root, "test"));
    writeFileSync(join(root, "test", "fake-a.test.ts"), 'it("some other case", () => {});\n');
    expect(problemsOf(root, fake)).toEqual([{ item: 6, path: "test/fake-a.test.ts", kind: "missing-negative-control", title: CONTROL }]);
    const empty = makeScratch("rc-pin-");
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

describe("vitest's own verdict is part of the item verdict (U1: suite-level failures are never receipted as pass)", () => {
  it("a failed file with every assertion passed and success false is exit 1, naming the file status and message", () => {
    const receipt = receiptFor({ 6: { report: load("suite-failed"), exitStatus: 1 } });
    expect(receipt.items[0].suites[0]).toMatchObject({ failed: 0, passed: 2, fileStatus: "failed", fileMessage: "afterAll hook failed: boom" });
    expect(receipt.items[0]).toMatchObject({ vitestExit: 1, vitestSuccess: false, pass: false });
    expect(receipt.pass).toBe(false);
    expect(exitOf(receipt)).toBe(1);
  });

  it("a non-zero vitest exit fails the item even when the report says success and every assertion passed", () => {
    const receipt = receiptFor({ 6: { report: load("all-pass"), exitStatus: 1 } });
    expect(receipt.items[0]).toMatchObject({ vitestExit: 1, pass: false });
    expect(exitOf(receipt)).toBe(1);
  });

  it("a signal-killed vitest (null exit status) is a failure, not a pass", () => {
    const receipt = receiptFor({ 6: { report: load("all-pass"), exitStatus: null } });
    expect(receipt.items[0].pass).toBe(false);
    expect(exitOf(receipt)).toBe(1);
  });

  it("O1 success false alone fails the item: exit status 0, every assertion passed, no failed file", () => {
    const report = { ...(load("all-pass") as Record<string, unknown>), success: false };
    const receipt = receiptFor({ 6: { report, exitStatus: 0 } });
    expect(receipt.items[0].suites[0]).toMatchObject({ failed: 0, fileStatus: "passed" });
    expect(receipt.items[0]).toMatchObject({ vitestExit: 0, vitestSuccess: false, pass: false });
    expect(exitOf(receipt)).toBe(1);
  });

  it("O1 a failed file alone fails the item: exit status 0, success true, every assertion passed", () => {
    const report = { ...(load("suite-failed") as Record<string, unknown>), success: true };
    const receipt = receiptFor({ 6: { report, exitStatus: 0 } });
    expect(receipt.items[0].suites[0]).toMatchObject({ failed: 0, fileStatus: "failed" });
    expect(receipt.items[0]).toMatchObject({ vitestExit: 0, vitestSuccess: true, pass: false });
    expect(exitOf(receipt)).toBe(1);
  });

  it("O1 the suite-failed fixture fails the item even when the exit status is 0", () => {
    const receipt = receiptFor({ 6: { report: load("suite-failed"), exitStatus: 0 } });
    expect(receipt.items[0].pass).toBe(false);
    expect(exitOf(receipt)).toBe(1);
  });

  it("a clean run records exit 0 and success true", () => {
    const receipt = receiptFor({ 6: { report: load("all-pass"), exitStatus: 0 } });
    expect(receipt.items[0]).toMatchObject({ vitestExit: 0, vitestSuccess: true, pass: true });
    expect(exitOf(receipt)).toBe(0);
  });
});

describe("a pinned control converted to it.fails with a broken body is never receipted present (U3)", () => {
  it("the guard goes red naming the suite and the title for it.fails, it.skip and it.todo declarations", () => {
    const root = makeScratch("rc-pin-");
    roots.push(root);
    mkdirSync(join(root, "test"));
    const file = join(root, "test", "fake-a.test.ts");
    const missing = [{ item: 6, path: "test/fake-a.test.ts", kind: "missing-negative-control", title: CONTROL }];
    for (const modifier of ["fails", "skip", "todo", "only"]) {
      writeFileSync(file, `it.${modifier}("${CONTROL}", () => { expect(1).toBe(2); });\n`);
      expect(problemsOf(root, fake), modifier).toEqual(missing);
    }
    writeFileSync(file, `it("${CONTROL}", () => {});\n`);
    expect(problemsOf(root, fake)).toEqual([]);
  });

  it("the receipt exits 1 with present false when the reporter says passed but the suite bytes declare it.fails", () => {
    const failsBytes = Buffer.from(`it.fails("${CONTROL}", () => { expect(1).toBe(2); });\n`);
    const receipt = receiptFor({ 6: { report: load("all-pass"), exitStatus: 0 } }, () => failsBytes);
    expect(receipt.items[0].suites[0].negativeControls).toEqual([{ title: CONTROL, present: false }]);
    expect(receipt.items[0].unavailable).toEqual([]);
    expect(receipt.pass).toBe(false);
    expect(exitOf(receipt)).toBe(1);
  });
});

describe("pin matching is the quoted test-call form (F2)", () => {
  it("a title extended with a suffix, or surviving only in a comment or string, is a missing control", () => {
    const root = makeScratch("rc-pin-");
    roots.push(root);
    mkdirSync(join(root, "test"));
    const file = join(root, "test", "fake-a.test.ts");
    const missing = [{ item: 6, path: "test/fake-a.test.ts", kind: "missing-negative-control", title: CONTROL }];
    writeFileSync(file, `it("${CONTROL} and more", () => {});\n`);
    expect(problemsOf(root, fake)).toEqual(missing);
    writeFileSync(file, `// it("${CONTROL}", () => {});\nconst note = "${CONTROL}";\n`);
    expect(problemsOf(root, fake)).toEqual(missing);
    writeFileSync(file, `  it("${CONTROL}", () => {});\n`);
    expect(problemsOf(root, fake)).toEqual([]);
    writeFileSync(file, `  it.skip('${CONTROL}', () => {});\n`);
    expect(problemsOf(root, fake)).toEqual(missing);
  });
});

describe("revision and dirty come from the repository that owns the root (F1)", () => {
  it("reads revision and dirty when the root is the repository top level", () => {
    const identity = identityOf(repo);
    expect(identity.revision).toMatch(/^[0-9a-f]{40}$/);
    expect(typeof identity.dirty).toBe("boolean");
  });

  it("reports unknown for both when the root is nested inside another repository or inside none", () => {
    const outer = makeScratch("rc-git-");
    roots.push(outer);
    const git = (args: string[]) => spawnSync("git", args, { cwd: outer, encoding: "utf8" });
    git(["init", "-q"]);
    git(["-c", "user.email=a@b.c", "-c", "user.name=t", "commit", "-q", "--allow-empty", "-m", "outer"]);
    const nested = join(outer, "nested");
    mkdirSync(nested);
    expect(identityOf(nested)).toEqual({ revision: "unknown", dirty: "unknown" });
    const bare = makeScratch("rc-nogit-");
    roots.push(bare);
    expect(identityOf(bare)).toEqual({ revision: "unknown", dirty: "unknown" });
  });
});

describe("CLI contract", () => {
  it("is declared in forge.toml outside the default gate, and the gate list is unchanged", () => {
    const toml = readFileSync(join(repo, "forge.toml"), "utf8");
    expect(toml).toContain("[build.commands.release-checklist]");
    expect(toml).toContain('command = "node qa/workbench/release-checklist-receipt.mjs"');
    expect(toml).toContain('gate = ["lint", "typing", "build", "test", "workbench-shell", "package-smoke"]');
  });

  it("places the block whole at the package-smoke boundary, not the shared end of file (16:56Z whole-block rule)", () => {
    const toml = readFileSync(join(repo, "forge.toml"), "utf8");
    const block = '[build.commands.release-checklist]\ncommand = "node qa/workbench/release-checklist-receipt.mjs"\ntimeout = 600\n';
    const smoke = '[build.commands.package-smoke]\ncommand = "bash qa/workbench/package-smoke.sh"\ntimeout = 120\n\n';
    expect(toml).toContain(`${smoke}${block}\n[build.commands.install-smoke]`);
    expect(toml.split("[build.commands.release-checklist]").length - 1).toBe(1);
    const start = toml.indexOf("[build.commands.release-checklist]");
    const end = toml.indexOf("\n[", start + 1);
    expect(toml.slice(start, end).match(/^timeout = /gm)?.length).toBe(1);
  });

  it("source reads the reporter file only from a scratch dir it removes, and imports nothing from src or dist", () => {
    const source = readFileSync(join(repo, "qa", "workbench", "release-checklist-receipt.mjs"), "utf8");
    expect(source).toMatch(/rmSync\(scratch, \{ recursive: true, force: true \}\)/);
    expect(source).not.toMatch(/from '\.\.\/\.\.\/(src|dist)/);
    const run = spawnSync(process.execPath, ["--check", join(repo, "qa", "workbench", "release-checklist-receipt.mjs")], { encoding: "utf8" });
    expect(run.status).toBe(0);
  });
});

// wb-cax.23 respin (gate-3 U1-U3, O1): each block below kills named mutants of the runner. Every case drives the real runner
// (builder, repoIdentity, or the spawned CLI over a test-scoped executable at its own vitest spawn seam); nothing is mocked.
interface CaseSpec {
  title: string;
  status: string;
}
const CONTROL_A1 = "control a1 refuses forged grant";
const CONTROL_A2 = "control a2 refuses unknown caller";
const CONTROL_B1 = "control b1 refuses cancelled request";
const CONTROL_C1 = "control c1 never replays a journaled write";
const multi: Item[] = [
  {
    item: 6,
    text: "Authorized provider invocation and denial tests pass.",
    suites: [
      { path: "test/multi-a.test.ts", negativeControls: [CONTROL_A1, CONTROL_A2] },
      { path: "test/multi-b.test.ts", negativeControls: [CONTROL_B1] },
    ],
  },
  { item: 7, text: "Abort/restart/side-effect ambiguity tests pass.", suites: [{ path: "test/multi-c.test.ts", negativeControls: [CONTROL_C1] }] },
];
const multiBytes = (path: string): Buffer | undefined => {
  const suite = multi.flatMap((i) => i.suites).find((s) => s.path === path);
  return suite ? Buffer.from(suite.negativeControls.map((t) => `it("${t}", () => {});\n`).join("")) : undefined;
};
function reportOf(files: Record<string, CaseSpec[]>): unknown {
  const entries = Object.entries(files);
  const failed = entries.some(([, cases]) => cases.some((c) => c.status === "failed"));
  return {
    success: !failed,
    testResults: entries.map(([path, cases]) => ({
      name: resolve("/repo", path),
      status: cases.some((c) => c.status === "failed") ? "failed" : "passed",
      assertionResults: cases.map((c) => ({ title: c.title, fullName: `multi ${c.title}`, status: c.status })),
    })),
  };
}
const passing = (title: string): CaseSpec => ({ title, status: "passed" });
const A = "test/multi-a.test.ts";
const B = "test/multi-b.test.ts";
const C = "test/multi-c.test.ts";
function multiReceipt(files6: Record<string, CaseSpec[]>, files7: Record<string, CaseSpec[]>): Receipt {
  return build({
    items: multi,
    root: "/repo",
    reports: { 6: { report: reportOf(files6), exitStatus: 0 }, 7: { report: reportOf(files7), exitStatus: 0 } },
    read: multiBytes,
    meta,
  });
}
const clean6 = { [A]: [passing(CONTROL_A1), passing(CONTROL_A2)], [B]: [passing(CONTROL_B1)] };
const clean7 = { [C]: [passing(CONTROL_C1)] };

describe("the three aggregations are exercised over a multi-item, multi-suite, multi-control table (U1)", () => {
  it("(a) everything clean: both items and the receipt pass, exit 0", () => {
    const receipt = multiReceipt(clean6, clean7);
    expect(receipt.items.map((i) => i.pass)).toEqual([true, true]);
    expect(receipt.pass).toBe(true);
    expect(exitOf(receipt)).toBe(0);
  });

  it("(b) item 7 has one failed case while item 6 is clean: the receipt is not a pass (item aggregation is every, not some)", () => {
    const receipt = multiReceipt(clean6, { [C]: [{ title: CONTROL_C1, status: "failed" }] });
    expect(receipt.items.map((i) => i.pass)).toEqual([true, false]);
    expect(receipt.pass).toBe(false);
    expect(exitOf(receipt)).toBe(1);
  });

  it("(c) the second suite's only control is skipped while the first suite is clean: item 6 fails (suite aggregation is some, not every)", () => {
    const receipt = multiReceipt({ [A]: clean6[A], [B]: [{ title: CONTROL_B1, status: "skipped" }] }, clean7);
    expect(receipt.items.map((i) => i.pass)).toEqual([false, true]);
    expect(receipt.pass).toBe(false);
    expect(exitOf(receipt)).toBe(1);
  });

  it("(d) one of the first suite's two controls is skipped while the other passes: item 6 fails (control aggregation is some, not every)", () => {
    const receipt = multiReceipt({ [A]: [{ title: CONTROL_A1, status: "skipped" }, passing(CONTROL_A2)], [B]: clean6[B] }, clean7);
    expect(receipt.items[0].suites[0].negativeControls).toEqual([
      { title: CONTROL_A1, present: false },
      { title: CONTROL_A2, present: true },
    ]);
    expect(receipt.items.map((i) => i.pass)).toEqual([false, true]);
    expect(receipt.pass).toBe(false);
    expect(exitOf(receipt)).toBe(1);
  });

  it("O1 a todo case is listed under skipped and never counted as passed, with its control still passing", () => {
    const todo = { title: "a todo placeholder", status: "todo" };
    const receipt = multiReceipt({ [A]: [passing(CONTROL_A1), passing(CONTROL_A2), todo], [B]: clean6[B] }, clean7);
    expect(receipt.items[0].suites[0]).toMatchObject({ tests: 3, passed: 2, failed: 0, skipped: 1, skippedTitles: ["multi a todo placeholder"] });
    expect(receipt.pass).toBe(true);
  });
});

describe("the CLI plumbs vitest's exit status into the verdict (U2: the exit leg is the only guard for unhandled errors)", () => {
  // A test-scoped executable at the runner's own vitest spawn seam: it writes an all-pass success:true report for the paths it
  // receives and exits with FAKE_VITEST_EXIT, the shape vitest 4.1.10 produces for an error thrown in a timer after a passing test.
  function scratchRoot(): string {
    const root = makeScratch("rc-cli-");
    roots.push(root);
    for (const item of items) {
      for (const suite of item.suites) {
        mkdirSync(dirname(join(root, suite.path)), { recursive: true });
        writeFileSync(join(root, suite.path), suite.negativeControls.map((t) => `it(${JSON.stringify(t)}, () => {});\n`).join(""));
      }
    }
    mkdirSync(join(root, "node_modules", "vitest"), { recursive: true });
    writeFileSync(join(root, "node_modules", "vitest", "package.json"), JSON.stringify({ version: "0.0.0-fake" }));
    mkdirSync(join(root, "node_modules", ".bin"), { recursive: true });
    const fake = [
      `#!${process.execPath}`,
      'const fs = require("node:fs");',
      'const path = require("node:path");',
      "const args = process.argv.slice(2);",
      'const out = args.find((a) => a.startsWith("--outputFile=")).slice("--outputFile=".length);',
      'const files = args.filter((a) => !a.startsWith("-") && a !== "run");',
      "const testResults = files.map((f) => {",
      '  const titles = [...fs.readFileSync(f, "utf8").matchAll(/^it\\("(.*)", /gm)].map((m) => m[1]);',
      '  return { name: path.resolve(f), status: "passed", assertionResults: titles.map((title) => ({ title, fullName: title, status: "passed" })) };',
      "});",
      "fs.writeFileSync(out, JSON.stringify({ success: true, testResults }));",
      "process.exit(Number(process.env.FAKE_VITEST_EXIT));",
      "",
    ].join("\n");
    writeFileSync(join(root, "node_modules", ".bin", "vitest"), fake);
    chmodSync(join(root, "node_modules", ".bin", "vitest"), 0o755);
    mkdirSync(join(root, "qa", "workbench"), { recursive: true });
    copyFileSync(join(repo, "qa", "workbench", "release-checklist-receipt.mjs"), join(root, "qa", "workbench", "release-checklist-receipt.mjs"));
    return root;
  }
  function runCli(root: string, exit: string): { status: number | null; receipt: Receipt } {
    const run = spawnSync(process.execPath, [join(root, "qa", "workbench", "release-checklist-receipt.mjs")], { encoding: "utf8", env: { ...process.env, FAKE_VITEST_EXIT: exit } });
    return { status: run.status, receipt: JSON.parse(run.stdout) as Receipt };
  }

  it("control: a vitest that exits 0 with an all-pass report yields exit 0, vitestExit 0 and pass true (the fake seam is faithful)", () => {
    const { status, receipt } = runCli(scratchRoot(), "0");
    expect(status).toBe(0);
    expect(receipt.items.map((i) => [i.vitestExit, i.vitestSuccess, i.pass])).toEqual([
      [0, true, true],
      [0, true, true],
    ]);
    expect(receipt.pass).toBe(true);
  });

  it("a vitest that exits 1 with success true and every file passed is exit 1 with vitestExit 1 on both items and pass false", () => {
    const { status, receipt } = runCli(scratchRoot(), "1");
    expect(status).toBe(1);
    expect(receipt.items.map((i) => [i.vitestExit, i.vitestSuccess, i.pass])).toEqual([
      [1, true, false],
      [1, true, false],
    ]);
    expect(receipt.pass).toBe(false);
  });

  // U1(b)/O1: the scratch root made a git toplevel (init, add -A, two commits) so the CLI reads a real identity, and the fake vitest
  // reports version 0.0.0-fake, so every receipt provenance field has a value the test knows independently of the runner.
  function gitIn(dir: string, args: string[]): string {
    const run = spawnSync("git", ["-c", "user.email=a@b.c", "-c", "user.name=t", ...args], { cwd: dir, encoding: "utf8" });
    expect(run.status).toBe(0);
    return run.stdout.trim();
  }
  function gitToplevelRoot(): { root: string; head: string } {
    const root = scratchRoot();
    gitIn(root, ["init", "-q"]);
    gitIn(root, ["add", "-A"]);
    gitIn(root, ["commit", "-q", "-m", "first"]);
    writeFileSync(join(root, "second.txt"), "second\n");
    gitIn(root, ["add", "-A"]);
    gitIn(root, ["commit", "-q", "-m", "second"]);
    const head = gitIn(root, ["rev-parse", "HEAD"]);
    expect(head).toMatch(/^[0-9a-f]{40}$/);
    expect(gitIn(root, ["rev-parse", "HEAD~1"])).not.toBe(head);
    return { root, head };
  }

  it("U1 the CLI receipt carries the scratch toplevel's own HEAD and dirty false when clean, then dirty true after a probe file", () => {
    const { root, head } = gitToplevelRoot();
    expect(gitIn(root, ["status", "--porcelain"])).toBe("");
    const clean = runCli(root, "0");
    expect(clean.status).toBe(0);
    expect(clean.receipt.revision).toBe(head);
    expect(clean.receipt.dirty).toBe(false);
    writeFileSync(join(root, "probe.txt"), "probe\n");
    const dirty = runCli(root, "0");
    expect(dirty.status).toBe(0);
    expect(dirty.receipt.revision).toBe(head);
    expect(dirty.receipt.dirty).toBe(true);
  });

  it("O1 the CLI receipt records the vitest version, node version, host, an in-window utc and each item's exact command, and W22_CHECKLIST_RECEIPT (outside the repo) byte-equals stdout", () => {
    const { root } = gitToplevelRoot();
    const outside = makeScratch("rc-receipt-out-");
    roots.push(outside);
    const receiptFile = join(outside, "receipt.json");
    const before = Date.now();
    const run = spawnSync(process.execPath, [join(root, "qa", "workbench", "release-checklist-receipt.mjs")], { encoding: "utf8", env: { ...process.env, FAKE_VITEST_EXIT: "0", W22_CHECKLIST_RECEIPT: receiptFile } });
    const after = Date.now();
    expect(run.status).toBe(0);
    expect(readFileSync(receiptFile, "utf8")).toBe(run.stdout);
    const receipt = JSON.parse(run.stdout) as { vitest: string; node: string; host: unknown; utc: string; items: { item: number; command: string }[] };
    expect(receipt.vitest).toBe("0.0.0-fake");
    expect(receipt.node).toBe(process.version);
    expect(receipt.host).toEqual({ platform: platform(), arch: arch(), cpus: cpus().length });
    expect(new Date(receipt.utc).toISOString()).toBe(receipt.utc);
    expect(Date.parse(receipt.utc)).toBeGreaterThanOrEqual(before);
    expect(Date.parse(receipt.utc)).toBeLessThanOrEqual(after);
    const literal = (text: string): string => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    expect(receipt.items.map((i) => i.item)).toEqual(items.map((i) => i.item));
    for (const item of items) {
      const got = receipt.items.find((i) => i.item === item.item);
      const paths = item.suites.map((s) => s.path).join(" ");
      expect(got?.command).toMatch(new RegExp(`^\\./node_modules/\\.bin/vitest run --reporter=json --outputFile=${literal(join(tmpdir(), "release-checklist-"))}[^/]+/item-${item.item}\\.json ${literal(paths)}$`));
    }
  });
});

describe("repoIdentity fails closed when git status itself fails (U3: the vko corrupt-index shape)", () => {
  it("a repository whose index is corrupt (git status rc 128, rev-parse HEAD ok) reports unknown for both, never a clean or dirty claim", () => {
    const repoDir = makeScratch("rc-corrupt-");
    roots.push(repoDir);
    const git = (args: string[]) => spawnSync("git", args, { cwd: repoDir, encoding: "utf8" });
    git(["init", "-q"]);
    git(["-c", "user.email=a@b.c", "-c", "user.name=t", "commit", "-q", "--allow-empty", "-m", "base"]);
    writeFileSync(join(repoDir, ".git", "index"), "garbage");
    expect(git(["status", "--porcelain"]).status).toBe(128);
    expect(git(["rev-parse", "HEAD"]).status).toBe(0);
    expect(identityOf(repoDir)).toEqual({ revision: "unknown", dirty: "unknown" });
  });
});

describe("repoIdentity reads the toplevel's own HEAD and a real dirty bit (U1(a), O2: the 21:22Z fabricated-identity class on the clean/dirty path)", () => {
  const gitAt = (dir: string, args: string[]): string => {
    const run = spawnSync("git", ["-c", "user.email=a@b.c", "-c", "user.name=t", ...args], { cwd: dir, encoding: "utf8" });
    expect(run.status).toBe(0);
    return run.stdout.trim();
  };

  it("U1 a scratch toplevel with two commits is {its own HEAD, dirty false} when clean and {same HEAD, dirty true} after an untracked file", () => {
    const dir = makeScratch("rc-ident-");
    roots.push(dir);
    gitAt(dir, ["init", "-q"]);
    writeFileSync(join(dir, "a.txt"), "a\n");
    gitAt(dir, ["add", "-A"]);
    gitAt(dir, ["commit", "-q", "-m", "first"]);
    writeFileSync(join(dir, "b.txt"), "b\n");
    gitAt(dir, ["add", "-A"]);
    gitAt(dir, ["commit", "-q", "-m", "second"]);
    const head = gitAt(dir, ["rev-parse", "HEAD"]);
    expect(gitAt(dir, ["rev-parse", "HEAD~1"])).not.toBe(head);
    expect(identityOf(dir)).toEqual({ revision: head, dirty: false });
    writeFileSync(join(dir, "untracked.txt"), "u\n");
    expect(identityOf(dir)).toEqual({ revision: head, dirty: true });
  });

  it("O2 a toplevel with an unborn HEAD (git init, no commit) is {unknown, unknown}: the revision key never drops out", () => {
    const dir = makeScratch("rc-unborn-");
    roots.push(dir);
    gitAt(dir, ["init", "-q"]);
    const identity = identityOf(dir);
    expect(identity).toEqual({ revision: "unknown", dirty: "unknown" });
    expect(Object.keys(identity).sort()).toEqual(["dirty", "revision"]);
  });
});
