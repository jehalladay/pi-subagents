/**
 * agent-refusal-error-flag.test.ts — EAT-R311 (wb-wkqp, DX P01) for what a real
 * session never reaches, read off the registered Agent tool booted with no
 * session. The pinned reader set, by case id:
 *
 *   D01-D03 — 3 refusals a session never reaches (the scheduler is not started;
 *     a project that disabled scheduling while a stale call still carries
 *     `schedule`; a caller-supplied model outside `enabledModels` under
 *     `scopeModels`), each returned with isError:true — the field pi's agent
 *     loop reads (`result.isError === true`);
 *   D04 — the Agent tool's renderer guard: handed a flagged result whose
 *     details carry status "error", it draws the error card, not the salvaged
 *     partial output.
 *
 * NOT CLAIMED (scope sentences; each bounds what this census reads):
 *   - That the tool's own failed run reaches the renderer with those status
 *     details is NOT CLAIMED by this census (C01-C02 of
 *     test/agent-refusal-error-flag-e2e.test.ts read it in a real session).
 *   - The flag pi RECORDS in a session is NOT CLAIMED by this census (the e2e
 *     census reads it).
 *   - Every other refusal, reply and render of the registered tools is NOT
 *     CLAIMED by this census.
 *   - D04 has no anchor outside this file: removing it from every literal here
 *     (its case and its frozen names entry) is NOT CLAIMED to red this census.
 *   - Where in src/index.ts each counted errorResult call sits, and what its
 *     result does after the call (a flag overridden afterwards, or a path no
 *     input reaches), are NOT CLAIMED by the source anchors: they count call
 *     expressions in the parse, and D01-D03 each pin their own returned result.
 *
 * The frozen shape at the end pins the header, the registered cases (vitest's
 * task tree: each in run mode and run before it), and anchors outside this
 * file, read from the TypeScript parse of src/index.ts rather than its text, so
 * a comment or a string that mentions errorResult( never counts (the same case
 * first checks the reader on a probe source that names errorResult 7 times, once
 * in a real call): exactly 21 call expressions whose callee
 * is the identifier errorResult, as many as the flagged refusals here, the 16
 * flagged rows of the e2e census and its two NOT CLAIMED resume sites; no other
 * occurrence of that identifier but the helper's own top-level declaration (no
 * alias, shadow or second binding); and exactly 2 of the calls with a message
 * that begins "Failed to resume agent", as many as those two resume sites.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { afterEach, describe, expect, it } from "vitest";
import subagentsExtension from "../src/index.js";
import { setScopeModelsEnabled } from "../src/model-scope.js";
import { ctx, type Hermetic, hermeticDir, makePi, textOf } from "./helpers/boot-extension.js";

let hermetic: Hermetic | undefined;

afterEach(() => {
  setScopeModelsEnabled(false);
  Reflect.deleteProperty(globalThis, Symbol.for("pi-subagents:manager"));
  hermetic?.restore();
  hermetic = undefined;
});

/** Boot the real extension in a hermetic dir and hand back its registered tools. */
function boot(settings?: Record<string, unknown>) {
  hermetic = hermeticDir({ settings });
  const { pi, tools } = makePi();
  subagentsExtension(pi);
  return { tools, dir: hermetic.dir };
}

/** One call through the registered Agent tool. */
async function callAgent(params: Record<string, unknown>, opts: { settings?: Record<string, unknown>; enabledModels?: string[]; modelRegistry?: unknown } = {}) {
  const { tools, dir } = boot(opts.settings);
  if (opts.enabledModels) {
    mkdirSync(join(dir, ".pi"), { recursive: true });
    writeFileSync(join(dir, ".pi", "settings.json"), JSON.stringify({ enabledModels: opts.enabledModels }));
  }
  const context = opts.modelRegistry ? ctx({ modelRegistry: opts.modelRegistry }) : ctx();
  return tools.get("Agent").execute("tc-r311", { subagent_type: "general-purpose", description: "r311", prompt: "x", ...params }, undefined, undefined, context);
}

const MODELS = [
  { id: "allowed", name: "Allowed", provider: "anthropic" },
  { id: "blocked", name: "Blocked", provider: "anthropic" },
];

/** A theme that renders plain text, so the collapsed row reads as what the operator sees. */
const theme = {
  fg: (_color: string, text: string) => text,
  bold: (text: string) => text,
};

