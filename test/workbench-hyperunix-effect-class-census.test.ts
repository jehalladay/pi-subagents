/**
 * wb-tz2.8 (HX-ORIGINAL-GOALS-CLOSURE-R8), standing leg: an effect-class honesty census for the hyperunix
 * capability descriptors.
 *
 * Why it exists: the reconcile decision core derives an effect-absent determination's evidence class
 * (`producerConfirmed` in src/workbench/reconcile-decision.ts) from a cited receipt's outcome plus its
 * journal binding alone; it consults no runtime licence for a complete read. That derivation is only unreachable
 * today because every registered hyperunix descriptor declares effectClass "read" (src/workbench/providers/hyperunix.ts,
 * the two registry.register descriptor literals; registered through src/workbench/native-modules.ts
 * registerNativeProviders). A hyperunix descriptor with any other effect class would reach that path silently.
 *
 * This file is the census that makes such a change loud: it enumerates the descriptors through the real
 * registration surfaces, pins that the roster is non-empty (an empty roster must fail, not pass vacuously), and
 * checks the descriptor literals in the provider source. The "on landing" reconcile unit test of the same bead is
 * out of scope here: it waits for a hyperunix write capability artifact that does not exist yet.
 *
 * Display paths added: none. This file is test-only.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { type CapabilityDescriptor, CapabilityRegistry } from "../src/workbench/capability-registry.js";
import { loadWorkbenchNative } from "../src/workbench/native-modules.js";
import { type HyperUnixReader, registerHyperUnixFind } from "../src/workbench/providers/hyperunix.js";

const HERE = dirname(fileURLToPath(import.meta.url));
const PROVIDER_SOURCE = join(HERE, "..", "src", "workbench", "providers", "hyperunix.ts");
const HYPERUNIX_PREFIX = "hyperunix.";
const MIN_ROSTER = 2;

/** A reader that is never invoked: registration only stores the descriptor. */
const CENSUS_READER: HyperUnixReader = {
  async find() {
    throw new Error("census reader: find is never invoked");
  },
  async runtime() {
    throw new Error("census reader: runtime is never invoked");
  },
  async close() {},
};

function hyperunixDescriptors(registry: CapabilityRegistry): CapabilityDescriptor[] {
  return registry
    .catalogSnapshot()
    .map(entry => entry.descriptor)
    .filter(descriptor => descriptor.id.startsWith(HYPERUNIX_PREFIX));
}

/** The violations a roster carries; an empty roster is itself a violation. */
function rosterViolations(roster: readonly CapabilityDescriptor[], minimum: number): string[] {
  const violations: string[] = [];
  if (roster.length < minimum) violations.push(`roster has ${roster.length} descriptors, expected at least ${minimum}`);
  for (const descriptor of roster) {
    if (descriptor.effectClass !== "read") violations.push(`${descriptor.id} declares effectClass ${descriptor.effectClass}`);
  }
  return violations;
}

async function nativeRoster(): Promise<CapabilityDescriptor[]> {
  const native = await loadWorkbenchNative();
  const registry = new CapabilityRegistry();
  native.registerNativeProviders(registry, process.cwd());
  return hyperunixDescriptors(registry);
}

function injectedRoster(): CapabilityDescriptor[] {
  const registry = new CapabilityRegistry();
  registerHyperUnixFind(registry, CENSUS_READER, process.cwd());
  return hyperunixDescriptors(registry);
}

interface DescriptorLiteral {
  readonly effectClass: string | undefined;
  readonly id: string | undefined;
}

function stringLiteralOf(node: ts.Expression | undefined): string | undefined {
  return node !== undefined && ts.isStringLiteralLike(node) ? node.text : undefined;
}

function propertyOf(literal: ts.ObjectLiteralExpression, name: string): ts.Expression | undefined {
  for (const property of literal.properties) {
    if (ts.isPropertyAssignment(property) && ts.isIdentifier(property.name) && property.name.text === name) return property.initializer;
  }
  return undefined;
}

