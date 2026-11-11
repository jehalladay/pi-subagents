// MechanicalWorkflows-rev1.1 (GPC-EAT-R009 remainder, claim experiment-compare-fifo-greedy-static-matching-
// micropolicy-gp-composition): an ADDITIVE arm registry beside the vertical cut. Every arm names its mechanism
// from a closed enum (GPC-EAT-R012). Two heuristic arms (greedy, static-role) are built as pure fixture
// policies and run through the unchanged reconcile into mw.graph-family-evaluation.v1 blocks; four arms
// (graph-feature-mlp, micropolicy-scorer, gp-relational-scorer, gp-to-mp-composition) are present only as
// explicit refusals. Evidence grade FIXTURE throughout: mode "fixture", certified false. No test asserts an
// ordering among arms (C037 stays UNDETERMINED).
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import {
  runVerticalCut, runVerticalCutArms, verticalCutBytes, verticalCutArmsBytes,
  greedyLanding, staticRoleLanding, greedyDag, staticRoleDag,
  VERTICAL_CUT_ARMS, VERTICAL_CUT_ARM_MECHANISMS, VERTICAL_CUT_ARM_REGISTRY, VERTICAL_CUT_INSTANCES,
  digest,
} from "../dist/index.js";
import type { VerticalCutArmRow } from "../dist/index.js";

const here = dirname(fileURLToPath(import.meta.url));
const FIXTURE = join(here, "..", "..", "..", "qa", "integration", "python-consumer", "fixtures", "vertical-cut-seed7.json");
const SOURCE = join(here, "..", "src", "vertical-cut-arms.ts");
const BUILT = ["exact-oracle", "fifo", "gp-scorer", "greedy", "restack", "static-role"];
const UNBUILT = ["gp-relational-scorer", "gp-to-mp-composition", "graph-feature-mlp", "micropolicy-scorer"];

test("A1 regression: the four-arm cut stays exactly as committed and the extended report agrees with it row for row", () => {
  assert.deepEqual([...VERTICAL_CUT_ARMS], ["exact-oracle", "fifo", "gp-scorer", "restack"]);
  assert.equal(verticalCutBytes(runVerticalCut()), readFileSync(FIXTURE, "utf8"), "default cut bytes unchanged");
  const base = runVerticalCut();
  const extended = runVerticalCutArms();
  for (const block of base.families) {
    const wide = extended.families.find(candidate => candidate.family === block.family)!;
    for (const arm of block.arms) {
      assert.deepEqual(wide.arms.find(row => row.armId === arm.armId), arm, `${block.family}/${arm.armId} identical in the extended report`);
    }
  }
});

test("A2 registry shape: sorted rows, closed mechanism enum, non-empty definitions, embedded in provenance, pure and digest-verified", () => {
  assert.deepEqual([...VERTICAL_CUT_ARM_MECHANISMS], ["exact-enumeration", "fixture-policy", "graph-policy-host", "micropolicy-adapter", "unbuilt"]);
  const ids = VERTICAL_CUT_ARM_REGISTRY.map(row => row.armId);
  assert.deepEqual(ids, [...ids].sort(), "registry sorted by armId");
  assert.deepEqual(ids, [...BUILT, ...UNBUILT].sort(), "registry names exactly the six built arms and the four unbuilt arms");
  for (const row of VERTICAL_CUT_ARM_REGISTRY) {
    assert.ok(row.armId.trim().length > 0, "non-blank armId");
    assert.ok(VERTICAL_CUT_ARM_MECHANISMS.includes(row.mechanism), `${row.armId} mechanism ${row.mechanism} in the closed enum`);
    assert.ok(row.definition.trim().length > 0, `${row.armId} carries a definition sentence`);
  }
  const mechanismOf = (armId: string): string => VERTICAL_CUT_ARM_REGISTRY.find(row => row.armId === armId)!.mechanism;
  assert.equal(mechanismOf("exact-oracle"), "exact-enumeration");
  assert.equal(mechanismOf("gp-scorer"), "graph-policy-host");
  for (const armId of ["fifo", "restack", "greedy", "static-role"]) assert.equal(mechanismOf(armId), "fixture-policy", armId);
  for (const armId of UNBUILT) assert.equal(mechanismOf(armId), "unbuilt", armId);

  const report = runVerticalCutArms();
  assert.deepEqual(report.provenance.armRegistry, VERTICAL_CUT_ARM_REGISTRY, "the report embeds the registry");
  assert.deepEqual([...report.provenance.arms], BUILT, "evaluated arms are the sorted built arms");
  assert.equal(report.schema, "mw.graph-family-evaluation.v1");
  assert.equal(report.mode, "fixture");
  assert.equal(report.certified, false);
  for (const block of report.families) {
    assert.equal(block.certified, false, block.family);
    assert.deepEqual(block.arms.map(arm => arm.armId), BUILT, block.family);
    for (const arm of block.arms) assert.equal(arm.certified, false, `${block.family}/${arm.armId}`);
  }
  assert.equal(runVerticalCutArms().reportDigest, report.reportDigest, "same seeds, same digest (purity)");
  assert.equal(verticalCutArmsBytes(runVerticalCutArms()), verticalCutArmsBytes(report), "same seeds, same bytes");
  const { reportDigest, ...body } = report;
  assert.equal(digest(body), reportDigest, "the digest re-verifies");
  assert.deepEqual(report.provenance.instances, VERTICAL_CUT_INSTANCES);
});

