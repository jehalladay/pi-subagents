/**
 * wb-693.6 (RF-TSX-AND-EMBEDDING-R8): hermetic default-gate census of the TSX-era RF live tier.
 *
 * Spec rows pinned here (triage-2026-10-17 requirements/rf-tsx-and-embedding-requirements.md, R8):
 *   "With both env vars unset, running the new tier config fails with a typed reason string naming
 *    the missing variable (hermetically testable today; no `skip` and no green pass)."
 *   "`vitest.rf-tsx.config.ts` includes exactly the new test file, on the `vitest.rf.config.ts:2`
 *    pattern; `forge.toml` gains `[build.commands.rf-preview-tsx]` on the `:28-30` pattern;
 *    `[build.gate]`/default-gate membership is unchanged."
 *   "The new file encodes R9's success-row and runtime-absent-row assertions verbatim, so
 *    provisioning is the only missing input."
 * The tier file is excluded from this gate, so these rows drive it through forge.toml's declared
 * command in a child vitest. Stub `rf` executables on scratch PATHs stand in for a provisioned
 * producer only to show that R9's rows are satisfiable and that each assertion bites; nothing here
 * is a live receipt or a TSX render (that receipt is R9, wb-693.7).
 *
 * wb-70xe (RF-NATIVE-TSX-COMPONENTS-R2): a provisioned-shape run also puts a stand-in engine first on the success row's PATH
 * (a text file with no #! line) and has the stand-in rf report its sha256 as the host's pin, so the success row's Deno
 * identity reading (test/helpers/rf-tsx-deno.ts) holds; the DENO_IDENTITY_SUITE cases show that it bites. Before rf is
 * launched they refuse an unresolved engine and each of the three shim forms, over these pinned members: a symlink to a
 * binary of another name (named mise, deno-shim, Deno and mise-deno), a file under a shims directory (shims as its parent
 * and as an ancestor two levels up) and a #!/bin/sh script. Once the render reports the pin they refuse an unpinned engine
 * and a mismatched one, over the pin f*64 and pins that differ from the measured digest only in its first, its 33rd or its
 * last hex (a greater and a lesser pin). Each
 * refused row's first failure opens with its literal typed code. A passing row prints the resolved path, realpath and
 * sha256 on its RF-TSX-ENGINE line while its RF-TSX-RECEIPT line keeps the four R9 fields. The engine line is held field by
 * field over a regular file (its resolved path is its realpath), the operator's versioned layout (a bin/deno symlink through
 * a current link to tools/deno/2.9.7/bin/deno, so the two paths differ), four paths that are not printable ASCII (a Latin-1
 * letter, a TAB, the last C0 control US and DEL: both paths named <unrecognized>) and one printable path holding a space and
 * a tilde (both paths verbatim). That the identity reading never executes the engine is observed by the identity unit
 * cases' execution markers (test/workbench-rf-tsx-deno-provisioning.test.ts), not by these cases; those unit cases also pin
 * the echo rule's whole class range and its length bound, which these cases pin at the five paths above. NOT CLAIMED by
 * these cases: a version reading of the PATH deno (the binary is held to the lock's sha256 and never asked its version; the
 * render's distribution_version stays an R9 receipt field), a live receipt of record carrying the RF-TSX-ENGINE line (no
 * live run is part of this cut), and any manager name, shims position, script form or digest position other than the
 * pinned members (among them, deferred to wb-j4sm, the rule-19 structural exit child of this bead, ruling R-B292: a #!
 * script whose third byte is not /, a shims directory more than two levels above the file, and a manager name that
 * differs from deno only by an extension such as deno.exe or by surrounding whitespace).
 */
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { chmodSync, existsSync, mkdirSync, readFileSync, realpathSync, symlinkSync, writeFileSync } from "node:fs";
import { delimiter, join, relative } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { REACTIVE_FIBER_CLI_SCHEMA } from "../src/workbench/providers/reactivefiber.js";
import defaultConfig from "../vitest.config.js";
import { DENO_ENGINE, DENO_IDENTITY_SUITE, resolveOnPath } from "./helpers/rf-tsx-deno.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard();

