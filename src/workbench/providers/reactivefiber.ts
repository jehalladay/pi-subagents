/** ReactiveFiberCLI context render via installed CLI JSON contract (no TS SDK published). */
import { spawn } from "node:child_process";
import { CapabilityError, type CapabilityRegistry, type JsonValue } from "../capability-registry.js";
import { RF_CHILD_ENV_ALLOWLIST, scrubbedEnvironment } from "../process-env.js";

export const REACTIVE_FIBER_CLI_SCHEMA = "reactive-fiber.cli/v1";
export const REACTIVEFIBER_RENDER_PREVIEW_CONTRACT = "reactivefiber.render.preview/v1";
/**
 * The single rf contractSource carrier (program rfcli-performance-mathematical-optimization R2, wb-2j3.12): the
 * `rf@<release>` prefix states the producer release MEASURED by the R8 live receipt, never a hand-maintained literal.
 * Receipt of record: `forge run rf-preview` forge cmd_c8fa1da3d9c4 on 2026-10-17 against the installed rf
 * (RF_PREVIEW_RECEIPT cli_version "0.1.723"; docs/workbench/receipts/wb-2j3.7.md). Re-pin only from a newer stamped
 * receipt row; both registered reactivefiber.render.preview descriptors consume this constant by identifier.
 */
export const REACTIVE_FIBER_CONTRACT_SOURCE = "rf@0.1.723:reactive-fiber.cli/v1 context.render --no-commit";

interface RfEnvelope {
  schema: string; ok: boolean; command: string; operation_id: string;
  workspace: { id: string; root: string }; transaction_id: null;
  result: JsonValue; diagnostics: readonly JsonValue[];
}
const RF_KEYS=["schema","ok","command","operation_id","workspace","transaction_id","result","diagnostics"];
const RF_ID=/^rfo_[0-9a-z]{22,32}$/;
const WORKSPACE_ID=/^rfw_[0-9a-z]{22,32}$/;
const SHA256=/^sha256:[0-9a-f]{64}$/;
function record(value: unknown): value is Record<string, JsonValue> {
  return value!==null && typeof value==="object" && !Array.isArray(value);
}
function nonnegativeInteger(value: unknown): boolean {
  return typeof value==="number" && Number.isSafeInteger(value) && value>=0;
}
function isRfDiagnostic(value: unknown): value is Record<string, JsonValue> {
  return record(value) && Object.keys(value).length===6 &&
    ["code","severity","message","hint","source","metadata"].every(key=>Object.hasOwn(value,key)) &&
    typeof value.code==="string" && /^[A-Z][A-Z0-9_]+$/.test(value.code) &&
    ["info","warning","error"].includes(String(value.severity)) &&
    typeof value.message==="string" &&
    (value.hint===null || typeof value.hint==="string") &&
    (value.source===null || typeof value.source==="string") && record(value.metadata);
}
/** wb-973.9 (SCG-R9): a stated result.observations is a list of rows, each an object stating a string status, a string freshness
 * and a boolean replayed. The observer reads those values, refuses the pinned contradictions and demotes; a pre-observations rf
 * states no list at all. */
