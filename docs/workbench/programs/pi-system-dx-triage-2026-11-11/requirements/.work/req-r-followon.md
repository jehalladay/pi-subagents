# Follow-on atomic requirements — EAT-R471..EAT-R488

Requirement-set roll-up, 2026-11-11. Source pin **ce180d82f9385a315ff26bd8e7f9202cac19f5b3**; all acceptance **NOT_RUN**. EAT-R391..R470 are reserved by the MII triage and are not allocated here.

Uses the single V ladder and V→L normalization in REQUIREMENTS.md / TDD-MATRIX.md. Oracles below are existing probes/tests extended into red-first acceptance; baseline receipts are evidence, not acceptance passes. Repo paths resolve under `pin-ce180d82/`; `probes/` paths resolve from the triage root. Missing acquisition artifacts are explicitly BLOCKED. No beads, source files, credentials or production resources are mutated.

## EAT-R471 — Make advertised executable catalog references launchable

- Type: BEHAVIORAL
- Authority: EMPIRICAL_REPAIR
- Statement: Every workflow definition reference advertised by workflow_catalog as executable MUST be accepted by workflow_execute in the same authorized scope while its source digest and grants remain valid.
- Rationale: C059 ESTABLISHED reproduced refusal of catalog-issued user-agent-directory definitions and definitions on a 289-byte workspace path; the working saved-name path is the contrast, not permission to accept arbitrary outside-root paths. Scope: ce180d82, 2026-11-11; later-tip results require re-adjudication.
- Acceptance criteria:
  1. Assert using probes/execute/real-extension.probe.test.ts C_userLevelSaved (baseline probes/execute/results/real-extension.json) that a catalog-issued definition in the documented agent-directory saved root completes via workflow_execute under the same grants that admit SubagentWorkflow by name.
  2. Assert using probes/execute/execute-misc.probe.test.ts R_longPath (baseline probes/execute/results/execute-misc.json) that the exact catalog reference on the long-path fixture launches with its scope intact, rather than requiring an operator-made relative id.
  3. Assert using probes/execute/real-extension.probe.test.ts D_grants/I_staleAndResume that revoked grants, stale digests and unadvertised outside-root sources still refuse before launcher invocation.
- Probe oracle: probes/execute/real-extension.probe.test.ts C_userLevelSaved, D_grants, I_staleAndResume; probes/execute/execute-misc.probe.test.ts R_longPath; captured registered tools and launcher counters
- Evidence tier target: V3 (NOT_RUN; normalized lower-tier controls in TDD-MATRIX.md).
- Conditions / unknowns: Only entries advertised executable are covered; an intentionally unavailable host/source must be labeled before launch. No broadening of source authority.
- Preserves: C072 ESTABLISHED (positive; retained regression, not derivation premise); C075 ESTABLISHED (positive; retained regression, not derivation premise).
- Maps-to: execute catalog-to-launch; no exact existing live repair owner established; R324/R325 admission controls remain binding.

## EAT-R472 — Refuse known host-incompatible definitions before launch

- Type: BEHAVIORAL
- Authority: EMPIRICAL_REPAIR
- Statement: workflow_execute admission MUST refuse a definition whose statically identified workflow primitives are unavailable in the selected hostMode before starting that host.
- Rationale: C060 ESTABLISHED reproduced the same digest completing embedded and failing detached on workflow() or node(), despite an ok launched reply. This adopts preflight refusal rather than inventing detached nested/provider support; static projection is not a proof about hidden dynamic calls. Scope: ce180d82, 2026-11-11; later-tip results require re-adjudication.
- Acceptance criteria:
  1. Assert using probes/execute/execute-extra.probe.test.ts N_hostParity that detached admission of the existing nested workflow() and node() fixtures returns typed host-incompatible-definition naming the unavailable primitive with zero detached host starts.
  2. Assert the same N_hostParity fixtures still complete embedded and an agent-less supported definition completes detached; compare source digests and real terminal receipts, not merely launch ok.
  3. Assert using probes/execute/execute-misc.probe.test.ts S_validatePreflight that the selected-host compatibility finding agrees with admission on the statically identified calls; dynamic/unknown analysis remains explicitly unknown.
- Probe oracle: probes/execute/execute-extra.probe.test.ts N_hostParity; probes/execute/execute-misc.probe.test.ts S_validatePreflight; host-start count and detached terminal receipt
- Evidence tier target: V3 (NOT_RUN; normalized lower-tier controls in TDD-MATRIX.md).
- Conditions / unknowns: Known static incompatibility only. Dynamic calls and detached capability implementation remain separate; do not treat a preflight pass as native execution proof.
- Preserves: C072 ESTABLISHED (positive; retained regression, not derivation premise).
- Maps-to: execute host admission; coordinates R321/R324/R387; no new authority or producer API.

