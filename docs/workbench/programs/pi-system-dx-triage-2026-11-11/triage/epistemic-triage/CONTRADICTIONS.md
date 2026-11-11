# CONTRADICTIONS — shipped promises vs measured behaviour

Pin ce180d82 (`pin-ce180d82`), consolidated 2026-11-11. Each entry quotes both sides: the **Promise** as shipped text (README, docs/, docs/workbench feature matrix, CHANGELOG, skill, tool description/schema) and the **Measured** side from the graded evidence in `CLAIMS.jsonl` (claim ids cited; grades ESTABLISHED unless noted). Feature-matrix rows claiming more than probes showed — and rows claiming *less* than what landed — both count: a status ledger is wrong in either direction.

---

## A. Install, packaging and CI promises

**1. C199 (PACKAGING-001) — the install line installs different software.**
- Promise: README.md:45 — `pi install npm:@tintinweb/pi-subagents`.
- Measured: `npm view @tintinweb/pi-subagents` serves upstream **0.23.2** (2026-11-10, 200 files/2.8 MB); this tree is fork jehalladay/Pi-subagents at **0.20.0** with the entire Workbench under CHANGELOG `[Unreleased]`. No published artifact contains the documented workbench surface.

**2. C200 (PACKAGING-002) — CI validates a runtime the manifest forbids.**
- Promise: package.json `engines: node >=24`; docs/workbench/17 calls >=24 "the only declaration".
- Measured: all three `.github/workflows/ci.yml` jobs pin `node-version: 22` — and pass. Either the floor is wrong or CI runs an unsupported runtime; the wb-cax.20 drift guard covers the support-matrix table, not ci.yml.

**3. C201 (PACKAGING-003) — "No GitHub CI" vs three maintained jobs.**
- Promise: two shipped docs assert "No GitHub CI".
- Measured: `.github/workflows/ci.yml` defines three actively-maintained jobs; the feature-matrix row carrying the claim contains its own 2026-10-18 correction describing ci.yml edits (wb-zsv.8).

**4. C209 (PACKAGING-011, SUPPORTED) — the feature matrix misstates its own freshness.**
- Promise: matrix header "Measurement date: 2026-10-15 … HEAD at this ledger export: 1e4102f".
- Measured: individual rows carry re-measurements as late as 2026-11-06 (W11 "re-measured 2026-11-06 at trunk 600a253 by wb-j5y5"); W01's caveat still lists wb-cax.2 as in_progress although qa/workbench/install-minimal.mjs landed 2026-10-17 and passes today.

**5. C216 (PACKAGING-018, PLAUSIBLE) — registry media point at upstream master.**
- Promise: manifest `pi.video`/`pi.image` present as this package's registry-page media.
- Measured: they reference `github.com/tintinweb/pi-subagents/raw/master/media/*` while `media/` is npmignored — a published fork artifact would render upstream's demo video/screenshot.

## B. Feature-matrix / status-ledger rows vs landed code

**6. C110 (INSPECTOR-017) — stale in both directions.**
- Promise: matrix lists W21-E tool-reply and W21-G line-diff receipts as "planned … No code or tests exist for these"; W15 rows name wb-6ze.16/.24/.26/.30 as in_progress or open.
- Measured: both W21 items landed (wb-9x5.5 closed 2026-10-16, wb-9x5.8 closed 2026-10-15) and their benches pass at the pin; all four W15 beads are closed. Meanwhile the real landed-but-unwired gaps (panes, ASCII, freshness) appear nowhere in the matrix.

**7. C161 (NODE-RPC-006) — fail-closed resume reported unlanded.**
- Promise: matrix rows (lines 63, 118, 121, 207, 218): wb-tu1 fail-closed resume is "in-progress, nothing landed on trunk; trunk is fail-open".
- Measured: the fix is landed on the pin (merge d09092a8 of 0fd665b7) and the runtime fails closed (probed).