function isObservationRows(value: JsonValue): boolean {
  return Array.isArray(value) && value.every(row=>record(row) && typeof row.status==="string" &&
    typeof row.freshness==="string" && typeof row.replayed==="boolean");
}
function isRfEnvelope(source: unknown): source is Record<string, JsonValue> {
  return record(source) && Object.keys(source).length===RF_KEYS.length &&
    RF_KEYS.every(key=>Object.hasOwn(source,key)) &&
    source.schema===REACTIVE_FIBER_CLI_SCHEMA && source.command==="context.render" &&
    typeof source.ok==="boolean" && typeof source.operation_id==="string" &&
    RF_ID.test(source.operation_id) &&
    (source.workspace===null || (record(source.workspace) &&
      Object.keys(source.workspace).length===2 &&
      typeof source.workspace.id==="string" && WORKSPACE_ID.test(source.workspace.id) &&
      typeof source.workspace.root==="string" && source.workspace.root.length>0)) &&
    Array.isArray(source.diagnostics) && source.diagnostics.every(isRfDiagnostic);
}
function isPreviewEnvelope(source: unknown, exit: number|null, workspaceRoot: string): source is RfEnvelope {
  if (!isRfEnvelope(source) || source.ok!==true || exit!==0 ||
      source.workspace===null || !record(source.workspace) ||
      source.workspace.root!==workspaceRoot || source.transaction_id!==null) return false;
  const result=source.result;
  const budget=record(result) ? result.budget : null;
  const formula=record(budget) ? budget.formula_terms : null;
  const work=record(result) ? result.work : null;
  if (!record(result) || result.ephemeral!==true || result.render_id!==null ||
      (Object.hasOwn(result,"commit_seq") && result.commit_seq!==null) ||
      !record(result.output) || typeof result.output.text!=="string" ||
      !record(result.provenance) || typeof result.provenance.graph_revision_id!=="string" ||
      !SHA256.test(result.provenance.graph_revision_id) ||
      !record(budget) || !record(formula) ||
      !["context_window","output_reserve","occupied_tokens","overhead","safety_margin"].every(key=>nonnegativeInteger(formula[key])) ||
      !Number.isSafeInteger(formula.available_context_tokens) ||
      !record(result.diagnostics_summary) ||
      !nonnegativeInteger(result.diagnostics_summary.errors) || !nonnegativeInteger(result.diagnostics_summary.warnings) ||
      typeof result.diagnostics_summary.has_errors!=="boolean" ||
      typeof result.diagnostics_summary.has_warnings!=="boolean" ||
      !record(work) || Object.keys(work).length!==6 || work.storage_write_count!==0 ||
      !["source_capture_count","fiber_signal_count","component_render_count","lens_resolution_count","necessity_eval_count","storage_write_count"].every(key=>nonnegativeInteger(work[key]))) return false;
  // wb-693.4: engine_metrics rides committed and ephemeral forms alike and is closed to the two TSX counters; a pre-TSX rf states none.
  if (Object.hasOwn(result,"engine_metrics")) {
    const metrics=result.engine_metrics;
    if (!record(metrics) || Object.keys(metrics).length!==2 ||
        !["tsx_worker_spawns","tsx_resource_rounds"].every(key=>Object.hasOwn(metrics,key) && nonnegativeInteger(metrics[key]))) return false;
  }
  if (Object.hasOwn(result,"observations") && !isObservationRows(result.observations)) return false;
  return true;
}
const LEGACY_INPUT={type:"object",properties:{model:{type:"string",minLength:1},task:{type:"string",minLength:1}},required:["model","task"],additionalProperties:false};
const VIEW_INPUT={type:"object",properties:{view:{type:"string",minLength:1},taskId:{type:"string",minLength:1},model:{type:"string",minLength:1}},required:["view","taskId"],additionalProperties:false};
/** Exactly one arm admits an input (wb-973.1 SCG-R1): the legacy {model, task} preview or the served view render; the
 * registry refuses every mixed shape at input validation, before a provider (and so an rf process) ever runs. */
const INPUT={type:"object",oneOf:[LEGACY_INPUT,VIEW_INPUT]};

/** The two input arms the descriptor admits, as the provider receives them. */
export type ReactiveFiberRenderSelector=
  | {readonly model:string;readonly task:string}
  | {readonly view:string;readonly taskId:string;readonly model?:string};

/** The spawned argv. The legacy arm is the measured rf@0.1.583 form byte for byte; the view arm is the served
 * `--view V --task-id T` render with `--model M` (optional only under --view) after --task-id (wb-973.3 SCG-R3). Every
 * form ends with --no-commit --no-input --json and adds no selector the pinned build parses but does not serve. */
function renderArgv(selector:ReactiveFiberRenderSelector,workspaceRoot:string):string[] {
  const select="view" in selector
    ? ["--view",selector.view,"--task-id",selector.taskId,...(selector.model===undefined?[]:["--model",selector.model])]
    : ["--model",selector.model,"--task",selector.task];
  return ["--workspace",workspaceRoot,"context","render",...select,"--no-commit","--no-input","--json"];
}

export function registerReactiveFiberRender(registry:CapabilityRegistry,invoke:()=>Promise<RfEnvelope>,workspaceRoot:string):void {
  registry.register({descriptor:{id:"reactivefiber.render.preview",version:"1.0.0",description:"Preview native RF context with provenance; no authoritative or journal store write (disposable, reconstructible cache-plane writes may occur)",inputSchema:INPUT,effectClass:"read",permissions:["reactivefiber:render"],supportedModes:["invoke"],contractSource:REACTIVE_FIBER_CONTRACT_SOURCE},
    async invoke(_input,context){
      if(context.signal.aborted) throw new CapabilityError("transport","RF preview cancelled before invocation.");
      const source=await invoke();
      if(context.signal.aborted) throw new CapabilityError("transport","RF preview cancelled.");
      return JSON.parse(JSON.stringify({contract:REACTIVEFIBER_RENDER_PREVIEW_CONTRACT,workspaceRoot,source})) as JsonValue;
    }});
}

export async function nativeReactiveFiberPreview(model:string,task:string,workspaceRoot:string,signal?:AbortSignal):Promise<JsonValue> {
  return nativeReactiveFiberRender({model,task},workspaceRoot,signal);
}