## EAT-R473 — Read back the exact started Forge operation

- Type: BEHAVIORAL
- Authority: EMPIRICAL_REPAIR
- Statement: A forge_gate_run launch reference MUST address the same operation through a registered scope-authorized observation read until its terminal observation can be retrieved.
- Rationale: C177 ESTABLISHED reproduced a real Forge operation reaching the host projection while every registered read of its operation id refused; a new forge.gate.status operation is not evidence about the launched one. Scope: ce180d82, 2026-11-11; later-tip results require re-adjudication.
- Acceptance criteria:
  1. Assert using probes/observe/t/d-forge-readback.probe.test.ts (baseline probes/observe/out/D1-forge-readback.json) that the launch reply supplies the exact reference used by a registered read to retrieve the producer-reported terminal observation of that same operation.
  2. Assert the same real Forge fixture binds provider/type/id and authorized host scope, and a foreign-scope read refuses; compare to the native operation receipt and the distinct-id contrast in probes/observe/out/J1-forge-workaround.json.
  3. Assert the read preserves not-asserted before observation and indeterminate/partial selection evidence at terminal; a completed producer phase does not manufacture verified-success or causation.
- Probe oracle: probes/observe/t/d-forge-readback.probe.test.ts; probes/observe/out/D1-forge-readback.json and J1-forge-workaround.json; real Forge app-server operation identity
- Evidence tier target: V6 (NOT_RUN; normalized lower-tier controls in TDD-MATRIX.md).
- Conditions / unknowns: G-FORGE AVAILABLE/NOT_RUN. No global list, cross-session retention or operation control authority implied; enumeration remains C178 residual.
- Preserves: C197 ESTABLISHED (positive; retained regression, not derivation premise).
- Maps-to: observe/Forge exact operation readback; coordinates wb-5uh and R374/R390, extend existing observation surface rather than fork its reply dialect.

## EAT-R474 — Enforce coordination latency without blocking the host

- Type: BEHAVIORAL
- Authority: EMPIRICAL_REPAIR
- Statement: The coordination boundary MUST settle an over-budget producer call by its declared latencyMs deadline without blocking the hosting event loop.
- Rationale: C123 ESTABLISHED measured a 50 ms budget echoed as honored after a 2002 ms synchronous export and a 1992 ms late host timer. The seam is unwired at the pin: this specifies module safety before wiring, not a shipped coordination caller. Scope: ce180d82, 2026-11-11; later-tip results require re-adjudication.
- Acceptance criteria:
  1. Assert using probes/interop/probe-coordination.mjs section 5 and test/workbench-mechanical-coordination.test.ts that the existing 2000 ms spinning export under latencyMs:50 returns a typed resolution/over-budget refusal without waiting for the spin to finish.
  2. Assert an independent 10 ms host timer remains serviceable while that export is isolated, and after refusal its execution context settles or terminates with no live owned worker; record clock tolerance explicitly in the process receipt.
  3. Assert a finite within-budget export still validates successfully and a producer echo cannot make an over-budget invocation read success.
- Probe oracle: probes/interop/probe-coordination.mjs section 5; probes/interop/probe-coordination.out; test/workbench-mechanical-coordination.test.ts; independent host timer and owned-worker readback
- Evidence tier target: V5 (NOT_RUN; normalized lower-tier controls in TDD-MATRIX.md).
- Conditions / unknowns: Module/seam acceptance, not a registered route. Process trials use disposable producer fixtures. Scheduling tolerance is recorded, not silently substituted for the input budget.
- Maps-to: interop coordination safety; existing MNI P03 wb-2ukh integration dependency; no bead mutation or new function-host grant.

## EAT-R475 — Refuse nonregular descriptor handles without blocking

- Type: BEHAVIORAL
- Authority: EMPIRICAL_REPAIR
- Statement: The descriptor boundary MUST refuse a descriptorPath whose opened handle is not a regular file without a blocking read.
- Rationale: C125 ESTABLISHED reproduced an unsettled FIFO descriptor read at 3011 ms and timeout exit 124 at 20 seconds, while artifactPath and the coordination descriptor sibling refused the same file class. Unwired seam evidence does not establish a product-path hang. Scope: ce180d82, 2026-11-11; later-tip results require re-adjudication.
- Acceptance criteria:
  1. Assert using probes/interop/probe-descriptor.mjs section 5 and test/workbench-mechanical-descriptor.test.ts that the FIFO descriptorPath settles descriptor/not-a-file before attempting a blocking read, with the same typed classification as the artifactPath control.
  2. Assert using probes/interop/probe-descriptor-fifo-exit.mjs fifo that the process exits normally within the harness deadline after the refusal, as the regular-file control does; compare probes/interop/probe-descriptor-fifo-exit.out baseline rc=124.
  3. Assert a regular descriptor still reaches digest/schema validation, and judging the opened handle (rather than a pre-open path stat alone) rejects a replacement with a nonregular handle.
