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
 * - compound steps (the wb-nl8.4 re-cut, owner direction at landing 122): a forge.toml command chained with && is read
 *   arm by arm, each arm resolved as its own command - a vitest arm's retry is found in either position and under its
 *   own config (the files only that config includes read with it), two tsc arms (the wb-zsv typing form) read as a tool
 *   tier, an arm outside the grammar stays tier-unread named by its own refusal, and neither a single & nor a quoted &&
 *   is split;
 * - the executed leg: the bead's mutant ({ retry: 2 } on a case whose assertion fails on its first attempt) PASSES under
 *   vitest while its retry-free twin fails - the silent pass the census refuses is real, its assertion reached;
 * - respin 1 (outbox row 525, ORCH-REC-R525; enumerate-the-resolvable): npm's lifecycle and the npm configuration are
 *   read around every npm hop, the whole command and each && arm (P01 pretest, P02 posttest, P24 preunit, a tool tier's
 *   prelint, a project .npmrc, an enclosing workspaces package.json, a non-string lifecycle entry), and the tier's argv
 *   and config file are read CLOSED (P12 includeSource, P19 globalSetup, P23 runner, globals, plugins, resolve.alias,
 *   pool, environment, test.env, test.server, test.coverage, test.sequence, a spread at each config level, a call
 *   value, a statement, a function export, a second defineConfig argument, two default exports; on the CLI
 *   --globalSetup, --includeSource, --root, --globals, --no-config, a path reporter, --expect.poll, words after "--"
 *   and a bare --expect that parseCLI refuses), each red through tier-unread naming what it could not read, beside a
 *   control for the one admitted lifecycle literal; the file set is vitest's own list (f-dot-path); one row per
 *   reachable fail-closed branch of the collected read (a killed run, a collection error, an empty suite, a todo-only
 *   suite), source-unread and the unbounded setup file; and the route-set row holds the routes the rows exercise equal
 *   to the twelve the census can name.
 * - wb-9of (owner F7(b) at the wb-nl8.4 landing, ORCH-REC-R541): an npm script's own body is tokenized whole and never
 *   split at its && - the check-script form (npm run check, check = "tsc --noEmit && vitest run --retry 2") reads
 *   tier-unread, named by the body's own shell operator (f-check-and-body). An && inside a quoted sh -c string is not
 *   refused: it stays the named script-tier residual (gate F13), and this slice does not widen the refusal to it.
 */