**8. C081 (FURNACE-006) — "SDK has no lifecycle events" while the vendored SDK ships them.**
- Promise: furnace-observer.ts header + matrix W09 row 96 caveat: "Native lifecycle cursor unavailable in the installed SDK — bounded polling only"; the reading hard-codes `stream:{runLifecycle:'unavailable', cursor:'unavailable'}`.
- Measured: the vendored @furnace/sdk 0.1.0 exposes `Events.list(runId,{after,limit})` and `Events.follow`; the live CLI returned a Run's 18 lifecycle events `complete:true` with a cursor field.

**9. C121 (INTEROP-008) — W11 row describes a tree that no longer exists.**
- Promise: W11 row "beads only, no code, nothing in progress"; program pages 01-04 list the detached empty-grants path and worktree loss as open defects and cite specific line ranges.
- Measured: the seam modules are landed; the cited line ranges now hold other code; page 02's example action grant is rejected by the shipped grammar; page 04's ownership map omits every landed seam.

**10. C192 (OBSERVE-018) — the ledgers lag the code for a whole family.**
- Promise: AGENTS.md calls the Workbench "proposed" and its APIs "planned"; the matrix says no workflow_control tool is registered and the observe reply builder is in progress; docs/workbench/09 promises a configurable hot window and an optional disk cache for reattachment; docs/workbench/11 and a src/index.ts comment say the forge cancel leg is a typed unavailable refusal.
- Measured: workflow_control is registered and answers; the observe reply builder ships; no hot-window setting or disk cache exists; the forge cancel leg behaves otherwise (probed).

## C. README / docs behaviour claims vs probes

**11. C162 (NODE-RPC-007) + C146 (JOURNAL-013) — replay documented as absent, but it happens.**
- Promise: docs/workflows.md:13 "The Claude backend does not replay cached agent calls at all until effective configuration digests exist".
- Measured: the Claude host replays settled agent answers whenever the recorded replayBasis matches (probed; C136 shows when it silently cannot).

**12. C146 (JOURNAL-013) — resume documented same-session-only, measured otherwise.**
- Promise: docs/workflows.md:116, :409 and src/workflow/task.ts:305-311 say resume is same-session only; the model-facing description says the journal is "beside its script".
- Measured: after a session switch the old run id resumes while workflow_reconcile refuses the same id; for a scriptPath run the journal is elsewhere and no tool output names where; README never mentions workflow_reconcile at all.

**13. C062 (EXECUTE-013) — the master switch does not switch.**
- Promise: README.md:688 — `workflowsEnabled: false` is "the master switch for scripted workflows"; the model "cannot call it".
- Measured: with `workflowsEnabled:false`, workflow_execute stays registered; an embedded launch is refused with a bare 'Workflows are disabled in this session.'; a detached launch **runs** (`ok:true, status:"launched"`).

**14. C002 (AGENTS-002) — both documented agent-disable paths fail open.**
- Promise: `disableDefaultAgents: true`, or `enabled: false` on general-purpose, remove the all-tools agent.
- Measured: a caller-supplied unknown or disabled subagent_type still launches a child holding bash/edit/write through a hard-coded fallback tier; only the separate `fallbackSubagent:"none"` closes it.

**15. C006 (AGENTS-006) — "fail loudly" diagnostics are shown to no one.**
- Promise: README says `tools-error:` / `extension-error:` make typos "fail loudly".
- Measured: they are emitted as fake tool-activity 'end' events that no surface renders; their only effect is inflating the agent's tool-use count.

**16. C003 (AGENTS-003) — the documented headless mention path does nothing.**
- Promise: README.md:195 — `pi -p '@plan the migration'` "clones, spawns, and reports through the normal completion path".
- Measured: under stock print-mode semantics the mention produces 0 model calls, 0 spawned agents, empty parent output; default background spawns are aborted at dispose before one model call.

**17. C067 (EXECUTE-018) — the token-cost knob skips the biggest tool.**
- Promise: README.md:694 scopes `toolDescriptionMode` as the remedy "for small/local models where tool-spec tokens are expensive".
- Measured: compact mode shrinks only the Agent description (6,368 -> 1,514 B); the 22,095-byte SubagentWorkflow description is sent in full in every mode (52% of the registered tool surface).