- Probe oracle: probes/interop/probe-descriptor.mjs; probes/interop/probe-descriptor-fifo-exit.mjs; probes/interop/probe-coordination-fifo.mjs sibling control; test/workbench-mechanical-descriptor.test.ts
- Evidence tier target: V5 (NOT_RUN; normalized lower-tier controls in TDD-MATRIX.md).
- Conditions / unknowns: No descriptor root-authority change, runtime dispatch or hostile-same-user certification. Only handle class and nonblocking custody are specified.
- Maps-to: interop descriptor safety; existing P02 wb-y0n6 admission container; module tests before product wiring.

## EAT-R476 — Settle agent shutdown without stale-context rejections

- Type: BEHAVIORAL
- Authority: EMPIRICAL_REPAIR
- Statement: Settling an in-flight agent after session disposal MUST produce no unhandled rejection or callback access through the disposed extension context.
- Rationale: C023 ESTABLISHED records two unhandled stale-context errors from the real extension probe, on the manager error-settle and mention-clone fallback paths. The real Pi exit-code/stack-trace consequence is only PLAUSIBLE within that claim and is not promoted by this repair. Scope: ce180d82, 2026-11-11; later-tip results require re-adjudication.
- Acceptance criteria:
  1. Assert using probes/agents/p15-headless-background.probe.test.ts (baseline probes/agents/out/p15-run.log) that both success and rejected agent settlement after disposal yield zero unhandledRejection events and zero accesses to the stale ctx notify/ui getters.
  2. Assert test/mention-clone.test.ts controls plus the mention-clone rejection fixture terminate their fallback promise chain without stale ctx access, while a still-active session receives its one normal completion notification.
  3. Assert test/subagents-print-mode-e2e.test.ts can dispose while an agent is pending and the harness settles cleanly without delaying disposal solely to avoid stale context; do not infer headless result custody from clean shutdown.
- Probe oracle: probes/agents/p15-headless-background.probe.test.ts and out/p15-run.log; test/mention-clone.test.ts; test/subagents-print-mode-e2e.test.ts; rejection/stale-getter counters
- Evidence tier target: V5 (NOT_RUN; normalized lower-tier controls in TDD-MATRIX.md).
- Conditions / unknowns: C003/C050/C052 headless work/result custody remains deferred; clean shutdown is not proof that background results survive.
- Maps-to: agents disposal/mention-clone; no exact live owner established; C003 headless lifecycle is independent.

## EAT-R477 — Use one effective model resolver across agent start paths

- Type: BEHAVIORAL
- Authority: EMPIRICAL_REPAIR
- Statement: Every agent start path MUST resolve the same agent-file model pin to the same effective model or the same explicit unresolved-pin refusal under an identical registry and parent basis.
- Rationale: C004 ESTABLISHED reproduced the Agent tool selecting the pinned small model while direct mention and the RPC/scheduler funnel selected the parent for the same file. The current host registry is a fixture basis, not a universal generation ordering. Scope: ce180d82, 2026-11-11; later-tip results require re-adjudication.
- Acceptance criteria:
  1. Assert using probes/agents/p10-model-two-paths-e2e.probe.test.ts that Agent, direct mention and programmatic RPC/scheduler starts select the same model for the documented family alias and shipped Explore file under the identical registry.
  2. Assert the same probe extended with a from-disk resume resolves the same file pin identically; an unavailable pin returns the same explicit refusal on all paths rather than silently choosing the parent.
  3. Assert probes/agents/p01-model-resolution.probe.test.ts and test/model-resolver.test.ts retain explicit provider/id and documented alias controls without introducing the generation substitution prohibited by R314.
- Probe oracle: probes/agents/p10-model-two-paths-e2e.probe.test.ts; probes/agents/p01-model-resolution.probe.test.ts; test/model-resolver.test.ts; childSessionCreatedWithModel and refusal counters
- Evidence tier target: V3 (NOT_RUN; normalized lower-tier controls in TDD-MATRIX.md).
- Conditions / unknowns: Resolver parity only. Wizard registry choices C025 and accepted model-scope syntax C021 remain separate residuals.
- Preserves: C032 ESTABLISHED (positive; retained regression, not derivation premise).
- Maps-to: agents start/resume model parity; coordinates R313/R314 disclosures; no exact existing live repair owner established.

