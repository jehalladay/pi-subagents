/**
 * W19 census falsifier for docs/workbench/12-security.md "Security acceptance tests".
 * Binds each of the nine control sentences to existing cases by file, exact
 * title and tier. Renaming, deleting, .skip-ing or .todo-ing a pinned case, or
 * rewriting a control sentence in the docs, turns this census red naming the
 * sentence, file and title. Test-only: no pinned suite, src or docs is edited.
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { sanitizeWorkbenchJsonText } from "../src/workbench/redaction.js";

type Tier = "default-gate" | "knownWidening";
interface Pin { readonly file: string; readonly title: string; readonly tier: Tier }
interface Control { readonly sentence: string; readonly pins: readonly Pin[] }

const ROOT = resolve(import.meta.dirname, "..");
const DOC = "docs/workbench/12-security.md";
const CENSUS = "test/workbench-security-acceptance.test.ts";

const CONTROLS: readonly Control[] = [
  { sentence: "Host-side deny even when script crafts raw RPC", pins: [
    { file: "test/workbench-registry-auth.test.ts", title: "closes the script-side raw RPC vehicle while host authorization stays typed", tier: "default-gate" },
    { file: "test/workbench-registry-auth.test.ts", title: "rejects impersonation options before dispatch", tier: "default-gate" },
  ] },
  { sentence: "JS VM escape attempt must not yield privileged provider client in declared isolation mode", pins: [
    { file: "test/workbench-security-workflow.test.ts", title: "caught Function escape probes are realm EvalErrors and never reveal the canary", tier: "default-gate" },
    { file: "test/workbench-security-workflow.test.ts", title: "every injected callable, returned promise and caught error stays in the VM realm", tier: "default-gate" },
    { file: "test/workbench-security-workflow.test.ts", title: "host-closure Function escape must not reveal even a local canary env variable", tier: "knownWidening" },
  ] },
  { sentence: "unknown/expired grant refused", pins: [
    { file: "test/workbench-control.test.ts", title: "rule 1: unknown permission data (undefined, non-array, non-string entries, wildcards) is an authorization denial", tier: "default-gate" },
    { file: "test/workbench-control-degradation.test.ts", title: "a control grant expiring mid-session never rewrites a receipt already minted, and a later request is denied", tier: "default-gate" },
  ] },
  { sentence: "observer-only stop refused", pins: [
    { file: "test/workbench-control.test.ts", title: "rule 2: observer-only grants cannot control under any action spelling, and nothing is read before refusing", tier: "default-gate" },
    { file: "test/workbench-furnace-control.test.ts", title: "refuses every denied decision with a typed error carrying the core's category and policy, and the seam records zero calls", tier: "default-gate" },
  ] },
  { sentence: "cross-workspace ref returns authorization failure", pins: [
    { file: "test/workbench-control.test.ts", title: "rule 5: a target in another workspace or principal is an authorization failure even with a valid control grant", tier: "default-gate" },
    { file: "test/workbench-security-capability.test.ts", title: "Furnace provider must not return a foreign workspace's Run record", tier: "default-gate" },
  ] },
  { sentence: "ANSI escape output sanitized", pins: [
    { file: "test/workbench-security-workflow.test.ts", title: "rejects a raw ANSI escape in source before VM execution", tier: "default-gate" },
    { file: "test/workbench-security-pi-tools.test.ts", title: "workflow_validate output must sanitize hostile metadata before model display", tier: "default-gate" },
  ] },
  { sentence: "secret env not displayed", pins: [
    { file: "test/workbench-security-pi-tools.test.ts", title: "workbench_catalog is settings-scoped and does not echo a secret in unrelated settings", tier: "default-gate" },
    { file: "test/workbench-security-capability.test.ts", title: "redacts key-named and JSON-quoted secrets through invoke, inspect and error results", tier: "default-gate" },
    { file: "test/workbench-redaction.test.ts", title: "does not render a producer credential in a selected error row", tier: "default-gate" },
    { file: CENSUS, title: "an environment-sourced KEY=value secret never reaches a sanitized reply", tier: "default-gate" },
  ] },
  { sentence: "schema pollution payload refused", pins: [
    { file: "test/workbench-registry-auth.test.ts", title: "rejects oversized nesting and pollution before executing providers", tier: "default-gate" },
    { file: "test/workbench-security-capability.test.ts", title: "registry also refuses extra authority fields and prototype keys before calling a strict provider", tier: "default-gate" },
  ] },
  { sentence: "isolated agent cannot see host tools not explicitly granted", pins: [
    { file: "test/workbench-claude-role-tools.test.ts", title: "adds only curated role MCP tools to actual SDK options without provider auto-grants", tier: "default-gate" },
    { file: "test/workbench-claude-capability-tools.test.ts", title: "discovery is finite and does not enumerate provider registrations outside the role", tier: "default-gate" },
  ] },
];

const read = (file: string): string => readFileSync(resolve(ROOT, file), "utf8");

/** The text preceding every literal occurrence of the title on its line (the calling expression). */
function callPrefixes(source: string, title: string): string[] {
  const prefixes: string[] = [];
  for (const quote of ['"', "'", "`"]) {
    const needle = `${quote}${title}${quote}`;
    for (let at = source.indexOf(needle); at >= 0; at = source.indexOf(needle, at + 1)) {
      const lineStart = source.lastIndexOf("\n", at) + 1;
      prefixes.push(source.slice(lineStart, at).trim());
    }
  }
  return prefixes;
}

