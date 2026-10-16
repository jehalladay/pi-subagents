/**
 * W19 / docs-12 "Authorization design" and "Auditability" census (wb-gs2.3, respin).
 *
 * docs/workbench/12-security.md states eight authorization bullets and three
 * auditability sentences. This census binds each of them to cases that ALREADY
 * LAND in this repository, by file, verbatim case title and tier.
 *
 * What the instrument proves (and what it does not):
 * - Every pinned case is COLLECTED, RUNS and REACHES AN ASSERTION. Collection and
 *   state come from the vitest runner itself (a nested `vitest run` with a small
 *   reporter and `--expect.requireAssertions`), never from a text scan of the
 *   pinned file. So comments, options skips, describe-level skips, ctx.skip,
 *   conditional registration, string decoys and import aliases are judged by what
 *   the runner does, and a finding names the true cause (not collected, skipped,
 *   todo, vacuous, failed, hollowed table, it.fails).
 * - It does NOT prove a pinned case is a strong test of its row, and it does not
 *   probe the RPC/host boundary or the isolation child: that is wb-ksz. The only
 *   child it spawns is the vitest runner.
 * - Tier truth: a `default-gate` label is verified by the nested run using the
 *   repository's own vitest config (glob semantics decided by vitest), plus a
 *   read-only check of the forge.toml gate registration and the package.json test
 *   script.
 * - Docs exactness: the two pinned sections are extracted from the SAME rendered
 *   view (fences and HTML comments dropped), headings must be unique, the section
 *   is bounded by the next level-1/2 heading, and every rendered block must equal
 *   the quoted rows (so prose, ### subsections, nested or lazily continued lines
 *   and unpunctuated tails go red).
 *
 * Every falsifier below builds its own fixture; none derives from the pinned
 * source text or the live docs. Landing-order rule: once this lands, any later
 * edit to docs/12 'Authorization design' / 'Auditability' reddens it by design
 * and the editing change updates the census in the same commit.
 *
 * Row ids follow docs order. A6 is the bullet wb-pjj added (the former A6 and A7
 * are now A7 and A8); the former A4 and D3 halves are split into A4a/A4b.
 */
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, realpathSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

const ROOT = realpathSync(join(dirname(fileURLToPath(import.meta.url)), ".."));
const DOCS_12 = "docs/workbench/12-security.md";
const AUTHORIZATION = "Authorization design";
const AUDITABILITY = "Auditability";

/** default-gate: a plain case collected by the default vitest config. knownWidening: an it.fails case the row names as a known widening. */
type Tier = "default-gate" | "knownWidening";

interface Pin {
  readonly file: string;
  /** Verbatim case title. A title containing %j is an it.each template matching `count` cases. */
  readonly title: string;
  readonly tier: Tier;
  /** Exact number of collected cases the title must match (default 1). */
  readonly count?: number;
}

interface Row {
  readonly row: string;
  readonly section: typeof AUTHORIZATION | typeof AUDITABILITY;
  /** Verbatim docs/12 text (one bullet, or one sentence). Split rows repeat their bullet. */
  readonly quote: string;
  readonly pins: readonly Pin[];
  /** Required, non-empty, exactly when pins is empty. */
  readonly unpinned?: string;
  /** Free-text note on a covered row; asserted non-empty when present. */
  readonly residual?: string;
}

const CLAUDE_TOOLS = "test/workbench-claude-capability-tools.test.ts";
const CONTROL = "test/workbench-control.test.ts";
const FURNACE_CONTROL = "test/workbench-furnace-control.test.ts";
const PROVENANCE = "test/workbench-control-provenance.test.ts";
const PROVENANCE_DEPTH = "test/workbench-control-provenance-depth.test.ts";
const REGISTRY_SCHEMA = "test/workbench-registry-schema.test.ts";
const SECURITY_CAPABILITY = "test/workbench-security-capability.test.ts";
const SECURITY_WORKFLOW = "test/workbench-security-workflow.test.ts";

const gate = (file: string, title: string, count?: number): Pin => ({ file, title, tier: "default-gate", ...(count === undefined ? {} : { count }) });

