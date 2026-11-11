"""Re-open every code anchor the audit relies on; print match/mismatch. Read-only."""
import pathlib, sys, json
ROOT = pathlib.Path(sys.argv[1]) / "pins"
PI, MW = "pi-0fb90672", "mw-69cb016d"
RIG = "apps/development-rig/src/"
A = [
 # (pin, path, line, expected substring, cited by)
 (PI, "src/index.ts", 3009, "pi.registerTool(createWorkflowExecuteTool(", "r-exec ORACLE-REG"),
 (PI, "src/index.ts", 3014, "mintInvocationId: workflowRunId", "r-exec ORACLE-REG"),
 (PI, "src/index.ts", 2933, 'name: "workflow_observe"', "r-exec ORACLE-REG"),
 (PI, "src/index.ts", 2997, "pi.registerTool(createWorkflowReconcileTool(", "r-exec ORACLE-REG"),
 (PI, "src/index.ts", 3063, "pi.registerTool(createWorkflowControlTool(", "r-exec ORACLE-REG"),
 (PI, "src/workbench/reconcile-tool.ts", 62, 'name: "workflow_reconcile"', "r-exec ORACLE-REG"),
 (PI, "src/workbench/control-tool.ts", 138, 'name: "workflow_control"', "r-exec ORACLE-REG"),
 (PI, "src/workbench/native-modules.ts", 109, "loadWorkbenchNative", "r-exec DETECT-ZERO"),
 (PI, "src/workbench/native-modules.ts", 126, "isWorkbenchNativeLoaded", "r-exec DETECT-ZERO"),
 (PI, "src/index.ts", 2460, "const workflowTasks = new Map", "R438"),
 (PI, "src/index.ts", 2965, "Workflow unavailable in this local operator/session/workspace scope.", "R438"),
 (PI, "src/workbench/execute-tool.ts", 163, "observe the launch through workflow_observe", "R438"),
 (PI, "src/workbench/execute-tool.ts", 179, "observe the launch through workflow_observe", "R438"),
 (PI, "src/workbench/observation.ts", 2, "export interface NativeRef { provider: string; type: string; id: string; scope?: string }", "R440"),
 (PI, "src/workbench/observation.ts", 638, 'ingest(event: ObservationEvent): "applied" | "duplicate" | "out-of-order" | "refused"', "R429"),
 (PI, "src/workflow/journal.ts", 43, "JSON Lines", "R442"),
 (PI, "src/workflow/journal.ts", 252, "export function appendJournal", "R442"),
 (PI, "src/workflow/journal.ts", 254, "appendFileSync(", "R442"),
 (PI, "src/index.ts", 2629, ".workflow.jsonl", "R442"),
 (PI, "src/index.ts", 2631, "console.warn(", "R442"),
 (PI, "src/workbench/tool-replies.ts", 14, 'TOOL_REPLY_CONTRACT_VERSION = "workbench.tool-reply/v1"', "R441"),
 (PI, "src/workbench/execute.ts", 14, 'EXECUTE_CONTRACT_VERSION = "workbench.execute/v1"', "R441"),
 (PI, "src/workbench/execute.ts", 58, 'export type LaunchStatus = "accepted" | "launched" | "refused";', "R441"),
 (PI, "src/workbench/execute.ts", 65, "export interface WorkflowExecuteReply {", "R441 (inner builder type)"),
 (PI, "src/workbench/execute.ts", 77, "readonly truncated: boolean;", "R441 (inner builder type)"),
 (PI, "src/workbench/execute-tool.ts", 107, "export interface WorkflowExecuteEnvelope {", "audit RA-02"),
 (PI, "src/workbench/execute-tool.ts", 108, "readonly contract: typeof TOOL_REPLY_CONTRACT_VERSION;", "audit RA-02 (first line of the range R441 cites, :108-113)"),
 (PI, "src/workbench/execute-tool.ts", 109, 'readonly tool: "workflow_execute";', "audit RA-02"),
 (PI, "src/workbench/execute-tool.ts", 151, "contract: TOOL_REPLY_CONTRACT_VERSION,", "audit RA-02"),
 (PI, "src/workbench/execute-tool.ts", 152, 'tool: "workflow_execute",', "audit RA-02"),
 (PI, "test/workbench-surface-census.test.ts", 269, '"contract":"workbench.tool-reply/v1","tool":"workflow_execute"', "audit RA-02"),
 (PI, "test/workbench-execute-tool.test.ts", 69, 'contract: TOOL_REPLY_CONTRACT_VERSION, tool: "workflow_execute"', "audit RA-02"),
 (PI, "test/workbench-execute-tool.test.ts", 106, 'contract: TOOL_REPLY_CONTRACT_VERSION, tool: "workflow_execute"', "audit RA-02"),
 (PI, "src/workbench/execute-tool.ts", 143, "function envelope(built: WorkflowExecuteReply", "audit RA-02"),
 (PI, "src/workbench/execute-tool.ts", 204, "return textResult(sanitizeWorkbenchJsonText(envelope(", "audit RA-02 (refused-admission return)"),
 (PI, "src/workbench/execute-tool.ts", 253, "return textResult(sanitizeWorkbenchJsonText(envelope(", "audit RA-02 (launch return)"),
 (PI, "src/workbench/execute.ts", 279, "A launched reply requires at least one native reference.", "audit RA-09"),
 (PI, "src/workbench/execute-tool.ts", 218, 'refuse("unsupported-definition-kind", "only script definitions launch in this host");', "baseline C008/C041"),
 (PI, "src/workbench/execute.ts", 81, 'const REQUEST_KEYS: readonly string[] = ["definitionRef", "input", "hostMode", "policy"];', "R424 / C095 facet"),
 (PI, "src/workbench/execute.ts", 88, "const INPUT_BYTES = 64 * 1024;", "R395"),
 (PI, "src/workbench/execute.ts", 89, "const POLICY_BYTES = 4096;", "R395"),
 (PI, "src/workbench/identity.ts", 104, "if (depth > 64)", "R394"),
 (PI, "src/workbench/identity.ts", 146, "> 1024 * 1024", "R394"),
 (PI, "src/workbench/mechanical-descriptor.ts", 108, 'MECHANICAL_DESCRIPTOR_STATUS = "descriptor-only"', "E235"),
 (PI, "src/workbench/mechanical-descriptor.ts", 131, 'package: "@mechanical/workflows-development"', "R421"),
 (PI, "src/workbench/mechanical-descriptor.ts", 132, 'export: "develop"', "R421"),
 (PI, "src/workbench/forge-operation-observer.ts", 52, 'GATED_COMMIT_FIELD = "gated_commit"', "R433"),
 (PI, "forge.toml", 9, 'gate = ["lint", "typing", "build", "test", "census", "workbench-shell", "package-smoke"]', "TDD-MATRIX section 1"),
 (PI, "package.json", 36, '"@anthropic-ai/claude-agent-sdk": "0.3.300"', "audit RA-15"),
 (PI, "package.json", 37, '"@forge/sdk": "file:vendor/forge-sdk-0.1.0.tgz"', "audit RA-15"),
 (MW, RIG + "host-services.ts", 10, 'HOST_SERVICE_NAMES = ["discover", "compileContext", "implement", "verify"]', "R426"),
 (MW, RIG + "host-services.ts", 36, 'HostServicesError("HOST_SERVICE_EXTRA_MEMBER"', "R426"),
 (MW, RIG + "host-services.ts", 94, '"uncertain"', "R430/R440"),
 (MW, RIG + "host-services.ts", 106, '"uncertain"', "R430/R440"),
 (MW, RIG + "progress-stages.ts", 9, 'PROGRAM_STAGES = ["discovery", "context", "sdk_startup", "first_edit", "commit", "gate_dispatch", "settlement"]', "R429"),
 (MW, RIG + "progress-stages.ts", 38, "agentSessionId: string | null", "R440"),
 (MW, RIG + "host-binding.ts", 9, 'HOST_BINDING_CONTRACT = "mechanical.pi-host/v1"', "R424"),
 (MW, RIG + "host-binding.ts", 14, 'WRITE_GRANT = "mechanical:develop-write"', "R424"),
 (MW, RIG + "host-binding.ts", 40, "allowedEffects: readonly string[];", "R424"),
 (MW, RIG + "host-binding.ts", 112, '["workspaceRealpath", "baseCommit", "baseTree", "forgeManifestSha256"]', "R424"),
 (MW, RIG + "live-gate.ts", 205, 'data["gate_passed"] === false', "R433/R434"),
 (MW, RIG + "live-gate.ts", 208, 'kind: "passed"', "R433/R434"),
 (MW, RIG + "live-development.ts", 387, 'forge.kind === "passed" ? "passed"', "R433"),
 (MW, RIG + "live-development.ts", 414, "verifiedTree: matches ? gate.basis.tree : null, gateDefinitionSha256: gateManifestSha256", "R435"),
 (MW, RIG + "effect-reconciliation.ts", 79, 'retryPermitted: disposition === "not-occurred"', "R443"),
 (MW, RIG + "effect-reconciliation.ts", 98, '"head-at-base-clean-worktree"', "R443"),
 (MW, RIG + "installed-host.ts", 51, "digestFile(artifact) !== options.artifactDigest", "R422"),
 (MW, RIG + "entrypoint-host.ts", 124, "ENTRYPOINT_OUTPUT_INVALID", "R428"),
 (MW, RIG + "claude-implement.ts", 94, '"@anthropic-ai/claude-agent-sdk"', "R425"),
 (MW, RIG + "host.ts", 13, "export { HostBindingError, WRITE_GRANT, admitHostBinding, dispatchWriteAtFinalBoundary, validateHostBinding }", "R421 / RA-19"),
 (MW, RIG + "host.ts", 18, "export const HOST_API_VERSION = HOST_BINDING_CONTRACT;", "R423"),
 (MW, RIG + "host.ts", 21, "export class HostAdmissionError extends Error", "R421"),
 (MW, RIG + "host.ts", 52, "export async function invokeDevelopmentHost(options: DevelopmentHostOptions, input: unknown): Promise<DevelopmentOutcome>", "R423"),
 (MW, RIG + "effect-intent.ts", 27, "invocationIdentitySha256: string | null", "R444"),
 (MW, "packages/development/src/contracts.ts", 54, "export type DevelopmentOutcome =", "R428"),
 (MW, "apps/development-rig/package.json", 14, '"./host": {', "R421"),
]
ok = bad = 0
rows = []
for pin, path, line, exp, by in A:
    f = ROOT / pin / path
    try:
        text = f.read_text().splitlines()[line - 1]
    except Exception as e:  # noqa: BLE001
        text = f"<unreadable: {e}>"
    hit = exp in text
    ok += hit
    bad += (not hit)
    rows.append({"pin": pin, "path": path, "line": line, "expected": exp, "match": hit, "cited_by": by})
    if not hit:
        print("MISMATCH", pin, path, line, "| expected:", exp, "| got:", text.strip()[:160])
files = len({(r["pin"], r["path"]) for r in rows})
print(f"anchors {len(A)} in {files} files: match {ok}, mismatch {bad}")
(pathlib.Path(__file__).parent / "anchor-check.json").write_text(json.dumps({"anchors": len(A), "files": files, "match": ok, "mismatch": bad, "rows": rows}, indent=1))
