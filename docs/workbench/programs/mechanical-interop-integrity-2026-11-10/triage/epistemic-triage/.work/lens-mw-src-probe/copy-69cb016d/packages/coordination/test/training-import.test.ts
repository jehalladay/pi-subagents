// MechanicalWorkflows-bu7x (TW-EAT-R005): an import/validation entry point for adapter-format
// mw.training-export.v1 records. The missing-logprob negative control: a step whose logProb
// MEMBER is absent is a typed rejection (TRAINING_LOGPROB_ABSENT); the explicit literal
// "unknown" is accepted. Structural breakage and digest drift reject as TRAINING_IMPORT_MALFORMED.
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { attachPerActorCredit, canonicalJson, digest, exportEpisodeForTraining, importTrainingExport, sanitizeValue, toEpisode, trainingBytes } from "../dist/index.js";
import type { EnvironmentEpisode, TrainingExport } from "../dist/index.js";

const here = dirname(fileURLToPath(import.meta.url));
const fixtureDir = join(here, "../../../qa/integration/python-consumer/fixtures");
const source = JSON.parse(readFileSync(join(fixtureDir, "landing-queue-seed7.json"), "utf8")) as EnvironmentEpisode;
const exported = (): TrainingExport => exportEpisodeForTraining(toEpisode(source));
const asValue = (record: unknown): unknown => JSON.parse(JSON.stringify(record));
// Re-seal a mutated record so its digest recomputes: the structural check under test, not the digest backstop, must be what refuses (or admits) it.
const reseal = (record: Record<string, unknown>): Record<string, unknown> => {
  const { digest: _stale, ...rest } = record;
  return { ...rest, digest: digest(rest) };
};
const clone = (): Record<string, unknown> => asValue(exported()) as Record<string, unknown>;
const refusal = (value: unknown) => {
  const outcome = importTrainingExport(value);
  assert.equal(outcome.ok, false);
  if (outcome.ok) throw new Error("unreachable: asserted refusal");
  return outcome;
};
const deepFreeze = <T>(value: T): T => {
  if (value !== null && typeof value === "object") {
    for (const member of Object.values(value)) deepFreeze(member);
    Object.freeze(value);
  }
  return value;
};

test("a round-tripped export imports cleanly and byte-identically", () => {
  const record = exported();
  const outcome = importTrainingExport(asValue(record));
  assert.equal(outcome.ok, true);
  if (!outcome.ok) return;
  assert.equal(trainingBytes(outcome.record), trainingBytes(record));
});

test("a record whose step lacks the logProb member is rejected with TRAINING_LOGPROB_ABSENT, naming the step", () => {
  const record = asValue(exported()) as { steps: Record<string, unknown>[] };
  delete record.steps[1]!["logProb"];
  const outcome = importTrainingExport(record);
  assert.equal(outcome.ok, false);
  if (outcome.ok) return;
  assert.equal(outcome.code, "TRAINING_LOGPROB_ABSENT");
  assert.match(outcome.detail, /step 1\b/);
});

test("logProb 'unknown' is accepted; a null, blank or non-finite logProb is not", () => {
  const unknownRecord = asValue(exported()) as { steps: Record<string, unknown>[] };
  for (const step of unknownRecord.steps) step["logProb"] = "unknown";
  assert.equal(importTrainingExport(unknownRecord).ok, true);
  for (const bad of [null, "", "0.5", Number.NaN]) {
    const record = asValue(exported()) as { steps: Record<string, unknown>[] };
    record.steps[0]!["logProb"] = bad;
    const outcome = importTrainingExport(record);
    assert.equal(outcome.ok, false, String(bad));
    if (outcome.ok) continue;
    assert.equal(outcome.code, "TRAINING_IMPORT_MALFORMED", String(bad));
    assert.match(outcome.detail, /logProb/);
  }
});

test("structural breakage rejects as TRAINING_IMPORT_MALFORMED, naming the defect", () => {
  const cases: [(record: Record<string, unknown>) => void, RegExp][] = [
    [record => { record["schema"] = "other.v1"; }, /schema/],
    [record => { delete record["steps"]; }, /steps/],
    [record => { record["mode"] = "live-verified"; }, /mode/],
    [record => { delete record["digest"]; }, /digest/],
  ];
  for (const [mutate, pattern] of cases) {
    const record = asValue(exported()) as Record<string, unknown>;
    mutate(record);
    const outcome = importTrainingExport(record);
    assert.equal(outcome.ok, false);
    if (outcome.ok) continue;
    assert.equal(outcome.code, "TRAINING_IMPORT_MALFORMED");
    assert.match(outcome.detail, pattern);
  }
  assert.equal(importTrainingExport(null).ok, false);
  assert.equal(importTrainingExport("[]").ok, false);
});

test("a digest that does not recompute from the members is rejected, so imported records carry their own integrity", () => {
  const record = asValue(exported()) as Record<string, unknown>;
  record["digest"] = "sha256:" + "0".repeat(64);
  const outcome = importTrainingExport(record);
  assert.equal(outcome.ok, false);
  if (outcome.ok) return;
  assert.equal(outcome.code, "TRAINING_IMPORT_MALFORMED");
  assert.match(outcome.detail, /digest/);
});

// MechanicalWorkflows-tdkm (bu7x follow-up): twelve laws the bu7x commit body and the module header state, each pinned by its own assertion.

test("S1: a version other than the number 1 is refused, resealed so only the version check can refuse it", () => {
  for (const bad of [2, 0, "1", null]) {
    const record = clone();
    record["version"] = bad;
    const outcome = refusal(reseal(record));
    assert.equal(outcome.code, "TRAINING_IMPORT_MALFORMED", String(bad));
    assert.match(outcome.detail, /unsupported version/, String(bad));
  }
});

test("S2: every member of the closed mode enum imports, live included; a label outside it does not", () => {
  for (const mode of ["fixture", "replay", "live"]) {
    const record = clone();
    record["mode"] = mode;
    const outcome = importTrainingExport(reseal(record));
    assert.equal(outcome.ok, true, mode);
    if (outcome.ok) assert.equal(outcome.record.mode, mode);
  }
  const record = clone();
  record["mode"] = "live-verified";
  assert.match(refusal(reseal(record)).detail, /mode outside the closed enum/);
});

test("S3 and S4: a blank or whitespace-only environment or episodeId is refused, resealed", () => {
  for (const member of ["environment", "episodeId"]) {
    for (const bad of ["", "   ", "\t\n"]) {
      const record = clone();
      record[member] = bad;
      const outcome = refusal(reseal(record));
      assert.equal(outcome.code, "TRAINING_IMPORT_MALFORMED", `${member} ${JSON.stringify(bad)}`);
      assert.match(outcome.detail, /blank episodeId or environment/, `${member} ${JSON.stringify(bad)}`);
    }
  }
});

test("S5: a non-object step (null, number, array) is refused with a typed rejection naming the step, never thrown", () => {
  for (const bad of [null, 7, []]) {
    const record = clone();
    (record["steps"] as unknown[])[0] = bad;
    const outcome = refusal(reseal(record));
    assert.equal(outcome.code, "TRAINING_IMPORT_MALFORMED", JSON.stringify(bad));
    assert.match(outcome.detail, /step 0 is not an object/, JSON.stringify(bad));
  }
});

test("S6: Infinity and -Infinity logProb are refused as a typed rejection, never thrown from the canonical digest", () => {
  for (const bad of [Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY]) {
    const record = clone();
    (record["steps"] as Record<string, unknown>[])[0]!["logProb"] = bad;
    const outcome = refusal(record);
    assert.equal(outcome.code, "TRAINING_IMPORT_MALFORMED", String(bad));
    assert.match(outcome.detail, /logProb must be a finite number/, String(bad));
  }
});

test("S7 and S12: verifier, lineage and sanitize must each be present objects; null, a missing member and an array are refused", () => {
  for (const member of ["verifier", "lineage", "sanitize"]) {
    const absent = clone();
    delete absent[member];
    for (const [label, record] of [["absent", absent], ["null", { ...clone(), [member]: null }], ["array", { ...clone(), [member]: [] }]] as const) {
      const outcome = refusal(reseal(record));
      assert.equal(outcome.code, "TRAINING_IMPORT_MALFORMED", `${member} ${label}`);
      assert.match(outcome.detail, new RegExp(`^${member} member absent or not an object`), `${member} ${label}`);
    }
  }
});

test("S8: a blank or absent digest is refused by its own check, not only by the recompute backstop", () => {
  for (const bad of ["", "   "]) {
    const record = clone();
    record["digest"] = bad;
    assert.match(refusal(record).detail, /digest member absent or blank/, JSON.stringify(bad));
  }
  const record = clone();
  delete record["digest"];
  assert.match(refusal(record).detail, /digest member absent or blank/);
});

test("S9: a logProb member present but undefined is a malformed value, not the absent-member control", () => {
  const record = clone();
  (record["steps"] as Record<string, unknown>[])[0]!["logProb"] = undefined;
  assert.ok("logProb" in (record["steps"] as Record<string, unknown>[])[0]!);
  const outcome = refusal(record);
  assert.equal(outcome.code, "TRAINING_IMPORT_MALFORMED");
  assert.match(outcome.detail, /logProb must be a finite number/);
});

test("S10: the input is read, never altered, on refusal and on admission", () => {
  const refused = clone();
  delete (refused["steps"] as Record<string, unknown>[])[1]!["logProb"];
  const before = JSON.stringify(refused);
  assert.equal(refusal(refused).code, "TRAINING_LOGPROB_ABSENT");
  assert.equal(JSON.stringify(refused), before);
  assert.equal("logProb" in (refused["steps"] as Record<string, unknown>[])[1]!, false);
  const frozen = deepFreeze(clone());
  const admitted = importTrainingExport(frozen);
  assert.equal(admitted.ok, true);
});

