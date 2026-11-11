// MechanicalWorkflows-eymu (CACWC-EAT-R005): the CAC/CVIC citation law, enforced as a test. The
// CACWC README L7 citation carries a 7-40 hex revision pin (or the literal '@ff9a8e1'); the
// 01-composition-contracts L24 sentence cites CVIC with a revision pin or the words 'reference
// unresolved'; and a recorded fetch under qa/integration/ lists path, revision and sha256 for
// each cited CAC/CVIC document (or records the unreachable URL and the date tried).
import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const ROOT = join(here, "..", "..", "..");
const CACWC = join(ROOT, "docs", "programs", "cac-workflow-composition-2026-10-18");
const readmeL7 = (readFileSync(join(CACWC, "README.md"), "utf8").split("\n")[6]) ?? "";
const contractsL24 = (readFileSync(join(CACWC, "01-composition-contracts.md"), "utf8").split("\n")[23]) ?? "";
const SOURCES = join(ROOT, "qa", "integration", "2026-10-19-cac-sources.md");

test("README L7 cites the CAC capability contract with a 7-40 hex revision pin or the literal @ff9a8e1", () => {
  assert.ok(readmeL7.includes("Compositional Autonomous Computation"), `L7 is the citation line, got: ${readmeL7.slice(0, 60)}`);
  assert.ok(/\b[0-9a-f]{7,40}\b/.test(readmeL7) || readmeL7.includes("@ff9a8e1"), "hex pin or @ff9a8e1");
});

test("01-composition-contracts L24 cites CVIC with a revision pin or marks the reference unresolved, within the sentence", () => {
  assert.match(contractsL24, /CVIC/);
  const sentence = contractsL24.split(/(?<=\.)\s/).find(part => part.includes("CVIC")) ?? contractsL24;
  const afterCvic = sentence.slice(sentence.indexOf("CVIC"));
  assert.ok(/\b[0-9a-f]{7,40}\b/.test(afterCvic) || afterCvic.includes("reference unresolved"), `pin or 'reference unresolved' after CVIC in: ${afterCvic.slice(0, 120)}`);
});

test("a recorded fetch under qa/integration lists path, revision and sha256 per cited CAC/CVIC document, or the unreachable URL and date tried", () => {
  assert.ok(existsSync(SOURCES), "qa/integration/2026-10-19-cac-sources.md exists");
  const body = readFileSync(SOURCES, "utf8");
  const unreachable = /unreachable/.test(body) && /2026-10-\d{2}/.test(body);
  const rows = body.split("\n").filter(line => /\b[0-9a-f]{64}\b/.test(line));
  const cited = [
    "programs/compositional-autonomous-computation/00-charter.md",
    "programs/compositional-autonomous-computation/01-semantics.md",
    "lean/ResearchFormal/CVIC/Quotient.lean",
    "lean/ResearchFormal/CVIC/TraceQuotient.lean",
    "lean/ResearchFormal/CVIC/Verification.lean",
    "docs/formalization/THEOREM_REGISTER.md",
  ];
  const pinned = /\b[0-9a-f]{40}\b/.test(body) && cited.every(path => rows.some(line => line.includes(path)));
  assert.ok(pinned || unreachable, "either sha256 rows for CAC and CVIC at a 40-hex revision, or the unreachable record with a date");
});

