import { strict as assert } from "node:assert";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { admitAgainstCurrentRevisions, bindDecisionWitnesses, digest } from "../dist/index.js";
import type { DecisionWitnesses, SourceRevisionWitness } from "../dist/index.js";

const observation = { lanes: [{ id: "lane:7", occupancy: "free" }], queue: 3 };
const witnesses = (overrides: Partial<DecisionWitnesses> = {}): DecisionWitnesses => ({
  decisionId: "d:1",
  readSet: ["rf:journal", "forge:commands", "beads:ready"],
  observation: { digest: digest(observation), content: observation },
  sources: [
    { source: "rf:journal", revision: "rf@2026-10-20T19:00Z" },
    { source: "forge:commands", revision: "cmd_105fbb427cc5" },
    { source: "beads:ready", revision: "dolt@9f1" },
  ],
  ...overrides,
});
const current: SourceRevisionWitness[] = [
  { source: "rf:journal", revision: "rf@2026-10-20T19:00Z" },
  { source: "forge:commands", revision: "cmd_105fbb427cc5" },
  { source: "beads:ready", revision: "dolt@9f1" },
];
const codes = (out: { refusals: readonly { code: string }[] }): string[] => out.refusals.map(r => r.code).sort();
const pairs = (out: { refusals: readonly { code: string; subject: string }[] }): string[][] => out.refusals.map(r => [r.code, r.subject]).sort((a, b) => (a.join("|") < b.join("|") ? -1 : 1));

test("a decision binds its observation digest and one source-revision witness per read source; the binding is sorted and recomputes nothing it was not given", () => {
  const out = bindDecisionWitnesses(witnesses());
  assert.equal(out.schema, "mw.decision-witness-binding.v0");
  assert.deepEqual(out.refusals, []);
  assert.equal(out.ok, true);
  assert.equal(out.decisionId, "d:1");
  assert.equal(out.observationDigest, digest(observation));
  assert.deepEqual(out.bound.map(w => w.source), ["beads:ready", "forge:commands", "rf:journal"]);
});

test("the observation witness is content-addressed: a digest that does not match the observed content is refused", () => {
  const claimed = digest({ ...observation, queue: 4 });
  const out = bindDecisionWitnesses(witnesses({ observation: { digest: claimed, content: observation } }));
  assert.equal(out.ok, false);
  assert.equal(out.observationDigest, claimed, "the binding reports the claimed digest, never the recomputed one");
  assert.notEqual(out.observationDigest, digest(observation));
  assert.deepEqual(codes(out), ["WITNESS_OBSERVATION_DIGEST_MISMATCH"]);
  assert.equal(out.refusals[0]!.subject, "d:1");
});

test("the source witnesses cover exactly the read set: a read source without a witness, a witness for an unread source, a blank revision or two revisions for one source refuse", () => {
  assert.deepEqual(pairs(bindDecisionWitnesses(witnesses({ sources: witnesses().sources.slice(0, 2) }))), [["WITNESS_SOURCE_MISSING", "beads:ready"]]);
  const unread = bindDecisionWitnesses(witnesses({ sources: [...witnesses().sources, { source: "slack:channel", revision: "ts:1" }] }));
  assert.deepEqual(pairs(unread), [["WITNESS_SOURCE_UNREAD", "slack:channel"]]);
  assert.ok(!unread.bound.some(w => w.source === "slack:channel"), "an unread source never enters the bound witnesses");
  assert.deepEqual(pairs(bindDecisionWitnesses(witnesses({ sources: [witnesses().sources[0]!, witnesses().sources[1]!, { source: "beads:ready", revision: " " }] }))), [["WITNESS_REVISION_BLANK", "beads:ready"]]);
  const conflict = bindDecisionWitnesses(witnesses({ sources: [...witnesses().sources, { source: "rf:journal", revision: "rf@later" }] }));
  assert.deepEqual(pairs(conflict), [["WITNESS_SOURCE_CONFLICT", "rf:journal"]]);
  assert.equal(conflict.bound.find(w => w.source === "rf:journal")!.revision, "rf@2026-10-20T19:00Z", "the first revision is kept; a later conflicting one never replaces it");
  assert.equal(bindDecisionWitnesses(witnesses({ sources: [...witnesses().sources, { source: "rf:journal", revision: "rf@2026-10-20T19:00Z" }] })).ok, true, "a repeated identical witness is not a conflict");
});

test("admission against the current source revisions admits a decision whose every witnessed revision is current", () => {
  const out = admitAgainstCurrentRevisions(bindDecisionWitnesses(witnesses()), current);
  assert.equal(out.schema, "mw.decision-witness-admission.v0");
  assert.equal(out.decisionId, "d:1");
  assert.deepEqual(out.refusals, []);
  assert.equal(out.admitted, true);
  assert.deepEqual(out.stale, []);
});

