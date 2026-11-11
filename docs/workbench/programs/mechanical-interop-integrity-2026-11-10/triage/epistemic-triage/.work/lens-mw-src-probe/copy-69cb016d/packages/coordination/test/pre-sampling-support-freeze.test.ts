// MechanicalWorkflows-1dzg: pin the issued-result freeze of pre-sampling-support.ts.
// Evidence grade FIXTURE: no assertion here earns a native grade. A1: every issued result (ok,
// PRE_SAMPLING_INPUT_ABSENT, PRE_SAMPLING_SUPPORT_EMPTY) is frozen and the ok support array is
// frozen. A2: an in-place write of result.support throws under ESM strict mode, leaves the result
// unchanged, and withPreSamplingSupport still records the original list. A3: an in-place write of
// the support array (push, index assignment) throws and leaves it unchanged.
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { enumeratePreSamplingSupport, withPreSamplingSupport, buildDecisionReceipts } from "../dist/index.js";
import type { Episode, GraphDataNode } from "../dist/index.js";

const here = dirname(fileURLToPath(import.meta.url));
const episode = JSON.parse(readFileSync(join(here, "../../../qa/integration/python-consumer/fixtures/episode-landing-queue-seed7.json"), "utf8")) as Episode;

const nodes: GraphDataNode[] = [
  { sourceId: "agent:worker-1", kind: "agent" },
  { sourceId: "task:restack-c1", kind: "task" },
  { sourceId: "resource:lane-1", kind: "resource" },
];
const capacity = { "agent:worker-1": 2, "task:restack-c1": 1, "resource:lane-1": 3 };
const permitted = { "agent:worker-1": true, "task:restack-c1": true, "resource:lane-1": false };
const ORIGINAL = ["agent:worker-1", "task:restack-c1"];

const okResult = () => enumeratePreSamplingSupport({ graph: { nodes }, capacity, permitted });

test("A1: the ok, input-absent and empty-support results are all frozen, and the ok support array is frozen", () => {
  const ok = okResult();
  const absent = enumeratePreSamplingSupport({ graph: { nodes } } as never);
  const empty = enumeratePreSamplingSupport({ graph: { nodes }, capacity, permitted: {} });
  assert.equal(ok.ok, true);
  assert.equal(absent.ok ? "" : absent.code, "PRE_SAMPLING_INPUT_ABSENT");
  assert.equal(empty.ok ? "" : empty.code, "PRE_SAMPLING_SUPPORT_EMPTY");
  for (const result of [ok, absent, empty]) assert.equal(Object.isFrozen(result), true, `frozen ${result.ok ? "ok" : result.code}`);
  assert.equal(Object.isFrozen(ok.ok ? ok.support : null), true, "the support array is frozen");
  assert.deepEqual(ok.ok && ok.support, ORIGINAL);
});

test("A2: an in-place write of result.support throws TypeError, changes nothing, and the receipt records the original list", () => {
  const result = okResult();
  assert.throws(() => { (result as unknown as { support: string[] }).support = ["task:forged"]; }, TypeError);
  assert.deepEqual(result.ok && result.support, ORIGINAL, "result.support is unchanged afterwards");
  const [base] = buildDecisionReceipts(episode);
  assert.deepEqual(withPreSamplingSupport(base!, result).support, ORIGINAL, "the receipt records the genuine set, in order");
});

test("A3: an in-place write of the support array throws TypeError (push and index assignment) and leaves it unchanged", () => {
  const result = okResult();
  const list = (result.ok ? result.support : []) as string[];
  assert.throws(() => { list.push("task:forged"); }, TypeError);
  assert.throws(() => { list[0] = "task:forged"; }, TypeError);
  assert.deepEqual(list, ORIGINAL);
  const [base] = buildDecisionReceipts(episode);
  assert.deepEqual(withPreSamplingSupport(base!, result).support, ORIGINAL);
});
