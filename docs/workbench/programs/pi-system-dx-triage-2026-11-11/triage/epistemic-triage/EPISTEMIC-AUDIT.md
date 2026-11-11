# EPISTEMIC-AUDIT — Pi-subagents system DX/UX/LX triage (roll-up)

**Target:** @tintinweb/pi-subagents v0.20.0 fork (jehalladay/Pi-subagents), workbench trunk pin **ce180d82** (worktree `pin-ce180d82`); master 0fb90672 noted for drift. **Date:** 2026-11-11.
**Question:** where does the system's experienced surface fall short of its promises and of good agent/operator experience?
**Axes:** DX, UX, LX (LLM-agent experience), QoL, friction, gap, missing-req, stub.
**Instruments (user-ordered):** hx (HyperUnix 0.1.0) for typed code censuses; rf (ReactiveFiberCLI, 89 leaves) for context tooling and as the rf-provider probe target; family probe suites under `probes/` drive the real extension and the real producer CLIs.

## Method

Twelve family investigators (agents, detached, execute, furnace, inspector, interop, journal, node-rpc, observe, packaging, providers, scheduling) each produced graded findings (`.work/find-<family>.jsonl`, 274 rows) against the pinned worktree, with reproductions under `probes/<family>/` and builds/tests run only inside the pin. Every finding is a graded claim — **ESTABLISHED** (reproduced; command + output quoted), **SUPPORTED** (code-read with file:line), **PLAUSIBLE** (consistent, unverified), **UNDETERMINED** (missing artifact named). Consolidation merged the 12 files into `CLAIMS.jsonl` (stable ids C001..C267), deduplicated 7 cross-family duplicates (SAME_ORIGIN noted on the kept, better-evidenced row), and resolved one inter-investigator factual conflict by re-reading the pin.

## Ledger counts

| | |
|---|---|
| total claims | 267 |
| ESTABLISHED | 240 |
| SUPPORTED | 26 |
| PLAUSIBLE | 1 |
| UNDETERMINED | 0 |
| defects | 224 |
| positives (to preserve) | 43 |
| cross-family duplicates merged (SAME_ORIGIN) | 7 |

### Defects by axis

| axis | defects |
|---|---|
| LX | 64 |
| UX | 25 |
| DX | 23 |
| QoL | 7 |
| friction | 26 |
| gap | 52 |
| missing-req | 15 |
| stub | 12 |

### By family

| family | claims | ESTABLISHED | SUPPORTED | PLAUSIBLE | defects | positives |
|---|---|---|---|---|---|---|
| agents | 32 | 31 | 1 | 0 | 26 | 6 |
| detached | 17 | 11 | 6 | 0 | 15 | 2 |
| execute | 26 | 24 | 2 | 0 | 22 | 4 |
| furnace | 19 | 17 | 2 | 0 | 17 | 2 |
| inspector | 20 | 19 | 1 | 0 | 17 | 3 |
| interop | 19 | 19 | 0 | 0 | 17 | 2 |
| journal | 22 | 20 | 2 | 0 | 19 | 3 |
| node-rpc | 21 | 18 | 3 | 0 | 19 | 2 |
| observe | 22 | 21 | 1 | 0 | 17 | 5 |
| packaging | 18 | 11 | 6 | 1 | 13 | 5 |
| providers | 31 | 30 | 1 | 0 | 25 | 6 |
| scheduling | 20 | 19 | 1 | 0 | 17 | 3 |

## Headline defects (full dossiers in `dossiers/<id>.md`)

