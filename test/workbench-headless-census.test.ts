/**
 * wb-cax.19: headless detached-host module-graph census.
 *
 * docs/workbench/16-repository-refactor.md § "Migration acceptance": "Headless or
 * detached host doesn't require launching Pi's TUI process."
 * docs/workbench/17-packaging-and-operations.md § "Install profile": "optional
 * headless executor library/process for detached runs".
 * docs/workbench/11-designer-and-operator.md § "Pi remains the intelligence":
 * "These services must also be usable without TUI to support tests and optional
 * detached hosting."
 *
 * The receipt builder is pure and is exercised here over fixture closures (H1-H3);
 * the runner is exercised over the built dist, including a deliberate UI-import
 * mutant (H4). Measurement only: nothing under src/ is touched or mocked.
 */
import { spawnSync } from "node:child_process";
import { cpSync, existsSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { describe, expect, it } from "vitest";
import {
  buildReceipt,
  CENSUS_SCHEMA,
  EXPECTED_PI_CLOSURE,
  EXPECTED_PI_TRANSITIVE,
  EXPECTED_UI_MODULES,
  exitCodeFor,
} from "../qa/workbench/headless-census-receipt.mjs";

interface PiPackage {
  name: string;
  direct: boolean;
  importers: string[];
  chain: string[];
}
interface Finding {
  rule: string;
  module: string;
  chain: string[];
}
interface Receipt {
  schema: string;
  utc: string;
  revision: string;
  node: string;
  closure: string[];
  packageChains: Record<string, string[]>;
  piPackages: PiPackage[];
  uiModules: Array<{ module: string; chain: string[] }>;
  ttyFree: boolean;
  findings: Finding[];
  pass: boolean;
}
interface Edge {
  parent: string | null;
  url: string;
}
interface Allowlist {
  piClosure: Record<string, { via: readonly string[]; through?: string; caveat: string }>;
  piTransitive: readonly string[];
  uiModules: readonly string[];
}
interface BuildInput {
  edges: Edge[];
  entryUrl: string;
  root: string;
  ttyFree: boolean;
  utc: string;
  revision: string;
  node: string;
  allowlist?: Allowlist;
}

const build = buildReceipt as (input: BuildInput) => Receipt;
const exitFor = exitCodeFor as (receipt: Receipt) => number;

const ROOT = "file:///repo/";
const ENTRY = `${ROOT}dist/workbench/hosts/local-detached.js`;
const PI_CODING = `${ROOT}node_modules/@earendil-works/pi-coding-agent/dist/index.js`;
const PI_TUI = `${ROOT}node_modules/@earendil-works/pi-tui/dist/index.js`;
const PI_AI = `${ROOT}node_modules/@earendil-works/pi-ai/dist/index.js`;
const SAVED = `${ROOT}dist/workflow/saved.js`;
const MEMORY = `${ROOT}dist/memory.js`;
const CLAUDE_HOST = `${ROOT}dist/workbench/claude-host.js`;

const FIXTURE_ALLOWLIST: Allowlist = {
  piClosure: {
    "@earendil-works/pi-coding-agent": { via: ["dist/memory.js", "dist/workflow/saved.js"], caveat: "fixture caveat coding-agent" },
    "@earendil-works/pi-tui": { via: [], through: "@earendil-works/pi-coding-agent", caveat: "fixture caveat tui" },
  },
  piTransitive: ["@earendil-works/pi-ai"],
  uiModules: [],
};

function baseEdges(): Edge[] {
  return [
    { parent: ENTRY, url: CLAUDE_HOST },
    { parent: CLAUDE_HOST, url: SAVED },
    { parent: SAVED, url: PI_CODING },
    { parent: SAVED, url: MEMORY },
    { parent: MEMORY, url: PI_CODING },
    { parent: PI_CODING, url: PI_TUI },
    { parent: PI_CODING, url: PI_AI },
    { parent: ENTRY, url: "node:fs" },
    { parent: ENTRY, url: `${ROOT}node_modules/typescript/lib/typescript.js` },
    { parent: `${ROOT}node_modules/typescript/lib/typescript.js`, url: `${ROOT}node_modules/typescript/lib/other.js` },
  ];
}

function receiptFor(edges: Edge[], overrides: Partial<BuildInput> = {}): Receipt {
  return build({
    edges,
    entryUrl: ENTRY,
    root: ROOT,
    ttyFree: true,
    utc: "2026-10-15T00:00:00Z",
    revision: "deadbeef",
    node: "v24.0.0",
    allowlist: FIXTURE_ALLOWLIST,
    ...overrides,
  });
}

describe("headless census receipt builder (fixture closures)", () => {
  it("reduces the measured closure to sorted root-relative paths, package names and builtins (H2)", () => {
    const receipt = receiptFor(baseEdges());
    expect(receipt.schema).toBe(CENSUS_SCHEMA);
    expect(CENSUS_SCHEMA).toBe("workbench.headless-census/v1");
    expect(receipt.closure).toEqual([...receipt.closure].sort());
    expect(receipt.closure).toEqual([
      "@earendil-works/pi-ai",
      "@earendil-works/pi-coding-agent",
      "@earendil-works/pi-tui",
      "dist/memory.js",
      "dist/workbench/claude-host.js",
      "dist/workbench/hosts/local-detached.js",
      "dist/workflow/saved.js",
      "node:fs",
      "typescript",
    ]);
    expect(receipt.packageChains.typescript).toEqual(["dist/workbench/hosts/local-detached.js", "typescript"]);
    expect(receipt.utc).toBe("2026-10-15T00:00:00Z");
    expect(receipt.revision).toBe("deadbeef");
    expect(receipt.node).toBe("v24.0.0");
  });

  it("records each Pi package with its first-party importer and first import chain (H3)", () => {
    const receipt = receiptFor(baseEdges());
    const byName = Object.fromEntries(receipt.piPackages.map(entry => [entry.name, entry]));
    expect(byName["@earendil-works/pi-coding-agent"]).toEqual({
      name: "@earendil-works/pi-coding-agent",
      direct: true,
      importers: ["dist/memory.js", "dist/workflow/saved.js"],
      chain: [
        "dist/workbench/hosts/local-detached.js",
        "dist/workbench/claude-host.js",
        "dist/workflow/saved.js",
        "@earendil-works/pi-coding-agent",
      ],
    });
    expect(byName["@earendil-works/pi-tui"]).toEqual({
      name: "@earendil-works/pi-tui",
      direct: false,
      importers: [],
      chain: [
        "dist/workbench/hosts/local-detached.js",
        "dist/workbench/claude-host.js",
        "dist/workflow/saved.js",
        "@earendil-works/pi-coding-agent",
        "@earendil-works/pi-tui",
      ],
    });
    expect(byName["@earendil-works/pi-ai"]?.direct).toBe(false);
    expect(byName["@earendil-works/pi-ai"]?.importers).toEqual([]);
    expect(receipt.uiModules).toEqual([]);
  });

  it("passes only when the closure matches the frozen allowlist exactly", () => {
    const receipt = receiptFor(baseEdges());
    expect(receipt.findings).toEqual([]);
    expect(receipt.pass).toBe(true);
    expect(exitFor(receipt)).toBe(0);
  });

  it("fails an unlisted direct Pi package naming the module and its chain", () => {
    const piMcp = `${ROOT}node_modules/@earendil-works/pi-mcp/dist/index.js`;
    const receipt = receiptFor([...baseEdges(), { parent: CLAUDE_HOST, url: piMcp }]);
    expect(receipt.pass).toBe(false);
    expect(exitFor(receipt)).toBe(1);
    const finding = receipt.findings.find(entry => entry.rule === "unlisted-pi-package");
    expect(finding?.module).toBe("@earendil-works/pi-mcp");
    expect(finding?.chain).toEqual([
      "dist/workbench/hosts/local-detached.js",
      "dist/workbench/claude-host.js",
      "@earendil-works/pi-mcp",
    ]);
  });

  it("fails a listed Pi package reached from an unlisted first-party importer", () => {
    const receipt = receiptFor([...baseEdges(), { parent: CLAUDE_HOST, url: PI_TUI }]);
    const finding = receipt.findings.find(entry => entry.rule === "unlisted-pi-importer");
    expect(finding?.module).toBe("@earendil-works/pi-tui");
    expect(finding?.chain).toContain("dist/workbench/claude-host.js");
    expect(receipt.pass).toBe(false);
  });

  it("fails an unlisted transitive Pi package", () => {
    const piCodemode = `${ROOT}node_modules/@earendil-works/pi-codemode/dist/index.js`;
    const receipt = receiptFor([...baseEdges(), { parent: PI_AI, url: piCodemode }]);
    const finding = receipt.findings.find(entry => entry.rule === "unlisted-pi-package");
    expect(finding?.module).toBe("@earendil-works/pi-codemode");
    expect(finding?.chain.at(-1)).toBe("@earendil-works/pi-codemode");
    expect(receipt.pass).toBe(false);
  });

  it("fails every src/ui module and src/index.js in the closure, naming module and chain", () => {
    const card = `${ROOT}dist/ui/workflow-card.js`;
    const index = `${ROOT}dist/index.js`;
    const receipt = receiptFor([...baseEdges(), { parent: CLAUDE_HOST, url: card }, { parent: SAVED, url: index }]);
    expect(receipt.uiModules.map(entry => entry.module)).toEqual(["dist/index.js", "dist/ui/workflow-card.js"]);
    expect(receipt.uiModules[1]?.chain).toEqual([
      "dist/workbench/hosts/local-detached.js",
      "dist/workbench/claude-host.js",
      "dist/ui/workflow-card.js",
    ]);
    const rules = receipt.findings.filter(entry => entry.rule === "ui-module").map(entry => entry.module);
    expect(rules).toEqual(["dist/index.js", "dist/ui/workflow-card.js"]);
    expect(receipt.pass).toBe(false);
  });

  it("fails a stale allowlist row: a caveat that no longer appears must be trimmed in the same commit", () => {
    const edges = baseEdges().filter(edge => edge.url !== PI_TUI);
    const receipt = receiptFor(edges);
    const stale = receipt.findings.find(entry => entry.rule === "stale-allowlist-row");
    expect(stale?.module).toBe("@earendil-works/pi-tui");
    expect(receipt.pass).toBe(false);
    const staleTransitive = receiptFor(baseEdges().filter(edge => edge.url !== PI_AI));
    expect(staleTransitive.findings.map(entry => `${entry.rule}:${entry.module}`)).toContain(
      "stale-allowlist-row:@earendil-works/pi-ai",
    );
  });

  it("treats an inactive tracer as red, never a pass", () => {
    const empty = receiptFor([]);
    expect(empty.pass).toBe(false);
    expect(empty.findings.map(entry => entry.rule)).toContain("tracer-not-active");
    // Edges that never reach the entry are an inactive tracer too.
    const unrelated = receiptFor([{ parent: SAVED, url: PI_CODING }]);
    expect(unrelated.findings.map(entry => entry.rule)).toContain("tracer-not-active");
    expect(unrelated.pass).toBe(false);
    expect(exitFor(empty)).toBe(1);
  });

  it("fails when the child measured a TTY on any standard stream", () => {
    const receipt = receiptFor(baseEdges(), { ttyFree: false });
    expect(receipt.ttyFree).toBe(false);
    expect(receipt.findings.map(entry => entry.rule)).toContain("tty-attached");
    expect(receipt.pass).toBe(false);
  });

  it("uses the frozen default allowlist when none is injected", () => {
    const receipt = build({ edges: baseEdges(), entryUrl: ENTRY, root: ROOT, ttyFree: true, utc: "u", revision: "r", node: "n" });
    expect(receipt.pass).toBe(false);
    expect(receipt.findings.map(entry => entry.rule)).toContain("stale-allowlist-row");
  });
});

describe("frozen allowlist (H3)", () => {
  it("pins pi-coding-agent via memory.js and saved.js and pi-tui through pi-coding-agent, with the caveat text", () => {
    expect(Object.isFrozen(EXPECTED_PI_CLOSURE)).toBe(true);
    expect(Object.keys(EXPECTED_PI_CLOSURE)).toEqual(["@earendil-works/pi-coding-agent", "@earendil-works/pi-tui"]);
    const coding = EXPECTED_PI_CLOSURE["@earendil-works/pi-coding-agent"];
    const tui = EXPECTED_PI_CLOSURE["@earendil-works/pi-tui"];
    expect(coding.via).toEqual(["dist/memory.js", "dist/workflow/saved.js"]);
    expect(tui.via).toEqual([]);
    expect(tui.through).toBe("@earendil-works/pi-coding-agent");
    expect(Object.isFrozen(coding)).toBe(true);
    expect(Object.isFrozen(coding.via)).toBe(true);
    for (const entry of [coding, tui]) {
      expect(entry.caveat).toMatch(/headless boot currently loads/);
    }
    expect(Object.isFrozen(EXPECTED_PI_TRANSITIVE)).toBe(true);
    expect(EXPECTED_PI_TRANSITIVE).toEqual([
      "@earendil-works/pi-agent-core",
      "@earendil-works/pi-ai",
      "@earendil-works/pi-codemode",
      "@earendil-works/pi-mcp",
    ]);
    expect(EXPECTED_PI_TRANSITIVE.some(name => name in EXPECTED_PI_CLOSURE)).toBe(false);
    expect(Object.isFrozen(EXPECTED_UI_MODULES)).toBe(true);
    expect(EXPECTED_UI_MODULES).toEqual([]);
  });
});

describe("headless census runner over the built dist (H1, H4, H5)", () => {
  const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
  const runner = join(packageRoot, "qa/workbench/headless-host-census.mjs");
  const built = existsSync(join(packageRoot, "dist/workbench/hosts/local-detached.js"));

  function runCensus(distRoot: string) {
    const child = spawnSync(process.execPath, [runner, "--dist-root", distRoot], {
      cwd: packageRoot,
      encoding: "utf8",
      maxBuffer: 64 * 1024 * 1024,
      env: { ...process.env, PI_CODING_AGENT_DIR: "/nonexistent-pi-agent-dir" },
    });
    let receipt: Receipt | undefined;
    try {
      receipt = JSON.parse(child.stdout) as Receipt;
    } catch {
      receipt = undefined;
    }
    return { status: child.status, stderr: child.stderr, receipt };
  }

  it.skipIf(!built)("boots TTY-free, traces a real closure and matches the frozen allowlist", { timeout: 120_000 }, () => {
    const { status, stderr, receipt } = runCensus(packageRoot);
    expect(stderr).not.toMatch(/tracer not active/);
    expect(receipt?.schema).toBe(CENSUS_SCHEMA);
    expect(receipt?.ttyFree).toBe(true);
    expect(receipt?.closure.length ?? 0).toBeGreaterThan(50);
    expect(receipt?.closure).toContain("dist/workbench/hosts/local-detached.js");
    expect(receipt?.uiModules).toEqual([]);
    expect(receipt?.piPackages.filter(entry => entry.direct).map(entry => entry.name)).toEqual(["@earendil-works/pi-coding-agent"]);
    expect(receipt?.piPackages.map(entry => entry.name)).toEqual([...Object.keys(EXPECTED_PI_CLOSURE), ...EXPECTED_PI_TRANSITIVE].sort());
    expect(receipt?.findings).toEqual([]);
    expect(receipt?.pass).toBe(true);
    expect(status).toBe(0);
  });

  it.skipIf(!built)("goes red naming src/ui/workflow-card.js when the detached host imports a UI module (mutant)", { timeout: 180_000 }, () => {
    const scratch = mkdtempSync(join(tmpdir(), "hc."));
    try {
      cpSync(join(packageRoot, "dist"), join(scratch, "dist"), { recursive: true });
      cpSync(join(packageRoot, "package.json"), join(scratch, "package.json"));
      symlinkSync(join(packageRoot, "node_modules"), join(scratch, "node_modules"), "dir");
      const hostFile = join(scratch, "dist/workbench/hosts/local-detached.js");
      writeFileSync(hostFile, `import "../../ui/workflow-card.js";\n${readFileSync(hostFile, "utf8")}`);
      const { status, receipt } = runCensus(scratch);
      expect(status).toBe(1);
      expect(receipt?.pass).toBe(false);
      expect(receipt?.uiModules.map(entry => entry.module)).toContain("dist/ui/workflow-card.js");
      const finding = receipt?.findings.find(entry => entry.rule === "ui-module" && entry.module === "dist/ui/workflow-card.js");
      expect(finding?.chain).toEqual(["dist/workbench/hosts/local-detached.js", "dist/ui/workflow-card.js"]);
    } finally {
      rmSync(scratch, { recursive: true, force: true });
    }
  });

  it("is measurement-only: never launches a session, a socket or a detached host process", () => {
    for (const file of ["headless-host-census.mjs", "headless-census-child.mjs", "headless-census-receipt.mjs"]) {
      const text = readFileSync(join(packageRoot, "qa/workbench", file), "utf8");
      expect(text).not.toMatch(/launchDetachedWorkflow|startDetachedHost|createServer|createConnection|createAgentSession/);
    }
    expect(pathToFileURL(runner).href).toContain("headless-host-census.mjs");
  });

  it("adds one Forge command, additive and outside the default gate", () => {
    const toml = readFileSync(join(packageRoot, "forge.toml"), "utf8");
    expect(toml).toContain("[build.commands.headless-host-census]");
    expect(toml).toContain('command = "node qa/workbench/headless-host-census.mjs"');
    const gate = /^gate = (\[[^\]]*\])/m.exec(toml)?.[1] ?? "";
    expect(gate).not.toContain("headless-host-census");
  });
});