const ROWS: readonly Row[] = [
  {
    row: "A1",
    section: AUTHORIZATION,
    quote: "Caller identity and scope bound at workbench entry point; impersonation from script payload prohibited.",
    pins: [
      gate(CLAUDE_TOOLS, "rejects contract drift, malformed native payload, and impersonation before provider dispatch"),
      gate(CLAUDE_TOOLS, "does not accept SDK-stripped identity arguments as host authority"),
      gate(CONTROL, "rule 5: a target in another workspace or principal is an authorization failure even with a valid control grant"),
      gate(SECURITY_WORKFLOW, "node() refuses grant/identity options before dispatching to a host capability"),
    ],
    residual:
      "security-workflow 'node() refuses grant/identity options before dispatching' evidences THIS row (a script payload carrying grants/principal/workspace/scope is refused before any host call), not A4: it asserts refusal BEFORE dispatch, the opposite half of 'enforced in the host after receiving the RPC'.",
  },
  {
    row: "A2",
    section: AUTHORIZATION,
    quote: "Separate discover, inspect, observe, invoke and control grants.",
    pins: [
      gate(CLAUDE_TOOLS, "registration and discovery never authorize invocation"),
      gate(CLAUDE_TOOLS, "discovery, contract and native inspect remain independently granted"),
      gate(CONTROL, "rule 2: observer-only grants cannot control under any action spelling, and nothing is read before refusing"),
    ],
  },
  {
    row: "A3",
    section: AUTHORIZATION,
    quote: "Node cap must be explicitly allowed in workflow and Claude agent role; never auto-share all registered providers.",
    pins: [
      gate(CLAUDE_TOOLS, "requires BOTH role membership and exact invoke grant plus producer permission"),
      gate(CLAUDE_TOOLS, "discovery is finite and does not enumerate provider registrations outside the role"),
      gate(CLAUDE_TOOLS, "a role list never turns a registered write fixture into an executable operation"),
    ],
  },
  {
    row: "A4a",
    section: AUTHORIZATION,
    quote: "Policy enforced in privileged host *after* receiving RPC, not only by hiding tool names.",
    pins: [
      gate(SECURITY_CAPABILITY, "hostile caller-added outer identity/grants never reach provider; inner authority fields are refused"),
      gate(SECURITY_CAPABILITY, "registry also refuses extra authority fields and prototype keys before calling a strict provider"),
    ],
    residual: "COVERED HALF of A4: the host MCP capability surface and the registry refuse a crafted call after receiving it. The other half is A4b.",
  },
  {
    row: "A4b",
    section: AUTHORIZATION,
    quote: "Policy enforced in privileged host *after* receiving RPC, not only by hiding tool names.",
    pins: [],
    unpinned:
      "UNCOVERED HALF of A4: a crafted raw RPC call sent from the sandbox isolation child into the privileged host. No landed case sends one; the nearest case, security-workflow 'node() refuses grant/identity options before dispatching', refuses BEFORE dispatch (it asserts callNode is never called), so it is the A1 half, not host-side enforcement after receipt. Oracle: wb-ksz.5 (owner-reviewed). Promoting this row means adding pins and removing it from UNPINNED_ROW_IDS in one reviewed change.",
  },
  {
    row: "A5",
    section: AUTHORIZATION,
    quote: "Control decisions require native ownership/preconditions and, for destructive actions, operator confirmation.",
    pins: [
      gate(CONTROL, "rule 6: causation, grouping, dependency and hypothesis never confer lifecycle ownership, and the owned child holds no owner rights"),
      gate(CONTROL, "rule 7: destructive actions need params.confirmed === true as an own data property, and a getter is never invoked"),
    ],
  },
  {
    row: "A6",
    section: AUTHORIZATION,
    quote:
      'A control adapter executes only the decision object the decision core minted in this process: `isCoreMintedDecision` (src/workbench/control.ts) is an identity check against a module-private WeakSet, so a copy, a deserialized or audit/journal-replayed receipt and a hand-built look-alike are refused with the fixed text "decision was not minted by the decision core" however exact their shape, and structural vetting stays behind it as defense in depth.',
    pins: [
      gate(PROVENANCE, "refuses every copy: structural, JSON and structuredClone copies, re-wraps, inheritors, proxies and later receipt phases"),
      gate(PROVENANCE, "refuses every structurally exact look-alike of a genuine permit with the fixed text, before any native verb"),
      gate(PROVENANCE, "refuses a JSON round-trip of a permitted decision exactly as the audit or the journal would hand it back"),
      gate(PROVENANCE_DEPTH, "a minted permit executes; every structurally exact forgery of it is refused with the fixed provenance text first"),
    ],
  },
  {
    row: "A7",
    section: AUTHORIZATION,
    quote: "Treat unknown permission data as deny.",
    pins: [
      gate(CONTROL, "rule 1: unknown permission data (undefined, non-array, non-string entries, wildcards) is an authorization denial"),
      gate(CLAUDE_TOOLS, "validates finite host policy and refuses wildcard or incomplete authority"),
    ],
  },
  {
    row: "A8",
    section: AUTHORIZATION,
    quote: "Source/deployment pin must be checked before loading; malformed schema/unsupported contract fails closed.",
    pins: [
      gate(CLAUDE_TOOLS, "rechecks the host deployment pin for each call and redacts unexpected pin errors"),
      gate(CLAUDE_TOOLS, "pins immutable host authorization despite later config mutation"),
      gate(REGISTRY_SCHEMA, "rejects malformed or unsupported schema %j without provider effects", 28),
      gate(REGISTRY_SCHEMA, "rejects malformed output contract before provider execution"),
    ],
  },
  {
    row: "D1",
    section: AUDITABILITY,
    quote:
      "Record authorized principal, capability contract version, logical invocation, target native ref, reason/policy, request acknowledgment and producer outcome for control operations.",
    pins: [
      gate(CONTROL, "permits the confirmed owner and records principal, contract, invocation, target, grant, policy and the ownership confirmation"),
      gate(CONTROL, "requested, acknowledged and result are three distinct, ordered, frozen receipts that each carry their own timestamp"),
    ],
  },
  {
    row: "D2",
    section: AUDITABILITY,
    quote: "Keep sensitive payload refs separate and access-controlled.",
    pins: [],
    unpinned:
      "No landed case asserts this for control operations. The payload-reference cases that exist are all on the OBSERVATION side and prove a different property: reactivefiber-observer 'rf-output:sha256' digest ref and claude-topology 'no nativePayloadRef on a snapshot' assert how an observation snapshot is shaped, grouped-fixture 'carries transcript payload references, never bodies' asserts fixture input fields, and observation 'keeps payload references instead of bodies' asserts projection capacity bounds with cross-scope query denial. None of them records or inspects a control-operation audit receipt, so none shows that a control audit receipt keeps sensitive payload refs separate or access-controlled; pinning them would overclaim. The nearest control-side cases (control 'malformed envelope: every field copied into the audit receipt is bounded clean text', furnace-control 'parks every seam failure with a bounded native label') prove receipt field hygiene and message non-echo. No oracle bead is in flight; the owner default is keep-unpinned-with-reason.",
  },
  {
    row: "D3",
    section: AUDITABILITY,
    quote: "Logs are not a source of entitlement.",
    pins: [
      gate(FURNACE_CONTROL, "refuses a raw request, a look-alike, a phase-advanced or a forged receipt as unvetted, before the seam and without reading accessors"),
      gate(PROVENANCE, "refuses a JSON round-trip of a permitted decision exactly as the audit or the journal would hand it back"),
    ],
    residual:
      "wb-pjj landed: the provenance case that hands back a permitted decision exactly as the audit or journal would is refused is the direct evidence that a logged copy never entitles execution (pin-flip executed at this re-cut).",
  },
];

const EXPECTED_ROW_IDS: readonly string[] = ["A1", "A2", "A3", "A4a", "A4b", "A5", "A6", "A7", "A8", "D1", "D2", "D3"];
/** Rows that must stay unpinned today. Promoting one means adding pins AND removing it here, in one reviewed change. */
const UNPINNED_ROW_IDS: readonly string[] = ["A4b", "D2"];

// ---------------------------------------------------------------------------
// Runner-verified collection
// ---------------------------------------------------------------------------

interface CollectedCase {
  readonly file: string;
  readonly name: string;
  readonly title: string;
  readonly state: string;
  readonly mode: string;
  readonly fails: boolean;
  readonly errors: readonly string[];
}

