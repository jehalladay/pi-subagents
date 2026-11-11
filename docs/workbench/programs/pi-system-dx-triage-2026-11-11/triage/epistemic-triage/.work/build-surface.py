import json, os, re, glob, sys, subprocess
PIN = sys.argv[1]; WORK = sys.argv[2]
promises = json.load(open(f"{WORK}/promises.json"))

def rel(paths): return sorted(os.path.relpath(p, PIN) for p in paths)
def g(pat): return rel(glob.glob(os.path.join(PIN, pat)))
def tests(*pats):
    out = set()
    for p in pats: out.update(g(f"test/{p}"))
    return sorted(out)
def qa(*pats):
    out = set()
    for p in pats: out.update(g(f"qa/workbench/{p}"))
    return sorted(out)

sha = subprocess.run(["git","rev-parse","HEAD"],cwd=PIN,capture_output=True,text=True).stdout.strip()

# ---------------- (1) registered tools ----------------
WB_GATE = "registerWorkbenchTools: src/index.ts:2683 `if (workbenchToolsRegistered || sourceSettings(ctx)?.workflowAgentBackend !== \"claude\") return;` then loadWorkbenchNative() (src/index.ts:2691); a native-load failure notifies 'Workbench tools not registered: native modules failed to load (...)' and leaves the upstream surface (src/index.ts:2693-2702)"
JSON_DIALECT = "textResult(sanitizeWorkbenchJsonText(JSON)) — one JSON text block; contractVersion field; bounded (limit/cursor/maxBytes, byte-cap marker); never isError for refusals (refusals are typed fields in the JSON)"
tools = [
 {"name":"Agent","registeredAt":"src/index.ts:1730 (defineTool) / :2450 pi.registerTool(withUsageReporting(agentTool))","gate":"always","schema":{"required":["prompt","description","subagent_type"],"optional":["name","model","thinking","max_turns","run_in_background (default true)","resume","isolated","inherit_context","isolation ('off'|'worktree'; present only when worktreeIsolation setting on — src/invocation-config.ts:53)","schedule (present only when schedulingEnabled — src/index.ts:1588-1599)"]},"replyDialect":"text + details:AgentDetails (status running|background|completed|steered|stopped|error|aborted|queued); custom renderCall/renderResult (src/index.ts:1799-1900); background completion arrives as <task-notification> XML (src/index.ts:205-233)","docs":"README.md:403 ### `Agent`"},
 {"name":"SubagentWorkflow","registeredAt":"src/index.ts:3298 (defineTool) / :3484 `if (isWorkflowsEnabled()) pi.registerTool(workflowTool)`; collision handling src/workflow/collisions.ts + setActiveTools undo (src/index.ts:3499-3543)","gate":"settings.workflowsEnabled (src/index.ts:1343)","schema":{"required":[],"optional":["script (maxLength 524288)","scriptPath","name (saved workflow)","args (any JSON)","resumeFromRunId (^wf_[a-z0-9-]{6,}$)","title (ignored)","description (ignored)"]},"replyDialect":"text + details.taskId; renders a workflow card (src/ui/workflow-card.ts renderWorkflowCard); model-facing description built by src/workflow/tool-description.ts (toolDescriptionMode setting)","docs":"README.md:403 ### `SubagentWorkflow`; docs/workflows.md"},
 {"name":"get_subagent_result","registeredAt":"src/index.ts:3634 registerToolReportingUsage(defineTool({name: SUBAGENT_TOOL_NAMES.GET_RESULT ...}))","gate":"always","schema":{"required":["agent_id (id or @handle)"],"optional":["wait","verbose"]},"replyDialect":"text (status-framed result; verbose appends the conversation)","docs":"README.md ### `get_subagent_result`"},
 {"name":"steer_subagent","registeredAt":"src/index.ts:3723","gate":"always","schema":{"required":["agent_id","message"]},"replyDialect":"text","docs":"README.md ### `steer_subagent`"},
 {"name":"workbench_catalog","registeredAt":"src/index.ts:2705","gate":WB_GATE,"schema":{"optional":["filter","limit (1..TOOL_REPLY_MAX_LIMIT)","cursor"]},"replyDialect":JSON_DIALECT+" (workbench.tool-reply/v1, src/workbench/tool-replies.ts:155 buildWorkflowCatalogReply)","grants":"discover:<capabilityId> per row"},
 {"name":"workflow_inspect","registeredAt":"src/index.ts:2719","gate":WB_GATE,"schema":{"required":["target (1..200)"],"optional":["view (INSPECT_VIEWS: definition|schema|operations — src/workbench/tool-replies.ts:41)"]},"replyDialect":JSON_DIALECT+" (workbench.tool-reply/v1, buildWorkflowInspectReply src/workbench/tool-replies.ts:250)","grants":"inspect:<capabilityId>"},
 {"name":"workflow_validate","registeredAt":"src/index.ts:2785","gate":WB_GATE,"schema":{"optional":["name","scriptPath","sourceRef","digest (sha256:<64hex>)","mode ('static' only)","inputs (unknown)","bindings (unknown)"]},"replyDialect":JSON_DIALECT+" (workbench.validate-reply/v1, src/workbench/validate-reply.ts)","grants":"workbench:design"},
 {"name":"workflow_catalog","registeredAt":"src/index.ts:2823","gate":WB_GATE,"schema":{"optional":["filter","limit (1..20)","cursor (<=2048)"]},"replyDialect":JSON_DIALECT,"grants":"workbench:design"},
 {"name":"workflow_compare","registeredAt":"src/index.ts:2837","gate":WB_GATE,"schema":{"required":["referenceTask","candidateTask"]},"replyDialect":JSON_DIALECT+" (src/workbench/designer.ts)","grants":"workbench:design + workbench:observe"},
 {"name":"forge_gate_run","registeredAt":"src/index.ts:2860","gate":WB_GATE,"schema":{"required":["target (absolute package path, 1..1024)"]},"replyDialect":"JSON text with server-named operation id (workbench.forge-gate-run/v1); operation observed into projection by src/workbench/forge-operation-observer.ts; cancel via workflow_control control:forge.cancel","grants":"forge:run"},
 {"name":"furnace_observe","registeredAt":"src/index.ts:2887","gate":WB_GATE,"schema":{"required":["runId (1..128)"]},"replyDialect":"JSON text snapshot of an external Furnace Run (providers/furnace.ts furnace.run.inspect/v1 + furnace-observer.ts)","grants":"furnace:inspect"},
 {"name":"workflow_detached","registeredAt":"src/index.ts:2911","gate":WB_GATE,"schema":{"required":["action (launch|inspect)","invocationId (1..100)"],"optional":["scriptPath","trustedScript","backend (deterministic|claude)"]},"replyDialect":"JSON text (workbench.local-detached/v1 DetachedReceipt/DetachedSnapshot, src/workbench/hosts/local-detached.ts)","grants":"local-host grants (workbench:detach family)"},
 {"name":"workflow_observe","registeredAt":"src/index.ts:2932","gate":WB_GATE,"schema":{"required":["taskId"],"optional":["limit","cursor","maxBytes","selectors{tone,kind,relations,events{limit,after},identityRefusals{limit}}"]},"replyDialect":JSON_DIALECT+" (workbench.observe/v1, src/workbench/observe-query.ts)","grants":"workbench:observe"},
 {"name":"workflow_reconcile","registeredAt":"src/workbench/reconcile-tool.ts:62 (factory createWorkflowReconcileTool) / src/index.ts:2997","gate":WB_GATE,"schema":{"required":["taskId (^wf_...)","action (inspect|evidence|acknowledge|override)"],"optional":["position","evidence{capabilityId,input}","determination","receiptIds (rcp_<32hex>, max 8)","noEvidenceReason","resolvedValue","reason","acknowledgementId (ack_<32hex>)","confirmed","confirmPosition","confirmCapabilityId","acceptDuplicateRisk"]},"replyDialect":JSON_DIALECT+" (workbench.reconcile/v1, src/workbench/reconcile-decision.ts)","grants":"workbench grants checked in reconcile-tool"},
 {"name":"workflow_execute","registeredAt":"src/workbench/execute-tool.ts:176 (factory createWorkflowExecuteTool) / src/index.ts:3009","gate":WB_GATE,"schema":{"required":["definitionRef{kind: script|function|furnace-formula, id, schemaVersion, artifactDigest}","input (unknown)","hostMode (string 1..32; embedded|detached)"],"optional":["policy (unknown)"]},"replyDialect":JSON_DIALECT+" (workbench.execute/v1, src/workbench/execute.ts); refusal codes incl. unsupported-definition-kind (src/workbench/execute-tool.ts:218 'only script definitions launch in this host'), missing-detach-grant (:216)","grants":"workbench:execute (+ workbench:detach for hostMode detached)"},
 {"name":"workflow_control","registeredAt":"src/workbench/control-tool.ts:138 (factory createWorkflowControlTool) / src/index.ts:3063","gate":WB_GATE,"schema":{"required":["target{provider,type,id,scope?}","action (string 1..32)"],"optional":["confirmed"]},"replyDialect":JSON_DIALECT+" (workbench.control-reply/v1 over workbench.control/v1 receipts: requested -> acknowledged -> result)","grants":"exact control:<provider>.<verb> + confirmed owner + operator confirmation for DESTRUCTIVE_CONTROL_ACTIONS (src/workbench/control.ts:30-39: furnace[stop], claude-agent-sdk[interrupt], forge[cancel], local-detached[cancel,shutdown])"},
]
subagent_facing = [
 {"name":"Agent (nested)","file":"src/nested-tools.ts:162","note":"nested spawn for subagents up to maxSubagentDepth; excludes SUBAGENT_TOOL_NAMES from inheritance (src/agent-runner.ts:48)"},
 {"name":"get_subagent_result (nested)","file":"src/nested-tools.ts:367"},
 {"name":"steer_subagent (nested)","file":"src/nested-tools.ts:394"},
 {"name":"StructuredOutput","file":"src/structured-output.ts:37/:65","note":"synthetic tool behind agent(prompt,{schema}); deliberately not in SUBAGENT_TOOL_NAMES (src/structured-output.ts:32)"},
]
claude_side = {"names":["capability_discover","capability_contract","capability_invoke"],"file":"src/workbench/claude-capability-tools.ts:12","transport":"in-process SDK McpServer handed to @anthropic-ai/claude-agent-sdk query() by src/workbench/claude-host.ts","note":"finite role exposure, NOT authorization; exact grants applied per call"}

