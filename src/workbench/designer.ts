/** Read-only source and measured-experiment services. No loader, editor, scheduler or provider invocation. */
import { createHash } from "node:crypto";
import { readFileSync, realpathSync, statSync } from "node:fs";
import { isAbsolute, relative, resolve, sep } from "node:path";
import { Script } from "node:vm";
import { Check } from "typebox/value";
import ts from "typescript";
import { decodeWorkflowLiteral, extractMeta, type WorkflowMeta } from "../workflow/meta.js";
import { MAX_SCRIPT_LENGTH, type WorkflowScriptRef } from "../workflow/runtime.js";
import { listSavedWorkflows, resolveWorkflowSource } from "../workflow/saved.js";
import type { CapabilityRegistry, JsonValue } from "./capability-registry.js";
import { canonicalJson, type DefinitionRef, type InvocationSnapshot, identityDigest, type NativeRef } from "./identity.js";
import { sanitizeWorkbenchText } from "./redaction.js";

export interface WorkflowSource { readonly definition: DefinitionRef; readonly sourceRef: string; readonly source: string }
export interface DesignerDiagnostic { code: string; message: string; severity: "error" | "warning"; dimension?: string }
export interface SourceLocation { sourceRef: string; offset: number; end: number; line: number; column: number }
export interface PossibleCall { primitive: "agent" | "node" | "workflow"; location: SourceLocation; provenance: "declared"; capabilityId?: string; input?: JsonValue; conditional: boolean }
export interface StaticProjection { kind: "possible-calls"; calls: PossibleCall[]; edges: readonly never[]; unknown: { reason: string; location: SourceLocation }[] }
export interface WorkflowValidation { status: "valid" | "invalid" | "uncertain"; syntax: "valid" | "invalid"; meta?: WorkflowMeta; definition: DefinitionRef; diagnostics: DesignerDiagnostic[]; projection: StaticProjection; executed: false }
function digest(source: string): string { return `sha256:${createHash("sha256").update(source, "utf8").digest("hex")}`; }

