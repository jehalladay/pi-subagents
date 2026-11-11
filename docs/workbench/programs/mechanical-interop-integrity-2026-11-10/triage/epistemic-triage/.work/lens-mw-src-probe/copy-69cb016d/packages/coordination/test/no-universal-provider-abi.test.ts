import test from "node:test";
import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(here, "../../..");

/** TW boundary tw-no-universal-provider-abi (MechanicalWorkflows-697m.4): the adapter surface stays
 * concrete, named and typed. No generic provider/plugin registry, no string-keyed function dispatch
 * table, no method-string call gateway (README 2026-10-18 L24; L5 excludes any generic environment
 * registry, reward engine or scheduler). Typed per-capability service interfaces such as
 * CandidateReviewServices and RepairServices are the sanctioned shape and must not match. */
const SCANNED_PACKAGES = ["packages/coordination", "packages/development"] as const;

/** A declaration whose exported name claims a universal provider role. Leading whitespace is allowed (a declaration
 * nested in a namespace), and the declaration kinds cover class, interface, type, enum, namespace, const, let, var and
 * function (also default and declare exports). */
const ABI_NAME = /^\s*export (?:default )?(?:declare )?(?:(?:abstract )?class|interface|type|(?:const )?enum|namespace|const|let|var|(?:async )?function\*?) (?:\w*(?:Provider|Plugin|Registry|Scheduler|Driver)\w*)\b/;
/** A string-keyed function table: dynamic dispatch by arbitrary key instead of a named member. */
const STRING_KEYED_DISPATCH = /(?:\[\s*\w+\s*:\s*string\s*\]\s*:\s*(?:\()|Record<string,\s*\(|(?:Readonly)?Map<string,\s*\()/;
/** A call gateway that routes on a caller-chosen operation name: an exported function (optionally generic, default or
 * indented) or an exported const arrow function whose parameters carry that name typed as string. */
const METHOD_GATEWAY = /^\s*export (?:default )?(?:async )?function\*? \w+(?:<[^(]*>)?\([^)]*\b(?:method|action|op|opName|verb)\s*:\s*string|^\s*export const \w+(?::[^=]+)? = (?:async )?(?:<[^(]*>)?\([^)]*\b(?:method|action|op|opName|verb)\s*:\s*string/;

/** Every .ts file under `dir`, at any depth (a subdirectory such as src/seams/inner.ts is scanned). */
function sourcesIn(dir: string, label: string): { name: string; lines: string[] }[] {
  return (readdirSync(dir, { recursive: true }) as string[])
    .map(entry => String(entry).split("\\").join("/"))
    .filter(name => name.endsWith(".ts"))
    .sort()
    .map(name => ({ name: `${label}/${name}`, lines: readFileSync(join(dir, name), "utf8").split("\n") }));
}

function sourcesOf(member: string): { name: string; lines: string[] }[] {
  return sourcesIn(join(repoRoot, member, "src"), `${member}/src`);
}

test("no export in either core package carries a universal provider name", () => {
  for (const member of SCANNED_PACKAGES) {
    for (const { name, lines } of sourcesOf(member)) {
      lines.forEach((line, index) => {
        assert.equal(ABI_NAME.test(line), false, `PROVIDER_ABI_NAME: ${name}:${index + 1} ${line.trim()}`);
      });
    }
  }
});

test("no string-keyed function dispatch table exists in either core package", () => {
  for (const member of SCANNED_PACKAGES) {
    for (const { name, lines } of sourcesOf(member)) {
      lines.forEach((line, index) => {
        assert.equal(STRING_KEYED_DISPATCH.test(line), false, `PROVIDER_ABI_DISPATCH: ${name}:${index + 1} ${line.trim()}`);
      });
    }
  }
});

test("no exported call gateway routes on a caller-chosen operation name", () => {
  for (const member of SCANNED_PACKAGES) {
    for (const { name, lines } of sourcesOf(member)) {
      lines.forEach((line, index) => {
        assert.equal(METHOD_GATEWAY.test(line), false, `PROVIDER_ABI_GATEWAY: ${name}:${index + 1} ${line.trim()}`);
      });
    }
  }
});

test("the scan reads real sources and the sanctioned typed service seams stay visible to it", () => {
  for (const member of SCANNED_PACKAGES) {
    const sources = sourcesOf(member);
    assert.ok(sources.length > 0, `${member} has no scanned sources`);
    assert.ok(sources.every(source => source.lines.length > 0));
  }
  const names = SCANNED_PACKAGES.flatMap(member => sourcesOf(member).map(source => source.name));
  assert.ok(names.includes("packages/development/src/review.ts"), "the scan lists review.ts");
  assert.ok(names.includes("packages/development/src/repair.ts"), "the scan lists repair.ts");
  const review = sourcesOf("packages/development").find(source => source.name === "packages/development/src/review.ts");
  assert.ok(review, "review.ts is scanned");
  assert.equal(review.lines[5]?.trim(), "export interface CandidateReviewServices {", "the scan's own lines expose the sanctioned typed seam at review.ts:6");
  assert.equal(ABI_NAME.test(review.lines[5] ?? ""), false);
});

test("the scan scope and the three rules are pinned exactly", () => {
  assert.deepEqual([...SCANNED_PACKAGES], ["packages/coordination", "packages/development"]);
  assert.ok(String(ABI_NAME).includes("Provider|Plugin|Registry|Scheduler|Driver"));
  assert.ok(String(STRING_KEYED_DISPATCH).includes("Record<string,"));
  assert.ok(String(METHOD_GATEWAY).includes("method|action|op|opName|verb"));
  assert.equal(String(ABI_NAME), String.raw`/^\s*export (?:default )?(?:declare )?(?:(?:abstract )?class|interface|type|(?:const )?enum|namespace|const|let|var|(?:async )?function\*?) (?:\w*(?:Provider|Plugin|Registry|Scheduler|Driver)\w*)\b/`);
  assert.equal(String(STRING_KEYED_DISPATCH), String.raw`/(?:\[\s*\w+\s*:\s*string\s*\]\s*:\s*(?:\()|Record<string,\s*\(|(?:Readonly)?Map<string,\s*\()/`);
  assert.equal(String(METHOD_GATEWAY), String.raw`/^\s*export (?:default )?(?:async )?function\*? \w+(?:<[^(]*>)?\([^)]*\b(?:method|action|op|opName|verb)\s*:\s*string|^\s*export const \w+(?::[^=]+)? = (?:async )?(?:<[^(]*>)?\([^)]*\b(?:method|action|op|opName|verb)\s*:\s*string/`);
});

/** Per-rule sample tables. Every violating line is a canonical shape the rule must catch (the PE1-PE8 escapes and the
 * PK1-PK3 controls of the 697m.4 follow-up); every sanctioned line is a typed seam, a local or an unrelated shape the
 * rule must leave alone. */
const SAMPLES: { rule: string; pattern: RegExp; violating: string[]; sanctioned: string[] }[] = [
  {
    rule: "PROVIDER_ABI_NAME",
    pattern: ABI_NAME,
    violating: [
      "export interface TrainingProviderRegistry {",
      "export const FooRegistry = new Map();",
      "export enum ProviderKind {",
      "export const enum ProviderKind {",
      "export default class TrainingPluginHost {",
      "export class WorkerDriver {}",
      "  export class WorkerDriver {}",
      "export namespace PluginSeams {",
      "export declare const Scheduler: unknown;",
      "export let activeDriver = 1;",
      "export var PluginTable = {};",
      "export abstract class BaseProvider {",
      "export async function loadProvider() {",
      "export type Driver = string;",
    ],
    sanctioned: [
      "export interface CandidateReviewServices {",
      "export interface RepairServices {",
      "export async function reviewCandidate(services: CandidateReviewServices, request: DevelopmentRequest) {",
      "export type JsonValue = string | number;",
      "const provider = 1;",
      "// export class WorkerDriver {}",
      "export const enum Verdict {",
    ],
  },
  {
    rule: "PROVIDER_ABI_DISPATCH",
    pattern: STRING_KEYED_DISPATCH,
    violating: [
      "{ [k: string]: (x: number) => void }",
      "  [key: string]: (input: unknown) => unknown;",
      "const table: Record<string, (x: number) => void> = {};",
      "export const handlers = new Map<string, (input: unknown) => unknown>();",
      "const handlers: ReadonlyMap<string, (x: number) => void> = new Map();",
    ],
    sanctioned: [
      "[key: string]: JsonValue;",
      "const totals: Record<string, number> = {};",
      "const seen = new Map<string, number>();",
      // PE6: a function alias behind the index signature is the docs/10 alias non-claim: a line scan does not follow aliases.
      "{ [key: string]: Handler }",
    ],
  },
  {
    rule: "PROVIDER_ABI_GATEWAY",
    pattern: METHOD_GATEWAY,
    violating: [
      "export async function f(method: string) {",
      "export function call(action: string, input: unknown) {",
      "export function invoke<T>(method: string): T {",
      "export const dispatch = (method: string): string => method;",
      "export const call = async (opName: string) => 1;",
      "export const run: Runner = <T,>(verb: string) => 1;",
      "  export function nested(op: string) {",
      "export default function run(op: string) {",
      // Every operation name appears in one function-form and one arrow-form sample (t1da): dropping a name from either
      // regex alternative alone turns one of these rows green-to-red.
      "export function f(opName: string) {",
      "export function g(verb: string) {",
      "export const h = (action: string) => 1;",
      "export const k = (op: string) => 1;",
    ],
    sanctioned: [
      "export function reviewCandidate(services: CandidateReviewServices, request: DevelopmentRequest) {",
      "export function f(methodology: string) {",
      "export function f(method: number) {",
      "function dispatch(method: string) {",
      "const dispatch = (method: string) => method;",
    ],
  },
];

test("each rule matches every canonical violating sample and none of the sanctioned samples", () => {
  for (const { rule, pattern, violating, sanctioned } of SAMPLES) {
    for (const line of violating) assert.equal(pattern.test(line), true, `${rule} misses violating sample: ${line}`);
    for (const line of sanctioned) assert.equal(pattern.test(line), false, `${rule} flags sanctioned sample: ${line}`);
  }
});

test("every gateway operation name is caught by both the function form and the arrow form (t1da)", () => {
  const names = ["method", "action", "op", "opName", "verb"];
  for (const name of names) {
    const functionForm = `export function gateway(${name}: string) {`;
    const arrowForm = `export const gateway = (${name}: string) => 1;`;
    assert.equal(METHOD_GATEWAY.test(functionForm), true, `PROVIDER_ABI_GATEWAY function form misses ${name}: ${functionForm}`);
    assert.equal(METHOD_GATEWAY.test(arrowForm), true, `PROVIDER_ABI_GATEWAY arrow form misses ${name}: ${arrowForm}`);
    // the name boundary holds in both forms: a longer identifier is not the operation name
    assert.equal(METHOD_GATEWAY.test(`export function gateway(${name}s: string) {`), false, `${name}s must not match (function form)`);
    assert.equal(METHOD_GATEWAY.test(`export const gateway = (${name}s: string) => 1;`), false, `${name}s must not match (arrow form)`);
  }
  // each top-level alternative carries the full operation-name list on its own
  const source = METHOD_GATEWAY.source;
  const alternatives = source.split("|^");
  assert.equal(alternatives.length, 2, "METHOD_GATEWAY has exactly a function-form and an arrow-form alternative");
  for (const alternative of alternatives) assert.ok(alternative.includes("method|action|op|opName|verb"), `alternative lacks the full name list: ${alternative}`);
});

test("a nested source directory is scanned: the listing is recursive", () => {
  const root = mkdtempSync(join(tmpdir(), "mw-7w3a-"));
  try {
    mkdirSync(join(root, "seams"), { recursive: true });
    writeFileSync(join(root, "top.ts"), "export const a = 1;\n");
    writeFileSync(join(root, "seams", "inner.ts"), "export class WorkerDriver {}\n");
    writeFileSync(join(root, "seams", "note.md"), "not a source\n");
    const listed = sourcesIn(root, "fixture");
    assert.deepEqual(listed.map(source => source.name), ["fixture/seams/inner.ts", "fixture/top.ts"]);
    assert.equal(listed.some(source => source.lines.some(line => ABI_NAME.test(line))), true, "the nested WorkerDriver export is seen by the name rule");
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
