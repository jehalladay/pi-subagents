import { strict as assert } from "node:assert";
import { test } from "node:test";
import { reconcile, stepContractOf, validateEffectPermissions } from "../dist/index.js";
import type { Basis, EffectPermission, Intent, PolicyContext, StepContract } from "../dist/index.js";

const basis: Basis = { workspaceId: "ws-1", revision: "rev-7" };

const context: PolicyContext = {
  episodeId: "ep-1",
  actorId: "actor-1",
  observationDigest: "sha256:obs-1",
  budget: { compute: 4, workers: 2, queue: 8, latencyMs: 1000 },
  authority: "propose-only",
  policyRevision: "fifo-rev-3",
  seed: 1,
};

function intent(overrides: Partial<Intent> & { intentId: string }): Intent {
  return {
    policyId: "fifo",
    target: { kind: "candidate", uri: "cand:a" },
    expectedRevision: basis.revision,
    effect: "land",
    claim: { compute: 1, workers: 1, queue: 1, latencyMs: 10 },
    evidenceRefs: ["sha256:receipt-1"],
    writeScopes: ["main"],
    readScopes: ["queue"],
    ...overrides,
  };
}

function step(overrides: Partial<Intent> & { intentId: string }): StepContract {
  return stepContractOf(intent(overrides), context);
}

function permission(permissionId: string, intentId: string, scope: string): EffectPermission {
  return { permissionId, intentId, scope };
}

function stringLeaves(value: unknown, out: string[] = []): string[] {
  if (typeof value === "string") out.push(value);
  else if (Array.isArray(value)) for (const member of value) stringLeaves(member, out);
  else if (value !== null && typeof value === "object") for (const member of Object.values(value as Record<string, unknown>)) stringLeaves(member, out);
  return out;
}

const a = step({ intentId: "ep-1:a", writeScopes: ["main", "queue:a"] });
const b = step({ intentId: "ep-1:b", writeScopes: ["main"], readScopes: ["queue:a"] });
const grants: EffectPermission[] = [
  permission("p-a-main", "ep-1:a", "main"),
  permission("p-a-queue", "ep-1:a", "queue:a"),
  permission("p-b-main", "ep-1:b", "main"),
];

test("every write effect of every step is covered by a permission naming exactly that step and that scope", () => {
  const result = validateEffectPermissions({ steps: [a, b], permissions: grants, protectedScopes: [] });
  assert.equal(result.schema, "mw.effect-permission-validation.v0");
  assert.equal(result.ok, true);
  assert.equal(result.authority, "propose-only");
  assert.deepEqual(result.refusals, []);
  assert.deepEqual(result.covered, [
    { intentId: "ep-1:a", scope: "main", permissionId: "p-a-main" },
    { intentId: "ep-1:a", scope: "queue:a", permissionId: "p-a-queue" },
    { intentId: "ep-1:b", scope: "main", permissionId: "p-b-main" },
  ]);
});

test("a write scope without its own permission is refused by name while the covered effects stay listed", () => {
  const result = validateEffectPermissions({ steps: [a, b], permissions: grants.slice(0, 2), protectedScopes: [] });
  assert.equal(result.ok, false);
  assert.equal(result.refusals.length, 1);
  const [refusal] = result.refusals;
  assert.equal(refusal!.code, "EFFECT_PERMISSION_ABSENT");
  assert.equal(refusal!.intentId, "ep-1:b");
  assert.equal(refusal!.scope, "main");
  assert.match(refusal!.detail, /step ep-1:b writing main/);
  assert.deepEqual(result.covered.map(c => `${c.intentId}:${c.scope}`), ["ep-1:a:main", "ep-1:a:queue:a"]);
});

test("a permission on one step never transfers to another step writing the same scope, in either direction", () => {
  const onlyA = validateEffectPermissions({ steps: [a, b], permissions: [permission("p-a-main", "ep-1:a", "main"), permission("p-a-queue", "ep-1:a", "queue:a")], protectedScopes: [] });
  assert.deepEqual(onlyA.refusals.map(r => [r.code, r.intentId, r.scope]), [["EFFECT_PERMISSION_ABSENT", "ep-1:b", "main"]]);
  assert.match(onlyA.refusals[0]!.detail, /p-a-main/);
  assert.match(onlyA.refusals[0]!.detail, /do(es)? not transfer/);
  const onlyB = validateEffectPermissions({ steps: [a, b], permissions: [permission("p-b-main", "ep-1:b", "main"), permission("p-a-queue", "ep-1:a", "queue:a")], protectedScopes: [] });
  assert.deepEqual(onlyB.refusals.map(r => [r.code, r.intentId, r.scope]), [["EFFECT_PERMISSION_ABSENT", "ep-1:a", "main"]]);
  assert.deepEqual(onlyB.covered.map(c => c.permissionId), ["p-a-queue", "p-b-main"]);
});

