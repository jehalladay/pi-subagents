import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { digest } from "../packages/coordination/dist/index.js";
import { ENVIRONMENT_EXAMPLES, runFixtureExample, liveExample } from "../examples/fixture-examples.ts";

const fixtureDir = "qa/integration/python-consumer/fixtures";
const runEntry = (...args: string[]) => spawnSync(process.execPath, ["examples/run-example.ts", ...args], { encoding: "utf8", env: { ...process.env, MW_LIVE_FORGE_FLOW: "" } });

test("each of the five fixture environments has an example entry that exits 0 and prints a fixture-labelled digest equal to the committed exported episode", () => {
  assert.deepEqual(ENVIRONMENT_EXAMPLES.map(row => row.environment), ["landing-queue", "compaction-inheritance", "colony-resilience", "artifact-recovery", "quorum-evidence"]);
  for (const row of ENVIRONMENT_EXAMPLES) {
    const run = runEntry(row.environment);
    assert.equal(run.status, 0, `${row.environment}: ${run.stderr}`);
    const committed = JSON.parse(readFileSync(`${fixtureDir}/${row.committedFile}`, "utf8"));
    assert.equal(run.stdout.trim(), `fixture ${row.environment} seed=${row.seed} episode-digest=${digest(committed)} committed=${row.committedFile} match=true`);
  }
});

test("a committed fixture whose bytes differ from the regenerated episode makes the example refuse with EXAMPLE_DIGEST_MISMATCH instead of printing a match", () => {
  const row = ENVIRONMENT_EXAMPLES[0]!;
  const mismatch = runFixtureExample(row.environment, "{}\n");
  assert.equal(mismatch.ok, false);
  assert.equal(mismatch.ok === false ? mismatch.code : "", "EXAMPLE_DIGEST_MISMATCH");
});

test("an unknown environment name is refused with EXAMPLE_UNKNOWN_ENVIRONMENT and exit 2", () => {
  const run = runEntry("no-such-environment");
  assert.equal(run.status, 2);
  assert.match(run.stderr, /EXAMPLE_UNKNOWN_ENVIRONMENT/);
});

test("the live example refuses with EXAMPLE_LIVE_NOT_ENABLED without MW_LIVE_FORGE_FLOW=1 and, with the flag, still refuses with EXAMPLE_LIVE_NOT_WITNESSED because the live journey has not been witnessed", () => {
  const off = runEntry("live");
  assert.equal(off.status, 2);
  assert.match(off.stderr, /EXAMPLE_LIVE_NOT_ENABLED/);
  assert.equal(liveExample({}).code, "EXAMPLE_LIVE_NOT_ENABLED");
  assert.equal(liveExample({ MW_LIVE_FORGE_FLOW: "true" }).code, "EXAMPLE_LIVE_NOT_ENABLED");
  assert.equal(liveExample({ MW_LIVE_FORGE_FLOW: "1" }).code, "EXAMPLE_LIVE_NOT_WITNESSED");
  const on = spawnSync(process.execPath, ["examples/run-example.ts", "live"], { encoding: "utf8", env: { ...process.env, MW_LIVE_FORGE_FLOW: "1" } });
  assert.equal(on.status, 2);
  assert.match(on.stderr, /EXAMPLE_LIVE_NOT_WITNESSED/);
});

test("a committed fixture that differs from the regenerated episode only by one trailing space is refused with EXAMPLE_DIGEST_MISMATCH, so the comparison is byte equality and not JSON equality", () => {
  for (const row of ENVIRONMENT_EXAMPLES) {
    const committed = readFileSync(`${fixtureDir}/${row.committedFile}`, "utf8");
    assert.equal(runFixtureExample(row.environment, committed).ok, true, row.environment);
    const padded = runFixtureExample(row.environment, committed + " ");
    assert.equal(padded.ok === false ? padded.code : "match", "EXAMPLE_DIGEST_MISMATCH", row.environment);
  }
});

test("the example entry exits 1 with EXAMPLE_DIGEST_MISMATCH on stderr and prints nothing on stdout when the committed fixture bytes differ", () => {
  const row = ENVIRONMENT_EXAMPLES[0]!;
  const entry = resolve("examples/run-example.ts");
  const root = mkdtempSync(join(process.cwd(), ".example-mismatch-"));
  try {
    mkdirSync(join(root, fixtureDir), { recursive: true });
    writeFileSync(join(root, fixtureDir, row.committedFile), "{}\n");
    const run = spawnSync(process.execPath, [entry, row.environment], { cwd: root, encoding: "utf8", env: { ...process.env, MW_LIVE_FORGE_FLOW: "" } });
    assert.equal(run.status, 1, run.stderr);
    assert.match(run.stderr, /EXAMPLE_DIGEST_MISMATCH/);
    assert.equal(run.stdout, "");
  } finally { rmSync(root, { recursive: true, force: true }); }
});

test("package.json wires example:<environment> for each of the five rows and example:live to the entry, each building first, and declares no other example script", () => {
  const scripts = JSON.parse(readFileSync("package.json", "utf8")).scripts as Record<string, string>;
  const names = [...ENVIRONMENT_EXAMPLES.map(row => row.environment), "live"];
  for (const name of names) assert.equal(scripts[`example:${name}`], `npm run build && node examples/run-example.ts ${name}`, name);
  assert.deepEqual(Object.keys(scripts).filter(key => key.startsWith("example:")).sort(), names.map(name => `example:${name}`).sort());
});

