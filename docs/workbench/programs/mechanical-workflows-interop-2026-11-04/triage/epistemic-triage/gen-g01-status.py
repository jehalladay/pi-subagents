#!/usr/bin/env python3 -I
"""Phase 4-6 generator for claim group g01 (claims-part-01.jsonl: 01-audit-and-evidence.md).
Emits dossiers/<Cid>.md (material claims), status-part-g01.jsonl, relations-part-g01.jsonl,
contradictions-part-g01.md. All evidence quotes were re-read at the pins by the investigator
(see the transcript); lens rows were used as leads, not verdicts."""
import json, os, sys
OUT = os.path.dirname(os.path.abspath(__file__))
CLAIMS = [json.loads(l) for l in open(os.path.join(OUT, "claims-part-01.jsonl")) if l.strip()]
BY = {c["id"]: c for c in CLAIMS}
PI = "pi@b27829e6dfa7"; MW = "mw@f7c0a9431d6c"; DOC = "doc@7c80c34346c2"; MWB = "mw@0c78e253 (program baseline, via git show)"
D01 = "docs/workbench/programs/mechanical-workflows-interop-2026-11-04/01-audit-and-evidence.md"
D02 = "docs/workbench/programs/mechanical-workflows-interop-2026-11-04/02-host-architecture-and-protocol.md"
D03 = "docs/workbench/programs/mechanical-workflows-interop-2026-11-04/03-implementation-and-qa.md"
SK = ".agents/skills/pi-mechanical-interop/SKILL.md"
MWP = "docs/programs/pi-workbench-interop-2026-11-04/01-audit-and-status.md"
def ev(pin, path, lines, quote):
    # quotes are verbatim; a quote over the 240-char cap is cut to a verbatim prefix and marked with a trailing " ..."
    if len(quote) > 240:
        quote = quote[:236].rstrip() + " ..."
    assert len(quote) <= 240, (path, lines, len(quote))
    return {"pin": pin, "path": path, "lines": lines, "quote": quote}