function describePin(control: Control, pin: Pin): string {
  return `sentence "${control.sentence}" file ${pin.file} title "${pin.title}"`;
}

function pinProblem(control: Control, pin: Pin): string | undefined {
  const prefixes = callPrefixes(read(pin.file), pin.title);
  if (prefixes.length === 0) return `${describePin(control, pin)}: title not found (renamed or deleted)`;
  const call = pin.tier === "default-gate" ? /(?:^|[\s;{(])(?:it|test)\($/ : /(?:^|[\s;{(])(?:it|test)\.fails\($/;
  if (prefixes.some(prefix => call.test(prefix))) return undefined;
  const want = pin.tier === "default-gate" ? "a plain it()/test() call" : "declared it.fails";
  return `${describePin(control, pin)}: expected ${want} (found "${prefixes.join('" | "')}")`;
}

describe("docs/12 security acceptance census", () => {
  it("covers all nine control sentences exactly, each with at least one pin", () => {
    expect(CONTROLS).toHaveLength(9);
    for (const control of CONTROLS) expect(control.pins.length, control.sentence).toBeGreaterThan(0);
  });

  it("docs/workbench/12 still states every control sentence verbatim", () => {
    const doc = read(DOC);
    const section = doc.slice(doc.indexOf("## Security acceptance tests"));
    const missing = CONTROLS.map(control => control.sentence).filter(sentence => !section.includes(sentence));
    expect(missing, `docs/12 dropped or rewrote controls: ${missing.join(" | ")}`).toEqual([]);
  });

  it("every pinned case still exists with its declared tier", () => {
    const problems = CONTROLS.flatMap(control => control.pins.map(pin => pinProblem(control, pin))).filter((problem): problem is string => problem !== undefined);
    expect(problems).toEqual([]);
  });

  it("no pinned file hides cases behind skip, todo or only", () => {
    const files = [...new Set(CONTROLS.flatMap(control => control.pins.map(pin => pin.file)))].filter(file => file !== CENSUS);
    const hidden = files.filter(file => /\b(?:it|test|describe)\.(?:skip|todo|only)\b/.test(read(file)));
    expect(hidden).toEqual([]);
  });

  it("keeps the VM-escape widening declared it.fails and never counts it as a pass", () => {
    const widenings = CONTROLS.flatMap(control => control.pins.filter(pin => pin.tier === "knownWidening"));
    expect(widenings.map(pin => pin.title)).toEqual(["host-closure Function escape must not reveal even a local canary env variable"]);
  });

  it("an environment-sourced KEY=value secret never reaches a sanitized reply", () => {
    const env: Record<string, string> = {
      ANTHROPIC_API_KEY: "sk-ant-census-fixture-secret",
      AWS_SECRET_ACCESS_KEY: "census-fixture-aws-secret",
      DEPLOY_PASSWORD: "census-fixture-password",
    };
    const reply = { diagnostic: Object.entries(env).map(([key, value]) => `${key}=${value}`).join("; "), nested: { line: `spawn failed with ANTHROPIC_API_KEY=${env.ANTHROPIC_API_KEY}` } };
    const sanitized = sanitizeWorkbenchJsonText(reply);
    for (const value of Object.values(env)) expect(sanitized).not.toContain(value);
    expect(sanitized).toContain("[REDACTED]");
  });
});
