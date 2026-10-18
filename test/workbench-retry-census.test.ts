/**
 * wb-nl8.4: the retry census pin (wb-nl8.1 design Q13, owner-filed). vitest 4.1.10 runs a failed case again while its
 * retry count lasts and reports a case that failed and then passed as PASSED, so a cut could silence a flake by retrying
 * it - and no census saw retry: report mode's analysis never read it, and --retry sat in the vouch's closed flag list.
 * retryCensus() (test/helpers/census.ts, the one census helper) reads every route that sets a case's retry, per forge.toml
 * tier: the tier's vitest argv (vitest's own parseCLI), its resolved vitest config (vitest's own resolveConfig: test.retry,
 * a tag definition carrying retry, projects), every file the config includes and every setup file it loads, through
 * their relative import closures, parse-aware (the census helper's strict registration resolver, never a text grep): the
 * options of each registration and of each enclosing describe / suite, and vi.setConfig. A file whose registrations the
 * static read cannot bound (its registration API escapes, or a suite collector is kept) is read through the COLLECTED
 * read instead: vitest collects it under the tier's config with a never-matching name filter and the retry reporter
 * (test/helpers/retry-reporter.ts) reads each collected case's resolved retry.
 * - the tree row: no case any vitest tier runs is retried, on these bytes, non-vacuously;
 * - one independently authored falsifier project per claimed route, each red through its own route and nothing else;
 *   controls (a comment, a string literal, retry-free options, a script and a tool tier) stay green;
 * - the executed leg: the bead's mutant ({ retry: 2 } on a case whose assertion fails on its first attempt) PASSES under
 *   vitest while its retry-free twin fails - the silent pass the census refuses is real, its assertion reached.
 */