**18. C151 (JOURNAL-018, SUPPORTED) — the off-disk setting leaves the journal on disk.**
- Promise: a documented setting exists for keeping run output off disk for backup/DLP tooling.
- Measured: the workflow journal records every agent's full answer for every run, has no off switch, and the setting's documentation does not mention it.

**19. C248 (SCHEDULING-001) — documented schedule grammar, undocumented ceiling.**
- Promise: README.md:95-96 documents interval format (e.g. `2d`) with no maximum.
- Measured: any interval/relative above 2^31-1 ms (~24.8 days) fires immediately (intervals: every ~1 ms, bypassing maxConcurrent) while the reply reports `Next run:` 30 days ahead.

## D. Tool descriptions / schemas vs measured tool behaviour

**20. C011 (AGENTS-011) — schema text inverts the real precedence.**
- Promise: `thinking` described as "Overrides agent default"; `max_turns` "Omit for unlimited (default)".
- Measured: a pinned agent ignores the caller's thinking, max_turns, isolated and run_in_background; a project defaultMaxTurns cuts an agent off even when the model omitted max_turns as told; the reply never says what was ignored.

**21. C012 (AGENTS-012) — status wording contradicts itself.**
- Promise: a queued spawn reply advertises steer_subagent; result headline formats promise consistency.
- Measured: steer_subagent refuses queued agents; get_subagent_result prints a queued agent as `Duration: 0.0s (running)` with body `No output.`; a turn-limited run is headlined `Agent completed … (aborted …)`; "output is above" when it is printed below; a stopped queued agent fires no completion callback.

**22. C053 (EXECUTE-004) — completion guidance wrong in both host modes.**
- Promise: description/reply point detached callers at workflow_observe; embedded text says "never completion: observe the launch through workflow_observe".
- Measured: detached — workflow_observe answers 'Workflow unavailable in this local operator/session/workspace scope.' for the returned invocationId and no completion notification ever arrives (workflow_detached {action:'inspect'}, which works, is named nowhere); embedded — a `<task-notification>` with the result arrives by itself while workflow_observe polls carry status but no result value.

**23. C061 (EXECUTE-012) — the stated grants are not the needed grants.**
- Promise: description — "Requires the exact workbench:execute grant; detached additionally requires workbench:detach".
- Measured: a detached launch with exactly those two is refused — 'Claude requires explicit claude:invoke grant (auth is SDK-owned and separate).' — even for a script that calls no agent; adjacent steps need further grants (workbench:design, workbench:observe) the description never mentions.

**24. C063 (EXECUTE-014; SAME_ORIGIN INTEROP-004) — three kinds advertised, one launches.**
- Promise: schema `kind: {"anyOf":[{"const":"script"},{"const":"function"},{"const":"furnace-formula"}]}`.
- Measured: function and furnace-formula are refused with 'only script definitions launch in this host' (no host that would is named); no discovery tool can produce such a reference; the backing modules (source-admission.ts 510 lines, function-authority.ts 370 lines) have no importer in src; the parameter schema carries no description at all.

**25. C055 (EXECUTE-006) — `policy` echoed as honoured, applied by nothing.**
- Promise: the policy parameter is validated, bounded and echoed back in the reply.
- Measured: a launch with `policy {dryRun:true, maxAgents:1, timeoutMs:5}` starts the real workflow and returns ok:true with the policy echoed as if honoured.

**26. C163 (NODE-RPC-009) — advertised effort level the backend refuses.**
- Promise: description advertises effort 'minimal' as valid with no backend caveat; the Workbench paragraph says "Worktree isolation and gate refuse in this first cut".
- Measured: the Claude host refuses 'minimal' and the agent folds to null; gate is run-fatal (status failed, 'This workflow host cannot run gate commands.') while isolation is a per-agent null — the paragraph hides that asymmetry.

**27. C234 (PROVIDERS-018) — node() misstated three ways.**
- Promise: description advertises node() generally, names forge.gate.status, and says "errors fail the run".
- Measured: under the default Pi backend every node() call fails with 'This workflow host has no capability registry.' and no enablement hint; the other three capability ids are undiscoverable from the tool surface; a script can catch the typed error and continue.

