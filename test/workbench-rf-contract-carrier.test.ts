/**
 * RFCLI-PERFORMANCE-MATHEMATICAL-OPTIMIZATION R2 (wb-2j3.12): the rf contractSource is one exported carrier constant whose
 * `rf@<release>` prefix states the producer release MEASURED by a stamped rf-preview live receipt, never a hand-maintained
 * literal. The receipt of record was the R8 live receipt (wb-2j3.7, forge cmd_c8fa1da3d9c4, rf 0.1.723) until the
 * wb-973.17 re-measure (SWARM-CONTEXT-GRAPH-R17, the owner's rf-pin route rule: host ahead of the pin and flagged by the
 * SCG-R12 drift guard, so the pin moves through that bead's own cut), then the wb-c7ku re-measure by the same route (installed
 * 0.1.784 ahead of the 0.1.768 pin), then the wb-jwc.4 re-measure (RFCLI-FEEDBACK-OPERATIONAL-CONVERGENCE R4, installed 0.1.845
 * ahead of the 0.1.784 pin): the receipt file is now receipts/wb-jwc.4.md. Rows: both registered reactivefiber.render.preview descriptors consume the carrier by identifier
 * (runtime and source), the carrier's release component string-equals the cli_version the receipt row of record recorded and
 * its provenance comment names that receipt id, and no other `rf@<digits>` string literal survives anywhere in src/ (the
 * wb-8l6 string-aware arm: comments never count, string tokens always do). Dependency-light: reads source text and the receipt
 * file; spawns nothing.
 */
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { CapabilityRegistry } from "../src/workbench/capability-registry.js";
import {
  REACTIVE_FIBER_CLI_SCHEMA,
  REACTIVE_FIBER_CONTRACT_SOURCE,
  registerNativeReactiveFiberRender,
  registerReactiveFiberRender,
} from "../src/workbench/providers/reactivefiber.js";

const ROOT = process.cwd();
const PROVIDER = "src/workbench/providers/reactivefiber.ts";
/** The receipt file of record: the wb-jwc.4 re-measure (receipts/wb-c7ku.md keeps the 0.1.784 history, receipts/wb-973.17.md the
 * 0.1.768 history and receipts/wb-2j3.7.md the 0.1.723 history, all append-only). */
const RECEIPT = "docs/workbench/receipts/wb-jwc.4.md";
const CARRIER_NAME = "REACTIVE_FIBER_CONTRACT_SOURCE";
const CAPABILITY = "reactivefiber.render.preview";
/** discover() lists a descriptor only under its exact discover grant (capability-registry.ts discover). */
const GRANTS = [`discover:${CAPABILITY}`];
/** A stamped receipt row is one stdout line: the marker, a space, one JSON object; the last one in the file is the row of record. */
const RECEIPT_LINE_ALL = /RF_PREVIEW_RECEIPT (\{.*\})/g;
const RECEIPT_ID = /cmd_[0-9a-f]{12}/g;
const CARRIER_SHAPE = /^rf@([0-9]+(?:\.[0-9]+)*):(.+)$/;

interface StringToken {
  readonly file: string;
  readonly text: string;
  readonly line: number;
  readonly carrierInitializer: boolean;
}

function sourceFiles(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(join(ROOT, dir), { withFileTypes: true })) {
    const rel = `${dir}/${entry.name}`;
    if (entry.isDirectory()) out.push(...sourceFiles(rel));
    else if (entry.isFile() && rel.endsWith(".ts") && !rel.endsWith(".d.ts")) out.push(rel);
  }
  return out.sort();
}

/** Every string token in `file` that starts with `rf@<digit>`, with whether it initializes the carrier declaration. String tokens are
 * string literals, no-substitution templates and the literal parts (head, middle, tail) of templates with substitutions, as the
 * wb-8l6 census counts them; comments are never tokens. */