test("a blanket or composite permission is refused as not independent and covers nothing", () => {
  const blanket: EffectPermission[] = [
    permission("p-all-steps", "*", "main"),
    permission("p-all-scopes", "ep-1:b", "*"),
    permission("p-empty", "", ""),
    permission("p-a-queue", "ep-1:a", "queue:a"),
  ];
  const result = validateEffectPermissions({ steps: [a, b], permissions: blanket, protectedScopes: [] });
  assert.equal(result.ok, false);
  const notIndependent = result.refusals.filter(r => r.code === "EFFECT_PERMISSION_NOT_INDEPENDENT");
  assert.deepEqual(notIndependent.map(r => r.detail.match(/permission (\S+)/)?.[1]).sort(), ["p-all-scopes", "p-all-steps", "p-empty"]);
  const absent = result.refusals.filter(r => r.code === "EFFECT_PERMISSION_ABSENT").map(r => `${r.intentId}:${r.scope}`);
  assert.deepEqual(absent, ["ep-1:a:main", "ep-1:b:main"]);
  assert.deepEqual(result.covered.map(c => c.permissionId), ["p-a-queue"]);
  // A5: a not-independent refusal names the offending permission's own step and scope, in the validator's sort order.
  assert.deepEqual(notIndependent.map(r => [r.intentId, r.scope]), [["", ""], ["*", "main"], ["ep-1:b", "*"]]);
});

test("a permission with an empty step id alone, or an empty scope alone, is refused as not independent", () => {
  const stepEmpty = validateEffectPermissions({ steps: [a, b], permissions: [...grants, permission("p-step-empty", "", "main")], protectedScopes: [] });
  assert.equal(stepEmpty.ok, false);
  assert.deepEqual(stepEmpty.refusals.map(r => [r.code, r.intentId, r.scope]), [["EFFECT_PERMISSION_NOT_INDEPENDENT", "", "main"]]);
  assert.match(stepEmpty.refusals[0]!.detail, /permission p-step-empty /);
  const scopeEmpty = validateEffectPermissions({ steps: [a, b], permissions: [...grants, permission("p-scope-empty", "ep-1:b", "")], protectedScopes: [] });
  assert.equal(scopeEmpty.ok, false);
  assert.deepEqual(scopeEmpty.refusals.map(r => [r.code, r.intentId, r.scope]), [["EFFECT_PERMISSION_NOT_INDEPENDENT", "ep-1:b", ""]]);
  assert.match(scopeEmpty.refusals[0]!.detail, /permission p-scope-empty /);
  // Negative control: the same grants without the empty-field record validate cleanly.
  assert.equal(validateEffectPermissions({ steps: [a, b], permissions: grants, protectedScopes: [] }).ok, true);
});

test("no permission admits a protected scope, and the refusal agrees with the native resolver", () => {
  const scope = "graph:protected:1";
  const guarded = intent({ intentId: "ep-1:c", writeScopes: [scope] });
  const c = stepContractOf(guarded, context);
  const result = validateEffectPermissions({ steps: [c], permissions: [permission("p-c-protected", "ep-1:c", scope)], protectedScopes: [scope] });
  assert.equal(result.ok, false);
  assert.deepEqual(result.refusals.map(r => [r.code, r.intentId, r.scope]), [["EFFECT_SCOPE_PROTECTED", "ep-1:c", scope]]);
  assert.match(result.refusals[0]!.detail, /p-c-protected/);
  assert.deepEqual(result.covered, []);
  assert.equal(result.authority, "propose-only");
  const native = reconcile({ basis, budget: context.budget, protectedScopes: [scope], proposals: [{ intents: [guarded], memory: null, trace: [] }] });
  assert.deepEqual(native.rejected.map(r => [r.code, r.intent.intentId]), [["INTENT_SCOPE_PROTECTED", "ep-1:c"]]);
  assert.deepEqual(native.admitted, []);
});