| # | claim | family | defect (one line) |
|---|---|---|---|
| 1 | **C001** ✪ | agents | Blocking resume of a running agent corrupts the live run: success-shaped error, record flipped to `error`, real result lost. |
| 2 | **C003** ✪ | agents | Stock headless semantics (`pi -p`) lose the default-background subagent entirely; `@mention` does nothing headless. |
| 3 | **C034** ✪ | detached | Symlinked `$HOME` (standard cloud-desktop layout) makes 100% of detached launches refuse with an unactionable message. |
| 4 | **C037** ✪ | detached | A detached run that completes with a >256 KiB value is reported `terminal:'failed'` with no result. |
| 5 | **C054** ✪ | execute | No model-facing tool can stop a launched workflow (embedded or detached); detached hosts linger ~200 MB up to 24 h. |
| 6 | **C062** ✪ | execute | `workflowsEnabled:false` leaves workflow_execute registered and detached launches running. |
| 7 | **C067** ✪ | execute | 22 KB (~5.5k-token) SubagentWorkflow description in every mode; `toolDescriptionMode:"compact"` skips it. |
| 8 | **C134** ✪ | journal | A Pi restart kills every run id while journal+script sit on disk; resume/reconcile/observe all refuse; restart advice re-runs dispatched effects. |
| 9 | **C136** ✪ | journal | Claude-backend replay silently never happens in repos >2,000 Git-visible paths (or outside Git); cap documented nowhere. |
| 10 | **C199** ✪ | packaging | README's install line installs upstream 0.23.2 — none of the documented workbench surface ships in any published artifact. |
| 11 | **C248** ✪ | scheduling | Schedules beyond ~24.8 days fire immediately; intervals become a ~1 ms spawn loop that bypasses maxConcurrent. |
| 12 | **C252** ✪ | scheduling | A corrupt schedule file is silently emptied and rewritten — user jobs destroyed, no diagnostic, no backup; a test pins it as "self-heals". |

### Second tier (no dossier, same review priority)