const ROOT = process.cwd();
const TIER = "test/workbench-native-rf-tsx-preview.test.ts";
const FIXTURE = "WORKBENCH_RF_TSX_FIXTURE";
const NO_DENO_PATH = "WORKBENCH_RF_TSX_NO_DENO_PATH";
const REASON = "rf_tsx_missing_configuration";
/** Obviously not a producer value, so no stub output can pass for a live receipt. */
const STUB_VERSION = "0.0.0-hermetic-stub";
/** Per-row budget: one child vitest run under a loaded fleet, never the 5 s default. */
const RUN_BUDGET_MS = 120_000;
const CHILD_TIMEOUT_MS = 100_000;
const NODE = process.execPath;
/** Environment variables std-env reads to decide that an agent drives the run (vitest then auto-selects its agent reporter). */
const AGENT_MARKERS = ["AI_AGENT", "CLAUDECODE", "CLAUDE_CODE"] as const;
const ID_TAIL = "0".repeat(26);
/** wb-70xe: the stand-in engine's bytes (no #! line) and their sha256, the pin a provisioned stand-in rf reports. */
const STAND_IN_ENGINE = "hermetic stand-in engine for the rf-preview-tsx wiring cases: a text file with no #! line\n";
const STAND_IN_DIGEST = createHash("sha256").update(STAND_IN_ENGINE, "utf8").digest("hex");
/** wb-70xe: the stand-in's digest with the hex at `index` moved by `step` (wrapping within 0-f): a pin one position off it. */
function digestOneOff(index: number, step: number): string {
  const moved = (Number.parseInt(STAND_IN_DIGEST.charAt(index), 16) + 16 + step) % 16;
  return `${STAND_IN_DIGEST.slice(0, index)}${moved.toString(16)}${STAND_IN_DIGEST.slice(index + 1)}`;
}
const SUCCESS_RECEIPT = 'RF-TSX-RECEIPT {"row":"success"';
/** wb-70xe: the mark of the success row's engine identity line. */
const ENGINE_MARK = "RF-TSX-ENGINE {";

/** R9's clauses as the tier labels its assertions; a failing clause names itself in the report. */
const CLAUSE = {
  ephemeral: "R9 success: source.result.ephemeral === true",
  renderId: "R9 success: render_id === null",
  storage: "R9 success: work.storage_write_count === 0",
  spawns: "R9 success: engine_metrics.tsx_worker_spawns >= 1",
  distribution: "R9 success: tsx_runtime.distribution_version is a non-empty string",
  fingerprint: "R9 success: tsx_runtime.contract_fingerprint matches /^sha256:[0-9a-f]{64}$|^unknown$/",
  cliVersion: "R9 success: provenance.cli_version is captured into the receipt",
  category: "R9 runtime-absent: the capability rejects with category 'unavailable'",
  absentCode: "R9 runtime-absent: the message contains RF_COMPONENT_RUNTIME_ABSENT",
} as const;

interface RowResult {
  readonly title: string;
  readonly status: string;
  readonly failureMessages: readonly string[];
}

interface FileResult {
  readonly name: string;
  readonly assertionResults: readonly RowResult[];
}

interface TierReport {
  readonly numTotalTests: number;
  readonly numPassedTests: number;
  readonly numFailedTests: number;
  readonly numPendingTests: number;
  readonly numTodoTests: number;
  readonly testResults: readonly FileResult[];
}

interface TierRun {
  readonly status: number | null;
  readonly stdout: string;
  readonly report: TierReport;
  readonly success: RowResult;
  readonly absent: RowResult;
}

const allocated: string[] = [];
afterEach(() => removeScratch(...allocated.splice(0)));

function scratch(prefix: string): string {
  const dir = makeScratch(prefix);
  allocated.push(dir);
  return dir;
}

function readRepo(path: string): string {
  return readFileSync(join(ROOT, path), "utf8");
}

/** forge.toml's declared [build.commands.rf-preview-tsx] command, as argv. */
function declaredCommand(): string[] {
  const command = /^\[build\.commands\.rf-preview-tsx\]\ncommand = "([^"\n]+)"$/m.exec(readRepo("forge.toml"))?.[1];
  if (command === undefined) throw new Error("forge.toml declares no [build.commands.rf-preview-tsx] command");
  return command.split(" ");
}

/** The parent's environment minus vitest's own worker variables and both tier variables, plus `tier` and `path`. */
function childEnv(tier: Readonly<Record<string, string>>, path: string): NodeJS.ProcessEnv {
  const env: NodeJS.ProcessEnv = {};
  for (const [key, value] of Object.entries(process.env)) {
    if (key.startsWith("VITEST") || key === FIXTURE || key === NO_DENO_PATH) continue;
    env[key] = value;
  }
  return { ...env, ...tier, PATH: path };
}

/** Run the declared tier command once, with a JSON report. No forced console reporter: the record lines must reach stdout through the reporter vitest picks itself. */
function runTier(dir: string, tier: Readonly<Record<string, string>>, path: string): TierRun {
  const out = join(dir, "report.json");
  const [bin = "", ...args] = declaredCommand();
  const child = spawnSync(join(ROOT, bin), [...args, "--reporter=json", `--outputFile.json=${out}`], {
    cwd: ROOT,
    env: childEnv(tier, path),
    encoding: "utf8",
    timeout: CHILD_TIMEOUT_MS,
  });
  if (!existsSync(out)) {
    throw new Error(`the tier run wrote no report (status ${child.status}, ${child.error?.message ?? "no spawn error"}): ${(child.stderr ?? "").slice(-2000)}`);
  }
  const report = JSON.parse(readFileSync(out, "utf8")) as TierReport;
  const rows = report.testResults.flatMap(file => file.assertionResults);
  const row = (prefix: string): RowResult => {
    const hits = rows.filter(candidate => candidate.title.startsWith(prefix));
    const [only] = hits;
    if (hits.length !== 1 || only === undefined) throw new Error(`expected exactly one "${prefix}" row, found ${hits.length}`);
    return only;
  };
  return { status: child.status, stdout: child.stdout ?? "", report, success: row("success row"), absent: row("runtime-absent row") };
}