test("S11: a finite numeric logProb imports cleanly, beside the literal unknown", () => {
  const record = clone();
  const steps = record["steps"] as Record<string, unknown>[];
  steps.forEach((step, index) => { step["logProb"] = index % 2 === 0 ? -0.25 * (index + 1) : "unknown"; });
  const sealed = reseal(record);
  const outcome = importTrainingExport(sealed);
  assert.equal(outcome.ok, true);
  if (!outcome.ok) return;
  assert.equal(outcome.record.steps[0]!.logProb, -0.25);
  assert.equal(trainingBytes(outcome.record), trainingBytes(sealed as unknown as TrainingExport));
});

// MechanicalWorkflows-eu94 (0iwj.1 follow-up, 19lq laws): the importer validates a credits member.
// attachPerActorCredit refuses a row with no intervention or counterfactual derivation, an actor no step
// names, a credential-shaped reference and a non-safe-integer value; an external record reaches the admitted
// set through importTrainingExport, so the same laws hold there. Each forged record below recomputes its
// digest, so the digest check alone admits it.
const CREDIT = { actorId: "lane", valueMicro: 125000, derivation: { kind: "intervention", reference: "arm:landing-queue-seed7:lane-treatment" } };
const resealCredit = (record: Record<string, unknown>): Record<string, unknown> => {
  const { digest: _digest, ...rest } = record;
  return { ...rest, digest: digest(rest) };
};
const withCredits = (credits: unknown): Record<string, unknown> => {
  const record = asValue(exported()) as Record<string, unknown>;
  record["credits"] = credits;
  return resealCredit(record);
};
const creditRow = (change: (row: Record<string, unknown>) => void): unknown => {
  const row = JSON.parse(JSON.stringify(CREDIT)) as Record<string, unknown>;
  change(row);
  return [row];
};
const creditRefusal = (record: unknown, pattern: RegExp, label: string): void => {
  const outcome = importTrainingExport(record);
  assert.equal(outcome.ok, false, label);
  if (outcome.ok) return;
  assert.equal(outcome.code, "TRAINING_IMPORT_MALFORMED", label);
  assert.match(outcome.detail, pattern, label);
};

test("a credit-bearing export built by attachPerActorCredit round-trips through the importer byte-identically", () => {
  const credited = attachPerActorCredit(exported(), [CREDIT as never]);
  const outcome = importTrainingExport(asValue(credited));
  assert.equal(outcome.ok, true);
  if (!outcome.ok) return;
  assert.equal(trainingBytes(outcome.record), trainingBytes(credited));
});

test("credits that are present but not a non-empty array are refused, naming credits", () => {
  for (const bad of ["global-team-outcome:0.9", {}, 7, null, true, []]) {
    creditRefusal(withCredits(bad), /credits/, JSON.stringify(bad));
  }
});

test("a row that is not an object is refused, naming its index", () => {
  for (const bad of [null, "lane", 3, [CREDIT]]) {
    creditRefusal(withCredits([CREDIT, bad]), /credit 1\b/, JSON.stringify(bad));
  }
});

test("a global-outcome-only row (no derivation) and a derivation outside the closed enum are refused", () => {
  creditRefusal(withCredits(creditRow(row => { delete row["derivation"]; })), /credit 0\b.*derivation/, "no derivation");
  creditRefusal(withCredits(creditRow(row => { row["derivation"] = "intervention"; })), /credit 0\b.*derivation/, "string derivation");
  for (const kind of ["global", "team-outcome", "constructor", "__proto__", "hasOwnProperty", "", null, 1]) {
    creditRefusal(withCredits(creditRow(row => { row["derivation"] = { kind, reference: "arm:x" }; })), /credit 0\b.*(derivation|kind)/, String(kind));
  }
});

test("a blank or non-string derivation reference is refused", () => {
  for (const reference of ["", "   ", null, 5]) {
    creditRefusal(withCredits(creditRow(row => { row["derivation"] = { kind: "counterfactual", reference }; })), /credit 0\b.*reference/, String(reference));
  }
});

test("an actor no step names, a blank actor and a non-string actor are refused", () => {
  creditRefusal(withCredits(creditRow(row => { row["actorId"] = "stranger"; })), /credit 0\b.*stranger/, "unnamed actor");
  for (const actorId of ["", null, 4, ["lane"]]) {
    creditRefusal(withCredits(creditRow(row => { row["actorId"] = actorId; })), /credit 0\b.*actor/, String(actorId));
  }
  // MechanicalWorkflows-vpl9: an array whose string form names the step actor is not the string "lane"; the refusal names the missing actor exactly, and the string actor on the same resealed path imports ok.
  creditRefusal(withCredits(creditRow(row => { row["actorId"] = ["lane"]; })), /^credit 0 needs a named actor$/, "array actor id whose string form names the step actor");
  assert.equal(importTrainingExport(withCredits(creditRow(row => { row["actorId"] = "lane"; }))).ok, true, "the string actor on the same path imports ok");
});

test("e5yp V4-V6: the named-actor law holds past credit 0 (array and numeric actor ids at credit 1 name credit 1, boolean and object ids at credit 0 are refused) and the clean two-credit record imports ok", () => {
  // MechanicalWorkflows-e5yp (vpl9 follow-up): the importer admits a resealed record at the trust boundary, so the law applies to every row, not credit 0 alone.
  creditRefusal(withCredits([CREDIT, { ...CREDIT, actorId: ["lane"] }]), /^credit 1 needs a named actor$/, "array actor id at credit 1 whose string form names the step actor");
  creditRefusal(withCredits([CREDIT, { ...CREDIT, actorId: 4 }]), /^credit 1 needs a named actor$/, "numeric actor id at credit 1");
  const clean = importTrainingExport(withCredits([CREDIT, { ...CREDIT }]));
  assert.equal(clean.ok, true, "the clean two-credit record imports ok");
  if (!clean.ok) return;
  assert.equal(clean.record.credits!.length, 2);
  for (const actorId of [true, false, {}]) {
    creditRefusal(withCredits(creditRow(row => { row["actorId"] = actorId; })), /^credit 0 needs a named actor$/, `non-string actor id ${JSON.stringify(actorId)} at credit 0`);
  }
});

test("an export whose steps attribute no actor (several roles share the episode) admits no credit row", () => {
  const multi = asValue(exportEpisodeForTraining(toEpisode(JSON.parse(readFileSync(join(fixtureDir, "artifact-recovery-seed7.json"), "utf8")) as EnvironmentEpisode))) as Record<string, unknown>;
  multi["credits"] = [{ ...CREDIT, actorId: "unknown" }];
  creditRefusal(resealCredit(multi), /credit 0\b.*unknown/, "unknown literal actor");
  multi["credits"] = [{ ...CREDIT, actorId: "producer" }];
  creditRefusal(resealCredit(multi), /credit 0\b.*producer/, "role without a step");
});

test("a valueMicro that is not a safe integer is refused (Python reads larger ones as float)", () => {
  for (const valueMicro of [2 ** 53 + 2, 1e21, 1.5, "125000", null, true]) {
    creditRefusal(withCredits(creditRow(row => { row["valueMicro"] = valueMicro; })), /credit 0\b.*valueMicro/, String(valueMicro));
  }
  for (const valueMicro of [0, -50000, Number.MAX_SAFE_INTEGER]) {
    assert.equal(importTrainingExport(withCredits(creditRow(row => { row["valueMicro"] = valueMicro; }))).ok, true, String(valueMicro));
  }
});

test("a credential-shaped reference or row member is refused without echoing the secret", () => {
  const secret = "sk-" + "a1B2c3D4e5F6g7H8i9J0";
  const shaped = withCredits(creditRow(row => { row["derivation"] = { kind: "intervention", reference: secret }; }));
  creditRefusal(shaped, /credits.*credential/, "credential-shaped reference");
  const keyed = withCredits(creditRow(row => { row["apiKey"] = "x"; }));
  creditRefusal(keyed, /credits.*credential/, "credential-shaped member");
  for (const record of [shaped, keyed]) {
    const outcome = importTrainingExport(record);
    assert.equal(outcome.ok, false);
    if (!outcome.ok) assert.equal(outcome.detail.includes(secret), false, "the secret never reaches the creditRefusal detail");
  }
});

// MechanicalWorkflows-kb25: scan every credit row and attribute actors from every step.
test("kb25: a credential in row 1 is refused with its exact path, without echoing the secret", () => {
  const secret = "sk-" + "a1B2c3D4e5F6g7H8i9J0";
  for (const [row, path] of [
    [{ ...CREDIT, derivation: { kind: "intervention", reference: secret } }, "/1/derivation/reference"],
    [{ ...CREDIT, apiKey: secret }, "/1/apiKey"],
  ] as const) {
    const outcome = importTrainingExport(withCredits([CREDIT, row]));
    assert.equal(outcome.ok, false);
    if (outcome.ok) return;
    assert.equal(outcome.code, "TRAINING_IMPORT_MALFORMED");
    assert.equal(outcome.detail, `credits carry credential-shaped content at ${path}`);
    assert.equal(outcome.detail.includes(secret), false);
  }
});

test("kb25: an actor attributed only by the last step is admitted, and absent attribution is refused", () => {
  const record = clone();
  const steps = record["steps"] as Record<string, unknown>[];
  assert.ok(steps.length > 1, "the first and last steps must differ");
  assert.ok(steps.every(step => step["actorId"] !== "late-actor"));
  record["credits"] = [{ ...CREDIT, actorId: "late-actor" }];
  creditRefusal(resealCredit(record), /credit 0\b.*late-actor/, "actor absent from every step");
  steps[steps.length - 1]!["actorId"] = "late-actor";
  const outcome = importTrainingExport(resealCredit(record));
  assert.equal(outcome.ok, true);
  if (!outcome.ok) return;
  assert.equal(outcome.record.credits![0]!.actorId, "late-actor");
});