**28. C235 (PROVIDERS-019) — a tool that misidentifies itself.**
- Promise: workbench_catalog's reply identifies the answering tool.
- Measured: its JSON carries `"tool":"workflow_catalog"` — the name of the separate saved-workflow catalog tool, which needs a different grant and answers in another shape.

**29. C239 (PROVIDERS-023) — "independently installable" providers that fail as a block.**
- Promise: docs/workbench/06-capability-registry.md:5 "Providers are independently installable; no required dependency on every SDK"; :38 "Provider package may be lazy loaded upon first authorized invocation" (WB-046).
- Measured: one unresolvable SDK package fails the whole native load, leaving all twelve Workbench tools unregistered; adding a fifth provider means editing at least five host modules that each spell the four ids.

**30. C033 (DETACHED-001) — cancel/shutdown advertised, denied by the launcher's own grants.**
- Promise: src/workbench/control.ts:36 and docs/workbench/11:14 advertise local-detached cancel/shutdown.
- Measured: both registered producers launch with permissions `[inspect,execute]`, so the host denies cancel/shutdown at the socket; the W13-G reader that would seed confirmed ownership (applyDetachedReading) is never wired in production.

**31. C049 (DETACHED-017, SUPPORTED) — a receipt field that can never carry information.**
- Promise: receipts/snapshots carry `nativeRuntimeIdentity`.
- Measured: the field is a hard-coded 'unsupported' literal while the landed executable-identity module (src/workbench/executable-identity.ts, 347 lines) is imported by nothing in src/.

**32. C182 (OBSERVE-007) — "event window, aggregates" are placeholders.**
- Promise: docs/workbench/11 promises an event window and aggregates in workflow_observe replies.
- Measured: aggregates is the constant 'not-wired' (although the projection serves a measured ancestor aggregate); the events block is a count-by-kind of the OLDEST rows of the whole scope, identical on every call, with no event id — so the schema's `after` cursor can never be built.

**33. C227 (PROVIDERS-011) — the contract label does not describe the producer serving it.**
- Promise: contractSource says rf@0.1.845; docs document the rf-preview live tier.
- Measured: the installed rf is 0.1.883 (38 patch versions ahead); 2 of the tier's 4 rows fail (release drift; five result keys beyond the captured roster); the runtime provider still admits the drifted envelope.

**34. C088 (FURNACE-013) — a documented verification tier nothing can satisfy.**
- Promise: docs/workflows.md:455 documents the native tier `forge run furnace-observe`.
- Measured: the tier's test hard-codes formula 'external-inspect'/state 'completed' while the product's own launcher produces formula 'vc4-external' held active — the tier fails 2/13 against the product's own fixture; no shipped launcher or recipe satisfies it.

**35. C172 (NODE-RPC-018) + C115 (INTEROP-001) — the change ledger and the skill lag the program.**
- Promise: CHANGELOG speaks for the package; AGENTS.md says "once Workbench mode is implemented"; the pi-mechanical-interop skill's 'Actual current state' describes the trunk.
- Measured: CHANGELOG carries one Unreleased sentence for the whole Workbench program (node(), capabilityGrants, workflow_reconcile, fail-closed resume, replay basis unnamed); the skill's line 15 states a defect the trunk fixed two hours after the skill landed and names none of the four landed MWI seams.

**36. C021 (AGENTS-021) — a scope check that accepts what it cannot enforce.**
- Promise: Scope models (`enabledModels`) restricts the models an agent may use.
- Measured: a list written with globs, bare ids or `:thinking` suffixes turns the check into a silent no-op; a mixed list refuses the models the glob allows while printing an 'Allowed models' list that omits them.

---

*Related but not listed here:* the pure documentation-absence findings (undocumented tools, grants, caps and formats — e.g. C045, C157, C173, C203, C264's README gap) are gaps rather than contradictions and are tracked in CLAIMS.jsonl / REMEDIATION.md under `docs-fix` and `tool-spec-text`.