/** The two canonical launches: an agent session (vitest auto-selects its agent reporter) and a plain shell. */
type Launch = "agent" | "plain";

/** The parent's environment minus vitest's own variables, both tier variables and every agent marker, plus the tier variables and PATH; `agent` adds the markers std-env detects. */
function launchEnv(launch: Launch, tier: Readonly<Record<string, string>>, path: string): NodeJS.ProcessEnv {
  const env = childEnv(tier, path);
  for (const marker of AGENT_MARKERS) delete env[marker];
  return launch === "agent" ? { ...env, AI_AGENT: "hermetic-agent", CLAUDECODE: "1" } : env;
}

/** The declared tier command exactly as forge launches it (no reporter flag), in `launch`'s environment: its exit status and every RF-TSX-RECEIPT line it printed. */
function canonicalLaunch(launch: Launch, tier: Readonly<Record<string, string>>, path: string): { readonly status: number | null; readonly receipts: readonly string[] } {
  const [bin = "", ...args] = declaredCommand();
  const child = spawnSync(join(ROOT, bin), args, { cwd: ROOT, env: launchEnv(launch, tier, path), encoding: "utf8", timeout: CHILD_TIMEOUT_MS });
  const receipts = (child.stdout ?? "")
    .split("\n")
    .filter(line => line.includes("RF-TSX-RECEIPT {"))
    .map(line => line.slice(line.indexOf("RF-TSX-RECEIPT {")));
  return { status: child.status, receipts };
}

/** wb-70xe: every stdout line carrying `mark`, from the mark on (the tier writes each record newline-led and newline-terminated). */
function recordLines(stdout: string, mark: string): string[] {
  return stdout
    .split("\n")
    .filter(line => line.includes(mark))
    .map(line => line.slice(line.indexOf(mark)));
}

function failureOf(row: RowResult): string {
  return row.failureMessages.join("\n");
}

/**
 * A stand-in `rf` answering one context render with `answer` (workspace.root echoed from argv). Never a producer capture.
 * With `launched` (wb-70xe) it also appends one line to that file per launch, so a row refused before rf runs is observable.
 */
function stubRf(dir: string, answer: unknown, exit: number, launched?: string): string {
  mkdirSync(dir, { recursive: true });
  const script = join(dir, "rf");
  writeFileSync(
    script,
    [
      `#!${NODE}`,
      ...(launched === undefined ? [] : [`require("node:fs").appendFileSync(${JSON.stringify(launched)}, "launched\\n");`]),
      "const argv = process.argv.slice(2);",
      `const answer = ${JSON.stringify(answer)};`,
      'if (answer !== null && typeof answer === "object" && answer.workspace) answer.workspace.root = argv[argv.indexOf("--workspace") + 1];',
      'process.stdout.write(typeof answer === "string" ? answer : JSON.stringify(answer));',
      `process.exitCode = ${exit};`,
      "",
    ].join("\n"),
  );
  chmodSync(script, 0o700);
  return dir;
}

/** wb-70xe: the stand-in engine (STAND_IN_ENGINE's bytes, executable, no #! line) as `dir`/deno; returns `dir`. */
function standInEngine(dir: string, bytes: string = STAND_IN_ENGINE): string {
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, DENO_ENGINE), bytes);
  chmodSync(join(dir, DENO_ENGINE), 0o700);
  return dir;
}

/**
 * wb-70xe: a PATH entry holding only what the child vitest's launcher reads from PATH (node, and grep for a node wrapper),
 * no engine. Each is a script that execs the parent's own tool by absolute path, since a version manager's node wrapper finds
 * its install from the path it was invoked by.
 */
function engineFreeTools(dir: string): string {
  mkdirSync(dir, { recursive: true });
  for (const [name, target] of [["node", NODE], ["grep", resolveOnPath("grep", process.env.PATH)]] as const) {
    if (target === undefined) continue;
    if (target.includes("'")) throw new Error(`a tool path holds a quote: ${target}`);
    writeFileSync(join(dir, name), `#!/bin/sh\nexec '${target}' "$@"\n`);
    chmodSync(join(dir, name), 0o700);
  }
  return dir;
}

/** A stand-in `rf` that only records that it was launched: an unconfigured row must never reach the producer. */
function tripwireRf(dir: string, marker: string): string {
  mkdirSync(dir, { recursive: true });
  const script = join(dir, "rf");
  writeFileSync(script, `#!${NODE}\nrequire("node:fs").writeFileSync(${JSON.stringify(marker)}, "launched");\nprocess.exitCode = 1;\n`);
  chmodSync(script, 0o700);
  return dir;
}

interface PreviewKnobs {
  /** null drops the key (a pre-TSX rf); undefined keeps the one-spawn default. */
  readonly engineMetrics?: Readonly<Record<string, number>> | null;
  readonly distributionVersion?: string;
  readonly contractFingerprint?: string;
  /** null drops the key. */
  readonly cliVersion?: string | null;
}