// MechanicalWorkflows-jyza (eu94 follow-up): attachPerActorCredit projects every row to exactly
// { actorId, valueMicro, derivation: { kind, reference } }, so a row or derivation member outside that
// projection (bonusMicro, teamOutcome, weight) can never come from the writer. The importer refuses it,
// naming the credit index and the member NAME only. A credential-shaped member (apiKey) still reports the
// credential refusal, because the sanitize scan runs before the shape check.
test("a credit row carrying a member outside the writer projection is refused, naming the index and the member", () => {
  creditRefusal(withCredits(creditRow(row => { row["bonusMicro"] = 999999; })), /credit 0\b.*writer projection.*bonusMicro/, "bonusMicro row member");
  creditRefusal(withCredits(creditRow(row => { row["teamOutcome"] = 0.9; })), /credit 0\b.*writer projection.*teamOutcome/, "teamOutcome row member");
});

test("a derivation carrying a member outside {kind, reference} is refused, naming the index and the member", () => {
  creditRefusal(withCredits(creditRow(row => { row["derivation"] = { kind: "intervention", reference: "arm:x", weight: 2 }; })), /credit 0\b.*writer projection.*weight/, "derivation weight member");
});

test("the extra-member refusal names the offending row index and never echoes the member value", () => {
  creditRefusal(withCredits([CREDIT, { ...CREDIT, bonusMicro: 999999 }]), /credit 1\b.*bonusMicro/, "second row");
  const outcome = importTrainingExport(withCredits(creditRow(row => { row["teamOutcome"] = 0.9; })));
  assert.equal(outcome.ok, false);
  if (!outcome.ok) assert.equal(outcome.detail.includes("0.9"), false, "the member value never reaches the detail");
});

// MechanicalWorkflows-9tiw (jyza follow-up, test-only): three laws of the allowlist the first jyza rows left
// unpinned. The derivation refusal reports the index of the row it sits on, not a fixed 0; a derivation member
// value never reaches the detail (only the NAME does); and a prototype-named member (constructor, toString,
// hasOwnProperty, valueOf, an own __proto__ from JSON.parse) is refused by name, so the allowlist reads own
// keys against a closed set and never a prototype lookup.
test("a derivation member outside {kind, reference} on a second row is refused at that row's index", () => {
  creditRefusal(
    withCredits([CREDIT, { ...CREDIT, derivation: { kind: "intervention", reference: "arm:x", weight: 2 } }]),
    /^credit 1 derivation carries a member outside the writer projection: weight$/,
    "derivation member on credit 1",
  );
});

test("a derivation member value never reaches the refusal detail, only its name", () => {
  const outcome = importTrainingExport(withCredits(creditRow(row => { row["derivation"] = { kind: "intervention", reference: "arm:x", weight: 271828 }; })));
  assert.equal(outcome.ok, false);
  if (outcome.ok) return;
  assert.equal(outcome.code, "TRAINING_IMPORT_MALFORMED");
  assert.match(outcome.detail, /^credit 0 derivation carries a member outside the writer projection: weight$/);
  assert.equal(outcome.detail.includes("271828"), false, "the derivation member value never reaches the detail");
});

const PROTOTYPE_NAMES = ["constructor", "toString", "hasOwnProperty", "valueOf"] as const;

test("a prototype-named row member is refused by name", () => {
  for (const name of PROTOTYPE_NAMES) {
    creditRefusal(
      withCredits(creditRow(row => { row[name] = "x"; })),
      new RegExp(`^credit 0 carries a member outside the writer projection: ${name}$`),
      `row member ${name}`,
    );
  }
  const proto = JSON.parse(`{"actorId":"lane","valueMicro":125000,"derivation":{"kind":"intervention","reference":"arm:x"},"__proto__":{"a":1}}`) as unknown;
  assert.equal(Object.prototype.hasOwnProperty.call(proto, "__proto__"), true, "fixture carries an own __proto__ member");
  creditRefusal(withCredits([proto]), /^credit 0 carries a member outside the writer projection: __proto__$/, "own __proto__ row member");
});

test("a prototype-named derivation member is refused by name", () => {
  for (const name of PROTOTYPE_NAMES) {
    creditRefusal(
      withCredits(creditRow(row => { row["derivation"] = { kind: "intervention", reference: "arm:x", [name]: "x" }; })),
      new RegExp(`^credit 0 derivation carries a member outside the writer projection: ${name}$`),
      `derivation member ${name}`,
    );
  }
  const proto = JSON.parse(`{"actorId":"lane","valueMicro":125000,"derivation":{"kind":"intervention","reference":"arm:x","__proto__":{"a":1}}}`) as unknown;
  creditRefusal(withCredits([proto]), /^credit 0 derivation carries a member outside the writer projection: __proto__$/, "own __proto__ derivation member");
});

// JYZA-D1 (review-jyza): a hostile in-process value placed where the shallow credit checks read first
// (actorId, derivation.reference, an array row) used to reach the unbounded credential scrub and throw a
// RangeError; the importer guards the credits member before scanning it, so each is a typed rejection.
// The record carries a placeholder digest: the credits law runs before the digest recompute.
const hostileCredits = (credits: unknown): Record<string, unknown> => {
  const record = asValue(exported()) as Record<string, unknown>;
  record["credits"] = credits;
  record["digest"] = "placeholder";
  return record;
};
const cyclic = (): Record<string, unknown> => {
  const loop: Record<string, unknown> = {};
  loop["self"] = loop;
  return loop;
};
const nested = (): unknown[] => {
  let deep: unknown[] = [];
  for (let index = 0; index < 20000; index += 1) deep = [deep];
  return deep;
};

test("a cyclic object in a credit actorId, derivation reference or array row is a typed rejection, never a throw", () => {
  creditRefusal(hostileCredits([{ ...CREDIT, actorId: cyclic() }]), /cycl/, "cycle in actorId");
  creditRefusal(hostileCredits([{ ...CREDIT, derivation: { kind: "intervention", reference: cyclic() } }]), /cycl/, "cycle in derivation.reference");
  creditRefusal(hostileCredits([{ ...CREDIT, valueMicro: cyclic() }]), /cycl/, "cycle in valueMicro");
  creditRefusal(hostileCredits([cyclic()]), /cycl/, "cycle as the row itself");
  const arrayRow: unknown[] = [];
  arrayRow.push(arrayRow);
  creditRefusal(hostileCredits([arrayRow]), /cycl/, "cycle in an array row");
});

test("a 20000-deep nest in a credit row position is a typed rejection, never a throw", () => {
  creditRefusal(hostileCredits([{ ...CREDIT, actorId: nested() }]), /nests deeper/, "deep nest in actorId");
  creditRefusal(hostileCredits([{ ...CREDIT, bonusMicro: nested() }]), /nests deeper/, "deep nest in an extra row member");
});

test("importing a credit-bearing record leaves the input untouched", () => {
  const record = withCredits([CREDIT]);
  const before = canonicalJson(record);
  importTrainingExport(record);
  importTrainingExport(withCredits(creditRow(row => { delete row["derivation"]; })));
  assert.equal(canonicalJson(record), before);
});

// MechanicalWorkflows-v8ls: the typed outcome holds on non-JSON member shapes. An in-process caller can
// hand the importer a NaN member, a Date or a cyclic structure; each used to throw out of the digest
// recompute instead of returning the typed rejection.
test("a NaN, Date or cyclic member is a typed TRAINING_IMPORT_MALFORMED rejection, never a throw", () => {
  const nan = asValue(exported()) as Record<string, unknown>;
  nan["extra"] = Number.NaN;
  const dated = asValue(exported()) as Record<string, unknown>;
  dated["verifier"] = new Date(0);
  const cyclicVerifier: Record<string, unknown> = {};
  cyclicVerifier["self"] = cyclicVerifier;
  const cyclic = asValue(exported()) as Record<string, unknown>;
  cyclic["verifier"] = cyclicVerifier;
  const infinite = asValue(exported()) as { steps: Record<string, unknown>[] };
  infinite.steps[0]!["detail"] = { nested: [1, Number.POSITIVE_INFINITY] };
  const cases: readonly [string, unknown, RegExp][] = [
    ["NaN member", nan, /extra/],
    ["Date member", dated, /verifier/],
    ["cyclic member", cyclic, /cycl/],
    ["nested Infinity", infinite, /steps\[0\]\.detail/],
  ];
  for (const [label, value, named] of cases) {
    let outcome: ReturnType<typeof importTrainingExport> | undefined;
    assert.doesNotThrow(() => { outcome = importTrainingExport(value); }, label);
    assert.equal(outcome?.ok, false, label);
    if (!outcome || outcome.ok) continue;
    assert.equal(outcome.code, "TRAINING_IMPORT_MALFORMED", label);
    assert.match(outcome.detail, named, label);
  }
});

test("a deeply nested member is a typed rejection, not a stack overflow", () => {
  const record = asValue(exported()) as Record<string, unknown>;
  let deep: unknown = 0;
  for (let index = 0; index < 20000; index += 1) deep = [deep];
  record["extra"] = deep;
  let outcome: ReturnType<typeof importTrainingExport> | undefined;
  assert.doesNotThrow(() => { outcome = importTrainingExport(record); });
  assert.equal(outcome?.ok, false);
  if (!outcome || outcome.ok) return;
  assert.equal(outcome.code, "TRAINING_IMPORT_MALFORMED");
  assert.match(outcome.detail, /depth/);
});