# ---------------- (2) commands / settings / env / agent types ----------------
commands = {
 "slashCommands":[{"name":"/agents","registeredAt":"src/index.ts:4871 pi.registerCommand(\"agents\")","menu":["Running agents (N) — shown only when agents exist (src/index.ts:3810-3815)","Agent types (N)","Scheduled jobs (N) — only when scheduler.isActive()","Workflows (N) — only when isWorkflowsEnabled() (src/index.ts:3830-3832)","Create new agent","Settings"],"settingsMenuLabels":["Max concurrency","Max foreground concurrency","Default max turns","Grace turns","Nested depth","Join mode (smart|async|group)","Background by default","Scheduling","Workflows","Fleet view","Remember agents","Agent mentions","Scope models","Strict agent files","Disable defaults","Fallback agent","Tool description","Output transcript","Worktree isolation","Report usage to session","Show cost","Show model","Viewer markdown","Widget"]}],
 "cliFlags":[{"flag":"--subagents-workflow-file=<path>","registeredAt":"src/index.ts:525 pi.registerFlag(WORKFLOW_FILE_FLAG) ; const at src/index.ts:327","docs":"README.md ### CLI flags"}],
 "lifecycleHooks":["pi.on(\"session_start\") src/index.ts:930","pi.on(\"input\") :1011 (@handle mentions)","pi.on(\"session_before_switch\") :1232","pi.on(\"session_shutdown\") :1239","pi.on(\"tool_execution_start\") :1508"],
 "eventBus":{"emitted":["subagents:created","subagents:started","subagents:completed","subagents:failed","subagents:steered","subagents:compacted","subagents:record","subagents:ready","subagents:scheduler_ready"],"rpcChannels":["subagents:rpc:ping","subagents:rpc:spawn","subagents:rpc:stop","subagents:rpc:consume"],"protocolVersion":"PROTOCOL_VERSION = 2 (src/cross-extension-rpc.ts:33)","docs":"docs/rpc.md; README.md ## Cross-Extension RPC (:749), ## Events (:725)"},
}
settings = {
 "files":["<agentDir>/settings.json (global; agentDir = $PI_CODING_AGENT_DIR or ~/.pi/agent — src/agent-dir.ts)","<cwd>/.pi/settings.json (project) — src/settings.ts:90"],
 "keys":{"SubagentsSettings (src/settings.ts:28)":["workbench","maxConcurrent","maxConcurrentForeground","defaultMaxTurns","graceTurns","defaultJoinMode","backgroundByDefault","schedulingEnabled","scopeModels","strictAgentFiles","disableDefaultAgents","toolDescriptionMode","fleetView","agentMentions","rememberAgents","widgetMode","outputTranscript","worktreeIsolation","workflowsEnabled","maxSubagentDepth","fallbackSubagent","reportUsage","showCost","showModel","viewerMarkdown"],
         "WorkbenchSettings (src/settings.ts:12-27; validated :390-396, unknown keys refused, 'no implicit fallback')":["workflowAgentBackend: pi|claude (required)","model","permissionMode: dontAsk|default","settingSources: user|project|local[]","tools[]","capabilityGrants[] (absent = deny all native capabilities)","reactivefiberWorkspaceRoot (absolute; wb-973.4)","roles{<name>:{prompt,tools?,capabilities?,model?,effort?}}"]},
 "grantVocabularyObservedInSrc":["workbench:observe","workbench:design","workbench:execute","workbench:detach","workbench:coordinate","forge:inspect","forge:run","furnace:inspect","hyperunix:read","reactivefiber:render","claude:transcript","claude:invoke","claude:tool:<toolName> (wb-wupg)","discover:<capabilityId>","inspect:<capabilityId>","invoke:<capabilityId>","control:<provider>.<verb> (e.g. control:forge.cancel)"],
 "capabilityIds":["hyperunix.find (hyperunix.find/v1)","forge.gate.status (forge.gate.status/v1)","furnace.run.inspect (furnace.run.inspect/v1)","reactivefiber.render.preview (reactivefiber.render.preview/v1)"],
}
env_vars = {
 "read":[{"name":"PI_CODING_AGENT_DIR","where":"src/agent-dir.ts:51 (AGENT_DIR_ENV)"},{"name":"PI_CODING_AGENT_SESSION_DIR","where":"src/agent-runner.ts:957"},{"name":"XDG_RUNTIME_DIR","where":"src/workbench/hosts/local-detached.ts:225 (socket base; then /run/user/<uid>, then tmpdir)"},{"name":"CLAUDE_CONFIG_DIR","where":"src/index.ts:2606 claudeUserConfigDir(process.env,...)"},{"name":"RF_WORKSPACE / SWARM_RF_WORKSPACE","where":"src/workbench/process-env.ts RF_CHILD_ENV_ALLOWLIST (:91) — passed through to the rf child, not read by the extension"}],
 "allowlists":{"DETACHED_HOST_ENV_ALLOWLIST":"src/workbench/process-env.ts:33 (PATH HOME TMPDIR TMP TEMP LANG LC_ALL LC_CTYPE TERM TZ PWD USER LOGNAME SHELL NODE_ENV CI XDG_* HTTP(S)_PROXY NO_PROXY NODE_EXTRA_CA_CERTS SSL_CERT_FILE SSL_CERT_DIR CLAUDE_CONFIG_DIR)","RF_CHILD_ENV_ALLOWLIST":"src/workbench/process-env.ts:91 (+ RF_WORKSPACE, SWARM_RF_WORKSPACE)"},
 "note":"No PI_SUBAGENTS_* / WORKBENCH_* env knobs exist in src (grep process.env + string census, 2026-11-11); all configuration is settings.json. Detection surface: grep -rn 'process.env' src and string census of uppercase names.",
}
agent_types = {
 "defaults":[{"name":"general-purpose","file":"src/default-agents.ts:15"},{"name":"Explore","file":"src/default-agents.ts:31"},{"name":"Plan","file":"src/default-agents.ts:76"}],
 "customLocations":["<cwd>/.pi/agents/*.md (project, authoritative; /agents writes here) — src/custom-agents.ts:29","<cwd>/.agents/agents/*.md (shared cross-tool, read-only) — :30","$PI_CODING_AGENT_DIR/agents/*.md (global, default ~/.pi/agent/agents) — :31"],
 "shippedInRepo":[".pi/agents/auditor.md"],
 "claudeBackendRoles":"workbench.roles (src/settings.ts:25); Claude backend refuses agent types not configured as roles (feature-matrix W03 row 1)",
 "skillsLocations":["<cwd>/.pi/skills","<cwd>/.agents/skills","~/.agents/skills","global pi skill dirs — src/skill-loader.ts:6-8,:52"],
 "memory":"src/memory.ts per-agent memory directories (README ## Persistent Agent Memory :835)",
}

