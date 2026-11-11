import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

/** TW boundary tw-no-github-ci-forge-build-gate (MechanicalWorkflows-697m.2): Forge is the sole build gate.
 * A foreign CI configuration appearing at any of these paths is a boundary breach, not a convenience.
 * MechanicalWorkflows-1ptx widened the list to the default CI config paths of the common hosted and self-hosted
 * runners, in both .yml and .yaml spellings. Keep it sorted: the pin below compares the whole list. */
const FOREIGN_CI_PATHS = [
  ".buildkite", ".builds", ".circleci", ".cirrus.yml", ".drone.yaml", ".drone.yml",
  ".forgejo/workflows", ".gitea/workflows", ".github", ".gitlab-ci.yaml", ".gitlab-ci.yml",
  ".semaphore", ".tekton", ".travis.yaml", ".travis.yml", ".woodpecker", ".woodpecker.yaml",
  ".woodpecker.yml", ".zuul.yaml", "Jenkinsfile", "appveyor.yml", "azure-pipelines.yaml",
  "azure-pipelines.yml", "bitbucket-pipelines.yaml", "bitbucket-pipelines.yml", "buildkite.yml",
  "buildspec.yml",
] as const;

/** Body lines of one `[section]` of a TOML document, up to the next section header. */
function tomlSection(toml: string, name: string): string[] {
  const lines = toml.split(/\r?\n/);
  const out: string[] = [];
  let inside = false;
  for (const line of lines) {
    const header = /^\s*\[([^\]]+)\]\s*$/.exec(line);
    if (header) {
      inside = header[1] === name;
      continue;
    }
    if (inside) out.push(line);
  }
  return out;
}

/** Violations of the wiring law: Forge runs the suite. Reads what Forge actually executes (forge.toml), not a script it never runs. */
function wiringViolations(forgeToml: string, packageJson: string): string[] {
  const problems: string[] = [];
  const build = tomlSection(forgeToml, "build");
  const gateLine = build.find((l) => /^\s*gate\s*=/.test(l));
  const gateSteps = gateLine ? [...gateLine.matchAll(/"([^"]+)"/g)].map((m) => m[1]) : [];
  if (!gateSteps.includes("test")) problems.push("FORGE_GATE_MISSING: [build].gate omits the test step");
  const commands = tomlSection(forgeToml, "build.commands");
  const testLine = commands.find((l) => /^\s*test\s*=/.test(l));
  const testCommand = testLine ? /command\s*=\s*"([^"]*)"/.exec(testLine)?.[1] : undefined;
  if (testCommand !== "npm test") problems.push(`FORGE_GATE_MISSING: [build.commands].test runs ${JSON.stringify(testCommand)}, not npm test`);
  const scripts = (JSON.parse(packageJson) as { scripts?: Record<string, string> }).scripts ?? {};
  if (!/node --test scripts\/\*\.test\.ts/.test(scripts["test"] ?? "")) {
    problems.push("FORGE_GATE_MISSING: the root test script no longer runs node --test scripts/*.test.ts");
  }
  const gateScript = scripts["gate"];
  if (gateScript !== undefined && !gateScript.split("&&").map((s) => s.trim()).includes("npm test")) {
    problems.push("FORGE_GATE_MISSING: the root gate script, where present, runs npm test as a command");
  }
  return problems;
}

test("no foreign CI configuration exists: Forge stays the sole build gate", () => {
  for (const path of FOREIGN_CI_PATHS) {
    assert.equal(existsSync(join(root, path)), false, `FOREIGN_CI_CONFIG_PRESENT: ${path}`);
  }
});

test("the Forge gate is actually wired: forge.toml and the workspace manifest exist and forge.toml runs the suite", () => {
  assert.ok(existsSync(join(root, "forge.toml")), "FORGE_GATE_MISSING: forge.toml");
  assert.ok(existsSync(join(root, "forge.workspace.toml")), "FORGE_GATE_MISSING: forge.workspace.toml");
  const problems = wiringViolations(readFileSync(join(root, "forge.toml"), "utf8"), readFileSync(join(root, "package.json"), "utf8"));
  assert.deepEqual(problems, []);
});

test("the wiring law rejects four broken wirings: gate script stubbed, test step dropped, test command stubbed, forge.toml empty", () => {
  const forgeToml = readFileSync(join(root, "forge.toml"), "utf8");
  const packageJson = readFileSync(join(root, "package.json"), "utf8");
  assert.deepEqual(wiringViolations(forgeToml, packageJson), []);
  const pkg = JSON.parse(packageJson) as { scripts: Record<string, string> };
  const stubbedGate = JSON.stringify({ ...pkg, scripts: { ...pkg.scripts, gate: "echo npm test" } });
  assert.equal(wiringViolations(forgeToml, stubbedGate).length, 1, "S13 scripts.gate set to echo npm test");
  const noTestStep = forgeToml.replace(/^(gate\s*=\s*\[.*)"test",?\s*/m, "$1");
  assert.notEqual(noTestStep, forgeToml);
  assert.equal(wiringViolations(noTestStep, packageJson).length, 1, "S14 [build].gate without test");
  const stubbedTest = forgeToml.replace(/^(test\s*=\s*\{\s*command\s*=\s*)"npm test"/m, '$1"true"');
  assert.notEqual(stubbedTest, forgeToml);
  assert.equal(wiringViolations(stubbedTest, packageJson).length, 1, "S15 test command true");
  assert.equal(wiringViolations("", packageJson).length, 2, "S16 forge.toml 0 bytes");
});

test("the foreign-CI denylist itself is pinned: the whole sorted list, so a dropped or renamed path fails", () => {
  assert.deepEqual([...FOREIGN_CI_PATHS], [...FOREIGN_CI_PATHS].sort());
  assert.deepEqual([...FOREIGN_CI_PATHS], [
    ".buildkite", ".builds", ".circleci", ".cirrus.yml", ".drone.yaml", ".drone.yml",
    ".forgejo/workflows", ".gitea/workflows", ".github", ".gitlab-ci.yaml", ".gitlab-ci.yml",
    ".semaphore", ".tekton", ".travis.yaml", ".travis.yml", ".woodpecker", ".woodpecker.yaml",
    ".woodpecker.yml", ".zuul.yaml", "Jenkinsfile", "appveyor.yml", "azure-pipelines.yaml",
    "azure-pipelines.yml", "bitbucket-pipelines.yaml", "bitbucket-pipelines.yml", "buildkite.yml",
    "buildspec.yml",
  ]);
});
