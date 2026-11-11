"""Generate requirements/TDD-MATRIX.md for the MII Phase 10.9 audit. Reads drafts, maps, ledger; writes one file."""
import json, pathlib, re, sys, collections
sys.path.insert(0, str(pathlib.Path(__file__).parent))
import audit_data as D

ROOT = pathlib.Path(sys.argv[1])
WORK = ROOT / "requirements" / ".work"
reqs = {int(r["id"][5:]): r for r in json.loads((WORK / "req-audit" / "reqs-parsed.json").read_text())}
maps = {}
for f in sorted(WORK.glob("map-*.jsonl")):
    for line in f.read_text().splitlines():
        m = json.loads(line)
        maps[int(m["requirement"][5:])] = m
claims = {r["id"]: r for r in map(json.loads, (ROOT / "epistemic-triage" / "CLAIMS.jsonl").read_text().splitlines())}
IDS = list(range(391, 471))
GR = {"E": "ESTABLISHED", "S": "SUPPORTED", "P": "PLAUSIBLE", "U": "UNSUPPORTED", "R": "REFUTED", "C": "CONTESTED", "X": "UNDETERMINED"}
LETTER = {v: k for k, v in GR.items()}
GATE = {"CON": "G-CONSUMER", "RAT": "G-RATIFY", "FLT": "G-FAULT", "NAT": "G-NATIVE", "ENV": "G-FORGE-ENVELOPE", "COV": "G-COVERAGE"}


def esc(s: str) -> str:
    return s.replace("|", "\\|").replace("\n", " ")


def basis(n: int) -> str:
    out, ne = [], 0
    for b in maps[n]["epistemic_basis"]:
        if b["status"] == "NON-EPISTEMIC":
            ne += 1
        else:
            out.append(f"{b['id']}({LETTER[b['status']]})")
    s = ", ".join(out) if out else "—"
    return s + (f" + {ne} NE" if ne else "")


def carrier(n: int) -> str:
    beads = D.BEAD[n]
    if not beads:
        s = "**new** (no live carrier)"
    else:
        s = ", ".join(f"{b} ({D.BEAD_STATUS[b]})" for b in beads)
    if n in D.RETARGET:
        s += " ← draft names " + ", ".join(f"{a} (closed → {b})" for a, b in D.RETARGET[n])
    return s


def links(n: int) -> str:
    out = set()
    for _name, beh, ver, _why in D.GROUPS:
        if n in beh:
            out |= set(ver) | (set(beh) - {n} if not ver else set())
        if n in ver:
            out |= set(beh)
    return ", ".join(f"R{i}" for i in sorted(out)) if out else "—"


def l0(n: int) -> str:
    tags = sorted(set(t.rstrip("s") for t in D.TAGS.get(n, [])))
    head = "AMEND" if n in D.AMEND else "TRACEABLE"
    return head + (" (" + ", ".join(tags) + ")" if tags else "")


def cell(tok: str) -> str:
    if tok == ".":
        return "·"
    if tok.startswith("*"):
        return f"A*({tok[1:]})"
    return tok


def gates(n: int) -> str:
    g = []
    r = reqs[n]
    tiers = set(D.VT_FIX[n][0]) if n in D.VT_FIX else set(r["v_tiers"])
    if tiers & {"V0"}:
        g.append("G-CENSUS")
    if tiers & {"V1"} or True:
        g.append("G-PI-DEFAULT")
    if "V3" in tiers:
        g.append("G-REGISTERED")
    if "V4" in tiers:
        g.append("G-NATIVE")
    for tok in D.C[n].split():
        if tok.startswith("*") and GATE[tok[1:]] not in g:
            g.append(GATE[tok[1:]])
    if n in (456, 458, 459, 468, 469, 470, 431, 437, 462, 463):
        if "G-RELEASE" not in g:
            g.append("G-RELEASE")
    for name in ("G-RATIFY", "G-NATIVE", "G-FAULT", "G-FORGE-ENVELOPE", "G-CONSUMER"):
        if name in D.ST[n][1] and name not in g:
            g.append(name)
    order = ["G-RATIFY", "G-CENSUS", "G-PI-DEFAULT", "G-CONSUMER", "G-REGISTERED", "G-NATIVE", "G-FORGE-ENVELOPE", "G-FAULT", "G-COVERAGE", "G-RELEASE"]
    return ", ".join(x for x in order if x in g)


