import json, re
W = "/workplace/jehallad/AgentEcosystem/ForgeWorkspaces/Pi/PiSubagents/scratch/pi-system-triage-1111"
P = json.load(open(f"{W}/requirements/.work/reqset-audit/parsed.json"))
reqs, maps = P["reqs"], P["maps"]
L = {}
for line in open(f"{W}/epistemic-triage/CLAIMS.jsonl"):
    line = line.strip()
    if line:
        d = json.loads(line); L[d["id"]] = d
G = {"ESTABLISHED": "EST", "SUPPORTED": "SUP", "PLAUSIBLE": "PLA"}

# L0 conditions per row (fix-list references)
L0 = {
 "EAT-R328": "COND(F-02 wb-9x5.16 closed->wb-9x5.11; F-09 C194 map-only)",
 "EAT-R331": "COND(F-02 wb-9x5.16 closed->wb-9x5.11)",
 "EAT-R329": "COND(F-02 wb-79k.1/.2 closed->wb-79k.3)",
 "EAT-R349": "COND(F-03 restates wb-752.13 scope: file as extension)",
 "EAT-R374": "COND(F-03 restates wb-79k.3 scope: file as extension)",
 "EAT-R345": "COND(F-04 conflicts docs/workbench/08 + wb-0kg.3 falsifier: owner ruling owed)",
 "EAT-R351": "COND(F-05 pty gate has no EVIDENCE_ACQUISITION row)",
 "EAT-R352": "COND(F-05 pty gate has no EVIDENCE_ACQUISITION row)",
 "EAT-R367": "COND(F-12 wb-jwc.7 is closed/landed, not an open bead; F-08 C083 attach)",
 "EAT-R387": "COND(F-05 C120 outside-machine unknown has no acquisition gate; F-08 C049/C078/C102/C169/C110/C161/C172 dual disposition)",
 "EAT-R357": "COND(F-09 C145 cited without grade, absent from map; F-08 dual disposition)",
 "EAT-R321": "COND(F-09 C074 map-only)",
 "EAT-R322": "COND(F-09 C073 map-only)",
 "EAT-R326": "COND(F-09 C030 grade not stated)",
 "EAT-R327": "COND(F-08 C203/C045/C157 attachments not in map)",
 "EAT-R339": "COND(F-08 C213 attachment not in map)",
 "EAT-R363": "COND(F-08 C229 attachment vs table deferral)",
 "EAT-R372": "COND(F-08 C168 tabled DEFERRED in r-ops yet compiled here)",
 "EAT-R376": "COND(F-05 C216 PLAUSIBLE remote render: acquisition residual unrowed)",
 "EAT-R366": "COND(F-15 condition overstated: vendored @hyperunix/sdk 0.1.0 exposes answer projections via events() and answerCount; only the find()/rows() path drops them)",
}
for rid in ["EAT-R315","EAT-R319","EAT-R328","EAT-R329","EAT-R330","EAT-R332","EAT-R335"]:
    L0[rid] = (L0.get(rid, "") + "; " if rid in L0 else "") + "COND(F-10 three-MUST statement: split per criterion at filing)"

# tier cell plans by requirement; keys L1..L10; default '·'
def plan(**kw):
    base = {f"L{i}": "·" for i in range(1, 11)}
    base.update(kw); return base

V3_LX   = dict(L2="A", L3="A", L4="A", L8="A", L9="A", L10="A")
V3_BEH  = dict(L3="A", L4="A", L9="A", L10="A")
V3_LIFE = dict(L3="A", L4="A", L6="A", L9="A", L10="A")
V5_PROC = dict(L1="A", L3="A", L4="A", L5="A", L6="A", L9="A", L10="A")
V2_DOC  = dict(L1="A", L6="A*(G-CONSUMER)", L7="A*(G-CONSUMER)", L8="A*(G-CONSUMER)", L9="S", L10="A")
V1_SEAM = dict(L2="S", L3="·", L4="A", L9="A", L10="A")

rows = {}
notes = {}
def R(rid, *bases, **over):
    d = {f"L{i}": "·" for i in range(1, 11)}
    for b in bases: d.update(b)
    d.update(over); rows[rid] = d

