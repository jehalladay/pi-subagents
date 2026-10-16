import { createHash } from "node:crypto";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { CapabilityRegistry } from "../src/workbench/capability-registry.js";
import { type CompareRun, catalogWorkflows, compareWorkflowRuns, inspectWorkflowSource, validateWorkflowSource, type WorkflowComparison, type WorkflowSource } from "../src/workbench/designer.js";
import { type InvocationSnapshot, identityDigest } from "../src/workbench/identity.js";

const roots: string[] = [];
function root(): string { const path = mkdtempSync(join(tmpdir(), "designer-test-")); roots.push(path); return path; }
function source(body: string, meta = '{ name: "sample", description: "description" }'): WorkflowSource {
  const cwd = root(); const path = join(cwd, "script.js"); writeFileSync(path, `export const meta = ${meta};\n${body}`);
  return inspectWorkflowSource({ scriptPath: path }, cwd);
}
function run(id: string, value: number, changes: Partial<CompareRun> = {}): CompareRun {
  const scriptSource = 'export const meta = { name: "x", description: "y" }; return 1;';
  const digest = `sha256:${createHash("sha256").update(scriptSource).digest("hex")}`;
  const d = identityDigest("fixture", {});
  const definition = { kind: "script" as const, id: "fixture.js", schemaVersion: "1", artifactDigest: digest };
  const pinned = { definition, dependencyDigest: d, hostImplementationDigest: d, runtimeArtifactDigest: d, configurationDigest: d, hostAbiDigest: d, providerContractDigest: d };
  const snapshot: InvocationSnapshot = { identity: { logicalInvocationId: id, definition, deploymentDigest: identityDigest("deployment", pinned), subjectBasis: d }, scriptDigest: digest, scriptSource, dependencyDigest: d, hostImplementationDigest: d, hostArtifacts: [], runtimeArtifacts: [], runtimeArtifactDigest: d, configurationDigest: d, hostAbiDigest: d, providerContractDigest: d, dependencyArtifacts: [] };
  const ref = { provider: "forge", type: "operation", id };
  return { snapshot, inputDigest: d, modelDigest: d, toolsDigest: d, environmentDigest: d, cacheDigest: d, nativeRefs: [ref], metrics: [{ name: "elapsed", unit: "ms", value, source: ref, evidenceRefs: [`fixture:${id}`], subjectBasis: d, coverage: "complete", freshness: "current" }], ...changes };
}
afterEach(() => { for (const path of roots.splice(0)) rmSync(path, { recursive: true, force: true }); });
describe("W17 source read-only services", () => {
  it("catalogs saved precedence and byte-exact source with digest/cursor", () => {
    const cwd = root(); for (const dir of [".pi", ".agents"]) mkdirSync(join(cwd, dir, "workflows"), { recursive: true });
    const script = 'export const meta = {name:"primary",description:"d"};\nthrow Error("not run");';
    writeFileSync(join(cwd, ".pi/workflows/a.js"), script); writeFileSync(join(cwd, ".agents/workflows/a.js"), script.replace("primary", "secondary"));
    writeFileSync(join(cwd, ".pi/workflows/b.js"), script); writeFileSync(join(cwd, ".pi/workflows/utils.js"), "throw 1;");
    const page = catalogWorkflows(cwd, { limit: 1 }); expect(page.entries[0].source.source).toBe(script); expect(page.nextCursor).toBeDefined();
    expect(catalogWorkflows(cwd, { limit: 1, cursor: page.nextCursor }).entries[0].name).toBe("b");
    writeFileSync(join(cwd, ".pi/workflows/b.js"), `${script}\n//changed`);
    expect(() => catalogWorkflows(cwd, { cursor: page.nextCursor })).toThrow(/changed/);
    expect(readFileSync(join(cwd, ".pi/workflows/a.js"), "utf8")).toBe(script);
  });
  it("never evaluates executable metadata, getters, spreads or computed expressions", () => {
    for (const meta of ['{name:(()=>{throw Error("EXECUTED")})(),description:"d"}', '{ get name(){ throw Error("EXECUTED"); }, description:"d"}', '{...{name:"x"},description:"d"}', '{ ["name"]:"x", description:"d"}', '{ name:`x$' + '{1}`,description:"d"}']) {
      const result = validateWorkflowSource(source("return 1;", meta)); expect(result.status).toBe("invalid"); expect(result.diagnostics.some(item => item.code === "META_NOT_LITERAL")).toBe(true); expect(result.meta).toBeUndefined();
    }
  });
  it("uses runtime syntax without executing body and retains source locations", () => {
    const snapshot = source('throw Error("never execute");\nawait agent("p"); return 1;');
    const result = validateWorkflowSource(snapshot); expect(result.syntax).toBe("valid"); expect(result.meta?.name).toBe("sample"); expect(result.projection.calls[0].location.line).toBe(3);
    expect(validateWorkflowSource(source("const = ;")).syntax).toBe("invalid");
    expect(validateWorkflowSource(source("const x: number = 1;")).syntax).toBe("invalid");
    expect(validateWorkflowSource({ ...snapshot, source: `${snapshot.source}\n//changed` }).diagnostics[0].code).toBe("SOURCE_DIGEST_MISMATCH");
  });
  it("AST ignores textual decoys, identifies dynamic branches and shadowed/aliased calls", () => {
    const result = validateWorkflowSource(source('const text = "node(\\"fake.id\\")"; // agent("fake")\nconst re = /agent[(]/;\nawait node("forge.gate.status", {root:"."});\nif(args.x) await agent("review");\nfor(const id of args.ids) await node(id, {});\nconst alias = agent; await alias("opaque");\nfunction shadow(agent) { return agent("not primitive"); }'));
    expect(result.projection.calls.map(call => call.primitive)).toEqual(["node", "agent", "node"]);
    expect(result.projection.calls[0].capabilityId).toBe("forge.gate.status"); expect(result.projection.calls[2].capabilityId).toBeUndefined(); expect(result.projection.unknown.length).toBeGreaterThan(2);
    expect(result.projection.edges).toEqual([]); expect(result.projection.kind).toBe("possible-calls");
  });
  it("checks registered input schema and independent grants without invoke", () => {
    const registry = new CapabilityRegistry(); registry.register({ descriptor: { id: "forge.gate.status", version: "1.0.0", description: "fixture", effectClass: "read", inputSchema: { type: "object", properties: { root: {type:"string"} }, required:["root"], additionalProperties:false }, permissions:["forge:inspect"], supportedModes:["invoke"] }, invoke: async () => { throw Error("NEVER INVOKE"); } });
    const grants = ["discover:forge.gate.status", "forge:inspect"];
    expect(validateWorkflowSource(source('await node("forge.gate.status", {root:"."});'), { registry, grants }).status).toBe("valid");
    expect(validateWorkflowSource(source('await node("forge.gate.status", {root:2});'), { registry, grants }).diagnostics.some(d => d.code === "NODE_INPUT_SCHEMA")).toBe(true);
    expect(validateWorkflowSource(source('await node("forge.gate.status", {});'), { registry, grants: ["discover:forge.gate.status"] }).diagnostics.some(d => d.code === "NODE_UNAUTHORIZED")).toBe(true);
    expect(validateWorkflowSource(source('await node("forge.gate.status", args);'), { registry, grants }).status).toBe("uncertain");
  });
});
describe("W17 measured cohorts", () => {
  it("reports descriptive dispersion and provenance, never causal/critical-path claims", () => {
    const result = compareWorkflowRuns([run("a",10),run("b",20)], [run("c",5),run("d",15)]); expect(result.status).toBe("comparable"); expect(result.metrics[0].reference.mean).toBe(15); expect(result.metrics[0].candidate.mean).toBe(10); expect(result.metrics[0].delta).toBe(-5); expect(result.causalClaim).toBe(false); expect(result.criticalPath).toBe("unestablished"); expect(result.metrics[0].evidenceRefs).toContain("fixture:a");
  });
  it.each(["inputDigest", "modelDigest", "toolsDigest", "environmentDigest", "cacheDigest"] as const)("rejects changed %s", field => {
    const result = compareWorkflowRuns([run("a",10)], [run("b",5,{ [field]:identityDigest("different",{}) })]); expect(result.status).toBe("confounded"); expect(result.metrics[0]?.delta).toBeUndefined(); expect(result.diagnostics.some(d => d.code === "COHORT_CONFOUND" && d.dimension === field)).toBe(true);
  });
  it("missing input receipt or environment is unknown not falsely equivalent", () => {
    expect(compareWorkflowRuns([run("a",10,{inputDigest:undefined})], [run("b",5,{inputDigest:undefined})]).status).toBe("unknown");
    expect(compareWorkflowRuns([run("a",10,{environmentDigest:undefined})], [run("b",5)]).status).toBe("unknown");
  });
  it("rejects changed config/basis, mixed cohorts, duplicate invocation and source tamper", () => {
    const baseline = run("a",10); const candidate = run("b",5); const changed = { ...candidate.snapshot, configurationDigest: identityDigest("changed",{}) };
    expect(compareWorkflowRuns([baseline], [run("b",5,{snapshot:changed})]).status).not.toBe("comparable");
    expect(compareWorkflowRuns([baseline], [run("b",5,{snapshot:{ ...candidate.snapshot, identity:{ ...candidate.snapshot.identity,subjectBasis:identityDigest("basis",{}) } }})]).status).toBe("confounded");
    expect(compareWorkflowRuns([baseline,run("x",20,{modelDigest:identityDigest("other",{})})],[candidate]).status).toBe("confounded");
    expect(compareWorkflowRuns([baseline],[baseline]).status).toBe("unknown");
    expect(compareWorkflowRuns([baseline],[run("b",5,{snapshot:{...candidate.snapshot, scriptSource:"changed"}})]).status).toBe("unknown");
  });
  it("partial/stale/unbound/missing metrics never produce a precise delta", () => {
    const base = run("a",10); const cand = run("b",5);
    for (const changes of [{coverage:"partial" as const},{freshness:"stale" as const},{evidenceRefs:[]},{value:Number.NaN},{source:{provider:"forge",type:"operation",id:"unbound"}}]) {
      const result = compareWorkflowRuns([base],[{...cand,metrics:[{...cand.metrics[0],...changes}]}]); expect(result.status).toBe("unknown"); expect(result.metrics[0]?.delta).toBeUndefined();
    }
    expect(compareWorkflowRuns([base],[{...cand,metrics:[]}]).status).toBe("unknown");
    expect(compareWorkflowRuns([],[]).status).toBe("unknown");
  });
});