def planned(n: int) -> str:
    m = maps[n]
    tiers = "/".join(D.VT_FIX[n][0] if n in D.VT_FIX else reqs[n]["v_tiers"])
    if m.get("planned_evidence"):
        return "`" + re.sub(r"\s*\(.*$", "", m["planned_evidence"]) + "` (planned label from the draft)"
    return f"EAT-R{n}@{tiers} (the draft names no artifact; location per EAT-R456)"


def vt(n: int) -> str:
    d = ",".join(reqs[n]["v_tiers"])
    if n in D.VT_FIX:
        return d + " → **" + ",".join(D.VT_FIX[n][0]) + "**"
    return d


out = []
w = out.append
w("# TDD-MATRIX — mechanical-interop-integrity-2026-11-10 (MII), EAT-R391..EAT-R470 (Phase 10.9)")
w("")
w("Pins: document Pi `3fc0ead1` (docs/pi-README.md, pi-01..pi-05; MW companion at `6476372f` is context); environment Pi `0fb9067262532289104417d2b7f2f25704563a75`, MW `69cb016dd293a17bcc893f2baf410a51c226f4c9`. Audited inputs: `requirements/.work/req-r-core.md` (R391-R420), `req-r-exec.md` (R421-R445), `req-r-release.md` (R446-R470) and their `map-r-*.jsonl`; `epistemic-triage/CLAIMS.jsonl` (230 rows, sha256 `371d9935…`), `REMEDIATION.md`, `CONTRADICTIONS.md`. Companion: `REQUIREMENTS-AUDIT.md` (findings RA-01..RA-22).")
w("")
w("**Nothing in this matrix is a green claim.** No test, build, install, gate or native launch was executed by this audit; the only commands run were read-only: file reads at the pins, version probes, and bead reads with `bd --readonly --json` (three `list --all` reads between " + D.BEAD_FIRST_READ_AT + " and " + D.BEAD_READ_AT + ", and `show` on sixteen ids).")
w("")
w("Bead statuses in this file are those of the last read (" + D.BEAD_READ_AT + "). The store moved while the audit ran: " + D.BEAD_DRIFT + ". Read it again before filing. Every cell is `NOT_RUN` unless its row says `BLOCKED`; a `BLOCKED` row names the exact missing artifact. `L0` is this audit's custody verdict for the row: `TRACEABLE` (packet, V-tier, carrier and basis resolve; filing may proceed with the tagged conditions) or `AMEND` (the row's statement, criteria, conditions, tier or carrier must change before a bead is filed from it; the exact change is in REQUIREMENTS-AUDIT.md under the tagged finding). The `Extends:` line owed under RA-10 is carried by Matrix A and does not by itself make a row `AMEND`.")
w("")
w("Cell vocabulary: `A` apply; `A*(GATE)` apply only through the named gate; `S` deliberately skipped with a reason; `·` structurally not applicable with a reason. Gate abbreviations in cells: CON = G-CONSUMER, RAT = G-RATIFY, FLT = G-FAULT, NAT = G-NATIVE, ENV = G-FORGE-ENVELOPE, COV = G-COVERAGE.")
w("")
w("## 1. Tier legend and binding to the Pi forge lanes at 0fb90672")
w("")
w("The Pi manifest (`forge.toml` at the pin) resolves `gate = [\"lint\", \"typing\", \"build\", \"test\", \"census\", \"workbench-shell\", \"package-smoke\"]` and declares no `[build.tiers]`. A level is *bound* only when a step of the resolved gate runs it; a `[build.commands]` entry the gate does not name is an opt-in lane (reachable by `forge run <name>`), and its evidence is an `A*` cell here.")
w("")
w("| Level | Meaning here | Lane at the pin (witness: forge.toml / package.json at 0fb90672) | Bound in the default gate |")
w("|---|---|---|---|")
w("| L0 | Requirements ingestion + traceability: this audit; per-requirement id carried into test titles | planned traceability leg under the existing `census` step (`vitest.census.config.ts`, `test/**/*.census.ts`) | `census` is bound; the MII leg does not exist yet |")
w("| L1 | Shell-based integration: processes, validators, censuses and consumers driven from outside the process | `workbench-shell` (`qa/workbench/smoke.sh`), `package-smoke`; qa scripts under `qa/workbench/` | bound (`workbench-shell`, `package-smoke`); new legs planned |")
w("| L2 | External client / agent-consumable contract: the independently installed MW host boundary, and the reply shapes an agent branches on | `install-smoke`, `install-minimal` (Pi's own package consumer); no MW-host consumer exists in Pi at the pin (C164) | not bound — opt-in → `A*(CON)` for the installed-host leg; reply-contract legs run in `test` |")
w("| L3 | Framework integration: the actually registered `workflow_execute` / `workflow_observe` / `workflow_control` / `workflow_reconcile` tool objects (src/index.ts:3009, 2933, 3063, 2997), only I/O boundaries injected | `test` (vitest) | bound |")
w("| L4 | Pre-implementation unit: red-first behaviour, OOD, failure path, observability, round-trip, plus the row's negative mutant | `test` | bound |")
w("| L5 | Batteries: table-driven pressure over the row's input surface | `test` | bound |")
w("| L6 | E2E lifecycle: launch → … → settle / restart / release | `e2e` exists as a `[build.commands]` entry but is not in the gate; multi-process arms need the V5 harness | not bound → in-process arms in `test`, real-process arms `A*(FLT)` |")
w("| L7 | Operator journeys: discovery/inspect, observe view, controls, docs | no `journeys` step at the pin; `test/workbench-acceptance-journeys.census.ts` under `census` | planned |")
w("| L8 | Agent journeys: discover / invoke / inspect / recover from replies and installed docs alone (EAT-R290 lineage) | as L7 | planned |")
w("| L9 | Post-implementation coverage / branch evidence on the changed code | `npm run test:coverage` exists as a package script; it is not a forge command and not in the gate | **unbound** → every L9 cell is `A*(COV)` |")
w("| L10 | Critical audit + release verification: re-pin, receipts, veto gates, re-gate after any later source change | `census`, `release-checklist` (opt-in), `qa/workbench/mwi-release.mjs` (prior programs) | partly bound (`census`); the MII veto runner is planned (EAT-R459) |")
w("")
w("## 2. Evidence-ladder normalization")
w("")
w("The program's V0-V6 ladder (pi-04, C182-C186) is not the L0-L10 hierarchy above, and neither is Mechanical's L ladder (mw-04: L3 = standalone native producer, L4 = same journey through registered Pi; MW docs/08 standing ladder: L4 = Furnace host). V3 and MW-L3 are different things (K010, K027). This matrix never writes a bare `L4`/`L5` for a native or recovery claim; doc-04's veto text 'missing L4/L5 but marked shipped' is read as V4/V5 pending the ratified map (EAT-R459, EXTENDS EAT-R209).")
w("")
w("| pi-04 tier | Meaning in the program | L levels that carry it here | Named gate |")
w("|---|---|---|---|")
w("| V0 | exact file/line/commit inspection; not runtime proof | L0, L1 (census / lint), L10 | G-CENSUS |")
w("| V1 | focused unit / property / mutation | L4, L5 (+L9) | G-PI-DEFAULT (`test`) |")
w("| V2 | independently npm-packed Mechanical host installed in a fresh external consumer; no Pi claimed | L1 + L2 | G-CONSUMER |")
w("| V3 | the actually registered `workflow_execute(function)` with deterministic callbacks and `workflow_observe`; no native claim | L3 (+L2 reply contract, L6 in-process lifecycle, L8) | G-REGISTERED |")
w("| V4 | same registered route + installed real Claude Agent SDK + native Forge full gate | L1 / L3 / L6 / L8 / L10 through the gate only | G-NATIVE, G-FORGE-ENVELOPE |")
w("| V5 | interruption, reattach / reconcile, resource trials | L1 + L5 + L6 (+L8) through the gate | G-FAULT |")
w("| V6 | optional detached / Furnace / HX / RF / fleet | none — no row targets V6 (section 8) | — |")
w("")
w("## 3. Gate registry")
w("")
w("Host facts are read-only version probes on this host on 2026-11-11 (`forge --version`, `node --version`, `mise ls node`, `npm --version`, `bd version`); they show a tool exists, not that a gate passes. Both pin worktrees have no `node_modules`, so no lane could have run there without an install, and none was attempted. Credential presence was not read.")
w("")
w("| Gate | Tier | What it is | Witness at the pins | Status | Exact artifact when BLOCKED |")
w("|---|---|---|---|---|---|")
w("| G-RATIFY | — | the joint P00/H00 ratification record: digest vectors (R391), lease ABI (R398), grant + descriptor status/export (R405), request surface and write-policy omission (R396/R397), topology (R404), attestation channel (R408), enumerations and refusal table (R419, R433), envelope and launch status (R466), receipt schema (R458), crosswalk (R469), fixture-host injection seam (K032) | carrier wb-w8fk is " + D.BEAD_STATUS['wb-w8fk'] + "; the MW-side tracker wb-1zn2 is deferred | **BLOCKED** (a decision gate, not infrastructure) | sign-off by both repository owners recorded in a digest-pinned record; none exists (C107: adoption is not mechanically gated at the pin) |")
w("| G-CENSUS | V0 | docs / skill / receipt censuses, incl. the frozen-shape wb-12x1 census | `test/workbench-mwi-docs-remediation-census.test.ts`; `vitest.census.config.ts` | NOT_RUN by this audit; the ledger records it **red on master** (C220/E010: 4 failures at 0fb90672, 8 at 3fc0ead1; green on trunk ce180d82) | — (the repair is owed before any further skill edit; RA-14) |")
w("| G-PI-DEFAULT | V1 | Pi default forge gate: lint → typing → build → test → census → workbench-shell → package-smoke | forge.toml `gate` at 0fb90672 | AVAILABLE (forge 0.2.1; node v24.20.0, engines `>=24`), NOT_RUN | — |")
w("| G-CONSUMER | V2 | fresh external consumer (outside both repositories) of the independently npm-packed rig + library tarballs; digest and runtime-file checks; imports only `@mechanical/development-rig/host` (MNI name: PI-MECHANICAL-ARTIFACT) | `./host` is in the rig export map and imports from a tarball-installed consumer (C019, C073 ESTABLISHED); 8 runtime exports at 69cb016d (host.ts:13,18,21,52) | AVAILABLE for the shipped subpath, NOT_RUN | rows needing the producer-emitted runtime manifest: mw-03 H03; rows needing the composed export: mw-03 H06 (`invokeAuthorizedDevelopmentHost` has 0 occurrences at 69cb016d, E114) |")
w("| G-REGISTERED | V3 | the registered tool objects obtained from the registration path, never from an admission helper (MNI name: PI-FUNCTION-REGISTERED) | tools are registered; `kind:function` refuses `unsupported-definition-kind` before any load (execute-tool.ts:217-218; C008, C011, C041) | NOT_RUN — every positive arm is definitionally red until the MII P05 branch lands | the P05 function branch; for callback-reaching arms also the composed export (mw-03 H06) or the ratified fixture-host seam (K032) |")
w("| G-NATIVE | V4 | registered route + installed real Claude Agent SDK + native Forge full gate on a disposable clean package (MNI names: PI-GIT-CENSUS-LIVE; the MW-side label is unratified) | none: no joined receipt in either repository (C023 ESTABLISHED); the existing opt-in live lanes (`claude-live`, `forge-control-live`, `native-read`) belong to other features and none drives a Mechanical function; Pi pins `@anthropic-ai/claude-agent-sdk` 0.3.300 and vendors `@forge/sdk` 0.1.0 (package.json:36-37), the MW rig declares neither (E226) | **BLOCKED** | (1) MW composed host + native four services (mw-03 H05/H06/H07; wb-1zn2 deferred); (2) EAT-R253 repair receipt — no live carrier (RA-08); (3) credentials / SDK resolution in the consumer root — not probed |")
w("| G-FORGE-ENVELOPE | V4 | one original native `gate.run` envelope with `execution_environment.pinned: true`, native commit, non-empty tree and gate definition — or the recorded decision that strict v1 does not need the pin (EAT-R437) | `pinned` is false in all 148 occurrences across committed MW evidence and true only in synthetic fixtures (ledger, C026 facet) | **BLOCKED / UNDETERMINED** | the envelope from the installed Forge on a clean committed disposable package (the triage did not probe the installed Forge), or the dated joint decision |")
w("| G-FAULT | V5 | real multi-process kill / restart / contention harness and resource trials | lineage: `test/worktree-process-kill-preservation.test.ts` + receipts/wb-7wkb.md (closed carrier); `qa/workbench/mwi-multiworkflow-load.mjs` (script path, fixture provider counters) | NOT_RUN | the durable lease and journal rows (R399-R403, R414-R417); joined arms inherit G-REGISTERED / G-NATIVE blockers |")
w("| G-COVERAGE | — | branch evidence on the changed code | `npm run test:coverage` (package script) | unbound at the pin, NOT_RUN | a coverage step in the resolved gate, or a named opt-in lane with a receipt |")
w("| G-RELEASE | P10 | evidence validator + veto gates over receipts; never an invocation runner (EAT-R292 lineage) | `qa/workbench/mwi-release.mjs`, `release-checklist-receipt.mjs` exist for prior programs | NOT_RUN | the ratified veto table (EAT-R459) and receipt schema (EAT-R458) |")
w("")
w("## 4. Matrix A — L0 traceability (80 rows)")
w("")
w("Basis letters: E ESTABLISHED, S SUPPORTED, P PLAUSIBLE, U UNSUPPORTED, R REFUTED; `+ n NE` counts NON-EPISTEMIC norms/proposals in the row's basis (full list in the map row). Carrier status is the live read of " + D.BEAD_READ_AT + " (1,395 beads), not the committed JSONL export (1,376 beads, stale). EXTENDS is the audited lineage into EAT-R201..R310; the verdict says what the draft must change: `OK` (as drafted, additions noted), `ADD` (draft states no EAT lineage), `CORRECT` (draft cites a wrong or open-ended id), `NEW` (no R201-R310 predecessor).")
w("")
w("| Requirement | Title | Cluster | Type / authority | Packet(s) | Live carrier | EXTENDS R201-R310 (audited) | Basis (ledger grade) | Linked rows in this set | L0 (this audit) |")
w("|---|---|---|---|---|---|---|---|---|---|")
for n in IDS:
    r = reqs[n]
    ext, verdict, _why = D.EXT[n]
    auth = re.sub(r"\s*\(adopted.*?\)", "", r["authority"])
    w(f"| EAT-R{n} | {esc(r['title'])} | {r['cluster']} | {r['type']} / {esc(auth)} | {', '.join(r['packets'])} | {carrier(n)} | {(', '.join('EAT-' + e for e in ext) if ext else 'none')} — {verdict} | {basis(n)} | {links(n)} | {l0(n)} |")
