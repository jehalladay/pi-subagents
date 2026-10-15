/**
 * W19 census falsifier for docs/workbench/12-security.md "Security acceptance tests".
 * Binds each of the nine control sentences to existing cases by file, exact
 * title and tier. Renaming, deleting, commenting out, .skip-ing, .todo-ing or
 * option-skipping a pinned case, wrapping it in a skipped or conditional suite,
 * skipping it from its own body, excluding its file from vitest, or rewording or
 * extending the docs sentence turns this census red naming the sentence, file and
 * title. Test-only: no pinned suite, src or docs is edited. This scanner hardens
 * itself only; the shared program-wide helper is owned by wb-u62.
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { sanitizeWorkbenchJsonText } from "../src/workbench/redaction.js";

type Tier = "default-gate" | "knownWidening";
interface Pin { readonly file: string; readonly title: string; readonly tier: Tier }
interface Control { readonly sentence: string; readonly pins: readonly Pin[] }

const ROOT = resolve(import.meta.dirname, "..");
const DOC = "docs/workbench/12-security.md";
const CENSUS = "test/workbench-security-acceptance.test.ts";
const CONFIG = "vitest.config.ts";
const HEADING = "## Security acceptance tests";

const CONTROLS: readonly Control[] = [
  { sentence: "Host-side deny even when script crafts raw RPC", pins: [
    { file: "test/workbench-registry-auth.test.ts", title: "closes the script-side raw RPC vehicle while host authorization stays typed", tier: "default-gate" },
    { file: "test/workbench-registry-auth.test.ts", title: "rejects impersonation options before dispatch", tier: "default-gate" },
  ] },
  { sentence: "JS VM escape attempt must not yield privileged provider client in declared isolation mode", pins: [
    { file: "test/workbench-security-workflow.test.ts", title: "caught Function escape probes are realm EvalErrors and never reveal the canary", tier: "default-gate" },
    { file: "test/workbench-security-workflow.test.ts", title: "every injected callable, returned promise and caught error stays in the VM realm", tier: "default-gate" },
    { file: "test/workbench-security-workflow.test.ts", title: "host-closure Function escape must not reveal even a local canary env variable", tier: "knownWidening" },
  ] },
  { sentence: "unknown/expired grant refused", pins: [
    { file: "test/workbench-control.test.ts", title: "rule 1: unknown permission data (undefined, non-array, non-string entries, wildcards) is an authorization denial", tier: "default-gate" },
    { file: "test/workbench-control-degradation.test.ts", title: "a control grant expiring mid-session never rewrites a receipt already minted, and a later request is denied", tier: "default-gate" },
  ] },
  { sentence: "observer-only stop refused", pins: [
    { file: "test/workbench-control.test.ts", title: "rule 2: observer-only grants cannot control under any action spelling, and nothing is read before refusing", tier: "default-gate" },
    { file: "test/workbench-furnace-control.test.ts", title: "refuses every denied decision with a typed error carrying the core's category and policy, and the seam records zero calls", tier: "default-gate" },
  ] },
  { sentence: "cross-workspace ref returns authorization failure", pins: [
    { file: "test/workbench-control.test.ts", title: "rule 5: a target in another workspace or principal is an authorization failure even with a valid control grant", tier: "default-gate" },
    { file: "test/workbench-security-capability.test.ts", title: "Furnace provider must not return a foreign workspace's Run record", tier: "default-gate" },
  ] },
  { sentence: "ANSI escape output sanitized", pins: [
    { file: "test/workbench-security-workflow.test.ts", title: "rejects a raw ANSI escape in source before VM execution", tier: "default-gate" },
    { file: "test/workbench-security-pi-tools.test.ts", title: "workflow_validate output must sanitize hostile metadata before model display", tier: "default-gate" },
  ] },
  { sentence: "secret env not displayed", pins: [
    { file: "test/workbench-security-pi-tools.test.ts", title: "workbench_catalog is settings-scoped and does not echo a secret in unrelated settings", tier: "default-gate" },
    { file: "test/workbench-security-capability.test.ts", title: "redacts key-named and JSON-quoted secrets through invoke, inspect and error results", tier: "default-gate" },
    { file: "test/workbench-redaction.test.ts", title: "does not render a producer credential in a selected error row", tier: "default-gate" },
    { file: CENSUS, title: "an environment-sourced KEY=value secret never reaches a sanitized reply", tier: "default-gate" },
  ] },
  { sentence: "schema pollution payload refused", pins: [
    { file: "test/workbench-registry-auth.test.ts", title: "rejects oversized nesting and pollution before executing providers", tier: "default-gate" },
    { file: "test/workbench-security-capability.test.ts", title: "registry also refuses extra authority fields and prototype keys before calling a strict provider", tier: "default-gate" },
  ] },
  { sentence: "isolated agent cannot see host tools not explicitly granted", pins: [
    { file: "test/workbench-claude-role-tools.test.ts", title: "adds only curated role MCP tools to actual SDK options without provider auto-grants", tier: "default-gate" },
    { file: "test/workbench-claude-capability-tools.test.ts", title: "discovery is finite and does not enumerate provider registrations outside the role", tier: "default-gate" },
  ] },
];


const read = (file: string): string => readFileSync(resolve(ROOT, file), "utf8");

const OPENERS = "([{";
const SPACE = /\s/;

/** Index of the closing quote of the string starting at `at` (a line break ends a quote that never closes). */
function skipString(text: string, at: number): number {
  const quote = text[at] as string;
  for (let i = at + 1; i < text.length; i += 1) {
    const ch = text[i] as string;
    if (ch === "\\") i += 1;
    else if (ch === quote) return i;
    else if (ch === "\n" && quote !== "`") return i;
  }
  return text.length - 1;
}