describe("designer adverse parser and scope", () => {
  it("refuses outside project script paths while supporting saved name precedence", () => {
    const cwd = root(); const outside = source("return 1;");
    expect(() => inspectWorkflowSource({scriptPath:outside.sourceRef},cwd)).toThrow(/scope|outside/);
  });
  it("does not hand executable regex decoys to metadata VM", () => {
    const snapshot = source("return 1;");
    const decoy = '/*\nexport const meta = {name:(()=>{while(true){}})(),description:"decoy"};\n*/\n';
    const bytes = decoy+snapshot.source;
    const result = validateWorkflowSource({...snapshot,source:bytes,definition:{...snapshot.definition,artifactDigest:`sha256:${createHash("sha256").update(bytes).digest("hex")}`}});
    expect(result.meta?.name).toBe("sample"); expect(result.diagnostics).toEqual([]);
  });
  it("does not assume reassigned or caught primitive names are native callsites", () => {
    const result = validateWorkflowSource(source('agent = local; await agent("x");\ntry {throw 1;} catch(node) {node("fake.id",{});}'));
    expect(result.projection.calls).toEqual([]); expect(result.projection.unknown.length).toBeGreaterThan(0);
  });
  it("invalid digest strings and mismatched definition contracts are not comparable", () => {
    expect(compareWorkflowRuns([run("a",10,{inputDigest:"same"})],[run("b",5,{inputDigest:"same"})]).status).toBe("unknown");
    const baseline = run("a",10); const cand = run("b",5); const definition = {...cand.snapshot.identity.definition,schemaVersion:"other"};
    const snapshot = {...cand.snapshot,identity:{...cand.snapshot.identity,definition,deploymentDigest:identityDigest("deployment",{definition,dependencyDigest:cand.snapshot.dependencyDigest,hostImplementationDigest:cand.snapshot.hostImplementationDigest,runtimeArtifactDigest:cand.snapshot.runtimeArtifactDigest,configurationDigest:cand.snapshot.configurationDigest,hostAbiDigest:cand.snapshot.hostAbiDigest,providerContractDigest:cand.snapshot.providerContractDigest})}};
    expect(compareWorkflowRuns([baseline],[{...cand,snapshot}]).status).toBe("confounded");
  });
});