// MechanicalWorkflows-b1sw (v8ls follow-up): pin the nonJsonDetail walk's branches that the rows above leave
// unpinned. The walk runs before the digest recompute, so G1 and G2 need no reseal; G3 and G4 reseal so only
// the walk, not the digest backstop, decides.
const nonJsonRefusal = (name: string, member: unknown): string => {
  const record = clone();
  record[name] = member;
  const outcome = refusal(record);
  assert.equal(outcome.code, "TRAINING_IMPORT_MALFORMED");
  return outcome.detail;
};

test("b1sw G1: an undefined-valued member is refused with the exact typeof detail naming the member", () => {
  assert.equal(nonJsonRefusal("extra", undefined), "member extra holds a undefined, which JSON cannot carry");
});

test("b1sw G2: a function-valued member is refused with the exact typeof detail naming the member", () => {
  assert.equal(nonJsonRefusal("extra", () => 0), "member extra holds a function, which JSON cannot carry");
});

test("b1sw G3: a null-prototype plain member is admitted when the record is resealed", () => {
  const plain = Object.create(null) as Record<string, unknown>;
  plain["kind"] = "bare";
  const record = clone();
  record["extra"] = plain;
  const outcome = importTrainingExport(reseal(record));
  assert.equal(outcome.ok, true);
});

test("b1sw G4: the depth bound is exact: 255 nested arrays under a member import, 256 refuse naming the member path", () => {
  const nestedArrays = (levels: number): unknown => {
    let deep: unknown = 0;
    for (let index = 0; index < levels; index += 1) deep = [deep];
    return deep;
  };
  const within = clone();
  within["extra"] = nestedArrays(255);
  assert.equal(importTrainingExport(reseal(within)).ok, true);
  const beyond = clone();
  beyond["extra"] = nestedArrays(256);
  const outcome = refusal(reseal(beyond));
  assert.equal(outcome.code, "TRAINING_IMPORT_MALFORMED");
  assert.equal(outcome.detail, `member extra${"[0]".repeat(255)} nests deeper than depth 256`);
});

// MechanicalWorkflows-b357 (b1sw follow-up, test-only): pin four more refusal laws of the nonJsonDetail walk.
// A bigint and a symbol member each reach the typeof refusal (never a throw out of canonical serialisation),
// the depth bound counts PLAIN OBJECT ancestors as it counts array ones, and an undefined array element is
// fed to the recursive walk and refused with its index path.
test("b357 R1: a bigint member is refused with the exact typeof detail, never a throw", () => {
  assert.doesNotThrow(() => nonJsonRefusal("extra", 10n));
  assert.equal(nonJsonRefusal("extra", 10n), "member extra holds a bigint, which JSON cannot carry");
});

test("b357 R2: a symbol member is refused with the exact typeof detail, never a throw", () => {
  assert.doesNotThrow(() => nonJsonRefusal("extra", Symbol("hostile")));
  assert.equal(nonJsonRefusal("extra", Symbol("hostile")), "member extra holds a symbol, which JSON cannot carry");
});

test("b357 R3: the depth bound counts plain objects: 255 nested objects under a member import, 256 refuse naming the member path", () => {
  const nestedObjects = (levels: number): unknown => {
    let deep: unknown = 0;
    for (let index = 0; index < levels; index += 1) deep = { a: deep };
    return deep;
  };
  const within = clone();
  within["extra"] = nestedObjects(255);
  assert.equal(importTrainingExport(reseal(within)).ok, true);
  const beyond = clone();
  beyond["extra"] = nestedObjects(256);
  const outcome = refusal(reseal(beyond));
  assert.equal(outcome.code, "TRAINING_IMPORT_MALFORMED");
  assert.equal(outcome.detail, `member extra${".a".repeat(255)} nests deeper than depth 256`);
});

test("b357 R4: an undefined array element is refused with its index path, never a throw", () => {
  assert.doesNotThrow(() => nonJsonRefusal("extra", [undefined]));
  assert.equal(nonJsonRefusal("extra", [undefined]), "member extra[0] holds a undefined, which JSON cannot carry");
});

// MechanicalWorkflows-94ls (b357 follow-up, test-only): pin five neighbouring shapes the b357 rows feed only at
// the member itself or as a pure nest. A bigint or a symbol below the member, an undefined array element past
// index 0, and an undefined plain-object value below the record root each reach the typeof refusal with the
// full path (never a throw out of canonical serialisation), and the depth tally counts arrays and plain
// objects together, so an alternating nest is bounded exactly as a pure one.
test("94ls R1: a bigint nested below the member is refused with its full path, never a throw", () => {
  assert.doesNotThrow(() => nonJsonRefusal("extra", { list: [1, 10n] }));
  assert.equal(nonJsonRefusal("extra", { list: [1, 10n] }), "member extra.list[1] holds a bigint, which JSON cannot carry");
});

test("94ls R2: a symbol nested below the member is refused with its full path, never a throw", () => {
  assert.doesNotThrow(() => nonJsonRefusal("extra", [{ tag: Symbol("x") }]));
  assert.equal(nonJsonRefusal("extra", [{ tag: Symbol("x") }]), "member extra[0].tag holds a symbol, which JSON cannot carry");
});

test("94ls R3: an undefined array element past index 0 is refused with its index path, never a throw", () => {
  assert.doesNotThrow(() => nonJsonRefusal("extra", [0, undefined]));
  assert.equal(nonJsonRefusal("extra", [0, undefined]), "member extra[1] holds a undefined, which JSON cannot carry");
});

test("94ls R4: the depth bound counts arrays and plain objects together: 255 alternating levels import, 256 refuse naming the member path", () => {
  const alternating = (levels: number): unknown => {
    let deep: unknown = 0;
    for (let index = 0; index < levels; index += 1) deep = index % 2 === 0 ? [deep] : { a: deep };
    return deep;
  };
  const within = clone();
  within["extra"] = alternating(255);
  assert.equal(importTrainingExport(reseal(within)).ok, true);
  const beyond = clone();
  beyond["extra"] = alternating(256);
  const outcome = refusal(reseal(beyond));
  assert.equal(outcome.code, "TRAINING_IMPORT_MALFORMED");
  assert.equal(outcome.detail, `member extra${".a[0]".repeat(127)}.a nests deeper than depth 256`);
});

test("94ls R5: an undefined plain-object value below the record root is refused with its path, not the digest-recompute detail", () => {
  assert.doesNotThrow(() => nonJsonRefusal("extra", { k: undefined }));
  assert.equal(nonJsonRefusal("extra", { k: undefined }), "member extra.k holds a undefined, which JSON cannot carry");
});

// MechanicalWorkflows-jrqq (kb25 follow-up, test-only): pin four laws of creditDefect the kb25 rows leave
// unpinned. The credential scan covers the whole credits array (a row-2 secret, not only rows 0 and 1), the
// attributed-actor set reads every step (an actor only step 0 or only a middle step names is admitted), and a
// refusal over several credential-shaped rows names every path in sorted order.
const JRQQ_SECRET = "sk-" + "a1B2c3D4e5F6g7H8i9J0";

test("jrqq R1: a credential in row 2 of three credit rows is refused with its exact path, without echoing the secret", () => {
  const outcome = importTrainingExport(withCredits([CREDIT, CREDIT, { ...CREDIT, derivation: { kind: "intervention", reference: JRQQ_SECRET } }]));
  assert.equal(outcome.ok, false);
  if (outcome.ok) return;
  assert.equal(outcome.code, "TRAINING_IMPORT_MALFORMED");
  assert.equal(outcome.detail, "credits carry credential-shaped content at /2/derivation/reference");
  assert.equal(outcome.detail.includes(JRQQ_SECRET), false);
});

test("jrqq R2: an actor attributed only by step 0 is admitted, and absent attribution is refused", () => {
  const record = clone();
  const steps = record["steps"] as Record<string, unknown>[];
  assert.ok(steps.every(step => step["actorId"] !== "early-actor"));
  record["credits"] = [{ ...CREDIT, actorId: "early-actor" }];
  creditRefusal(resealCredit(record), /credit 0\b.*early-actor/, "actor absent from every step");
  steps[0]!["actorId"] = "early-actor";
  assert.ok(steps.slice(1).every(step => step["actorId"] !== "early-actor"), "only step 0 names the actor");
  const outcome = importTrainingExport(resealCredit(record));
  assert.equal(outcome.ok, true);
  if (!outcome.ok) return;
  assert.equal(outcome.record.credits![0]!.actorId, "early-actor");
});

test("jrqq R3: an actor attributed only by a middle step is admitted, and absent attribution is refused", () => {
  const record = clone();
  const steps = record["steps"] as Record<string, unknown>[];
  assert.ok(steps.length > 2, "a middle step distinct from the first and last must exist");
  assert.ok(steps.every(step => step["actorId"] !== "middle-actor"));
  record["credits"] = [{ ...CREDIT, actorId: "middle-actor" }];
  creditRefusal(resealCredit(record), /credit 0\b.*middle-actor/, "actor absent from every step");
  steps[1]!["actorId"] = "middle-actor";
  assert.ok(steps.every((step, index) => index === 1 || step["actorId"] !== "middle-actor"), "only step 1 names the actor");
  const outcome = importTrainingExport(resealCredit(record));
  assert.equal(outcome.ok, true);
  if (!outcome.ok) return;
  assert.equal(outcome.record.credits![0]!.actorId, "middle-actor");
});

test("jrqq R4: credential-shaped rows 0 and 1 are both named, in sorted order, without echoing the secret", () => {
  const outcome = importTrainingExport(withCredits([
    { ...CREDIT, apiKey: JRQQ_SECRET },
    { ...CREDIT, derivation: { kind: "intervention", reference: JRQQ_SECRET } },
  ]));
  assert.equal(outcome.ok, false);
  if (outcome.ok) return;
  assert.equal(outcome.code, "TRAINING_IMPORT_MALFORMED");
  assert.equal(outcome.detail, "credits carry credential-shaped content at /0/apiKey, /1/derivation/reference");
  assert.equal(outcome.detail.includes(JRQQ_SECRET), false);
});