/** Every `<x>.register({ descriptor: { ... } })` descriptor literal in the provider source, plus the count of effectClass properties anywhere. */
function descriptorLiterals(text: string): { literals: DescriptorLiteral[]; effectClassProperties: number } {
  const source = ts.createSourceFile("hyperunix.ts", text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const literals: DescriptorLiteral[] = [];
  let effectClassProperties = 0;
  const visit = (node: ts.Node): void => {
    if (ts.isPropertyAssignment(node) && ts.isIdentifier(node.name) && node.name.text === "effectClass") effectClassProperties += 1;
    if (ts.isCallExpression(node) && ts.isPropertyAccessExpression(node.expression) && node.expression.name.text === "register") {
      const argument = node.arguments[0];
      if (argument !== undefined && ts.isObjectLiteralExpression(argument)) {
        const descriptor = propertyOf(argument, "descriptor");
        if (descriptor !== undefined && ts.isObjectLiteralExpression(descriptor)) {
          literals.push({ effectClass: stringLiteralOf(propertyOf(descriptor, "effectClass")), id: stringLiteralOf(propertyOf(descriptor, "id")) });
        }
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return { literals, effectClassProperties };
}

describe("hyperunix effect-class census (wb-tz2.8 R8, standing leg)", () => {
  it("every descriptor registered through the native provider registration declares effectClass read", { timeout: 60_000 }, async () => {
    const roster = await nativeRoster();
    expect(roster.length).toBeGreaterThanOrEqual(1);
    expect(roster.filter(descriptor => descriptor.effectClass !== "read").map(descriptor => descriptor.id)).toEqual([]);
  });

  it("every descriptor registered through the injected-reader registration declares effectClass read", () => {
    const roster = injectedRoster();
    expect(roster.length).toBeGreaterThanOrEqual(1);
    expect(roster.filter(descriptor => descriptor.effectClass !== "read").map(descriptor => descriptor.id)).toEqual([]);
  });

  it("the combined roster is non-empty: at least two descriptors are found, and an empty roster fails", { timeout: 60_000 }, async () => {
    const roster = [...(await nativeRoster()), ...injectedRoster()];
    expect(roster.length).toBeGreaterThanOrEqual(MIN_ROSTER);
    expect(rosterViolations(roster, MIN_ROSTER)).toEqual([]);
    expect(rosterViolations([], MIN_ROSTER)).toEqual([`roster has 0 descriptors, expected at least ${MIN_ROSTER}`]);
  });

  it("the roster check names a descriptor that declares another effect class", () => {
    const [read] = injectedRoster();
    expect(read).toBeDefined();
    const flipped: CapabilityDescriptor = { ...read, effectClass: "write" };
    expect(rosterViolations([read, read], MIN_ROSTER)).toEqual([]);
    expect(rosterViolations([read, flipped], MIN_ROSTER)).toEqual(["hyperunix.find declares effectClass write"]);
  });

  it("the provider source carries at least two descriptor literals and each one is effectClass read", () => {
    const { literals, effectClassProperties } = descriptorLiterals(readFileSync(PROVIDER_SOURCE, "utf8"));
    expect(literals.length).toBeGreaterThanOrEqual(MIN_ROSTER);
    expect(literals.map(literal => literal.id)).toEqual(literals.map(() => "hyperunix.find"));
    expect(literals.map(literal => literal.effectClass)).toEqual(literals.map(() => "read"));
    // No effectClass property exists outside the register descriptor literals, so none can be missed by the scan.
    expect(effectClassProperties).toBe(literals.length);
  });

  it("the source scan reports a flipped literal and an empty source", () => {
    const real = readFileSync(PROVIDER_SOURCE, "utf8");
    const flipped = real.replace('effectClass:"read"', 'effectClass:"write"');
    expect(flipped).not.toBe(real);
    expect(descriptorLiterals(flipped).literals.map(literal => literal.effectClass)).toContain("write");
    expect(descriptorLiterals("export {};").literals).toEqual([]);
  });
});
