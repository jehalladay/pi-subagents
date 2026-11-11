import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { toEpisode, canonicalJson, digest, exportEpisodeForTraining, trainingBytes, attachPerActorCredit, importTrainingExport } from "../dist/index.js";
import type { Episode, EnvironmentEpisode, TrainingExport, PerActorCredit } from "../dist/index.js";

const here = dirname(fileURLToPath(import.meta.url));
const fixtureDir = join(here, "../../../qa/integration/python-consumer/fixtures");
const readSource = (name: string): EnvironmentEpisode => JSON.parse(readFileSync(join(fixtureDir, name), "utf8")) as EnvironmentEpisode;
const laneEpisode = (): Episode => toEpisode(readSource("landing-queue-seed7.json"));
const multiRoleEpisode = (): Episode => toEpisode(readSource("artifact-recovery-seed7.json"));
const laneExport = (): TrainingExport => exportEpisodeForTraining(laneEpisode());

const INTERVENTION: PerActorCredit = { actorId: "lane", valueMicro: 125000, derivation: { kind: "intervention", reference: "arm:landing-queue-seed7:lane-treatment" } };
const COUNTERFACTUAL: PerActorCredit = { actorId: "lane", valueMicro: -50000, derivation: { kind: "counterfactual", reference: "ablation:landing-queue-seed7:lane-removed" } };

function stripDigest(exported: TrainingExport): unknown {
  const { digest: _digest, ...body } = exported;
  return body;
}

test("a credit deriving from an intervention attaches: the export carries the rows and its digest covers them (law a)", () => {
  const base = laneExport();
  const credited = attachPerActorCredit(base, [INTERVENTION]);
  assert.deepEqual(credited.credits, [INTERVENTION]);
  assert.equal(credited.schema, "mw.training-export.v1");
  assert.equal(credited.mode, base.mode);
  assert.equal(credited.digest, digest(stripDigest(credited)));
  assert.notEqual(credited.digest, base.digest, "attaching credit moves the digest");
});

test("a counterfactual derivation attaches too, the input export is not mutated, and the rows are carried in order", () => {
  const base = laneExport();
  const before = canonicalJson(base);
  const credited = attachPerActorCredit(base, [INTERVENTION, COUNTERFACTUAL]);
  assert.equal(canonicalJson(base), before, "input mutated");
  assert.equal(Object.prototype.hasOwnProperty.call(base, "credits"), false);
  assert.deepEqual(credited.credits, [INTERVENTION, COUNTERFACTUAL]);
});

test("a record offering only a global team outcome is refused: a missing derivation never attributes per-actor credit (law b)", () => {
  const rows = [{ actorId: "lane", valueMicro: 125000 }] as unknown as readonly PerActorCredit[];
  assert.throws(() => attachPerActorCredit(laneExport(), rows), /TRAINING_CREDIT_WITHOUT_INTERVENTION: .*derives from no intervention or counterfactual/);
});

test("a derivation outside the closed enum, a prototype-key kind and an empty reference are each refused with TRAINING_CREDIT_WITHOUT_INTERVENTION", () => {
  for (const kind of ["global", "team-outcome", "constructor", "__proto__", "hasOwnProperty", ""]) {
    const rows = [{ ...INTERVENTION, derivation: { kind, reference: "arm:x" } }] as unknown as readonly PerActorCredit[];
    assert.throws(() => attachPerActorCredit(laneExport(), rows), /TRAINING_CREDIT_WITHOUT_INTERVENTION/, `kind ${kind}`);
  }
  assert.throws(() => attachPerActorCredit(laneExport(), [{ ...INTERVENTION, derivation: { kind: "intervention", reference: "" } }]), /TRAINING_CREDIT_WITHOUT_INTERVENTION: .*reference/);
});

test("a nonfinite or non-integer value, an empty actor id, an empty credit list and a double attach are each refused with TRAINING_CREDIT_INVALID", () => {
  for (const valueMicro of [Number.NaN, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY, 1.5]) {
    assert.throws(() => attachPerActorCredit(laneExport(), [{ ...INTERVENTION, valueMicro }]), /TRAINING_CREDIT_INVALID/, String(valueMicro));
  }
  assert.throws(() => attachPerActorCredit(laneExport(), [{ ...INTERVENTION, actorId: "" }]), /TRAINING_CREDIT_INVALID/);
  assert.throws(() => attachPerActorCredit(laneExport(), []), /TRAINING_CREDIT_INVALID: .*at least one/);
  const credited = attachPerActorCredit(laneExport(), [INTERVENTION]);
  assert.throws(() => attachPerActorCredit(credited, [COUNTERFACTUAL]), /TRAINING_CREDIT_INVALID: .*already carries credits/);
});

