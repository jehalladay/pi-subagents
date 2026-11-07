/**
 * workflow-tool-description.test.ts — the model reads this text on every turn,
 * and nothing else checks it.
 *
 * `tool-description.ts` is one exported template literal, so coverage reports it
 * at 100% (1/1 statements) no matter what it says. That is exactly the shape of
 * file that drifts: the description once told the model `resume` was only
 * exclusive with `agentType`, while the runtime rejected six options, and an
 * example once combined `resume` with `gate`, which throws.
 *
 * So the assertions here derive their expectations from `worker-source.ts`
 * rather than restating them: the option set, the exclusions and the effort
 * levels are parsed out of the runtime, and every `agent()` call written in the
 * description is checked against them. Changing the runtime without changing
 * the prose fails here, which is the point.
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  WORKFLOW_AGENT_CAP,
  WORKFLOW_ITEM_CAP,
  workflowConcurrency,
} from "../src/workflow/runtime.js";
import { fullWorkflowToolDescription } from "../src/workflow/tool-description.js";

const description = fullWorkflowToolDescription;
const workerSource = readFileSync(
  fileURLToPath(new URL("../src/workflow/worker-source.ts", import.meta.url)),
  "utf8",
);

/** The literal string arrays the worker validates against, read from its source. */
function stringArray(name: string): string[] {
  const match = workerSource.match(new RegExp(`const ${name} = \\[(.*?)\\];`, "s"));
  if (!match) throw new Error(`could not find ${name} in worker-source.ts`);
  return [...match[1].matchAll(/"(\w+)"/g)].map(m => m[1]);
}

const AGENT_OPTIONS = stringArray("AGENT_OPTIONS");
const EFFORT_LEVELS = stringArray("EFFORT_LEVELS");

/** Options the runtime refuses to combine with `resume`, per its own messages. */
const RESUME_EXCLUSIONS = [
  ...new Set([
    ...[...workerSource.matchAll(/opts\.resume and opts\.(\w+) are mutually exclusive/g)].map(
      m => m[1],
    ),
    ...(workerSource.includes("opts.gate cannot be combined with opts.resume") ? ["gate"] : []),
  ]),
];

/** Every `{ ... }` options literal written as an `agent()` second argument. */
function documentedAgentOptions(): { keys: Set<string>; efforts: string[]; line: number }[] {
  const found: { keys: Set<string>; efforts: string[]; line: number }[] = [];
  for (const call of description.matchAll(/agent\(/g)) {
    const window = description.slice(call.index, call.index + 400);
    const literal = window.match(/\},\s*\{([^{}]*)\}\)|,\s*\{([^{}]*)\}\)/);
    if (!literal) continue;
    const body = literal[1] ?? literal[2];
    found.push({
      keys: new Set([...body.matchAll(/(\w+)\s*:/g)].map(m => m[1])),
      efforts: [...body.matchAll(/effort:\s*'(\w+)'/g)].map(m => m[1]),
      line: description.slice(0, call.index).split("\n").length,
    });
  }
  return found;
}

describe("the agent() contract it documents", () => {
  it("names every option the runtime accepts", () => {
    for (const option of AGENT_OPTIONS) {
      expect(description, `agent() opts.${option} is undocumented`).toContain(option);
    }
  });

  it("documents no option the runtime would reject by name", () => {
    const named = [...description.matchAll(/opts\.(\w+)/g)].map(m => m[1]);
    expect([...new Set(named)].filter(name => !AGENT_OPTIONS.includes(name))).toEqual([]);
  });

  it("lists every option resume cannot be combined with", () => {
    // The original drift: the prose named two of six, so a script could be told
    // `{ resume, model }` was legal and take a hard throw at the call.
    const sentence = description.match(/opts\.resume[^\n]*/)?.[0] ?? "";
    for (const excluded of RESUME_EXCLUSIONS) {
      expect(sentence, `resume/${excluded} exclusion missing from the resume line`).toContain(
        excluded,
      );
    }
    expect(RESUME_EXCLUSIONS.length).toBeGreaterThan(1);
  });

  it("offers every reasoning effort the runtime has, and no other", () => {
    const listed = description.match(/reasoning effort for this agent call \(([^)]*)\)/)?.[1] ?? "";
    const quoted = [...listed.matchAll(/'(\w+)'/g)].map(m => m[1]);
    expect(quoted).toEqual(EFFORT_LEVELS);
  });
});