test("A3 heuristic arms: greedy and static-role yield one row per pinned family with non-negative regret, and their definitions are digest-bound", () => {
  const report = runVerticalCutArms();
  assert.deepEqual(report.families.map(block => block.family), ["dag-assignment", "landing-queue"]);
  for (const block of report.families) {
    for (const armId of ["greedy", "static-role"]) {
      const rows = block.arms.filter(arm => arm.armId === armId);
      assert.equal(rows.length, 1, `${block.family}/${armId} has exactly one row`);
      const row = rows[0]!;
      assert.equal(row.n, 1, "one pinned instance per family");
      assert.equal(typeof row.regretMicro, "number", "regret is measured against the exact oracle, never unknown");
      assert.ok((row.regretMicro as number) >= 0, `${block.family}/${armId} regret ${String(row.regretMicro)} >= 0`);
      assert.ok(Number.isInteger(row.constraintViolations) && row.constraintViolations >= 0);
      assert.ok(Number.isInteger(row.invalidProposals) && row.invalidProposals >= 0);
      assert.ok(row.p95WallClockMicro > 0);
    }
  }
  const edited: VerticalCutArmRow[] = VERTICAL_CUT_ARM_REGISTRY.map(row => row.armId === "greedy" ? { ...row, definition: `${row.definition} (edited)` } : row);
  assert.notEqual(runVerticalCutArms({ registry: edited }).reportDigest, report.reportDigest, "a changed definition sentence changes the digest");
});

test("a requested subset still carries the exact-oracle regret reference, and an empty or duplicate request is refused", () => {
  const report = runVerticalCutArms({ arms: ["greedy"] });
  for (const block of report.families) assert.deepEqual(block.arms.map(arm => arm.armId), ["exact-oracle", "greedy"], block.family);
  assert.deepEqual([...report.provenance.arms], ["exact-oracle", "greedy"]);
  assert.throws(() => runVerticalCutArms({ arms: ["greedy", "greedy"] }), /VERTICAL_CUT_INVALID: duplicate requested arm greedy/);
  assert.throws(() => runVerticalCutArms({ arms: [] }), /VERTICAL_CUT_INVALID: no arms requested/);
  assert.throws(() => runVerticalCutArms({ arms: ["no-such-arm"] }), /VERTICAL_CUT_INVALID: unknown arm no-such-arm/);
});

test("A4 negative control: requesting any unbuilt arm refuses with VERTICAL_CUT_ARM_UNBUILT naming the arm, never a placeholder row", () => {
  for (const armId of UNBUILT) {
    assert.throws(() => runVerticalCutArms({ arms: ["greedy", armId] }), (error: unknown) => {
      assert.ok(error instanceof RangeError, `${armId} throws a RangeError`);
      assert.match(error.message, new RegExp(`^VERTICAL_CUT_ARM_UNBUILT: ${armId}\\b`), armId);
      return true;
    });
  }
});