/** A TSX-era noncommitted preview envelope shaped to Pi's own envelope validator (providers/reactivefiber.ts). */
function tsxPreview(knobs: PreviewKnobs = {}): Record<string, unknown> {
  const provenance: Record<string, unknown> = {
    graph_revision_id: `sha256:${"0".repeat(64)}`,
    sdk_versions: {
      tsx_runtime: {
        distribution_version: knobs.distributionVersion ?? STUB_VERSION,
        contract_fingerprint: knobs.contractFingerprint ?? `sha256:${STAND_IN_DIGEST}`,
      },
    },
  };
  if (knobs.cliVersion !== null) provenance.cli_version = knobs.cliVersion ?? STUB_VERSION;
  const result: Record<string, unknown> = {
    ephemeral: true,
    render_id: null,
    commit_seq: null,
    output: { text: "hermetic stub render" },
    provenance,
    budget: { formula_terms: { context_window: 200_000, output_reserve: 4_096, occupied_tokens: 10, overhead: 0, safety_margin: 0, available_context_tokens: 195_894 } },
    diagnostics_summary: { errors: 0, warnings: 0, has_errors: false, has_warnings: false },
    work: { source_capture_count: 1, fiber_signal_count: 1, component_render_count: 1, lens_resolution_count: 0, necessity_eval_count: 0, storage_write_count: 0 },
  };
  if (knobs.engineMetrics !== null) result.engine_metrics = knobs.engineMetrics ?? { tsx_worker_spawns: 1, tsx_resource_rounds: 1 };
  return {
    schema: REACTIVE_FIBER_CLI_SCHEMA,
    ok: true,
    command: "context.render",
    operation_id: `rfo_${ID_TAIL}`,
    workspace: { id: `rfw_${ID_TAIL}`, root: "" },
    transaction_id: null,
    result,
    diagnostics: [],
  };
}

/** The typed failure envelope an rf without a usable component runtime answers with. */
function refusal(code: string): Record<string, unknown> {
  return {
    schema: REACTIVE_FIBER_CLI_SCHEMA,
    ok: false,
    command: "context.render",
    operation_id: `rfo_${ID_TAIL}`,
    workspace: null,
    transaction_id: null,
    result: null,
    diagnostics: [{ code, severity: "error", message: "hermetic stub refusal", hint: null, source: null, metadata: {} }],
  };
}

/**
 * A provisioned-shape run: `preview` answers on the ambient PATH with the stand-in engine first on it (wb-70xe), `absent` on
 * the no-deno PATH (or the variable is left unset). `success` (wb-70xe) replaces the success row's PATH entry: given the run's
 * scratch dir and the stand-in rf's launch log, it plants the entry and returns the PATH the row runs with.
 */
function provisionedRun(
  prefix: string,
  preview: unknown,
  absent: { readonly answer: unknown; readonly exit: number } | "unset",
  success?: (dir: string, launched: string) => string,
): TierRun & { readonly dir: string; readonly launched: string } {
  const dir = scratch(prefix);
  const workspace = join(dir, "workspace");
  mkdirSync(workspace);
  const tier: Record<string, string> = { [FIXTURE]: workspace };
  if (absent !== "unset") tier[NO_DENO_PATH] = stubRf(join(dir, "no-deno"), absent.answer, absent.exit);
  const launched = join(dir, "tsx-rf-launched");
  const path = success === undefined ? `${standInEngine(stubRf(join(dir, "tsx"), preview, 0, launched))}:${process.env.PATH ?? ""}` : success(dir, launched);
  return { ...runTier(dir, tier, path), dir, launched };
}

const NO_SKIP_NO_TODO = { numTotalTests: 2, numPendingTests: 0, numTodoTests: 0 } as const;

describe("rf-preview-tsx tier wiring (wb-693.6, R8)", () => {
  it("vitest.rf-tsx.config.ts includes exactly the TSX tier file, on the vitest.rf.config.ts one-line pattern", () => {
    expect(readRepo("vitest.rf-tsx.config.ts")).toBe(`import {defineConfig} from "vitest/config";\nexport default defineConfig({test:{include:["${TIER}"]}});\n`);
  });

  it("the default gate excludes the TSX tier file on the one exclude line, while its include glob would otherwise collect it", () => {
    const test = (defaultConfig as unknown as { test?: { include?: readonly string[]; exclude?: readonly string[] } }).test;
    expect(test?.include).toEqual(["test/**/*.test.ts"]);
    expect(test?.exclude).toContain(TIER);
    expect(test?.exclude).toContain("test/workbench-native-rf-preview.test.ts");
    expect(test?.exclude).not.toContain("test/workbench-rf-tsx-tier.test.ts");
    const excludeLines = readRepo("vitest.config.ts")
      .split("\n")
      .filter(line => line.includes("exclude:"));
    expect(excludeLines).toHaveLength(1);
    expect(excludeLines[0]).toContain(`"${TIER}"`);
  });

  it("forge.toml declares exactly one rf-preview-tsx command on the rf-preview pattern, outside the [build] gate", () => {
    const toml = readRepo("forge.toml");
    expect(toml.match(/^\[build\.commands\.rf-preview-tsx\]$/gm)).toHaveLength(1);
    expect(toml).toContain('[build.commands.rf-preview-tsx]\ncommand = "./node_modules/.bin/vitest run --config vitest.rf-tsx.config.ts"\ntimeout = 180\n');
    expect(toml).toContain('[build.commands.rf-preview]\ncommand = "./node_modules/.bin/vitest run --config vitest.rf.config.ts"\ntimeout = 180\n');
    expect(toml).toContain('gate = ["lint", "typing", "build", "test", "census", "workbench-shell", "package-smoke"]\n');
    expect(toml.match(/^gate = /gm)).toHaveLength(1);
  });

  it("the tier file spells every R9 clause as an assertion label (three are also refused first by the provider's envelope validator)", () => {
    const tier = readRepo(TIER);
    for (const clause of Object.values(CLAUSE)) expect(tier, clause).toContain(`"${clause}"`);
  });
});