test("the validation is deterministic: permuted steps and permissions give byte-identical output with sorted refusals", () => {
  const mixed: EffectPermission[] = [permission("p-all-steps", "*", "main"), permission("p-b-main", "ep-1:b", "main")];
  const c = step({ intentId: "ep-1:c", writeScopes: ["graph:protected:1"] });
  const forward = validateEffectPermissions({ steps: [a, b, c], permissions: mixed, protectedScopes: ["graph:protected:1"] });
  const backward = validateEffectPermissions({ steps: [c, b, a], permissions: [...mixed].reverse(), protectedScopes: ["graph:protected:1"] });
  assert.equal(JSON.stringify(backward), JSON.stringify(forward));
  const keys = forward.refusals.map(r => `${r.code}|${r.intentId}|${r.scope}`);
  assert.deepEqual(keys, [...keys].sort());
  assert.deepEqual(forward.refusals.map(r => r.code), ["EFFECT_PERMISSION_ABSENT", "EFFECT_PERMISSION_ABSENT", "EFFECT_PERMISSION_NOT_INDEPENDENT", "EFFECT_SCOPE_PROTECTED"]);
});

test("step order never changes the covered list or the refusal list, with full grants and with none", () => {
  const full = validateEffectPermissions({ steps: [a, b], permissions: grants, protectedScopes: [] });
  const fullSwapped = validateEffectPermissions({ steps: [b, a], permissions: grants, protectedScopes: [] });
  assert.equal(JSON.stringify(fullSwapped), JSON.stringify(full));
  assert.deepEqual(fullSwapped.covered.map(c => `${c.intentId}:${c.scope}`), ["ep-1:a:main", "ep-1:a:queue:a", "ep-1:b:main"]);
  const none = validateEffectPermissions({ steps: [a, b], permissions: [], protectedScopes: [] });
  const noneSwapped = validateEffectPermissions({ steps: [b, a], permissions: [], protectedScopes: [] });
  assert.equal(JSON.stringify(noneSwapped), JSON.stringify(none));
  assert.deepEqual(noneSwapped.refusals.map(r => `${r.intentId}:${r.scope}`), ["ep-1:a:main", "ep-1:a:queue:a", "ep-1:b:main"]);
});

test("two own permissions for one step and scope cover it with the lowest permission id in either input order", () => {
  const pair = [permission("p-z-main", "ep-1:a", "main"), permission("p-a-main", "ep-1:a", "main")];
  for (const permissions of [pair, [...pair].reverse()]) {
    const result = validateEffectPermissions({ steps: [step({ intentId: "ep-1:a", writeScopes: ["main"] })], permissions, protectedScopes: [] });
    assert.equal(result.ok, true);
    assert.deepEqual(result.covered, [{ intentId: "ep-1:a", scope: "main", permissionId: "p-a-main" }]);
  }
});

test("two blanket permissions sharing a step and scope refuse in the same order whichever arrives first", () => {
  const pair = [permission("p-star-2", "*", "main"), permission("p-star-1", "*", "main")];
  const forward = validateEffectPermissions({ steps: [a, b], permissions: pair, protectedScopes: [] });
  const backward = validateEffectPermissions({ steps: [a, b], permissions: [...pair].reverse(), protectedScopes: [] });
  assert.equal(JSON.stringify(backward), JSON.stringify(forward));
  const blanketIds = (r: typeof forward) => r.refusals.filter(x => x.code === "EFFECT_PERMISSION_NOT_INDEPENDENT").map(x => x.detail.match(/permission (\S+)/)?.[1]);
  assert.deepEqual(blanketIds(forward), ["p-star-1", "p-star-2"]);
  assert.deepEqual(blanketIds(backward), ["p-star-1", "p-star-2"]);
});

test("a step that repeats a write scope is covered once for it", () => {
  const repeated = step({ intentId: "ep-1:r", writeScopes: ["main", "main", "queue:a"] });
  const result = validateEffectPermissions({ steps: [repeated], permissions: [permission("p-r-main", "ep-1:r", "main"), permission("p-r-queue", "ep-1:r", "queue:a")], protectedScopes: [] });
  assert.equal(result.ok, true);
  assert.deepEqual(result.covered, [
    { intentId: "ep-1:r", scope: "main", permissionId: "p-r-main" },
    { intentId: "ep-1:r", scope: "queue:a", permissionId: "p-r-queue" },
  ]);
  const missing = validateEffectPermissions({ steps: [repeated], permissions: [], protectedScopes: [] });
  assert.deepEqual(missing.refusals.map(r => `${r.code}|${r.scope}`), ["EFFECT_PERMISSION_ABSENT|main", "EFFECT_PERMISSION_ABSENT|queue:a"]);
});

