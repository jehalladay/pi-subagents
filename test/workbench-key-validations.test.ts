/**
 * wb-cax.24 (W22): census falsifier for docs/workbench/13-contracts-and-config.md "Key validations".
 *
 * The section states six validations in two sentences. This file binds each one to an existing
 * case by file, verbatim title and tier, or records it as unpinned with a reason. It reads the
 * pinned suites as TEXT only: it never executes a pinned case and never claims a live or native
 * pass from a title's presence. A rename, deletion or skip/todo/fails/only of a pinned case, a
 * title that occurs twice, or a docs edit that drops or rewrites a validation goes red naming the
 * validation, the file and the title (docs/workbench/14 "Each major work package must have a
 * falsifier: a negative test that would fail if a critical guarantee was quietly weakened.").
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

type Tier = "default-gate" | "live-tier";
type Pin = { readonly file: string; readonly title: string };
type Row =
  | { readonly n: number; readonly validation: string; readonly quote: string; readonly tier: Tier; readonly status: "pinned"; readonly pins: readonly Pin[] }
  | { readonly n: number; readonly validation: string; readonly quote: string; readonly tier: Tier; readonly status: "unpinned"; readonly pins: readonly []; readonly reason: string };

const DOCS_FILE = "docs/workbench/13-contracts-and-config.md";

const SENTENCE_ONE =
  "Contract hashes and source digests must be pinned in execution receipt; typed payload validated at boundary; no arbitrary code from descriptor field; compare controlled vs observed state; unrecognized SDK message version => diagnostic rather than silent success.";
const SENTENCE_TWO = "All date/timestamp strings have timezone and are not used as total global event order.";

const TABLE: readonly Row[] = Object.freeze([
  {
    n: 1,
    validation: "contract hashes and source digests pinned in the execution receipt",
    quote: "Contract hashes and source digests must be pinned in execution receipt",
    tier: "default-gate",
    status: "pinned",
    pins: [
      { file: "test/workbench-identity.test.ts", title: "pins actual package.json, package-lock.json and local vendor artifact bytes, not declared fiction" },
      { file: "test/workbench-patch-proposal.test.ts", title: "pins the experiment to source digests and refuses a base that does not match its bytes first" },
    ],
  },
  {
    n: 2,
    validation: "typed payload validated at the boundary",
    quote: "typed payload validated at boundary",
    tier: "default-gate",
    status: "pinned",
    pins: [
      { file: "test/workbench-registry-auth.test.ts", title: "rejects oversized nesting and pollution before executing providers" },
      { file: "test/workbench-control.test.ts", title: "rule 1: unknown permission data (undefined, non-array, non-string entries, wildcards) is an authorization denial" },
    ],
  },
  {
    n: 3,
    validation: "no arbitrary code from a descriptor field",
    quote: "no arbitrary code from descriptor field",
    tier: "default-gate",
    status: "unpinned",
    pins: [],
    reason:
      "no descriptor-code case: grep of the registry and capability suites finds no case where a descriptor field carrying code is refused as code (the designer metadata cases cover script metadata, not a registry descriptor field); W06 wb-4ax scope",
  },
  {
    n: 4,
    validation: "controlled state is compared against observed state",
    quote: "compare controlled vs observed state",
    tier: "default-gate",
    status: "pinned",
    pins: [
      {
        file: "test/workbench-furnace-control.test.ts",
        title: "parks an answer that is transport success without the native echo: never acknowledged without the request echo, never settled without the terminal echo",
      },
    ],
  },
  {
    n: 5,
    validation: "an unrecognized SDK message version is a diagnostic, never silent success",
    quote: "unrecognized SDK message version => diagnostic rather than silent success",
    tier: "default-gate",
    status: "pinned",
    pins: [
      {
        file: "test/workbench-furnace-evidence.test.ts",
        title: "R5 docs/workbench/13 § Key validations: an unrecognized native answer is a diagnostic, never silent success",
      },
      { file: "test/workbench-furnace-evidence.test.ts", title: "refuses a response of another kind as unavailable" },
    ],
  },
  {
    n: 6,
    validation: "timestamps carry a timezone and never serve as a total global event order",
    quote: "All date/timestamp strings have timezone and are not used as total global event order.",
    tier: "default-gate",
    status: "pinned",
    pins: [
      { file: "test/workbench-timeline.test.ts", title: "carries no global sequence or ordering field and no elapsed, estimated or progress field" },
      { file: "test/workbench-forge-evidence.test.ts", title: "C4: the capture time is the host clock and must be a timezone-qualified instant" },
    ],
  },
]);

const normalize = (text: string): string => text.replace(/\s+/g, " ");
const readRepo = (path: string): string => readFileSync(join(process.cwd(), path), "utf8");

const SKIP_MODIFIERS = new Set(["skip", "todo", "fails", "only"]);
const CALL_TAIL = /\b(describe|it|test)((?:\.[A-Za-z]+)*)\(\s*$/;

/**
 * Verdict for one pinned title in one suite's text: "ok", or a reason string naming what is wrong.
 * The title must be the first argument of exactly one describe/it/test call, with no modifier
 * that skips, defers, inverts or isolates it.
 */