/** Index of the bracket closing the one at `open`, or -1 when the text never balances. */
function balancedEnd(text: string, open: number): number {
  const closers: Record<string, string> = { "(": ")", "[": "]", "{": "}" };
  const stack: string[] = [];
  for (let i = open; i < text.length; i += 1) {
    const ch = text[i] as string;
    if (ch === '"' || ch === "'" || ch === "`") {
      i = skipString(text, i);
      continue;
    }
    const closer = closers[ch];
    if (closer !== undefined) {
      stack.push(closer);
      continue;
    }
    if (ch === ")" || ch === "]" || ch === "}") {
      if (stack.pop() !== ch) return -1;
      if (stack.length === 0) return i;
    }
  }
  return -1;
}

/**
 * Removes // and block comments. String-, template- (including ${} code) and
 * regex-literal-aware, so a comment marker inside a literal survives and a real
 * comment never does. Regex literals become a neutral token. Line breaks are preserved.
 */
function stripComments(source: string): string {
  let out = "";
  let at = 0;
  const copyQuoted = (): void => {
    const end = skipString(source, at);
    out += source.slice(at, end + 1);
    at = end + 1;
  };
  const copyRegex = (): void => {
    // A regex literal is replaced by a neutral token: its brackets and quotes must never reach bracket or string matching.
    out += "/r/";
    at += 1;
    let inClass = false;
    while (at < source.length) {
      const ch = source[at] as string;
      if (ch === "\n") return;
      at += ch === "\\" ? 2 : 1;
      if (ch === "[") inClass = true;
      else if (ch === "]") inClass = false;
      else if (ch === "/" && !inClass) return;
    }
  };
  const copyTemplate = (): void => {
    out += "`";
    at += 1;
    while (at < source.length) {
      const ch = source[at] as string;
      if (ch === "\\") {
        out += source.slice(at, at + 2);
        at += 2;
      } else if (ch === "`") {
        out += ch;
        at += 1;
        return;
      } else if (ch === "$" && source[at + 1] === "{") {
        out += "${";
        at += 2;
        copyCode(true);
        out += "}";
      } else {
        out += ch;
        at += 1;
      }
    }
  };
  const copyCode = (untilBrace: boolean): void => {
    let depth = 0;
    let last = "";
    while (at < source.length) {
      const ch = source[at] as string;
      const next = source[at + 1];
      if (ch === "/" && next === "/") {
        while (at < source.length && source[at] !== "\n") at += 1;
      } else if (ch === "/" && next === "*") {
        const close = source.indexOf("*/", at + 2);
        const stop = close < 0 ? source.length : close + 2;
        out += `${source.slice(at, stop).replace(/[^\n]/g, "")} `;
        at = stop;
      } else if (ch === '"' || ch === "'") {
        copyQuoted();
        last = ch;
      } else if (ch === "`") {
        copyTemplate();
        last = ch;
      } else if (ch === "/" && (last === "" || "(,=:[!&|?{};".includes(last))) {
        copyRegex();
        last = "/";
      } else {
        if (ch === "{") depth += 1;
        if (ch === "}") {
          if (untilBrace && depth === 0) {
            at += 1;
            return;
          }
          depth -= 1;
        }
        out += ch;
        at += 1;
        if (!SPACE.test(ch)) last = ch;
      }
    }
  };
  copyCode(false);
  return out;
}