test("the validator is pure, mints no identifier and never upgrades authority", () => {
  const steps = [a, b];
  const before = JSON.stringify({ steps, grants });
  const result = validateEffectPermissions({ steps, permissions: grants, protectedScopes: [] });
  assert.equal(JSON.stringify({ steps, grants }), before);
  const known = new Set([...stringLeaves(steps), ...stringLeaves(grants), result.schema, "propose-only"]);
  for (const leaf of stringLeaves(result.covered)) assert.ok(known.has(leaf), `minted identifier ${leaf}`);
  for (const refusal of result.refusals) for (const leaf of [refusal.intentId, refusal.scope]) assert.ok(known.has(leaf), `minted identifier ${leaf}`);
  assert.equal(result.authority, "propose-only");
  assert.ok(!("authorized" in result) && !("admitted" in result));
  // A6: with a blanket permission in play, a not-independent refusal still names only identifiers found in the input.
  const blanketGrant = permission("p-blanket", "*", "main");
  const withBlanket = validateEffectPermissions({ steps, permissions: [...grants, blanketGrant], protectedScopes: [] });
  const knownWithBlanket = new Set([...known, ...stringLeaves(blanketGrant)]);
  const notIndependent = withBlanket.refusals.filter(r => r.code === "EFFECT_PERMISSION_NOT_INDEPENDENT");
  assert.equal(notIndependent.length, 1);
  for (const refusal of withBlanket.refusals) for (const leaf of [refusal.intentId, refusal.scope]) assert.ok(knownWithBlanket.has(leaf), `minted identifier ${leaf}`);
  assert.equal(JSON.stringify({ steps, grants }), before);
});

test("g8ud M15: another step's permission naming a protected scope is not listed as void for the step that writes it", () => {
  const scope = "graph:protected:1";
  const guarded = step({ intentId: "ep-1:c", writeScopes: [scope] });
  const foreignOnly = validateEffectPermissions({ steps: [guarded], permissions: [permission("p-z-protected", "ep-1:z", scope)], protectedScopes: [scope] });
  assert.deepEqual(foreignOnly.refusals.map(r => [r.code, r.intentId, r.scope]), [["EFFECT_SCOPE_PROTECTED", "ep-1:c", scope]]);
  assert.equal(foreignOnly.refusals[0]!.detail, `step ep-1:c writes protected scope ${scope}; no permission admits a protected scope`);
  const mixed = validateEffectPermissions({ steps: [guarded], permissions: [permission("p-z-protected", "ep-1:z", scope), permission("p-c-protected", "ep-1:c", scope)], protectedScopes: [scope] });
  assert.equal(mixed.refusals[0]!.detail, `step ep-1:c writes protected scope ${scope}; no permission admits a protected scope (permission p-c-protected is void)`);
});

test("g8ud M16: an absent scope with two foreign permissions lists them sorted whichever order they arrive", () => {
  const writer = step({ intentId: "ep-1:w", writeScopes: ["main"] });
  const pair = [permission("p-z-main", "ep-1:y", "main"), permission("p-a-main", "ep-1:z", "main")];
  const expected = "no permission names step ep-1:w writing main; p-a-main covers step ep-1:z only, p-z-main covers step ep-1:y only and does not transfer";
  for (const permissions of [pair, [...pair].reverse()]) {
    const result = validateEffectPermissions({ steps: [writer], permissions, protectedScopes: [] });
    assert.deepEqual(result.refusals.map(r => [r.code, r.intentId, r.scope]), [["EFFECT_PERMISSION_ABSENT", "ep-1:w", "main"]]);
    assert.equal(result.refusals[0]!.detail, expected);
  }
});

test("g8ud M17: a protected scope with two own permissions lists the void permissions sorted whichever order they arrive", () => {
  const scope = "graph:protected:1";
  const guarded = step({ intentId: "ep-1:c", writeScopes: [scope] });
  const pair = [permission("p-z-protected", "ep-1:c", scope), permission("p-a-protected", "ep-1:c", scope)];
  const expected = `step ep-1:c writes protected scope ${scope}; no permission admits a protected scope (permission p-a-protected, p-z-protected is void)`;
  for (const permissions of [pair, [...pair].reverse()]) {
    const result = validateEffectPermissions({ steps: [guarded], permissions, protectedScopes: [scope] });
    assert.deepEqual(result.refusals.map(r => r.code), ["EFFECT_SCOPE_PROTECTED"]);
    assert.equal(result.refusals[0]!.detail, expected);
  }
});

