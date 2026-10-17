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
 */
import { spawnSync } from "node:child_process";
import { chmodSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { REACTIVE_FIBER_CLI_SCHEMA } from "../src/workbench/providers/reactivefiber.js";
import defaultConfig from "../vitest.config.js";
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

function failureOf(row: RowResult): string {
  return row.failureMessages.join("\n");
}

/** A stand-in `rf` answering one context render with `answer` (workspace.root echoed from argv). Never a producer capture. */
function stubRf(dir: string, answer: unknown, exit: number): string {
  mkdirSync(dir, { recursive: true });
  const script = join(dir, "rf");
  writeFileSync(
    script,
    [
      `#!${NODE}`,
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
        contract_fingerprint: knobs.contractFingerprint ?? `sha256:${"f".repeat(64)}`,
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

/** A provisioned-shape run: `preview` answers on the ambient PATH, `absent` on the no-deno PATH (or the variable is left unset). */
function provisionedRun(prefix: string, preview: unknown, absent: { readonly answer: unknown; readonly exit: number } | "unset"): TierRun {
  const dir = scratch(prefix);
  const workspace = join(dir, "workspace");
  mkdirSync(workspace);
  const tier: Record<string, string> = { [FIXTURE]: workspace };
  if (absent !== "unset") tier[NO_DENO_PATH] = stubRf(join(dir, "no-deno"), absent.answer, absent.exit);
  return runTier(dir, tier, `${stubRf(join(dir, "tsx"), preview, 0)}:${process.env.PATH ?? ""}`);
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
    expect(toml).toContain('gate = ["lint", "typing", "build", "test", "workbench-shell", "package-smoke"]\n');
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
      const path = `${stubRf(join(dir, "tsx"), tsxPreview(), 0)}:${process.env.PATH ?? ""}`;
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