E = {}
# ---- Pi pin evidence ----
E["src_nodrift"] = ev(PI, "git diff --stat f67b6665 b27829e6 -- src/", "-", "(empty: src/ is byte-identical between the program baseline f67b6665, the program commit 7c80c343 and the pin b27829e6)")
E["wt_fn"] = ev(PI, "src/worktree.ts", "125-130", "export async function cleanupWorktree(\n  pi: ExtensionAPI,\n  cwd: string,\n  worktree: WorktreeInfo,\n  agentDescription: string,\n): Promise<WorktreeCleanupResult> {")
E["wt_commit"] = ev(PI, "src/worktree.ts", "141-145", "await git(pi, worktree.path, [\"add\", \"-A\"], 10000);\n ...\n      await git(pi, worktree.path, [\"commit\", \"--no-verify\", \"-m\", commitMsg], 10000);")
E["wt_remove"] = ev(PI, "src/worktree.ts", "169-170", "// Remove the worktree (branch persists in main repo)\n    await removeWorktree(pi, cwd, worktree.path);")
E["wt_catch"] = ev(PI, "src/worktree.ts", "177-181", "} catch {\n    // Best effort cleanup on error\n    try { await removeWorktree(pi, cwd, worktree.path); } catch { /* ignore */ }\n    return { hasChanges: false };\n  }")
E["wt_force"] = ev(PI, "src/worktree.ts", "187-191", "async function removeWorktree(pi: ExtensionAPI, cwd: string, worktreePath: string): Promise<void> {\n  try {\n    await git(pi, cwd, [\"worktree\", \"remove\", \"--force\", worktreePath], 10000);\n  } catch {\n    // If git worktree remove fails, try pruning")
E["wt_detach"] = ev(PI, "src/worktree.ts", "112", "await git(pi, cwd, [\"worktree\", \"add\", \"--detach\", worktreePath, \"HEAD\"], 30000);")
E["wt_type"] = ev(PI, "src/worktree.ts", "55-61", "export interface WorktreeCleanupResult {\n  /** Whether changes were found in the worktree. */\n  hasChanges: boolean;\n  /** Branch name if changes were committed. */\n  branch?: string;\n  /** Worktree path if it was kept. */\n  path?: string;")
E["wt_guard"] = ev(PI, "src/worktree.ts", "131-133", "if (!existsSync(worktree.path)) {\n    return { hasChanges: false };\n  }")
E["wt_clean"] = ev(PI, "src/worktree.ts", "149-152", "if (currentSha === worktree.baseSha) {\n        // No changes — remove worktree\n        await removeWorktree(pi, cwd, worktree.path);\n        return { hasChanges: false };")
E["wt_log"] = ev(PI, "git log -1 -- src/worktree.ts", "-", "221df023 2026-08-25 15:12:18 +0200 feat: Workflow tool - deterministic scripts that orchestrate many subagents (#236)")
E["am_branch"] = ev(PI, "src/agent-manager.ts", "891-893", "const wtResult = await cleanupWorktree(pi, baseCwd, record.worktree, options.description);\n          record.worktreeResult = wtResult;\n          if (wtResult.hasChanges && wtResult.branch) {")
E["am_import"] = ev(PI, "src/agent-manager.ts", "28", "import { cleanupWorktree, createWorktree, isWorktreeIsolationEnabled, pruneWorktrees, } from \"./worktree.js\";")
E["wtt_header"] = ev(PI, "test/worktree.test.ts", "383-385", "// cleanupWorktree's outer catch is the only place in the repo where a caught\n// error can DESTROY user work while reporting success-shaped output: it removes\n// the worktree and returns `{ hasChanges: false }`, which the manager renders as")
E["wtt_commitfail"] = ev(PI, "test/worktree.test.ts", "432", "it(\"reports no changes when the preservation commit fails\", async () => {")
E["wtt_assert"] = ev(PI, "test/worktree.test.ts", "445-446", "expect(result.hasChanges).toBe(false);\n    expect(result.branch).toBeUndefined();")
E["wtt_lost"] = ev(PI, "test/worktree.test.ts", "416-417", "// or externally-detached worktree looks like. The agent's work is lost\n    // either way; what matters is that cleanup does not reject out of the")
E["wtt_corrupt"] = ev(PI, "test/worktree.test.ts", "413", "it(\"swallows a git failure inside a still-present worktree and reports no changes\", async () => {")
E["wtt_order"] = ev(PI, "test/worktree.test.ts", "449", "it(\"creates the branch BEFORE removing the worktree, so a removal failure cannot lose commits\", async () => {")
E["wtt_log"] = ev(PI, "git log -1 -- test/worktree.test.ts", "-", "13baec73 2026-10-17 13:40:54 +0000 test(worktree): wb-ana re-express the switch-off createWorktree case against the async signatures")
E["ch_sep"] = ev(PI, "src/workbench/claude-host.ts", "1", "/** Claude Agent SDK execution of *workflow* agent() calls; Pi's Agent tool stays separate. */")
E["ch_import"] = ev(PI, "src/workbench/claude-host.ts", "4-10", "import {\n  type EffortLevel,\n  getSessionInfo,\n  type Options,\n  type SDKMessage,\n  query as sdkQuery,\n} from \"@anthropic-ai/claude-agent-sdk\";")
E["ch_querydef"] = ev(PI, "src/workbench/claude-host.ts", "150-151", "const query = config.query ?? sdkQuery;\n  const getSession = config.getSession ?? getSessionInfo;")
E["ch_query"] = ev(PI, "src/workbench/claude-host.ts", "253", "const live = query({ prompt, options });")
E["ch_onmsg"] = ev(PI, "src/workbench/claude-host.ts", "259-262", "for await (const message of live) {\n        config.onMessage?.(message, request ?? previous!.call);\n ...\n          sessionId = message.session_id;")
E["ch_sessions"] = ev(PI, "src/workbench/claude-host.ts", "152-154", "const controllers = new Map<string, AbortController>();\n  const sessions = new Map<string, SessionEntry>();\n  const pendingLookupAborts = new Set<string>();")
E["ch_abort"] = ev(PI, "src/workbench/claude-host.ts", "341-344", "abortAgent(agentId) {\n      controllers.get(agentId)?.abort();\n      if (sessions.has(agentId) && !controllers.has(agentId)) pendingLookupAborts.add(agentId);\n    },")
E["ch_resume"] = ev(PI, "src/workbench/claude-host.ts", "345-349", "async resumeAgent(agentId, prompt, onResolved) {\n      const previous = sessions.get(agentId);\n      if (!previous) return { ok: false, error: `Cannot resume unknown Claude SDK session for ${agentId}.` };\n      pendingLookupAborts.delete(agentId);")
E["ch_pending"] = ev(PI, "src/workbench/claude-host.ts", "349-351", "const saved = await getSession(previous.sessionId, { dir: config.cwd });\n      if (pendingLookupAborts.delete(agentId) || config.signal?.aborted) {\n        return { ok: false, skipped: true, error: \"Claude SDK resume cancelled before query start.\" };")
E["ch_role"] = ev(PI, "src/workbench/claude-host.ts", "197-199", "const roleName = request?.agentType ?? \"\";\n    const role = request?.agentType === \"general-purpose\" || !config.roles || !Object.hasOwn(config.roles, roleName)\n      ? undefined : config.roles[roleName];")
E["ch_model"] = ev(PI, "src/workbench/claude-host.ts", "203", "const model = previous?.model ?? resolvedModel(request?.model ?? role?.model ?? config.model);")
E["ch_basis"] = ev(PI, "src/workbench/claude-host.ts", "166-175", "const replayBasis = JSON.stringify([\n    config.cwd,\n    config.model ?? null,\n    permissionMode,\n    settings,\n    tools,\n    config.roles ?? null,\n    config.grants ?? null,\n    config.principal ?? null,\n  ]);")
E["ch_settings"] = ev(PI, "src/workbench/claude-host.ts", "155", "const settings = config.settingSources ?? [];")
E["ch_iso"] = ev(PI, "src/workbench/claude-host.ts", "188-189", "if (request?.isolation === \"worktree\") {\n      return { ok: false, error: \"Claude SDK worktree isolation is unavailable; refusing to run in the shared cwd.\" };")
E["ch_bd"] = ev(PI, "src/workbench/claude-host.ts", "207", "try { await config.beforeDispatch?.(); } catch (error) {")
E["ch_recheck"] = ev(PI, "src/workbench/claude-host.ts", "215", "if (config.signal?.aborted) return { ok: false, skipped: true, error: \"Workflow aborted.\" };")
E["ch_ctrl"] = ev(PI, "src/workbench/claude-host.ts", "216-220", "const controller = new AbortController();\n    const onAbort = () => controller.abort();\n    config.signal?.addEventListener(\"abort\", onAbort, { once: true });\n    if (config.signal?.aborted) controller.abort();\n    controllers.set(agentId, controller);")
E["ch_spawn"] = ev(PI, "src/workbench/claude-host.ts", "336-337", "async spawnAgent(request) {\n      const result = await invoke(request.agentId, request.prompt, request, undefined, request.onResolved);")
E["td_iso"] = ev(PI, "src/workflow/tool-description.ts", "81", "- agent(prompt: string, opts?: {label?: string, phase?: string, schema?: object, model?: string, effort?: string, isolation?: 'worktree', agentType?: string,")
E["rt_skip"] = ev(PI, "src/workflow/runtime.ts", "873-881", "skip: index => {\n      const live = liveAgents.get(index);\n      if (live === undefined || live.intent !== undefined) return false;\n      live.intent = \"skip\";\n ...\n      if (live.started) host.abortAgent(live.agentId);\n      else live.wake?.();")
E["rt_retry"] = ev(PI, "src/workflow/runtime.ts", "883-888", "retry: index => {\n      const live = liveAgents.get(index);\n      if (live === undefined || !live.started || live.intent !== undefined) return false;\n      live.intent = \"retry\";\n      host.abortAgent(live.agentId);\n      return true;")
E["rt_started"] = ev(PI, "src/workflow/runtime.ts", "1215-1216", "live.started = true;\n          inflight.add(agentId);")
E["rt_spawn"] = ev(PI, "src/workflow/runtime.ts", "1220-1223", "result =\n              resumed !== undefined && resumeAgent !== undefined\n                ? await resumeAgent(resumed.agentId, payload.prompt, onResolved)\n                : await host.spawnAgent({")
E["rt_skipflag"] = ev(PI, "src/workflow/runtime.ts", "1320-1325", "// A user skip reaches here as a stopped child, which the host\n              // already reports as skipped — the flag is taken from the result\n              // rather than from the intent so an abort mid-skip still reads\n              // as whatever actually happened to the child.")
E["rt_sem"] = ev(PI, "src/workflow/runtime.ts", "737-738", "const semaphore = new Semaphore(options.concurrency ?? workflowConcurrency());\n  const nodeSemaphore = new Semaphore(16);")
E["rt_semclass"] = ev(PI, "src/workflow/runtime.ts", "485-489", "class Semaphore {\n  private active = 0;\n  private readonly waiters: (() => void)[] = [];\n\n  constructor(private readonly limit: number) {}")
E["rt_conc"] = ev(PI, "src/workflow/runtime.ts", "63-65", "export function workflowConcurrency(cpuCount: number = cpus().length): number {\n  return Math.max(1, Math.min(16, cpuCount - 2));\n}")
E["rt_concdoc"] = ev(PI, "src/workflow/runtime.ts", "60-61", "* or two-core machine, and a semaphore with zero permits never hands out a slot,\n * so the run would hang before its first agent rather than fail.")
E["rt_replayat"] = ev(PI, "src/workflow/runtime.ts", "899-901", "if (entry === undefined || entry.index !== index || entry.key !== key || !entry.ok || entry.basis !== hostBasis) {\n      prefixIntact = false;\n      return undefined;")
E["rt_refuse"] = ev(PI, "src/workflow/runtime.ts", "1426-1429", "} else if (recorded.effectClass !== \"read\") {\n          refusal = {\n            entry: recorded,\n            hint: `node(${recordedCapability}) at position ${index} was recorded by the resumed run with effect class \"${recorded.effectClass}\"")
E["rt_dispatched"] = ev(PI, "src/workflow/runtime.ts", "1409-1412", "if (recorded.dispatched === true) {\n          // wb-5x0.1: the marker a non-read call writes before its provider\n          // acts, superseded by nothing. Whatever its class, nothing recorded\n          // how the call settled, so whether its effect happened is unknown.")
E["rt_readonly"] = ev(PI, "src/workflow/runtime.ts", "1468-1471", "if (\n          recorded.effectClass === \"read\" && currentEffect === \"read\" && recorded.basis === hostBasis &&\n          prefixIntact && key !== undefined && recorded.key === key &&\n          recorded.ok && recorded.text !== undefined")
E["rt_callnode"] = ev(PI, "src/workflow/runtime.ts", "1610-1611", "const output = await callNode({\n          callId, index, capabilityId: payload.capabilityId,")
E["rt_capid"] = ev(PI, "src/workflow/runtime.ts", "1352", "typeof payload.capabilityId !== \"string\" || !/^[a-z][a-z0-9]*(?:[.-][a-z][a-z0-9]*)+$/.test(payload.capabilityId) ||")
E["rt_caps"] = ev(PI, "src/workflow/runtime.ts", "43-46", "export const WORKFLOW_AGENT_CAP = 1000;\n ...\nexport const WORKFLOW_ITEM_CAP = 4096;")
E["rt_worker"] = ev(PI, "src/workflow/runtime.ts", "906-919", "const worker = new Worker(WORKER_SOURCE, {\n ...\n      nestedCap: options.nestedCap ?? WORKFLOW_NESTED_CAP,")
E["jn_doc"] = ev(PI, "src/workflow/journal.ts", "109-112", "* The effect class the host declared for the capability when the node ran.\n   * `\"read\"` is the only class a resume may replay; anything else — including\n   * an entry recorded without one, by a host that declared nothing — is never\n   * handed back as a result.")
E["jn_trip"] = ev(PI, "src/workflow/journal.ts", "63-64", "* A marker nothing superseded is a dispatch with no settled record, and a\n * resume refuses there as an uncertain effect.")
E["jn_key"] = ev(PI, "src/workflow/journal.ts", "173-182", "export function journalKey(input: JournalKeyInput): string {\n  const canonical = JSON.stringify([\n    input.prompt,\n    input.label ?? null,\n    input.model ?? null,\n    input.agentType ?? null,\n    input.effort ?? null,\n    input.isolation ?? null,\n    input.gate ?? null,\n    input.resume ?? null,")
E["ws_threads"] = ev(PI, "src/workflow/worker-source.ts", "71-72", "const { parentPort, workerData } = require(\"node:worker_threads\");\nconst vm = require(\"node:vm\");")
E["ws_agent"] = ev(PI, "src/workflow/worker-source.ts", "397-401", "scope.agent = realmAsyncBridge(function (prompt, opts) {\n    return agentIn(scope, prompt, opts);\n  });\n  scope.node = realmAsyncBridge(function (id, input, options) {\n    return nodeIn(scope, id, input, options);")
E["ws_par"] = ev(PI, "src/workflow/worker-source.ts", "642", "async function parallel(thunks) {")
E["ws_pipe"] = ev(PI, "src/workflow/worker-source.ts", "671", "async function pipeline(items, ...stages) {")
E["ws_nested"] = ev(PI, "src/workflow/worker-source.ts", "713", "\"workflow() cannot be nested more than one level deep — you are already inside the workflow '\" +")
E["et_name"] = ev(PI, "src/workbench/execute-tool.ts", "176", "name: \"workflow_execute\",")
E["et_kind"] = ev(PI, "src/workbench/execute-tool.ts", "182", "kind: Type.Union([Type.Literal(\"script\"), Type.Literal(\"function\"), Type.Literal(\"furnace-formula\")]),")
E["et_refuse"] = ev(PI, "src/workbench/execute-tool.ts", "215-218", "if (admission.hostMode === \"detached\" && !rights.includes(DETACH_GRANT)) {\n        refuse(\"missing-detach-grant\", ...\n      } else if (admission.definition.kind !== \"script\") {\n        refuse(\"unsupported-definition-kind\", \"only script definitions launch in this host\");")
E["et_detach"] = ev(PI, "src/workbench/execute-tool.ts", "57", "export const DETACH_GRANT = \"workbench:detach\";")
E["ex_kinds"] = ev(PI, "src/workbench/execute.ts", "78", "const DEFINITION_KINDS: readonly string[] = [\"script\", \"function\", \"furnace-formula\"];")
E["ix_launch"] = ev(PI, "src/index.ts", "2621-2623", "async function launchDetachedWorkflow(ctx: ExtensionContext, launch: ExecuteLaunch): Promise<readonly NativeRef[]> {\n    const settings = sourceSettings(ctx);\n    const claude = settings?.workflowAgentBackend === \"claude\";")
E["ix_grants"] = ev(PI, "src/index.ts", "2627-2628", "cwd: ctx.cwd, input: launch.input, trustedScript: true, backend: claude ? \"claude\" : \"deterministic\",\n      providers: [], grants: [], permissions: [\"inspect\", \"execute\"], sourceFiles: [launch.source.sourceRef],")
E["ix_reg"] = ev(PI, "src/index.ts", "2640", "if (workbenchToolsRegistered || sourceSettings(ctx)?.workflowAgentBackend !== \"claude\") return;")
E["ix_detached"] = ev(PI, "src/index.ts", "2880-2881", "const receipt=await workbenchNative().launchDetachedWorkflow({ directory,invocationId:params.invocationId,scriptPath:source.sourceRef,cwd:ctx.cwd,input:null,trustedScript:true,\n            backend:params.backend ?? \"deterministic\",providers:[],grants:[],")
E["ix_forge"] = ev(PI, "src/index.ts", "2816-2818", "pi.registerTool(defineTool({\n      name: \"forge_gate_run\",\n      label: \"Run a Forge gate as an observed operation\",")
E["ix_observe"] = ev(PI, "src/index.ts", "2889", "name: \"workflow_observe\",")
E["ct_name"] = ev(PI, "src/workbench/control-tool.ts", "138", "name: \"workflow_control\",")
E["rc_name"] = ev(PI, "src/workbench/reconcile-tool.ts", "62", "name: \"workflow_reconcile\",")
E["tools_9"] = ev(PI, "grep -rhn 'name: \"workflow_' src/", "-", "workflow_catalog workflow_compare workflow_control workflow_detached workflow_execute workflow_inspect workflow_observe workflow_reconcile workflow_validate (one registration each)")
E["ld_430"] = ev(PI, "src/workbench/hosts/local-detached.ts", "430", "if (request.backend === \"claude\" && !grants.includes(\"claude:invoke\")) throw new Error(\"Claude requires explicit claude:invoke grant (auth is SDK-owned and separate).\");")
E["ld_442"] = ev(PI, "src/workbench/hosts/local-detached.ts", "442", "for (const tool of tools) if (typeof tool !== \"string\" || !grants.includes(`claude:tool:${tool}`)) throw new Error(\"Claude built-ins require exact host grants.\");")
E["ld_launch"] = ev(PI, "src/workbench/hosts/local-detached.ts", "531-532", "export async function launchDetachedWorkflow(raw: DetachedLaunchRequest, placement: DetachedSocketPlacement = {}): Promise<DetachedReceipt> {\n  const owner = localOperator(); const request = validateRequest(raw);")
E["grep_invoke"] = ev(PI, "grep -rn 'claude:invoke' src/", "-", "src/workbench/hosts/local-detached.ts:430 (the only occurrence in src/: no code path supplies the grant)")
E["nm_reg"] = ev(PI, "src/workbench/native-modules.ts", "95-100", "registerNativeProviders(registry: CapabilityRegistry, workspaceRoot: string, options?: NativeProviderOptions): void {\n      forge.registerNativeForgeGateStatus(registry, workspaceRoot);\n      hyperunix.registerNativeHyperUnixFind(registry, workspaceRoot);")
E["nm_reg2"] = ev(PI, "src/workbench/native-modules.ts", "98-99", "furnace.registerNativeFurnaceRunInspect(registry, workspaceRoot);\n      reactivefiber.registerNativeReactiveFiberRender(registry, options?.reactivefiberWorkspaceRoot ?? workspaceRoot);")
E["nm_launch"] = ev(PI, "src/workbench/native-modules.ts", "89-91", "get launchDetachedWorkflow() {\n      return detached.launchDetachedWorkflow;\n    },")
E["pr_hx_in"] = ev(PI, "src/workbench/providers/hyperunix.ts", "14", "const INPUT={type:\"object\",properties:{kind:{type:\"string\",minLength:1},root:{type:\"string\"}},required:[\"kind\"],additionalProperties:false};")
E["pr_hx_reg"] = ev(PI, "src/workbench/providers/hyperunix.ts", "49", "registry.register({descriptor:{id:\"hyperunix.find\",version:\"1.0.0\",description:\"Native bounded HX query with coverage\",inputSchema:INPUT,effectClass:\"read\",permissions:[\"hyperunix:read\"]")
E["pr_hx_imp"] = ev(PI, "src/workbench/providers/hyperunix.ts", "4", "import { Bounds, type ClaimBody, HyperUnix, type QueryResult, resultToJson } from \"@hyperunix/sdk\";")
E["pr_forge_reg"] = ev(PI, "src/workbench/providers/forge.ts", "64-66", "id: \"forge.gate.status\", version: \"1.0.0\",\n ...\n      inputSchema: INPUT_SCHEMA, effectClass: \"read\",")
E["pr_forge_imp"] = ev(PI, "src/workbench/providers/forge.ts", "5", "import { type DecodedEnvelope, decodeResultEnvelope, EnvelopeDecodeError, OperationClient, ServerConnection } from \"@forge/sdk\";")
E["pr_forge_spawn"] = ev(PI, "src/workbench/providers/forge.ts", "87", "const connection = ServerConnection.spawn(\"forge\");")
E["pr_furn_reg"] = ev(PI, "src/workbench/providers/furnace.ts", "27", "registry.register({descriptor:{id:\"furnace.run.inspect\",version:\"1.0.0\",description:\"Read native Furnace Run record without starting or controlling it\",inputSchema:INPUT,effectClass:\"read\",permissions:[\"furnace:inspect\"]")
E["pr_furn_imp"] = ev(PI, "src/workbench/providers/furnace.ts", "4", "import { Furnace } from \"@furnace/sdk\";")
E["pr_rf_argv"] = ev(PI, "src/workbench/providers/reactivefiber.ts", "115", "return [\"--workspace\",workspaceRoot,\"context\",\"render\",...select,\"--no-commit\",\"--no-input\",\"--json\"];")
E["pr_rf_src"] = ev(PI, "src/workbench/providers/reactivefiber.ts", "17", "export const REACTIVE_FIBER_CONTRACT_SOURCE = \"rf@0.1.845:reactive-fiber.cli/v1 context.render --no-commit\";")
E["pr_rf_null"] = ev(PI, "src/workbench/providers/reactivefiber.ts", "70", "if (!record(result) || result.ephemeral!==true || result.render_id!==null ||")
E["pr_rf_spawn"] = ev(PI, "src/workbench/providers/reactivefiber.ts", "139", "const child=spawn(\"rf\",argv,{stdio:[\"ignore\",\"pipe\",\"pipe\"],env:scrubbedEnvironment(process.env,RF_CHILD_ENV_ALLOWLIST)});")
E["pr_rf_reg"] = ev(PI, "src/workbench/providers/reactivefiber.ts", "201", "registry.register({descriptor:{id:\"reactivefiber.render.preview\",version:\"1.0.0\",description:\"RF noncommitted context with native provenance; no authoritative or journal store write")
E["cr_deadline"] = ev(PI, "src/workbench/capability-registry.ts", "62", "export const CAPABILITY_DEADLINE_MS = 30_000;")
E["cr_apply"] = ev(PI, "src/workbench/capability-registry.ts", "271", "this.deadlineMs = limits.deadlineMs ?? CAPABILITY_DEADLINE_MS;")
E["cr_valid"] = ev(PI, "src/workbench/capability-registry.ts", "273-274", "for (const [name, value] of Object.entries({ maxBytes: this.maxBytes, maxDepth: this.maxDepth, deadlineMs: this.deadlineMs, maxInFlight: this.maxInFlight })) {\n      if (!Number.isSafeInteger(value) || value < 1")
E["cr_reject"] = ev(PI, "src/workbench/capability-registry.ts", "416-417", "reject(new CapabilityError(\"transport\", `Capability ${id} exceeded its deadline of ${this.deadlineMs}ms.`));\n        }, this.deadlineMs);")
E["fh_header"] = ev(PI, "src/workbench/hosts/furnace-hosted.ts", "4-6", "* A Pi process registers ONE deterministic workflow callback as a Furnace\n * ExecutorApp executor, opens an EmbeddedHost for ONE Run, writes the Run's\n * extension-driver config, and starts the Run with the public Furnace client.")
E["fh_nosched"] = ev(PI, "src/workbench/hosts/furnace-hosted.ts", "9", "* admission receipt. This module adds no scheduler, no retry and no checkpoint.")
E["hosts_ls"] = ev(PI, "ls src/workbench/hosts/", "-", "furnace-hosted.ts local-detached.ts")
E["forge_files"] = ev(PI, "ls src/workbench/ | grep -i forge", "-", "forge-control-retention.ts forge-control.ts forge-evidence.ts forge-observer.ts forge-operation-observer.ts")
E["ce_header"] = ev(PI, "src/workbench/collective-event.ts", "2-3", "* collective-event.ts — the one Pi boundary for MechanicalWorkflows' collective.event.v1 interchange envelope (wb-4ap.15,\n * COLLECTIVE-ADAPTATION-R15). Any Pi ingestion of such events goes through ingestCollectiveEvent.")
E["ce_provider"] = ev(PI, "src/workbench/collective-event.ts", "39", "export const COLLECTIVE_EVENT_PROVIDER = \"mechanical-workflows\";")
E["ce_added"] = ev(PI, "git log --diff-filter=A -- src/workbench/collective-event.ts", "-", "f65860e1 2026-10-28 feat(workbench): admit MechanicalWorkflows collective.event.v1 envelopes through one typed boundary - ids and producer revision validated ... (wb-4ap.15)")
E["grep_mech_src"] = ev(PI, "grep -ril mechanical src/", "-", "src/workbench/collective-event.ts\nsrc/workflow/tool-description.ts (the latter: the ordinary word 'mechanical' in prose)")
E["pkg_nomech"] = ev(PI, "package.json", "-", "(grep -n mechanical package.json: no match; no @mechanical/* dependency)")
E["fm_w11"] = ev(PI, "docs/workbench/feature-matrix.md", "108", "## W11: MechanicalWorkflows binding host")
E["fm_row"] = ev(PI, "docs/workbench/feature-matrix.md", "112", "| Hosted develop() with real scope-limited service bindings (HX->RF->Claude SDK->Forge composition; four domain outcome variants preserved) | planned | Beads wb-04s (W11) status=blocked and wb-w12 (VC-3 epic) status=blocked; no other W11 beads.")
E["fm_detect"] = ev(PI, "docs/workbench/feature-matrix.md", "112", "No binding-host code or tests exist: grep -ril mechanical over src/ and test/ matches only an incidental word ('cheap mechanical stages') in src/workflow/tool-description.ts; no src/workbench module, no test file.")
E["fm_blame"] = ev(PI, "git blame -L 112,112 docs/workbench/feature-matrix.md", "-", "10a67e73a (James Halladay 2026-10-15 13:16:26 +0000 112) | Hosted develop() with real scope-limited service bindings")
E["t_claude_ls"] = ev(PI, "ls test/ | grep -i claude", "-", "26 files, e.g. workbench-claude-cancel-faults.test.ts workbench-claude-control.test.ts workbench-claude-host-degradation.test.ts workbench-claude-pi-live.test.ts workbench-claude-served-model.test.ts")
E["receipts_ls"] = ev(PI, "docs/workbench/receipts/", "-", "52 per-bead receipt files; 9 reference the Claude host/SDK (wb-19q wb-a3s.1 wb-hqa wb-hqa.1 wb-hqa.2 wb-a2g.12 wb-d8io wb-nl8.1 wb-nl8.3); none is named for the executor itself")
E["receipt_hqa"] = ev(PI, "docs/workbench/receipts/wb-hqa.md", "1", "# wb-hqa: wired claude control admission/settle gap: the booted projection never gains a session-sourced ownership edge for a Claude SDK session, and src never calls settleClaudeInterrupt")
E["ui_inspector"] = ev(PI, "src/ui/workflow-inspector.ts", "1-2", "/** Read-only terminal inspector over the bounded producer-qualified observation projection.\n * A row is a source observation, never an assertion of ownership or verification.")
E["t_et_refuse"] = ev(PI, "test/workbench-execute-tool.test.ts", "173", "it(\"refuses function and furnace-formula definitions in this host without resolving or launching\", async () => {")
E["t_et_mock"] = ev(PI, "test/workbench-execute-tool.test.ts", "40-41", "const launchDetached = vi.fn(async (_ctx: ExtensionContext, launch: { invocationId: string }): Promise<readonly NativeRef[]> =>\n    [{ provider: \"local-detached\", type: \"invocation\", id: launch.invocationId }]);")
E["t_ex_admit"] = ev(PI, "test/workbench-execute.test.ts", "178", "for (const kind of [\"script\", \"function\", \"furnace-formula\"]) expect(decideExecute(request({ definitionRef: { ...DEFINITION, kind } }), host()).decision).toBe(\"admitted\");")
E["t_f10"] = ev(PI, "test/workbench-claude-cancel-faults.test.ts", "535", "it(\"F10 a run abort during beforeDispatch stops the agent before query(): no SDK call, settled as workflow aborted\", async () => {")
E["t_f10_assert"] = ev(PI, "test/workbench-claude-cancel-faults.test.ts", "552-553", "expect(outcome).toEqual({ ok: false, skipped: true, error: WORKFLOW_ABORTED });\n    expect(sdk.calls).toHaveLength(0);")
E["t_f6"] = ev(PI, "test/workbench-claude-cancel-faults.test.ts", "243", "it(\"F6 per-agent isolation: abortAgent stops only its own controller; repeats and unknown ids are no-ops\", async () => {")
E["t_f6_noop"] = ev(PI, "test/workbench-claude-cancel-faults.test.ts", "265-266", "// A repeat after the agent settled, and an id the host never handed out.\n    expect(() => host.abortAgent(\"wf-agent-0\")).not.toThrow();\n    expect(() => host.abortAgent(\"wf-agent-404\")).not.toThrow();")
E["t_nobdskip"] = ev(PI, "grep -rnE 'skip.*beforeDispatch|beforeDispatch.*skip|retry.*beforeDispatch|abortAgent.*beforeDispatch' test/", "-", "(0 hits; grep -rln beforeDispatch test/ -> 7 files, none calls skip/retry/abortAgent while beforeDispatch is parked; F10 uses the run signal only)")
E["t_invoke"] = ev(PI, "test/workbench-local-detached-effects.test.ts", "371-375", "backend: \"claude\",\n ...\n    grants: [\"forge:inspect\", \"claude:invoke\"],")
E["t_invoke2"] = ev(PI, "test/workbench-role-capabilities-settings.test.ts", "1298", "grants: [\"claude:invoke\", ...(role.tools ?? []).map(tool => `claude:tool:${tool}`)], claude,")
E["t_pidet"] = ev(PI, "test/workbench-pi-detached.test.ts", "22", "const launched=await tool.execute(\"launch\",{action:\"launch\",invocationId:\"pi-pure-compute\",scriptPath:path,trustedScript:true,backend:\"deterministic\"},undefined,undefined,context);")
E["t_spy"] = ev(PI, "test/workbench-security-pi-tools.test.ts", "208", "vi.spyOn(detached, \"launchDetachedWorkflow\").mockResolvedValueOnce(receipt);")
E["t_launch_grep"] = ev(PI, "grep -rln launchDetachedWorkflow test/", "-", "15 files; claude:invoke appears in 3 test lines, all of them direct host calls that supply the grant; the index.ts wrapper is mocked (execute-tool vi.fn) or spied (security-pi-tools)")
E["nf_hist"] = ev(PI, "ls new-feedback/", "-", "44 entries dated 2026-10-15..2026-11-05: 2026-11-01 (3), 2026-11-02 (2), 2026-11-03 (1), 2026-11-04 (2), 2026-11-05 (1); baseline f67b6665 held 41 (none dated 11-04/11-05)")
E["nf_from"] = ev(PI, "new-feedback/2026-11-03-CORROBORATION-n-3-sibling-census-cuts-conflicted-at-3-of-48-landings-in-24-h-the-census-file-region-a-header-comment-in-3-of-3-3-known-dirty-refusals-3-landing-loop-stops.md", "3", "**From:** flywheel seat (Pi-Subagents Orchestration Engineer, a8ddce77) — the same seat as the corroborated files, a later cycle (two days on, two new census families); no independent hit is claimed.")
E["nf_conflict"] = ev(PI, "new-feedback/ (ls | grep -i conflict)", "-", "2026-10-27-CORROBORATION-pass-held-wb-c61s-3-way-conflicted-with-landing-469-s-cut-of-the-same-census...; 2026-11-01-CORROBORATION-sibling-census-cuts-conflict-at-landing-in-5-pairs-in-24-h...; 2026-11-03-CORROBORATION-n-3-sibling-census-cuts-conflicted-at-3-of-48-landings...")
E["nf_deadline"] = ev(PI, "new-feedback/ (ls | grep -iE 'deadline|timeout|5000-ms')", "-", "2026-10-20-five-trunk-tests-red-at-the-vitest-default-5000-ms-marker...; 2026-10-21-CORROBORATION-report-mode-census-rows-red-at-the-5000-ms-default...; 2026-10-25-the-7e9a1eb-detached-timing-cure-leaves-the-census-tier-on-the-vitest-5000-ms-default...")
E["nf_report"] = ev(PI, "new-feedback/ (ls | grep -i report-mode)", "-", "2026-10-21-CORROBORATION-report-mode-census-rows-red-at-the-5000-ms-default-in-9-gate-contexts...; 2026-10-28-report-mode-census-rows-turn-one-pi-streaming-5000-ms-timeout-into-2-real-assertion-census-reds...; 2026-10-29-CORROBORATION-n-2-docs14-report-mode-rows...")
E["nf_prep"] = ev(PI, "new-feedback/ (ls | grep -i prep)", "-", "2026-10-31-CORROBORATION-r-b162-ruled-the-load-shaped-fresh-prep-class...; 2026-11-01-CORROBORATION-n-3-74-of-77-refusals-in-24-h-...-192-198-prep-seconds...; 2026-11-02-CORROBORATION-npm-ci-reads-7-s-median-...-prep-step-f-at-1238-s-median...")
E["nf_bodies"] = ev(PI, "grep -il over new-feedback/2026-11-0[123]-*.md (6 files)", "-", "deadline: 0/6; report-mode: 1/6; prep: 6/6; conflict: 6/6")
# ---- MW pin evidence ----
E["mw_log"] = ev(MW, "git log 0c78e253..f7c0a9431d6c", "-", "8 commits incl. 1f29daa7 2026-11-05 08:14:24Z fix(contracts): repair development entrypoint descriptor schema refs and consume the committed file in host tests (MechanicalWorkflows-14zrz); f7c0a943 2026-11-05 08:39:53Z feat(development-rig): add a host AbortSignal")
E["mw_desc_pin"] = ev(MW, "contracts/entrypoints/development.v1.json", "8-9", "\"inputSchema\": \"development-request.v1.schema.json\",\n  \"outputSchema\": \"development-outcome.v1.schema.json\",")
E["mw_desc_base"] = ev(MWB, "contracts/entrypoints/development.v1.json", "8-9", "\"inputSchema\": \"../schemas/development-request.v1.schema.json\",\n  \"outputSchema\": \"../schemas/development-outcome.v1.schema.json\",")
E["mw_desc_diff"] = ev(MW, "git diff 0c78e253 f7c0a9431d6c -- contracts/entrypoints/development.v1.json", "-", "-  \"inputSchema\": \"../schemas/development-request.v1.schema.json\"\n+  \"inputSchema\": \"development-request.v1.schema.json\"\n-  \"outputSchema\": \"../schemas/development-outcome.v1.schema.json\"\n+  \"outputSchema\": \"development-outcome.v1.schema.json\"")
E["mw_desc_status"] = ev(MW, "contracts/entrypoints/development.v1.json", "16-17", "\"status\": \"descriptor-only\",\n  \"note\": \"No remote host loader or generic invocation transport is implemented. Artifact binding belongs to the deployment host.\"")
E["mw_desc_id"] = ev(MW, "contracts/entrypoints/development.v1.json", "3-6", "\"id\": \"mechanical.development.develop.v1\",\n  \"implementation\": {\n    \"package\": \"@mechanical/workflows-development\",\n    \"export\": \"develop\"")
E["mw_eh_check"] = ev(MW, "apps/development-rig/src/entrypoint-host.ts", "89-90", "d.inputSchema !== \"development-request.v1.schema.json\" || d.outputSchema !== \"development-outcome.v1.schema.json\") {\n    throw new Error(\"ENTRYPOINT_CONTRACT_INVALID: unsupported descriptor, schema or entrypoint\");")
E["mw_eh_fn"] = ev(MW, "apps/development-rig/src/entrypoint-host.ts", "84-85", "export async function invokePinnedDevelopment(options: PinnedHostOptions, input: unknown): Promise<DevelopmentOutcome> {\n  const d = options.descriptor;")
E["mw_eh_bind"] = ev(MW, "apps/development-rig/src/entrypoint-host.ts", "92-94", "if (d.bindings.length !== bindings.length || d.bindings.some((binding, index) => binding !== bindings[index]) ||\n      bindings.some(key => typeof options.services[key] !== \"function\")) {\n    throw new Error(\"ENTRYPOINT_BINDING_INVALID: required application callbacks are missing\");")
E["mw_eh_digest"] = ev(MW, "apps/development-rig/src/entrypoint-host.ts", "97-98", "if (!/^sha256:[a-f0-9]{64}$/.test(options.artifactDigest) || await digestFile(options.artifactPath) !== options.artifactDigest) {\n    throw new Error(\"ENTRYPOINT_ARTIFACT_MISMATCH: immutable artifact digest differs\");")
E["mw_eh_out"] = ev(MW, "apps/development-rig/src/entrypoint-host.ts", "105", "if (!validOutcome(raw, request)) throw new Error(\"ENTRYPOINT_OUTPUT_INVALID: producer outcome is incomplete or inconsistent\");")
E["mw_eh_nodrift"] = ev(MW, "git diff --stat 0c78e253 f7c0a9431d6c -- apps/development-rig/src/entrypoint-host.ts", "-", "(empty: unchanged between the program baseline and the pin)")
E["mw_t_eh_pin"] = ev(MW, "apps/development-rig/test/entrypoint-host.test.ts", "12", "const descriptor = JSON.parse(readFileSync(new URL(\"../../../contracts/entrypoints/development.v1.json\", import.meta.url), \"utf8\")) as EntrypointDescriptor;")
E["mw_t_eh_base"] = ev(MWB, "apps/development-rig/test/entrypoint-host.test.ts", "12", "const descriptor: EntrypointDescriptor = {schema:\"mechanical-workflows/entrypoint/v1\",id:\"mechanical.development.develop.v1\",implementation:{package:\"@mechanical/workflows-development\",export:\"develop\"},inputSchema:\"development-request.v1.schema.json")
E["mw_t_ih_desc"] = ev(MW, "apps/development-rig/test/installed-host.test.ts", "29", "const descriptor = JSON.parse(readFileSync(new URL(\"../../../contracts/entrypoints/development.v1.json\", import.meta.url), \"utf8\")) as EntrypointDescriptor;")
E["mw_t_ih_pack"] = ev(MW, "apps/development-rig/test/installed-host.test.ts", "17", "const packed=spawnSync(\"npm\",[\"pack\",\"--ignore-scripts\",\"--json\",\"--pack-destination\",destination],{cwd:library,encoding:\"utf8\"});")
E["mw_t_ih_run"] = ev(MW, "apps/development-rig/test/installed-host.test.ts", "44", "test(\"installed pinned host runs develop from a real local tarball, no source import\",()=>fixture(async root=>{")
E["mw_t_df"] = ev(MW, "apps/development-rig/test/entrypoint-descriptor-file.test.ts", "14-15", "/** PIWB-MW0-R001: the committed descriptor of record is consumed from disk, never from a handwritten copy. */\nconst descriptorUrl = new URL(\"../../../contracts/entrypoints/development.v1.json\", import.meta.url);")
E["mw_t_df_accept"] = ev(MW, "apps/development-rig/test/entrypoint-descriptor-file.test.ts", "52-55", "test(\"invokeInstalledDevelopment accepts the committed descriptor over the real npm-packed tarball\", async () => {\n ...\n  assert.equal(out.kind, \"verified_candidate\");")
E["mw_t_base_ls"] = ev(MWB, "git ls-tree --name-only 0c78e253 apps/development-rig/test/", "-", "(no entrypoint-descriptor-file.test.ts at the baseline; entrypoint-host.test.ts and installed-host.test.ts present with handwritten descriptor literals)")
E["mw_hx_hdr"] = ev(MW, "apps/development-rig/src/hx-scope.ts", "3-5", "* The installed `find` command returns incomplete coverage on live workspaces\n * and cannot bind a pinned Git view. It must not authorize a write; use a\n * separately verified task query before returning complete coverage.")
E["mw_hx_33"] = ev(MW, "apps/development-rig/src/hx-scope.ts", "30-33", "const answer=await hx.find({kind:\"hx.fs/regular-file\",root:\".\"});\n ...\n      queryDigest:answer.queryDigest,revision:null,scopeKind:\"filesystem\"};")
E["mw_hx_45"] = ev(MW, "apps/development-rig/src/hx-scope.ts", "43-46", "const complete=observed.exitCode===0&&observed.terminalReached&&\n    observed.coverageSummary.completeness===\"complete\"&&observed.coverageSummary.licensesAbsence===true&&\n    observed.scopeKind===\"task\"&&observed.revision===request.baseRevision&&\n    typeof observed.queryDigest===\"string\"&&!!observed.queryDigest;")
E["mw_hx_nodrift"] = ev(MW, "git diff --stat 0c78e253 f7c0a9431d6c -- apps/development-rig/src/hx-scope.ts", "-", "(empty: unchanged)")
E["mw_rf_argv"] = ev(MW, "apps/development-rig/src/rf-context.ts", "69-70", "const argv=[\"context\",\"render\",\"--workspace\",workspaceRoot,\"--model\",model,\"--task\",sourceText,\n    \"--no-input\",\"--strict\",\"--json\"];")
E["mw_rf_req"] = ev(MW, "apps/development-rig/src/rf-context.ts", "82-84", "if (typeof text !== \"string\" || !text.trim() || !text.includes(task) || !text.includes(sourceRevision) ||\n      /\\bhas no content yet\\b/i.test(text) ||\n      typeof renderId !== \"string\" || !renderId.trim() ||")
E["mw_rf_req2"] = ev(MW, "apps/development-rig/src/rf-context.ts", "86-89", "typeof graph !== \"string\" || !graph.trim() ||\n      capabilities?.[\"model_id\"] !== model || capabilities?.[\"verified\"] !== true ||\n      typeof available !== \"number\" || !Number.isFinite(available) || available < 0)\n    throw new Error(\"RF_CONTEXT_UNESTABLISHED: ...")
E["mw_rf_base"] = ev(MWB, "apps/development-rig/src/rf-context.ts", "50", "typeof renderId !== \"string\" || !renderId.trim() ||")
E["mw_rf_drift"] = ev(MW, "git diff --stat 0c78e253 f7c0a9431d6c -- apps/development-rig/src/rf-context.ts", "-", "1 file changed, 36 insertions(+), 2 deletions(-)  (1872a6f1 rf binary resolution + a074428d guard; the render_id/task/revision/budget requirements are unchanged)")
E["mw_ld_hdr"] = ev(MW, "apps/development-rig/src/live-development.ts", "2-4", "* First real single-writer development composition.\n * Git tracked-file census + explicitly plain context + selected Claude agent SDK\n * + native Forge gate. HX and RF integration remain separate pending work.")
E["mw_ld_result"] = ev(MW, "apps/development-rig/src/live-development.ts", "19-21", "readonly mode: \"live-claude-forge\";\n  readonly discovery: \"git-tracked-files\";\n  readonly context: \"plain-task-context\" | \"reactive-fiber\";")
E["mw_ld_opts"] = ev(MW, "apps/development-rig/src/live-development.ts", "28-30", "export interface LiveDevelopmentOptions extends AgentOptions {\n  readonly forgeExecutable?: string;\n  readonly contextMode?: \"plain\" | \"rf\";")
E["mw_ld_txn"] = ev(MW, "apps/development-rig/src/live-development.ts", "47-49", "* Caller must opt in to writes through the CLI. This application function itself\n * is not a durable transaction: interrupted agent writes require manual reconciliation.")
E["mw_ld_signal"] = ev(MW, "apps/development-rig/src/live-development.ts", "57-59", "// No provider initialization or agent side effects before input and basis preflight.\n  if (!task.trim()) throw new Error(\"MISSING_TASK: task must be nonempty\");\n  assertNotCancelledBeforeDispatch(options.signal);")
E["mw_ld_signal2"] = ev(MW, "apps/development-rig/src/live-development.ts", "111-112", "// Re-check after discovery and context compilation: the last point before the agent runner.\n      assertNotCancelledBeforeDispatch(options.signal);")
E["mw_ld_census"] = ev(MW, "apps/development-rig/src/live-development.ts", "78-81", "// Complete only for Git's tracked-file census, not task-specific semantic relevance.\n        coverage: \"complete\",\n        files,\n        evidence: { system: \"git\", kind: \"tracked-file-census\", id: revision },")
E["mw_ld_commit"] = ev(MW, "apps/development-rig/src/live-development.ts", "117", "\"You must produce and commit a coherent code change. Stage with git add, then commit with git commit.\",")
E["mw_ld_nocommit"] = ev(MW, "apps/development-rig/src/live-development.ts", "135-136", "if (after.commit === revision) {\n        throw new Error(\"AGENT_COMMIT_NOT_ESTABLISHED: the agent made no committed change\");")
E["mw_ld_rf"] = ev(MW, "apps/development-rig/src/live-development.ts", "85-88", "if (options.contextMode === \"rf\") {\n        if (!options.model) throw new Error(\"RF_MODEL_REQUIRED: --model is required for RF context\");\n        const render = options.renderContext ?? renderTaskContext;")
E["mw_ci_signal"] = ev(MW, "apps/development-rig/src/claude-implement.ts", "15-20", "/**\n   * Host-provided cancellation. Honoured as a pre-dispatch barrier only: a signal already\n   * aborted before the first provider side effect dispatches nothing. It is not forwarded to\n   * the SDK and an abort during a running session is not handled by this slice.\n   */\n  readonly signal?: AbortSignal;")
E["mw_ci_base"] = ev(MWB, "apps/development-rig/src/claude-implement.ts", "11-15", "export interface AgentOptions {\n  readonly model?: string;\n  readonly maxTurns?: number;\n  readonly maxBudgetUsd?: number;\n}")
E["mw_ld_base_sig"] = ev(MWB, "apps/development-rig/src/live-development.ts", "-", "(git show 0c78e253:apps/development-rig/src/live-development.ts | grep -ci 'signal|abort' -> 0)")
E["mw_t_sig"] = ev(MW, "apps/development-rig/test/live-development.test.ts", "415", "test(\"an already-aborted host signal dispatches no agent and no Forge, and leaves the tree and HEAD untouched\", () => withRepo(async root => {")
E["mw_dev_fn"] = ev(MW, "packages/development/src/develop.ts", "21-24", "export async function develop(\n  services: DevelopmentServices,\n  request: DevelopmentRequest,\n): Promise<DevelopmentOutcome> {")
E["mw_dev_scope"] = ev(MW, "packages/development/src/develop.ts", "36-38", "if (scope.coverage !== \"complete\") {\n    return { kind: \"needs_evidence\", scope, reason: \"SCOPE_INCOMPLETE\" };\n  }")
E["mw_dev_ctx"] = ev(MW, "packages/development/src/develop.ts", "40-42", "const context = await services.compileContext(scope, request);\n  if (!equalBasis(context.basis, requestedBasis)) {\n    return { kind: \"indeterminate\", reason: \"CONTEXT_BASIS_MISMATCH\", ...(context.evidence ? { evidence: context.evidence } : {}) };")
E["mw_dev_cand"] = ev(MW, "packages/development/src/develop.ts", "45-48", "const candidate = await services.implement(context, scope, request);\n  if (!equalBasis(candidate.parentBasis, requestedBasis) ||\n      candidate.basis.workspaceId !== request.workspaceId ||\n      !candidate.basis.revision.trim() ||")
E["mw_ct_out"] = ev(MW, "packages/development/src/contracts.ts", "54-58", "export type DevelopmentOutcome =\n  | { readonly kind: \"verified_candidate\"; ... }\n  | { readonly kind: \"verification_failed\"; ... }\n  | { readonly kind: \"needs_evidence\"; readonly scope: ScopeResult; readonly reason: \"SCOPE_INCOMPLETE\" }\n  | { readonly kind: \"indeterminate\"; ...")
E["mw_ct_verif"] = ev(MW, "packages/development/src/contracts.ts", "40-44", "export interface VerificationResult {\n  readonly basis: SubjectBasis;\n  readonly verdict: \"passed\" | \"failed\" | \"partial\" | \"unknown\";\n  readonly evidence?: EvidenceRef;\n  readonly diagnostic?: string;")
E["mw_ct_ctx"] = ev(MW, "packages/development/src/contracts.ts", "27-31", "export interface CompiledContext {\n  readonly basis: SubjectBasis;\n  readonly text: string;\n  readonly evidence?: EvidenceRef;\n}")
E["mw_ct_svc"] = ev(MW, "packages/development/src/contracts.ts", "47-52", "export interface DevelopmentServices {\n  readonly discover: ...;\n  readonly compileContext: ...;\n  readonly implement: ...;\n  readonly verify: ...;\n}")
E["mw_dev_nodrift"] = ev(MW, "git diff --stat 0c78e253 f7c0a9431d6c -- packages/development/src", "-", "(empty: unchanged)")
E["mw_ih_hdr"] = ev(MW, "apps/development-rig/src/installed-host.ts", "1", "/** Transient local installer/loader for an exact SHA-256-pinned npm tarball. */")
E["mw_ih_npm"] = ev(MW, "apps/development-rig/src/installed-host.ts", "26", "await exec(\"npm\",[\"install\",\"--ignore-scripts\",\"--offline\",\"--no-audit\",\"--no-fund\",\"--no-save\",artifact],{")
E["mw_ih_digest"] = ev(MW, "apps/development-rig/src/installed-host.ts", "37-38", "const copyDigest = \"sha256:\" + createHash(\"sha256\").update(await readFile(artifact)).digest(\"hex\");\n        if (copyDigest !== options.artifactDigest) throw new Error(\"ENTRYPOINT_ARTIFACT_MISMATCH: artifact bytes changed during installation\");")
E["mw_coord"] = ev(MW, "packages/coordination/src/index.ts", "4-6", "export { reconcile } from \"./resolver.js\";\n ...\nexport { sequential, sequentialAccepted, parallel, guarded, guardedWithWitness, alternative, inhibit, repeated, initialRepeatedMemory } from \"./combinators.js\";")
E["mw_coord2"] = ev(MW, "packages/coordination/src/index.ts", "23-29", "EPISODE_ENVIRONMENTS, toEpisode, episodeBytes, labelEpisodeMode, sanitizeValue, UNKNOWN } from \"./episode.js\";\n ...\nexport { replayTape } from \"./replay.js\";")
E["mw_coord3"] = ev(MW, "packages/coordination/src/index.ts", "59-60", "export { exportEpisodeForTraining, exportEpisodesForTraining, labelTrainingMode, trainingBytes, attachPerActorCredit } from \"./training-export.js\";\nexport { importTrainingExport } from \"./training-import.js\";")
E["mw_rig_ls"] = ev(MW, "ls apps/development-rig/src/", "-", "beads-claim.ts beads-host.ts beads-intake.ts claude-implement.ts claude-review.ts cli.ts entrypoint-host.ts furnace-app.ts furnace-gate.ts furnace-process-executor.ts hx-scope.ts installed-host.ts live-development.ts rf-context.ts rf-binary.ts ... (52 modules)")
E["mw_cli_live"] = ev(MW, "apps/development-rig/src/cli.ts", "35", "if (process.argv[2] === \"--live-develop\") {")
E["mw_qa"] = ev(MW, "qa/integration/", "-", "2026-10-15-combined-live-composition.md 2026-10-15-live-forge-gate.md 2026-10-15-furnace-and-agent.md 2026-10-15-furnace-executor-app-host.md 2026-10-15-native-hx-rf-observations.md 2026-10-19-cac-sources.md 2026-10-21-graph-policy-bead-selection.md; evidence/ (49 files)")
E["mw_qa_log"] = ev(MW, "git log -1 -- qa/integration/2026-10-15-combined-live-composition.md", "-", "9e4f5f2b 2026-10-15 05:35:52 +0000")
E["mw_d13"] = ev(MW, "docs/13-live-forge-verification.md", "1-3", "# 13 — Real Forge verification: first live vertical cut\n\n**Status (2026-10-15): source, negative controls, and native Forge PASS/FAIL plus Furnace Run/Attempt witnesses recorded; Furnace SDK release build remains red.**")
E["mw_d14"] = ev(MW, "docs/14-live-single-writer-development.md", "10", "3. `git ls-files -z` enumerates tracked files. The `coverage: complete` statement is **only** complete for the Git tracked-file census; it is not a claim of task-relevant scope completeness.")
E["mw_d04"] = ev(MW, "docs/04-public-programming-model.md", "35", "The development function executes **discover → compileContext → implement → verify**, with early return upon input/basis/evidence inadequacy.")
E["mw_d07"] = ev(MW, "docs/07-identity-effects-and-recovery.md", "88", "`receiptOf()` labels that stage established only when the RF producer id is present, instead of calling a real render plain task context. The Git census remains observed rather than HX-complete task scope")
E["mw_noproof"] = ev(MW, "grep -rni 'proof contract' docs packages apps (*.md, *.ts)", "-", "(0 hits; grep compileContext docs/*.md -> 04-public-programming-model.md:10,35 and 06-sdk-integration-and-hosts.md:105, none states proof obligations)")
E["mw_nopi"] = ev(MW, "grep -rniE 'pi-subagents|@pi/' packages apps (*.ts,*.json, node_modules excluded)", "-", "(0 hits)")
E["mw_nogc"] = ev(MW, "grep -rn 'git-census|gitCensus|git_census' apps packages (*.ts)", "-", "(0 hits: 'git-census' is not an identifier at the pin; the shipped discriminant is discovery: \"git-tracked-files\")")
E["mw_prog_3"] = ev(MW, MWP, "3", "**Static source audit, not execution:** pinned `main` `0c78e2530cbf5737a8bbb763475385a2f0f760cc`, Pi implementation at `f67b6665a132dbb0e86aea48cf36cf6ae0412521`, shipped documentation and existing tests.")
E["mw_prog_22"] = ev(MW, MWP, "22", "The repo's `contracts/entrypoints/development.v1.json` declares `inputSchema:\"../schemas/development-request.v1.schema.json\"` and matching output path; `apps/development-rig/src/entrypoint-host.ts` requires exact bare strings")
E["mw_prog_34"] = ev(MW, MWP, "34", "Its default native `runNative()` invokes a filesystem `find` and returns `revision:null,scopeKind:\"filesystem\"`. That is incomplete for task-specific mutation authorization by design.")
E["mw_prog_42"] = ev(MW, MWP, "42", "`developLive(root,task,options)` and `runClaudeImplementation(root,prompt,options)` lack a public host-provided AbortSignal; an agent may continue writing/committing while an external observer believes cancellation requested.")
E["mw_prog_66"] = ev(MW, MWP, "66", "fix Pi `src/worktree.ts` catch path that may remove uncommitted edits on Git-preservation failure (P0), Pi detached-Claude grant mismatch (`src/index.ts` empty grants versus detached `claude:invoke` requirement), per-agent skip/retry startup abort race")
E["mw_prog_66b"] = ev(MW, MWP, "66", "Detailed code-level evidence is in the paired Pi audit. These are Pi-owned; do not work around them by weakening Mechanical's candidate/source checks.")
E["mw_skill_14"] = ev(MW, ".agents/skills/mechanical-pi-host/SKILL.md", "14", "- The checked-in `contracts/entrypoints/development.v1.json` and `entrypoint-host.ts` agree on one canonical schema-ref grammar (bare filename in `contracts/schemas/`, no `..`); `apps/development-rig/test/entrypoint-descriptor-file.test.ts` consumes the real file")
E["mw_readme_13"] = ev(MW, "contracts/README.md", "13", "The [Pi Workbench program](../docs/programs/pi-workbench-interop-2026-11-04/README.md) audit found a schema-path mismatch between the descriptor and the host; it is repaired (PIWB-MW0-R001). The canonical schema-ref grammar is a bare filename")
E["prog_stat"] = ev(PI, "git show --stat 7c80c34346c2", "-", "10 files changed, 325 insertions(+), 2 deletions(-): SKILL.md, AGENTS.md, README.md, docs/workbench/07-native-integrations.md, docs/workbench/README.md and the five program docs - no receipts, tests, fixtures or run logs in the program commit")
E["mw_prog_stat"] = ev(MW, "git show --stat bf8fbb93", "-", "docs-only commit: .agents/skills/mechanical-pi-host/SKILL.md, AGENTS.md, README.md, contracts/README.md, docs/05, docs/06, docs/README.md and the program docs (no receipts or tests)")
# ---- doc pin evidence ----
E["d01_3"] = ev(DOC, D01, "3", "**Method:** pinned source inspection of both default branches, documented tests, current feature/status matrices, and Pi `new-feedback/` (including 2026-11-01 to 2026-11-03 reports). This is **static audit**, not live verification.")
E["d01_9"] = ev(DOC, D01, "9", "| Pi Claude executor | Real `@anthropic-ai/claude-agent-sdk` query, session observation, abort, resume, role/model handling | `src/workbench/claude-host.ts`; `src/index.ts` | Source implemented, tests and receipts recorded |")
E["d01_10"] = ev(DOC, D01, "10", "| Pi JS workflow interpreter | `agent`, `parallel`, `pipeline`, `node`, nested functions, bounded worker | `src/workflow/runtime.ts`; `worker-source.ts` | Source implemented |")
E["d01_11"] = ev(DOC, D01, "11", "| Pi invocation and UI | `workflow_execute` launch, `workflow_observe`, `workflow_control`, `workflow_reconcile`, projection and inspector | `src/workbench/execute-tool.ts`; `src/index.ts` | Script use implemented; function use not implemented |")
E["d01_12"] = ev(DOC, D01, "12", "| Pi native providers | Forge status; HX find; Furnace inspect; RF preview; separate Forge operation/control and Furnace-hosted adapter | `src/workbench/providers/*`; `hosts/furnace-hosted.ts` | Real adapters, limited operation-specific contracts |")
E["d01_13"] = ev(DOC, D01, "13", "| Mechanical development function | `develop(services, request)`, early stop on incomplete discovery, candidate basis and producer verification evidence | `MechanicalWorkflows/packages/development/src/{develop,contracts}.ts` | Source implemented |")
E["d01_14"] = ev(DOC, D01, "14", "| Mechanical installed local host | SHA-256 tarball validation, offline installation, trusted callback binding, outcome validation | `MechanicalWorkflows/apps/development-rig/src/{entrypoint-host,installed-host}.ts` | Source implemented; packed-tarball tests |")
E["d01_15"] = ev(DOC, D01, "15", "| Mechanical live rig | opt-in Claude → committed candidate → native Forge, plus RF and Beads paths and Furnace executor | `MechanicalWorkflows/apps/development-rig/src/` | Recorded live producer receipts; not a Pi binding |")
E["d01_16"] = ev(DOC, D01, "16", "| Coordination functions | Pure policy combinators, resolution, episodes, replay and training exports | `MechanicalWorkflows/packages/coordination/src/index.ts` | Source implemented; proposed first read-only function consumer |")
E["d01_17"] = ev(DOC, D01, "17", "| Pi-to-Mechanical function invocation | None registered: no Mechanical SDK/host adapter; `workflow_execute` refuses non-script | W11 row of `feature-matrix.md`, `execute-tool.ts` | **Not implemented** |")
E["d01_23a"] = ev(DOC, D01, "23", "`src/worktree.ts:125-181` commits modified worktrees and removes them. The outer catch of `cleanupWorktree()` force-removes the worktree and reports `hasChanges:false` on preservation errors. The existing worktree tests explicitly exercise this outcome.")
E["d01_23b"] = ev(DOC, D01, "23", "The Claude workflow host currently rejects `isolation:\"worktree\"`; providing a real isolated workspace is a separate work item.")
E["d01_21"] = ev(DOC, D01, "21", "### P0: legacy worktree preservation may discard uncommitted changes")
E["d01_27"] = ev(DOC, D01, "27", "`src/workbench/execute.ts` accepts definition kind `function` in its model, but `src/workbench/execute-tool.ts:215-219` refuses all kinds except `script`. `native-modules.ts` registers four read operations only. W11 explicitly remains planned in the feature matrix.")
E["d01_27b"] = ev(DOC, D01, "27", "Introduce an allowlisted, digest-pinned function host; do not use a shell-backed `node()` or paste Mechanical code into the workflow interpreter.")
E["d01_31"] = ev(DOC, D01, "31", "`MechanicalWorkflows/contracts/entrypoints/development.v1.json` declares input/output schema refs as `../schemas/development-request.v1.schema.json` and `../schemas/development-outcome.v1.schema.json`.")
E["d01_31b"] = ev(DOC, D01, "31", "tests construct matching descriptors by hand rather than loading the committed JSON. The as-committed descriptor therefore fails the host's descriptor check. Fix and test the authoritative descriptor before Pi consumes it")
E["d01_35"] = ev(DOC, D01, "35", "`src/index.ts:2621-2630` sends `backend:\"claude\"` with `grants:[]` for the registered detached `workflow_execute` launch. `src/workbench/hosts/local-detached.ts:430-442` requires `claude:invoke` and exact tool grants. The current construction cannot pass its own preflight.")
E["d01_39"] = ev(DOC, D01, "39", "A skip during that await can miss cancellation (workflow-wide abort uses a separate signal re-check). **Potential race, reproduce before claiming fixed**: hold `beforeDispatch`, skip/retry, release it, assert there is no unapproved SDK dispatch or second attempt.")
E["d01_43"] = ev(DOC, D01, "43", "`src/workbench/claude-host.ts:166-175` includes cwd/model/permissions/tools/roles/grants/principal but not a measured source revision, referenced skill/system instruction contents, or effective provider versions.")
E["d01_47"] = ev(DOC, D01, "47", "Mechanical `developLive()` is a single-writer Git side-effect with no general host-supplied AbortSignal in its public options. Pi's `node()` default registry deadline is 30 seconds and cannot substitute for an async, observable function launch.")
E["d01_51"] = ev(DOC, D01, "51", "Mechanical `apps/development-rig/src/hx-scope.ts` insists on complete `task` scope with revision and digest. Its default native query sets `scopeKind:\"filesystem\"` and `revision:null`; it cannot authorize the full task-scoped development path.")
E["d01_55"] = ev(DOC, D01, "55", "Pi `reactivefiber.render.preview` uses `--no-commit`; Mechanical `renderTaskContext` expects a nonempty committed `render_id`, context containing task/revision and provenance/budget witness. Reusing Pi's preview response as Mechanical's authoritative `compileContext` would break its documented proof contract.")
E["d01_59"] = ev(DOC, D01, "59", "Per-workflow agent/node semaphores do not by themselves bound multiple concurrent workflows, scheduled Pi agents or Furnace attempts. ... Validate positive integer concurrency/caps (`new Semaphore(options.concurrency ?? ...)` can otherwise accept zero).")
E["d01_59b"] = ev(DOC, D01, "59", "Review recent `new-feedback/` findings on shared census edit conflicts, test deadline inflation, report-mode readers and prep bottlenecks; avoid shared assertion/header files for unrelated cuts.")
E["d01_64"] = ev(DOC, D01, "64", "- P0 worktree removal and P1 detached admission are direct source contradictions. Cancellation is a race hypothesis requiring fault injection. Performance and live integration evidence is historical and may drift.")
E["d01_65"] = ev(DOC, D01, "65", "- The Mechanical descriptor path discrepancy is independently checkable against the exact committed JSON and TypeScript host; a descriptor built manually in tests does not establish compatibility with that file.")
E["sk_12"] = ev(DOC, SK, "12", "`workflow_execute` accepts **only script** definitions today; function and furnace-formula are modelled but refused.")
E["sk_13"] = ev(DOC, SK, "13", "- Mechanical exports `develop(services,request)` and has a pinned installed tarball host. Pi does not currently load or call that host. The source tree contains no registered Mechanical binding.")
E["sk_14"] = ev(DOC, SK, "14", "- Mechanical's checked-in descriptor and its entrypoint host disagree about schema reference spelling. Test the checked-in file, not a constructed approximation.")
E["sk_15"] = ev(DOC, SK, "15", "- Pi's registered detached Claude request sends `grants:[]`, but local detached admission demands `claude:invoke`; never remove this grant requirement.")
E["sk_16"] = ev(DOC, SK, "16", "- The live Mechanical Git-census mode is real but not certified task-scoped HX. Pi RF preview is not a committed RF render. No Pi-to-Mechanical end-to-end acceptance has been witnessed.")
E["sk_32"] = ev(DOC, SK, "32", "- Long-lived `develop()`: `workflow_execute` async function launch, not default 30-second `node()`.")
E["d02_48"] = ev(DOC, D02, "48", "Mechanical checks the descriptor schema names in `invokePinnedDevelopment` and ships relative schema paths. Adopt one canonical schema-ref grammar in the Mechanical repo:")
E["d02_40"] = ev(DOC, D02, "40", "profile: \"git-census\" | \"native-task-scope\";")
E["d03_7"] = ev(DOC, D03, "7", "| PI-0 | Pi + Mechanical | Pin baseline, reconcile descriptor canonicalization and host ABI; signed-off audit inventory | Read committed manifest via actual host; wrong digest/path/schema refuse before import |")
E["d03_18"] = ev(DOC, D03, "18", "1. Fix Mechanical checked-in descriptor versus `entrypoint-host.ts` comparison; test exactly checked-in descriptor and a packed tarball.")
E["d03_22"] = ev(DOC, D03, "22", "5. Register an abort token before the async Claude `beforeDispatch` seam, and test skip/retry and workflow cancel while startup is parked.")