/** Uses the same source resolution/precedence as saved workflow execution. Source bytes are never interpreted. */
export function inspectWorkflowSource(ref: WorkflowScriptRef, cwd: string): WorkflowSource {
  if (ref.scriptPath?.trim()) {
    const target = realpathSync(resolve(cwd,ref.scriptPath.trim()));
    const rel = relative(realpathSync(cwd),target);
    if (rel === ".." || rel.startsWith(`..${sep}`) || isAbsolute(rel)) throw new Error("Workflow scriptPath is outside project source scope.");
    const stats = statSync(target);
    if (!stats.isFile() || stats.size > MAX_SCRIPT_LENGTH * 4) throw new Error("Workflow source must be a bounded regular file.");
  }
  const result = resolveWorkflowSource(ref, cwd);
  if (!result.ok) throw new Error(result.message);
  if (result.script.length > MAX_SCRIPT_LENGTH) throw new Error("Workflow source exceeds runtime size limit.");
  const sourceRef = realpathSync(result.path);
  if (ref.scriptPath?.trim()) {
    const rel = relative(realpathSync(cwd), sourceRef);
    if (rel === ".." || rel.startsWith(`..${sep}`) || isAbsolute(rel)) throw new Error("Workflow scriptPath is outside project source scope.");
  }
  const stats = statSync(sourceRef);
  if (!stats.isFile() || stats.size > MAX_SCRIPT_LENGTH * 4) throw new Error("Workflow source must be a bounded regular file.");
  const bytes = readFileSync(sourceRef);
  if (!bytes.equals(Buffer.from(result.script, "utf8"))) throw new Error("Source changed during inspection or is not valid UTF-8.");
  return { definition: { kind: "script", id: sourceRef, schemaVersion: "workflow-script/v1", artifactDigest: digest(result.script) }, sourceRef, source: result.script };
}
export interface CatalogOptions { filter?: string; limit?: number; cursor?: string }
export interface WorkflowCatalog { entries: { name: string; source: WorkflowSource }[]; nextCursor?: string; catalogDigest: string; completeness: "saved-source-list"; diagnostics: DesignerDiagnostic[] }
/** Content-bound cursor refuses source edits between pages rather than mixing revisions. */
export function catalogWorkflows(cwd: string, options: CatalogOptions = {}): WorkflowCatalog {
  const limit = options.limit ?? 20;
  if (options.filter && options.filter.length > 256) throw new Error("Catalog filter exceeds 256 characters.");
  if (options.cursor && options.cursor.length > 2048) throw new Error("Catalog cursor exceeds 2048 characters.");
  if (!Number.isSafeInteger(limit) || limit < 1 || limit > 100) throw new Error("Catalog limit must be 1-100.");
  const diagnostics: DesignerDiagnostic[] = [];
  const entries: WorkflowCatalog["entries"] = [];
  for (const name of listSavedWorkflows(cwd)) {
    if (options.filter && !name.includes(options.filter)) continue;
    try { entries.push({ name, source: inspectWorkflowSource({ name }, cwd) }); }
    // The saved name and the failure text are author-controlled display strings; sourceRef/definition stay exact references.
    catch (error) { diagnostics.push({code: "SOURCE_UNAVAILABLE", message: sanitizeWorkbenchText(`${name}: ${error instanceof Error ? error.message : String(error)}`), severity: "warning"}); }
  }
  const catalogDigest = identityDigest("designer-catalog", { cwd: resolve(cwd), filter: options.filter ?? "", entries: entries.map(entry => ({name:entry.name, definition:entry.source.definition})), diagnostics });
  let offset = 0;
  if (options.cursor) {
    const parsed: unknown = JSON.parse(Buffer.from(options.cursor, "base64url").toString("utf8"));
    if (!parsed || typeof parsed !== "object" || !("digest" in parsed) || !("offset" in parsed) || parsed.digest !== catalogDigest) throw new Error("Catalog cursor is invalid or source catalog changed.");
    if (typeof parsed.offset !== "number" || !Number.isSafeInteger(parsed.offset) || parsed.offset < 0 || parsed.offset > entries.length) throw new Error("Invalid catalog cursor offset.");
    offset = parsed.offset;
  }
  const next = offset + limit;
  return { entries: entries.slice(offset, next), ...(next < entries.length ? {nextCursor:Buffer.from(JSON.stringify({digest:catalogDigest,offset:next})).toString("base64url")} : {}), catalogDigest, completeness:"saved-source-list", diagnostics };
}

function bindingNames(name: ts.BindingName): string[] {
  if (ts.isIdentifier(name)) return [name.text];
  return name.elements.flatMap(element => ts.isBindingElement(element) ? bindingNames(element.name) : []);
}

