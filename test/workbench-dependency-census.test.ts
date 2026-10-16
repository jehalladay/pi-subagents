/**
 * wb-cax.20 (W22): measured dependency and SDK version census, with a drift guard against the recorded census and a
 * declaration check against the owner's docs/17 table.
 *
 * Spec lines pinned:
 *   docs/workbench/17-packaging-and-operations.md "## Release checklist" item 4: "Exact supported Python/TS/SDK
 *   dependency versions listed." The owner-authored docs/17 table is the declaration; this census is only the
 *   MEASUREMENT of which version is pinned where, and it never states a support claim of its own.
 *   docs/17 table preamble: "the measured census and its drift guard are wb-cax.20's receipt, which compares the live
 *   pins against this table and goes red when they diverge."
 *   docs/17 table policy: "a drift found by wb-cax.20's guard is a defect in whichever side moved without the other."
 *   docs/workbench/14-qa-and-benchmarks.md "## Truth labels and release gates": "Pin dependencies, lockfile and
 *   package exports."
 *   Owner binding on the bead: census + drift guard over package.json engines, dependency pins, lockfile root engines
 *   and node --version; the table is the declaration, the receipt is the measurement.
 *
 * Two guards, both naming the row: (1) the live census against the committed fixture (a pin, a lock resolution, lock
 * integrity, a vendored tarball or a declared value that moved); (2) every docs/17 declaration against the live row it
 * binds, so a regenerated fixture can never bless a divergence from the table. Falsifiers run against throwaway copies
 * of package.json, package-lock.json, vendor/ and docs/17, never against the real tree.
 */
import { spawnSync } from "node:child_process";
import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import {
  buildReceipt,
  CENSUS_CONTRACT,
  CensusError,
  compareCensus,
  compareDeclarations,
  computeCensus,
  DOCS_17,
  evaluateDeclarations,
  formatDeclarationDrift,
  formatDrift,
  recordCensus,
} from "../qa/workbench/dependency-census.mjs";
import { type NonRepoScratch, nonRepoScratch } from "./helpers/non-repo-scratch.js";

interface CensusRow {
  id: string;
  kind: string;
  name: string;
  status: "measured" | "unknown";
  version?: string;
  integrity?: string;
  lockIntegrity?: string;
  integrityMatchesLock?: boolean;
  matchesVendorLock?: boolean;
  checks?: string[];
  source: string;
  at?: string;
  label?: string;
  reason?: string;
}

interface Census {
  contract: string;
  rows: CensusRow[];
}

interface Drift {
  row: string;
  field: string;
  recorded: unknown;
  live: unknown;
}

interface DeclarationCheck {
  row: string;
  check: string;
  declared?: string;
  live?: string;
  holds: boolean;
  reason?: string;
}

interface Receipt extends Census {
  revision: string;
  declarationChecks: DeclarationCheck[];
}

const ROOT = resolve(import.meta.dirname, "..");
const FIXTURE = join(ROOT, "test", "fixtures", "workbench-dependency-census.json");
const CLI = join(ROOT, "qa", "workbench", "dependency-census.mjs");
const recorded = (): Census => JSON.parse(readFileSync(FIXTURE, "utf8")) as Census;
const live = (root: string = ROOT, nodeVersion?: string): Census => computeCensus({ root, nodeVersion }) as Census;
const failing = (census: Census): DeclarationCheck[] => compareDeclarations(census) as DeclarationCheck[];
const row = (census: Census, id: string): CensusRow => {
  const found = census.rows.find(candidate => candidate.id === id);
  if (!found) throw new Error(`no census row ${id}`);
  return found;
};
const lineAt = (text: string, at: string): string => text.split("\n")[Number(at.slice(at.lastIndexOf(":") + 1)) - 1] ?? "";