test("6ddr KG15: a protected-scope refusal lists void permissions only for the protected scope, never the step's own permission on another scope", () => {
  const scope = "graph:protected:1";
  const writer = step({ intentId: "ep-1:c", writeScopes: [scope, "main"] });
  const permissions = [permission("p-c-protected", "ep-1:c", scope), permission("p-c-main", "ep-1:c", "main")];
  for (const ordered of [permissions, [...permissions].reverse()]) {
    const result = validateEffectPermissions({ steps: [writer], permissions: ordered, protectedScopes: [scope] });
    assert.deepEqual(result.refusals.map(r => [r.code, r.intentId, r.scope]), [["EFFECT_SCOPE_PROTECTED", "ep-1:c", scope]]);
    assert.equal(result.refusals[0]!.detail, `step ep-1:c writes protected scope ${scope}; no permission admits a protected scope (permission p-c-protected is void)`);
    assert.deepEqual(result.covered, [{ intentId: "ep-1:c", scope: "main", permissionId: "p-c-main" }]);
  }
});

test("6ddr KG16: an absent-scope refusal names foreign permissions only on the written scope, never a foreign permission on another scope", () => {
  const writer = step({ intentId: "ep-1:w", writeScopes: ["main"] });
  const permissions = [permission("p-y-main", "ep-1:y", "main"), permission("p-z-queue", "ep-1:z", "queue:a")];
  for (const ordered of [permissions, [...permissions].reverse()]) {
    const result = validateEffectPermissions({ steps: [writer], permissions: ordered, protectedScopes: [] });
    assert.deepEqual(result.refusals.map(r => [r.code, r.intentId, r.scope]), [["EFFECT_PERMISSION_ABSENT", "ep-1:w", "main"]]);
    assert.equal(result.refusals[0]!.detail, "no permission names step ep-1:w writing main; p-y-main covers step ep-1:y only and does not transfer");
  }
});

test("6ddr KL16: the foreign list orders by UTF-16 code unit, so an upper-case permission id precedes a lower-case one in either arrival order", () => {
  const writer = step({ intentId: "ep-1:w", writeScopes: ["main"] });
  const pair = [permission("p-a-main", "ep-1:y", "main"), permission("p-B-main", "ep-1:z", "main")];
  for (const ordered of [pair, [...pair].reverse()]) {
    const result = validateEffectPermissions({ steps: [writer], permissions: ordered, protectedScopes: [] });
    assert.equal(result.refusals[0]!.detail, "no permission names step ep-1:w writing main; p-B-main covers step ep-1:z only, p-a-main covers step ep-1:y only and does not transfer");
  }
});

test("6ddr G4: the void list and the own-permission pick order by UTF-16 code unit as well", () => {
  const scope = "graph:protected:1";
  const guarded = step({ intentId: "ep-1:c", writeScopes: [scope] });
  const voidPair = [permission("p-a-protected", "ep-1:c", scope), permission("p-B-protected", "ep-1:c", scope)];
  for (const ordered of [voidPair, [...voidPair].reverse()]) {
    const result = validateEffectPermissions({ steps: [guarded], permissions: ordered, protectedScopes: [scope] });
    assert.equal(result.refusals[0]!.detail, `step ep-1:c writes protected scope ${scope}; no permission admits a protected scope (permission p-B-protected, p-a-protected is void)`);
  }
  const writer = step({ intentId: "ep-1:w", writeScopes: ["main"] });
  const ownPair = [permission("p-a-main", "ep-1:w", "main"), permission("p-B-main", "ep-1:w", "main")];
  for (const ordered of [ownPair, [...ownPair].reverse()]) {
    const result = validateEffectPermissions({ steps: [writer], permissions: ordered, protectedScopes: [] });
    assert.deepEqual(result.covered, [{ intentId: "ep-1:w", scope: "main", permissionId: "p-B-main" }]);
  }
});