import { spawnSync } from "node:child_process";
import { mkdirSync, realpathSync, symlinkSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { DEFAULT_GATE_TIER, type RetryCensus, type RetryRoute, retryCensus } from "./helpers/census.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SELF = relative(ROOT, fileURLToPath(import.meta.url));
/** A nested run or a whole-tree read can take a while on a loaded gate host. */
const SLOW = 240_000;

installScratchLeakGuard();

// ---- falsifier projects: each a whole repository root the census reads exactly as it reads this one ----

/** A case whose assertion fails on its first attempt and passes on any retry: the flake a retry silences. */
const FLAKE = "let attempts = 0;\nconst flake = (): void => {\n  attempts += 1;\n  expect(attempts).toBeGreaterThan(1);\n};\n";
const testFile = (body: string): string => `import { describe, expect, it, vi } from "vitest";\n\n${FLAKE}\n${body}\n`;
const forgeToml = (test: string, extra = ""): string => `[build]\ngate = ["test"]\n\n[build.commands]\ntest = ${JSON.stringify(test)}\n${extra}`;
const packageJson = (scripts: Readonly<Record<string, string>>): string => `${JSON.stringify({ name: "retry-falsifier", private: true, type: "module", scripts }, null, 2)}\n`;
const config = (test: string): string => `import { defineConfig } from "vitest/config";\n\nexport default defineConfig({ test: { include: ["test/**/*.test.ts"]${test} } });\n`;

interface Shape {
  /** The flaky case file's body (test/flaky.test.ts), after the flake. */
  readonly body?: string;
  /** The config's extra test keys, appended after include. */
  readonly test?: string;
  readonly script?: string;
  readonly forge?: string;
  readonly files?: Readonly<Record<string, string>>;
  readonly scripts?: Readonly<Record<string, string>>;
  readonly extraTiers?: string;
}

function files(shape: Shape): Record<string, string> {
  return {
    "forge.toml": forgeToml(shape.forge ?? "npm run test", shape.extraTiers),
    "package.json": packageJson({ test: shape.script ?? "vitest run", ...shape.scripts }),
    "vitest.config.ts": config(shape.test ?? ""),
    "test/flaky.test.ts": testFile(shape.body ?? 'it("flaky", flake);'),
    ...shape.files,
  };
}

interface Row {
  readonly id: string;
  /** The route the row exercises, in words. */
  readonly routed: string;
  readonly shape: Shape;
  /** The routes the census must name: exactly these, nothing else (a control names none). */
  readonly routes: readonly RetryRoute[];
}

/** One falsifier per claimed route (vitest 4.1.10 retries a case through each; the probe record is the bead's delivery note). */
const FALSIFIERS: readonly Row[] = [
  { id: "f-case", routed: "a case's own options carry retry: 2 (the bead's mutant file)", shape: { body: 'it("flaky", { retry: 2 }, flake);' }, routes: ["case-options"] },
  { id: "f-case-object", routed: "a case's own options carry retry as an object ({ count: 2 })", shape: { body: 'it("flaky", { retry: { count: 2 } }, flake);' }, routes: ["case-options"] },
  { id: "f-each", routed: "an it.each case carries retry in its options", shape: { body: 'it.each([1])("flaky %s", { retry: 2 }, flake);' }, routes: ["case-options"] },
  { id: "f-for", routed: "an it.for case carries retry in its options", shape: { body: 'it.for([1])("flaky %s", { retry: 2 }, flake);' }, routes: ["case-options"] },
  { id: "f-const", routed: "a case's options are a same-file const carrying retry", shape: { body: 'const options = { retry: 2 };\nit("flaky", options, flake);' }, routes: ["case-options"] },
  { id: "f-spread", routed: "a case's options spread a const carrying retry", shape: { body: 'const base = { retry: 2 };\nit("flaky", { ...base, timeout: 5_000 }, flake);' }, routes: ["case-options"] },
  { id: "f-alias", routed: "a const alias of it registers the case with retry", shape: { body: 'const flakyIt = it;\nflakyIt("flaky", { retry: 2 }, flake);' }, routes: ["case-options"] },
  { id: "f-extend", routed: "an it.extend test registers the case with retry", shape: { body: 'const extended = it.extend({});\nextended("flaky", { retry: 2 }, flake);' }, routes: ["case-options"] },
  {
    id: "f-helper",
    routed: "a relative helper module the case file imports registers the case with retry",
    shape: { body: 'import { flakyCase } from "./helpers/flaky.js";\n\nflakyCase();', files: { "test/helpers/flaky.ts": `import { expect, it } from "vitest";\n\n${FLAKE}\nexport function flakyCase(): void {\n  it("flaky", { retry: 2 }, flake);\n}\n` } },
    routes: ["case-options"],
  },
  { id: "f-suite", routed: "an enclosing describe carries retry in its options, inherited by its case", shape: { body: 'describe("suite", { retry: 2 }, () => {\n  it("flaky", flake);\n});' }, routes: ["suite-options"] },
  { id: "f-nested-suite", routed: "an outer describe carries retry, inherited through a nested describe", shape: { body: 'describe("outer", { retry: 2 }, () => {\n  describe("inner", () => {\n    it("flaky", flake);\n  });\n});' }, routes: ["suite-options"] },
  { id: "f-describe-each", routed: "a describe.each suite carries retry in its options", shape: { body: 'describe.each([1])("suite %s", { retry: 2 }, () => {\n  it("flaky", flake);\n});' }, routes: ["suite-options"] },
  { id: "f-unknown", routed: "a case's options come from a call the census cannot read", shape: { body: 'const make = (): { retry: number } => ({ retry: 2 });\nit("flaky", make(), flake);' }, routes: ["options-unknown"] },
  { id: "f-exported", routed: "a case's options are an exported const an importer may write retry through", shape: { body: 'export const options = { timeout: 5_000 };\nit("flaky", options, flake);' }, routes: ["options-unknown"] },
  { id: "f-setconfig", routed: "vi.setConfig sets retry on the runner config the case's registration reads", shape: { body: 'vi.setConfig({ retry: 2 });\nit("flaky", flake);' }, routes: ["runtime-config"] },
  { id: "f-setconfig-alias", routed: "vi.setConfig is aliased, then called with retry", shape: { body: 'const configure = vi.setConfig;\nconfigure({ retry: 2 });\nit("flaky", flake);' }, routes: ["runtime-config"] },
  {
    id: "f-setup-file",
    routed: "a setup file the tier's config loads calls vi.setConfig with retry",
    shape: { test: ', setupFiles: ["./test/setup.ts"]', files: { "test/setup.ts": 'import { vi } from "vitest";\n\nvi.setConfig({ retry: 2 });\n' } },
    routes: ["runtime-config"],
  },
  { id: "f-escape", routed: "the case registers through an escaped handle the static read cannot resolve ([it][0]); the collected read reads its retry", shape: { body: 'const register = [it][0];\nregister("flaky", { retry: 2 }, flake);' }, routes: ["collected-retry"] },
  {
    id: "f-chain-fn",
    routed: "the case registers through vitest's internal it.fn with an options this; the collected read reads its retry",
    shape: { body: '(it as unknown as { fn: { call: (self: object, name: string, handler: () => void) => void } }).fn.call({ retry: 2 }, "flaky", flake);' },
    routes: ["collected-retry"],
  },
  {
    id: "f-collector",
    routed: "a kept suite collector's options are written with retry before its cases are collected; the collected read reads it",
    shape: { body: 'const collector = describe("suite", {}, () => {\n  it("flaky", flake);\n}) as unknown as { options: Record<string, unknown> };\ncollector.options.retry = 2;' },
    routes: ["collected-retry"],
  },
  { id: "f-config", routed: "the tier's vitest config sets test.retry", shape: { test: ", retry: 2" }, routes: ["config-retry"] },
  { id: "f-config-object", routed: "the tier's vitest config sets test.retry as an object", shape: { test: ", retry: { count: 2 }" }, routes: ["config-retry"] },
  { id: "f-tag", routed: "a tag the tier's config defines carries retry, and the case carries the tag", shape: { test: ', tags: [{ name: "flaky", retry: 2 }]', body: 'it("flaky", { tags: ["flaky"] }, flake);' }, routes: ["config-tag-retry"] },
  { id: "f-projects", routed: "the tier's config defines projects, whose own configs the census does not resolve", shape: { test: ', projects: [{ test: { name: "unit", include: ["test/**/*.test.ts"], retry: 2 } }]' }, routes: ["config-projects"] },
  { id: "f-cli", routed: "the tier's npm script passes --retry 2", shape: { script: "vitest run --retry 2" }, routes: ["cli-retry"] },
  { id: "f-cli-count", routed: "the tier's npm script passes --retry.count=2", shape: { script: "vitest run --retry.count=2" }, routes: ["cli-retry"] },
  { id: "f-forge-cli", routed: "the forge.toml step runs vitest itself with --retry=2", shape: { forge: "./node_modules/.bin/vitest run --retry=2" }, routes: ["cli-retry"] },
  {
    id: "f-tier-unread",
    routed: "a tier's command is outside the modelled grammar (a pipe), so the census cannot read whether it passes --retry",
    shape: { extraTiers: '\n[build.commands.extra]\ncommand = "npm run extra"\n', scripts: { extra: "vitest run --retry 2 | cat" } },
    routes: ["tier-unread"],
  },
];

/** Controls: the same project shapes with nothing that retries - text that only LOOKS like retry, and tiers the census need not read. */
const CONTROLS: readonly Row[] = [
  { id: "c-clean", routed: "the flaky case with no retry anywhere", shape: {}, routes: [] },
  { id: "c-comment", routed: "retry options inside comments only", shape: { body: '// it("flaky", { retry: 2 }, flake);\n/* describe("suite", { retry: 2 }, () => {}); */\nit("flaky", flake);' }, routes: [] },
  { id: "c-string", routed: "retry options inside a string literal only", shape: { body: 'const text = "it(\\"flaky\\", { retry: 2 }, flake)";\nit("flaky", { timeout: text.length * 1_000 }, flake);' }, routes: [] },
  { id: "c-options", routed: "options without retry on the case and its suite", shape: { body: 'describe("suite", { timeout: 9_000 }, () => {\n  it("flaky", { timeout: 5_000, repeats: 0 }, flake);\n});' }, routes: [] },
  { id: "c-setconfig", routed: "vi.setConfig without retry", shape: { body: 'vi.setConfig({ testTimeout: 30_000 });\nit("flaky", flake);' }, routes: [] },
  {
    id: "c-tiers",
    routed: "a tool tier (biome) and a script tier (node) beside the vitest tier",
    shape: { extraTiers: 'lint = "npm run lint"\nshell = "node qa/run.mjs"\n', scripts: { lint: "biome check test/" } },
    routes: [],
  },
];

let scratch = "";
let base = "";
const censuses = new Map<string, Promise<RetryCensus>>();

function writeProject(id: string, shape: Shape): string {
  const root = join(base, id);
  for (const [path, text] of Object.entries(files(shape))) {
    mkdirSync(dirname(join(root, path)), { recursive: true });
    writeFileSync(join(root, path), text);
  }
  symlinkSync(join(ROOT, "node_modules"), join(root, "node_modules"), "dir");
  return root;
}

/** Each project is read once, by the row that judges it. */
function censusOf(row: Row): Promise<RetryCensus> {
  let census = censuses.get(row.id);
  if (census === undefined) {
    census = retryCensus(writeProject(row.id, row.shape));
    censuses.set(row.id, census);
  }
  return census;
}

const routesOf = (census: RetryCensus): RetryRoute[] => [...new Set(census.findings.map(finding => finding.route))].sort();
const shown = (census: RetryCensus): string => census.findings.map(finding => `${finding.route} ${finding.at}: ${finding.detail}`).join("\n") || "(no findings)";

beforeAll(() => {
  scratch = makeScratch("retry-census.");
  base = realpathSync(scratch);
});

afterAll(() => {
  removeScratch(scratch);
});

describe("retry census (wb-nl8.4): the tree", () => {
  it(
    "no case any vitest tier runs is retried: every tier's argv and resolved config, every included and setup file through its import closure, and the collected read of each file the static read cannot bound",
    async () => {
      const census = await retryCensus(ROOT);
      expect(census.findings, shown(census)).toEqual([]);
      // non-vacuity: the read reached the default tier, its config, this very file and real registrations
      const gate = census.tiers.find(tier => tier.tier === DEFAULT_GATE_TIER);
      expect(gate?.kind).toBe("vitest");
      expect(gate?.config).toBe(join(ROOT, "vitest.config.ts"));
      expect(census.files).toContain(SELF);
      expect(census.files).toContain("test/helpers/census-guard.ts");
      expect(census.registrations).toBeGreaterThan(census.files.length);
      // every collected file was collected with at least one case read (a read that proves nothing is red)
      expect(census.collectedCases).toBeGreaterThanOrEqual(census.collectedFiles.length);
      expect(census.collectedFiles).not.toContain(SELF);
      // every forge.toml tier is classified; none is unread
      expect(census.tiers.every(tier => tier.kind !== "unread")).toBe(true);
    },
    SLOW,
  );
});

describe("retry census (wb-nl8.4): one falsifier per claimed route, each red through its own route", () => {
  for (const row of FALSIFIERS) {
    it(
      `${row.routed} [${row.id}]`,
      async () => {
        const census = await censusOf(row);
        expect(routesOf(census), shown(census)).toEqual([...row.routes].sort());
        expect(census.findings.length).toBeGreaterThan(0);
      },
      SLOW,
    );
  }
});

describe("retry census (wb-nl8.4): controls stay green - the read is parse-aware, never a text grep", () => {
  for (const row of CONTROLS) {
    it(
      `${row.routed} [${row.id}]`,
      async () => {
        const census = await censusOf(row);
        expect(census.findings, shown(census)).toEqual([]);
        expect(census.registrations).toBeGreaterThan(0);
        expect(census.files).toContain("test/flaky.test.ts");
      },
      SLOW,
    );
  }

  it(
    "the control's tiers are read by kind: the vitest tier with its config, the tool tier and the script tier named [c-tiers-kinds]",
    async () => {
      const row = CONTROLS.find(control => control.id === "c-tiers");
      if (row === undefined) throw new Error("c-tiers control missing");
      const census = await censusOf(row);
      expect(census.tiers.map(tier => [tier.tier, tier.kind])).toEqual([
        ["test", "vitest"],
        ["lint", "tool"],
        ["shell", "script"],
      ]);
    },
    SLOW,
  );
});

/** A nested vitest run's environment: the caller's, without the names vitest sets inside a worker. */
function childEnv(): NodeJS.ProcessEnv {
  const env: NodeJS.ProcessEnv = {};
  const worker = new Set(["VITEST", "VITEST_MODE", "VITEST_POOL_ID", "VITEST_WORKER_ID", "TEST", "BASE_URL", "MODE", "DEV", "PROD", "SSR", "FORCE_TTY"]);
  for (const [key, value] of Object.entries(process.env)) if (value !== undefined && !worker.has(key)) env[key] = value;
  return env;
}

/** The project's flaky case run under vitest itself: how many cases passed and failed, from vitest's JSON report on stdout. */
function runFlaky(root: string): { readonly passed: number; readonly failed: number; readonly status: number | null } {
  const run = spawnSync(process.execPath, [join(root, "node_modules", "vitest", "vitest.mjs"), "run", "--reporter=json"], { cwd: root, env: childEnv(), encoding: "utf8", timeout: SLOW });
  const start = run.stdout.indexOf("{");
  const report: unknown = start === -1 ? undefined : JSON.parse(run.stdout.slice(start));
  const count = (key: string): number => {
    const value = typeof report === "object" && report !== null ? (report as Record<string, unknown>)[key] : undefined;
    return typeof value === "number" ? value : -1;
  };
  return { passed: count("numPassedTests"), failed: count("numFailedTests"), status: run.status };
}

describe("retry census (wb-nl8.4): the executed leg - the silent pass is real", () => {
  it(
    "the bead's mutant ({ retry: 2 }) PASSES under vitest while its retry-free twin, the same failing first attempt, fails [x-mutant-passes]",
    async () => {
      const mutant = FALSIFIERS.find(row => row.id === "f-case");
      const twin = CONTROLS.find(row => row.id === "c-clean");
      if (mutant === undefined || twin === undefined) throw new Error("f-case or c-clean missing");
      await Promise.all([censusOf(mutant), censusOf(twin)]);
      expect(runFlaky(join(base, twin.id))).toEqual({ passed: 0, failed: 1, status: 1 });
      expect(runFlaky(join(base, mutant.id))).toEqual({ passed: 1, failed: 0, status: 0 });
    },
    SLOW,
  );
});