# ---- r-lx (R311..R340)
R("EAT-R311", V3_LX, L5="A");      notes["EAT-R311"] = "L3 probes/agents p02 registered capture; L5 refusal-class matrix (5 refusal classes x top/nested); L8 agent retries on isError. NOT_RUN."
R("EAT-R312", V3_LIFE, L2="A");    notes["EAT-R312"] = "L6 resume-while-running lifecycle (p05 R1 + p13 contrast); guard in AgentManager.resume covers nested tool. NOT_RUN."
R("EAT-R313", V3_LX, L5="A");      notes["EAT-R313"] = "L5 p01 fuzzyTable + p07 H1 + p03 F2 batteries; L8 model reads Type/Handle back into resume. NOT_RUN."
R("EAT-R314", V3_LX, L5="A");      notes["EAT-R314"] = "L5 over this host's real `pi --offline --list-models` rows (host-dependent fixture: record the row list). NOT_RUN."
R("EAT-R315", V3_LIFE, L2="A");    notes["EAT-R315"] = "L6 queued->running->wrap-up lifecycle (p03 F5 maxConcurrent:1, p16 grace off-by-one). NOT_RUN."
R("EAT-R316", V3_LX);              notes["EAT-R316"] = "L3 p03 F1 + p04 S1/S2; preserve C028 containment (positive control). NOT_RUN."
R("EAT-R317", V3_LX, L1="A");      notes["EAT-R317"] = "L1 host fixture `~/.skills/<name>` (host-skill-index-size.mjs); cross-repo rf/hx legs out of scope (route-to-rf, route-to-hx). NOT_RUN."
R("EAT-R318", V3_LX, L5="A");      notes["EAT-R318"] = "L5 prompt-size battery (p12 K1/C1, 150-exchange fixture); budget default is NORMATIVE (disclosed). NOT_RUN."
R("EAT-R319", V3_LX);              notes["EAT-R319"] = "NORMATIVE_DECISION (README:78 documented design); L8 fan-out 3 agents/1 get_subagent_result call. NOT_RUN."
R("EAT-R320", V3_LX, L1="A");      notes["EAT-R320"] = "L1 packed-artifact census for the <=2 KB authoring reference (V2 leg, criteria 2-3); L3 p11 mid-session. NOT_RUN."
R("EAT-R321", V3_LX, L6="A");      notes["EAT-R321"] = "L6 embedded vs detached completion paths (real-extension F_detachedGolden/A_goldenEmbedded); wb-69g.12 redaction invariants on new reply shape; wb-0kg.3 receipt must keep passing. NOT_RUN."
R("EAT-R322", V3_LX, L5="A");      notes["EAT-R322"] = "L5 52-case script-runtime corpus (withLocation==withError). NOT_RUN."
R("EAT-R323", V3_BEH, L2="A");     notes["EAT-R323"] = "L3 execute-misc S_validatePreflight + script-runtime Q_toolLevel; assert zero side effects at admission (vm.Script construct only). NOT_RUN."
R("EAT-R324", V3_LX, L5="A");      notes["EAT-R324"] = "L5 K_piValidation 5-mistake matrix; wb-69g.12 Q3 Bearer redaction on every new refusal string. NOT_RUN."
R("EAT-R325", V3_LX, L1="A", L7="A"); notes["EAT-R325"] = "L1 docs/workflows.md grant-table census (V0 leg); L7 operator grant journey; backend choice (src/index.ts:2684) not decided here. NOT_RUN."
R("EAT-R326", V3_LX, L1="A");      notes["EAT-R326"] = "NORMATIVE_DECISION; L1 descriptionBytes census (<=4096 under compact selection) via execute-extra L_tokenCost. NOT_RUN."
R("EAT-R327", V2_DOC, L9="S", L4="S"); notes["EAT-R327"] = "V2: L1 `npm pack --dry-run` census (observe/out/K-npm-pack-dry.json shape); L6/L7/L8 installed-docs journeys via G-CONSUMER; L4/L9 S (generated doc text; drift test is the unit). Doc census must be content-keyed (C116). NOT_RUN."
R("EAT-R328", V3_LX, L5="A");      notes["EAT-R328"] = "L5 20-node real-scope fixture (observe i-defaults I1) + qa tool-reply-bench truncated-rate; preserve C194/C195. Bead: wb-9x5.11 (not wb-9x5.16, closed). NOT_RUN."
R("EAT-R329", V3_BEH, L6="A", L2="A"); notes["EAT-R329"] = "L6 live host-fed stream freshness (observe A1/B2); red-first re-pin of test/workbench-pi-observe.test.ts:231-257 (anchor verified at pin). Bead: wb-79k.3 only. NOT_RUN."
R("EAT-R330", V3_LX, L5="A");      notes["EAT-R330"] = "L5 cap-eviction battery (A3/A4/A5: 4550 events over 4096 cap); new cursor refusal joins C195 family. NOT_RUN."
R("EAT-R331", V3_LX, L5="A");      notes["EAT-R331"] = "L5 2000-node fixture pushdown (A7) + bench tone@16384 series; preserve C194 byte-cap exactness. Bead: wb-9x5.11. NOT_RUN."
R("EAT-R332", V3_LX, L5="A", L1="A"); notes["EAT-R332"] = "NORMATIVE_DECISION (upstream 25/25 precedent); L1/L5 described-parameter census 74/74 (observe e-schema E1) + spec-bytes bench. NOT_RUN."
R("EAT-R333", V3_LX, L5="A");      notes["EAT-R333"] = "L5 eleven observe refusal cases + compare (B3/B5) + three-tool contract test; must not fork a second envelope (wb-752.13, wb-h8f.7). NOT_RUN."
R("EAT-R334", V3_LX, L8="A");      notes["EAT-R334"] = "L8 follow-the-hint loop test (confirmation hint spelled as schema parameter); grants census in docs/workflows.md. NOT_RUN."
R("EAT-R335", V3_LX, L6="A");      notes["EAT-R335"] = "L6 observe->control->observe loop (c-control C2); receipts appended not overwritten. NOT_RUN."
R("EAT-R336", V3_LX, L6="A");      notes["EAT-R336"] = "L6 failure -> evidenceRef -> bounded entry journey; new tool vs observe mode is design; wb-6ze.15 TUI evidence view must keep passing. NOT_RUN."
R("EAT-R337", V1_SEAM, L5="A");    notes["EAT-R337"] = "V1 at pin: interop surface is test-only (C119); L2 S = no registered caller at pin (registered repetition owed at wiring, EAT-R265 lineage); pinned order row test/workbench-function-authority.test.ts:1683 verified at pin. NOT_RUN."
R("EAT-R338", V1_SEAM, L5="A");    notes["EAT-R338"] = "V1 seam oracles (probe-source-admission, probe-collective); L5 bound/cause enum battery; L2 S as R337. NOT_RUN."
R("EAT-R339", V2_DOC, L4="S", L9="S"); notes["EAT-R339"] = "V2: L1 npm pack --dry-run (interop/npm-pack-dry-run.json shape); L8 'discover interop from the installed artifact alone' via G-CONSUMER; wb-yiu4 P10 blocked behind P08/P09 - this row lands before P10. NOT_RUN."
R("EAT-R340", V1_SEAM, L1="A");    notes["EAT-R340"] = "NORMATIVE_DECISION; L1 comment-census oracle (bytes before first exported signature); L4 descriptor section-4 typed refusals; line-pinned docs census (C116) may go red when prose moves. NOT_RUN."

