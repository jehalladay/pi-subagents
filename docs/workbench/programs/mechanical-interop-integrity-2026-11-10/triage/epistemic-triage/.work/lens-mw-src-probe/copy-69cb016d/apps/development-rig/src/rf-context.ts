/** Task-grounded RF render adapter: no generic prompt fallback. */
import { execFile } from "node:child_process";
import { createHash, randomUUID } from "node:crypto";
import { existsSync } from "node:fs";
import { promisify } from "node:util";
import type { CompiledContext } from "@mechanical/workflows-development";
import { rfExecutable } from "./rf-binary.js";
import { classifyRenderPressure, observeRenderWorkload } from "./rf-workload.js";
import type { PressureClass, RenderWorkloadObservation } from "./rf-workload.js";
const exec = promisify(execFile);
interface Result {
  readonly stdout: string; readonly stderr: string; readonly exitCode: number;
  /** Set when rf produced no usable reply (timeout, maxBuffer, signal kill, other spawn failure): the render may have committed. */
  readonly transport?: string;
}
export type RfExecutor = (argv: readonly string[], cwd: string) => Promise<Result> | Result;
export interface RfContext extends CompiledContext {
  readonly model: string;
  readonly availableTokens: number;
  readonly graphRevision: string;
  readonly outputDigest: string;
  /** The rf --idempotency-key this render ran under; present on a projection renderTaskContext rendered, absent on a reused one (no render was issued). */
  readonly idempotencyKey?: string;
  /** reused: a recorded render chosen from rf context history/explain and read back by context show; rendered: this call committed a fresh render. */
  readonly source?: "reused" | "rendered";
  /** The rf session (rfs_) the render belongs to: scopes later history lookups; the handoff carries it with the render id. */
  readonly sessionId?: string;
  /** Recorded-render candidates the history lookup rejected, each with the reason (digest, model, status, replayability). */
  readonly skippedCandidates?: readonly {readonly renderId:string;readonly reason:string}[];
  /** committed: this call's attempt created the render; replayed: rf answered from an earlier commit under the same key. */
  readonly acknowledgement?: "committed" | "replayed";
  /** result.replay_of_operation_id from a replayed reply: the operation that first committed the render. */
  readonly replayOfOperationId?: string;
  /** RFCA-MWX04-R002: the live workload (wall_ms, attempts, superseded ids, commit_seq) read from this call's render envelope, "unknown" where absent; absent on a reused render because none was issued. Observed, not regulated. */
  readonly workload?: RenderWorkloadObservation;
  /** The native RF workspace identity (result.workspace_id, rfw_...), distinct from the filesystem root in basis.workspaceId. */
  readonly rfWorkspaceId: string;
  /** The actor RF recorded for the render (result.actor), kept apart from any Beads identity. */
  readonly actor: string;
  /** The rf CLI that produced the render: rf --json --version through the same executor for a fresh render, the recorded cli_version/sdk_versions for a reused one. */
  readonly cli: { readonly version: string; readonly sdkVersions: Readonly<Record<string, string>> };
}
export interface RenderOptions {
  /** One caller-visible key per logical render request; minted per call when absent. */
  readonly idempotencyKey?: string;
  /** Re-issues under the SAME key after a transport failure (default 1; 0 surfaces the first one). */
  readonly maxReissues?: number;
  /** Explicit RF actor passed as --actor; absent falls back to a documented RF_ACTOR pass-through, never an invented value. */
  readonly actor?: string;
  /** rf session id (rfs_) the handoff carries: scopes the history lookup and the fresh render. Absent: no lookup, the render mints its own session. */
  readonly sessionId?: string;
  /** Explicit rf context history --limit (1..500, default 50); one page, never paginated. */
  readonly historyLimit?: number;
}
/** What a worker handoff carries instead of rendered text: ids a receiving step resolves through rf context show. */
export interface RenderHandoff { readonly renderId:string; readonly sessionId?:string }
/** rf could not be started at all (no such executable): distinct from any producer refusal, and never a simulated render. */
export class RfUnavailableError extends Error {
  readonly code="RF_UNAVAILABLE";
  constructor(readonly executable:string, readonly cause_code:string) {
    super("RF_UNAVAILABLE: rf executable "+JSON.stringify(executable)+" cannot be started ("+cause_code+"); no render was simulated");
    this.name="RfUnavailableError";
  }
}
/** The producer ran and refused: carries the real exit code and, when its stdout held a refusal envelope, the first diagnostics code. */
export class RfRenderRefusal extends Error {
  readonly code="RF_RENDER_UNESTABLISHED";
  constructor(message:string, readonly exitCode:number, readonly diagnosticCode?:string, /** Pressure class by diagnostic code, never by message text: exit 4 carries both the lock timeout and the currentness conflict. */ readonly pressure:PressureClass="unclassified") { super(message); this.name="RfRenderRefusal"; }
}
/** rf was started but its reply never arrived intact: the render MAY have committed, so the only safe continuation is a re-issue under the same key. */
export class RfTransportUnacknowledged extends Error {
  readonly code="RF_TRANSPORT_UNACKNOWLEDGED";
  constructor(readonly idempotencyKey:string, readonly transport:string, readonly attempts:number) {
    super("RF_TRANSPORT_UNACKNOWLEDGED: rf reply lost ("+transport+") after "+String(attempts)+" attempt(s); the render may have committed under idempotency key "+JSON.stringify(idempotencyKey)+"; re-issue only under that same key");
    this.name="RfTransportUnacknowledged";
  }
}
const defaultExec: RfExecutor = async (argv,cwd) => {
  const file=rfExecutable();
  try {
    const {stdout,stderr} = await exec(file,[...argv],{cwd,encoding:"utf8",timeout:120_000,maxBuffer:8*1024*1024});
    return {stdout,stderr,exitCode:0};
  } catch(error) {
    const failure=error as {code?:unknown;stdout?:unknown;stderr?:unknown;message?:unknown};
    // spawn reports ENOENT for a missing working directory too: only a present cwd makes ENOENT mean "no such rf".
    if ((failure.code === "ENOENT" && existsSync(cwd)) || failure.code === "EACCES") throw new RfUnavailableError(file,failure.code);
    // A nonzero exit keeps the producer's stdout (its refusal envelope) and real exit code.
    if (typeof failure.code === "number")
      return {stdout:typeof failure.stdout === "string" ? failure.stdout : "",stderr:typeof failure.stderr === "string" ? failure.stderr : "",exitCode:failure.code};
    // A missing working directory never started rf: nothing committed, so it is a refusal, not a lost reply.
    if (failure.code === "ENOENT") return {stdout:"",stderr:error instanceof Error ? error.message : String(error),exitCode:1};
    // No exit status and no envelope (timeout kill, maxBuffer, signal, other spawn failure): a lost reply, not a refusal.
    const reason=typeof failure.code === "string" && failure.code !== "" ? failure.code : "killed";
    return {stdout:"",stderr:error instanceof Error ? error.message : String(error),exitCode:1,transport:reason};
  }
};
function refusal(result:Result): RfRenderRefusal {
  let diagnosticCode:string|undefined, diagnosticList:readonly unknown[]=[];
  try {
    const diagnostics=object(JSON.parse(result.stdout))?.["diagnostics"];
    if (Array.isArray(diagnostics)) diagnosticList=diagnostics;
    const first=Array.isArray(diagnostics) ? object(diagnostics[0]) : null;
    if (typeof first?.["code"] === "string" && first["code"] !== "") diagnosticCode=first["code"];
  } catch { /* stdout was not a JSON envelope: the exit code alone describes the refusal */ }
  const detail=result.stderr !== "" ? result.stderr
    : diagnosticCode !== undefined ? diagnosticCode+" (exit "+String(result.exitCode)+")"
    : "rf exited "+String(result.exitCode);
  const pressure=Number.isInteger(result.exitCode) && result.exitCode >= 0 ? classifyRenderPressure(result.exitCode,diagnosticList).pressure : "unclassified";
  return new RfRenderRefusal("RF_RENDER_UNESTABLISHED: "+detail,result.exitCode,diagnosticCode,pressure);
}
function object(v:unknown): Record<string,unknown> | null {
  return v !== null && typeof v === "object" && !Array.isArray(v) ? v as Record<string,unknown> : null;
}
const DEFAULT_HISTORY_LIMIT=50, MAX_HISTORY_LIMIT=500;
const sha256Of=(text:string)=>"sha256:"+createHash("sha256").update(text,"utf8").digest("hex");
function parseEnvelope(result:Result, what:string): Record<string,unknown> {
  let document:unknown;
  try {document=JSON.parse(result.stdout)} catch {throw new Error("RF_RENDER_UNESTABLISHED: malformed JSON envelope"+(what === "render" ? "" : " from "+what))}
  const envelope=object(document), value=object(envelope?.["result"]);
  if (envelope?.["ok"] !== true || envelope["schema"] !== "reactive-fiber.cli/v1" || !value)
    throw new Error("RF_RENDER_UNESTABLISHED: producer returned no successful "+what);
  return value;
}
/** The graph revision lives at result.provenance on a render envelope and at result.record on a show envelope (the show result keeps the whole record). */
function graphRevisionOf(value:Record<string,unknown>, form:"render"|"show"): unknown {
  return object(value[form === "render" ? "provenance" : "record"])?.["graph_revision_id"];
}
/** The one grounding predicate: a render envelope and a show envelope both pass through it unchanged. */
function ground(value:Record<string,unknown>, form:"render"|"show", workspaceRoot:string, task:string, sourceRevision:string, model:string): Omit<RfContext,"idempotencyKey"|"acknowledgement"|"replayOfOperationId"|"source"|"skippedCandidates"|"workload"|"cli"> {
  const output=object(value["output"]), budget=object(value["budget"]), terms=object(budget?.["formula_terms"]),
    capabilities=object(budget?.["capability_snapshot"]);
  const rfWorkspaceId=value["workspace_id"], actor=value["actor"];
  const text=output?.["text"], renderId=value["render_id"], graph=graphRevisionOf(value,form),
    digest=output?.["digest"], available=terms?.["available_context_tokens"], session=value["session_id"];
  if (typeof text !== "string" || !text.trim() || !text.includes(task) || !text.includes(sourceRevision) ||
      /\bhas no content yet\b/i.test(text) ||
      typeof renderId !== "string" || !renderId.trim() ||
      typeof digest !== "string" || !/^sha256:[a-f0-9]{64}$/.test(digest) ||
      typeof graph !== "string" || !graph.trim() ||
      capabilities?.["model_id"] !== model || capabilities?.["verified"] !== true ||
      typeof available !== "number" || !Number.isFinite(available) || available < 0)
    throw new Error("RF_CONTEXT_UNESTABLISHED: missing task-grounded content, native evidence or model budget");
  if (typeof rfWorkspaceId !== "string" || !rfWorkspaceId.startsWith("rfw_") || typeof actor !== "string" || !actor.trim())
    throw new Error("RF_CONTEXT_UNESTABLISHED: missing RF workspace id or actor identity");
  return {basis:{workspaceId:workspaceRoot,revision:sourceRevision},text,
    evidence:{system:"reactive-fiber",kind:"render",id:renderId},
    model,availableTokens:available,graphRevision:graph,outputDigest:digest,rfWorkspaceId,actor,
    ...(typeof session === "string" && session.trim() ? {sessionId:session} : {})};
}
/** A read-only rf call (history, explain, show): a lost reply surfaces as the transport class, a nonzero exit as a refusal. */
async function readOnly(execute:RfExecutor, argv:readonly string[], cwd:string, key:string): Promise<Result> {
  const result=await execute(argv,cwd);
  if (result.transport !== undefined) throw new RfTransportUnacknowledged(key,result.transport,1);
  return result;
}
/** The CLI a recorded render came from: the show record keeps cli_version and sdk_versions, so a reuse needs no second rf call. */
function recordedCli(value:Record<string,unknown>): RfContext["cli"] {
  const record=object(value["record"]), sdk=object(record?.["sdk_versions"]), version=record?.["cli_version"];
  const refused=new Error("RF_CONTEXT_UNESTABLISHED: recorded render carries no rf CLI version provenance");
  if (typeof version !== "string" || !version.trim() || !sdk) throw refused;
  // A real show record holds {contract_fingerprint, distribution_version} objects beside string values; keep the version string of each.
  const sdkVersions:Record<string,string>={};
  for (const [name,entry] of Object.entries(sdk)) {
    const projected=typeof entry === "string" ? entry : object(entry)?.["distribution_version"];
    if (typeof projected !== "string" || (typeof entry !== "string" && !projected.trim())) throw refused;
    sdkVersions[name]=projected;
  }
  return {version,sdkVersions};
}
/** rf --json --version through the same executor that rendered, so a fixture executor never proves a real CLI version. */
async function cliProvenance(execute:RfExecutor,cwd:string): Promise<RfContext["cli"]> {
  const unavailable=new Error("RF_CONTEXT_UNESTABLISHED: rf CLI version provenance unavailable");
  const result=await execute(["--json","--version"],cwd);
  if (result.exitCode !== 0) throw unavailable;
  let document:unknown;
  try {document=JSON.parse(result.stdout)} catch {throw unavailable}
  const envelope=object(document), value=object(envelope?.["result"]), sdk=object(value?.["sdk_versions"]);
  if (envelope?.["ok"] !== true || envelope["schema"] !== "reactive-fiber.cli/v1" || envelope["command"] !== "version" ||
      !value || typeof value["version"] !== "string" || !value["version"].trim() || !sdk ||
      !Object.values(sdk).every(v=>typeof v === "string"))
    throw unavailable;
  return {version:value["version"],sdkVersions:sdk as Record<string,string>};
}
async function showRecorded(execute:RfExecutor, workspaceRoot:string, renderId:string, key:string): Promise<Record<string,unknown>> {
  const shown=await readOnly(execute,["context","show",renderId,"--workspace",workspaceRoot,"--json"],workspaceRoot,key);
  if (shown.exitCode !== 0) throw refusal(shown);
  return parseEnvelope(shown,"show");
}
/**
 * Resolve a handoff's render id through rf context show and re-run the grounding checks against the task and
 * revision the receiving step holds: carried text is never the thing a second worker trusts.
 */