G = {}
def g(cid, status, permitted, overclaims, rationale, ev=(), defeaters=(), rivals=(), propagation="", missing="",
      case="", counter="", narrower="", settle="", attacks=(), remediation="none", presup=""):
    assert cid in BY, cid
    assert len(rationale) <= 400, (cid, len(rationale))
    G[cid] = dict(status=status, permitted=permitted, overclaims=overclaims, rationale=rationale, ev=list(ev),
                  defeaters=list(defeaters), rivals=list(rivals), propagation=propagation, missing=missing, case=case,
                  counter=counter, narrower=narrower, settle=settle, attacks=list(attacks), remediation=remediation, presup=presup)
NODRIFT = "Pi src/ is byte-identical from the program baseline f67b6665 to the pin b27829e6 (git diff --stat empty), so every Pi file:line re-locates unchanged."
ONE_LINEAGE = ("provenance", "The MW program doc (same author, same evening) restates this; it is one lineage, not an independent witness - the pin source is the only independent check.")
NOT_RUN = "Not run: no test, Forge gate or live producer call was executed for this audit; every grade is from source reading at the pins."

# ===================== Method =====================
g("C0101", "SUPPORTED", "The audit reports that its method was pinned source inspection of both default branches at pi f67b6665 / MW 0c78e253.", False,
  "Self-report of method; the README names the two baselines and the lens drift checks are consistent with a source read at those revisions. No audit session log exists to verify what was inspected.",
  ev=["d01_3", "src_nodrift"], propagation="none (self-report; no dependants)", missing="the audit session transcript or probe log")