# ---- r-ops (R341..R365)
R("EAT-R341", V5_PROC, L5="A", L2="·"); notes["EAT-R341"] = "L1 hermetic symlinked HOME + process-count/owner oracle (detached P8, both registered launch tools); L6 launch lifecycle. NOT_RUN."
R("EAT-R342", V5_PROC, L1="A");     notes["EAT-R342"] = "L5 300 KiB success vs thrown-error controls (detached P5); every snapshot within declared byte bound. NOT_RUN."
R("EAT-R343", V5_PROC, L2="A", L1="A*(G-FURNACE?)"); notes["EAT-R343"] = "L1 is the script-path registered launch+cancel (no Furnace needed; gate marker only if the ExecutorApp profile is exercised); promote test/workbench-detached-control-live.test.ts from seeded projection to registered launch/inspect/control; zero cancels for observe-only/missing-grant/foreign scope. NOT_RUN."
R("EAT-R344", V5_PROC, L1="A");     notes["EAT-R344"] = "L5 transport-loss classes (P1/P3/P4 + timeout fixture); never 'host lost' for a nonexistent id. NOT_RUN."
R("EAT-R345", L1="A*(G-RULING)", L3="A*(G-RULING)", L4="A*(G-RULING)", L5="A*(G-RULING)", L6="A*(G-RULING)", L9="A*(G-RULING)", L10="A*(G-RULING)"); notes["EAT-R345"] = "BLOCKED on G-RULING: docs/workbench/08-lifecycle-and-recovery.md ('does not replay a saved terminal verdict') is asserted as a falsifier by open bead wb-0kg.3; R345's saved-verdict-after-graceful-expiry needs an owner ruling and doc amendment first. No cell may run before the ruling."
R("EAT-R346", V3_LIFE, L1="A*(G-FURNACE)", L2="A", L6="A*(G-FURNACE)"); notes["EAT-R346"] = "V6: real Furnace Run/Attempt via furnace 0.1.0 on PATH (AVAILABLE, NOT_RUN); native store byte-identity oracle; closed wb-752.12 is lineage only. NOT_RUN."
R("EAT-R347", V3_BEH, L5="A", L2="A"); notes["EAT-R347"] = "L5 five closed refusal codes through the registered control tool (control-harness C6). NOT_RUN."
R("EAT-R348", V3_BEH, L1="A*(G-FURNACE)", L2="A", L6="A*(G-FURNACE)"); notes["EAT-R348"] = "V6: uncertain-execution reasons under reply.control with native echo (control-harness C7 + control-live uncertain rows). NOT_RUN."
R("EAT-R349", V3_LX, L5="A", L1="A*(G-FURNACE)"); notes["EAT-R349"] = "V6 + registered reply contract; 20-Attempt truncation fixture; EXTENDS wb-752.13 (in_progress, same scope) and depends on wb-h8f.7 builder: attach criteria to that bead, do not file a second one. NOT_RUN."
R("EAT-R350", V5_PROC, L1="·", L7="A"); notes["EAT-R350"] = "L7 operator UX at 80x24 through real TuiMainScreen compositeOverlays (inspector p01/p01b/p19); hermetic (no pty needed). NOT_RUN."
R("EAT-R351", V5_PROC, L1="·", L7="A*(G-PTY)"); notes["EAT-R351"] = "L3/L6 hermetic real ToolExecutionComponent (p18 boots the extension); L7 A* G-PTY credentialed live card-counter capture: BLOCKED (no credentialed Pi pty capture exists; C096 UNDETERMINED leg) - record BLOCKED, never PASS."
R("EAT-R352", V5_PROC, L1="·", L7="A*(G-PTY)"); notes["EAT-R352"] = "L3/L6 production onProgress path (p08); L7 A* G-PTY four-view status-glyph falsifier: BLOCKED (qa/workbench/live-inspector-receipt.mjs is the wb-6ze.15 deliverable, absent at pin, plus credentials). Freshness only; intervals/topology are deferred residuals."
R("EAT-R353", V5_PROC, L1="·", L7="A"); notes["EAT-R353"] = "L7 keyboard journey x/Esc/q/Ctrl-C via WorkflowDialog host (p06); exactly one stop callback. NOT_RUN."
R("EAT-R354", V5_PROC, L1="·", L7="A"); notes["EAT-R354"] = "L5 FIFO-eviction battery; L7 Enter/c act on the pointer key (p05 + onOpenTranscript spy). NOT_RUN."
R("EAT-R355", V5_PROC, L1="·", L7="A"); notes["EAT-R355"] = "L7 typing 'forge' into the filter editor keeps rich view (p22 + p04 controls). NOT_RUN."
R("EAT-R356", V5_PROC, L1="·", L6="·", L7="A"); notes["EAT-R356"] = "L4/L5 geometric clipping over buildTimelineLanes (p16, p15b); L6 · (pure renderer). Lineage wb-9x5.11. NOT_RUN."
R("EAT-R357", V5_PROC, L1="A", L2="A"); notes["EAT-R357"] = "L6 two-extension-process restart (journal p01/p01b); provider-call-count oracle; C145 stand-in is probe-only (not shipped effect). NOT_RUN."
R("EAT-R358", V3_LIFE, L5="A", L2="A"); notes["EAT-R358"] = "L5 unknown-id/invalid-schema/missing-grant x zero provider invocations (p07b/p07); marker written+readback before provider invoke. NOT_RUN."
R("EAT-R359", V5_PROC, L1="A", L7="·"); notes["EAT-R359"] = "L1 mode 0444 source journal (p06); provider invocation count unchanged on refused spend. NOT_RUN."
R("EAT-R360", V3_BEH, L5="A", L2="A"); notes["EAT-R360"] = "L4 classifyJournal on raw bytes (test/workflow-journal-compat.test.ts, exports verified by hx at pin); L5 dropped-row corpus (p09 C). NOT_RUN."
R("EAT-R361", V3_LIFE, L5="A", L2="A"); notes["EAT-R361"] = "L5 decline-reason matrix (basis/failed entry/edited prompt/resumed/replay-unsafe; p09 D, p08, p14); 2001-path cap reported measured-unavailable. NOT_RUN."
R("EAT-R362", V3_LIFE, L2="A");     notes["EAT-R362"] = "L6 pause/unpause lifecycle: still-live refusal before journal copy; worker-launch-count test (node-rpc probe8 scenario). NOT_RUN."
R("EAT-R363", V3_LX, L5="A");       notes["EAT-R363"] = "L5 node schema diagnostics matrix (probe1 1a/1b/1c/1o) + redaction + RPC round-trip (CapabilityError identity). C229 oneOf leg attaches here (F-08). NOT_RUN."
R("EAT-R364", V3_LX);               notes["EAT-R364"] = "L2/L3 category preserved through completeWorkflowTask/formatWorkflowNotification (probe2 2b). NOT_RUN."
R("EAT-R365", V3_BEH, L2="A", L5="A"); notes["EAT-R365"] = "L4/L5 collapsed-agents vs raw-event counts (p09 N: 3/3 not 3/9). NOT_RUN."