/** Every docs/17 declaration the census binds, in table order (owner table at a0a3341). */
const DECLARED_ROWS = [
  "declared:node:floor",
  "declared:node:tested",
  "declared:typescript",
  "declared:@anthropic-ai/claude-agent-sdk",
  "declared:@forge/sdk",
  "declared:@forge/sdk:spec",
  "declared:@furnace/sdk",
  "declared:@furnace/sdk:spec",
  "declared:@hyperunix/sdk",
  "declared:@hyperunix/sdk:spec",
  "declared:peer:@earendil-works/pi-ai",
  "declared:peer:@earendil-works/pi-ai:tested",
  "declared:peer:@earendil-works/pi-coding-agent",
  "declared:peer:@earendil-works/pi-coding-agent:tested",
  "declared:peer:@earendil-works/pi-tui",
  "declared:peer:@earendil-works/pi-tui:tested",
  "declared:dev:vitest",
  "declared:dev:@biomejs/biome",
];
/** The row each binding reports when its docs/17 table row cannot be read. */
const BINDING_ROWS = [
  "declared:node",
  "declared:typescript",
  "declared:@anthropic-ai/claude-agent-sdk",
  "declared:@forge/sdk",
  "declared:@furnace/sdk",
  "declared:@hyperunix/sdk",
  "declared:peer",
  "declared:dev",
];

const scratch: NonRepoScratch[] = [];
/** Copy every file the census reads into `dir`. */
function copyInputs(dir: string): string {
  for (const file of ["package.json", "package-lock.json", DOCS_17]) {
    mkdirSync(dirname(join(dir, file)), { recursive: true });
    cpSync(join(ROOT, file), join(dir, file));
  }
  cpSync(join(ROOT, "vendor"), join(dir, "vendor"), { recursive: true });
  return dir;
}
/** A fresh scratch directory outside any git repository (the trunk non-repo scratch helper). */
function freshScratch(): string {
  const allocated = nonRepoScratch("wbc-");
  scratch.push(allocated);
  return allocated.dir;
}
/** A throwaway copy of every file the census reads. */
function copyTree(): string {
  return copyInputs(freshScratch());
}
/** Replace the first occurrence of `from` in a copied file; a mutant that does not apply fails the test. */
function mutate(dir: string, file: string, from: string, to: string): void {
  const path = join(dir, file);
  const text = readFileSync(path, "utf8");
  expect(text, `${file} must contain the text this falsifier mutates`).toContain(from);
  writeFileSync(path, text.replace(from, to));
}
afterEach(() => {
  // Newest first, so each dispose restores the GIT_CEILING_DIRECTORIES value its own allocation saw.
  for (const allocated of scratch.splice(0).reverse()) allocated.dispose();
});
/** Fixture git calls never run the host's hooks or signing, and always carry an identity. */
const GIT_ISOLATION = [
  "-c",
  "core.hooksPath=/dev/null",
  "-c",
  "commit.gpgsign=false",
  "-c",
  "user.name=census",
  "-c",
  "user.email=census@example.invalid",
];
const git = (cwd: string, ...args: string[]): void => {
  const result = spawnSync("git", [...GIT_ISOLATION, ...args], { cwd, encoding: "utf8" });
  expect(result.status, `git ${args.join(" ")}: ${result.stderr}`).toBe(0);
};
const receiptRevision = (root: string): string => {
  const result = spawnSync(process.execPath, [CLI, "--receipt", "--root", root], { encoding: "utf8" });
  expect(result.status, result.stderr).toBe(0);
  return (JSON.parse(result.stdout) as Receipt).revision;
};