function rfReleaseTokens(file: string): StringToken[] {
  const text = readFileSync(join(ROOT, file), "utf8");
  const source = ts.createSourceFile(file, text, ts.ScriptTarget.ES2022, true);
  const tokens: StringToken[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node) || ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node)) {
      if (/^rf@[0-9]/.test(node.text)) {
        const parent = node.parent;
        const carrierInitializer = ts.isVariableDeclaration(parent) && ts.isIdentifier(parent.name) && parent.name.text === CARRIER_NAME;
        tokens.push({ file, text: node.text, line: source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1, carrierInitializer });
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return tokens;
}

function descriptorContractSource(register: (registry: CapabilityRegistry) => void): string | undefined {
  const registry = new CapabilityRegistry();
  register(registry);
  const descriptors = registry.discover({ grants: GRANTS }).filter(descriptor => descriptor.id === CAPABILITY);
  expect(descriptors).toHaveLength(1);
  return descriptors[0]?.contractSource;
}

/** The release the newest receipt row stamped, and every receipt id the receipt file names. */
function receiptOfRecord(): { release: string; receiptIds: string[] } {
  const text = readFileSync(join(ROOT, RECEIPT), "utf8");
  // Receipts are append-only (wb-xox): the row of record is the NEWEST stamped line, the one a re-pin follows.
  const matches = [...text.matchAll(RECEIPT_LINE_ALL)];
  const match = matches.at(-1);
  if (match?.[1] === undefined) throw new Error(`${RECEIPT} carries no RF_PREVIEW_RECEIPT line`);
  const parsed: unknown = JSON.parse(match[1]);
  if (parsed === null || typeof parsed !== "object" || typeof (parsed as { cli_version?: unknown }).cli_version !== "string") {
    throw new Error(`${RECEIPT}: the receipt line carries no string cli_version`);
  }
  return { release: (parsed as { cli_version: string }).cli_version, receiptIds: [...new Set(text.match(RECEIPT_ID) ?? [])] };
}

describe("rf contractSource single carrier (wb-2j3.12, R2)", () => {
  it("R2-1: both registered descriptors expose the identical contractSource, and it is the exported carrier", () => {
    const legacy = descriptorContractSource(registry => registerReactiveFiberRender(registry, () => Promise.reject(new Error("never invoked")), ROOT));
    const native = descriptorContractSource(registry => registerNativeReactiveFiberRender(registry, ROOT));
    expect(legacy).toBe(REACTIVE_FIBER_CONTRACT_SOURCE);
    expect(native).toBe(REACTIVE_FIBER_CONTRACT_SOURCE);
    expect(legacy).toBe(native);
  });

  it("R2-2: the provider source consumes the carrier by identifier at both registrations and spells no inline contractSource literal", () => {
    const text = readFileSync(join(ROOT, PROVIDER), "utf8");
    expect(text.match(new RegExp(`contractSource:${CARRIER_NAME}\\b`, "g"))?.length).toBe(2);
    expect(text).not.toMatch(/contractSource:\s*["'`]/);
    expect(text).toMatch(new RegExp(`^export const ${CARRIER_NAME} = "rf@`, "m"));
  });

  it("R2-3: the carrier's release component string-equals the release the R8 receipt row of record stamped, over the verified schema", () => {
    const shape = CARRIER_SHAPE.exec(REACTIVE_FIBER_CONTRACT_SOURCE);
    expect(shape, `carrier ${JSON.stringify(REACTIVE_FIBER_CONTRACT_SOURCE)} is not rf@<release>:<schema ...>`).not.toBeNull();
    const [, release = "", rest = ""] = shape ?? [];
    expect(release).toBe(receiptOfRecord().release);
    expect(rest).toBe(`${REACTIVE_FIBER_CLI_SCHEMA} context.render --no-commit`);
  });

  it("R2-4: the carrier's provenance comment names the receipt id the receipt row of record carries", () => {
    const text = readFileSync(join(ROOT, PROVIDER), "utf8");
    const declaration = text.indexOf(`export const ${CARRIER_NAME} = `);
    expect(declaration).toBeGreaterThan(0);
    const commentStart = text.lastIndexOf("/**", declaration);
    expect(commentStart).toBeGreaterThanOrEqual(0);
    const comment = text.slice(commentStart, declaration);
    expect(comment).toContain("*/");
    const { receiptIds } = receiptOfRecord();
    expect(receiptIds.length).toBeGreaterThan(0);
    for (const id of receiptIds) expect(comment).toContain(id);
  });

  it("R2-5 (wb-8l6 arm): the carrier initializer is the only rf@<digits> string token anywhere in src/", () => {
    const tokens = sourceFiles("src").flatMap(rfReleaseTokens);
    const offenders = tokens.filter(token => !token.carrierInitializer).map(token => `${token.file}:${token.line} ${JSON.stringify(token.text)}`);
    expect(offenders).toEqual([]);
    expect(tokens.filter(token => token.carrierInitializer).map(token => token.file)).toEqual([PROVIDER]);
    // The retired hand-maintained literal never returns as a string token (a comment that quotes it is not a token).
    expect(tokens.some(token => token.text.startsWith("rf@0.1.583"))).toBe(false);
  });
});