# ---- r-platform (R366..R390)
R("EAT-R366", V3_LX, L1="A*(G-HX)", L5="A", L6="A*(G-HX)"); notes["EAT-R366"] = "V6: real `hx --hxs` answer/answer-coverage frames vs filesystem control (hx 0.1.0 AVAILABLE, NOT_RUN); NOT BLOCKED on the SDK: node_modules/@hyperunix/sdk/dist/execution.js:8-9 streams answer projections as events and result.js:184/439 carries answerCount — the cure consumes events(), not rows(); zero rows at partial coverage never license absence. NOT_RUN."
R("EAT-R367", V3_LX, L1="A*(G-HX,G-RF,G-FORGE)", L5="A"); notes["EAT-R367"] = "V6 real HX invalid-kind, RF unknown-view/model, Forge target cases; c4 non-envelope stderr retention BLOCKED pending amendment of the landed wb-jwc.7 custody pin (bead CLOSED, landing 1052) - supply exit status + unavailable cause meanwhile. 1024-byte budget is NORMATIVE. NOT_RUN."
R("EAT-R368", V3_LX, L5="A");       notes["EAT-R368"] = "L3 registered contract route with provider-call counters at zero (node-e2e S7, h04). NOT_RUN."
R("EAT-R369", V3_LX, L5="A");       notes["EAT-R369"] = "L5 grant-conjunction matrix (h03 grant matrix, node-e2e S5, capability-surface-parity test). NOT_RUN."
R("EAT-R370", V3_BEH, L1="A*(G-HX,G-RF,G-FORGE,G-FURNACE)", L2="A", L5="A"); notes["EAT-R370"] = "V6: hermetic reduced-PATH per real launch seam (nobin-which.out shape); no live child/slot leak. NOT_RUN."
R("EAT-R371", V3_LIFE, L1="A*(G-RF)", L2="A"); notes["EAT-R371"] = "V6: realpath/symlink/trailing-slash roots vs `rf --workspace` canonicalization control; in-session setting change invalidates binding. NOT_RUN."
R("EAT-R372", V3_LIFE, L1="A*(G-RF,G-HX)", L5="A"); notes["EAT-R372"] = "V6: barrier/clock-controlled rf child 30-60 s (h05); HX budget exhaustion before registry cutoff; grandchild pipe retention NOT certified (C245 caveat). NOT_RUN."
R("EAT-R373", V3_LIFE, L1="A*(G-RF,G-FORGE)", L2="A"); notes["EAT-R373"] = "V6: no phantom active node after RF/Forge completion (vt/observe-rf, vt/observe); Furnace branch code-supported only - not certified here. NOT_RUN."
R("EAT-R374", V3_LIFE, L1="A*(G-HX,G-RF)", L2="A"); notes["EAT-R374"] = "V6 registered HX/RF node() -> adapter snapshot kinds + relations without seeding; EXTENDS wb-79k.3 (open, same consolidated scope): attach as acceptance on that bead, do not file a second one. NOT_RUN."
R("EAT-R375", V3_BEH, L1="A", L5="A"); notes["EAT-R375"] = "L1 resolve-hook failure per optional SDK (h06) + registration census; twelve tools stay registered. NOT_RUN."
R("EAT-R376", V2_DOC, L4="S", L9="S", L1="A*(G-NPM)"); notes["EAT-R376"] = "V2: L1 `npm view` network oracle (G-NPM AVAILABLE; packaging/npm-view-published.json shape) + clean consumer identity (G-CONSUMER); C216 PLAUSIBLE remote render stays an acquisition residual (no publication authorized). NOT_RUN."
R("EAT-R377", V2_DOC, L4="A", L9="A", L1="A*(G-NODE22)"); notes["EAT-R377"] = "V2: L1 floor-runtime gate under node 22.23.2 (mise-installed, AVAILABLE, NOT_RUN) and 24.20.0; L4 workbench-dependency-census drift test extended to ci.yml. Floor policy choice is NORMATIVE. NOT_RUN."
R("EAT-R378", V2_DOC, L4="A", L9="A", L5="A"); notes["EAT-R378"] = "RISK_CONTROL (C205 SUPPORTED, no stale artifact reproduced); L5 planted source/dist sentinel mismatch through package-smoke.sh + install-smoke.mjs; rebuild local only, never on the S3 mount. NOT_RUN."
R("EAT-R379", V3_BEH, L5="A", L2="A"); notes["EAT-R379"] = "L5 bounds battery B1-B4 with fake timers (1000..2147483647 ms); zero jobs/timers/spawns on refusal. NOT_RUN."
R("EAT-R380", V3_LIFE, L2="A", L7="A"); notes["EAT-R380"] = "L6/L7 Settings off/on sequence via actual SettingsList (wiring W4/W5); ready-event/timer/spawn counts. NOT_RUN."
R("EAT-R381", V5_PROC, L1="A", L7="·"); notes["EAT-R381"] = "L1 truncated store bytes preserved in named recovery file (store-nextrun S2); replace the 'self-heals' characterization red-first. NOT_RUN."
R("EAT-R382", V5_PROC, L1="A", L7="·"); notes["EAT-R382"] = "L5 live-owner lock + 10 ms heartbeat oracle (store-nextrun S1); spin-loop mutant fails. NOT_RUN."
R("EAT-R383", V3_LX, L5="A", L6="A"); notes["EAT-R383"] = "L5 invalid cron/input/combination x isError:true (wiring W2, bounds B4/B6); L6 fire-time failure -> one sanitized error naming the job id. NOT_RUN."
R("EAT-R384", V3_LX, L5="A", L1="A"); notes["EAT-R384"] = "L1 file/layer/key warning capture (settings-memory-menu T1/T2); L5 wrong-type/unknown-key/invalid-enum battery. NOT_RUN."
R("EAT-R385", V3_BEH, L1="A", L7="A"); notes["EAT-R385"] = "L1 project-file key census after one toggle (T3/W4); L7 operator menu journey; no mass migration of existing project files. NOT_RUN."
R("EAT-R386", V2_DOC, L4="A", L9="S"); notes["EAT-R386"] = "V2: L4 schema/default-derived table generated from src/settings.ts census; L7/L8 installed-docs configuration recipe via G-CONSUMER; surface.json file list is NOT the reader oracle. NOT_RUN."
R("EAT-R387", L1="A", L4="A", L9="S", L10="A"); notes["EAT-R387"] = "V0: L1 import-census + registered-tool census + status-ledger/mwi-release validators; L4 feature-matrix row/evidence validator; status truth only (stub implementation stays with MNI owners wb-y0n6/wb-2ukh/wb-4bxo, wb-79k.3/wb-h8f.7/wb-752.13); C120 outside-machine enforcement remains UNDETERMINED - name G-EXTERNAL-ENFORCEMENT if ever claimed. NOT_RUN."
R("EAT-R388", V2_DOC, L4="A", L9="A", L5="A", L7="·", L8="·"); notes["EAT-R388"] = "NEGATIVE_REGRESSION (positives C206/C207/C208/C211/C214); L1 package-smoke.sh + install-minimal.mjs read-only consumer (G-CONSUMER); L5 private-state/vendor-byte mutants. NOT_RUN."
R("EAT-R389", V3_LX, L1="A*(G-RF,G-HX,G-FORGE)", L5="A", L8="·", L6="·"); notes["EAT-R389"] = "NEGATIVE_REGRESSION (positives C243/C245/C246/C072/C031); L5 revoked-grant/digest/outside-root/traversal x zero provider starts; RF child env allowlist; descendant cleanup not inferred. NOT_RUN."
R("EAT-R390", V3_LX, L1="A*(G-RF)", L5="A", L6="·"); notes["EAT-R390"] = "NEGATIVE_REGRESSION (11 positives); L1 vitest.rf.config.ts drift oracle against real rf 0.1.883 (red baseline providers/vitest-rf-preview.log) - a version/key drift must fail or BLOCK, never skip; L5 cap/eviction/cursor batteries. NOT_RUN."