test("acceptance: a stale witness is a refusal — every source that moved since the decision read it is named with the witnessed and current revisions, and the decision is not admitted", () => {
  const moved: SourceRevisionWitness[] = [
    { source: "rf:journal", revision: "rf@2026-10-20T19:05Z" },
    { source: "forge:commands", revision: "cmd_105fbb427cc5" },
    { source: "beads:ready", revision: "dolt@9f4" },
  ];
  const out = admitAgainstCurrentRevisions(bindDecisionWitnesses(witnesses()), moved);
  assert.equal(out.admitted, false);
  assert.deepEqual(codes(out), ["WITNESS_STALE", "WITNESS_STALE"]);
  assert.deepEqual(pairs(out), [["WITNESS_STALE", "beads:ready"], ["WITNESS_STALE", "rf:journal"]]);
  assert.deepEqual(out.stale, [
    { source: "beads:ready", witnessed: "dolt@9f1", current: "dolt@9f4" },
    { source: "rf:journal", witnessed: "rf@2026-10-20T19:00Z", current: "rf@2026-10-20T19:05Z" },
  ]);
  assert.ok(out.refusals.every(r => r.detail.includes(r.subject)));
});

test("a source whose current revision is not known is not fresh: the decision is refused as unknown, never admitted by default", () => {
  const out = admitAgainstCurrentRevisions(bindDecisionWitnesses(witnesses()), current.slice(0, 2));
  assert.equal(out.admitted, false);
  assert.deepEqual(codes(out), ["WITNESS_CURRENT_UNKNOWN"]);
  assert.equal(out.refusals[0]!.subject, "beads:ready");
  assert.deepEqual(out.stale, []);
});

test("an invalid binding is never admitted, whatever the current revisions say, and the records are pure", () => {
  const broken = bindDecisionWitnesses(witnesses({ sources: witnesses().sources.slice(0, 2) }));
  const out = admitAgainstCurrentRevisions(broken, current);
  assert.equal(out.admitted, false);
  assert.deepEqual(codes(out), ["WITNESS_BINDING_INVALID", "WITNESS_SOURCE_MISSING"]);
  assert.deepEqual(pairs(out), [["WITNESS_BINDING_INVALID", "d:1"], ["WITNESS_SOURCE_MISSING", "beads:ready"]]);
  const input = witnesses();
  const binding = bindDecisionWitnesses(input);
  const admission = admitAgainstCurrentRevisions(binding, current);
  const known = new Set<string>([...stringLeaves(input), ...stringLeaves(current), binding.schema, admission.schema]);
  for (const leaf of [...stringLeaves(binding), ...stringLeaves(admission)]) assert.ok(known.has(leaf), `minted leaf: ${leaf}`);
});

test("o25m R1: two different current revisions for one source refuse as WITNESS_CURRENT_CONFLICT in either list order; identical duplicates collapse", () => {
  const binding = bindDecisionWitnesses(witnesses());
  const dupA: SourceRevisionWitness[] = [...current, { source: "beads:ready", revision: "dolt@9f4" }];
  const dupB: SourceRevisionWitness[] = [{ source: "beads:ready", revision: "dolt@9f4" }, ...current];
  const a = admitAgainstCurrentRevisions(binding, dupA);
  const b = admitAgainstCurrentRevisions(binding, dupB);
  assert.deepEqual(a, b, "the same binding and the same current set give the same answer in any list order");
  assert.equal(a.admitted, false);
  assert.deepEqual(pairs(a), [["WITNESS_CURRENT_CONFLICT", "beads:ready"]]);
  assert.deepEqual(a.stale, [], "a conflicted source is refused before any freshness comparison");
  assert.ok(a.refusals[0]!.detail.includes("dolt@9f1") && a.refusals[0]!.detail.includes("dolt@9f4"), "the detail names both revisions");
  const same = admitAgainstCurrentRevisions(binding, [...current, { source: "beads:ready", revision: "dolt@9f1" }]);
  assert.equal(same.admitted, true, "the same revision twice collapses silently");
  assert.deepEqual(same.refusals, []);
});

test("o25m R2: a blank or whitespace-only current revision refuses as WITNESS_CURRENT_UNKNOWN with an empty stale list", () => {
  const binding = bindDecisionWitnesses(witnesses());
  for (const blank of ["", "   "]) {
    const out = admitAgainstCurrentRevisions(binding, [current[0]!, current[1]!, { source: "beads:ready", revision: blank }]);
    assert.equal(out.admitted, false);
    assert.deepEqual(pairs(out), [["WITNESS_CURRENT_UNKNOWN", "beads:ready"]]);
    assert.deepEqual(out.stale, []);
  }
});

test("o25m R3: a repeated read-set entry yields exactly one WITNESS_SOURCE_MISSING for that source", () => {
  const out = bindDecisionWitnesses(witnesses({ readSet: ["rf:journal", "forge:commands", "beads:ready", "beads:ready"], sources: witnesses().sources.slice(0, 2) }));
  assert.equal(out.ok, false);
  assert.deepEqual(pairs(out), [["WITNESS_SOURCE_MISSING", "beads:ready"]]);
});