// MechanicalWorkflows-6c96 (jrqq follow-up, test-only): pin three more laws of creditDefect the jrqq rows leave
// unpinned. One credit row carrying two credential-shaped paths is refused naming both, a credential row far past
// index 2 is still scanned and named, and an actor only a middle step past index 1 attributes is admitted. The
// inter-path order of the refusal detail stays unasserted (a seat question), so U11 compares the paths as a set.
test("6c96 U9: one credit row with a credential-shaped apiKey and derivation reference is refused naming both paths, without echoing the secret", () => {
  const outcome = importTrainingExport(withCredits([{ ...CREDIT, apiKey: JRQQ_SECRET, derivation: { kind: "intervention", reference: JRQQ_SECRET } }]));
  assert.equal(outcome.ok, false);
  if (outcome.ok) return;
  assert.equal(outcome.code, "TRAINING_IMPORT_MALFORMED");
  assert.equal(outcome.detail, "credits carry credential-shaped content at /0/apiKey, /0/derivation/reference");
  assert.equal(JSON.stringify(outcome).includes(JRQQ_SECRET), false);
});

test("6c96 U11: credential-shaped references in rows 2 and 10 of eleven credit rows are both named, without echoing the secret", () => {
  const rows = Array.from({ length: 11 }, (_unused, index) => (index === 2 || index === 10 ? { ...CREDIT, derivation: { kind: "intervention", reference: JRQQ_SECRET } } : { ...CREDIT }));
  const outcome = importTrainingExport(withCredits(rows));
  assert.equal(outcome.ok, false);
  if (outcome.ok) return;
  assert.equal(outcome.code, "TRAINING_IMPORT_MALFORMED");
  const prefix = "credits carry credential-shaped content at ";
  assert.equal(outcome.detail.startsWith(prefix), true);
  assert.deepEqual(outcome.detail.slice(prefix.length).split(", ").sort(), ["/10/derivation/reference", "/2/derivation/reference"]);
  assert.equal(JSON.stringify(outcome).includes(JRQQ_SECRET), false);
});

test("6c96 U10: an actor attributed only by step 5 is admitted, and absent attribution is refused", () => {
  const record = clone();
  const steps = record["steps"] as Record<string, unknown>[];
  assert.ok(steps.length > 6, "step 5 must be neither the first two steps nor the last");
  assert.ok(steps.every(step => step["actorId"] !== "step5-actor"));
  record["credits"] = [{ ...CREDIT, actorId: "step5-actor" }];
  creditRefusal(resealCredit(record), /credit 0\b.*step5-actor/, "actor absent from every step");
  steps[5]!["actorId"] = "step5-actor";
  assert.ok(steps.every((step, index) => index === 5 || step["actorId"] !== "step5-actor"), "only step 5 names the actor");
  const outcome = importTrainingExport(resealCredit(record));
  assert.equal(outcome.ok, true);
  if (!outcome.ok) return;
  assert.equal(outcome.record.credits![0]!.actorId, "step5-actor");
});

// MechanicalWorkflows-kajo (9tiw follow-up, test-only): the allowlist refusal names the offending row's own index
// (not the last row's) and, when two members sit outside the projection, the first in key order. The landed rows
// put every multi-row offender last and carry one extra member per row, so a last-row index or a last-extra member
// passed them all.
test("kajo V1: a derivation member outside the writer projection on the first of two rows names credit 0", () => {
  creditRefusal(
    withCredits([{ ...CREDIT, derivation: { kind: "intervention", reference: "arm:x", weight: 2 } }, CREDIT]),
    /^credit 0 derivation carries a member outside the writer projection: weight$/,
    "derivation member on the first of two rows",
  );
});

test("kajo V2: a row member outside the writer projection on the first of two rows names credit 0", () => {
  creditRefusal(
    withCredits([{ ...CREDIT, bonusMicro: 1 }, CREDIT]),
    /^credit 0 carries a member outside the writer projection: bonusMicro$/,
    "row member on the first of two rows",
  );
});

test("kajo V3: two derivation members outside the writer projection name the first in key order", () => {
  creditRefusal(
    withCredits(creditRow(row => { row["derivation"] = { kind: "intervention", reference: "arm:x", weight: 2, bonus: 3 }; })),
    /^credit 0 derivation carries a member outside the writer projection: weight$/,
    "two extra derivation members",
  );
});

test("kajo V4: two row members outside the writer projection name the first in key order", () => {
  creditRefusal(
    withCredits([{ ...CREDIT, bonusMicro: 1, teamOutcome: 2 }]),
    /^credit 0 carries a member outside the writer projection: bonusMicro$/,
    "two extra row members",
  );
});

test("kajo V5: two clean rows import ok, so the refusals above attach to the extra member and not to the second row", () => {
  const outcome = importTrainingExport(withCredits([CREDIT, CREDIT]));
  assert.equal(outcome.ok, true);
  if (!outcome.ok) return;
  assert.equal(outcome.record.credits!.length, 2);
});

// MechanicalWorkflows-s2nw (6c96 follow-up, test-only): the landed attribution rows witness the attributed-actor set at
// step indexes 0, 1, 5 and the last only, and the longest landed credential detail carries two paths. A walk that skips
// one middle step, or a refusal detail cut after its second path, passed every landed row.
test("s2nw R1: an actor attributed only by step i is refused until step i names it, at every step index of the export", () => {
  const stepCount = (clone()["steps"] as unknown[]).length;
  assert.ok(stepCount >= 12, "the landing-queue export carries at least twelve steps");
  for (let index = 0; index < stepCount; index += 1) {
    const actor = `only-step-${index}-actor`;
    const record = clone();
    const steps = record["steps"] as Record<string, unknown>[];
    record["credits"] = [{ ...CREDIT, actorId: actor }];
    const refused = importTrainingExport(resealCredit(record));
    assert.equal(refused.ok, false, `step ${index}: no step names the actor`);
    if (refused.ok) return;
    assert.equal(refused.code, "TRAINING_IMPORT_MALFORMED", `step ${index}`);
    assert.equal(refused.detail, `credit 0 names ${actor}, which no step of this record attributes a decision to`, `step ${index}`);
    steps[index]!["actorId"] = actor;
    assert.equal(steps.filter(step => step["actorId"] === actor).length, 1, `only step ${index} names the actor`);
    const admitted = importTrainingExport(resealCredit(record));
    assert.equal(admitted.ok, true, `step ${index}: the actor is attributed once step ${index} names it`);
    if (!admitted.ok) return;
    assert.equal(admitted.record.credits![0]!.actorId, actor, `step ${index}`);
  }
});

test("s2nw R2: credential-shaped derivation references in credit rows 0, 1 and 2 are all three named, in order, without echoing the secret", () => {
  const row = { ...CREDIT, derivation: { kind: "intervention", reference: JRQQ_SECRET } };
  const outcome = importTrainingExport(withCredits([{ ...row }, { ...row }, { ...row }]));
  assert.equal(outcome.ok, false);
  if (outcome.ok) return;
  assert.equal(outcome.code, "TRAINING_IMPORT_MALFORMED");
  assert.equal(outcome.detail, "credits carry credential-shaped content at /0/derivation/reference, /1/derivation/reference, /2/derivation/reference");
  assert.equal(JSON.stringify(outcome).includes(JRQQ_SECRET), false);
});

// MechanicalWorkflows-f61q (kajo follow-up, test-only): the landed two-extra-member row (kajo V4) lists bonusMicro before
// teamOutcome, which is also their alphabetical order, so a sorted find would pass it. This row reverses the key order so the
// refusal can name only the first extra member in KEY order (teamOutcome), never the alphabetically first (bonusMicro).
test("f61q R1: two row members outside the writer projection with the alphabetically later one first name that one, in key order", () => {
  creditRefusal(
    withCredits([{ ...CREDIT, teamOutcome: 2, bonusMicro: 1 }]),
    /^credit 0 carries a member outside the writer projection: teamOutcome$/,
    "row members in reverse alphabetical key order",
  );
});

// MechanicalWorkflows-11n9o (8775 ruling, kajo W3/W4 and f61q W6 follow-on, test-only): today's creditDefect precedence is the
// contract. Q1: the walk is index order and names the FIRST offending row. Q2: a row member reports before a derivation member
// on the same row. Q3: the extra-member scan is ungated, so it fires on a row that also lacks its derivation, actor or value.
test("11n9o R1: with two offending rows the refusal names credit 0 in index order, whichever member each row carries", () => {
  creditRefusal(
    withCredits([{ ...CREDIT, bonusMicro: 1 }, { ...CREDIT, teamOutcome: 2 }]),
    /^credit 0 carries a member outside the writer projection: bonusMicro$/,
    "first of two offending rows",
  );
  creditRefusal(
    withCredits([{ ...CREDIT, teamOutcome: 2 }, { ...CREDIT, bonusMicro: 1 }]),
    /^credit 0 carries a member outside the writer projection: teamOutcome$/,
    "mirrored array: index order, not member name",
  );
});

test("11n9o R2: a row member outside the projection is reported before a derivation member on the same row", () => {
  creditRefusal(
    withCredits([{ ...CREDIT, bonusMicro: 1, derivation: { kind: "intervention", reference: "arm:x", weight: 2 } }]),
    /^credit 0 carries a member outside the writer projection: bonusMicro$/,
    "row member reported before the derivation member",
  );
});

