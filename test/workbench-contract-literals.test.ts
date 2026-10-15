/**
 * W22-I (wb-cax.8): every contract/version literal in src has exactly one carrier.
 * Spec: docs/workbench/17-packaging-and-operations.md "Versioning / distribution":
 * "Version parser language and node-provider contract independently of bundle version.
 * Changed semantics require migration notes and fixture tests."
 */
import { mkdtempSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, relative } from "node:path";
import { describe, expect, it } from "vitest";
import { ATTENTION_CONTRACT } from "../src/workbench/attention.js";
import { BEADS_WORK_CONTRACT } from "../src/workbench/beads-observer.js";
import { CONTROL_CONTRACT_VERSION } from "../src/workbench/control.js";
import { EVIDENCE_CONTRACT } from "../src/workbench/evidence-loader.js";
import { EXECUTABLE_IDENTITY_CONTRACT } from "../src/workbench/executable-identity.js";
import { FURNACE_EVIDENCE_CONTRACT } from "../src/workbench/furnace-evidence.js";
import { FURNACE_EXTERNAL_OBSERVATION_CONTRACT } from "../src/workbench/furnace-observer.js";
import { FURNACE_HOSTED_CONTRACT } from "../src/workbench/hosts/furnace-hosted.js";
import { DETACHED_CONTRACT } from "../src/workbench/hosts/local-detached.js";
import { HYPERUNIX_OBSERVATION_CONTRACT } from "../src/workbench/hyperunix-observer.js";
import { WORKFLOW_SCRIPT_SCHEMA_VERSION } from "../src/workbench/identity.js";
import { PATCH_PROPOSAL_CONTRACT } from "../src/workbench/patch-proposal.js";
import { FORGE_GATE_STATUS_CONTRACT } from "../src/workbench/providers/forge.js";
import { FURNACE_RUN_INSPECT_CONTRACT } from "../src/workbench/providers/furnace.js";
import { HYPERUNIX_FIND_CONTRACT } from "../src/workbench/providers/hyperunix.js";
import { REACTIVE_FIBER_CLI_SCHEMA, REACTIVEFIBER_RENDER_PREVIEW_CONTRACT } from "../src/workbench/providers/reactivefiber.js";
import { REACTIVEFIBER_OBSERVATION_CONTRACT } from "../src/workbench/reactivefiber-observer.js";
import { TIMELINE_CONTRACT } from "../src/workbench/timeline.js";
import { TOOL_REPLY_CONTRACT_VERSION } from "../src/workbench/tool-replies.js";
import { TOPOLOGY_CONTRACT } from "../src/workbench/topology-slice.js";
import { VALIDATE_REPLY_CONTRACT_VERSION } from "../src/workbench/validate-reply.js";
import { ACKNOWLEDGEMENT_VALUE_CONTRACT, RECONCILE_CONTRACT_VERSION } from "../src/workflow/reconcile.js";