test("o25m R4: a non-string revision and non-finite observation content refuse and never throw", () => {
  const numeric = bindDecisionWitnesses(witnesses({ sources: [witnesses().sources[0]!, witnesses().sources[1]!, { source: "beads:ready", revision: 9 as unknown as string }] }));
  assert.equal(numeric.ok, false);
  assert.deepEqual(pairs(numeric), [["WITNESS_BINDING_INVALID", "beads:ready"]]);
  assert.ok(numeric.refusals[0]!.detail.includes("number"), "the detail names the typeof");
  assert.ok(!numeric.bound.some(w => w.source === "beads:ready"));
  const content = { queue: Number.NaN };
  const nonfinite = bindDecisionWitnesses(witnesses({ observation: { digest: digest(observation), content } }));
  assert.equal(nonfinite.ok, false);
  assert.deepEqual(pairs(nonfinite), [["WITNESS_OBSERVATION_DIGEST_MISMATCH", "d:1"]]);
  assert.ok(nonfinite.refusals[0]!.detail.includes("CANONICAL_JSON_UNSUPPORTED_VALUE"), "the canonical-json error rides in the detail");
  assert.equal(nonfinite.observationDigest, digest(observation));
});

test("o25m G03 (law, ruled 2026-10-30): a witness for an UNREAD source carrying a non-string revision refuses WITNESS_SOURCE_UNREAD alone, because unread is decided before the typeof check", () => {
  // The decision never read slack:channel, so the binding never engages that entry; its revision shape is a secondary defect (unread-before-typeof).
  const unreadNumeric = bindDecisionWitnesses(witnesses({ sources: [...witnesses().sources, { source: "slack:channel", revision: 7 as unknown as string }] }));
  assert.equal(unreadNumeric.ok, false);
  assert.deepEqual(pairs(unreadNumeric), [["WITNESS_SOURCE_UNREAD", "slack:channel"]]);
  assert.ok(!codes(unreadNumeric).includes("WITNESS_BINDING_INVALID"), "no invalid-binding refusal for the unread source");
  assert.ok(!unreadNumeric.bound.some(w => w.source === "slack:channel"), "an unread source never enters the bound witnesses");
});

test("o25m R1 and R2 edges: a conflict on an unbound source still refuses, a blank beside a stated revision is unknown, and a non-string current revision is unknown", () => {
  const binding = bindDecisionWitnesses(witnesses());
  const stray = admitAgainstCurrentRevisions(binding, [...current, { source: "slack:channel", revision: "ts:1" }, { source: "slack:channel", revision: "ts:2" }]);
  assert.equal(stray.admitted, false);
  assert.deepEqual(pairs(stray), [["WITNESS_CURRENT_CONFLICT", "slack:channel"]]);
  assert.equal(stray.refusals[0]!.detail, "slack:channel is currently reported at both ts:1 and ts:2; a current revision is one value, never the last one listed");
  const twoConflicts: SourceRevisionWitness[] = [{ source: "slack:channel", revision: "ts:1" }, { source: "slack:channel", revision: "ts:2" }, { source: "beads:ready", revision: "dolt@9f4" }, { source: "beads:ready", revision: "dolt@9f1" }];
  const forward = admitAgainstCurrentRevisions(binding, [current[0]!, current[1]!, ...twoConflicts]);
  assert.deepEqual(forward, admitAgainstCurrentRevisions(binding, [...twoConflicts.slice().reverse(), current[1]!, current[0]!]), "several conflicts come out in the same order from any list order");
  assert.deepEqual(forward.refusals.map(r => r.subject), ["beads:ready", "slack:channel"]);
  const mixed = admitAgainstCurrentRevisions(binding, [...current, { source: "beads:ready", revision: " " }]);
  assert.deepEqual(pairs(mixed), [["WITNESS_CURRENT_UNKNOWN", "beads:ready"]]);
  const numeric = admitAgainstCurrentRevisions(binding, [current[0]!, current[1]!, { source: "beads:ready", revision: 4 as unknown as string }]);
  assert.deepEqual(pairs(numeric), [["WITNESS_CURRENT_UNKNOWN", "beads:ready"]]);
  const triple = admitAgainstCurrentRevisions(binding, [{ source: "rf:journal", revision: "c" }, { source: "rf:journal", revision: "a" }, { source: "rf:journal", revision: "b" }, current[1]!, current[2]!]);
  assert.match(triple.refusals[0]!.detail, /both a and b and c;/);
});

