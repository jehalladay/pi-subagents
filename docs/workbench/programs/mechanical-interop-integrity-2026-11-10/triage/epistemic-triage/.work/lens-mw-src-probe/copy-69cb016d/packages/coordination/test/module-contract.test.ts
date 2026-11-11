// MechanicalWorkflows-3l61.9 (APO-018): per-module declared resource, evidence and timing contract. Every
// assertion here has FIXTURE grade: a contract is a declaration, and nothing in this file observes a runtime.
import { strict as assert } from "node:assert";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { checkGlobalCapacity, checkModuleExclusion, validateModuleContract } from "../dist/index.js";
import type { Budget, ModuleContract } from "../dist/index.js";

const here = dirname(fileURLToPath(import.meta.url));
const moduleSource = readFileSync(join(here, "..", "src", "module-contract.ts"), "utf8");
const requirementRows = readFileSync(join(here, "..", "..", "..", "docs", "programs", "adaptive-policy-organizations-2026-10-18", "02-atomic-requirements.md"), "utf8").split("\n");

function contract(overrides: Record<string, unknown> = {}): ModuleContract {
  return {
    moduleId: "mod-a",
    revision: "rev-1",
    resourceEnvelope: { compute: 2, workers: 1, queue: 4, latencyMs: 100 },
    evidence: { requiredSourceRevisions: ["rev-7"], requiredCoverageRefs: ["cov-1"] },
    timing: { maxLatencyMs: 500, maxStepsPerEpisode: 8 },
    effectClasses: ["land"],
    exclusive: [],
    ...overrides,
  } as ModuleContract;
}

const globalBudget: Budget = { compute: 6, workers: 3, queue: 12, latencyMs: 300 };

function refusalOf(result: unknown): { code: string; detail: string } {
  const r = result as { ok: boolean; code?: string; detail?: string };
  assert.equal(r.ok, false);
  return { code: r.code ?? "", detail: r.detail ?? "" };
}

function keysDeep(value: unknown, out: string[] = []): string[] {
  if (Array.isArray(value)) for (const item of value) keysDeep(item, out);
  else if (value !== null && typeof value === "object") {
    for (const [key, child] of Object.entries(value)) {
      out.push(key);
      keysDeep(child, out);
    }
  }
  return out;
}

// A1
test("A1: a well-formed contract validates and comes back frozen, equal to the input", () => {
  const input = contract({ exclusive: ["lock-1"] });
  const result = validateModuleContract(input);
  assert.equal(result.ok, true);
  if (!result.ok) return;
  assert.deepEqual(result.contract, input);
  for (const frozen of [result.contract, result.contract.resourceEnvelope, result.contract.evidence, result.contract.evidence.requiredSourceRevisions, result.contract.evidence.requiredCoverageRefs, result.contract.timing, result.contract.effectClasses, result.contract.exclusive]) {
    assert.equal(Object.isFrozen(frozen), true);
  }
});

// A2
test("A2: a blank moduleId or revision is refused by field name", () => {
  for (const field of ["moduleId", "revision"]) {
    for (const blank of ["", "   "]) {
      const { code, detail } = refusalOf(validateModuleContract(contract({ [field]: blank })));
      assert.equal(code, "MODULE_CONTRACT_MALFORMED");
      assert.ok(detail.includes(field), detail);
    }
  }
});

test("A2: a negative or non-finite number in any envelope or timing field is refused by field name", () => {
  for (const dimension of ["compute", "workers", "queue", "latencyMs"]) {
    for (const bad of [-1, Number.NaN, Number.POSITIVE_INFINITY, "3"]) {
      const { code, detail } = refusalOf(validateModuleContract(contract({ resourceEnvelope: { ...contract().resourceEnvelope, [dimension]: bad } })));
      assert.equal(code, "MODULE_CONTRACT_MALFORMED");
      assert.ok(detail.includes(`resourceEnvelope.${dimension}`), detail);
    }
  }
  for (const field of ["maxLatencyMs", "maxStepsPerEpisode"]) {
    for (const bad of [-1, Number.NaN, Number.POSITIVE_INFINITY]) {
      const { code, detail } = refusalOf(validateModuleContract(contract({ timing: { ...contract().timing, [field]: bad } })));
      assert.equal(code, "MODULE_CONTRACT_MALFORMED");
      assert.ok(detail.includes(`timing.${field}`), detail);
    }
  }
});

test("A2: a missing envelope dimension is refused, never defaulted to zero", () => {
  const { code, detail } = refusalOf(validateModuleContract(contract({ resourceEnvelope: { compute: 1, workers: 1, queue: 1 } })));
  assert.equal(code, "MODULE_CONTRACT_MALFORMED");
  assert.ok(detail.includes("resourceEnvelope.latencyMs"), detail);
});

test("A2: a duplicate effect class or exclusive token is refused by field name", () => {
  for (const field of ["effectClasses", "exclusive"]) {
    const { code, detail } = refusalOf(validateModuleContract(contract({ [field]: ["x", "y", "x"] })));
    assert.equal(code, "MODULE_CONTRACT_MALFORMED");
    assert.ok(detail.includes(field), detail);
  }
});