## EAT-R478 — Acquire outside-machine same-cut enforcement evidence

- Type: VERIFICATION
- Authority: EVIDENCE_ACQUISITION
- Statement: Any certification of outside-machine enforcement of the same-cut rule MUST carry a source-bound enforcement configuration and invocation receipt for a seam-changing cut.
- Rationale: C120 ESTABLISHED establishes repository detection-surface gaps; outside-machine enforcement is an embedded UNDETERMINED leg, not an established absence. This row acquires that leg only; R387 owns repository status and changed-path enforcement. Scope: ce180d82, 2026-11-11; later-tip results require re-adjudication.
- Acceptance criteria:
  1. Assert a receipt names the external enforcement configuration revision, exact base/head, changed seam paths, validator argv/exit and same-cut skill/doc decision; compare the cut to qa/workbench/mwi-release.mjs and probes/interop/mwi-release.wb-ocie-landing-1037.out rather than trusting a prose assurance.
  2. Assert a disposable seam-only cut and a matching same-cut documentation control are distinguishable in that external receipt; absent configuration or producer invocation evidence records BLOCKED on G-EXTERNAL-ENFORCEMENT, never PASS or evidence of absence.
- Probe oracle: qa/workbench/mwi-release.mjs; probes/interop/mwi-release.wb-ocie-landing-1037.out and mwi-release.wb-s8rm-landing-1043.out; required source-bound external configuration/invocation receipt (absent)
- Evidence tier target: V0 (NOT_RUN; normalized lower-tier controls in TDD-MATRIX.md).
- Conditions / unknowns: G-EXTERNAL-ENFORCEMENT BLOCKED: outside-machine configuration and producer invocation receipt are not named at the pin. No external machine or production changes are authorized.
- Maps-to: interop same-cut acquisition; R387 status/enforcement basis; extend no implementation scope.

## EAT-R479 — Acquire live Forge reconcile binding evidence

- Type: VERIFICATION
- Authority: EVIDENCE_ACQUISITION
- Statement: Forge reconciliation binding certification MUST be based on a captured live gate.status envelope bound to the exact journaled operation reference.
- Rationale: C142 ESTABLISHED covers real HX/RF binding defects and the unknown-producer dead end; its Forge leg was explicitly NOT_RUN/UNDETERMINED. Acquiring a Forge envelope does not repair or certify those distinct binding defects. Scope: ce180d82, 2026-11-11; later-tip results require re-adjudication.
- Acceptance criteria:
  1. Assert an extension of probes/journal/p12-real-cli-evidence.probe.ts drives a real Forge gate on a disposable fixture and records the gate.status envelope operation_id, requested journal reference, nativeRef and receipt binding class with producer version/argv/exit.
  2. Assert the matched-operation and unrelated-operation controls yield distinguishable binding outcomes, and an unrelated status envelope cannot license producer-confirmed effect settlement; missing executable, fixture or operation envelope records BLOCKED on G-FORGE.
- Probe oracle: probes/journal/p12-real-cli-evidence.probe.ts and out/p12-real-cli-evidence.json; probes/observe/t/d-forge-readback.probe.test.ts live fixture; qa/workbench/forge-gate-status-probe.mjs
- Evidence tier target: V6 (NOT_RUN; normalized lower-tier controls in TDD-MATRIX.md).
- Conditions / unknowns: G-FORGE AVAILABLE/NOT_RUN; effect row may be planted and must be labeled as such (C145: no shipped effectful producer). Never claim production replay safety from the planted row.
- Maps-to: journal/Forge acquisition; R357 replay identity controls and R473 same-operation readback; C142 binding implementation residual retained.

## EAT-R480 — Acquire authorized fork registry media rendering evidence

- Type: VERIFICATION
- Authority: EVIDENCE_ACQUISITION
- Statement: A claim about the fork artifact registry page media MUST be supported by a captured render of the identified authorized fork artifact.
- Rationale: C216 PLAUSIBLE predicts upstream media on a future fork registry page from manifest URLs; no remote rendering was measured. The premise remains PLAUSIBLE regardless of the force of this evidence requirement. Scope: ce180d82, 2026-11-11; later-tip results require re-adjudication.
- Acceptance criteria:
  1. Assert the acquisition records the artifact identity/version, manifest media URLs, page URL, capture date and rendered image/video source, with the npm-view identity receipt shape in probes/packaging/npm-view-published.json as a control for upstream-versus-fork distinction.
  2. Assert the capture actually belongs to the authorized fork artifact rather than the upstream package; if no approved published artifact or authenticated rendering capture exists, record BLOCKED on G-FORK-MEDIA and retain PLAUSIBLE, never substitute a local HTML mock or publish a package to manufacture the oracle.