test("afpf: a non-string current revision BESIDE a stated one for the same source is unknown, never admitted and never a conflict", () => {
  const binding = bindDecisionWitnesses(witnesses());
  const beside = admitAgainstCurrentRevisions(binding, [...current, { source: "beads:ready", revision: 4 as unknown as string }]);
  assert.equal(beside.admitted, false, "the stated dolt@9f1 matches the witness, yet the non-string entry leaves the source unknown");
  assert.deepEqual(pairs(beside), [["WITNESS_CURRENT_UNKNOWN", "beads:ready"]]);
  assert.deepEqual(beside.stale, []);
  const reversed = admitAgainstCurrentRevisions(binding, [{ source: "beads:ready", revision: 4 as unknown as string }, ...current]);
  assert.deepEqual(pairs(reversed), [["WITNESS_CURRENT_UNKNOWN", "beads:ready"]], "the verdict holds from either list order");
  assert.deepEqual(reversed.stale, []);
});

test("izi5 V01: a null or absent current revision for a source counts as an unusable report, so the witness is unknown from either list order", () => {
  const binding = bindDecisionWitnesses(witnesses());
  const nullEntry = { source: "beads:ready", revision: null as unknown as string };
  const absentEntry = { source: "beads:ready" } as unknown as SourceRevisionWitness;
  for (const entry of [nullEntry, absentEntry]) {
    for (const list of [[...current, entry], [entry, ...current]]) {
      const out = admitAgainstCurrentRevisions(binding, list);
      assert.equal(out.admitted, false, "the stated dolt@9f1 matches the witness, yet the unusable entry leaves the source unknown");
      assert.deepEqual(pairs(out), [["WITNESS_CURRENT_UNKNOWN", "beads:ready"]]);
      assert.deepEqual(out.stale, []);
    }
  }
});

test("izi5 V02: an unusable current revision beside a MOVED stated revision is unknown with an empty stale list, never stale, from either list order", () => {
  const binding = bindDecisionWitnesses(witnesses());
  const moved: SourceRevisionWitness = { source: "beads:ready", revision: "dolt@9f4" };
  for (const unusable of [4 as unknown as string, " "]) {
    const entry: SourceRevisionWitness = { source: "beads:ready", revision: unusable };
    for (const list of [[current[0]!, current[1]!, moved, entry], [entry, moved, current[1]!, current[0]!]]) {
      const out = admitAgainstCurrentRevisions(binding, list);
      assert.equal(out.admitted, false);
      assert.deepEqual(pairs(out), [["WITNESS_CURRENT_UNKNOWN", "beads:ready"]]);
      assert.deepEqual(out.stale, [], "unknown-ness is judged before freshness: no stale record rides along");
    }
  }
});

test("du92 W1: a conflict between two usable current revisions is judged before an unusable entry, from either list order, with an empty stale list", () => {
  const binding = bindDecisionWitnesses(witnesses());
  const conflicting: SourceRevisionWitness = { source: "beads:ready", revision: "dolt@9f4" };
  const unusables: unknown[] = [null, undefined, 4, " "];
  for (const unusable of unusables) {
    const entry: SourceRevisionWitness = { source: "beads:ready", revision: unusable as string };
    for (const list of [[...current, conflicting, entry], [entry, conflicting, ...current.slice().reverse()]]) {
      const out = admitAgainstCurrentRevisions(binding, list);
      assert.equal(out.admitted, false);
      assert.deepEqual(pairs(out), [["WITNESS_CURRENT_CONFLICT", "beads:ready"]], "conflict wins over unknown");
      assert.deepEqual(out.stale, []);
    }
  }
});

test("du92 W2: identical duplicate current revisions collapse beside a conflict, and the detail names both distinct revisions exactly, from either list order", () => {
  const binding = bindDecisionWitnesses(witnesses());
  const same: SourceRevisionWitness = { source: "beads:ready", revision: "dolt@9f1" };
  const other: SourceRevisionWitness = { source: "beads:ready", revision: "dolt@9f4" };
  const expected = "beads:ready is currently reported at both dolt@9f1 and dolt@9f4; a current revision is one value, never the last one listed";
  for (const list of [[...current, same, other], [other, same, ...current.slice().reverse()]]) {
    const out = admitAgainstCurrentRevisions(binding, list);
    assert.equal(out.admitted, false);
    assert.deepEqual(pairs(out), [["WITNESS_CURRENT_CONFLICT", "beads:ready"]]);
    assert.equal(out.refusals[0]!.detail, expected, "each distinct revision appears once however often it is reported");
    assert.deepEqual(out.stale, []);
  }
});

test("du92 W3: the WITNESS_CURRENT_UNKNOWN detail names its source, for an absent source and for a non-string report", () => {
  const binding = bindDecisionWitnesses(witnesses());
  const absent = admitAgainstCurrentRevisions(binding, current.slice(0, 2));
  const nonString = admitAgainstCurrentRevisions(binding, [current[0]!, current[1]!, { source: "beads:ready", revision: 4 as unknown as string }]);
  for (const out of [absent, nonString]) {
    assert.deepEqual(pairs(out), [["WITNESS_CURRENT_UNKNOWN", "beads:ready"]]);
    assert.ok(out.refusals[0]!.detail.includes("beads:ready"), "the detail names the source the refusal is about");
  }
});