w("")
w("## 5. Matrix B — evidence tiers and named gates (80 rows)")
w("")
w("`V-tier` shows the draft's tiers and, in bold after the arrow, the audited tiers where the draft is wrong (RA-12). Every `A*(COV)` at L9 has the same structural reason (section 1: coverage is not a bound gate step at the pin) and a row-specific target: the guard branch that the row's named negative mutant removes; rows without a named mutant (RA-18) have no L9 target until one is named. All other `·`, `S` and `A*` cells are justified in Notes.")
w("")
w("| Requirement | V-tier | L1 | L2 | L3 | L4 | L5 | L6 | L7 | L8 | L9 | L10 | Named gate(s) | Gate status | Planned evidence | Notes |")
w("|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|")
for n in IDS:
    toks = [cell(t) for t in D.C[n].split()]
    st, why = D.ST[n]
    w(f"| EAT-R{n} | {vt(n)} | " + " | ".join(toks) + f" | {gates(n)} | **{st}** — {esc(why)} | {esc(planned(n))} | {esc(D.NOTE[n])} |")
w("")

# falsifier sub-ledger
FALS = [
    ("G01", "nominal Forge PASS missing `gate_passed`", "no strict native verification", 446, "R433, R434", "R245, R274", "Q01 (positive control Q02; Q06)", "V3 (injected envelope); one real envelope via R437"),
    ("G02", "matching commit, candidate-tree evidence missing", "strict result indeterminate unless documented independent native tree proof", 446, "R435", "R245, R274", "Q03", "V3"),
    ("G03", "gate definition / environment evidence missing or contradicted", "no strict promotion", 446, "R434", "R274", "Q04 + Q05", "V3"),
    ("G04", "writer edits then restores bytes before a lost ack", "no blind retry from clean HEAD", 447, "R443, R420", "R254, R282", "Q11", "V3 + V5"),
    ("G05", "ignored / untracked / out-of-worktree effect, lost ack (three separate tests)", "uncertainty preserved; retry denied without comprehensive native absence", 447, "R443, R420", "R280, R282", "Q12 (Q13 for the null-id lookup)", "V3 + V5"),
    ("G06", "worker alive after launcher reply", "second same-root invocation rejected; lease retained", 448, "R400", "R232, R269", "Q18", "V3 + V5"),
    ("G07", "two Pi processes, one canonical root", "exactly one live writer, including across restart", 448, "R399, R401", "R269, R284", "Q18", "V5"),
    ("G08", "differing Beads notes, identical typed input", "identical admitted and dispatched canonical input; no note read", 449, "R393, R392", "none (EAT-R154 lineage)", "Pi-only", "V1 + V3"),
    ("G09", "installed JS mutated after tarball extraction", "refuse before trusted import", 449, "R422", "R220, R222, R266", "Q16", "V2 (+V3)"),
    ("G10", "forged grant / root / profile / principal in the tool request (four injections)", "no additional authority or side effect", 449, "R406, R424, R465", "R223, R270", "Pi-only (mw-03 H06 lists 'model-forged grant' without a Q id)", "V3"),
    ("G11", "kill after commit or gate dispatch, ack lost (two runs)", "native reconciliation; no automatic duplicate", 450, "R445, R420", "R280, R281, R282", "Q19", "V5"),
    ("G12", "HEAD / source tree changes after native PASS (before and after settlement)", "historical proof recorded; no current-source promotion", 446, "R436", "R245, R274, R275", "Q08", "V3"),
    ("P13", "principal or grant revoked during install", "final-boundary refusal; zero writer calls", 449, "R407, R409, R427", "R228, R267", "Q17", "V3"),
    ("P14", "source cleanliness / manifest changes during the wait", "refuse; source-mismatch reason retained", 449, "R410", "R231, R268", "Q17", "V3"),
    ("P15", "cross-scope native ref / observer replay", "zero cross-principal events; no control leak", 451, "R440, R418", "R281", "Pi-only", "V3"),
    ("P16", "duplicate / late event after terminal", "idempotent projection; no new effect", 451, "R417, R429, R442", "R281", "Pi-only", "V3 (+V5 fresh process)"),
    ("P17", "response truncates a long native identity", "no non-addressable ref; invocation stays observable", 451, "R440", "R247, R248", "Pi-only", "V3"),
    ("P18", "executor crash with an open writer fence", "unknown + retained fence; no second effect", 450, "R402, R445", "R257, R280, R281", "Pi-only (mw-03 H10 kill matrix has no Q id)", "V5"),
]
w("## 6. Falsifier sub-ledger — doc-04 G01-G12, P13-P18 (18 rows)")
w("")
w("The drafts compile the 18 falsifiers into six verification rows (R446-R451), so one requirement id can be red for one falsifier and green for another. Each falsifier is therefore its own gate row here; a bead must report them separately (`EAT-R446[G01]`, …). `P13`-`P18` are test ids, not packets. The MW Q correspondence is the content mapping the triage recorded (K028); it is a proposal until the crosswalk is ratified (EAT-R469) and the MW side is consumed, never written, by Pi beads. No falsifier has been run; the status column repeats the owning row's gate status from Matrix B.")
w("")
w("| Falsifier | Inject | Required | Verification row | Behaviour rows it evidences | MNI lineage (EAT-) | MW Q counterpart (K028, unratified) | Tier (audited) | Status |")
w("|---|---|---|---|---|---|---|---|---|")
for f in FALS:
    blk = D.ST[f[3]]
    w(f"| {f[0]} | {esc(f[1])} | {esc(f[2])} | EAT-R{f[3]}[{f[0]}] | {f[4]} | {f[5]} | {f[6]} | {f[7]} | {blk[0]} (as EAT-R{f[3]}) |")
