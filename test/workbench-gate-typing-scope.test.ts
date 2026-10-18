/**
 * wb-zsv (W22, owner cut under ruling R483): the complete gate's typing step covers test/**.
 *
 * forge.toml:13 `typing = "npm run typecheck && npm run typecheck:test"` is a compound string, which forge runs through
 * `bash -c`: arm 1 is package.json `typecheck` (`tsc --noEmit` over tsconfig.json: src/** with rootDir src), arm 2 is
 * `typecheck:test` (`tsc --noEmit -p tsconfig.test.json`: src/** + test/**, allowJs inference over the qa/*.mjs imports,
 * the 095b056 census method). `&&` short-circuits, so a src/ row reds the step before arm 2 runs. Until this flip the step
 * read `typing = "npm run typecheck"` and type-checked src/** only (wb-cax.7 gate F2), so test-only candidates had no gate
 * typing coverage and seats strict-checked by hand under the seat rule this landing retires (receipts/wb-zsv.md).
 *
 * Rows (red on the pre-flip forge.toml, quoted in receipts/wb-zsv.md): A pins the typing line's bytes; B resolves that line
 * through package.json to the tsconfig files it type-checks and requires one of them to include test/**; C drives the
 * resolved configs over a scratch tree holding a test/ TS2322 mutant and requires the kill, beside a tsconfig.json-only
 * control that stays green (a broken tsc cannot pass as a kill). Guards (green before and after): G1 the seven-step gate
 * line, G2 the `[build.commands.typecheck]` twin (`forge run typecheck` == the gate's typing step), G3 the typecheck scripts
 * and both tsconfig files, G4 the resolution grammar refusing anything it does not model. The grammar is deliberately
 * narrow and throws on anything else, so a respelling of the step can never pass as a widening.
 *
 * NON-CLAIM: this file reads forge.toml, package.json and the tsconfig files and runs tsc over a scratch tree; it never runs
 * forge, and how the gate host executes the compound string is the record of the owner's complete gate, not of this file.
 */
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, symlinkSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it } from "vitest";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard();

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const readRepo = (path: string): string => readFileSync(join(ROOT, path), "utf8");
/** forge.toml:13 after the flip: the typing step's command, and the whole line byte-exact (Row A). */
const TYPING_VALUE = "npm run typecheck && npm run typecheck:test";
const TYPING_LINE = `typing = "${TYPING_VALUE}"`;
/** forge.toml:9; this flip adds no step (the fifteenth sibling of the gate-literal pin). */
const GATE_LINE = 'gate = ["lint", "typing", "build", "test", "census", "workbench-shell", "package-smoke"]';
const TSC = join(ROOT, "node_modules", "typescript", "bin", "tsc");
/** The row tsc prints for the scratch mutant: cwd-relative path, line 1, column 14 (measured exit 2 under tsc 6.0.3). */
const MUTANT_ROW = /^test\/mutant\.test\.ts\(1,14\): error TS2322: /m;

interface PackageJson {
  readonly scripts?: Readonly<Partial<Record<string, string>>>;
}

interface TsConfig {
  readonly extends?: string;
  readonly compilerOptions?: Readonly<Record<string, unknown>>;
  readonly include?: readonly string[];
}

const toml = readRepo("forge.toml");
const scripts: Readonly<Partial<Record<string, string>>> = (JSON.parse(readRepo("package.json")) as PackageJson).scripts ?? {};

/** The value of forge.toml's one `typing = "..."` line, or undefined when no such line exists. */
function typingValue(text: string): string | undefined {
  return /^typing = "([^"\n]+)"$/m.exec(text)?.[1];
}

/**
 * The tsconfig files a command string type-checks: the string splits at ` && ` into `npm run <script>` words; a script is
 * either a plain `tsc --noEmit [-p <file>]` (tsconfig.json when -p is absent) or, one level down, another such chain (the
 * R483 fallback spelling, `typecheck:all`). Anything else throws, naming the word, so the rows fail closed.
 */
function resolveTscConfigs(command: string, depth = 0): string[] {
  if (depth > 1) throw new Error(`typing resolution deeper than one script chain: ${command}`);
  return command.split(" && ").flatMap((word) => {
    const npm = /^npm run ([\w:-]+)$/.exec(word);
    if (npm === null) throw new Error(`typing word outside the modelled grammar: ${word}`);
    const body = scripts[npm[1]];
    if (body === undefined) throw new Error(`package.json declares no script ${npm[1]}`);
    const tsc = /^tsc --noEmit(?: -p (\S+))?$/.exec(body);
    if (tsc !== null) {
      const file: string | undefined = tsc[1];
      return [file ?? "tsconfig.json"];
    }
    if (body.startsWith("npm run ")) return resolveTscConfigs(body, depth + 1);
    throw new Error(`scripts.${npm[1]} is neither a plain tsc --noEmit nor an npm run chain: ${body}`);
  });
}