// MechanicalWorkflows-nwecn (h591 ruling OPTION B, h25x R03_TOPORDER / X6): the top-level refusal order of
// validateModuleContract is law and effectClasses is read before exclusive. A first-failure validator reports
// exactly one refusal, so which of two malformed fields it names is observable contract surface; a reader swap
// (exclusive first) must fail here.
test("A2: when effectClasses and exclusive are both malformed the refusal names effectClasses only", () => {
  const bothMalformed: ReadonlyArray<readonly [string, unknown, unknown]> = [
    ["both non-array", "land", "db"],
    ["both repeat an entry", ["x", "y", "x"], ["z", "z"]],
    ["effectClasses repeats, exclusive non-array", ["x", "x"], 7],
    ["effectClasses non-array, exclusive repeats", "land", ["z", "z"]],
    ["both carry a blank entry", [""], [""]],
  ];
  for (const [label, effectClasses, exclusive] of bothMalformed) {
    const { code, detail } = refusalOf(validateModuleContract(contract({ effectClasses, exclusive })));
    assert.equal(code, "MODULE_CONTRACT_MALFORMED", label);
    assert.ok(detail.startsWith("effectClasses:"), `${label}: ${detail}`);
    assert.ok(!detail.includes("exclusive"), `${label}: ${detail}`);
  }
  assert.equal(
    refusalOf(validateModuleContract(contract({ effectClasses: ["x", "y", "x"], exclusive: ["z", "z"] }))).detail,
    "effectClasses: duplicate entry x",
  );
  // The order is not an artefact of the other field: exclusive malformed alone is still refused by its own name.
  assert.equal(refusalOf(validateModuleContract(contract({ exclusive: ["z", "z"] }))).detail, "exclusive: duplicate entry z");
});

test("A2: a blank or non-string entry in a list field is refused by field name", () => {
  for (const bad of ["", 3]) {
    const { code, detail } = refusalOf(validateModuleContract(contract({ evidence: { requiredSourceRevisions: [bad], requiredCoverageRefs: [] } })));
    assert.equal(code, "MODULE_CONTRACT_MALFORMED");
    assert.ok(detail.includes("evidence.requiredSourceRevisions"), detail);
  }
  const { detail } = refusalOf(validateModuleContract(contract({ effectClasses: "land" })));
  assert.ok(detail.includes("effectClasses"), detail);
});

test("A2: an unknown top-level or nested field is refused by name", () => {
  const top = refusalOf(validateModuleContract(contract({ surprise: 1 })));
  assert.equal(top.code, "MODULE_CONTRACT_MALFORMED");
  assert.ok(top.detail.includes("surprise"), top.detail);
  const nested = refusalOf(validateModuleContract(contract({ resourceEnvelope: { ...contract().resourceEnvelope, gpus: 1 } })));
  assert.ok(nested.detail.includes("resourceEnvelope.gpus"), nested.detail);
});

test("A2: a non-object input is refused", () => {
  for (const bad of [null, undefined, 3, "x", []]) {
    assert.equal(refusalOf(validateModuleContract(bad)).code, "MODULE_CONTRACT_MALFORMED");
  }
});

// A6
test("A6: timing must be present and both bounds positive finite integers", () => {
  const withoutTiming: Record<string, unknown> = { ...contract() };
  delete withoutTiming.timing;
  const missing = refusalOf(validateModuleContract(withoutTiming));
  assert.equal(missing.code, "MODULE_CONTRACT_MALFORMED");
  assert.equal(missing.detail.startsWith("timing"), true, missing.detail);
  for (const [field, bad] of [["maxStepsPerEpisode", 0], ["maxStepsPerEpisode", 1.5], ["maxLatencyMs", 0], ["maxLatencyMs", 2.5]] as const) {
    const { code, detail } = refusalOf(validateModuleContract(contract({ timing: { ...contract().timing, [field]: bad } })));
    assert.equal(code, "MODULE_CONTRACT_MALFORMED");
    assert.ok(detail.includes(`timing.${field}`), detail);
  }
  assert.equal(validateModuleContract(contract({ timing: { maxLatencyMs: 1, maxStepsPerEpisode: 1 } })).ok, true);
});

// A3
test("A3: a set whose declared demand sums over the global budget is refused with the dimension, sum, budget and contributors", () => {
  const set = [
    contract({ moduleId: "m1", resourceEnvelope: { compute: 4, workers: 1, queue: 1, latencyMs: 10 } }),
    contract({ moduleId: "m2", resourceEnvelope: { compute: 0, workers: 1, queue: 1, latencyMs: 10 } }),
    contract({ moduleId: "m3", resourceEnvelope: { compute: 3, workers: 1, queue: 1, latencyMs: 10 } }),
  ];
  const result = checkGlobalCapacity(set, globalBudget) as unknown as { ok: boolean; code: string; detail: string; moduleIds: string[] };
  assert.equal(result.ok, false);
  assert.equal(result.code, "MODULE_CONTRACT_GLOBAL_CAPACITY_EXCEEDED");
  assert.ok(result.detail.includes("compute"), result.detail);
  assert.ok(result.detail.includes("7"), result.detail);
  assert.ok(result.detail.includes("6"), result.detail);
  assert.deepEqual(result.moduleIds, ["m1", "m3"], "contributors in input order; m2 demands none of the exceeded dimension");
  assert.ok(result.detail.indexOf("m1") < result.detail.indexOf("m3"), result.detail);
});

test("A3: no single module exceeds the budget yet the sum does, so a per-module comparison would admit it", () => {
  const set = [
    contract({ moduleId: "m1", resourceEnvelope: { compute: 1, workers: 2, queue: 1, latencyMs: 10 } }),
    contract({ moduleId: "m2", resourceEnvelope: { compute: 1, workers: 2, queue: 1, latencyMs: 10 } }),
  ];
  const result = checkGlobalCapacity(set, globalBudget) as unknown as { ok: boolean; code: string; detail: string };
  assert.equal(result.ok, false);
  assert.equal(result.code, "MODULE_CONTRACT_GLOBAL_CAPACITY_EXCEEDED");
  assert.ok(result.detail.includes("workers"), result.detail);
});