/** An options-object key that disables or focuses a case: skip, todo or only with any value but a literal false. */
const OPTION_MODIFIER = /[{,]\s*["']?(?:skip|todo|only)["']?\s*(?::(?!\s*false\b)|(?=[,}]))/;
/** A static modifier chained onto describe, suite, it or test, with or without further chain links (.concurrent.skip). */
const CHAIN_MODIFIER = /\b(?:describe|suite|it|test)(?:\s*\.\s*[A-Za-z]+)*?\s*\.\s*(?:skip|todo|only|skipIf|runIf)\b/g;
const SUITE_CALL = /\b(?:describe|suite)(?:\s*\.\s*[A-Za-z]+)*\s*\(/g;
/** A dynamic skip from inside a case body: ctx.skip(), context.skip(), t.skip(), or a destructured skip(). */
const BODY_SKIP = /\bskip\s*\(/;

/** The top-level `{...}` options arguments of the call whose opening paren is at `open`, plus the whole argument text. */
function callArguments(source: string, open: number): { readonly options: string[]; readonly text: string } | undefined {
  const end = balancedEnd(source, open);
  if (end < 0) return undefined;
  const options: string[] = [];
  let previous = "";
  for (let i = open + 1; i < end; i += 1) {
    const ch = source[i] as string;
    if (ch === '"' || ch === "'" || ch === "`") {
      i = skipString(source, i);
      previous = ch;
    } else if (OPENERS.includes(ch)) {
      const close = balancedEnd(source, i);
      if (close < 0) return undefined;
      if (ch === "{" && previous === ",") options.push(source.slice(i, close + 1));
      i = close;
      previous = ")";
    } else if (!SPACE.test(ch)) previous = ch;
  }
  return { options, text: source.slice(open + 1, end) };
}

/** Whole-file hazards that can switch off any case in the file; each fails every pin in it. Input is comment-stripped source. */
function fileHazards(stripped: string): string[] {
  const hazards = [...stripped.matchAll(CHAIN_MODIFIER)].map(hit => hit[0].replace(SPACE, ""));
  for (const hit of stripped.matchAll(SUITE_CALL)) {
    const args = callArguments(stripped, hit.index + hit[0].length - 1);
    if (args === undefined) hazards.push(`${hit[0].trim()} with unparseable arguments`);
    else if (args.options.some(option => OPTION_MODIFIER.test(option))) hazards.push(`${hit[0].trim()} options object skip/todo/only`);
  }
  return [...new Set(hazards)];
}

/** Why the pinned case is not a live case of its tier, or undefined. Input is comment-stripped source. */
function caseProblem(stripped: string, pin: Pin): string | undefined {
  const call = pin.tier === "default-gate" ? /(?:^|[\s;{(])(?:it|test)\($/ : /(?:^|[\s;{(])(?:it|test)\.fails\($/;
  const want = pin.tier === "default-gate" ? "a plain it()/test() call" : "declared it.fails";
  const notes: string[] = [];
  let seen = false;
  for (const quote of ['"', "'", "`"]) {
    const needle = `${quote}${pin.title}${quote}`;
    for (let at = stripped.indexOf(needle); at >= 0; at = stripped.indexOf(needle, at + 1)) {
      seen = true;
      const prefix = stripped.slice(stripped.lastIndexOf("\n", at) + 1, at).trim();
      if (!call.test(prefix)) {
        notes.push(`expected ${want} (found "${prefix}")`);
        continue;
      }
      let open = at - 1;
      while (open >= 0 && SPACE.test(stripped[open] as string)) open -= 1;
      const args = callArguments(stripped, open);
      if (args === undefined) notes.push("case call could not be parsed");
      else if (args.options.some(option => OPTION_MODIFIER.test(option))) notes.push("case carries an options object skip/todo/only");
      else if (BODY_SKIP.test(args.text)) notes.push("case body calls skip() (dynamic skip)");
      else return undefined;
    }
  }
  return seen ? notes.join(" | ") : "title not found (renamed, deleted or commented out)";
}

/** The acceptance section: from its heading line to the next level-2 heading, trimmed. */
function docsSection(doc: string): string | undefined {
  const heading = new RegExp(`^${HEADING}[ \\t]*$`, "m").exec(doc);
  if (heading === null) return undefined;
  const rest = doc.slice(heading.index + heading[0].length);
  const next = rest.search(/\n## /);
  return (next < 0 ? rest : rest.slice(0, next)).trim();
}

/** The section must be exactly the nine control sentences joined by "; " and ended by ".". */
function docsProblems(doc: string, sentences: readonly string[]): string[] {
  const section = docsSection(doc);
  if (section === undefined) return [`docs/12 lost its "${HEADING}" heading`];
  if (section === `${sentences.join("; ")}.`) return [];
  const missing = sentences.filter(sentence => !section.includes(sentence));
  if (missing.length > 0) return [`docs/12 dropped or rewrote controls: ${missing.join(" | ")}`];
  return [`docs/12 acceptance section is not exactly the nine control sentences (found: ${section})`];
}

function globToRegExp(glob: string): RegExp {
  let pattern = "";
  for (let i = 0; i < glob.length; i += 1) {
    if (glob.startsWith("**/", i)) {
      pattern += "(?:.*/)?";
      i += 2;
    } else if (glob.startsWith("**", i)) {
      pattern += ".*";
      i += 1;
    } else if (glob[i] === "*") pattern += "[^/]*";
    else pattern += (glob[i] as string).replace(/[.+^${}()|[\]\\?]/g, "\\$&");
  }
  return new RegExp(`^${pattern}$`);
}

function stringList(block: string, key: string): string[] | undefined {
  const hit = new RegExp(`\\b${key}\\s*:\\s*\\[`).exec(block);
  if (hit === null) return undefined;
  const open = hit.index + hit[0].length - 1;
  const close = balancedEnd(block, open);
  return [...block.slice(open, close < 0 ? block.length : close).matchAll(/"([^"]*)"|'([^']*)'/g)].map(literal => literal[1] ?? literal[2] ?? "");
}

/** Why vitest would not run `file` under the config's test.include / test.exclude, or undefined. */
function configProblem(config: string, file: string): string | undefined {
  const stripped = stripComments(config);
  const testAt = stripped.search(/\btest\s*:\s*\{/);
  if (testAt < 0) return undefined;
  const open = stripped.indexOf("{", testAt);
  const close = balancedEnd(stripped, open);
  let block = stripped.slice(open, close < 0 ? stripped.length : close + 1);
  const coverageAt = block.search(/\bcoverage\s*:\s*\{/);
  if (coverageAt >= 0) {
    const coverageClose = balancedEnd(block, block.indexOf("{", coverageAt));
    block = block.slice(0, coverageAt) + (coverageClose < 0 ? "" : block.slice(coverageClose + 1));
  }
  const include = stringList(block, "include");
  if (include !== undefined && !include.some(glob => globToRegExp(glob).test(file))) return `not matched by vitest.config.ts test.include (${include.join(", ")})`;
  const excluded = (stringList(block, "exclude") ?? []).find(glob => globToRegExp(glob).test(file));
  return excluded === undefined ? undefined : `excluded by vitest.config.ts test.exclude (${excluded})`;
}

const describePin = (control: Control, pin: Pin): string => `sentence "${control.sentence}" file ${pin.file} title "${pin.title}"`;
const SENTENCES = CONTROLS.map(control => control.sentence);

describe("docs/12 security acceptance census", () => {
  it("covers all nine control sentences exactly, each with at least one pin", () => {
    expect(CONTROLS).toHaveLength(9);
    for (const control of CONTROLS) expect(control.pins.length, control.sentence).toBeGreaterThan(0);
    expect(docsProblems(read(DOC), SENTENCES)).toEqual([]);
  });

  it("docs/workbench/12 still states every control sentence verbatim", () => {
    const section = docsSection(read(DOC)) ?? "";
    const missing = SENTENCES.filter(sentence => !section.includes(sentence));
    expect(missing, `docs/12 dropped or rewrote controls: ${missing.join(" | ")}`).toEqual([]);
  });

  it("every pinned case still exists with its declared tier", () => {
    const problems = CONTROLS.flatMap(control =>
      control.pins.map(pin => {
        const problem = caseProblem(stripComments(read(pin.file)), pin);
        return problem === undefined ? undefined : `${describePin(control, pin)}: ${problem}`;
      }),
    ).filter((problem): problem is string => problem !== undefined);
    expect(problems).toEqual([]);
  });

  it("no pinned file hides cases behind skip, todo, only, skipIf or runIf", () => {
    const problems = CONTROLS.flatMap(control =>
      control.pins
        .filter(pin => pin.file !== CENSUS)
        .flatMap(pin => fileHazards(stripComments(read(pin.file))).map(hazard => `${describePin(control, pin)}: file hides cases behind ${hazard}`)),
    );
    expect(problems).toEqual([]);
  });

  it("every pinned file is run by vitest: matched by test.include and absent from test.exclude", () => {
    const config = read(CONFIG);
    const problems = CONTROLS.flatMap(control =>
      control.pins.map(pin => {
        const problem = configProblem(config, pin.file);
        return problem === undefined ? undefined : `${describePin(control, pin)}: ${problem}`;
      }),
    ).filter((problem): problem is string => problem !== undefined);
    expect(problems).toEqual([]);
  });

  it("keeps the VM-escape widening declared it.fails and never counts it as a pass", () => {
    const widenings = CONTROLS.flatMap(control => control.pins.filter(pin => pin.tier === "knownWidening"));
    expect(widenings.map(pin => pin.title)).toEqual(["host-closure Function escape must not reveal even a local canary env variable"]);
  });

  it("an environment-sourced KEY=value secret never reaches a sanitized reply", () => {
    const env: Record<string, string> = {
      ANTHROPIC_API_KEY: "sk-ant-census-fixture-secret",
      AWS_SECRET_ACCESS_KEY: "census-fixture-aws-secret",
      DEPLOY_PASSWORD: "census-fixture-password",
    };
    const reply = { diagnostic: Object.entries(env).map(([key, value]) => `${key}=${value}`).join("; "), nested: { line: `spawn failed with ANTHROPIC_API_KEY=${env.ANTHROPIC_API_KEY}` } };
    const sanitized = sanitizeWorkbenchJsonText(reply);
    for (const value of Object.values(env)) expect(sanitized).not.toContain(value);
    expect(sanitized).toContain("[REDACTED]");
  });
});

// One synthetic falsifier per bypass mode. Each fixture is a throwaway source
// string; the census never scans a fixture as a pinned case (its fixture title
// differs from every pin title and this file is excluded from the hazard scan).
const FIXTURE_TITLE = "fixture pinned case";
const fixturePin = (tier: Tier = "default-gate"): Pin => ({ file: "fixture.test.ts", title: FIXTURE_TITLE, tier });
const problemOf = (source: string, tier: Tier = "default-gate"): string | undefined => caseProblem(stripComments(source), fixturePin(tier));
const hazardsOf = (source: string): string[] => fileHazards(stripComments(source));
const lines = (...rows: string[]): string => rows.join("\n");
const PLAIN = lines('import { it } from "vitest";', `it("${FIXTURE_TITLE}", () => {`, "  expect(1).toBe(1);", "});");

describe("census scanner falsifiers", () => {
  it("accepts a plain case and reports no hazard (no false positive)", () => {
    expect(problemOf(PLAIN)).toBeUndefined();
    expect(hazardsOf(lines(PLAIN, 'describe("group", () => { it("other", () => {}); });'))).toEqual([]);
  });

  it("S1: a case commented out line by line is a deleted case", () => {
    const commented = lines('// import { it } from "vitest";', `// it("${FIXTURE_TITLE}", () => {`, "//   expect(1).toBe(1);", "// });");
    expect(problemOf(commented)).toMatch(/not found/);
  });

  it("S2: a case wrapped in a block comment is a deleted case", () => {
    expect(problemOf(lines("/*", `it("${FIXTURE_TITLE}", () => {`, "  expect(1).toBe(1);", "});", "*/"))).toMatch(/not found/);
    expect(problemOf(`/* x */ it("${FIXTURE_TITLE}", () => {});`)).toBeUndefined();
  });

  it("S11: the census's own env-case shape goes red when commented out", () => {
    const own = lines("describe(\"group\", () => {", `  // it("${FIXTURE_TITLE}", () => {`, "  //   expect(1).toBe(1);", "  // });", "});");
    expect(problemOf(own)).toMatch(/not found/);
  });

  it("comment markers inside strings, templates and regexes do not hide a real case", () => {
    expect(problemOf(lines('const url = "http://example.test/a";', "const glob = `src/**/*.ts // not a comment`;", "const rx = /a\\/\\/b/;", `it("${FIXTURE_TITLE}", () => {});`))).toBeUndefined();
    expect(problemOf(lines(`const a = \`\${1 + 1} /* still a template\`;`, `it("${FIXTURE_TITLE}", () => {});`))).toBeUndefined();
  });

  it("S4/S4t: an options object skip, todo or only on the case is a modifier", () => {
    for (const key of ["skip", "todo", "only"]) {
      expect(problemOf(`it("${FIXTURE_TITLE}", { ${key}: true }, () => {});`), key).toMatch(/option/);
      expect(problemOf(`it("${FIXTURE_TITLE}", () => {}, { ${key}: true });`), `${key} after the callback`).toMatch(/option/);
    }
    expect(problemOf(`it("${FIXTURE_TITLE}", { skip: process.env.CI === "1" }, () => {});`)).toMatch(/option/);
    expect(problemOf(`it("${FIXTURE_TITLE}", { timeout: 5000, skip: true }, () => {});`)).toMatch(/option/);
    expect(problemOf(`it("${FIXTURE_TITLE}", { skip: false }, () => {});`)).toBeUndefined();
    expect(problemOf(`it("${FIXTURE_TITLE}", { timeout: 5000 }, () => {});`)).toBeUndefined();
  });

  it("S10: a describe or suite options object skip, todo or only fails every pin in the file", () => {
    for (const key of ["skip", "todo", "only"]) {
      expect(hazardsOf(lines(`describe("group", { ${key}: true }, () => {`, `  it("${FIXTURE_TITLE}", () => {});`, "});")).length, key).toBeGreaterThan(0);
    }
    expect(hazardsOf('suite("group", { skip: true }, () => {});').length).toBeGreaterThan(0);
    expect(hazardsOf('describe("group", { timeout: 5 }, () => {});')).toEqual([]);
  });

  it("S3/S3r: skipIf and runIf on a describe or a case fail every pin in the file", () => {
    expect(hazardsOf(lines("describe.skipIf(true)(\"group\", () => {", `  it("${FIXTURE_TITLE}", () => {});`, "});")).length).toBeGreaterThan(0);
    expect(hazardsOf(lines("describe.runIf(false)(\"group\", () => {", `  it("${FIXTURE_TITLE}", () => {});`, "});")).length).toBeGreaterThan(0);
    expect(hazardsOf(`it.skipIf(true)("${FIXTURE_TITLE}", () => {});`).length).toBeGreaterThan(0);
    expect(hazardsOf(`it.runIf(false)("${FIXTURE_TITLE}", () => {});`).length).toBeGreaterThan(0);
    expect(hazardsOf(`test.runIf(false)("${FIXTURE_TITLE}", () => {});`).length).toBeGreaterThan(0);
  });

  it("G10/G11/G12: static skip, todo and focus modifiers on describe, it and test stay hazards, chained or not", () => {
    const chains: readonly (readonly string[])[] = [["describe", "skip"], ["it", "skip"], ["it", "todo"], ["describe", "only"], ["it", "only"], ["test", "skip"], ["describe", "concurrent", "skip"], ["it", "concurrent", "only"]];
    for (const chain of chains) expect(hazardsOf(`${chain.join(".")}("${FIXTURE_TITLE}", () => {});`).length, chain.join(".")).toBeGreaterThan(0);
  });

  it("S5: a dynamic skip from the case body (ctx.skip(), context.skip(), a destructured skip()) is a modifier", () => {
    expect(problemOf(`it("${FIXTURE_TITLE}", ctx => { ctx.skip(); expect(1).toBe(1); });`)).toMatch(/skip/);
    expect(problemOf(`it("${FIXTURE_TITLE}", context => { context.skip("no"); });`)).toMatch(/skip/);
    expect(problemOf(`it("${FIXTURE_TITLE}", ({ skip }) => { skip(); });`)).toMatch(/skip/);
    expect(problemOf(`it("${FIXTURE_TITLE}", async function (t) { if (process.platform === "win32") t.skip(); });`)).toMatch(/skip/);
    expect(problemOf(`it("${FIXTURE_TITLE}", () => { const skipped = 1; expect(skipped).toBe(1); });`)).toBeUndefined();
  });

  it("tier checks: a widening must be it.fails and a default case must not be", () => {
    expect(problemOf(`it.fails("${FIXTURE_TITLE}", () => {});`, "knownWidening")).toBeUndefined();
    expect(problemOf(`it("${FIXTURE_TITLE}", () => {});`, "knownWidening")).toMatch(/it\.fails/);
    expect(problemOf(`it.fails("${FIXTURE_TITLE}", () => {});`)).toMatch(/plain/);
    expect(problemOf(`it.skip("${FIXTURE_TITLE}", () => {});`)).toMatch(/plain/);
    expect(problemOf(`it.todo("${FIXTURE_TITLE}");`)).toMatch(/plain/);
  });

  it("S6/S7/S8: the docs section must be exactly the nine control sentences", () => {
    const exact = `${SENTENCES.join("; ")}.`;
    const doc = (body: string, after = ""): string => `# 12\n\n${HEADING}\n\n${body}\n\n## Current diagnostic protections\n\n${after}\n`;
    expect(docsProblems(doc(exact), SENTENCES)).toEqual([]);
    expect(docsProblems(doc(exact, "something else"), SENTENCES)).toEqual([]);
    expect(docsProblems(doc(`${exact} Also: a tenth control must hold.`), SENTENCES)).not.toEqual([]);
    expect(docsProblems(doc(`${SENTENCES.join("; ")}; a tenth control.`), SENTENCES)).not.toEqual([]);
    expect(docsProblems(doc(exact.replace("ANSI escape output sanitized", "ANSI escape output sanitized only where a renderer opts in")), SENTENCES)).not.toEqual([]);
    expect(docsProblems(doc(exact.replace("; secret env not displayed", "")), SENTENCES).join(" ")).toContain("secret env not displayed");
    expect(docsProblems(doc("", exact), SENTENCES)).not.toEqual([]);
    expect(docsProblems("# 12\n\nno such section\n", SENTENCES)).not.toEqual([]);
    expect(docsProblems(`# 12\n\n### Security acceptance tests\n\n${exact}\n`, SENTENCES)).not.toEqual([]);
  });

  it("S9: a pinned file excluded from, or never matched by, test.include is not run", () => {
    const config = (include: string, exclude: string): string => `export default { test: { include: [${include}], exclude: [${exclude}], coverage: { include: ["src/**/*.ts"] } } };`;
    const file = "test/workbench-control.test.ts";
    expect(configProblem(config('"test/**/*.test.ts"', '"test/other.test.ts"'), file)).toBeUndefined();
    expect(configProblem(config('"test/**/*.test.ts"', `"${file}"`), file)).toMatch(/exclude/);
    expect(configProblem(config('"test/**/*.test.ts"', '"test/workbench-*.test.ts"'), file)).toMatch(/exclude/);
    expect(configProblem(config('"src/**/*.test.ts"', ""), file)).toMatch(/include/);
    expect(configProblem(`export default { test: { include: ["test/**/*.test.ts"], /* exclude: ["${file}"], */ } };`, file)).toBeUndefined();
    expect(configProblem("export default { test: {} };", file)).toBeUndefined();
    expect(configProblem("export default {};", file)).toBeUndefined();
  });
});