test("uvw0 R1 (KX15): a step writing two protected scopes names only its own-scope permission in each void list, in either arrival order", () => {
  const first = "graph:protected:1";
  const second = "graph:protected:2";
  const writer = step({ intentId: "ep-1:c", writeScopes: [first, second] });
  const permissions = [permission("p-c-first", "ep-1:c", first), permission("p-c-second", "ep-1:c", second)];
  for (const ordered of [permissions, [...permissions].reverse()]) {
    const result = validateEffectPermissions({ steps: [writer], permissions: ordered, protectedScopes: [first, second] });
    assert.deepEqual(result.refusals.map(r => [r.code, r.intentId, r.scope]), [["EFFECT_SCOPE_PROTECTED", "ep-1:c", first], ["EFFECT_SCOPE_PROTECTED", "ep-1:c", second]]);
    assert.equal(result.refusals[0]!.detail, `step ep-1:c writes protected scope ${first}; no permission admits a protected scope (permission p-c-first is void)`);
    assert.equal(result.refusals[1]!.detail, `step ep-1:c writes protected scope ${second}; no permission admits a protected scope (permission p-c-second is void)`);
    assert.deepEqual(result.covered, []);
  }
});

test("uvw0 R2 (KW16): the main refusal names only the foreign record on main and never the step's own queue:a permission, in either arrival order", () => {
  const permissions = [permission("p-b-main", "ep-1:b", "main"), permission("p-a-queue", "ep-1:a", "queue:a")];
  for (const ordered of [permissions, [...permissions].reverse()]) {
    const result = validateEffectPermissions({ steps: [a, b], permissions: ordered, protectedScopes: [] });
    assert.deepEqual(result.refusals.map(r => [r.code, r.intentId, r.scope]), [["EFFECT_PERMISSION_ABSENT", "ep-1:a", "main"]]);
    assert.equal(result.refusals[0]!.detail, "no permission names step ep-1:a writing main; p-b-main covers step ep-1:b only and does not transfer");
    assert.equal(result.refusals[0]!.detail.includes("p-a-queue"), false);
    assert.deepEqual(result.covered.map(c => c.permissionId), ["p-a-queue", "p-b-main"]);
  }
});

test("4yjo W1 (KW16b): a foreign record on the step's other written scope is never named on the scope it does not cover", () => {
  const result = validateEffectPermissions({ steps: [a], permissions: [permission("p-b-queue", "ep-1:b", "queue:a")], protectedScopes: [] });
  assert.deepEqual(result.refusals.map(r => [r.code, r.intentId, r.scope]), [["EFFECT_PERMISSION_ABSENT", "ep-1:a", "main"], ["EFFECT_PERMISSION_ABSENT", "ep-1:a", "queue:a"]]);
  assert.equal(result.refusals[0]!.detail, "no permission names step ep-1:a writing main");
  assert.equal(result.refusals[1]!.detail, "no permission names step ep-1:a writing queue:a; p-b-queue covers step ep-1:b only and does not transfer");
  assert.deepEqual(result.covered, []);
});

test("4yjo W2 (KW16b): each foreign list names only the records on its own written scope, in either arrival order", () => {
  const permissions = [permission("p-b-main", "ep-1:b", "main"), permission("p-z-queue", "ep-1:z", "queue:a")];
  for (const ordered of [permissions, [...permissions].reverse()]) {
    const result = validateEffectPermissions({ steps: [a], permissions: ordered, protectedScopes: [] });
    assert.deepEqual(result.refusals.map(r => [r.code, r.intentId, r.scope]), [["EFFECT_PERMISSION_ABSENT", "ep-1:a", "main"], ["EFFECT_PERMISSION_ABSENT", "ep-1:a", "queue:a"]]);
    assert.equal(result.refusals[0]!.detail, "no permission names step ep-1:a writing main; p-b-main covers step ep-1:b only and does not transfer");
    assert.equal(result.refusals[1]!.detail, "no permission names step ep-1:a writing queue:a; p-z-queue covers step ep-1:z only and does not transfer");
    assert.deepEqual(result.covered, []);
  }
});

test("4yjo W3 (KW16b): the determinism fixture's queue:a refusal names no foreign record because the only foreign record sits on main", () => {
  const mixed: EffectPermission[] = [permission("p-all-steps", "*", "main"), permission("p-b-main", "ep-1:b", "main")];
  for (const ordered of [mixed, [...mixed].reverse()]) {
    const result = validateEffectPermissions({ steps: [a], permissions: ordered, protectedScopes: [] });
    const absent = result.refusals.filter(r => r.code === "EFFECT_PERMISSION_ABSENT");
    assert.deepEqual(absent.map(r => [r.intentId, r.scope]), [["ep-1:a", "main"], ["ep-1:a", "queue:a"]]);
    assert.equal(absent[0]!.detail, "no permission names step ep-1:a writing main; p-b-main covers step ep-1:b only and does not transfer");
    assert.equal(absent[1]!.detail, "no permission names step ep-1:a writing queue:a");
  }
});