test("A3: a sum equal to the budget is admitted and reports per-dimension headroom", () => {
  const set = [
    contract({ moduleId: "m1", resourceEnvelope: { compute: 3, workers: 1, queue: 6, latencyMs: 100 } }),
    contract({ moduleId: "m2", resourceEnvelope: { compute: 3, workers: 1, queue: 5, latencyMs: 100 } }),
  ];
  const result = checkGlobalCapacity(set, globalBudget);
  assert.equal(result.ok, true);
  if (!result.ok) return;
  assert.deepEqual(result.sums, { compute: 6, workers: 2, queue: 11, latencyMs: 200 });
  assert.deepEqual(result.headroom, { compute: 0, workers: 1, queue: 1, latencyMs: 100 });
});

test("A3: an empty set is admitted with the whole budget as headroom", () => {
  const result = checkGlobalCapacity([], globalBudget);
  assert.equal(result.ok, true);
  if (!result.ok) return;
  assert.deepEqual(result.headroom, globalBudget);
});

test("A3: a duplicate moduleId is refused as malformed before any summing", () => {
  const huge = { compute: 1000, workers: 1000, queue: 1000, latencyMs: 1000 };
  const set = [contract({ moduleId: "dup", resourceEnvelope: huge }), contract({ moduleId: "dup", resourceEnvelope: huge })];
  const { code, detail } = refusalOf(checkGlobalCapacity(set, globalBudget));
  assert.equal(code, "MODULE_CONTRACT_MALFORMED");
  assert.ok(detail.includes("dup"), detail);
});

test("A3: a malformed member or a malformed global budget is refused as malformed", () => {
  const member = refusalOf(checkGlobalCapacity([contract({ revision: "" })], globalBudget));
  assert.equal(member.code, "MODULE_CONTRACT_MALFORMED");
  assert.ok(member.detail.includes("revision"), member.detail);
  const budget = refusalOf(checkGlobalCapacity([contract()], { ...globalBudget, queue: -1 }));
  assert.equal(budget.code, "MODULE_CONTRACT_MALFORMED");
  assert.ok(budget.detail.includes("globalBudget.queue"), budget.detail);
});

// A4
test("A4: two contracts naming the same exclusive token are refused naming the token and both moduleIds", () => {
  const set = [contract({ moduleId: "m1", exclusive: ["lock-a"] }), contract({ moduleId: "m2", exclusive: ["lock-b", "lock-a"] })];
  const result = checkModuleExclusion(set) as unknown as { ok: boolean; code: string; detail: string; token: string; moduleIds: string[] };
  assert.equal(result.ok, false);
  assert.equal(result.code, "MODULE_CONTRACT_EXCLUSION_CONFLICT");
  assert.equal(result.token, "lock-a");
  assert.deepEqual(result.moduleIds, ["m1", "m2"]);
  assert.ok(result.detail.includes("lock-a") && result.detail.includes("m1") && result.detail.includes("m2"), result.detail);
});

test("A4: disjoint tokens pass and the verdict is order-independent", () => {
  const disjoint = [contract({ moduleId: "m1", exclusive: ["a"] }), contract({ moduleId: "m2", exclusive: ["b"] })];
  assert.equal(checkModuleExclusion(disjoint).ok, true);
  assert.equal(checkModuleExclusion([...disjoint].reverse()).ok, true);
  const clash = [contract({ moduleId: "m9", exclusive: ["t"] }), contract({ moduleId: "m2", exclusive: ["t"] })];
  assert.deepEqual(checkModuleExclusion(clash), checkModuleExclusion([...clash].reverse()));
  assert.deepEqual((checkModuleExclusion(clash) as unknown as { moduleIds: string[] }).moduleIds, ["m2", "m9"]);
});

test("A4: a duplicate moduleId or a malformed member is refused as malformed", () => {
  const dup = refusalOf(checkModuleExclusion([contract({ moduleId: "d" }), contract({ moduleId: "d" })]));
  assert.equal(dup.code, "MODULE_CONTRACT_MALFORMED");
  const bad = refusalOf(checkModuleExclusion([contract({ moduleId: "" })]));
  assert.equal(bad.code, "MODULE_CONTRACT_MALFORMED");
});

// A5
test("A5: every result carries the literal grade declared and no field claims proof or measurement", () => {
  const results: unknown[] = [
    validateModuleContract(contract()),
    validateModuleContract(contract({ moduleId: "" })),
    checkGlobalCapacity([contract()], globalBudget),
    checkGlobalCapacity([contract({ resourceEnvelope: { compute: 99, workers: 1, queue: 1, latencyMs: 1 } })], globalBudget),
    checkGlobalCapacity([contract({ moduleId: "" })], globalBudget),
    checkModuleExclusion([contract()]),
    checkModuleExclusion([contract({ exclusive: ["t"] }), contract({ moduleId: "other", exclusive: ["t"] })]),
    checkModuleExclusion([contract({ moduleId: "" })]),
  ];
  const forbidden = new Set(["proven", "measured", "verified", "capacityProof"]);
  for (const result of results) {
    assert.equal((result as { grade: unknown }).grade, "declared");
    for (const key of keysDeep(result)) assert.equal(forbidden.has(key), false, key);
  }
});

