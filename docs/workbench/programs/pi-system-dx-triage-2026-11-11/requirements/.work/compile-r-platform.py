import json, pathlib, re
T=pathlib.Path('/workplace/jehallad/AgentEcosystem/ForgeWorkspaces/Pi/PiSubagents/scratch/pi-system-triage-1111')
W=T/'requirements/.work'
C={r['id']:r for r in map(json.loads,(T/'epistemic-triage/CLAIMS.jsonl').read_text().splitlines())}
R=[]
def add(n,title,typ,authority,claims,statement,rationale,criteria,oracle,tier,family,beads=(),prior=(),conditions='None.',deps=()):
 R.append(dict(req=f'EAT-R{n}',title=title,type=typ,authority=authority,claims=claims,statement=statement,rationale=rationale,criteria=criteria,oracle=oracle,verification=tier,family=family,existingBeads=list(beads),priorEAT=[f'EAT-R{x}' for x in prior],conditions=conditions,dependsOnCompiled=[f'EAT-R{x}' for x in deps]))
add(366,'Return the HX answer set rather than proof-graph rows','BEHAVIORAL','EMPIRICAL_REPAIR',['C217','C218'],
'The hyperunix.find capability MUST return an explicit addressable answer set selected from native answer frames, separate from its proof graph.',
'C217 reproduced anonymous stat records with no paths; C218 reproduced identical proof-row counts for files, directories and zero-match symlinks. Native answer_count, not rows.length, is the count oracle. This does not establish complete coverage: the native HX reading remains partial/unknown.',
['Assert a three-file fixture produces exactly those three root-relative paths and kinds through registered node() and capability_invoke; compare to native HX answer-frame references plus directory-entry names, independently checked by filesystem enumeration.',
 'Assert directory and symlink queries return their own answer sets; zero symlink answers with incomplete coverage retain licenses_absence:false and cannot be described as proven absence.',
 'Assert graph/support nodes appear only in a separately named evidence projection and are never counted as answers; a mutant returning source.rows fails the answer oracle.'],
'providers/h01-hx-native-find.mjs, providers/h02-registry.mjs; providers/vt/node-e2e.probe.test.ts S1 and providers/vt/observe.probe.test.ts; real hx --hxs answer/answer-coverage frames + native filesystem control','V6','W07/VC-2 HX result projection',['wb-lri'],[247,248,299],
'The vendored SDK drops edge/answer information. If a reviewed SDK seam is required, record BLOCKED on that exact artifact; do not reconstruct names from inode guesses or invent a producer API.')
add(367,'Retain actionable producer diagnostic meaning','BEHAVIORAL','EMPIRICAL_REPAIR',['C221','C222','C223','C240','C244'],
'Provider failures MUST retain a bounded sanitized producer code, cause and available remediation rather than replacing them with an undifferentiated transport sentence.',
'C221 reproduced loss of HX-TYPE-UNKNOWN-KIND and its fix; C222 reproduced RF code-only and non-envelope failures; C223 reproduced informative-tail loss at 100 bytes; C240 reproduced relative/missing Forge targets mislabeled outside scope. C244 is the established Furnace diagnostic-preservation precedent.',
['Assert real HX invalid-kind and RF unknown-view/model failures carry the producer code and actionable message/hint, with usage/input errors distinguished from protocol failure.',
 'Assert Forge relative target is validation, nonexistent in-scope target is unavailable, and resolved outside target remains authorization; all three messages state the actual cause.',
 'Assert curated replies retain the actionable cause within a documented diagnostic budget (1024 UTF-8 bytes chosen here), with explicit truncation and no split codepoint; planted credential/control text never survives.',
 'Assert a non-envelope child exit reports exit status and available bounded safe cause; do not expose raw traceback or infer a cause from empty stderr.'],
'providers/h08-hx-error-result.mjs + providers/hx-badkind.err; providers/h02-registry.mjs and providers/h03-curated.mjs badview/badmodel/crash/Forge target cases; test/workbench-registry-schema.test.ts redaction controls','V6','W06/W07/W08/W10 provider error UX',['wb-lri','wb-5uh','wb-x32'],[40],
'wb-jwc.7 pins the noncommitted preview stderr-discard/kill custody. Do not change that pin silently: native RF envelope messages can be preserved immediately; non-envelope stderr retention is BLOCKED pending an explicit amendment, or supply exit status and honest unavailable cause. R363 owns schema paths; R364 owns completion propagation, not this mapping.',[363,364])
add(368,'Expose provider contracts without invoking providers','BEHAVIORAL','EMPIRICAL_REPAIR',['C220','C242'],
'The Pi orchestrator MUST be able to retrieve an authorized static capability input contract without requiring a native inspect implementation.',
'C220 reproduced inspect-not-advertised for every shipped provider and catalog omission of inputSchema. C242 establishes compact staged Claude discovery, not equivalent Pi discovery.',
['Assert workbench_catalog remains compact and offers an on-demand contract route; for each of the four invoke-only descriptors the actual registered route returns the descriptor inputSchema and version.',
 'Assert exact discover authorization governs metadata, with zero provider invokes, inspects or process starts; adding contract retrieval confers no invocation right.',
 'Assert missing/foreign authorization and unknown IDs stay sanitized and bounded; contract fetch does not falsely advertise runtime inspect/observe support.'],
'providers/vt/node-e2e.probe.test.ts S7 and providers/h04-pi-catalog.mjs; captured registered tool definitions + instrumented provider-call counters','V3','W06/W16 capability discovery',[],[290],
'One static contract behavior only. C169 observe-mode dispatch is a separate residual; native polling is not implied.')
add(369,'Name the denied capability grant','BEHAVIORAL','EMPIRICAL_REPAIR',['C231','C243'],
'An authorized role reaching a capability authorization refusal MUST receive the exact missing grant token needed for that attempted operation.',
'C231 reproduced identical denials across discover/invoke/producer grant combinations; C243 establishes pre-provider refusal and typed errors. Naming a token does not grant it.',
['Assert each missing member of the exposed-role discover/invoke/producer grant conjunction yields a refusal naming that token, not merely permission denied.',
 'Assert node() retains its existing producer-permission semantics and curated tools retain their narrower invoke/discover semantics; no grant is auto-added.',
 'Assert every missing-grant case starts zero providers and a fully authorized positive reaches exactly one provider.'],
'providers/h03-curated.mjs grant matrix and providers/h03-run-grants.out; providers/vt/node-e2e.probe.test.ts S5; test/workbench-capability-surface-parity.test.ts','V3','W03/W06 exact grant diagnostics',['wb-f5y'],[227,228],
'R325 covers execute journey grant documentation. This row covers actual provider refusal tokens; hidden capability discovery need not enumerate unauthorized IDs.')
add(370,'Classify a missing producer executable as unavailable','BEHAVIORAL','EMPIRICAL_REPAIR',['C232'],
'Each native provider MUST report a missing executable as unavailable with its executable name and a concrete installation/PATH next step.',
'C232 drove all four providers with a reduced PATH: three reported transport, only Furnace named ENOENT. This is missing-executable behavior, not evidence of transient provider failure.',
['Assert hermetic PATHs excluding hx, rf, forge and furnace yield unavailable and name the missing executable for each real launch seam.',
 'Assert an executable that starts then emits invalid protocol remains a protocol/transport failure, not binary missing; a valid installed executable remains callable.',
 'Assert failure leaves no live child or admission slot and does not silently substitute another binary.'],
'providers/h02-registry.mjs and providers/h03-curated.mjs reduced-PATH cases; providers/nobin-which.out; process/admission counter oracle','V6','W07-W10 provider availability',['wb-lri','wb-5uh','wb-x32'],[],
'The proposed doctor/preflight surface is a separate residual, not bundled into this error classifier.')
add(371,'Canonicalize the configured RF workspace','BEHAVIORAL','EMPIRICAL_REPAIR',['C226'],
'The RF provider binding MUST use the canonical configured workspace identity and invalidate that binding when the effective workspace setting changes.',
'C226 reproduced both symlink/trailing-slash rejection and persistence after editing the setting. Both arise in the configuration-to-registry binding; native rf successfully canonicalizes those paths.',
['Assert realpath-equivalent RF roots (canonical, symlink and trailing slash) return the same authorized workspace identity.',
 'Assert editing reactivefiberWorkspaceRoot in the same session changes the next binding or explicitly refuses with a restart-required message before invoking the old root; never silently render the old workspace.',
 'Assert a genuinely contradictory producer workspace is refused and scope containment is not weakened by normalization.'],
'providers/vt/rf-root-setting.probe.test.ts; providers/h02-run-rf-symlink.out and providers/h02-run-rf-slash.out; rf --workspace canonicalization control','V6','W10 RF workspace settings',['wb-x32'],[],
'Registry replacement must respect in-flight invocations and their admitted identity; no model-selected workspace is introduced.')
add(372,'Let the provider deadline settle before the registry cutoff','BEHAVIORAL','EMPIRICAL_REPAIR',['C233','C168','C245'],
'Native provider and registry deadline configuration MUST admit the declared provider execution budget and leave time for its bounded settlement before the enclosing cutoff.',
'C233 reproduced a 30029 ms registry cutoff before the RF 60000 ms deadline; its HX race is SUPPORTED code-read only. C168 SUPPORTED identifies hard configuration limits; it is not reproduction of every limit. C245 establishes child reaping/slot release on the measured direct-child deadline path.',
['Assert a controlled RF child settling between 30 and 60 seconds succeeds under a declared 60-second provider policy; a child exceeding it produces the provider deadline refusal and settles before the enclosing deadline.',
 'Assert HX wall-budget exhaustion returns its partial coverage before the registry cutoff under the adopted finite deadline policy.',
 'Assert cancellation still reaps the direct child and eventually releases its slot; timing out never asserts rollback or completion.'],
'providers/h05-rf-deadline.mjs with barrier/clock-controlled child and process readback; registry-admission tests; actual HX budget-exhaustion control','V6','W06/W10 provider deadline composition',['wb-x32'],[74,75],
'An operator capabilityLimits knob and nodeCap knob are separate residual obligations. Grandchild pipe retention was not closed by C245 and must not be certified here.')
add(373,'Settle the original node-call identity','BEHAVIORAL','EMPIRICAL_REPAIR',['C224'],
'A provider node call MUST settle the same Pi node-call projection identity it started, retaining native operation identity as a linked reference.',
'C224 reproduced a phantom active node beside the completed RF and Forge native operation. The Furnace branch is code-supported only; do not call it reproduced.',
['Assert successful registered RF and Forge node() calls leave no active start row after workflow completion and retain the exact producer operation reference.',
 'Assert native-ID-absent HX calls and actual errors settle one call identity correctly; parallel calls cannot settle each other.',
 'Assert deleting the stable call-key linkage recreates the phantom and fails the post-completion active-count oracle.'],
'providers/vt/observe-rf.probe.test.ts and providers/vt/observe.probe.test.ts; registered workflow_observe node identities and status counts','V6','W13/W14 node lifecycle projection',['wb-79k.3'],[239,243])
add(374,'Apply the landed read adapters at the host observation seam','BEHAVIORAL','EMPIRICAL_REPAIR',['C225','C246'],
'The host MUST ingest HX and RF read results through the landed provider reader adapters into its scope-bound observation projection.',
'C225 reproduced generic-only rows and HX complete wording for unknown coverage; the static importer census found no HX/RF adapter callers. C246 establishes root containment. Wiring is not permission to promote incomplete coverage.',
['Assert actual registered HX/RF node() results create their adapter snapshot kinds and host-bound relations without manually seeding the projection.',
 'Assert incomplete, failed and unknown HX coverage never yields a verified-success or licenses-absence claim; RF preview remains explicitly noncommitted and injected fixtures remain fixture-labeled.',
 'Assert missing read grants execute zero producer calls, and native IDs, source basis and sanitized evidence stay bound to the same invocation.'],
'providers/vt/observe.probe.test.ts and providers/vt/observe-rf.probe.test.ts plus test/workbench-hyperunix-observer.test.ts and test/workbench-reactivefiber-observer.test.ts; registered native readback','V6','W13/VC-2 native read wiring',['wb-79k.3'],[248,299,300],
'Live readback consolidates wb-79k.1/.2 into wb-79k.3; do not reopen the closed precursors. Claude-topology wiring is a separate residual; detached wiring is R343. Respect adapter consumed-field and redaction pins.',[373])
add(375,'Isolate optional provider load failure','BEHAVIORAL','EMPIRICAL_REPAIR',['C239'],
'A failed optional provider import MUST withhold only that provider, leaving unrelated Workbench tooling and loadable providers available.',
'C239 reproduced whole-native-load ERR_MODULE_NOT_FOUND for independently blocked SDK resolution, removing all twelve tools. This is measured load coupling, not a mandate to implement a fifth provider.',
['Assert independent resolve-hook failures for each optional SDK leave unrelated catalog/validate/observe/control tools registered and the remaining providers callable.',
 'Assert the unavailable provider reports a bounded sanitized load cause and cannot invoke through a stub.',
 'Assert a later valid load can recover without cached permanent failure, and concurrent loading produces no duplicate registration.'],
'providers/h06-missing-sdk-register.mjs and providers/h06-missing-sdk.mjs + test/helpers/boot-extension.ts registration census; test/workbench-native-modules-failure.test.ts and test/workbench-native-load-notify.test.ts','V3','W06/W22 optional provider packaging',[],[],
'Closed wb-4ax is historical lineage, not an open repair container. Registry-derived extensibility rosters remain a distinct residual.')
add(376,'Point fork installation instructions at the fork artifact','REPRESENTATION','LINGUISTIC_INTEGRITY',['C199','C210','C216'],
'The fork installation instructions MUST identify an artifact or pinned source that delivers the documented fork, explicitly distinguishing the upstream npm package.',
'C199 established that the named npm source delivers upstream 0.23.2 rather than fork 0.20.0. C210 SUPPORTED identifies an absent inspected distribution policy. C216 PLAUSIBLE predicts wrong preview media only on a future fork publication; no remote rendering was measured.',
['Assert following the documented fork install recipe in a clean consumer produces the expected source/artifact identity and Workbench exports, rather than the upstream package.',
 'Assert README labels the upstream command as upstream-only and states the fork delivery status/version; before publication use a verified pinned git source or local packed artifact, not an invented registry name.',
 'Assert a documented unavailable publication is never presented as an existing release.'],
'packaging/npm-view-published.json + clean external packed/source install oracle and qa/workbench/installed-consumer.mjs runtime identity','V2','W22 install identity',['wb-cax'],[286],
'Publishing identity/version policy and registry media verification remain separate decisions; this row authorizes no publication, network exposure or version bump.')
add(377,'Align declared and tested Node compatibility','REPRESENTATION','LINGUISTIC_INTEGRITY',['C200','C202','C208','C214'],
'The documented Node compatibility floor MUST agree with the manifest and the runtime versions explicitly exercised by the compatibility jobs.',
'C200 established >=24 vs CI 22; C202 established README absence. C208 and C214 establish exact dependency pin and command-documentation positives, not universal compatibility.',
['Assert package engines, README install prerequisite and docs/17 support declaration have the same adopted floor.',
 'Assert each CI compatibility runtime is classified as declared-supported or explicitly experimental; the declared floor is actually exercised by a recorded clean complete gate.',
 'Assert workbench-dependency-census drift detection includes CI runtime declarations and changing one side alone makes the guard red.'],
'package.json, .github/workflows/ci.yml and README.md content census + test/workbench-dependency-census.test.ts + clean floor-runtime gate receipt','V2','W22 runtime compatibility',['wb-cax'],[286],
'No unsupported inference that CI historically passed on every Node 22 host. Keeping >=24 or revising the floor requires a reviewed policy choice and fresh gate, not this compilation.')
add(378,'Pack only freshly compiled runtime bytes','NEGATIVE_REGRESSION','RISK_CONTROL',['C205','C206','C207','C211'],
'A bare npm pack MUST not deliver compiled runtime bytes stale relative to the source it packages.',
'C205 SUPPORTED identifies the absent prepack freshness guard; no stale distribution was reproduced. C206/C207/C211 establish deterministic packing, independent installation and runtime identity controls that must remain intact.',
['Assert a deliberate source change with stale dist followed by bare npm pack either rebuilds and packages the fresh implementation or refuses with an explicit freshness diagnostic.',
 'Assert the independently installed tarball executes the changed sentinel and its identity matches the packed dependency bytes.',
 'Assert two packs of the same fresh input remain deterministic and the existing denied-path classifier still rejects private state.'],
'qa/workbench/package-smoke.sh + qa/workbench/install-smoke.mjs and qa/workbench/installed-consumer.mjs; throwaway source/dist sentinel mismatch and packed-file digest oracle','V2','W22 compiled artifact freshness',['wb-cax'],[271],
'Risk prevention, not an established stale-artifact incident. Rebuilds must work locally, never on the S3 mount; no live source edit is required by this compilation.')
add(379,'Reject schedules outside the timer domain','BEHAVIORAL','EMPIRICAL_REPAIR',['C248','C249','C267'],
'Schedule admission MUST reject durations outside a finite supported timer domain before storing or arming a job.',
'C248 reproduced 31 spawns in 60 ms for 30d and immediate +30d; C249 reproduced enabled-but-inert 0m. C267 establishes past-ISO refusal before persistence. The smallest cure chosen here is refusal, not timer chaining.',
['Assert interval and relative delay are safe integers in 1000..2147483647 ms; zero, negative/overflow arithmetic, 30d, +30d and +99999999999d refuse with the bound named and zero jobs/timers/spawns.',
 'Assert an absolute future delay beyond the same bound refuses before setTimeout; past ISO still refuses before record creation.',
 'Assert valid boundary values arm without TimeoutOverflowWarning using fake timers, and README/schema describe the actual supported bound.'],
'scheduling/bounds.probe.ts B1-B4 + test/schedule.test.ts and test/schedule-e2e.test.ts; timer-install spies, store-row and spawn counters','V3','Scheduling timer admission',[],[],
'Scheduled bypassQueue concurrency policy is a separate risk decision; this row closes the overflow, not all runaway-spawn avenues.')
add(380,'Restart scheduling after a same-session re-enable','BEHAVIORAL','EMPIRICAL_REPAIR',['C250','C266'],
'Re-enabling Scheduling in an active session MUST restore that session scheduler without duplicating timers.',
'C250 reproduced off/on leaving no scheduler and hiding retained jobs. C266 establishes schema pruning when disabled, with documented next-session schema effects.',
['Assert the real Settings off/on sequence emits a new ready event, retains the job menu and admits a new schedule without restart.',
 'Assert disable immediately disarms timers; repeated enable does not duplicate a tick or spawn; persistent jobs are rearmed once.',
 'Assert disabled schema/guideline pruning and explicit incompatible-combination refusals remain intact at registration.'],
'scheduling/wiring.probe.ts W4/W5 via actual SettingsList + test/schedule-params-wiring.test.ts; ready-event/timer/spawn counts','V3','Scheduling live toggle',[],[],
'Tool-schema hot reload is not asserted if Pi requires next-session registration; runtime restart is the obligation.')
add(381,'Preserve an unreadable schedule store before mutation','BEHAVIORAL','EMPIRICAL_REPAIR',['C252','C265'],
'A schedule mutation MUST never overwrite corrupt prior store bytes without preserving them for recovery and reporting their path.',
'C252 reproduced silent empty load then destructive rewrite. C265 establishes atomic writes, stale-PID recovery and lazy directory creation on normal inputs, which do not license corrupt-input erasure.',
['Assert truncating a two-job store then adding/updating/removing refuses the mutation or preserves the original bytes in a named recovery file before creating replacement state.',
 'Assert stderr/operator warning names the unreadable file and recovery action; no empty-success response masks the failure.',
 'Assert valid-store atomic replacement, stale-lock recovery and no-write-before-first-mutation still pass; replace the existing self-heals characterization with preservation assertions.'],
'scheduling/store-nextrun.probe.ts S2 + test/schedule-store.test.ts; exact original-byte/recovery-file and warning oracle','V5','Scheduling durable store integrity',[],[],
'Backup naming and explicit operator recovery policy may be chosen, but preservation is mandatory. Do not rename shared production stores during this audit.')
add(382,'Keep schedule lock contention off the event loop','BEHAVIORAL','EMPIRICAL_REPAIR',['C251','C265'],
'Schedule-store lock contention MUST yield the event loop during its finite wait rather than synchronously busy-wait.',
'C251 reproduced about five seconds with zero 10ms heartbeat ticks. C265 establishes stale-PID recovery; eliminating busy-wait must not delete a live owner lock.',
['Assert a live-owner lock prevents mutation while an independent event-loop heartbeat continues during retry.',
 'Assert the wait ends within a declared finite budget with a path-bearing lock diagnostic, leaving store bytes and live-owner lock unchanged.',
 'Assert a dead-owner positive still recovers and writes atomically; a spin-loop mutant fails the heartbeat oracle.'],
'scheduling/store-nextrun.probe.ts S1 + test/schedule-store.test.ts; controlled live PID lock, heartbeat and byte comparison','V5','Scheduling responsiveness',[],[],
'The exact retry budget is a measured policy parameter, not a universal 250ms claim. This row does not prescribe stealing PID-reused locks.')
add(383,'Deliver scheduler failures on consumed error channels','BEHAVIORAL','EMPIRICAL_REPAIR',['C249','C255'],
'Every schedule admission, arming or fire failure MUST be delivered as an error to the creating model or active operator, not only an unconsumed event.',
'C249 established emit-only scheduler error handling and false Scheduled replies; C255 reproduced success-shaped invalid schedule replies and discarded cron field errors.',
['Assert invalid cron/input/combinations return isError:true with the actual field/count cause and no Scheduled success.',
 'Assert arm-time failure refuses or marks the returned job failed and informs the caller; fire-time failure produces one sanitized operator/conversation error naming the job ID.',
 'Assert a successful scheduled fire keeps its ordinary completion path and no duplicate failure notification appears.'],
'scheduling/wiring.probe.ts W2 and scheduling/bounds.probe.ts B4/B6 + booted subagents:scheduled event consumer; reply isError and notification counts','V3','Scheduling error delivery',[],[],
'R379 owns zero-duration rejection. Human-enable instructions must be phrased as an agent next step, without claiming the model can drive a TUI.',[379])
add(384,'Diagnose rejected settings by file and key','BEHAVIORAL','EMPIRICAL_REPAIR',['C261','C267'],
'Settings validation MUST report every ignored or refused supplied key with its file/layer and expected constraint.',
'C261 reproduced silent wrong-type drops and pathless workbench errors; C267 establishes path-named malformed JSON warnings and false-to-no-fallback normalization.',
['Assert wrong types, unknown top-level keys and invalid enums produce diagnostics containing file path, global/project layer, key and expected type/value, without echoing sensitive contents.',
 'Assert a misspelled workbench key names its source file before extension refusal; valid values preserve current precedence.',
 'Assert malformed JSON still warns with path and fallbackSubagent:false still disables fallback; no invalid restriction is narrated as applied.'],
'scheduling/settings-memory-menu.probe.ts T1/T2 + test/settings.test.ts; file/layer/key warning capture and booted effective schema','V3','Settings diagnostics',[],[],
'Accepting coerced strings or failing the whole load is a separate policy choice. Agent-file frontmatter validation C005 is a distinct residual.')
add(385,'Write project setting deltas rather than global snapshots','BEHAVIORAL','EMPIRICAL_REPAIR',['C262'],
'A project Settings edit MUST persist only project-explicit overrides rather than materializing inherited global values.',
'C262 reproduced one toggle writing 22 keys and freezing maxConcurrent at 16 after the global value moved to 32. This is setting-layer custody, not a need to change global precedence.',
['Assert changing Scheduling writes that explicit override but leaves inherited maxConcurrent/graceTurns/workbench absent from the project file.',
 'Assert a later global maxConcurrent update applies while Scheduling retains its project value, and pre-existing explicit project overrides remain preserved.',
 'Assert global files are never written by the project menu and the effective merge remains project-over-global-over-default.'],
'scheduling/settings-memory-menu.probe.ts T3 + scheduling/wiring.probe.ts W4; project-file key census and reload after global mutation','V3','Settings layer QoL',[],[],
'No permission to rewrite existing project configurations en masse; migrate existing snapshots only under a separately reviewed rule.')
add(386,'Ship a live-true settings reference','REPRESENTATION','LINGUISTIC_INTEGRITY',['C263','C260','C258','C259'],
'The installed settings reference MUST describe each actual setting and environment selector with its default, precedence and effective lifetime.',
'C263 established missing settings keys and misleading gitignored wording; C260 established undocumented process-local cron timezone; C258 established missing model-facing session lifetime; C259 SUPPORTED identifies scheduled transcript omission by code read, not overnight result loss reproduction.',
['Assert a schema/default-derived table in the packed artifact names every SubagentsSettings/WorkbenchSettings key, type, default, layer precedence and live-vs-next-session application.',
 'Assert actual env selectors are documented with scope, including PI_CODING_AGENT_DIR, PI_CODING_AGENT_SESSION_DIR, XDG_RUNTIME_DIR and CLAUDE_CONFIG_DIR; RF_WORKSPACE/SWARM_RF_WORKSPACE are described as child-env policy rather than a Pi registry selector.',
 'Assert Scheduling text discloses process/session lifetime, timezone, supported timer bounds and current transcript behavior; local memory text says add to .gitignore rather than claiming one is created.',
 'Assert the documented configuration recipe loads and changes the intended effective schema in a clean installed consumer without source inspection.'],
'scheduling/settings-memory-menu.probe.ts + scheduling/wiring.probe.ts W3; src/settings.ts default/key census and fresh packed consumer installed-docs scenario','V2','Settings/Scheduling installed documentation',['wb-cax','wb-yiu4'],[290],
'R327 owns tool-journey docs; this row owns configuration truth. TZ selection and transcript creation are separate behavioral residuals. The preparatory surface.json file list contains settings.json wording inconsistent with settings.ts; use the actual reader and subagents.json paths, not that generated list.',[379,384,385])
add(387,'Distinguish tested seams from reachable product features','REPRESENTATION','LINGUISTIC_INTEGRITY',['C049','C055','C063','C069','C078','C102','C119','C126','C169','C182','C184','C185','C225','C209','C110','C161','C192','C121','C115','C117','C172','C120'],
'The release status documentation MUST distinguish component-tested, production-reachable and native-accepted feature status at an explicit source/date pin.',
'The cited stub findings identify inert policies, reserved definition kinds, unwired adapters/read models, descriptor-only verbs and unreachable seams; their grades remain separate. C049/C069/C169/C185/C209 are SUPPORTED code-read claims, not reproductions. Established status contradictions include both understatement of landed code and overstatement of product wiring. Doc-only master drift does not change the ce180d82 environment verdict.',
['Assert each named stub/status row records measured source SHA/date, detection surface, reachable entrypoint or explicit none, evidence tier and remaining live owner; component tests alone cannot produce shipped/native accepted.',
 'Assert policy echo-only, script-only launch, mode dispatch, Furnace control verbs, observe placeholder blocks, compare metrics, executable identity and interop routes are described in their measured state until an actual caller/receipt exists.',
 'Assert the generated matrix no longer calls closed carriers open at its own export pin or declares currently registered tools absent; historical rows remain historical and prior pinned correction bytes are not silently rewritten.',
 'Assert a same-cut status check derives affected features from changed implementation paths and demands fresh status/evidence or an explicit unchanged justification, not merely presence of a release receipt block.'],
'interop/import-census.mjs + src/index.ts registered-tool census; qa/workbench/status-ledger.mjs and qa/workbench/mwi-release.mjs + feature-matrix row/evidence validator (extended oracle)','V0','W11/W13/W15-W18/W21/W22 status and stub truth',['wb-cax','wb-yiu4'],[82,167,293,306,310],
'This is representation/reachability-status repair, not implementation of all stubs. Live seam wiring retains existing MNI P02/P03/P04 owners wb-y0n6/wb-2ukh/wb-4bxo and shared wb-79k.3/wb-h8f.7/wb-752.13. C116 line-pinned docs census requires content-anchor repair or owner-approved pin advance; do not silently repin historical fixtures. C120 outside-machine enforcement remains unknown; repository enforcement is the named detection surface.')
add(388,'Preserve exact artifact admission on packaging changes','NEGATIVE_REGRESSION','NORMATIVE_DECISION',['C206','C207','C208','C211','C214'],
'Packaging changes MUST retain exact packed-artifact identity admission for a clean independent consumer.',
'These positives are ESTABLISHED at the pin: deterministic pack, denied-path classification, clean scrubbed/read-only consumer success, vendor checksum truth and packaged invocation identity. They do not establish all future releases; regression protection is an explicit experience standard.',
['Assert repeated packs share shasum/integrity and every packed path satisfies the boundary classifier; private-state and altered vendor-byte mutants fail.',
 'Assert fresh install-minimal under HOME/LANG/PATH/TMPDIR with read-only node_modules leaves its tree unchanged, returns workflow value 42 and retains zero-grant denial.',
 'Assert capture/verifyInvocationIdentity validates installed dependency artifact bytes, not merely package version; dependency-lock copy still equals the reviewed lock.'],
'qa/workbench/package-smoke.sh, qa/workbench/install-minimal.mjs and qa/workbench/installed-consumer.mjs; test/workbench-package-boundary.test.ts and test/workbench-vendor-pins.test.ts','V2','W22 QoL-preserve exact artifact custody',['wb-cax'],[271,286,288],
'One preservation invariant: exact admitted artifact identity. C214 command-copy maintenance is a separately retained positive residual; no blanket green complete-gate claim.',[376,377,378])
add(389,'Preserve pre-provider authority confinement','NEGATIVE_REGRESSION','NORMATIVE_DECISION',['C243','C245','C246','C072','C031'],
'Provider UX repairs MUST retain host-bound authority confinement before any unauthorized provider process is started.',
'C243 establishes pre-dispatch schema/grant refusal; C246 establishes HX/Forge root containment; C245 establishes RF allowlisted child environment; C072 establishes source digest/current-grant admission; C031 establishes skill traversal refusal. These are scoped positives, not a global security certification.',
['Assert revoked/missing grants, changed source digest, outside-root/symlink-escape inputs and skill traversal fail before provider/child invocation, with counters remaining zero.',
 'Assert a valid authorized in-root positive still starts once; discovery/contract reads never become invoke rights.',
 'Assert RF children receive only the declared environment allowlist and no planted ambient secret/selector; descendant-process cleanup is not inferred from the direct-child positive.'],
'providers grant/scope/environment probes + execute real-extension D_grants/I_staleAndResume + agents p13-loader-positives; actual registration and child-env counters','V6','W03/W06/W19 QoL-preserve confinement',['wb-f5y'],[227,228,238],
'No new control grants, exposure, credential propagation or safety-disablement is authorized. Child reaping C245 is separately retained as a lifecycle residual.',[367,368,369,370,371,375])
add(390,'Preserve unknown and partial evidence distinctions','NEGATIVE_REGRESSION','NORMATIVE_DECISION',['C194','C195','C196','C198','C114','C175','C094','C132','C133','C247','C041'],
'Representation and adapter repairs MUST never promote missing, partial, stale or lower-tier evidence into current verified success.',
'The cited positives establish exact byte/truncation accounting, refused foreign cursors, phase-honest controls, noncausal comparison, UI cap visibility, no invented usage, producer pinning, component-only interop and loud producer drift. Their scopes differ; the shared preserved invariant is evidence-grade conservation, not complete correctness of all those features.',
['Assert cap truncation and evicted-event gaps retain explicit counts/partial markers; foreign cursor never restarts silently at zero.',
 'Assert requested/acknowledged/settled control phases remain separate, absent usage remains absent and compare with unmeasured basis declines precision/causation.',
 'Assert native RF version/key drift produces a named live-tier failure or BLOCKED evidence, not a skip; runtime compatibility can continue only with truthful actual producer identity.',
 'Assert component interop helpers, saved detached observations and injected adapters cannot certify current native lifecycle or function support without their named registered/native gate.'],
'observe A/B/H probes and qa/workbench/tool-reply-bench.mjs; inspector p20; node-rpc structured-output/resume probes; vitest.rf.config.ts drift oracle (providers/vitest-rf-preview.log red baseline) + interop probe-execute-refusal and rf --no-commit control','V6','W13-W17/W21 QoL-preserve evidence honesty',['wb-79k.3','wb-752.13','wb-h8f.7','wb-h8f.2','wb-9x5.11','wb-yiu4'],[248,263,287,289,310],
'wb-9x5.10/.16 are consolidated into wb-9x5.11; wb-752.12 into wb-752.13. Exact terminal geometry/performance and richer positive behaviors require their own retained residual tests, not certification by this single truth-invariant row.',[374,387])
assert [int(r['req'][5:]) for r in R]==list(range(366,391))
header='''# Atomic requirements — r-platform

Phase 10 compilation of the Pi-subagents system DX/UX/LX audit, **EAT-R366..EAT-R390 (25 obligations)**. Environment pin: **ce180d82f9385a315ff26bd8e7f9202cac19f5b3**, fork v0.20.0, graded 2026-11-11. These are implementation inputs, not a report of completed repairs. All acceptance is **NOT_RUN**. Parent owns aggregation, L0–L10 TDD matrix and bead filing; this shard creates no beads, commits or publication.

## Scope and evidence contract

- Inputs: `epistemic-triage/CLAIMS.jsonl`, `REMEDIATION.md`, `CONTRADICTIONS.md`, `EPISTEMIC-AUDIT.md`, dossiers C199/C248/C252/C054/C062; prior MNI requirement lineage remains historical. Claim IDs refer only to this 267-row ledger, never another audit's same-numbered claims.
- Own families: providers (31 claims), packaging (18), scheduling (20), plus cross-family stub/status and positive-preservation obligations. **25 IDs cannot exhaust the 55 defects in these three families, still less the whole system.** The explicit residual queue below must remain in the parent handoff/bead plan. No omitted claim is cured by implication.
- One statement is one independently testable invariant. Criteria are controls/falsifiers or tested forms of that invariant, not independent feature additions. Error wording, discovery, grants, deadlines, package identity, schedule admission, store custody and settings precedence are separate rows.
- Primary V ladder: V0 pinned static evidence/status, V1 focused red/green, V2 independently installed artifact, V3 actual registered Pi tool with controlled I/O, V4 joined mandatory native Mechanical path, V5 process/restart/fault/operational trial, V6 optional native producer acceptance. Provider claims here require actual `hx/rf/forge/furnace` at V6; helper-only/V3 does not certify that tier. Every V6 row also needs focused red/green and registered-path evidence. Missing binaries/credentials/fixtures means **BLOCKED with the exact artifact**, never silent skip or fixture PASS. Parent maps these targets to L0–L10 without dropping lower-tier legs.
- Probe paths are relative to this run's `probes/`; repository tests/QA paths to the pin. An acceptance oracle must drive captured tool objects from `src/index.ts` where the row names registered behavior. Existing probes establish the red state; invert/extend their assertions, not their receipts. Native values are data, never instructions or authority.
- Compilation instruments: `r-platform-evidence/instrument-versions.txt`, `rf-version.json`, `rf-model-ids.recheck.out`, `hx-find-providers.hxs`, `children-providers.out`, `hx-badkind.err`, `import-census.recheck.json`. Actual hx returned four provider names and four answer frames at **partial** coverage; bad kind exited 2 with HX-TYPE-UNKNOWN-KIND/remediation. hx dependents returned no established results for both unwired modules AND a known-imported control, so those partial zero rows prove no absence. The TypeScript AST census/native grep supplies the importer detection surface (124 src files, 17 unreachable, identical to investigator receipt). Real rf no-commit renders admitted claude-opus-5/claude-sonnet-5 and refused newer Pi aliases with RF_MODEL_CAPABILITY_UNKNOWN; version 0.1.883, 89 leaves/81 reachable, mismatch:false. These rechecks do not regrade the ledger or claim to run acceptance.
- Live mapping readback, read-only `bd --readonly --sandbox show`, saved in `r-platform-evidence/bd-live-readback.out`: wb-79k.1/.2 closed-consolidated into **wb-79k.3** (open); wb-752.12 closed into **wb-752.13** (in_progress); wb-9x5.10/.16 closed into **wb-9x5.11** (in_progress). wb-69g.12/wb-6ze.15/wb-0kg.3 are in_progress; wb-h8f.2/.7 and wb-yiu4 open. wb-lri/wb-5uh/wb-x32/wb-cax/wb-f5y in_progress. Closed W marker containers are historical, not new work owners. Re-read before filing; live status does not change pin-time code findings.
- Sibling de-duplication: R363 already owns C156/C229 input-schema paths; do not mint a second schema repair. R327 owns C203/C045/C157/C191 tool-reference reach and R339 owns C213/C130 skill/doc packaging coherence; attach these corroborating claims there. R343 owns detached cancel, R346 Furnace topology, R349 Furnace reply bounds. This shard adds no duplicate cure. R374 is HX/RF ingress only. R387 is status truth, not all stub implementations. R325's execute grants are distinct from R369 provider missing-token refusals.

'''
text=[header]
for r in R:
 basis='; '.join(f"{cid} {C[cid]['grade']}" for cid in r['claims'])
 text.append(f"## {r['req']} — {r['title']}\n\n- Type: {r['type']}\n- Authority: {r['authority']}\n- Statement: {r['statement']}\n- Rationale: {r['rationale']} Audited basis: {basis}, at ce180d82 on 2026-11-11.\n- Acceptance criteria:\n")
 for i,a in enumerate(r['criteria'],1): text.append(f"  {i}. {a}\n")
 text.append(f"- Probe oracle: {r['oracle']}.\n- Evidence tier target: {r['verification']} (NOT_RUN; lower-tier controls also required).\n- Conditions/unknowns: {r['conditions']}\n")
 m=r['family']+'; '+('extends live '+', '.join(r['existingBeads']) if r['existingBeads'] else 'new atomic cut; no exact live owner established')
 if r['priorEAT']: m+='; extends '+', '.join(r['priorEAT'])+' (prior text historical)'
 if r['dependsOnCompiled']: m+='; coordinates with '+', '.join(r['dependsOnCompiled'])
 text.append('- Maps-to: '+m+'.\n\n')