test("9ufw X (exact scope identity): a record on a scope that extends the written one, or that the written one extends, or that differs only in letter case, covers nothing", () => {
  const cases: ReadonlyArray<readonly [string, string, string]> = [
    ["queue", "queue:a", "p-s-queue-a"],
    ["queue:a", "queue", "p-s-queue"],
    ["main", "Main", "p-s-main-cased"],
  ];
  for (const [written, recorded, permissionId] of cases) {
    const writer = step({ intentId: "ep-1:s", writeScopes: [written], readScopes: ["observed"] });
    const result = validateEffectPermissions({ steps: [writer], permissions: [permission(permissionId, "ep-1:s", recorded)], protectedScopes: [] });
    assert.equal(result.ok, false);
    assert.deepEqual(result.refusals, [{ code: "EFFECT_PERMISSION_ABSENT", intentId: "ep-1:s", scope: written, detail: `no permission names step ep-1:s writing ${written}` }]);
    assert.deepEqual(result.covered, []);
  }
  const exact = validateEffectPermissions({ steps: [step({ intentId: "ep-1:s", writeScopes: ["queue"], readScopes: ["observed"] })], permissions: [permission("p-s-queue", "ep-1:s", "queue")], protectedScopes: [] });
  assert.equal(exact.ok, true);
  assert.deepEqual(exact.refusals, []);
  assert.deepEqual(exact.covered, [{ intentId: "ep-1:s", scope: "queue", permissionId: "p-s-queue" }]);
});

test("9ufw Y (exact step identity): a record of step ep-1 is another step's record for step ep-1:a and is named as foreign, never counted as its own", () => {
  const writer = step({ intentId: "ep-1:a", writeScopes: ["main"] });
  const result = validateEffectPermissions({ steps: [writer], permissions: [permission("p-episode-main", "ep-1", "main")], protectedScopes: [] });
  assert.equal(result.ok, false);
  assert.deepEqual(result.refusals, [{ code: "EFFECT_PERMISSION_ABSENT", intentId: "ep-1:a", scope: "main", detail: "no permission names step ep-1:a writing main; p-episode-main covers step ep-1 only and does not transfer" }]);
  assert.deepEqual(result.covered, []);
});

test("9ufw F (foreign list identity): another step's records on main:x, queue and Main sit on no scope step ep-1:a writes, so neither absent-scope refusal names them", () => {
  const permissions = [permission("p-b-main-x", "ep-1:b", "main:x"), permission("p-b-queue", "ep-1:b", "queue"), permission("p-b-main-cased", "ep-1:b", "Main")];
  for (const ordered of [permissions, [...permissions].reverse()]) {
    const result = validateEffectPermissions({ steps: [a], permissions: ordered, protectedScopes: [] });
    assert.deepEqual(result.refusals.map(r => [r.code, r.intentId, r.scope, r.detail]), [
      ["EFFECT_PERMISSION_ABSENT", "ep-1:a", "main", "no permission names step ep-1:a writing main"],
      ["EFFECT_PERMISSION_ABSENT", "ep-1:a", "queue:a", "no permission names step ep-1:a writing queue:a"],
    ]);
    assert.deepEqual(result.covered, []);
  }
});

test("2evk WX4 (scope suffix): a record on a is a proper suffix of the written scope queue:a, so it covers nothing and no foreign list names it", () => {
  const writer = step({ intentId: "ep-1:s", writeScopes: ["queue:a"], readScopes: ["observed"] });
  const result = validateEffectPermissions({ steps: [writer], permissions: [permission("p-s-a", "ep-1:s", "a")], protectedScopes: [] });
  assert.equal(result.ok, false);
  assert.deepEqual(result.refusals, [{ code: "EFFECT_PERMISSION_ABSENT", intentId: "ep-1:s", scope: "queue:a", detail: "no permission names step ep-1:s writing queue:a" }]);
  assert.deepEqual(result.covered, []);
});