describe("the examples it ships", () => {
  it("writes at least one options literal to check", () => {
    expect(documentedAgentOptions().length).toBeGreaterThan(4);
  });

  it("uses only options the runtime accepts", () => {
    for (const { keys, line } of documentedAgentOptions()) {
      const unknown = [...keys].filter(key => !AGENT_OPTIONS.includes(key));
      expect(unknown, `unknown agent() option at description line ${line}`).toEqual([]);
    }
  });

  it("never combines resume with an option that throws", () => {
    // `{ resume: 'fix', gate: 'npm test' }` shipped in a draft of this file and
    // would have thrown on first use.
    for (const { keys, line } of documentedAgentOptions()) {
      if (!keys.has("resume")) continue;
      const clashes = [...keys].filter(key => RESUME_EXCLUSIONS.includes(key));
      expect(clashes, `illegal resume combination at description line ${line}`).toEqual([]);
    }
  });

  it("never names an effort level the runtime would reject", () => {
    for (const { efforts, line } of documentedAgentOptions()) {
      for (const effort of efforts) {
        expect(EFFORT_LEVELS, `bad effort at description line ${line}`).toContain(effort);
      }
    }
  });
});

describe("the limits it quotes", () => {
  it("quotes the real agent and item caps", () => {
    expect(description).toContain(`capped at ${WORKFLOW_AGENT_CAP}`);
    expect(description).toContain(`at most ${WORKFLOW_ITEM_CAP} items`);
  });

  it("describes the concurrency formula the runtime actually applies", () => {
    expect(description).toContain("min(16, available CPUs - 2)");
    expect(workflowConcurrency(8)).toBe(6);
    expect(workflowConcurrency(64)).toBe(16);
  });
});

describe("rendering", () => {
  it("keeps the placeholder the live agent roster is substituted into", () => {
    expect(description).toContain("{{typeList}}");
  });

  it("leaves no unescaped template interpolation from the source literal", () => {
    // A bare `${...}` in the .ts literal would interpolate at module load and
    // reach the model as a value (or throw), not as the example text.
    expect(description).not.toContain("[object Object]");
    // biome-ignore lint/suspicious/noTemplateCurlyInString: the literal placeholder is the subject under test
    expect(description).toContain("${f.title}");
  });
});


describe("the node() reconcile contract it documents (wb-g8f part B.5)", () => {
  it("states the resume semantics: stale read replay, operator reconcile for effects", () => {
    expect(description).toContain("A journaled read replays on resume marked stale");
    expect(description).toContain("acknowledges or overrides it with workflow_reconcile");
    expect(description).not.toContain("Node calls are never replayed from the agent journal");
  });
});