test("A5: the module observes no clock, timer or randomness", () => {
  for (const token of ["Date" + ".now", "performance" + ".now", "setTime" + "out", "Math" + ".random"]) {
    assert.equal(moduleSource.includes(token), false, token);
  }
});

// A8
test("A8: the 02 row stays TARGET and the module source never claims completion or proven capacity", () => {
  assert.ok((requirementRows[23] ?? "").startsWith("| APO-018 TARGET |"), requirementRows[23]);
  assert.equal(/APO-018[^\n]*(complete|done|closed)/i.test(moduleSource), false);
  assert.equal(/capacity (is |was )?(proven|verified)/i.test(moduleSource), false);
});

// MechanicalWorkflows-crwv: seven laws the A1..A8 rows leave open (rows OW1..OW8 of the 3l61.9 follow-up lead).
// OW6 (R1): a missing or array-valued object field is refused with "<field>: must be an object", never thrown.
test("OW6: a missing or array-valued resourceEnvelope, evidence or timing is refused as 'must be an object' and never thrown", () => {
  for (const field of ["resourceEnvelope", "evidence", "timing"]) {
    const missing: Record<string, unknown> = { ...contract() };
    delete missing[field];
    for (const input of [missing, contract({ [field]: [] })]) {
      const { code, detail } = refusalOf(validateModuleContract(input));
      assert.equal(code, "MODULE_CONTRACT_MALFORMED");
      assert.equal(detail, `${field}: must be an object`);
    }
  }
});

test("OW6: a non-object globalBudget is refused as 'globalBudget: must be an object' and never thrown", () => {
  for (const bad of [null, undefined, 3, "x", []]) {
    const { code, detail } = refusalOf(checkGlobalCapacity([contract()], bad as unknown as Budget));
    assert.equal(code, "MODULE_CONTRACT_MALFORMED");
    assert.equal(detail, "globalBudget: must be an object");
  }
});

// OW7 (R2): an unknown nested evidence or timing field is refused by name.
test("OW7: an unknown nested evidence or timing field is refused MODULE_CONTRACT_MALFORMED by name", () => {
  const evidence = refusalOf(validateModuleContract(contract({ evidence: { ...contract().evidence, extra: 1 } })));
  assert.equal(evidence.code, "MODULE_CONTRACT_MALFORMED");
  assert.equal(evidence.detail, "evidence.extra: unknown field");
  const timing = refusalOf(validateModuleContract(contract({ timing: { ...contract().timing, extra: 1 } })));
  assert.equal(timing.code, "MODULE_CONTRACT_MALFORMED");
  assert.equal(timing.detail, "timing.extra: unknown field");
});

// OW8 (R3): an invalid requiredCoverageRefs list is refused (the A2 row pins only requiredSourceRevisions).
test("OW8: an invalid requiredCoverageRefs list is refused MODULE_CONTRACT_MALFORMED by field name", () => {
  const sourceRevisions = contract().evidence.requiredSourceRevisions;
  for (const bad of ["cov-1", [""], [3]]) {
    const { code, detail } = refusalOf(validateModuleContract(contract({ evidence: { requiredSourceRevisions: sourceRevisions, requiredCoverageRefs: bad } })));
    assert.equal(code, "MODULE_CONTRACT_MALFORMED");
    assert.ok(detail.startsWith("evidence.requiredCoverageRefs: "), detail);
  }
});

// OW1, OW2 (R4): two exceeded dimensions both report, and a contributor to only one of them is still named.
test("OW1/OW2: two exceeded dimensions are both reported with sum and budget in place and a one-dimension contributor is named", () => {
  const set = [
    contract({ moduleId: "m1", resourceEnvelope: { compute: 4, workers: 1, queue: 1, latencyMs: 10 } }),
    contract({ moduleId: "m2", resourceEnvelope: { compute: 3, workers: 1, queue: 1, latencyMs: 10 } }),
    contract({ moduleId: "m3", resourceEnvelope: { compute: 0, workers: 2, queue: 1, latencyMs: 10 } }),
    contract({ moduleId: "m4", resourceEnvelope: { compute: 0, workers: 0, queue: 1, latencyMs: 10 } }),
  ];
  const result = checkGlobalCapacity(set, globalBudget) as unknown as { ok: boolean; code: string; detail: string; exceeded: unknown[]; moduleIds: string[] };
  assert.equal(result.ok, false);
  assert.equal(result.code, "MODULE_CONTRACT_GLOBAL_CAPACITY_EXCEEDED");
  assert.deepEqual(result.exceeded, [
    { dimension: "compute", sum: 7, budget: 6 },
    { dimension: "workers", sum: 4, budget: 3 },
  ]);
  assert.deepEqual(result.moduleIds, ["m1", "m2", "m3"], "m3 demands only workers, m4 demands neither exceeded dimension");
  assert.equal(result.detail, "compute declared sum 7 exceeds budget 6; workers declared sum 4 exceeds budget 3 (modules: m1, m2, m3)");
});

// OW3 (R5): contributors come back in input order, not sorted.
test("OW3: contributors come back in input order, not sorted", () => {
  const demand = { compute: 4, workers: 0, queue: 0, latencyMs: 0 };
  const set = [contract({ moduleId: "m9", resourceEnvelope: demand }), contract({ moduleId: "m2", resourceEnvelope: demand }), contract({ moduleId: "m5", resourceEnvelope: demand })];
  const result = checkGlobalCapacity(set, globalBudget) as unknown as { moduleIds: string[]; detail: string };
  assert.deepEqual(result.moduleIds, ["m9", "m2", "m5"]);
  assert.ok(result.detail.endsWith("(modules: m9, m2, m5)"), result.detail);
});

