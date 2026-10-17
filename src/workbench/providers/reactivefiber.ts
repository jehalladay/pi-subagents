/** ReactiveFiberCLI context render via installed CLI JSON contract (no TS SDK published). */
import { spawn } from "node:child_process";
import { CapabilityError, type CapabilityRegistry, type JsonValue } from "../capability-registry.js";

export const REACTIVE_FIBER_CLI_SCHEMA = "reactive-fiber.cli/v1";
export const REACTIVEFIBER_RENDER_PREVIEW_CONTRACT = "reactivefiber.render.preview/v1";

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
  return true;
}
const INPUT={type:"object",properties:{model:{type:"string",minLength:1},task:{type:"string",minLength:1}},required:["model","task"],additionalProperties:false};

export function registerReactiveFiberRender(registry:CapabilityRegistry,invoke:()=>Promise<RfEnvelope>,workspaceRoot:string):void {
  registry.register({descriptor:{id:"reactivefiber.render.preview",version:"1.0.0",description:"Preview native RF context with provenance; no authoritative or journal store write (disposable, reconstructible cache-plane writes may occur)",inputSchema:INPUT,effectClass:"read",permissions:["reactivefiber:render"],supportedModes:["invoke"],contractSource:"rf@0.1.583:reactive-fiber.cli/v1 context.render --no-commit"},
    async invoke(_input,context){
      if(context.signal.aborted) throw new CapabilityError("transport","RF preview cancelled before invocation.");
      const source=await invoke();
      if(context.signal.aborted) throw new CapabilityError("transport","RF preview cancelled.");
      return JSON.parse(JSON.stringify({contract:REACTIVEFIBER_RENDER_PREVIEW_CONTRACT,workspaceRoot,source})) as JsonValue;
    }});
}

export async function nativeReactiveFiberPreview(model:string,task:string,workspaceRoot:string,signal?:AbortSignal):Promise<JsonValue> {
  if(signal?.aborted) throw new CapabilityError("transport","RF preview cancelled before launch.");
  const argv=["--workspace",workspaceRoot,"context","render","--model",model,"--task",task,"--no-commit","--no-input","--json"];
  const child=spawn("rf",argv,{stdio:["ignore","pipe","pipe"]});
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
  registry.register({descriptor:{id:"reactivefiber.render.preview",version:"1.0.0",description:"RF noncommitted context with native provenance; no authoritative or journal store write (disposable, reconstructible cache-plane writes may occur)",inputSchema:INPUT,effectClass:"read",permissions:["reactivefiber:render"],supportedModes:["invoke"],contractSource:"rf@0.1.583:reactive-fiber.cli/v1 context.render --no-commit"},
    invoke:async(input,ctx)=>nativeReactiveFiberPreview((input as {model:string}).model,(input as {task:string}).task,workspaceRoot,ctx.signal)});
}