g("C0102", "SUPPORTED", "The audit reports inspecting documented tests and the feature/status matrices.", False,
  "Self-report; consistent with its citations of test/worktree.test.ts behaviour and the W11 feature-matrix row. Not independently verifiable.", ev=["d01_3", "fm_row"], missing="the audit session transcript")
g("C0103", "SUPPORTED", "new-feedback/ holds six reports dated 2026-11-01..2026-11-03 (at baseline and pin); the audit states it read them.", False,
  "Existence is ESTABLISHED by ls at the pin (3+2+1 files; all 41 baseline files present, none dated 11-04/05 at baseline). 'that the audit read' is a self-report. Two 11-04 and one 11-05 file postdate the baseline and were not available to the audit.",
  ev=["nf_hist", "d01_3", "nf_from"], defeaters=[("temporal", "Three later files (2026-11-04 x2, 2026-11-05) exist at the pin only; the window the method names is the baseline tail, not the pin tail."), ("provenance", "All 44 files come from one flywheel seat lineage (a8ddce77); every 11-0x file calls itself 'the same seat ... a later cycle'.")],
  rivals=["The window 11-01..11-03 is the set the audit read (self-report) vs. the set that existed - both hold at baseline."],
  propagation="caps C0263-C0266 at SUPPORTED via the single-lineage and window findings", missing="the audit session transcript (for the 'read' half)",
  case="ls new-feedback/ at the pin lists exactly 3/2/1 files for 11-01/02/03, and the baseline tree held them too.", counter="Reading cannot be shown from the repo; only existence can.", narrower="Six same-seat feedback files dated 2026-11-01..03 exist in new-feedback/ at f67b6665 and b27829e6.", settle="An audit transcript naming the files read would upgrade the 'read' half to ESTABLISHED.",
  attacks=[("version mismatch", "checked git ls-tree f67b6665 new-feedback/: 41 files, none 11-04/05 - the audit's window matches its baseline"), ("source multiplicity", "all six files are one seat lineage - counted once")])
g("C0104", "NON-EPISTEMIC", "The audit defines itself as a static audit, not live verification.", False, "Definition/self-classification; consistent with the Audit limitations section and with no receipts of runs. Presupposition (no live runs) is consistent with the pins.", ev=["d01_3", "d01_64"], presup="consistent")
g("C0105", "NON-EPISTEMIC", "Norm: source existence is not to be read as proof of deployment.", False, "Epistemic norm; consistent with linguistic-integrity rules (implemented != exercised).", ev=["d01_3"], presup="consistent")
g("C0106", "NON-EPISTEMIC", "Norm: feedback performance numbers are historical producer measurements at their windows.", False, "Norm; its presupposition (feedback files carry dated windows) is ESTABLISHED by the From: lines quoting measurement windows.", ev=["nf_from"], presup="ESTABLISHED")

# ===================== What exists: Pi Claude executor =====================
g("C0107", "ESTABLISHED", "claude-host.ts imports query from @anthropic-ai/claude-agent-sdk and calls it (query = config.query ?? sdkQuery; query({prompt, options})).", False,
  "Direct source observation at the pin: the SDK query is the production default and is invoked at line 253; tests may inject config.query, which does not make the production path a stub. " + NODRIFT,
  ev=["ch_import", "ch_querydef", "ch_query", "src_nodrift"], rivals=["'real' read as 'exercised live' is not established (no run); 'real' as 'not a stub implementation' is."],
  case="The import and call sites are unambiguous.", counter="config.query injection means the host can run against a fake; 'real' is about the default binding only.", narrower="The default query binding is the SDK's query().", settle="A live receipt would establish exercise; none was run here.",
  attacks=[("implemented->exercised", "the claim says 'issues a real query'; graded as code binding, not as a run")])
g("C0108", "ESTABLISHED", "The host observes the SDK session stream (for-await over messages, onMessage hook, session_id capture into a sessions map).", False,
  "Lines 259-262 iterate the live stream, forward each message to config.onMessage and capture session_id; the sessions map (153) retains per-agent entries.", ev=["ch_onmsg", "ch_sessions"],
  case="Observation hooks and session capture are present in the invoke loop.", counter="'Session observation' could be read as a UI feature; here it is the host hook surface.", narrower="Per-message observation hook plus session-id capture.", settle="none needed",
  attacks=[("scope inflation", "graded for the host module, not for a UI")])
g("C0109", "ESTABLISHED", "The host implements abortAgent via a per-agent AbortController map.", False, "abortAgent at 341-344 aborts controllers.get(agentId); controllers are created per invoke (216-220).", ev=["ch_abort", "ch_ctrl"],
  case="Per-agent controllers exist and abortAgent targets them.", counter="Abort is a no-op during the beforeDispatch window (see C0213) - a limit, not a refutation.", narrower="Abort is implemented for agents whose controller is registered.", settle="none", attacks=[("counterevidence omitted", "the startup window gap is recorded under C0213, not hidden")])
g("C0110", "ESTABLISHED", "The host implements resumeAgent (session lookup via getSessionInfo, refusal of unknown/mismatched sessions).", False, "resumeAgent at 345-358 looks up the saved session and re-invokes with previous; refuses unknown sessions.", ev=["ch_resume", "ch_pending"],
  case="resumeAgent is present with explicit refusals.", counter="none material", narrower="same", settle="none", attacks=[("documented->implemented", "code, not docs, cited")])
g("C0111", "ESTABLISHED", "The host resolves roles (config.roles by agentType) and models (request > role > config, via resolvedModel).", False, "Lines 197-205 resolve role and model and refuse unavailable roles/models.", ev=["ch_role", "ch_model"],
  case="Role/model resolution code is explicit.", counter="none", narrower="same", settle="none", attacks=[("entailment", "cited lines entail the proposition")])
g("C0112", "ESTABLISHED", "The executor lives in src/workbench/claude-host.ts; src/index.ts wires it (workbench tools, detached launch).", False, "Both files exist at the pin and index.ts references createClaudeWorkflowHost through native-modules; " + NODRIFT, ev=["ch_sep", "ix_launch", "src_nodrift"],
  case="File locations verified.", counter="none", narrower="same", settle="none", attacks=[("version mismatch", "no src drift baseline->pin")])
g("C0113", "ESTABLISHED", "Tests for the Claude executor exist in the repo (26 test/workbench-claude-*.test.ts files at the pin).", False, "ls test/ | grep -i claude -> 26 files incl. cancel-faults, control, host-degradation, served-model. Existence only; " + NOT_RUN, ev=["t_claude_ls", "t_f10"],
  case="26 dedicated test files.", counter="'recorded' could imply 'passing'; passing was not run here.", narrower="Test files exist; their verdicts were not re-run.", settle="A Forge gate run would establish pass status.", attacks=[("tested->correct", "graded as existence only")])
g("C0114", "SUPPORTED", "Per-bead receipts under docs/workbench/receipts/ reference the Claude host (9 of 52 files); no receipt is dedicated to the executor as such.", True,
  "Detector: grep -rli 'claude-host|claude sdk|claude-agent-sdk' docs/workbench/receipts -> 9 files (e.g. wb-hqa.md on Claude control wiring). Receipt contents were not verified against the executor's behaviour, so 'receipts recorded' is supported, not established.",
  ev=["receipts_ls", "receipt_hqa"], defeaters=[("scope", "receipts are per-bead landings that mention the host, not a receipt of the executor feature")],
  case="Nine receipts name the Claude host.", counter="None is an executor acceptance receipt; they record bead landings.", narrower="Receipts referencing the Claude host exist.", settle="A named executor receipt (live run) would upgrade.", attacks=[("absence without detector", "detector stated; 9 hits")])

# ===================== What exists: interpreter =====================
for cid, prim, evs in [("C0115", "agent", ["ws_agent"]), ("C0116", "parallel", ["ws_par"]), ("C0117", "pipeline", ["ws_pipe"]), ("C0118", "node", ["ws_agent", "rt_callnode"])]:
    g(cid, "ESTABLISHED", f"worker-source.ts defines the `{prim}` primitive at the pin.", False, f"Direct observation of the `{prim}` definition in src/workflow/worker-source.ts; {NODRIFT}", ev=evs + ["src_nodrift"],
      case=f"The `{prim}` definition is present.", counter="none", narrower="same", settle="none", attacks=[("version mismatch", "no src drift")])
g("C0119", "SUPPORTED", "Nested workflow() invocations are supported to one level (a second level is refused; nestedCap bounds the count).", True,
  "worker-source.ts 713 refuses nesting deeper than one level and nestedCount is capped by workerData.nestedCap; 'nested functions' is true with the one-level qualifier the doc omits.", ev=["ws_nested", "rt_worker"],
  defeaters=[("scope", "nesting is one level deep only")], case="Nested workflow() exists.", counter="Unqualified 'nested functions' suggests arbitrary depth.", narrower="One-level nesting with a cap.", settle="none", attacks=[("quantifier", "depth qualifier added")])
g("C0120", "ESTABLISHED", "Scripts run inside a node:worker_threads worker with a vm context and explicit caps (agent cap 1000, item cap 4096, nested cap).", False, "worker-source.ts 71-72 and runtime.ts 43-46/906-919 show the worker, vm and caps.", ev=["ws_threads", "rt_caps", "rt_worker"],
  case="Worker + caps are explicit.", counter="'bounded' as memory/CPU limits is not what is shown; bounds are counts/caps.", narrower="Count-bounded worker.", settle="none", attacks=[("semantic", "bounded = capped counts, recorded")])
g("C0121", "ESTABLISHED", "The interpreter lives in src/workflow/runtime.ts and worker-source.ts.", False, "Both files exist and hold the cited definitions.", ev=["ws_agent", "rt_sem"], case="verified", counter="none", narrower="same", settle="none", attacks=[("entailment", "ok")])

# ===================== What exists: invocation and UI =====================
for cid, name, evs in [("C0122", "workflow_execute", ["et_name"]), ("C0123", "workflow_observe", ["ix_observe"]), ("C0124", "workflow_control", ["ct_name"]), ("C0125", "workflow_reconcile", ["rc_name"])]:
    g(cid, "ESTABLISHED", f"Pi registers a `{name}` tool at the pin.", False, f"Direct observation of the registration name literal. Note the table is non-exhaustive: nine workflow_* tools are registered (also inspect, validate, catalog, compare, detached).", ev=evs + ["tools_9"],
      case="Registration literal found.", counter="none", narrower="same", settle="none", attacks=[("quantifier", "the table lists four of nine tools; under-statement, not error")])
g("C0126", "ESTABLISHED", "A projection (observation projection) and a read-only terminal inspector (src/ui/workflow-inspector.ts) exist.", False, "src/ui/workflow-inspector.ts header describes the inspector over the bounded observation projection; workflow_observe reads the projection.", ev=["ui_inspector", "ix_observe"],
  case="Inspector module present.", counter="none", narrower="same", settle="none", attacks=[("documented->implemented", "module exists; rendering not exercised")])
g("C0127", "ESTABLISHED", "Script-kind definitions are the only kind the execute tool launches; the launch branch is reached for kind 'script'.", False, "execute-tool.ts 217-219: non-script refused, script proceeds to resolveSource and launch; a fixture test asserts the refusal of the other kinds.", ev=["et_refuse", "t_et_refuse"],
  case="Launch path exists for script.", counter="'implemented' != exercised live; tests exist (not run).", narrower="same", settle="none", attacks=[("implemented->exercised", "graded as source")])
g("C0128", "ESTABLISHED", "Function-kind definitions are refused by workflow_execute ('unsupported-definition-kind').", False, "execute-tool.ts 217-218 refuses every kind !== 'script'; test 173 asserts it for function and furnace-formula. Consistent with SKILL line 12.", ev=["et_refuse", "t_et_refuse", "sk_12"],
  case="Refusal is unconditional on kind.", counter="none", narrower="same", settle="none", attacks=[("negative evidence", "the refusal is positive code, not an absence")])

# ===================== What exists: native providers =====================
for cid, pid, evs in [("C0129", "forge.gate.status", ["pr_forge_reg"]), ("C0130", "hyperunix.find", ["pr_hx_reg"]), ("C0131", "furnace.run.inspect", ["pr_furn_reg"]), ("C0132", "reactivefiber.render.preview", ["pr_rf_reg"])]:
    g(cid, "ESTABLISHED", f"A native `{pid}` provider is registered by registerNativeProviders.", False, "native-modules.ts 95-100 registers exactly four providers; this descriptor is one of them (effectClass 'read').", ev=evs + ["nm_reg", "nm_reg2"],
      case="Registration present.", counter="none", narrower="same", settle="none", attacks=[("entailment", "ok")])
g("C0133", "ESTABLISHED", "A separate Forge operation/control surface exists (forge-control.ts, forge-operation-observer.ts; the forge_gate_run tool) distinct from the read-only forge.gate.status provider.", False,
  "ls src/workbench shows forge-control*.ts and forge-operation-observer.ts; index.ts 2816-2818 registers forge_gate_run as an observed operation.", ev=["forge_files", "ix_forge", "pr_forge_reg"],
  case="Distinct files and tool.", counter="none", narrower="same", settle="none", attacks=[("entailment", "ok")])
g("C0134", "ESTABLISHED", "hosts/furnace-hosted.ts exists: one deterministic workflow callback per Furnace Run, no scheduler/retry/checkpoint.", False, "Header lines 4-9 at the pin.", ev=["fh_header", "fh_nosched", "hosts_ls"],
  case="File and header verified.", counter="none", narrower="same", settle="none", attacks=[("entailment", "ok")])
g("C0135", "ESTABLISHED", "The four native adapters bind to producer SDKs or binaries (@forge/sdk ServerConnection.spawn('forge'), @hyperunix/sdk, @furnace/sdk, child_process.spawn('rf')), not stubs.", False,
  "Imports and invocation sites verified in providers/*.ts. 'Real' = production binding; " + NOT_RUN, ev=["pr_forge_imp", "pr_forge_spawn", "pr_hx_imp", "pr_furn_imp", "pr_rf_spawn"],
  case="Each provider reaches a producer.", counter="Reaching a producer is not the same as the producer being installed/working.", narrower="Production bindings exist.", settle="live receipts", attacks=[("implemented->exercised", "graded as binding")])
g("C0136", "ESTABLISHED", "Each registered native capability exposes one narrow operation with a closed input schema (e.g. hyperunix.find takes only {kind, root}).", False,
  "Descriptors are single operations (gate status, find, run inspect, render preview) with additionalProperties:false schemas; the inference restates what the descriptors show.", ev=["pr_hx_in", "pr_hx_reg", "pr_rf_reg", "nm_reg"],
  propagation="inherits C0135 (ESTABLISHED)", case="Schemas are closed and narrow.", counter="none", narrower="same", settle="none", attacks=[("inference", "no generalization beyond the four descriptors")])

# ===================== What exists: Mechanical development function =====================
g("C0137", "ESTABLISHED", "MechanicalWorkflows exports develop(services, request) from packages/development/src/develop.ts.", False, "Signature verified at lines 21-24; package unchanged baseline->pin.", ev=["mw_dev_fn", "mw_dev_nodrift"], case="verified", counter="none", narrower="same", settle="none", attacks=[("version mismatch", "no drift")])
g("C0138", "ESTABLISHED", "develop() returns needs_evidence/SCOPE_INCOMPLETE when discover's coverage is not 'complete', before compileContext/implement.", False, "develop.ts 36-38.", ev=["mw_dev_scope"], case="verified", counter="none", narrower="same", settle="none", attacks=[("entailment", "ok")])
g("C0139", "ESTABLISHED", "The outcome carries the candidate (with basis/parentBasis checks) and a VerificationResult whose evidence field is optional.", True,
  "develop.ts 45-48 checks candidate.parentBasis/basis; contracts.ts VerificationResult has verdict and optional evidence?: EvidenceRef. 'producer verification evidence' is optional in the type, which the table does not say.",
  ev=["mw_dev_cand", "mw_ct_verif", "mw_ct_out"], defeaters=[("scope", "verification evidence is an optional field")], case="Both items are in the contracts.", counter="Evidence may be absent in a verification result.", narrower="Candidate basis is checked; verification evidence is carried when the adapter supplies it.", settle="none", attacks=[("quantifier", "optional-ness recorded")])