# ---------------- (3) TUI ----------------
tui = {
 "inspector":{"file":"src/ui/workflow-inspector.ts","views":"InspectorView = overview|graph|timeline|details (:14)","actions":"InspectorAction = close|transcript|load-evidence (:57)","reducer":"reduceInspectorKey (:252) keys: enter j k h l up down left right tab s q f e c / + - = backspace escape ctrl+c","layout":"layoutInspector (:1028), PANE_MIN_WIDTH_LEFT/THREE, PANE_MAX_WIDTH (:979-981)","evidence":"inspectorEvidenceTarget (:94)"},
 "dialog":{"file":"src/ui/workflow-dialog.ts","levels":"WorkflowDialogLevel = phases|agent|node (:255)","filters":"WORKFLOW_DIALOG_FILTERS cycles all + display states (:261)","keys":"handleWorkflowDialogKey (:1090): x stop, p pause/resume, s skip, r retry, c conversation, e, f filter, j/k/up/down, left/right, enter, escape, q (README.md ## Commands key table :484+)","glyphTiers":"UNICODE_DIALOG_GLYPHS (:149) / ASCII_DIALOG_GLYPHS (:172)","copy":"WORKFLOW_DIALOG_COPY (:230): waitingForSlot, availableOnceStarted, notAvailableYet, noTranscript, stoppedEarly, skippedByUser, noToolCallsYet, noToolCalls, noAgents","spinner":"WORKFLOW_DIALOG_SPINNER_MS (:114)","plainText":"plainWorkflowDialogLines (:1189)"},
 "menu":{"file":"src/ui/workflow-menu.ts","entry":"/agents -> Workflows (showWorkflowsMenu :362), fleet rows (openWorkflowFromFleet :354), showWorkflowDialog (:199); deps built once at src/index.ts:4880 workflowMenuDeps (projection, relationPage, timelineColumns, attention, evidence store)"},
 "card":{"file":"src/ui/workflow-card.ts","notes":"inline transcript card; UNICODE_GLYPHS (:91) / ASCII_GLYPHS (:111); WORKFLOW_TICK_MS (:57); REPLAYED_ANNOTATION (:271); plainWorkflowCardLines (:475); safeWorkflowTerminalText (:150)"},
 "fleetList":{"file":"src/ui/fleet-list.ts","notes":"FleetList (:99) below editor; setting fleetView; FleetWorkflow rows (:54)"},
 "agentWidget":{"file":"src/ui/agent-widget.ts","notes":"AgentWidget (:254) above editor; widgetMode setting; formatters formatTokens/formatCost/formatTurns/formatDuration; ERROR_STATUSES (:24); SPINNER (:21)"},
 "conversationViewer":{"file":"src/ui/conversation-viewer.ts","notes":"ConversationViewer (:140) live overlay; RESULT_MAX_CHARS (:35); VIEWPORT_HEIGHT_PCT (:22); steering composer on Enter; viewerMarkdown setting; keys from src/ui/viewer-keys.ts createViewerKeys (:30)"},
 "scheduleMenu":{"file":"src/ui/schedule-menu.ts","notes":"showSchedulesMenu (:74) — /agents -> Scheduled jobs"},
 "agentMention":{"file":"src/ui/agent-mention.ts","notes":"createMentionProvider (:117) — @handle autocomplete; grammar in src/mention.ts; clone start in src/mention-clone.ts"},
 "selectItem":"src/ui/select-item.ts",
 "agentsMenuFlows":["showAgentsMenu src/index.ts:3802","showRunningAgents","showAllAgentsList :3870 (• project, ◦ global, ✕ disabled; Eject / Disable-Enable via src/agent-file-toggle.ts)","showCreateWizard","showSettings"],
 "docs":"docs/workbench/10-terminal-inspector.md; README.md ## UI (:112), ## Commands (:484)",
}

# ---------------- (4) qa scripts ----------------
qa_all = qa("*")
forge_toml = open(f"{PIN}/forge.toml").read()
gate = re.search(r'gate = \[(.*?)\]', forge_toml).group(1)
cmds = re.findall(r'^\[build\.commands\.([a-z0-9-]+)\]', forge_toml, re.M)
qa_scripts = {
 "dir":"qa/workbench","count":len(qa_all),
 "forgeGate":{"file":"forge.toml","gate":[s.strip().strip('"') for s in gate.split(",")],"namedCommands":cmds,"commandCount":len(cmds)},
 "vitestTierConfigs":g("vitest.*.config.ts")+["vitest.config.ts"],
 "groups":{
   "shell-smoke":qa("smoke.sh","smoke.mjs","package-smoke.sh","package-smoke.mjs","local-detached.sh","run-native-tests.sh"),
   "install":qa("install-*.mjs","installed-*.mjs","package-boundary.mjs"),
   "live-receipts (credentialed / native)":qa("live-*.mjs","detached-control-live-receipt.mjs","furnace-hosted-retry-fault*.mjs","native-forge.mjs"),
   "detached-host":qa("local-detached*.mjs"),
   "benches":qa("*-bench.mjs","bench-revision.mjs","retained-memory.mjs","cap-saturation.mjs","timeline-grouped-core.mjs","grouped-fixture.mjs","mwi-multiworkflow-load.mjs"),
   "probes":qa("*-probe.mjs","hx-task-scope-judge.mjs","forge-gate-status-probe.mjs"),
   "census/ledger":qa("*census*.mjs","status-ledger.mjs","receipts-index.mjs","tracker-export.mjs","dependency-census.mjs","commit-message-scan.mjs","pre-push-commit-message-scan.mjs","git-stamp.mjs","release-checklist-receipt.mjs","mwi-release.mjs","mwi-cost-figures.mjs"),
   "clients":qa("designer-client.mjs","inspector-smoke.mjs","local-detached-client.mjs","scratch.mjs"),
   "receiptsJson":qa("receipts/*.json"),
 },
 "testSuite":{"testFiles":len(g("test/*.test.ts")),"censusFiles":len(g("test/*.census.ts")),"e2e":g("test/e2e/*"),"perf":g("test/perf/*"),"helpersCount":len(g("test/helpers/*")),"workbenchPrefixedTests":len(g("test/workbench-*.test.ts"))},
 "baselineAtPin":{"typecheck":"ESTABLISHED: `npm run typecheck` rc=0 at ce180d82 (10.6s wall; log probes/prep-surface/typecheck.log)","node":"v24.20.0 (engines.node >=24)","npm":"11.19.0","nodeModulesPresent":True},
}