- Probe oracle: probes/packaging/npm-view-published.json; package.json manifest pi.video/pi.image; required authorized fork registry-page render receipt (absent)
- Evidence tier target: V2 (NOT_RUN; normalized lower-tier controls in TDD-MATRIX.md).
- Conditions / unknowns: G-FORK-MEDIA BLOCKED: approved published fork identity and its remote render capture are absent. G-NPM AVAILABLE alone does not satisfy the gate. No publication, upload or impersonating registry mock is authorized.
- Maps-to: packaging media acquisition; R376 install identity; wb-cax distribution policy dependency only.

## EAT-R481 — Acquire native-tier portability evidence outside the developer layout

- Type: VERIFICATION
- Authority: EVIDENCE_ACQUISITION
- Statement: Native-read tier portability certification MUST include a receipt from an independent host layout without the original developer-home executable paths.
- Rationale: C241 SUPPORTED is a code-read developer-layout dependency with a reproduced wrong Forge default-target sub-leg; the tier has passed only where that absolute HX path exists. Cross-host portability remains unmeasured. Scope: ce180d82, 2026-11-11; later-tip results require re-adjudication.
- Acceptance criteria:
  1. Assert test/workbench-ecosystem-native.test.ts via the native-read command defined in forge.toml runs from an independently installed checkout using that host's declared PATH/HYPERUNIX_HX and records resolved binaries, versions, cwd and test result without /home/jehallad being available.
  2. Assert qa/workbench/forge-gate-status-probe.mjs on that checkout records its own repository target (or explicitly refuses a missing required target), not the two-directories-above default; compare probes/providers/qa-forge-gate-status-default.out and qa-forge-gate-status-pin.out.
  3. Assert missing second-host access or native executables records BLOCKED on G-CROSS-HOST with the exact missing host/runtime, not a mock pass or inference from this host's eight passing tests.
- Probe oracle: test/workbench-ecosystem-native.test.ts; forge.toml native-read; qa/workbench/forge-gate-status-probe.mjs; probes/providers/vitest-native-read.log and qa-forge-gate-status-{default,pin}.out
- Evidence tier target: V6 (NOT_RUN; normalized lower-tier controls in TDD-MATRIX.md).
- Conditions / unknowns: G-CROSS-HOST BLOCKED: no independent-host layout/runtime receipt is present. Portable PATH lookup and Forge target implementation remain residual, not silently fixed by this acquisition.
- Maps-to: providers native portability; wb-lri/wb-5uh test-tier dependencies; no host provisioning or remote changes authorized.

## EAT-R482 — Acquire RF descendant-pipe settlement evidence

- Type: VERIFICATION
- Authority: EVIDENCE_ACQUISITION
- Statement: RF deadline lifecycle certification MUST include a process-tree receipt for a child whose grandchild retains the stdout pipe.
- Rationale: C245 ESTABLISHED establishes allowlisted environment and direct-child reaping/slot release; its first trial observed retained inFlight while a grandchild held the pipe. Descendant custody and final settlement are not closed by that direct-child positive. Scope: ce180d82, 2026-11-11; later-tip results require re-adjudication.
- Acceptance criteria:
  1. Assert an extension of probes/providers/h05-rf-deadline.mjs uses a disposable RF stand-in that leaves an identified grandchild holding stdout, recording parent/child/grandchild pids, deadline time, pipe closure and registry inFlight until final settlement or an explicitly timed out observation window.
  2. Assert the no-grandchild positive repeats the direct-child disappearance and inFlight:0 of probes/providers/h05b-run.out, while the held-pipe variant cannot be certified solely because the direct child disappeared; retain probes/providers/h05-run.out as the caveat baseline.
  3. Assert the receipt distinguishes producer/fixture identity and owned descendants from unrelated processes; if the controlled descendant fixture or process-tree readback is absent, record BLOCKED on G-DESCENDANT-PIPE, never infer descendants were reaped.
- Probe oracle: probes/providers/h05-rf-deadline.mjs; probes/providers/h05-run.out and h05b-run.out; controlled descendant process/pipe/slot readback
- Evidence tier target: V5 (NOT_RUN; normalized lower-tier controls in TDD-MATRIX.md).
- Conditions / unknowns: G-DESCENDANT-PIPE BLOCKED until the instrumented descendant fixture and final process-tree/pipe receipt exist. R372/R389 direct-child/environment positives remain scoped. No global process sweep or kill authority.
- Maps-to: providers/RF lifecycle acquisition; R372/R389 bounded deadline/confinement controls; wb-x32 dependency.