w("")
w("## 7. Criterion-level gates for compound rows")
w("")
w("These rows bundle obligations that can pass or fail independently (RA-16). The id range is closed above (EAT-R471..R488 are allocated to the pi-system-dx triage), so they are not split here; each listed clause is an independent acceptance gate that a bead must report on its own line. If the owner prefers real splits, new ids start at EAT-R489 (re-read the store before allocating).")
w("")
w("| Requirement | Independent clauses (each its own gate line) |")
w("|---|---|")
COMP = [
    (423, "(a) exactly one allowlisted export is called; (b) unsupported `HOST_API_VERSION` fails closed; (c) the legacy `invokeDevelopmentHost` is never used for a writer-capable invocation"),
    (438, "(a) same `wf_` id resolves in embedded mode within scope; (b) it resolves after a registry rebuild from the durable record; (c) the reply never tells the model to observe an unobservable mode"),
    (440, "(a) `NativeRef` shape with nonblank id; (b) producer sentinels become null + uncertainty; (c) clipped refs are omitted, invocation stays addressable; (d) control/reconcile cannot manufacture a ref"),
    (442, "(a) function events land in the existing journal with the listed fields; (b) the intent row precedes the composed call; (c) an unwritable journal refuses the launch"),
    (443, "(a) clean HEAD never yields not-occurred / retry; (b) only a matching complete certificate does; (c) effect replay stays denied and the lease fenced while unknown; (d) MW's 69cb016d reconcile verdict is recorded, never consumed as an oracle"),
    (444, "(a) no deep import of producer internals; (b) correlation persisted at dispatch; (c) lookup only through the ratified export; (d) a missing producer intent reads unknown"),
    (445, "(a) cancel requested vs established; (b) no rollback wording; (c) fence and unknown survive a real kill and restart; (d) durability wording limited to the tested fault model"),
    (446, "one line per falsifier: G01, G02 (absent and contradicted), G03, G12 (before and after settlement)"),
    (447, "one line per falsifier arm: G04; G05-ignored; G05-untracked; G05-out-of-worktree"),
    (448, "one line per falsifier: G06; G07; G07-restart"),
    (449, "one line per falsifier: G08; G09; G10 ×4 injections; P13; P14"),
    (450, "one line per falsifier: G11-after-commit; G11-after-gate-dispatch; P18"),
    (451, "one line per falsifier: P15; P16; P17"),
    (456, "(a) receipts land in a new source-pinned directory; (b) prior receipts are byte-identical; (c) no GitHub Actions run cited as a gate witness; (d) no sentence asserts the repository has no GitHub CI"),
    (459, "one line per doc-04 veto predicate (seven bullets, fifteen predicates; the draft groups them as ten items) plus (x) the ratified mapping table and (y) the bare-D-number lint"),
    (462, "(a) the V4 receipt through the registered route; (b) the external-store census with its stated detection surface"),
    (464, "(a) the cross-process proof receipt (after R448 passes against R399-R401); (b) 'compatible' defined or dropped; (c) the lease-owner ruling and wb-1zn2 dependency recorded in P00"),
    (466, "(a) launch reply asserts launch only; (b) observation view carries the independent rows; (c) empty `nativeRefs` only when truthful; (d) the envelope / launch-status decision is recorded before anything copies the illustration"),
    (467, "(a) cancel requested vs established; (b) reattach to the same invocation; (c) read-only reconcile; (d) release only on known-safe settlement; (e) audited, distinctly labelled override; (f) reason-specific help for the five reasons mapped to producer codes"),
    (468, "(a) frozen readers reconciled in the same cut; (b) shipped/unshipped rows match achieved tiers; (c) historical rows annotated, not rewritten; (d) one current skill entrypoint; (e) the four negative wording bars"),
    (470, "(a) the MII ↔ MNI ↔ live-bead map with its validator; (b) the appended wb-y0n6 note and wb-1zn2 link; (c) packet closure receipts keyed to real beads; (d) the protected-changes referent list for the November 9 program"),
]
for n, txt in COMP:
    w(f"| EAT-R{n} | {esc(txt)} |")
