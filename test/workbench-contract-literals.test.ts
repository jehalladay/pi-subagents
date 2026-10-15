/**
 * W22-I (wb-cax.8): every contract/version literal in src has exactly one carrier.
 * Spec: docs/workbench/17-packaging-and-operations.md "Versioning / distribution":
 * "Version parser language and node-provider contract independently of bundle version.
 * Changed semantics require migration notes and fixture tests."
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, it } from "vitest";
import { ATTENTION_CONTRACT } from "../src/workbench/attention.js";
import { CONTROL_CONTRACT_VERSION } from "../src/workbench/control.js";
import { EVIDENCE_CONTRACT } from "../src/workbench/evidence-loader.js";
import { FURNACE_EVIDENCE_CONTRACT } from "../src/workbench/furnace-evidence.js";
import { DETACHED_CONTRACT } from "../src/workbench/hosts/local-detached.js";
import { WORKFLOW_SCRIPT_SCHEMA_VERSION } from "../src/workbench/identity.js";
import { FORGE_GATE_STATUS_CONTRACT } from "../src/workbench/providers/forge.js";
import { FURNACE_RUN_INSPECT_CONTRACT } from "../src/workbench/providers/furnace.js";
import { HYPERUNIX_FIND_CONTRACT } from "../src/workbench/providers/hyperunix.js";
import { REACTIVE_FIBER_CLI_SCHEMA, REACTIVEFIBER_RENDER_PREVIEW_CONTRACT } from "../src/workbench/providers/reactivefiber.js";
import { TIMELINE_CONTRACT } from "../src/workbench/timeline.js";
import { TOOL_REPLY_CONTRACT_VERSION } from "../src/workbench/tool-replies.js";
import { TOPOLOGY_CONTRACT } from "../src/workbench/topology-slice.js";
import { ACKNOWLEDGEMENT_VALUE_CONTRACT, RECONCILE_CONTRACT_VERSION } from "../src/workflow/reconcile.js";

const SRC = join(process.cwd(), "src");
const CONTRACT_LITERAL = /"([a-z][a-z0-9.-]*\/v[0-9]+)"/g;

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
};

/**
 * Consumers inside reserved (HOT) files that may not be edited by this bead. Each is listed by exact path with the
 * reservation named, and the census asserts the file STILL spells the literal so the exclusion goes red once the owner
 * moves the file to the constant. (Empty: src/index.ts carries only its own single-occurrence interfaceVersion.)
 */
const RESERVED_DUPLICATES: Readonly<Record<string, { readonly file: string; readonly reservation: string }>> = {};

function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap(name => { const path = join(dir, name); return statSync(path).isDirectory() ? sourceFiles(path) : path.endsWith(".ts") ? [path] : []; });
}
interface Occurrence { readonly literal: string; readonly where: string; readonly file: string }
function occurrences(): Occurrence[] {
  const found: Occurrence[] = [];
  for (const path of sourceFiles(SRC)) {
    const file = relative(SRC, path);
    readFileSync(path, "utf8").split("\n").forEach((text, index) => {
      for (const match of text.matchAll(CONTRACT_LITERAL)) found.push({ literal: match[1], where: `src/${file}:${index + 1}`, file });
    });
  }
  return found;
}

describe("contract literals have one carrier each", () => {
  it("every distinct contract literal occurs exactly once in src (offenders reported as path:line)", () => {
    const byLiteral = new Map<string, Occurrence[]>();
    for (const item of occurrences()) byLiteral.set(item.literal, [...(byLiteral.get(item.literal) ?? []), item]);
    const offenders = [...byLiteral.entries()].filter(([literal, list]) => list.length !== 1 && !(literal in RESERVED_DUPLICATES)).map(([literal, list]) => `${literal}: ${list.map(item => item.where).join(", ")}`);
    expect(offenders).toEqual([]);
  });

  it("the pinned table is exactly the set of literals in src, each in its one carrier file", () => {
    const actual: Record<string, string> = {};
    for (const item of occurrences()) actual[item.literal] ??= item.file;
    expect(actual).toEqual(CARRIERS);
  });

  it("each reserved-file exclusion still holds the duplicated spelling (cannot go stale)", () => {
    for (const [literal, { file }] of Object.entries(RESERVED_DUPLICATES)) {
      expect(readFileSync(join(SRC, file), "utf8"), `${file} reservation for ${literal}`).toContain(`"${literal}"`);
    }
  });

  it("exported constants carry the pinned values (the docs/17 fixture test)", () => {
    expect({
      FORGE_GATE_STATUS_CONTRACT, FURNACE_RUN_INSPECT_CONTRACT, HYPERUNIX_FIND_CONTRACT, REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, REACTIVE_FIBER_CLI_SCHEMA,
      CONTROL_CONTRACT_VERSION, DETACHED_CONTRACT, WORKFLOW_SCRIPT_SCHEMA_VERSION, ATTENTION_CONTRACT, TIMELINE_CONTRACT, TOPOLOGY_CONTRACT,
      EVIDENCE_CONTRACT, FURNACE_EVIDENCE_CONTRACT, TOOL_REPLY_CONTRACT_VERSION, RECONCILE_CONTRACT_VERSION, ACKNOWLEDGEMENT_VALUE_CONTRACT,
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
    });
  });

  it("no contract literal embeds the bundle version, so a bundle bump cannot move one", () => {
    const version = (JSON.parse(readFileSync(join(process.cwd(), "package.json"), "utf8")) as { version: string }).version;
    for (const item of occurrences()) expect(item.literal, item.where).not.toContain(version);
  });
});