# Complete own-family disposition, with exact independent residuals for broad claims.
covered={c for r in R for c in r['claims']}
alias={'C203':'EAT-R327 (tool-reference corroboration; no duplicate)','C213':'EAT-R339 (skill/doc packaging coherence corroboration; no duplicate)'}
partial={
'C219':'HX pagination/cursor/output-budget projection remains uncompiled; R366 fixes answer semantics only.',
'C220':'Native inspect/observe functionality remains separate from static contract retrieval R368.',
'C222':'Non-envelope stderr cause is blocked by wb-jwc.7 custody pending amendment; preserve actual exit status without claiming stderr capture.',
'C223':'1024-byte diagnostic standard is proposed; implement bounded codepoint-safe representation, not native source expansion.',
'C225':'Claude-topology production wiring remains uncompiled; R374 covers only HX/RF.',
'C227':'Fresh RF producer/result-key contract recapture and standing drift trigger remain uncompiled; R390 preserves loud drift, not a pin bump.',
'C231':'Installed worked role/grant configuration is a documentation leg to R327/R325, not a second missing-grant runtime obligation.',
'C232':'Doctor/preflight binary presence/version listing remains uncompiled.',
'C233':'General capabilityLimits and nodeCap operator knobs remain uncompiled; R372 only deadline composition.',
'C234':'Backend-sensitive node() advertising, provider ID enumeration and catchable-error wording remain uncompiled (also C164/C157).',
'C238':'Dolt daemon side-effect disclosure/notice remains uncompiled; no process reclamation authority inferred.',
'C239':'Registry-derived id rosters/extensibility checklist remain uncompiled; R375 only failure isolation.',
'C241':'Portable PATH lookup and correct Forge probe target remain uncompiled; SUPPORTED developer-layout claim stays scoped.',
'C199':'Actual registry publication remains a separate policy/approval, not the corrected install recipe.',
'C200':'CI historical pass is not inferred; fresh adopted-floor run required.',
'C204':'Receipts/TRACEABILITY pack slimming remains a product boundary decision.',
'C205':'No stale artifact was reproduced; R378 is risk control with a planted mismatch oracle.',
'C209':'R387 repairs status scope/freshness; a fully regenerated measured-row census still requires current feature receipts.',
'C210':'Fork name/version/repository/homepage distribution policy remains uncompiled NORMATIVE_DECISION.',
'C212':'Single-source packaging allow/deny policy remains uncompiled.',
'C214':'Preserve command-doc/CI script parity with its own drift guard; R388 only artifact admission.',
'C215':'Optional/lazy designer TypeScript loading remains an uncompiled SUPPORTED QoL choice; exact pins are not casually removed.',
'C216':'Registry-page rendering remains PLAUSIBLE and unverified; acquire a fork manifest registry render before a media defect claim. No publication authorized.',
'C248':'bypassQueue concurrency containment remains an independent risk-control choice after timer-domain repair.',
'C249':'Invalid enabled-state cleanup is part of error-delivery acceptance; general minimum-rate/concurrency policy is not.',
'C253':'Next-fire timing correctness, width-aware schedule menu and edit/run-now actions remain separate uncompiled obligations.',
'C254':'Cron validation no-timer-leak repair remains uncompiled; existing croner scheduledJobs count is not a complete leak detector.',
'C256':'Duplicate-description job identity/name policy remains uncompiled.',
'C257':'Model-facing list/inspect/cancel schedule tools remain uncompiled; document lifetime without pretending management exists.',
'C258':'Orphan store adoption/cleanup and deleteFileIfEmpty production caller remain uncompiled; R386 owns disclosure only.',
'C259':'Scheduled transcript creation remains uncompiled and SUPPORTED; R386 only discloses actual behavior.',
'C260':'IANA timezone selector and resolved local+UTC next-run reply remain independent uncompiled behaviors.',
'C261':'Strict/coercion policy remains a separate decision; diagnostics do not silently change accepted types.',
'C263':'Model-only docs journey must be driven on a fresh install; generated surface.json is not the reader oracle.',
'C264':'Memory byte cap/truncation marker remains uncompiled; line count alone does not bound context.',
'C265':'Normal-store atomic/stale-lock/lazy-directory positives are controls for R381/R382, not a guarantee on arbitrary filesystems.',
'C266':'Schema removal and refusal ordering preserved in R380; full token-spec baseline has a separate positive control.',
'C267':'Past one-shot/malformed JSON/false fallback controls attach to R379/R384, with source-specific evidence retained.'}
text.append('## Explicit disposition — capacity is not closure\n\nEvery own-family claim has a disposition below. **DEFERRED_FOR_RANGE_CAPACITY** means the parent must allocate a later atomic requirement or carry an explicit unfiled residual; it is not DONE and must not be omitted from a full-system bead plan. A mapped compound claim covers only the invariant in its requirement statement; independent residuals remain named.\n\n| Claim | Grade | Kind | Requirement/disposition | Independent residual or scope guard |\n|---|---|---|---|---|\n')
for c,v in C.items():
 if v['family'] not in ('providers','packaging','scheduling'): continue
 ids=[r['req'] for r in R if c in r['claims']]
 disp=', '.join(ids) or alias.get(c,'DEFERRED_FOR_RANGE_CAPACITY — '+('positive regression requirement still owed' if v['kind']=='positive' else 'follow-on atomic requirement still owed'))
 note=partial.get(c, v['cureHint'] if not ids and c not in alias else 'Only the named statement is compiled; inspect criteria and conditions before assigning closure.')
 text.append(f"| {c} | {v['grade']} | {v['kind']} | {disp} | {note.replace('|','/')} |\n")