test("credit for an actor no step names is refused, and an all-unknown multi-role export attributes nothing (TRAINING_CREDIT_ACTOR_UNKNOWN)", () => {
  assert.throws(() => attachPerActorCredit(laneExport(), [{ ...INTERVENTION, actorId: "ghost" }]), /TRAINING_CREDIT_ACTOR_UNKNOWN/);
  const multi = exportEpisodeForTraining(multiRoleEpisode());
  assert.ok(multi.steps.every(step => step.actorId === "unknown"), "the artifact-recovery fixture is multi-role");
  for (const actorId of ["consumer", "producer", "unknown"]) {
    assert.throws(() => attachPerActorCredit(multi, [{ ...INTERVENTION, actorId }]), /TRAINING_CREDIT_ACTOR_UNKNOWN/, actorId);
  }
});

test("an export nobody credited carries no credits member and the committed training fixtures keep their exact bytes", () => {
  const base = laneExport();
  assert.equal(Object.prototype.hasOwnProperty.call(base, "credits"), false);
  assert.equal(trainingBytes(base).includes("credits"), false);
  const committed = readFileSync(join(fixtureDir, "training-landing-queue-seed7.json"), "utf8");
  assert.equal(committed, trainingBytes(base), "the base fixture bytes moved");
});

test("the committed credit fixture equals the regenerated credited export byte for byte and its digest recomputes", () => {
  const committed = readFileSync(join(fixtureDir, "credit-landing-queue-seed7.json"), "utf8");
  const regenerated = attachPerActorCredit(laneExport(), [INTERVENTION, COUNTERFACTUAL]);
  assert.equal(committed, trainingBytes(regenerated));
  const parsed = JSON.parse(committed) as TrainingExport;
  assert.equal(canonicalJson(parsed), committed.trimEnd());
  assert.equal(parsed.digest, digest(stripDigest(parsed)));
  assert.ok(parsed.credits!.every(row => row.derivation.reference.length > 0));
});

test("a credited export round-trips canonical form and relabels nothing: schema, version, steps and lineage are kept whole", () => {
  const base = laneExport();
  const credited = attachPerActorCredit(base, [COUNTERFACTUAL]);
  assert.equal(canonicalJson(JSON.parse(trainingBytes(credited))), trainingBytes(credited).trimEnd());
  assert.deepEqual(credited.steps, base.steps);
  assert.deepEqual(credited.lineage, base.lineage);
  assert.deepEqual(credited.sanitize, base.sanitize);
  assert.equal(credited.version, 1);
});

test("a credential-shaped derivation reference never reaches the credited bytes: the attach pass sanitises rows and records the path (19lq)", () => {
  const base = laneExport();
  const secret = "sk-abcdefghijklmnopqrstuvwxyz0123";
  const credited = attachPerActorCredit(base, [{ actorId: "lane", valueMicro: 1, derivation: { kind: "intervention", reference: `leaked ${secret}` } }]);
  assert.equal(trainingBytes(credited).includes(secret), false, "the secret survived into the bytes");
  assert.equal(credited.credits![0]!.derivation.reference, "[redacted]");
  assert.ok(credited.credits && credited.sanitize.removed.includes("/credits/0/derivation/reference"), `removed: ${JSON.stringify(credited.sanitize.removed)}`);
  assert.equal(credited.digest, digest(stripDigest(credited)));
});

test("an unsafe-integer micro-value is refused with TRAINING_CREDIT_INVALID: beyond 2^53-1 JavaScript rounds some integers that Python keeps exact, so parity cannot be guaranteed (19lq, wording corrected under 4emk)", () => {
  // The measured rationale: 2^53+1 rounds in JavaScript (JSON.parse and the literal alike) while 2^53+2 happens to be
  // exact on both sides; the guard refuses the whole unsafe range because exactness is lost for some of its members.
  assert.equal(JSON.parse("9007199254740993"), 9007199254740992, "2^53+1 rounds on the JavaScript side");
  assert.equal(String(JSON.parse("9007199254740994")), "9007199254740994", "2^53+2 is exact on the JavaScript side");
  assert.equal(Number.isSafeInteger(9007199254740994), false, "yet it is outside the safe range the guard refuses");
  for (const valueMicro of [2 ** 53 + 2, -(2 ** 53) - 2, 9007199254740993]) {
    assert.throws(() => attachPerActorCredit(laneExport(), [{ ...INTERVENTION, valueMicro }]), /TRAINING_CREDIT_INVALID: .*beyond 2\^53-1 JavaScript no longer represents every integer exactly/, String(valueMicro));
    assert.throws(() => attachPerActorCredit(laneExport(), [{ ...INTERVENTION, valueMicro }]), (error: Error) => !/as float/.test(error.message), "the refuted Python-float rationale must not return");
  }
  const safe = attachPerActorCredit(laneExport(), [{ ...INTERVENTION, valueMicro: Number.MAX_SAFE_INTEGER }]);
  assert.equal(safe.credits![0]!.valueMicro, Number.MAX_SAFE_INTEGER, "a safe integer still attaches");
});