test("11n9o R3: an extra row member is named even when the row lacks its derivation", () => {
  creditRefusal(
    withCredits([{ actorId: "lane", valueMicro: 125000, bonusMicro: 1 }]),
    /^credit 0 carries a member outside the writer projection: bonusMicro$/,
    "extra member on a row missing its derivation",
  );
});

test("11n9o R4: an extra row member is named even when the row lacks its actor", () => {
  creditRefusal(
    withCredits([{ valueMicro: 125000, derivation: CREDIT.derivation, bonusMicro: 1 }]),
    /^credit 0 carries a member outside the writer projection: bonusMicro$/,
    "extra member on a row missing its actor",
  );
});

test("11n9o R5: an extra row member is named even when the row lacks its valueMicro", () => {
  creditRefusal(
    withCredits([{ actorId: "lane", derivation: CREDIT.derivation, bonusMicro: 1 }]),
    /^credit 0 carries a member outside the writer projection: bonusMicro$/,
    "extra member on a row missing its value",
  );
});

// MechanicalWorkflows-zunw (e5yp follow-up, test-only): the landed named-actor rows reach credit 1 for array and numeric
// actor ids and credit 0 for booleans, objects and the empty string. These rows carry the law to the rows past them: a
// resealed record is admitted at the trust boundary, so the nonblank test must hold at every credit index and for
// whitespace-only actors that a step of the same record also carries.
test("zunw R1: an array or numeric actor id at credit 2 is refused naming credit 2, and the clean three-credit record imports ok", () => {
  creditRefusal(withCredits([CREDIT, { ...CREDIT }, { ...CREDIT, actorId: ["lane"] }]), /^credit 2 needs a named actor$/, "array actor id at credit 2 whose string form names the step actor");
  creditRefusal(withCredits([CREDIT, { ...CREDIT }, { ...CREDIT, actorId: 4 }]), /^credit 2 needs a named actor$/, "numeric actor id at credit 2");
  const clean = importTrainingExport(withCredits([CREDIT, { ...CREDIT }, { ...CREDIT }]));
  assert.equal(clean.ok, true, "the clean three-credit record imports ok");
  if (!clean.ok) return;
  assert.equal(clean.record.credits!.length, 3);
});

test("zunw R2: boolean and object actor ids at credit 1 behind a valid credit 0 are refused naming credit 1", () => {
  for (const actorId of [true, false, {}]) {
    creditRefusal(withCredits([CREDIT, { ...CREDIT, actorId }]), /^credit 1 needs a named actor$/, `non-string actor id ${JSON.stringify(actorId)} at credit 1`);
  }
});

test("zunw R3: a whitespace-only credit actor is refused as unnamed, also when a step of the same record carries that whitespace actor", () => {
  for (const actorId of ["   ", "\t", "\n "]) {
    creditRefusal(withCredits(creditRow(row => { row["actorId"] = actorId; })), /^credit 0 needs a named actor$/, `whitespace actor id ${JSON.stringify(actorId)} at credit 0`);
  }
  const attributed = (actorId: string): Record<string, unknown> => {
    const record = clone();
    (record["steps"] as Record<string, unknown>[])[0]!["actorId"] = actorId;
    record["credits"] = [{ ...CREDIT, actorId }];
    return resealCredit(record);
  };
  creditRefusal(attributed("   "), /^credit 0 needs a named actor$/, "whitespace actor carried by step 0 and named by the credit");
  const control = importTrainingExport(attributed("step-attributed-lane"));
  assert.equal(control.ok, true, "the step-attributed named actor imports ok");
  if (!control.ok) return;
  assert.equal(control.record.credits![0]!.actorId, "step-attributed-lane");
});

// MechanicalWorkflows-0zce (94ls follow-up, test-only): pin the nonJsonDetail refusals by parent kind and
// position that the 94ls rows leave unpinned. A function below the member, a bigint under a plain-object
// parent, a symbol under an array parent, an undefined array element past index 1 and an undefined value two
// object levels below the member each reach the typeof refusal with the full path (never a throw out of
// canonical serialisation, and never the digest-recompute detail).
test("0zce R1: a function nested below the member is refused with its full path, never a throw", () => {
  assert.doesNotThrow(() => nonJsonRefusal("extra", { f: () => 0 }));
  assert.equal(nonJsonRefusal("extra", { f: () => 0 }), "member extra.f holds a function, which JSON cannot carry");
});

test("0zce R2: a bigint under a plain-object parent is refused with its key path, never a throw", () => {
  assert.doesNotThrow(() => nonJsonRefusal("extra", { n: 10n }));
  assert.equal(nonJsonRefusal("extra", { n: 10n }), "member extra.n holds a bigint, which JSON cannot carry");
});

test("0zce R3: a symbol under an array parent is refused with its index path, never a throw", () => {
  assert.doesNotThrow(() => nonJsonRefusal("extra", [Symbol("y")]));
  assert.equal(nonJsonRefusal("extra", [Symbol("y")]), "member extra[0] holds a symbol, which JSON cannot carry");
});

test("0zce R4: an undefined array element at index 2 is refused with its index path, never a throw", () => {
  assert.doesNotThrow(() => nonJsonRefusal("extra", [0, 1, undefined]));
  assert.equal(nonJsonRefusal("extra", [0, 1, undefined]), "member extra[2] holds a undefined, which JSON cannot carry");
});

test("0zce R5: an undefined value two object levels below the member is refused with its path, not the digest-recompute detail", () => {
  assert.doesNotThrow(() => nonJsonRefusal("extra", { a: { k: undefined } }));
  assert.equal(nonJsonRefusal("extra", { a: { k: undefined } }), "member extra.a.k holds a undefined, which JSON cannot carry");
});

// MechanicalWorkflows-u3wk (s2nw follow-up carried from zunw, test-only): pin the importer attribution law
// past credit 0. The zunw rows pin the named-actor law (L51) at credits 1 and 2, which fails before the
// attribution check is reached, and e5yp pins that same law at credit 1, so an attribution check confined to
// credit 0 passed the whole file. Credit 0 below is the clean attributed lane credit; credit 1 names an actor
// no step attributes a decision to, and the refusal must name credit 1.
test("u3wk R1: an unattributed actor at credit 1 is refused naming credit 1, not only at credit 0", () => {
  creditRefusal(
    withCredits([CREDIT, { ...CREDIT, actorId: "ghost" }]),
    /^credit 1 names ghost, which no step of this record attributes a decision to$/,
    "unattributed actor at credit 1 (s2nw lead W2)",
  );
});

// MechanicalWorkflows-ryvz (zunw follow-up, test-only): pin the importer named-actor law (L51) past the cases
// zunw R3 feeds. zunw R3 feeds whitespace-only strings at credit 0 and only ASCII blanks, so (G1) a credit
// actor made only of a non-ASCII trim blank (U+00A0 no-break space, U+2003 em space, U+FEFF byte-order mark)
// and (G2) a whitespace-only actor at credit 1 or later each passed the whole file. The step-carried form
// comes first because a step of the same record carrying the actor adds it to the attributed set: a
// mutant that narrows the nonblank test then ADMITS the record, which only the step-carried form observes.
// Lead: zunw-closes-e5yp-lead-4-of-4 G1_ACTOR_ASCII_TRIM_ONLY and G2_ACTOR_UNTRIMMED_PAST_ROW0.
test("ryvz R1: a credit actor made only of a non-ASCII trim blank is refused as unnamed, also when a step of the same record carries it", () => {
  for (const actorId of [" ", " ", "﻿"]) {
    const carried = clone();
    (carried["steps"] as Record<string, unknown>[])[0]!["actorId"] = actorId;
    carried["credits"] = [{ ...CREDIT, actorId }];
    creditRefusal(resealCredit(carried), /^credit 0 needs a named actor$/, `step-carried trim-blank actor ${JSON.stringify(actorId)} at credit 0`);
    creditRefusal(withCredits(creditRow(row => { row["actorId"] = actorId; })), /^credit 0 needs a named actor$/, `bare trim-blank actor ${JSON.stringify(actorId)} at credit 0`);
  }
  const control = clone();
  (control["steps"] as Record<string, unknown>[])[0]!["actorId"] = "step-attributed-lane";
  control["credits"] = [{ ...CREDIT, actorId: "step-attributed-lane" }];
  const outcome = importTrainingExport(resealCredit(control));
  assert.equal(outcome.ok, true, "the step-attributed named actor imports ok");
});

test("ryvz R2: a whitespace-only credit actor at credit 1 behind a valid credit 0 is refused as unnamed, also when a step carries it", () => {
  for (const actorId of ["   ", "\t"]) {
    const carried = clone();
    (carried["steps"] as Record<string, unknown>[])[1]!["actorId"] = actorId;
    carried["credits"] = [CREDIT, { ...CREDIT, actorId }];
    creditRefusal(resealCredit(carried), /^credit 1 needs a named actor$/, `step-carried whitespace actor ${JSON.stringify(actorId)} at credit 1`);
    creditRefusal(withCredits([CREDIT, { ...CREDIT, actorId }]), /^credit 1 needs a named actor$/, `bare whitespace actor ${JSON.stringify(actorId)} at credit 1`);
  }
  const control = clone();
  (control["steps"] as Record<string, unknown>[])[1]!["actorId"] = "second-lane";
  control["credits"] = [CREDIT, { ...CREDIT, actorId: "second-lane" }];
  const outcome = importTrainingExport(resealCredit(control));
  assert.equal(outcome.ok, true, "a second step-attributed named actor at credit 1 imports ok");
  if (!outcome.ok) return;
  assert.equal(outcome.record.credits!.length, 2);
});