describe("designer bounded source and metric integrity", () => {
  it("bounds catalog requests and rejects invalid names/control characters", () => {
    const cwd = root(); expect(() => catalogWorkflows(cwd,{limit:0})).toThrow(); expect(() => catalogWorkflows(cwd,{filter:"x".repeat(257)})).toThrow(); expect(() => catalogWorkflows(cwd,{cursor:"x".repeat(2049)})).toThrow();
    expect(() => inspectWorkflowSource({name:"../secret"},cwd)).toThrow();
    const snapshot = source("return 1;\u0000"); expect(validateWorkflowSource(snapshot).diagnostics[0].code).toBe("SOURCE_CONTROL_CHARACTERS");
  });
  it("source changes are explicit independent variables, not config confounds", () => {
    const baseline = run("a",10); const cand = run("b",5); const scriptSource = `${cand.snapshot.scriptSource}\n//candidate`;
    const scriptDigest = `sha256:${createHash("sha256").update(scriptSource).digest("hex")}`;
    const definition = {...cand.snapshot.identity.definition,artifactDigest:scriptDigest};
    const snapshot = {...cand.snapshot,scriptSource,scriptDigest,identity:{...cand.snapshot.identity,definition,deploymentDigest:identityDigest("deployment",{definition,dependencyDigest:cand.snapshot.dependencyDigest,hostImplementationDigest:cand.snapshot.hostImplementationDigest,runtimeArtifactDigest:cand.snapshot.runtimeArtifactDigest,configurationDigest:cand.snapshot.configurationDigest,hostAbiDigest:cand.snapshot.hostAbiDigest,providerContractDigest:cand.snapshot.providerContractDigest})}};
    const result = compareWorkflowRuns([baseline],[{...cand,snapshot}]); expect(result.status).toBe("comparable"); expect(result.sourceDigests.reference).not.toEqual(result.sourceDigests.candidate); expect(result.limitations.some(item => item.includes("Single-run"))).toBe(true);
  });
  it("malformed native references and metrics cannot be treated as producer evidence", () => {
    const baseline = run("a",10); const cand = run("b",5); const native = {provider:"",type:"operation",id:"b"};
    expect(compareWorkflowRuns([baseline],[{...cand,nativeRefs:[native],metrics:[{...cand.metrics[0],source:native}]}]).status).toBe("unknown");
    expect(compareWorkflowRuns([baseline],[{...cand,metrics:[{...cand.metrics[0],name:""}]}]).status).toBe("unknown");
  });
  it("round-trips source, validation and comparison through JSON twice", () => {
    const snapshot = source('await agent("x"); return 1;');
    const validation = validateWorkflowSource(snapshot); const result = compareWorkflowRuns([run("a",10)],[run("b",5)]);
    for (const value of [snapshot,validation,result]) expect(JSON.parse(JSON.stringify(JSON.parse(JSON.stringify(value))))).toEqual(value);
  });
});