const attachRaw = (derivation: unknown) => attachPerActorCredit(laneExport(), [{ ...INTERVENTION, derivation } as unknown as PerActorCredit]);

test("a non-string derivation kind is refused even when its string coercion names a member of the closed enum", () => {
  const coercing = { toString: () => "counterfactual" };
  for (const kind of [["intervention"], coercing]) {
    assert.throws(() => attachRaw({ kind, reference: "arm:x" }), /TRAINING_CREDIT_WITHOUT_INTERVENTION: .*derives from no intervention/);
  }
});

test("a derivation with an absent or non-string reference is refused, and a string reference of the right kind is the only one admitted", () => {
  assert.throws(() => attachRaw({ kind: "intervention" }), /TRAINING_CREDIT_WITHOUT_INTERVENTION: .*reference/);
  for (const reference of [42, null, true, ["arm:x"], { id: "arm:x" }]) {
    assert.throws(() => attachRaw({ kind: "intervention", reference }), /TRAINING_CREDIT_WITHOUT_INTERVENTION: .*reference/, String(reference));
  }
  assert.doesNotThrow(() => attachRaw({ kind: "intervention", reference: "arm:x" }));
});

test("attachment projects each row to the three known members and never carries the caller's object or extra members", () => {
  const callerRow = { ...INTERVENTION, teamOutcome: 0.9, derivation: { ...INTERVENTION.derivation, note: "extra" } } as unknown as PerActorCredit;
  const credited = attachPerActorCredit(laneExport(), [callerRow]);
  assert.deepEqual(credited.credits, [INTERVENTION]);
  assert.deepEqual(Object.keys(credited.credits![0]!).sort(), ["actorId", "derivation", "valueMicro"]);
  assert.deepEqual(Object.keys(credited.credits![0]!.derivation).sort(), ["kind", "reference"]);
  assert.equal(trainingBytes(credited).includes("teamOutcome"), false);
  assert.equal(trainingBytes(credited).includes("extra"), false);
  assert.notEqual(credited.credits![0], callerRow, "the caller's row object is carried through");
  assert.notEqual(credited.credits![0]!.derivation, callerRow.derivation, "the caller's derivation object is carried through");
});

const SECRET = "sk-abcdefghijklmnopqrstuvwxyz0123";

/** A lane export whose own sanitiser removed a path and whose episode arrived with a two-entry sanitize record, so both bookkeeping lists start non-empty. */
function bookkeepingExport(): TrainingExport {
  const base = laneEpisode();
  const planted: Episode = {
    ...base,
    decisions: base.decisions.map((decision, index) => (index === 0 ? { ...decision, provenance: [`leaked ${SECRET}`] } : decision)),
    sanitize: { ...base.sanitize, removed: ["/events/3/detail", "/decisions/0/provenance/0"] },
  };
  return exportEpisodeForTraining(planted);
}

test("attaching credit to an export that already removed and inherited paths appends the credit path after the base's removed list and keeps the inherited list whole (r9n0 P1)", () => {
  const base = bookkeepingExport();
  assert.deepEqual(base.sanitize.removed, ["/steps/0/provenance/evidence/0"], "the planted export sanitiser removed one path");
  assert.deepEqual(base.sanitize.inherited, ["/events/3/detail", "/decisions/0/provenance/0"], "the planted episode arrived with a sanitize record");
  const credited = attachPerActorCredit(base, [{ ...INTERVENTION, derivation: { kind: "intervention", reference: `leaked ${SECRET}` } }]);
  assert.deepEqual(credited.sanitize.removed, ["/steps/0/provenance/evidence/0", "/credits/0/derivation/reference"], "base removed first, then the credit path, in that order");
  assert.deepEqual(credited.sanitize.inherited, ["/events/3/detail", "/decisions/0/provenance/0"], "inherited carried through whole and in order");
  assert.equal(credited.sanitize.ran, true);
  assert.deepEqual(base.sanitize.removed, ["/steps/0/provenance/evidence/0"], "the input export's removed list is not mutated");
  assert.deepEqual(base.sanitize.inherited, ["/events/3/detail", "/decisions/0/provenance/0"], "the input export's inherited list is not mutated");
  assert.notEqual(credited.sanitize.inherited, base.sanitize.inherited, "the inherited list is a copy, not the input's array");
  assert.equal(credited.digest, digest(stripDigest(credited)));
});

test("a clean credit on an export with a non-empty sanitize record leaves removed and inherited exactly as the base carried them (r9n0 P1b)", () => {
  const base = bookkeepingExport();
  const credited = attachPerActorCredit(base, [INTERVENTION]);
  assert.deepEqual(credited.sanitize, base.sanitize);
});