test("vai0 D1: a WITNESS_CURRENT_UNKNOWN refusal names its source when an unusable entry rides beside a stated revision, from either list order", () => {
  const binding = bindDecisionWitnesses(witnesses());
  const unusables: unknown[] = [null, 4, " "];
  for (const unusable of unusables) {
    const entry: SourceRevisionWitness = { source: "beads:ready", revision: unusable as string };
    for (const list of [[...current, entry], [entry, ...current]]) {
      const out = admitAgainstCurrentRevisions(binding, list);
      assert.deepEqual(pairs(out), [["WITNESS_CURRENT_UNKNOWN", "beads:ready"]]);
      assert.ok(out.refusals[0]!.detail.includes("beads:ready"), out.refusals[0]!.detail);
    }
  }
});

test("vai0 D2: a conflict between two usable current revisions is judged before an empty-string entry, from either list order, with an empty stale list", () => {
  const binding = bindDecisionWitnesses(witnesses());
  const moved: SourceRevisionWitness = { source: "beads:ready", revision: "dolt@9f4" };
  const empty: SourceRevisionWitness = { source: "beads:ready", revision: "" };
  for (const list of [[...current, moved, empty], [empty, moved, ...current]]) {
    const out = admitAgainstCurrentRevisions(binding, list);
    assert.equal(out.admitted, false);
    assert.deepEqual(pairs(out), [["WITNESS_CURRENT_CONFLICT", "beads:ready"]]);
    assert.deepEqual(out.stale, []);
  }
});

test("vai0 D3: a conflict on an unbound source is judged before an unusable entry riding along, so the decision is never admitted, from either list order", () => {
  const binding = bindDecisionWitnesses(witnesses());
  const stray: SourceRevisionWitness[] = [{ source: "slack:channel", revision: "ts:1" }, { source: "slack:channel", revision: "ts:2" }];
  const unusables: unknown[] = [null, 4, " "];
  for (const unusable of unusables) {
    const entry: SourceRevisionWitness = { source: "slack:channel", revision: unusable as string };
    for (const list of [[...current, ...stray, entry], [entry, ...stray.slice().reverse(), ...current]]) {
      const out = admitAgainstCurrentRevisions(binding, list);
      assert.equal(out.admitted, false);
      assert.deepEqual(pairs(out), [["WITNESS_CURRENT_CONFLICT", "slack:channel"]]);
      assert.equal(out.refusals[0]!.detail, "slack:channel is currently reported at both ts:1 and ts:2; a current revision is one value, never the last one listed");
      assert.deepEqual(out.stale, []);
    }
  }
});

test("t1m4 K1: an empty-string current revision beside the stated, matching revision is unknown, never admitted, with an empty stale list, from either list order", () => {
  const binding = bindDecisionWitnesses(witnesses());
  const empty: SourceRevisionWitness = { source: "beads:ready", revision: "" };
  for (const list of [[...current, empty], [empty, ...current]]) {
    const out = admitAgainstCurrentRevisions(binding, list);
    assert.equal(out.admitted, false, "the stated dolt@9f1 matches the witness, yet the empty entry leaves the source unknown");
    assert.deepEqual(pairs(out), [["WITNESS_CURRENT_UNKNOWN", "beads:ready"]]);
    assert.deepEqual(out.stale, []);
  }
});

test("t1m4 K2: a conflict on an unbound source is judged before an empty-string or an absent revision riding along, so the decision is never admitted, from either list order", () => {
  const binding = bindDecisionWitnesses(witnesses());
  const stray: SourceRevisionWitness[] = [{ source: "slack:channel", revision: "ts:1" }, { source: "slack:channel", revision: "ts:2" }];
  const riders: SourceRevisionWitness[] = [{ source: "slack:channel", revision: "" }, { source: "slack:channel" } as unknown as SourceRevisionWitness];
  for (const entry of riders) {
    for (const list of [[...current, ...stray, entry], [entry, ...stray.slice().reverse(), ...current]]) {
      const out = admitAgainstCurrentRevisions(binding, list);
      assert.equal(out.admitted, false);
      assert.deepEqual(pairs(out), [["WITNESS_CURRENT_CONFLICT", "slack:channel"]]);
      assert.equal(out.refusals[0]!.detail, "slack:channel is currently reported at both ts:1 and ts:2; a current revision is one value, never the last one listed");
      assert.deepEqual(out.stale, []);
    }
  }
});

test("t1m4 K3: a WITNESS_CURRENT_UNKNOWN refusal names its source when an entry without a revision rides beside the stated revision, from either list order", () => {
  const binding = bindDecisionWitnesses(witnesses());
  const absent = { source: "beads:ready" } as unknown as SourceRevisionWitness;
  for (const list of [[...current, absent], [absent, ...current]]) {
    const out = admitAgainstCurrentRevisions(binding, list);
    assert.deepEqual(pairs(out), [["WITNESS_CURRENT_UNKNOWN", "beads:ready"]]);
    assert.ok(out.refusals[0]!.detail.includes("beads:ready"), out.refusals[0]!.detail);
  }
});

