import test from "node:test";
import assert from "node:assert/strict";
import { mapStage, mapVerdict, reportStage, reportVerdict } from "../dist/obligation-report.js";

const VERDICTS = ["passed", "failed", "partial", "unknown"] as const;
const STATES = ["established", "observed", "unknown", "not_run"] as const;
const REPORTS = ["PASS", "FAIL", "UNKNOWN"];
const nativeRef = { system: "forge", kind: "operation", id: "op-1" } as const;

test("every shipped verdict and receipt state maps to one of PASS, FAIL or UNKNOWN and keeps its raw value", () => {
  for (const v of VERDICTS) {
    assert.ok(REPORTS.includes(mapVerdict(v)), `verdict ${v}`);
    assert.equal(reportVerdict(v).raw, v);
    assert.equal(reportVerdict(v).report, mapVerdict(v));
  }
  for (const s of STATES) {
    assert.ok(REPORTS.includes(mapStage(s, nativeRef)), `state ${s}`);
    assert.equal(reportStage(s, nativeRef).raw, s);
    assert.equal(reportStage(s).report, mapStage(s));
  }
});

test("only passed maps to PASS and failed maps to FAIL among verification verdicts", () => {
  assert.equal(mapVerdict("passed"), "PASS");
  assert.equal(mapVerdict("failed"), "FAIL");
  assert.equal(mapVerdict("partial"), "UNKNOWN");
  assert.equal(mapVerdict("unknown"), "UNKNOWN");
});

test("partial, unknown, observed and not_run receipt states map to UNKNOWN even when a native ref is present", () => {
  assert.equal(mapStage("not_run", nativeRef), "UNKNOWN");
  assert.equal(mapStage("observed", nativeRef), "UNKNOWN");
  assert.equal(mapStage("unknown", nativeRef), "UNKNOWN");
  assert.equal(mapStage("not_run"), "UNKNOWN");
  assert.equal(mapStage("observed"), "UNKNOWN");
});

test("established maps to PASS only with a complete native ref and never to FAIL without one", () => {
  assert.equal(mapStage("established", nativeRef), "PASS");
  assert.equal(mapStage("established"), "UNKNOWN");
  assert.equal(mapStage("established", undefined), "UNKNOWN");
  assert.equal(mapStage("established", { ...nativeRef, id: "" }), "UNKNOWN");
  assert.equal(mapStage("established", { ...nativeRef, system: "  " }), "UNKNOWN");
  assert.equal(mapStage("established", { ...nativeRef, kind: "" }), "UNKNOWN");
});

test("a foreign verdict or state string never reaches PASS and stays retained as raw", () => {
  const verdict = reportVerdict("pass" as never);
  assert.equal(verdict.report, "UNKNOWN");
  assert.equal(verdict.raw, "pass");
  const stage = reportStage("verified" as never, nativeRef);
  assert.equal(stage.report, "UNKNOWN");
  assert.equal(stage.raw, "verified");
  assert.equal(mapVerdict("toString" as never), "UNKNOWN");
  assert.equal(mapStage("constructor" as never, nativeRef), "UNKNOWN");
});

test("the mapping is pure: the input ref object is not mutated and no field is added to the report", () => {
  const ref = { ...nativeRef };
  const out = reportStage("established", ref);
  assert.deepEqual(ref, nativeRef);
  assert.deepEqual(Object.keys(out).sort(), ["raw", "report"]);
});