// OW4 (R6): two clashing tokens report the lexically first token whatever the input order.
test("OW4: with two clashing tokens the lexically first is reported in either input order", () => {
  const forward = [contract({ moduleId: "m1", exclusive: ["tok-z", "tok-a"] }), contract({ moduleId: "m2", exclusive: ["tok-a", "tok-z"] })];
  const reversed = [...forward].reverse();
  for (const set of [forward, reversed]) {
    const result = checkModuleExclusion(set) as unknown as { ok: boolean; token: string; moduleIds: string[] };
    assert.equal(result.ok, false);
    assert.equal(result.token, "tok-a");
    assert.deepEqual(result.moduleIds, ["m1", "m2"]);
  }
  assert.deepEqual(checkModuleExclusion(forward), checkModuleExclusion(reversed));
});

// OW5 (R7): a malformed second member is named by its index.
test("OW5: a malformed second member is named contracts[1].<field> by both set checks", () => {
  const set = [contract({ moduleId: "ok" }), contract({ moduleId: "m2", revision: "" })];
  assert.equal(refusalOf(checkGlobalCapacity(set, globalBudget)).detail, "contracts[1].revision: must be a non-blank string");
  assert.equal(refusalOf(checkModuleExclusion(set)).detail, "contracts[1].revision: must be a non-blank string");
});

// MechanicalWorkflows-1o5p (crwv follow-up, lead X1/X2/X3/OW10/OW11 forms): a missing evidence list is refused, never
// defaulted to an empty list; the exclusion detail joins holders with a comma and a space; results are frozen and the
// validated lists are copies of the caller's arrays. The EVDIST/OW9 duplicate-refusal family stays unpinned pending a ruling.

// R1 (X1, X2): an evidence member that is absent, not merely bad-valued, is refused by field name.
test("1o5p R1: an evidence object that omits requiredCoverageRefs or requiredSourceRevisions is refused, never defaulted to an empty list", () => {
  const withoutCoverage = refusalOf(validateModuleContract(contract({ evidence: { requiredSourceRevisions: ["rev-7"] } })));
  assert.equal(withoutCoverage.code, "MODULE_CONTRACT_MALFORMED");
  assert.equal(withoutCoverage.detail, "evidence.requiredCoverageRefs: must be an array of strings");
  const withoutRevisions = refusalOf(validateModuleContract(contract({ evidence: { requiredCoverageRefs: ["cov-1"] } })));
  assert.equal(withoutRevisions.code, "MODULE_CONTRACT_MALFORMED");
  assert.equal(withoutRevisions.detail, "evidence.requiredSourceRevisions: must be an array of strings");
});

// R2 (X3): the exclusive-token detail joins the sorted holders with a comma and a space.
test("1o5p R2: the exclusive-token refusal detail names the holders joined by a comma and a space", () => {
  const set = [contract({ moduleId: "m2", exclusive: ["tok-a"] }), contract({ moduleId: "m1", exclusive: ["tok-a"] })];
  const { code, detail } = refusalOf(checkModuleExclusion(set));
  assert.equal(code, "MODULE_CONTRACT_EXCLUSION_CONFLICT");
  assert.equal(detail, "exclusive token tok-a is declared by m1, m2");
});

// R3 (OW10, OW11): capacity results come back frozen, and validation copies the caller's arrays instead of freezing them.
test("1o5p R3: an admitted capacity result returns sums and headroom frozen", () => {
  const result = checkGlobalCapacity([contract({ moduleId: "m1" })], globalBudget);
  assert.equal(result.ok, true);
  if (!result.ok) return;
  assert.equal(Object.isFrozen(result.sums), true);
  assert.equal(Object.isFrozen(result.headroom), true);
});

test("1o5p R3: a refused capacity result returns exceeded and moduleIds frozen", () => {
  const demand = { compute: 4, workers: 0, queue: 0, latencyMs: 0 };
  const result = checkGlobalCapacity([contract({ moduleId: "m1", resourceEnvelope: demand }), contract({ moduleId: "m2", resourceEnvelope: demand })], globalBudget);
  assert.equal(result.ok, false);
  if (result.ok || result.code !== "MODULE_CONTRACT_GLOBAL_CAPACITY_EXCEEDED") return assert.fail("expected a capacity refusal");
  assert.equal(Object.isFrozen(result.exceeded), true);
  assert.equal(Object.isFrozen(result.moduleIds), true);
});

test("1o5p R3: validation returns copies and leaves the caller's list arrays unfrozen", () => {
  const sourceRevisions = ["rev-7"];
  const coverageRefs = ["cov-1"];
  const effectClasses = ["land"];
  const exclusive = ["lock-1"];
  const result = validateModuleContract(contract({ evidence: { requiredSourceRevisions: sourceRevisions, requiredCoverageRefs: coverageRefs }, effectClasses, exclusive }));
  assert.equal(result.ok, true);
  if (!result.ok) return;
  assert.notEqual(result.contract.evidence.requiredSourceRevisions, sourceRevisions);
  assert.notEqual(result.contract.evidence.requiredCoverageRefs, coverageRefs);
  assert.notEqual(result.contract.effectClasses, effectClasses);
  assert.notEqual(result.contract.exclusive, exclusive);
  for (const input of [sourceRevisions, coverageRefs, effectClasses, exclusive]) assert.equal(Object.isFrozen(input), false);
  sourceRevisions.push("rev-8");
  assert.deepEqual(result.contract.evidence.requiredSourceRevisions, ["rev-7"], "a later caller edit does not reach the validated contract");
});

