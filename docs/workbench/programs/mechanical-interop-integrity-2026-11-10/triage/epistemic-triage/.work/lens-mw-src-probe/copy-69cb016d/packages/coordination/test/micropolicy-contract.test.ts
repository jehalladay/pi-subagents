// MechanicalWorkflows-8w9j (APO-EAT-R008): the MicroPolicy integration speaks only
// micropolicy.decision-receipt.v1 at the pin the program doc names. The schema is a pinned
// vendored copy (no @micro-policy runtime dependency); the adapter's receipt vocabulary is
// extracted from the adapter source itself and must be a subset of the vendored properties;
// the doc's pinned sha must equal the vendored provenance; and the doc's receipt lines carry
// no 'logits' field talk.
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const vendorDir = join(here, "../schema/vendor/micropolicy");
const schemaBytes = readFileSync(join(vendorDir, "decision-receipt.v1.json"));
const schema = JSON.parse(schemaBytes.toString("utf8")) as {
  $id: string;
  properties: Record<string, unknown>;
  $defs: Record<string, { properties?: Record<string, unknown> }>;
};
const provenance = JSON.parse(readFileSync(join(vendorDir, "decision-receipt.v1.provenance.json"), "utf8")) as {
  source: { commit: string; gitBlobSha1: string; path: string };
  vendored: { sha256: string };
};
const docPath = join(here, "../../../docs/programs/adaptive-policy-organizations-2026-10-18/08-micropolicy-adapter.md");
const docLines = readFileSync(docPath, "utf8").split("\n");
const adapterSource = readFileSync(join(here, "../src/micropolicy-adapter.ts"), "utf8");

/** Field names declared by one interface block of the adapter source. */
export function interfaceFields(source: string, name: string): string[] {
  const start = source.indexOf(`export interface ${name}`);
  assert.ok(start >= 0, `adapter declares interface ${name}`);
  const open = source.indexOf("{", start);
  let depth = 0, end = open;
  for (let index = open; index < source.length; index++) {
    if (source[index] === "{") depth++;
    if (source[index] === "}") { depth--; if (depth === 0) { end = index; break; } }
  }
  // MechanicalWorkflows-4usd SC1: comments are stripped, then every member declaration counts,
  // readonly or not, so a mutable invented field cannot slip past the subset rule.
  const body = source.slice(open + 1, end).replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/[^\n]*/g, "");
  return [...body.matchAll(/^\s*(?:readonly\s+)?([A-Za-z0-9_]+)\??\s*:/gm)].map(match => match[1]!);
}

/** MechanicalWorkflows-4usd SC2: 'logits' field talk is detected in any letter case. */
export const mentionsLogits = (line: string): boolean => /logits/i.test(line);

/** MechanicalWorkflows-4usd SD1: a doc line pins the provenance commit by its 12-hex prefix. */
export const linePinsCommit = (line: string, commit: string): boolean => new RegExp(`\\b${commit.slice(0, 12)}\\b`).test(line);

const propertyNames = (node: { properties?: Record<string, unknown> } | undefined): Set<string> =>
  new Set(Object.keys(node?.properties ?? {}));

test("the vendored schema is the real micropolicy.decision-receipt.v1 and matches its provenance byte for byte", () => {
  assert.equal(schema.$id, "micropolicy.decision-receipt.v1");
  assert.equal(createHash("sha256").update(schemaBytes).digest("hex"), provenance.vendored.sha256, "vendored sha256 drifted from the provenance record");
  const gitBlob = createHash("sha1").update(`blob ${schemaBytes.length}\0`).update(schemaBytes).digest("hex");
  assert.equal(gitBlob, provenance.source.gitBlobSha1, "vendored bytes are not the pinned source blob");
  assert.equal(provenance.source.path, "contracts/schemas/decision-receipt.v1.json");
});