describe("wb-cax.20 dependency census", () => {
  it("emits the workbench.dependency-census/v1 contract and the fixture records it", () => {
    expect(CENSUS_CONTRACT).toBe("workbench.dependency-census/v1");
    expect(recorded().contract).toBe(CENSUS_CONTRACT);
    expect(live().contract).toBe(CENSUS_CONTRACT);
  });

  it("every row is measured-with-source or unknown-with-reason, never a defaulted value", () => {
    for (const census of [recorded(), live()]) {
      for (const entry of census.rows) {
        expect(entry.source, `row ${entry.id}: source`).toMatch(/\S/);
        if (entry.status === "measured") {
          expect(entry.version, `row ${entry.id}: measured row needs a version`).toMatch(/\S/);
          expect(entry.reason, `row ${entry.id}: measured row carries no reason`).toBeUndefined();
        } else {
          expect(entry.status, `row ${entry.id}`).toBe("unknown");
          expect(entry.reason, `row ${entry.id}: unknown row needs a reason`).toMatch(/\S{3}/);
          expect(entry.version, `row ${entry.id}: unknown row must not default a version`).toBeUndefined();
        }
      }
    }
  });

  it("drift guard: the live tree matches the recorded census", () => {
    const drifts = compareCensus(recorded(), live()) as Drift[];
    expect(drifts, formatDrift(drifts)).toEqual([]);
  });

  it("measures the tree against every docs/17 declaration and each one holds", () => {
    const census = live();
    const declared = census.rows.filter(entry => entry.kind === "declared");
    expect(declared.map(entry => entry.id)).toEqual(DECLARED_ROWS);
    for (const entry of declared) {
      expect(entry.status, `${entry.id}: ${entry.reason ?? ""}`).toBe("measured");
      expect(entry.source, entry.id).toMatch(/^docs\/workbench\/17-packaging-and-operations\.md table row "[^"]+"$/);
    }
    expect(row(census, "declared:node:floor")).toMatchObject({
      version: ">=24",
      checks: [
        "equals engines:package.json:node",
        "equals engines:package-lock.json:node",
        "equals engines:vendor/dependency-lock.json:node",
        "floor-of node:runtime",
      ],
    });
    expect(row(census, "declared:node:tested")).toMatchObject({ version: "v24.20.0", checks: [] });
    expect(row(census, "declared:typescript")).toMatchObject({
      version: "6.0.3",
      checks: ["equals pin:dependencies:typescript", "equals lock:dependencies:typescript"],
    });
    expect(row(census, "declared:@anthropic-ai/claude-agent-sdk")).toMatchObject({ version: "0.3.300" });
    for (const sdk of ["forge", "furnace", "hyperunix"]) {
      expect(row(census, `declared:@${sdk}/sdk`)).toMatchObject({
        version: "0.1.0",
        checks: [`equals lock:dependencies:@${sdk}/sdk`, `equals vendor:${sdk}-sdk-0.1.0.tgz`],
      });
      expect(row(census, `declared:@${sdk}/sdk:spec`)).toMatchObject({
        version: `file:vendor/${sdk}-sdk-0.1.0.tgz`,
        checks: [`equals pin:dependencies:@${sdk}/sdk`, `integrity-matches-lock vendor:${sdk}-sdk-0.1.0.tgz`],
      });
    }
    for (const peer of ["pi-ai", "pi-coding-agent", "pi-tui"]) {
      const name = `@earendil-works/${peer}`;
      expect(row(census, `declared:peer:${name}`)).toMatchObject({ version: ">=1.1.0", checks: [`equals pin:peerDependencies:${name}`] });
      expect(row(census, `declared:peer:${name}:tested`)).toMatchObject({ version: "1.1.0", checks: [`equals lock:devDependencies:${name}`] });
    }
    expect(row(census, "declared:dev:vitest")).toMatchObject({ version: "4.1.10", checks: ["equals lock:devDependencies:vitest"] });
    expect(row(census, "declared:dev:@biomejs/biome")).toMatchObject({ version: "2.4.15", checks: ["equals lock:devDependencies:@biomejs/biome"] });
    const checks = evaluateDeclarations(census) as DeclarationCheck[];
    expect(checks).toHaveLength(28);
    const failures = failing(census);
    expect(failures, formatDeclarationDrift(failures)).toEqual([]);
    expect(checks.every(check => check.holds)).toBe(true);
  });

  it("checks node --version at run against the declared floor only, never against the recorded census", () => {
    const below = live(ROOT, "v22.11.0");
    expect(row(below, "node:runtime")).toMatchObject({ status: "measured", version: "v22.11.0", label: "measured-at-run" });
    expect(compareCensus(recorded(), below)).toEqual([]);
    const failures = failing(below);
    expect(failures).toEqual([
      expect.objectContaining({ row: "declared:node:floor", check: "floor-of node:runtime", declared: ">=24", live: "v22.11.0", holds: false }),
    ]);
    expect(formatDeclarationDrift(failures)).toContain("node:runtime");
    for (const version of ["v24.0.0", "v24.20.0", "v25.1.0", "v30.0.0"]) expect(failing(live(ROOT, version)), version).toEqual([]);
    expect(failing(live(ROOT, "v23.99.99"))).toHaveLength(1);
    expect(row(live(), "node:runtime").version).toBe(process.version);
  });

  it("records package.json engines and both lockfile root engines with their sources", () => {
    const census = live();
    expect(row(census, "engines:package.json:node")).toMatchObject({
      kind: "engines",
      status: "measured",
      version: ">=24",
      source: 'package.json engines["node"]',
    });
    expect(row(census, "engines:package-lock.json:node")).toMatchObject({
      kind: "engines",
      status: "measured",
      version: ">=24",
      source: 'package-lock.json packages[""].engines["node"]',
    });
    expect(row(census, "engines:vendor/dependency-lock.json:node")).toMatchObject({
      kind: "engines",
      status: "measured",
      version: ">=24",
      source: 'vendor/dependency-lock.json packages[""].engines["node"]',
    });
    const at = row(census, "engines:package.json:node").at ?? "";
    expect(at).toMatch(/^package\.json:\d+$/);
    expect(lineAt(readFileSync(join(ROOT, "package.json"), "utf8"), at)).toContain('"node": ">=24"');
  });

  it("lists every package.json pin; the receipt carries a resolving path:line and the fixture records no line", () => {
    const manifestText = readFileSync(join(ROOT, "package.json"), "utf8");
    const manifest = JSON.parse(manifestText) as Record<string, Record<string, string> | undefined>;
    const census = live();
    const fixture = recorded();
    for (const section of ["dependencies", "devDependencies", "peerDependencies"]) {
      for (const [name, spec] of Object.entries(manifest[section] ?? {})) {
        const entry = row(census, `pin:${section}:${name}`);
        expect(entry.version, entry.id).toBe(spec);
        expect(entry.source, entry.id).toBe(`package.json ${section}[${JSON.stringify(name)}]`);
        expect(entry.at, entry.id).toMatch(/^package\.json:\d+$/);
        expect(lineAt(manifestText, entry.at ?? ""), entry.id).toContain(`${JSON.stringify(name)}: ${JSON.stringify(spec)}`);
        expect(row(fixture, entry.id).version, entry.id).toBe(spec);
      }
    }
    expect(row(census, "pin:dependencies:typescript").version).toBe("6.0.3");
    for (const entry of fixture.rows) expect(entry.at, `fixture row ${entry.id} records a volatile line`).toBeUndefined();
    const docsText = readFileSync(join(ROOT, DOCS_17), "utf8");
    for (const entry of census.rows.filter(candidate => candidate.kind === "declared")) {
      const component = /table row "([^"]+)"$/.exec(entry.source)?.[1] ?? "";
      expect(entry.at, entry.id).toMatch(/^docs\/workbench\/17-packaging-and-operations\.md:\d+$/);
      expect(lineAt(docsText, entry.at ?? "").startsWith(`| ${component} |`), `${entry.id} at ${entry.at}`).toBe(true);
    }
  });

  it("records each vendored SDK tarball with its filename version and lock integrity", () => {
    const census = recorded();
    for (const sdk of ["forge", "furnace", "hyperunix"]) {
      const entry = row(census, `vendor:${sdk}-sdk-0.1.0.tgz`);
      expect(entry.version).toBe("0.1.0");
      expect(entry.integrity).toMatch(/^sha512-/);
      expect(entry.lockIntegrity).toBe(entry.integrity);
      expect(entry.integrityMatchesLock).toBe(true);
    }
  });

  it("records both lockfiles' integrity and whether package-lock.json equals the vendored copy byte for byte", () => {
    const census = live();
    const rootLock = row(census, "lockfile:package-lock.json");
    const vendorLock = row(census, "lockfile:vendor/dependency-lock.json");
    expect(rootLock).toMatchObject({ status: "measured", version: "lockfileVersion 3", matchesVendorLock: true });
    expect(vendorLock).toMatchObject({ status: "measured", version: "lockfileVersion 3" });
    expect(rootLock.integrity).toMatch(/^sha512-/);
    expect(rootLock.integrity).toBe(vendorLock.integrity);
  });

  it("the receipt and the fixture never restate a support claim (the docs/17 table is the only declaration)", () => {
    expect(JSON.stringify(buildReceipt({ root: ROOT, revision: "abc1234" }))).not.toMatch(/supported/i);
    expect(readFileSync(FIXTURE, "utf8")).not.toMatch(/supported/i);
  });

  it("F1: a same-name tarball with different bytes goes red on the vendor row's integrity", () => {
    const dir = copyTree();
    writeFileSync(join(dir, "vendor", "forge-sdk-0.1.0.tgz"), Buffer.from("not the pinned bytes"));
    const drifts = compareCensus(recorded(), live(dir)) as Drift[];
    expect(drifts.some(d => d.row === "vendor:forge-sdk-0.1.0.tgz" && d.field === "integrity")).toBe(true);
    expect(formatDrift(drifts)).toContain("vendor:forge-sdk-0.1.0.tgz");
    expect(drifts.some(d => d.row === "vendor:furnace-sdk-0.1.0.tgz")).toBe(false);
  });

  it("F2: bumping a package.json pin without regenerating the fixture names that row", () => {
    const dir = copyTree();
    mutate(dir, "package.json", '"croner": "^10.0.1"', '"croner": "^10.0.2"');
    const drifts = compareCensus(recorded(), live(dir)) as Drift[];
    expect(drifts.map(d => d.row)).toContain("pin:dependencies:croner");
    expect(drifts.find(d => d.row === "pin:dependencies:croner")).toMatchObject({ field: "version", recorded: "^10.0.1", live: "^10.0.2" });
    expect(formatDrift(drifts)).toContain("pin:dependencies:croner");
  });

  it("F2b: a pin removed from or added to package.json is reported as a removed or added row", () => {
    const removed = copyTree();
    mutate(removed, "package.json", '    "croner": "^10.0.1",\n', "");
    const gone = compareCensus(recorded(), live(removed)) as Drift[];
    expect(gone).toContainEqual(expect.objectContaining({ row: "pin:dependencies:croner", field: "row", live: "absent" }));
    const added = copyTree();
    mutate(added, "package.json", '    "croner": "^10.0.1",\n', '    "croner": "^10.0.1",\n    "left-pad": "1.3.0",\n');
    const extra = live(added);
    expect(row(extra, "lock:dependencies:left-pad")).toMatchObject({ status: "unknown" });
    const drifts = compareCensus(recorded(), extra) as Drift[];
    expect(drifts).toContainEqual({ row: "pin:dependencies:left-pad", field: "row", recorded: "absent", live: "present" });
    expect(drifts).toContainEqual({ row: "lock:dependencies:left-pad", field: "row", recorded: "absent", live: "present" });
  });

  it("F2c: a pin or a declaration that only moved to a different line is not a divergence", () => {
    const dir = copyTree();
    mutate(dir, "package.json", '  "keywords": [', '  "keywords": [\n    "census-padding",');
    mutate(dir, DOCS_17, "## Declared support matrix", "Padding paragraph.\n\n## Declared support matrix");
    const census = live(dir, "v24.20.0");
    expect(compareCensus(recorded(), census)).toEqual([]);
    expect(failing(census)).toEqual([]);
    expect(row(census, "pin:dependencies:typescript").at).not.toBe(row(live(), "pin:dependencies:typescript").at);
  });

  it("F3: a missing dependency-lock.json is an explicit failure, never an empty pass", () => {
    const dir = copyTree();
    rmSync(join(dir, "vendor", "dependency-lock.json"));
    expect(() => live(dir)).toThrow(CensusError);
    expect(() => live(dir)).toThrow(/dependency-lock\.json/);
  });

  it("F3b: a missing package-lock.json is unknown-with-reason, drifts on its rows and breaks the floor", () => {
    const dir = copyTree();
    rmSync(join(dir, "package-lock.json"));
    const census = live(dir, "v24.20.0");
    for (const id of ["lockfile:package-lock.json", "engines:package-lock.json:node"]) {
      expect(row(census, id)).toMatchObject({ status: "unknown" });
      expect(row(census, id).reason).toMatch(/package-lock\.json/);
    }
    const drifted = (compareCensus(recorded(), census) as Drift[]).map(d => d.row);
    expect(drifted).toContain("lockfile:package-lock.json");
    expect(drifted).toContain("engines:package-lock.json:node");
    expect(failing(census)).toEqual([
      expect.objectContaining({ row: "declared:node:floor", check: "equals engines:package-lock.json:node", holds: false }),
    ]);
  });

  it("F4: an unreadable vendor dir and an empty tarball set fail explicitly", () => {
    const missing = copyTree();
    rmSync(join(missing, "vendor"), { recursive: true });
    expect(() => live(missing)).toThrow(CensusError);
    const empty = copyTree();
    for (const sdk of ["forge", "furnace", "hyperunix"]) rmSync(join(empty, "vendor", `${sdk}-sdk-0.1.0.tgz`));
    expect(() => live(empty)).toThrow(/tarball/);
  });

  it("F5: removing the engines field flips its row to unknown-with-reason, drifts on that row and breaks the floor", () => {
    const dir = copyTree();
    mutate(dir, "package.json", '  "engines": {\n    "node": ">=24"\n  },\n', "");
    const census = live(dir, "v24.20.0");
    expect(row(census, "engines:package.json:node")).toMatchObject({ status: "unknown" });
    expect(row(census, "engines:package.json:node").reason).toMatch(/engines/);
    expect((compareCensus(recorded(), census) as Drift[]).map(d => d.row)).toContain("engines:package.json:node");
    expect(failing(census)).toEqual([
      expect.objectContaining({ row: "declared:node:floor", check: "equals engines:package.json:node", holds: false }),
    ]);
  });

  it("F6: a pin moved without the table names the declared row and the live row it binds", () => {
    const dir = copyTree();
    mutate(dir, "package.json", '"typescript": "6.0.3"', '"typescript": "6.0.4"');
    const failures = failing(live(dir, "v24.20.0"));
    expect(failures).toEqual([
      expect.objectContaining({ row: "declared:typescript", check: "equals pin:dependencies:typescript", declared: "6.0.3", live: "6.0.4", holds: false }),
    ]);
    const message = formatDeclarationDrift(failures);
    expect(message).toContain("declared:typescript");
    expect(message).toContain("pin:dependencies:typescript");
  });

  it("F7: the table moved without the tree names the declared row against every row it binds", () => {
    const dir = copyTree();
    mutate(dir, DOCS_17, "declared floor `>=24`", "declared floor `>=26`");
    const census = live(dir, "v24.20.0");
    const failures = failing(census);
    expect(failures.map(check => check.check)).toEqual([
      "equals engines:package.json:node",
      "equals engines:package-lock.json:node",
      "equals engines:vendor/dependency-lock.json:node",
      "floor-of node:runtime",
    ]);
    expect(failures.every(check => check.row === "declared:node:floor" && check.declared === ">=26" && !check.holds)).toBe(true);
    expect(compareCensus(recorded(), census)).toContainEqual(
      expect.objectContaining({ row: "declared:node:floor", field: "version", recorded: ">=24", live: ">=26" }),
    );
    const retested = copyTree();
    mutate(retested, DOCS_17, "tested against the lockfile's 1.1.0", "tested against the lockfile's 1.2.0");
    expect(failing(live(retested, "v24.20.0"))).toEqual(
      ["pi-ai", "pi-coding-agent", "pi-tui"].map(peer =>
        expect.objectContaining({
          row: `declared:peer:@earendil-works/${peer}:tested`,
          check: `equals lock:devDependencies:@earendil-works/${peer}`,
          declared: "1.2.0",
          live: "1.1.0",
          holds: false,
        }),
      ),
    );
  });

  it("F8: a lockfile root engines divergence names that lockfile's engines row", () => {
    const dir = copyTree();
    const path = join(dir, "package-lock.json");
    const lock = JSON.parse(readFileSync(path, "utf8")) as { packages: Record<string, { engines?: Record<string, string> }> };
    const engines = lock.packages[""]?.engines;
    expect(engines?.node).toBe(">=24");
    if (engines) engines.node = ">=22";
    writeFileSync(path, `${JSON.stringify(lock, null, 2)}\n`);
    const census = live(dir, "v24.20.0");
    expect(failing(census)).toEqual([
      expect.objectContaining({ row: "declared:node:floor", check: "equals engines:package-lock.json:node", live: ">=22", holds: false }),
    ]);
    const drifted = (compareCensus(recorded(), census) as Drift[]).map(d => `${d.row} ${d.field}`);
    expect(drifted).toContain("engines:package-lock.json:node version");
    expect(drifted).toContain("lockfile:package-lock.json matchesVendorLock");
  });

  it("F9: a missing declaration table is an explicit divergence for every binding, never an empty pass", () => {
    const moved = copyTree();
    mutate(moved, DOCS_17, "## Declared support matrix", "## Declared matrix renamed");
    const census = live(moved, "v24.20.0");
    const failures = failing(census);
    expect(failures.map(check => check.row)).toEqual(BINDING_ROWS);
    expect(failures.every(check => !check.holds && /table/.test(check.reason ?? ""))).toBe(true);
    for (const entry of census.rows.filter(candidate => candidate.kind === "declared")) expect(entry.status, entry.id).toBe("unknown");
    const gone = copyTree();
    rmSync(join(gone, DOCS_17));
    expect(failing(live(gone, "v24.20.0")).map(check => check.row)).toEqual(BINDING_ROWS);
    const reshaped = copyTree();
    mutate(reshaped, DOCS_17, "| Component | Declared |", "| Component | Pinned |");
    const reshapedFailures = failing(live(reshaped, "v24.20.0"));
    expect(reshapedFailures.map(check => check.row)).toEqual(BINDING_ROWS);
    expect(reshapedFailures.every(check => /header/.test(check.reason ?? ""))).toBe(true);
  });

  it("F10: a table row the census has no binding for, or a renamed component, is a divergence naming the row", () => {
    const added = copyTree();
    mutate(added, DOCS_17, "| Test and lint toolchain (dev) |", "| Python | `3.12` | none |\n| Test and lint toolchain (dev) |");
    expect(failing(live(added, "v24.20.0"))).toEqual([expect.objectContaining({ row: "declared:unbound:python", holds: false })]);
    const renamed = copyTree();
    mutate(renamed, DOCS_17, "| TypeScript |", "| TypeScript compiler |");
    expect(failing(live(renamed, "v24.20.0")).map(check => check.row)).toEqual(["declared:typescript", "declared:unbound:typescript-compiler"]);
    const repeated = copyTree();
    mutate(repeated, DOCS_17, "| @anthropic-ai/claude-agent-sdk |", "| TypeScript | `6.0.4` exact | package.json dependency pin + lockfile |\n| @anthropic-ai/claude-agent-sdk |");
    expect(failing(live(repeated, "v24.20.0"))).toEqual([
      expect.objectContaining({ row: "declared:unbound:typescript", holds: false, reason: expect.stringMatching(/repeats/) }),
    ]);
  });

  it("a vendor tarball whose bytes disagree with the lock is recorded as such and breaks its checksum declaration", () => {
    const dir = copyTree();
    writeFileSync(join(dir, "vendor", "hyperunix-sdk-0.1.0.tgz"), Buffer.from("other bytes"));
    const census = live(dir, "v24.20.0");
    const entry = row(census, "vendor:hyperunix-sdk-0.1.0.tgz");
    expect(entry.integrityMatchesLock).toBe(false);
    expect(entry.integrity).not.toBe(entry.lockIntegrity);
    expect(failing(census)).toEqual([
      expect.objectContaining({ row: "declared:@hyperunix/sdk:spec", check: "integrity-matches-lock vendor:hyperunix-sdk-0.1.0.tgz", holds: false }),
    ]);
  });

  it("buildReceipt carries the revision, the rows with their lines and every declaration check; the fixture drops lines", () => {
    const receipt = buildReceipt({ root: ROOT, revision: "abc1234" }) as Receipt;
    expect(receipt.revision).toBe("abc1234");
    expect(receipt.contract).toBe(CENSUS_CONTRACT);
    expect(receipt.rows.map(entry => entry.id)).toEqual(recorded().rows.map(entry => entry.id));
    expect(receipt.declarationChecks).toEqual(evaluateDeclarations(live()));
    const projection = recordCensus(live()) as Census;
    expect(projection.contract).toBe(CENSUS_CONTRACT);
    expect(projection.rows.map(entry => entry.id)).toEqual(receipt.rows.map(entry => entry.id));
    expect(projection.rows.every(entry => entry.at === undefined)).toBe(true);
    expect(receipt.rows.some(entry => entry.at !== undefined)).toBe(true);
  });

  it("CLI --check exits 0 on the real tree and 1 naming the row on a drifted copy", () => {
    const ok = spawnSync(process.execPath, [CLI, "--check", "--root", ROOT, "--fixture", FIXTURE], { encoding: "utf8" });
    expect(ok.status, ok.stderr).toBe(0);
    const dir = copyTree();
    mutate(dir, "package.json", '"nanoid": "^5.1.16"', '"nanoid": "^5.1.17"');
    const bad = spawnSync(process.execPath, [CLI, "--check", "--root", dir, "--fixture", FIXTURE], { encoding: "utf8" });
    expect(bad.status).toBe(1);
    expect(bad.stderr).toContain("pin:dependencies:nanoid");
  });

  it("CLI: a regenerated fixture cannot bless a divergence from the docs/17 table", () => {
    const dir = copyTree();
    mutate(dir, "package.json", '"typescript": "6.0.3"', '"typescript": "6.0.4"');
    const fixture = join(dir, "census.json");
    const write = spawnSync(process.execPath, [CLI, "--write", "--root", dir, "--fixture", fixture], { encoding: "utf8" });
    expect(write.status, write.stderr).toBe(0);
    const check = spawnSync(process.execPath, [CLI, "--check", "--root", dir, "--fixture", fixture], { encoding: "utf8" });
    expect(check.status).toBe(1);
    expect(check.stderr).toContain("declared:typescript");
    expect(check.stderr).toContain("pin:dependencies:typescript");
    expect(check.stderr).not.toContain("dependency census drift");
  });

  it("CLI --receipt prints the census with the checkout revision and every declaration check", () => {
    const result = spawnSync(process.execPath, [CLI, "--receipt", "--root", ROOT], { encoding: "utf8" });
    expect(result.status, result.stderr).toBe(0);
    const receipt = JSON.parse(result.stdout) as Receipt;
    expect(receipt.contract).toBe(CENSUS_CONTRACT);
    expect(receipt.revision).toMatch(/^([0-9a-f]{40}(-dirty)?|working-tree)$/);
    expect(receipt.declarationChecks.every(check => check.holds)).toBe(true);
  });

  it("CLI --receipt stamps a revision only for a git toplevel root, never an enclosing checkout's HEAD", () => {
    const outside = copyTree();
    expect(receiptRevision(outside)).toBe("working-tree");
    const repo = freshScratch();
    git(repo, "init", "-q");
    const nested = copyInputs(join(repo, "pkg"));
    git(repo, "add", "-A");
    git(repo, "commit", "-q", "-m", "fixture");
    expect(receiptRevision(nested)).toBe("working-tree");
    const top = freshScratch();
    copyInputs(top);
    git(top, "init", "-q");
    git(top, "add", "-A");
    git(top, "commit", "-q", "-m", "fixture");
    const head = spawnSync("git", ["rev-parse", "HEAD"], { cwd: top, encoding: "utf8" }).stdout.trim();
    expect(head).toMatch(/^[0-9a-f]{40}$/);
    expect(receiptRevision(top)).toBe(head);
    writeFileSync(join(top, "untracked.txt"), "dirty\n");
    expect(receiptRevision(top)).toBe(`${head}-dirty`);
  });

  it("CLI exits 2 with a named error when the lock is missing", () => {
    const dir = copyTree();
    rmSync(join(dir, "vendor", "dependency-lock.json"));
    const result = spawnSync(process.execPath, [CLI, "--check", "--root", dir, "--fixture", FIXTURE], { encoding: "utf8" });
    expect(result.status).toBe(2);
    expect(result.stderr).toContain("dependency-lock.json");
  });
});