text.append('''
## Cross-family scope not silently implemented

- C014/C051 result retention/retrieval, C048/C068/C178 run enumeration, C054 embedded model stop, C257 schedule management: distinct lifecycle requirements remain owed. R343 covers detached cancel only; R357 disk identity recovery is not a run-list or result store. Parent must file these missing requirements separately.
- C002 fail-open agent fallback, C005 frontmatter validation, C021 model-scope syntax, C003/C050/C052 headless work custody, C062 workflow master-switch bypass: established high-impact unselected defects; do not infer cure from settings diagnostics, docs or the native positive guards.
- C049 executable identity, C055 policy application/refusal, C063 function dispatch, C069 shared admission, C078 Furnace control verbs, C102 plus/follow controls, C119 production coordination/collective entrypoints, C126 descriptor invocability, C169 observe mode, C182 aggregates/events/relations, C184 metrics, C185 latency/proposal: R387 makes their measured state honest only. Implement through separate atomic requirements and existing owners, notably MNI P02 wb-y0n6, P03 wb-2ukh, P04 wb-4bxo, P10 wb-yiu4, wb-h8f.7/.2, wb-752.13 and wb-79k.3. No fictitious native API or invocation right is added by status wording.
- C116 content-vs-line doc census and C120 same-cut changed-path enforcement are prerequisites to moving live status text; frozen historical byte pins require owner-governed advance or annotations, not incidental rewriting. C117 master-only corrections must be merged deliberately before any live present-tense claim, not treated as having changed this pin.
- Schema C229 is a corroborating real-provider/oneOf leg of R363, not new scope. C157 is a provider-input table leg of R327; C164/C234 are backend-aware description/error residuals. C083 is a Furnace observer diagnostic leg to extend R349/R367, not proof that R349 already fixed its cause. C044 module-format repair and C193 benchmark progress are still uncompiled.
- No UNDETERMINED top-level ledger row exists. Embedded uncertainty still travels: C120 external machine enforcement, C238 unexamined listening bind, C216 remote media render, C241 cross-host portability, C245 grandchild pipe custody. Missing experiments cannot be filled by wording.

## Positive regression queue

All 43 positives remain upstream obligations, not broad correctness claims. Selected exact-artifact (R388), confinement (R389) and evidence-conservation (R390) invariants cover only their stated forms. Retain focused regressions for C027/C028/C029/C030/C031/C032 (strict roster, loader containment, live-resume refusal, compact spec, traversal, suite evidence); C041/C042 (compact honest receipts, never-reuse/lifecycle); C072-C075 (digest/grants, actionable script misuse, concise launch and golden examples); C093/C094 (read-only native store and phase/provenance); C112-C114 (geometry/injection bounds, measured navigation and cap/control honesty); C132/C133 (seam controls and no-commit truth); C153-C155 (effect tripwire, one-spend decisions and killed-worktree preservation); C174/C175 (typed catchable errors, schema/session/usage honesty); C194-C198 (exact bytes, cursor binding, control phases, addressability, noncausal comparison); C206-C208/C211/C214 (pack/install/checksums/identity/commands); C242-C247 (staged discovery, pre-dispatch refusal, native causes, RF env/reap, scope, drift); C265-C267 (atomic store, disabled schema, past-time/config refusal). Parent must map unselected positives to dedicated narrow regression requirements or existing tests, never close them solely on this roll-up.

## Compilation audit interface

- Exactly 25 unique contiguous IDs R366..R390; one matching JSONL map row per ID, exact claim grades copied from the ledger. No invented claim or Bead ID.
- NOT_RUN acceptance state for every row. Normative numeric diagnostic budget is explicitly chosen; observed timing/counts stay pin-scoped. SUPPORTED and PLAUSIBLE premises are not promoted; C216 remote rendering remains an acquisition residual.
- Active bead consolidation is recorded separately from source evidence. Read back again before amendments. Parent owns broad residual reconciliation across r-lx/r-ops/r-platform and any later shard; this file does not certify an exhaustive implementation-ready set.
''')
(W/'req-r-platform.md').write_text(''.join(text))
with (W/'map-r-platform.jsonl').open('w') as f:
 for r in R:
  row={k:r[k] for k in ('req','type','authority','claims','verification','family','existingBeads','priorEAT','conditions','dependsOnCompiled','oracle')}
  row.update(derivation=('BEHAVIORAL_REPAIR' if r['authority']=='EMPIRICAL_REPAIR' else 'REPAIR_REPRESENTATION' if r['authority']=='LINGUISTIC_INTEGRITY' else 'RISK_CONTROL' if r['authority']=='RISK_CONTROL' else 'NEGATIVE_GUARD'),packet='r-platform',existingGroup=r['family'],epistemic_basis=[{'id':c,'status':C[c]['grade']} for c in r['claims']],acceptanceState='NOT_RUN',scope='ce180d82f9385a315ff26bd8e7f9202cac19f5b3, 2026-11-11')
  f.write(json.dumps(row)+'\n')
print('wrote',len(R),'requirements')
print('ids',R[0]['req'],R[-1]['req'])
print('files:',W/'req-r-platform.md',W/'map-r-platform.jsonl')