g("C0140", "ESTABLISHED", "The function and contracts live in packages/development/src/{develop,contracts}.ts.", False, "Files exist at the pin.", ev=["mw_dev_fn", "mw_ct_out"], case="verified", counter="none", narrower="same", settle="none", attacks=[("entailment", "ok")])

# ===================== What exists: installed local host =====================
g("C0141", "ESTABLISHED", "The installed host checks the tarball's SHA-256 (entrypoint-host digestFile; installed-host re-hashes the copy).", False, "entrypoint-host.ts 97-98 and installed-host.ts 37-38.", ev=["mw_eh_digest", "mw_ih_digest", "mw_ih_hdr"], case="verified", counter="none", narrower="same", settle="none", attacks=[("entailment", "ok")])
g("C0142", "ESTABLISHED", "The installed host runs npm install --ignore-scripts --offline on the pinned tarball.", False, "installed-host.ts 26.", ev=["mw_ih_npm"], case="verified", counter="none", narrower="same", settle="none", attacks=[("entailment", "ok")])
g("C0143", "ESTABLISHED", "The host binds the four application callbacks (discover, compileContext, implement, verify) and refuses when any is not a function.", False, "entrypoint-host.ts 92-94; 'trusted' means host-supplied, validated as functions.", ev=["mw_eh_bind", "mw_ct_svc"], case="verified", counter="'trusted' is the doc's gloss; the code checks presence/type.", narrower="Host-supplied callbacks validated as functions.", settle="none", attacks=[("semantic", "'trusted' recorded as host-supplied")])
g("C0144", "ESTABLISHED", "The host validates the producer outcome (validOutcome) and throws ENTRYPOINT_OUTPUT_INVALID otherwise.", False, "entrypoint-host.ts 105.", ev=["mw_eh_out"], case="verified", counter="none", narrower="same", settle="none", attacks=[("entailment", "ok")])
g("C0145", "ESTABLISHED", "The installed host lives in apps/development-rig/src/{entrypoint-host,installed-host}.ts.", False, "Files exist at the pin; entrypoint-host.ts unchanged baseline->pin.", ev=["mw_eh_fn", "mw_ih_hdr", "mw_eh_nodrift"], case="verified", counter="none", narrower="same", settle="none", attacks=[("version mismatch", "none")])
g("C0146", "ESTABLISHED", "Tests exist that npm-pack packages/development and drive the installed host from the tarball (installed-host.test.ts; entrypoint-descriptor-file.test.ts).", False, "installed-host.test.ts 14-20 packs, 44 runs develop from the tarball; the descriptor-file test does the same from the committed descriptor. " + NOT_RUN, ev=["mw_t_ih_pack", "mw_t_ih_run", "mw_t_df_accept"],
  case="Tests present.", counter="'exist' != pass; not run.", narrower="same", settle="run the MW test suite", attacks=[("tested->correct", "existence only")])

# ===================== What exists: live rig =====================
g("C0147", "ESTABLISHED", "developLive (opt-in via the CLI --live-develop) runs a Claude agent that must commit, then verifies with native Forge.", False, "live-development.ts header, 117, 135-136; cli.ts 35.", ev=["mw_ld_hdr", "mw_ld_commit", "mw_ld_nocommit", "mw_cli_live"], case="verified", counter="none", narrower="same", settle="none", attacks=[("entailment", "ok")])
g("C0148", "ESTABLISHED", "The rig has an RF path (rf-context.ts renderTaskContext; contextMode 'rf' in developLive).", False, "live-development.ts 85-88; rf-context.ts.", ev=["mw_ld_rf", "mw_rf_argv"], case="verified", counter="none", narrower="same", settle="none", attacks=[("entailment", "ok")])
g("C0149", "ESTABLISHED", "The rig has a Beads path (beads-claim.ts, beads-host.ts, beads-intake.ts).", False, "ls apps/development-rig/src.", ev=["mw_rig_ls"], case="verified", counter="none", narrower="same", settle="none", attacks=[("entailment", "file names; bodies not graded")])
g("C0150", "ESTABLISHED", "The rig has Furnace executor modules (furnace-process-executor.ts, furnace-app.ts, furnace-gate.ts).", False, "ls apps/development-rig/src.", ev=["mw_rig_ls"], case="verified", counter="none", narrower="same", settle="none", attacks=[("entailment", "file names")])
g("C0151", "ESTABLISHED", "The live rig lives under apps/development-rig/src/.", False, "verified", ev=["mw_rig_ls"], case="verified", counter="none", narrower="same", settle="none", attacks=[("entailment", "ok")])
g("C0152", "SUPPORTED", "Dated live-producer receipts (qa/integration/2026-10-15-*.md, evidence/, docs/13-14) are recorded in the MW repo; they witness the rig at 2026-10-15, not at baseline or pin.", True,
  "Files exist (qa/integration 2026-10-15..10-21; 49 evidence files; docs/13 status 2026-10-15). Receipt validity was not assessed and the MW program itself scopes them to the operations they tested; the table's bare 'recorded' omits the date scope.",
  ev=["mw_qa", "mw_qa_log", "mw_d13", "mw_prog_3"], defeaters=[("temporal", "receipts predate the baseline by ~3 weeks"), ("scope", "support only the operations they tested (MW program line 3)")],
  case="Receipts are in-repo and dated.", counter="They are historical and were not re-run.", narrower="Receipts dated 2026-10-15..10-21 exist.", settle="A fresh live receipt at the pin.", attacks=[("historical->current", "date scope added")])
g("C0153", "ESTABLISHED", "The MW development rig has no dependency on or reference to pi-subagents (grep over packages/ and apps/ *.ts/*.json: 0 hits).", False, "Detector stated; capable for committed source and manifests.", ev=["mw_nopi"], case="0 hits.", counter="A Pi binding could live outside both repos - outside the detector.", narrower="Repo-scoped absence.", settle="none", attacks=[("absence without detector", "detector stated")])

# ===================== What exists: coordination =====================
for cid, what, evs in [("C0154", "pure policy combinators (sequential, parallel, guarded, alternative, inhibit, repeated)", ["mw_coord"]), ("C0155", "the reconcile resolution function", ["mw_coord"]), ("C0156", "episode exports (toEpisode, episodeBytes, labelEpisodeMode)", ["mw_coord2"]), ("C0157", "replayTape and training export/import functions", ["mw_coord2", "mw_coord3"])]:
    g(cid, "ESTABLISHED", f"packages/coordination/src/index.ts exports {what}.", False, "Export lines verified at the pin.", ev=evs, case="verified", counter="none", narrower="same", settle="none", attacks=[("entailment", "ok")])
g("C0158", "ESTABLISHED", "Coordination exports live in packages/coordination/src/index.ts (269 lines).", False, "verified", ev=["mw_coord"], case="verified", counter="none", narrower="same", settle="none", attacks=[("entailment", "ok")])
g("C0159", "NON-EPISTEMIC", "Proposal: coordination functions as the first read-only function consumer for Pi.", False, "Proposal; presupposition that the exports are pure/read-only is SUPPORTED by the export names and the MW docs but purity was not verified per function.", ev=["mw_coord", "d01_16"], presup="SUPPORTED")

# ===================== What exists: Pi-to-Mechanical invocation =====================
g("C0160", "ESTABLISHED", "No Pi-to-Mechanical function invocation is registered in Pi: hosts/ holds only furnace-hosted.ts and local-detached.ts, no @mechanical dependency, no descriptor/installed-host reference in src/.", False,
  "Detector: ls src/workbench/hosts; grep -ril mechanical src/ (only collective-event.ts, a read-only envelope boundary, and a prose word); grep package.json for mechanical (none). W11 row still 'planned'.", ev=["hosts_ls", "grep_mech_src", "pkg_nomech", "fm_row"],
  rivals=["collective-event.ts is a Mechanical boundary (envelope ingestion), but not an invocation path - the claim is about invocation and holds."],
  case="No invocation code under a stated detector.", counter="Pi does ship one MW-named module (collective-event.ts).", narrower="No invocation/host binding.", settle="none", attacks=[("absence without detector", "detector stated; blind spot: generated code outside src/ (none committed)")])
g("C0161", "SUPPORTED", "Pi has no Mechanical SDK dependency and no Mechanical function host adapter; it does ship a read-only collective.event.v1 envelope boundary (src/workbench/collective-event.ts, present since 2026-10-28).", True,
  "No @mechanical dependency and no host adapter (detector as C0160). But 'no Mechanical SDK or host adapter' read as 'no Mechanical code at all' is false: collective-event.ts names provider 'mechanical-workflows' and vendors an MW schema. The doc's scope ('None registered') survives; the table's unqualified wording overstates.",
  ev=["pkg_nomech", "hosts_ls", "ce_header", "ce_provider", "ce_added"], defeaters=[("scope", "a typed MW envelope boundary exists in src/")],
  case="No SDK dep, no host adapter.", counter="collective-event.ts is Mechanical-specific code in the Pi tree.", narrower="No Mechanical SDK dependency and no function/host adapter; one read-only envelope boundary exists.", settle="none", attacks=[("quantifier strengthening", "'no adapter' -> 'no Mechanical code' blocked")])
g("C0162", "ESTABLISHED", "workflow_execute refuses every non-script definition kind (unsupported-definition-kind).", False, "execute-tool.ts 217-218 (cited 215-219 contains it).", ev=["et_refuse", "t_et_refuse"], case="verified", counter="none", narrower="same", settle="none", attacks=[("entailment", "ok")])
g("C0163", "SUPPORTED", "The W11 row of feature-matrix.md grades the binding host 'planned' (bead wb-04s blocked); the row's own embedded grep detection sentence is stale at the pin.", True,
  "The row and its 'planned' status exist (line 112, authored 2026-10-15 by the same author). Its evidence sentence ('grep -ril mechanical ... matches only an incidental word ... no src/workbench module') is false at the pin: collective-event.ts (added 2026-10-28) and its test match. Status accurate; embedded evidence stale.",
  ev=["fm_w11", "fm_row", "fm_detect", "fm_blame", "ce_added", "grep_mech_src"], defeaters=[("undercutting", "the row's detection sentence no longer describes the tree"), ("provenance", "row, bead and program share one author")],
  case="The row says planned.", counter="The row's evidence text is stale.", narrower="W11 is recorded as planned; its detector text predates collective-event.ts.", settle="refresh the row's detection sentence", attacks=[("lineage", "doc-cites-doc chain; status carried by re-run detector, not the row")])
g("C0164", "ESTABLISHED", "Pi-to-Mechanical function invocation is not implemented at pi@b27829e6 (no binding code; execute tool refuses function kinds; W11 planned).", False,
  "Over-determined: C0160/C0162 alone entail it; C0161's narrowing and C0163's stale detector do not weaken the conclusion.", ev=["et_refuse", "hosts_ls", "grep_mech_src", "fm_row", "sk_13"],
  propagation="premises C0160 ESTABLISHED, C0161 SUPPORTED (narrowed), C0162 ESTABLISHED, C0163 SUPPORTED; conclusion independently warranted by C0160+C0162",
  case="Multiple independent code facts.", counter="none", narrower="same", settle="none", attacks=[("broken premise", "C0161/C0163 narrowings do not reach the conclusion")])

# ===================== P0 worktree =====================
g("C0165", "ESTABLISHED", "cleanupWorktree (src/worktree.ts 125-182) stages and commits a dirty worktree (git add -A; git commit --no-verify).", False,
  "Lines 141-145 at the pin; function spans 125-182 (doc says 125-181: the closing brace is 182). " + NODRIFT, ev=["wt_fn", "wt_commit", "src_nodrift", "wt_log"],
  case="Direct read.", counter="none", narrower="same", settle="none", attacks=[("version mismatch", "worktree.ts last changed 2026-08-25; identical at baseline and pin")])
g("C0166", "ESTABLISHED", "After committing and creating the branch, cleanupWorktree removes the worktree (removeWorktree at 170).", False, "Lines 169-170; the clean path removes at 151 as well.", ev=["wt_remove", "wt_clean"], case="verified", counter="none", narrower="same", settle="none", attacks=[("entailment", "ok")])
g("C0167", "ESTABLISHED", "The outer catch attempts a force-remove of the worktree (git worktree remove --force, falling back to git worktree prune) when any step in the try block throws.", True,
  "Lines 177-181 call removeWorktree, which runs `git worktree remove --force` (189) and on failure only prunes (193). 'force-removes' is the attempted action: when git cannot remove (e.g. broken .git link) the directory may remain - the doc states the outcome as certain.",
  ev=["wt_catch", "wt_force"], defeaters=[("scope", "removal is attempted, not guaranteed; the corrupted-link test shows a directory git cannot remove")],
  case="The catch always tries to remove.", counter="Removal can fail silently; then bytes survive.", narrower="The catch attempts a force-remove and swallows failure.", settle="none", attacks=[("possible->observed", "'attempts' wording recorded")])
g("C0168", "ESTABLISHED", "The outer catch returns { hasChanges: false } with no error, branch or path field.", False, "Line 180; the result type has no error/recovery field (55-61).", ev=["wt_catch", "wt_type"], case="verified", counter="none", narrower="same", settle="none", attacks=[("entailment", "ok")])
g("C0169", "SUPPORTED", "test/worktree.test.ts has a 'cleanupWorktree - failure path' block that asserts hasChanges:false (and branch undefined) when the preservation commit fails or the worktree link is corrupt, and documents the destruction in comments; no failure-path test asserts that the directory was removed.", True,
  "Tests 413 and 432 assert the report half (445-446); the header comment (383-385) states the destruction. The removal half is described, not asserted, so 'explicitly exercise this outcome' is half-supported. These are characterization tests that lock the lossy behaviour in, not guards.",
  ev=["wtt_header", "wtt_commitfail", "wtt_assert", "wtt_corrupt", "wtt_lost", "wtt_log"], defeaters=[("scope", "removal not asserted on any failure path"), ("semantic", "'exercise' must not be read as 'protect against'")],
  rivals=["The ordering test (449) asserts removal only on the success path."], case="Named failure-path tests exist and assert the report.", counter="No assertion covers the force-remove.", narrower="Tests assert the hasChanges:false report on the outer-catch path.", settle="A test asserting existsSync(wt.path)===false after a failed commit would establish the removal half.", attacks=[("tested->protected", "blocked: tests lock in the defect")])
g("C0170", "ESTABLISHED", "When preservation (commit or branch creation) fails inside cleanupWorktree and the force-remove succeeds, the worktree's uncommitted changes (and any detached commit) are lost; the modal 'may' is the right strength.", False,
  "Deductive from source: try-block throw -> catch -> `git worktree remove --force` on a --detach worktree (112) -> bytes and unreachable commits gone. The in-repo test header (2026-10-17, predating the program) independently states it. " + NOT_RUN,
  ev=["wt_catch", "wt_force", "wt_detach", "wtt_header", "wtt_lost"], rivals=["If removal also fails the bytes survive (prune only) - hence 'may', not 'does'."],
  propagation="premises C0167 (ESTABLISHED, attempted removal) + C0168 ESTABLISHED; conclusion keeps the modal",
  case="Code path is unambiguous and the repo's own test comments say 'The agent's work is lost'.", counter="Loss requires two conditions (preservation failure AND successful removal).", narrower="same as permitted", settle="An executed reproduction (fail git commit, assert bytes gone) would add a run witness; not run here.", attacks=[("possible->observed", "kept as 'may'"), ("counterevidence", "prune fallback preserved as rival")])
g("C0171", "ESTABLISHED", "By its return value a failed preservation is indistinguishable from a clean no-change run: both yield { hasChanges: false }, and agent-manager branches only on hasChanges && branch.", False,
  "Lines 132, 152 and 180 return the identical object; agent-manager.ts 893 renders a branch note only when hasChanges && branch, so callers see 'no changes'. Scope: the return value (a caller could inspect the filesystem/branches by other means).",
  ev=["wt_catch", "wt_clean", "wt_guard", "am_branch"], propagation="inherits C0168 ESTABLISHED", case="Identical result objects.", counter="Out-of-band detection is possible but not offered by the API.", narrower="Indistinguishable via WorktreeCleanupResult.", settle="none", attacks=[("scope inflation", "scoped to the return value")])
g("C0172", "NON-EPISTEMIC", "Requirement: an effectful Mechanical developer must not reuse cleanupWorktree until it preserves dirty state on failure and reports typed recovery information.", False, "Norm; presuppositions C0170/C0171 ESTABLISHED. Note the workbench Claude host does not use worktree.ts at all (refuses isolation 'worktree'), so the norm binds a future design choice, not current workbench code.", ev=["wt_catch", "ch_iso"], presup="ESTABLISHED")
g("C0173", "NON-EPISTEMIC", "Priority assignment P0 for the worktree preservation defect.", False, "Priority is a normative ranking; its factual presupposition (C0170) is ESTABLISHED. Reach is limited to the legacy agent-manager path (the only caller of cleanupWorktree).", ev=["am_import", "wt_catch"], presup="ESTABLISHED (reach: agent-manager path only)")
g("C0174", "NON-EPISTEMIC", "Proposal: regression test making git commit or branch creation fail after editing, asserting bytes and recovery path remain and no false-clean report.", False, "Proposal; presuppositions ESTABLISHED (C0170/C0171). The existing failingPi(commit) fixture (test 432) already drives the failure, asserting the opposite expectation.", ev=["wtt_commitfail"], presup="ESTABLISHED")
g("C0175", "ESTABLISHED", "The Claude workflow host refuses request.isolation === 'worktree' (claude-host.ts 188-189).", False, "Direct read. Side note: tool-description.ts 81 still advertises isolation?: 'worktree' for agent() in the workflow path - a pin-internal inconsistency outside this claim.", ev=["ch_iso", "td_iso"],
  case="verified", counter="none", narrower="same", settle="none", attacks=[("entailment", "ok")])
g("C0176", "NON-EPISTEMIC", "Proposal: isolated workspace provision is a separate work item from fixing cleanupWorktree.", False, "Design decomposition; presupposition C0175 ESTABLISHED.", ev=["ch_iso"], presup="ESTABLISHED")
g("C0177", "NON-EPISTEMIC", "Definition: src/worktree.ts is 'legacy' relative to the workbench Claude host.", False, "Stipulative label; consistent with the pin: worktree.ts is imported by agent-manager.ts (Pi's Agent tool path) and claude-host.ts states 'Pi's Agent tool stays separate'.", ev=["am_import", "ch_sep"], presup="consistent")

# ===================== P1 function dispatch =====================
g("C0178", "ESTABLISHED", "execute.ts models three definition kinds (script, function, furnace-formula) and the tool's parameter schema admits all three.", False, "execute.ts 78; execute-tool.ts 182.", ev=["ex_kinds", "et_kind", "t_ex_admit"], case="verified", counter="none", narrower="same", settle="none", attacks=[("entailment", "ok")])
g("C0179", "ESTABLISHED", "execute-tool.ts refuses every definition kind except 'script' (lines 217-218; the doc's 215-219 contains them with a two-line offset).", False, "Single else-if on kind !== 'script'; fixture test asserts the refusal for both other kinds.", ev=["et_refuse", "t_et_refuse"], case="verified", counter="none", narrower="same", settle="none", attacks=[("version mismatch", "2-line offset inside the cited range")])
g("C0180", "ESTABLISHED", "registerNativeProviders registers exactly four capabilities (forge.gate.status, hyperunix.find, furnace.run.inspect, reactivefiber.render.preview).", False, "Full read of the 138-line module: four register calls, no conditional additions.", ev=["nm_reg", "nm_reg2"], case="verified by full read", counter="native-modules.ts also exposes non-registry surfaces (launchDetachedWorkflow, openForgeOperationConnection, createClaudeWorkflowHost) - 'only' is true of capability registrations.", narrower="Exactly four capability registrations.", settle="none", attacks=[("quantifier", "scope = registrations")])
g("C0181", "ESTABLISHED", "Every registered native capability declares effectClass 'read'.", False, "All four descriptors carry effectClass 'read'.", ev=["pr_hx_reg", "pr_forge_reg", "pr_furn_reg", "pr_rf_reg"], propagation="inherits C0180 ESTABLISHED", case="verified", counter="none", narrower="same", settle="none", attacks=[("entailment", "ok")])
g("C0182", "SUPPORTED", "The feature matrix lists W11 as 'planned' (row 112, bead wb-04s blocked); the row's embedded grep sentence is stale at the pin.", True,
  "Same source report as C0163: status accurate, embedded detection text false since collective-event.ts landed (2026-10-28). The audit cites the status, not the detection text, so the overclaim is in the matrix row, inherited.", ev=["fm_row", "fm_detect", "ce_added"],
  defeaters=[("undercutting", "stale detection sentence inside the cited row")], case="Status 'planned' present.", counter="Row evidence stale.", narrower="W11 status is 'planned'.", settle="refresh the row", attacks=[("lineage", "same-author chain; status re-verified by code")])
g("C0183", "ESTABLISHED", "Pi has no first-class function dispatch at the pin: function kinds are refused and no function host module exists.", False, "Over-determined by C0179 (refusal) and the absence detector of C0160; " + NODRIFT, ev=["et_refuse", "hosts_ls", "grep_mech_src"],
  propagation="premises C0178-C0182 all ESTABLISHED/SUPPORTED; conclusion entailed by C0179 alone", case="Refusal code plus absence detector.", counter="none", narrower="same", settle="none", attacks=[("absence without detector", "detector stated")])
