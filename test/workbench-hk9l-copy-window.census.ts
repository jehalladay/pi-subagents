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
 * Pinned by title in the test tier: the four budgeted PACKAGE_COPY_ROWS rows and the emit census row of
 * test/workbench-identity.test.ts (each collected once, passed and asserting in the gate's own report), so the sidecar
 * read below is a read of THIS gate's identity run. NOT pinned: anything the identity file does not itself claim.
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
const SUITE = "WB-014 immutable invocation identity";

const pin = (title: string): CasePin => ({ file: IDENTITY_FILE, title, suite: [SUITE], tier: DEFAULT_GATE_TIER });

/** The budgeted rows and the two judging rows of the identity file, exact titles as registered. */
const PINS: readonly CasePin[] = [
  pin("pins actual package.json, package-lock.json and local vendor artifact bytes, not declared fiction"),
  pin("uses the shipped dependency lock only when npm has excluded package-lock.json"),
  pin("rejects lockfile changes, missing artifact and lockfile/manifest mismatch"),
  pin("wrap liveness: every judged copy surface emits from this row once"),
  pin("wb-hk9l emit census: the rows observed really copying are exactly the budgeted PACKAGE_COPY_ROWS"),
];
// NOT pinned here: the budget row ("wb-hk9l: every package-copy row runs under the explicit file-local budget ...") takes the
// test context to walk the file's tasks, which report mode cannot classify; the emit census row above asserts from the
// identity file's own AST that the budget row is registered once in the suite, so its deletion still reds a pinned row.

describe("wb-hk9l copy window (v8): the identity file's judged rows ran, and its violation sidecar is empty", () => {
  it("each-liveness: five pinned rows, each once", () => {
    expect(PINS).toHaveLength(5);
    expect(new Set(PINS.map(entry => `${entry.file}\u0000${entry.title}`)).size).toBe(PINS.length);
  });

  it("every pinned identity row was collected once, passed in the test tier's report, and asserts", () => {
    const verdicts = judge(REPORT, PINS);
    expect(verdicts).toHaveLength(PINS.length);
    const red = verdicts.filter(verdict => !verdict.ok || verdict.cases !== 1).map(verdict => `${verdict.pin.title} [${verdict.code}, cases ${verdict.cases}]: ${verdict.why}`);
    expect(red, "every pinned identity row collected once, passed and asserting").toEqual([]);
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