import { spawnSync } from "node:child_process";
import { mkdirSync, realpathSync, symlinkSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { CENSUS_LIFECYCLE_SCRIPTS, DEFAULT_GATE_TIER, type RetryCensus, type RetryRoute, retryCensus } from "./helpers/census.js";
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
/** wb-nl8.4 respin 1: an npm lifecycle body that runs the flaky case under vitest with a retry (gate probes P01, P02, P24). */
const RETRY_LIFECYCLE_BODY = "vitest run --retry 2 test/flaky.test.ts";
/** An in-source test (gate probe P12): vitest runs it when the config's includeSource selects the file. */
const IN_SOURCE_FLAKY =
  'export const answer = 42;\n\nif (import.meta.vitest) {\n  const { expect, it } = import.meta.vitest;\n  let attempts = 0;\n  it("in-source flaky", { retry: 2 }, () => {\n    attempts += 1;\n    expect(attempts).toBeGreaterThan(1);\n  });\n}\n';
/** A globalSetup module (gate probe P19): it runs in the main process before any worker and writes the project's retry. */
const GLOBAL_SETUP_RETRY = "export default function setup(project: { config: { retry: number } }): void {\n  project.config.retry = 2;\n}\n";

interface Shape {
  /** The flaky case file's body (test/flaky.test.ts), after the flake. */
  readonly body?: string;
  /** The config's extra test keys, appended after include. */
  readonly test?: string;
  /** The whole vitest.config.ts, in place of the one built from test (wb-nl8.4 respin 1: top-level keys, statements, a function export). */
  readonly config?: string;
  readonly script?: string;
  readonly forge?: string;
  readonly files?: Readonly<Record<string, string>>;
  readonly scripts?: Readonly<Record<string, string>>;
  readonly extraTiers?: string;
  /** The project root's directory under the row's own directory (wb-nl8.4 respin 1: a project nested in an enclosing package). */
  readonly nest?: string;
  /** Files written in the row's own directory, around a nested project root. */
  readonly outer?: Readonly<Record<string, string>>;
}

function files(shape: Shape): Record<string, string> {
  return {
    "forge.toml": forgeToml(shape.forge ?? "npm run test", shape.extraTiers),
    "package.json": packageJson({ test: shape.script ?? "vitest run", ...shape.scripts }),
    "vitest.config.ts": shape.config ?? config(shape.test ?? ""),
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
  /** Text the findings must carry: the refusal that says why (an unread arm's own, never the && the census splits). */
  readonly detail?: string;
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
  {
    id: "f-and-cli",
    routed: "a compound step (&&) whose first arm runs vitest with --retry 2 and whose second runs tsc: each arm is read as its own command",
    shape: { forge: "npm run test && npm run typecheck", script: "vitest run --retry 2", scripts: { typecheck: "tsc --noEmit" } },
    routes: ["cli-retry"],
  },
  {
    id: "f-and-case",
    routed: "a compound step (&&) whose second arm runs vitest over a case whose options carry retry: 2",
    shape: { forge: "npm run typecheck && npm run test", body: 'it("flaky", { retry: 2 }, flake);', scripts: { typecheck: "tsc --noEmit" } },
    routes: ["case-options"],
  },
  {
    id: "f-and-second-config",
    routed: "a compound step (&&) whose second arm runs vitest under its own config, over a file only that config includes, whose case options carry retry: 2",
    shape: {
      forge: "npm run test && vitest run --config vitest.other.config.ts",
      files: {
        "vitest.other.config.ts": 'import { defineConfig } from "vitest/config";\n\nexport default defineConfig({ test: { include: ["other/**/*.test.ts"] } });\n',
        "other/flaky.test.ts": testFile('it("flaky", { retry: 2 }, flake);'),
      },
    },
    routes: ["case-options"],
  },
  {
    id: "f-and-unread",
    routed: "a compound step (&&) whose second arm is outside the modelled grammar (a pipe) stays tier-unread, named by that arm's own refusal",
    shape: { extraTiers: '\n[build.commands.extra]\ncommand = "npm run typecheck && npm run extra"\n', scripts: { typecheck: "tsc --noEmit", extra: "vitest run --retry 2 | cat" } },
    routes: ["tier-unread"],
    detail: 'package.json scripts.extra: the command uses the shell operator "|"',
  },
  {
    id: "f-background",
    routed: "a single & (a background job, not &&) between two arms is not split: the step stays tier-unread",
    shape: { forge: "npm run typecheck & npm run test", scripts: { typecheck: "tsc --noEmit" } },
    routes: ["tier-unread"],
    detail: 'forge.toml command test: the command uses the shell operator "&"',
  },
  {
    id: "f-and-two-hops",
    routed: "a compound step (&&) whose second arm reaches vitest through two npm scripts stays tier-unread, as a whole command does",
    shape: { forge: "npm run typecheck && npm run outer", scripts: { typecheck: "tsc --noEmit", outer: "npm run test" } },
    routes: ["tier-unread"],
    detail: "the arm reaches vitest through more than one npm script",
  },
  // wb-9of (owner F7(b), ORCH-REC-R541): the row that kills the nl8.4 gate mutants M-BODY-AND (the tokenizer keeps &&
  // as word text), M-BODY-FIRST-ARM and M-BODY-LAST-ARM (a body split at && and read by its first / last arm only);
  // each of the three survives every other row of this file
  {
    id: "f-check-and-body",
    routed:
      "the tier runs npm run check, whose package.json body chains tsc and vitest with --retry 2 through && (the check-script form): an npm script's own body is tokenized whole, never split at its &&, so the tier stays tier-unread, named by the body's shell operator",
    shape: { forge: "npm run check", scripts: { check: "tsc --noEmit && vitest run --retry 2" } },
    routes: ["tier-unread"],
    detail: 'package.json scripts.check: the command uses the shell operator "&"',
  },
  // ---- wb-nl8.4 respin 1 (outbox row 525, ORCH-REC-R525): U1 - the npm lifecycle around every npm hop the census resolves ----
  {
    id: "f-pretest",
    routed: "npm runs scripts.pretest before the tier's npm hop, and its body runs vitest with --retry 2 (gate probe P01)",
    shape: { scripts: { pretest: RETRY_LIFECYCLE_BODY } },
    routes: ["tier-unread"],
    detail: "package.json scripts.pretest",
  },
  {
    id: "f-posttest",
    routed: "npm runs scripts.posttest after the tier's npm hop, and its body runs vitest with --retry 2 (gate probe P02)",
    shape: { scripts: { posttest: RETRY_LIFECYCLE_BODY } },
    routes: ["tier-unread"],
    detail: "package.json scripts.posttest",
  },
  {
    id: "f-arm-lifecycle",
    routed: "a compound step (&&) whose second arm's npm hop has a pre script running vitest with --retry 2 (gate probe P24: preunit around arm 2 of npm run typecheck && npm run unit)",
    shape: { forge: "npm run typecheck && npm run unit", scripts: { typecheck: "tsc --noEmit", unit: "vitest run", preunit: RETRY_LIFECYCLE_BODY } },
    routes: ["tier-unread"],
    detail: "package.json scripts.preunit",
  },
  {
    id: "f-tool-lifecycle",
    routed: "a tool tier's npm hop (lint, biome) has a pre script running vitest with --retry 2: the lifecycle is read around every hop, whatever the hop reaches",
    shape: { extraTiers: 'lint = "npm run lint"\n', scripts: { lint: "biome check test/", prelint: RETRY_LIFECYCLE_BODY } },
    routes: ["tier-unread"],
    detail: "package.json scripts.prelint",
  },
  {
    id: "f-nested-lifecycle",
    routed: "a tool tier's npm script runs a second npm script, and npm runs that nested hop's pre script (vitest with --retry 2) around it: the lifecycle is read around every hop of the chain, not the first one only",
    shape: { extraTiers: 'lint = "npm run lint"\n', scripts: { lint: "npm run lint:biome", "lint:biome": "biome check test/", "prelint:biome": RETRY_LIFECYCLE_BODY } },
    routes: ["tier-unread"],
    detail: "package.json scripts.prelint:biome",
  },
  {
    id: "f-npmrc",
    routed: "the project .npmrc hands every npm hop node-options (a preload that runs before vitest), read closed as the vouch reads it (npm-project-config)",
    shape: { files: { ".npmrc": "node-options=--require ./preload.cjs\n", "preload.cjs": "\n" } },
    routes: ["tier-unread"],
    detail: ".npmrc sets node-options",
  },
  {
    id: "f-ancestor-workspaces",
    routed: "an enclosing package.json declares workspaces, so npm takes it for the workspace root and loads ITS .npmrc around the hop",
    shape: { nest: "inner", outer: { "package.json": `${JSON.stringify({ name: "retry-outer", private: true, workspaces: ["inner"] })}\n` } },
    routes: ["tier-unread"],
    detail: "declares workspaces",
  },
  // ---- U2 / U3: the tier's config read through a closed key set (GUARD_TOP_KEYS, RETRY_CONFIG_TEST_KEYS and the vouch's nested lists) ----
  {
    id: "f-include-source",
    routed: "the config's includeSource adds in-source tests (import.meta.vitest) whose case carries retry: 2 (gate probe P12)",
    shape: { test: ', includeSource: ["src/**/*.ts"]', files: { "src/flaky.ts": IN_SOURCE_FLAKY } },
    routes: ["tier-unread"],
    detail: "vitest.config.ts sets test.includeSource",
  },
  {
    id: "f-global-setup",
    routed: "the config's globalSetup module writes project.config.retry = 2 in the main process before any worker (gate probe P19)",
    shape: { test: ', globalSetup: ["./global.ts"]', files: { "global.ts": GLOBAL_SETUP_RETRY } },
    routes: ["tier-unread"],
    detail: "vitest.config.ts sets test.globalSetup",
  },
  {
    id: "f-runner",
    routed: "the config names a custom test runner, code that may write a collected task's retry (gate finding F5, probe P23)",
    shape: { test: ', runner: "./runner.ts"', files: { "runner.ts": "export default class Runner {}\n" } },
    routes: ["tier-unread"],
    detail: "vitest.config.ts sets test.runner",
  },
  {
    id: "f-globals",
    routed: "the config turns on globals, so a case may register through a global it the static read does not resolve",
    shape: { test: ", globals: true" },
    routes: ["tier-unread"],
    detail: "vitest.config.ts sets test.globals",
  },
  {
    id: "f-plugins",
    routed: "the config carries vite plugins, code that may transform a test module to add retry before vitest collects it",
    shape: { config: 'import { defineConfig } from "vitest/config";\n\nexport default defineConfig({ plugins: [], test: { include: ["test/**/*.test.ts"] } });\n' },
    routes: ["tier-unread"],
    detail: "vitest.config.ts sets plugins",
  },
  {
    id: "f-resolve-alias",
    routed: "the config aliases a module (resolve.alias), so an import of vitest may reach a shim that registers with retry",
    shape: { config: 'import { defineConfig } from "vitest/config";\n\nexport default defineConfig({ resolve: { alias: { shim: "./test/shim.ts" } }, test: { include: ["test/**/*.test.ts"] } });\n' },
    routes: ["tier-unread"],
    detail: "vitest.config.ts sets resolve.alias",
  },
  {
    id: "f-pool",
    routed: "the config names a pool outside forks / threads, another realm or a pool module the census does not read",
    shape: { test: ', pool: "vmThreads"' },
    routes: ["tier-unread"],
    detail: 'vitest.config.ts sets test.pool to "vmThreads"',
  },
  {
    id: "f-config-code",
    routed: "a config value is code (a call), evaluated in the main process when vitest loads the config",
    shape: { test: ', testTimeout: Number("5000")' },
    routes: ["tier-unread"],
    detail: "vitest.config.ts sets test.testTimeout to a call",
  },
  {
    id: "f-config-statement",
    routed: "the config module holds a statement besides its imports and its default export, code that runs before the workers spawn",
    shape: { config: 'import { defineConfig } from "vitest/config";\n\nprocess.env.RETRY_FALSIFIER = "1";\n\nexport default defineConfig({ test: { include: ["test/**/*.test.ts"] } });\n' },
    routes: ["tier-unread"],
    detail: "holds a statement besides its imports and its default export",
  },
  {
    id: "f-config-function",
    routed: "the config default-exports a function (defineConfig(() => ...)), whose returned options the census cannot read statically",
    shape: { config: 'import { defineConfig } from "vitest/config";\n\nexport default defineConfig(() => ({ test: { include: ["test/**/*.test.ts"] } }));\n' },
    routes: ["tier-unread"],
    detail: "default-exports no object literal",
  },
  {
    id: "f-config-unresolvable",
    routed: "the tier's config does not parse, so vitest itself cannot resolve it",
    shape: { config: 'import { defineConfig } from "vitest/config";\n\nexport default defineConfig({ test: { include: ["test/**/*.test.ts"] }\n' },
    routes: ["tier-unread"],
    detail: "vitest cannot resolve the tier's config",
  },
  // ---- the tier's vitest flags, read through a closed list (the resolved config is the config file and the flags) ----
  { id: "f-cli-flag", routed: "the tier's vitest argv passes --globals, a flag outside the list the census reads", shape: { script: "vitest run --globals" }, routes: ["tier-unread"], detail: "carries --globals" },
  {
    id: "f-cli-reporter",
    routed: "the tier's vitest argv names a reporter file, code loaded in the main process",
    shape: { script: "vitest run --reporter ./reporter.ts", files: { "reporter.ts": "export default class Reporter {}\n" } },
    routes: ["tier-unread"],
    detail: 'carries --reporter "./reporter.ts"',
  },
  { id: "f-cli-expect", routed: "the tier's vitest argv passes an expect flag besides --expect.requireAssertions", shape: { script: "vitest run --expect.poll.timeout=10" }, routes: ["tier-unread"], detail: "carries --expect.poll" },
  { id: "f-cli-dashdash", routed: 'the tier\'s vitest argv passes words after "--", which the census does not read', shape: { script: "vitest run -- --retry 2" }, routes: ["tier-unread"], detail: 'carries "--"' },
  // ---- the closed reads' remaining branches: a non-string lifecycle, the CLI forms of U2 / U3, the vouch's nested config lists, vitest's own list ----
  {
    id: "f-lifecycle-nonstring",
    routed: "package.json carries a pretest that is not a string, so the census cannot read what npm runs around the hop",
    shape: { files: { "package.json": `${JSON.stringify({ name: "retry-falsifier", private: true, type: "module", scripts: { test: "vitest run", pretest: 1 } }, null, 2)}\n` } },
    routes: ["tier-unread"],
    detail: "package.json scripts.pretest is not a string",
  },
  {
    id: "f-cli-global-setup",
    routed: "the tier's vitest argv passes --globalSetup, a module that writes project.config.retry = 2 in the main process (gate probe P19's CLI form)",
    shape: { script: "vitest run --globalSetup ./global.ts", files: { "global.ts": GLOBAL_SETUP_RETRY } },
    routes: ["tier-unread"],
    detail: "carries --globalSetup",
  },
  {
    id: "f-cli-include-source",
    routed: "the tier's vitest argv passes --includeSource, adding an in-source test whose case carries retry: 2 (gate probe P12's CLI form)",
    shape: { script: "vitest run --includeSource src/flaky.ts", files: { "src/flaky.ts": IN_SOURCE_FLAKY } },
    routes: ["tier-unread"],
    detail: "carries --includeSource",
  },
  { id: "f-cli-root", routed: "the tier's vitest argv passes --root, which moves the config and the files the census reads", shape: { script: "vitest run --root ." }, routes: ["tier-unread"], detail: "carries --root" },
  { id: "f-cli-no-config", routed: "the tier's vitest argv passes --no-config, not a config file the census reads", shape: { script: "vitest run --no-config" }, routes: ["tier-unread"], detail: 'carries --no-config or --config "false"' },
  { id: "f-config-environment", routed: "the config names an environment other than node, a module that runs in the worker before the test modules", shape: { test: ', environment: "happy-dom"' }, routes: ["tier-unread"], detail: 'vitest.config.ts sets test.environment to "happy-dom"' },
  {
    id: "f-config-env",
    routed: "the config hands the workers NODE_OPTIONS through test.env, a preload that runs before any test module",
    shape: { test: ', env: { NODE_OPTIONS: "--require ./preload.cjs" }', files: { "preload.cjs": "\n" } },
    routes: ["tier-unread"],
    detail: "vitest.config.ts sets test.env.NODE_OPTIONS",
  },
  { id: "f-config-server", routed: "the config sets a test.server key besides deps", shape: { test: ', server: { sourcemap: "inline" }' }, routes: ["tier-unread"], detail: "vitest.config.ts sets test.server.sourcemap" },
  { id: "f-config-coverage", routed: "the config enables coverage, code the run loads beside the test modules", shape: { test: ", coverage: { enabled: true }" }, routes: ["tier-unread"], detail: "vitest.config.ts sets test.coverage.enabled" },
  { id: "f-config-sequence", routed: "the config sets a test.sequence key outside the vouch's list (a sequencer is code)", shape: { test: ", sequence: { groupOrder: 1 }" }, routes: ["tier-unread"], detail: "vitest.config.ts sets test.sequence.groupOrder" },
  {
    id: "f-config-spread",
    routed: "the config spreads a value into its test options, which may carry any key",
    shape: { config: 'import { defineConfig } from "vitest/config";\n\nexport default defineConfig({ test: { ...{ include: ["test/**/*.test.ts"] } } });\n' },
    routes: ["tier-unread"],
    detail: "spreads a value into test",
  },
  {
    id: "f-list-unread",
    routed: "the config defines two projects of one name, so vitest cannot list the tier's files (config-projects, and the list itself fails closed)",
    shape: { test: ', projects: [{ test: { name: "twin" } }, { test: { name: "twin" } }]' },
    routes: ["config-projects", "tier-unread"],
    detail: "vitest cannot list the tier's test files",
  },
  { id: "f-cli-parse", routed: "the tier's vitest argv passes --expect with no sub-option, which vitest's own parseCLI refuses", shape: { script: "vitest run --expect" }, routes: ["tier-unread"], detail: "vitest's parseCLI refuses the tier's argv" },
  {
    id: "f-config-call",
    routed: "the config default-exports defineConfig with a second argument, code vite evaluates when it loads the config (zero arguments: vite refuses the config first)",
    shape: { config: 'import { defineConfig } from "vitest/config";\n\nexport default defineConfig({ test: { include: ["test/**/*.test.ts"] } }, {});\n' },
    routes: ["tier-unread"],
    detail: "default-exports a call that is not defineConfig(<object literal>)",
  },
  {
    id: "f-config-two-defaults",
    routed: "the config module carries two default exports, which vite 8.2.1 loads (measured; no default export at all: vite refuses the config first)",
    shape: { config: 'import { defineConfig } from "vitest/config";\n\nexport default defineConfig({ test: { include: ["test/**/*.test.ts"] } });\nexport default defineConfig({ test: { include: ["test/**/*.test.ts"] } });\n' },
    routes: ["tier-unread"],
    detail: "has no single default export",
  },
  // ---- every nested level of the closed config read refuses what it cannot read (a spread here) at its own level ----
  {
    id: "f-config-top-spread",
    routed: "the config spreads a value into its top level, which may carry any key (plugins, resolve.alias)",
    shape: { config: 'import { defineConfig } from "vitest/config";\n\nexport default defineConfig({ ...{ test: { include: ["test/**/*.test.ts"] } } });\n' },
    routes: ["tier-unread"],
    detail: "spreads a value into the config",
  },
  {
    id: "f-config-resolve-spread",
    routed: "the config spreads a value into resolve, which may carry resolve.alias",
    shape: { config: 'import { defineConfig } from "vitest/config";\n\nexport default defineConfig({ resolve: { ...{ dedupe: [] } }, test: { include: ["test/**/*.test.ts"] } });\n' },
    routes: ["tier-unread"],
    detail: "spreads a value into resolve",
  },
  { id: "f-config-env-spread", routed: "the config spreads a value into test.env, which may carry NODE_OPTIONS", shape: { test: ', env: { ...{ RETRY_FALSIFIER: "1" } }' }, routes: ["tier-unread"], detail: "spreads a value into test.env" },
  { id: "f-config-server-spread", routed: "the config spreads a value into test.server, which may carry any server key", shape: { test: ", server: { ...{ deps: {} } }" }, routes: ["tier-unread"], detail: "spreads a value into test.server" },
  { id: "f-config-deps-spread", routed: "the config spreads a value into test.server.deps, which may carry any deps key", shape: { test: ", server: { deps: { ...{ inline: [] } } }" }, routes: ["tier-unread"], detail: "spreads a value into test.server.deps" },
  {
    id: "f-config-deps-key",
    routed: "the config sets a test.server.deps key outside the vouch's list (external, fallbackCJS, inline)",
    shape: { test: ', server: { deps: { cacheDir: "node_modules/.retry-falsifier" } }' },
    routes: ["tier-unread"],
    detail: "vitest.config.ts sets test.server.deps.cacheDir",
  },
  { id: "f-config-coverage-spread", routed: "the config spreads a value into test.coverage, which may carry enabled", shape: { test: ", coverage: { ...{ reporter: [] } }" }, routes: ["tier-unread"], detail: "spreads a value into test.coverage" },
  { id: "f-config-sequence-spread", routed: "the config spreads a value into test.sequence, which may carry a sequencer", shape: { test: ", sequence: { ...{ shuffle: false } }" }, routes: ["tier-unread"], detail: "spreads a value into test.sequence" },
  // ---- the file set is vitest's own (globTestSpecifications): its glob reads dot paths, node's globSync does not ----
  {
    id: "f-dot-path",
    routed: "a case with retry: 2 in a test file under a dot directory, which vitest's own glob (dot: true) runs and node's globSync skips",
    shape: { files: { "test/.dot/flaky.test.ts": testFile('it("flaky", { retry: 2 }, flake);') } },
    routes: ["case-options"],
  },
  // ---- U4: one falsifier per fail-closed branch the header claims (gate mutants M-CU, M-CU-ERR, M-SU, M-SETUP-UNKNOWN) ----
  {
    id: "f-collected-killed",
    routed: "a file the static read cannot bound kills its collected run before the reporter writes, so the run writes no framed report (collected-unread, the run-level branch)",
    shape: { test: ', pool: "forks"', body: 'const register = [it][0];\nregister("flaky", flake);\nif (typeof process.send === "function") process.kill(process.ppid, "SIGKILL");' },
    routes: ["collected-unread"],
    detail: "framed reports, not one",
  },
  {
    id: "f-collected-error",
    routed: "a file the static read cannot bound registers a case, then throws while vitest collects it (collected-unread, the with-error branch)",
    shape: { body: 'const register = [it][0];\nregister("flaky", flake);\nthrow new Error("the module fails while vitest collects it");' },
    routes: ["collected-unread"],
    detail: "collected the file with an error",
  },
  {
    id: "f-collected-empty",
    routed: "a file the static read cannot bound (a kept suite collector) registers no case: vitest 4.1.10 reports it as a collection error (No test found in suite), the with-error branch",
    shape: { body: 'const collector = describe("empty suite", () => {});\nvoid collector;' },
    routes: ["collected-unread"],
    detail: "No test found in suite",
  },
  {
    id: "f-collected-nocase",
    routed: "a file the static read cannot bound (a kept suite collector) declares only a todo suite: vitest 4.1.10 collects it with no case and no error, so the collected read proves nothing (collected-unread, the no-case branch)",
    shape: { body: 'const collector = describe.todo("todo suite");\nvoid collector;' },
    routes: ["collected-unread"],
    detail: "collected no case of the file",
  },
  {
    id: "f-source-unread",
    routed: "a test file vitest includes does not parse, so the static read cannot read it (source-unread)",
    shape: { files: { "test/flaky.test.ts": 'import { it } from "vitest";\n\nit("broken", () => {\n' } },
    routes: ["source-unread"],
    detail: "the file does not parse",
  },
  {
    id: "f-setup-unbounded",
    routed: "a setup file whose registration API escapes, so its registrations cannot be bounded, and the collected read collects test files only (options-unknown)",
    shape: { test: ', setupFiles: ["./test/setup.ts"]', files: { "test/setup.ts": 'import { it } from "vitest";\n\nconst register = [it][0];\nvoid register;\n' } },
    routes: ["options-unknown"],
    detail: "a setup file whose registrations the static read cannot bound",
  },
  {
    id: "f-forge-unread",
    routed: "forge.toml declares an array table the census does not read, so no tier is read at all",
    shape: { extraTiers: '\n[[build.gate.steps]]\nname = "extra"\n' },
    routes: ["tier-unread"],
    detail: "an array table",
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
  {
    id: "c-and-tools",
    routed: "the wb-zsv typing form: a compound step (&&) whose two arms each run tsc through an npm script, inline and as a table",
    shape: {
      extraTiers: 'typing = "npm run typecheck && npm run typecheck:test"\n\n[build.commands.typecheck]\ncommand = "npm run typecheck && npm run typecheck:test"\n',
      scripts: { typecheck: "tsc --noEmit", "typecheck:test": "tsc --noEmit -p tsconfig.test.json" },
    },
    routes: [],
  },
  { id: "c-quoted-and", routed: "a script tier whose && sits inside single quotes is one arm, the script it is", shape: { extraTiers: "shell = \"node -e '0 && 1'\"\n" }, routes: [] },
  {
    id: "c-and-two-configs",
    routed: "a compound step (&&) whose two arms each run vitest, under two configs over the same file: both arms read, the file counted once",
    shape: { forge: "npm run test && vitest run --config vitest.other.config.ts", files: { "vitest.other.config.ts": config("") } },
    routes: [],
  },
  {
    id: "c-lifecycle-admitted",
    routed: "the tier's npm hop has the one admitted lifecycle literal (the default tier's pretest rotation, CENSUS_LIFECYCLE_SCRIPTS), as trunk does",
    shape: { scripts: { pretest: CENSUS_LIFECYCLE_SCRIPTS[0] ?? "(no admitted lifecycle literal)" } },
    routes: [],
  },
];

/** Every route the census can name (wb-nl8.4 respin 1, R525 U4): typed against RetryRoute, so a new route without an entry here fails the type check. */
const ROUTES: Readonly<Record<RetryRoute, true>> = {
  "case-options": true,
  "suite-options": true,
  "options-unknown": true,
  "runtime-config": true,
  "config-retry": true,
  "config-tag-retry": true,
  "config-projects": true,
  "cli-retry": true,
  "tier-unread": true,
  "source-unread": true,
  "collected-retry": true,
  "collected-unread": true,
};

let scratch = "";
let base = "";
const censuses = new Map<string, Promise<RetryCensus>>();

function writeProject(id: string, shape: Shape): string {
  const write = (dir: string, entries: Readonly<Record<string, string>>): void => {
    for (const [path, text] of Object.entries(entries)) {
      mkdirSync(dirname(join(dir, path)), { recursive: true });
      writeFileSync(join(dir, path), text);
    }
  };
  write(join(base, id), shape.outer ?? {});
  const root = shape.nest === undefined ? join(base, id) : join(base, id, shape.nest);
  write(root, files(shape));
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
        if (row.detail !== undefined) expect(shown(census)).toContain(row.detail);
      },
      SLOW,
    );
  }
});