g("C0184", "SUPPORTED", "The pure admission model admits `function` and `furnace-formula` while the tool host refuses them; tests on both sides (execute.test 178 admits; execute-tool.test 173 refuses 'in this host') show this split is intentional layering rather than an inconsistency.", True,
  "The factual core is ESTABLISHED (model admits, host refuses). The word 'disagree' connotes a defect; the pinned tests assert both halves deliberately and the refusal is a typed ExecuteLaunchRefusal, so the better reading is model/host layering. Graded SUPPORTED with the connotation narrowed.",
  ev=["ex_kinds", "et_refuse", "t_ex_admit", "t_et_refuse"], defeaters=[("semantic", "'disagree' vs intentional layering")], rivals=["Reading A: inconsistency to fix. Reading B: deliberate model/host split tested on both sides (favored by the tests)."],
  propagation="premises C0178, C0179 ESTABLISHED", case="Model and host return different decisions for the same kind.", counter="Both decisions are asserted by tests as intended.", narrower="The model admits kinds this host refuses.", settle="A design note stating the intent would settle the reading; the tests already favor B.", attacks=[("semantic drift", "defect connotation blocked")])
g("C0185", "NON-EPISTEMIC", "Proposal: an allowlisted, digest-pinned function host.", False, "Proposal; presupposition C0183 ESTABLISHED.", ev=["d01_27b"], presup="ESTABLISHED")
g("C0186", "NON-EPISTEMIC", "Norm: function dispatch must not use a shell-backed node().", False, "Prohibition on a remedy shape; it does not assert that node() is shell-backed (see C0188).", ev=["d01_27b"], presup="n/a (prescriptive)")
g("C0187", "NON-EPISTEMIC", "Norm: Mechanical code must not be pasted into the workflow interpreter.", False, "Norm; no factual presupposition beyond the interpreter's existence (ESTABLISHED).", ev=["d01_27b"], presup="ESTABLISHED")
g("C0188", "REFUTED", "At the pin node() dispatches a validated dotted capabilityId through CapabilityRegistry.invoke; no shell is executed (the rf and forge providers spawn argv/processes without a shell; hyperunix and furnace call SDK imports). The doc's sentence is a prohibition ('do not use a shell-backed node()'), not an observation.", False,
  "The extracted observation misreads a prescriptive clause. Detector: runtime.ts 1352 validates capabilityId grammar and 1610 calls callNode -> registry.invoke; grep spawn/execFile in providers: spawn('rf', argv) with no shell option, ServerConnection.spawn('forge'); no 'sh -c' or shell:true anywhere. Under the strict meaning the proposition is contradicted.",
  ev=["d01_27b", "rt_capid", "rt_callnode", "pr_rf_spawn", "pr_forge_spawn", "pr_hx_imp"], defeaters=[("rebutting", "node() is capability-registry-backed"), ("semantic", "'shell-backed' loosely = 'reaches external binaries' holds for 2 of 4 providers, by process spawn not shell")],
  rivals=["Loose reading: two providers reach producers by spawning binaries - a narrower SUPPORTED proposition, but not 'shell-backed'."],
  case="None as an observation: the doc prohibits a shape rather than describing node().", counter="node() is a typed capability call; the providers behind it are SDK imports or argv spawns.", narrower="node() reaches producers via registry providers; two of them spawn external processes without a shell.", settle="none (source is decisive); the artifact itself does not assert the proposition, so no doc repair is owed beyond noting the extraction error",
  attacks=[("prescriptive->observational drift", "confirmed; the claim row, not the doc, overclaims")], remediation="MARK_AS_DEFINITION/REMOVE_CLAIM at the ledger level: the row restates a norm as an observation")

# ===================== P1 descriptor (time-split family) =====================
DRIFT_DESC = "At the MW program baseline 0c78e253 the descriptor declared `../schemas/...` refs (git show); MW commit 1f29daa7 (2026-11-05T08:14Z, ~1h49m after the Pi program commit 7c80c343 at 06:25Z) rewrote them to bare filenames, so at mw@f7c0a943 the proposition is false."
g("C0189", "REFUTED", "At MW 0c78e253 development.v1.json declared inputSchema `../schemas/development-request.v1.schema.json`; at the pin f7c0a943 it declares the bare filename (repaired by 1f29daa7).", True,
  DRIFT_DESC + " The doc states it in the present tense with only the README-level baseline as qualifier.", ev=["mw_desc_pin", "mw_desc_base", "mw_desc_diff", "mw_log", "d01_31"],
  defeaters=[("temporal", "true at baseline, false at pin: fixed since")], rivals=["Version split: ESTABLISHED@0c78e253, REFUTED@f7c0a943."],
  propagation="caps C0194/C0195 at REFUTED-at-pin; baseline derivation stays valid", case="At the baseline the file really said ../schemas/.", counter="The pin file says bare filenames, byte-equal to the host's strings.", narrower="Historical: at 0c78e253 the refs were relative.", settle="settled by git show + git log (1f29daa7)", attacks=[("version mismatch", "confirmed drift; baseline re-read via git show")], remediation="ADD_TEMPORAL_QUALIFIER: 'at 0c78e253 ... repaired at 1f29daa7'")
g("C0190", "REFUTED", "At MW 0c78e253 the outputSchema ref was `../schemas/development-outcome.v1.schema.json`; at the pin it is the bare filename.", True, DRIFT_DESC, ev=["mw_desc_pin", "mw_desc_base", "mw_desc_diff", "mw_log"],
  defeaters=[("temporal", "fixed since baseline")], rivals=["Version split as C0189."], propagation="as C0189", case="baseline true", counter="pin false", narrower="historical", settle="settled", attacks=[("version mismatch", "confirmed")], remediation="ADD_TEMPORAL_QUALIFIER")
g("C0191", "ESTABLISHED", "invokePinnedDevelopment accepts only the exact string `development-request.v1.schema.json` as inputSchema (entrypoint-host.ts 89), unchanged baseline->pin.", False, "Exact-equality compare at line 89; git diff baseline..pin on the file is empty.", ev=["mw_eh_check", "mw_eh_nodrift"], case="verified", counter="none", narrower="same", settle="none", attacks=[("version mismatch", "none")])
g("C0192", "ESTABLISHED", "invokePinnedDevelopment accepts only the exact string `development-outcome.v1.schema.json` as outputSchema (line 89).", False, "as C0191", ev=["mw_eh_check", "mw_eh_nodrift"], case="verified", counter="none", narrower="same", settle="none", attacks=[("version mismatch", "none")])
g("C0193", "REFUTED", "At MW 0c78e253 the rig tests held a handwritten descriptor literal; at the pin entrypoint-host.test.ts:12 and installed-host.test.ts:29 read contracts/entrypoints/development.v1.json from disk and entrypoint-descriptor-file.test.ts drives both hosts from the committed file.", True,
  "git show 0c78e253 test line 12 is a literal object; 1f29daa7 replaced it with readFileSync of the committed JSON and added the descriptor-file test. True at baseline, false at pin. " + NOT_RUN,
  ev=["mw_t_eh_base", "mw_t_eh_pin", "mw_t_ih_desc", "mw_t_df", "mw_t_base_ls"], defeaters=[("temporal", "fixed since")], rivals=["Version split: ESTABLISHED@0c78e253, REFUTED@f7c0a943."],
  propagation="breaks C0196's antecedent at the pin", case="baseline literal confirmed", counter="pin tests read the file", narrower="historical", settle="settled by git show", attacks=[("version mismatch", "confirmed")], remediation="ADD_TEMPORAL_QUALIFIER")
g("C0194", "REFUTED", "At 0c78e253 the committed descriptor failed the host's exact-string check (valid derivation from C0189-C0192); at the pin the committed strings equal the host's strings byte-for-byte, so the check passes (and a file-driven test asserts acceptance; not run).", True,
  "The derivation (relative refs + exact bare-filename compare -> failure) is valid, but premises C0189/C0190 are false at the pin; recomputed from pin evidence the conclusion is contradicted: identical strings cannot fail an equality check. Present-tense wording ('therefore fails') is stale.",
  ev=["mw_desc_pin", "mw_eh_check", "mw_t_df_accept", "d01_31b"], defeaters=[("temporal", "premise failed at pin"), ("rebutting", "string equality at pin")],
  rivals=["Version split: derivation VALID and conclusion ESTABLISHED at baseline."], propagation="premises C0189/C0190 REFUTED at pin, C0191/C0192 ESTABLISHED; conclusion re-derived at pin: REFUTED (not merely unsupported) because the pin strings match",
  case="The baseline derivation was sound and the MW repo acknowledged it (contracts/README: 'audit found a schema-path mismatch').", counter="Byte-equal strings at the pin.", narrower="Historical defect, repaired at 1f29daa7.", settle="settled", attacks=[("broken derivation != refuted conclusion", "applied: conclusion re-tested directly at the pin and found contradicted")], remediation="ADD_TEMPORAL_QUALIFIER + note the repair commit")
g("C0195", "REFUTED", "At 0c78e253 the committed descriptor conflicted with its loader; at mw@f7c0a943 they agree (MW's own SKILL and contracts/README record the repair).", True, "Restates C0194; same version split. MW SKILL line 14 and contracts/README line 13 state agreement/repair at the pin.", ev=["mw_desc_pin", "mw_eh_check", "mw_skill_14", "mw_readme_13"],
  defeaters=[("temporal", "fixed since")], rivals=["ESTABLISHED@baseline."], propagation="inherits C0194", case="baseline", counter="pin", narrower="historical", settle="settled", attacks=[("historical->current", "confirmed drift")], remediation="ADD_TEMPORAL_QUALIFIER")
g("C0196", "REFUTED", "At the pin three rig tests load the committed descriptor and one asserts both hosts accept it over a real npm-packed tarball, so the existing tests do bear on committed-descriptor/host compatibility (whether they pass was not run); at the baseline the claim held.", True,
  "The conditional 'hand-built descriptors do not establish compatibility' (line 65) is valid, but its antecedent (C0193) is false at the pin. Compatibility is also directly establishable by string comparison. " + NOT_RUN, ev=["mw_t_df", "mw_t_df_accept", "mw_t_eh_pin", "d01_65"],
  defeaters=[("temporal", "antecedent gone at pin")], rivals=["Valid at baseline."], propagation="premise C0193 REFUTED at pin -> conclusion recomputed: contradicted by the file-driven tests' existence", case="baseline", counter="pin tests read the file", narrower="The baseline tests did not establish compatibility.", settle="run the MW suite to confirm the tests pass", attacks=[("tested->correct", "existence of the assertion, not its verdict, is claimed")], remediation="ADD_TEMPORAL_QUALIFIER")
g("C0197", "NON-EPISTEMIC", "Proposal: fix and test the authoritative descriptor before Pi consumes it.", False, "Proposal whose presupposition (a live mismatch) is REFUTED at the pin: the repair (1f29daa7, PIWB-MW0-R001) is already landed with a file-driven test; the proposal is realized upstream.", ev=["mw_log", "mw_readme_13"], presup="REFUTED at pin (already realized)")
g("C0198", "NON-EPISTEMIC", "Norm: schema-ref path resolution must be validated without allowing path traversal.", False, "Norm; the pin's grammar (bare filename, no '..') already satisfies it per MW SKILL line 14.", ev=["mw_skill_14"], presup="consistent (already satisfied)")
g("C0199", "NON-EPISTEMIC", "Priority P1 assigned to the descriptor/loader conflict.", False, "Normative ranking whose factual presupposition (C0195) is REFUTED at the pin; the row is moot against the environment pin.", ev=["mw_desc_pin"], presup="REFUTED at pin")

# ===================== P1 detached admission =====================
g("C0200", "ESTABLISHED", "launchDetachedWorkflow in index.ts (2621-2635) sends backend 'claude' whenever workflowAgentBackend === 'claude' (2623, 2627), which is the only setting under which the workbench tools register at all (2640).", False,
  "Lines verified; the registration guard at 2640 means every registered detached launch is a claude-backend launch. A second site (workflow_detached, 2880-2881) also sends grants:[] with an optional claude backend - the doc under-states scope.", ev=["ix_launch", "ix_grants", "ix_reg", "ix_detached"],
  case="verified", counter="Under a non-claude setting the same code sends 'deterministic' - but then the tools are not registered.", narrower="same", settle="none", attacks=[("scope", "second site found: under-statement")])
g("C0201", "ESTABLISHED", "The registered detached launch sends grants: [] (index.ts 2628).", False, "Literal at 2628; " + NODRIFT, ev=["ix_grants", "src_nodrift"], case="verified", counter="none", narrower="same", settle="none", attacks=[("entailment", "ok")])
g("C0202", "ESTABLISHED", "local-detached.ts validateRequest throws unless grants includes 'claude:invoke' when backend is 'claude' (line 430).", False, "verified", ev=["ld_430"], case="verified", counter="none", narrower="same", settle="none", attacks=[("entailment", "ok")])
g("C0203", "ESTABLISHED", "validateRequest requires an exact `claude:tool:<name>` grant for every configured Claude tool (line 442).", False, "verified", ev=["ld_442"], case="verified", counter="none", narrower="same", settle="none", attacks=[("entailment", "ok")])
g("C0204", "ESTABLISHED", "By static derivation, the registered claude-backend detached request (grants: []) is thrown out by validateRequest at line 430: launchDetachedWorkflow calls validateRequest first and no code in src/ supplies claude:invoke.", False,
  "Deductive: ix 2628 grants:[] -> native-modules getter -> local-detached launchDetachedWorkflow -> validateRequest(raw) first statement -> line 430 throw. Missing premise 'no grant injection in between' confirmed by grep (claude:invoke appears only at line 430). " + NOT_RUN,
  ev=["ix_grants", "nm_launch", "ld_launch", "ld_430", "grep_invoke"], propagation="premises C0200-C0203 all ESTABLISHED; derivation valid", case="Every link in the chain is a literal.", counter="none found", narrower="same", settle="A positive end-to-end test would add a run witness (none exists: C0209).", attacks=[("missing premise", "grant-injection premise checked by grep")])
g("C0205", "ESTABLISHED", "The registered detached Claude request contradicts the detached host's admission rules (empty grants vs required claude:invoke); the contradiction also fires for workflow_detached with backend 'claude'.", False, "Restates C0204; scope extended by the second site (2880-2881). Independent of any document - primary source only.", ev=["ix_grants", "ld_430", "ix_detached", "mw_prog_66"],
  defeaters=[("provenance", "the MW program's restatement adds no independent warrant")], propagation="inherits C0204 ESTABLISHED", case="primary source", counter="none", narrower="same", settle="none", attacks=[("lineage", "MW doc counted as same origin")])
g("C0206", "NON-EPISTEMIC", "Norm: the host must pass host-validated bounded grants, not script-supplied rights.", False, "Norm; presupposition (C0204) ESTABLISHED.", ev=["ld_430"], presup="ESTABLISHED")
g("C0207", "NON-EPISTEMIC", "Proposal: add a positive tool-to-detached-host test.", False, "Proposal; presupposition (no such test, C0209) SUPPORTED.", ev=["t_launch_grep"], presup="SUPPORTED")
g("C0208", "NON-EPISTEMIC", "Proposal: add an explicit missing-grant negative test.", False, "Proposal; presupposition SUPPORTED (C0209).", ev=["t_launch_grep"], presup="SUPPORTED")
g("C0209", "SUPPORTED", "No test at the pin drives the registered tool's claude-backend detached launch through index.ts into the real preflight: the execute-tool tests inject launchDetached as vi.fn, the security test spies the wrapper, the only tool-level launch test uses backend 'deterministic', and the three claude:invoke tests call the host directly with the grant present.", False,
  "Detector: grep -rln launchDetachedWorkflow test/ (15 files) + grep claude:invoke test/ (3 lines, all direct host calls) + read of workbench-pi-detached.test.ts:22. Blind spot: *.census.ts bodies not read line by line; an indirect full-extension harness not exhaustively excluded.",
  ev=["t_et_mock", "t_spy", "t_pidet", "t_invoke", "t_invoke2", "t_launch_grep"], defeaters=[("scope", "census files not fully read")], case="Every located test either mocks the wrapper or grants claude:invoke.", counter="An unlocated indirect test could exist.", narrower="No located test exercises the path.", settle="A census of all test entrypoints would upgrade.", attacks=[("absence without detector", "detector stated with blind spot")])

# ===================== P1 cancellation =====================
g("C0210", "ESTABLISHED", "invoke() awaits config.beforeDispatch at line 207 and only afterwards creates the AbortController and registers it (controllers.set at 220).", False, "Lines 207-220 verified; cited range exact.", ev=["ch_bd", "ch_ctrl"], case="verified", counter="none", narrower="same", settle="none", attacks=[("entailment", "ok")])
g("C0211", "ESTABLISHED", "runtime.ts skip (879) and retry (887) call host.abortAgent when the agent has started (live.started is set at 1215, before host.spawnAgent is awaited).", False, "Lines 873-888 and 1215 verified.", ev=["rt_skip", "rt_retry", "rt_started", "rt_spawn"], case="verified", counter="none", narrower="same", settle="none", attacks=[("entailment", "ok")])
g("C0212", "ESTABLISHED", "abortAgent resolves the controller via controllers.get(agentId) (populated after beforeDispatch); its pendingLookupAborts fallback applies only when sessions.has(agentId) (resume path).", False, "Lines 341-344.", ev=["ch_abort", "ch_pending"], propagation="inherits C0210/C0211 ESTABLISHED", case="verified", counter="none", narrower="same", settle="none", attacks=[("entailment", "ok")])
g("C0213", "SUPPORTED", "By code reading, a per-agent skip/retry issued while a fresh spawn is awaiting beforeDispatch is a no-op (no controller yet, sessions.has false), the SDK query then starts, and the runtime takes the skipped flag from the result rather than the intent, so the skip can be lost; the sequence has not been reproduced by execution (no test parks beforeDispatch and calls skip/retry/abortAgent).", False,
  "Structural derivation from C0210-C0212 plus runtime 1215/1320-1325; F6 confirms abortAgent on an unregistered id is a no-op; F10 covers run-signal abort only. Reproduction detector: grep skip/retry/abortAgent with beforeDispatch in test/ -> 0. HYPOTHESIS is the right kind; 'reproduce before claiming fixed' the right strength. The same gap exists on the resume path.",
  ev=["ch_bd", "ch_ctrl", "ch_abort", "rt_started", "rt_skipflag", "t_f6_noop", "t_f10", "t_nobdskip"], defeaters=[("undercutting", "no execution trace; a scheduler interleaving that re-checks intent could exist unseen")],
  rivals=["Rival: the runtime's intent field could cause a later re-abort - not found in the read code (flag taken from the result, 1320-1325)."],
  propagation="premises C0210-C0212 ESTABLISHED; inductive step to 'can miss' is strong but unexecuted -> SUPPORTED, not ESTABLISHED",
  case="Every step is a literal in the pinned code and the host's own test F6 confirms the no-op.", counter="No run exists; the derivation could overlook a compensating path.", narrower="During the beforeDispatch await a fresh agent has no abort token and per-agent abort is a no-op.", settle="The doc's own recipe (park beforeDispatch, skip/retry, release, assert sdk.calls.length===0) would settle it.",
  attacks=[("possible->observed", "kept as unreproduced"), ("hypothesis->finding", "blocked")])
g("C0214", "ESTABLISHED", "Workflow-wide abort is re-checked after the beforeDispatch await (line 215) and fixture F10 asserts zero SDK calls for a run abort during the await.", False, "Code and test both present (test not run here).", ev=["ch_recheck", "t_f10", "t_f10_assert"], case="verified", counter="none", narrower="same", settle="none", attacks=[("tested->correct", "test exists; not run")])
g("C0215", "NON-EPISTEMIC", "Norm: the race must be reproduced before being claimed fixed.", False, "Methodological norm; presupposition (C0213 is unreproduced) SUPPORTED.", ev=["t_nobdskip"], presup="SUPPORTED")
g("C0216", "NON-EPISTEMIC", "Proposal: reproduction recipe (hold beforeDispatch, skip/retry, release, assert no unapproved dispatch or second attempt).", False, "Proposal; coherent with the F10 fixture shape already in the suite.", ev=["t_f10"], presup="SUPPORTED")
g("C0217", "NON-EPISTEMIC", "Definition: the cancellation finding is a race hypothesis requiring fault injection.", False, "Self-classification; consistent with the grade of C0213 (SUPPORTED, unreproduced).", ev=["d01_64"], presup="consistent")