describe("wb-zsv: the gate's typing step covers test/** (forge.toml:13 resolved through package.json to the tsconfig files)", () => {
  it("Row A: forge.toml carries exactly one typing line, and it chains typecheck with typecheck:test, byte-exact", () => {
    expect(toml.match(/^typing = /gm)).toHaveLength(1);
    expect(typingValue(toml)).toBe(TYPING_VALUE);
    expect(toml).toContain(`\n${TYPING_LINE}\n`);
  });

  it("Row B: the typing step resolves to tsconfig.json then tsconfig.test.json, and a resolved include covers test/**", () => {
    const typing = typingValue(toml);
    expect(typing).toBeDefined();
    const configs = resolveTscConfigs(typing ?? "");
    expect(configs).toEqual(["tsconfig.json", "tsconfig.test.json"]);
    const includes = configs.map((cfg) => (JSON.parse(readRepo(cfg)) as TsConfig).include ?? []);
    expect(includes.some((list) => list.includes("test/**/*.ts"))).toBe(true);
  });
});

describe("wb-zsv Row C: the gate-resolved configs kill a test/** type error on a scratch tree", () => {
  let scratch: string | undefined;
  afterEach(() => {
    removeScratch(scratch);
    scratch = undefined;
  });

  // Instrument budget, measured on this host before the cap was chosen: 0.29-0.33 s per tsc spawn over the two-file scratch
  // tree (five @types packages auto-included) at load1 23.29, three spawns per run. The cap bounds vitest's fork scheduling
  // under the full 63-worker default suite, never the measurement; the row's assertions are its only judge.
  it("tsc over the resolved configs reds the test/ TS2322 mutant through tsconfig.test.json only, never names src/ok.ts, and the tsconfig.json-only control stays green", { timeout: 20_000 }, () => {
    const typing = typingValue(toml);
    expect(typing).toBeDefined();
    const configs = resolveTscConfigs(typing ?? "");
    expect(existsSync(TSC)).toBe(true);
    const dir = makeScratch("gate-typing-scope-");
    scratch = dir;
    mkdirSync(join(dir, "src"));
    mkdirSync(join(dir, "test"));
    for (const cfg of new Set([...configs, "tsconfig.json"])) writeFileSync(join(dir, cfg), readRepo(cfg));
    symlinkSync(join(ROOT, "node_modules"), join(dir, "node_modules"), "dir");
    writeFileSync(join(dir, "src", "ok.ts"), "export const ok: number = 1;\n");
    writeFileSync(join(dir, "test", "mutant.test.ts"), 'export const bad: number = "not a number";\n');
    const tsc = (cfg: string) => spawnSync(process.execPath, [TSC, "--noEmit", "-p", join(dir, cfg)], { cwd: dir, encoding: "utf8" });
    const runs = configs.map((cfg) => ({ cfg, run: tsc(cfg) }));
    const kills = runs.filter(({ run }) => run.status !== 0 && MUTANT_ROW.test(run.stdout)).map(({ cfg }) => cfg);
    const transcript = runs.map(({ cfg, run }) => `${cfg}: exit ${run.status}\n${run.stdout}${run.stderr}`).join("\n");
    expect(kills, transcript).toEqual(["tsconfig.test.json"]);
    expect(runs.every(({ run }) => !run.stdout.includes("src/ok.ts")), transcript).toBe(true);
    // The control: tsconfig.json alone never sees test/, so it is green before and after the flip; a tsc that could not
    // type-check the scratch at all would red here instead of passing as a kill above.
    const blind = tsc("tsconfig.json");
    expect(blind.status, blind.stdout + blind.stderr).toBe(0);
    expect(blind.stdout).toBe("");
  });
});