assert set(rows) == set(reqs), set(reqs) ^ set(rows)

out = []
out.append("# TDD-MATRIX — Pi-subagents system DX/UX/LX triage, EAT-R311..EAT-R390\n")
out.append("Pin: **ce180d82f9385a315ff26bd8e7f9202cac19f5b3** (worktree `pin-ce180d82`, HEAD verified by `hx --workspace pin-ce180d82 git refs` and `git rev-parse HEAD` on 2026-11-11). L0 of every row is **this audit** (`REQUIREMENTS-AUDIT.md`, 2026-11-11). Every other cell is **NOT_RUN** unless it says **BLOCKED**; nothing in this matrix is a green claim. Verdict vocabulary: `A` apply, `A*(gate)` apply only through the named real-infrastructure gate, `S` deliberately skipped (reason in Notes), `·` structurally not applicable.\n")
out.append("## Tier legend\n\n| Tier | Meaning here |\n|---|---|\n| L0 | Requirements ingestion + traceability = this audit's per-row verdict (PASS / COND(fix ids)). |\n| L1 | Shell-based integration: `npm pack`, installs, process/file/owner oracles, real producer CLIs, censuses run from outside the process. |\n| L2 | External client / agent-consumable contract: reply envelopes, schemas, refusal members an agent branches on. |\n| L3 | Framework integration: the actual registered Pi tool objects captured from the booted extension (`test/helpers/boot-extension.ts` shape), real TUI components, only I/O boundaries injected. |\n| L4 | Pre-implementation unit: module/seam red-first tests and mutants. |\n| L5 | Test batteries: matrices over the input surface (refusal classes, bounds, fixtures). |\n| L6 | E2E lifecycle: launch -> ... -> completion/restart/teardown. |\n| L7 | User (operator) journeys: TUI/keyboard/settings/install docs. |\n| L8 | Agent journeys: discover/invoke/inspect/recover from installed docs and replies alone. |\n| L9 | Post-implementation coverage / branch evidence on the changed code. |\n| L10 | Critical audit + release verification: re-pin, receipts, re-gate after any further source change. |\n")
out.append("## Shard evidence-tier normalization (the three shards used conflicting V ladders — fix F-07)\n\n| Shard V | r-lx meaning | r-ops meaning | r-platform meaning | L tiers used here |\n|---|---|---|---|---|\n| V0 | static census at pin | — | pinned static evidence/status | L1 census + L10 |\n| V1 | focused red/green at module/seam (mutant) | focused red/green and mutants | focused red/green | L4 (+L5) |\n| V2 | fresh packed/installed consumer | 'packed Mechanical ABI' (not awarded) | independently installed artifact | L1 + L6/L7/L8 via G-CONSUMER |\n| V3 | registered Pi tool via booted extension | registered routing, injected finite callbacks | registered Pi tool, controlled I/O | L3 (+L2, L8) |\n| V4 | joined native producer CLIs | 'native interop tier' (not awarded) | joined mandatory native Mechanical path | — (no row targets V4) |\n| V5 | restart/fault/load | crash/restart/operational/UX trials | process/restart/fault/operational | L1 + L5 + L6 (+L7) |\n| V6 | — | actual optional Furnace/HX/RF producers | optional native producer acceptance | L1/L6 via G-HX, G-RF, G-FORGE, G-FURNACE |\n")
out.append("## Gate registry (named real-infrastructure gates; status measured on this host 2026-11-11)\n\n| Gate | What it is | Status on this host | Exact artifact when BLOCKED |\n|---|---|---|---|\n| G-HX | real `hx` (HyperUnix) CLI driven through the SDK/provider | AVAILABLE — `/home/jehallad/.local/bin/hx` 0.1.0; vendored `@hyperunix/sdk` 0.1.0 streams answer projections (`events()`), so R366 is not SDK-blocked | — |\n| G-RF | real `rf` CLI | AVAILABLE — `/home/jehallad/.local/bin/rf` 0.1.883, 89 leaves / 81 reachable, mismatch:false (`rf --json --version` receipt `reqset-audit/rf-version.json`) | — (dolt 2.2.4 present for `--backend dolt` legs) |\n| G-FORGE | real `forge` CLI | AVAILABLE — forge 0.2.1 | — |\n| G-FURNACE | real `furnace` CLI + disposable Runs | AVAILABLE — furnace 0.1.0 | — (control probes only on newly created disposable runs) |\n| G-CONSUMER | fresh HOME/LANG/PATH/TMPDIR consumer of the packed tarball (`qa/workbench/install-minimal.mjs`, `installed-consumer.mjs`) | AVAILABLE, NOT_RUN | — |\n| G-NODE22 | declared-floor runtime trial under Node 22 | AVAILABLE — mise node 22.23.2 (also 24.20.0, 18.20.2) | — |\n| G-NPM | network read of the npm registry (`npm view`) | AVAILABLE (probe `packaging/npm-view-published.json` exists) — network-dependent | — |\n| G-PTY | credentialed real Pi (pi 1.2.0) terminal session over a pty running a live workflow | **BLOCKED** | credentialed model access for a live session + `qa/workbench/live-inspector-receipt.mjs` (wb-6ze.15 deliverable, absent at pin: `ls pin-ce180d82/qa/workbench` has no live-inspector-receipt.mjs) |\n| G-RULING | owner ruling on a design conflict | **BLOCKED** for R345 | ruling + amendment of docs/workbench/08-lifecycle-and-recovery.md 'does not replay a saved terminal verdict' and wb-0kg.3's falsifier scope |\n| G-EXTERNAL-ENFORCEMENT | evidence that the same-cut rule is enforced outside the repository (C120 UNDETERMINED leg) | **BLOCKED** | an outside-machine enforcement artifact (none named at the pin); repository enforcement is the only detection surface |\n")
out.append("## Matrix\n")
out.append("| Requirement | Title | Basis (ledger grade) | Authority | Shard V | L0 (this audit) | L1 | L2 | L3 | L4 | L5 | L6 | L7 | L8 | L9 | L10 | Notes / gates (all NOT_RUN unless BLOCKED) |")
out.append("|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|")
for rid in sorted(reqs, key=lambda x: int(x[5:])):
    r = reqs[rid]; m = maps[rid]
    cl = sorted(set(m["claims"]) | set(r["rationale_claims"]), key=lambda c: int(c[1:]))
    basis = ", ".join(f"{c}({G[L[c]['grade']]})" for c in cl)
    v = re.sub(r"\s*\(.*", "", r["fields"]["Evidence tier target"]).rstrip(".")
    l0 = L0.get(rid, "PASS")
    cells = rows[rid]
    title = r["title"].replace("|", "/")
    if len(title) > 70: title = title[:67] + "..."
    out.append(f"| {rid} | {title} | {basis} | {r['fields']['Authority']} | {v} | {l0} | " + " | ".join(cells[f'L{i}'] for i in range(1, 11)) + f" | {notes[rid]} |")