# ===================== P1 replay identity =====================
g("C0218", "ESTABLISHED", "replayBasis (claude-host.ts 166-175) serializes cwd, model, permissionMode, settings (settingSources names), tools, roles, grants and principal.", True, "Exact eight-element literal; the doc's list omits 'settings' (an under-statement).", ev=["ch_basis", "ch_settings"], defeaters=[("scope", "list omits settingSources")], case="verified", counter="none", narrower="same plus settings", settle="none", attacks=[("quantifier", "member omitted by the doc, recorded")])
g("C0219", "ESTABLISHED", "No source revision appears in replayBasis.", False, "Absence by full read of the eight-element literal (capable detector).", ev=["ch_basis"], case="full literal read", counter="none", narrower="same", settle="none", attacks=[("absence without detector", "full literal read")])
g("C0220", "ESTABLISHED", "No referenced skill/system instruction contents appear in replayBasis (settings holds setting-source names only).", False, "Full literal read; `settings` is config.settingSources (names), not contents.", ev=["ch_basis", "ch_settings"], case="verified", counter="settingSources names are a weak proxy, not contents.", narrower="same", settle="none", attacks=[("semantic", "names vs contents distinguished")])
g("C0221", "ESTABLISHED", "No effective provider version appears in replayBasis.", False, "Full literal read.", ev=["ch_basis"], case="verified", counter="none", narrower="same", settle="none", attacks=[("absence without detector", "full literal")])
g("C0222", "ESTABLISHED", "journal.ts records a declared effectClass per node and runtime.ts enforces it on resume (read-only replay; stale marking).", False, "journal.ts 109-112; runtime.ts 1468-1471.", ev=["jn_doc", "rt_readonly"], case="verified", counter="none", narrower="same", settle="none", attacks=[("entailment", "ok")])
g("C0223", "ESTABLISHED", "Resume refuses replay of dispatched-unsettled, unclassified and non-read journaled nodes (runtime.ts 1409-1436).", False, "verified", ev=["rt_dispatched", "rt_refuse", "jn_trip"], case="verified", counter="none", narrower="same", settle="none", attacks=[("entailment", "ok")])
g("C0224", "SUPPORTED", "On the resume journal path an agent answer is reused when index, journalKey (prompt, label, model, agentType, effort, isolation, gate, resume, schema), replayBasis and prefix match - none of which measures the source tree or instruction bytes - so by code reading an equal prompt under a changed tree or changed skills replays.", False,
  "Key and basis composition verified (journal.ts 173-190; runtime.ts 899). Scope: the prefix-replay resume path only. Not executed; a compensating guard outside the read code is not excluded with certainty.", ev=["ch_basis", "jn_key", "rt_replayat", "d01_43"],
  defeaters=[("scope", "resume journal path, not arbitrary caching")], propagation="premises C0218-C0221 ESTABLISHED; inductive conclusion -> SUPPORTED", case="Key/basis fields enumerated.", counter="An unobserved guard could refuse replay on tree change.", narrower="Replay eligibility does not consult source or instruction content.", settle="A test replaying after a tree edit would settle it.", attacks=[("missing premise", "'reuse keyed only by identity' corrected to key+basis+prefix; conclusion survives")])
g("C0225", "NON-EPISTEMIC", "Norm: preserve effect-class enforcement and uncertain-replay denial.", False, "Norm; presuppositions C0222/C0223 ESTABLISHED.", ev=["jn_doc"], presup="ESTABLISHED")
g("C0226", "NON-EPISTEMIC", "Proposal: add call dependency/source basis to the replay identity or fail closed.", False, "Proposal; presupposition C0224 SUPPORTED.", ev=["ch_basis"], presup="SUPPORTED")
g("C0227", "NON-EPISTEMIC", "Norm: never replay a past coding/verification answer under a changed source tree.", False, "Norm; presupposition C0224 SUPPORTED.", ev=["ch_basis"], presup="SUPPORTED")

# ===================== P1 function writes / lifecycle =====================
g("C0228", "ESTABLISHED", "developLive is a single-writer Git side-effect: it preflights a clean Git basis, requires the agent to commit in the one assigned workspace, and documents itself as 'not a durable transaction'.", False, "live-development.ts 47-49, 71-73, 117, 135-136.", ev=["mw_ld_txn", "mw_ld_commit", "mw_ld_nocommit", "mw_ld_hdr"], case="verified", counter="none", narrower="same", settle="none", attacks=[("entailment", "ok")])
g("C0229", "SUPPORTED", "At mw@f7c0a943 developLive accepts an optional host AbortSignal (AgentOptions.signal, added by the pin commit f7c0a943) honoured only as a pre-dispatch barrier and not forwarded to the SDK; at the baseline 0c78e253 no signal option existed. 'No general (mid-run) cancellation' survives; 'no AbortSignal in its public options' does not.", True,
  "Baseline: AgentOptions had model/maxTurns/maxBudgetUsd only and live-development.ts had no signal/abort token. Pin: signal?: AbortSignal with assertNotCancelledBeforeDispatch at 59 and 112, documented as pre-dispatch only. The qualifier 'general' keeps a narrow truth; the unqualified presence clause is false at the pin.",
  ev=["mw_ci_signal", "mw_ld_signal", "mw_ld_signal2", "mw_ci_base", "mw_ld_base_sig", "mw_t_sig", "mw_log"], defeaters=[("temporal", "partially fixed by the pin commit itself (2026-11-05T08:39Z)")],
  rivals=["Reading A (presence): REFUTED at pin. Reading B (generality/mid-run): SUPPORTED at pin."], propagation="C0232/C0235 inherit the narrowed form", case="At baseline the options really had no signal.", counter="The pin exposes a signal option.", narrower="No mid-run cancellation after the first provider side effect.", settle="settled by git show/log; wording repair owed", attacks=[("version mismatch", "pin commit adds the option"), ("quantifier", "'general' preserved")], remediation="NARROW_SCOPE + ADD_TEMPORAL_QUALIFIER")
g("C0230", "ESTABLISHED", "The default capability deadline governing node() calls is CAPABILITY_DEADLINE_MS = 30_000 (capability-registry.ts 62, applied at 271 unless limits.deadlineMs is set, validated >= 1).", False, "Constant lives in the registry, not runtime.ts; node() -> callNode -> registry.invoke is the path (runtime 1610, claude-host 362-369). 'Default' correctly allows the per-registry override.", ev=["cr_deadline", "cr_apply", "cr_valid", "cr_reject", "rt_callnode"],
  case="verified", counter="none", narrower="same", settle="none", attacks=[("entailment", "one inferred hop node()->registry, verified")])
g("C0231", "SUPPORTED", "node() is a single bounded request/response capability call (default 30 s, configurable) with no mid-run observation or control surface; whether develop() would exceed the deadline is asserted, not measured.", True,
  "Load-bearing premise (one value, no mid-run control) is true of registry.invoke but unstated; the 30-second figure is adjustable so it is not the structural reason; develop() duration was not measured by the program or here. Conclusion plausible as design judgment, argument incomplete.",
  ev=["cr_deadline", "cr_valid", "rt_callnode", "d01_47"], defeaters=[("undercutting", "deadline is configurable; duration unmeasured")], propagation="inherits C0230 ESTABLISHED; inductive design conclusion -> SUPPORTED",
  case="A one-shot call cannot expose a long-running function's lifecycle.", counter="A raised deadline would remove the stated 30 s obstacle.", narrower="same as permitted", settle="A measured develop() duration would ground the timing half.", attacks=[("missing premise", "mid-run observation premise supplied")])
g("C0232", "ESTABLISHED", "Function writes, lifecycle and evidence are not bridged between Pi and Mechanical at the pins: no Pi binding exists (C0160) and both programs disclaim implementation.", False, "Over-determined by the absence detector of C0160; the narrowing of C0229 does not reach it.", ev=["hosts_ls", "grep_mech_src", "mw_nopi", "sk_16"],
  propagation="premises C0228 ESTABLISHED, C0229 narrowed, C0230 ESTABLISHED, C0231 SUPPORTED, C0160 ESTABLISHED; conclusion entailed by C0160", case="No binding exists.", counter="none", narrower="same", settle="none", attacks=[("broken premise", "C0229 drift does not propagate")])
for cid, txt in [("C0233", "a host invoking developLive must own a clean workspace"), ("C0234", "a host must explicitly authorize Git writes"), ("C0235", "a host must honor cancellation through the SDK/runner"), ("C0236", "a host must preserve a candidate or uncertain outcome"), ("C0237", "a host must display the four result variants separately from termination and Forge's verdict")]:
    pres = "ESTABLISHED (C0228: single-writer Git side-effect)" if cid in ("C0233", "C0234") else ("SUPPORTED (C0229 narrowed: pre-dispatch barrier only at the pin)" if cid == "C0235" else "ESTABLISHED (C0238 four variants)")
    g(cid, "NON-EPISTEMIC", f"Requirement: {txt}.", False, f"Norm; presupposition {pres}.", ev=["d01_47"], presup=pres)
g("C0238", "ESTABLISHED", "DevelopmentOutcome is a union of exactly four variants: verified_candidate, verification_failed, needs_evidence, indeterminate (contracts.ts 54-58, unchanged).", False, "Full union read; package unchanged baseline->pin.", ev=["mw_ct_out", "mw_dev_nodrift"], case="verified", counter="none", narrower="same", settle="none", attacks=[("quantifier", "exactly four confirmed")])

# ===================== P1 HX scope =====================
g("C0239", "ESTABLISHED", "discoverTaskScope marks coverage complete only when scopeKind === 'task', revision === request.baseRevision and queryDigest is a nonempty string (plus exit 0, terminal, complete coverage, licensesAbsence).", False, "hx-scope.ts 43-46; file unchanged baseline->pin.", ev=["mw_hx_45", "mw_hx_nodrift"], case="verified", counter="none", narrower="same", settle="none", attacks=[("entailment", "ok")])
g("C0240", "ESTABLISHED", "The default runNative query returns scopeKind 'filesystem'.", False, "hx-scope.ts 33.", ev=["mw_hx_33"], case="verified", counter="none", narrower="same", settle="none", attacks=[("entailment", "ok")])
g("C0241", "ESTABLISHED", "The default runNative query returns revision: null.", False, "hx-scope.ts 33.", ev=["mw_hx_33"], case="verified", counter="none", narrower="same", settle="none", attacks=[("entailment", "ok")])
g("C0242", "ESTABLISHED", "The default native HX query can never yield coverage 'complete' under discoverTaskScope, and develop() returns needs_evidence/SCOPE_INCOMPLETE for any non-complete scope, so the default query cannot authorize the task-scoped implement path.", False,
  "Deductive from C0239-C0241 plus develop.ts 36-38 (the previously missing premise). Note the doc restates hx-scope.ts's own header comment - one lineage - but the code logic is the independent check.", ev=["mw_hx_33", "mw_hx_45", "mw_dev_scope", "mw_hx_hdr"],
  propagation="premises C0239-C0241 ESTABLISHED; derivation valid", case="Literal constants make completeness unreachable.", counter="none", narrower="same", settle="none", attacks=[("lineage", "doc vs code comment same origin; code logic independent")])
g("C0243", "ESTABLISHED", "Pi's hyperunix.find accepts only {kind, root} (no task, revision or digest input), so it is a general bounded read, not a task-scoped certificate.", False, "providers/hyperunix.ts 14 INPUT schema (additionalProperties:false).", ev=["pr_hx_in", "pr_hx_reg"], case="verified", counter="none", narrower="same", settle="none", attacks=[("entailment", "ok")])
g("C0244", "ESTABLISHED", "A semantic gap exists between MW's completeness requirement (task scope + baseRevision + digest) and both the rig's default native find and Pi's hyperunix.find (neither carries those fields).", False, "Comparison of the two schemas/constants; follows from C0239, C0242, C0243.", ev=["mw_hx_45", "pr_hx_in", "mw_hx_33"], propagation="all premises ESTABLISHED", case="Schema comparison.", counter="none", narrower="same", settle="none", attacks=[("inference", "comparative, no generalization")])
g("C0245", "NON-EPISTEMIC", "Proposal: ship an honestly named Git-census path first, or wait for native producer proof.", False, "Proposal; note 'git-census' is the program's vocabulary - at the pin the shipped discriminant is discovery: 'git-tracked-files' and no 'git-census' identifier exists.", ev=["mw_nogc", "mw_ld_result", "mw_ld_census"], presup="SUPPORTED (a tracked-file census mode exists under a different name)")
g("C0246", "NON-EPISTEMIC", "Norm: never relabel a filesystem census as task-complete HX.", False, "Norm; consistent with hx-scope.ts's own header and docs/14.", ev=["mw_hx_hdr", "mw_d14"], presup="consistent")

# ===================== P1 RF =====================
g("C0247", "ESTABLISHED", "reactivefiber.render.preview spawns `rf ... context render ... --no-commit --no-input --json` and rejects any envelope whose render_id is not null or ephemeral is not true.", False, "providers/reactivefiber.ts 115, 17, 70 - stronger than stated: a preview can never carry a committed render id.", ev=["pr_rf_argv", "pr_rf_src", "pr_rf_null"], case="verified", counter="none", narrower="same", settle="none", attacks=[("entailment", "ok")])
g("C0248", "ESTABLISHED", "renderTaskContext requires render_id to be a nonempty string (rf-context.ts 84); its argv omits --no-commit, from which 'committed' is inferred; the requirement is unchanged since the baseline (line 50 then).", True, "'committed' is inferred from the argv shape, not from an explicit committed check - a small gloss.", ev=["mw_rf_req", "mw_rf_argv", "mw_rf_base", "mw_rf_drift"], defeaters=[("semantic", "'committed' is inferred from the absence of --no-commit")], case="verified", counter="none", narrower="nonempty render_id required", settle="none", attacks=[("semantic", "gloss recorded")])
g("C0249", "ESTABLISHED", "renderTaskContext requires the rendered text to include the task and the source revision (line 82).", False, "verified", ev=["mw_rf_req"], case="verified", counter="none", narrower="same", settle="none", attacks=[("entailment", "ok")])
g("C0250", "ESTABLISHED", "renderTaskContext requires provenance.graph_revision_id and a verified model budget (capability_snapshot.model_id/verified, formula_terms.available_context_tokens) (lines 86-89).", False, "verified", ev=["mw_rf_req2"], case="verified", counter="none", narrower="same", settle="none", attacks=[("entailment", "ok")])
g("C0251", "UNSUPPORTED", "MW's rig adapter renderTaskContext enforces render_id/task/revision/budget requirements in code, and docs/07 documents receipt labelling by RF producer id; no MW document states a 'proof contract' for compileContext, and the compileContext port itself (CompiledContext; develop() checks basis equality only) imposes no render_id requirement.", True,
  "Detector: grep -rni 'proof contract' over MW docs/packages/apps -> 0; grep compileContext docs/*.md -> 04:10,35 and 06:105, none stating proof obligations. The phrase is the Pi doc's paraphrase. The requirements exist in the adapter, not as a documented contract of the compileContext port.",
  ev=["mw_noproof", "mw_ct_ctx", "mw_dev_ctx", "mw_d07", "mw_d04", "mw_rf_req"], defeaters=[("semantic", "'documented proof contract' vs code-enforced adapter checks"), ("scope", "adapter vs port")],
  rivals=["Charitable reading: 'documented' = the rig's typed refusal RF_CONTEXT_UNESTABLISHED and docs/07 - SUPPORTED as 'enforced in the rig adapter and described in docs/07', not as a compileContext contract."],
  propagation="caps C0252 wording", case="docs/07 and the adapter code show the RF-id rule.", counter="No document names a compileContext proof contract; the port is permissive.", narrower="The rig adapter enforces RF render requirements; docs/07 documents the RF-id receipt rule.", settle="An MW document stating compileContext proof obligations would establish it.", attacks=[("documented->implemented inverted", "the claim says documented; only code exists")], remediation="REPLACE_SOURCE: cite rf-context.ts and docs/07; drop 'documented proof contract'")
g("C0252", "SUPPORTED", "A Pi preview envelope (render_id null, ephemeral true) cannot satisfy the rig's RF-context checks (nonempty render_id, graph revision, verified model budget), so substituting it for the rig's renderTaskContext result would fail with RF_CONTEXT_UNESTABLISHED; under the develop() compileContext-port reading the prediction does not follow (the port checks basis equality only).", True,
  "Equivocation on 'compileContext': sound for the rig binding (Pi rejects render_id!==null; MW requires nonempty render_id - mutually exclusive by code), unsound for the port. 'Documented proof contract' presupposition is UNSUPPORTED (C0251). Not executed.",
  ev=["pr_rf_null", "mw_rf_req", "mw_dev_ctx", "mw_ct_ctx", "d01_55"], defeaters=[("semantic", "two referents of compileContext"), ("undercutting", "C0251 UNSUPPORTED removes the 'documented contract' framing")],
  rivals=["Reading A (rig adapter): SUPPORTED. Reading B (develop() port): not entailed."], propagation="premises C0247-C0250 ESTABLISHED, C0251 UNSUPPORTED -> prediction SUPPORTED only under reading A",
  case="Preview and committed render are mutually exclusive by construction.", counter="develop() would accept any basis-matching context.", narrower="A preview envelope fails renderTaskContext's checks.", settle="State the referent; a unit test feeding a preview envelope to the rig's rf context check would witness it.", attacks=[("equivocation", "recorded")], remediation="NARROW_SCOPE: name the rig adapter; DOWNGRADE 'documented proof contract'")
g("C0253", "SUPPORTED", "Pi's RF preview (ephemeral, --no-commit, render_id null) and MW's committed render requirement (nonempty render_id) are mutually exclusive by code, so the preview cannot stand in for the rig's committed context.", False, "Follows from C0247/C0248 directly; inherits C0252's referent caveat.", ev=["pr_rf_null", "pr_rf_argv", "mw_rf_req"], propagation="inherits C0252 SUPPORTED (reading A)", case="code exclusivity", counter="port reading", narrower="same", settle="none", attacks=[("inference", "ok under reading A")])
g("C0254", "NON-EPISTEMIC", "Norm: treat Pi's RF preview as an observation only.", False, "Norm; presupposition C0247 ESTABLISHED.", ev=["pr_rf_reg"], presup="ESTABLISHED")
g("C0255", "NON-EPISTEMIC", "Proposal: a separate producer-backed context adapter, or retain the measured rig mode.", False, "Proposal; presupposition C0253 SUPPORTED.", ev=["mw_ld_rf"], presup="SUPPORTED")

# ===================== P2 =====================
g("C0256", "ESTABLISHED", "Each executeWorkflow run constructs its own agent Semaphore (options.concurrency ?? workflowConcurrency()) and a fixed node Semaphore(16).", False, "runtime.ts 737-738.", ev=["rt_sem"], case="verified", counter="none", narrower="same", settle="none", attacks=[("entailment", "ok")])
g("C0257", "ESTABLISHED", "Per-run semaphores are local to one executeWorkflow call and therefore, by themselves, do not bound the total across concurrently running workflows.", False, "Analytic from per-run construction (737-738). The claim says 'by themselves'; whether a higher-level limiter exists elsewhere is not asserted and was not searched.", ev=["rt_sem"], propagation="inherits C0256", case="per-run locals", counter="A separate global limiter could exist (not claimed, not searched).", narrower="same", settle="none", attacks=[("scope", "'by themselves' preserved")])
g("C0258", "SUPPORTED", "The workflow semaphores do not bound Pi's scheduled agents, which run through a different subsystem (agent-manager / Pi's Agent tool) that never touches the per-run locals.", False, "Analytic given per-run locals plus claude-host.ts line 1 ('Pi's Agent tool stays separate'); the scheduled-agent subsystem itself was not inspected, and the doc cites nothing for it.", ev=["rt_sem", "ch_sep"], defeaters=[("undercutting", "unargued in the doc; other subsystem not inspected")], case="locals cannot bound another subsystem", counter="none material", narrower="same", settle="inspect the scheduler", attacks=[("missing citation", "noted")])
g("C0259", "SUPPORTED", "The workflow semaphores do not bound Furnace attempts: furnace-hosted.ts states Furnace owns retry/attempt identity and the module adds no scheduler.", False, "Analytic plus furnace-hosted.ts header; Furnace itself not inspected.", ev=["rt_sem", "fh_header", "fh_nosched"], defeaters=[("undercutting", "unargued in the doc")], case="header states no scheduler", counter="none", narrower="same", settle="none", attacks=[("missing citation", "noted")])
g("C0260", "NON-EPISTEMIC", "Proposal: host-level budgets and measured admission surfaces, not a second scheduler.", False, "Proposal; presuppositions C0257-C0259 ESTABLISHED/SUPPORTED.", ev=["rt_sem"], presup="SUPPORTED")
g("C0261", "ESTABLISHED", "Semaphore's constructor stores `limit` unvalidated and `??` passes an explicit 0 through, so new Semaphore(options.concurrency ?? ...) accepts zero (the file's own comment notes zero permits would hang the run); no production caller passes options.concurrency and the default clamps to [1,16], so the exposure is programmatic/test-only at the pin.", True,
  "Constructor 489 has no guard; 737 passes options.concurrency; runtime.ts 60-61 acknowledges the hang. Detector: grep 'concurrency:' over src/ excluding runtime.ts -> only timeline measurement fields; no caller sets it. 'Can otherwise accept zero' is correct; a reader should not infer a live misconfiguration path.",
  ev=["rt_semclass", "rt_sem", "rt_conc", "rt_concdoc"], defeaters=[("scope", "no production caller reaches the zero path")], case="type-level acceptance verified", counter="unreachable from settings today", narrower="API-level hazard, not a live path", settle="none", attacks=[("possible->observed", "kept as 'can accept'")])
g("C0262", "NON-EPISTEMIC", "Proposal: validate concurrency/caps as positive integers.", False, "Proposal; presupposition C0261 ESTABLISHED (programmatic exposure).", ev=["rt_semclass"], presup="ESTABLISHED")
g("C0263", "ESTABLISHED", "Recent new-feedback/ files (2026-10-27, 2026-11-01, 2026-11-03) report sibling census cuts conflicting at landing; all from one flywheel seat lineage.", False, "Filenames and bodies ('conflict' in 6/6 of the 11-01..03 files). Lineage: one seat (a8ddce77), later cycles of one October file - counted once.", ev=["nf_conflict", "nf_bodies", "nf_from"], defeaters=[("provenance", "single lineage")], propagation="inherits C0103 SUPPORTED", case="filenames + bodies", counter="none", narrower="same", settle="none", attacks=[("multiplicity", "one lineage")])
g("C0264", "SUPPORTED", "Same-seat new-feedback/ files dated 2026-10-20..2026-10-30 report vitest 5000 ms default timeouts and timing cures; none of the 2026-11-01..03 files mentions deadlines, and 'deadline inflation' is the doc's paraphrase.", True,
  "Topic located by filename (10-20, 10-21, 10-24, 10-25, 10-27, 10-28, 10-29, 10-30); 'deadline' appears in 0/6 of the 11-01..03 bodies. 'Recent' spans October, wider than the method's stated window; bodies not read in full.",
  ev=["nf_deadline", "nf_bodies", "d01_59b", "d01_3"], defeaters=[("temporal", "October files, outside the 11-01..03 window the method names"), ("semantic", "'deadline inflation' paraphrases '5000 ms default reds / timing cure'")],
  case="Many timeout-themed files exist.", counter="None in the stated window; wording differs.", narrower="October same-seat files report vitest timeout reds.", settle="read the bodies", attacks=[("historical->current", "window widened explicitly")])
