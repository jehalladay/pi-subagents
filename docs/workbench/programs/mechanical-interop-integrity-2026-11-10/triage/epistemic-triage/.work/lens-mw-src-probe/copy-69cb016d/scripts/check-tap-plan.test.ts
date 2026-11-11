import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync, symlinkSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

// MechanicalWorkflows-nuir: the test step must notice a test that stops reporting. The t7he review found a file
// declaring 15 top-level test() calls whose TAP plan said 1..14 because a synchronous process.stdout.write stub
// swallowed the report, and the gate stayed green since it counts reported failures only. The checker compares the
// static top-level declaration count of every *.test.ts with the plan the node test runner reports for that file.
const checker = resolve(import.meta.dirname, "check-tap-plan.ts");
const PASS_TEST = 'import test from "node:test";\nimport assert from "node:assert/strict";\n';
function fixture<T>(files: Record<string, string>, fn: (root: string) => T): T {
  const root = mkdtempSync(join(tmpdir(), "mw-tap-plan-"));
  try {
    writeFileSync(join(root, "package.json"), '{ "type": "module" }\n');
    for (const [path, content] of Object.entries(files)) {
      mkdirSync(resolve(join(root, path), ".."), { recursive: true });
      writeFileSync(join(root, path), content);
    }
    return fn(root);
  } finally { rmSync(root, { recursive: true, force: true }); }
}
function check(root: string, ...files: string[]) {
  return spawnSync(process.execPath, [checker, "--root", root, ...files], { cwd: root, encoding: "utf8" });
}

test("tap-plan gate passes a file whose top-level declarations all report, and names both counts", () => fixture({
  "scripts/matching.test.ts": PASS_TEST + 'test("a", () => { assert.ok(true); });\ntest("b", () => { assert.ok(true); });\n',
}, root => {
  const p = check(root, "scripts/matching.test.ts");
  assert.equal(p.status, 0, p.stderr);
  assert.match(p.stdout, /tap-plan: pass \(1 files, declared 2, reported 2\)/);
}));

test("tap-plan gate fails TEST_PLAN_UNDERREPORTED naming the file and both counts when a synchronous stdout stub swallows the report", () => fixture({
  "scripts/swallow.test.ts": PASS_TEST
    + 'test("one", () => { assert.ok(true); });\n'
    + 'test("two swallows stdout", () => { (process.stdout as unknown as { write: () => boolean }).write = () => true; assert.ok(true); });\n'
    + 'test("three", () => { assert.ok(true); });\n',
}, root => {
  const p = check(root, "scripts/swallow.test.ts");
  assert.notEqual(p.status, 0);
  assert.match(p.stderr, /TEST_PLAN_UNDERREPORTED: scripts\/swallow\.test\.ts declared=3 reported=1\b/);
  assert.match(p.stdout, /tap-plan: fail/);
}));

test("loop-generated tests report more than the static top-level count and pass", () => fixture({
  "scripts/loop.test.ts": PASS_TEST + 'test("fixed", () => { assert.ok(true); });\nfor (const n of [1, 2, 3]) {\n  test(`loop ${n}`, () => { assert.ok(n > 0); });\n}\n',
}, root => {
  const p = check(root, "scripts/loop.test.ts");
  assert.equal(p.status, 0, p.stderr);
  assert.match(p.stdout, /tap-plan: pass \(1 files, declared 1, reported 4\)/);
}));

test("a failing test is surfaced as TEST_FILE_FAILED with its exit status and the step does not pass", () => fixture({
  "scripts/failing.test.ts": PASS_TEST + 'test("red", () => { assert.equal(1, 2); });\n',
}, root => {
  const p = check(root, "scripts/failing.test.ts");
  assert.notEqual(p.status, 0);
  assert.match(p.stderr, /TEST_FILE_FAILED: scripts\/failing\.test\.ts status=1\b/);
  assert.doesNotMatch(p.stderr, /TEST_PLAN_UNDERREPORTED/);
}));

test("a test file that cannot load is TEST_FILE_FAILED, never a silent pass", () => fixture({
  "scripts/broken.test.ts": PASS_TEST + 'import { missing } from "./does-not-exist.js";\ntest("never runs", () => { assert.ok(missing); });\n',
}, root => {
  const p = check(root, "scripts/broken.test.ts");
  assert.notEqual(p.status, 0);
  assert.match(p.stderr, /TEST_FILE_FAILED: scripts\/broken\.test\.ts status=1\b/);
}));

test("with no file arguments the checker enumerates scripts, package and app test files below the root", () => fixture({
  "scripts/a.test.ts": PASS_TEST + 'test("a", () => { assert.ok(true); });\n',
  "packages/x/test/b.test.ts": PASS_TEST + 'test("b", () => { assert.ok(true); });\n',
  "apps/y/test/c.test.ts": PASS_TEST + 'test("c", () => { assert.ok(true); });\n',
  "packages/x/src/not-a-test.ts": "export const n = 1;\n",
}, root => {
  const p = check(root);
  assert.equal(p.status, 0, p.stderr);
  assert.match(p.stdout, /tap-plan: pass \(3 files, declared 3, reported 3\)/);
}));