w("")
w("## 8. Explicit deferrals carried by this matrix (no EAT-R391..R470 row)")
w("")
w("The drafts neither cover nor explicitly defer these program items (RA-06, RA-07, RA-13). They are recorded here so that no cell is a silent skip; each needs the stated line in the consolidated ATOMIC-REQUIREMENTS.md.")
w("")
w("| Program item | Disposition | Carrier (lineage, live bead) | First-release fence already in the set | Matrix status |")
w("|---|---|---|---|---|")
w("| P11 — optional detached function + Furnace ownership (pi-03 L77-78; C178) | DEFERRED: not a first-release blocker (EXTENDS EAT-R303) | EAT-R295..R298; wb-zswl (open; wb-dlc6 closed into it) | R404 c3 (detached / fleet ineligible), R412 c2 (unsupported host placement refused), R426 (no second develop / scheduler; EAT-R258) | S — NOT_RUN; no MII row |")
w("| P12 — optional HX / RF + further function families (pi-03 L80-81; C179) | DEFERRED (EXTENDS EAT-R303) | EAT-R299..R302; wb-pxvv (in_progress; wb-669r closed into it) — in-flight MNI work, not an MII dependency | R407 (exact grant bound to the one reviewed definition: no inheritance of development-write), R412 c2 (arbitrary function refused), R424 c4 (profile labels are label-only) | S — NOT_RUN; no MII row |")
w("| V6 — optional detached / Furnace / HX / RF / fleet configurations (pi-04 L11; C186 second half) | DEFERRED with P11/P12 | as P11 / P12 | R463 not-claimed list carries untested topologies | S — NOT_RUN; no MII row targets V6 |")
w("| doc-04 safety matrix 'Privacy' (L43) | PARTIAL: no owning row; fragments only | — | R439 (bounded reply, redacted workspace path), R465 c3 (inspect redaction), R419 c3 (no raw paths/secrets), R414 c3 (access rules on the durable record) | add the two clauses to R439 and R414 (RA-13); until then NOT_RUN with no owner |")
w("| doc-04 QA step 7 — local full Forge gate per package and on the final merged tree | UNCOVERED in R391-R470 | EAT-R286 (wb-yiu4 open) | none | add as a veto predicate in R459 (RA-13) |")
w("| P00 re-pin of both heads + landing-trunk rule (README L3, pi-03 L18, QA step 1; C034, M002/M037/M187/M238) | UNCOVERED in R391-R470 | EAT-R201 (wb-w8fk " + D.BEAD_STATUS['wb-w8fk'] + ") | R405 c1 names both full source pins in the ratification record | add the re-pin record and the landing-branch rule to R470 (RA-13) |")
w("| P10 sample invocation / observe / control transcripts (pi-03 L74; QA step 8) | UNCOVERED in R391-R470 | EAT-R289, EAT-R290 (wb-yiu4 open) | R466 (illustration is a proposal until ratified) | add to R468 (RA-13) |")
w("| MW-owned repairs behind D1, D2, D4, D7, D8, D10, D11, D12, MW-I10, MW-I11 (mw-01) | NOT Pi work: Pi rows consume or guard (R422, R425, R428, R432-R435, R443-R445, R455); the repairs are MW packets H01-H07 | wb-1zn2 (deferred, MW-owned deliverables tracker) | — | BLOCKED (external); never implemented in Pi |")
w("| EAT-R253 repair (parked-beforeDispatch skip / retry loss; witnessed) | OWED: no live carrier (wb-9v02 closed as the repro bead; wb-3121 closed) | EAT-R213, R214, R253 → one new bead with R413 as its gate leg (RA-08) | R413 keeps effectful readiness off | NOT_RUN; blocks every effectful arm (R431, R445, R454, R457, R462) |")
w("")