describe("rf-preview-tsx refuses missing configuration (wb-693.6, R8)", () => {
  it(
    "with both variables unset every row fails with the typed reason naming each missing variable: no skip, no pass, no producer launch",
    () => {
      const dir = scratch("rf-tsx-unset-");
      const marker = join(dir, "rf-launched");
      const run = runTier(dir, {}, `${tripwireRf(join(dir, "bin"), marker)}:${process.env.PATH ?? ""}`);
      expect(run.status).not.toBe(0);
      expect(run.report.testResults.map(file => relative(ROOT, file.name))).toEqual([TIER]);
      expect(run.report).toMatchObject({ ...NO_SKIP_NO_TODO, numFailedTests: 2, numPassedTests: 0 });
      expect(failureOf(run.success)).toContain(`${REASON}: ${FIXTURE} unset or empty`);
      expect(failureOf(run.absent)).toContain(`${REASON}: ${FIXTURE}, ${NO_DENO_PATH} unset or empty`);
      expect(existsSync(marker)).toBe(false);
    },
    RUN_BUDGET_MS,
  );

  it(
    "an empty variable is missing configuration too, refused the same typed way",
    () => {
      const dir = scratch("rf-tsx-empty-");
      const marker = join(dir, "rf-launched");
      const run = runTier(dir, { [FIXTURE]: "", [NO_DENO_PATH]: "" }, `${tripwireRf(join(dir, "bin"), marker)}:${process.env.PATH ?? ""}`);
      expect(run.status).not.toBe(0);
      expect(run.report).toMatchObject({ ...NO_SKIP_NO_TODO, numFailedTests: 2, numPassedTests: 0 });
      expect(failureOf(run.success)).toContain(`${REASON}: ${FIXTURE} unset or empty`);
      expect(failureOf(run.absent)).toContain(`${REASON}: ${FIXTURE}, ${NO_DENO_PATH} unset or empty`);
      expect(existsSync(marker)).toBe(false);
    },
    RUN_BUDGET_MS,
  );
});