/** The 16 flagged top-level rows of test/agent-refusal-error-flag-e2e.test.ts (R01-R09, F01, F03-F05, G04, G06, T01). */
const E2E_CENSUS_FLAGGED = 16;
/** The two "Failed to resume agent" errorResult sites, NOT CLAIMED by the e2e census. */
const NOT_CLAIMED_SITES = 2;
/** How both of those sites' messages begin (the background and the foreground resume). */
const RESUME_FAILURE = "Failed to resume agent ";
/** The reader's label for the one errorResult identifier that is not a call: the helper's own declaration. */
const HELPER_DECLARATION = "the top-level function declaration";

/**
 * The errorResult identifiers of a TypeScript source, read from its parse
 * rather than its text, so a comment or a string that mentions errorResult(
 * never counts. `calls` holds each call expression whose callee is the
 * identifier errorResult, in source order, with its first argument's literal
 * text (a string, or a template's literal parts with every substitution
 * dropped; "" for any other expression); `others` labels every other
 * occurrence of the identifier by the syntax node it sits in.
 */
function errorResultIdentifiers(source: string): { calls: Array<{ message: string }>; others: string[] } {
  const file = ts.createSourceFile("index.ts", source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const calls: Array<{ message: string }> = [];
  const others: string[] = [];
  const literalText = (node: ts.Expression | undefined): string => {
    if (node === undefined) return "";
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
    if (ts.isTemplateExpression(node)) return [node.head.text, ...node.templateSpans.map((span) => span.literal.text)].join("");
    return "";
  };
  const visit = (node: ts.Node): void => {
    if (ts.isIdentifier(node) && node.text === "errorResult") {
      const parent = node.parent;
      if (ts.isCallExpression(parent) && parent.expression === node) calls.push({ message: literalText(parent.arguments[0]) });
      else others.push(ts.isFunctionDeclaration(parent) && parent.name === node && parent.parent === file ? HELPER_DECLARATION : ts.SyntaxKind[parent.kind]);
    }
    ts.forEachChild(node, visit);
  };
  visit(file);
  return { calls, others };
}

/**
 * A probe source the reader must read as ONE errorResult call beside the
 * helper's declaration: the commented-out call (the shape of the gate's
 * G-S13X/G-S14X members), the line and block comments, the JSDoc link and the
 * strings all name errorResult( without calling it.
 */
const READER_PROBE = [
  "/** Flags the reply: {@link errorResult} is textResult plus isError. */",
  "function errorResult(msg: string) {",
  "  return msg;",
  "}",
  '// return errorResult("commented out");',
  '/* errorResult("block comment") */',
  "const quoted = 'errorResult(string)';",
  "const templated = `errorResult(template)`;",
  'export const real = errorResult("real");',
].join("\n");

describe("EAT-R311 on the registered Agent tool booted without a live session: 3 refusals a session never reaches return isError:true, and the renderer draws the error card for a flagged result whose details carry status error", () => {
  it("D01 scheduler not active yet: the refusal is flagged", async () => {
    const result = await callAgent({ schedule: "5m" });

    expect(textOf(result)).toMatch(/^Scheduler is not active in this session yet\./);
    expect(result.isError).toBe(true);
  });

  it("D02 scheduling disabled in this project: the refusal is flagged", async () => {
    const result = await callAgent({ schedule: "5m" }, { settings: { schedulingEnabled: false } });

    expect(textOf(result)).toMatch(/^Scheduling is disabled in this project\./);
    expect(result.isError).toBe(true);
  });

  it("D03 caller-supplied model outside enabledModels (scopeModels on): the refusal is flagged", async () => {
    const result = await callAgent(
      { model: "anthropic/blocked" },
      {
        settings: { scopeModels: true },
        enabledModels: ["anthropic/allowed"],
        modelRegistry: { find: (provider: string, id: string) => ({ provider, id }), getAvailable: () => MODELS, getAll: () => MODELS },
      },
    );

    expect(textOf(result)).toMatch(/^Model not in scope: "anthropic\/blocked"/);
    expect(result.isError).toBe(true);
  });

  // The renderer guard alone, over a hand-built result: a flagged result that
  // carries status "error" keeps the compact error card. The text fallback is
  // for flagged results with no status of their own (#199), and would dump the
  // whole salvaged partial output into the collapsed row.
  it("D04 the renderer draws the error card for a flagged result whose details carry status error, not the salvaged partial output", () => {
    const { tools } = boot();
    const output = tools
      .get("Agent")
      .renderResult(
        {
          content: [{ type: "text", text: "Agent failed: provider rejected the prompt\n\nPartial output before the failure:\nSALVAGED-PARTIAL-LINE" }],
          details: { status: "error", error: "provider rejected the prompt", toolUses: 2, tokens: "", durationMs: 5 },
        },
        { expanded: false, isPartial: false },
        theme,
        { isError: true },
      )
      .render(120)
      .join("\n");

    expect(output).toContain("Error: provider rejected the prompt");
    expect(output).toContain("2 tool uses");
    expect(output).not.toContain("SALVAGED-PARTIAL-LINE");
  });
});

// Frozen shape, registered beside the census block rather than inside it, so
// a skipped block still reaches it: the header names the judged cases and its
// count is theirs; the registered cases (vitest's task tree) are exactly these,
// each in run mode, not inverted, and run before this case; and src/index.ts —
// outside this file, read from its TypeScript parse — holds one errorResult
// call expression per flagged refusal here, per flagged row of the e2e census
// and per NOT CLAIMED resume site, no other errorResult identifier but the
// helper's declaration, and two calls with the resume-failure message.
// Skipping this case itself, or deleting one of its own assertions (the probe
// check included), is NOT CLAIMED by this census.
it("frozen shape: the header, the registered cases and the source anchor", ({ task }) => {
  const census = task.file.tasks.find((entry) => entry.type === "suite");
  const header = census?.name ?? "";
  expect(header).toBe("EAT-R311 on the registered Agent tool booted without a live session: 3 refusals a session never reaches return isError:true, and the renderer draws the error card for a flagged result whose details carry status error");
  const names = census?.type === "suite" ? census.tasks.map((entry) => entry.name) : [];
  const refusals = names.filter((name) => / the refusal is flagged$/.test(name));
  expect(refusals).toHaveLength(Number(/: (\d+) refusals /.exec(header)?.[1]));
  expect(names).toEqual([
    "D01 scheduler not active yet: the refusal is flagged",
    "D02 scheduling disabled in this project: the refusal is flagged",
    "D03 caller-supplied model outside enabledModels (scopeModels on): the refusal is flagged",
    "D04 the renderer draws the error card for a flagged result whose details carry status error, not the salvaged partial output",
  ]);

  const walked: Array<{ name: string; mode: string; fails: boolean; state: string | undefined; self: boolean }> = [];
  const walk = (tasks: typeof task.file.tasks): void => {
    for (const child of tasks) {
      if (child.type === "test") walked.push({ name: child.name, mode: child.mode, fails: child.fails === true, state: child.result?.state, self: child === task });
      else if (child.type === "suite") walk(child.tasks);
    }
  };
  walk(task.file.tasks);
  expect(walked.map((entry) => entry.name)).toEqual([...names, task.name]);
  const ran = (state: string | undefined): boolean => state === "pass" || state === "fail";
  expect(
    walked.filter((entry) => !entry.self && (entry.mode !== "run" || entry.fails || !ran(entry.state))).map((entry) => `${entry.name} | ${entry.mode}${entry.fails ? "+fails" : ""} | ${entry.state ?? "no result"}`),
    "every other case is in run mode, not inverted, and ran before this one",
  ).toEqual([]);

  // The anchors outside this file, read from the TypeScript parse of
  // src/index.ts. The reader first, on a probe source that names errorResult 7
  // times (a JSDoc link, the helper's declaration, a commented-out call, a block
  // comment, a string, a template and one real call): it reads the one call and
  // the declaration, nothing else.
  expect(READER_PROBE.match(/\berrorResult\b/g), "errorResult mentions in the probe source").toHaveLength(7);
  expect(errorResultIdentifiers(READER_PROBE)).toEqual({ calls: [{ message: "real" }], others: [HELPER_DECLARATION] });
  const { calls, others } = errorResultIdentifiers(readFileSync(fileURLToPath(new URL("../src/index.ts", import.meta.url)), "utf8"));
  expect(calls, "errorResult calls: one per flagged refusal here, per flagged row of the e2e census and per NOT CLAIMED resume site").toHaveLength(
    refusals.length + E2E_CENSUS_FLAGGED + NOT_CLAIMED_SITES,
  );
  expect(others, "the only errorResult identifier that is not a call is the helper's declaration").toEqual([HELPER_DECLARATION]);
  expect(
    calls.filter((call) => call.message.startsWith(RESUME_FAILURE)),
    "the NOT CLAIMED resume sites",
  ).toHaveLength(NOT_CLAIMED_SITES);
});