test("an unknown flag is refused as INPUT_INVALID with exit 2 before any test runs", () => fixture({
  "scripts/never.test.ts": PASS_TEST + 'test("never", () => { assert.ok(true); });\n',
}, root => {
  const p = spawnSync(process.execPath, [checker, "--root", root, "--bogus", "scripts/never.test.ts"], { cwd: root, encoding: "utf8" });
  assert.equal(p.status, 2);
  assert.match(p.stderr, /INPUT_INVALID: unknown argument --bogus/);
  assert.equal(p.stdout, "");
}));

// MechanicalWorkflows-ah29: the checker used to discard the child's stderr and print only the exit status, so a seat gate
// FAIL (cmd_dcce6191e271: TEST_FILE_FAILED ... status=1 while four suites reported 0 failures) could be attributed to
// neither a subtest nor load. A non-zero child exit now prints the child's failing TAP lines and a bounded stderr tail.
test("a failing subtest prints its not-ok line and YAML diagnostic block after TEST_FILE_FAILED", () => fixture({
  "scripts/failing.test.ts": PASS_TEST + 'test("red subtest", () => { assert.equal(1, 2); });\n',
}, root => {
  const p = check(root, "scripts/failing.test.ts");
  assert.notEqual(p.status, 0);
  const lines = p.stderr.split("\n");
  const failed = lines.findIndex(line => /^TEST_FILE_FAILED: scripts\/failing\.test\.ts status=1\b/.test(line));
  assert.ok(failed >= 0, p.stderr);
  const after = lines.slice(failed + 1).join("\n");
  assert.match(after, /^\s*not ok \d+ - red subtest$/m);
  assert.match(after, /^\s+---$/m);
  assert.match(after, /^\s+\.\.\.$/m);
  assert.match(after, /code: 'ERR_ASSERTION'|ERR_ASSERTION/);
}));

test("a test file that cannot load surfaces the child's loader error text beside TEST_FILE_FAILED", () => fixture({
  "scripts/broken.test.ts": PASS_TEST + 'import { missing } from "./does-not-exist.js";\ntest("never runs", () => { assert.ok(missing); });\n',
}, root => {
  const p = check(root, "scripts/broken.test.ts");
  assert.notEqual(p.status, 0);
  const lines = p.stderr.split("\n");
  const failed = lines.findIndex(line => /^TEST_FILE_FAILED: scripts\/broken\.test\.ts status=1\b/.test(line));
  assert.ok(failed >= 0, p.stderr);
  assert.match(lines.slice(failed + 1).join("\n"), /does-not-exist/);
}));

test("the stderr tail is bounded to the last 20 lines and 4 KiB", () => fixture({
  "scripts/noisy.test.ts": PASS_TEST
    + 'test("noisy then red", () => {\n'
    + '  for (let n = 1; n <= 200; n++) process.stderr.write(`NOISE-LINE-${n} ${"x".repeat(300)}\\n`);\n'
    + '  assert.equal(1, 2);\n'
    + '});\n',
}, root => {
  const p = check(root, "scripts/noisy.test.ts");
  assert.notEqual(p.status, 0);
  assert.match(p.stderr, /NOISE-LINE-200 /);
  assert.doesNotMatch(p.stderr, /NOISE-LINE-1 /);
  assert.doesNotMatch(p.stderr, /NOISE-LINE-100 /);
  const noise = p.stderr.split("\n").filter(line => line.includes("NOISE-LINE-"));
  assert.ok(noise.length <= 20, `tail kept ${noise.length} lines`);
  assert.ok(noise.join("\n").length <= 4096, "tail exceeded 4 KiB");
}));

test("a passing file prints nothing to stderr beyond today's output", () => fixture({
  "scripts/quiet.test.ts": PASS_TEST + 'test("quiet", () => { process.stderr.write("child chatter\\n"); assert.ok(true); });\n',
}, root => {
  const p = check(root, "scripts/quiet.test.ts");
  assert.equal(p.status, 0, p.stderr);
  assert.equal(p.stderr, "");
  assert.match(p.stdout, /tap-plan: pass \(1 files, declared 1, reported 1\)/);
}));

test("the stderr tail keeps at most the last 20 lines even when each line is short", () => fixture({
  "scripts/chatty.test.ts": PASS_TEST
    + 'test("chatty then red", () => {\n'
    + '  for (let n = 1; n <= 200; n++) process.stderr.write(`SHORT-${n}\\n`);\n'
    + '  assert.equal(1, 2);\n'
    + '});\n',
}, root => {
  const p = check(root, "scripts/chatty.test.ts");
  assert.notEqual(p.status, 0);
  const short = p.stderr.split("\n").filter(line => /SHORT-\d+$/.test(line));
  assert.ok(short.length > 0 && short.length <= 20, `tail kept ${short.length} lines`);
  assert.match(p.stderr, /SHORT-200$/m);
  assert.doesNotMatch(p.stderr, /SHORT-100$/m);
}));