# invariants
blocked = sum(1 for n in IDS if D.ST[n][0] == "BLOCKED")
notrun = len(IDS) - blocked
tier_counts = collections.Counter()
for n in IDS:
    for t in (D.VT_FIX[n][0] if n in D.VT_FIX else reqs[n]["v_tiers"]):
        tier_counts[t] += 1
cellc = collections.Counter()
for n in IDS:
    for k, t in enumerate(D.C[n].split(), start=1):
        cellc[(k, "A*" if t.startswith("*") else ("·" if t == "." else t))] += 1
extc = collections.Counter(D.EXT[n][1] for n in IDS)
new_rows = [n for n in IDS if not D.BEAD[n]]
inprog = [n for n in IDS if any(D.BEAD_STATUS[b] == "in_progress" for b in D.BEAD[n])]
w("## 9. Matrix invariants")
w("")
w(f"- Rows: {len(IDS)} (EAT-R391..R470, unique, contiguous; 1:1 with the 80 map rows). L0: TRACEABLE {len(IDS) - len(D.AMEND)}, AMEND {len(D.AMEND)} ({', '.join('R' + str(i) for i in sorted(D.AMEND))}).")
w(f"- Gate status: NOT_RUN {notrun}, BLOCKED {blocked}. No cell is PASS; no gate was executed.")
w("- Rows naming each V tier (audited tiers): " + ", ".join(f"{k}: {tier_counts[k]}" for k in sorted(tier_counts)) + ". No row targets V6.")
w("- Cell census (L1..L10): " + "; ".join(f"L{k}: A {cellc[(k, 'A')]}, A* {cellc[(k, 'A*')]}, S {cellc[(k, 'S')]}, · {cellc[(k, '·')]}" for k in range(1, 11)) + ".")
w(f"- EXTENDS verdicts: OK {extc['OK']}, ADD {extc['ADD']}, CORRECT {extc['CORRECT']}, NEW {extc['NEW']}. Every one of the 25 r-release rows is ADD: the draft states bead lineage but no EAT lineage.")
w(f"- Carriers at the live read: {len(new_rows)} rows owe a new bead ({', '.join('R' + str(i) for i in new_rows)}); {len(inprog)} rows name a carrier that is in_progress ({', '.join(sorted({b for n in inprog for b in D.BEAD[n] if D.BEAD_STATUS[b] == 'in_progress'}))}) — file those as successor beads blocked by the in-flight bead, with append-only notes, never as a scope change of a claimed bead (RA-21); 8 rows name a closed bead in the draft and are retargeted in Matrix A (RA-01).")
w("- BLOCKED discipline: unavailable credentials, binaries or producer artifacts record BLOCKED with the missing artifact, never an imitation pass (EAT-R263 lineage); a green default gate never certifies a native lane (EAT-R287 lineage); V1/V2 evidence never satisfies a stated V3/V5 closure.")
w("- Red-first discipline: a seam-level test that is already green at the pin (E169) is a control, not the row's red test; the red test is the registered-route or bridge assertion, and its pre-implementation failure output is part of the receipt.")
w("")
(ROOT / "requirements" / "TDD-MATRIX.md").write_text("\n".join(out) + "\n")
print("TDD-MATRIX.md written:", len(out), "lines;", sum(len(x) for x in out), "chars")
print("blocked", blocked, "not_run", notrun, dict(tier_counts), dict(extc))