test("A4 second control: a registry row with a mechanism outside the enum, a blank armId, a blank definition or a duplicate id is refused before any episode runs", () => {
  const base = [...VERTICAL_CUT_ARM_REGISTRY];
  const greedy = base.find(row => row.armId === "greedy")!;
  const bad: readonly [string, VerticalCutArmRow[], RegExp][] = [
    ["mechanism outside the enum", base.map(row => row.armId === "greedy" ? { ...greedy, mechanism: "oracle-peek" as never } : row), /VERTICAL_CUT_INVALID: arm greedy mechanism oracle-peek is outside the closed enum/],
    ["blank armId", [...base, { ...greedy, armId: "  " }], /VERTICAL_CUT_INVALID: blank arm id/],
    ["blank definition", base.map(row => row.armId === "greedy" ? { ...greedy, definition: " " } : row), /VERTICAL_CUT_INVALID: arm greedy carries a blank definition/],
    ["duplicate armId", [...base, greedy], /VERTICAL_CUT_INVALID: duplicate registry arm id greedy/],
  ];
  // stepsCap 1 makes the landing oracle search fail with a DIFFERENT message, so a matching registry message proves registry validation ran first.
  const impossible = { landing: { seed: 7, candidates: 4, lanes: 1, stepsCap: 1 }, dag: { seed: 7, stepsCap: 8 } };
  for (const [label, registry, pattern] of bad) {
    assert.throws(() => runVerticalCutArms({ registry, instances: impossible }), pattern, label);
    assert.throws(() => runVerticalCutArms({ registry }), pattern, `${label} (default instances)`);
  }
  assert.throws(() => runVerticalCutArms({ instances: impossible }), /VERTICAL_CUT_INVALID: no landing script completes/, "control: the same instances without a bad registry reach the oracle search");
});

test("the extended runner validates its instances like the base cut", () => {
  assert.throws(() => runVerticalCutArms({ instances: { landing: { seed: 7, candidates: 4, lanes: 1, stepsCap: 0 }, dag: { seed: 7, stepsCap: 8 } } }), /VERTICAL_CUT_INVALID: landing.stepsCap/);
  assert.throws(() => runVerticalCutArms({ instances: { landing: { seed: -1, candidates: 4, lanes: 1, stepsCap: 12 }, dag: { seed: 7, stepsCap: 8 } } }), /VERTICAL_CUT_INVALID: landing.seed/);
});

test("A5 hypothesis guard: no definition or source line claims that any arm beats another or that a learned scorer improves on a heuristic", () => {
  const claim = /\b(beats?|outperforms?|outperformed|better than|superior|improves? on|improved on|wins? against|dominates?)\b/i;
  for (const row of VERTICAL_CUT_ARM_REGISTRY) assert.doesNotMatch(row.definition, claim, `${row.armId} definition`);
  const lines = readFileSync(SOURCE, "utf8").split("\n");
  lines.forEach((line, index) => {
    if (/^\s*(\/\/|\*|\/\*)/.test(line) && /\bno\b|\bnever\b|\bnot\b|\bwithout\b/i.test(line)) return; // a negated guard sentence may name the forbidden verbs
    assert.doesNotMatch(line, claim, `vertical-cut-arms.ts:${index + 1}`);
  });
});

test("the greedy and static-role arms differ from each other and from the fifo and restack arms in at least one measured family metric (no vacuous alias)", () => {
  const report = runVerticalCutArms();
  const signature = (family: string, armId: string): string => {
    const row = report.families.find(block => block.family === family)!.arms.find(arm => arm.armId === armId)!;
    return JSON.stringify([row.meanStepsMicro, row.throughputMicro, row.constraintViolations, row.invalidProposals]);
  };
  for (const armId of ["greedy", "static-role"]) {
    for (const other of ["fifo", "restack"]) {
      const same = ["landing-queue", "dag-assignment"].every(family => signature(family, armId) === signature(family, other));
      assert.equal(same, false, `${armId} is not a relabelled ${other}`);
    }
  }
  const same = ["landing-queue", "dag-assignment"].every(family => signature(family, "greedy") === signature(family, "static-role"));
  assert.equal(same, false, "greedy is not a relabelled static-role");
});

