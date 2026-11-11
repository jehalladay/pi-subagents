# ARBITRATION-2026-11-11 - MII triage

## Method

Trigger: at consolidation (Phase 6-9) two Phase 5 audit verdicts did not reproduce against the lens findings and against the audits' own recorded attack results. Arbiter: the Phase 6-9 consolidator. Rule: each row is decided from primary evidence re-read at the pin, never by preferring the later pass, the more conservative status or the majority of lenses. Both readings are kept; the losing ledger rows stay in the .work audit files as evidence.

## Pinned rebuild

Document pin: Pi 3fc0ead1 (docs/pi-*.md sha256-identical to the commit). Environment pins: Pi 0fb9067262532289104417d2b7f2f25704563a75 (pins/pi-0fb90672), MW 69cb016dd293a17bcc893f2baf410a51c226f4c9 (pins/mw-69cb016d).

## Re-run probes

Read-only re-reads at the pins (no new execution; the executed probes are the Phase 3/5 records cited):

| argv | rc | digest |
|---|---|---|
| sed -n 103,108p;133,136p;143,146p pins/pi-0fb90672/src/workbench/function-authority.ts | 0 | see E463 summary (module comment L105-L107, constant L145) |
| grep -rln "adoptFunctionActions\|FUNCTION_ACTION_CONTRACT\|dispatchFunctionWithAuthority" pins/pi-0fb90672/src (excluding the module) | 1 (no match) | empty: no production caller |
| grep -n P7 epistemic-triage/.work/audit-a-protocol.scratch/probe/pi-probe.jsonl | 0 | row 7: viaAdopted=dispatched, viaDefault=entry:function-action-unadopted |
| sed -n 10,22p pins/mw-69cb016d/apps/development-rig/package.json | 0 | exports: ./host, ./package.json only |
| grep -rn reconcileUncertainEffect pins/mw-69cb016d/apps pins/mw-69cb016d/packages (excluding tests and the module) | 1 (no match) | no src caller |
| grep -c ERR_PACKAGE_PATH_NOT_EXPORTED epistemic-triage/.work/lens-mw-src-probe/out/installed-consumer-surface-probe.jsonl | 0 | 6 |

## C107

