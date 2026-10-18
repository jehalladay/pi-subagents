/**
 * wb-973.14 (SWARM-CONTEXT-GRAPH-R14), standing leg: until RFCLI serves the `graph.impact` leaf, Pi surfaces nothing
 * for it. The bead's second acceptance row reads: "Until then: the exit-2 -> 'unavailable' mapping
 * (reactivefiber.ts:121-128; wb-cax.5) is the only behaviour; a census asserts no Pi argv contains 'graph impact'."
 *
 * This file is that census plus the mapping pin. It does NOT cover the armed half ("any impact adapter's test - a
 * report whose class is unknown projects coverage 'unknown'..."): that waits for the served leaf, which does not
 * exist yet, so no impact adapter is added or faked here.
 *
 * Rows:
 *  1. An AST scan of every src/**.ts finds no `graph impact` argv (adjacent "graph","impact" array elements) and no
 *     `graph impact` / `graph.impact` string or template literal. The scan has a floor so it cannot pass vacuously:
 *     it must walk src and must find the live `context render` argv of the RF preview.
 *  2. The same scan reports each forbidden shape on synthetic sources, and a clean source stays clean.
 *  3. No registered native capability descriptor names the leaf.
 *  4. The mapping pin: a planned-leaf refusal (exit 2, RF_USAGE_NOT_IMPLEMENTED) from the installed rf becomes a typed
 *     `unavailable` error in exactly one spawn, with no alias retry, and the message carries only the refusal code.
 *
 * Display paths added: none. This file is test-only.
 */
import { chmodSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { afterAll, afterEach, describe, expect, it } from "vitest";
import { CapabilityRegistry } from "../src/workbench/capability-registry.js";
import { loadWorkbenchNative } from "../src/workbench/native-modules.js";
import { nativeReactiveFiberPreview } from "../src/workbench/providers/reactivefiber.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard(afterAll);

const HERE = dirname(fileURLToPath(import.meta.url));
const SRC_ROOT = join(HERE, "..", "src");
/** The src tree holds well over this many modules; fewer means the walk found nothing. */
const MIN_SRC_FILES = 50;
const FORBIDDEN_STRING = /\bgraph[\s.]+impact\b/i;

interface ScanResult {
  /** Array literals whose string elements contain "graph" immediately followed by "impact". */
  readonly impactArgv: string[];
  /** String or template literals that spell the leaf. */
  readonly impactLiterals: string[];
  /** Array literals whose string elements contain "context" immediately followed by "render". */
  readonly renderArgv: number;
}

function adjacentPair(elements: readonly string[], first: string, second: string): boolean {
  return elements.some((element, index) => element === first && elements[index + 1] === second);
}

/** Scan one module's text for the leaf in argv arrays and in string or template literals. */
function scanSource(fileName: string, text: string): ScanResult {
  const source = ts.createSourceFile(fileName, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const impactArgv: string[] = [];
  const impactLiterals: string[] = [];
  let renderArgv = 0;
  const visit = (node: ts.Node): void => {
    if (ts.isArrayLiteralExpression(node)) {
      const strings = node.elements.map(element => (ts.isStringLiteralLike(element) ? element.text : ""));
      if (adjacentPair(strings, "graph", "impact")) impactArgv.push(`${fileName}: [${strings.filter(Boolean).join(", ")}]`);
      if (adjacentPair(strings, "context", "render")) renderArgv += 1;
    }
    if (ts.isStringLiteralLike(node) && FORBIDDEN_STRING.test(node.text)) impactLiterals.push(`${fileName}: ${node.text}`);
    if (ts.isTemplateExpression(node)) {
      const parts = [node.head.text, ...node.templateSpans.map(span => span.literal.text)];
      if (FORBIDDEN_STRING.test(parts.join(" "))) impactLiterals.push(`${fileName}: ${parts.join("<expr>")}`);
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return { impactArgv, impactLiterals, renderArgv };
}

function sourceFiles(directory: string): string[] {
  const files: string[] = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...sourceFiles(path));
    else if (entry.isFile() && entry.name.endsWith(".ts")) files.push(path);
  }
  return files;
}

describe("rf graph impact census (wb-973.14 R14, standing leg)", () => {
  it("no src module spells the graph impact leaf in an argv array or a string or template literal", () => {
    const files = sourceFiles(SRC_ROOT);
    expect(files.length).toBeGreaterThanOrEqual(MIN_SRC_FILES);
    const found = files.map(file => scanSource(file.slice(SRC_ROOT.length + 1), readFileSync(file, "utf8")));
    expect(found.flatMap(result => result.impactArgv)).toEqual([]);
    expect(found.flatMap(result => result.impactLiterals)).toEqual([]);
    // Non-vacuity: the walk reached the live RF preview argv (`context render`), so the scan sees real argv arrays.
    expect(found.reduce((sum, result) => sum + result.renderArgv, 0)).toBeGreaterThanOrEqual(1);
  });

  it("the scan reports each forbidden shape and leaves a clean source clean", () => {
    const argv = scanSource("x.ts", 'spawn("rf", ["--workspace", w, "graph", "impact", "--candidate", c, "--json"]);');
    expect(argv.impactArgv).toHaveLength(1);
    expect(scanSource("x.ts", 'const cmd = "rf graph impact --json";').impactLiterals).toHaveLength(1);
    expect(scanSource("x.ts", 'const id = "graph.impact";').impactLiterals).toHaveLength(1);
    expect(scanSource("x.ts", ["const cmd = `rf graph  impact $", "{candidate}`;"].join("")).impactLiterals).toHaveLength(1);
    expect(scanSource("x.ts", 'const argv = ["context", "render", "--no-commit"];')).toEqual({ impactArgv: [], impactLiterals: [], renderArgv: 1 });
    // Not adjacent, so not the leaf: an unrelated "graph" token and an "impact" token apart.
    expect(scanSource("x.ts", 'const argv = ["graph", "show", "impact"];').impactArgv).toEqual([]);
  });

  it("no registered native capability descriptor names the graph impact leaf", { timeout: 60_000 }, async () => {
    const native = await loadWorkbenchNative();
    const registry = new CapabilityRegistry();
    native.registerNativeProviders(registry, process.cwd());
    const descriptors = registry.catalogSnapshot().map(entry => entry.descriptor);
    const rf = descriptors.filter(descriptor => descriptor.id.startsWith("reactivefiber."));
    expect(rf.length).toBeGreaterThanOrEqual(1);
    expect(descriptors.filter(descriptor => FORBIDDEN_STRING.test(JSON.stringify(descriptor))).map(descriptor => descriptor.id)).toEqual([]);
  });
});

describe("rf planned-leaf refusal mapping (wb-973.14 R14, wb-cax.5)", () => {
  const oldPath = process.env.PATH;
  const scratches: string[] = [];
  afterEach(() => {
    process.env.PATH = oldPath;
    removeScratch(...scratches.splice(0));
  });

  /** A fake `rf` that appends one JSON argv line per spawn to `log`, prints `envelope`, and exits with `code`. */
  function fakeRf(envelope: unknown, code: number): string {
    const folder = makeScratch("rf-graph-impact-census-");
    scratches.push(folder);
    const log = join(folder, "spawns.jsonl");
    const script = join(folder, "rf");
    writeFileSync(
      script,
      `#!/usr/bin/env node\nrequire("node:fs").appendFileSync(${JSON.stringify(log)}, JSON.stringify(process.argv.slice(2)) + "\\n");\nprocess.stdout.write(JSON.stringify(${JSON.stringify(envelope)}));\nprocess.exit(${code});\n`,
    );
    chmodSync(script, 0o700);
    process.env.PATH = `${folder}:${oldPath ?? ""}`;
    return log;
  }

  const refusal = {
    schema: "reactive-fiber.cli/v1",
    ok: false,
    command: "context.render",
    operation_id: `rfo_${"a".repeat(22)}`,
    workspace: null,
    transaction_id: null,
    result: null,
    diagnostics: [
      { code: "RF_USAGE_NOT_IMPLEMENTED", severity: "error", message: "planned leaf", hint: null, source: "host", metadata: {} },
    ],
  };

  it("maps an exit-2 RF_USAGE_NOT_IMPLEMENTED refusal to a typed unavailable error in exactly one spawn", async () => {
    const log = fakeRf(refusal, 2);
    await expect(nativeReactiveFiberPreview("model", "task", process.cwd())).rejects.toMatchObject({
      category: "unavailable",
      message: "RF render refused: RF_USAGE_NOT_IMPLEMENTED",
    });
    const spawns = readFileSync(log, "utf8").trim().split("\n").map(line => JSON.parse(line) as string[]);
    // No alias retry: one invocation only, and it is the read-only preview argv, never a graph impact probe.
    expect(spawns).toHaveLength(1);
    expect(spawns[0]).toContain("--no-commit");
    expect(adjacentPair(spawns[0], "graph", "impact")).toBe(false);
  });

  it("does not map the same refusal when the exit code contradicts it", async () => {
    fakeRf(refusal, 0);
    // Pin the row's own cause (wb-9bu, row 494 F3): "could not launch the installed binary" is also category transport,
    // so a category-only pin would stay green when the stand-in cannot launch.
    await expect(nativeReactiveFiberPreview("model", "task", process.cwd())).rejects.toMatchObject({
      category: "transport",
      message: "RF preview returned an unrecognized or contradictory failure envelope.",
    });
  });
});
