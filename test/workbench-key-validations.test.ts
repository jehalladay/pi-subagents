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
const CALL_TAIL = /\b(describe|suite|it|test)((?:\.[A-Za-z]+)*)\(\s*$/;
const OPTIONS_HEAD = /^\s*,\s*\{([^{}]*)\}/;
/** An options object member that skips, defers, inverts or isolates a case, unless it is literally false. */
const OPTION_MODIFIER = /\b(skip|todo|only|fails)\s*:\s*(?!false\b)(?=\S)/;
/**
 * Fail-closed file-wide hazards: any skip/todo/only/skipIf/runIf modifier chain on describe, suite, it
 * or test (including .concurrent chains), a skip() call (ctx.skip(), context.skip(), a destructured skip()),
 * or an options member that skips, defers, inverts or isolates. One hazard anywhere in a pinned file
 * fails EVERY pin in that file by name, because vitest may then no longer run the pinned case.
 */
const FILE_HAZARD =
  /\b(?:describe|suite|it|test)(?:\.[A-Za-z]+)*\.(?:only|skip|todo|skipIf|runIf)\b|(?<![\w$])(?:(?:ctx|context|t|task)\.)?skip\s*\(|\b(?:skip|todo|only|fails)\s*:\s*(?!false\b)(?=\S)/;

/**
 * Blanks // and block comments outside string and template literals, keeping newlines, so a
 * commented-out case never counts as present. Known limits: template-literal ${...} expressions and
 * regex literals are not parsed; none of the pinned suites carries a quote character inside a regex
 * literal before a pinned case today, and a mis-parse can only hide or expose text, which the exactly-once
 * title check then reports.
 */
function stripComments(source: string): string {
  let out = "";
  let quote = "";
  let i = 0;
  while (i < source.length) {
    const ch = source.charAt(i);
    const next = source.charAt(i + 1);
    if (quote !== "") {
      out += ch;
      if (ch === "\\") {
        out += next;
        i += 2;
        continue;
      }
      if (ch === quote) quote = "";
      i += 1;
      continue;
    }
    if (ch === "/" && next === "/") {
      while (i < source.length && source.charAt(i) !== "\n") i += 1;
      continue;
    }
    if (ch === "/" && next === "*") {
      const end = source.indexOf("*/", i + 2);
      const stop = end === -1 ? source.length : end + 2;
      out += source.slice(i, stop).replace(/[^\n]/g, " ");
      i = stop;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === "`") quote = ch;
    out += ch;
    i += 1;
  }
  return out;
}

/**
 * Verdict for one pinned title in one suite's text: "ok", or a reason string naming what is wrong.
 * Comments are stripped first. The title must be the first argument of exactly one describe/suite/it/test
 * call, with no dot modifier and no options-object modifier on it, and the file must carry no fail-closed
 * hazard anywhere (a skipping or isolating modifier on any describe/it/test, a skip() call, an options modifier).
 */
function checkPin(source: string, title: string): string {
  const code = stripComments(source);
  const calls: { readonly modifiers: string; readonly options: string }[] = [];
  for (const quote of ['"', "'", "`"]) {
    const literal = `${quote}${title}${quote}`;
    let from = code.indexOf(literal);
    while (from !== -1) {
      const call = CALL_TAIL.exec(code.slice(Math.max(0, from - 64), from));
      if (call) {
        const head = OPTIONS_HEAD.exec(code.slice(from + literal.length, from + literal.length + 240));
        calls.push({ modifiers: call[2] ?? "", options: head?.[1] ?? "" });
      }
      from = code.indexOf(literal, from + literal.length);
    }
  }
  if (calls.length === 0) return "title not found as a describe/it/test call";
  if (calls.length > 1) return `title occurs ${calls.length} times, expected exactly once`;
  const only = calls[0];
  const blocked = (only?.modifiers ?? "").split(".").filter((part) => SKIP_MODIFIERS.has(part));
  if (blocked.length > 0) return `case is .${blocked.join(".")}`;
  const option = OPTION_MODIFIER.exec(only?.options ?? "")?.[1];
  if (option !== undefined) return `case has option ${option}`;
  const hazard = FILE_HAZARD.exec(code)?.[0];
  if (hazard !== undefined) return `file hazard ${hazard.replace(/\s+/g, "")}`;
  return "ok";
}

/** The text under the "## Key validations" heading, bounded by the next heading or EOF, whitespace-normalized. */
function keyValidationsSection(docs: string): string {
  const heading = /^##[ \t]+Key validations[ \t]*$/m.exec(docs);
  if (heading === null) return "";
  const rest = docs.slice(heading.index + heading[0].length);
  const next = /^#{1,6}[ \t]/m.exec(rest);
  return normalize(next === null ? rest : rest.slice(0, next.index)).trim();
}

/** Every docs drift, each naming the validation (or section) it breaks; per-row quote checks run first and independently. */
function docsFailures(docs: string): string[] {
  const text = normalize(docs);
  const failures: string[] = [];
  for (const row of TABLE) {
    if (!text.includes(row.quote)) failures.push(`validation ${row.n} (${row.validation}): quote no longer appears in ${DOCS_FILE}`);
  }
  if (!text.includes(SENTENCE_ONE)) failures.push(`${DOCS_FILE} drifted: sentence one of "Key validations" is missing or rewritten`);
  if (!text.includes(SENTENCE_TWO)) failures.push(`${DOCS_FILE} drifted: sentence two of "Key validations" is missing or rewritten`);
  if (keyValidationsSection(docs) !== `${SENTENCE_ONE} ${SENTENCE_TWO}`) {
    failures.push(`${DOCS_FILE} drifted: the "## Key validations" section is not exactly its two sentences (heading missing, or text added or changed)`);
  }
  return failures;
}

/** Tier truth: a default-gate pin file must be matched by vitest include and absent from exclude, from the config text. */
function judgeTier(config: string, file: string): string {
  const list = (key: string): string[] => [...(new RegExp(`${key}:\\s*\\[([^\\]]*)\\]`).exec(config)?.[1] ?? "").matchAll(/"([^"]+)"/g)].map((m) => m[1] ?? "");
  if (!list("include").includes("test/**/*.test.ts")) return "vitest include no longer covers test/**/*.test.ts";
  if (!/^test\/.+\.test\.ts$/.test(file)) return "outside the default include test/**/*.test.ts";
  if (list("exclude").includes(file)) return "excluded from vitest.config.ts";
  return "ok";
}

describe("wb-cax.24 docs/workbench/13 § Key validations census", () => {
  it("quotes both Key validations sentences and every clause verbatim from the docs file at HEAD, the section being exactly those sentences", () => {
    expect(docsFailures(readRepo(DOCS_FILE))).toEqual([]);
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

  it("every default-gate pin file is matched by vitest.config.ts include and absent from its exclude (the tier is true)", () => {
    const config = readRepo("vitest.config.ts");
    const failures: string[] = [];
    for (const row of TABLE) {
      if (row.tier !== "default-gate") continue;
      for (const pin of row.pins) {
        const verdict = judgeTier(config, pin.file);
        if (verdict !== "ok") failures.push(`validation ${row.n} (${row.validation}): ${pin.file} -> ${verdict}`);
      }
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

describe("wb-cax.24 checkPin falsifier: ways a pinned case stays present as text while vitest no longer runs it", () => {
  const T = "keeps the guarantee";
  const suite = (inner: string): string => `describe("suite", () => {\n${inner}\n});\n`;
  const plain = `  it("${T}", () => {});`;

  it("S1 goes red when the pinned call is commented out with a line comment", () => {
    expect(checkPin(suite(`  // it("${T}", () => {});`), T)).toBe("title not found as a describe/it/test call");
  });

  it("S2 goes red when the pinned call is commented out with a block comment", () => {
    expect(checkPin(suite(`  /* it("${T}", () => {}); */`), T)).toBe("title not found as a describe/it/test call");
  });

  it("S4 goes red on an options object { skip: true } on the pinned case", () => {
    expect(checkPin(suite(`  it("${T}", { skip: true }, () => {});`), T)).toBe("case has option skip");
  });

  it("S4t goes red on an options object { todo: true } on the pinned case", () => {
    expect(checkPin(suite(`  it("${T}", { todo: true }, () => {});`), T)).toBe("case has option todo");
  });

  it("S10 goes red on an options object { skip: true } on a pinned describe", () => {
    expect(checkPin(`describe("${T}", { skip: true }, () => {\n  it("inner", () => {});\n});\n`, T)).toBe("case has option skip");
  });

  it("S3 goes red when an enclosing describe is describe.skipIf(true)", () => {
    expect(checkPin(`describe.skipIf(true)("suite", () => {\n${plain}\n});\n`, T)).toBe("file hazard describe.skipIf");
  });

  it("S3r goes red when an enclosing describe is describe.runIf(false)", () => {
    expect(checkPin(`describe.runIf(false)("suite", () => {\n${plain}\n});\n`, T)).toBe("file hazard describe.runIf");
  });

  it("G11 goes red when the enclosing describe is describe.skip", () => {
    expect(checkPin(`describe.skip("suite", () => {\n${plain}\n});\n`, T)).toBe("file hazard describe.skip");
  });

  it("G11b goes red when a sibling describe in the file is describe.skip", () => {
    expect(checkPin(`${suite(plain)}describe.skip("other", () => {});\n`, T)).toBe("file hazard describe.skip");
  });

  it("S5 goes red when the pinned body calls ctx.skip()", () => {
    expect(checkPin(suite(`  it("${T}", (ctx) => {\n    ctx.skip();\n  });`), T)).toBe("file hazard ctx.skip(");
  });

  it("S5 goes red when the pinned body calls a destructured skip()", () => {
    expect(checkPin(suite(`  it("${T}", ({ skip }) => {\n    skip();\n  });`), T)).toBe("file hazard skip(");
  });

  it("G12 goes red on a stray focused case elsewhere in the file", () => {
    const focus = "on" + "ly";
    expect(checkPin(suite(`${plain}\n  it.${focus}("another", () => {});`), T)).toBe(`file hazard it.${focus}`);
  });

  it("goes red on a chained modifier such as it.concurrent.skip elsewhere in the file", () => {
    expect(checkPin(suite(`${plain}\n  it.concurrent.skip("another", () => {});`), T)).toBe("file hazard it.concurrent.skip");
  });

  it("stays green for a // inside a string, an explicit { skip: false }, and hazard words only in comments", () => {
    const text = suite(`  // describe.skip is not used here\n  /* it.${"on" + "ly"}("x") */\n  it("${T}", { skip: false }, () => {\n    const u = "http://example.test/a";\n    expect(u).toBe("http://example.test/a");\n  });`);
    expect(checkPin(text, T)).toBe("ok");
  });
});

describe("wb-cax.24 docs drift names the validation (U2)", () => {
  const good = `# Doc\n\n## Key validations\n\n${SENTENCE_ONE} ${SENTENCE_TWO}\n`;

  it("accepts the section exactly as written", () => {
    expect(docsFailures(good)).toEqual([]);
  });

  it("K7 names validation 3 when clause 3 is dropped from sentence one", () => {
    const failures = docsFailures(good.replace(" no arbitrary code from descriptor field;", ""));
    expect(failures.some((line) => line.includes("validation 3"))).toBe(true);
  });

  it("K8 names validation 4 when clause 4 is reworded", () => {
    const failures = docsFailures(good.replace("compare controlled vs observed state", "compare controlled with observed state"));
    expect(failures.some((line) => line.includes("validation 4"))).toBe(true);
  });

  it("K9 names validation 6 when sentence two is dropped", () => {
    const failures = docsFailures(good.replace(SENTENCE_TWO, ""));
    expect(failures.some((line) => line.includes("validation 6"))).toBe(true);
  });

  it("D1 goes red when a weakening qualifier is appended inside the section (O2 exactness)", () => {
    const failures = docsFailures(`${good.trimEnd()} Unless the host says otherwise.\n`);
    expect(failures.some((line) => line.includes("section"))).toBe(true);
  });

  it("D2 goes red when the heading is renamed away (O2 exactness)", () => {
    const failures = docsFailures(good.replace("## Key validations", "## Validation notes"));
    expect(failures.some((line) => line.includes("section"))).toBe(true);
  });

  it("extracts the section bounded by the next heading", () => {
    expect(keyValidationsSection(`## Key validations\n\nAlpha beta.\n\n## Next\n\nGamma.\n`)).toBe("Alpha beta.");
  });
});

describe("wb-cax.24 tier truth (O1): a default-gate pin file must actually run under the default gate", () => {
  const config = 'include: ["test/**/*.test.ts"],\n exclude: ["test/workbench-native-client.test.ts", "test/other.test.ts"],';

  it("accepts a file under test/ that is not excluded", () => {
    expect(judgeTier(config, "test/workbench-timeline.test.ts")).toBe("ok");
  });

  it("T1 goes red when the pinned file is added to vitest exclude", () => {
    expect(judgeTier(config, "test/other.test.ts")).toBe("excluded from vitest.config.ts");
  });

  it("goes red when the pinned file is outside the include glob", () => {
    expect(judgeTier(config, "qa/workbench/x.test.ts")).toBe("outside the default include test/**/*.test.ts");
  });

  it("goes red when the include glob itself changed", () => {
    expect(judgeTier('include: ["src/**/*.test.ts"],\n exclude: [],', "test/workbench-timeline.test.ts")).toBe("vitest include no longer covers test/**/*.test.ts");
  });
});