describe("rf-preview-tsx encodes R9's receipt rows (wb-693.6, R8 -> R9)", () => {
  it(
    "a provisioned-shape stand-in passes both rows, so provisioning is the only missing input, and each row prints its receipt line",
    () => {
      const run = provisionedRun("rf-tsx-provisioned-", tsxPreview(), { answer: refusal("RF_COMPONENT_RUNTIME_ABSENT"), exit: 1 });
      expect(run.report).toMatchObject({ ...NO_SKIP_NO_TODO, numPassedTests: 2, numFailedTests: 0 });
      expect(run.status).toBe(0);
      expect(run.stdout).toContain(`RF-TSX-RECEIPT {"row":"success","cli_version":"${STUB_VERSION}","tsx_worker_spawns":1,`);
      expect(run.stdout).toContain('RF-TSX-RECEIPT {"row":"runtime-absent","category":"unavailable","message":"RF render refused: RF_COMPONENT_RUNTIME_ABSENT"}');
    },
    RUN_BUDGET_MS,
  );

  it(
    "the canonical launch (no reporter flag) carries the same receipt lines in an agent session as in a plain shell: agent-reporter count == plain-reporter count == 2",
    () => {
      const dir = scratch("rf-tsx-launch-");
      const workspace = join(dir, "workspace");
      mkdirSync(workspace);
      const tier = { [FIXTURE]: workspace, [NO_DENO_PATH]: stubRf(join(dir, "no-deno"), refusal("RF_COMPONENT_RUNTIME_ABSENT"), 1) };
      const path = `${standInEngine(stubRf(join(dir, "tsx"), tsxPreview(), 0))}:${process.env.PATH ?? ""}`;
      const agent = canonicalLaunch("agent", tier, path);
      const plain = canonicalLaunch("plain", tier, path);
      expect([agent.status, plain.status]).toEqual([0, 0]);
      expect(plain.receipts).toHaveLength(2);
      expect(agent.receipts).toHaveLength(plain.receipts.length);
      expect(agent.receipts).toEqual(plain.receipts);
    },
    RUN_BUDGET_MS,
  );

  const FALSIFIERS: readonly {
    readonly name: string;
    readonly preview: unknown;
    readonly absent: { readonly answer: unknown; readonly exit: number } | "unset";
    readonly successClause: string;
    readonly absentFailure: string | null;
  }[] = [
    {
      name: "a python-only render (tsx_worker_spawns 0) fails the success row; a no-deno PATH that still renders fails the runtime-absent row",
      preview: tsxPreview({ engineMetrics: { tsx_worker_spawns: 0, tsx_resource_rounds: 0 } }),
      absent: { answer: tsxPreview(), exit: 0 },
      successClause: CLAUSE.spawns,
      absentFailure: CLAUSE.category,
    },
    {
      name: "a pre-TSX rf without engine_metrics fails the success row; a refusal for another reason fails the runtime-absent row",
      preview: tsxPreview({ engineMetrics: null }),
      absent: { answer: refusal("RF_WORKSPACE_NOT_INITIALIZED"), exit: 1 },
      successClause: CLAUSE.spawns,
      absentFailure: CLAUSE.absentCode,
    },
    {
      name: "a malformed contract fingerprint fails the success row; an unparseable refusal (typed transport) fails the runtime-absent row",
      preview: tsxPreview({ contractFingerprint: `sha256:${"f".repeat(63)}` }),
      absent: { answer: "{not json", exit: 1 },
      successClause: CLAUSE.fingerprint,
      absentFailure: CLAUSE.category,
    },
    {
      name: "an empty runtime distribution version fails the success row; an unset no-deno PATH is refused naming only that variable",
      preview: tsxPreview({ distributionVersion: "" }),
      absent: "unset",
      successClause: CLAUSE.distribution,
      absentFailure: `${REASON}: ${NO_DENO_PATH} unset or empty`,
    },
    {
      name: "a render without cli_version fails the success row while a well-formed refusal still passes",
      preview: tsxPreview({ cliVersion: null }),
      absent: { answer: refusal("RF_COMPONENT_RUNTIME_ABSENT"), exit: 1 },
      successClause: CLAUSE.cliVersion,
      absentFailure: null,
    },
  ];

  for (const falsifier of FALSIFIERS) {
    it(
      `falsifier: ${falsifier.name}`,
      () => {
        const run = provisionedRun("rf-tsx-falsifier-", falsifier.preview, falsifier.absent);
        expect(run.status).not.toBe(0);
        expect(run.report).toMatchObject(NO_SKIP_NO_TODO);
        expect(run.success.status).toBe("failed");
        expect(failureOf(run.success)).toContain(falsifier.successClause);
        if (falsifier.absentFailure === null) {
          expect(run.absent.status).toBe("passed");
        } else {
          expect(run.absent.status).toBe("failed");
          expect(failureOf(run.absent)).toContain(falsifier.absentFailure);
        }
      },
      RUN_BUDGET_MS,
    );
  }
});