test("Number.MIN_SAFE_INTEGER attaches beside Number.MAX_SAFE_INTEGER: the safe range is symmetric and its negative edge is admitted (r9n0 P2)", () => {
  const credited = attachPerActorCredit(laneExport(), [{ ...INTERVENTION, valueMicro: Number.MIN_SAFE_INTEGER }]);
  assert.equal(credited.credits![0]!.valueMicro, Number.MIN_SAFE_INTEGER);
  assert.equal(credited.credits![0]!.valueMicro, -9007199254740991);
  assert.throws(() => attachPerActorCredit(laneExport(), [{ ...INTERVENTION, valueMicro: Number.MIN_SAFE_INTEGER - 1 }]), /TRAINING_CREDIT_INVALID/, "one beyond the negative edge is still refused");
});

test("a credential-shaped reference in a later row is redacted at its own index and recorded at that path, while the clean row before it is untouched (r9n0 P3)", () => {
  const credited = attachPerActorCredit(laneExport(), [INTERVENTION, { ...COUNTERFACTUAL, derivation: { kind: "counterfactual", reference: `leaked ${SECRET}` } }]);
  assert.deepEqual(credited.credits![0], INTERVENTION, "row 0 is untouched");
  assert.equal(credited.credits![1]!.derivation.reference, "[redacted]", "row 1 reference is redacted");
  assert.equal(credited.credits![1]!.valueMicro, COUNTERFACTUAL.valueMicro);
  assert.deepEqual(credited.sanitize.removed, ["/credits/1/derivation/reference"], "exactly the row 1 path is recorded");
  assert.equal(trainingBytes(credited).includes(SECRET), false, "the secret survived into the bytes");
});

test("a non-string actor id (a number, an array, a String object) is refused as TRAINING_CREDIT_INVALID naming credit 0 and the missing actor, never as an unknown actor (o51x)", () => {
  const nonStrings: readonly unknown[] = [42, ["lane"], new String("lane")];
  for (const actorId of nonStrings) {
    const rows = [{ ...INTERVENTION, actorId }] as unknown as readonly PerActorCredit[];
    assert.throws(() => attachPerActorCredit(laneExport(), rows), /^Error: TRAINING_CREDIT_INVALID: credit 0 needs a named actor/, `actorId ${Object.prototype.toString.call(actorId)} ${String(actorId)}`);
  }
});

const SECOND_SECRET = "sk-ZYXWVUTSRQPONMLKJIHGFEDCBA9876";

test("every credential-bearing credit row is redacted and recorded in row order, not only the first: neither secret reaches the bytes and a clean middle row is carried untouched (d5gw R1)", () => {
  const two = attachPerActorCredit(laneExport(), [
    { ...INTERVENTION, derivation: { kind: "intervention", reference: `leaked ${SECRET}` } },
    { ...COUNTERFACTUAL, derivation: { kind: "counterfactual", reference: `leaked ${SECOND_SECRET}` } },
  ]);
  assert.equal(two.credits![0]!.derivation.reference, "[redacted]", "row 0 reference is redacted");
  assert.equal(two.credits![1]!.derivation.reference, "[redacted]", "row 1 reference is redacted");
  assert.deepEqual(two.sanitize.removed, ["/credits/0/derivation/reference", "/credits/1/derivation/reference"], "both paths recorded, in row order");
  assert.equal(trainingBytes(two).includes(SECRET), false, "the first secret survived into the bytes");
  assert.equal(trainingBytes(two).includes(SECOND_SECRET), false, "the second secret survived into the bytes");

  const three = attachPerActorCredit(bookkeepingExport(), [
    { ...INTERVENTION, derivation: { kind: "intervention", reference: `leaked ${SECRET}` } },
    COUNTERFACTUAL,
    { ...INTERVENTION, derivation: { kind: "intervention", reference: `leaked ${SECOND_SECRET}` } },
  ]);
  assert.deepEqual(three.credits![1], COUNTERFACTUAL, "the clean middle row is carried untouched");
  assert.equal(three.credits![0]!.derivation.reference, "[redacted]");
  assert.equal(three.credits![2]!.derivation.reference, "[redacted]");
  assert.deepEqual(
    three.sanitize.removed,
    ["/steps/0/provenance/evidence/0", "/credits/0/derivation/reference", "/credits/2/derivation/reference"],
    "base removed first, then the two credit paths in row order, the clean index skipped",
  );
  assert.equal(trainingBytes(three).includes(SECRET), false, "the first secret survived into the bytes");
  assert.equal(trainingBytes(three).includes(SECOND_SECRET), false, "the second secret survived into the bytes");
});