// The four texts that the F4 carry of wb-x6be landing 1023 named (follow-up
// wb-jvy7, R694) now say a failed Git preservation keeps the worktree: the
// agent() isolation clause of this description, the `isolation` bullet in the
// opening comment of src/workflow/tool-description.ts, item 2 in the opening
// comment of examples/workflows/gated-fix.js, and the end of the doc comment on
// WorkflowSpawnResult.cwd in src/workflow/runtime.ts. JV1 to JV4 pin these four
// texts in this order, one case for each. A form that a case does not assert is
// not claimed, and neither is the failed-preservation behaviour itself (the PF
// rows of test/worktree.test.ts pin that).
describe("wb-jvy7: the four F4 texts on a failed Git preservation", () => {
  const readRepoFile = (path: string): string =>
    readFileSync(fileURLToPath(new URL(`../${path}`, import.meta.url)), "utf8");
  // openingComment(): the file's lines from line 1, asserted to be "/**",
  // through the first line that is exactly " */", asserted to exist.
  const openingComment = (lines: string[]): string[] => {
    expect(lines[0]).toBe("/**");
    const end = lines.indexOf(" */");
    expect(end).toBeGreaterThan(0);
    return lines.slice(0, end + 1);
  };
  // prose(): the text lower-cased (toLowerCase), each line stripped of its
  // leading whitespace and then of the "*" and "/" characters that follow it,
  // the lines joined with spaces, and every whitespace run collapsed to one
  // space.
  const prose = (text: string): string =>
    text
      .split("\n")
      .map(line => line.replace(/^\s*[*/]*/, ""))
      .join(" ")
      .replace(/\s+/g, " ")
      .toLowerCase();
  /** `opts`, then an optional `?`, then `.`, then `isolation`, with any whitespace between them; ASCII letters in either case. */
  const OPTS_ISOLATION = /opts\s*\??\s*\.\s*isolation/gi;
  /** `isolation`, ASCII letters in either case. */
  const ISOLATION = /isolation/i;
  /** A line whose first text after its leading whitespace, a `*` and any whitespace is `2` or `(2`, with no ASCII digit (0-9) after the 2. */
  const ITEM_2 = /^\s*\*\s*\(?2(?![0-9])/;
  /**
   * A line whose first text after its leading whitespace is `cwd` (optionally
   * after `readonly` and whitespace, optionally in matching single or double
   * quotes), then an optional `?` and a `:`, with any whitespace before each.
   */
  const CWD_LINE = /^\s*(?:readonly\s+)?(["']?)cwd\1\s*\??\s*:/;
  /** JV1's expected text: from the one OPTS_ISOLATION match up to " opts.gate:". */
  const ISOLATION_CLAUSE =
    "opts.isolation: 'worktree' runs the agent in a fresh git worktree — EXPENSIVE (setup time + disk per agent), use ONLY when agents mutate files in parallel and would otherwise conflict; the worktree is removed when the agent settles, its changes preserved on a branch; if Git preservation fails, no branch is created and the worktree is kept instead, with the agent's work in it.";
  /** JV2's expected lines: the one line of the opening comment that ISOLATION matches, then the line after it. */
  const HEADER_ISOLATION_BULLET = [
    " *   - `isolation` removes the worktree on settle, changes kept on a branch;",
    " *     if Git preservation fails, no branch is created and the worktree is kept.",
  ];
  /** The line JV2 expects right after HEADER_ISOLATION_BULLET's two lines. */
  const ADDITIONS_LINE = ' * Additions with no upstream counterpart: `gate`, `resume`, `effort: "minimal"`,';
  /** JV3's expected lines: the one line of the opening comment that ITEM_2 matches, then the six lines after it. */
  const GATED_FIX_ISOLATION_ITEM = [
    ' *   2. `isolation: "worktree"` is deliberately not used here. An isolated child\'s',
    " *      worktree is committed to a branch and removed when it settles (if Git",
    " *      preservation fails, no branch is created and the worktree is kept), so",
    " *      a later agent would verify the main tree and could pass while the fix it",
    " *      was checking lives somewhere else. Isolation is for parallel writers that",
    " *      would collide; a serial fix-then-verify chain wants one shared tree.",
    " *",
  ];
  /** The line JV3 expects right after GATED_FIX_ISOLATION_ITEM's seven lines. */
  const ARGS_LINE = " * args: { task?: string, test?: string }";
  /** JV4's expected lines: the four lines before the one line CWD_LINE matches, then that line. */
  const CWD_DOC_TAIL = [
    "   * Usually unset for a worktree child even so: the copy is removed during the",
    "   * child's own settle (a failed Git preservation keeps it instead), so it is",
    "   * normally gone by the time this is read. That is what {@link gate} is for.",
    "   */",
    "  cwd?: string;",
  ];

  it("JV1 fullWorkflowToolDescription: OPTS_ISOLATION matches it once, where ISOLATION_CLAUSE starts, \" opts.gate:\" follows ISOLATION_CLAUSE, and prose() of the description holds no \"its changes preserved on a branch.\"", () => {
    expect(description.split("opts.isolation:")).toHaveLength(2);
    const start = description.indexOf("opts.isolation:");
    const end = description.indexOf(" opts.gate:", start);
    expect(end).toBeGreaterThan(start);
    expect(description.slice(start, end)).toBe(ISOLATION_CLAUSE);
    expect([...description.matchAll(OPTS_ISOLATION)].map(match => match.index)).toEqual([start]);
    expect(description).not.toContain("its changes preserved on a branch.");
    expect(prose(description)).not.toContain("its changes preserved on a branch.");
  });

  it("JV2 src/workflow/tool-description.ts: the one line of its opening comment that ISOLATION matches is HEADER_ISOLATION_BULLET's first line, ADDITIONS_LINE follows HEADER_ISOLATION_BULLET's two lines, and prose() of the file holds no \"`isolation` removes the worktree on settle, changes kept on a branch.\"", () => {
    const source = readRepoFile("src/workflow/tool-description.ts");
    const lines = source.split("\n");
    expect(openingComment(lines).filter(line => ISOLATION.test(line))).toEqual([HEADER_ISOLATION_BULLET[0]]);
    const at = lines.findIndex(line => line.startsWith(" *   - `isolation`"));
    expect(lines.filter(line => line.startsWith(" *   - `isolation`"))).toHaveLength(1);
    expect(lines.slice(at, at + HEADER_ISOLATION_BULLET.length)).toEqual(HEADER_ISOLATION_BULLET);
    expect(lines[at + HEADER_ISOLATION_BULLET.length]).toBe(ADDITIONS_LINE);
    expect(lines[at + HEADER_ISOLATION_BULLET.length]).not.toMatch(/^ \* {5}\S/);
    expect(lines).not.toContain(" *   - `isolation` removes the worktree on settle, changes kept on a branch.");
    expect(prose(source)).not.toContain("`isolation` removes the worktree on settle, changes kept on a branch.");
  });

  it("JV3 examples/workflows/gated-fix.js: the one line of its opening comment that ITEM_2 matches is GATED_FIX_ISOLATION_ITEM's first line, ARGS_LINE follows GATED_FIX_ISOLATION_ITEM's seven lines, and prose() of the file holds no \"removed when it settles, so\"", () => {
    const source = readRepoFile("examples/workflows/gated-fix.js");
    const lines = source.split("\n");
    expect(openingComment(lines).filter(line => ITEM_2.test(line))).toEqual([GATED_FIX_ISOLATION_ITEM[0]]);
    const at = lines.findIndex(line => line.startsWith(" *   2. "));
    expect(lines.filter(line => line.startsWith(" *   2. "))).toHaveLength(1);
    expect(lines.slice(at, at + GATED_FIX_ISOLATION_ITEM.length)).toEqual(GATED_FIX_ISOLATION_ITEM);
    expect(lines[at + GATED_FIX_ISOLATION_ITEM.length]).toBe(ARGS_LINE);
    expect(source).not.toContain("removed when it settles, so");
    expect(prose(source)).not.toContain("removed when it settles, so");
  });

  it("JV4 src/workflow/runtime.ts: the one line CWD_LINE matches is \"  cwd?: string;\", inside the WorkflowSpawnResult interface and last of CWD_DOC_TAIL's five lines, and prose() of the file holds no \"child's own settle, so it no longer exists\"", () => {
    const source = readRepoFile("src/workflow/runtime.ts");
    const lines = source.split("\n");
    expect(lines.filter(line => CWD_LINE.test(line))).toEqual(["  cwd?: string;"]);
    const field = lines.indexOf("  cwd?: string;");
    expect(lines.filter(line => line === "  cwd?: string;")).toHaveLength(1);
    const open = lines.indexOf("export interface WorkflowSpawnResult {");
    expect(open).toBeGreaterThanOrEqual(0);
    expect(field).toBeGreaterThan(open);
    expect(field).toBeLessThan(lines.indexOf("}", open));
    expect(field).toBeGreaterThanOrEqual(CWD_DOC_TAIL.length - 1);
    expect(lines.slice(field - CWD_DOC_TAIL.length + 1, field + 1)).toEqual(CWD_DOC_TAIL);
    expect(source).not.toContain("child's own settle, so it no longer exists");
    expect(prose(source)).not.toContain("child's own settle, so it no longer exists");
  });
});