- **C050** (EXECUTE-001): the documented headless composition `pi -p --subagents-workflow-file=<path>` crashes the real pi CLI (exit 1, 'This extension ctx is stale…').
- **C002** (AGENTS-002): both documented ways to remove the all-tools general-purpose agent fail open through a hard-coded fallback tier.
- **C026** (AGENTS-026): `inherit_context` forwards the whole parent transcript unbudgeted — a 150-exchange branch is a ~92k-token preamble.
- **C264** (SCHEDULING-017): the persistent-memory prompt block is line-capped but not byte-capped — 200 long lines put ~4 MB into every memory-enabled agent's system prompt.
- **C051** (EXECUTE-002): a workflow return value beyond 4,000 chars is truncated in the completion notification and unrecoverable by any tool.
- **C014** (AGENTS-014): ten minutes after an agent finishes, record and full result are gone (get_subagent_result/resume/steer all fail).
- **C217** (PROVIDERS-001): `hyperunix.find` returns anonymous stat records — no file name or path in any row.
- **C096** (INSPECTOR-002): the inline transcript card never follows a background run under the pinned pi 1.1.0 (renderResult-only updates).
- **C076** (FURNACE-001): workflow_control's furnace leg is unreachable — nothing applies the landed relate/ownership wiring.
- **C179** (OBSERVE-004): workflow_observe's default request overflows its own 16,384-byte default on a real host scope (20 nodes), so every default page is truncated.
- **C138** (JOURNAL-005): the 'an override is spent, not kept' invariant is unenforced when the spend cannot be written (read-only journal ⇒ unlimited re-runs).
- **C178**/**C068** (OBSERVE-003/EXECUTE-019): no tool lists runs or invocations; a lost reply means duplicate launches; the only enumeration is an error side channel.
- **C033** (DETACHED-001): detached cancel/shutdown advertised but denied — launchers hard-code `[inspect,execute]` and the ownership reader is never wired.

## Cross-family patterns

**P1 — Switches and scopes fail open, silently.** The documented disable paths do not disable (C002 agents, C062 workflows), scope enforcement no-ops on accepted syntax (C021), agent-file frontmatter and settings drop unknown/wrong-typed keys without a word (C005, with several permissive-direction defaults; scheduling settings likewise, see C252's family and C260's timezone silence). An operator who configures restraint gets none and is not told.

**P2 — Results are bounded where it hurts and unbounded where it costs.** Every surface that carries a *result* clips or loses it: 500-char background previews (C015), 4,000-char completion truncation (C051), 256 KiB detached snapshot reported as failure (C037), 10-minute record retention (C014), restart-dead run ids (C134). Every surface that carries *input* to the model is unbounded: inherited context (~92k tokens, C026), memory blocks (~4 MB, C264), provider envelopes (9.3 KB to deliver 32 bytes, C237), hyperunix.find with no limit/projection (C219).

**P3 — Landed-but-unwired code is the dominant stub pattern.** The repo ships tested modules that production never calls: executable-identity (C049), source-admission/function-authority behind the advertised definition kinds (C063), furnace relate/ownership (C076), the three reader adapters (C225), latency/compare read models (C185), journal-compat classifier (C144), the detached ownership reader (C033/C054), two inspector presentation tiers (C107), the interop seams entire (C119), and the detached localProvider seam (C152). The REMEDIATION class `wire-landed-code` is the cheapest big win in the ledger.

**P4 — Refusals are success-shaped and undifferentiated.** Top-level failures return `isError` unset (C009, C001, scheduling C252-family refusals), 13 caller mistakes share one 'malformed reconcile request' string (C139), five execute admission failures share 'malformed execute request' (C058), schema refusals name no field (C156, C229), and the three workbench reply dialects disagree per tool (C187). An agent cannot branch on what it cannot distinguish.

**P5 — The installed surface is undiscoverable by the model it was built for.** Zero of the 12 workbench tools appear in README (C203); none of their 74 parameters carries a description (C186); 3 of 4 capability input contracts appear in no installed doc (C157) and are unreadable in-band (C220); required grants are undocumented (C173 claude:transcript, C085 furnace, C061's claude:invoke surprise); the published tarball ships pointer targets without the skills (C191, C045); scheduling's JSON keys are absent from README (C263). The LX axis is the largest defect bucket (64) for this reason.

**P6 — Token economics are hostile by default.** ~5.5k tokens of SubagentWorkflow description on every turn with no compact form (C067), a 2.3k-token model-list dump on any wrong `model` value (C016), provenance-dominated provider envelopes (C237, C091), and default observe pages that arrive truncated (C179).

**P7 — Headless and automation hosts are second-class.** The default spawn mode loses work under `pi -p` (C003), the documented workflow flag crashes the CLI (C050), the published hold contract still loses results (C052), and after any restart nothing can find or resume what ran (C134, C178, C068).

## Positives to preserve

These 43 claims pin behaviour that any cure must not regress; they are `kind:"positive"` in CLAIMS.jsonl.

**agents**
- **C027** (AGENTS-027): Strict dispatch works as documented: with fallbackSubagent:"none" an unknown or disabled type is refused before anything spawns, and the refusal lists the available …
- **C028** (AGENTS-028): A broken agent file never takes the session down and is named precisely.
- **C029** (AGENTS-029): The default (background) resume path refuses a running agent with the next step spelled out and leaves the live run …
- **C030** (AGENTS-030): The compact tool description delivers what it claims, and disabled features cost nothing in the spec.
- **C031** (AGENTS-031): Tool scope is advertised honestly and skill names cannot escape their roots.
- **C032** (AGENTS-032): The family's own suites are green at the pin, so the defects above sit in untested behaviour rather than in regressions: 18 files, 645 tests, all …

**detached**
- **C041** (DETACHED-009): Refusal and receipt craftsmanship worth protecting: the invocation-ID-conflict message names the reserved directory, states the never-reuse rule and the exact next step; the …
- **C042** (DETACHED-010): The core detached lifecycle machinery works end-to-end in this environment: launch handshake 1342 ms cold; reattach-inspect from a fresh process returns the live receipt; …

**execute**
- **C072** (EXECUTE-023): Positive: launches are pinned to the bytes and to the operator's current grants.
- **C073** (EXECUTE-024): Positive: the script runtime's own error messages for API misuse are specific and self-correcting.
- **C074** (EXECUTE-025): Positive: SubagentWorkflow's launch reply and lookup errors are the model to copy.
- **C075** (EXECUTE-026): Positive: the golden paths work.

**furnace**
- **C093** (FURNACE-018): POSITIVE: the read-only observation contract holds against a live controller and the stop adapter is phase-honest: the active tier passed (reading active/controllerLive yes; …
- **C094** (FURNACE-019): POSITIVE: producer pinning and untrusted-text discipline are right: every reading carries producerVersion/producerRevision/producerDigest that match the installed binary …

**inspector**
- **C112** (INSPECTOR-019): The three pure layouts are geometry-safe and injection-safe.
- **C113** (INSPECTOR-020): The dialog host stays far inside the 20 ms navigation target at the production caps, and the repo's scale receipts reproduce at the pin on a loaded host (load average …
- **C114** (INSPECTOR-021): The honesty affordances operators rely on are present and tested.

**interop**
- **C132** (INTEROP-019): The interop seams are sound where they are driven, and their contract bytes are current.
- **C133** (INTEROP-020): What the skill and the QA scripts do say about the present is accurate and cheap to check.

**journal**
- **C153** (JOURNAL-020): Within one Pi process the effect tripwire holds end to end: a non-read node is journaled before its provider acts, a resume that meets the unsettled marker or a settled …
- **C154** (JOURNAL-021): Decision records behave as designed on the normal path: an override buys exactly one re-run and the second resume refuses, a repeated acknowledgement is idempotent, ids are …
- **C155** (JOURNAL-022): An isolated agent's work survives the death of its process at every git step of preservation: the worktree stays registered with exact bytes after SIGKILL and after the next …

**node-rpc**
- **C174** (NODE-RPC-020): Node/RPC error ergonomics worth protecting: CapabilityError crosses the worker RPC with instanceof and category intact in the script realm; a script try/catch can handle it …
- **C175** (NODE-RPC-021): Claude-host contract behaviours worth protecting: structured-output mismatch reports the JSON path ('$.answer: must be string') and a missing structured_output is refused …

**observe**
- **C194** (OBSERVE-020): The byte cap is honest and exact: no reply exceeds the requested maxBytes, truncation is always flagged (truncatedForBytes plus droppedForBytes naming events, refusals, …
- **C195** (OBSERVE-021): Cursors and requests are refused typed and specifically, never repaired: a foreign-invocation, foreign-scope, malformed, oversize or ahead-of-revision cursor is refused …
- **C196** (OBSERVE-022): workflow_control speaks one typed dialect and keeps phases honest: every outcome is a workbench.tool-reply/v1 envelope with error.code and category, a missing grant names …
- **C197** (OBSERVE-023): The launch and completion messages keep the invocation addressable within the turn: SubagentWorkflow's reply states 'Task ID: wf_...' and the saved script path, the …
- **C198** (OBSERVE-024): workflow_compare refuses to manufacture a result: it never claims causation, names each confound by field and kind, reports a declared source change separately from a …

**packaging**
- **C206** (PACKAGING-008): POSITIVE: the packaging gate is evidence-grade and reproduces green: package-smoke packs TWICE asserting identical shasum+integrity (determinism), classifies every packed …
- **C207** (PACKAGING-009): POSITIVE: clean-external-consumer proofs pass for real: install-smoke (fresh consumer dir, npm install of the packed tarball, deep-import of the compiled runtime) and …
- **C208** (PACKAGING-010): POSITIVE: the vendored-SDK supply chain is checksum-true and the declared support matrix matches the lockfile exactly: sha256 of all three vendor tarballs equals the …
- **C211** (PACKAGING-013): POSITIVE: runtime invocation identity travels with the package and verifies in a clean consumer: installed-consumer.mjs captures+verifies an invocation identity whose …
- **C214** (PACKAGING-016): POSITIVE: AGENTS.md command documentation is live-true: `npm run check # (what CI runs)` matches ci.yml's build job step-for-step (re-trued by owner cut wb-zsv.8 on …

**providers**
- **C242** (PROVIDERS-027): Capability discovery for Claude roles is compact and staged: the tool list, the discover reply for four capabilities and an on-demand contract each cost under 1.6 KB, and …
- **C243** (PROVIDERS-028): Provider failures reach scripts as a typed, catchable CapabilityError (name, category, message) across the worker boundary, and schema or grant refusals are decided before …
- **C244** (PROVIDERS-029): The Furnace provider keeps the producer's own error code and sentence, which is the model the other three providers should …
- **C245** (PROVIDERS-030): The rf child runs under an allowlist-only environment and is reaped on deadline: an ambient variable did not reach it, and after the registry cut the call the child was gone …
- **C246** (PROVIDERS-031): Scope containment holds at both read providers: HX refuses to walk outside the workspace and says so in the coverage record, and the Forge provider refuses an outside target …
- **C247** (PROVIDERS-032): Drift is caught loudly without breaking users: the live tier fails (never skips) on a producer release mismatch while the runtime validator still serves the newer rf, and the …

**scheduling**
- **C265** (SCHEDULING-018): PRESERVE: the schedule store's atomic temp+rename writes, stale-PID lock recovery, and lazy directory creation (no .pi/ write until the first mutation) all hold on the …
- **C266** (SCHEDULING-019): PRESERVE: the `schedule` parameter and its guideline are removed from the Agent tool schema when scheduling is disabled (zero token cost), and the incompatible-combination …
- **C267** (SCHEDULING-020): PRESERVE: past ISO one-shots are rejected before any record is created; malformed settings JSON warns to stderr naming the path; `fallbackSubagent: false` is accepted so a …


## Drift notes vs master 0fb90672

The pin ce180d82 is the workbench trunk (L1088 hop) and an **ancestor of master 0fb90672** (`git merge-base HEAD origin/master` = ce180d82). At consolidation the measured drift facts are:

- 23 master-only commits exist; five touch the interop skill or interop docs (d7666a76, 44651778, 4b219f24, 91d8fa8c, 3fc0ead1) — **C117**: corrections to the pi-mechanical-interop skill, AGENTS.md, README.md and the two newer interop programs exist *only on master*; the workbench trunk the machines branch from never receives them.
- **C115**: the skill's 'Actual current state' at the pin states a defect master fixed two hours after the skill landed.
- **C116**: the docs-remediation census test pins skill sentences to line numbers, so adopting master's corrected skill text reds the default gate — the drift is structurally locked in until the census keys on content, not lines.
- **C209**: the shipped feature matrix mixes a 2026-10-15 header with row re-measurements up to 2026-11-06 at trunk 600a253 — the ledger's own freshness claim is unreliable in both directions (see CONTRADICTIONS.md §B).
- **C216** (PLAUSIBLE): manifest media URLs point at the *upstream* repo's master, a third tree entirely.

Consequence for readers of this audit: doc-staleness findings graded at the pin may be partially cured on master, but the mechanisms that produced the lag (line-pinned census, mixed-freshness matrix, same-cut rule enforced on no seam — C121/C110) are themselves findings and remain.

## Method limits and consolidation notes

- Grades are the investigators'; consolidation re-verified only what it had to (one factual conflict: the claude:transcript viewer bound — resolved to 40 rows at the production call site, recorded in C173's verdict_history; INSPECTOR-016 merged there as SAME_ORIGIN).
- 7 cross-family duplicate pairs were merged (each kept row lists `same_origin`); within-family near-duplicates were left distinct deliberately (different mechanisms or surfaces).
- SUPPORTED means code-read with file:line, not reproduced; the single PLAUSIBLE row (C216) names what a reproduction would need (a registry render of a published fork artifact).
- Absence claims state their detection surface in the evidence field (greps over named docs, importer censuses, registration lists).
- The audit-ordered instruments were used as specified by the investigators: hx for typed censuses over the pin and rf as both instrument and probe target for the provider family; the probe suites under `probes/<family>/` drove the real CLIs (rf/forge/furnace/hx) where provider behaviour was claimed.

## Deliverables

- `CLAIMS.jsonl` — 267 claims (this ledger; statuses = grades; verdict_history pins grade @ ce180d82 2026-11-11).
- `CONTRADICTIONS.md` — 36 promise-vs-measured conflicts, both sides quoted.
- `dossiers/C001|C003|C034|C037|C054|C062|C067|C134|C136|C199|C248|C252.md` — the 12 highest-cost defects with repro, cost, cure options.
- `REMEDIATION.md` — all 224 defects mapped to smallest cure classes (biggest cheap win: `wire-landed-code`; biggest bucket: `guard-or-validate`).
- Inputs preserved under `.work/find-*.jsonl`; probes under `../probes/<family>/`.