# ---------------- (5) skills ----------------
skills = {
 "shipped":[{"path":".agents/skills/beads/SKILL.md","lines":184,"frontmatterName":"beads","headings":["Orientation (run this first)","The core loop","What belongs in Beads","Working with the graph","Machine-readable output","Status vocabulary","Wisps and molecules","Safety","Rules","Complete command reference"]},
            {"path":".agents/skills/pi-mechanical-interop/SKILL.md","lines":35,"frontmatterName":"pi-mechanical-interop","headings":["Actual current state","Effective engineering loop","Routing"],"pointsTo":"docs/workbench/programs/mechanical-workflows-interop-2026-11-04/README.md + 4 guides, AGENTS.md, feature-matrix W11"},
            {"path":".agents/skills/beads/agents/openai.yaml"}],
 "projectAgents":[".pi/agents/auditor.md"],
 "codexConfig":[".codex/config.toml",".codex/hooks.json"],
 "npmBundle":{"packageJsonPi":{"extensions":["./src/index.ts"]},"bundledDependencies":["@forge/sdk","@furnace/sdk","@hyperunix/sdk"],"vendorTarballs":g("vendor/*.tgz"),"npmignore":".npmignore"},
 "docsDiscoverableFromInstall":["README.md (105 KB; H2: Features, Install, Quick Start, UI, Default Agent Types, Custom Agents, Tools, Commands, Graceful Max Turns, Concurrency, Join Strategies, Model Scope, Persistent Settings, Events, Cross-Extension RPC, Persistent Agent Memory, Worktree Isolation, Skill Preloading, Tool Denylist, Architecture, License)","docs/workflows.md (37 KB)","docs/rpc.md (19 KB)","docs/workbench/*.md (00-20 + README, IMPLEMENTATION_GUIDE, TRACEABILITY, feature-matrix) + 72 receipts + programs/mechanical-workflows-interop-2026-11-04/","examples/workflows/*.js (5 + lib/count-child.js), examples/agent-tool-description.md","CHANGELOG.md (197 KB)","AGENTS.md (17 KB)","CONTRIBUTING.md, SECURITY.md"],
}

# ---------------- stub census ----------------
stub_census = {
 "method":"grep -rnoiE 'unsupported-[a-z-]+|not implemented|unimplemented|TODO|FIXME|XXX|descriptor-only|placeholder|stub\\b' src (2026-11-11 at ce180d82)",
 "unsupportedVocabulary":{"unsupported-verb":["src/workbench/claude-control.ts:452","src/workbench/forge-control.ts:478","src/workbench/furnace-control.ts:334"],"unsupported-target":["src/workbench/claude-control.ts:453"],"unsupported-definition-kind":["src/workbench/execute-tool.ts:218 ('only script definitions launch in this host' — function and furnace-formula kinds accepted by schema but refused)","src/workbench/function-authority.ts:117 (comment)","src/workbench/source-admission.ts:46 (comment: 'until the dispatch bead composes this seam')"]},
 "descriptorOnlyCandidates":["src/workbench/hosts/local-detached.ts:104 nativeRuntimeIdentity: 'unsupported'","src/workbench/forge-evidence.ts:9 'EvidenceLoader/EvidenceStore wrapper ... deliberately not implemented here'","NATIVE_CONTROL_ACTIONS src/workbench/control.ts:30 — the only verbs: furnace[stop], claude-agent-sdk[interrupt], forge[cancel], local-detached[cancel,shutdown] (no pause/resume/retry)"],
 "markerHitsPerFile":{"src/workbench/hosts/local-detached.ts":12,"src/index.ts":9,"src/workflow/progress.ts":4,"src/workbench/claude-topology.ts":4,"src/workbench/claude-control.ts":4,"src/workbench/mechanical-descriptor.ts":3,"src/agent-file-toggle.ts":3},
 "noTodoFixme":"grep TODO|FIXME|XXX in src returned only these marker classes; no literal TODO/FIXME lines were found (detection surface: case-insensitive grep over src/**/*.ts)",
}

# ---------------- families ----------------
F = []
def fam(id, name, axes, files, tests_, qa_, docs, promises_, probes, notes=""):
    F.append({"id":id,"name":name,"axesEmphasis":axes,"sharedFiles":["src/index.ts (composition root; see compositionRoot line map)"],"files":files,"tests":tests_,"qaScripts":qa_,"docs":docs,"promiseRefs":promises_,"probeEntrypoints":probes,"notes":notes,"counts":{"files":len(files),"tests":len(tests_),"qa":len(qa_)}})

S = lambda *p: sorted(set(x for pat in p for x in g(pat)))

fam("F01","subagents-agent-manager (Agent tool, runner, nested tools, steer/get_result, @mentions, structured output, worktree isolation, memory, skills)",
    ["LX","UX","QoL","friction"],
    S("src/index.ts","src/agent-manager.ts","src/agent-runner.ts","src/agent-types.ts","src/agent-color.ts","src/agent-file-toggle.ts","src/custom-agents.ts","src/default-agents.ts","src/nested-tools.ts","src/structured-output.ts","src/status-note.ts","src/output-file.ts","src/group-join.ts","src/mention.ts","src/mention-clone.ts","src/prompts.ts","src/context.ts","src/child-context.ts","src/skill-loader.ts","src/worktree.ts","src/memory.ts","src/invocation-config.ts","src/abortable.ts","src/xml.ts","src/types.ts","src/usage.ts","src/ui/agent-mention.ts"),
    tests("agent-*.test.ts","subagents-*.test.ts","worktree*.test.ts","output-*.test.ts","foreground-*.test.ts","mention*.test.ts","structured-*.test.ts","nested-*.test.ts","e2e/mention-clone-tool-reachability.e2e.test.ts","e2e/isolated-provider.e2e.test.ts","e2e/tool-veto-reachability.e2e.test.ts","e2e/usage-reaches-session-stats.e2e.test.ts","perf/spawn*"),
    [], ["README.md (Tools/Agent, Custom Agents, Default Agent Types, Graceful Max Turns, Concurrency, Join Strategies, Worktree Isolation, Skill Preloading, Tool Denylist, Persistent Agent Memory)","examples/agent-tool-description.md"],
    ["W01 (upstream baseline protected)","WB-004","WB-011"],
    ["pi -e $PIN/src/index.ts (load extension) then Agent tool call; `/agents` menu","cd $PIN && ./node_modules/.bin/vitest run test/agent-manager.test.ts test/agent-runner.test.ts","read the model-facing schema text: src/index.ts:1740-1795 (Agent), :3640-3654 (get_subagent_result), :3730-3737 (steer_subagent)","token cost of replies: AgentDetails stats line src/index.ts:1831-1845; <task-notification> XML src/index.ts:205-233"],
    "Upstream surface; always registered. Reply dialect: text+details, custom renderers.")