/** Parse actual source, gate metadata purity before the existing metadata parser, compile only. */
export function validateWorkflowSource(source: WorkflowSource, options: { registry?: CapabilityRegistry; grants?: readonly string[] } = {}): WorkflowValidation {
  const diagnostics: DesignerDiagnostic[] = [];
  const projection: StaticProjection = { kind: "possible-calls", calls: [], edges: [], unknown: [] };
  let syntax: WorkflowValidation["syntax"] = "valid";
  let meta: WorkflowMeta | undefined;
  let uncertain = false;
  // Diagnostics echo author source (syntax errors quote it, node IDs are literals), so they are display text, never raw.
  function error(code: string, message: string): void { diagnostics.push({code,message:sanitizeWorkbenchText(message),severity:"error"}); }
  if (source.definition.artifactDigest !== digest(source.source)) error("SOURCE_DIGEST_MISMATCH", "Source bytes do not match their pinned definition.");
  if (source.source.length > MAX_SCRIPT_LENGTH) error("SOURCE_TOO_LARGE", "Source exceeds runtime limit.");
  if (/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(source.source)) error("SOURCE_CONTROL_CHARACTERS", "Source contains unsupported control characters.");
  if (diagnostics.length > 0) return {status:"invalid",syntax:"invalid",definition:source.definition,diagnostics,projection,executed:false};
  const ast = ts.createSourceFile(source.sourceRef, source.source, ts.ScriptTarget.ESNext, true, ts.ScriptKind.JS);
  const metaDeclarations = ast.statements.filter(ts.isVariableStatement).flatMap(statement => statement.modifiers?.some(mod => mod.kind === ts.SyntaxKind.ExportKeyword) ? statement.declarationList.declarations.filter(decl => ts.isIdentifier(decl.name) && decl.name.text === "meta").map(decl => ({statement,decl})) : []);
  if (metaDeclarations.length !== 1 || !metaDeclarations[0].decl.initializer || !(metaDeclarations[0].statement.declarationList.flags & ts.NodeFlags.Const)) error("META_DECLARATION", "Exactly one export const meta object is required.");
  else {
    try {
      const value = decodeWorkflowLiteral(metaDeclarations[0].decl.initializer);
      if (value === null || Array.isArray(value) || typeof value !== "object") throw new Error("Metadata must be an object literal.");
      // extractMeta supplies the existing shape/phase contract, only after AST proves no executable syntax.
      meta = extractMeta(source.source).meta;
    } catch (cause) { error("META_NOT_LITERAL", cause instanceof Error ? cause.message : String(cause)); }
  }
  const body = metaDeclarations.length === 1 ? source.source.slice(0, metaDeclarations[0].statement.getStart(ast)).concat(source.source.slice(metaDeclarations[0].statement.getStart(ast)).replace("export", "      ")) : source.source;
  try { new Script(`(async () => {\n${body}\n})`, { filename: source.sourceRef }); }
  catch (cause) { syntax = "invalid"; error("SCRIPT_SYNTAX", cause instanceof Error ? cause.message : String(cause)); }
  const location = (node: ts.Node): SourceLocation => { const offset = node.getStart(ast); const point = ast.getLineAndCharacterOfPosition(offset); return {sourceRef:source.sourceRef,offset,end:node.end,line:point.line+1,column:point.character+1}; };
  // Conservative lexical binding index: a local name is not assumed to be the host primitive.
  const bindings = new Map<ts.Node, Set<string>>();
  function scope(node: ts.Node): ts.Node { let at = node; while (at.parent && !ts.isSourceFile(at) && !ts.isBlock(at) && !ts.isFunctionLike(at)) at = at.parent; return at; }
  function bind(node: ts.Node, names: readonly string[]): void { const at = scope(node); const set = bindings.get(at) ?? new Set<string>(); names.forEach(name => { set.add(name); }); bindings.set(at,set); }
  function index(node: ts.Node): void {
    if (ts.isParameter(node)) bind(node.parent,bindingNames(node.name));
    if ((ts.isFunctionExpression(node) || ts.isClassExpression(node)) && node.name) bind(node,[node.name.text]);
    if (ts.isCatchClause(node) && node.variableDeclaration) bind(node.block,bindingNames(node.variableDeclaration.name));
    if (ts.isBinaryExpression(node) && node.operatorToken.kind >= ts.SyntaxKind.FirstAssignment && node.operatorToken.kind <= ts.SyntaxKind.LastAssignment) {
      // Mutation makes even earlier calls ambiguous; conservatively mark the whole enclosing scope opaque.
      const names: string[] = [];
      function assigned(target: ts.Node): void {
        if (ts.isIdentifier(target)) names.push(target.text);
        else if (ts.isShorthandPropertyAssignment(target)) names.push(target.name.text);
        else if (ts.isPropertyAssignment(target)) assigned(target.initializer);
        else if (ts.isBinaryExpression(target)) assigned(target.left);
        else if (ts.isSpreadAssignment(target) || ts.isSpreadElement(target) || ts.isParenthesizedExpression(target)) assigned(target.expression);
        else if (ts.isObjectLiteralExpression(target)) target.properties.forEach(assigned);
        else if (ts.isArrayLiteralExpression(target)) target.elements.forEach(assigned);
      }
      assigned(node.left);
      bind(ast,names);
    }
    if (ts.isVariableDeclaration(node) && !ts.isCatchClause(node.parent)) {
      let at: ts.Node = node.parent;
      if (ts.isVariableDeclarationList(at) && !(at.flags & ts.NodeFlags.BlockScoped)) { while (at.parent && !ts.isFunctionLike(at) && !ts.isSourceFile(at)) at = at.parent; }
      bind(at,bindingNames(node.name));
    }
    if (ts.isFunctionDeclaration(node) && node.name) bind(node.parent,[node.name.text]);
    if (ts.isClassDeclaration(node) && node.name) bind(node.parent,[node.name.text]);
    ts.forEachChild(node,index);
  }
  index(ast);
  const descriptors = options.registry?.discover({grants:options.grants ?? []});
  function visit(node: ts.Node): void {
    if (ts.isIfStatement(node) || ts.isIterationStatement(node,false) || ts.isConditionalExpression(node) || ts.isSwitchStatement(node)) projection.unknown.push({reason:"Dynamic control flow; reachability and multiplicity are unknown.",location:location(node)});
    if (ts.isCallExpression(node)) {
      const name = ts.isIdentifier(node.expression) ? node.expression.text : undefined;
      let shadowed = false;
      let conditional = false;
      for (let at: ts.Node | undefined = node.parent; at; at = at.parent) {
        if (name && bindings.get(at)?.has(name)) shadowed = true;
        if (ts.isIfStatement(at) || ts.isIterationStatement(at,false) || ts.isConditionalExpression(at) || ts.isFunctionLike(at) || ts.isSwitchStatement(at)) conditional = true;
      }
      if ((name === "agent" || name === "node" || name === "workflow") && !shadowed) {
        const call: PossibleCall = {primitive:name,location:location(node),provenance:"declared",conditional};
        if (name === "node") {
          const id = node.arguments[0];
          if (id && (ts.isStringLiteral(id) || ts.isNoSubstitutionTemplateLiteral(id))) call.capabilityId = id.text;
          else { uncertain = true; projection.unknown.push({reason:"Dynamic node capability ID.",location:location(node)}); }
          try { if (!node.arguments[1]) throw new Error("Missing node input."); call.input = decodeWorkflowLiteral(node.arguments[1]); }
          catch { uncertain = true; projection.unknown.push({reason:"Dynamic node input; schema cannot be established.",location:location(node)}); }
          if (call.capabilityId && descriptors) {
            const descriptor = descriptors.find(item => item.id === call.capabilityId);
            if (!descriptor) { uncertain = true; diagnostics.push({code:"NODE_UNAVAILABLE",message:sanitizeWorkbenchText(`Capability ${call.capabilityId} is unavailable or not discoverable.`),severity:"warning"}); }
            else {
              const grants = options.grants ?? [];
              if (!(descriptor.permissions.length ? descriptor.permissions.every(grant => grants.includes(grant)) : grants.includes(`invoke:${descriptor.id}`))) error("NODE_UNAUTHORIZED",`No invocation grant for ${descriptor.id}.`);
              if (!descriptor.supportedModes.includes("invoke")) error("NODE_UNAVAILABLE",`${descriptor.id} does not support invocation.`);
              if (call.input !== undefined && !Check(descriptor.inputSchema,call.input)) error("NODE_INPUT_SCHEMA",`Literal input does not match ${descriptor.id}@${descriptor.version}.`);
            }
          } else if (call.capabilityId && !descriptors) { uncertain = true; diagnostics.push({code:"BINDINGS_UNCHECKED",message:"No authorized capability registry was supplied; deployment binding is unestablished.",severity:"warning"}); }
        }
        projection.calls.push(call);
      } else projection.unknown.push({reason:shadowed ? "Locally bound name is not proven to be a workflow primitive." : "Opaque/indirect call; no inferred workflow dependencies.",location:location(node)});
    }
    ts.forEachChild(node,visit);
  }
  visit(ast);
  return {status:diagnostics.some(item => item.severity === "error") ? "invalid" : uncertain ? "uncertain" : "valid",syntax,...(meta ? {meta} : {}),definition:source.definition,diagnostics,projection,executed:false};
}