const SRC = join(process.cwd(), "src");
/** Both quote forms; the back-reference keeps a mixed pair from matching. */
const CONTRACT_LITERAL = /(["'])([a-z][a-z0-9.-]*\/v[0-9]+)\1/g;

/** Literal -> the one src file (relative to src/) that spells it. */
const CARRIERS: Readonly<Record<string, string>> = {
  "forge.gate.status/v1": "workbench/providers/forge.ts",
  "furnace.run.inspect/v1": "workbench/providers/furnace.ts",
  "hyperunix.find/v1": "workbench/providers/hyperunix.ts",
  "reactivefiber.render.preview/v1": "workbench/providers/reactivefiber.ts",
  "reactive-fiber.cli/v1": "workbench/providers/reactivefiber.ts",
  "workbench.control/v1": "workbench/control.ts",
  "workbench.local-detached/v1": "workbench/hosts/local-detached.ts",
  "pi-workbench/v1": "index.ts",
  "workflow-script/v1": "workbench/identity.ts",
  "workbench.attention/v1": "workbench/attention.ts",
  "workbench.timeline/v1": "workbench/timeline.ts",
  "workbench.topology-slice/v1": "workbench/topology-slice.ts",
  "workbench.evidence-loader/v1": "workbench/evidence-loader.ts",
  "workbench.furnace-evidence/v1": "workbench/furnace-evidence.ts",
  "workbench.tool-reply/v1": "workbench/tool-replies.ts",
  "workbench.reconcile/v1": "workflow/reconcile.ts",
  "workbench.reconcile.acknowledgement/v1": "workflow/reconcile.ts",
  "workbench.reconcile.entry/v1": "workflow/reconcile.ts",
  "beads.work.readiness/v1": "workbench/beads-observer.ts",
  "furnace.external-observation/v1": "workbench/furnace-observer.ts",
  "workbench.hyperunix-observation/v1": "workbench/hyperunix-observer.ts",
  "workbench.reactivefiber-observation/v1": "workbench/reactivefiber-observer.ts",
  "workbench.executable-identity/v1": "workbench/executable-identity.ts",
  "workbench.furnace-hosted/v1": "workbench/hosts/furnace-hosted.ts",
  "workbench.patch-proposal/v1": "workbench/patch-proposal.ts",
  "workbench.validate-reply/v1": "workbench/validate-reply.ts",
};

/** An excluded spelling: exact file, the reason, and the literal it still spells (so a stale exclusion goes red). */
interface Exclusion { readonly file: string; readonly reason: string }
type ExclusionTable = Readonly<Record<string, Exclusion>>;

/**
 * Asserted exclusions. Every row is listed by exact path with its reason and the census asserts the file STILL spells
 * the literal, so an exclusion goes red once the file moves to the constant. A silent allowlist is not acceptable.
 * RESERVED: duplicates inside reserved (HOT) files this bead may not edit (none: src/index.ts only spells its own
 * single-occurrence interfaceVersion). FOREIGN: another tool's contract id that must stay literal (none are
 * whole-literal in src today; the RF id inside reactivefiber.ts contractSource is embedded in a larger string).
 */
const RESERVED_DUPLICATES: ExclusionTable = {};
const FOREIGN_CONTRACTS: ExclusionTable = {};
/**
 * Observer-purity exclusions (owner ruling 16:19Z R1/R2 asks for const imports in all six consumers; three of them are
 * pinned by existing guards this bead may not weaken). forge-observer.ts is reachable from the extension boot path, and
 * a value import of providers/forge.ts loads @forge/sdk there (test/workbench-boot-isolation.test.ts: "disabled
 * Workbench boot must not load @forge/sdk"). hyperunix-observer.ts must import exactly four modules
 * (test/workbench-hyperunix-observer.test.ts "H7: ... imports only its four allowed modules") and detached-observer.ts
 * may import ./hosts/local-detached.js only with `import type` (test/workbench-detached-observer.test.ts "is
 * provider-free by construction"). A value import of the provider consts would break those guards and pull the SDK
 * and host runtime into the pure adapters. Each row is asserted, never silent; delete the row in the same commit that
 * relaxes the guard and moves the file to the constant.
 */
const OBSERVER_PURITY: ExclusionTable = {
  "forge.gate.status/v1": { file: "workbench/forge-observer.ts", reason: "boot-isolation guard: a value import of providers/forge.ts loads @forge/sdk at disabled boot" },
  "hyperunix.find/v1": { file: "workbench/hyperunix-observer.ts", reason: "H7 guard pins the observer to four allowed imports" },
  "workbench.local-detached/v1": { file: "workbench/detached-observer.ts", reason: "provider-free guard requires type-only host import" },
};

function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap(name => { const path = join(dir, name); return statSync(path).isDirectory() ? sourceFiles(path) : path.endsWith(".ts") ? [path] : []; });
}
interface Occurrence { readonly literal: string; readonly where: string; readonly file: string }

/** Pure census over an injectable path -> text map (paths relative to src/), so fixtures can exercise it. */
function census(files: ReadonlyMap<string, string>): Occurrence[] {
  const found: Occurrence[] = [];
  for (const [file, text] of files) {
    text.split("\n").forEach((line, index) => {
      for (const match of line.matchAll(CONTRACT_LITERAL)) found.push({ literal: match[2], where: `src/${file}:${index + 1}`, file });
    });
  }
  return found;
}
function realTree(): Map<string, string> {
  return new Map(sourceFiles(SRC).map(path => [relative(SRC, path), readFileSync(path, "utf8")]));
}
function groupByLiteral(items: readonly Occurrence[]): Map<string, Occurrence[]> {
  const byLiteral = new Map<string, Occurrence[]>();
  for (const item of items) byLiteral.set(item.literal, [...(byLiteral.get(item.literal) ?? []), item]);
  return byLiteral;
}
/** Offenders (literal occurring other than once once the asserted-excluded file's spelling is set aside) as `literal: path:line, ...`. */
function offenders(files: ReadonlyMap<string, string>, exclusions: ExclusionTable): string[] {
  const counted = census(files).filter(item => exclusions[item.literal]?.file !== item.file);
  return [...groupByLiteral(counted).entries()]
    .filter(([, list]) => list.length !== 1)
    .map(([literal, list]) => `${literal}: ${list.map(item => item.where).join(", ")}`);
}
/** Stale exclusions: rows whose file no longer spells the literal in either quote form. */
function staleExclusions(files: ReadonlyMap<string, string>, exclusions: ExclusionTable): string[] {
  return Object.entries(exclusions)
    .filter(([literal, { file }]) => !(files.get(file) ?? "").includes(`"${literal}"`) && !(files.get(file) ?? "").includes(`'${literal}'`))
    .map(([literal, { file }]) => `${literal} in ${file}`);
}
function carrierTable(files: ReadonlyMap<string, string>, exclusions: ExclusionTable): Record<string, string> {
  const actual: Record<string, string> = {};
  for (const item of census(files)) if (exclusions[item.literal]?.file !== item.file) actual[item.literal] ??= item.file;
  return actual;
}

describe("contract literals have one carrier each", () => {
  it("every distinct contract literal, in either quote form, occurs exactly once in src (offenders reported as path:line)", () => {
    expect(offenders(realTree(), { ...RESERVED_DUPLICATES, ...FOREIGN_CONTRACTS, ...OBSERVER_PURITY })).toEqual([]);
  });

  it("the pinned table is exactly the set of literals in src, each in its one carrier file", () => {
    expect(carrierTable(realTree(), OBSERVER_PURITY)).toEqual(CARRIERS);
  });

  it("the exclusion tables are pinned exactly (empty today) and none is stale", () => {
    expect(RESERVED_DUPLICATES).toEqual({});
    expect(FOREIGN_CONTRACTS).toEqual({});
    expect(Object.keys(OBSERVER_PURITY).sort()).toEqual(["forge.gate.status/v1", "hyperunix.find/v1", "workbench.local-detached/v1"]);
    expect(staleExclusions(realTree(), { ...RESERVED_DUPLICATES, ...FOREIGN_CONTRACTS, ...OBSERVER_PURITY })).toEqual([]);
  });

  it("negative control: a fixture re-inlining a literal in either quote form is reported at exactly that path:line", () => {
    const base = new Map([["workbench/providers/hyperunix.ts", 'export const HYPERUNIX_FIND_CONTRACT = "hyperunix.find/v1";\n']]);
    expect(offenders(base, {})).toEqual([]);
    const doubled = new Map(base).set("workbench/hyperunix-observer.ts", 'import x from "y";\nconst CONTRACT = "hyperunix.find/v1";\n');
    expect(offenders(doubled, {})).toEqual(["hyperunix.find/v1: src/workbench/providers/hyperunix.ts:1, src/workbench/hyperunix-observer.ts:2"]);
    const single = new Map(base).set("workbench/other.ts", "const a = 1;\nconst b = 2;\nconst CONTRACT = 'hyperunix.find/v1';\n");
    expect(offenders(single, {})).toEqual(["hyperunix.find/v1: src/workbench/providers/hyperunix.ts:1, src/workbench/other.ts:3"]);
    const mixed = new Map([["a.ts", "const a = \"hyperunix.find/v1';\n"]]);
    expect(census(mixed)).toEqual([]);
  });

  it("an asserted exclusion suppresses exactly its literal, and goes stale when the file moves to the constant", () => {
    const files = new Map([["workbench/a.ts", 'export const A = "x.y/v1";\n'], ["workbench/reserved.ts", "const A = 'x.y/v1';\n"]]);
    const exclusions: ExclusionTable = { "x.y/v1": { file: "workbench/reserved.ts", reason: "reserved fixture file" } };
    expect(offenders(files, {})).toEqual(["x.y/v1: src/workbench/a.ts:1, src/workbench/reserved.ts:1"]);
    expect(offenders(files, exclusions)).toEqual([]);
    expect(staleExclusions(files, exclusions)).toEqual([]);
    const moved = new Map(files).set("workbench/reserved.ts", "import { A } from './a.js';\nconst B = A;\n");
    expect(staleExclusions(moved, exclusions)).toEqual(["x.y/v1 in workbench/reserved.ts"]);
  });

  it("exported constants carry the pinned values (the docs/17 fixture test)", () => {
    expect({
      FORGE_GATE_STATUS_CONTRACT, FURNACE_RUN_INSPECT_CONTRACT, HYPERUNIX_FIND_CONTRACT, REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, REACTIVE_FIBER_CLI_SCHEMA,
      CONTROL_CONTRACT_VERSION, DETACHED_CONTRACT, WORKFLOW_SCRIPT_SCHEMA_VERSION, ATTENTION_CONTRACT, TIMELINE_CONTRACT, TOPOLOGY_CONTRACT,
      EVIDENCE_CONTRACT, FURNACE_EVIDENCE_CONTRACT, TOOL_REPLY_CONTRACT_VERSION, RECONCILE_CONTRACT_VERSION, ACKNOWLEDGEMENT_VALUE_CONTRACT,
      BEADS_WORK_CONTRACT, FURNACE_EXTERNAL_OBSERVATION_CONTRACT, HYPERUNIX_OBSERVATION_CONTRACT, REACTIVEFIBER_OBSERVATION_CONTRACT,
      EXECUTABLE_IDENTITY_CONTRACT, FURNACE_HOSTED_CONTRACT, PATCH_PROPOSAL_CONTRACT, VALIDATE_REPLY_CONTRACT_VERSION,
    }).toEqual({
      FORGE_GATE_STATUS_CONTRACT: "forge.gate.status/v1",
      FURNACE_RUN_INSPECT_CONTRACT: "furnace.run.inspect/v1",
      HYPERUNIX_FIND_CONTRACT: "hyperunix.find/v1",
      REACTIVEFIBER_RENDER_PREVIEW_CONTRACT: "reactivefiber.render.preview/v1",
      REACTIVE_FIBER_CLI_SCHEMA: "reactive-fiber.cli/v1",
      CONTROL_CONTRACT_VERSION: "workbench.control/v1",
      DETACHED_CONTRACT: "workbench.local-detached/v1",
      WORKFLOW_SCRIPT_SCHEMA_VERSION: "workflow-script/v1",
      ATTENTION_CONTRACT: "workbench.attention/v1",
      TIMELINE_CONTRACT: "workbench.timeline/v1",
      TOPOLOGY_CONTRACT: "workbench.topology-slice/v1",
      EVIDENCE_CONTRACT: "workbench.evidence-loader/v1",
      FURNACE_EVIDENCE_CONTRACT: "workbench.furnace-evidence/v1",
      TOOL_REPLY_CONTRACT_VERSION: "workbench.tool-reply/v1",
      RECONCILE_CONTRACT_VERSION: "workbench.reconcile/v1",
      ACKNOWLEDGEMENT_VALUE_CONTRACT: "workbench.reconcile.acknowledgement/v1",
      BEADS_WORK_CONTRACT: "beads.work.readiness/v1",
      FURNACE_EXTERNAL_OBSERVATION_CONTRACT: "furnace.external-observation/v1",
      HYPERUNIX_OBSERVATION_CONTRACT: "workbench.hyperunix-observation/v1",
      REACTIVEFIBER_OBSERVATION_CONTRACT: "workbench.reactivefiber-observation/v1",
      EXECUTABLE_IDENTITY_CONTRACT: "workbench.executable-identity/v1",
      FURNACE_HOSTED_CONTRACT: "workbench.furnace-hosted/v1",
      PATCH_PROPOSAL_CONTRACT: "workbench.patch-proposal/v1",
      VALIDATE_REPLY_CONTRACT_VERSION: "workbench.validate-reply/v1",
    });
  });

  it("no contract literal embeds the bundle version, and the table is unchanged under a bumped temp package.json", () => {
    const version = (JSON.parse(readFileSync(join(process.cwd(), "package.json"), "utf8")) as { version: string }).version;
    for (const item of census(realTree())) expect(item.literal, item.where).not.toContain(version);
    const scratch = mkdtempSync(join(tmpdir(), "contract-literals-"));
    try {
      const copy = join(scratch, "package.json");
      const bumped = `${version.split(".").map(Number).map((part, index) => (index === 0 ? part + 90 : part)).join(".")}-bumped`;
      writeFileSync(copy, JSON.stringify({ ...(JSON.parse(readFileSync(join(process.cwd(), "package.json"), "utf8")) as object), version: bumped }));
      const bumpedVersion = (JSON.parse(readFileSync(copy, "utf8")) as { version: string }).version;
      expect(bumpedVersion).not.toBe(version);
      for (const item of census(realTree())) expect(item.literal, item.where).not.toContain(bumpedVersion);
      expect(carrierTable(realTree(), OBSERVER_PURITY)).toEqual(CARRIERS);
    } finally {
      rmSync(scratch, { recursive: true, force: true });
    }
  });
});