// MechanicalWorkflows-h25x (1o5p follow-up, lead Y1..Y8 forms): an omitted list member is refused, never defaulted; the
// evidence refusal order is requiredSourceRevisions first; a clash among three holders names and returns every holder
// sorted and frozen; validation copies resourceEnvelope and timing and leaves the caller's objects unfrozen. The
// EVDIST/OW9 duplicate-refusal family is pinned below under MechanicalWorkflows-g60nb (dz45 ruling, option B).

function withoutKey(field: string): ModuleContract {
  const input = contract() as unknown as Record<string, unknown>;
  delete input[field];
  return input as unknown as ModuleContract;
}

// Y1, Y2: a list member that is absent, not merely bad-valued, is refused by field name.
test("h25x Y1: a contract that omits effectClasses is refused, never defaulted to an empty list", () => {
  const { code, detail } = refusalOf(validateModuleContract(withoutKey("effectClasses")));
  assert.equal(code, "MODULE_CONTRACT_MALFORMED");
  assert.equal(detail, "effectClasses: must be an array of strings");
});

test("h25x Y2: a contract that omits exclusive is refused, never defaulted to an empty list", () => {
  const { code, detail } = refusalOf(validateModuleContract(withoutKey("exclusive")));
  assert.equal(code, "MODULE_CONTRACT_MALFORMED");
  assert.equal(detail, "exclusive: must be an array of strings");
});

// Y3: with both evidence lists absent, the first refusal names requiredSourceRevisions.
test("h25x Y3: an empty evidence object is refused naming requiredSourceRevisions before requiredCoverageRefs", () => {
  const { code, detail } = refusalOf(validateModuleContract(contract({ evidence: {} })));
  assert.equal(code, "MODULE_CONTRACT_MALFORMED");
  assert.equal(detail, "evidence.requiredSourceRevisions: must be an array of strings");
});

// Y4, Y5: three holders of one token are all named, sorted whatever the input order.
test("h25x Y4/Y5: a three-holder clash names and returns every holder sorted in every input order", () => {
  const holders = [
    contract({ moduleId: "m3", exclusive: ["tok-a"] }),
    contract({ moduleId: "m1", exclusive: ["tok-a"] }),
    contract({ moduleId: "m2", exclusive: ["tok-a"] }),
  ];
  const orders = [holders, [holders[1]!, holders[2]!, holders[0]!], [...holders].reverse()];
  for (const set of orders) {
    const result = checkModuleExclusion(set) as unknown as { ok: boolean; code: string; detail: string; token: string; moduleIds: string[] };
    assert.equal(result.ok, false);
    assert.equal(result.code, "MODULE_CONTRACT_EXCLUSION_CONFLICT");
    assert.equal(result.token, "tok-a");
    assert.equal(result.detail, "exclusive token tok-a is declared by m1, m2, m3");
    assert.deepEqual(result.moduleIds, ["m1", "m2", "m3"]);
  }
});

// Y6: the exclusion refusal's holder list is frozen, as the capacity refusal's is.
test("h25x Y6: an exclusion refusal returns moduleIds frozen", () => {
  const result = checkModuleExclusion([contract({ moduleId: "m1", exclusive: ["tok-a"] }), contract({ moduleId: "m2", exclusive: ["tok-a"] })]);
  assert.equal(result.ok, false);
  if (result.ok || result.code !== "MODULE_CONTRACT_EXCLUSION_CONFLICT") return assert.fail("expected an exclusion refusal");
  assert.equal(Object.isFrozen(result.moduleIds), true);
});

// Y7, Y8: validation copies the envelope and timing objects and leaves the caller's objects unfrozen and unlinked.
test("h25x Y7: validation copies resourceEnvelope and leaves the caller's object unfrozen and unlinked", () => {
  const envelope = { compute: 2, workers: 1, queue: 4, latencyMs: 100 };
  const result = validateModuleContract(contract({ resourceEnvelope: envelope }));
  assert.equal(result.ok, true);
  if (!result.ok) return;
  assert.notEqual(result.contract.resourceEnvelope, envelope);
  assert.equal(Object.isFrozen(envelope), false);
  envelope.compute = 99;
  assert.equal(result.contract.resourceEnvelope.compute, 2, "a later caller edit does not reach the validated contract");
});

test("h25x Y8: validation copies timing and leaves the caller's object unfrozen and unlinked", () => {
  const timing = { maxLatencyMs: 500, maxStepsPerEpisode: 8 };
  const result = validateModuleContract(contract({ timing }));
  assert.equal(result.ok, true);
  if (!result.ok) return;
  assert.notEqual(result.contract.timing, timing);
  assert.equal(Object.isFrozen(timing), false);
  timing.maxLatencyMs = 1;
  assert.equal(result.contract.timing.maxLatencyMs, 500, "a later caller edit does not reach the validated contract");
});

// MechanicalWorkflows-utol (h25x follow-up, lead X1..X7 forms): a null list is refused on all four list fields, never
// defaulted; the exclusion refusal names every holder at arities four and five and under rotation; validation never
// writes into or freezes the caller's evidence object. The top-level validation order (R03) stays unpinned pending
// its own ruling; the EVDIST/OW9 evidence-list duplicates are pinned below under MechanicalWorkflows-g60nb (dz45 ruling).