g("C0265", "SUPPORTED", "Same-seat new-feedback/ files dated 2026-10-21..2026-10-29 report report-mode census rows turning timeouts into census reds; 'report-mode' appears in only 1/6 of the 11-01..03 bodies.", True, "Filename detector (10-21, 10-22, 10-28, 10-29); bodies not read in full; outside the stated window.", ev=["nf_report", "nf_bodies", "d01_3"], defeaters=[("temporal", "October files")], case="files exist", counter="window", narrower="October files", settle="read bodies", attacks=[("historical->current", "noted")])
g("C0266", "ESTABLISHED", "Recent new-feedback/ files (2026-10-31, 2026-11-01, 2026-11-02, 2026-11-04) report prep-step cost and refusal classes ('prep' in 6/6 of the 11-01..03 bodies).", False, "Filenames and bodies; one seat lineage.", ev=["nf_prep", "nf_bodies", "nf_from"], defeaters=[("provenance", "single lineage")], case="filenames + bodies", counter="none", narrower="same", settle="none", attacks=[("multiplicity", "one lineage")])
g("C0267", "NON-EPISTEMIC", "Norm: no shared assertion/header files for unrelated cuts.", False, "Norm; presupposition C0263 ESTABLISHED.", ev=["nf_conflict"], presup="ESTABLISHED")
g("C0268", "NON-EPISTEMIC", "Norm: preserve the per-bead receipt convention.", False, "Norm; presupposition (per-bead receipts exist) ESTABLISHED by docs/workbench/receipts/.", ev=["receipts_ls"], presup="ESTABLISHED")
g("C0269", "NON-EPISTEMIC", "Norm: no new shared receipts index and no TRACEABILITY edits.", False, "Norm; no empirical presupposition graded here.", ev=["d01_59b"], presup="n/a")
g("C0270", "NON-EPISTEMIC", "Priority P2 for the budgets/test-feedback findings.", False, "Normative ranking; presuppositions C0257 ESTABLISHED, C0261 ESTABLISHED (programmatic).", ev=["rt_sem"], presup="ESTABLISHED")

# ===================== Audit limitations =====================
g("C0271", "SUPPORTED", "The audit reports executing no working tree and no installed SDKs.", False, "Self-report of a negative. Independent corroboration: both program commits are docs-only (git show --stat: no receipts, fixtures or run logs) and the MW program states the same limitation. A detector for runs outside the repos does not exist here.", ev=["d01_64", "prog_stat", "mw_prog_stat", "mw_prog_3"], missing="audit session log")
g("C0272", "SUPPORTED", "The audit reports no Forge, Node or Vitest runs.", False, "Self-report; corroborated by the docs-only program commits (git show --stat) and the MW program's identical limitation line.", ev=["d01_64", "prog_stat", "mw_prog_stat", "mw_prog_3"], missing="audit session log")
g("C0273", "SUPPORTED", "The audit reports no real Claude, Furnace, HX or RF calls.", False, "Self-report; corroborated by the docs-only program commits and the MW program's identical limitation line (one lineage, but the commit contents are an independent detector for in-repo receipts).", ev=["d01_64", "prog_stat", "mw_prog_stat", "mw_prog_3"], missing="audit session log")
g("C0274", "ESTABLISHED", "The P0 worktree finding follows from reading src/worktree.ts alone (no runtime observation needed); the 'contradiction' is between the result shape and the filesystem outcome, not between two code statements.", False, "Confirmed by this audit's own source re-read (C0167-C0171).", ev=["wt_catch", "wt_force", "d01_64"], propagation="inherits C0167/C0168/C0170 ESTABLISHED", case="verified", counter="none", narrower="same", settle="none", attacks=[("semantic", "'contradiction' sense recorded")])
g("C0275", "ESTABLISHED", "The P1 detached admission finding follows from reading index.ts and local-detached.ts alone.", False, "Confirmed (C0204).", ev=["ix_grants", "ld_430", "d01_64"], propagation="inherits C0204 ESTABLISHED", case="verified", counter="none", narrower="same", settle="none", attacks=[("entailment", "ok")])
g("C0276", "NON-EPISTEMIC", "Norm: treat performance and live-integration evidence as historical and possibly drifted.", False, "Norm; presupposition (receipts are dated 2026-10-15; MW program scopes them) ESTABLISHED via C0152/C0106.", ev=["mw_qa_log", "mw_prog_3"], presup="ESTABLISHED")
g("C0277", "ESTABLISHED", "The descriptor/host spelling is independently checkable against the committed JSON and the TypeScript host - and at the MW pin the check yields a MATCH (repaired at 1f29daa7), so any present-tense restatement of the discrepancy is stale.", True,
  "The meta-claim (checkable) is true; this audit performed the check at both revisions. The surrounding doc sentence presupposes a current discrepancy, which the pin refutes (C0194).", ev=["mw_desc_pin", "mw_eh_check", "mw_desc_base", "d01_65"], defeaters=[("temporal", "check result flipped between baseline and pin")],
  propagation="inherits C0189-C0192: C0191/C0192 ESTABLISHED, C0189/C0190 REFUTED at pin", case="checkable: yes", counter="result now MATCH", narrower="checkable; result version-dependent", settle="settled", attacks=[("historical->current", "noted")], remediation="ADD_TEMPORAL_QUALIFIER")
g("C0278", "NON-EPISTEMIC", "Norm: do not collapse coordination policy evaluation into effect authorization.", False, "Norm; presupposition (coordination exports are policy combinators, C0154) ESTABLISHED.", ev=["mw_coord"], presup="ESTABLISHED")
g("C0279", "NON-EPISTEMIC", "Definition: a pure coordination intent is not a Beads claim nor a Forge/Furnace operation.", False, "Stipulative definition; consistent with the coordination package being provider-neutral (exports only).", ev=["mw_coord"], presup="consistent")

missing = [c["id"] for c in CLAIMS if c["id"] not in G]
assert not missing, missing

# ---- missing artifacts for non-ESTABLISHED empirical rows (what would settle them) ----
MISSING = {
 "C0114": "a receipt dedicated to the Claude executor (live run record), or a read of the 9 referencing receipts against the executor's behaviour",
 "C0119": "none (depth qualifier is the repair)",
 "C0152": "a live rig receipt dated at or after the pin; the 2026-10-15 receipts' contents were not assessed",
 "C0161": "none (scope qualifier 'invocation/host binding' is the repair)",
 "C0163": "a refreshed W11 row whose detection sentence matches the pin tree",
 "C0169": "a failure-path test asserting the worktree directory was removed (existsSync false) after a failed commit",
 "C0182": "as C0163",
 "C0184": "a design note stating the model/host split is intentional (tests already indicate it)",
 "C0209": "a census of every test entrypoint (incl. *.census.ts bodies) confirming no indirect full-extension harness drives the registered detached launch",
 "C0213": "an executed reproduction: park beforeDispatch, issue skip/retry (or host.abortAgent), release, assert sdk.calls.length === 0 and a skipped settlement",
 "C0224": "a test that replays an agent answer after a source-tree or skill-file edit under an unchanged prompt/basis",
 "C0229": "none (version split settled by git show/log; wording repair owed)",
 "C0231": "a measured develop() duration against the 30 s default, and an explicit statement that node() exposes no mid-run observation/control",
 "C0251": "an MW document stating compileContext's proof obligations (none found at the pin)",
 "C0252": "the referent of 'compileContext' (rig adapter vs develop() port), plus a unit test feeding a preview envelope to the rig's RF-context check",
 "C0253": "as C0252",
 "C0258": "an inspection of the scheduled-agent subsystem for any shared limiter",
 "C0259": "none (Furnace owns attempts per furnace-hosted.ts header)",
 "C0264": "the bodies of the October deadline/timeout feedback files (filenames only were read)",
 "C0265": "the bodies of the October report-mode feedback files",
}
for k, v in MISSING.items():
    if not G[k]["missing"]:
        G[k]["missing"] = v

# ===================== emit =====================
STRENGTH_LEAD = {
    "ESTABLISHED": "plain factual wording inside the stated scope",
    "SUPPORTED": "evidence-qualified factual wording ('the pinned source indicates')",
    "PLAUSIBLE": "modal wording only ('may', 'is consistent with')",
    "UNSUPPORTED": "'has been asserted, but the available evidence does not establish it'",
    "CONTESTED": "'sources disagree' / surface both readings",
    "REFUTED": "'the pinned evidence contradicts ... within <scope>' (state the version split where one exists)",
    "UNDETERMINED": "'unknown from the available evidence' + name the missing artifact",
    "NON-EPISTEMIC": "'we define / the requirement is / we propose'",
}
def evref(e):
    return f"{e['pin']}:{e['path']}:{e['lines']}"
def md_quote(q):
    return q.replace("\n", "\\n")

status_rows, relations, dossier_count = [], [], 0
for c in CLAIMS:
    cid = c["id"]; r = G[cid]
    evs = [E[k] for k in r["ev"]]
    defeaters = [{"type": t, "text": x} for (t, x) in r["defeaters"]]
    row = {
        "id": cid, "claim_file": "claims-part-01.jsonl", "group": "g01", "kind": c["kind"], "material": c["material"], "status": r["status"],
        "permitted_strength": r["permitted"], "artifact_wording": c["strongest_wording"], "overclaims": r["overclaims"],
        "rationale": r["rationale"], "evidence": evs, "defeaters": defeaters, "rivals_preserved": r["rivals"],
        "depends_on": c["depends_on"], "propagation": r["propagation"] or ("none: no premises" if not c["depends_on"] else "premises: " + ", ".join(f"{d}={G[d]['status']}" for d in c["depends_on"])),
        "missing_artifact": r["missing"], "scope": c["scope"], "time_version": c["time_version"],
    }
    if r["status"] == "NON-EPISTEMIC":
        row["presuppositions"] = r["presup"]
    status_rows.append(row)
    # relations: premises
    if c["depends_on"]:
        rel = "DERIVED_FROM" if c["kind"] in ("FORMAL_DERIVATION", "INFERENCE", "HYPOTHESIS", "PREDICTION") else ("ASSUMES" if c["kind"] in ("NORMATIVE", "PROPOSAL", "DEFINITION") else "DEPENDS_ON")
        for d in c["depends_on"]:
            relations.append({"from": cid, "to": d, "relation": rel, "evidence": [], "joint": c["depends_on"] if len(c["depends_on"]) > 1 else []})
    # relations: evidence support/contradiction
    for e in evs:
        if e["pin"].startswith("doc@"):
            continue
        kind = "CONTRADICTS" if r["status"] == "REFUTED" and (("mw@f7c0a9431d6c" in e["pin"] and cid in ("C0189", "C0190", "C0193", "C0194", "C0195", "C0196")) or (cid == "C0188" and e["pin"].startswith("pi@"))) else "SUPPORTS"
        if cid in ("C0189", "C0190", "C0193") and e["pin"].startswith("mw@0c78e253"):
            kind = "SUPPORTS"  # baseline evidence supports the historical reading
        relations.append({"from": evref(e), "to": cid, "relation": kind, "evidence": [e], "joint": []})
    # dossier
    if c["material"]:
        dossier_count += 1
        L = []
        L.append(f"# {cid} — {c['proposition']}\n")
        L.append("Claim file: claims-part-01.jsonl (group g01; note: ids C0201-C0279 are also used by claims-part-02.jsonl for different propositions — this dossier is the part-01 claim).\n")
        L.append("## Verbatim artifact wording")
        L.append(f"> {c['strongest_wording']}\n")
        L.append(f"Anchor: doc@7c80c34346c2 {c['source']['path']} line(s) {c['source']['lines']} (section: {c['source'].get('section')}).\n")
        L.append("## Claim type and scope")
        L.append(f"- Kind: {c['kind']}")
        L.append(f"- Scope: {c['scope']}")
        L.append(f"- Temporal/version context (as stated): {c['time_version']}; graded at the environment pins pi@b27829e6dfa7 / mw@f7c0a9431d6c, with baseline drift recorded where it exists.")
        if c.get("implicit_premises"):
            L.append(f"- Implicit premises (from Phase 2): {'; '.join(c['implicit_premises'])}")
        L.append("")
        L.append("## Warrant verdict")
        L.append(f"- Status: {r['status']}")
        L.append(f"- Permitted wording: {r['permitted']}")
        L.append(f"- Permitted linguistic strength: {STRENGTH_LEAD[r['status']]}")
        L.append(f"- Artifact overclaims: {'yes' if r['overclaims'] else 'no'}")
        L.append(f"- Rationale: {r['rationale']}\n")
        L.append("## Support")
        L.append("| Evidence | Relation | What it establishes | Limits |")
        L.append("|---|---|---|---|")
        for e in evs:
            rel = "SUPPORTS"
            if e["pin"].startswith("doc@"): rel = "ARTIFACT_WORDING"
            elif r["status"] == "REFUTED" and not e["pin"].startswith("mw@0c78e253") and cid in ("C0188", "C0189", "C0190", "C0193", "C0194", "C0195", "C0196"): rel = "CONTRADICTS"
            limits = "static read; not run" if not e["pin"].startswith("doc@") else "the audited text itself"
            L.append(f"| `{evref(e)}` | {rel} | `{md_quote(e['quote'])}` | {limits} |")
        L.append("")
        L.append("## Counterevidence / defeaters")
        L.append("| Evidence | Defeater type | Effect |")
        L.append("|---|---|---|")
        if defeaters:
            for d in defeaters:
                L.append(f"| (see Support rows / rationale) | {d['type']} | {d['text']} |")
        else:
            L.append("| none found | — | — |")
        L.append("")
        L.append("## Dependencies")
        L.append(f"- incoming warrant hyperedges: {', '.join(c['depends_on']) if c['depends_on'] else 'none (leaf observation)'}")
        L.append(f"- assumptions: {'; '.join(c.get('implicit_premises') or []) or 'none recorded'}")
        down = [d["id"] for d in CLAIMS if cid in d["depends_on"]]
        L.append(f"- downstream claims affected: {', '.join(down) if down else 'none'}")
        L.append(f"- propagation: {row['propagation']}\n")
        L.append("## Rival readings tested")
        L.append(f"- strongest support reading: {r['case'] or 'as worded'}")
        L.append(f"- strongest counter-reading: {r['counter'] or 'none material'}")
        L.append(f"- narrower established proposition: {r['narrower'] or r['permitted']}")
        L.append(f"- alternative explanation / preserved rivals: {'; '.join(r['rivals']) if r['rivals'] else 'none'}\n")
        L.append("## Adversarial attacks")
        for (a, o) in r["attacks"]:
            L.append(f"- {a}: {o}")
        L.append(f"- what would have detected failure: a pin line that does not entail the proposition, or a baseline->pin diff on the cited file (checked: {'Pi src/ has no drift' if any(e['pin'].startswith('pi@') for e in evs) else 'MW files diffed baseline..pin'}).")
        L.append(f"- what would upgrade/downgrade/settle: {r['settle'] or 'none owed'}\n")
        L.append("## Missing evidence")
        L.append(r["missing"] or "none\n")
        L.append("## Remediation")
        L.append(r["remediation"] or "none")
        L.append("")
        with open(os.path.join(OUT, "dossiers", f"{cid}.md"), "w") as f:
            f.write("\n".join(L))

# cross-document lineage / contradiction relations (claim <-> other-document restatements)
def add(frm, to, rel, evs, joint=()):
    relations.append({"from": frm, "to": to, "relation": rel, "evidence": [E[k] for k in evs], "joint": list(joint)})
add(evref(E["mw_prog_66"]), "C0170", "SAME_ORIGIN_AS", ["mw_prog_66", "mw_prog_66b"])
add(evref(E["mw_prog_66"]), "C0205", "SAME_ORIGIN_AS", ["mw_prog_66", "mw_prog_66b"])
add(evref(E["mw_prog_66"]), "C0213", "SAME_ORIGIN_AS", ["mw_prog_66", "mw_prog_66b"])
add(evref(E["mw_prog_66"]), "C0224", "SAME_ORIGIN_AS", ["mw_prog_66", "mw_prog_66b"])
add(evref(E["mw_prog_22"]), "C0194", "SAME_ORIGIN_AS", ["mw_prog_22"])
add(evref(E["mw_prog_34"]), "C0242", "SAME_ORIGIN_AS", ["mw_prog_34"])
add(evref(E["mw_prog_42"]), "C0229", "SAME_ORIGIN_AS", ["mw_prog_42"])
add(evref(E["sk_14"]), "C0195", "QUOTED_FROM", ["sk_14"])
add(evref(E["sk_15"]), "C0205", "QUOTED_FROM", ["sk_15"])
add(evref(E["sk_12"]), "C0128", "QUOTED_FROM", ["sk_12"])
add(evref(E["sk_13"]), "C0161", "QUOTED_FROM", ["sk_13"])
add(evref(E["sk_16"]), "C0253", "QUOTED_FROM", ["sk_16"])
add(evref(E["sk_32"]), "C0231", "QUOTED_FROM", ["sk_32"])
add(evref(E["d02_48"]), "C0189", "QUOTED_FROM", ["d02_48"])
add(evref(E["d03_18"]), "C0197", "QUOTED_FROM", ["d03_18"])
add(evref(E["d03_22"]), "C0216", "QUOTED_FROM", ["d03_22"])
add("C0163", evref(E["fm_row"]), "QUOTED_FROM", ["fm_row", "fm_detect"])
add("C0182", evref(E["fm_row"]), "QUOTED_FROM", ["fm_row"])
add("C0163", "C0182", "SAME_ORIGIN_AS", ["fm_row"])
add(evref(E["fm_detect"]), evref(E["grep_mech_src"]), "CONTRADICTS", ["fm_detect", "grep_mech_src", "ce_added"])
add("C0263", evref(E["nf_conflict"]), "QUOTED_FROM", ["nf_conflict", "nf_from"])
add("C0264", evref(E["nf_deadline"]), "QUOTED_FROM", ["nf_deadline"])
add("C0265", evref(E["nf_report"]), "QUOTED_FROM", ["nf_report"])
add("C0266", evref(E["nf_prep"]), "QUOTED_FROM", ["nf_prep", "nf_from"])
for a_, b_ in [("C0263", "C0264"), ("C0264", "C0265"), ("C0265", "C0266")]:
    add(a_, b_, "SAME_ORIGIN_AS", ["nf_from"])
add("C0242", evref(E["mw_hx_hdr"]), "SAME_ORIGIN_AS", ["mw_hx_hdr"])
add(evref(E["sk_14"]), evref(E["mw_skill_14"]), "CONFLICTS_WITH", ["sk_14", "mw_skill_14"])
add("C0188", "C0186", "DERIVED_FROM", ["d01_27b"])  # the observation row was read off the norm
add("C0184", "C0178", "SPECIALIZES", ["ex_kinds", "et_refuse"], joint=["C0178", "C0179"])
add("C0205", "C0200", "GENERALIZES", ["ix_detached"])  # scope: also workflow_detached
add("C0161", "C0160", "SPECIALIZES", ["ce_header"])
add("C0164", "C0183", "SAME_ORIGIN_AS", ["d01_17", "d01_27"])
add("C0274", "C0170", "ENTAILS", ["wt_catch"])
add("C0275", "C0204", "ENTAILS", ["ld_430"])
add("C0277", "C0194", "DEPENDS_ON", ["mw_desc_pin", "mw_eh_check"])
relations.append({"from": evref(E["mw_ci_signal"]), "to": "C0229", "relation": "CONTRADICTS", "evidence": [E["mw_ci_signal"], E["mw_ld_signal"], E["mw_t_sig"]], "joint": [], "note": "contradicts the unqualified presence clause ('no AbortSignal in its public options') at the pin; the 'no general/mid-run cancellation' reading survives"})
relations.append({"from": evref(E["mw_ci_base"]), "to": "C0229", "relation": "SUPPORTS", "evidence": [E["mw_ci_base"], E["mw_ld_base_sig"]], "joint": [], "note": "supports the claim at the program baseline 0c78e253"})
relations.append({"from": evref(E["td_iso"]), "to": evref(E["ch_iso"]), "relation": "CONFLICTS_WITH", "evidence": [E["td_iso"], E["ch_iso"]], "joint": [], "note": "pin-internal: the model-facing description still advertises isolation 'worktree' for workflow agent() while the Claude host refuses it (context for C0175)"})
relations.append({"from": evref(E["ix_detached"]), "to": "C0200", "relation": "GENERALIZES", "evidence": [E["ix_detached"]], "joint": [], "note": "a second registered site (workflow_detached) also sends grants:[] with an optional claude backend; the doc names only workflow_execute"})

with open(os.path.join(OUT, "status-part-g01.jsonl"), "w") as f:
    for row in status_rows: f.write(json.dumps(row, ensure_ascii=False) + "\n")
with open(os.path.join(OUT, "relations-part-g01.jsonl"), "w") as f:
    for rel in relations: f.write(json.dumps(rel, ensure_ascii=False) + "\n")

from collections import Counter
counts = Counter(r["status"] for r in status_rows)
print("rows", len(status_rows), "dossiers", dossier_count, "relations", len(relations))
print(dict(counts))
json.dump({"counts": dict(counts), "dossiers": dossier_count, "relations": len(relations)}, open(os.path.join(OUT, ".g01-counts.json"), "w"))