export async function resolveRenderHandoff(
  workspaceRoot:string, handoff:RenderHandoff, task:string, sourceRevision:string, model:string, execute:RfExecutor=defaultExec,
): Promise<RfContext> {
  if (![workspaceRoot,task,sourceRevision,model,handoff?.renderId].every(x=>typeof x === "string" && !!x.trim()))
    throw new Error("RF_CONTEXT_INPUT_INVALID: root, task, revision, model and render id required");
  const value=await showRecorded(execute,workspaceRoot,handoff.renderId,"handoff");
  const grounded=ground(value,"show",workspaceRoot,task,sourceRevision,model);
  if (grounded.evidence?.id !== handoff.renderId) throw new Error("RF_CONTEXT_UNESTABLISHED: shown render id differs from the handoff render id");
  return {...grounded,cli:recordedCli(value),source:"reused"};
}
/** One history page, at most one explain per remaining candidate, first digest-exact match wins. */
async function lookupRecordedRender(
  execute:RfExecutor, workspaceRoot:string, sourceText:string, model:string, sessionId:string, limit:number, key:string,
): Promise<{renderId?:string;skipped:{renderId:string;reason:string}[]}> {
  const skipped:{renderId:string;reason:string}[]=[];
  const history=await readOnly(execute,["context","history","--workspace",workspaceRoot,"--session",sessionId,"--limit",String(limit),"--json"],workspaceRoot,key);
  // exit 3 is rf's "workspace/entity not found": no record to reuse, a fresh render is safe.
  if (history.exitCode === 3) return {skipped};
  if (history.exitCode !== 0) throw refusal(history);
  const listed=parseEnvelope(history,"history")["items"];
  if (!Array.isArray(listed)) throw new Error("RF_RENDER_UNESTABLISHED: history envelope carried no items list");
  const rows:readonly unknown[]=listed;
  const expected=sha256Of(sourceText);
  for (const raw of rows) {
    const row=object(raw), renderId=row?.["render_id"];
    if (typeof renderId !== "string" || !renderId.trim()) continue;
    const skip=(reason:string)=>{skipped.push({renderId,reason})};
    if (row?.["status"] !== "success" && row?.["status"] !== "committed") {skip("status-not-committed");continue}
    if (row["requested_model_id"] !== model) {skip("model-mismatch");continue}
    if (row["replayability"] !== "replayable_exact") {skip("replayability-not-exact");continue}
    const explained=await readOnly(execute,["context","explain",renderId,"--workspace",workspaceRoot,"--json"],workspaceRoot,key);
    if (explained.exitCode === 3) {skip("explain-not-found");continue}
    if (explained.exitCode !== 0) throw refusal(explained);
    const detail=parseEnvelope(explained,"explain");
    if (object(detail["judge_context"])?.["task_digest"] !== expected) {skip("task-digest-mismatch");continue}
    if (object(object(detail["report"])?.["trace_completeness"])?.["replayability"] !== "replayable_exact") {skip("explain-replayability-not-exact");continue}
    return {renderId,skipped};
  }
  return {skipped};
}
export async function renderTaskContext(
  workspaceRoot:string, task:string, sourceRevision:string, model:string,
  execute:RfExecutor=defaultExec, options:RenderOptions={},
): Promise<RfContext> {
  if (![workspaceRoot,task,sourceRevision,model].every(x=>typeof x === "string" && !!x.trim()))
    throw new Error("RF_CONTEXT_INPUT_INVALID: root, task, revision and model required");
  const sessionId=options.sessionId, limit=options.historyLimit ?? DEFAULT_HISTORY_LIMIT;
  if (sessionId !== undefined && (typeof sessionId !== "string" || !sessionId.trim()))
    throw new Error("RF_CONTEXT_INPUT_INVALID: session id must be nonblank when supplied");
  if (!Number.isInteger(limit) || limit < 1 || limit > MAX_HISTORY_LIMIT)
    throw new Error("RF_CONTEXT_INPUT_INVALID: history limit must be an integer from 1 to "+String(MAX_HISTORY_LIMIT));
  // RF's task provider is the component's source. Include the Git basis in
  // that source text so a committed render can be bound to the requested
  // revision, not merely to an unrendered --set argument.
  const envActor=process.env["RF_ACTOR"];
  const requestedActor=options.actor ?? (envActor !== undefined && envActor.trim() !== "" ? envActor : undefined);
  if (requestedActor !== undefined && !requestedActor.trim())
    throw new Error("RF_CONTEXT_INPUT_INVALID: actor must be nonblank when supplied");
  const sourceText=`Task: ${task}\nSource revision: ${sourceRevision}`;
  const key=options.idempotencyKey ?? randomUUID(), reissues=options.maxReissues ?? 1;
  if (typeof key !== "string" || !key.trim() || !Number.isInteger(reissues) || reissues < 0)
    throw new Error("RF_CONTEXT_INPUT_INVALID: idempotency key must be nonblank and maxReissues a non-negative integer");
  let skippedCandidates:readonly {renderId:string;reason:string}[]=[];
  if (sessionId !== undefined) {
    const found=await lookupRecordedRender(execute,workspaceRoot,sourceText,model,sessionId,limit,key);
    skippedCandidates=found.skipped;
    if (found.renderId !== undefined) {
      const value=await showRecorded(execute,workspaceRoot,found.renderId,key);
      const grounded=ground(value,"show",workspaceRoot,task,sourceRevision,model);
      if (grounded.evidence?.id !== found.renderId) throw new Error("RF_CONTEXT_UNESTABLISHED: shown render id differs from the chosen history render");
      return {...grounded,cli:recordedCli(value),source:"reused",skippedCandidates};
    }
  }
  // --audience model pins the minimal model-facing projection rather than relying on the default.
  const argv=["context","render","--workspace",workspaceRoot,"--model",model,"--task",sourceText,
    "--audience","model",...(requestedActor !== undefined ? ["--actor",requestedActor] : []),...(sessionId === undefined ? [] : ["--session",sessionId]),"--no-input","--strict","--json"];
  const keyed=[...argv,"--idempotency-key",key];
  // A lost reply may follow a commit: only the same key (same argv) may be re-issued, so rf replays rather than re-commits.
  let result=await execute(keyed,workspaceRoot), attempts=1;
  while (result.transport !== undefined) {
    if (attempts > reissues) throw new RfTransportUnacknowledged(key,result.transport,attempts);
    result=await execute(keyed,workspaceRoot); attempts++;
  }
  if (result.exitCode !== 0) throw refusal(result);
  const value=parseEnvelope(result,"render");
  const grounded=ground(value,"render",workspaceRoot,task,sourceRevision,model);
  if (requestedActor !== undefined && grounded.actor !== requestedActor)
    throw new Error("RF_CONTEXT_UNESTABLISHED: render actor "+JSON.stringify(grounded.actor)+" differs from requested actor "+JSON.stringify(requestedActor));
  const cli=await cliProvenance(execute,workspaceRoot);
  const replayOf=value["replay_of_operation_id"];
  const replayOfOperationId=typeof replayOf === "string" && replayOf.trim() ? replayOf : undefined;
  return {...grounded,cli,source:"rendered",idempotencyKey:key,workload:observeRenderWorkload(JSON.parse(result.stdout)),acknowledgement:replayOfOperationId === undefined ? "committed" : "replayed",
    ...(replayOfOperationId === undefined ? {} : {replayOfOperationId}),
    ...(skippedCandidates.length === 0 ? {} : {skippedCandidates})};
}
