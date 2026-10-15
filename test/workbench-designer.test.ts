import { createHash } from "node:crypto";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { CapabilityRegistry } from "../src/workbench/capability-registry.js";
import { type CompareRun, catalogWorkflows, compareWorkflowRuns, inspectWorkflowSource, validateWorkflowSource, type WorkflowSource } from "../src/workbench/designer.js";
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