test("a committed fixture whose line endings are CRLF instead of the regenerated LF is refused with EXAMPLE_DIGEST_MISMATCH, so no newline normalization precedes the byte comparison", () => {
  for (const row of ENVIRONMENT_EXAMPLES) {
    const committed = readFileSync(`${fixtureDir}/${row.committedFile}`, "utf8");
    assert.ok(committed.endsWith("\n") && !committed.includes("\r"), row.environment);
    const crlf = runFixtureExample(row.environment, committed.replace(/\n/g, "\r\n"));
    assert.equal(crlf.ok === false ? crlf.code : "match", "EXAMPLE_DIGEST_MISMATCH", row.environment);
  }
});

test("a committed fixture that starts with a UTF-8 byte-order mark is refused with EXAMPLE_DIGEST_MISMATCH, so no BOM stripping precedes the byte comparison", () => {
  for (const row of ENVIRONMENT_EXAMPLES) {
    const committed = readFileSync(`${fixtureDir}/${row.committedFile}`, "utf8");
    const bom = runFixtureExample(row.environment, "\uFEFF" + committed);
    assert.equal(bom.ok === false ? bom.code : "match", "EXAMPLE_DIGEST_MISMATCH", row.environment);
  }
});


test("a committed fixture missing its final newline, a strict prefix of the regenerated bytes, is refused with EXAMPLE_DIGEST_MISMATCH, so no final-newline repair or prefix match precedes the byte comparison", () => {
  for (const row of ENVIRONMENT_EXAMPLES) {
    const committed = readFileSync(`${fixtureDir}/${row.committedFile}`, "utf8");
    assert.ok(committed.endsWith("\n"), row.environment);
    const truncated = runFixtureExample(row.environment, committed.slice(0, -1));
    assert.equal(truncated.ok === false ? truncated.code : "match", "EXAMPLE_DIGEST_MISMATCH", row.environment);
  }
});

test("a committed fixture of the regenerated length with one digit changed is refused with EXAMPLE_DIGEST_MISMATCH, so the comparison reads every byte and not only the length", () => {
  for (const row of ENVIRONMENT_EXAMPLES) {
    const committed = readFileSync(`${fixtureDir}/${row.committedFile}`, "utf8");
    const changed = committed.replace(/[0-9]/, digit => String((Number(digit) + 1) % 10));
    assert.ok(changed !== committed && changed.length === committed.length, row.environment);
    const substituted = runFixtureExample(row.environment, changed);
    assert.equal(substituted.ok === false ? substituted.code : "match", "EXAMPLE_DIGEST_MISMATCH", row.environment);
  }
});

test("a committed fixture of the regenerated length and digit sequence with one letter's case changed is refused with EXAMPLE_DIGEST_MISMATCH, so the comparison reads non-digit bytes and is case-sensitive", () => {
  for (const row of ENVIRONMENT_EXAMPLES) {
    const committed = readFileSync(`${fixtureDir}/${row.committedFile}`, "utf8");
    const recased = committed.replace(/[a-z]/, letter => letter.toUpperCase());
    assert.ok(recased !== committed && recased.length === committed.length && recased.replace(/[^0-9]/g, "") === committed.replace(/[^0-9]/g, ""), row.environment);
    const outcome = runFixtureExample(row.environment, recased);
    assert.equal(outcome.ok === false ? outcome.code : "match", "EXAMPLE_DIGEST_MISMATCH", row.environment);
  }
});

test("a committed fixture of the regenerated length whose final byte alone is changed is refused with EXAMPLE_DIGEST_MISMATCH, so the comparison reads the last byte", () => {
  for (const row of ENVIRONMENT_EXAMPLES) {
    const committed = readFileSync(`${fixtureDir}/${row.committedFile}`, "utf8");
    assert.ok(committed.endsWith("\n"), row.environment);
    const lastChanged = committed.slice(0, -1) + " ";
    assert.ok(lastChanged !== committed && lastChanged.length === committed.length && lastChanged.slice(0, -1) === committed.slice(0, -1), row.environment);
    const outcome = runFixtureExample(row.environment, lastChanged);
    assert.equal(outcome.ok === false ? outcome.code : "match", "EXAMPLE_DIGEST_MISMATCH", row.environment);
  }
});

test("a committed fixture of the regenerated length whose first byte alone is changed is refused with EXAMPLE_DIGEST_MISMATCH, so the comparison reads the first byte", () => {
  for (const row of ENVIRONMENT_EXAMPLES) {
    const committed = readFileSync(`${fixtureDir}/${row.committedFile}`, "utf8");
    assert.ok(committed.startsWith("{"), row.environment);
    const firstChanged = "[" + committed.slice(1);
    assert.ok(firstChanged !== committed && firstChanged.length === committed.length && firstChanged.slice(1) === committed.slice(1), row.environment);
    const outcome = runFixtureExample(row.environment, firstChanged);
    assert.equal(outcome.ok === false ? outcome.code : "match", "EXAMPLE_DIGEST_MISMATCH", row.environment);
  }
});