fam("F02","workflow-script-runtime (SubagentWorkflow tool, script language agent/parallel/node/log/phase/args/workflow, worker thread, progress, admission, node() worker RPC bridge, cross-extension RPC)",
    ["LX","DX","friction","gap"],
    S("src/workflow/runtime.ts","src/workflow/worker-source.ts","src/workflow/host.ts","src/workflow/task.ts","src/workflow/progress.ts","src/workflow/tool-description.ts","src/workflow/saved.ts","src/workflow/meta.ts","src/workflow/json-schema.ts","src/workflow/admission.ts","src/workflow/collisions.ts","src/workflow/entry.ts","src/workflow/telemetry.ts","src/cross-extension-rpc.ts"),
    tests("workflow-*.test.ts","workflow*.census.ts","rpc-*.test.ts","e2e/workflow.e2e.test.ts","workbench-node-*.test.ts","workbench-worker-*.test.ts","workbench-script-*.test.ts"),
    qa("headless-*.mjs","mwi-multiworkflow-load*.mjs"),
    ["docs/workflows.md","docs/rpc.md","docs/workbench/05-script-language-and-runtime.md","README.md ## Tools/SubagentWorkflow, ## Events, ## Cross-Extension RPC","examples/workflows/*.js"],
    ["W05 (node() language/RPC)","W12 rows 1-3","WB-001","WB-003","WB-005","WB-006","WB-011","WB-022","VC-2"],
    ["SubagentWorkflow with examples/workflows/compose.js via --subagents-workflow-file","cd $PIN && ./node_modules/.bin/vitest run test/workflow-examples.test.ts","./node_modules/.bin/vitest run --config vitest.census.config.ts test/workflow-conformance.census.ts","model-facing description: node -e \"import('./src/workflow/tool-description.ts')\" or read src/workflow/tool-description.ts:60-160 (token cost of the tool description per toolDescriptionMode)","RPC: docs/rpc.md honoured/stripped tables vs src/cross-extension-rpc.ts:97 registerRpcHandlers"],
    "Gate: settings.workflowsEnabled. Script globals set at src/workflow/worker-source.ts (scope.agent/node/phase/log/workflow/console/prefix). Concurrency cap min(16, CPUs-2) per workflow (tool-description.ts:118).")
fam("F03","journal-replay-recovery-reconcile (journal, journal-compat, resumeFromRunId replay, workflow_reconcile tool, replay dependencies)",
    ["LX","DX","gap","stub"],
    S("src/workflow/journal.ts","src/workflow/journal-compat.ts","src/workflow/reconcile.ts","src/workbench/reconcile-decision.ts","src/workbench/reconcile-tool.ts","src/workbench/replay-dependencies.ts"),
    tests("workbench-reconcile*.test.ts","workbench-journal*.test.ts","workbench-replay*.test.ts","workflow-journal*.test.ts","workflow-resume*.test.ts","workbench-docs08-replay-reconcile.census.ts"),
    qa("observation-recovery-*.mjs"),
    ["docs/workbench/08-lifecycle-and-recovery.md","docs/workflows.md (resume section)"],
    ["W12 (task/journal split and side-effect policy; in-progress row: fail-closed resume for journaled nodes with ABSENT effectClass — bead wb-tu1)","WB-021","WB-026","WB-039","NFR-02"],
    ["SubagentWorkflow {resumeFromRunId} after a changed script; inspect journal files under the session dir","workflow_reconcile {taskId, action:'inspect'} on a run with an uncertain effect (requires backend claude)","cd $PIN && ./node_modules/.bin/vitest run --config vitest.census.config.ts test/workbench-docs08-replay-reconcile.census.ts"],
    "Reconcile schema has 14 optional fields and three id regexes (rcp_/ack_/wf_) — LX schema-clarity probe target.")
fam("F04","execute-script-run (workflow_execute, admission, source admission, hostMode embedded|detached, definitionRef kinds)",
    ["LX","stub","gap","missing-req"],
    S("src/workbench/execute.ts","src/workbench/execute-tool.ts","src/workbench/source-admission.ts"),
    tests("workbench-execute*.test.ts","workbench-source-admission*.test.ts","workbench-admission*.test.ts"),
    qa("install-smoke.mjs"),
    ["docs/workbench/11-designer-and-operator.md § First public Pi tools","docs/workbench/13-contracts-and-config.md"],
    ["W16 row 4 (partial: bounded reply-builder slices for execute/validate/compare)","WB-014","WB-038","WB-048"],
    ["workflow_execute {definitionRef:{kind:'function',...}} -> expect refusal unsupported-definition-kind (src/workbench/execute-tool.ts:218)","workflow_execute hostMode:'detached' without workbench:detach -> missing-detach-grant (:216)","cd $PIN && ./node_modules/.bin/vitest run test/workbench-execute*.test.ts"],
    "Schema accepts kind script|function|furnace-formula (execute-tool.ts:182) but only script launches: ESTABLISHED-by-code-read stub candidate for the stub axis.")