// R01_LISTNULL (X1..X4): a null list is a type refusal by field name, not an empty list.
test("utol R01: a null effectClasses is refused by field name and never defaulted to an empty list", () => {
  const { code, detail } = refusalOf(validateModuleContract(contract({ effectClasses: null })));
  assert.equal(code, "MODULE_CONTRACT_MALFORMED");
  assert.equal(detail, "effectClasses: must be an array of strings");
});

test("utol R01: a null exclusive is refused by field name and never defaulted to an empty list", () => {
  const { code, detail } = refusalOf(validateModuleContract(contract({ exclusive: null })));
  assert.equal(code, "MODULE_CONTRACT_MALFORMED");
  assert.equal(detail, "exclusive: must be an array of strings");
});

test("utol R01: a null requiredSourceRevisions is refused by field name and never defaulted to an empty list", () => {
  const { code, detail } = refusalOf(validateModuleContract(contract({ evidence: { requiredSourceRevisions: null, requiredCoverageRefs: ["cov-1"] } })));
  assert.equal(code, "MODULE_CONTRACT_MALFORMED");
  assert.equal(detail, "evidence.requiredSourceRevisions: must be an array of strings");
});

test("utol R01: a null requiredCoverageRefs is refused by field name and never defaulted to an empty list", () => {
  const { code, detail } = refusalOf(validateModuleContract(contract({ evidence: { requiredSourceRevisions: ["rev-7"], requiredCoverageRefs: null } })));
  assert.equal(code, "MODULE_CONTRACT_MALFORMED");
  assert.equal(detail, "evidence.requiredCoverageRefs: must be an array of strings");
});

test("utol R01: a null list inside a set is refused by both set checks naming the member index and field", () => {
  const set = [contract({ moduleId: "m1" }), contract({ moduleId: "m2", exclusive: null })];
  const exclusion = refusalOf(checkModuleExclusion(set));
  assert.equal(exclusion.code, "MODULE_CONTRACT_MALFORMED");
  assert.equal(exclusion.detail, "contracts[1].exclusive: must be an array of strings");
  const capacity = refusalOf(checkGlobalCapacity(set, globalBudget));
  assert.equal(capacity.code, "MODULE_CONTRACT_MALFORMED");
  assert.equal(capacity.detail, "contracts[1].exclusive: must be an array of strings");
});

// R02_HOLDERS3 (X5): the exclusion refusal names EVERY clashing holder, at every arity and under rotation.
test("utol R02: a four-holder and a five-holder clash name and return every holder sorted under every rotation", () => {
  const ladders: ReadonlyArray<readonly string[]> = [
    ["m3", "m1", "m4", "m2"],
    ["m5", "m3", "m1", "m4", "m2"],
  ];
  for (const ids of ladders) {
    const sorted = [...ids].sort();
    const holders = ids.map((moduleId) => contract({ moduleId, exclusive: ["tok-a"] }));
    for (let shift = 0; shift < holders.length; shift += 1) {
      const set = [...holders.slice(shift), ...holders.slice(0, shift)];
      const result = checkModuleExclusion(set) as unknown as { ok: boolean; code: string; detail: string; token: string; moduleIds: string[] };
      assert.equal(result.ok, false);
      assert.equal(result.code, "MODULE_CONTRACT_EXCLUSION_CONFLICT");
      assert.equal(result.token, "tok-a");
      assert.equal(result.detail, `exclusive token tok-a is declared by ${sorted.join(", ")}`);
      assert.deepEqual(result.moduleIds, sorted);
    }
  }
});

test("utol R02: holders sort lexically, not numerically, so m10 precedes m2 in a four-holder clash", () => {
  const set = ["m2", "m10", "m1", "m3"].map((moduleId) => contract({ moduleId, exclusive: ["tok-a"] }));
  const result = checkModuleExclusion(set) as unknown as { detail: string; moduleIds: string[] };
  assert.equal(result.detail, "exclusive token tok-a is declared by m1, m10, m2, m3");
  assert.deepEqual(result.moduleIds, ["m1", "m10", "m2", "m3"]);
});

test("utol R02: a clash among four holders leaves a non-clashing token and a non-clashing module out of the refusal", () => {
  const set = [
    contract({ moduleId: "m1", exclusive: ["tok-a", "tok-solo"] }),
    contract({ moduleId: "m2", exclusive: ["tok-a"] }),
    contract({ moduleId: "m3", exclusive: ["tok-a"] }),
    contract({ moduleId: "m4", exclusive: ["tok-a"] }),
    contract({ moduleId: "m5", exclusive: ["tok-other"] }),
  ];
  const result = checkModuleExclusion(set) as unknown as { token: string; detail: string; moduleIds: string[] };
  assert.equal(result.token, "tok-a");
  assert.equal(result.detail, "exclusive token tok-a is declared by m1, m2, m3, m4");
  assert.deepEqual(result.moduleIds, ["m1", "m2", "m3", "m4"]);
});