it("named expression scopes and destructuring mutation are not false host primitives", () => {
  const named = validateWorkflowSource(source('const f = function agent() { return agent("local"); }; f();'));
  expect(named.projection.calls).toEqual([]);
  const mutated = validateWorkflowSource(source('({agent} = args); await agent("not proven");'));
  expect(mutated.projection.calls).toEqual([]);
});

describe("W17 cohort identity and per-metric verdicts (wb-pno)", () => {
  const SECRET = "wb-pno-fixture-private-value";
  const hostile = `UNTRUSTED \u001b[31mred\u001b[0m \u202Eevil\u202C \u2066bidi\u2069 api_key=${SECRET}`;
  type Confound = { field: string; kind: string; reason: string };
  /** Re-pin a receipt after changing snapshot or definition fields so its deployment digest stays internally consistent. */
  function repin(base: CompareRun, snapshotChanges: Partial<InvocationSnapshot> = {}, definitionChanges: Partial<InvocationSnapshot["identity"]["definition"]> = {}, identityChanges: Partial<InvocationSnapshot["identity"]> = {}): CompareRun {
    const merged = { ...base.snapshot, ...snapshotChanges };
    const definition = { ...merged.identity.definition, ...definitionChanges };
    const deploymentDigest = identityDigest("deployment", { definition, dependencyDigest: merged.dependencyDigest, hostImplementationDigest: merged.hostImplementationDigest, runtimeArtifactDigest: merged.runtimeArtifactDigest, configurationDigest: merged.configurationDigest, hostAbiDigest: merged.hostAbiDigest, providerContractDigest: merged.providerContractDigest });
    return { ...base, snapshot: { ...merged, identity: { ...merged.identity, ...identityChanges, definition, deploymentDigest } } };
  }
  function withMetric(base: CompareRun, name: string, unit: string, value: number): CompareRun {
    return { ...base, metrics: [...base.metrics, { name, unit, value, source: base.nativeRefs[0], evidenceRefs: [`fixture:${base.snapshot.identity.logicalInvocationId}:${name}`], subjectBasis: base.snapshot.identity.subjectBasis, coverage: "complete", freshness: "current" }] };
  }
  function measured(id: string, value: number, tokens: number): CompareRun { return withMetric(run(id, value, { workspaceSourceState: "measured" }), "tokens", "count", tokens); }
  const confoundFor = (confounds: Confound[], field: string) => confounds.filter(item => item.field === field);

  it("matched cohort yields measured deltas for every shared metric and states association, not causation", () => {
    const result = compareWorkflowRuns([measured("a", 10, 100), measured("b", 20, 120)], [measured("c", 5, 90), measured("d", 15, 110)]);
    expect(result.status).toBe("comparable"); expect(result.cohort.matched).toBe(true); expect(result.cohort.confounds).toEqual([]);
    expect(result.cohort.basis.length).toBeGreaterThan(10); expect(result.cohort.basis.every(item => item.status === "matched")).toBe(true);
    expect(result.cohort.basis.map(item => item.field)).toEqual(expect.arrayContaining(["definition", "schemaVersion", "definitionDigest", "deploymentDigest", "hostAbiDigest", "configurationDigest", "modelDigest", "subjectBasis", "workspaceSourceState"]));
    expect(result.perMetric).toEqual([{ name: "elapsed", unit: "ms", verdict: "measured", reasons: [] }, { name: "tokens", unit: "count", verdict: "measured", reasons: [] }]);
    expect(result.metrics.find(metric => metric.name === "elapsed")?.delta).toBe(-5); expect(result.metrics.find(metric => metric.name === "tokens")?.delta).toBe(-10);
    expect(result.claim).toBe("association"); expect(result.causalClaim).toBe(false);
    expect(result.limitations.some(item => /association/.test(item) && /not causal/.test(item))).toBe(true);
  });
  it.each(["inputDigest", "modelDigest", "toolsDigest", "environmentDigest", "cacheDigest"] as const)("names a mismatched %s confound and withholds every verdict", field => {
    const result = compareWorkflowRuns([measured("a", 10, 100)], [{ ...measured("b", 5, 90), [field]: identityDigest("different", {}) }]);
    expect(result.status).toBe("confounded"); expect(result.cohort.matched).toBe(false);
    expect(confoundFor(result.cohort.confounds, field)).toEqual([{ field, kind: "mismatched", reason: expect.stringContaining(field) }]);
    expect(result.cohort.basis.find(item => item.field === field)?.status).toBe("mismatched");
    expect(result.perMetric.map(metric => metric.verdict)).toEqual(["unknown", "unknown"]);
    for (const metric of result.perMetric) expect(metric.reasons.some(reason => reason.includes(field))).toBe(true);
    expect(result.metrics.every(metric => metric.delta === undefined)).toBe(true); expect(result.claim).toBe("none");
  });
  it.each(["configurationDigest", "hostAbiDigest", "dependencyDigest", "runtimeArtifactDigest", "hostImplementationDigest", "providerContractDigest"] as const)("names a mismatched pinned %s as a confound even when the deployment digest is re-pinned consistently", field => {
    const result = compareWorkflowRuns([measured("a", 10, 100)], [repin(measured("b", 5, 90), { [field]: identityDigest("changed", {}) })]);
    expect(result.status).toBe("confounded"); expect(result.cohort.matched).toBe(false);
    expect(confoundFor(result.cohort.confounds, field)).toEqual([{ field, kind: "mismatched", reason: expect.stringContaining(field) }]);
    expect(result.cohort.basis.find(item => item.field === "deploymentDigest")?.status).toBe("mismatched");
    expect(result.perMetric.every(metric => metric.verdict === "unknown" && metric.reasons.some(reason => reason.includes(field)))).toBe(true);
    expect(result.metrics.every(metric => metric.delta === undefined)).toBe(true);
  });
  it("names a mismatched subject basis (principal + workspace source) as a confound", () => {
    const result = compareWorkflowRuns([measured("a", 10, 100)], [repin(measured("b", 5, 90), {}, {}, { subjectBasis: identityDigest("other-workspace", {}) })]);
    expect(result.status).toBe("confounded"); expect(confoundFor(result.cohort.confounds, "subjectBasis")[0]?.kind).toBe("mismatched");
    expect(result.perMetric.every(metric => metric.verdict === "unknown")).toBe(true);
  });
  it.each(["inputDigest", "modelDigest", "toolsDigest", "environmentDigest", "cacheDigest"] as const)("an absent %s on either side is unknown with the absence named, never falsely equivalent", field => {
    for (const [reference, candidate] of [[measured("a", 10, 100), { ...measured("b", 5, 90), [field]: undefined }], [{ ...measured("a", 10, 100), [field]: undefined }, { ...measured("b", 5, 90), [field]: undefined }]]) {
      const result = compareWorkflowRuns([reference], [candidate]);
      expect(result.status).toBe("unknown"); expect(result.cohort.matched).toBe(false);
      expect(confoundFor(result.cohort.confounds, field)).toEqual([{ field, kind: "absent", reason: expect.stringContaining(field) }]);
      expect(result.cohort.basis.find(item => item.field === field)?.status).toBe("absent");
      expect(result.perMetric.every(metric => metric.verdict === "unknown" && metric.reasons.some(reason => reason.includes(field)))).toBe(true);
      expect(result.metrics.every(metric => metric.delta === undefined)).toBe(true); expect(result.claim).toBe("none");
    }
  });
  it("an unmeasured workspace source state is a named confound even when subject basis digests coincide", () => {
    for (const [reference, candidate] of [[measured("a", 10, 100), { ...measured("b", 5, 90), workspaceSourceState: "unknown" as const }], [{ ...measured("a", 10, 100), workspaceSourceState: "unknown" as const }, { ...measured("b", 5, 90), workspaceSourceState: "unknown" as const }]]) {
      const result = compareWorkflowRuns([reference], [candidate]);
      expect(result.status).toBe("unknown"); expect(result.cohort.matched).toBe(false);
      expect(result.cohort.basis.find(item => item.field === "subjectBasis")?.status).toBe("matched");
      expect(confoundFor(result.cohort.confounds, "workspaceSourceState")).toEqual([{ field: "workspaceSourceState", kind: "absent", reason: expect.stringMatching(/unmeasured|not established/) }]);
      expect(result.perMetric.every(metric => metric.verdict === "unknown")).toBe(true); expect(result.metrics.every(metric => metric.delta === undefined)).toBe(true);
    }
    const partial = compareWorkflowRuns([measured("a", 10, 100)], [{ ...measured("b", 5, 90), workspaceSourceState: undefined }]);
    expect(partial.status).toBe("unknown"); expect(confoundFor(partial.cohort.confounds, "workspaceSourceState")[0]?.kind).toBe("absent");
    const unsupplied = compareWorkflowRuns([run("a", 10)], [run("b", 5)]);
    expect(unsupplied.status).toBe("comparable"); expect(unsupplied.cohort.matched).toBe(true);
    expect(unsupplied.cohort.basis.some(item => item.field === "workspaceSourceState")).toBe(false);
    expect(unsupplied.limitations.some(item => /workspace source state/i.test(item) && /not supplied/i.test(item))).toBe(true);
  });
  it("refuses cross-schema receipts with an unknown verdict naming both schema versions and never coerces them", () => {
    const reference = repin(measured("a", 10, 100), {}, { schemaVersion: "workflow-script/v1" });
    const detached = repin(measured("b", 5, 90), {}, { schemaVersion: "workflow/v1" });
    const result = compareWorkflowRuns([reference], [detached]);
    expect(result.status).toBe("confounded"); expect(result.cohort.matched).toBe(false);
    const refusal = result.diagnostics.find(item => item.code === "SCHEMA_MISMATCH");
    expect(refusal).toMatchObject({ severity: "error", dimension: "schemaVersion" });
    expect(refusal?.message).toContain("workflow-script/v1"); expect(refusal?.message).toContain("workflow/v1");
    expect(confoundFor(result.cohort.confounds, "schemaVersion")).toEqual([{ field: "schemaVersion", kind: "refused", reason: expect.stringContaining("workflow/v1") }]);
    expect(result.cohort.basis.find(item => item.field === "schemaVersion")?.status).toBe("mismatched");
    expect(result.metrics).toEqual([]);
    expect(result.perMetric.map(metric => metric.verdict)).toEqual(["unknown", "unknown"]);
    expect(result.perMetric.every(metric => metric.reasons.some(reason => /schemaVersion/.test(reason) && /workflow-script\/v1/.test(reason)))).toBe(true);
    expect(result.claim).toBe("none");
    // Same schema on both sides is not refused: the existing definition contract check keeps carrying kind/id.
    expect(compareWorkflowRuns([reference], [repin(measured("b", 5, 90), {}, { schemaVersion: "workflow-script/v1" })]).diagnostics.some(item => item.code === "SCHEMA_MISMATCH")).toBe(false);
  });
  it("a metric absent on one side is unknown for that metric only; shared native metrics still measure", () => {
    const result = compareWorkflowRuns([measured("a", 10, 100), measured("b", 20, 120)], [run("c", 5, { workspaceSourceState: "measured" }), run("d", 15, { workspaceSourceState: "measured" })]);
    expect(result.cohort.matched).toBe(true); expect(result.status).toBe("unknown");
    expect(result.perMetric.find(metric => metric.name === "elapsed")).toEqual({ name: "elapsed", unit: "ms", verdict: "measured", reasons: [] });
    expect(result.metrics.find(metric => metric.name === "elapsed")?.delta).toBe(-5);
    const tokens = result.perMetric.find(metric => metric.name === "tokens");
    expect(tokens?.verdict).toBe("unknown"); expect(tokens?.reasons.some(reason => /candidate/.test(reason) && /absent/.test(reason))).toBe(true);
    expect(result.metrics.some(metric => metric.name === "tokens")).toBe(false); expect(result.claim).toBe("association");
    const mirrored = compareWorkflowRuns([run("a", 10, { workspaceSourceState: "measured" })], [measured("b", 5, 90)]);
    expect(mirrored.perMetric.find(metric => metric.name === "tokens")?.reasons.some(reason => /reference/.test(reason))).toBe(true);
  });
  it("a declared source change is a stated basis field, not a confound", () => {
    const base = measured("b", 5, 90); const scriptSource = `${base.snapshot.scriptSource}\n//candidate`;
    const scriptDigest = `sha256:${createHash("sha256").update(scriptSource).digest("hex")}`;
    const result = compareWorkflowRuns([measured("a", 10, 100)], [repin(base, { scriptSource, scriptDigest }, { artifactDigest: scriptDigest })]);
    expect(result.status).toBe("comparable"); expect(result.cohort.matched).toBe(true);
    expect(result.cohort.basis.find(item => item.field === "definitionDigest")).toMatchObject({ status: "declared-change" });
    expect(result.cohort.basis.find(item => item.field === "deploymentDigest")?.status).toBe("declared-change");
    expect(result.limitations.some(item => /declared/.test(item) && /source/i.test(item))).toBe(true);
    const mixed = compareWorkflowRuns([measured("a", 10, 100), repin(measured("x", 12, 101), { scriptSource, scriptDigest }, { artifactDigest: scriptDigest })], [base]);
    expect(mixed.status).toBe("confounded"); expect(confoundFor(mixed.cohort.confounds, "definitionDigest")[0]).toMatchObject({ kind: "mismatched", reason: expect.stringContaining("reference") });
  });
  it("receipt integrity failures are unverified confounds, never a matched cohort", () => {
    const base = measured("a", 10, 100); const cand = measured("b", 5, 90);
    const tampered = compareWorkflowRuns([base], [{ ...cand, snapshot: { ...cand.snapshot, scriptSource: "changed" } }]);
    expect(tampered.cohort.matched).toBe(false); expect(confoundFor(tampered.cohort.confounds, "scriptDigest")[0]?.kind).toBe("unverified");
    expect(tampered.perMetric.every(metric => metric.verdict === "unknown")).toBe(true);
    const duplicate = compareWorkflowRuns([base], [base]);
    expect(duplicate.cohort.matched).toBe(false); expect(confoundFor(duplicate.cohort.confounds, "logicalInvocationId")[0]?.kind).toBe("unverified");
    const unpinned = compareWorkflowRuns([base], [{ ...cand, snapshot: { ...cand.snapshot, identity: { ...cand.snapshot.identity, deploymentDigest: identityDigest("forged", {}) } } }]);
    expect(confoundFor(unpinned.cohort.confounds, "deploymentDigest")[0]?.kind).toBe("unverified");
    expect(unpinned.cohort.basis.find(item => item.field === "deploymentDigest")?.status).toBe("unverified");
    const empty = compareWorkflowRuns([], []);
    expect(empty.status).toBe("unknown"); expect(empty.cohort.matched).toBe(false); expect(empty.cohort.confounds[0]).toMatchObject({ field: "cohort", kind: "absent" }); expect(empty.perMetric).toEqual([]); expect(empty.claim).toBe("none");
  });
  it("sanitizes hostile producer strings everywhere they can surface in compare output", () => {
    const base = measured("a", 10, 100); const b = measured("b", 5, 90); const hostileUnit = `count ${hostile}`;
    const hostileMetrics: CompareRun = { ...b, metrics: [{ ...b.metrics[0], evidenceRefs: [hostile] }, { ...b.metrics[1], name: hostile, unit: hostileUnit }] };
    // Same schema: metric names, units and evidence references flow into metrics, perMetric and diagnostics.
    const measuredText = JSON.stringify(compareWorkflowRuns([base, withMetric(run("x", 11, { workspaceSourceState: "measured" }), hostile, hostileUnit, 1)], [hostileMetrics]));
    // Refused schema: the producer's schema version and definition id flow into the refusal diagnostic and confound reasons.
    const refused = compareWorkflowRuns([base], [repin(hostileMetrics, {}, { id: hostile, schemaVersion: hostile })]);
    expect(refused.diagnostics.some(item => item.code === "SCHEMA_MISMATCH")).toBe(true); expect(refused.cohort.confounds.some(item => item.field === "definition")).toBe(true);
    for (const text of [measuredText, JSON.stringify(refused)]) {
      expect(text).toContain("UNTRUSTED"); expect(text).toContain("[REDACTED]");
      expect(text).not.toContain(SECRET); expect(text).not.toMatch(/\\u001b|\\u202e|\\u202c|\\u2066|\\u2069/);
      expect(text).not.toMatch(/[\u0000-\u001f\u007f-\u009f\u202a-\u202e\u2066-\u2069]/u);
    }
    const parsed = JSON.parse(measuredText) as WorkflowComparison;
    expect(parsed.metrics.find(metric => metric.name === "elapsed")?.evidenceRefs.some(ref => ref.includes("UNTRUSTED"))).toBe(true);
    expect(parsed.perMetric.some(metric => metric.name.includes("UNTRUSTED") && metric.verdict === "unknown")).toBe(true);
    expect(JSON.parse(JSON.stringify(JSON.parse(JSON.stringify(refused))))).toEqual(refused);
  });
});
