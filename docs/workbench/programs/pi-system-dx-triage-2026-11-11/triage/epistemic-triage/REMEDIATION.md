# REMEDIATION — defect -> smallest cure class

Pin ce180d82, consolidated 2026-11-11. One row per defect claim in CLAIMS.jsonl (224 defects; the 43 positives are excluded). 
The *class* is derived from the investigator's `cureHint` (keyword rules, reviewed at consolidation); the **smallest cure** column carries the investigator's own cure text, which is authoritative where the class is coarse. Ids marked ✪ have a full dossier in `dossiers/<id>.md`.

## Cure-class summary

| cure class | defects | meaning |
|---|---|---|
| wire-landed-code | 9 | Code already landed and tested; add the missing caller/registration/ingestion so it is reachable. |
| guard-or-validate | 54 | Add or hoist a small refusal/validation/bound where behaviour is currently silent or fail-open. |
| small-code-fix | 34 | A localized behavioural fix (keep a true status, fall back to on-disk state, realpath, atomic write, correct a count). |
| new-surface | 12 | A small new verb/flag/setting/listing or paging surface that the journey lacks. |
| perf-or-resource | 3 | Cache, pool or lifecycle change to cut latency or resident cost. |
| tool-spec-text | 24 | Change what the model reads: tool descriptions, parameter schemas/descriptions, guidelines. |
| reply-or-refusal-text | 32 | Reword a reply, refusal, diagnostic or notification so it is actionable; no behavioural change. |
| packaging-or-ci | 6 | package.json/.npmignore/CI/publish pipeline change. |
| test-or-fixture | 9 | Add or fix tests/fixtures/benches (gate truthfulness). |
| docs-fix | 12 | Correct or add shipped text only (README, docs/, feature-matrix, CHANGELOG, skill); no code change. |
| design-rework | 29 | Needs a scoped design decision; no one-line cure. |

## wire-landed-code (9)

| claim | source | axis | grade | smallest cure (investigator cureHint) |
|---|---|---|---|---|
| C033 | DETACHED-001 | gap | EST | Grant cancel+shutdown in the two producers (src/index.ts:2673,:2925) or expose permissions as a launch param, and call applyDetachedReading after launch/inspect so decideControl can confirm ownership. |
| C049 | DETACHED-017 | stub | SUP | Wire the executable-identity observation into receipt construction for absolute-path runtimes, or drop the field from the receipt contract until W18 lands. |
| C054 ✪ | EXECUTE-005 | missing-req | EST | Add `pi-workflow: ['cancel']` to NATIVE_CONTROL_ACTIONS with an executor that calls task.abortController.abort(); launch detached hosts with cancel+shutdown permissions and apply the launch receipt through applyDetachedReading so … |
| C077 | FURNACE-002 | missing-req | SUP | File 'W13-Fw2/VC-4 furnace observe-wiring' in the wb-79k chain (refresh+relate under host-bound scope, no new grant) and amend matrix row 97's caveat to 'topology module only; not wired into furnace_observe'. |
| C119 | INTEROP-006 | stub | EST | State it where agents read: one 'seams landed, importers 0' table in the skill and the W11 row, and mark SKILL.md:31-32 as target state. File a bead for the coordination boundary's first production caller (or record that none is … |
| C182 | OBSERVE-007 | stub | EST | Wire aggregate() for returned group/workflow nodes; make the event window invocation-scoped and newest-first, return each event's {source, projectionEventId, kind, observedAt} or a nextEventCursor; return bounded edge rows (kind … |
| C184 | OBSERVE-009 | stub | EST | Either wire host-measured outcome facts the task already holds (status, duration, agent/tool counts, tokens) as labelled non-native metrics plus the four digests, or rename/describe the tool as a receipt-basis diff and say it … |
| C185 | OBSERVE-010 | stub | SUP | File the wiring slices (latency -> workflow_compare metrics; patch proposal -> a workflow_propose tool or validate mode) or mark both rows 'pure module, unwired' in the matrix. |
| C225 | PROVIDERS-009 | gap | EST | Release the hold on wb-79k.1/.2 (apply hyperunixTopology / reactivefiberTopology in the onProgress seam at src/index.ts:3226-3237), file the matching claude-topology wiring, and mark rows 82/106 partial until wired. |

## guard-or-validate (54)