// MechanicalWorkflows-1q2y: at ebba2901 the mutant dropping the indentation clause of failingTap's YAML-block loop
// ("next.length - next.trimStart().length <= indent" removed from the break condition) survived 3 of 6 full runs; the
// other 3 kills came from stderr-relay timing luck in the bounded-tail tests, not from any boundary assertion. These
// pins are deterministic: the TAP stdout stream always orders a following passing result and the run summary after
// "not ok 1", so a loop that ignores indentation must drag them into the excerpt, while the correct excerpt never
// carries them.
test("the failing-TAP excerpt ends at the YAML block: a following passing subtest and the run summary stay out", () => fixture({
  "scripts/mixed.test.ts": PASS_TEST
    + 'test("red", () => { assert.equal(1, 2); });\n'
    + 'test("green", () => { assert.ok(true); });\n',
}, root => {
  const p = check(root, "scripts/mixed.test.ts");
  assert.notEqual(p.status, 0);
  const lines = p.stderr.split("\n");
  const failed = lines.findIndex(line => /^TEST_FILE_FAILED: scripts\/mixed\.test\.ts status=1\b/.test(line));
  assert.ok(failed >= 0, p.stderr);
  const after = lines.slice(failed + 1).join("\n");
  assert.match(after, /^\s*not ok 1 - red$/m);
  assert.match(after, /^\s+---$/m);
  assert.match(after, /^\s+\.\.\.$/m);
  assert.doesNotMatch(after, /^\s*ok 2 - green$/m);
  assert.doesNotMatch(after, /1\.\.2/);
  assert.doesNotMatch(after, /# tests 2/);
}));

test("every failing subtest contributes its own not-ok line and YAML block, still without the summary", () => fixture({
  "scripts/two-red.test.ts": PASS_TEST
    + 'test("red one", () => { assert.equal(1, 2); });\n'
    + 'test("red two", () => { assert.equal(3, 4); });\n',
}, root => {
  const p = check(root, "scripts/two-red.test.ts");
  assert.notEqual(p.status, 0);
  const lines = p.stderr.split("\n");
  const failed = lines.findIndex(line => /^TEST_FILE_FAILED: scripts\/two-red\.test\.ts status=1\b/.test(line));
  assert.ok(failed >= 0, p.stderr);
  const after = lines.slice(failed + 1).join("\n");
  assert.match(after, /^\s*not ok 1 - red one$/m);
  assert.match(after, /^\s*not ok 2 - red two$/m);
  assert.ok((after.match(/^\s+---$/gm) ?? []).length >= 2, "each not-ok keeps its YAML open marker");
  assert.ok((after.match(/^\s+\.\.\.$/gm) ?? []).length >= 2, "each not-ok keeps its YAML close marker");
  assert.doesNotMatch(after, /1\.\.2/);
  assert.doesNotMatch(after, /# tests 2/);
}));

// MechanicalWorkflows-869cl.2 (EAT-R115, listing robustness): the member walker classified entries with statSync, which follows
// symlinks, so a dangling symlink under packages/ or apps/ crashed the whole TAP-plan check with ENOENT and a symlink to a
// directory outside the member tree was counted as a member. Members are real directories: a symlink is excluded, never followed.
const REAL_MEMBER = { "packages/real/test/real.test.ts": PASS_TEST + 'test("real", () => { assert.ok(true); });\n' };
test("a dangling symlink under packages/ is excluded and the enumeration completes with the real members (869cl.2 slot 07-implement)", () => fixture(REAL_MEMBER, root => {
  symlinkSync("does-not-exist", join(root, "packages", "dangling"));
  const p = check(root);
  assert.equal(p.status, 0, p.stderr);
  assert.doesNotMatch(p.stderr, /ENOENT/);
  assert.match(p.stdout, /tap-plan: pass \(1 files, declared 1, reported 1\)/);
}));

test("a symlink cycle under packages/ is excluded: the cycle target's test directory is not reached through it (869cl.2 slot 07-implement)", () => fixture({
  ...REAL_MEMBER,
  "test/stray.test.ts": PASS_TEST + 'test("stray", () => { assert.ok(true); });\n',
}, root => {
  symlinkSync("..", join(root, "packages", "up"), "dir");
  const p = check(root);
  assert.equal(p.status, 0, p.stderr);
  assert.match(p.stdout, /tap-plan: pass \(1 files, declared 1, reported 1\)/);
}));

test("a symlinked member directory below packages/ is excluded while real members keep sorted order (869cl.2 slot 07-implement)", () => fixture(REAL_MEMBER, root => {
  const outside = mkdtempSync(join(tmpdir(), "mw-tap-plan-outside-"));
  try {
    mkdirSync(join(outside, "test"), { recursive: true });
    writeFileSync(join(outside, "test", "linked.test.ts"), PASS_TEST + 'test("linked", () => { assert.ok(true); });\n');
    symlinkSync(outside, join(root, "packages", "aaa-linked"), "dir");
    const p = check(root);
    assert.equal(p.status, 0, p.stderr);
    assert.match(p.stdout, /tap-plan: pass \(1 files, declared 1, reported 1\)/);
  } finally { rmSync(outside, { recursive: true, force: true }); }
}));