export interface MeasuredMetric { name: string; unit: string; value: number; source: NativeRef; evidenceRefs: readonly string[]; subjectBasis: string; coverage: "complete" | "partial" | "unknown"; freshness: "current" | "stale" | "unknown" }
/** Digests must be captured by the trusted receipt producer, not guessed from model names or paths. */
export interface CompareRun { snapshot: InvocationSnapshot; inputDigest?: string; modelDigest?: string; toolsDigest?: string; environmentDigest?: string; cacheDigest?: string; nativeRefs: readonly NativeRef[]; metrics: readonly MeasuredMetric[] }
export interface MetricSummary { count: number; mean: number; median: number; min: number; max: number; standardDeviation?: number }
export interface WorkflowComparison { status: "comparable" | "confounded" | "unknown"; diagnostics: DesignerDiagnostic[]; sourceDigests: {reference:string[];candidate:string[]}; metrics: {name:string;unit:string;reference:MetricSummary;candidate:MetricSummary;delta?:number;evidenceRefs:string[]}[]; causalClaim:false; criticalPath:"unestablished"; limitations:string[] }
function summary(values: number[]): MetricSummary {
  const ordered = [...values].sort((a,b) => a-b); const mean = values.reduce((sum,value) => sum + value/values.length,0);
  const middle = Math.floor(ordered.length/2); const median = ordered.length%2 ? ordered[middle] : ordered[middle-1]/2 + ordered[middle]/2;
  return {count:values.length,mean,median,min:ordered[0],max:ordered[ordered.length-1],...(values.length > 1 ? {standardDeviation:Math.sqrt(values.reduce((sum,value) => sum+(value-mean)**2,0)/(values.length-1))} : {})};
}
/** Descriptive only. Missing, heterogeneous or stale evidence never supplies a comparable delta. */
export function compareWorkflowRuns(reference: readonly CompareRun[], candidate: readonly CompareRun[]): WorkflowComparison {
  const diagnostics: DesignerDiagnostic[] = [];
  let confounded = false;
  function unknown(message: string): void { diagnostics.push({code:"COMPARISON_UNKNOWN",message,severity:"warning"}); }
  const all = [...reference,...candidate];
  if (!reference.length || !candidate.length) unknown("Both cohorts need measured invocation receipts.");
  if (all.length > 1000) throw new Error("Comparison is bounded to 1000 total receipts.");
  const ids = new Set<string>();
  for (const run of all) {
    const snapshot = run.snapshot;
    if (!snapshot.identity.logicalInvocationId || ids.has(snapshot.identity.logicalInvocationId)) unknown("Repeated or absent logical invocation ID is not an independent run.");
    ids.add(snapshot.identity.logicalInvocationId);
    if (snapshot.scriptDigest !== digest(snapshot.scriptSource) || snapshot.identity.definition.artifactDigest !== snapshot.scriptDigest) unknown("Receipt source digest does not match actual captured source.");
    const deployment = identityDigest("deployment", {definition:snapshot.identity.definition,dependencyDigest:snapshot.dependencyDigest,hostImplementationDigest:snapshot.hostImplementationDigest,runtimeArtifactDigest:snapshot.runtimeArtifactDigest,configurationDigest:snapshot.configurationDigest,hostAbiDigest:snapshot.hostAbiDigest,providerContractDigest:snapshot.providerContractDigest});
    if (deployment !== snapshot.identity.deploymentDigest) unknown("Receipt deployment components do not match pinned deployment digest.");
    if (!run.nativeRefs.length || run.nativeRefs.some(ref => !ref.provider.trim() || !ref.type.trim() || !ref.id.trim())) unknown("Native execution reference is absent or malformed.");
  }
  const dimensions = ["inputDigest","modelDigest","toolsDigest","environmentDigest","cacheDigest","configurationDigest","subjectBasis","dependencyDigest","runtimeArtifactDigest","hostImplementationDigest","hostAbiDigest","providerContractDigest"] as const;
  const contracts = new Set(all.map(run => canonicalJson({kind:run.snapshot.identity.definition.kind,id:run.snapshot.identity.definition.id,schemaVersion:run.snapshot.identity.definition.schemaVersion})));
  if (contracts.size > 1) { confounded = true; diagnostics.push({code:"COHORT_CONFOUND",dimension:"definition",message:"Definition identity/schema differs within or between cohorts.",severity:"warning"}); }
  for (const dimension of dimensions) {
    const values = all.map(run => dimension === "subjectBasis" ? run.snapshot.identity.subjectBasis : dimension in run.snapshot ? run.snapshot[dimension as keyof InvocationSnapshot] : run[dimension as keyof CompareRun]);
    if (values.some(value => typeof value !== "string" || !/^sha256:[0-9a-f]{64}$/.test(value))) unknown(`${dimension} is not established by every receipt.`);
    const known = new Set(values.filter((value): value is string => typeof value === "string" && !!value.trim()));
    if (known.size > 1) { confounded = true; diagnostics.push({code:"COHORT_CONFOUND",dimension,message:`${dimension} differs within or between cohorts.`,severity:"warning"}); }
  }
  for (const [label,runs] of [["reference",reference],["candidate",candidate]] as const) {
    if (new Set(runs.map(run => run.snapshot.scriptDigest)).size > 1) { confounded = true; diagnostics.push({code:"COHORT_CONFOUND",dimension:"source",message:`${label} cohort mixes source versions.`,severity:"warning"}); }
  }
  const metricKeys = new Set(all.flatMap(run => run.metrics.map(metric => canonicalJson([metric.name,metric.unit]))));
  if (!metricKeys.size) unknown("No measured metrics were supplied.");
  const metrics: WorkflowComparison["metrics"] = [];
  for (const key of metricKeys) {
    const [name,unit] = JSON.parse(key) as [string,string];
    const collected = all.map(run => run.metrics.filter(metric => metric.name === name && metric.unit === unit));
    if (collected.some(items => items.length !== 1)) { unknown(`${name}/${unit} is missing or duplicated for a cohort member.`); continue; }
    const values = collected.flat();
    if (values.some((metric,index) => !metric.name.trim() || !metric.unit.trim() || !Number.isFinite(metric.value) || metric.coverage !== "complete" || metric.freshness !== "current" || !metric.evidenceRefs.length || metric.evidenceRefs.some(ref => !ref.trim()) || metric.subjectBasis !== all[index].snapshot.identity.subjectBasis || !all[index].nativeRefs.some(ref => canonicalJson(ref) === canonicalJson(metric.source)))) { unknown(`${name}/${unit} lacks finite, complete, current, receipt-bound native evidence.`); continue; }
    const baseline = summary(values.slice(0,reference.length).map(item => item.value));
    const proposal = summary(values.slice(reference.length).map(item => item.value));
    if (!reference.length || !candidate.length) continue;
    if (![baseline.mean,proposal.mean,baseline.standardDeviation ?? 0,proposal.standardDeviation ?? 0].every(Number.isFinite)) { unknown(`${name}/${unit} numeric aggregation exceeds finite range.`); continue; }
    metrics.push({name,unit,reference:baseline,candidate:proposal,evidenceRefs:[...new Set(values.flatMap(metric => metric.evidenceRefs))]});
  }
  const status = confounded ? "confounded" : diagnostics.length ? "unknown" : "comparable";
  if (status === "comparable") for (const metric of metrics) { const delta = metric.candidate.mean-metric.reference.mean; if (Number.isFinite(delta)) metric.delta = delta; }
  return {status,diagnostics,sourceDigests:{reference:[...new Set(reference.map(run => run.snapshot.scriptDigest))],candidate:[...new Set(candidate.map(run => run.snapshot.scriptDigest))]},metrics,causalClaim:false,criticalPath:"unestablished",limitations:["Descriptive cohort statistics are not a causal improvement claim.","No critical path is derived without native dependency and interval evidence.",...(reference.length < 2 || candidate.length < 2 ? ["Single-run cohort: stochastic dispersion is unmeasured."] : [])]};
}