test("the doc's pinned MicroPolicyCli sha equals the vendored provenance commit (fails when either re-pins alone)", () => {
  const sourceStatus = docLines[3] ?? "";
  const pin = /\b([0-9a-f]{12})\b/.exec(sourceStatus)?.[1];
  assert.ok(pin, "doc line 4 names a 12-hex MicroPolicyCli pin");
  assert.ok(provenance.source.commit.startsWith(pin!), `doc pin ${pin} is not a prefix of the vendored commit ${provenance.source.commit}`);
});

test("the adapter's receipt vocabulary is a subset of the vendored decision-receipt.v1 properties", () => {
  const top = propertyNames(schema as { properties: Record<string, unknown> });
  const selection = propertyNames(schema.$defs["selection"]);
  const choice = propertyNames(schema.$defs["choice"]);
  const rng = propertyNames(schema.$defs["rng"]);
  const check = (interfaceName: string, allowed: Set<string>) => {
    for (const field of interfaceFields(adapterSource, interfaceName)) {
      assert.ok(allowed.has(field), `${interfaceName}.${field} is not a field of micropolicy.decision-receipt.v1 (allowed: ${[...allowed].sort().join(", ")})`);
    }
  };
  check("MicroPolicyDecisionReceipt", top);
  check("MicroPolicyDecisionSelection", selection);
  check("MicroPolicyDecisionChoice", choice);
  check("MicroPolicyDecisionRng", rng);
});

test("the doc's source-status and workflow lines carry no logits field talk", () => {
  assert.ok(!mentionsLogits(docLines[3] ?? ""), "doc line 4 mentions logits");
  assert.ok(!mentionsLogits(docLines[6] ?? ""), "doc line 7 mentions logits");
});

test("the doc's workflow line (line 7) pins the same MicroPolicyCli commit prefix as line 4", () => {
  assert.ok(linePinsCommit(docLines[3] ?? "", provenance.source.commit), "doc line 4 does not carry the provenance commit prefix");
  assert.ok(linePinsCommit(docLines[6] ?? "", provenance.source.commit), "doc line 7 does not carry the provenance commit prefix");
});

test("control: the logits and commit-pin predicates fail closed on mixed case, a near miss and a missing pin", () => {
  assert.equal(mentionsLogits("raw Logits vector"), true);
  assert.equal(mentionsLogits("LOGITS"), true);
  assert.equal(mentionsLogits("per-action probabilities"), false);
  const commit = provenance.source.commit;
  assert.equal(linePinsCommit(`at ${commit.slice(0, 12)} only`, commit), true);
  assert.equal(linePinsCommit("no pin here", commit), false);
  assert.equal(linePinsCommit(`at ${commit.slice(0, 11)}0`, commit), false);
  assert.equal(linePinsCommit(`at ${commit.slice(0, 12)}ab`, commit), false);
});

test("control: the extractor and the subset rule fail closed on an invented field and a truncated interface", () => {
  const synthetic = "export interface MicroPolicyDecisionRng {\n  readonly algorithm: string;\n  readonly invented: number;\n}\n";
  assert.deepEqual(interfaceFields(synthetic, "MicroPolicyDecisionRng"), ["algorithm", "invented"]);
  const rng = propertyNames(schema.$defs["rng"]);
  assert.equal(rng.has("invented"), false);
  assert.throws(() => interfaceFields("const x = 1;", "MicroPolicyDecisionRng"));
});

test("control: the extractor counts a non-readonly member and ignores comment text", () => {
  const synthetic = [
    "export interface MicroPolicyDecisionRng {",
    "  readonly algorithm: string;",
    "  /** prose: not a member */",
    "  // inline: not a member either",
    "  /*",
    "   hiddenInComment: not a member",
    "  */",
    "  mutableInvented: number;",
    "  optionalInvented?: string | undefined;",
    "}",
  ].join("\n");
  const fields = interfaceFields(synthetic, "MicroPolicyDecisionRng");
  assert.deepEqual(fields, ["algorithm", "mutableInvented", "optionalInvented"]);
  const rng = propertyNames(schema.$defs["rng"]);
  assert.equal(fields.every(field => rng.has(field)), false, "the subset rule flags the invented non-readonly fields");
});