fam("F05","observe-control-compare tools (observation projection, workflow_observe, workflow_control + 4 adapters, workflow_compare, workbench_catalog, workflow_inspect, workflow_catalog, workflow_validate, forge_gate_run; evidence loader; redaction; selectors)",
    ["LX","UX","QoL","gap","stub"],
    S("src/workbench/observation.ts","src/workbench/observe-query.ts","src/workbench/control.ts","src/workbench/control-reply.ts","src/workbench/control-tool.ts","src/workbench/claude-control.ts","src/workbench/claude-control-observer.ts","src/workbench/forge-control.ts","src/workbench/forge-control-retention.ts","src/workbench/furnace-control.ts","src/workbench/detached-control.ts","src/workbench/tool-replies.ts","src/workbench/validate-reply.ts","src/workbench/designer.ts","src/workbench/patch-proposal.ts","src/workbench/redaction.ts","src/workbench/identity.ts","src/workbench/evidence-loader.ts","src/workbench/evidence-producers.ts","src/workbench/evidence-wiring.ts","src/workbench/native-evidence.ts","src/workbench/timeline.ts","src/workbench/graph-view.ts","src/workbench/topology-slice.ts","src/workbench/attention.ts","src/workbench/latency.ts","src/workbench/telemetry.ts","src/workbench/forge-operation-observer.ts"),
    tests("workbench-observe*.test.ts","workbench-observation*.test.ts","workbench-control*.test.ts","workbench-control-admission.test.ts","workbench-*-admission*.test.ts","workbench-*-control*.test.ts","workbench-tool-repl*.test.ts","workbench-catalog*.test.ts","workbench-inspect*.test.ts","workbench-validate*.test.ts","workbench-compare*.test.ts","workbench-designer*.test.ts","workbench-patch*.test.ts","workbench-redaction*.test.ts","workbench-identity*.test.ts","workbench-evidence*.test.ts","workbench-timeline*.test.ts","workbench-graph*.test.ts","workbench-topology*.test.ts","workbench-attention*.test.ts","workbench-latency*.test.ts","workbench-telemetry*.test.ts","workbench-forge-operation*.test.ts","workbench-forge-gate-run*.test.ts","workbench-tool-exposure-census.census.ts","workbench-docs09-readers-relationships.census.ts","workbench-docs12-authorization.census.ts","workbench-docs20-contract.census.ts"),
    qa("tool-reply-bench.mjs","designer-client.mjs","forge-transport-probe.mjs","forge-gate-status-probe.mjs","attention-grouped-bench.mjs","timeline-grouped-*.mjs","topology-slice-grouped-bench.mjs","reducer-selector-bench.mjs","observation-recovery-bench.mjs"),
    ["docs/workbench/09-observation-and-provenance.md","docs/workbench/11-designer-and-operator.md","docs/workbench/12-security.md","docs/workbench/20-evidence-loader-contract.md","docs/workbench/06-capability-registry.md"],
    ["W13","W14","W16 (all 4 rows partial)","W17","W19","WB-015","WB-017","WB-018","WB-023","WB-025","WB-032","WB-035","WB-036","WB-037","WB-038","WB-040","NFR-01","NFR-03","VC-4","VC-6"],
    ["Each tool's reply JSON: build via the pure builders (src/workbench/observe-query.ts, tool-replies.ts, validate-reply.ts, control-reply.ts) in a vitest or node -e script; measure bytes/tokens per reply (W21-E planned receipt)","workflow_control {target:{provider:'forge',type:'operation',id}, action:'pause'} -> unsupported-verb (src/workbench/forge-control.ts:478)","cd $PIN && node qa/workbench/tool-reply-bench.mjs","cd $PIN && node qa/workbench/forge-transport-probe.mjs (drives forge app-server for real)","./node_modules/.bin/vitest run --config vitest.forge-control-live.config.ts (live)"],
    "Nine of the 12 workbench tools live here; all gated on workflowAgentBackend=claude + native load. Reply dialect is JSON-in-text with contract versions (workbench.*/v1).")
fam("F06","inspector-tui (/agents menu, workflow inspector 4 views, two-pane dialog, inline card, fleet list, agent widget, conversation viewer, schedule menu, mention autocomplete)",
    ["UX","QoL","friction","DX"],
    S("src/ui/*.ts","src/agent-color.ts"),
    tests("workbench-inspector*.test.ts","workbench-dialog*.test.ts","workbench-card*.test.ts","workbench-ui*.test.ts","workbench-rendering*.census.ts","workbench-evidence-ui-census.census.ts","workbench-docs10-deception-defenses.census.ts","ui-*.test.ts","widget*.test.ts","fleet*.test.ts","viewer*.test.ts","card*.test.ts","dialog*.test.ts","inspector*.test.ts","perf/render-invariants.perf.test.ts","perf/no-fs-on-render.perf.test.ts","perf/viewer.bench.ts","perf/widget.bench.ts","perf/formatters.bench.ts"),
    qa("inspector-*.mjs","line-diff-bench.mjs","cap-saturation.mjs","retained-memory.mjs","live-operator-receipt.mjs"),
    ["docs/workbench/10-terminal-inspector.md","README.md ## UI (:112), ## Commands (:484)"],
    ["W15 (4 of 5 rows partial)","W21","WB-016","WB-017","WB-027","WB-028","WB-029","WB-030","WB-031","NFR-04","VC-5"],
    ["pi -e $PIN/src/index.ts, run a workflow, /agents -> Workflows -> inspector; test 80x24 ASCII tier","cd $PIN && node qa/workbench/inspector-smoke.mjs","cd $PIN && node qa/workbench/inspector-bench.mjs","./node_modules/.bin/vitest run test/workbench-inspector.test.ts","keys: reduceInspectorKey src/ui/workflow-inspector.ts:252; handleWorkflowDialogKey src/ui/workflow-dialog.ts:1090; README key table :484+"],
    "Operator terminal-journey acceptance for VC-1 is 'planned' (feature-matrix W02 row 6, bead wb-a2g.3): no reproducible pty receipt on trunk.")
fam("F07","detached-host and furnace-hosted execution (workflow_detached, local-detached Unix-socket host, furnace-hosted ExecutorApp, executable identity, scrubbed env)",
    ["DX","LX","gap","stub"],
    S("src/workbench/hosts/local-detached.ts","src/workbench/hosts/furnace-hosted.ts","src/workbench/detached-observer.ts","src/workbench/detached-control.ts","src/workbench/executable-identity.ts","src/workbench/process-env.ts"),
    tests("workbench-local-detached*.test.ts","workbench-pi-detached*.test.ts","workbench-detached*.test.ts","workbench-furnace-hosted*.test.ts","workbench-executable-identity*.test.ts","workbench-process-env*.test.ts","workbench-child-crash-faults.census.ts","workbench-fault-injection-census.census.ts"),
    qa("local-detached*","detached-control-live-receipt.mjs","furnace-hosted-retry-fault*.mjs","live-resume.mjs"),
    ["docs/workbench/18-decisions-and-risks.md","docs/workbench/08-lifecycle-and-recovery.md","docs/workbench/17-packaging-and-operations.md"],
    ["W18 (3 landed-gated, 1 partial: fault-injection conformance)","WB-041","WB-042","VC-7"],
    ["cd $PIN && bash qa/workbench/local-detached.sh","cd $PIN && node qa/workbench/local-detached-faults.mjs","./node_modules/.bin/vitest run test/workbench-local-detached.test.ts","./node_modules/.bin/vitest run --config vitest.furnace-hosted.config.ts (needs furnace on PATH: furnace 0.1.0 855f8265bf43 present)","workflow_detached {action:'inspect', invocationId} on a never-launched id -> refusal shape"],
    "DetachedReceipt declares nativeRuntimeIdentity:'unsupported', security 'same-machine-os-dac-only', lifetime 'survives-client-disconnect-not-host-crash' (local-detached.ts:102-105).")
fam("F08","furnace-observe (furnace_observe tool, furnace.run.inspect provider, Run->Attempt topology observer, attempt-log evidence, furnace control adapter)",
    ["LX","DX","gap","stub"],
    S("src/workbench/providers/furnace.ts","src/workbench/furnace-observer.ts","src/workbench/furnace-evidence.ts","src/workbench/furnace-control.ts"),
    tests("workbench-furnace*.test.ts","workbench-external-furnace.test.ts","workbench-pi-furnace*.test.ts"),
    qa("live-furnace-vc4*.mjs","furnace-hosted-retry-fault*.mjs"),
    ["docs/workbench/07-native-integrations.md § Furnace provider","docs/workbench/20-evidence-loader-contract.md (furnace run row)"],
    ["W09 (3 landed-gated, 1 partial: Furnace invocation + native control actions pause/stop)","WB-024","WB-025","VC-4"],
    ["furnace --version; furnace run start on a fixture formula then furnace_observe {runId} via the extension","cd $PIN && ./node_modules/.bin/vitest run --config vitest.furnace.config.ts","cd $PIN && ./node_modules/.bin/vitest run --config vitest.furnace-active.config.ts","cd $PIN && node qa/workbench/live-furnace-vc4.mjs","workflow_control {provider:'furnace', action:'pause'} -> unsupported-verb (NATIVE_CONTROL_ACTIONS furnace=[stop], src/workbench/control.ts:31)"],
    "SDK Run.events() follows one Attempt's output, NOT Run lifecycle (furnace-observer.ts header).")