function stringLeaves(value: unknown, out: string[] = []): string[] {
  if (typeof value === "string") out.push(value);
  else if (Array.isArray(value)) for (const member of value) stringLeaves(member, out);
  else if (value !== null && typeof value === "object") for (const member of Object.values(value as Record<string, unknown>)) stringLeaves(member, out);
  return out;
}


test("l0qt WE1: a WITNESS_CURRENT_UNKNOWN refusal names its source when an empty-string entry rides beside the stated revision, from either list order", () => {
  const binding = bindDecisionWitnesses(witnesses());
  const empty: SourceRevisionWitness = { source: "beads:ready", revision: "" };
  for (const list of [[...current, empty], [empty, ...current]]) {
    const out = admitAgainstCurrentRevisions(binding, list);
    assert.deepEqual(pairs(out), [["WITNESS_CURRENT_UNKNOWN", "beads:ready"]]);
    assert.ok(out.refusals[0]!.detail.includes("beads:ready"), out.refusals[0]!.detail);
  }
});

test("l0qt WT1: a tab-only or newline-only current revision alone is WITNESS_CURRENT_UNKNOWN with an empty stale list", () => {
  const binding = bindDecisionWitnesses(witnesses());
  for (const blank of ["\t", "\n"]) {
    const out = admitAgainstCurrentRevisions(binding, [current[0]!, current[1]!, { source: "beads:ready", revision: blank }]);
    assert.equal(out.admitted, false);
    assert.deepEqual(pairs(out), [["WITNESS_CURRENT_UNKNOWN", "beads:ready"]]);
    assert.deepEqual(out.stale, []);
  }
});

test("l0qt WT2: a tab-only or newline-only current revision beside the stated, matching revision is WITNESS_CURRENT_UNKNOWN, never admitted and never a conflict, from either list order", () => {
  const binding = bindDecisionWitnesses(witnesses());
  for (const blank of ["\t", "\n"]) {
    const entry: SourceRevisionWitness = { source: "beads:ready", revision: blank };
    for (const list of [[...current, entry], [entry, ...current]]) {
      const out = admitAgainstCurrentRevisions(binding, list);
      assert.equal(out.admitted, false);
      assert.deepEqual(pairs(out), [["WITNESS_CURRENT_UNKNOWN", "beads:ready"]]);
      assert.deepEqual(out.stale, []);
    }
  }
});

test("l0qt WT3: a tab-only or newline-only witness revision refuses as WITNESS_REVISION_BLANK", () => {
  for (const blank of ["\t", "\n"]) {
    const out = bindDecisionWitnesses(witnesses({ sources: [witnesses().sources[0]!, witnesses().sources[1]!, { source: "beads:ready", revision: blank }] }));
    assert.equal(out.ok, false);
    assert.deepEqual(pairs(out), [["WITNESS_REVISION_BLANK", "beads:ready"]]);
  }
});

const REST_BLANKS: string[] = [
  "\u000b", "\u000c", "\u000d", "\u00a0", "\u1680",
  "\u2000", "\u2001", "\u2002", "\u2003", "\u2004", "\u2005", "\u2006", "\u2007", "\u2008", "\u2009", "\u200a",
  "\u2028", "\u2029", "\u202f", "\u205f", "\u3000", "\ufeff",
];
const blankName = (s: string): string => "U+" + s.charCodeAt(0).toString(16).padStart(4, "0");

test("8lwe CL0: the iterated list is exactly the trim() blank class of the BMP minus the space, tab and newline the landed rows pin", () => {
  const computed: string[] = [];
  for (let c = 0; c <= 0xffff; c++) {
    const s = String.fromCharCode(c);
    if (s.trim() === "" && s !== " " && s !== "\t" && s !== "\n") computed.push(s);
  }
  assert.equal(REST_BLANKS.length, 22);
  assert.deepEqual(computed.map(blankName), REST_BLANKS.map(blankName));
});

test("8lwe CL1: every other trim() blank character alone as the current revision is WITNESS_CURRENT_UNKNOWN with an empty stale list", () => {
  const binding = bindDecisionWitnesses(witnesses());
  for (const blank of REST_BLANKS) {
    const out = admitAgainstCurrentRevisions(binding, [current[0]!, current[1]!, { source: "beads:ready", revision: blank }]);
    assert.equal(out.admitted, false, blankName(blank));
    assert.deepEqual(pairs(out), [["WITNESS_CURRENT_UNKNOWN", "beads:ready"]], blankName(blank));
    assert.deepEqual(out.stale, [], blankName(blank));
  }
});