## EAT-R483 — Require explicit loopback binding for RF-spawned Dolt servers

- Type: NEGATIVE_REGRESSION
- Authority: RISK_CONTROL
- Statement: Every rf-spawned dolt sql-server launch MUST supply an explicit host flag binding it to 127.0.0.1.
- Rationale: C238 ESTABLISHED records the persistent daemon side effect but did not examine bind addresses. The owner-directed receipt probes/reqset-rollup/c238-bind-address.txt (2026-11-11T07:32:01Z, named host) resolves that leg: all four observed Dolt server listeners were 127.0.0.1 and each real process argv supplied -H/--host 127.0.0.1. This is a regression guard under RISK_CONTROL, not a claim about every other host or an acquisition unknown. Scope: ce180d82, 2026-11-11; later-tip results require re-adjudication.
- Acceptance criteria:
  1. Assert on a disposable Dolt-backed RF workspace using the probes/providers/h09-rf-dolt-daemon.out journey that the rf-spawned process argv contains -H 127.0.0.1 or --host 127.0.0.1 (including an equivalent explicit --host=127.0.0.1 form), and independent socket readback shows that process listening only at loopback; use probes/reqset-rollup/c238-bind-address.txt as the positive baseline.
  2. Assert a launcher-contract test over captured argv refuses omission of the host flag and wildcard/nonloopback values; do not start the unsafe mutants as real servers or treat an implicit default as equivalent to an explicit flag.
- Probe oracle: probes/reqset-rollup/c238-bind-address.txt; probes/providers/h09-rf-dolt-daemon.out; rf-spawned argv capture plus PID-bound ss socket readback
- Evidence tier target: V6 (NOT_RUN; normalized lower-tier controls in TDD-MATRIX.md).
- Conditions / unknowns: Bind-address unknown RESOLVED at the receipt host/date; regression acceptance NOT_RUN. G-RF AVAILABLE. Daemon side-effect disclosure, notice and reclamation policy remain C238 implementation residual; no cleanup, network exposure or persistent production daemon modification authorized.
- Maps-to: providers/RF spawn safety; wb-x32 dependency; closed wb-pfxo.8 is lineage only, not a target.

## EAT-R484 — Deny fallback to an unavailable agent configuration

- Type: BEHAVIORAL
- Authority: EMPIRICAL_REPAIR
- Statement: Resolving an unknown or disabled agent type MUST NOT spawn a fallback whose target configuration is disabled or absent from the effective roster.
- Rationale: C002 ESTABLISHED reproduced an all-tools child under disableDefaultAgents:true and under enabled:false on general-purpose; fallbackSubagent:none provides the working refusal control. This repair is effective-roster confinement, not removal of an explicitly enabled fallback. Scope: ce180d82, 2026-11-11; later-tip results require re-adjudication.
- Acceptance criteria:
  1. Assert using probes/agents/p11-disable-and-fallback.probe.test.ts that disableDefaultAgents:true with only a read-only custom agent refuses unknown/general-purpose requests with zero child starts and no hard-coded bash/edit/write fallback.
  2. Assert the enabled:false general-purpose fixture refuses identically, while the fallbackSubagent:none refusal and an explicitly enabled fallback target retain their intended behaviors; compare child tool rosters and invocation counters in the same probe.
  3. Assert test/agent-types.test.ts and nested/programmatic start controls apply the same effective-roster judge rather than bypassing it outside the top-level Agent tool.
- Probe oracle: probes/agents/p11-disable-and-fallback.probe.test.ts and out/p11-disable-and-fallback.json; test/agent-types.test.ts; child-start/tool-roster counters
- Evidence tier target: V3 (NOT_RUN; normalized lower-tier controls in TDD-MATRIX.md).
- Conditions / unknowns: No tool-grant broadening. C005 frontmatter fail-open validation and C021 model-scope syntax remain independent.
- Preserves: C027 ESTABLISHED (positive; retained regression, not derivation premise).
- Maps-to: agents effective dispatch roster; wb-f5y permissions container coordination; no new bead.

## EAT-R485 — Apply workflowsEnabled to every scripted launch surface