describe(DENO_IDENTITY_SUITE, () => {
  const ABSENT_REFUSAL = { answer: refusal("RF_COMPONENT_RUNTIME_ABSENT"), exit: 1 } as const;

  /**
   * A refused success row: failed, its first failure opening with the typed refusal and `code` (each caller spells its code
   * as a literal, never through the helper's constant), carrying `detail`; the runtime-absent row still passing; no success
   * receipt and no engine line printed.
   */
  function expectRefused(run: TierRun, code: string, detail: string): void {
    expect(run.status).not.toBe(0);
    expect(run.report).toMatchObject({ ...NO_SKIP_NO_TODO, numPassedTests: 1, numFailedTests: 1 });
    expect(run.success.status).toBe("failed");
    const head = `DenoIdentityRefusal: ${code}: `;
    expect(run.success.failureMessages[0]?.slice(0, head.length), failureOf(run.success)).toBe(head);
    expect(failureOf(run.success)).toContain(detail);
    expect(run.absent.status).toBe("passed");
    expect(run.stdout).not.toContain(SUCCESS_RECEIPT);
    expect(run.stdout).not.toContain(ENGINE_MARK);
  }

  it(
    "a provisioned run passes the success row, whose engine line records the resolved deno, its realpath and its sha256 equal to the pin the render reports, beside the four-field receipt line",
    () => {
      const run = provisionedRun("rf-tsx-deno-pinned-", tsxPreview(), ABSENT_REFUSAL);
      expect(run.report).toMatchObject({ ...NO_SKIP_NO_TODO, numPassedTests: 2, numFailedTests: 0 });
      expect(run.status).toBe(0);
      const engine = join(run.dir, "tsx", DENO_ENGINE);
      const digest = `sha256:${STAND_IN_DIGEST}`;
      expect(recordLines(run.stdout, ENGINE_MARK)).toEqual([`RF-TSX-ENGINE ${JSON.stringify({ deno_resolved: engine, deno_realpath: realpathSync(engine), deno_sha256: digest })}`]);
      expect(recordLines(run.stdout, SUCCESS_RECEIPT)).toEqual([
        `RF-TSX-RECEIPT ${JSON.stringify({ row: "success", cli_version: STUB_VERSION, tsx_worker_spawns: 1, distribution_version: STUB_VERSION, contract_fingerprint: digest })}`,
      ]);
      expect(run.stdout.indexOf(ENGINE_MARK)).toBeLessThan(run.stdout.indexOf(SUCCESS_RECEIPT));
      expect(readFileSync(run.launched, "utf8")).toBe("launched\n");
    },
    RUN_BUDGET_MS,
  );

  it(
    "a provisioned run through the operator's versioned layout (bin/deno a symlink through a current link to tools/deno/2.9.7/bin/deno) records the symlink as deno_resolved and the versioned binary as deno_realpath",
    () => {
      const run = provisionedRun("rf-tsx-deno-versioned-", tsxPreview(), ABSENT_REFUSAL, (dir, launched) => {
        const tsx = stubRf(join(dir, "tsx"), tsxPreview(), 0, launched);
        standInEngine(join(dir, "tools", "deno", "2.9.7", "bin"));
        symlinkSync(join(dir, "tools", "deno", "2.9.7"), join(dir, "tools", "deno", "current"));
        mkdirSync(join(dir, "bin"));
        symlinkSync(join(dir, "tools", "deno", "current", "bin", DENO_ENGINE), join(dir, "bin", DENO_ENGINE));
        return [join(dir, "bin"), tsx, process.env.PATH ?? ""].join(delimiter);
      });
      expect(run.report).toMatchObject({ ...NO_SKIP_NO_TODO, numPassedTests: 2, numFailedTests: 0 });
      expect(run.status).toBe(0);
      const resolved = join(run.dir, "bin", DENO_ENGINE);
      const versioned = realpathSync(join(run.dir, "tools", "deno", "2.9.7", "bin", DENO_ENGINE));
      expect(new Set([resolved, join(run.dir, "tools", "deno", "current", "bin", DENO_ENGINE), versioned]).size).toBe(3);
      expect(recordLines(run.stdout, ENGINE_MARK)).toEqual([`RF-TSX-ENGINE ${JSON.stringify({ deno_resolved: resolved, deno_realpath: versioned, deno_sha256: `sha256:${STAND_IN_DIGEST}` })}`]);
      expect(readFileSync(run.launched, "utf8")).toBe("launched\n");
    },
    RUN_BUDGET_MS,
  );

  it.each<[string, string]>([
    ["a Latin-1 letter (U+00E9)", String.fromCodePoint(0xe9)],
    ["a TAB (U+0009, a C0 control)", String.fromCodePoint(0x09)],
    ["a US (U+001F, the last C0 control)", String.fromCodePoint(0x1f)],
    ["a DEL (U+007F)", String.fromCodePoint(0x7f)],
  ])(
    "a provisioned run whose deno path holds %s, so it is not printable ASCII, names its resolved path and its realpath <unrecognized> on the engine line, never verbatim",
    (_label, char) => {
      const odd = `odd${char}`;
      const run = provisionedRun("rf-tsx-deno-echo-", tsxPreview(), ABSENT_REFUSAL, (dir, launched) => {
        const tsx = stubRf(join(dir, "tsx"), tsxPreview(), 0, launched);
        return [standInEngine(join(dir, odd, "bin")), tsx, process.env.PATH ?? ""].join(delimiter);
      });
      expect(run.report).toMatchObject({ ...NO_SKIP_NO_TODO, numPassedTests: 2, numFailedTests: 0 });
      expect(run.status).toBe(0);
      expect(recordLines(run.stdout, ENGINE_MARK)).toEqual([`RF-TSX-ENGINE ${JSON.stringify({ deno_resolved: "<unrecognized>", deno_realpath: "<unrecognized>", deno_sha256: `sha256:${STAND_IN_DIGEST}` })}`]);
      expect(run.stdout).not.toContain(odd);
      expect(readFileSync(run.launched, "utf8")).toBe("launched\n");
    },
    RUN_BUDGET_MS,
  );

  it(
    "a provisioned run whose deno path holds a space and a tilde, printable ASCII, records its resolved path and its realpath verbatim on the engine line",
    () => {
      const printable = "my tools~2.9.7";
      const run = provisionedRun("rf-tsx-deno-printable-", tsxPreview(), ABSENT_REFUSAL, (dir, launched) => {
        const tsx = stubRf(join(dir, "tsx"), tsxPreview(), 0, launched);
        return [standInEngine(join(dir, printable, "bin")), tsx, process.env.PATH ?? ""].join(delimiter);
      });
      expect(run.report).toMatchObject({ ...NO_SKIP_NO_TODO, numPassedTests: 2, numFailedTests: 0 });
      expect(run.status).toBe(0);
      const engine = join(run.dir, printable, "bin", DENO_ENGINE);
      expect(recordLines(run.stdout, ENGINE_MARK)).toEqual([`RF-TSX-ENGINE ${JSON.stringify({ deno_resolved: engine, deno_realpath: realpathSync(engine), deno_sha256: `sha256:${STAND_IN_DIGEST}` })}`]);
      expect(readFileSync(run.launched, "utf8")).toBe("launched\n");
    },
    RUN_BUDGET_MS,
  );

  it.each<[string, string]>([
    ["mise (the mise shim form)", "mise"],
    ["deno-shim (the engine's name with a suffix)", "deno-shim"],
    ["Deno (the engine's name in another case)", "Deno"],
    ["mise-deno (the engine's name with a prefix)", "mise-deno"],
  ])(
    "a deno symlinked to a version manager's binary named %s fails the success row typed rf_tsx_deno_shim before rf is launched",
    (_label, name) => {
      const run = provisionedRun("rf-tsx-deno-manager-", tsxPreview(), ABSENT_REFUSAL, (dir, launched) => {
        const tsx = stubRf(join(dir, "tsx"), tsxPreview(), 0, launched);
        const manager = join(dir, "manager", "bin", name);
        mkdirSync(join(dir, "manager", "bin"), { recursive: true });
        writeFileSync(manager, STAND_IN_ENGINE);
        chmodSync(manager, 0o700);
        symlinkSync(manager, join(tsx, DENO_ENGINE));
        return `${tsx}${delimiter}${process.env.PATH ?? ""}`;
      });
      expectRefused(run, "rf_tsx_deno_shim", `is a version-manager shim (its realpath names ${name}, not deno);`);
      expect(existsSync(run.launched)).toBe(false);
    },
    RUN_BUDGET_MS,
  );

  it.each<[string, readonly string[]]>([
    ["its parent directory: manager/shims/deno", ["manager", "shims"]],
    ["an ancestor directory: manager/shims/bin/deno", ["manager", "shims", "bin"]],
  ])(
    "a deno that is a file under a shims directory (%s), with the engine's own name and bytes, fails the success row typed rf_tsx_deno_shim before rf is launched",
    (_label, segments) => {
      const run = provisionedRun("rf-tsx-deno-shims-", tsxPreview(), ABSENT_REFUSAL, (dir, launched) => {
        const tsx = stubRf(join(dir, "tsx"), tsxPreview(), 0, launched);
        return [standInEngine(join(dir, ...segments)), tsx, process.env.PATH ?? ""].join(delimiter);
      });
      expectRefused(run, "rf_tsx_deno_shim", "is a version-manager shim (it sits in a shims directory);");
      expect(existsSync(run.launched)).toBe(false);
    },
    RUN_BUDGET_MS,
  );

  it(
    "a deno that is a #!/bin/sh script fails the success row typed rf_tsx_deno_shim before rf is launched",
    () => {
      const run = provisionedRun("rf-tsx-deno-script-", tsxPreview(), ABSENT_REFUSAL, (dir, launched) => {
        const tsx = standInEngine(stubRf(join(dir, "tsx"), tsxPreview(), 0, launched), "#!/bin/sh\nexit 0\n");
        return `${tsx}${delimiter}${process.env.PATH ?? ""}`;
      });
      expectRefused(run, "rf_tsx_deno_shim", "is a version-manager shim (it is a #! script, not the engine binary);");
      expect(existsSync(run.launched)).toBe(false);
    },
    RUN_BUDGET_MS,
  );

  it(
    "no deno on the success row's PATH fails it typed rf_tsx_deno_unresolved before rf is launched",
    () => {
      const run = provisionedRun("rf-tsx-deno-absent-", tsxPreview(), ABSENT_REFUSAL, (dir, launched) => {
        const tsx = stubRf(join(dir, "tsx"), tsxPreview(), 0, launched);
        return `${tsx}${delimiter}${engineFreeTools(join(dir, "tools"))}`;
      });
      expectRefused(run, "rf_tsx_deno_unresolved", "no executable deno on PATH");
      expect(existsSync(run.launched)).toBe(false);
    },
    RUN_BUDGET_MS,
  );

  it.each<[string, string]>([
    ["(the pin f*64)", "f".repeat(64)],
    ["only in its first hex (a greater pin)", digestOneOff(0, 1)],
    ["only in its 33rd hex", digestOneOff(32, 1)],
    ["only in its last hex (a lesser pin)", digestOneOff(63, -1)],
  ])(
    "a deno whose sha256 differs from the pin the render reports %s fails the success row typed rf_tsx_deno_mismatch and prints no success receipt",
    (_label, pinned) => {
      expect(pinned).toMatch(/^[0-9a-f]{64}$/);
      expect(pinned).not.toBe(STAND_IN_DIGEST);
      const run = provisionedRun("rf-tsx-deno-mismatch-", tsxPreview({ contractFingerprint: `sha256:${pinned}` }), ABSENT_REFUSAL);
      expectRefused(run, "rf_tsx_deno_mismatch", `has sha256 ${STAND_IN_DIGEST}, not the sha256 ${pinned} the installed rf's runtime lock pins for this host`);
      expect(readFileSync(run.launched, "utf8")).toBe("launched\n");
    },
    RUN_BUDGET_MS,
  );

  it(
    "a render that reports no sha256 pin for the host (contract_fingerprint unknown) fails the success row typed rf_tsx_deno_unpinned",
    () => {
      const run = provisionedRun("rf-tsx-deno-unpinned-", tsxPreview({ contractFingerprint: "unknown" }), ABSENT_REFUSAL);
      expectRefused(run, "rf_tsx_deno_unpinned", "contract_fingerprint unknown");
      expect(readFileSync(run.launched, "utf8")).toBe("launched\n");
    },
    RUN_BUDGET_MS,
  );
});