| claim | source | axis | grade | smallest cure (investigator cureHint) |
|---|---|---|---|---|
| C001 ✪ | AGENTS-001 | LX | EST | Hoist the running/queued refusal (src/index.ts:2139-2144) above the runInBackground branch and make AgentManager.resume() refuse running/queued records on the foreground path too (covers the nested tool). |
| C002 | AGENTS-002 | gap | EST | In resolveSpawnTypeIn, when the fallback target is unregistered or disabled, refuse exactly as fallbackSubagent:"none" does; remove the hard-coded all-tools tier from caller-reachable paths. |
| C005 | AGENTS-005 | DX | EST | Validate frontmatter against a key/type/enum table: warn (and fail under strictAgentFiles) on unknown keys and invalid values, accept yes/no/on/off and quoted booleans/numbers, and alias Claude Code camelCase keys and capitalised … |
| C008 | AGENTS-008 | LX | EST | Echo `Handle: @<handle> (name: @<alias>)` in every spawn reply, and either refuse a taken name or move a finished holder's name to the newer agent. |
| C017 | AGENTS-017 | LX | EST | Warn on a missing or rejected skill (notify plus a reply line, with distinct wording for symlinks), head the block with the skill's directory, strip the frontmatter, and offer an index-only preload mode. |
| C020 | AGENTS-020 | DX | EST | Derive the memory directory from a slug (handleBase) or reject the combination at load with the file named; add the directory line to the read-only block. |
| C023 | AGENTS-023 | DX | EST | Guard onComplete on the error path as on the success path, end the clone chain with a catch that touches nothing on ctx, and check the session is still active before emit or notify. |
| C036 | DETACHED-004 | LX | EST | Add a typed cause field (no-such-invocation \| socket-missing \| connection-refused \| transport-timeout) derived from errno plus invocation-directory existence, and drop the reconcile hint for no-such-invocation. |
| C037 ✪ | DETACHED-005 | UX | EST | Keep terminal:'completed' and add resultOmitted:'exceeds-snapshot-bound' (result stays absent) instead of reclassifying the run as failed. |
| C038 | DETACHED-006 | gap | SUP | Derive providers from held grants at both launch sites (mirror the embedded registry's grant-driven set) or refuse at launch when the script's node() targets are unreachable. |
| C050 | EXECUTE-001 | gap | EST | Guard the flag's completion callback like scheduleNudge does (try/catch around appendEntry/sendMessage) and, in print mode, await the flag-launched run inside session_start (or hold the session) and write the result to stdout; … |
| C051 | EXECUTE-002 | missing-req | EST | Persist the full value to `<runId>.workflow.result.json` beside the script and name that path in the notification (as agents do with 'Full transcript available at'), or let get_subagent_result accept wf_ ids; state the 4000-char … |
| C055 | EXECUTE-006 | stub | EST | Until a consumer exists, refuse a non-empty policy with a typed `unsupported-policy` (or accept only {}), and never echo a policy the host did not apply. |
| C057 | EXECUTE-008 | LX | EST | Compile the wrapped body with `new vm.Script` (no run) in both tools before createWorkflowTask and return the SyntaxError with its line; workflow_execute should refuse with a typed `definition-syntax-invalid`. |
| C058 | EXECUTE-009 | LX | EST | Give each rule its own reason naming field and bound ('input exceeds 65536 bytes', 'definitionRef has unknown key name'); type hostMode as a literal union; add `pattern: ^sha256:[0-9a-f]{64}$` and descriptions; on … |
| C059 | EXECUTE-010 | gap | EST | Resolve a definition whose id is a saved-root path through the saved-name resolver (same precedence as SubagentWorkflow), or have the catalog flag entries execute cannot launch; raise the id bound to a path bound (PATH_MAX) … |
| C060 | EXECUTE-011 | gap | EST | At admission, run the existing static projection (validateWorkflowSource possibleCalls) and refuse detached with a typed `host-incompatible-definition` naming the primitive; or pass the providers the held grants allow and bind … |
| C084 | FURNACE-009 | gap | EST | State 'the Run must live under <cwd>/.furnace (furnace -C <cwd>)' in the description and docs; optionally accept an allowlisted stateDir inside the bound workspace. |
| C096 | INSPECTOR-002 | gap | EST | Keep renderContext.invalidate per task in renderResult and call it on a WORKFLOW_TICK_MS timer while the task is running or paused and once when it settles; memoize the layout by task.progressVersion (three full folds of the … |
| C108 | INSPECTOR-014 | UX | EST | Return a width-aware component (render(width) calling layoutWorkflowCard with that width) instead of a pre-laid-out Text, and cap agent rows per phase with a '+N more · /agents → Workflows' line. |
| C120 | INTEROP-007 | missing-req | EST | Make the rule fire on what the cut touches, not on what it declares: when a cut changes a file under src/workbench matching mechanical-*, function-authority, source-admission or collective-event, require the skill or a program … |
| C123 | INTEROP-010 | gap | EST | State in the module header that latencyMs is echoed and not enforced, and run the export where a deadline can end it (a worker with a timeout equal to the budget), returning a typed refusal such as resolution/over-budget; add the … |
| C126 | INTEROP-013 | stub | EST | Record the status policy as a requirement on wb-w8fk: which status values admit load and which admit call, per entrypoint; and have the coordination boundary refuse a descriptor whose note or status forbids invocation, or get the … |
| C129 | INTEROP-016 | LX | EST | Use over-limit for byte-bound failures and receipt-malformed for a present-but-refused reference, add an index member for list entries and the member name for subject, add an expected member carrying the recognized schema id, and … |
| C135 | JOURNAL-002 | friction | EST | Refuse a capability the host registry does not know BEFORE assigning a node position or writing any row; have the registry mark refusals raised before provider.invoke (unknown, authorization, schema) and journal those as … |
| C138 | JOURNAL-005 | gap | EST | Check appendJournal's boolean at src/index.ts:3438 and refuse the resume with a typed message when a live override cannot be spent (the stance reconcile-tool.ts:184-189 already takes). |
| C141 | JOURNAL-008 | UX | EST | On an uncertain refusal carry forward the bound decision rows with the node row; for settlement 'none' replace the `resume` member with the override call template for the same taskId. |
| C143 | JOURNAL-010 | LX | EST | Give inspect limit/cursor and make `position` filter (the workbench.tool-reply/v1 paging the sibling tools use); cap `snapshot` with a byte-cap marker and its digest; return the record id instead of echoing `entry`; report an … |
| C144 | JOURNAL-011 | gap | EST | Call classifyJournal on the raw text in the SubagentWorkflow resume path (src/index.ts:3431) and put verdict and warnings in the launch text; refuse the resume when dropped lines include node rows or unknown kinds. |
| C150 | JOURNAL-017 | gap | EST | Append the branch or kept-path note on the rejected path too (surface worktreeResult in get_subagent_result and the notification); at session_start list `git worktree list` entries under tmpdir named pi-agent-* and notify; add a … |
| C160 | NODE-RPC-005 | gap | EST | refuse when prior.control !== undefined or prior.status is 'paused' with the same 'still running' message naming pause |
| C165 | NODE-RPC-011 | UX | EST | map each SDKResultError subtype to a coded sentence with a hint (e.g. 'CLAUDE_MAX_TURNS: the child hit the SDK turn cap; split the task or raise maxTurns') the way authRequiredError does |
| C167 | NODE-RPC-013 | LX | EST | include `${path}` ('invoke(<id>) output') in the three byte-limit messages and classify an oversized provider answer as 'unavailable' (too large to transport) rather than caller validation |
| C168 | NODE-RPC-014 | missing-req | SUP | add a validated `workbench.capabilityLimits` {deadlineMs,maxInFlight,maxBytes} setting threaded into registryFor, and a nodeCap RunWorkflowOptions field for tests |
| C170 | NODE-RPC-016 | UX | EST | render `· from resume journal` / reconcile state before the result preview and clamp the preview to the remaining width; consider a distinct glyph for 'done, freshness unknown' with a legend |
| C181 | OBSERVE-006 | LX | EST | Add the viewport's truncation() counts to the reply (droppedByCaps {nodes, events, maxNodes, maxEvents}), set events.completeness 'partial-gap' when the scope lost events, and flag (or refuse with a restart hint) a cursor whose … |
| C186 | OBSERVE-011 | LX | EST | Add one-line descriptions (where the value comes from, default, bound) to every property, a pattern on taskId, literals for provider/action pairs, and a two-line promptGuideline: when to observe, that nativeRef feeds … |
| C187 | OBSERVE-012 | LX | EST | Fold observe and compare refusals into the tool-reply/v1 error shape already used by control, execute and validate ({ok:false,status:'refused',error:{code,category,message}}), keeping the specific messages. |
| C189 | OBSERVE-014 | LX | EST | Return observe: {taskId} (the owning invocation) in the control reply and rename the tool-call id field; record control receipts as events without replacing node kind/evidence (append refs); report invoked: false when the adapter … |
| C200 | PACKAGING-002 | gap | EST | Set ci.yml node-version to 24 (or a 22+24 matrix), or lower engines to >=22 with a complete-gate run receipt per the doc-17 policy. |
| C201 | PACKAGING-003 | gap | EST | Reword both to 'release gate is Forge-controlled; GitHub CI is a compat canary only' (one-line edits). |
| C202 | PACKAGING-004 | missing-req | EST | One line in README '## Install': 'Requires Node 24+ (engines-enforced).' |
| C215 | PACKAGING-017 | friction | SUP | Lazy-load/optionalize typescript for the designer path (refuse with a clear diagnostic when absent), keeping the exact pin for the gated path. |
| C219 | PROVIDERS-003 | friction | EST | Add limit + cursor (and a names-only projection) to the input schema and page the result under the bound; when a bound is hit, return a typed partial with nextCursor instead of a validation rejection, or at least say 'output … |
| C221 | PROVIDERS-005 | LX | EST | Catch the SDK ProcessFailureError in the provider: map exit class 2 to category validation and put diagnostics[0].code plus remediation.action in the message. |
| C223 | PROVIDERS-007 | friction | EST | Raise the diagnostic bound to the reply budget (for example 1 KB within maxOutputBytes) and cut at a code-point boundary with an explicit truncation marker. |
| C233 | PROVIDERS-017 | friction | EST | Give the native registry a deadline above the longest provider bound (or per-descriptor deadlines) and keep the provider message; set the HX wall bound below the registry deadline so the partial answer returns. |
| C240 | PROVIDERS-024 | friction | EST | Split the three cases: validation 'target must be an absolute path', unavailable 'target does not exist', authorization only for a resolved path outside the root. |
| C248 ✪ | SCHEDULING-001 | missing-req | EST | In detectSchedule reject intervalMs/delay > 2_147_483_647 (and absurd relatives) with a message naming the ~24.8-day ceiling; or chain setTimeout for long delays. State the bound in README 'Schedule formats' and in the schedule … |
| C249 | SCHEDULING-002 | UX | EST | Reject intervalMs < 1000 in detectSchedule; in index.ts subscribe to 'subagents:scheduled' error/fired events and surface them (ctx.ui.notify + a <task-notification>-style entry for errors); include arm-time errors in the Agent … |
| C251 | SCHEDULING-004 | QoL | EST | Make the store async (await setTimeout between retries) or use an O_EXCL open with a short bounded retry; the files are per-session so contention is rare — a 250 ms total bound would do. |
| C254 | SCHEDULING-007 | QoL | EST | Validate with `new Cron(expr, { paused: true }, () => {})` then `.stop()`, or parse via `CronPattern` only. |
| C261 | SCHEDULING-014 | DX | EST | Warn per dropped field with path, key and expected type; warn on unknown top-level keys (workbench already refuses them); wrap sanitize errors with `in ${path}`. |
| C264 | SCHEDULING-017 | LX | EST | Add a byte cap (e.g. 16-32 KB) with an explicit '... (truncated at N bytes)' marker, and tell the agent the byte limit in the memory instructions; longer term route memory through a budgeted render. |

## small-code-fix (34)

| claim | source | axis | grade | smallest cure (investigator cureHint) |
|---|---|---|---|---|
| C003 ✪ | AGENTS-003 | gap | EST | When ctx.mode is print/json, default run_in_background to false and say so in the reply, or hold the turn on manager.waitForAll(); await the mention clone when headless; correct README.md:195. |
| C004 | AGENTS-004 | gap | EST | Use resolveModel() at src/agent-runner.ts:832 so every start path shares one resolver, and report an unresolved pin instead of falling back silently. |
| C006 | AGENTS-006 | gap | EST | Give diagnostics their own channel: ctx.ui.notify plus a `Warnings:` line in the Agent reply and notification; stop routing them through onToolActivity. |
| C010 | AGENTS-010 | LX | EST | Print `Type: <type key>` and `Handle: @…` in both replies, put the id in the foreground headline, and resolve `resume` through resolveAgentRef with wording that separates 'unknown' from 'evicted'. |
| C013 | AGENTS-013 | gap | EST | Abort only when the turn that just ended will continue (assistant stopReason toolUse), or when turnCount exceeds maxTurns+graceTurns; classify a clean stop on the last grace turn as steered. |
| C014 | AGENTS-014 | missing-req | EST | Let resolveAgentRef fall back to tombstones (reopen the session for resume; serve the last assistant message for get_subagent_result) and have the refusal name the transcript or session file. |
| C021 | AGENTS-021 | gap | EST | Reuse pi's pattern resolver, or warn once and fail closed when any pattern is unsupported. |
| C024 | AGENTS-024 | LX | EST | Ship the generator's field template as a reference of 2 KB or less (a skill or docs/custom-agents.md) named in the tool description, and include the live type list in fallback notes and refusals. |
| C025 | AGENTS-025 | QoL | SUP | Offer registry-derived choices in the wizard (newest per family), or write a family alias once fuzzy resolution prefers the newest id. |
| C034 ✪ | DETACHED-002 | DX | EST | realpathSync the agent dir (or the directory argument) before ancestors(), and have ancestors() name the failing ancestor and the PI_CODING_AGENT_DIR workaround in its message. |
| C043 | DETACHED-011 | friction | EST | Shorten the per-launch template (pw-<uid>- to p-) or hash the uid into the digest, and correct the matrix row to the formula (103 - len(tmpdir) - uid-dependent overhead). |
| C045 | DETACHED-013 | LX | EST | Add a README 'Workbench tools' section with one entry per tool: params, required grants, receipt directory, reattach and stop recipes. |
| C052 | EXECUTE-003 | gap | EST | Fold running workflow tasks into registryEntry.hasRunning/waitForAll (await the runWorkflowTask promises kept on the task), and say in README 'Cross-Extension RPC'/headless notes that workflows are held too. |
| C053 | EXECUTE-004 | LX | EST | Add a per-hostMode `next` member to the reply (embedded: 'you will be notified; do not poll'; detached: 'poll workflow_detached {action:"inspect", invocationId}') and correct the description; optionally post a notification when a … |
| C078 | FURNACE-003 | stub | EST | Either extend NATIVE_CONTROL_ACTIONS.furnace to ['stop','pause','resume'] (pause/resume are non-destructive; keep stop under operator confirmation) and rule attempt-stop out (delete the row or give Attempt targets an … |
| C079 | FURNACE-004 | LX | EST | In FurnaceControlRefusal's constructor add `Object.defineProperty(this,'code',{value:refusal,enumerable:true})` (or have control-tool read `refusal` as a fallback) and pin it in test/workbench-control-tool.test.ts. |
| C090 | FURNACE-015 | friction | SUP | Split FurnaceObserverLimits into SnapshotLimits {attemptLimit, logBytes, callTimeoutMs} and PollLimits, and derive the client timeout from callTimeoutMs. |
| C098 | INSPECTOR-004 | UX | EST | Handle x and p in the dialog host before delegating to the rich reducer (the host already owns onKill/onPause), draw 'x stop · p pause' in the rich footer while the run is live, and let g reach the legacy node list when there are … |
| C103 | INSPECTOR-009 | UX | EST | Resolve the acted-on row by key everywhere (use focusedNode() in the reducer and hand the key to the host for the transcript), treat row 0 as selected at open, and consider evicting settled runs last or keeping a per-run floor. |
| C109 | INSPECTOR-015 | UX | EST | In elapsedMs also subtract (now - pausedAt) while paused (pass pausedAt through the dialog and card task objects) and give the fleet row the same elapsed value. |
| C130 | INTEROP-017 | gap | EST | Either stop shipping the program pages with the package, or ship the skill beside them and fix the two links; add one README sentence that function dispatch is not available and where its status lives. wb-yiu4 (P10) owns 'ten … |
| C134 ✪ | JOURNAL-001 | gap | EST | In resolveResumeTarget fall back to <sessionTaskDir>/<runId>.workflow.jsonl + .workflow.js when the id is not in memory (both files already exist there); at session_start list journals in the session task dir whose last node row … |
| C136 ✪ | JOURNAL-003 | gap | EST | Hash `git ls-files -s` output plus `git status --porcelain=v2` bytes (or tree oid + dirty-file digests) instead of reading every Git-visible file, so size no longer disables replay; where a reading is unknown, say so in the … |
| C146 | JOURNAL-013 | DX | EST | Correct the three sentences and the two matrix rows; print `Journal: <path>` under `Script:` in the launch text and say so in the description; add a 'Resuming and recovering a workflow' section to README.md or docs/workflows.md … |
| C169 | NODE-RPC-015 | stub | SUP | remove 'observe' from the type until a dispatch path exists; either implement inspect() on at least one provider or stop listing inspect in supportedModes |
| C172 | NODE-RPC-018 | gap | EST | one changelog bullet per shipped feature (node(), grants, reconcile, fail-closed resume, replay basis, transcript grant); fix the AGENTS.md tense |
| C192 | OBSERVE-018 | DX | EST | Re-measure W13/W14/W16/W17 rows at the current head, drop the 'proposed/planned' wording for landed tools in AGENTS.md and docs/workbench/11, fix the stale comment at src/index.ts:3019-3022, and mark docs/09's retention sentence … |
| C226 | PROVIDERS-010 | friction | EST | Canonicalise the setting with realpath at registration (as the scope already is) or compare realpaths; name the mismatch in the error; rebuild the registry entry when the setting changes. |
| C237 | PROVIDERS-021 | LX | EST | Offer a compact projection by default (RF: output.text, render basis, budget summary, diagnostics; HX: answers, completeness, licenses_absence) with the full native source behind an explicit flag; fix the worked example to return … |
| C239 | PROVIDERS-023 | gap | EST | Import each provider module independently and register what loads, reporting the rest as unavailable capabilities; derive the id rosters from the registry snapshot. |
| C241 | PROVIDERS-026 | DX | SUP | Resolve hx through the SDK's own PATH lookup in the test, and make the probes take the repository root (or require the argument). |
| C252 ✪ | SCHEDULING-005 | DX | EST | On parse failure: console.warn naming the path, rename the file to <name>.corrupt-<ts> before the first save, and surface a toast at scheduler start. |
| C253 | SCHEDULING-006 | UX | EST | Record armedAt/nextFireAt when the timer is armed (or chain setTimeout from an explicit next time) and read it in getNextRun; drop or read the stored nextRun; width-aware columns (relative time for once jobs); add enable/disable … |
| C260 | SCHEDULING-013 | missing-req | EST | Document 'cron is evaluated in the process local time (TZ)'; show the resolved next run in local+UTC in the reply; optionally accept `tz=<IANA>` in the schedule string and pass {timezone}. |

## new-surface (12)

| claim | source | axis | grade | smallest cure (investigator cureHint) |
|---|---|---|---|---|
| C039 | DETACHED-007 | LX | SUP | Add optional input (JSON), timeoutMs and retentionMs to workflow_detached's launch parameters and pass them through. |
| C048 | DETACHED-016 | gap | SUP | Add action:'list' that reads the invocation directory and reports id, launchedAt, pid and socket-liveness per row. |
| C080 | FURNACE-005 | LX | EST | Add optional `uncertainty` and `echo` to ControlExecutionSummary (control-tool.ts:34-37), forward them from the furnace (and forge) legs, and fold them under reply.control (bounded, closed vocabulary already sanitized by the … |
| C086 | FURNACE-011 | LX | EST | Expose the existing loader as a tool (`workflow_evidence {ref}`) or add optional {attemptId, stream, maxLines} params to furnace_observe that call readFurnaceAttemptLogEvidence under furnace:inspect. |
| C128 | INTEROP-015 | DX | EST | Carry the cause as closed-vocabulary members: on source-changed the fresh measurement's own code and dirty counts (or changed: commit\|tree\|manifest), on source-unmeasurable a cause enum for the clause that failed, on … |
| C131 | INTEROP-018 | LX | EST | Lead each header with a ten-line 'call it like this / it returns' block and move the pinned-row ledger below the code or into the suite header; return {field:'options'\|'loader', reason:'wrong-type'} for malformed calls; split … |
| C151 | JOURNAL-018 | missing-req | SUP | Add the journal and the persisted script to the README.md:637 list and the :4226 sentence; add a workflowJournal:false setting that passes no journal (resume then answers 'has no journal to resume from'). |
| C178 | OBSERVE-003 | missing-req | EST | Add a bounded workflow list read (id, name, status, startedAt, node count; newest first; same scope ACL) and name it in the unavailable refusal; rehydrate finished tasks from the session task dir on session_start, or say 'not … |
| C183 | OBSERVE-008 | friction | EST | Push tone/kind into the read (the projection already indexes status and kind per scope and invocation) so a filtered page is filled before it is returned, and document that node calls never carry tone 'success' (or expose … |
| C203 | PACKAGING-005 | LX | EST | Add a 'Workbench tools' reference table (name, gate, required grants, one-line reply shape) to docs/workflows.md or README, mirroring the existing Agent table style. |
| C232 | PROVIDERS-016 | friction | EST | Use category unavailable with one sentence shape ('<tool> executable not found on PATH') in all four providers, and add a preflight (settings menu row or a workbench doctor reply) that reports each binary's presence and version. |
| C257 | SCHEDULING-010 | gap | EST | Add list_scheduled / cancel_scheduled (or a schedule_action tool with inspect\|cancel\|disable) gated on schedulingEnabled; have the reply name the tool instead of the menu. |

## perf-or-resource (3)

| claim | source | axis | grade | smallest cure (investigator cureHint) |
|---|---|---|---|---|
| C066 | EXECUTE-017 | UX | EST | Return details {taskId} and add renderCall/renderResult that reuse renderWorkflowCard for embedded launches and a compact one-line render for detached launches and refusals (refusals styled as errors). |
| C083 | FURNACE-008 | LX | EST | Reuse providers/furnace.ts's bounded redacted-message form in errorPreview, and map state_error to 'no Furnace state root at <workspace>/.furnace'. |
| C101 | INSPECTOR-007 | missing-req | EST | Bind PgUp/PgDn/Home/End in both reducers (reuse createViewerKeys), make the rich filter a projection query by title or provider rather than a page-local narrowing, and add a requirement that any row is reachable within a stated … |

## tool-spec-text (24)

| claim | source | axis | grade | smallest cure (investigator cureHint) |
|---|---|---|---|---|
| C011 | AGENTS-011 | LX | EST | Build the two parameter descriptions from live settings ('Default: N turns'; 'Used only when the agent file sets none') and add an `Ignored: thinking=high (agent file pins low)` line to the reply. |
| C026 | AGENTS-026 | QoL | EST | Apply a tail budget with an explicit '[earlier turns omitted]' marker and state the cost in the parameter description. |
| C061 | EXECUTE-012 | friction | EST | State the full conjunction in the description and in the missing-detach-grant reason, or run agent-less definitions on the deterministic backend so claude:invoke is not needed; list the per-step grants in docs/workflows.md. |
| C063 | EXECUTE-014 | stub | EST | Offer only `script` in the tool schema until a launcher exists (the pure module can keep the union), or say in the description that the other kinds are reserved; file the dispatch bead that composes source-admission. |
| C064 | EXECUTE-015 | DX | EST | Add a docs/workflows.md section 'Launching a pinned definition' (catalog -> execute -> completion per hostMode, grant table, limits) and a CHANGELOG entry; make the description say 'take definitionRef verbatim from … |
| C067 ✪ | EXECUTE-018 | QoL | EST | Ship a compact SubagentWorkflow description (API list, caps, one example; patterns moved to docs/workflows.md) selected by toolDescriptionMode or a dedicated setting. |
| C085 | FURNACE-010 | LX | EST | Type.String({pattern:'^frn-run-[a-zA-Z0-9_-]{1,100}$', description:'Furnace Run id as `furnace run list --json` reports it'}), include the hint in the refusal text, and add a README subsection under Workbench mode. |
| C092 | FURNACE-017 | gap | EST | Export one FURNACE_RUN_ID regex from furnace-observer.ts and use it in the tool, in the capability inputSchema (`pattern`) and in furnace-evidence.ts. |
| C122 | INTEROP-009 | LX | EST | Document the grant beside workbench:execute and workbench:detach (docs/workbench/12-security.md and the skill). Add a schema-side locator to the diagnostic that carries no caller value: the JSON-Schema keyword and the schema path … |
| C139 | JOURNAL-006 | LX | EST | Return denials as JSON {contract, phase:'denied', policy, category, reason, field} (a field NAME is not caller text, so naming it keeps the no-echo rule); add a description to each parameter naming the actions that require it; … |
| C145 | JOURNAL-012 | gap | EST | State in the tool description and docs/workflows.md that no shipped capability produces a reconcilable row; land one real effectful capability behind a grant with a live-tier journey test. |
| C156 | NODE-RPC-001 | LX | EST | replace Check() with Value.Errors(descriptor.inputSchema, value) and append the first error's path+message (redacted via redactWorkbenchText), mirroring the agent-schema verdict format at runtime.ts:723 |
| C157 | NODE-RPC-002 | LX | EST | add a capability table (id, grant, input keys, effectClass) to docs/workflows.md and one line per registered capability in the tool description (render registry.catalogSnapshot() at registration); add 'see workbench_catalog / … |
| C164 | NODE-RPC-010 | LX | EST | message: 'node() needs the Claude workbench backend: set workbench.workflowAgentBackend="claude" and workbench.capabilityGrants in .pi/subagents.json'; optionally drop the node() line from the description when the backend is pi |
| C176 | NODE-RPC-023 | friction | EST | ship a .hyperunix config (or document `--workspace src`) for hx users of this repo; file the json-schema.ts parse gap upstream against hx with the byte offsets |
| C177 | OBSERVE-002 | gap | EST | Let workflow_observe take a native ref (provider/type/id) as an alternative to taskId and answer the scope's row for it, or have forge_gate_run pass an invocationId and return the id to observe. Until then state in both … |
| C188 | OBSERVE-013 | LX | EST | Return allowedActions for the target's provider on unknown-action, the requiredGrant on observer-only, spell the hint as the tool's own parameter ('set confirmed: true'), make `confirmed` required or describe it, and list the … |
| C191 | OBSERVE-017 | LX | EST | Ship a short operator/agent page (or skill) for the observe -> control -> compare loop with one worked call per tool, generated from the registered schemas so it cannot drift, and link it from README line 4. |
| C217 | PROVIDERS-001 | LX | EST | Project the answer set with names in the provider: read the edge-claims' hx.fs/entry-name (or the hx-results answer frames) into a compact rows:[{path, kind}] beside the native source; if that needs SDK support, state in the … |
| C218 | PROVIDERS-002 | LX | EST | Return an explicit answers array (the hx answer frames / answer-coverage projection) and move the proof graph under a separately named key; until then put 'rows are proof-graph nodes; read coverage_summary.answer_count' in the … |
| C220 | PROVIDERS-004 | gap | EST | Include inputSchema (or a schema view gated on discover:<id>) in the catalog/inspect reply for invoke-only capabilities; the descriptor is static metadata and needs no provider inspect(). |
| C228 | PROVIDERS-012 | LX | EST | Document one valid id in the worked example and the property description; surface rf's hint; optionally accept contextWindow/maxOutput as an explicit third input arm. |
| C230 | PROVIDERS-014 | LX | EST | Add description, examples (hx.fs/regular-file) and default to the schema properties; require root explicitly or state the default in the contract; point at `hx schema list` for kinds. |
| C258 | SCHEDULING-011 | gap | EST | Add 'fires only while this pi session is open' to the reply + param description; on scheduler start list sibling store files and offer adoption/cleanup; call deleteFileIfEmpty on removeJob; document gitignore for … |

## reply-or-refusal-text (32)

| claim | source | axis | grade | smallest cure (investigator cureHint) |
|---|---|---|---|---|
| C007 | AGENTS-007 | LX | EST | Drop the 'all parts anywhere' tier (or require version tokens to match contiguous id segments), break ties by newest, and print `Model: provider/id` in the spawn reply. |
| C009 | AGENTS-009 | LX | EST | Add an isError argument to the src/index.ts textResult helper and set it on each refusal and failed-run reply (or throw, as #179 did). |
| C012 | AGENTS-012 | LX | EST | Queue steers for queued records in the tool as manager.steer does, render 'Queued — not started', headline by status ('Agent aborted after …'), say 'below', and fire onComplete when a queued background record is aborted. |
| C046 | DETACHED-014 | friction | SUP | Per-action refusal: name the missing token and the workbench.capabilityGrants settings key. |
| C056 | EXECUTE-007 | LX | EST | Append the first `workflow.js:<line>:<col>` frame of message.stack to the run error (runtime.ts:2051) and to SCRIPT_SYNTAX; add a one-line hint when the missing name is require/process/fetch/setTimeout/import, and name … |
| C062 ✪ | EXECUTE-013 | gap | EST | Check isWorkflowsEnabled() once in the tool shell before either launcher (typed `workflows-disabled`, message reusing the flag's wording), or do not register workflow_execute/workflow_detached launch while the switch is off. |
| C082 | FURNACE-007 | LX | EST | Land wb-752.13 with a Run-scoped viewport (e.g. trace.invocationId = `furnace:<runId>` on the snapshot) so the observe-query builder can address the node; wrap the three refusal paths in tool-reply/v1 {ok:false, error:{code}}. |
| C088 | FURNACE-013 | DX | EST | Extend live-furnace-vc4-launch.mjs with `--formula external-inspect --complete` (executor /usr/bin/true, wait for completed) and name the formula/state contract in docs/workflows.md:455. |
| C089 | FURNACE-014 | DX | EST | One PI_FURNACE_FIXTURE_* contract with a `mode` (completed\|active) plus one launcher flag, and a preflight line in each tier that prints the expected prefix and variables before asserting. |
| C100 | INSPECTOR-006 | UX | EST | Draw 'Filter: _' whenever editingFilter is true, give the reducer every printable key first while editing, add a 'no rows match' line, and make Esc clear a set filter before it closes the dialog. |
| C102 | INSPECTOR-008 | stub | EST | Compare the printable character (data === '+') for zoom-in; either implement follow (keep the cursor on the newest row while it is on) or remove the key and the header word. |
| C111 | INSPECTOR-018 | LX | SUP | Add a short 'For agents' paragraph to README ## Commands and to docs/workbench/10 naming workflow_observe and workflow_control as the model-facing equivalent of the inspector, with a pointer to qa/workbench/inspector-smoke.mjs. |
| C115 | INTEROP-001 | gap | EST | Rewrite SKILL.md lines 13 and 15 and mark the two Routing bullets in place; a same-line rewrite keeps the docs census green (probes/interop/SKILL.same-line-rewrite.md ran 126/126). origin/master 3fc0ead1 already carries corrected … |
| C118 | INTEROP-005 | friction | EST | Judge the definition kind before the detach conjunction for kinds that no host launches, and move the pinned row at test/workbench-function-authority.test.ts:1683 with it; or keep the order and append to the missing-detach-grant … |
| C137 | JOURNAL-004 | LX | EST | Have replayAt record the first decline (position, cause: key\|failed-entry\|basis\|resumed-journal\|replay-unsafe, and for basis the dimension that moved) as a workflow_log entry and a <replay-declined> line in the notification; … |
| C140 | JOURNAL-007 | LX | EST | Emit a complete `next` call (evidence:{capabilityId:<the position's first evidenceRead>, input:<its input skeleton, pre-filled from recordedNativeRefs>}) and omit it when evidenceReads is empty; filter the roster by `position`; … |
| C142 | JOURNAL-009 | missing-req | EST | Bind a receipt to the journaled reference the read was ASKED about (an input that names the recorded id, verified in the result) instead of the read's own operation id; allowlist a read that inspects the effect's own object per … |
| C152 | JOURNAL-019 | gap | SUP | Pass a journal (a file beside the invocation's boot pin) to runWorkflow at local-detached.ts:730 and name its path in the lost-host snapshot's reconcileHint. |
| C159 | NODE-RPC-004 | UX | EST | emit one workflow_log entry at run start when journalEntries.length>0 && !prefixIntact naming the reason (basis mismatch / agent({resume}) journal / unmeasured replay dependency), and make describeResumeJournal flag `resumed` … |
| C163 | NODE-RPC-009 | LX | EST | name the Claude-backend exclusions (minimal, isolation, gate) in the Workbench paragraph and make gate/isolation refusals consistent (both fatal before dispatch, or both null) |
| C173 | NODE-RPC-019 | UX | SUP | document claude:transcript next to capabilityGrants; make the toast name `workbench.capabilityGrants` in .pi/subagents.json; add a 'more' key or limit prompt in the viewer |
| C179 | OBSERVE-004 | LX | EST | Make the defaults consistent (smaller default limit or larger default maxBytes), trim nodes before dropping a selector the caller asked for or name the maxBytes that would carry it, and replace `key` with a short per-reply index … |
| C190 | OBSERVE-016 | LX | EST | Carry a bounded, redacted reason on failure rows (the label layout already exists) and add a grant-gated evidence read that takes one evidenceRef from an observe reply and returns the loader's bounded entry. |
| C210 | PACKAGING-012 | missing-req | SUP | Add a 'Distribution plan' paragraph to doc 17 naming the publish identity (e.g. scoped fork name) and the version rule relative to upstream. |
| C222 | PROVIDERS-006 | LX | EST | Carry diagnostics[0].message and .hint (sanitized, bounded) in the CapabilityError; on a non-envelope exit report the exit status and a bounded stderr tail. |
| C229 | PROVIDERS-013 | LX | EST | Report the first failing instance path and keyword (typebox Errors()) in the message, for example 'input.task: required' or 'input matches both/neither oneOf arm'. |
| C231 | PROVIDERS-015 | friction | EST | Name the missing grant in the refusal (the operator already owns the grant list), and ship one worked settings block in docs/workbench/19. |
| C234 | PROVIDERS-018 | LX | EST | Build the node() paragraph from the live registry (list ids when the Claude backend is selected, omit the hook otherwise), say 'a failed node() throws a typed CapabilityError', and make the no-registry error name the setting. |
| C238 | PROVIDERS-022 | gap | EST | State the process side effect in the descriptor and docs/workbench/13; surface a notice when a preview's rf child launches a server; decide whether session_shutdown should offer `rf storage local-servers --idle` as a hint. |
| C250 | SCHEDULING-003 | friction | EST | On enable: `if (enabled && currentCtx && !scheduler.isActive()) startScheduler(currentCtx)`; make the refusal name the real cause; add a regression test next to test/schedule-params-wiring.test.ts. |
| C255 | SCHEDULING-008 | LX | EST | Return isError:true (or throw) for refusals/invalid input; append cronCheck.error when the input has >=5 whitespace fields and say 'first field is seconds'; phrase for the agent ('ask the user to enable Scheduling in /agents → … |
| C256 | SCHEDULING-009 | LX | EST | Key uniqueness on the generated id (nanoid already unique) and drop the name check, or auto-suffix; if names matter, accept the Agent `name` param for the job and mention it in the reply. |

## packaging-or-ci (6)

| claim | source | axis | grade | smallest cure (investigator cureHint) |
|---|---|---|---|---|
| C044 | DETACHED-012 | DX | EST | Add "type":"module" to package.json (or emit the host entrypoint as .mjs). |
| C199 ✪ | PACKAGING-001 | gap | EST | Add a fork install note: `pi install git:github.com/jehalladay/Pi-subagents` (pi install supports git: sources, verified via `pi install --help`) or a packed-tarball path, until the fork publishes under its own name. |
| C204 | PACKAGING-006 | friction | EST | Exclude docs/workbench/receipts/ (and consider TRACEABILITY.md) from the pack - one .npmignore line plus a boundary-classifier allowlist edit; keeps the specs, drops 1.5MB+ of inert evidence. |
| C205 | PACKAGING-007 | gap | SUP | Add '"prepack": "npm run build"' or make package-smoke compare a dist content digest against a fresh tsc emit. |
| C212 | PACKAGING-014 | friction | SUP | Generate .npmignore from the classifier's rule tables (single source), or flip to a package.json files allowlist and let the classifier verify it. |
| C216 | PACKAGING-018 | UX | PLA | Point media URLs at the publishing repo at release time (fold into the PACKAGING-012 distribution plan). |

## test-or-fixture (9)

| claim | source | axis | grade | smallest cure (investigator cureHint) |
|---|---|---|---|---|
| C070 | EXECUTE-021 | DX | SUP | Add a wiring test that boots the extension in a hermetic dir and runs workflow_catalog -> workflow_execute(embedded) -> completion notification, plus the user-level-definition and stale-digest refusals. |
| C076 | FURNACE-001 | gap | EST | In the furnace_observe execute body replace `projection.refresh(observer.projectionSnapshot(reading))` with `const t=observer.projectionTopology(reading); for (const s of t.snapshots) projection.refresh(s); for (const r of … |
| C095 | INSPECTOR-001 | UX | EST | In WorkflowDialog.render pass Math.floor(terminal.rows * VIEWPORT_HEIGHT_PCT / 100) as terminalRows (legacy) and rows (rich), as conversation-viewer.ts viewportHeight() does, and put the way out first in the footer; add a … |
| C105 | INSPECTOR-011 | UX | EST | Clip in the renderer: from = max(0, offset), to = min(columns, offset + length), draw to - from cells with ◀/▶ on the first and last visible cell; pass the model's columns to the view; add a test over buildTimelineLanes output … |
| C107 | INSPECTOR-013 | gap | EST | Pass panes: true and an ascii flag from one capability source (a workbench.tui setting or a TERM/locale probe) at workflow-dialog.ts:1316 and to layoutWorkflowDialog and renderWorkflowCard; add a wiring test that fails when the … |
| C127 | INTEROP-014 | friction | EST | Keep the fixed reason texts and add structured members beside them: blockedOn with a pointer to the tracking bead or doc for the unadopted case, and requiredGrant on missing-function-action-grant (the grant is host-adopted … |
| C161 | NODE-RPC-006 | DX | EST | update the five rows to landed-gated with merge sha d09092a8 and point at the tests in test/workflow-effect-replay.test.ts / test/workflow-journal-compat.test.ts |
| C227 | PROVIDERS-011 | DX | EST | Cut the rf-pin-bump (re-capture test/fixtures/rf-result-keys.json and REACTIVE_FIBER_CONTRACT_SOURCE from a fresh stamped receipt) and file a standing bead that fires when the installed rf moves. |
| C235 | PROVIDERS-019 | LX | EST | Emit tool:'workbench_catalog' from the capability catalog builder (one literal plus its type). |

## docs-fix (12)

| claim | source | axis | grade | smallest cure (investigator cureHint) |
|---|---|---|---|---|
| C018 | AGENTS-018 | gap | EST | pi-subagents: add ~/.skills to the preload roots and list the searched roots in the not-found note. Route to rf: write frontmatter for the pi destination and have --check verify it with pi's loader. Route to hx: add a pi install … |
| C019 | AGENTS-019 | LX | EST | Set noSkills for append-mode agents whose inherited prompt already contains the index, or strip that section from the inherited copy. |
| C065 | EXECUTE-016 | LX | EST | On success return {ok, status, invocationId (documented as the taskId workflow_observe takes), hostMode, nativeRefs, next}; drop the definition/provenance echo from the model text (keep them in details); use one name for the id … |
| C081 | FURNACE-006 | gap | EST | Add a bounded `events` page (limit, after-cursor) to FurnaceReading via Events.list, set stream.runLifecycle to 'events list --after <cursor>' and cursor to the page's next_cursor; update the matrix caveat. |
| C099 | INSPECTOR-005 | UX | EST | Make the footer view-aware (overview: '/ filter · f focus · ⏎ collapse · g controls'; timeline: '= - zoom · h l pan'; details: 'e next · ⏎ load · c transcript') and add the four-view key table to README ## Commands. |
| C106 | INSPECTOR-012 | gap | EST | Default to fit-to-span with a seconds-per-cell zoom, add page pan, format durations with formatDuration, and emit the phase-kinds note only when a producer could have supplied kinds. |
| C116 | INTEROP-002 | DX | EST | Re-key rows M048-M050 (and the page rows) by a content anchor (the sentence stands exactly once in its section) instead of a line number, or move the 50 historical corrections into a frozen ledger so the live skill is free to … |
| C117 | INTEROP-003 | gap | EST | File a landing bead that brings master's skill, the AGENTS.md and README.md interop sections and the current program's README onto the trunk (the wb-12x1 route), after INTEROP-002 is cured or as a same-line rewrite. wb-yiu4 (P10) … |
| C121 | INTEROP-008 | gap | EST | One docs cut: re-measure the W11 sentence, strike the two repaired defects in 01/02/03 with their repair commits, replace the example grant by a note that the spelling is unadopted (wb-w8fk, wb-2ukh track the choice), and add the … |
| C213 | PACKAGING-015 | LX | SUP | Either ship the pi-mechanical-interop skill (it is consumer-routing, not contributor-private) or exclude its target program docs too; keep the pair on one side of the boundary. |
| C259 | SCHEDULING-012 | gap | SUP | Create the output file in executeJob with createOutputFilePath/writeInitialEntry (the record already has an id) honoring outputTranscript; or state the limitation in README 'Scheduling'. |
| C262 | SCHEDULING-015 | friction | EST | Persist only keys explicitly set in this project (track a set of user-touched ids, or diff against loaded global+defaults); or write `null`-free deltas and document the merge. |

## design-rework (29)

| claim | source | axis | grade | smallest cure (investigator cureHint) |
|---|---|---|---|---|
| C015 | AGENTS-015 | friction | EST | Make the preview budget a setting with a larger default (deliver the full result up to a few KB), accept several ids in one get_subagent_result call, add type and handle to the notification, and drop the duplicate path. |
| C016 | AGENTS-016 | LX | EST | Return the 5-10 nearest matches plus a total count, and treat "default" and "inherit" as 'omit'. |
| C022 | AGENTS-022 | gap | EST | Force params.subagent_type = opts.type in cloneAgentTool.execute and add the clone session's assistant usage to pendingUsage. |
| C035 | DETACHED-003 | UX | EST | Write an observation-grade terminal file (verdict + result digest + boundedresult) beside receipt.json at terminal time, clearly labeled as saved observation rather than live host truth. |
| C040 | DETACHED-008 | DX | EST | In the entrypoint catch, write a redacted error.json beside the boot pin before exit and have the launcher's pre-handshake error name that file. |
| C047 | DETACHED-015 | friction | SUP | Accept bounded handshakeMs/idleMs launch params and append an idle-expiry/timeout row to controlAudit (or a terminal file) before stop(). |
| C068 | EXECUTE-019 | missing-req | EST | Let workflow_observe without taskId return a bounded page of this session's runs {taskId, name, status, startedAt}; optionally accept a caller idempotency key on workflow_execute that returns the existing invocation. |
| C069 | EXECUTE-020 | stub | SUP | Build one HostAdmission in src/index.ts from settings (three limits + deadline) and pass it to every runWorkflow call, surfacing waits through onAdmissionWait into the progress row. |
| C071 | EXECUTE-022 | QoL | EST | Add `--subagents-workflow-args=<json \| @file>` (JSON-checked like the tool's args) and give flag runs a journal path so resumeFromRunId works. |
| C087 | FURNACE-012 | UX | EST | Give external Run snapshots a synthetic invocation (trace.invocationId `furnace:<runId>`) and list them in the inspector's workflow picker, reusing the existing tree/timeline over the topology from FURNACE-001. |
| C091 | FURNACE-016 | QoL | EST | Group requestIds/producerDigest/sdk under `provenance` emitted only with a `verbose:true` param; emit one timestamp when the three coincide; honour a maxBytes param as workflow_observe does. |
| C097 | INSPECTOR-003 | UX | EST | Have the Claude observer write a snapshot (projection.refresh with coverage and an interval) at init and at terminal, or let an in-process sequenced stream count as current; relate each session to an observed run or phase node; … |
| C104 | INSPECTOR-010 | gap | EST | Carry lastError and a small provider facts map (render id, verdict, coverage) on the observation node, draw them wrapped in details, and remove the constant Source line until a producer supplies one. |
| C110 | INSPECTOR-017 | DX | EST | Re-measure the W15 and W21 rows against the bead export, extend the existing ledger census to fail when a row names a closed bead as open, and add rows for the host wiring of panes and ASCII. |
| C124 | INTEROP-011 | gap | EST | Export one grant-list judge and one clean-text judge from a shared module (settings.ts already owns the grammar) and have the three seams import it; decide in writing whether coordination's narrower rule is intended and pin the … |
| C125 | INTEROP-012 | DX | EST | Read the descriptor through the coordination boundary's readRegular (one non-blocking open, the handle judged a regular file, then read), which returns descriptor/not-a-file; three lines and one planted case. |
| C147 | JOURNAL-014 | UX | EST | Use stats(collapse(task.workflowProgress).agents, task.agentCount) in formatWorkflowNotification and add a case over a start/start/done log. |
| C148 | JOURNAL-015 | UX | EST | When ctx.hasUI, require ctx.ui.confirm for override and stamp how the decision was confirmed on the record (ui \| tool-call); give the inspector's pending row a key that opens the same journey for a human. |
| C149 | JOURNAL-016 | friction | EST | Return a distinct variant ({hasChanges:true, missing:true, path}) for a vanished directory and append 'worktree directory missing at cleanup; its changes cannot be recovered' to the result. |
| C158 | NODE-RPC-003 | LX | EST | carry capabilityError onto WorkflowTask in completeWorkflowTask and emit `<error category="...">` (or a category attribute on <status>) in formatWorkflowNotification and workflowResultText |
| C162 | NODE-RPC-007 | DX | EST | rewrite the sentence to the basis rule: replays only under an identical model/permission/tools/roles/grants/cwd/replay-dependency basis, otherwise runs live |
| C166 | NODE-RPC-012 | LX | EST | add 'timeout' and 'cancelled' categories (or a `reason` field on CapabilityDiagnostic) and keep 'transport' for provider/protocol failures |
| C171 | NODE-RPC-017 | UX | EST | render 'unclassified' when effectClass is empty; put the error once (status short, result full) in formatWorkflowNotification |
| C180 | OBSERVE-005 | LX | EST | Carry the observer's own freshness for a live stream (the Claude observer already states freshness 'current' in claude-transcript.ts:20) or refresh on each stream snapshot; reserve 'last-known-running + stale' for … |
| C193 | OBSERVE-019 | friction | EST | Emit a progress line per series on stderr (12 series) and state the expected duration in the header; set the module type for dist (or emit .mjs) so Node does not reparse. |
| C209 | PACKAGING-011 | gap | SUP | Stamp every row with its measurement SHA/date (a column), and re-export the ledger at each release cut. |
| C224 | PROVIDERS-008 | UX | EST | Key both rows by the node-call identity and attach the native id as an evidence/native reference on settle, or settle the node-call row when the keyed-by-native-id row is emitted. |
| C236 | PROVIDERS-020 | friction | EST | Hold one initialised connection per registry scope for reads (closed at session_shutdown, as forge_gate_run connections already are) or batch targets in one connection. |
| C263 | SCHEDULING-016 | DX | EST | Add a `subagents.json` reference table (key, type, default, live vs next-session) generated from SubagentsSettings, an Environment section (PI_CODING_AGENT_DIR, PI_CODING_AGENT_SESSION_DIR, XDG_RUNTIME_DIR, CLAUDE_CONFIG_DIR, … |