out.append("\n## Reading the matrix\n\n- **L0** is the only tier with a verdict; `PASS` means the row is traceable, non-laundering and executable as written; `COND(F-xx)` names the fix items in `REQUIREMENTS-AUDIT.md` that must land before the row is filed or implemented. No row is `FAIL` at L0: the compiled statements themselves are sound; the conditions are mapping, custody and gate defects.\n- **BLOCKED** cells: R345 (every cell, G-RULING), R351/R352 L7 (G-PTY), R367 criterion 4 (amendment of the landed wb-jwc.7 custody pin), R387 C120 leg (G-EXTERNAL-ENFORCEMENT). A BLOCKED cell is recorded as BLOCKED with its artifact in the acceptance run; it is never recorded as PASS or silently skipped.\n- **A\\*(G-...)** cells run only against the real artifact the gate names; a helper, fixture or injected callback does not discharge them (r-ops/r-platform contract: 'Direct injected callbacks are V3, never native proof').\n- **S** cells: L4/L9 on doc-only REPRESENTATION rows (R327, R339, R376, R386 partial) — the unit is the generated-text drift test, and branch coverage of prose is structurally meaningless; L2 on the V1 interop rows (R337, R338, R340) because no registered caller exists at the pin (C119) — the registered repetition is owed at wiring (EAT-R265 lineage).\n- Every `A`/`A*` maps to the named probe/test/qa oracle in the requirement's own criteria (all 81 path references and 52 bare probe names resolve under `probes/` or the pin — verified by this audit).\n- Residual queue outside this matrix: the 13 uncovered defect claims (F-01), the 14 prose-only deferrals (F-13) and every `DEFERRED_FOR_RANGE_CAPACITY` table row in req-r-ops.md / req-r-platform.md need follow-on IDs (EAT-R391+) before they can have a row here.\n")
open(f"{W}/requirements/TDD-MATRIX.md", "w").write("\n".join(out) + "\n")
print("rows:", len(rows), "written", f"{W}/requirements/TDD-MATRIX.md")