test("the heuristic rows are pinned at the seed-7 instances as measurements (fixture grade), not as an ordering", () => {
  const report = runVerticalCutArms();
  const measured = (family: string, armId: string): readonly number[] => {
    const row = report.families.find(block => block.family === family)!.arms.find(arm => arm.armId === armId)!;
    return [row.meanStepsMicro / 1_000_000, row.regretMicro as number, row.throughputMicro];
  };
  assert.deepEqual(measured("landing-queue", "greedy"), [8, 0, 1_000_000], "greedy lands on head first, else restacks");
  assert.deepEqual(measured("landing-queue", "static-role"), [10, 2_000_000, 800_000], "static roles waste steps on infeasible role actions");
  assert.deepEqual(measured("dag-assignment", "greedy"), [5, 2_000_000, 1_000_000], "shortest-latency-first leaves the compute-2 task waiting behind agent A");
  assert.deepEqual(measured("dag-assignment", "static-role"), [3, 0, 1_666_667], "heavy tasks to the first agent, light tasks to the rest");
  for (const block of report.families) {
    for (const row of block.arms) assert.equal(row.constraintViolations + row.invalidProposals, 0, `${block.family}/${row.armId} proposals all admitted`);
  }
});

test("a registry whose mechanism contradicts the arm's builder, or whose built arm has no builder, is refused before any episode runs", () => {
  const base = [...VERTICAL_CUT_ARM_REGISTRY];
  const relabel = (armId: string, mechanism: VerticalCutArmRow["mechanism"]): VerticalCutArmRow[] => base.map(row => row.armId === armId ? { ...row, mechanism } : row);
  assert.throws(() => runVerticalCutArms({ registry: relabel("greedy", "graph-policy-host") }), /VERTICAL_CUT_INVALID: arm greedy mechanism graph-policy-host does not match its builder mechanism fixture-policy/);
  assert.throws(() => runVerticalCutArms({ registry: relabel("exact-oracle", "fixture-policy") }), /VERTICAL_CUT_INVALID: arm exact-oracle mechanism fixture-policy must be exact-enumeration/);
  assert.throws(() => runVerticalCutArms({ registry: relabel("gp-scorer", "fixture-policy") }), /VERTICAL_CUT_INVALID: arm gp-scorer mechanism fixture-policy must be graph-policy-host/);
  const invented: VerticalCutArmRow = { armId: "invented-arm", mechanism: "fixture-policy", definition: "An arm with a registry row and no policy behind it." };
  assert.throws(() => runVerticalCutArms({ registry: [...base, invented] }), /VERTICAL_CUT_INVALID: arm invented-arm has no builder/);
  const listed = runVerticalCutArms({ registry: [...base, invented], arms: ["greedy"] });
  assert.deepEqual([...listed.provenance.arms], ["exact-oracle", "greedy"], "an unrequested registry row is embedded but never run");
  assert.equal(listed.provenance.armRegistry.some(row => row.armId === "invented-arm"), true);
});

test("the learned-arm configuration appears in provenance only when gp-scorer ran", () => {
  assert.equal(runVerticalCutArms().provenance.learnedArm?.mechanism, "graph-policy-host");
  assert.equal("learnedArm" in runVerticalCutArms({ arms: ["greedy", "static-role"] }).provenance, false);
});

const AGENTS = [
  { agentId: "A", capacity: { compute: 2, workers: 1, queue: 2, latencyMs: 10 } },
  { agentId: "B", capacity: { compute: 1, workers: 1, queue: 2, latencyMs: 10 } },
];
const claim = (compute: number) => ({ compute, workers: 1, queue: 1, latencyMs: 1 });
const dagObservation = { basis: { workspaceId: "fixture:dag-assignment", revision: "dag-0" }, agents: AGENTS, ready: [
  { taskId: "t1", dependsOn: [], claim: claim(1) }, { taskId: "t2", dependsOn: [], claim: claim(2) },
] };
const context = (budget: { compute: number; workers: number; queue: number; latencyMs: number }) => ({
  episodeId: "fixture:test", actorId: "test", observationDigest: "d", budget, authority: "propose-only" as const, policyRevision: "fixture-1", seed: 7,
});

