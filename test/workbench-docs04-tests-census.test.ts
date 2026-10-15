/**
 * VC-1 / W02 census falsifier (wb-a2g.13): docs/workbench/04 section "Tests".
 *
 * Spec lines pinned (docs/workbench/04-claude-agent-sdk-executor.md, "Tests"):
 *   1. "Golden real SDK single agent, parallel 3 agents, structured schema, successful resume."
 *   2. "Negative: invalid model, absent credentials, malformed native output, stream error
 *      after partial text, aborted query, resumed unknown session, inaccessible cwd,
 *      invalid tool policy."
 *   3. "Strict assertion that workflow agent() never calls Pi's createAgentSession/AgentManager
 *      under Claude backend."
 *   4. "No false successful tool or domain verdict after SDK result error; transcript privacy
 *      and log size bounds."
 *   5. "Gate executes against exact child candidate basis, before cleanup; worktree mismatch fails."
 * Five bullets decompose into 18 census rows (4 + 8 + 1 + 3 + 2).
 *
 * Each row is pinned to an EXISTING case by file path, verbatim it/describe title (or, for a
 * live-tier script, verbatim source fragments) and a docs/14 truth label ("code present",
 * "fixture pass", "live SDK pass", "adversarial pass"). Renaming, deleting or skipping a
 * pinned case turns the row red, naming the row. A row with no honest case is UNPINNED with a
 * written reason and never passes: the census asserts the unpinned set explicitly.
 *
 * This file never executes a pinned case and never imports another test file. A live-tier pin
 * records that the case EXISTS and is excluded from the portable gate; the presence of a title
 * is never evidence of a live pass, and a fixture title is never relabelled as one: the label
 * "live SDK pass" is refused for any file that sits in the portable gate or carries a fixture
 * seam.
 */
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DOC = "docs/workbench/04-claude-agent-sdk-executor.md";

type Label = "code present" | "fixture pass" | "live SDK pass" | "adversarial pass";

interface Pin {
  readonly file: string;
  readonly label: Label;
  /** Verbatim it/describe title. Absent for a script pin. */
  readonly title?: string;
  readonly kind?: "it" | "describe";
  /** Verbatim fragments that must occur inside the pinned case body. */
  readonly bodyMarkers?: readonly string[];
  /** Verbatim fragments that must occur anywhere in the pinned file (helpers, headers, scripts). */
  readonly fileMarkers?: readonly string[];
  /** What the pin does and does not cover; never empty when a scope limit applies. */
  readonly scope?: string;
}

interface Row {
  readonly id: string;
  readonly bullet: 1 | 2 | 3 | 4 | 5;
  /** Lower-case needle that must occur in the docs/04 bullet. */
  readonly needle: string;
  readonly pins: readonly Pin[];
  /** Mandatory for a row with no pins; the row never passes. */
  readonly unpinned?: string;
  /** Honest limits of the pinned evidence (for example a missing live case). */
  readonly gap?: string;
}

const HOST = "test/workbench-host-contract.test.ts";
const ADVERSE = "test/workbench-claude-adverse-faults.test.ts";
const CANCEL = "test/workbench-claude-cancel-faults.test.ts";
const STREAMING = "test/workbench-pi-streaming.test.ts";
const PI_LIVE = "test/workbench-claude-pi-live.test.ts";
const LIVE_CLAUDE = "qa/workbench/live-claude.mjs";
const LIVE_RESUME = "qa/workbench/live-resume.mjs";
const GATE_WORKTREE = "test/workflow-gate-worktree.test.ts";
const CAPABILITY = "test/workbench-claude-capability-tools.test.ts";

const PI_MANAGER_SPY = "vi.spyOn(AgentManager.prototype, name)";