describe("wb-zsv guards: what the flip must not move", () => {
  it("G1: the seven-step gate line is byte-identical and occurs once (this flip adds, renames and reorders no step)", () => {
    expect(toml).toContain(`${GATE_LINE}\n`);
    expect(toml.match(/^gate = /gm)).toHaveLength(1);
  });

  it("G2: the one [build.commands.typecheck] twin runs the gate's typing command verbatim, so forge run typecheck cannot diverge from the gate", () => {
    const typing = typingValue(toml);
    expect(typing).toBeDefined();
    expect(toml.match(/^\[build\.commands\.typecheck\]$/gm)).toHaveLength(1);
    expect(/^\[build\.commands\.typecheck\]\ncommand = "([^"\n]+)"$/m.exec(toml)?.[1]).toBe(typing);
  });

  it("G3: scripts.typecheck and scripts.typecheck:test, tsconfig.test.json (the 095b056 contract) and tsconfig.json's include are exact", () => {
    expect(scripts.typecheck).toBe("tsc --noEmit");
    expect(scripts["typecheck:test"]).toBe("tsc --noEmit -p tsconfig.test.json");
    const testConfig = JSON.parse(readRepo("tsconfig.test.json")) as TsConfig;
    expect(testConfig.extends).toBe("./tsconfig.json");
    expect(testConfig.include).toEqual(["src/**/*.ts", "test/**/*.ts"]);
    expect(testConfig.compilerOptions).toEqual({ rootDir: ".", noEmit: true, allowJs: true, checkJs: false });
    expect((JSON.parse(readRepo("tsconfig.json")) as TsConfig).include).toEqual(["src/**/*.ts"]);
  });

  it("G4: the resolution grammar fails closed on a bare command, an undeclared script, a non-tsc script and a two-deep chain", () => {
    expect(() => resolveTscConfigs("tsc --noEmit")).toThrow(/typing word outside the modelled grammar: tsc --noEmit/);
    expect(() => resolveTscConfigs("npm run no-such-script")).toThrow(/package.json declares no script no-such-script/);
    expect(() => resolveTscConfigs("npm run lint")).toThrow(/scripts\.lint is neither a plain tsc --noEmit nor an npm run chain/);
    expect(() => resolveTscConfigs("npm run typecheck", 2)).toThrow(/deeper than one script chain/);
    expect(resolveTscConfigs("npm run typecheck && npm run typecheck:test")).toEqual(["tsconfig.json", "tsconfig.test.json"]);
  });
});

/**
 * wb-zsv.6 (ruling R485): the npm-side developer loop matches the gate's typing scope — `check` chains lint, then both
 * gate typing arms in the gate's own order (so TYPING_VALUE is contained verbatim), then the test suite. prepublishOnly
 * STAYS src-only typecheck by the same ruling (the publish path is guarded by the seven-step complete gate), so it is
 * deliberately not pinned here.
 */
describe("wb-zsv.6 guard: npm run check carries the gate's typing scope", () => {
  it("G5: scripts.check is byte-exact and contains the gate's typing chain verbatim", () => {
    expect(scripts.check).toBe("npm run lint && npm run typecheck && npm run typecheck:test && npm run test");
    expect(scripts.check).toContain(TYPING_VALUE);
  });
});

/**
 * wb-zsv.8 (ruling R488): .github/workflows/ci.yml's build job carries the gate's typing scope — after npm ci its run
 * steps are exactly check's four scripts in check's order (lint, typecheck, typecheck:test, test), so a test-file type
 * error that reds the complete gate's typing step reds CI too. The compat jobs STAY vitest-focused per R488(2), whose
 * recorded rationale is node-version runtime intent; in the yml itself their axis is the installed Pi (floor/latest,
 * node pinned at 22 in all three jobs), so a typecheck:test arm there would be a new measurement -- test/** against
 * floor/latest Pi, which no job runs today -- that R488(2) deliberately leaves out of scope; they are not pinned here.
 */
describe("wb-zsv.8 guard: the ci.yml build job carries the typecheck:test step", () => {
  it("G6: the build job's run steps are npm ci then check's four scripts, in order", () => {
    const ci = readRepo(".github/workflows/ci.yml");
    expect(ci.match(/^ {2}build:$/gm)).toHaveLength(1);
    const body = ci.split("\n");
    const section = body.slice(body.indexOf("  build:") + 1);
    const nextJob = section.findIndex((line) => /^ {2}[\w-]+:/.test(line));
    const steps = nextJob === -1 ? section : section.slice(0, nextJob);
    const prefix = "      - run: ";
    const runs = steps.filter((line) => line.startsWith(prefix)).map((line) => line.slice(prefix.length));
    expect(runs).toEqual(["npm ci", "npm run lint", "npm run typecheck", "npm run typecheck:test", "npm run test"]);
  });
});
