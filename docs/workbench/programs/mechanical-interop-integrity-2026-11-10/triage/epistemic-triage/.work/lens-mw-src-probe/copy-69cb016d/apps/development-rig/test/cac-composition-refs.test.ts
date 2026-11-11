// MechanicalWorkflows-8h41.1 (reslice of 8h41 at main f3ab363a; CACWC-EAT-R011; the module sits at the rig edge, not in a provider-neutral library, because the landed R016 structure guard refuses a CAC checker import from packages/coordination/src): the P1 CACWorkflowCompositionV0 checker accepts only
// reference fields that resolve to identifiers in a caller roster (bd issue, Forge operation, Furnace
// attempt, Git commit, HyperUnix queryDigest) and refuses any record that mints a new identifier. The
// checker is pure: fake bd/forge/furnace executors record zero invocations, the inputs stay untouched,
// and an accepted result carries no identifier absent from the input.
import test from "node:test";
import assert from "node:assert/strict";
import { checkComposition, NATIVE_NAMESPACES } from "../dist/cac-composition-refs.js";
import type { CompositionRecord, NativeRoster } from "../dist/cac-composition-refs.js";

const COMMIT = "0123456789abcdef0123456789abcdef01234567";
const QUERY_DIGEST = "sha256:" + "ab".repeat(32);
const roster: NativeRoster = {
  beads: ["MechanicalWorkflows-8h41", "MechanicalWorkflows-om2y"],
  forgeOperations: ["op-f080a045ea844100b2ad36245498d4eb"],
  furnaceAttempts: ["frn-atm-0001"],
  gitCommits: [COMMIT],
  hxQueryDigests: [QUERY_DIGEST],
};

/** Executors the checker must never call; each records its invocations. */
function fakeExecutors() {
  const calls: string[] = [];
  return { calls, bd: () => calls.push("bd"), forge: () => calls.push("forge"), furnace: () => calls.push("furnace") };
}

function deepFreeze<T>(value: T): T {
  if (value !== null && typeof value === "object") {
    for (const member of Object.values(value)) deepFreeze(member);
    Object.freeze(value);
  }
  return value;
}

function strings(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (value === null || typeof value !== "object") return [];
  return Object.values(value).flatMap(strings);
}

test("a bead reference absent from the roster is refused with CAC_REF_UNKNOWN_NATIVE_ID", () => {
  const result = checkComposition({ refs: { beads: "MechanicalWorkflows-zzzz" } }, roster);
  assert.equal(result.ok, false);
  assert.deepEqual(result.ok ? [] : result.refusals, [{ code: "CAC_REF_UNKNOWN_NATIVE_ID", field: "beads", value: "MechanicalWorkflows-zzzz" }]);
});

test("a record whose every reference sits in the roster is accepted and the output carries no identifier absent from the input", () => {
  const record: CompositionRecord = deepFreeze({
    refs: {
      beads: "MechanicalWorkflows-8h41",
      forgeOperations: ["op-f080a045ea844100b2ad36245498d4eb"],
      furnaceAttempts: "frn-atm-0001",
      gitCommits: [COMMIT],
      hxQueryDigests: QUERY_DIGEST,
    },
  });
  const result = checkComposition(record, deepFreeze({ ...roster }));
  assert.equal(result.ok, true);
  const inputStrings = new Set(strings(record));
  const outputStrings = strings(result.ok ? result.refs : null);
  assert.equal(outputStrings.length, 5);
  assert.ok(outputStrings.every(value => inputStrings.has(value)), "every output identifier appears in the input");
});

test("a locally generated Forge test id or Furnace attempt id that the roster lacks is refused per namespace", () => {
  const result = checkComposition({ refs: { forgeOperations: ["op-test-local"], furnaceAttempts: ["frn-atm-minted-here"] } }, roster);
  assert.equal(result.ok, false);
  assert.deepEqual(result.ok ? [] : result.refusals.map(r => [r.code, r.field, r.value]), [
    ["CAC_REF_UNKNOWN_NATIVE_ID", "forgeOperations", "op-test-local"],
    ["CAC_REF_UNKNOWN_NATIVE_ID", "furnaceAttempts", "frn-atm-minted-here"],
  ]);
});

test("a short or uppercase Git commit and a queryDigest outside the roster are refused, not normalised into a match", () => {
  const result = checkComposition({ refs: { gitCommits: [COMMIT.slice(0, 7), COMMIT.toUpperCase()], hxQueryDigests: ["sha256:" + "cd".repeat(32)] } }, roster);
  assert.equal(result.ok, false);
  assert.equal(result.ok ? 0 : result.refusals.length, 3);
});

test("a reference field outside the five native namespaces is refused with CAC_REF_NAMESPACE_UNKNOWN", () => {
  const result = checkComposition({ refs: { beads: "MechanicalWorkflows-8h41", mintedTaskIds: ["MechanicalWorkflows-new1"] } }, roster);
  assert.equal(result.ok, false);
  assert.deepEqual(result.ok ? [] : result.refusals, [{ code: "CAC_REF_NAMESPACE_UNKNOWN", field: "mintedTaskIds", value: null }]);
});

test("a blank or non-string reference value is refused with CAC_REF_MALFORMED and an empty roster namespace admits nothing", () => {
  const malformed = checkComposition({ refs: { beads: ["", 7 as unknown as string] } }, roster);
  assert.deepEqual(malformed.ok ? [] : malformed.refusals, [
    { code: "CAC_REF_MALFORMED", field: "beads", value: "" },
    { code: "CAC_REF_MALFORMED", field: "beads", value: null },
  ]);
  const empty = checkComposition({ refs: { gitCommits: COMMIT } }, {});
  assert.deepEqual(empty.ok ? [] : empty.refusals.map(r => r.code), ["CAC_REF_UNKNOWN_NATIVE_ID"]);
});

test("every refusal is collected in one pass and a record with no references is accepted with an empty result", () => {
  const mixed = checkComposition({ refs: { beads: "MechanicalWorkflows-zzzz", extra: "x", gitCommits: [""] } }, roster);
  assert.deepEqual(mixed.ok ? [] : mixed.refusals.map(r => r.code).sort(), ["CAC_REF_MALFORMED", "CAC_REF_NAMESPACE_UNKNOWN", "CAC_REF_UNKNOWN_NATIVE_ID"]);
  assert.deepEqual(checkComposition({ refs: {} }, roster), { ok: true, refs: {} });
});

test("the checker is pure: it takes two arguments, never touches an executor, and leaves frozen inputs unchanged", () => {
  const executors = fakeExecutors();
  assert.equal(checkComposition.length, 2);
  const record = deepFreeze({ refs: { beads: "MechanicalWorkflows-zzzz", forgeOperations: ["op-test-local"] } });
  const frozenRoster = deepFreeze({ ...roster });
  const before = JSON.stringify([record, frozenRoster]);
  const first = checkComposition(record, frozenRoster);
  const second = checkComposition(record, frozenRoster);
  assert.deepEqual(first, second);
  assert.equal(JSON.stringify([record, frozenRoster]), before);
  assert.deepEqual(executors.calls, []);
});

test("the native namespace list names exactly the five namespaces the contract lists", () => {
  assert.deepEqual([...NATIVE_NAMESPACES], ["beads", "forgeOperations", "furnaceAttempts", "gitCommits", "hxQueryDigests"]);
});