const ROWS: readonly Row[] = [
  // ---- Bullet 1: golden real SDK -------------------------------------------------------------
  {
    id: "G1", bullet: 1, needle: "single agent",
    pins: [{
      file: HOST, label: "fixture pass", kind: "it",
      title: "L3: unchanged script uses Claude SDK query, not Pi AgentManager; session and usage are reported",
      bodyMarkers: ["agentCount:1"],
    }],
    gap: "No single-agent live case exists: live-claude.mjs runs two parallel agents and the Pi live test runs three; neither is relabelled as the single-agent golden. The live single-agent row is open.",
  },
  {
    id: "G2", bullet: 1, needle: "parallel 3 agents",
    pins: [
      {
        file: PI_LIVE, label: "live SDK pass", kind: "it",
        title: "runs three parallel structured agents with actual sessions and no Pi manager invocation",
        bodyMarkers: ["toHaveLength(3)", "new Set(rows.map(row=>row.sessionId)).size).toBe(3)"],
      },
      {
        file: STREAMING, label: "fixture pass", kind: "it",
        title: "returns parallel structured values under distinct native session identities through registered Pi tool",
        bodyMarkers: ["toHaveBeenCalledTimes(3)"],
      },
    ],
  },
  {
    id: "G3", bullet: 1, needle: "structured schema",
    pins: [
      {
        file: LIVE_CLAUDE, label: "live SDK pass",
        fileMarkers: ["Native Claude Agent SDK live acceptance probe", "additionalProperties:false", "createClaudeWorkflowHost("],
      },
      {
        file: HOST, label: "fixture pass", kind: "it",
        title: "L3: parallel schema agents return object values from native SDK structured_output",
      },
    ],
  },
  {
    id: "G4", bullet: 1, needle: "successful resume",
    pins: [
      {
        file: LIVE_RESUME, label: "live SDK pass",
        fileMarkers: ["Real Claude SDK resume proof", "sessions[0]!==sessions[1]", "createClaudeWorkflowHost("],
      },
      {
        file: HOST, label: "fixture pass", kind: "it",
        title: "L4: resumed role preserves the same system prompt and tools",
        bodyMarkers: ["resume:'sdk-session-1'"],
      },
    ],
  },
  // ---- Bullet 2: the eight negatives ---------------------------------------------------------
  {
    id: "N1", bullet: 2, needle: "invalid model",
    pins: [{
      file: STREAMING, label: "fixture pass", kind: "it",
      title: "preserves native %s failure and never falls back to manager",
      bodyMarkers: ["invalid model", "not.toHaveBeenCalled()"],
    }],
    gap: "The model rejection is an SDK-reported error result through the fixture seam; no case drives an unsupported model id through resolvedModel alone.",
  },
  {
    id: "N2", bullet: 2, needle: "absent credentials",
    pins: [],
    unpinned: "No case on the trunk base asserts an absent-credentials refusal: the adverse-faults header routes it to wb-cax.5, which has not landed here, and the Pi live test only reads the deployed native authentication on its success path. Stays unpinned until a case with a credential-absent fixture lands.",
  },
  {
    id: "N3", bullet: 2, needle: "malformed native output",
    pins: [
      {
        file: ADVERSE, label: "fixture pass", kind: "it",
        title: "N2: a declared schema with structured_output undefined reports missing structured_output",
      },
      {
        file: ADVERSE, label: "fixture pass", kind: "it",
        title: "N3: a structured_output that fails schema.check reports did not match schema, with no text",
      },
    ],
  },
  {
    id: "N4", bullet: 2, needle: "stream error after partial text",
    pins: [
      { file: ADVERSE, label: "fixture pass", kind: "describe", title: "N6 a non-abort stream throw after partial text is failed, never cancelled" },
      {
        file: ADVERSE, label: "fixture pass", kind: "it",
        title: "is ok:false with the query-failed prefix, the init session id, and a redacted diagnostic",
        bodyMarkers: ["Claude SDK query failed: socket reset while sending", "[REDACTED]"],
      },
    ],
  },
  {
    id: "N5", bullet: 2, needle: "aborted query",
    pins: [
      {
        file: CANCEL, label: "fixture pass", kind: "it",
        title: "F1 cancel before the init message: skipped with no session id, and the stream saw its controller abort",
      },
      {
        file: CANCEL, label: "fixture pass", kind: "it",
        title: "F3 the SDK ends the stream on abort: cancelled, never the missing-result failure",
      },
    ],
  },
  {
    id: "N6", bullet: 2, needle: "resumed unknown session",
    pins: [{
      file: HOST, label: "fixture pass", kind: "it",
      title: "L4: unknown resume session refuses without invoking a new query",
      bodyMarkers: ["host.resumeAgent('missing','followup')", "toHaveLength(0)"],
    }],
  },
  {
    id: "N7", bullet: 2, needle: "inaccessible cwd",
    pins: [
      { file: ADVERSE, label: "fixture pass", kind: "describe", title: "N1 inaccessible cwd refuses before any query" },
      {
        file: ADVERSE, label: "fixture pass", kind: "it",
        title: "a non-existent absolute cwd yields the typed diagnostic and zero query() calls",
      },
    ],
  },
  {
    id: "N8", bullet: 2, needle: "invalid tool policy",
    pins: [{
      file: CAPABILITY, label: "fixture pass", kind: "it",
      title: "validates finite host policy and refuses wildcard or incomplete authority",
      bodyMarkers: ["allowedCapabilities: [\"*\"]", "toThrow(CapabilityError)"],
      scope: "The curated MCP capability policy only (wildcard, over-cap, relative workspace, empty principal, zero maxCalls).",
    }],
    gap: "claude-host does not validate the SDK `tools` allowlist option itself, so no case refuses an invalid SDK tool list; the pin covers the capability tool policy and nothing wider.",
  },
  // ---- Bullet 3: never Pi under the Claude backend -------------------------------------------
  {
    id: "P1", bullet: 3, needle: "createagentsession/agentmanager",
    pins: [
      {
        file: STREAMING, label: "fixture pass", kind: "it",
        title: "returns parallel structured values under distinct native session identities through registered Pi tool",
        bodyMarkers: ["for (const spy of client.spies) expect(spy).not.toHaveBeenCalled()"],
        fileMarkers: [PI_MANAGER_SPY],
        scope: "Spies on AgentManager.prototype and asserts every spy untouched after a parallel Claude workflow.",
      },
      {
        file: PI_LIVE, label: "live SDK pass", kind: "it",
        title: "runs three parallel structured agents with actual sessions and no Pi manager invocation",
        bodyMarkers: ["for(const spy of spies)expect(spy).not.toHaveBeenCalled()"],
        fileMarkers: ["vi.spyOn(AgentManager.prototype,name)"],
      },
    ],
    gap: "host-contract L3 is deliberately NOT a pin: its local `manager` mock is never injected into the host, so its not.toHaveBeenCalled assertions are vacuous. No case asserts createAgentSession specifically; only the AgentManager spawn/spawnAndWait/resume paths are spied.",
  },
  // ---- Bullet 4: no false verdict, privacy, log bounds ---------------------------------------
  {
    id: "V1", bullet: 4, needle: "no false successful tool or domain verdict after sdk result error",
    pins: [
      { file: ADVERSE, label: "fixture pass", kind: "describe", title: "N8 error-subtype results are never a success" },
      {
        file: ADVERSE, label: "fixture pass", kind: "it",
        title: "an error subtype with is_error:false is still not a success",
      },
      {
        file: HOST, label: "fixture pass", kind: "it",
        title: "L4: error result after partial assistant never becomes success",
        bodyMarkers: ["result.ok).toBe(false)", "result.text).toBeUndefined()"],
      },
    ],
  },
  {
    id: "V2", bullet: 4, needle: "transcript privacy",
    pins: [],
    unpinned: "No case asserts transcript privacy on trunk: claude-transcript.ts is gated by wb-dc0.1, which is in respin and unlanded at this base; the security-pi-tools case covers the claude:transcript GRANT, not redaction of transcript text, and topology A7 covers titles. Stays unpinned until wb-dc0.1 lands.",
  },
  {
    id: "V3", bullet: 4, needle: "log size bounds",
    pins: [],
    unpinned: "No case bounds a LOG: the nearest evidence is the observer cap in workbench-claude-observer.test.ts (200 observed messages, tool evidence truncated), which bounds projected samples, not a persisted log or its byte size. Recorded as nearest evidence and never accepted as a pin.",
  },
  // ---- Bullet 5: gate on the exact child basis -----------------------------------------------
  {
    id: "W1", bullet: 5, needle: "exact child candidate basis, before cleanup",
    pins: [{
      file: GATE_WORKTREE, label: "fixture pass", kind: "it",
      title: "runs the gate inside the child's worktree, while it still exists",
      bodyMarkers: ["gateRuns[0].cwd).toBe(worktreePath)", "gateRuns[0].existed).toBe(true)", "existsSync(worktreePath!)).toBe(false)"],
      scope: "The Pi workflow host (createWorkflowHost) gate path: exact worktree cwd, gate ran before teardown, teardown after.",
    }],
    gap: "The Claude host refuses worktree isolation outright, so a Claude-host child basis gate has no case.",
  },
  {
    id: "W2", bullet: 5, needle: "worktree mismatch fails",
    pins: [],
    unpinned: "No case makes a gate run against the wrong worktree or basis FAIL: workflow-gate-worktree asserts cwd equality on the happy path only, and workflow-isolated only forwards `isolated`. The Claude-host isolation refusal conformance is wb-a2g.11, in flight and not on trunk at this base. Stays unpinned until it lands.",
  },
];