// MechanicalWorkflows-4lij (utol follow-up, terminal row of the holder-arity lineage): one generated sweep closes the
// first-N truncation family that fixed ladders leave open. Single-digit ids keep code-unit order equal to numeric order,
// so this row states the arity law alone and says nothing about collation.
test("4lij X1: the exclusion refusal names and returns every clashing holder at every arity two through eight under every rotation", () => {
  let checked = 0;
  for (let n = 2; n <= 8; n += 1) {
    const base = Array.from({ length: n }, (_, i) => `m${i + 1}`);
    const ids = [...base].reverse();
    [ids[0], ids[1]] = [ids[1]!, ids[0]!];
    const sorted = [...ids].sort();
    assert.deepEqual(sorted, base);
    const holders = ids.map((moduleId) => contract({ moduleId, exclusive: ["tok-a"] }));
    for (let shift = 0; shift < n; shift += 1) {
      const set = [...holders.slice(shift), ...holders.slice(0, shift)];
      const result = checkModuleExclusion(set) as unknown as { ok: boolean; code: string; detail: string; token: string; moduleIds: string[] };
      assert.equal(result.ok, false);
      assert.equal(result.code, "MODULE_CONTRACT_EXCLUSION_CONFLICT");
      assert.equal(result.token, "tok-a");
      assert.equal(result.detail, `exclusive token tok-a is declared by ${sorted.join(", ")}`);
      assert.deepEqual(result.moduleIds, sorted);
      assert.equal(result.moduleIds.length, n);
      checked += 1;
    }
  }
  assert.equal(checked, 2 + 3 + 4 + 5 + 6 + 7 + 8);
});

// R04_EVOBJ_INPLACE (X7): validation never writes into or freezes the caller's evidence object.
test("utol R04: validation returns a fresh frozen evidence object and leaves the caller's evidence object unfrozen and unmodified", () => {
  const evidence = { requiredSourceRevisions: ["rev-7"], requiredCoverageRefs: ["cov-1"] };
  const result = validateModuleContract(contract({ evidence }));
  assert.equal(result.ok, true);
  if (!result.ok) return;
  assert.notEqual(result.contract.evidence, evidence);
  assert.equal(Object.isFrozen(result.contract.evidence), true);
  assert.equal(Object.isFrozen(evidence), false);
  assert.deepEqual(Object.keys(evidence), ["requiredSourceRevisions", "requiredCoverageRefs"]);
  assert.deepEqual(evidence, { requiredSourceRevisions: ["rev-7"], requiredCoverageRefs: ["cov-1"] });
  evidence.requiredSourceRevisions = ["rev-9"];
  Reflect.set(evidence, "extra", 1);
  assert.deepEqual(result.contract.evidence.requiredSourceRevisions, ["rev-7"], "a later caller edit does not reach the validated contract");
  assert.equal(Reflect.has(result.contract.evidence, "extra"), false);
});

test("utol R04: re-validating a reused member keeps its evidence object unfrozen and yields a distinct frozen copy each time", () => {
  const member = contract();
  const evidence = member.evidence as unknown as Record<string, unknown>;
  const first = validateModuleContract(member);
  const second = validateModuleContract(member);
  assert.equal(first.ok && second.ok, true);
  if (!first.ok || !second.ok) return;
  assert.notEqual(first.contract.evidence, second.contract.evidence);
  assert.notEqual(first.contract.evidence, evidence);
  assert.notEqual(second.contract.evidence, evidence);
  assert.equal(Object.isFrozen(evidence), false);
  assert.equal(Object.isFrozen(member), false);
  const sums = checkGlobalCapacity([first.contract], globalBudget);
  assert.equal(sums.ok, true);
  const again = validateModuleContract(member);
  assert.equal(again.ok, true);
  assert.equal(Object.isFrozen(evidence), false);
});

// MechanicalWorkflows-g60nb (dz45 ruling, option B DEFECT; kills EVDIST, lead row OW9): evidence.requiredSourceRevisions and
// evidence.requiredCoverageRefs carry set semantics like effectClasses and exclusive, so a repeated entry is refused.
test("g60nb OW9: a contract whose evidence.requiredSourceRevisions repeats rev-7 is refused MODULE_CONTRACT_MALFORMED with the duplicate-entry detail", () => {
  const { code, detail } = refusalOf(validateModuleContract(contract({ evidence: { requiredSourceRevisions: ["rev-7", "rev-7"], requiredCoverageRefs: ["cov-1"] } })));
  assert.equal(code, "MODULE_CONTRACT_MALFORMED");
  assert.equal(detail, "evidence.requiredSourceRevisions: duplicate entry rev-7");
});

test("g60nb OW9: a contract whose evidence.requiredCoverageRefs repeats cov-1 is refused MODULE_CONTRACT_MALFORMED with the duplicate-entry detail", () => {
  const { code, detail } = refusalOf(validateModuleContract(contract({ evidence: { requiredSourceRevisions: ["rev-7"], requiredCoverageRefs: ["cov-1", "cov-2", "cov-1"] } })));
  assert.equal(code, "MODULE_CONTRACT_MALFORMED");
  assert.equal(detail, "evidence.requiredCoverageRefs: duplicate entry cov-1");
});

test("g60nb OW9: distinct evidence lists still validate and keep input order, and one value shared across the two lists is not a duplicate", () => {
  const result = validateModuleContract(contract({ evidence: { requiredSourceRevisions: ["rev-7", "rev-8", "shared"], requiredCoverageRefs: ["shared", "cov-2", "cov-1"] } }));
  assert.equal(result.ok, true);
  if (!result.ok) return;
  assert.deepEqual(result.contract.evidence.requiredSourceRevisions, ["rev-7", "rev-8", "shared"]);
  assert.deepEqual(result.contract.evidence.requiredCoverageRefs, ["shared", "cov-2", "cov-1"]);
});