const REPORTER_SOURCE = `import { writeFileSync } from "node:fs";
export default class CensusReporter {
  onTestRunEnd(modules) {
    const out = [];
    const files = [];
    for (const module of modules) {
      files.push(module.moduleId);
      for (const test of module.children.allTests()) {
        const result = test.result();
        out.push({
          file: module.moduleId,
          name: test.fullName,
          title: test.name,
          state: result.state,
          mode: test.task.mode,
          fails: test.task.fails === true,
          errors: (result.errors ?? []).map(error => String(error.message)),
        });
      }
    }
    writeFileSync(process.env.CENSUS_OUT, JSON.stringify({ files, cases: out }));
  }
}
`;

function isCollectedCase(value: unknown): value is CollectedCase {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.file === "string" &&
    typeof v.name === "string" &&
    typeof v.title === "string" &&
    typeof v.state === "string" &&
    typeof v.mode === "string" &&
    typeof v.fails === "boolean" &&
    Array.isArray(v.errors)
  );
}

interface RunOutcome {
  /** Every test module the runner loaded, relative to the run root, including modules that registered no case. */
  readonly files: readonly string[];
  readonly cases: readonly CollectedCase[];
  readonly log: string;
}

/** Run the repository's vitest in `cwd` over `filters` and return what the runner collected, relative to `cwd`. */
function runVitest(cwd: string, filters: readonly string[], scratch: string, label: string): RunOutcome {
  const reporter = join(scratch, "census-reporter.mjs");
  if (!existsSync(reporter)) writeFileSync(reporter, REPORTER_SOURCE);
  const out = join(scratch, `${label}.json`);
  const env: Record<string, string> = {};
  for (const [key, value] of Object.entries(process.env)) {
    if (value !== undefined && !key.startsWith("VITEST")) env[key] = value;
  }
  env.CENSUS_OUT = out;
  const run = spawnSync(process.execPath, [join(ROOT, "node_modules/vitest/vitest.mjs"), "run", "--root", cwd, "--reporter", reporter, "--expect.requireAssertions", ...filters], {
    cwd,
    env,
    encoding: "utf8",
    timeout: 170_000,
    maxBuffer: 64 * 1024 * 1024,
  });
  const log = `${run.stdout ?? ""}${run.stderr ?? ""}`;
  if (!existsSync(out)) return { files: [], cases: [], log };
  const parsed = JSON.parse(readFileSync(out, "utf8")) as { files?: unknown; cases?: unknown };
  const { files, cases } = parsed;
  if (!Array.isArray(files) || !files.every((item): item is string => typeof item === "string") || !Array.isArray(cases) || !cases.every(isCollectedCase)) {
    throw new Error(`census reporter wrote an unexpected shape for ${label}`);
  }
  const base = realpathSync(cwd);
  return { files: files.map(item => relative(base, item)), cases: cases.map(item => ({ ...item, file: relative(base, item.file) })), log };
}

// ---------------------------------------------------------------------------
// Pure rules (each is falsified below on a fixture built for the purpose)
// ---------------------------------------------------------------------------