// MechanicalWorkflows-j6ix: seven CAC/CVIC citation laws the three tests above leave open-world.
// The recorded fetch is the record of truth; the README and contracts citations must agree with it.
const record = existsSync(SOURCES) ? readFileSync(SOURCES, "utf8") : "";
const recordLines = record.split("\n");
const CITED_PATHS = [
  "programs/compositional-autonomous-computation/00-charter.md",
  "programs/compositional-autonomous-computation/01-semantics.md",
  "lean/ResearchFormal/CVIC/Quotient.lean",
  "lean/ResearchFormal/CVIC/TraceQuotient.lean",
  "lean/ResearchFormal/CVIC/Verification.lean",
  "docs/formalization/THEOREM_REGISTER.md",
];
const recordedRevision = /Revision pinned:[\s\S]*?`([0-9a-f]{40})`/.exec(record)?.[1];
const recordedReadmePin = /README L7 link pin\s*`([0-9a-f]{40})`/.exec(record)?.[1];
const perDocumentRevision = /Per-document record at\s*`([0-9a-f]{40})`/.exec(record)?.[1];
const cvicSentence = contractsL24.split(/(?<=\.)\s/).find(part => part.includes("CVIC")) ?? contractsL24;

test("j6ix P1: the README L7 link target carries tree/<hex>/ equal to the record's 'README L7 link pin'", () => {
  assert.ok(recordedReadmePin, "the record names a 40-hex 'README L7 link pin'");
  const linkPin = /\]\(https:\/\/github\.com\/jehalladay\/research\/tree\/([0-9a-f]{7,40})\//.exec(readmeL7)?.[1];
  assert.ok(linkPin, `L7 link target carries tree/<7-40 hex>/, got: ${readmeL7.slice(0, 160)}`);
  assert.ok(recordedReadmePin.startsWith(linkPin), `L7 link pin ${linkPin} equals the recorded pin ${recordedReadmePin}`);
});

test("j6ix P2: the L24 CVIC revision equals the record's 'Revision pinned'", () => {
  assert.ok(recordedRevision, "the record names a 40-hex 'Revision pinned'");
  const afterCvic = cvicSentence.slice(cvicSentence.indexOf("CVIC"));
  const pinned = /\b[0-9a-f]{40}\b/.exec(afterCvic)?.[0];
  assert.equal(pinned, recordedRevision, "the 40-hex revision after CVIC is the recorded fetch revision");
});

test("j6ix P3: L24 names the CVIC path lean/ResearchFormal/CVIC/ when it carries a pin", () => {
  assert.ok(/\b[0-9a-f]{40}\b/.test(cvicSentence), "L24 carries a 40-hex pin");
  assert.ok(contractsL24.includes("lean/ResearchFormal/CVIC/"), "L24 cites CVIC by path");
});

test("j6ix P4: L24 points at the recorded fetch qa/integration/2026-10-19-cac-sources.md", () => {
  assert.ok(contractsL24.includes("qa/integration/2026-10-19-cac-sources.md"), "L24 names the recorded fetch path");
});

test("j6ix P5: the record's per-document revision equals its pinned revision and differs from the README link pin", () => {
  assert.ok(recordedRevision && perDocumentRevision && recordedReadmePin, "the record names all three 40-hex values");
  assert.equal(perDocumentRevision, recordedRevision, "'Per-document record at' equals 'Revision pinned'");
  assert.notEqual(recordedRevision, recordedReadmePin, "the fetched revision is not the README link pin");
});

test("j6ix P6: each cited path has its own sha256 row or its own unreachable row with URL and date", () => {
  for (const path of CITED_PATHS) {
    const row = recordLines.find(line => line.includes(path));
    assert.ok(row, `the record has a row for ${path}`);
    const hasHash = /\b[0-9a-f]{64}\b/.test(row);
    const hasUnreachable = /unreachable/.test(row) && /https?:\/\//.test(row) && /2026-10-\d{2}/.test(row);
    assert.ok(hasHash || hasUnreachable, `row for ${path} carries a 64-hex sha256 or an unreachable URL and date`);
  }
});

test("j6ix P7: the per-document sha256 values are pairwise distinct", () => {
  const hashes = CITED_PATHS.map(path => /\b[0-9a-f]{64}\b/.exec(recordLines.find(line => line.includes(path)) ?? "")?.[0]).filter(Boolean);
  assert.ok(hashes.length > 1, "at least two hashed rows");
  assert.equal(new Set(hashes).size, hashes.length, "no two cited documents share a sha256");
});