test("a clean credit on an export with a non-empty sanitize record carries removed as a copy, not the input's array, beside inherited (d5gw R2)", () => {
  const base = bookkeepingExport();
  const credited = attachPerActorCredit(base, [INTERVENTION]);
  assert.deepEqual(credited.sanitize.removed, base.sanitize.removed, "the clean credit adds no removed path");
  assert.notEqual(credited.sanitize.removed, base.sanitize.removed, "the removed list is a copy, not the input's array");
  assert.notEqual(credited.sanitize.inherited, base.sanitize.inherited, "the inherited list is a copy, not the input's array");
});

test("a clean credit on an export whose removed and inherited lists are both empty hands back two fresh empty arrays, not the input's (d4hu U1, U2)", () => {
  const base = laneExport();
  assert.deepEqual(base.sanitize.removed, [], "the lane export carries no removed path");
  assert.deepEqual(base.sanitize.inherited, [], "the lane export carries no inherited path");
  const credited = attachPerActorCredit(base, [INTERVENTION]);
  assert.deepEqual(credited.sanitize.removed, [], "the clean credit adds no removed path");
  assert.deepEqual(credited.sanitize.inherited, base.sanitize.inherited, "inherited carries through as the base had it");
  assert.notEqual(credited.sanitize.removed, base.sanitize.removed, "the empty removed list is a fresh array, not the input's");
  assert.notEqual(credited.sanitize.inherited, base.sanitize.inherited, "the empty inherited list is a fresh array, not the input's");
});

const THIRD_SECRET = "sk-MNBVCXZLKJHGFDSAPOIUYTREWQ5432";

test("three credential-bearing credit rows are all redacted and recorded at their own indexes, and none of the three secrets reaches the bytes (d4hu U3)", () => {
  const credited = attachPerActorCredit(laneExport(), [
    { ...INTERVENTION, derivation: { kind: "intervention", reference: `leaked ${SECRET}` } },
    { ...COUNTERFACTUAL, derivation: { kind: "counterfactual", reference: `leaked ${SECOND_SECRET}` } },
    { ...INTERVENTION, derivation: { kind: "intervention", reference: `leaked ${THIRD_SECRET}` } },
  ]);
  for (const index of [0, 1, 2]) assert.equal(credited.credits![index]!.derivation.reference, "[redacted]", `row ${index} reference is redacted`);
  assert.deepEqual(
    credited.sanitize.removed,
    ["/credits/0/derivation/reference", "/credits/1/derivation/reference", "/credits/2/derivation/reference"],
    "all three credit paths recorded",
  );
  for (const secret of [SECRET, SECOND_SECRET, THIRD_SECRET]) assert.equal(trainingBytes(credited).includes(secret), false, `${secret} survived into the bytes`);
});

test("a credential-bearing credit on an export whose inherited list is empty hands back a fresh empty inherited array, not the input's (vbyi V1)", () => {
  const base = laneExport();
  assert.deepEqual(base.sanitize.inherited, [], "the lane export carries no inherited path");
  const credited = attachPerActorCredit(base, [{ ...INTERVENTION, derivation: { kind: "intervention", reference: `leaked ${SECRET}` } }]);
  assert.deepEqual(credited.sanitize.removed, ["/credits/0/derivation/reference"], "the dirty row is recorded at its own path");
  assert.equal(trainingBytes(credited).includes(SECRET), false, "the secret survived into the bytes");
  assert.deepEqual(credited.sanitize.inherited, [], "inherited carries through empty");
  assert.notEqual(credited.sanitize.inherited, base.sanitize.inherited, "the empty inherited list is a fresh array, not the input's");
});

test("two clean credits on one empty-sanitize export hand back distinct fresh removed and inherited arrays, none the input's (vbyi V3)", () => {
  const base = laneExport();
  const first = attachPerActorCredit(base, [INTERVENTION]);
  const second = attachPerActorCredit(base, [INTERVENTION]);
  assert.deepEqual(first.sanitize.removed, [], "the first clean credit adds no removed path");
  assert.deepEqual(second.sanitize.removed, [], "the second clean credit adds no removed path");
  assert.notEqual(second.sanitize.removed, first.sanitize.removed, "the two removed lists are distinct arrays");
  assert.notEqual(first.sanitize.removed, base.sanitize.removed, "the first removed list is not the input's array");
  assert.notEqual(second.sanitize.removed, base.sanitize.removed, "the second removed list is not the input's array");
  assert.notEqual(second.sanitize.inherited, first.sanitize.inherited, "the two inherited lists are distinct arrays");
});

