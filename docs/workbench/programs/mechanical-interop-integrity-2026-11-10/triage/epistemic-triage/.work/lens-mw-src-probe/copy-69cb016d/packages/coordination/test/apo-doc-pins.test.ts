// MechanicalWorkflows-ejai (APO-EAT-R007): the theorem-source pin law, enforced as a test so the
// docs gate cannot drift. Line 16 of the APO source-and-research map must either pin the
// jehalladay/research revision as a 40-hex sha TOGETHER WITH the two theorem file paths (finite
// kernel semantics / controlled lumpability statement, and the T1/T2 proof-obligations file), or
// carry the literal 'unverified at pin'. Until the sha form exists, the 03-operational-semantics
// L18 heading must keep saying so; and the heading never says 'Proven' here — obtaining statements
// verifies nothing (A016/B001: the audited scope stays what it was).
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const APO = join(here, "..", "..", "..", "docs", "programs", "adaptive-policy-organizations-2026-10-18");
const mapLines = readFileSync(join(APO, "15-source-and-research-map.md"), "utf8").split("\n");
const semanticsLines = readFileSync(join(APO, "03-operational-semantics.md"), "utf8").split("\n");

const entry = mapLines[15] ?? "";
const heading = semanticsLines[17] ?? "";
const shaForm = /\b[0-9a-f]{40}\b/.test(entry)
  && entry.includes("programs/adaptive-organizational-compositionality/01-finite-semantics.md")
  && entry.includes("programs/adaptive-organizational-compositionality/12-proof-obligations.md");

test("map L16 is the jehalladay/research entry and carries the 40-hex pin with both theorem paths, or the literal 'unverified at pin'", () => {
  assert.ok(entry.includes("github.com/jehalladay/research"), `L16 names the research repo, got: ${entry.slice(0, 80)}`);
  assert.ok(shaForm || entry.includes("unverified at pin"), "either the sha+paths form or the literal 'unverified at pin'");
});

test("03 L18 is the theorem-obligations heading, says unverified/unproven until the sha form exists, and never says Proven", () => {
  assert.ok(heading.startsWith("## Theorem obligations"), `L18 is the heading, got: ${heading.slice(0, 60)}`);
  if (!shaForm) assert.ok(heading.includes("unverified"), "without a pin the heading keeps 'unverified'");
  assert.ok(!heading.includes("Proven"), "obtaining statements proves nothing: the heading never reads Proven");
});

test("when the sha form exists it pins statements, not proofs: the map entry says the proofs are not completed at the pin", () => {
  if (shaForm) assert.ok(/not completed proofs|statements? unproven|unproven at this pin/.test(entry), "the pin stays honest about proof status");
  else assert.ok(true, "no sha form yet; the first test already requires the unverified literal");
});

// MechanicalWorkflows-gi7j (follow-up to ejai): three laws the first three tests left unpinned.
// The 03 L18 heading stays 'unproven' (the commit-message law: it never reads Proven), and the map
// L16 pin equals the recorded revision, not merely some 40-hex string.
const PINNED_RESEARCH_REVISION = "0e0b10ac7894cb18bfb99fdcc62085b056bd2946";

test("03 L18 heading qualifier says 'unproven' (any case) and carries no other 'proven' token, whether or not the sha form exists", () => {
  const tokens = heading.match(/[A-Za-z]*proven\b/gi) ?? [];
  assert.ok(tokens.length >= 1, `the heading names its proof status with an 'unproven' token, got: ${heading.slice(0, 90)}`);
  for (const token of tokens) {
    assert.equal(token.toLowerCase(), "unproven", `every 'proven' token in the heading is 'unproven', found '${token}' in: ${heading.slice(0, 90)}`);
  }
});

test("map L16 research revision equals the recorded pin, not merely a 40-hex shape", () => {
  const found = entry.match(/\b[0-9a-f]{40}\b/g) ?? [];
  if (shaForm) assert.deepEqual(found, [PINNED_RESEARCH_REVISION], `L16 carries exactly the recorded revision, got: ${found.join(",")}`);
  else assert.ok(entry.includes("unverified at pin"), "without the sha form the literal 'unverified at pin' stands");
});