const EXPECTED_UNPINNED: readonly string[] = ["N2", "V2", "V3", "W2"];
const EXPECTED_BULLET_COUNTS: readonly number[] = [4, 8, 1, 3, 2];

// ---- scanner (copied locally by design; not imported from another test file) ------------------

const GATING_MODIFIERS: ReadonlySet<string> = new Set(["skip", "only", "todo", "skipIf", "runIf", "fails"]);
const CALL_FORMS: ReadonlySet<string> = new Set(["each", "skipIf", "runIf"]);

interface Found {
  readonly kind: "it" | "describe";
  readonly modifiers: readonly string[];
  readonly title: string;
  readonly index: number;
}

const PLAIN = /\b(describe|it|test)((?:\.[A-Za-z]+)*)\(\s*(["'`])((?:\\.|(?!\3)[^\\])*)\3/g;
const CALLED = /\b(describe|it|test)((?:\.[A-Za-z]+)*)\.(each|skipIf|runIf)\(([\s\S]{0,800}?)\)\(\s*(["'`])((?:\\.|(?!\5)[^\\])*)\5/g;
const LEGACY_SKIP = /\b(xit|xtest|xdescribe)\(/;
const NEXT_CASE = /\n[ \t]*(?:describe|it|test)(?:\.[A-Za-z]+)*(?:\.(?:each|skipIf|runIf)\([^\n]*?\))?\(/g;

function isCommented(text: string, index: number): boolean {
  const lineStart = text.lastIndexOf("\n", index) + 1;
  return /^\s*(\/\/|\*|\/\*)/.test(text.slice(lineStart, index + 1));
}

function unquoteTitle(title: string): string {
  return title.replace(/\\(.)/g, "$1");
}

function parts(modifiers: string): string[] {
  return modifiers.split(".").filter(part => part.length > 0);
}

function scan(text: string): Found[] {
  const found: Found[] = [];
  for (const m of text.matchAll(PLAIN)) {
    const modifiers = parts(m[2]);
    if (modifiers.some(modifier => CALL_FORMS.has(modifier)) || isCommented(text, m.index)) continue;
    found.push({ kind: m[1] === "describe" ? "describe" : "it", modifiers, title: unquoteTitle(m[4]), index: m.index });
  }
  for (const m of text.matchAll(CALLED)) {
    if (isCommented(text, m.index)) continue;
    found.push({ kind: m[1] === "describe" ? "describe" : "it", modifiers: [...parts(m[2]), m[3]], title: unquoteTitle(m[6]), index: m.index });
  }
  return found.sort((a, b) => a.index - b.index);
}

function bodyOf(text: string, from: number): string {
  NEXT_CASE.lastIndex = from + 1;
  const next = NEXT_CASE.exec(text);
  return text.slice(from, next ? next.index : text.length);
}

function gatingOf(found: Found): string[] {
  return found.modifiers.filter(modifier => GATING_MODIFIERS.has(modifier));
}

/** Config exclude list: the portable gate never runs these files. */
function liveTierFiles(configText: string): ReadonlySet<string> {
  const exclude = /exclude:\s*\[([^\]]*)\]/.exec(configText);
  const files = new Set<string>();
  for (const m of (exclude?.[1] ?? "").matchAll(/"([^"]+)"/g)) files.add(m[1]);
  return files;
}

function isLiveTier(file: string, excluded: ReadonlySet<string>): boolean {
  return excluded.has(file) || /^qa\/workbench\/live-[^/]+\.mjs$/.test(file);
}

const FIXTURE_SEAM = /vi\.mock\(|FakeClaudeSdk|fakeQuery|\bquery\s*:/;

/** Title, skip and assertion-fragment problems for one titled pin against the text of its file. */
function titleProblems(text: string, pin: Pin): string[] {
  const kind = pin.kind ?? "it";
  const all = scan(text);
  const matches = all.filter(f => f.kind === kind && f.title === pin.title);
  if (matches.length === 0) return [`no ${kind} titled ${JSON.stringify(pin.title)} (renamed or deleted)`];
  const problems: string[] = [];
  if (matches.length > 1) problems.push(`${matches.length} ${kind} cases share the title ${JSON.stringify(pin.title)}; the pin is ambiguous`);
  for (const found of matches) {
    const gating = gatingOf(found);
    if (gating.length > 0) problems.push(`${JSON.stringify(pin.title)} carries .${gating.join(".")}`);
  }
  for (const other of all) {
    const gating = gatingOf(other);
    if (other.kind === "describe" && gating.length > 0) problems.push(`describe ${JSON.stringify(other.title)} carries .${gating.join(".")}, which can swallow the pinned case`);
  }
  if (LEGACY_SKIP.test(text)) problems.push("the file contains xit/xtest/xdescribe");
  if (kind === "it") {
    const body = bodyOf(text, matches[0].index);
    for (const marker of pin.bodyMarkers ?? []) {
      if (!body.includes(marker)) problems.push(`${JSON.stringify(pin.title)} lost the assertion fragment ${JSON.stringify(marker)}`);
    }
  }
  return problems;
}

function pinProblems(pin: Pin, root: string, excluded: ReadonlySet<string>): string[] {
  const path = join(root, pin.file);
  if (!existsSync(path)) return [`${pin.file}: file is absent`];
  const text = readFileSync(path, "utf8");
  const problems: string[] = [];
  const live = isLiveTier(pin.file, excluded);
  if (pin.label === "live SDK pass") {
    if (!live) problems.push(`${pin.file}: labelled "live SDK pass" but the file is in the portable gate; a fixture is never a live pass`);
    if (FIXTURE_SEAM.test(text)) problems.push(`${pin.file}: labelled "live SDK pass" but carries a fixture seam`);
  } else if (live) {
    problems.push(`${pin.file}: live-tier file carries the label "${pin.label}"; only "live SDK pass" or "code present" fit it`);
  }
  for (const fragment of pin.fileMarkers ?? []) {
    if (!text.includes(fragment)) problems.push(`${pin.file}: missing verbatim fragment ${JSON.stringify(fragment)}`);
  }
  if (pin.title === undefined) {
    if (pin.fileMarkers === undefined || pin.fileMarkers.length === 0) problems.push(`${pin.file}: a script pin needs verbatim file fragments`);
    return problems;
  }
  return [...problems, ...titleProblems(text, pin).map(problem => `${pin.file}: ${problem}`)];
}

function rowProblems(row: Row, root: string, excluded: ReadonlySet<string>): string[] {
  if (row.pins.length === 0) {
    return row.unpinned !== undefined && row.unpinned.trim().length >= 80
      ? [`row ${row.id} is UNPINNED and never passes: ${row.unpinned}`]
      : [`row ${row.id} has no pin and no written reason of at least 80 characters`];
  }
  if (row.unpinned !== undefined) return [`row ${row.id} carries both pins and an unpinned reason`];
  return row.pins.flatMap(pin => pinProblems(pin, root, excluded).map(problem => `row ${row.id}: ${problem}`));
}

function docBullets(): string[] {
  const doc = readFileSync(join(ROOT, DOC), "utf8");
  const section = doc.split(/^## Tests\s*$/m)[1]?.split(/^## /m)[0] ?? "";
  return section.split("\n").filter(line => line.startsWith("- ")).map(line => line.slice(2).trim());
}

const EXCLUDED = liveTierFiles(readFileSync(join(ROOT, "vitest.config.ts"), "utf8"));

// ---- the census ------------------------------------------------------------------------------

describe("docs/04 Tests census binds the five bullets to existing cases", () => {
  it("the docs/04 Tests section still has the five bullets this census decomposes", () => {
    const bullets = docBullets();
    expect(bullets).toHaveLength(5);
    expect(bullets[0]).toBe("Golden real SDK single agent, parallel 3 agents, structured schema, successful resume.");
    expect(bullets[1]).toBe("Negative: invalid model, absent credentials, malformed native output, stream error after partial text, aborted query, resumed unknown session, inaccessible cwd, invalid tool policy.");
    expect(bullets[2]).toContain("workflow agent() never calls Pi's createAgentSession/AgentManager under Claude backend");
    expect(bullets[3]).toBe("No false successful tool or domain verdict after SDK result error; transcript privacy and log size bounds.");
    expect(bullets[4]).toBe("Gate executes against exact child candidate basis, before cleanup; worktree mismatch fails.");
  });

  it("every census row names its item in its docs bullet, in the doc's order, and the rows cover each bullet's items exactly", () => {
    const bullets = docBullets();
    EXPECTED_BULLET_COUNTS.forEach((count, i) => {
      expect(ROWS.filter(r => r.bullet === i + 1), `bullet ${i + 1}`).toHaveLength(count);
    });
    expect(ROWS).toHaveLength(18);
    expect(new Set(ROWS.map(r => r.id)).size).toBe(18);
    for (const row of ROWS) expect(bullets[row.bullet - 1].toLowerCase(), `row ${row.id}`).toContain(row.needle);
    const golden = bullets[0].replace(/\.$/, "").split(", ");
    expect(golden).toHaveLength(4);
    ROWS.filter(r => r.bullet === 1).forEach((row, i) => {
      expect(golden[i].toLowerCase(), `row ${row.id}`).toContain(row.needle);
    });
    const negatives = bullets[1].replace(/^Negative: /, "").replace(/\.$/, "").split(", ");
    expect(negatives).toHaveLength(8);
    ROWS.filter(r => r.bullet === 2).forEach((row, i) => {
      expect(negatives[i].toLowerCase(), `row ${row.id}`).toBe(row.needle);
    });
  });

  it.each(ROWS)("row $id (bullet $bullet, $needle): pinned cases exist, keep their title, are not skipped, and keep their truth label; an unpinned row is reasoned and never passes", row => {
    const problems = rowProblems(row, ROOT, EXCLUDED);
    if (row.pins.length === 0) {
      // Never a pass: an unpinned row is accounted for and must say why, but it is not green evidence.
      expect(EXPECTED_UNPINNED).toContain(row.id);
      expect(problems).toHaveLength(1);
      expect(problems[0]).toContain("UNPINNED and never passes");
      return;
    }
    expect(problems).toEqual([]);
  });

  it("the unpinned set is exactly the reasoned rows, so a newly pinnable row flips deliberately", () => {
    expect(ROWS.filter(r => r.pins.length === 0).map(r => r.id)).toEqual([...EXPECTED_UNPINNED]);
    expect(ROWS.filter(r => r.pins.length > 0 && r.unpinned !== undefined)).toEqual([]);
    expect(ROWS.filter(r => r.pins.length === 0).every(r => (r.unpinned ?? "").length >= 80)).toBe(true);
  });

  it("a live SDK pass label sits only on live-tier files with no fixture seam, and a fixture label never on a live-tier file", () => {
    const labels = ROWS.flatMap(r => r.pins).map(p => ({ file: p.file, label: p.label }));
    expect(labels.filter(l => l.label === "live SDK pass").map(l => l.file).sort()).toEqual(
      [LIVE_CLAUDE, LIVE_RESUME, PI_LIVE, PI_LIVE].sort(),
    );
    for (const { file, label } of labels) {
      expect(isLiveTier(file, EXCLUDED), `${file} (${label})`).toBe(label === "live SDK pass");
    }
    expect(EXCLUDED.has(PI_LIVE)).toBe(true);
  });

  it("the Pi never-called pin is a spy plus a negative assertion, not a case that merely runs the Claude host", () => {
    const p1 = ROWS.find(r => r.id === "P1");
    expect(p1?.pins.length).toBeGreaterThanOrEqual(2);
    for (const pin of p1?.pins ?? []) {
      expect(pin.bodyMarkers?.some(m => m.includes("not.toHaveBeenCalled()"))).toBe(true);
      expect(pin.fileMarkers?.some(m => m.includes("AgentManager.prototype"))).toBe(true);
    }
    expect(p1?.pins.some(pin => pin.file === HOST)).toBe(false);
  });
});

// ---- falsifiers: the census goes red on exactly the drift it claims to catch -----------------

describe("scanner falsifiers", () => {
  const BASE = [
    'describe("outer", () => {',
    '  it("kept title", async () => {',
    "    expect(spy).not.toHaveBeenCalled();",
    "  });",
    '  it("next case", () => {});',
    "});",
    "",
  ].join("\n");
  const pin = (over: Partial<Pin> = {}): Pin => ({ file: "x.test.ts", label: "fixture pass", kind: "it", title: "kept title", ...over });

  it("a clean case produces no problem", () => {
    expect(titleProblems(BASE, pin({ bodyMarkers: ["not.toHaveBeenCalled()"] }))).toEqual([]);
  });
  it("a rename is red", () => {
    expect(titleProblems(BASE.replace("kept title", "renamed title"), pin())[0]).toContain("renamed or deleted");
  });
  it("a deletion is red", () => {
    const deleted = BASE.replace(/ {2}it\("kept title"[\s\S]*?\n {2}\}\);\n/, "");
    expect(deleted).not.toContain("kept title");
    expect(titleProblems(deleted, pin())[0]).toContain("renamed or deleted");
  });
  it.each(["it.skip", "it.todo", "it.only", "it.fails", "it.skipIf(true)", "it.runIf(false)"])("%s is red", head => {
    const text = BASE.replace('it("kept title"', `${head}("kept title"`);
    expect(titleProblems(text, pin()).join("\n")).toMatch(/carries \.(skip|todo|only|fails|skipIf|runIf)/);
  });
  it("an enclosing describe.skip is red", () => {
    expect(titleProblems(BASE.replace('describe("outer"', 'describe.skip("outer"'), pin()).join("\n")).toContain("can swallow the pinned case");
  });
  it("xit anywhere in the file is red", () => {
    expect(titleProblems(`${BASE}xit("other", () => {});\n`, pin()).join("\n")).toContain("xit/xtest/xdescribe");
  });
  it("a title that survives only inside a comment is absent", () => {
    expect(titleProblems(BASE.replace('  it("kept title"', '  // it("kept title"'), pin())[0]).toContain("renamed or deleted");
  });
  it("an assertion removed from the pinned body is red, and one that moved to the next case does not count", () => {
    const stripped = BASE.replace("    expect(spy).not.toHaveBeenCalled();\n", "");
    const marked = pin({ bodyMarkers: ["not.toHaveBeenCalled()"] });
    expect(titleProblems(stripped, marked).join("\n")).toContain("lost the assertion fragment");
    const moved = stripped.replace('it("next case", () => {});', 'it("next case", () => { expect(spy).not.toHaveBeenCalled(); });');
    expect(titleProblems(moved, marked).join("\n")).toContain("lost the assertion fragment");
  });
  it("an it.each title and an escaped quote are found verbatim", () => {
    const text = 'it.each(["a", "b"] as const)("preserves native %s failure", async kind => {});\nit("it\\\'s fine", () => {});\n';
    expect(scan(text).map(f => f.title)).toEqual(["preserves native %s failure", "it's fine"]);
  });
  it("two cases with the pinned title make the pin ambiguous", () => {
    expect(titleProblems(`${BASE}it("kept title", () => {});\n`, pin()).join("\n")).toContain("ambiguous");
  });
  it("a fixture file cannot wear the live SDK pass label and a live file cannot wear a fixture label", () => {
    const fixtureAsLive: Pin = { file: HOST, label: "live SDK pass", kind: "it", title: "L3: parallel schema agents return object values from native SDK structured_output" };
    expect(pinProblems(fixtureAsLive, ROOT, EXCLUDED).join("\n")).toContain("a fixture is never a live pass");
    const liveAsFixture: Pin = { file: PI_LIVE, label: "fixture pass", kind: "it", title: "runs three parallel structured agents with actual sessions and no Pi manager invocation" };
    expect(pinProblems(liveAsFixture, ROOT, EXCLUDED).join("\n")).toContain("live-tier file carries the label");
  });
  it("a mis-titled real pin is red and names the row", () => {
    const row: Row = { id: "X1", bullet: 2, needle: "inaccessible cwd", pins: [{ file: ADVERSE, label: "fixture pass", kind: "it", title: "a non-existent absolute cwd yields the typed diagnostic and ZERO query() calls" }] };
    const problems = rowProblems(row, ROOT, EXCLUDED);
    expect(problems).toHaveLength(1);
    expect(problems[0]).toContain("row X1");
    expect(problems[0]).toContain("renamed or deleted");
  });
  it("a row with no pin and no reason is red", () => {
    expect(rowProblems({ id: "X2", bullet: 2, needle: "x", pins: [] }, ROOT, EXCLUDED)[0]).toContain("no pin and no written reason");
  });
});