test("two credential-bearing credits on one empty-inherited base hand back distinct fresh inherited arrays, neither the input's, each recording the credential path (xwk7 V2)", () => {
  const base = laneExport();
  assert.deepEqual(base.sanitize.inherited, [], "the lane export carries no inherited path");
  const first = attachPerActorCredit(base, [{ ...INTERVENTION, derivation: { kind: "intervention", reference: `leaked ${SECRET}` } }]);
  const second = attachPerActorCredit(base, [{ ...COUNTERFACTUAL, derivation: { kind: "counterfactual", reference: `leaked ${SECOND_SECRET}` } }]);
  assert.deepEqual(first.sanitize.removed, ["/credits/0/derivation/reference"], "the first dirty row is recorded at its own path");
  assert.deepEqual(second.sanitize.removed, ["/credits/0/derivation/reference"], "the second dirty row is recorded at its own path");
  assert.deepEqual(first.sanitize.inherited, [], "the first inherited list is empty");
  assert.deepEqual(second.sanitize.inherited, [], "the second inherited list is empty");
  assert.notEqual(first.sanitize.inherited, base.sanitize.inherited, "the first inherited list is not the input's array");
  assert.notEqual(second.sanitize.inherited, base.sanitize.inherited, "the second inherited list is not the input's array");
  assert.notEqual(second.sanitize.inherited, first.sanitize.inherited, "the two inherited lists are distinct arrays");
});

test("a clean credit twice on an inherited-only export (removed empty, inherited non-empty) hands back fresh removed and inherited arrays, none the input's and none shared across the two calls (xwk7 V3)", () => {
  const lane = laneEpisode();
  const inheritedOnly = exportEpisodeForTraining({ ...lane, sanitize: { ...lane.sanitize, removed: ["/events/3/detail"] } });
  assert.deepEqual(inheritedOnly.sanitize.removed, [], "the export stripped nothing of its own");
  assert.deepEqual(inheritedOnly.sanitize.inherited, ["/events/3/detail"], "the episode arrived with a sanitize record");
  const first = attachPerActorCredit(inheritedOnly, [INTERVENTION]);
  const second = attachPerActorCredit(inheritedOnly, [INTERVENTION]);
  for (const credited of [first, second]) {
    assert.deepEqual(credited.sanitize.removed, [], "the clean credit adds no removed path");
    assert.deepEqual(credited.sanitize.inherited, inheritedOnly.sanitize.inherited, "inherited carries through as the base had it");
    assert.notEqual(credited.sanitize.removed, inheritedOnly.sanitize.removed, "the empty removed list is a fresh array, not the input's");
    assert.notEqual(credited.sanitize.inherited, inheritedOnly.sanitize.inherited, "the inherited list is a copy, not the input's array");
  }
  assert.notEqual(second.sanitize.removed, first.sanitize.removed, "the two removed lists are distinct arrays");
  assert.notEqual(second.sanitize.inherited, first.sanitize.inherited, "the two inherited lists are distinct arrays");
});

test("one credit list holding two credential-bearing rows on an empty-inherited base records both paths and hands back a fresh empty inherited array, not the input's (xwk7 V4)", () => {
  const base = laneExport();
  const credited = attachPerActorCredit(base, [
    { ...INTERVENTION, derivation: { kind: "intervention", reference: `leaked ${SECRET}` } },
    { ...COUNTERFACTUAL, derivation: { kind: "counterfactual", reference: `leaked ${SECOND_SECRET}` } },
  ]);
  assert.deepEqual(credited.sanitize.removed, ["/credits/0/derivation/reference", "/credits/1/derivation/reference"], "both dirty rows are recorded in row order");
  assert.deepEqual(credited.sanitize.inherited, [], "inherited carries through empty");
  assert.notEqual(credited.sanitize.inherited, base.sanitize.inherited, "the empty inherited list is a fresh array, not the input's");
});

/** A lane export whose own sanitiser removed one path while the episode arrived with no sanitize record: removed non-empty, inherited empty. */
function removedOnlyExport(): TrainingExport {
  const base = laneEpisode();
  const planted: Episode = {
    ...base,
    decisions: base.decisions.map((decision, index) => (index === 0 ? { ...decision, provenance: [`leaked ${SECRET}`] } : decision)),
  };
  return exportEpisodeForTraining(planted);
}

test("a clean credit on a removed-only export (removed non-empty, inherited empty) hands back a removed copy equal in content but not the input's array, and a fresh empty inherited array (rovf V9)", () => {
  const base = removedOnlyExport();
  assert.deepEqual(base.sanitize.removed, ["/steps/0/provenance/evidence/0"], "the export sanitiser removed one path of its own");
  assert.deepEqual(base.sanitize.inherited, [], "the episode arrived with no sanitize record");
  const credited = attachPerActorCredit(base, [INTERVENTION]);
  assert.deepEqual(credited.sanitize.removed, base.sanitize.removed, "the clean credit adds no removed path");
  assert.notEqual(credited.sanitize.removed, base.sanitize.removed, "the removed list is a copy, not the input's array");
  assert.deepEqual(credited.sanitize.inherited, [], "inherited carries through empty");
  assert.notEqual(credited.sanitize.inherited, base.sanitize.inherited, "the empty inherited list is a fresh array, not the input's");
});