fam("F09","providers hx/rf/forge + capability registry + native module seam + Claude host (hyperunix.find, reactivefiber.render.preview, forge.gate.status; observers; evidence readers; claude-host; curated capability_* tools)",
    ["LX","DX","gap","stub","friction"],
    S("src/workbench/capability-registry.ts","src/workbench/native-modules.ts","src/workbench/providers/*.ts","src/workbench/hyperunix-observer.ts","src/workbench/reactivefiber-observer.ts","src/workbench/forge-observer.ts","src/workbench/forge-evidence.ts","src/workbench/claude-host.ts","src/workbench/claude-capability-tools.ts","src/workbench/claude-transcript.ts","src/workbench/claude-topology.ts","src/workbench/claude-evidence.ts"),
    tests("workbench-hyperunix*.test.ts","workbench-native*.test.ts","workbench-rf*.test.ts","workbench-reactivefiber*.test.ts","workbench-forge-observer*.test.ts","workbench-forge-evidence*.test.ts","workbench-forge-provider*.test.ts","workbench-registry*.test.ts","workbench-capability*.test.ts","workbench-claude*.test.ts","workbench-host-contract*.test.ts","workbench-ecosystem*.test.ts","workbench-hyperunix-custody-claims.census.ts","workbench-hyperunix-successor-gate-run-pin.census.ts","workbench-rf-*.census.ts","workbench-docs06-conformance.census.ts","workbench-docs07-provider-rules.census.ts","workbench-docs04-tests-census.census.ts"),
    qa("hx-task-scope-*.mjs","forge-transport-probe.mjs","forge-gate-status-probe.mjs","native-forge.mjs","live-claude.mjs","live-adverse*.mjs","live-served-model*.mjs","dependency-census.mjs","boot-import-*.mjs"),
    ["docs/workbench/06-capability-registry.md","docs/workbench/07-native-integrations.md","docs/workbench/04-claude-agent-sdk-executor.md","vendor/README.md"],
    ["W02","W03","W04","W06","W07","W08","W10","W20 (partial: upstream feedback delivered)","WB-002","WB-007","WB-008","WB-009","WB-013","WB-034","WB-043","WB-046","VC-1","VC-2"],
    ["hx: `hx --workspace $PIN exports src/workbench/tool-replies.ts --best-effort` (ESTABLISHED 23 results, coverage partial HX-COV-004) and the SDK path `./node_modules/.bin/vitest run --config vitest.native.config.ts`; `node qa/workbench/hx-task-scope-probe.mjs`",
     "rf: `rf --json --version` (ESTABLISHED ok:true, 89 leaves, dist 0.1.883) then the exact provider argv `rf --workspace $PIN context render --no-commit --no-input --json` (src/workbench/providers/reactivefiber.ts:115; pin has no .reactive-fiber -> expect RF_WORKSPACE_NOT_FOUND exit 3) and `./node_modules/.bin/vitest run --config vitest.rf.config.ts`; contract pinned to rf@0.1.845 (REACTIVE_FIBER_CONTRACT_SOURCE) vs installed 0.1.883 — version-drift probe",
     "forge: `forge --version` (ESTABLISHED forge 0.2.1 e3d480952064); `node qa/workbench/forge-gate-status-probe.mjs`; `node qa/workbench/forge-transport-probe.mjs`; forge_gate_run tool on $PIN",
     "claude: `./node_modules/.bin/vitest run --config vitest.claude-live.config.ts` (credentialed); role refusal: Agent type not in workbench.roles"],
    "native-modules.ts:62-69 is the one dynamic-import seam (@furnace/sdk, claude-host, claude-transcript, local-detached, providers/*). Vendored SDK tarballs forge/furnace/hyperunix 0.1.0 (package.json file: deps, bundledDependencies).")
fam("F10","mechanical-interop surface (MechanicalWorkflows entrypoint descriptor, coordination export, collective.event.v1, function authority dispatch, beads readiness/observer, pi-mechanical-interop skill, MWI program docs)",
    ["gap","stub","missing-req","LX"],
    S("src/workbench/mechanical-descriptor.ts","src/workbench/mechanical-coordination.ts","src/workbench/collective-event.ts","src/workbench/function-authority.ts","src/workbench/beads-program-readiness.ts","src/workbench/beads-observer.ts"),
    tests("workbench-mechanical*.test.ts","workbench-mwi*","workbench-mechanical-source-admission.test.ts","workbench-mechanical-host-admission.test.ts","workbench-function*.test.ts","workbench-collective*.test.ts","workbench-beads*.test.ts","workbench-mechanical-status-ledger.census.ts","workbench-mwi-cancel-repro.census.ts"),
    qa("mwi-*.mjs","status-ledger.mjs","tracker-export.mjs"),
    ["docs/workbench/programs/mechanical-workflows-interop-2026-11-04/*.md",".agents/skills/pi-mechanical-interop/SKILL.md","docs/workbench/feature-matrix.md W11"],
    ["W11 (planned/blocked: hosted develop() with real bindings; beads wb-04s, wb-w12 blocked)","WB-033","VC-3"],
    ["cd $PIN && node qa/workbench/status-ledger.mjs","cd $PIN && node qa/workbench/mwi-release.mjs","./node_modules/.bin/vitest run --config vitest.census.config.ts test/workbench-mechanical-status-ledger.census.ts","workflow_execute definitionRef.kind:'function' -> unsupported-definition-kind (the MWI dispatch seam not composed: source-admission.ts:46)"],
    "Promise/implementation gap axis: W11 is the only 'planned' W-section with zero landed rows; skill says 'Read ... before changing integration code' (35 lines).")
fam("F11","packaging-docs-skills-install (npm package, vendored SDK tarballs, forge.toml gate, install/package smoke, README/docs/CHANGELOG/AGENTS.md, shipped skills, release checklist)",
    ["DX","gap","missing-req","friction"],
    sorted(set(["package.json","package-lock.json","forge.toml","tsconfig.json","tsconfig.test.json","biome.json",".npmignore",".gitignore","vendor/README.md","vendor/dependency-lock.json"]+g("vendor/*.tgz")+g("vitest*.config.ts")+[".agents/skills/beads/SKILL.md",".agents/skills/pi-mechanical-interop/SKILL.md",".pi/agents/auditor.md",".codex/config.toml",".codex/hooks.json",".github/workflows/ci.yml"])),
    tests("workbench-compat-feature.census.ts","workbench-census-gate.census.ts","workbench-subsystem-matrix.census.ts","workbench-risk-register.census.ts","workbench-acceptance-journeys.census.ts","workbench-w21-survivor-pins.census.ts","workbench-package*.test.ts","workbench-install*.test.ts","workbench-docs*.test.ts","workbench-readme*.test.ts","workbench-traceability*.test.ts","workbench-feature-matrix*.test.ts"),
    qa("install-*.mjs","installed-*.mjs","package-*.mjs","package-smoke.sh","release-checklist-receipt.mjs","receipts-index.mjs","commit-message-scan.mjs","pre-push-commit-message-scan.mjs","git-stamp.mjs","smoke.sh","smoke.mjs","boot-import-*.mjs","dependency-census.mjs"),
    ["README.md","CHANGELOG.md","AGENTS.md","CONTRIBUTING.md","SECURITY.md","docs/workbench/17-packaging-and-operations.md","docs/workbench/README.md","docs/workbench/IMPLEMENTATION_GUIDE.md","docs/workbench/TRACEABILITY.md","docs/workbench/feature-matrix.md","docs/workbench/00-current-state-and-source-map.md","vendor/README.md"],
    ["W01","W22 (5 landed, 1 partial, 1 in-progress)","WB-019","WB-020","WB-049","NFR-05..08"],
    ["cd $PIN && npm run typecheck (ESTABLISHED rc=0)","cd $PIN && npm run lint; npm run build; bash qa/workbench/smoke.sh; bash qa/workbench/package-smoke.sh","cd $PIN && node qa/workbench/install-smoke.mjs; node qa/workbench/install-minimal.mjs","forge gate-status in $PIN (forge 0.2.1 present) — compare forge.toml gate list vs README/AGENTS.md claims","discoverability: from an `npm pack` tarball alone, which docs/skills reach an installed agent? (.npmignore vs docs/, .agents/, examples/)","README install claim 'pi 1.1.0 or newer' vs peerDependencies >=1.1.0 and devDependencies 1.1.0","CI: .github/workflows/ci.yml exists (jobs: npm ci, lint, typecheck, typecheck:test, test on setup-node node-version 22) while feature-matrix W01 row 3 (line 27) says 'no GitHub CI' and package.json engines.node is >=24 — SUPPORTED pointer for the gap/DX axes; grade after running the ci.yml steps under node 22 vs 24"],
    "package.json 'pi.extensions' = ./src/index.ts (source, not dist); build script = tsc to dist; engines node>=24.")