/** One noncommitted rf render for either input arm; the reading and its envelope checks are the same for both. */
export async function nativeReactiveFiberRender(selector:ReactiveFiberRenderSelector,workspaceRoot:string,signal?:AbortSignal):Promise<JsonValue> {
  if(signal?.aborted) throw new CapabilityError("transport","RF preview cancelled before launch.");
  const argv=renderArgv(selector,workspaceRoot);
  // wb-2j3.11: an allowlist-only environment (src/workbench/process-env.ts), built from process.env at each launch. No
  // RF_* variable reaches the child, so a process-scoped selector such as RF_PERF_BASELINE can never pick the preview's
  // perf seam, and the argv's --workspace is the only workspace the child is told.
  const child=spawn("rf",argv,{stdio:["ignore","pipe","pipe"],env:scrubbedEnvironment(process.env,RF_CHILD_ENV_ALLOWLIST)});
  const MAX_BYTES=256*1024;
  const chunks:Buffer[]=[];
  let stdoutBytes=0;
  let stderrBytes=0;
  let stopReason:"deadline"|"stdout"|"stderr"|null=null;
  let escalation:NodeJS.Timeout|undefined;
  let settled=false;
  const stop=(reason:"deadline"|"stdout"|"stderr"|null)=>{
    if(reason!==null && stopReason===null) stopReason=reason;
    if(settled||child.exitCode!==null||child.signalCode!==null) return;
    child.kill("SIGTERM");
    escalation??=setTimeout(()=>{
      if(child.exitCode===null&&child.signalCode===null) child.kill("SIGKILL");
    },500);
  };
  const onAbort=()=>stop(null);
  signal?.addEventListener("abort",onAbort,{once:true});
  const timer=setTimeout(()=>stop("deadline"),60_000);
  try {
    if(signal?.aborted) stop(null);
    const exit=await new Promise<number|null>((resolve,reject)=>{
      child.stdout.on("data",(chunk:Buffer)=>{
        stdoutBytes+=chunk.length;
        if(stdoutBytes>MAX_BYTES) stop("stdout");
        else chunks.push(chunk);
      });
      child.stderr.on("data",(chunk:Buffer)=>{
        stderrBytes+=chunk.length;
        if(stderrBytes>MAX_BYTES) stop("stderr");
      });
      child.once("error",()=>{settled=true;reject(new CapabilityError("transport","RF preview could not launch the installed binary."))});
      child.once("close",code=>{settled=true;resolve(code)});
    });
    if(signal?.aborted) throw new CapabilityError("transport","RF preview cancelled.");
    if(stopReason==="deadline") throw new CapabilityError("transport","RF preview exceeded the execution deadline.");
    if(stopReason!==null) throw new CapabilityError("transport",`RF preview exceeded the bounded ${stopReason} output size.`);
    let source: unknown;
    try { source=JSON.parse(Buffer.concat(chunks).toString("utf8")) as unknown; }
    catch { throw new CapabilityError("transport","RF preview returned malformed JSON."); }
    if (!isRfEnvelope(source)) throw new CapabilityError("transport","RF preview returned an unrecognized native envelope.");
    if (!source.ok) {
      const primary=Array.isArray(source.diagnostics) ? source.diagnostics[0] : undefined;
      if (!isRfDiagnostic(primary) || primary.severity!=="error" ||
          typeof primary.code!=="string" || !/^RF_[A-Z0-9_]+$/.test(primary.code) ||
          source.result!==null || exit===0) {
        throw new CapabilityError("transport","RF preview returned an unrecognized or contradictory failure envelope.");
      }
      throw new CapabilityError("unavailable",`RF render refused: ${primary.code}`);
    }
    if(!isPreviewEnvelope(source,exit,workspaceRoot)) throw new CapabilityError("transport","RF preview returned an unrecognized or contradictory envelope.");
    if(signal?.aborted) throw new CapabilityError("transport","RF preview cancelled.");
    return JSON.parse(JSON.stringify({contract:REACTIVEFIBER_RENDER_PREVIEW_CONTRACT,workspaceRoot,source})) as JsonValue;
  }finally{
    clearTimeout(timer);
    if(escalation) clearTimeout(escalation);
    signal?.removeEventListener("abort",onAbort);
    if(!settled) stop(null);
  }
}

export function registerNativeReactiveFiberRender(registry:CapabilityRegistry,workspaceRoot:string):void {
  registry.register({descriptor:{id:"reactivefiber.render.preview",version:"1.0.0",description:"RF noncommitted context with native provenance; no authoritative or journal store write (disposable, reconstructible cache-plane writes may occur)",inputSchema:INPUT,effectClass:"read",permissions:["reactivefiber:render"],supportedModes:["invoke"],contractSource:REACTIVE_FIBER_CONTRACT_SOURCE},
    invoke:async(input,ctx)=>nativeReactiveFiberRender(input as ReactiveFiberRenderSelector,workspaceRoot,ctx.signal)});
}