- Type: BEHAVIORAL
- Authority: EMPIRICAL_REPAIR
- Statement: With workflowsEnabled:false, every registered scripted-workflow launch surface MUST refuse before starting an embedded or detached host.
- Rationale: C062 ESTABLISHED reproduced detached workflow_execute launch despite the documented workflow switch, while embedded and the CLI flag already refused. The switch does not revoke unrelated native reads or forbid scoped inspection of existing runs. Scope: ce180d82, 2026-11-11; later-tip results require re-adjudication.
- Acceptance criteria:
  1. Assert using probes/execute/real-extension.probe.test.ts E_workflowsDisabled that embedded and detached workflow_execute requests both refuse with workflows-disabled (or are unregistered) and produce zero launcher/host starts despite held execute/detach grants.
  2. Assert the directly registered workflow_detached launch, SubagentWorkflow and probes/execute/cli-flag.probe.test.ts V_cliFlag obey the same disabled setting; inspection of an already authorized existing run is not mistaken for launch.
  3. Assert the enabled-state golden launch still completes and any registered disabled refusal names workflowsEnabled and its settings location without leaking caller data.
- Probe oracle: probes/execute/real-extension.probe.test.ts E_workflowsDisabled/A_goldenEmbedded; probes/execute/cli-flag.probe.test.ts V_cliFlag; registered-launch counters
- Evidence tier target: V3 (NOT_RUN; normalized lower-tier controls in TDD-MATRIX.md).
- Conditions / unknowns: Launch switch only, not retroactive cancellation or denial of existing-run inspection. Settings diagnostics R384 remain separate.
- Preserves: C075 ESTABLISHED (positive; retained regression, not derivation premise).
- Maps-to: execute launch admission; wb-f5y config/permissions coordination; no exact standalone live repair owner established.

## EAT-R486 — Make authorized embedded workflow cancellation model-reachable

- Type: BEHAVIORAL
- Authority: EMPIRICAL_REPAIR
- Statement: An authorized model-facing control call using an embedded workflow launch reference MUST request cancellation of that same live run.
- Rationale: C054 ESTABLISHED reproduced running embedded workflows refusing every model stop action until natural completion. This row compiles embedded cancel only; detached stop is R343 and its shutdown/reclamation residual is not smuggled into this statement. Scope: ce180d82, 2026-11-11; later-tip results require re-adjudication.
- Acceptance criteria:
  1. Assert using probes/execute/execute-extra.probe.test.ts M_noModelStop that workflow_control cancel on the returned pi-workflow task reference reaches the actual task abort controller before natural completion; use the running observation and abort/cancel receipt as independent oracles.
  2. Assert foreign-scope, unknown and unauthorized target controls execute zero abort calls using test/workbench-control.test.ts and the same booted tool objects; cancellation requested is not labeled completed/rolled-back unless producer settlement supports it.
  3. Assert control followed by workflow_observe reports the same identity and honest requested/settled phase; a normal uncancelled golden workflow still returns its result.
- Probe oracle: probes/execute/execute-extra.probe.test.ts M_noModelStop; test/workbench-control.test.ts; actual abort-controller and observe/control phase receipts
- Evidence tier target: V3 (NOT_RUN; normalized lower-tier controls in TDD-MATRIX.md).
- Conditions / unknowns: Embedded cancel only. Detached authority/projection ingress is compiled R343; host shutdown/reclamation remains implementation residual. No broad signal forwarding or grant bypass.
- Preserves: C196 ESTABLISHED (positive; retained regression, not derivation premise).
- Maps-to: execute/observe embedded control; R343 detached specialization and R335 phase honesty; no duplicate detached repair bead.

## EAT-R487 — Retrieve completed agent results after live-record eviction

- Type: BEHAVIORAL
- Authority: EMPIRICAL_REPAIR
- Statement: get_subagent_result MUST resolve an authorized completed agent result from its retained tombstone/session after the live record is evicted.
- Rationale: C014 ESTABLISHED reproduced the record absent at eleven minutes while a tombstone still held the session file; the model could not retrieve the 4800-character result although a user mention could reopen the session. This row covers result read only, not resumed execution or steering. Scope: ce180d82, 2026-11-11; later-tip results require re-adjudication.
- Acceptance criteria:
  1. Assert using probes/agents/p06-eviction-handles.probe.test.ts G1 plus test/agent-manager-gc.test.ts that after eleven-minute GC the retained id/handle resolves the full last assistant result, including a planted tail marker, through the actual get_subagent_result tool.
  2. Assert foreign scope, mismatched tombstone identity and absent/corrupt session data refuse without reading arbitrary caller paths or starting a child; missing data is distinguished from unknown id with the permitted recovery hint.
  3. Assert reading the result does not resume the agent or mark unrelated live results consumed; the authorized session read agrees with its persisted content.
- Probe oracle: probes/agents/p06-eviction-handles.probe.test.ts G1; probes/agents/out/p06-g1-eviction.json; test/agent-manager-gc.test.ts; session-file bytes and child-start counters
- Evidence tier target: V5 (NOT_RUN; normalized lower-tier controls in TDD-MATRIX.md).
- Conditions / unknowns: Tombstone-backed model resume and steer remain C014 implementation residual. Does not mandate indefinite retention or cross-operator access.
- Maps-to: agents result custody; coordinates R315 reference vocabulary and R357 host-scoped recovery; no exact live owner established.

