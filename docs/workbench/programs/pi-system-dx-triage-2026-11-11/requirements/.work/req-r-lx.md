# R-lx atomic requirements — EAT-R311..R340

Scope: the LX / tool-reply ergonomics / discoverability cluster of the 2026-11-11 Pi-subagents system DX/UX/LX epistemic-adversarial-triage — reply envelopes, refusal actionability, installed-docs sufficiency and token budgets across the **agents, execute, observe and interop** families. Claim verdicts are FINAL at pin **ce180d82** (worktree `pin-ce180d82`, @tintinweb/pi-subagents v0.20.0 fork); master 0fb90672 drift is recorded in `EPISTEMIC-AUDIT.md`. An implementation MUST re-pin; these requirements certify no shipment. Every cited claim is ESTABLISHED (reproduced at the pin, command+output quoted in CLAIMS.jsonl) unless a narrower SUPPORTED sub-part is named; rationales never state more than the cited grade.

Evidence vocabulary (continues the prior triages' tiers): **V0** static census at the pin; **V1** focused red/green at module/seam level (mutant where stated); **V2** fresh packed/installed consumer (npm pack / install-smoke shape); **V3** the actual registered Pi tool driven through the booted extension — the probe suites under `probes/<family>/` are the existing oracles and every criterion names its probe; **V4** joined native producer CLIs; **V5** restart/fault/load. A property proved only at V1 that has a registered-path closure condition remains open until V3 (EAT-R265 lineage).

Positives no cure may regress (CLAIMS.jsonl `kind:"positive"`): C027 strict-dispatch refusal listing available types, C028 broken-agent-file containment, C029 background-resume refusal wording, C030 compact Agent description honesty, C073 script-runtime API-misuse messages, C074 SubagentWorkflow's 279-byte launch reply, C194 exact byte caps with flagged truncation, C195 typed cursor refusals, C196 workflow_control's single tool-reply/v1 dialect, C197 in-turn invocation addressability, C198 compare's refusal to manufacture results. Requirements name these where the regression risk is direct.

Maps-to vocabulary: feature family, then any open live bead the obligation extends (wb-69g.12, wb-752.13, wb-h8f.7, wb-9x5.11, wb-79k.3, wb-6ze.15, wb-0kg.3, wb-yiu4; lineage: wb-9x5.16 closed 2026-11-11 and consolidated into wb-9x5.11, wb-79k.1/.2 closed and consolidated into wb-79k.3 — closed ids are provenance, never filing targets). A named bead means the obligation extends or must not break that bead's scope, never that the bead already covers it. MNI packets (P00–P10) and prior EAT-R001..R310 identifiers are provenance lineage only; prior text remains historical.

## EAT-R311 — Agent-family refusals and failures MUST be flagged as errors

- Type: BEHAVIORAL
- Authority: EMPIRICAL_REPAIR
- Statement: Every top-level Agent, steer_subagent and get_subagent_result reply that reports a refusal or a failed run MUST carry the tool-result error flag.
- Rationale: Refusals ("Model not found", "Agent not found", unknown type under strict dispatch, "Agent failed: …") return isError unset, so retry/telemetry logic and the host UI count them as successes, while the nested variants of the same tools flag theirs. Audited basis: C009 ESTABLISHED; C001 ESTABLISHED (the success-shaped resume failure is one instance).
- Acceptance criteria:
  1. Assert via `probes/agents/RUN.sh p02-reply-dialect.probe.test.ts` (registered tools) that the unknown-type, model-not-found, agent-not-found, steer-refused and `Agent failed:` replies all carry isError:true (checks.anyIsErrorTrue flips to allIsErrorTrue).
  2. Assert the golden spawn/result paths in the same probe keep isError unset or false (positive control; no refusal text changes required by this requirement).
  3. Assert top-level and nested variants of the same three tools agree on the flag for the same refusal class.
- Evidence tier target: V3 (registered-tool probe oracle).
- Conditions/unknowns: Refusal wording itself is governed by EAT-R313..R315; preserve C027/C029 texts.
- Maps-to: agents tool surface; no existing live bead (new).

## EAT-R312 — A blocking resume of a live agent MUST refuse without corrupting the record

- Type: BEHAVIORAL
- Authority: EMPIRICAL_REPAIR
- Statement: Agent({resume:<id>, run_in_background:false}) against a running or queued record MUST be refused exactly as the background path refuses it, leaving the live run untouched.
- Rationale: The foreground path bypasses the running/queued guard: it returns pi's internal error text as a success, flips the live record to status error (steer/stop then skip it), and a follow-up get_subagent_result marks the result consumed so the real answer is never notified. Audited basis: C001 ESTABLISHED (the nested-tool propagation and nested-children abort leg SUPPORTED at src/agent-manager.ts:1229, src/nested-tools.ts:189); the guarded background contrast is C029 ESTABLISHED (positive).
- Acceptance criteria:
  1. Assert via `probes/agents/RUN.sh p05-resume-and-mention.probe.test.ts -t R1` that the foreground resume of a running agent returns the C029-class refusal (isError:true per EAT-R311) and the record keeps status:"running" with manager.hasRunning()===true.
  2. Assert steer_subagent and stop still reach the live run after the refused resume, and its real completion fires exactly one subagent notification carrying the real result with resultConsumed:false until read.
  3. Assert the guard lives in AgentManager.resume() (not only the tool branch) so the nested Agent tool's resume path refuses identically.
- Evidence tier target: V3.
- Conditions/unknowns: The out/p13 background-refusal receipt is the wording baseline; byte-identical wording preferred.
- Maps-to: agents; no existing live bead (new).

## EAT-R313 — Spawn replies MUST state the launched agent's effective identity and parameters

- Type: REPRESENTATION
- Authority: EMPIRICAL_REPAIR
- Statement: Every spawn reply (background and foreground) MUST state the effective type key, handle and id, and MUST disclose each value the host adjusted away from the request (resolved model, renumbered name, agent-file-pinned parameter), in a form the follow-up tools accept.
- Rationale: Replies print a display name as `Type:` (not a valid subagent_type), never state handle or alias, and the foreground reply carries no id; `resume` rejects the handle the sibling tools accept. Fuzzy model resolution substitutes silently; a taken `name` is renumbered silently and keeps resolving to the earlier agent; frontmatter silently outranks caller parameters while the schema text claims the opposite. Audited basis: C010 ESTABLISHED, C008 ESTABLISHED, C007 ESTABLISHED (disclosure leg), C011 ESTABLISHED.
- Acceptance criteria:
  1. Assert via `probes/agents/RUN.sh p02-reply-dialect.probe.test.ts -t 'E1|E2'` that background and foreground replies carry `Type: <type key>` (a valid subagent_type), `Handle: @<handle>` (alias included when derived from `name`), and the id in the foreground headline; and that Agent({resume:<printed handle>}) resolves through the same reference vocabulary with wording separating "unknown" from "evicted".
  2. Assert via p01/p07/p03 probes that (a) a reply whose effective model differs from the requested string prints `Model: <provider>/<id>` (p01 fuzzyTable cases), (b) a renumbered name prints the allocated handle and get_subagent_result by that printed handle returns the new agent's result (p07 -t H1), and (c) a caller parameter overridden by an agent-file pin yields an `Ignored: <param>=<value> (agent file pins <pinned>)` line (p03 -t F2).
  3. Assert the `thinking`/`max_turns` schema descriptions are built from live settings and no longer claim caller precedence an agent file denies (p14-schema-vs-behaviour oracle).
- Evidence tier target: V3.
- Conditions/unknowns: Whether a taken name is refused instead of renumbered is a design choice; either outcome satisfies this requirement if disclosed and read-back-consistent.
- Maps-to: agents; no existing live bead (new).

## EAT-R314 — Model resolution MUST be bounded and its refusal ranked and small

- Type: BEHAVIORAL
- Authority: EMPIRICAL_REPAIR
- Statement: The Agent tool MUST NOT silently resolve a version-bearing or cross-provider model string to a different generation, and a model-not-found refusal MUST be a ranked shortlist, with "default"/"inherit" treated as omitted.
- Rationale: The 'all parts anywhere' tier maps `sonnet-4-1` (no such model) to sonnet-4-5 and swaps generations by provider availability with no trace (C007 ESTABLISHED); the refusal dumps the whole registry — 9,370 chars, ~2.3k tokens, repeated on filler values "default"/"inherit" which models emit for optional fields (C016 ESTABLISHED).
- Acceptance criteria:
  1. Assert via `probes/agents/RUN.sh p01-model-resolution.probe.test.ts` over this host's real `pi --offline --list-models` rows that a version token resolves only against contiguous id segments (or is refused), ties break newest, and no fuzzyTable case lands on a different generation without the EAT-R313 `Model:` disclosure.
  2. Assert the model-not-found reply carries at most 10 nearest matches plus a total count and is under 1,000 chars (p01 modelNotFoundReply assertion; today 9,370).
  3. Assert model:"default" and model:"inherit" behave as an omitted model (inherit the session model) at zero refusal cost (p02 -t E4 regression).
- Evidence tier target: V3.
- Conditions/unknowns: The exact shortlist size/ranking is a design choice inside the stated bound.
- Maps-to: agents; no existing live bead (new).

## EAT-R315 — Agent status wording MUST match the record and its advertised next step MUST work

- Type: BEHAVIORAL
- Authority: EMPIRICAL_REPAIR
- Statement: Reply and notification wording MUST agree with the record's status, the next-step tool a reply advertises MUST accept the agent in that state, and a compliant wrap-up on the last grace turn MUST NOT be reported as aborted.
- Rationale: A queued spawn reply advertises steer_subagent, which refuses queued agents; get_subagent_result renders a queued agent as `Duration: 0.0s (running)` / `No output.`; a turn-limited run is headlined `Agent completed … (aborted …)`; a queued background agent stopped by the user fires no completion callback (C012 ESTABLISHED). With graceTurns=1 every compliant wrap-up is labelled aborted (C013 ESTABLISHED).
- Acceptance criteria:
  1. Assert via `probes/agents/RUN.sh p03-frontmatter-and-diagnostics.probe.test.ts -t F5` (maxConcurrent:1) that a queued agent's reply advertises only verbs that accept the queued state (steer queues as manager.steer does, or is not advertised), and get_subagent_result renders "Queued — not started" with no running duration.
  2. Assert via `probes/agents/RUN.sh p16-grace-turn-offbyone.probe.test.ts` that a clean final answer on the last grace turn (graceTurns=1 included) is classified wrapped-up/steered, never aborted, and headlines match status (abort wording only on abort); the "output is above/below" note points the right way.
  3. Assert a queued background record aborted by the user fires onComplete so the orchestrator is notified.
- Evidence tier target: V3.
- Conditions/unknowns: README's "up to 5 grace turns to finish cleanly" stays true under the fix (doc re-check at cut).
- Maps-to: agents; no existing live bead (new).

## EAT-R316 — Spawn-time capability degradation MUST be surfaced to operator and model

- Type: INSTRUMENTATION
- Authority: EMPIRICAL_REPAIR
- Statement: A spawn that degrades the agent's requested capabilities (tool/extension typo, missing or rejected skill) MUST surface a warning in the reply/notification and operator UI, and a preloaded skill block MUST be usable (headed by its directory, frontmatter stripped).
- Rationale: `tools-error:`/`extension-error:` diagnostics are emitted as fake tool-activity events no surface renders and inflate the tool-use count (C006 ESTABLISHED); a missing or symlinked skill injects a "(Skill … not found…)" block with no warning, found skills inline YAML frontmatter, and the block names no directory so relative references/*.md links are unopenable (C017 ESTABLISHED).
- Acceptance criteria:
  1. Assert via `probes/agents/RUN.sh p03-frontmatter-and-diagnostics.probe.test.ts -t F1` that a tools:/extension typo yields a ctx.ui.notify warning plus a `Warnings:` line in the Agent reply and notification, and record.toolUses counts no diagnostic events.
  2. Assert via `probes/agents/RUN.sh p04-skills-memory-prompt.probe.test.ts -t 'S1|S2'` that a missing skill and a symlink-rejected skill each produce a reply-visible warning with distinct wording naming the skill, and no bare not-found block is the only signal.
  3. Assert a found skill's preload block is headed with the skill's base directory and strips YAML frontmatter (p04 promptChecks promptHasBaseDirLine:true, startsWithYamlFrontmatter:false).
- Evidence tier target: V3.
- Conditions/unknowns: An index-only preload mode (C017 cureHint) is optional design, not required here; preserve C028 containment.
- Maps-to: agents; no existing live bead (new).

## EAT-R317 — Skill preload MUST search the shared install root and refusals MUST name the searched roots

- Type: BEHAVIORAL
- Authority: EMPIRICAL_REPAIR
- Statement: Pi's skill preload MUST include `~/.skills` among its roots, and the skill-not-found note MUST list the roots actually searched.
- Rationale: On this host the two audit-ordered instruments cannot be handed to a pi subagent by name: hyper-unix lives only in `~/.skills` (ten agent homes, no pi target) which pi does not search, and the not-found note names three roots without saying what was searched where. Audited basis: C018 ESTABLISHED. The rf-frontmatter and hx-install-target legs belong to the rf and hx repositories.
- Acceptance criteria:
  1. Assert via the host-fixture oracle (`probes/agents/host-skill-index-size.mjs` + p04 skill-preload probe against a fixture `~/.skills/<name>`) that `skills: <name>` resolves a skill installed only under `~/.skills`.
  2. Assert the not-found note enumerates every searched root (the fixture asserts the exact list).
  3. Assert pi's own skill index diagnostics remain intact for frontmatter-less entries (`description is required` still reported, not silently skipped).
- Evidence tier target: V3 (host fixture).
- Conditions/unknowns: Cross-repo cures (rf writes pi-loader-valid frontmatter and verifies with pi's loader; hx adds a pi install target) are routed to those repositories and are not acceptance criteria here.
- Maps-to: agents + ecosystem skills; no existing live bead in this repo (route-to-rf / route-to-hx feedback).

## EAT-R318 — Child prompt assembly MUST be token-bounded and deduplicated

- Type: BEHAVIORAL
- Authority: EMPIRICAL_REPAIR
- Statement: The child system prompt MUST carry at most one skills-index copy, and inherit_context MUST apply an explicit tail budget with a visible omission marker and a cost note in its parameter description.
- Rationale: Append-mode agents with default `skills: true` carry the skills index twice — including general-purpose, the fallback for every unknown type (C019 ESTABLISHED, ~740 tokens/spawn here). inherit_context forwards the whole parent transcript unbudgeted: a 150-exchange branch is a 367,344-char (~92k-token) preamble with no marker and no size hint (C026 ESTABLISHED).
- Acceptance criteria:
  1. Assert via `probes/agents/RUN.sh p12-context-and-skills-inherit.probe.test.ts -t K1` that an append-mode child's prompt contains exactly one skills-index occurrence (descriptionOccurrences===1 for general-purpose).
  2. Assert via `p12 -t C1` that the forked preamble is capped at a configured tail budget with an explicit `[earlier turns omitted]` marker when truncated, and the inherit_context schema description states the budget.
  3. Assert the budget is a documented setting with its default stated in README/settings reference.
- Evidence tier target: V3.
- Conditions/unknowns: The default budget value is a normative choice (risk-control flavored); the obligation is that a bound and marker exist and are disclosed.
- Maps-to: agents; no existing live bead (new).

## EAT-R319 — Background completion delivery MUST identify the agent and have a configurable budget

- Type: BEHAVIORAL
- Authority: NORMATIVE_DECISION
- Statement: The background completion notification MUST name the agent's type and handle and carry the transcript path once, and the result-preview budget MUST be a setting whose truncation note names the retrieval tool; get_subagent_result MUST accept several ids in one call.
- Rationale: Background is the default and any substantial result costs one extra get_subagent_result round trip per agent (three for the recommended fan-out): previews are hard-coded 500/300 chars, the notification omits type and handle and prints the path twice. This is documented design (README:78), so the authority is an experience-standard decision, grounded in C015 ESTABLISHED.
- Acceptance criteria:
  1. Assert via `probes/agents/RUN.sh p07-names-and-notifications.probe.test.ts -t N1` that the notification names agent type and handle and carries the transcript path exactly once.
  2. Assert the preview budget is a documented setting (no hard-coded 500/300), the default delivers results up to the documented bound, and the truncation note names get_subagent_result.
  3. Assert get_subagent_result accepts a list of ids and returns each agent's result in one reply (fan-out case: 3 agents, 1 call).
- Evidence tier target: V3.
- Conditions/unknowns: Default budget value is a product decision; README:78 must be re-trued with the chosen default.
- Maps-to: agents; no existing live bead (new).

## EAT-R320 — Agent authoring and the live type list MUST be discoverable in-band

- Type: REPRESENTATION
- Authority: EMPIRICAL_REPAIR
- Statement: The advertised subagent type list MUST reflect agents registered mid-session, and a bounded authoring reference for agent files MUST ship and be named in the Agent tool description.
- Rationale: An agent file created during a session can be spawned but is never advertised (spec list frozen at registration), the description names no frontmatter field, and the only shipped reference is the 105 KB README — so a model told to "make a reviewer agent" must guess the format that AGENTS-005 shows is silently mis-parsed. Audited basis: C024 ESTABLISHED.
- Acceptance criteria:
  1. Assert via `probes/agents/RUN.sh p11-disable-and-fallback.probe.test.ts -t mid-session` that after a mid-session agent file is written, refusals, fallback notes and the advertised type surface include it (live list, not frozen).
  2. Assert a ≤2 KB authoring reference (frontmatter field/enum table, generator-template parity) ships in the package and the Agent description names it.
  3. Assert the reference's field table matches the loader's accepted keys (census against the frontmatter parser's key table).
- Evidence tier target: V3 (criterion 1), V2 (criteria 2–3, packed artifact).
- Conditions/unknowns: Whether the live list updates the registered schema or only refusal/fallback text is a host-API-bounded design choice; disclosure somewhere in-band is the obligation.
- Maps-to: agents; no existing live bead (new).

## EAT-R321 — The workflow launch reply MUST orient the model truthfully per hostMode

- Type: REPRESENTATION
- Authority: EMPIRICAL_REPAIR
- Statement: The workflow_execute reply and description MUST state the true completion path for the launched hostMode and name the tool that can actually read the run, without echo ballast, under one id vocabulary.
- Rationale: Detached: description and reply point to workflow_observe, which answers "Workflow unavailable in this … scope." for the returned invocationId, while the working tool (workflow_detached {action:'inspect'}) is named nowhere; embedded: the description denies the completion notification that in fact arrives (C053 ESTABLISHED). The reply spends 673–835 bytes mostly re-echoing the caller's definition and constant provenance, and the one identifier travels under five names across the family (C065 ESTABLISHED).
- Acceptance criteria:
  1. Assert via `probes/execute` real-extension suite (`./node_modules/.bin/vitest run --config ../probes/execute/vitest.probe.config.ts real-extension`, cases F_detachedGolden/A_goldenEmbedded) that the embedded reply carries a `next` member promising the notification ("do not poll") and the detached reply carries `next` naming `workflow_detached {action:"inspect", invocationId}`, and the description's completion sentences match the measured behaviour of each hostMode.
  2. Assert the success reply's model text is {ok, status, invocationId, hostMode, nativeRefs, next} with the definition/provenance echo moved host-side; reply bytes within 2x of SubagentWorkflow's 279-byte baseline (C074).
  3. Assert the reply documents invocationId as the taskId that workflow_observe/workflow_detached accept, and admission-stage refusals stay lean (execute-extra O_replyBytes: refusals decided after admission no longer carry the ~400-byte ballast).
- Evidence tier target: V3.
- Conditions/unknowns: A completion notification for detached runs launched this session is optional design (C053 cureHint); sibling acceptance wb-0kg.3 (detached reattach receipt) must keep passing.
- Preserves: C074 ESTABLISHED (positive: SubagentWorkflow's 279-byte launch reply, the baseline criterion 2 reads) — a preservation control, not derivation basis.
- Maps-to: execute; extends wb-69g.12 (validate/execute reply falsifiers — redacted invocationId invariants must hold on the new reply shape).

## EAT-R322 — Script errors MUST carry their location and an actionable hint

- Type: BEHAVIORAL
- Authority: EMPIRICAL_REPAIR
- Statement: Every workflow script syntax or runtime error surfaced to the author MUST carry the first `workflow.js:<line>` frame, and Node-API misuse MUST carry a one-line capability hint.
- Rationale: Across 45 failing probe cases through the real runWorkflow, zero error texts name a line; the worker computes an author-accurate stack and the host drops it; workflow_validate's SCRIPT_SYNTAX is message-only; `setTimeout is not defined` carries no "no Node APIs in workflow scripts" hint. Audited basis: C056 ESTABLISHED.
- Acceptance criteria:
  1. Assert via the `probes/execute` script-runtime suite that withLocation === withError over the 52-case corpus (every syntax and runtime error text carries `workflow.js:<line>` from message.stack, lineOffset applied).
  2. Assert ReferenceErrors on require/process/fetch/setTimeout/import append the no-Node-APIs hint, and the node() no-registry message names `workbench.workflowAgentBackend: "claude"`.
  3. Assert workflow_validate's SCRIPT_SYNTAX diagnostic carries the same line/column.
- Evidence tier target: V3.
- Conditions/unknowns: none beyond the preservation control below.
- Preserves: C073 ESTABLISHED (positive: API-misuse messages are already specific and self-correcting) — a preservation control, not derivation basis.
- Maps-to: execute; no existing live bead (new).

## EAT-R323 — A syntactically invalid definition MUST be refused at launch

- Type: BEHAVIORAL
- Authority: EMPIRICAL_REPAIR
- Statement: Both launch tools MUST compile the script body (no execution) before scheduling and refuse a syntax-broken definition synchronously with a typed reason and line, instead of admitting it as launched.
- Rationale: A definition with a syntax error is admitted by workflow_execute as ok:true/'launched' and by SubagentWorkflow as 'started in the background'; the error arrives a turn later as a background failure — while the code comments justify the synchronous meta-error path precisely to avoid that wasted turn. Audited basis: C057 ESTABLISHED.
- Acceptance criteria:
  1. Assert via `probes/execute` execute-misc S_validatePreflight that workflow_execute refuses the broken definition synchronously with typed code `definition-syntax-invalid` carrying the line (no ok:true, no background run created).
  2. Assert via script-runtime Q_toolLevel that SubagentWorkflow refuses the same definition synchronously (parity with its meta-error path), launchedInBackground:false.
  3. Assert the check compiles without executing user code (vm.Script construct only; probe asserts zero script side effects at admission).
- Evidence tier target: V3.
- Conditions/unknowns: None beyond pin drift.
- Maps-to: execute; no existing live bead (new).

## EAT-R324 — Admission refusals MUST name the violated rule, field and bound, and the schema MUST encode what admission enforces

- Type: REPRESENTATION
- Authority: EMPIRICAL_REPAIR
- Statement: Each workflow_execute admission rule MUST refuse with its own reason naming the field and bound, and the registered schema MUST carry the patterns, literal unions and property descriptions that admission actually enforces.
- Rationale: 'malformed execute request' answers at least five different mistakes (70 KB input over an unstated 64 KiB bound, extra definitionRef key, oversize id, …); 'unknown hostMode' lists nothing and the schema types hostMode as a free string; an upper-case digest gets a misleading reason; a stale digest does not say where the current one comes from; no property carries a description. Audited basis: C058 ESTABLISHED.
- Acceptance criteria:
  1. Assert via `probes/execute` execute-extra K_piValidation that the five probed mistakes yield five distinct codes/messages naming field and bound (e.g. "input exceeds 65536 bytes", "definitionRef has unknown key <k>"), and unknown-hostMode lists embedded|detached.
  2. Assert the registered schema types hostMode as a literal union, definitionRef with pattern `^sha256:[0-9a-f]{64}$`, and every property described, so pi-ai validateToolArguments rejects what the tool would refuse wherever expressible.
  3. Assert source-unavailable/digest-mismatch refusals say "take definitionRef verbatim from workflow_catalog", and a saved-NAME-as-id mistake gets a typed refusal, not a raw ENOENT.
- Evidence tier target: V3.
- Conditions/unknowns: Redaction invariants on refused replies (wb-69g.12's Q3 Bearer probe) must hold for every new refusal string.
- Maps-to: execute; extends wb-69g.12.

## EAT-R325 — Advertised grants MUST equal the grants the journey needs

- Type: REPRESENTATION
- Authority: LINGUISTIC_INTEGRITY
- Statement: The workflow_execute description, its grant refusals and docs/workflows.md MUST state the full grant conjunction each journey actually requires, including claude:invoke and the per-step grants of the surrounding tools.
- Rationale: The description advertises workbench:execute (+ workbench:detach for detached), but a detached launch holding exactly those is refused "Claude requires explicit claude:invoke grant" even for an agent-less script; workflow_catalog needs workbench:design and observe/inspect need workbench:observe, mentioned nowhere. The working set is 5 grants against the 2 advertised. Audited basis: C061 ESTABLISHED.
- Acceptance criteria:
  1. Assert via `probes/execute` real-extension D_grants that a launch holding exactly the grants the description names succeeds, or every missing-grant refusal names every grant still missing (detachedWithExecuteAndDetach names claude:invoke explicitly).
  2. Assert docs/workflows.md carries a per-step grant table (design/catalog, execute, observe, detach, claude:invoke) matching measured enforcement (grep-census oracle over the pin's successors).
  3. Assert the alternative cure, if chosen (agent-less definitions run on the deterministic backend so claude:invoke is not needed), is reflected consistently in description, refusal and docs.
- Evidence tier target: V3 (criterion 1), V0 (criterion 2 census).
- Conditions/unknowns: Backend choice (claude-only registration today, src/index.ts:2684) is a design decision this requirement does not make.
- Maps-to: execute; no existing live bead (new).

## EAT-R326 — A compact SubagentWorkflow description MUST exist

- Type: NORMATIVE_DESIGN
- Authority: NORMATIVE_DECISION
- Statement: The host MUST offer a compact SubagentWorkflow tool description (selected by toolDescriptionMode or a dedicated setting) that preserves the API list, caps and one example at a small fraction of today's size.
- Rationale: The description is 22,095 bytes (~5.5k tokens) in every mode — 52% of the 42,339-byte Workbench tool surface; toolDescriptionMode:"compact" shrinks only the Agent tool, so the users it was documented for (small/local models) still pay full price; the only escape is disabling workflows. Audited basis: C067 ESTABLISHED. Experience standard: C030 ESTABLISHED (positive: the compact Agent description delivers what it claims) is the in-repo precedent.
- Acceptance criteria:
  1. Assert via `probes/execute` execute-extra L_tokenCost that under the compact selection SubagentWorkflow's descriptionBytes ≤ 4,096 while full mode retains current content.
  2. Assert the compact text still names the script API surface, the caps/bounds, and one worked example; moved patterns live in docs/workflows.md.
  3. Assert README's toolDescriptionMode text is re-trued to its new scope (today it scopes the setting to the Agent description only).
- Evidence tier target: V3.
- Conditions/unknowns: Exact compact budget is a product decision; ≤4,096 bytes is the acceptance bound chosen here.
- Maps-to: execute; no existing live bead (new).

## EAT-R327 — The installed documentation MUST cover the workbench journeys it ships

- Type: REPRESENTATION
- Authority: LINGUISTIC_INTEGRITY
- Statement: The published package MUST document each registered workbench tool's journey — launching a pinned definition (catalog → execute → completion per hostMode, grants, bounds) and the observe → control → compare loop with one worked call per tool — from text generated against the registered schemas.
- Rationale: workflow_execute appears in no operator document (0 mentions in README/CHANGELOG/docs/workflows.md; its three grants in none of the five candidate docs); an rf render of every installed passage naming the execute surface covers 2 of 17 needed facts (C064 ESTABLISHED). The tarball ships no skill/AGENTS.md, README names none of the twelve workbench tools, and the one signature list (docs/workbench/11, headed 'proposed') disagrees with the registered schemas on all three loop tools (C191 ESTABLISHED). Corroborating mapping basis (F-08, no statement expansion): C045 ESTABLISHED; C157 ESTABLISHED; C203 ESTABLISHED.
- Acceptance criteria:
  1. Assert over the packed artifact (npm pack --dry-run census, the probes/observe/out/K-npm-pack-dry.json oracle shape) that README or a shipped docs page names every registered workbench tool and carries the two journey sections with grant tables and bounds.
  2. Assert the tool-reference page is generated from the registered schemas with a drift test (generated text == shipped text), and docs/workbench/11's signatures no longer disagree with the registered schemas (drop 'proposed' or re-true).
  3. Assert every doc pointer shipped in the tarball resolves inside the tarball, and CHANGELOG names the workbench tool availability.
- Evidence tier target: V2.
- Conditions/unknowns: Master-only doc corrections (C117 context) must be folded rather than re-diverged; the doc census must key on content, not line numbers (C116 context).
- Maps-to: execute+observe docs; precedent lineage EAT-R290/EAT-R306 (prior text historical); no single live bead (new docs cut).

## EAT-R328 — Default observe pages MUST fit and honour requested selectors

- Type: BEHAVIORAL
- Authority: EMPIRICAL_REPAIR
- Statement: workflow_observe's defaults MUST be mutually consistent so a default page of a real host scope returns untruncated, an explicitly requested selector MUST never be silently dropped, and per-node key bytes MUST NOT repeat the scope constants.
- Rationale: With a real host scope, 20 Claude-session nodes overflow the 16,384-byte default, so every default page is truncated (17–19 of 20 returned) and requested relations/events are dropped first and never arrive; 27–30% of every node's bytes is a `key` string repeating workspace path and principal; the repo's own W21 bench agrees (552 of 553 replies truncated). Audited basis: C179 ESTABLISHED.
- Acceptance criteria:
  1. Assert via `probes/observe` i-defaults (I1) that a default request over the 20-node real-scope fixture returns all nodes with truncatedForBytes:false (defaults consistent: default limit × max node bytes ≤ default maxBytes).
  2. Assert a request with selectors relations/events either includes them or refuses/truncates naming the maxBytes that would carry them (dropped.* never silently true for an explicit selector).
  3. Assert node `key` no longer embeds the workspace path + principal per row (short per-reply index; nativeRef keeps provider/type/id), and the qa tool-reply bench's recorded truncated-rate for plain defaults is ~0.
- Evidence tier target: V3.
- Conditions/unknowns: none beyond the preservation controls below.
- Preserves: C194 ESTABLISHED (positive: byte cap exactness and flagged truncation) and C195 ESTABLISHED (positive: typed cursor refusals) — preservation controls, not derivation basis.
- Maps-to: observe; extends wb-9x5.11 (W21 receipts; it carries the W21-F2 honesty-bundle series this criterion reads). lineage: wb-9x5.16 (closed 2026-11-11, consolidated into wb-9x5.11; not a filing target).

## EAT-R329 — Freshness MUST distinguish a live embedded stream from a stale one

- Type: BEHAVIORAL
- Authority: EMPIRICAL_REPAIR
- Statement: A node the host is actively feeding MUST read freshness 'current', 'last-known-running + stale' MUST be reserved for genuinely stale/disconnected rows, and the freshness summary MUST agree with its own counters.
- Rationale: On embedded workflows a host-fed node is never 'current' — live streaming agents read 'unknown' (or 'stale' after a control receipt), freshness.current is always 0, healthy agents are reported 'last-known-running + stale', and the summary contradicts its counters ('3 last-known-running + stale … 0 stale'); a repo test pins the wrong wording for an honestly in-flight node. Audited basis: C180 ESTABLISHED.
- Acceptance criteria:
  1. Assert via `probes/observe` a-builder (A1) and b-registered (B2) that a streaming host-fed node reads freshness 'current' (the claude-transcript observer already asserts it) and freshness.current > 0 while agents are live.
  2. Assert 'last-known-running + stale' appears only for rows with a real gap/disconnect, and the summary sentence's counts equal the per-row counts.
  3. Assert the repinned repo test asserts the corrected wording (the old pin at test/workbench-pi-observe.test.ts:231-257 is updated red-first).
- Evidence tier target: V3.
- Conditions/unknowns: Lineage EAT-R243/R244 (separate axes, explicit unknowns) remains binding; the wb-79k.3 observe-wiring seams (lineage: wb-79k.1, wb-79k.2, closed and consolidated into wb-79k.3) feed the same projection and must stay consistent with the corrected vocabulary.
- Maps-to: observe; sibling wb-79k.3. lineage: wb-79k.1, wb-79k.2 (closed, consolidated into wb-79k.3; not filing targets).

## EAT-R330 — Cap evictions MUST be visible to the tool and eviction-spanning cursors MUST say so

- Type: INSTRUMENTATION
- Authority: EMPIRICAL_REPAIR
- Statement: When projection caps evict nodes or events, the workflow_observe reply MUST carry the dropped counts, event completeness MUST stop reading 'complete', and a cursor minted before an eviction in its viewport MUST be flagged or refused rather than silently skipping rows.
- Rationale: Node-cap eviction shrinks the total with all anomalies false; event-cap eviction retains 4096 of 4550 while completeness reads 'complete' and eventGap stays false; a pre-eviction cursor silently skips live rows — while the TUI inspector is told exactly what was dropped through projection.truncation(). Audited basis: C181 ESTABLISHED.
- Acceptance criteria:
  1. Assert via `probes/observe` a-builder A3/A4 that post-eviction replies carry droppedByCaps {nodes, events, maxNodes, maxEvents} equal to projection.truncation().
  2. Assert events.completeness reads 'partial-gap' (and anomalies.eventGap true) when the scope lost events to the cap.
  3. Assert via A5 that a cursor whose revision predates an eviction in its viewport is flagged or refused with a restart hint, and liveNodesNeverReturnedByTheWalk is empty on the recovery path.
- Evidence tier target: V3.
- Conditions/unknowns: Lineage EAT-R248 (gaps read as gaps); preserve C195 typed cursor refusals (new refusal joins that family).
- Maps-to: observe; no existing live bead (new).

## EAT-R331 — Status filters MUST be applied before paging

- Type: BEHAVIORAL
- Authority: EMPIRICAL_REPAIR
- Statement: workflow_observe MUST evaluate tone/kind selectors in the projection read so a filtered page is filled before it is returned, and the tone vocabulary MUST be documented where native node calls cannot match 'success'.
- Rationale: Tone and kind are applied after paging: locating one failed node among 2000 takes 50 calls (49 empty, ~34.6 KB, ~8.6k tokens) while the projection's own indexed query answers it examining 1 node; a successful native node call can never match tone 'success' because done maps to 'unknown'. Audited basis: C183 ESTABLISHED.
- Acceptance criteria:
  1. Assert via `probes/observe` a-builder A7 that tone:'failure' over the 2000-node fixture returns the failed node on page 1 with examined-work on the order of the match count, not the corpus (the bench's tone@16384 series collapses accordingly).
  2. Assert a filtered page is filled to its limit while matches remain (empty pages only when no matches remain).
  3. Assert the tone semantics for native node calls are documented in the selector description (or statusText becomes a selector), so 'success' filtering is either possible or stated impossible.
- Evidence tier target: V3.
- Conditions/unknowns: Preserve C194 byte-cap exactness under the pushdown.
- Maps-to: observe; extends wb-9x5.11 (bench records the series). lineage: wb-9x5.16 (closed 2026-11-11, consolidated into wb-9x5.11; not a filing target).

## EAT-R332 — Every workbench tool parameter MUST be described and typed to its real vocabulary

- Type: REPRESENTATION
- Authority: NORMATIVE_DECISION
- Statement: All parameters of the twelve workbench tools MUST carry a one-line description (value origin, default, bound), closed vocabularies MUST be literal unions with patterns on ids, and the observe/control/compare loop tools MUST each carry a short prompt guideline.
- Rationale: 0 of 74 parameters carries a description and no workbench tool has a prompt snippet, against 25 of 25 described parameters on the four upstream tools; workflow_observe exposes 19 undescribed properties (taskId pattern-less, cursor/after bare strings) and workflow_control takes provider/type/action as free strings though each is closed. The authority is the experience standard the repo itself sets upstream, grounded in C186 ESTABLISHED (and C058 ESTABLISHED for the execute schema, owed by EAT-R324).
- Acceptance criteria:
  1. Assert via `probes/observe` e-schema E1 that the described-parameter census reads 74/74 across the twelve workbench tools.
  2. Assert taskId carries a pattern, and provider/type/action (control) plus selector enums (observe) are literal unions matching the wired vocabularies.
  3. Assert workflow_observe, workflow_control and workflow_compare each carry a ≤2-line prompt guideline covering when to call it and that nativeRef feeds workflow_control.target.
- Evidence tier target: V3.
- Conditions/unknowns: Token cost of added descriptions must stay bounded (each ≤1 line; the census asserts presence, the bench watches reply/spec bytes).
- Maps-to: observe (all workbench tools); no existing live bead (new).

## EAT-R333 — Observe-loop tools MUST answer in one reply dialect

- Type: BEHAVIORAL
- Authority: EMPIRICAL_REPAIR
- Statement: workflow_observe and workflow_compare MUST return the workbench.tool-reply/v1 envelope on refusal (ok:false, status:'refused', error:{code,category,message}, isError set) as workflow_control already does, preserving today's message texts.
- Rationale: The three tools answer in three dialects: observe returns JSON on success but plain text with no code and no isError in all eleven probed refusal cases (with a doubled 'Invalid observe request: Observe request refused:' prefix), compare returns a bare object or plain text, control returns the typed envelope — an agent cannot branch on one field across the loop. Audited basis: C187 ESTABLISHED; C196 ESTABLISHED (positive: control is the model).
- Acceptance criteria:
  1. Assert via `probes/observe` b-registered B3 that all eleven observe refusal cases return the tool-reply/v1 error envelope with a stable error.code and isError:true, message text preserved and the doubled prefix removed.
  2. Assert via B5 that workflow_compare refusals and successes carry the same envelope contract (success keeps its result members under the envelope).
  3. Assert cross-tool key parity with workflow_control (same envelope members for the same outcome classes), pinned by a three-tool contract test.
- Evidence tier target: V3.
- Conditions/unknowns: furnace_observe's convergence on the same envelope is owned by wb-752.13; workflow_compare's builder adoption (byte cap, contract version) is owned by wb-h8f.7 — this requirement extends both to the refusal dialect and must not fork a second envelope.
- Maps-to: observe; extends wb-752.13 and wb-h8f.7.

## EAT-R334 — Control refusals MUST teach the next call

- Type: BEHAVIORAL
- Authority: EMPIRICAL_REPAIR
- Statement: workflow_control refusals MUST carry the data that makes the next call succeed: allowedActions for the target's provider on unknown-action, the required grant on observer-only, and a confirmation hint spelled as the tool's own schema parameter.
- Rationale: 'unknown action' never lists the provider's verbs (the description's first verb is invalid for a Claude session); observer-only names no grant; three of four provider grants are documented only in receipts; the confirmation hint names params.confirmed, a path the schema does not have — followed literally it loops, while `confirmed` is schema-optional yet required by all five wired verbs. Audited basis: C188 ESTABLISHED.
- Acceptance criteria:
  1. Assert via `probes/observe` b-registered B6 that unknown-action replies carry allowedActions for the target's provider, and observer-only replies carry requiredGrant.
  2. Assert the confirmation hint reads as the tool's own parameter ("set confirmed: true"), `confirmed` is required-or-described in the schema, and following the hint verbatim succeeds (loop test).
  3. Assert the provider control grants are listed in docs/workflows.md and the tool description (census oracle).
- Evidence tier target: V3.
- Conditions/unknowns: Preserve C196 (typed dialect, honest phases).
- Maps-to: observe; no existing live bead (new).

## EAT-R335 — The control reply MUST close the loop back to observe truthfully

- Type: BEHAVIORAL
- Authority: EMPIRICAL_REPAIR
- Statement: A control reply MUST name the owning workflow task to observe, receipts MUST append to the target node rather than overwrite its kind/evidence, and invoked MUST be false when no native verb was issued.
- Rationale: requested.invocationId is the tool-call id, not a workflow task id, and no member names the task to observe; recording a receipt overwrites the node's kind and evidence refs (kind-filtered observes lose it, the evidence loader loses the native ref) and marks it stale; a cancel refused before any native verb still reports invoked:true and rewrites an already-completed operation's row. Audited basis: C189 ESTABLISHED.
- Acceptance criteria:
  1. Assert via `probes/observe` c-control C2 that the control reply carries observe:{taskId} for the owning invocation and the tool-call id travels under a name that cannot be mistaken for a task id.
  2. Assert a control receipt is recorded as an appended event/ref: the node keeps its kind (selector kind still finds it) and prior evidenceRefs, with control refs appended.
  3. Assert a cancel refused before any native verb reports invoked:false, and a target already terminal reads "target already terminal" without rewriting the completed row.
- Evidence tier target: V3.
- Conditions/unknowns: Preserve C196 phase honesty and C194 byte caps.
- Maps-to: observe; no existing live bead (new).

## EAT-R336 — A failed node MUST carry its reason and a model-reachable evidence read

- Type: BEHAVIORAL
- Authority: EMPIRICAL_REPAIR
- Statement: Failure rows in workflow_observe MUST carry a bounded, redacted reason, and a grant-gated read MUST let an agent dereference one evidenceRef from an observe reply to the loader's bounded entry.
- Rationale: A failed node reads statusText 'error' with no reason and no evidence ref, although the runtime emits the reason and drops it at projection; where evidence refs exist, the evidence loader and Claude transcript reader are wired to the TUI only, so the agent re-runs or reads journal files from disk while the operator presses a key. Audited basis: C190 ESTABLISHED.
- Acceptance criteria:
  1. Assert via `probes/observe` b-registered B2 that each failed node row carries a bounded redacted reason beside statusText 'error' (the runtime's emitted error text, truncated under the existing label layout).
  2. Assert a registered, grant-gated surface accepts one evidenceRef from an observe reply and returns the evidence loader's bounded entry (same redaction class as the TUI path).
  3. Assert reply byte caps remain exact under the added members (C194 regression guard).
- Evidence tier target: V3.
- Conditions/unknowns: Whether the evidence read is a new tool or a workflow_observe mode is design; the TUI evidence view (wb-6ze.15 acceptance) must keep passing beside it.
- Maps-to: observe; sibling wb-6ze.15.

## EAT-R337 — Interop refusals MUST name the required authority and never demand a grant for an impossible request

- Type: BEHAVIORAL
- Authority: EMPIRICAL_REPAIR
- Statement: The interop admission chain MUST judge non-dispatchable definition kinds before grant conjunctions, and its authority refusals MUST carry the missing grant or the blocking contract pointer as structured members.
- Rationale: A function definition in detached hostMode is refused missing-detach-grant first, so the operator widens authority for a request that then refuses unsupported-definition-kind (C118 ESTABLISHED). The unadopted-contract refusal cites MW-CONTRACT, a token no shipped document defines, and the adopted-but-missing-grant refusal does not name the grant (C127 ESTABLISHED). The coordination boundary's grant, workbench:coordinate, appears in no document and its schema refusals say neither member nor rule (C122 ESTABLISHED).
- Acceptance criteria:
  1. Assert via `probes/interop/probe-execute-refusal` that a function-kind request in detached hostMode with execute-only grants is refused unsupported-definition-kind without demanding workbench:detach (or the detach-first message states the kind is not dispatchable in either hostMode), and the pinned order row at test/workbench-function-authority.test.ts:1683 moves with the chosen cure.
  2. Assert via `probes/interop/probe-authority.mjs` that the unadopted refusal carries a structured blockedOn member pointing at the tracking bead/doc, and missing-function-action-grant carries requiredGrant (parity with the sibling that already names workbench:execute).
  3. Assert via `probes/interop/probe-coordination.mjs` that coordination schema refusals carry the failing JSON-Schema keyword and schema path (producer-published text, no caller values), and workbench:coordinate is documented beside workbench:execute/workbench:detach (docs/workbench/12-security.md + the interop skill).
- Evidence tier target: V1 today (seam-level oracles); registered-path repetition owed at wiring per EAT-R265 lineage.
- Conditions/unknowns: The interop surface is test-only at the pin (C119 context, another cluster); these refusal contracts bind the seams now so the first wired caller inherits them.
- Maps-to: interop; MNI packets P03/P04; extends EAT-R204/EAT-R267 (prior text historical).

## EAT-R338 — MWI boundary refusals MUST carry the measured cause in accurate closed vocabulary

- Type: BEHAVIORAL
- Authority: EMPIRICAL_REPAIR
- Statement: Source-admission and collective-event refusals MUST carry the cause the boundary just measured as closed-vocabulary members, with reason labels that match the actual fault class.
- Rationale: Four different mid-wait changes all return bare source-changed; six distinct unmeasurable causes share one 'or'-list sentence; writer-held omits the holder; writes-not-requested omits the member name (C128 ESTABLISHED). The collective.event.v1 boundary labels over-length values 'text-malformed' and a present-but-overlong receipt ref 'receipt-missing', refuses schema-valid producer envelopes on undocumented Pi-only bounds, indexes no list entry, and names no recognized version (C129 ESTABLISHED).
- Acceptance criteria:
  1. Assert via `probes/interop/probe-source-admission.mjs` that source-changed carries the fresh measurement's own classification (changed: commit|tree|manifest or dirty counts), source-unmeasurable carries a six-value cause enum, writer-held names the holder invocation id, and writes-not-requested names allowWrites.
  2. Assert via `probes/interop/probe-collective.mjs` that byte-bound failures read over-limit (never text-malformed), a present-but-refused receipt reference reads receipt-malformed, list-entry failures carry the entry index, and version refusals carry an expected member with the recognized schema id.
  3. Assert the Pi-only bounds are documented beside the vendored schema (or the schema is re-ratified with the producer), so a schema-valid-but-refused envelope is explicable from shipped text.
- Evidence tier target: V1 (seam oracles); registered repetition owed at wiring.
- Conditions/unknowns: Raising bounds vs documenting them is a producer-facing decision; either closes criterion 3.
- Maps-to: interop; MNI packets P03/P08; extends EAT-R268 (refuse-before-writer retained).

## EAT-R339 — The installed package MUST be coherent about interop: discoverable or absent

- Type: REPRESENTATION
- Authority: LINGUISTIC_INTEGRITY
- Statement: The published artifact MUST either ship the interop feature's entry documents (skill and the files its shipped pages link) or stop shipping the program pages, and README MUST state function dispatch's availability status in one sentence.
- Rationale: The tarball ships the five seam modules and five program pages whose first instruction links the skill and AGENTS.md — both excluded by .npmignore; README does not mention the feature; no tool or command reaches the seams; the reviewed producer files the coordination boundary must read are not shipped. An agent working from the installed copy fails at step one. Audited basis: C130 ESTABLISHED. Corroborating mapping basis (F-08, no statement expansion): C213 SUPPORTED.
- Acceptance criteria:
  1. Assert over npm pack --dry-run (the probes/interop/npm-pack-dry-run.json oracle shape) that either no program page ships, or the skill plus every file a shipped page links ships beside them with the two known dead links fixed.
  2. Assert README states whether function dispatch is available and where its status lives (one sentence; content-keyed census, not line-keyed, per the C116 lesson).
  3. Assert the installed-docs LX scenario "discover interop from the installed artifact alone" (EAT-R290 shape, wb-yiu4's P10 scope) reaches its second step without reading repository source.
- Evidence tier target: V2.
- Conditions/unknowns: wb-yiu4 (P10) is blocked behind P08/P09 at the pin; this requirement narrows to packaging coherence and can land before P10 executes.
- Maps-to: interop packaging; MNI packet P10 / wb-yiu4; extends EAT-R290/EAT-R306.

## EAT-R340 — Seam modules MUST lead with a usage contract and refuse malformed calls typed

- Type: NORMATIVE_DESIGN
- Authority: NORMATIVE_DECISION
- Statement: Each MWI seam module MUST lead with a short call/return usage block ahead of its ledger prose, and boundary entry points MUST return typed refusals for malformed calls instead of raw TypeErrors, with file faults and digest mismatches split into their real classes.
- Rationale: About half of each MWI module is header prose in test-row dialect before the first signature (0.48–0.61 comment share; three headers total 38,445 bytes; one file exceeds the read-tool output limit), malformed calls escape as raw TypeErrors from boundaries that otherwise return typed refusals, producer throws propagate raw, and the descriptor boundary collapses three file faults and both digest mismatches into bare triples. The obligation is an adopted readability/robustness standard grounded in C131 ESTABLISHED.
- Acceptance criteria:
  1. Assert via the probes/interop comment-census oracle that each seam module's bytes before the first exported signature are ≤ a 10-line usage block ("call it like this / it returns"), with the pinned-row ledger moved below the code or into the suite header.
  2. Assert via the probe-descriptor section-4 cases that undefined loader/options return typed {field, reason:'wrong-type'} refusals and a producer throw is wrapped, never propagated raw.
  3. Assert unreadable splits into missing | not-a-file | permission-denied, and digest-mismatch exposes the measured digest as host-side detail (not model text).
- Evidence tier target: V1.
- Conditions/unknowns: Moving prose must not break the line-pinned docs-remediation census until that census is content-keyed (C116 context, owned elsewhere).
- Maps-to: interop; MNI packet P03; no existing live bead (new).

---

Coverage note: this cluster compiles the LX/tool-reply/discoverability conclusions of the four named families. Candidate claims deliberately left to sibling clusters: lifecycle/stop/restart and enumeration (C054, C062, C068, C178), fail-open switches and dispatch policy (C002, C022 pinning leg), result custody bounds (C014, C015's retention sibling C051/C052), headless hosts (C003, C050), and the stub/wire-landed-code families (C055, C063, C119, C182, C184, C185). C022's invisible mention-clone usage accounting and C193's silent bench are recorded here as uncompiled residue for the roll-up.