function checkPin(source: string, title: string): string {
  const calls: string[] = [];
  for (const quote of ['"', "'", "`"]) {
    const literal = `${quote}${title}${quote}`;
    let from = source.indexOf(literal);
    while (from !== -1) {
      const call = CALL_TAIL.exec(source.slice(Math.max(0, from - 64), from));
      if (call) calls.push(call[2] ?? "");
      from = source.indexOf(literal, from + literal.length);
    }
  }
  if (calls.length === 0) return "title not found as a describe/it/test call";
  if (calls.length > 1) return `title occurs ${calls.length} times, expected exactly once`;
  const modifiers = (calls[0] ?? "").split(".").filter((part) => part !== "");
  const blocked = modifiers.filter((part) => SKIP_MODIFIERS.has(part));
  if (blocked.length > 0) return `case is .${blocked.join(".")}`;
  return "ok";
}

describe("wb-cax.24 docs/workbench/13 § Key validations census", () => {
  it("quotes both Key validations sentences and every clause verbatim from the docs file at HEAD", () => {
    const docs = normalize(readRepo(DOCS_FILE));
    expect(docs, `${DOCS_FILE} drifted: sentence one of "Key validations" is missing or rewritten`).toContain(SENTENCE_ONE);
    expect(docs, `${DOCS_FILE} drifted: sentence two of "Key validations" is missing or rewritten`).toContain(SENTENCE_TWO);
    for (const row of TABLE) {
      expect(docs, `validation ${row.n} (${row.validation}): quote no longer appears in ${DOCS_FILE}`).toContain(row.quote);
    }
  });

  it("holds exactly six frozen rows numbered 1 to 6, each pinned to existing cases or unpinned with a reason", () => {
    expect(Object.isFrozen(TABLE)).toBe(true);
    expect(TABLE.map((row) => row.n)).toEqual([1, 2, 3, 4, 5, 6]);
    for (const row of TABLE) {
      expect(["default-gate", "live-tier"], `validation ${row.n}: tier`).toContain(row.tier);
      if (row.status === "pinned") {
        expect(row.pins.length, `validation ${row.n} (${row.validation}): pinned row has no pins`).toBeGreaterThan(0);
      } else {
        expect(row.pins.length, `validation ${row.n}: an unpinned row must not carry pins`).toBe(0);
        expect(row.reason.trim().length, `validation ${row.n} (${row.validation}): unpinned row needs a reason`).toBeGreaterThan(20);
      }
    }
  });

  it("lists the unpinned validations so none is ever counted as passed", () => {
    const unpinned = TABLE.filter((row) => row.status === "unpinned").map((row) => row.n);
    expect(unpinned).toEqual([3]);
  });

  it.each(TABLE.filter((row) => row.status === "pinned"))("validation $n ($validation): every pinned case exists exactly once and is not skipped", (row) => {
    const failures: string[] = [];
    for (const pin of row.pins) {
      const verdict = checkPin(readRepo(pin.file), pin.title);
      if (verdict !== "ok") failures.push(`validation ${row.n} (${row.validation}): ${pin.file} :: "${pin.title}" -> ${verdict}`);
    }
    expect(failures).toEqual([]);
  });

  it("never executes a pinned case: the census only reads suite text", () => {
    const own = readRepo("test/workbench-key-validations.test.ts");
    expect(own).not.toMatch(/\bawait import\(/);
    expect(own).not.toMatch(/\brequire\(/);
  });
});

describe("wb-cax.24 checkPin falsifier: one mutant per way a pinned case can be quietly weakened", () => {
  const TITLE = "keeps the guarantee";
  const base = `describe("suite", () => {\n  it("${TITLE}", () => {});\n});\n`;

  it("accepts the unmodified case", () => {
    expect(checkPin(base, TITLE)).toBe("ok");
  });

  it("goes red on a rename", () => {
    expect(checkPin(base.replace(TITLE, "keeps the guarantee, mostly"), TITLE)).toBe("title not found as a describe/it/test call");
  });

  it("goes red on a deletion", () => {
    expect(checkPin(`describe("suite", () => {});\n`, TITLE)).toBe("title not found as a describe/it/test call");
  });

  it.each([".skip", ".todo", ".fails", ".only"])("goes red on %s", (modifier) => {
    expect(checkPin(base.replace("it(", `it${modifier}(`), TITLE)).toBe(`case is ${modifier}`);
  });

  it("goes red on a duplicated title", () => {
    expect(checkPin(`${base}${base}`, TITLE)).toBe("title occurs 2 times, expected exactly once");
  });

  it("does not count a title that is only mentioned in a comment or an expectation", () => {
    expect(checkPin(`// "${TITLE}"\nexpect(x).toBe("${TITLE}");\n`, TITLE)).toBe("title not found as a describe/it/test call");
  });
});