// MechanicalWorkflows-z31w (0zce follow-up, test-only): pin the nonJsonDetail refusals at six kind and
// position cells the 0zce rows leave unpinned. Each hostile leaf sits where no landed row puts it: a function
// or a bigint directly in a member array, a symbol directly under a member object, an undefined array element
// at index 3, an undefined object value three levels down, and an undefined element inside a nested array.
// Each cell must come back as the typed refusal with its exact path, never a throw out of canonical
// serialisation (doesNotThrow runs first because the throw is the observable failure under a dropped walk).
test("z31w R1: a hostile leaf at an unpinned kind and position is refused with its exact path, never a throw", () => {
  const cells: readonly (readonly [string, unknown, string])[] = [
    ["function directly in a member array", [() => 0], "member extra[0] holds a function, which JSON cannot carry"],
    ["bigint directly in a member array", [10n], "member extra[0] holds a bigint, which JSON cannot carry"],
    ["symbol directly under a member object", { s: Symbol("z") }, "member extra.s holds a symbol, which JSON cannot carry"],
    ["undefined at array index 3", [0, 1, 2, undefined], "member extra[3] holds a undefined, which JSON cannot carry"],
    ["undefined three object levels down", { a: { b: { k: undefined } } }, "member extra.a.b.k holds a undefined, which JSON cannot carry"],
    ["undefined inside a nested array", { list: [undefined] }, "member extra.list[0] holds a undefined, which JSON cannot carry"],
  ];
  for (const [label, member, detail] of cells) {
    assert.doesNotThrow(() => nonJsonRefusal("extra", member), label);
    assert.equal(nonJsonRefusal("extra", member), detail, label);
  }
});

// MechanicalWorkflows-5p37 (u3wk follow-up, test-only): pin the importer attribution law before the last
// credit and past credit 1. Every landed unattributed-actor refusal is the last (or only) credit of its
// record: the s2nw walk refuses at credit 0 as the only credit, and u3wk R1 refuses at credit 1 behind a clean
// credit 0. A check confined to the last credit, or to the first two credits, therefore passed the whole
// file. R1 puts the unattributed actor at credit 0 with a clean attributed credit 1 after it; R2 puts it at
// credit 2 behind two clean credits. Each spread of CREDIT passes every earlier check (object, projection
// members, derivation kind and reference, named actor, safe-integer valueMicro), so the refusal that comes
// back is the attribution check itself.
// Lead: u3wk-closes-s2nw-lead-1-of-1 G2_ATTRIBUTION_LAST_CREDIT_ONLY and G1_ATTRIBUTION_FIRST_TWO_CREDITS.
test("5p37 R1: an unattributed actor at credit 0 before a clean credit 1 is refused naming credit 0", () => {
  creditRefusal(
    withCredits([{ ...CREDIT, actorId: "ghost" }, CREDIT]),
    /^credit 0 names ghost, which no step of this record attributes a decision to$/,
    "unattributed actor at credit 0 before a clean credit (u3wk lead G2)",
  );
});

test("5p37 R2: an unattributed actor at credit 2 behind two clean credits is refused naming credit 2", () => {
  creditRefusal(
    withCredits([CREDIT, { ...CREDIT }, { ...CREDIT, actorId: "ghost" }]),
    /^credit 2 names ghost, which no step of this record attributes a decision to$/,
    "unattributed actor at credit 2 (u3wk lead G1)",
  );
});

// MechanicalWorkflows-6yda (ryvz follow-up, test-only): pin the importer named-actor law (L51) past the cases
// ryvz R1 and R2 feed. ryvz R1 feeds the non-ASCII trim blanks at credit 0 only and ryvz R2 feeds the ASCII
// blanks at credit 1 only, so (G3) a check that trims the non-ASCII blanks at credit 0 alone, (G5) a check that
// trims only the three code points ryvz R1 names, and (G4) a check confined to the first two credits each
// passed the whole file. The step-carried form comes first because a step of the same record carrying the
// actor adds it to the attributed set: a mutant that narrows the nonblank test then ADMITS the record, which
// only the step-carried form observes. Code points are written as escapes so the lint and docs steps read them.
// Lead: ryvz-closes-zunw-lead-2-of-2 G3_ACTOR_ASCII_TRIM_PAST_ROW0, G5_ACTOR_TRIM_PINNED_BLANKS_ONLY and G4_ACTOR_TRIM_FIRST_TWO_CREDITS.
test("6yda R1: a credit actor made only of a non-ASCII trim blank at credit 1 behind a valid credit 0 is refused as unnamed, also when a step carries it", () => {
  for (const actorId of [" ", " ", "﻿"]) {
    const carried = clone();
    (carried["steps"] as Record<string, unknown>[])[1]!["actorId"] = actorId;
    carried["credits"] = [CREDIT, { ...CREDIT, actorId }];
    creditRefusal(resealCredit(carried), /^credit 1 needs a named actor$/, `step-carried trim-blank actor U+${actorId.charCodeAt(0).toString(16)} at credit 1`);
    creditRefusal(withCredits([CREDIT, { ...CREDIT, actorId }]), /^credit 1 needs a named actor$/, `bare trim-blank actor U+${actorId.charCodeAt(0).toString(16)} at credit 1`);
  }
});

test("6yda R2: a credit actor made only of any further trim blank at credit 0 is refused as unnamed, also when a step carries it", () => {
  for (const actorId of ["\u000b", "\u000c", " ", " ", " ", "　"]) {
    const carried = clone();
    (carried["steps"] as Record<string, unknown>[])[0]!["actorId"] = actorId;
    carried["credits"] = [{ ...CREDIT, actorId }];
    creditRefusal(resealCredit(carried), /^credit 0 needs a named actor$/, `step-carried trim-blank actor U+${actorId.charCodeAt(0).toString(16)} at credit 0`);
    creditRefusal(withCredits(creditRow(row => { row["actorId"] = actorId; })), /^credit 0 needs a named actor$/, `bare trim-blank actor U+${actorId.charCodeAt(0).toString(16)} at credit 0`);
  }
});

test("6yda R3: a whitespace-only credit actor at credit 2 behind two step-attributed credits is refused as unnamed, also when a step carries it", () => {
  for (const actorId of ["   ", "\t"]) {
    const carried = clone();
    (carried["steps"] as Record<string, unknown>[])[1]!["actorId"] = "second-lane";
    (carried["steps"] as Record<string, unknown>[])[2]!["actorId"] = actorId;
    carried["credits"] = [CREDIT, { ...CREDIT, actorId: "second-lane" }, { ...CREDIT, actorId }];
    creditRefusal(resealCredit(carried), /^credit 2 needs a named actor$/, `step-carried whitespace actor ${JSON.stringify(actorId)} at credit 2`);
    const bare = clone();
    (bare["steps"] as Record<string, unknown>[])[1]!["actorId"] = "second-lane";
    bare["credits"] = [CREDIT, { ...CREDIT, actorId: "second-lane" }, { ...CREDIT, actorId }];
    creditRefusal(resealCredit(bare), /^credit 2 needs a named actor$/, `bare whitespace actor ${JSON.stringify(actorId)} at credit 2`);
  }
});

// MechanicalWorkflows-nrh0 (z31w follow-up, test-only): pin nonJsonDetail below the member level. Every landed
// non-plain-object row feeds the Date at the member itself (b1sw, the verifier cell at L480), and every cycle
// fixture closes on its direct parent, so a prototype check confined to the member level (a Date nested one
// level further down passes the walk and canonical serialisation throws out of importTrainingExport) and a
// cycle check confined to the direct parent (a cycle closing two levels up walks to the depth bound and names
// the depth, not the cycle) each passed the whole file. R1 nests a Date under a member object, the cycle cell
// closes two levels up, and the Date-as-member cell pins the wording at the member itself. doesNotThrow runs
// first because the throw is the observable failure under a dropped check.
// Lead: z31w-closes-0zce-lead-6-of-6 M1_PROTOTYPE_CHECK_MEMBER_LEVEL_ONLY, M2_CYCLE_CHECK_DIRECT_PARENT_ONLY and M3_PROTOTYPE_DETAIL_WORDING.
test("nrh0 R1: a Date nested under a member object and a cycle closing two levels up are refused with the exact detail, never a throw or the depth bound", () => {
  const outer: Record<string, unknown> = {};
  outer["inner"] = { up: outer };
  const cells: readonly (readonly [string, unknown, string])[] = [
    ["Date nested under a member object", { when: new Date(0) }, "member extra.when is not a plain object or array"],
    ["cycle closing two levels up", outer, "member extra.inner.up closes a cycle"],
    ["Date as the member", new Date(0), "member extra is not a plain object or array"],
  ];
  for (const [label, member, detail] of cells) {
    assert.doesNotThrow(() => nonJsonRefusal("extra", member), label);
    assert.equal(nonJsonRefusal("extra", member), detail, label);
  }
});

// MechanicalWorkflows-ki38 (5p37 follow-up, test-only): pin the importer attribution law at a MIDDLE credit
// and at credit 3. 5p37 R1 and R2 put the unattributed actor at credit 0 and at credit 2, and the earlier
// rows put it at credit 1 of two and at credit 0 alone, so every landed unattributed-actor refusal sat at
// the first or the last credit of its record. A check confined to the first and last credit, or to the
// first three credits, therefore passed the whole file. R1 puts the unattributed actor at credit 1 of
// three, with a clean credit on each side; R2 puts it at credit 3 behind three clean credits (a fixture-size
// bound by construction: it kills one finite index bound and no more). Each spread of CREDIT passes every
// earlier check (object, projection members, derivation kind and reference, named actor, safe-integer
// valueMicro), so the refusal that comes back is the attribution check itself.
// Lead: 5p37-closes-u3wk-lead-2-of-2 M1_ATTRIBUTION_FIRST_AND_LAST_CREDIT_ONLY and M2_ATTRIBUTION_FIRST_THREE_CREDITS.
test("ki38 R1: an unattributed actor at a middle credit 1 of three is refused naming credit 1", () => {
  creditRefusal(
    withCredits([CREDIT, { ...CREDIT, actorId: "ghost" }, CREDIT]),
    /^credit 1 names ghost, which no step of this record attributes a decision to$/,
    "unattributed actor at a middle credit (5p37 lead M1)",
  );
});