describe("retry census (wb-nl8.4 respin 1): the falsifier record is complete - every route the census can name carries a row", () => {
  it("the routes the falsifier rows exercise are exactly the routes the census can name, and every row's project is its own [route-set]", () => {
    const exercised = [...new Set(FALSIFIERS.flatMap(row => row.routes))].sort();
    expect(exercised).toEqual(Object.keys(ROUTES).sort());
    const ids = [...FALSIFIERS, ...CONTROLS].map(row => row.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
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

  it(
    "a compound step is read arm by arm, each arm resolved as its own command, the tier as the strongest of its arms (unread, vitest, script, admitted, tool) [c-and-kinds]",
    async () => {
      const tools = CONTROLS.find(control => control.id === "c-and-tools");
      const quoted = CONTROLS.find(control => control.id === "c-quoted-and");
      const mixed = FALSIFIERS.find(row => row.id === "f-and-cli");
      const unread = FALSIFIERS.find(row => row.id === "f-and-unread");
      const twice = CONTROLS.find(control => control.id === "c-and-two-configs");
      if (tools === undefined || quoted === undefined || mixed === undefined || unread === undefined || twice === undefined) {
        throw new Error("c-and-tools, c-quoted-and, f-and-cli, f-and-unread or c-and-two-configs missing");
      }
      const [toolsRead, quotedRead, mixedRead, unreadRead, twiceRead] = await Promise.all([censusOf(tools), censusOf(quoted), censusOf(mixed), censusOf(unread), censusOf(twice)]);
      const arms = (census: RetryCensus): unknown[] => census.tiers.map(tier => [tier.tier, tier.kind, tier.arms.map(arm => [arm.command, arm.kind])]);
      expect(arms(toolsRead)).toEqual([
        ["test", "vitest", [["npm run test", "vitest"]]],
        ["typing", "tool", [["npm run typecheck", "tool"], ["npm run typecheck:test", "tool"]]],
        ["typecheck", "tool", [["npm run typecheck", "tool"], ["npm run typecheck:test", "tool"]]],
      ]);
      expect(arms(quotedRead)).toEqual([
        ["test", "vitest", [["npm run test", "vitest"]]],
        ["shell", "script", [["node -e '0 && 1'", "script"]]],
      ]);
      expect(arms(mixedRead)).toEqual([["test", "vitest", [["npm run test", "vitest"], ["npm run typecheck", "tool"]]]]);
      // an unread arm is the tier's kind whatever its other arms read: the tree row's every-tier check sees it
      expect(arms(unreadRead)).toEqual([
        ["test", "vitest", [["npm run test", "vitest"]]],
        ["extra", "unread", [["npm run typecheck", "tool"], ["npm run extra", "unread"]]],
      ]);
      // the compound tier's one vitest arm carries the tier's config and its file, as a plain vitest tier does
      const config = join(base, mixed.id, "vitest.config.ts");
      expect(mixedRead.tiers[0]?.config).toBe(config);
      expect(mixedRead.tiers[0]?.arms[0]?.config).toBe(config);
      expect(mixedRead.tiers[0]?.files).toBe(1);
      expect(mixedRead.files).toContain("test/flaky.test.ts");
      // two vitest arms under two configs: each arm names its own config, the tier none, and the one file both include counts once
      expect(arms(twiceRead)).toEqual([["test", "vitest", [["npm run test", "vitest"], ["vitest run --config vitest.other.config.ts", "vitest"]]]]);
      const twiceTier = twiceRead.tiers[0];
      expect(twiceTier?.arms.map(arm => [arm.config, arm.files])).toEqual([
        [join(base, twice.id, "vitest.config.ts"), 1],
        [join(base, twice.id, "vitest.other.config.ts"), 1],
      ]);
      expect(twiceTier?.config).toBeUndefined();
      expect(twiceTier?.files).toBe(1);
      expect(twiceRead.files.filter(file => file === "test/flaky.test.ts")).toHaveLength(1);
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