- Proposition: Embedded premise: at the Pi pin FUNCTION_ACTION_CONTRACT is {state:"unadopted", blockedOn:"MW-CONTRACT"}; no action spelling is adopted, so a function dispatch that passes the earlier authority rules refuses as function-action-unadopted, and the module states routing a function launcher through this boundary is a later cut.
- Reading A (Phase 5 audit): REFUTED
- Reading B (consolidation, from the lenses and the primary evidence): ESTABLISHED
- Evidence inspected: E463, E334 - Module comment L105-L107: 'No action spelling is adopted: FUNCTION_ACTION_CONTRACT is unadopted, so every function dispatch refuses, and one that passes the earlier rules refuses as function-action-unadopted.' L145 exports the frozen default {state:'unadopted', blockedOn: FUNCTION_ACTION_BLOCKER}. grep over src/ excluding the module: no production caller of adoptFunctionActions, FUNCTION_ACTION_CONTRACT or dispatchFunctionWithAuthority. Probe P7-adoption: viaAdopted=dispatched, viaDefault=entry:function-action-unadopted, viaLookalike=entry:function-action-unadopted, dispatchCalls=2.
- Ruling: Reading A (audit): REFUTED because dispatchFunctionWithAuthority reads options.contract, so a dispatch handed an adopted contract passes while the constant stays unadopted. Reading B (six lenses: lineage#0, negative-ev#6, contradict#24, mw-src#13, pi-src#9, joint#15): ESTABLISHED as a statement about the pin. Primary evidence re-read: the sentence is the module's own comment (function-authority.ts:105-107) about the exported default; adoptFunctionActions has no production caller, so no adopted contract can exist in a production process at the pin (negative-ev#6 detection: symbol search over al
- Final status: ESTABLISHED
- verdict_history entry appended: `arbitration-20261111:ESTABLISHED@0fb90672`
- Facet statuses now on the row: {"FUNCTION_ACTION_CONTRACT = {unadopted, blockedOn MW-CONTRACT}": "ESTABLISHED", "no action spelling adopted at the pin (no production adopter)": "ESTABLISHED", "'so a dispatch that passes the earlier rules refuses function-action-unadopted' - for the exported default (the only contract reachable in a production process at the pin)": "ESTABLISHED", "the same sentence as a universal over the helper (any contract)": "REFUTED (an adopted contract dispatches at the helper seam)", "module states routing a launcher through the boundary is a later cut": "ESTABLISHED"}

## C173

- Proposition: P07 change set presupposes existing workflow_control and workflow_reconcile adapters in Pi, a host journal and lease state (from P02), and a Mechanical 'effect-intent lookup' to integrate. Embedded premises: at 0fb90672 the tools exist (control-tool.ts; reconcile-tool.ts registers name 'workflow_reconcile'); at 69cb016d Mechanical exports an effect-intent store/reader (effect-intent.ts: openEffectIntent, attachEffectRefs, settleEffectIntent, readEffectIntent, fileEffectIntentStore; effect-reconciliation.ts: reconcileUncertainEffect, describeLostAcknowledgement).
- Reading A (Phase 5 audit): ESTABLISHED
- Reading B (consolidation, from the lenses and the primary evidence): SUPPORTED
- Evidence inspected: E464, E306 - package.json exports only './host' and './package.json'. effect-intent.ts and effect-reconciliation.ts export the named functions at module level; reconcileUncertainEffect has no caller under apps/ or packages/ outside its module and tests. Installed-consumer probe: importing @mechanical/development-rig/dist/effect-intent.js and dist/effect-reconciliation.js fails ERR_PACKAGE_PATH_NOT_EXPORTED (6 NOT_EXPORTED rows in the probe file).
- Ruling: Reading A (audit): ESTABLISHED, although all three of its attacks (module-vs-package-export, lookup-overclaim, joint-identity-gap) landed and its own permitted wording says Pi 'cannot yet import a producer lookup via the reviewed host subpath'. Reading B (mw-src#9): UNSUPPORTED for the Mechanical half. Primary evidence re-read: package.json exports only ./host and ./package.json; the installed-consumer probe shows ERR_PACKAGE_PATH_NOT_EXPORTED for dist/effect-intent.js and dist/effect-reconciliation.js; reconcileUncertainEffect has no caller outside its module and tests. The Pi half is entaile
- Final status: SUPPORTED
- verdict_history entry appended: `arbitration-20261111:SUPPORTED@69cb016d`
- Facet statuses now on the row: {"Pi workflow_control/workflow_reconcile adapters and a journal exist": "ESTABLISHED", "MW effect-intent/effect-reconciliation functions exist at module level": "ESTABLISHED", "MW 'exports' them (package export reachable by Pi)": "REFUTED (ERR_PACKAGE_PATH_NOT_EXPORTED)", "a producer 'effect-intent lookup' keyed by invocation exists to integrate": "UNSUPPORTED (path-addressed single-file reader; no index; no caller)", "host journal and lease state from P02": "NON-EPISTEMIC (future)"}

## Remediation impact

- C107: REFUTED -> ESTABLISHED; REMEDIATION.md rows M102 (NARROW_SCOPE), M103 (ADD_MISSING_PREMISE). Leaves the inverse-coverage set (no longer REFUTED/UNSUPPORTED); its NARROW_SCOPE/ADD_MISSING_PREMISE rows are forward repairs.
- C173: ESTABLISHED -> SUPPORTED; REMEDIATION.md rows M179 (SPLIT_CLAIM), M180 (ADD_MISSING_PREMISE). Enters SUPPORTED; SPLIT_CLAIM/ADD_MISSING_PREMISE rows map the unsupported facet.

Not arbitrated (recorded as facet statuses on the rows instead): C028, C030, C155, C022-C025, C075, C095, C142, C163, C214/C215, where the lens graded a facet or a reading the audit had already addressed in its permitted wording and remediation.