test("8lwe CL2: every other trim() blank character beside the stated, matching revision is WITNESS_CURRENT_UNKNOWN, never admitted and never a conflict, from either list order", () => {
  const binding = bindDecisionWitnesses(witnesses());
  for (const blank of REST_BLANKS) {
    const entry: SourceRevisionWitness = { source: "beads:ready", revision: blank };
    for (const list of [[...current, entry], [entry, ...current]]) {
      const out = admitAgainstCurrentRevisions(binding, list);
      assert.equal(out.admitted, false, blankName(blank));
      assert.deepEqual(pairs(out), [["WITNESS_CURRENT_UNKNOWN", "beads:ready"]], blankName(blank));
      assert.deepEqual(out.stale, [], blankName(blank));
    }
  }
});

test("8lwe CL3: every other trim() blank character as a witness revision refuses as WITNESS_REVISION_BLANK", () => {
  for (const blank of REST_BLANKS) {
    const out = bindDecisionWitnesses(witnesses({ sources: [witnesses().sources[0]!, witnesses().sources[1]!, { source: "beads:ready", revision: blank }] }));
    assert.equal(out.ok, false, blankName(blank));
    assert.deepEqual(pairs(out), [["WITNESS_REVISION_BLANK", "beads:ready"]], blankName(blank));
  }
});

// klph (8lwe follow-up): the rows above close the trim() blank class from below (every trim() blank is refused). The rows below pin the
// complement at the same three checks: a character trim() keeps is a real revision, a value with whitespace inside or around other
// characters is a real revision, and the empty string is a blank witness revision.
const name = (s: string): string => JSON.stringify(s) + " " + [...s].map(c => "U+" + c.charCodeAt(0).toString(16).padStart(4, "0")).join(" ");
const witnessAt = (revision: string): DecisionWitnesses => witnesses({ sources: [witnesses().sources[0]!, witnesses().sources[1]!, { source: "beads:ready", revision }] });
// Characters other whitespace notions call blank while String.prototype.trim() keeps them: the Python str.isspace() extras U+001C-U+001F
// and U+0085, U+180E (a Zs space before Unicode 6.3), U+200B and U+2060.
const LOOKALIKES: string[] = ["\u001c", "\u001d", "\u001e", "\u001f", "\u0085", "\u180e", "\u200b", "\u2060"];
const INNER: string[] = ["dolt 9f1", "dolt\t9f1", "dolt\u3000x", " dolt@9f1", "dolt@9f1 "];
const MULTI_BLANKS: string[] = ["", "  ", " \t\n"];

test("klph K0: every lookalike survives trim() unchanged, every inner-whitespace value keeps characters after trim(), and every multi blank trims to nothing", () => {
  assert.equal(LOOKALIKES.length, 8);
  assert.equal(INNER.length, 5);
  assert.equal(MULTI_BLANKS.length, 3);
  for (const s of LOOKALIKES) assert.equal(s.trim(), s, name(s));
  for (const s of INNER) assert.ok(s.trim().length > 0, name(s));
  for (const s of MULTI_BLANKS) assert.equal(s.trim(), "", name(s));
});

test("klph K1: a lookalike alone as the current revision is a known revision that moved: WITNESS_STALE naming it, never WITNESS_CURRENT_UNKNOWN", () => {
  const binding = bindDecisionWitnesses(witnesses());
  for (const s of LOOKALIKES) {
    const out = admitAgainstCurrentRevisions(binding, [current[0]!, current[1]!, { source: "beads:ready", revision: s }]);
    assert.equal(out.admitted, false, name(s));
    assert.deepEqual(pairs(out), [["WITNESS_STALE", "beads:ready"]], name(s));
    assert.deepEqual(out.stale, [{ source: "beads:ready", witnessed: "dolt@9f1", current: s }], name(s));
  }
});

test("klph K2: a lookalike alone as a witness revision binds", () => {
  for (const s of LOOKALIKES) {
    const out = bindDecisionWitnesses(witnessAt(s));
    assert.deepEqual(out.refusals, [], name(s));
    assert.equal(out.ok, true, name(s));
    assert.equal(out.bound.find(w => w.source === "beads:ready")!.revision, s, name(s));
  }
});

test("klph K3: a lookalike beside the stated, matching revision is a second usable revision: WITNESS_CURRENT_CONFLICT from either list order", () => {
  const binding = bindDecisionWitnesses(witnesses());
  for (const s of LOOKALIKES) {
    const entry: SourceRevisionWitness = { source: "beads:ready", revision: s };
    for (const list of [[...current, entry], [entry, ...current]]) {
      const out = admitAgainstCurrentRevisions(binding, list);
      assert.equal(out.admitted, false, name(s));
      assert.deepEqual(pairs(out), [["WITNESS_CURRENT_CONFLICT", "beads:ready"]], name(s));
      assert.deepEqual(out.stale, [], name(s));
    }
  }
});