test("a credential-bearing credit on a removed-only export records its credit path after the base path and hands back a fresh empty inherited array, not the input's (rovf V8)", () => {
  const base = removedOnlyExport();
  const credited = attachPerActorCredit(base, [{ ...INTERVENTION, derivation: { kind: "intervention", reference: `leaked ${SECOND_SECRET}` } }]);
  assert.deepEqual(credited.sanitize.removed, ["/steps/0/provenance/evidence/0", "/credits/0/derivation/reference"], "base path first, then the credit path");
  assert.deepEqual(base.sanitize.removed, ["/steps/0/provenance/evidence/0"], "the input export's removed list is not mutated");
  assert.deepEqual(credited.sanitize.inherited, [], "inherited carries through empty");
  assert.notEqual(credited.sanitize.inherited, base.sanitize.inherited, "the empty inherited list is a fresh array, not the input's");
  assert.equal(trainingBytes(credited).includes(SECOND_SECRET), false, "the secret survived into the bytes");
});

test("two credential-bearing credits attached separately to one laneExport base hand back removed lists of equal content that are distinct arrays, neither the input's (rovf V5)", () => {
  const base = laneExport();
  const first = attachPerActorCredit(base, [{ ...INTERVENTION, derivation: { kind: "intervention", reference: `leaked ${SECRET}` } }]);
  const second = attachPerActorCredit(base, [{ ...COUNTERFACTUAL, derivation: { kind: "counterfactual", reference: `leaked ${SECOND_SECRET}` } }]);
  assert.deepEqual(first.sanitize.removed, ["/credits/0/derivation/reference"], "the first dirty row is recorded at its own path");
  assert.deepEqual(second.sanitize.removed, ["/credits/0/derivation/reference"], "the second dirty row is recorded at its own path");
  assert.deepEqual(base.sanitize.removed, [], "the input export's removed list is not mutated");
  assert.notEqual(second.sanitize.removed, first.sanitize.removed, "the two removed lists are distinct arrays");
  assert.notEqual(first.sanitize.removed, base.sanitize.removed, "the first removed list is not the input's array");
  assert.notEqual(second.sanitize.removed, base.sanitize.removed, "the second removed list is not the input's array");
});

test("two clean credits attached separately to one bookkeepingExport base hand back removed and inherited copies that are distinct across the calls and neither the input's (rovf V6, V7)", () => {
  const base = bookkeepingExport();
  const first = attachPerActorCredit(base, [INTERVENTION]);
  const second = attachPerActorCredit(base, [INTERVENTION]);
  for (const credited of [first, second]) {
    assert.deepEqual(credited.sanitize.removed, base.sanitize.removed, "removed carries through as the base had it");
    assert.deepEqual(credited.sanitize.inherited, base.sanitize.inherited, "inherited carries through as the base had it");
    assert.notEqual(credited.sanitize.removed, base.sanitize.removed, "the removed list is a copy, not the input's array");
    assert.notEqual(credited.sanitize.inherited, base.sanitize.inherited, "the inherited list is a copy, not the input's array");
  }
  assert.notEqual(second.sanitize.removed, first.sanitize.removed, "the two removed lists are distinct arrays");
  assert.notEqual(second.sanitize.inherited, first.sanitize.inherited, "the two inherited lists are distinct arrays");
});

test("two credential-bearing credits on an inherited-only export hand back inherited arrays that are neither the input's nor each other's, each recording its credit path (rovf V10)", () => {
  const lane = laneEpisode();
  const inheritedOnly = exportEpisodeForTraining({ ...lane, sanitize: { ...lane.sanitize, removed: ["/events/3/detail"] } });
  assert.deepEqual(inheritedOnly.sanitize.inherited, ["/events/3/detail"], "the episode arrived with a sanitize record");
  const first = attachPerActorCredit(inheritedOnly, [{ ...INTERVENTION, derivation: { kind: "intervention", reference: `leaked ${SECRET}` } }]);
  const second = attachPerActorCredit(inheritedOnly, [{ ...COUNTERFACTUAL, derivation: { kind: "counterfactual", reference: `leaked ${SECOND_SECRET}` } }]);
  for (const credited of [first, second]) {
    assert.deepEqual(credited.sanitize.removed, ["/credits/0/derivation/reference"], "the dirty row is recorded at its own path");
    assert.deepEqual(credited.sanitize.inherited, inheritedOnly.sanitize.inherited, "inherited carries through as the base had it");
    assert.notEqual(credited.sanitize.inherited, inheritedOnly.sanitize.inherited, "the inherited list is a copy, not the input's array");
  }
  assert.notEqual(second.sanitize.inherited, first.sanitize.inherited, "the two inherited lists are distinct arrays");
});