test("ki38 R2: an unattributed actor at credit 3 behind three clean credits is refused naming credit 3", () => {
  creditRefusal(
    withCredits([CREDIT, CREDIT, CREDIT, { ...CREDIT, actorId: "ghost" }]),
    /^credit 3 names ghost, which no step of this record attributes a decision to$/,
    "unattributed actor at credit 3 behind three clean credits (5p37 lead M2)",
  );
});

// MechanicalWorkflows-lc8r (ki38 follow-up, test-only): pin the importer named-actor law (src L51) past the
// credit indexes and blanks 6yda feeds. 6yda R1 feeds the three non-ASCII trim blanks at credit 1 only, 6yda R2
// feeds six more blanks at credit 0 only and 6yda R3 feeds ASCII whitespace at credit 2 only, so (M1) a check
// that trims only ASCII from credit 2 onward, (M2) a check that trims only the first three credits and (M3) a
// check that trims only the thirteen blanks the landed rows name each passed the whole file. Each row puts a
// step-attributed named actor beside the blank so the refusal that comes back is the named-actor check itself,
// and each runs bare and again with a step of the same record carrying the blank: that form adds the blank to
// the attributed set, so a mutant that narrows the nonblank test then ADMITS the record. Code points are
// written as escapes so the lint and docs steps read them (6yda precedent).
// Lead: ki38-leaves-6yda-own M1_ASCII_ONLY_AT_INDEX_GE2, M2_TRIM_FIRST_THREE_CREDITS and M3_TRIM_PINNED_NINE_ONLY.
const namedActorRefusal = (credits: unknown[], carriers: Record<number, string>, pattern: RegExp, label: string): void => {
  const carried = clone();
  const steps = carried["steps"] as Record<string, unknown>[];
  for (const [index, actorId] of Object.entries(carriers)) steps[Number(index)]!["actorId"] = actorId;
  carried["credits"] = credits;
  creditRefusal(resealCredit(carried), pattern, label);
};
const hex = (actorId: string): string => `U+${actorId.charCodeAt(0).toString(16)}`;

test("lc8r R1: a non-ASCII trim blank actor at credit 2 behind two step-attributed credits is refused naming credit 2, bare and step-carried", () => {
  const second = { ...CREDIT, actorId: "second-lane" };
  for (const actorId of [" ", " ", "﻿"]) {
    assert.equal(actorId.trim(), "", `String.prototype.trim removes ${hex(actorId)}`);
    namedActorRefusal([CREDIT, second, { ...CREDIT, actorId }], { 1: "second-lane" }, /^credit 2 needs a named actor$/, `bare trim-blank actor ${hex(actorId)} at credit 2`);
    namedActorRefusal([CREDIT, second, { ...CREDIT, actorId }], { 1: "second-lane", 2: actorId }, /^credit 2 needs a named actor$/, `step-carried trim-blank actor ${hex(actorId)} at credit 2`);
  }
  const control = clone();
  const steps = control["steps"] as Record<string, unknown>[];
  steps[1]!["actorId"] = "second-lane";
  steps[2]!["actorId"] = "third-lane";
  control["credits"] = [CREDIT, second, { ...CREDIT, actorId: "third-lane" }];
  assert.equal(importTrainingExport(resealCredit(control)).ok, true, "a step-attributed named third actor imports");
});

test("lc8r R2: an ASCII whitespace actor at credit 3 behind three step-attributed credits is refused naming credit 3, bare and step-carried", () => {
  const credits = (fourth: string): unknown[] => [CREDIT, { ...CREDIT, actorId: "second-lane" }, { ...CREDIT, actorId: "third-lane" }, { ...CREDIT, actorId: fourth }];
  const named: Record<number, string> = { 1: "second-lane", 2: "third-lane" };
  for (const actorId of ["   ", "\t"]) {
    namedActorRefusal(credits(actorId), named, /^credit 3 needs a named actor$/, `bare whitespace actor ${JSON.stringify(actorId)} at credit 3`);
    namedActorRefusal(credits(actorId), { ...named, 3: actorId }, /^credit 3 needs a named actor$/, `step-carried whitespace actor ${JSON.stringify(actorId)} at credit 3`);
  }
  const control = clone();
  const steps = control["steps"] as Record<string, unknown>[];
  steps[1]!["actorId"] = "second-lane";
  steps[2]!["actorId"] = "third-lane";
  steps[3]!["actorId"] = "fourth-lane";
  control["credits"] = credits("fourth-lane");
  assert.equal(importTrainingExport(resealCredit(control)).ok, true, "a step-attributed named fourth actor imports");
});

test("lc8r R3: an actor made only of any of the twelve trim blanks no earlier row names is refused naming credit 0, bare and step-carried", () => {
  const blanks = [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "];
  assert.equal(blanks.length, 12);
  for (const actorId of blanks) {
    assert.equal(actorId.trim(), "", `String.prototype.trim removes ${hex(actorId)}`);
    namedActorRefusal([{ ...CREDIT, actorId }], {}, /^credit 0 needs a named actor$/, `bare trim-blank actor ${hex(actorId)} at credit 0`);
    namedActorRefusal([{ ...CREDIT, actorId }], { 0: actorId }, /^credit 0 needs a named actor$/, `step-carried trim-blank actor ${hex(actorId)} at credit 0`);
  }
});

// MechanicalWorkflows-rf2ie (596g remedy A, run111 X7 inverted): JSON.parse makes "__proto__" an ordinary own data
// member, and canonical() used to copy members with `out[key] = ...`, which ran the Object.prototype setter and
// dropped it. The member now survives into canonicalJson and the digest (the same bytes mw_canonical.py emits, which
// keeps every key), so the importer's digest comparison refuses a forged record, and the scrub keeps the member too.
test("rf2ie X7: an own __proto__ member is kept by canonicalJson and changes the digest at the top level and nested", () => {
  const forged = JSON.parse(`{"a":1,"__proto__":{"b":2}}`) as unknown;
  assert.equal(Object.prototype.hasOwnProperty.call(forged, "__proto__"), true, "fixture carries an own __proto__ member");
  assert.equal(canonicalJson(forged), `{"__proto__":{"b":2},"a":1}`, "the member is emitted in sorted position");
  assert.notEqual(digest(forged), digest({ a: 1 }), "the forged record and the clean record no longer share a digest");
  const nested = JSON.parse(`{"outer":{"inner":[{"__proto__":{"deep":true},"k":1}]}}`) as unknown;
  assert.equal(canonicalJson(nested), `{"outer":{"inner":[{"__proto__":{"deep":true},"k":1}]}}`, "an array element's own __proto__ member survives");
  assert.notEqual(digest(nested), digest(JSON.parse(`{"outer":{"inner":[{"k":1}]}}`)));
});

test("rf2ie X7: canonicalJson stays idempotent and key-order independent with an own __proto__ member", () => {
  const left = JSON.parse(`{"__proto__":{"x":1},"z":2,"a":3}`) as unknown;
  const right = JSON.parse(`{"a":3,"z":2,"__proto__":{"x":1}}`) as unknown;
  assert.equal(canonicalJson(left), canonicalJson(right));
  assert.equal(digest(left), digest(right));
  assert.equal(canonicalJson(JSON.parse(canonicalJson(left))), canonicalJson(left), "re-parsing the canonical bytes reaches the same bytes");
  assert.equal(Object.getPrototypeOf(Object.prototype), null);
  assert.equal(({} as Record<string, unknown>)["x"], undefined, "no global prototype pollution from the member");
});

test("rf2ie X7: importTrainingExport refuses a record whose top level carries an own __proto__ member under the clean digest", () => {
  const clean = clone();
  assert.equal(importTrainingExport(clean).ok, true, "the clean record imports");
  const text = JSON.stringify(clean).replace(/^\{/, `{"__proto__":{"forged":true},`);
  const forged = JSON.parse(text) as Record<string, unknown>;
  assert.equal(Object.prototype.hasOwnProperty.call(forged, "__proto__"), true, "fixture carries an own top-level __proto__ member");
  assert.equal(forged["digest"], clean["digest"], "the forged record claims the clean digest");
  const outcome = refusal(forged);
  assert.equal(outcome.code, "TRAINING_IMPORT_MALFORMED");
  assert.match(outcome.detail, /^digest does not recompute: claimed sha256:[0-9a-f]{64}, members hash to sha256:[0-9a-f]{64}$/);
});

test("rf2ie X7: sanitizeValue keeps an own __proto__ member, scrubs a credential inside it, and leaves the input alone", () => {
  const planted = JSON.parse(`{"note":"ok","__proto__":{"keep":1,"token":"x","line":"Bearer abcdefghijklmnop"}}`) as unknown;
  const cleaned = sanitizeValue(planted);
  assert.equal(Object.prototype.hasOwnProperty.call(cleaned.value, "__proto__"), true, "the scrubbed copy keeps the own __proto__ member");
  assert.equal(canonicalJson(cleaned.value), `{"__proto__":{"keep":1,"line":"[redacted]"},"note":"ok"}`);
  assert.deepEqual(cleaned.removed, ["/__proto__/line", "/__proto__/token"]);
  assert.equal(Object.prototype.hasOwnProperty.call(planted, "__proto__"), true, "the input keeps its member");
  assert.equal(canonicalJson(planted).includes("Bearer abcdefghijklmnop"), true, "the input is never altered");
});