test("2evk WX7 (scope padding): a record on ' main' or 'main ' covers nothing for the written scope main, so scope identity applies no trimming and no record-ends-with-scope rule", () => {
  const writer = step({ intentId: "ep-1:s", writeScopes: ["main"], readScopes: ["observed"] });
  const result = validateEffectPermissions({
    steps: [writer],
    permissions: [permission("p-s-lead", "ep-1:s", " main"), permission("p-s-trail", "ep-1:s", "main ")],
    protectedScopes: [],
  });
  assert.equal(result.ok, false);
  assert.deepEqual(result.refusals, [{ code: "EFFECT_PERMISSION_ABSENT", intentId: "ep-1:s", scope: "main", detail: "no permission names step ep-1:s writing main" }]);
  assert.deepEqual(result.covered, []);
});

function ownPickRefusal(recordedStep: string, permissionId: string) {
  const writer = step({ intentId: "ep-1:a", writeScopes: ["main"] });
  const result = validateEffectPermissions({ steps: [writer], permissions: [permission(permissionId, recordedStep, "main")], protectedScopes: [] });
  assert.equal(result.ok, false);
  assert.deepEqual(result.refusals, [
    { code: "EFFECT_PERMISSION_ABSENT", intentId: "ep-1:a", scope: "main", detail: `no permission names step ep-1:a writing main; ${permissionId} covers step ${recordedStep} only and does not transfer` },
  ]);
  assert.deepEqual(result.covered, []);
}

test("2evk WY2 (own pick, step-id suffix): a record of step 1:a, a proper suffix of ep-1:a, is another step's record and never the step's own", () => {
  ownPickRefusal("1:a", "p-suffix-main");
});

test("2evk WY3 (own pick, step-id extension): a record of step ep-1:ab, which extends ep-1:a, is another step's record and never the step's own", () => {
  ownPickRefusal("ep-1:ab", "p-extended-main");
});

test("2evk WY4 (own pick, step-id letter case): a record of step EP-1:A is another step's record and never the step's own", () => {
  ownPickRefusal("EP-1:A", "p-cased-main");
});

function voidPickRefusal(recordedStep: string, permissionId: string) {
  const scope = "graph:protected:1";
  const writer = step({ intentId: "ep-1:a", writeScopes: [scope] });
  const result = validateEffectPermissions({ steps: [writer], permissions: [permission(permissionId, recordedStep, scope)], protectedScopes: [scope] });
  assert.equal(result.ok, false);
  assert.deepEqual(result.refusals, [
    { code: "EFFECT_SCOPE_PROTECTED", intentId: "ep-1:a", scope, detail: `step ep-1:a writes protected scope ${scope}; no permission admits a protected scope` },
  ]);
  assert.equal(result.refusals[0]!.detail.includes(permissionId), false);
  assert.deepEqual(result.covered, []);
}

test("2evk WV1 (void pick, step-id prefix): a record of step ep-1 on the protected scope is not listed as void for step ep-1:a", () => {
  voidPickRefusal("ep-1", "p-prefix-protected");
});

test("2evk WV2 (void pick, step-id letter case): a record of step EP-1:A on the protected scope is not listed as void for step ep-1:a", () => {
  voidPickRefusal("EP-1:A", "p-cased-protected");
});

test("2evk WPR1 (protected membership, scope prefix): protecting graph:protected leaves graph:protected:1 unprotected, so its own record covers it", () => {
  const scope = "graph:protected:1";
  const writer = step({ intentId: "ep-1:a", writeScopes: [scope] });
  const result = validateEffectPermissions({ steps: [writer], permissions: [permission("p-a-extended", "ep-1:a", scope)], protectedScopes: ["graph:protected"] });
  assert.equal(result.ok, true);
  assert.deepEqual(result.refusals, []);
  assert.deepEqual(result.covered, [{ intentId: "ep-1:a", scope, permissionId: "p-a-extended" }]);
});

test("2evk WPR2 (protected membership, letter case): protecting Main leaves main unprotected, so its own record covers it", () => {
  const writer = step({ intentId: "ep-1:a", writeScopes: ["main"] });
  const result = validateEffectPermissions({ steps: [writer], permissions: [permission("p-a-main", "ep-1:a", "main")], protectedScopes: ["Main"] });
  assert.equal(result.ok, true);
  assert.deepEqual(result.refusals, []);
  assert.deepEqual(result.covered, [{ intentId: "ep-1:a", scope: "main", permissionId: "p-a-main" }]);
});