fam("F12","scheduling-memory-settings-models (SubagentScheduler + store, schedule param/menu, settings persistence + /agents Settings, enabled models/model resolver/model scope, usage accounting, agent dir/env detection)",
    ["QoL","DX","UX","friction"],
    S("src/schedule.ts","src/schedule-store.ts","src/ui/schedule-menu.ts","src/settings.ts","src/enabled-models.ts","src/model-resolver.ts","src/model-scope.ts","src/usage.ts","src/agent-dir.ts","src/env.ts","src/memory.ts"),
    tests("schedule*.test.ts","settings*.test.ts","model*.test.ts","enabled-models*.test.ts","usage*.test.ts","memory*.test.ts","agent-dir*.test.ts","env*.test.ts","workbench-settings*.test.ts","workbench-key-validations.census.ts"),
    [], ["README.md ## Persistent Settings (:614), ## Model Scope (:591), ## Persistent Agent Memory (:835)","docs/workbench/13-contracts-and-config.md"],
    ["WB-049 (reproducible install / optional deps)","W03 (workbench.roles config validation)"],
    ["Agent {schedule:'+1m'} with schedulingEnabled on/off (param disappears from schema when off: src/index.ts:1598)","/agents -> Settings: toggle each of the 24 items and read back <cwd>/.pi/settings.json","settings validation error text: src/settings.ts:390-396 (workbench must be an object with workflowAgentBackend: pi|claude)","./node_modules/.bin/vitest run test/settings*.test.ts test/schedule*.test.ts"],
    "Settings are the ONLY configuration surface (no env knobs). WorkbenchSettings refuses unknown keys.")

surface = {
 "meta":{"generatedAt":"2026-11-11","generator":"epistemic-triage/.work/build-surface.py (prep-surface investigator)","pin":{"path":PIN,"headSha":sha,"package":"@tintinweb/pi-subagents","version":"0.20.0","engines":"node >=24","srcFiles":124,"srcByDir":{"src":35,"src/ui":11,"src/workbench":62,"src/workflow":16}},
         "toolchainObserved":{"node":"v24.20.0","npm":"11.19.0","hx":"0.1.0 (/home/jehallad/.local/bin/hx)","rf":"ok:true, 89 leaves, dist_version 0.1.883","forge":"0.2.1 (rev e3d480952064, built 2026-11-10)","furnace":"0.1.0 (855f8265bf43), protocol 1","bd":"/home/jehallad/.local/bin/bd","pi":"/home/jehallad/.local/bin/pi"},
         "hxEvidence":["hx --workspace $PIN children src --best-effort -> 38 results, HX-COVERAGE-INCOMPLETE warning (other:No_change_exclusion)","hx --workspace $PIN descendants src --best-effort -> regular-file census by dir: src 35, src/ui 11, src/workbench 62, src/workflow 16","hx --workspace $PIN exports <file> --best-effort over tool-replies.ts (23 bindings), settings.ts (11), every src/ui/*.ts, hosts/furnace-hosted.ts, mechanical-descriptor.ts, function-authority.ts (hx.js provider; coverage partial HX-COV-004: 'hx.js certifies its own ECMAScript and TypeScript units')","hx observer list -> hx.js 0.1.0 language-session admitted"],
         "readOnlyDiscipline":"no writes into the pin except node/tsc caches from `npm run typecheck`; all outputs under epistemic-triage/.work and probes/prep-surface",
         "gradingNote":"This file is a MAP (registration census, verbatim promise labels, probe entrypoints), not a findings ledger. Items marked ESTABLISHED were reproduced here with the quoted command; everything else is SUPPORTED by the cited file:line."},
 "registeredTools":{"count":len(tools),"upstreamAlways":["Agent","get_subagent_result","steer_subagent"],"gatedOnWorkflowsEnabled":["SubagentWorkflow"],"gatedOnWorkbenchClaudeBackend":[t["name"] for t in tools if t["gate"]==WB_GATE],"tools":tools,"subagentFacing":subagent_facing,"claudeSdkSideMcpTools":claude_side,"beadsNotes":"the Beads ledger at pin: 1376 rows (closed 1266, open 87, in_progress 19, blocked 3, deferred 1) — .beads/issues.jsonl"},
 "compositionRoot":{"file":"src/index.ts","bytes":255586,"lineMap":{"textResult helper":116,"task-notification XML":"205-233","WORKFLOW_FILE_FLAG":327,"registerFlag":525,"settings getters isReportUsageEnabled..isWorkflowsEnabled":"552-1343","session_start hook":930,"input hook (@mentions)":1011,"session_before_switch":1232,"session_shutdown":1239,"tool_execution_start":1508,"scheduleParam":"1588-1599","Agent tool defineTool":1730,"Agent renderCall/renderResult":"1799-1900","registerToolReportingUsage + Agent registration":"2443-2450","claudeUserConfigDir(process.env)":2606,"registerWorkbenchTools gate + native load":"2682-2702","workbench_catalog":2705,"workflow_inspect":2719,"workflow_validate":2785,"workflow_catalog":2823,"workflow_compare":2837,"forge_gate_run":2860,"furnace_observe":2887,"workflow_detached":2911,"workflow_observe":2932,"workflow_reconcile factory":2997,"workflow_execute factory":3009,"workflow_control factory":3063,"SubagentWorkflow defineTool":3298,"SubagentWorkflow registration (workflowsEnabled)":3484,"setActiveTools undo on collision":"3499-3543","get_subagent_result":3634,"steer_subagent":3723,"showAgentsMenu":3802,"showAllAgentsList":3870,"conversation viewer wiring":"3972-3977","settings menu items":"4440-4600","/agents registerCommand":4871,"workflowMenuDeps":4880}},
 "commands":commands,"settings":settings,"envVars":env_vars,"agentTypes":agent_types,
 "tui":tui,"qaScripts":qa_scripts,"skillsAndDocs":skills,
 "promiseSet":promises,
 "stubCensus":stub_census,
 "families":F,
 "familyCount":len(F),
}
json.dump(surface, open(f"{WORK}/surface.json","w"), indent=1, ensure_ascii=False)
print("families", len(F)); 
for f in F: print(f["id"], f["counts"], f["name"][:60])
