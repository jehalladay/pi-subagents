import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { resolve } from "node:path";

// CACWC-EAT-R001 (MechanicalWorkflows-44j3): the CAC-WC program README must
// date-bound its design-only statements and must not state an unqualified
// "not an executor/scheduler" while the repository ships a Furnace executor host.
const readmePath = resolve(import.meta.dirname, "..", "docs/programs/cac-workflow-composition-2026-10-18/README.md");

function readmeViolations(text: string): string[] {
  const violations: string[] = [];
  const header = text.split("\n").find(line => line.startsWith("**")) ?? "";
  if (!/Design-only as of 2026-10-18/.test(header)) violations.push("README_HEADER_NOT_DATE_BOUND");
  if (!/(?<!(?:\b(?:not|never|no longer|cannot|fails? to)\b|n['\u2019]t\b)[^.;!?]{0,40}?)\bships?\s+an optional Furnace executor host/i.test(text)) violations.push("README_FURNACE_HOST_UNDISCLOSED");
  if (/\b(?:not|neither)\s+an?\s+(?:(?:workflow|task)\s+)?(?:executor|scheduler)\s*(?:[\/,-]|\b(?:or|and|nor)\b)\s*(?:an?\s+)?(?:(?:workflow|task)\s+)?(?:executor|scheduler)/i.test(text)) violations.push("README_UNQUALIFIED_NOT_AN_EXECUTOR");
  const status = text.split("\n").slice(text.split("\n").findIndex(line => line.trim() === "## Status") + 1).find(line => line.trim() !== "") ?? "";
  if (!status.startsWith("As of 2026-10-18 (19ca8d4)")) violations.push("README_STATUS_NOT_DATE_BOUND");
  return violations;
}

const readme = readFileSync(readmePath, "utf8");

test("CACWC-EAT-R001: the program README date-binds its design-only statements and discloses the Furnace executor host", () => {
  assert.deepEqual(readmeViolations(readme), []);
  assert.match(readme.split("\n").find(line => line.startsWith("**")) ?? "", /Design-only as of 2026-10-18/);
  assert.match(readme, /optional Furnace executor host/);
  assert.doesNotMatch(readme, /not an executor\/scheduler,/);
});

test("CACWC-EAT-R001: the Status paragraph begins with the dated revision anchor", () => {
  assert.match(readme, /## Status\nAs of 2026-10-18 \(19ca8d4\)/);
});

test("CACWC-EAT-R001 control: the pre-remediation header and unqualified executor claim are rejected", () => {
  const old = "# T\n\n**2026-10-18 · Design-only integration program.** MechanicalWorkflows is not an executor/scheduler, Beads status store.\n\n## Status\nThese are research requirements.\n";
  assert.deepEqual(readmeViolations(old), [
    "README_HEADER_NOT_DATE_BOUND",
    "README_FURNACE_HOST_UNDISCLOSED",
    "README_UNQUALIFIED_NOT_AN_EXECUTOR",
    "README_STATUS_NOT_DATE_BOUND",
  ]);
});

test("CACWC-EAT-R001 control: each clause fails independently when only it is removed", () => {
  assert.deepEqual(readmeViolations(readme.replace("Design-only as of 2026-10-18", "Design-only")), ["README_HEADER_NOT_DATE_BOUND"]);
  assert.deepEqual(readmeViolations(readme.replaceAll("optional Furnace executor host", "Furnace host")), ["README_FURNACE_HOST_UNDISCLOSED"]);
  assert.deepEqual(readmeViolations(readme.replace("not a workflow engine/scheduler", "not an executor/scheduler,")), ["README_UNQUALIFIED_NOT_AN_EXECUTOR"]);
  assert.deepEqual(readmeViolations(readme.replace("## Status\nAs of 2026-10-18 (19ca8d4)", "## Status\nAs of today")), ["README_STATUS_NOT_DATE_BOUND"]);
});

// MechanicalWorkflows-cqsd.1 (CACWC-EAT-R001 follow-up, reslice at head of MechanicalWorkflows-cqsd): the guard
// matches the forbidden executor/scheduler claim by pattern (any following punctuation, or/and/workflow variants)
// and the Furnace-host disclosure by positive sentence shape (a negator within 40 same-sentence characters before "ship" refuses it).
test("CACWC-EAT-R001 cqsd.1: an unqualified 'not an executor/scheduler' claim fails whatever punctuation follows it", () => {
  for (const tail of [".", ";", " and Beads status store", ""]) {
    assert.deepEqual(
      readmeViolations(readme.replace("not a workflow engine/scheduler,", `not an executor/scheduler${tail}`)),
      ["README_UNQUALIFIED_NOT_AN_EXECUTOR"],
      `tail ${JSON.stringify(tail)}`,
    );
  }
  for (const claim of ["not an executor or scheduler", "not an executor and scheduler", "not a workflow executor/scheduler", "Not An Executor/Scheduler"]) {
    assert.deepEqual(readmeViolations(readme.replace("not a workflow engine/scheduler", claim)), ["README_UNQUALIFIED_NOT_AN_EXECUTOR"], claim);
  }
});

test("CACWC-EAT-R001 cqsd.1: a negated Furnace-host disclosure fails as undisclosed", () => {
  const disclosure = "it does ship an optional Furnace executor host adapter";
  assert.ok(readme.includes(disclosure), "the README carries the positive disclosure sentence");
  for (const negated of [
    "it does not ship an optional Furnace executor host adapter",
    "it never ships an optional Furnace executor host adapter",
    "it no longer ships an optional Furnace executor host adapter",
    "it doesn't ship an optional Furnace executor host adapter",
  ]) {
    assert.deepEqual(readmeViolations(readme.replace(disclosure, negated)), ["README_FURNACE_HOST_UNDISCLOSED"], negated);
  }
  assert.deepEqual(readmeViolations(readme.replace(disclosure, "an optional Furnace executor host adapter exists")), ["README_FURNACE_HOST_UNDISCLOSED"]);
});

// MechanicalWorkflows-gr3x3 (CACWC-EAT-R001 follow-up to cqsd.1): the negation check tolerates a bounded same-sentence
// window between the negator and "ship", and the claim check covers nor/neither, reversed order, comma, hyphen and
// task-executor variants.
test("CACWC-EAT-R001 gr3x3: an adverb or modal between the negation and 'ship' leaves the Furnace host undisclosed", () => {
  const disclosure = "it does ship an optional Furnace executor host adapter";
  for (const negated of [
    "it does not currently ship an optional Furnace executor host adapter",
    "it cannot ship an optional Furnace executor host adapter",
    "it fails to ship an optional Furnace executor host adapter",
    "it can not yet ship an optional Furnace executor host adapter",
    "it doesn\u2019t currently ship an optional Furnace executor host adapter",
  ]) {
    assert.deepEqual(readmeViolations(readme.replace(disclosure, negated)), ["README_FURNACE_HOST_UNDISCLOSED"], negated);
  }
});

test("CACWC-EAT-R001 gr3x3: nor/neither, reversed, comma, hyphen and task-executor claim variants fail as unqualified", () => {
  for (const claim of [
    "not an executor nor scheduler",
    "neither an executor nor a scheduler",
    "not a scheduler/executor",
    "not a scheduler or executor",
    "not an executor, scheduler",
    "not an executor-scheduler",
    "not a task executor/scheduler",
    "not an executor or a scheduler",
  ]) {
    assert.deepEqual(readmeViolations(readme.replace("not a workflow engine/scheduler", claim)), ["README_UNQUALIFIED_NOT_AN_EXECUTOR"], claim);
  }
});

test("CACWC-EAT-R001 gr3x3 control: a sentence boundary stops the negation window and the qualified README wording stays clean", () => {
  const disclosure = "it does ship an optional Furnace executor host adapter";
  assert.deepEqual(readmeViolations(readme.replace(disclosure, "it never did. It ships an optional Furnace executor host adapter")), []);
  assert.deepEqual(readmeViolations(readme.replace(disclosure, "it ships an optional Furnace executor host adapter")), []);
  assert.deepEqual(readmeViolations(readme.replace("not a workflow engine/scheduler", "not a workflow engine, scheduler")), []);
  assert.deepEqual(readmeViolations(readme), []);
});

// MechanicalWorkflows-eit6p (gr3x3 follow-up): the negation window is {0,40}; pin both edges so a narrower or wider
// bound fails. The gap counts the characters between the negator's word boundary and "ship" (space + filler + space).
test("CACWC-EAT-R001 eit6p: a negator exactly 40 characters before 'ship' still leaves the Furnace host undisclosed", () => {
  const disclosure = "it does ship an optional Furnace executor host adapter";
  assert.deepEqual(
    readmeViolations(readme.replace(disclosure, "it does not " + "x".repeat(38) + " ship an optional Furnace executor host adapter")),
    ["README_FURNACE_HOST_UNDISCLOSED"],
  );
});

test("CACWC-EAT-R001 eit6p control: a negator 41 characters before 'ship' falls outside the window and stays clean", () => {
  const disclosure = "it does ship an optional Furnace executor host adapter";
  assert.deepEqual(
    readmeViolations(readme.replace(disclosure, "it does not " + "x".repeat(39) + " ship an optional Furnace executor host adapter")),
    [],
  );
});

test("CACWC-EAT-R001 cqsd.1 control: the landed README and its positive wording variants yield no violations", () => {
  assert.deepEqual(readmeViolations(readme), []);
  assert.deepEqual(readmeViolations(readme.replace("it does ship an optional", "it ships an optional")), []);
});

// CACWC-EAT-R002 (MechanicalWorkflows-gebd): no source or CAC-WC program document may introduce a VERIFIED task status.
function listFiles(directory: string, suffix: RegExp): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) return entry.name === "node_modules" || entry.name === "dist" ? [] : listFiles(path, suffix);
    return suffix.test(entry.name) ? [path] : [];
  });
}
function verifiedStatusFiles(files: readonly string[]): string[] {
  return files.filter(file => /\bVERIFIED\b/.test(readFileSync(file, "utf8")));
}
const repoRoot = resolve(import.meta.dirname, "..");
const verifiedScope = [
  ...listFiles(resolve(repoRoot, "apps/development-rig/src"), /\.ts$/),
  ...readdirSync(resolve(repoRoot, "packages")).flatMap(name => listFiles(resolve(repoRoot, "packages", name, "src"), /\.ts$/)),
  ...listFiles(resolve(repoRoot, "docs/programs/cac-workflow-composition-2026-10-18"), /\.md$/),
];

test("CACWC-EAT-R002: no source or CAC-WC program document carries the whole-word token VERIFIED", () => {
  assert.ok(verifiedScope.length > 20, "the scan covers the rig, package and CAC-WC document trees");
  assert.deepEqual(verifiedStatusFiles(verifiedScope), []);
});

test("CACWC-EAT-R002 control: the token detector flags VERIFIED and spares verified_candidate and prose", () => {
  const dir = mkdtempSync(resolve(tmpdir(), "mw-verified-"));
  try {
    const flagged = resolve(dir, "flagged.ts");
    const allowed = resolve(dir, "allowed.ts");
    writeFileSync(flagged, 'const status = "VERIFIED";\n');
    writeFileSync(allowed, 'const outcome = "verified_candidate"; // verified by Forge\n');
    assert.deepEqual(verifiedStatusFiles([flagged, allowed]), [flagged]);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

// CACWC-EAT-R014 (MechanicalWorkflows-16f1): the 01 Delivery paragraph names a concrete referent for
// each phase: P0 the six pure combinators and CompositionTree (develop() excluded), P2 the existing
// live-observation / --live-verify path it extends, P3 the witnessed 2026-10-15 journey decision, and
// P4 TrainingWorks as native owner with an adoption record.
const contractsPath = resolve(import.meta.dirname, "..", "docs/programs/cac-workflow-composition-2026-10-18/01-composition-contracts.md");

function deliveryParagraph(text: string): string {
  const lines = text.split("\n");
  const at = lines.findIndex(line => line.trim() === "## Delivery");
  return at < 0 ? "" : (lines.slice(at + 1).find(line => line.trim() !== "") ?? "");
}

function deliveryViolations(text: string): string[] {
  const delivery = deliveryParagraph(text);
  const violations: string[] = [];
  if (!/combinators\.ts/.test(delivery) || !/CompositionTree/.test(delivery) || !/develop\(\)/.test(delivery)) violations.push("DELIVERY_P0_REFERENT_MISSING");
  if (!/live-observation/.test(delivery) || !/--live-verify/.test(delivery)) violations.push("DELIVERY_P2_REFERENT_MISSING");
  if (!/fresh journey required/.test(delivery) && !/2026-10-15-live-claude-forge-verified/.test(delivery)) violations.push("DELIVERY_P3_JOURNEY_UNDECIDED");
  if (!/TrainingWorks/.test(delivery) || !/adoption/.test(delivery)) violations.push("DELIVERY_P4_OWNER_ADOPTION_MISSING");
  return violations;
}

const contracts = readFileSync(contractsPath, "utf8");

test("CACWC-EAT-R014: the 01 Delivery paragraph names a concrete referent for P0, P2, P3 and P4", () => {
  const delivery = deliveryParagraph(contracts);
  assert.match(delivery, /combinators\.ts/);
  assert.match(delivery, /live-observation/);
  assert.ok(/fresh journey required/.test(delivery) || /2026-10-15-live-claude-forge-verified/.test(delivery));
  assert.match(delivery, /TrainingWorks/);
  assert.match(delivery, /adoption/);
  assert.deepEqual(deliveryViolations(contracts), []);
});

test("CACWC-EAT-R014 control: the pre-remediation Delivery paragraph fails all four referent clauses", () => {
  const old = "# T\n\n## Delivery\nP0 reconcile existing pure workflow composition semantics. P1 add design-only reference fields and checker fixtures. P2 optional read-only adapter for existing Forge-gated workflow. P3 bounded validation of one real end-to-end journey and artifact provenance. P4 learned-policy selection/TrainingWorks study only if native owner adopts it.\n";
  assert.deepEqual(deliveryViolations(old), [
    "DELIVERY_P0_REFERENT_MISSING",
    "DELIVERY_P2_REFERENT_MISSING",
    "DELIVERY_P3_JOURNEY_UNDECIDED",
    "DELIVERY_P4_OWNER_ADOPTION_MISSING",
  ]);
  assert.deepEqual(deliveryViolations("no delivery heading"), [
    "DELIVERY_P0_REFERENT_MISSING",
    "DELIVERY_P2_REFERENT_MISSING",
    "DELIVERY_P3_JOURNEY_UNDECIDED",
    "DELIVERY_P4_OWNER_ADOPTION_MISSING",
  ]);
});

test("CACWC-EAT-R014 control: each referent clause fails independently when only it is removed", () => {
  assert.deepEqual(deliveryViolations(contracts.replace("packages/coordination/src/combinators.ts", "the combinator module")), ["DELIVERY_P0_REFERENT_MISSING"]);
  assert.deepEqual(deliveryViolations(contracts.replace("CompositionTree", "the tree")), ["DELIVERY_P0_REFERENT_MISSING"]);
  assert.deepEqual(deliveryViolations(contracts.replace("apps/development-rig/src/live-observation.ts and --live-verify", "an adapter")), ["DELIVERY_P2_REFERENT_MISSING"]);
  assert.deepEqual(deliveryViolations(contracts.replace("--live-verify", "the verify flag")), ["DELIVERY_P2_REFERENT_MISSING"]);
  assert.deepEqual(deliveryViolations(contracts.replaceAll("2026-10-15-live-claude-forge-verified", "the earlier run")), ["DELIVERY_P3_JOURNEY_UNDECIDED"]);
  assert.deepEqual(deliveryViolations(contracts.replace("name the adoption record", "name the record")), ["DELIVERY_P4_OWNER_ADOPTION_MISSING"]);
  assert.deepEqual(deliveryViolations(contracts.replaceAll("TrainingWorks", "the study owner")), ["DELIVERY_P4_OWNER_ADOPTION_MISSING"]);
});

test("CACWC-EAT-R014 control: the develop() clause and the live-observation clause fail independently of their sibling referents (MechanicalWorkflows-wxkx)", () => {
  assert.equal(contracts.split("develop()").length - 1, 1);
  assert.equal(contracts.split("live-observation.ts").length - 1, 1);
  assert.deepEqual(deliveryViolations(contracts.replace("develop()", "develop")), ["DELIVERY_P0_REFERENT_MISSING"]);
  assert.deepEqual(deliveryViolations(contracts.replace("live-observation.ts", "observer.ts")), ["DELIVERY_P2_REFERENT_MISSING"]);
});

test("CACWC-EAT-R014 control: the lint reads only the Delivery paragraph, so --live-verify moved into the Research paragraph fails P2 (MechanicalWorkflows-wxkx)", () => {
  const moved = contracts
    .replace("live-observation.ts and --live-verify", "live-observation.ts")
    .replace("Do not infer global optimality", "The --live-verify flag is named here, outside Delivery. Do not infer global optimality");
  assert.notEqual(moved, contracts);
  assert.ok(/--live-verify/.test(moved), "the whole file still names --live-verify, so a whole-file lint would pass");
  assert.deepEqual(deliveryViolations(moved), ["DELIVERY_P2_REFERENT_MISSING"]);
});

test("CACWC-EAT-R014 control: either P3 decision value satisfies the lint", () => {
  const fresh = contracts.replace(/a fresh journey is required/g, "fresh journey required").replaceAll("2026-10-15-live-claude-forge-verified", "x");
  assert.deepEqual(deliveryViolations(fresh), []);
});