function titleMatches(pin: Pin, item: CollectedCase): boolean {
  if (!pin.title.includes("%j")) return item.title === pin.title;
  const pattern = pin.title
    .split("%j")
    .map(part => part.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join(".+");
  return new RegExp(`^${pattern}$`).test(item.title);
}

function classifyPin(row: Row, pin: Pin, fileExists: boolean, run: Pick<RunOutcome, "files" | "cases">): readonly string[] {
  const where = `${row.row} (${row.section}) pin ${pin.file} :: "${pin.title}"`;
  if (!fileExists) return [`${where}: file is missing`];
  if (!run.files.includes(pin.file)) return [`${where}: the vitest config does not collect this file (excluded, or outside include), so the ${pin.tier} label is false`];
  const inFile = run.cases.filter(item => item.file === pin.file);
  if (inFile.length === 0) return [`${where}: not collected: the file registers no case at all`];
  const matched = inFile.filter(item => titleMatches(pin, item));
  const expected = pin.count ?? 1;
  if (matched.length === 0) return [`${where}: not collected: no registered case carries this title (commented out, removed or registered conditionally)`];
  const problems: string[] = [];
  if (matched.length !== expected) problems.push(`${where}: collected ${matched.length} of ${expected} expected cases (table hollowed or title duplicated)`);
  for (const item of matched) {
    if (item.mode === "todo") problems.push(`${where}: case is todo (not running)`);
    else if (item.state === "skipped" || item.mode === "skip") problems.push(`${where}: case is skipped (not running)`);
    else if (item.state === "failed" && item.errors.some(message => message.includes("expected any number of assertion"))) problems.push(`${where}: no assertion reached (vacuous pass)`);
    else if (item.state === "failed") problems.push(`${where}: case fails: ${item.errors[0] ?? "no message"}`);
    else if (pin.tier === "default-gate" && item.fails) problems.push(`${where}: case is it.fails but the row does not name a known widening (tier default-gate)`);
    else if (pin.tier === "knownWidening" && !item.fails) problems.push(`${where}: tier knownWidening requires an it.fails case, found a plain case`);
  }
  return problems;
}

function checkRowShape(row: Row): readonly string[] {
  const problems: string[] = [];
  if (row.pins.length === 0) {
    if (row.unpinned === undefined || row.unpinned.trim().length === 0) problems.push(`${row.row}: unpinned without a reason`);
  } else if (row.unpinned !== undefined) {
    problems.push(`${row.row}: carries pins and an unpinned reason`);
  }
  if (row.residual !== undefined && row.residual.trim().length === 0) problems.push(`${row.row}: empty residual note`);
  const seen = new Set<string>();
  for (const pin of row.pins) {
    if (pin.file.trim().length === 0 || pin.title.trim().length === 0) problems.push(`${row.row}: a pin has an empty file or title`);
    const key = `${pin.file}\u0000${pin.title}`;
    if (seen.has(key)) problems.push(`${row.row}: duplicate pin "${pin.title}"`);
    seen.add(key);
  }
  return problems;
}

function checkRowSet(rows: readonly Row[], expectedIds: readonly string[], unpinnedIds: readonly string[]): readonly string[] {
  const problems: string[] = [];
  const ids = rows.map(row => row.row);
  if (ids.length !== expectedIds.length || ids.some((id, index) => id !== expectedIds[index])) {
    problems.push(`row set changed: expected ${expectedIds.join(",")} but found ${ids.join(",")}`);
  }
  const actualUnpinned = rows.filter(row => row.pins.length === 0).map(row => row.row);
  if (actualUnpinned.length !== unpinnedIds.length || actualUnpinned.some((id, index) => id !== unpinnedIds[index])) {
    problems.push(`unpinned set changed: expected ${unpinnedIds.join(",") || "none"} but found ${actualUnpinned.join(",") || "none"}`);
  }
  for (const row of rows) problems.push(...checkRowShape(row));
  return problems;
}

// --- tier truth: forge.toml gate registration + package.json test script ----

type TomlValue = string | readonly string[];

/** Minimal read-only TOML reader: [section] headers, key = "string" and key = ["a", "b"] on one line. */
function readToml(text: string): ReadonlyMap<string, ReadonlyMap<string, TomlValue>> {
  const sections = new Map<string, Map<string, TomlValue>>();
  let current = "";
  for (const raw of text.split("\n")) {
    const line = raw.trim();
    if (line === "" || line.startsWith("#")) continue;
    const header = /^\[([^\]]+)\]$/.exec(line);
    if (header?.[1] !== undefined) {
      current = header[1];
      continue;
    }
    const pair = /^([A-Za-z0-9_.-]+)\s*=\s*(.+)$/.exec(line);
    if (pair?.[1] === undefined || pair[2] === undefined) continue;
    const value = pair[2].trim();
    const entries = sections.get(current) ?? new Map<string, TomlValue>();
    if (value.startsWith("[")) entries.set(pair[1], [...value.matchAll(/"([^"]*)"/g)].map(match => match[1] ?? ""));
    else if (value.startsWith('"')) entries.set(pair[1], value.slice(1, value.indexOf('"', 1)));
    sections.set(current, entries);
  }
  return sections;
}

function checkGateRegistration(forgeToml: string, packageJson: string): readonly string[] {
  const problems: string[] = [];
  const toml = readToml(forgeToml);
  const gateList = toml.get("build")?.get("gate");
  if (!Array.isArray(gateList) || !gateList.includes("test")) problems.push("forge.toml [build] gate does not contain the test step, so the default-gate label is false");
  const testCommand = toml.get("build.commands")?.get("test");
  if (testCommand !== "npm run test") problems.push(`forge.toml [build.commands] test is ${JSON.stringify(testCommand ?? null)}, expected "npm run test"`);
  let script: unknown;
  try {
    const parsed: unknown = JSON.parse(packageJson);
    const scripts = typeof parsed === "object" && parsed !== null ? (parsed as { scripts?: unknown }).scripts : undefined;
    script = typeof scripts === "object" && scripts !== null ? (scripts as { test?: unknown }).test : undefined;
  } catch {
    script = undefined;
  }
  if (script !== "vitest run") problems.push(`package.json scripts.test is ${JSON.stringify(script ?? null)}, expected exactly "vitest run" (no exclude, filter or config override)`);
  return problems;
}

// --- docs exactness ----------------------------------------------------------

/** The rendered view: fenced code and HTML comments dropped, so extraction and the reader see the same text. */
function renderView(docs: string): readonly string[] {
  const out: string[] = [];
  let fence: string | undefined;
  let inComment = false;
  for (const raw of docs.replace(/\r\n?/g, "\n").split("\n")) {
    let line = raw;
    if (inComment) {
      const end = line.indexOf("-->");
      if (end < 0) continue;
      inComment = false;
      line = line.slice(end + 3);
    }
    const fenceMark = /^ {0,3}(`{3,}|~{3,})/.exec(line)?.[1];
    if (fence !== undefined) {
      if (fenceMark !== undefined && fenceMark[0] === fence[0] && fenceMark.length >= fence.length) fence = undefined;
      continue;
    }
    if (fenceMark !== undefined) {
      fence = fenceMark;
      continue;
    }
    line = line.replace(/<!--.*?-->/g, "");
    const open = line.indexOf("<!--");
    if (open >= 0) {
      line = line.slice(0, open);
      inComment = true;
    }
    out.push(line);
  }
  return out;
}

const LEVEL_1_OR_2 = /^ {0,3}#{1,2}(\s|$)/;

/** Blocks of a rendered section: a bullet, heading or blank line ends a block; continuation lines join, indent is kept. */
function toBlocks(lines: readonly string[]): readonly string[] {
  const blocks: string[] = [];
  let current: string | undefined;
  for (const raw of lines) {
    const line = raw.replace(/\s+$/, "");
    if (line.trim() === "") {
      if (current !== undefined) blocks.push(current);
      current = undefined;
      continue;
    }
    const startsBlock = /^\s*([-*+]|\d+[.)])\s/.test(line) || /^ {0,3}#{3,6}(\s|$)/.test(line);
    if (current !== undefined && startsBlock) {
      blocks.push(current);
      current = undefined;
    }
    const text = line.trim().replace(/\s+/g, " ");
    if (current === undefined) current = `${" ".repeat(line.length - line.trimStart().length)}${text}`;
    else current = `${current} ${text}`;
  }
  if (current !== undefined) blocks.push(current);
  return blocks;
}

interface DocsSpec {
  readonly authorization: readonly string[];
  readonly auditability: readonly string[];
}

function checkDocs(docs: string, spec: DocsSpec): readonly string[] {
  const lines = renderView(docs);
  const problems: string[] = [];
  const check = (heading: string, expected: readonly string[]): void => {
    const marker = `## ${heading}`;
    const starts = lines.flatMap((line, index) => (line.trimEnd() === marker ? [index] : []));
    if (starts.length !== 1) {
      problems.push(`heading "${marker}" appears ${starts.length} times in the rendered docs, expected exactly one`);
      return;
    }
    const from = (starts[0] ?? 0) + 1;
    let to = lines.length;
    for (let index = from; index < lines.length; index += 1) {
      if (LEVEL_1_OR_2.test(lines[index] ?? "")) {
        to = index;
        break;
      }
    }
    const actual = toBlocks(lines.slice(from, to));
    if (actual.length !== expected.length) problems.push(`section "${heading}": rendered ${actual.length} blocks, expected ${expected.length}`);
    for (let index = 0; index < Math.max(actual.length, expected.length); index += 1) {
      if (actual[index] !== expected[index]) problems.push(`section "${heading}" block ${index + 1}: rendered ${JSON.stringify(actual[index] ?? null)}, expected ${JSON.stringify(expected[index] ?? null)}`);
    }
  };
  check(AUTHORIZATION, spec.authorization.map(quote => `- ${quote}`));
  check(AUDITABILITY, [spec.auditability.join(" ")]);
  return problems;
}

function specFromRows(rows: readonly Row[]): DocsSpec {
  const authorization: string[] = [];
  for (const row of rows.filter(item => item.section === AUTHORIZATION)) {
    if (authorization[authorization.length - 1] !== row.quote) authorization.push(row.quote);
  }
  return { authorization, auditability: rows.filter(row => row.section === AUDITABILITY).map(row => row.quote) };
}

// ---------------------------------------------------------------------------
// Fixtures for the falsifiers
// ---------------------------------------------------------------------------

const HEADER = 'import { describe, expect, it } from "vitest";\n';
const PINNED = 'it("pinned case", () => { expect(1).toBe(1); });';

interface Fixture {
  readonly id: string;
  readonly note: string;
  readonly source: string;
  readonly tier?: Tier;
  readonly count?: number;
  readonly title?: string;
  /** Substring that must appear in a problem; null means the pin must be clean. */
  readonly red: string | null;
}

const fx = (id: string, note: string, source: string, red: string | null, extra: Partial<Fixture> = {}): Fixture => ({ id, note, source: HEADER + source, red, ...extra });

/** Built from parts so this file never contains the literal focus-modifier call a text grep would flag. */
const FOCUS_CALL = `${["it", "on" + "ly"].join(".")}(`;
const TABLE = 'const table = ["a", "b", "c"];\n';
const EACH_TITLE = "pinned %j case";

const FIXTURES: readonly Fixture[] = [
  fx("s01-line-comment", "case commented out with a line comment", `// ${PINNED}\nit("another case", () => { expect(2).toBe(2); });`, "not collected"),
  fx("s02-block-comment", "case commented out with a block comment", `/* ${PINNED} */\nit("another case", () => { expect(2).toBe(2); });`, "not collected"),
  fx("s03-options-skip", "options object skip", 'it("pinned case", { skip: true }, () => { expect(1).toBe(1); });', "is skipped"),
  fx("s04-options-todo", "options object todo", 'it("pinned case", { todo: true }, () => { expect(1).toBe(1); });', "is todo"),
  fx("s05-describe-options-skip", "describe options skip", `describe("g", { skip: true }, () => { ${PINNED} });`, "is skipped"),
  fx("s06-describe-concurrent-skip", "describe.concurrent.skip", `describe.concurrent.skip("g", () => { ${PINNED} });`, "is skipped"),
  fx("s07-describe-sequential-skip", "describe.sequential.skip", `describe.sequential.skip("g", () => { ${PINNED} });`, "is skipped"),
  fx(
    "s08-suite-skip",
    "suite.skip alias of describe",
    `import { suite } from "vitest";\nsuite.skip("g", () => { ${PINNED} });`,
    "is skipped",
  ),
  fx("s09-runif-false", "it.runIf(false)", 'it.runIf(false)("pinned case", () => { expect(1).toBe(1); });', "is skipped"),
  fx("s10-ctx-skip", "ctx.skip() as the first statement", 'it("pinned case", ctx => { ctx.skip(); expect(1).toBe(1); });', "is skipped"),
  fx("s11-conditional-registration", "registration behind an environment guard", `if (process.env.CENSUS_FIXTURE_NEVER_SET === "1") { ${PINNED} }\nit("another case", () => { expect(2).toBe(2); });`, "not collected"),
  fx(
    "s12-early-return",
    "environment-guarded early return before any assertion",
    'it("pinned case", () => { if (process.env.CENSUS_FIXTURE_NEVER_SET !== "1") return; expect(1).toBe(1); });',
    "no assertion reached",
  ),
  fx(
    "s12b-early-return-false-assertion",
    "guard then a planted FALSE assertion that is never reached",
    'it("pinned case", () => { if (process.env.CENSUS_FIXTURE_NEVER_SET !== "1") return; expect(1).toBe(2); });',
    "no assertion reached",
  ),
  fx("s13-string-decoy", "case deleted, its title kept in a string literal inside another case", 'it("another case", () => { const title = "pinned case"; expect(title).toBe("pinned case"); });', "not collected"),
  fx(
    "s14-import-alias",
    "const it = vitestIt.skip alias",
    'import { it as vitestIt } from "vitest";\nconst it = vitestIt.skip;\nit("pinned case", () => { expect(1).toBe(1); });',
    "is skipped",
  ),
  fx("s15-describe-skip-each", "describe.skip.each wrapper", `describe.skip.each([0])("g %j", () => { ${PINNED} });`, "is skipped"),
  fx(
    "s16-member-call-decoy",
    "a member call named it() on a non-vitest object",
    'const registry = { it: (_title: string, _run: () => void): void => undefined };\nregistry.it("pinned case", () => { expect(1).toBe(1); });\nit("another case", () => { expect(2).toBe(2); });',
    "not collected",
  ),
  fx("c01-it-skip", "control: it.skip", 'it.skip("pinned case", () => { expect(1).toBe(1); });', "is skipped"),
  fx("c02-it-todo", "control: it.todo", 'it.todo("pinned case");', "is todo"),
  fx("c03-it-fails", "control: it.fails under tier default-gate", 'it.fails("pinned case", () => { expect(1).toBe(2); });', "it.fails but the row does not name a known widening"),
  fx("c04-skipif-true", "control: it.skipIf(true)", 'it.skipIf(true)("pinned case", () => { expect(1).toBe(1); });', "is skipped"),
  fx("c05-concurrent-skip", "control: it.concurrent.skip", 'it.concurrent.skip("pinned case", () => { expect(1).toBe(1); });', "is skipped"),
  fx(
    "c06-sibling-describe-skipped",
    "attribution: a skipped describe that does not contain the pin leaves the pin clean",
    `describe.skip("skipped group", () => { it("sibling case", () => { expect(1).toBe(1); }); });\ndescribe("live group", () => { ${PINNED} });`,
    null,
  ),
  fx(
    "c07-sibling-describe-runif-false",
    "attribution: describe.runIf(false) elsewhere in the file leaves the pin clean",
    `describe.runIf(false)("never group", () => { it("sibling case", () => { expect(1).toBe(1); }); });\ndescribe("live group", () => { ${PINNED} });`,
    null,
  ),
  fx("c08-computed-member-skip", "control: computed member it['skip']", 'it["skip"]("pinned case", () => { expect(1).toBe(1); });', "is skipped"),
  fx("f01-focus-in-comment", "false-red control: a comment that names the focus modifier call", `// ${FOCUS_CALL} is never used here\n${PINNED}`, null),
  fx("f02-skip-in-comment", "false-red control: a comment mentioning describe.skip(", `// describe.skip( is never used here\n${PINNED}`, null),
  fx("f03-template-literal-title", "false-red control: the title re-delimited as a template literal", "it(`pinned case`, () => { expect(1).toBe(1); });", null),
  fx("x01-sole-pin-options-skip", "row-emptying options skip on the only pin of a row", 'it("pinned case", { skip: true }, () => { expect(1).toBe(1); });', "is skipped"),
  fx(
    "x02-enclosing-describe-options-skip",
    "enclosing describe skipped through options, four cases",
    `describe("g", { skip: true }, () => {\n  it("one", () => { expect(1).toBe(1); });\n  it("two", () => { expect(1).toBe(1); });\n  ${PINNED}\n  it("four", () => { expect(1).toBe(1); });\n});`,
    "is skipped",
  ),
  fx("x03-runif-false", "it.runIf(false) on a sole pin", 'it.runIf(false)("pinned case", () => { expect(1).toBe(1); });', "is skipped"),
  fx("e00-each-full", "control: a full it.each table of three", `${TABLE}it.each(table)("${EACH_TITLE}", value => { expect(value).toBeTruthy(); });`, null, { title: EACH_TITLE, count: 3 }),
  fx("e01-each-empty-literal", "it.each([]) collects zero cases", `it.each([] as string[])("${EACH_TITLE}", value => { expect(value).toBeTruthy(); });`, "not collected", { title: EACH_TITLE, count: 3 }),
  fx("e02-each-slice", "table sliced to one case inside the call", `${TABLE}it.each(table.slice(0, 1))("${EACH_TITLE}", value => { expect(value).toBeTruthy(); });`, "collected 1 of 3 expected", { title: EACH_TITLE, count: 3 }),
  fx("e03-each-hollowed", "table hollowed at definition to one entry", `${TABLE}table.length = 1;\nit.each(table)("${EACH_TITLE}", value => { expect(value).toBeTruthy(); });`, "collected 1 of 3 expected", { title: EACH_TITLE, count: 3 }),
  fx("e04-each-zeroed", "table zeroed at definition", `${TABLE}table.length = 0;\nit.each(table)("${EACH_TITLE}", value => { expect(value).toBeTruthy(); });`, "not collected", { title: EACH_TITLE, count: 3 }),
  fx("w01-widening-plain", "tier knownWidening on a plain case", PINNED, "tier knownWidening requires an it.fails case", { tier: "knownWidening" }),
  fx("w02-widening-fails", "tier knownWidening on an it.fails case is clean", 'it.fails("pinned case", () => { expect(1).toBe(2); });', null, { tier: "knownWidening" }),
  fx("p01-plain", "control: a plain pinned case", PINNED, null),
  fx("p02-failing", "a pinned case that fails is red for the right cause", 'it("pinned case", () => { expect(1).toBe(2); });', "case fails"),
];

interface ConfigFixture {
  readonly id: string;
  readonly note: string;
  readonly config: string;
  readonly red: boolean;
}

const CONFIG_FIXTURES: readonly ConfigFixture[] = [
  { id: "t00-default-config", note: "control: the pinned file is collected", config: 'export default { test: { include: ["test/**/*.test.ts"] } };\n', red: false },
  { id: "t01-exclude-file", note: "exclude names the pinned file", config: 'export default { test: { include: ["test/**/*.test.ts"], exclude: ["test/pinned.test.ts"] } };\n', red: true },
  { id: "t02-exclude-glob", note: "exclude glob covers the pinned file", config: 'export default { test: { include: ["test/**/*.test.ts"], exclude: ["test/p*.test.ts"] } };\n', red: true },
  { id: "t03-include-narrowed", note: "include narrowed away from the pinned file", config: 'export default { test: { include: ["test/other/**/*.test.ts"] } };\n', red: true },
];

const GOOD_FORGE = `[build]\ngate = ["lint", "typing", "build", "test", "package-smoke"]\n\n[build.commands]\nlint = "npm run lint"\ntest = "npm run test"\n`;
const GOOD_PACKAGE = JSON.stringify({ scripts: { test: "vitest run" } });

const DOCS_BASELINE = [
  "# Title",
  "",
  "intro",
  "",
  "## Authorization design",
  "",
  "- Alpha rule one.",
  "- Beta rule two,",
  "  wrapped here.",
  "- Gamma rule three.",
  "",
  "## Other",
  "",
  "stuff",
  "",
  "## Auditability",
  "",
  "Record one. Keep two. Logs three.",
  "",
  "## Tail",
  "",
  "end",
  "",
].join("\n");

const DOCS_SPEC: DocsSpec = { authorization: ["Alpha rule one.", "Beta rule two, wrapped here.", "Gamma rule three."], auditability: ["Record one.", "Keep two.", "Logs three."] };

const replaceOnce = (text: string, from: string, to: string): string => {
  if (!text.includes(from)) throw new Error(`fixture anchor missing: ${from}`);
  return text.replace(from, to);
};

interface DocsMutant {
  readonly id: string;
  readonly docs: string;
  readonly red: string | null;
}

const DOCS_MUTANTS: readonly DocsMutant[] = [
  { id: "dc0-baseline", docs: DOCS_BASELINE, red: null },
  { id: "dc0b-rewrapped-bullet", docs: replaceOnce(DOCS_BASELINE, "- Beta rule two,\n  wrapped here.", "- Beta rule\n  two, wrapped here."), red: null },
  { id: "dc1-bullet-reworded", docs: replaceOnce(DOCS_BASELINE, "Gamma rule three.", "Gamma rule allowed."), red: "block 3" },
  { id: "dc2-bullet-added", docs: replaceOnce(DOCS_BASELINE, "- Gamma rule three.\n", "- Gamma rule three.\n- Delta rule four.\n"), red: "rendered 4 blocks, expected 3" },
  { id: "d01-weakening-paragraph", docs: replaceOnce(DOCS_BASELINE, "- Gamma rule three.\n", "- Gamma rule three.\n\nThese rules are advisory: a script may bypass any of them.\n"), red: "rendered 4 blocks" },
  { id: "d02-weakening-subsection", docs: replaceOnce(DOCS_BASELINE, "- Gamma rule three.\n", "- Gamma rule three.\n\n### Exceptions\n\nAnything goes.\n"), red: "rendered 5 blocks" },
  { id: "d03-bullet-commented-out", docs: replaceOnce(DOCS_BASELINE, "- Gamma rule three.", "<!-- - Gamma rule three. -->"), red: "rendered 2 blocks, expected 3" },
  { id: "d04-duplicate-heading", docs: `${DOCS_BASELINE}\n## Authorization design\n\n- Weakened rule.\n`, red: 'heading "## Authorization design" appears 2 times' },
  {
    id: "d05-hidden-comment-copy",
    docs: `<!--\n## Authorization design\n\n- Alpha rule one.\n- Beta rule two, wrapped here.\n- Gamma rule three.\n\n## Other\n-->\n${replaceOnce(DOCS_BASELINE, "Gamma rule three.", "Gamma rule allowed.")}`,
    red: "block 3",
  },
  {
    id: "d06-fenced-copy",
    docs: `\`\`\`\n## Authorization design\n\n- Alpha rule one.\n- Beta rule two, wrapped here.\n- Gamma rule three.\n\n## Other\n\`\`\`\n${replaceOnce(DOCS_BASELINE, "Gamma rule three.", "Gamma rule allowed.")}`,
    red: "block 3",
  },
  { id: "d07-level-1-heading-inside", docs: replaceOnce(DOCS_BASELINE, "- Gamma rule three.", "# Detour\n\n- Gamma rule three."), red: "rendered 2 blocks, expected 3" },
  { id: "d08-lazy-continuation", docs: replaceOnce(DOCS_BASELINE, "- Gamma rule three.", "- Gamma rule three.\nunless the script supplies its own list."), red: "block 3" },
  { id: "d09-nested-sub-bullet", docs: replaceOnce(DOCS_BASELINE, "- Gamma rule three.", "- Gamma rule three.\n  - except when told otherwise."), red: "rendered 4 blocks" },
  { id: "d10-unpunctuated-tail", docs: replaceOnce(DOCS_BASELINE, "Logs three.", "Logs three. unless the log says otherwise"), red: 'section "Auditability" block 1' },
  { id: "d11-heading-removed", docs: replaceOnce(DOCS_BASELINE, "## Auditability", "### Auditability"), red: 'heading "## Auditability" appears 0 times' },
];

// ---------------------------------------------------------------------------
// Nested runs (once per file)
// ---------------------------------------------------------------------------

let scratch = "";
let pinRun: RunOutcome = { files: [], cases: [], log: "" };
let fixtureRun: RunOutcome = { files: [], cases: [], log: "" };
const configRuns = new Map<string, RunOutcome>();

function linkModules(dir: string): void {
  symlinkSync(join(ROOT, "node_modules"), join(dir, "node_modules"), "dir");
}

beforeAll(() => {
  scratch = mkdtempSync(join(tmpdir(), "census-docs12-"));
  const pinFiles = [...new Set(ROWS.flatMap(row => row.pins.map(pin => pin.file)))];
  pinRun = runVitest(ROOT, pinFiles, scratch, "pins");

  const fixtureRoot = join(scratch, "fixtures");
  mkdirSync(fixtureRoot);
  linkModules(fixtureRoot);
  for (const fixture of FIXTURES) writeFileSync(join(fixtureRoot, `${fixture.id}.test.ts`), fixture.source);
  fixtureRun = runVitest(fixtureRoot, [], scratch, "fixtures");

  for (const fixture of CONFIG_FIXTURES) {
    const dir = join(scratch, fixture.id);
    mkdirSync(join(dir, "test"), { recursive: true });
    linkModules(dir);
    writeFileSync(join(dir, "vitest.config.mts"), fixture.config);
    writeFileSync(join(dir, "test", "pinned.test.ts"), HEADER + PINNED);
    configRuns.set(fixture.id, runVitest(dir, ["test/pinned.test.ts"], scratch, fixture.id));
  }
}, 180_000);

afterAll(() => {
  if (scratch !== "") rmSync(scratch, { recursive: true, force: true });
});

const syntheticRow = (pin: Pin): Row => ({ row: "FX", section: AUTHORIZATION, quote: "fixture", pins: [pin] });

// ---------------------------------------------------------------------------
// The census
// ---------------------------------------------------------------------------

describe("docs/12 Authorization design and Auditability census", () => {
  it("renders the two pinned sections exactly as the quoted rows: unique headings, one rendered view, nothing added, dropped, nested or appended", () => {
    const docs = readFileSync(join(ROOT, DOCS_12), "utf8");
    expect(checkDocs(docs, specFromRows(ROWS))).toStrictEqual([]);
    expect(specFromRows(ROWS).authorization).toHaveLength(8);
    expect(specFromRows(ROWS).auditability).toHaveLength(3);
  });

  it("holds exactly the twelve frozen rows and the two unpinned rows, each unpinned row with its reason", () => {
    expect(checkRowSet(ROWS, EXPECTED_ROW_IDS, UNPINNED_ROW_IDS)).toStrictEqual([]);
  });

  it("collects, runs and reaches an assertion in every pinned case, with the true cause named otherwise", () => {
    expect(pinRun.cases.length).toBeGreaterThan(0);
    const problems = ROWS.flatMap(row => row.pins.flatMap(pin => classifyPin(row, pin, existsSync(join(ROOT, pin.file)), pinRun)));
    expect(problems).toStrictEqual([]);
  });

  it("registers the test step in the forge default gate and runs the whole suite through package.json", () => {
    expect(checkGateRegistration(readFileSync(join(ROOT, "forge.toml"), "utf8"), readFileSync(join(ROOT, "package.json"), "utf8"))).toStrictEqual([]);
  });

  it("imports only the Node file, path, url, process and os helpers and vitest, and no host, provider or dynamic module", () => {
    const self = readFileSync(fileURLToPath(import.meta.url), "utf8");
    const imports = [...self.matchAll(/^import .* from "([^"]+)";$/gm)].map(match => match[1]);
    expect(imports).toStrictEqual(["node:child_process", "node:fs", "node:os", "node:path", "node:url", "vitest"]);
    expect(self.match(/\bimport\(/g) ?? []).toHaveLength(0);
  });
});

describe("census falsifiers: independently authored fixtures through the same runner", () => {
  it.each(FIXTURES.map(fixture => [fixture.id, fixture] as const))("%s", (_id, fixture) => {
    const pin: Pin = { file: `${fixture.id}.test.ts`, title: fixture.title ?? "pinned case", tier: fixture.tier ?? "default-gate", ...(fixture.count === undefined ? {} : { count: fixture.count }) };
    const problems = classifyPin(syntheticRow(pin), pin, true, fixtureRun);
    if (fixture.red === null) expect(problems, fixture.note).toStrictEqual([]);
    else expect(problems.some(problem => problem.includes(fixture.red as string)), `${fixture.note}: ${JSON.stringify(problems)}`).toBe(true);
    for (const problem of problems) expect(problem).not.toContain("renamed or deleted");
  });

  it("loaded every fixture file, so a fixture that registers no case is judged on its own and the nested run was not empty", () => {
    for (const fixture of FIXTURES) expect(fixtureRun.files, fixture.id).toContain(`${fixture.id}.test.ts`);
    expect(fixtureRun.cases.length).toBeGreaterThan(30);
  });

  it("a missing file is red", () => {
    const pin = gate("nowhere.test.ts", "pinned case");
    expect(classifyPin(syntheticRow(pin), pin, false, { files: [], cases: [] })).toStrictEqual([expect.stringContaining("file is missing")]);
  });
});

describe("tier truth falsifiers", () => {
  it.each(CONFIG_FIXTURES.map(fixture => [fixture.id, fixture] as const))("%s", (_id, fixture) => {
    const run = configRuns.get(fixture.id);
    expect(run).toBeDefined();
    const pin = gate("test/pinned.test.ts", "pinned case");
    const problems = classifyPin(syntheticRow(pin), pin, true, run ?? { files: [], cases: [] });
    if (fixture.red) expect(problems.some(problem => problem.includes("the default-gate label is false")), `${fixture.note}: ${JSON.stringify(problems)}`).toBe(true);
    else expect(problems, fixture.note).toStrictEqual([]);
  });

  it("t04 a forge.toml gate list without the test step is red", () => {
    const mutated = replaceOnce(GOOD_FORGE, '"build", "test", ', '"build", ');
    expect(checkGateRegistration(GOOD_FORGE, GOOD_PACKAGE)).toStrictEqual([]);
    expect(checkGateRegistration(mutated, GOOD_PACKAGE).some(problem => problem.includes("does not contain the test step"))).toBe(true);
  });

  it("t05 a forge.toml test command other than npm run test is red", () => {
    const mutated = replaceOnce(GOOD_FORGE, 'test = "npm run test"', 'test = "npm run test:fast"');
    expect(checkGateRegistration(mutated, GOOD_PACKAGE).some(problem => problem.includes("[build.commands] test is"))).toBe(true);
  });

  it("t06 a package.json test script narrowed with an exclude, a filter or a config override is red", () => {
    for (const script of ["vitest run --exclude test/x.test.ts", "vitest run test/only-this.test.ts", "vitest run --config other.ts", "vitest"]) {
      const problems = checkGateRegistration(GOOD_FORGE, JSON.stringify({ scripts: { test: script } }));
      expect(problems.some(problem => problem.includes("package.json scripts.test")), script).toBe(true);
    }
    expect(checkGateRegistration(GOOD_FORGE, "not json").some(problem => problem.includes("package.json scripts.test"))).toBe(true);
  });
});

describe("docs exactness falsifiers over a synthetic docs fixture", () => {
  it.each(DOCS_MUTANTS.map(mutant => [mutant.id, mutant] as const))("%s", (_id, mutant) => {
    const problems = checkDocs(mutant.docs, DOCS_SPEC);
    if (mutant.red === null) expect(problems).toStrictEqual([]);
    else expect(problems.some(problem => problem.includes(mutant.red as string)), JSON.stringify(problems)).toBe(true);
  });
});

describe("row-table falsifiers", () => {
  const rowOf = (rowId: string): Row => {
    const row = ROWS.find(item => item.row === rowId);
    if (row === undefined) throw new Error(`no row ${rowId}`);
    return row;
  };

  it("m2 a removed or reordered row fails the row-set pin", () => {
    const missing = ROWS.filter(row => row.row !== "A3");
    expect(checkRowSet(missing, EXPECTED_ROW_IDS, UNPINNED_ROW_IDS).some(problem => problem.startsWith("row set changed"))).toBe(true);
    const swapped = [ROWS[1], ROWS[0], ...ROWS.slice(2)].filter((row): row is Row => row !== undefined);
    expect(checkRowSet(swapped, EXPECTED_ROW_IDS, UNPINNED_ROW_IDS).some(problem => problem.startsWith("row set changed"))).toBe(true);
  });

  it("m3 an unpinned row promoted without a title, stripped of its reason, or a pinned row emptied, fails", () => {
    const promoted: Row = { ...rowOf("D2"), unpinned: undefined, pins: [{ file: CONTROL, title: "", tier: "default-gate" }] };
    const rows = ROWS.map(row => (row.row === "D2" ? promoted : row));
    const problems = checkRowSet(rows, EXPECTED_ROW_IDS, UNPINNED_ROW_IDS);
    expect(problems.some(problem => problem.startsWith("D2") && problem.includes("empty file or title"))).toBe(true);
    expect(problems.some(problem => problem.startsWith("unpinned set changed"))).toBe(true);
    const noReason: Row = { ...rowOf("A4b"), unpinned: "  " };
    expect(checkRowSet(ROWS.map(row => (row.row === "A4b" ? noReason : row)), EXPECTED_ROW_IDS, UNPINNED_ROW_IDS)).toContain("A4b: unpinned without a reason");
    const emptied: Row = { ...rowOf("D3"), pins: [], unpinned: "no longer pinned" };
    expect(checkRowSet(ROWS.map(row => (row.row === "D3" ? emptied : row)), EXPECTED_ROW_IDS, UNPINNED_ROW_IDS).some(problem => problem.startsWith("unpinned set changed"))).toBe(true);
  });

  it("m4 a split row keeps the two halves of A4 and the oracle of the uncovered half", () => {
    expect(rowOf("A4a").quote).toBe(rowOf("A4b").quote);
    expect(rowOf("A4a").pins.length).toBeGreaterThan(0);
    expect(rowOf("A4b").pins).toStrictEqual([]);
    expect(rowOf("A4b").unpinned).toContain("wb-ksz.5");
  });
});