## EAT-R488 — Keep full workflow return values retrievable after preview truncation

- Type: BEHAVIORAL
- Authority: EMPIRICAL_REPAIR
- Statement: A completed embedded workflow return value truncated in its notification MUST remain retrievable through an authorized model-reachable full-result reference without rerunning the workflow.
- Rationale: C051 ESTABLISHED reproduced a 7003-character return losing its end on both workflow_execute and the Pi-backend SubagentWorkflow, with no retrieval surface or result file. Preview bounds can remain; this repair is full-result custody, not larger notifications. Scope: ce180d82, 2026-11-11; later-tip results require re-adjudication.
- Acceptance criteria:
  1. Assert using probes/execute/real-extension.probe.test.ts G_completion.long and probes/execute/cli-flag.probe.test.ts W_piBackendLongResult that the completion reply names a full-result reference whose read reproduces all 7003 characters including the end marker without any second workflow dispatch.
  2. Assert small and large values use the same authorized retrieval contract, with the existing bounded notification retaining an explicit truncation marker; retrieval can page or point to scoped persisted bytes but cannot silently truncate the full value.
  3. Assert a foreign-scope result read and a missing/corrupt result refuse truthfully without substituting an unrelated value or rerunning JavaScript; compare persisted/returned digest and dispatch counts.
- Probe oracle: probes/execute/real-extension.probe.test.ts G_completion.long; probes/execute/cli-flag.probe.test.ts W_piBackendLongResult; notification/full-result byte digest and dispatch counters
- Evidence tier target: V3 (NOT_RUN; normalized lower-tier controls in TDD-MATRIX.md).
- Conditions / unknowns: Embedded return values only; retention duration/adopted storage policy and detached terminal-result behavior remain separate. The R345 owner ruling forbids inferring a replayed detached verdict after host loss.
- Preserves: C074 ESTABLISHED (positive; retained regression, not derivation premise); C075 ESTABLISHED (positive; retained regression, not derivation premise).
- Maps-to: execute result custody; R321 reply next-step orientation; no exact existing live repair owner established.

## F-01 uncompiled remainder

Each of the six rows is **DEFERRED_FOR_RANGE_CAPACITY**: uncompiled implementation, not repaired by adjacent requirements. The cureHint is copied from the investigator ledger. The owner allocates no requirement id for these rows in this roll-up.

| Claim | Grade | Family | Disposition | cureHint |
|---|---|---|---|---|
| C020 | ESTABLISHED | agents | DEFERRED_FOR_RANGE_CAPACITY | Derive the memory directory from a slug (handleBase) or reject the combination at load with the file named; add the directory line to the read-only block. |
| C025 | SUPPORTED | agents | DEFERRED_FOR_RANGE_CAPACITY | Offer registry-derived choices in the wizard (newest per family), or write a family alias once fuzzy resolution prefers the newest id. |
| C066 | ESTABLISHED | execute | DEFERRED_FOR_RANGE_CAPACITY | Return details {taskId} and add renderCall/renderResult that reuse renderWorkflowCard for embedded launches and a compact one-line render for detached launches and refusals (refusals styled as errors). |
| C070 | SUPPORTED | execute | DEFERRED_FOR_RANGE_CAPACITY | Add a wiring test that boots the extension in a hermetic dir and runs workflow_catalog -> workflow_execute(embedded) -> completion notification, plus the user-level-definition and stale-digest refusals. |
| C071 | ESTABLISHED | execute | DEFERRED_FOR_RANGE_CAPACITY | Add `--subagents-workflow-args=<json &#124; @file>` (JSON-checked like the tool's args) and give flag runs a journal path so resumeFromRunId works. |
| C124 | ESTABLISHED | interop | DEFERRED_FOR_RANGE_CAPACITY | Export one grant-list judge and one clean-text judge from a shared module (settings.ts already owns the grammar) and have the three seams import it; decide in writing whether coordination's narrower rule is intended and pin the five forms above either way. |

## Scope-preserving residuals

C059 unadvertised source authority and C060 dynamic compatibility are not broadened. C014 model resume/steer after tombstone eviction is still a distinct residual from R487 result read; C054 detached shutdown/reclamation is distinct from R486 embedded cancel and R343 detached cancel. C238 bind-address uncertainty is RESOLVED by the receipt, while daemon disclosure/notice/reclamation remains uncompiled. C142, C241 and C120 acquisition rows do not implement their separate repairs. REQUIREMENTS.md carries one canonical disposition for every claim.