test("a whitespace-only derivation reference is refused as TRAINING_CREDIT_WITHOUT_INTERVENTION naming credit 0 and the reference: the writer adopts the importer's nonblank rule (5a0i W1)", () => {
  for (const reference of ["   ", "\t\n", " ", " "]) {
    assert.throws(() => attachRaw({ kind: "intervention", reference }), /^Error: TRAINING_CREDIT_WITHOUT_INTERVENTION: credit 0 names no derivation reference/, JSON.stringify(reference));
    assert.throws(() => attachRaw({ kind: "counterfactual", reference }), /^Error: TRAINING_CREDIT_WITHOUT_INTERVENTION: credit 0 names no derivation reference/, JSON.stringify(reference));
  }
  assert.doesNotThrow(() => attachRaw({ kind: "intervention", reference: " arm:x " }), "a reference with surrounding space but a nonblank body is still admitted");
});

test("a whitespace-only actor id is refused as TRAINING_CREDIT_INVALID naming credit 0 and the missing actor, never as an unknown actor (5a0i W2)", () => {
  for (const actorId of ["   ", "\t\n", " "]) {
    assert.throws(() => attachPerActorCredit(laneExport(), [{ ...INTERVENTION, actorId }]), /^Error: TRAINING_CREDIT_INVALID: credit 0 needs a named actor/, JSON.stringify(actorId));
  }
});

test("a non-ASCII blank actor id (U+00A0, U+2003, U+FEFF) is refused as TRAINING_CREDIT_INVALID naming credit 0, never as an unknown actor (hwo8n R1)", () => {
  for (const actorId of ["\u00a0", "\u2003", "\ufeff", "\u00a0\u2003\ufeff"]) {
    assert.throws(() => attachPerActorCredit(laneExport(), [{ ...INTERVENTION, actorId }]), /^Error: TRAINING_CREDIT_INVALID: credit 0 needs a named actor/, JSON.stringify(actorId));
  }
});

test("a whitespace actor id stays refused as TRAINING_CREDIT_INVALID even when a step attributes that very actor (hwo8n R2)", () => {
  const ex = laneExport();
  const ws = { ...ex, steps: ex.steps.map(step => ({ ...step, actorId: "  " })) } as TrainingExport;
  assert.throws(() => attachPerActorCredit(ws, [{ ...INTERVENTION, actorId: "  " }]), /^Error: TRAINING_CREDIT_INVALID: credit 0 needs a named actor/);
});

test("a padded reference ' arm:x ' is sealed verbatim: the credit row reads back the caller's identifier and no /credits path enters sanitize.removed (hwo8n R3)", () => {
  const credited = attachPerActorCredit(laneExport(), [{ ...INTERVENTION, derivation: { kind: "intervention", reference: " arm:x " } }]);
  assert.equal(credited.credits?.[0]?.derivation.reference, " arm:x ");
  assert.deepEqual(credited.sanitize.removed.filter(path => path.startsWith("/credits")), []);
});

test("a whitespace-only reference in a later row names that row's index (5a0i W3)", () => {
  assert.throws(() => attachPerActorCredit(laneExport(), [INTERVENTION, { ...COUNTERFACTUAL, derivation: { kind: "counterfactual", reference: "  " } }]), /credit 1 names no derivation reference/);
  assert.throws(() => attachPerActorCredit(laneExport(), [INTERVENTION, { ...COUNTERFACTUAL, actorId: "  " }]), /credit 1 needs a named actor/);
});

test("round-trip law: every credit attachPerActorCredit seals imports cleanly through importTrainingExport, and the importer's refusal of a whitespace row has no writer-sealed counterpart left (5a0i W4)", () => {
  const sealed = [
    attachPerActorCredit(laneExport(), [INTERVENTION]),
    attachPerActorCredit(laneExport(), [COUNTERFACTUAL]),
    attachPerActorCredit(laneExport(), [INTERVENTION, COUNTERFACTUAL]),
    attachPerActorCredit(laneExport(), [{ ...INTERVENTION, derivation: { kind: "intervention", reference: " arm:x " } }]),
  ];
  for (const [index, credited] of sealed.entries()) {
    const outcome = importTrainingExport(JSON.parse(JSON.stringify(credited)));
    assert.equal(outcome.ok, true, `sealed export ${index} must import: ${JSON.stringify(outcome)}`);
  }
  for (const reference of ["   ", "\t"]) {
    assert.throws(() => attachRaw({ kind: "intervention", reference }), /TRAINING_CREDIT_WITHOUT_INTERVENTION/);
  }
});
