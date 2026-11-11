import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { basename, dirname, extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";

// PIWBA MW-R7 EAT-R106 (bead MechanicalWorkflows-xd7w4): proposal wording integrity. Coordination output surfaces as a
// proposal (an admissible-intent candidate), never as a claim or a gate result, and "advisory" always carries the bounded
// qualification: the resolver only admits intents, the host that owns native authority executes them, and a canary acts
// only inside host-bounded support with a baseline fallback. Two legs, both fixture-and-live:
//   (a) schema leg (serializer leg prior art: packages/coordination/test/decision-receipt.test.ts:46 and :189 pin the
//       serialized receipt shape): no coordination schema names a property, definition or enum value `verdict` or `gate` (or a gate
//       result alias); the single resolver-admission field `resolverVerdict` is a closed, named exception and the
//       proposal list keeps its `proposed` label beside `admitted` and `executed`;
//   (b) docs leg (L0 lint over the cut docs and skill text): every "advisory" in a paragraph that speaks of GraphPolicy,
//       MicroPolicy, gp, mp or coordination/policy output carries the qualification, and no sentence describes such
//       output as a claim, a gate result or a verdict. The scan reaches docs/programs/ too, because the 11-07 and 11-09
//       programs are live (AGENTS.md and README.md present them as the current work); the older dated programs quote the
//       refuted wording on purpose. Every program-text site that does not hold the qualification is PINNED in
//       KNOWN_UNQUALIFIED_SITES with its provenance: a new site fails, and so does a pinned site whose text drifted or
//       vanished. The owner M040 doc edit (DEFER) rewrites those sites; R106(b) stays OPEN until it lands.
// Mutant fixtures are labelled fixture evidence and never count as native PASS.

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(here, "..", "..", "..");
const readJson = (path: string): unknown => JSON.parse(readFileSync(join(repoRoot, path), "utf8"));

// ---- leg (a): schema label census ------------------------------------------------------------------------------------

const COORDINATION_SCHEMAS = [
  "contracts/schemas/coordination-resolution.v1.schema.json",
  "contracts/schemas/coordination-resolver-input.v1.schema.json",
  "packages/coordination/schema/collective.event.v1.schema.json",
  "packages/coordination/schema/coordination-decision.v1.schema.json",
  "packages/coordination/schema/decision-receipt.v1.schema.json",
  "packages/coordination/schema/episode.v1.schema.json",
  "packages/coordination/schema/training-export.v1.schema.json",
] as const;
const ALIAS_NAME = /(verdicts?|gates?|gate[_-]?results?|gate[_-]?outcomes?)$/i;
// Three closed exceptions (the verifier pair hard-codes the status quo pending the seat CLAIM-SEAT-OWNED-1 rename ruling), each pinned to one schema and one pointer: the resolver-admission field of the decision receipt
// (it records what the resolver admitted, beside the `proposed` list) and the native verifier's verdict on an episode and its training export
// (an outcome observed after execution). Neither relabels a proposal.
const NAMED_EXCEPTIONS: Readonly<Record<string, readonly string[]>> = {
  "packages/coordination/schema/decision-receipt.v1.schema.json": ["/properties|resolverVerdict", "/required|resolverVerdict"],
  "packages/coordination/schema/episode.v1.schema.json": ["/properties/verifier/properties|verdict", "/properties/verifier/required|verdict"],
  "packages/coordination/schema/training-export.v1.schema.json": ["/properties/verifier/properties|verdict", "/properties/verifier/required|verdict"],
};

/** Every proposal-aliasing label in a JSON schema tree, as `path: reason` lines (empty when clean). */
function labelCensus(schemaPath: string, schema: unknown): string[] {
  const allowed = new Set(NAMED_EXCEPTIONS[schemaPath] ?? []);
  const violations: string[] = [];
  const check = (name: string, path: string, kind: string): void => {
    if (ALIAS_NAME.test(name) && !allowed.has(`${path}|${name}`)) violations.push(`${path}: ${kind} ${name} aliases the proposal as a verdict or gate`);
  };
  const walk = (node: unknown, path: string): void => {
    if (Array.isArray(node)) { node.forEach((child, index) => walk(child, `${path}/${index}`)); return; }
    if (node === null || typeof node !== "object") return;
    for (const [key, child] of Object.entries(node as Record<string, unknown>)) {
      const childPath = `${path}/${key}`;
      if ((key === "properties" || key === "$defs") && child !== null && typeof child === "object" && !Array.isArray(child)) {
        for (const name of Object.keys(child as Record<string, unknown>)) check(name, childPath, key === "properties" ? "property" : "definition");
      }
      if (key === "required" && Array.isArray(child)) for (const name of child) if (typeof name === "string") check(name, childPath, "required name");
      if (key === "enum" && Array.isArray(child)) for (const value of child) if (typeof value === "string") check(value, childPath, "enum value");
      walk(child, childPath);
    }
  };
  walk(schema, "");
  return violations;
}

test("EAT-R106(a): no coordination schema relabels a proposal as a verdict or gate; the proposal keeps its label", () => {
  for (const path of COORDINATION_SCHEMAS) assert.deepEqual(labelCensus(path, readJson(path)), [], path);
  const receipt = readJson("packages/coordination/schema/decision-receipt.v1.schema.json") as { properties: { actions: { properties: Record<string, unknown> } } };
  assert.deepEqual(Object.keys(receipt.properties.actions.properties), ["proposed", "admitted", "executed"]);
  for (const path of ["contracts/schemas/coordination-resolution.v1.schema.json", "contracts/schemas/coordination-resolver-input.v1.schema.json"]) {
    assert.match(readFileSync(join(repoRoot, path), "utf8"), /"propose-only"/, `${path} keeps the propose-only authority label`);
  }
});

test("EAT-R106(a) mutants: verdict, gate and gate-result aliases are refused, the named exception is not widened", () => {
  const withProperty = (name: string): unknown => ({ properties: { [name]: { type: "string" } } });
  for (const name of ["verdict", "gate", "gateResult", "GateVerdict", "verdicts", "gate_result", "gateOutcomes"]) {
    assert.equal(labelCensus("fixture.json", withProperty(name)).length, 1, name);
  }
  assert.equal(labelCensus("fixture.json", { $defs: { gate: {} } }).length, 1);
  assert.equal(labelCensus("fixture.json", { required: ["verdict"] }).length, 1);
  assert.equal(labelCensus("fixture.json", { properties: { decision: { enum: ["pass", "gate"] } } }).length, 1);
  assert.deepEqual(labelCensus("fixture.json", withProperty("proposed")), []);
  assert.deepEqual(labelCensus("fixture.json", withProperty("resolverVerdict")).length, 1, "the exception binds to the named schema and pointer only");
  assert.deepEqual(labelCensus("packages/coordination/schema/decision-receipt.v1.schema.json", withProperty("resolverVerdict")), []);
  assert.equal(labelCensus("packages/coordination/schema/decision-receipt.v1.schema.json", withProperty("verdict")).length, 1);
  assert.equal(labelCensus("packages/coordination/schema/episode.v1.schema.json", withProperty("verdict")).length, 1, "the verifier exception binds to its pointer, not the schema root");
  assert.deepEqual(labelCensus("packages/coordination/schema/episode.v1.schema.json", { properties: { verifier: { properties: { verdict: {} } } } }), []);
});

// ---- leg (b): docs wording lint --------------------------------------------------------------------------------------

type WordingCode = "ADVISORY_UNQUALIFIED" | "PROPOSAL_AS_CLAIM_OR_GATE";
interface Violation { readonly line: number; readonly code: WordingCode; readonly excerpt: string; readonly digest: string }

const ADVISORY = /\badvisor(?:y|ies)\b/gi;
// Output of the policy engines and of the coordination layer; gp and mp are matched case-sensitively as words.
const POLICY_OUTPUT = /GraphPolicy|MicroPolicy|\b(?:gp|mp)\b|\b(?:[Cc]oordination|[Pp]olicy)\s+(?:output|recommendation|decision|proposal|rewrite)s?\b/;
const OUTPUT_SUBJECT = "(?:GraphPolicy|MicroPolicy|\\b(?:gp|mp)\\b|(?:[Cc]oordination|[Pp]olicy)\\s+(?:output|recommendation|decision|proposal|rewrite)s?)";
const AS_CLAIM_OR_GATE = new RegExp(`${OUTPUT_SUBJECT}(?:\\s+\\w+){0,3}?\\s+(?:is|are|counts\\s+as|serves\\s+as|acts\\s+as|treated\\s+as|represented\\s+as|reported\\s+as)\\s+(?:a|an|the)?\\s*(?:claim|gate(?:\\s+result)?|gate\\s+verdict|verdict|native\\s+outcome)\\b`);
const RESOLVER_ADMITS = /\bresolver\b[^.]*\badmit/i;
const HOST_EXECUTES = /\bhost\b[^.]*\bexecut/i;
const CANARY = /\bcanary\b/i;
const CANARY_BOUNDED = /(?=[^]*host-bounded)(?=[^]*baseline\s+fallback)/i;

/** Paragraphs of a markdown text with the 1-based line each starts on. */
function paragraphs(text: string): { line: number; body: string }[] {
  const out: { line: number; body: string }[] = [];
  let current: string[] = [];
  let start = 0;
  text.split("\n").forEach((raw, index) => {
    if (raw.trim() === "") {
      if (current.length) out.push({ line: start, body: current.join(" ").replace(/\s+/g, " ") });
      current = [];
    } else {
      if (!current.length) start = index + 1;
      current.push(raw);
    }
  });
  if (current.length) out.push({ line: start, body: current.join(" ").replace(/\s+/g, " ") });
  return out;
}

/** Wording violations in one markdown text (empty when the text keeps the proposal discipline). */
function wordingViolations(text: string): Violation[] {
  const found: Violation[] = [];
  for (const { line, body } of paragraphs(text)) {
    const excerpt = body.slice(0, 100);
    const digest = createHash("sha256").update(body).digest("hex").slice(0, 12);
    if (AS_CLAIM_OR_GATE.test(body)) found.push({ line, code: "PROPOSAL_AS_CLAIM_OR_GATE", excerpt, digest });
    if (!POLICY_OUTPUT.test(body) || !new RegExp(ADVISORY.source, "i").test(body)) continue;
    const qualified = RESOLVER_ADMITS.test(body) && HOST_EXECUTES.test(body) && (!CANARY.test(body) || CANARY_BOUNDED.test(body));
    if (!qualified) found.push({ line, code: "ADVISORY_UNQUALIFIED", excerpt, digest });
  }
  return found;
}

function liveFiles(): string[] {
  const files: string[] = [];
  for (const file of ["README.md", "AGENTS.md"]) if (existsSync(join(repoRoot, file))) files.push(file);
  const collect = (dir: string, accept: (name: string) => boolean): void => {
    if (!existsSync(join(repoRoot, dir))) return;
    for (const item of readdirSync(join(repoRoot, dir), { withFileTypes: true })) {
      const path = `${dir}/${item.name}`;
      if (item.isDirectory()) collect(path, accept); else if (accept(item.name)) files.push(path);
    }
  };
  collect("docs", name => extname(name) === ".md");
  collect(".agents/skills", name => basename(name) === "SKILL.md");
  return files.sort();
}

/**
 * Known unqualified sites in program text, pinned as `file CODE digest | first 40 characters of the paragraph`, the digest being the first 12 hex characters of the sha256 of the whole whitespace-normalised paragraph, so any edit inside a pinned paragraph drifts it (no line number: unrelated edits above a site must not churn the pin). Provenance:
 * the three groom-censused sites (03-delivery-program.md:29, 04-qa-feedback.md:13 twice, docs/10:423) await the owner M040
 * doc edit (DEFER), and R106(b) is OPEN until it lands. docs/10:423 and the two dated 10-18 adaptive-policy program paragraphs
 * use "advisory" in the APO trust-zone sense (a learned value never grounds an admission), not as coordination proposal
 * output; they are pinned rather than waived so a later edit that adds a real proposal claim there cannot hide in the exemption. The scan fails on any site outside this
 * list (new site) and on any listed site that no longer matches (drift or fix: update the pin in the same change).
 */
const KNOWN_UNQUALIFIED_SITES: readonly string[] = [
  "docs/10-current-state-and-gaps.md ADVISORY_UNQUALIFIED f2131a886da5 | `packages/coordination/src/trust-zones.t",
  "docs/programs/adaptive-policy-organizations-2026-10-18/04-hld-ownership.md ADVISORY_UNQUALIFIED 6a0fc2554249 | ## Trust zones Learned scores, policy re",
  "docs/programs/adaptive-policy-organizations-2026-10-18/05-graph-lld.md ADVISORY_UNQUALIFIED 427e4e031385 | ## Validator 1. Reject unknown schema, d",
  "docs/programs/pi-workbench-interoperability-audit-2026-11-06/03-delivery-program.md ADVISORY_UNQUALIFIED b98a42bc0492 | **`packages/coordination/`**: expose one",
  "docs/programs/pi-workbench-interoperability-audit-2026-11-06/04-qa-feedback.md PROPOSAL_AS_CLAIM_OR_GATE c6bec52ccd3d | | Control | Positive | Adversarial negat",
  "docs/programs/pi-workbench-interoperability-audit-2026-11-06/04-qa-feedback.md ADVISORY_UNQUALIFIED c6bec52ccd3d | | Control | Positive | Adversarial negat",
];

const siteKey = (file: string, v: Violation): string => `${file} ${v.code} ${v.digest} | ${v.excerpt.slice(0, 40)}`;
const scanLive = (): string[] => liveFiles().flatMap(file => wordingViolations(readFileSync(join(repoRoot, file), "utf8")).map(v => siteKey(file, v)));

test("EAT-R106(b): the live cut docs, program texts and skill text keep the proposal wording discipline; known sites stay pinned", () => {
  const files = liveFiles();
  assert.ok(files.includes("AGENTS.md") && files.includes("docs/10-current-state-and-gaps.md"), "the scan reaches the current-state doc and AGENTS.md");
  assert.ok(files.some(file => file.startsWith("docs/programs/pi-native-interoperability-2026-11-09/")), "the live 11-09 program is scanned");
  assert.ok(files.some(file => file.startsWith("docs/programs/pi-workbench-interoperability-audit-2026-11-06/")), "the 11-06 audit program is scanned");
  assert.deepEqual(scanLive(), [...KNOWN_UNQUALIFIED_SITES]);
});

test("EAT-R106(b) baseline drift: a pinned site whose text changed no longer matches its pin", () => {
  const pinned = KNOWN_UNQUALIFIED_SITES[3] ?? "";
  assert.ok(pinned.length > 0, "the pin list keeps the 03-delivery-program site at index 3");
  const file = pinned.split(" ")[0] ?? "";
  const edited = readFileSync(join(repoRoot, file), "utf8").replace("expose one pure, serializable evaluator", "expose one pure, serializable function");
  const keys = wordingViolations(edited).map(v => siteKey(file, v));
  assert.ok(!keys.includes(pinned), "an edited pinned paragraph drifts off its pin, so the scan reports it for re-pinning");
});

test("EAT-R106(b) mutant: the unqualified-advisory sentence appended to a live program README is caught", () => {
  const readme = "docs/programs/pi-native-interoperability-2026-11-09/README.md";
  const text = readFileSync(join(repoRoot, readme), "utf8");
  const clean = wordingViolations(text).length;
  assert.equal(wordingViolations(`${text}\n\nMicroPolicy recommendations stay advisory.\n`).length, clean + 1, "a new site in a live program text fails the scan");
});

const QUALIFIED = "GraphPolicy output is advisory: the resolver only admits intents, and the host that owns native authority executes them.";
test("EAT-R106(b) mutants: an unqualified advisory beside policy output is refused, a qualified one passes", () => {
  assert.deepEqual(wordingViolations(QUALIFIED), []);
  assert.deepEqual(wordingViolations("MicroPolicy recommendations stay advisory."), [{ line: 1, code: "ADVISORY_UNQUALIFIED", excerpt: "MicroPolicy recommendations stay advisory.", digest: createHash("sha256").update("MicroPolicy recommendations stay advisory.").digest("hex").slice(0, 12) }]);
  assert.equal(wordingViolations("The gp proposal is advisory.\n\nThe resolver admits it.").length, 1, "the qualification must sit in the same paragraph");
  assert.equal(wordingViolations("Coordination output is advisory and the resolver admits it, but nothing executes.").length, 1, "both the resolver and the host legs are required");
  assert.equal(wordingViolations("mp output stays\nadvisory;\nthe resolver admits\nintents and the host executes them.").length, 0, "line wraps join into one paragraph");
  assert.equal(wordingViolations("Learned forecasts are advisory and certify nothing.").length, 0, "a paragraph that names no policy output is out of scope");
});

test("EAT-R106(b) mutants: a canary needs the host-bounded support and baseline fallback wording", () => {
  const canary = `${QUALIFIED} The canary samples freely.`;
  assert.deepEqual(wordingViolations(canary).map(v => v.code), ["ADVISORY_UNQUALIFIED"]);
  assert.deepEqual(wordingViolations(`${QUALIFIED} The canary acts only within host-bounded support, with a baseline fallback.`), []);
  assert.equal(wordingViolations(`${QUALIFIED} The canary acts only within host-bounded support.`).length, 1, "the fallback leg is required too");
});

test("EAT-R106(b) mutants: proposal output described as a claim, gate result or verdict is refused", () => {
  for (const sentence of [
    "The coordination output is a gate result for the lane.",
    "GraphPolicy output counts as a claim about the run.",
    "A policy recommendation is treated as a verdict.",
    "The mp decision serves as the native outcome.",
    "Policy proposals are reported as gate verdicts.",
  ]) assert.deepEqual(wordingViolations(sentence).map(v => v.code), ["PROPOSAL_AS_CLAIM_OR_GATE"], sentence);
  for (const sentence of [
    "The coordination output is a proposal that the resolver may admit.",
    "GraphPolicy output is an admissible-intent candidate, never a gate result.",
  ]) assert.deepEqual(wordingViolations(sentence).map(v => v.code), [], sentence);
});