test("klph K4: a witness revision with whitespace inside or around other characters binds: blank means every character is a trim() blank, not any", () => {
  for (const s of INNER) {
    const out = bindDecisionWitnesses(witnessAt(s));
    assert.deepEqual(out.refusals, [], name(s));
    assert.equal(out.ok, true, name(s));
    assert.equal(out.bound.find(w => w.source === "beads:ready")!.revision, s, name(s));
  }
});

test("klph K5: a current revision with whitespace inside or around other characters is a known revision compared raw: WITNESS_STALE naming it", () => {
  const binding = bindDecisionWitnesses(witnesses());
  for (const s of INNER) {
    const out = admitAgainstCurrentRevisions(binding, [current[0]!, current[1]!, { source: "beads:ready", revision: s }]);
    assert.equal(out.admitted, false, name(s));
    assert.deepEqual(pairs(out), [["WITNESS_STALE", "beads:ready"]], name(s));
    assert.deepEqual(out.stale, [{ source: "beads:ready", witnessed: "dolt@9f1", current: s }], name(s));
  }
});

test("klph K6: an empty or multi-character blank witness revision refuses as WITNESS_REVISION_BLANK", () => {
  for (const s of MULTI_BLANKS) {
    const out = bindDecisionWitnesses(witnessAt(s));
    assert.equal(out.ok, false, name(s));
    assert.deepEqual(pairs(out), [["WITNESS_REVISION_BLANK", "beads:ready"]], name(s));
    assert.deepEqual(out.bound.filter(w => w.source === "beads:ready"), [], name(s));
  }
});

test("klph K7: REST_BLANKS is spelled with escapes only, so no literal LineTerminator or invisible blank sits in the file and node-reported failure lines equal git lines", () => {
  const text = readFileSync(new URL("./witness-binding.test.ts", import.meta.url), "utf8");
  const literal = [...text].filter(c => c.trim() === "" ? c !== " " && c !== "\n" : LOOKALIKES.includes(c));
  assert.deepEqual(literal.map(blankName), []);
  assert.equal(text.split(/\r\n|\r|\n|\u2028|\u2029/).length, text.split("\n").length);
});

// en5b (klph follow-up): the conflict filter pins. A whitespace-bearing current revision beside the stated, matching revision is a second distinct value.
// Escapes only, so klph K7 stays green.
const CONFLICT_INNER: string[] = ["dolt 9f1", "dolt\t9f1", "dolt\u3000x"];
const CONFLICT_PADDED: string[] = [" dolt@9f1", "dolt@9f1 ", "\u3000dolt@9f1", "dolt@9f1\n"];
const conflictDetail = (s: string): string => "beads:ready is currently reported at both " + [s, "dolt@9f1"].sort().join(" and ") + "; a current revision is one value, never the last one listed";

test("en5b C0: every inner-only value contains whitespace and equals its trim(); every padded value differs from its trim(), which is the stated revision", () => {
  assert.equal(CONFLICT_INNER.length, 3);
  assert.equal(CONFLICT_PADDED.length, 4);
  for (const s of CONFLICT_INNER) { assert.equal(s.trim(), s, name(s)); assert.ok(/\s/.test(s), name(s)); }
  for (const s of CONFLICT_PADDED) { assert.notEqual(s.trim(), s, name(s)); assert.equal(s.trim(), "dolt@9f1", name(s)); }
});

test("en5b C1: an inner-whitespace current revision beside the stated, matching revision is a second usable revision: WITNESS_CURRENT_CONFLICT naming both raw values, from either list order", () => {
  const binding = bindDecisionWitnesses(witnesses());
  for (const s of CONFLICT_INNER) {
    const entry: SourceRevisionWitness = { source: "beads:ready", revision: s };
    for (const list of [[...current, entry], [entry, ...current]]) {
      const out = admitAgainstCurrentRevisions(binding, list);
      assert.equal(out.admitted, false, name(s));
      assert.deepEqual(pairs(out), [["WITNESS_CURRENT_CONFLICT", "beads:ready"]], name(s));
      assert.deepEqual(out.stale, [], name(s));
      assert.equal(out.refusals[0]!.detail, conflictDetail(s), name(s));
    }
  }
});

test("en5b C2: a padded current revision beside the stated, matching revision is compared raw, never trimmed into a duplicate: WITNESS_CURRENT_CONFLICT naming both raw values, from either list order", () => {
  const binding = bindDecisionWitnesses(witnesses());
  for (const s of CONFLICT_PADDED) {
    const entry: SourceRevisionWitness = { source: "beads:ready", revision: s };
    for (const list of [[...current, entry], [entry, ...current]]) {
      const out = admitAgainstCurrentRevisions(binding, list);
      assert.equal(out.admitted, false, name(s));
      assert.deepEqual(pairs(out), [["WITNESS_CURRENT_CONFLICT", "beads:ready"]], name(s));
      assert.deepEqual(out.stale, [], name(s));
      assert.equal(out.refusals[0]!.detail, conflictDetail(s), name(s));
    }
  }
});