test("the static-role DAG policy sends heavy tasks only to the first agent and spends the shared budget once across both roles", () => {
  const roomy = staticRoleDag.propose(dagObservation, 0, context({ compute: 3, workers: 2, queue: 4, latencyMs: 10 }));
  const byTask = Object.fromEntries(roomy.intents.map(intent => [intent.target.uri, intent.readScopes[0]]));
  assert.deepEqual(byTask, { t1: "agent:B", t2: "agent:A" }, "heavy t2 to A, light t1 to B");
  const tight = staticRoleDag.propose(dagObservation, 0, context({ compute: 2, workers: 2, queue: 4, latencyMs: 10 }));
  assert.deepEqual(tight.intents.map(intent => intent.target.uri), ["t2"], "the heavy claim spends the whole compute budget, so the light role proposes nothing");
  const lightOnly = staticRoleDag.propose({ ...dagObservation, ready: [dagObservation.ready[0]!] }, 0, context({ compute: 3, workers: 2, queue: 4, latencyMs: 10 }));
  assert.deepEqual(lightOnly.intents.map(intent => intent.readScopes[0]), ["agent:B"], "a light task never goes to the heavy-role agent");
  assert.deepEqual(staticRoleDag.propose({ ...dagObservation, ready: [] }, 4, context({ compute: 3, workers: 2, queue: 4, latencyMs: 10 })).intents, [], "nothing ready proposes nothing");
});

test("the greedy DAG policy orders by shortest latency and the landing policies pick the documented action at a fixed observation", () => {
  const slow = { taskId: "slow", dependsOn: [], claim: { ...claim(1), latencyMs: 9 } };
  const quick = { taskId: "quick", dependsOn: [], claim: { ...claim(1), latencyMs: 1 } };
  const oneSlot = greedyDag.propose({ ...dagObservation, agents: [AGENTS[0]!], ready: [slow, quick] }, 0, context({ compute: 1, workers: 1, queue: 4, latencyMs: 10 }));
  assert.deepEqual(oneSlot.intents.map(intent => intent.target.uri), ["quick"], "with room for one task the shorter-latency task is taken");
  const landing = (bases: readonly string[]) => ({
    basis: { workspaceId: "fixture:landing-queue", revision: "head-1" }, head: "head-1", lanes: 1,
    ready: bases.map((base, index) => ({ id: `c${index + 1}`, base, arrival: index })),
  });
  const mixed = landing(["head-0", "head-1"]); // c1 stale, c2 on head
  assert.equal(greedyLanding.propose(mixed, 0, context({ compute: 1, workers: 1, queue: 2, latencyMs: 1000 })).intents[0]!.effect, "land", "greedy lands first");
  assert.equal(greedyLanding.propose(landing(["head-0"]), 0, context({ compute: 1, workers: 1, queue: 2, latencyMs: 1000 })).intents[0]!.effect, "restack", "greedy restacks when only stale candidates wait");
  assert.deepEqual(greedyLanding.propose(landing([]), 0, context({ compute: 1, workers: 1, queue: 2, latencyMs: 1000 })).intents, []);
  assert.equal(staticRoleLanding.propose(mixed, 0, context({ compute: 1, workers: 1, queue: 2, latencyMs: 1000 })).intents[0]!.effect, "restack", "even step: restacker role");
  assert.equal(staticRoleLanding.propose(mixed, 1, context({ compute: 1, workers: 1, queue: 2, latencyMs: 1000 })).intents[0]!.effect, "land", "odd step: lander role");
  assert.deepEqual(staticRoleLanding.propose(landing(["head-1"]), 0, context({ compute: 1, workers: 1, queue: 2, latencyMs: 1000 })).intents, [], "restacker role with no stale candidate proposes nothing");
  assert.deepEqual(staticRoleLanding.propose(landing(["head-0"]), 1, context({ compute: 1, workers: 1, queue: 2, latencyMs: 1000 })).intents, [], "lander role with no on-head candidate proposes nothing");
});

test("an injected registry in any order is embedded sorted by armId, so the report bytes do not depend on row order", () => {
  const reversed = [...VERTICAL_CUT_ARM_REGISTRY].reverse();
  const report = runVerticalCutArms({ registry: reversed });
  assert.deepEqual(report.provenance.armRegistry, VERTICAL_CUT_ARM_REGISTRY, "embedded registry is sorted");
  assert.equal(report.reportDigest, runVerticalCutArms().reportDigest, "row order does not move the digest");
});
