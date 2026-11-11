#!/usr/bin/env python3 -I
"""Phase 6-9 consolidation for the MII (mechanical-interop-integrity-2026-11-10) epistemic triage.

Inputs (all under epistemic-triage/.work):
  claims-*.jsonl      Phase 1 atomization (230 rows, C001..C230)
  lens-*.jsonl        Phase 3 blind lenses (lineage, negative-ev, contradict, mw-src, pi-src, joint)
  audit-a-*.jsonl     Phase 5 adversarial audits (217 rows; C001-C006, C026, C031-C035, C086 unaudited)
Outputs (epistemic-triage/):
  CLAIMS.jsonl EVIDENCE.jsonl RELATIONS.jsonl CONTRADICTIONS.md SOURCE-MAP.md REMEDIATION.md
  EPISTEMIC-AUDIT.md ARBITRATION-2026-11-11.md CLAIMS.patch.jsonl dossiers/<id>.md
Run with: python3 -I consolidate.py
"""
import json, os, re, sys, collections, datetime

ROOT = '/workplace/jehallad/AgentEcosystem/ForgeWorkspaces/Pi/PiSubagents/scratch/mii-triage-1110/'
WORK = ROOT + 'epistemic-triage/.work/'
OUT = ROOT + 'epistemic-triage/'
DATE = '2026-11-11'
DATE8 = '20261111'
PIN_PI = '0fb90672'
PIN_MW = '69cb016d'
DOC_PIN = '3fc0ead1'
GRADED = 'graded {s} at pin pi-0fb90672/mw-69cb016d ' + DATE

STAT_RANK = {'ESTABLISHED': 0, 'SUPPORTED': 1, 'PLAUSIBLE': 2, 'UNDETERMINED': 3, 'UNSUPPORTED': 3, 'CONTESTED': 3, 'REFUTED': 4}
ALLOWED_REM = ['ADD_SOURCE', 'REPLACE_SOURCE', 'NARROW_SCOPE', 'ADD_TEMPORAL_QUALIFIER', 'DOWNGRADE_MODALITY', 'SPLIT_CLAIM',
               'MARK_AS_HYPOTHESIS', 'MARK_AS_DEFINITION', 'SURFACE_DISAGREEMENT', 'ADD_MISSING_PREMISE', 'REMOVE_CLAIM',
               'PRESERVE_AS_UNDETERMINED']
PERMITTED_LANGUAGE = {
    'ESTABLISHED': 'is / does / shows (inside the stated scope and pins)',
    'SUPPORTED': 'the available evidence indicates / favors',
    'PLAUSIBLE': 'may / could / is consistent with',
    'UNSUPPORTED': 'has been asserted, but the available evidence does not establish it',
    'CONTESTED': 'the available evidence supports incompatible readings',
    'REFUTED': 'the available evidence contradicts ... within <scope>',
    'UNDETERMINED': 'is unknown from the available evidence; missing: <artifact>',
    'NON-EPISTEMIC': 'the program defines / requires / proposes',
}


def load(path):
    rows = []
    with open(path, encoding='utf-8') as fh:
        for i, line in enumerate(fh):
            line = line.strip()
            if line:
                r = json.loads(line)
                r['_line'] = i + 1
                rows.append(r)
    return rows


def dump_jsonl(path, rows):
    with open(path, 'w', encoding='utf-8') as fh:
        for r in rows:
            fh.write(json.dumps(r, ensure_ascii=False) + '\n')


def text(v):
    return v if isinstance(v, str) else json.dumps(v, ensure_ascii=False)


# ----------------------------------------------------------------------------- load
claims = {}
for f in ['claims-readme.jsonl', 'claims-d01.jsonl', 'claims-d02.jsonl', 'claims-d03.jsonl', 'claims-d04d05.jsonl']:
    for r in load(WORK + f):
        r['_file'] = f
        claims[r['id']] = r
CIDS = sorted(claims, key=lambda s: int(s[1:]))
assert len(CIDS) == 230 and CIDS[0] == 'C001' and CIDS[-1] == 'C230'

audits = {}
for f in ['audit-a-baseline.jsonl', 'audit-a-packets.jsonl', 'audit-a-protocol.jsonl', 'audit-a-invariants.jsonl', 'audit-a-verification.jsonl']:
    for r in load(WORK + f):
        r['_file'] = f
        assert r['id'] not in audits
        audits[r['id']] = r

LENS_FILES = ['lens-lineage.jsonl', 'lens-negative-ev.jsonl', 'lens-contradict.jsonl', 'lens-mw-src.jsonl', 'lens-pi-src.jsonl', 'lens-joint.jsonl']
lens_rows = []
for f in LENS_FILES:
    name = f.replace('lens-', '').replace('.jsonl', '')
    for i, r in enumerate(load(WORK + f)):
        r['_file'] = f
        r['_name'] = name
        r['_idx'] = i
        r['_key'] = f'{name}#{i}'
        lens_rows.append(r)
LENS_BY_KEY = {r['_key']: r for r in lens_rows}

# ----------------------------------------------------------------------------- primary artifact extraction
PATH_RE = re.compile(r'(?:pins/(?:pi-0fb90672|mw-69cb016d)/[\w./\-]+|docs/(?:pi|mw)-[\w\-]+\.md|epistemic-triage/\.work/[\w./\-]+|PROBE/[\w./\-]+|(?:pi|mw)@[0-9a-f]{8}:[\w./\-]+)')
DOC_MAP = {'README.md': 'docs/pi-README.md', '01-AUDIT-AND-INVARIANTS.md': 'docs/pi-01-AUDIT-AND-INVARIANTS.md',
           '02-PROTOCOL-AND-RUNTIME.md': 'docs/pi-02-PROTOCOL-AND-RUNTIME.md', '03-IMPLEMENTATION-PACKETS.md': 'docs/pi-03-IMPLEMENTATION-PACKETS.md',
           '04-ADVERSARIAL-VERIFICATION.md': 'docs/pi-04-ADVERSARIAL-VERIFICATION.md', '05-OPERATIONS-AND-HANDOFF.md': 'docs/pi-05-OPERATIONS-AND-HANDOFF.md'}


def normalize_path(tok):
    tok = tok.rstrip('.,;:)')
    if tok.startswith('PROBE/'):
        tok = 'epistemic-triage/.work/lens-mw-src-probe/' + tok[len('PROBE/'):]
    if '@' in tok and ':' in tok:
        pin, path = tok.split(':', 1)
        pin = pin.replace('pi@0fb90672', 'pins/pi-0fb90672').replace('mw@69cb016d', 'pins/mw-69cb016d')
        tok = pin + '/' + path
    tok = re.sub(r':[0-9][0-9,\-]*$', '', tok)
    return tok


def primary_artifacts_from(evidence):
    found, unresolved = [], []
    if isinstance(evidence, list):
        for e in evidence:
            if not isinstance(e, dict):
                continue
            pin = e.get('pin', '')
            path = e.get('path', '')
            cand = None
            if pin.startswith('pi@0fb90672') and path and not path.startswith('git ') and '->' not in path:
                cand = 'pins/pi-0fb90672/' + path.split(';')[0].split(':')[0].strip()
            elif pin.startswith('mw@69cb016d') and path and not path.startswith('git '):
                cand = 'pins/mw-69cb016d/' + path.split(';')[0].split(':')[0].strip()
            elif 'document pin' in pin and path:
                base = path.split(';')[0].split(':')[0].strip().split('/')[-1]
                cand = DOC_MAP.get(base)
            elif pin.startswith('companion') and path:
                cand = path.split(':')[0].strip()
            if cand and os.path.isfile(ROOT + cand):
                if cand not in found:
                    found.append(cand)
            else:
                unresolved.append(f'{pin}: {path}'[:160])
        for tok in PATH_RE.findall(json.dumps(evidence)):
            p = normalize_path(tok)
            if os.path.isfile(ROOT + p) and p not in found:
                found.append(p)
    else:
        for tok in PATH_RE.findall(text(evidence)):
            p = normalize_path(tok)
            if os.path.isfile(ROOT + p):
                if p not in found:
                    found.append(p)
            else:
                unresolved.append(tok[:160])
    return found, sorted(set(unresolved))


# ----------------------------------------------------------------------------- evidence records
evidence = []
EV_BY_LENS = {}
EV_BY_AUDIT = {}
ev_n = 0


def new_evidence(**kw):
    global ev_n
    ev_n += 1
    rec = {'id': f'E{ev_n:03d}'}
    rec.update(kw)
    evidence.append(rec)
    return rec['id']


LENS_SOURCE_TYPE = {
    'lineage': 'AUDITOR_PROBE_RECORD (git history, bead store, MNI ledger, census execution)',
    'negative-ev': 'AUDITOR_PROBE_RECORD (absence censuses with stated detection power)',
    'contradict': 'AUDITOR_PROBE_RECORD (cross-document comparison plus pin greps)',
    'mw-src': 'AUDITOR_PROBE_RECORD (Mechanical source read + scratch-copy execution at 69cb016d)',
    'pi-src': 'AUDITOR_PROBE_RECORD (Pi source read at 0fb90672)',
    'joint': 'AUDITOR_PROBE_RECORD (joint Pi/MW reading with git plumbing)',
}
for r in lens_rows:
    prim, unres = primary_artifacts_from(r['evidence'])
    pins = []
    for c in r['claimIds']:
        tc = claims.get(c, {}).get('timeContext')
        if tc and tc not in pins:
            pins.append(tc)
    eid = new_evidence(
        artifact=f"epistemic-triage/.work/{r['_file']}:{r['_line']}",
        root=ROOT,
        revision='pi-0fb90672 / mw-69cb016d (document pin 3fc0ead1)',
        location=f"lens row {r['_key']}" + (f" ({r['id']})" if 'id' in r else ''),
        relation=r['relation'],
        claims=list(r['claimIds']),
        source_type=LENS_SOURCE_TYPE[r['_name']],
        summary=text(r['evidence']),
        detection_model=r.get('detectionModel', ''),
        proposed_status=r.get('proposedStatus', ''),
        drift=r.get('drift', ''),
        note=r.get('note', ''),
        primary_artifacts=prim,
        unresolved_pointers=unres,
        parents=[],
        limitations=['secondary record: the auditor\'s inspection of primary files; primary_artifacts lists the pinned files it read, resolved on disk at consolidation'],
    )
    EV_BY_LENS[r['_key']] = eid

for c, a in audits.items():
    prim, unres = primary_artifacts_from(a['decisiveEvidence'])
    eid = new_evidence(
        artifact=f"epistemic-triage/.work/{a['_file']}:{a['_line']}",
        root=ROOT,
        revision='pi-0fb90672 / mw-69cb016d (document pin 3fc0ead1)',
        location=f'audit row {c} (decisiveEvidence)',
        relation='CONTRADICTS' if a['finalStatus'] in ('REFUTED', 'UNSUPPORTED') else 'SUPPORTS',
        claims=[c],
        source_type='AUDITOR_PROBE_RECORD (Phase 5 adversarial audit: re-read of primary files and direct probes)',
        summary=text(a['decisiveEvidence']),
        attacks=a['attacks'],
        rival_reading=a['rivalReading'],
        drift=a['driftAtDocCommit'],
        primary_artifacts=prim,
        unresolved_pointers=unres,
        parents=[EV_BY_LENS[k] for k in EV_BY_LENS if c in LENS_BY_KEY[k]['claimIds']],
        limitations=['the audit re-read the lens rows listed in parents and the primary files; verdict scoped to the environment pins'],
    )
    EV_BY_AUDIT[c] = eid

# consolidation-time primary verification records (this run)
E_VERIFY_C107 = new_evidence(
    artifact='pins/pi-0fb90672/src/workbench/function-authority.ts:105',
    root=ROOT, revision='pi-0fb90672', location='L105-L107 (module comment), L145 (constant), L271 (adoptFunctionActions), L314, L340 (refusal), L359 (dispatchFunctionWithAuthority)',
    relation='SUPPORTS', claims=['C107'],
    source_type='PRIMARY_CODE (re-read at consolidation 2026-11-11) + probe epistemic-triage/.work/audit-a-protocol.scratch/probe/pi-probe.jsonl:7 (P7-adoption)',
    summary="Module comment L105-L107: 'No action spelling is adopted: FUNCTION_ACTION_CONTRACT is unadopted, so every function dispatch refuses, and one that passes the earlier rules refuses as function-action-unadopted.' L145 exports the frozen default {state:'unadopted', blockedOn: FUNCTION_ACTION_BLOCKER}. grep over src/ excluding the module: no production caller of adoptFunctionActions, FUNCTION_ACTION_CONTRACT or dispatchFunctionWithAuthority. Probe P7-adoption: viaAdopted=dispatched, viaDefault=entry:function-action-unadopted, viaLookalike=entry:function-action-unadopted, dispatchCalls=2.",
    primary_artifacts=['pins/pi-0fb90672/src/workbench/function-authority.ts', 'epistemic-triage/.work/audit-a-protocol.scratch/probe/pi-probe.jsonl'],
    unresolved_pointers=[], parents=[EV_BY_AUDIT['C107']], limitations=['read-only re-verification; no new execution'])
E_VERIFY_C173 = new_evidence(
    artifact='pins/mw-69cb016d/apps/development-rig/package.json:13',
    root=ROOT, revision='mw-69cb016d', location='exports map L13-L21; effect-intent.ts export lines 11-103; effect-reconciliation.ts:86',
    relation='CONTRADICTS', claims=['C173'],
    source_type='PRIMARY_CODE (re-read at consolidation 2026-11-11) + probe epistemic-triage/.work/lens-mw-src-probe/out/installed-consumer-surface-probe.jsonl',
    summary="package.json exports only './host' and './package.json'. effect-intent.ts and effect-reconciliation.ts export the named functions at module level; reconcileUncertainEffect has no caller under apps/ or packages/ outside its module and tests. Installed-consumer probe: importing @mechanical/development-rig/dist/effect-intent.js and dist/effect-reconciliation.js fails ERR_PACKAGE_PATH_NOT_EXPORTED (6 NOT_EXPORTED rows in the probe file).",
    primary_artifacts=['pins/mw-69cb016d/apps/development-rig/package.json', 'pins/mw-69cb016d/apps/development-rig/src/effect-intent.ts', 'pins/mw-69cb016d/apps/development-rig/src/effect-reconciliation.ts', 'epistemic-triage/.work/lens-mw-src-probe/out/installed-consumer-surface-probe.jsonl'],
    unresolved_pointers=[], parents=[EV_BY_AUDIT['C173']], limitations=['read-only re-verification; no new execution'])
E_VERIFY_README = new_evidence(
    artifact='pins/pi-0fb90672/.github/workflows/ci.yml:16',
    root=ROOT, revision='pi-0fb90672 / mw-69cb016d / docs at 3fc0ead1', location='ci.yml L16,L51,L72 node-version 22; package.json L5 engines node >=24; docs/pi-*.md D-token census; docs/pi-*.md L-tier and MW-CONTRACT census; src/workbench/execute.ts:19',
    relation='SUPPORTS', claims=['C035', 'C032', 'C005', 'C026', 'C029', 'C006', 'C002', 'C003'],
    source_type='PRIMARY_CODE and PRIMARY_DOCS (re-read at consolidation 2026-11-11)',
    summary="pins/pi-0fb90672/.github/workflows/ci.yml exists (node-version 22 at L16/L51/L72; package.json engines node >=24); pins/mw-69cb016d/.github absent. D-token census: pi-README.md names D1-D12 once each; pi-01 names D3, D5, D6, D9 once each; pi-02..pi-05 name none; mw-01 names D1, D2, D4, D6, D7, D8, D10, D11, D12; other mw docs none. L-tier tokens in Pi docs: L2 (README:20, pi-01:26), L3 (pi-01:26), L4/L5 (pi-04:61); MW-CONTRACT at pi-01:11 and pi-02:18, defined nowhere in the six files. 'attached' occurs in Pi src only as an ordinary word (6 hits, none a host mode); EXECUTE_HOST_MODES = ['embedded','detached'] at execute.ts:19. docs/programs at 0fb90672 holds only mechanical-native-interoperability-2026-11-09; git log adf2c52d..0fb90672 -- src shows November 4 (wb-0gbh/wb-ub94) subjects only. git rev-parse HEAD in pins/pi-0fb90672 = 0fb9067262532289104417d2b7f2f25704563a75; rev-list --count 69cb016d..1be2b8dc = 1; diff --stat = 2 files, 3 insertions, 3 deletions.",
    primary_artifacts=['pins/pi-0fb90672/.github/workflows/ci.yml', 'pins/pi-0fb90672/package.json', 'docs/pi-README.md', 'docs/pi-01-AUDIT-AND-INVARIANTS.md', 'docs/mw-01-AUDIT-AND-PROOF.md', 'pins/pi-0fb90672/src/workbench/execute.ts'],
    unresolved_pointers=[], parents=[], limitations=['spot re-verification of the lens facts the consolidator grades on; the lens rows carry the complete probes'])

# ----------------------------------------------------------------------------- statuses
HAND = {
    # unaudited rows graded at consolidation from the lens findings (Phase 5 audit rows do not exist for them)
    'C001': dict(status='ESTABLISHED',
                 permitted_wording="At Pi 0fb90672 and Mechanical 69cb016d the program is design documents only: no registered workflow_execute(kind=function) route launches a Mechanical function, no Pi release metadata (CHANGELOG.md, package.json 0.20.0, feature-matrix W11 'planned', mechanical-function-hosting.md 'not shipped') carries one, and none of the identifiers the two programs introduce has a witness in Mechanical code, tests, contracts or receipts (highest committed evidence tier L2, no git tag) - an absence over the committed state of both clones, not over uncommitted work.",
                 facets={'Pi half (no function route, no release)': 'ESTABLISHED', 'Mechanical half (no program identifier witnessed, no release)': 'ESTABLISHED', 'beyond committed state of the two clones': 'UNDETERMINED'},
                 missing=None,
                 remediation=[('NARROW_SCOPE', "state the detection surface in the header: 'at the inspected revisions, over committed source, tests, receipts and release metadata of both repositories'")]),
    'C002': dict(status='ESTABLISHED',
                 permitted_wording="0fb9067262532289104417d2b7f2f25704563a75 is the continuity-18 merge commit on Pi's default branch master (origin/HEAD -> origin/master); its code equals the gated trunk tip ce180d82 (git diff over src/test/qa/package.json/forge.toml is empty), while the program documents, the November 9 program, README.md, AGENTS.md and the rewritten skill are master-only.",
                 facets={'commit exists and is on the default branch named master': 'ESTABLISHED', 'code identity with the gated trunk tip ce180d82': 'ESTABLISHED'},
                 missing=None,
                 remediation=[('ADD_MISSING_PREMISE', "name the landing trunk (workbench/implementation-program, feature-matrix.md:5) and that the program documents are master-only, so P00/P10 state which branch carries program documents and how skill edits reach trunk")]),
    'C003': dict(status='ESTABLISHED',
                 permitted_wording="69cb016d is a commit on Mechanical main; when the Pi program was committed main held exactly one further commit, 1be2b8dc (two test titles in host-services.test.ts and one 04-IDENTIFIER-MAPPING.md row, no source), which is the companion program's stated Mechanical baseline; the companion program directory exists on main from 6476372f; the two 'paired' headers therefore name adjacent Mechanical revisions whose delta touches no source, contract, manifest or receipt path. At audit time main had moved to 0ffdc844 (three commits past the snapshot).",
                 facets={'(i) 69cb016d on main': 'ESTABLISHED', '(ii) exactly one further commit at authoring (1be2b8dc)': 'ESTABLISHED', '(iii) companion program on main at docs/programs/pi-host-integrity-2026-11-10': 'ESTABLISHED (from 6476372f)', '(iv) companion baselines differ only by that commit': 'ESTABLISHED'},
                 missing=None,
                 remediation=[('ADD_TEMPORAL_QUALIFIER', "name 1be2b8dc as the additional commit in the Pi header, or pin both programs to one pair at the 're-pin both' step; note that main had moved three commits past the snapshot by 2026-11-11")]),
    'C004': dict(status='NON-EPISTEMIC',
                 permitted_wording="The program sets the objective of one first-class, versioned, independently installed Mechanical function through registered workflow_execute(kind=function) with six named properties and a no-regression constraint; 'exclusive workspace ownership' is to be read as exclusive among Mechanical function invocations (pi-02 L31 exempts prompt/script worktrees and no script path takes a lease at the pin) and 'isolated' as a dedicated clean worktree, not OS containment.",
                 facets={'objective and constraint (normative)': 'NON-EPISTEMIC', "embedded 'exclusive against all Pi writers' reading": 'UNSUPPORTED', "embedded 'completed source changes' referent": 'see C006 (UNSUPPORTED)'},
                 missing=None,
                 remediation=[('NARROW_SCOPE', "qualify 'exclusive' as 'exclusive among Mechanical function invocations' (or decide to fence all overlapping writers) and write 'dedicated clean Git worktree' for 'isolated'")]),
    'C005': dict(status='REFUTED',
                 permitted_wording="The program is the next design revision after the November 9 program and its five linked documents exist at the document pin 3fc0ead1 (master-only); it is not self-contained: D1, D2, D4, D7, D8, D10, D11 and D12, the tier names L2-L5, the criteria behind 'strict native Forge gate' and the gate name MW-CONTRACT are used but defined only in the companion Mechanical program, the producer repository or Pi source (function-authority.ts:135), and P04/P08 block on Mechanical H-work, so the corpus is self-contained for Pi-owned work only, with Mechanical items referenced by label.",
                 facets={'(i) next design revision; five linked files exist at the document pin': 'ESTABLISHED (master-only, absent at 0fb90672 and at trunk ce180d82)', '(ii) self-contained: every term defined within the six files': 'REFUTED (complete token census: 8 D-numbers, 4 L-tiers, MW-CONTRACT, strict criteria undefined)', "pi-05 L2 'independent to execute'": 'UNSUPPORTED (P04/P08 block on MW H-work)'},
                 missing=None,
                 remediation=[('NARROW_SCOPE', "replace 'self-contained' with 'self-contained for Pi-owned work; Mechanical items are referenced by label and defined in the companion program'"), ('ADD_SOURCE', "cite docs/programs/pi-host-integrity-2026-11-10/01-AUDIT-AND-PROOF.md for D1/D2/D4/D7/D8/D10/D11/D12, its 04 for L0-L5, mw-02 section 4 for 'strict', and src/workbench/function-authority.ts:135 for MW-CONTRACT")]),
    'C006': dict(status='UNSUPPORTED',
                 permitted_wording="The November 9 program exists at docs/programs/mechanical-native-interoperability-2026-11-09 on master at 0fb90672; the 'completed source changes' the sentence protects have no Pi src/ referent: the only src change in that program's range (src/workbench/mechanical-coordination.ts, +419) is attributed by its header to the November 4 program (wb-0gbh), none of the 111 commit subjects names a November 9 bead, and what the November 9 program landed is tests, fixtures, receipts and ledger rows under epic wb-rhyt (wb-mit9, wb-7wkb); the seams the README lists were closed under November 4 beads (wb-201v, wb-s8rm, wb-ocie, wb-0gbh, wb-5ik5) and the schema fix is MW 1f29daa7.",
                 facets={'(i) November 9 program exists at the inspected revision': 'ESTABLISHED (master-only)', "(ii) 'completed source changes' attributable to the November 9 program in Pi src/": 'REFUTED for src/ (complete git log over the range); SUPPORTED only under the reading test/fixture/receipt changes under wb-rhyt', '(ii) Mechanical-side changes attributable to the November 9 program': 'UNDETERMINED (no Mechanical commit names a Pi November 9 bead; MW 1f29daa7 predates both programs)'},
                 missing='the author\'s intended referent of "its completed source changes" (a file or bead list)',
                 remediation=[('NARROW_SCOPE', "name what the November 9 program itself landed (EAT-R202 status ledger, EAT-R215 process-kill trial, census tests) and protect those"), ('ADD_SOURCE', "for the seams the README lists, cite the November 4 beads and commits (wb-5ik5/e76448ea, wb-wupg/1c3cc1a4, 59da7d84, wb-201v/029dabca, wb-s8rm/a36f897d) and MW 1f29daa7, so the no-regression constraint has a referent")]),
    'C026': dict(status='NON-EPISTEMIC',
                 permitted_wording="The release definition stipulates the first supported vertical. Its placement clause ('attached or explicitly admitted same-machine execution') conflicts with pi-02 L5 and pi-05 L41 ('embedded' first, detached deferred to P11), 'attached' names no Pi host mode (EXECUTE_HOST_MODES = embedded, detached), 'isolated' means a dedicated worktree rather than containment, and whether a strict-native Forge PASS is attainable in the first-release topology is undetermined: execution_environment.pinned is false in all 148 occurrences across the committed MW evidence files and true only in synthetic test fixtures.",
                 facets={'release definition (stipulation)': 'NON-EPISTEMIC', "placement clause consistent with pi-02/pi-05": 'REFUTED (three incompatible release-boundary sentences)', "'attached' has a code witness": 'UNSUPPORTED', 'strict-native Forge PASS attainable in the first-release topology': 'UNDETERMINED', 'develop/callbacks/function id/profile labels exist': 'ESTABLISHED (C018, C027, C028)'},
                 missing='one native gate.run envelope from the installed Forge on a clean committed disposable package showing execution_environment.pinned true with native commit, tree and gate definition; or a joint decision that strict v1 does not require the environment pin',
                 remediation=[('SURFACE_DISAGREEMENT', "state one first-release placement across README L24, pi-02 L5 and pi-05 L41 (embedded, same-machine Pi session) and define or drop 'attached'"), ('NARROW_SCOPE', "write 'one dedicated clean Git worktree' for 'isolated'"), ('PRESERVE_AS_UNDETERMINED', "mark the strict-native PASS premise as an evidence-acquisition gate (P08/V4) rather than a settled property of the first release")]),
    'C031': dict(status='NON-EPISTEMIC',
                 permitted_wording="The README allocates P0 items and D-numbers between Pi and Mechanical. The two programs' ledgers disagree on D6's owner and content (Pi: registered tool not wired, P04/P05; MW: composed host entrypoint, MW-I04 P0), on D7's label ('strict Forge proof' vs 'effect-intent settlement'), and on the severity of D4/D10/D11/MW-I10/MW-I12 (Pi blocking, MW P1/P2); the lease-owner ruling both programs assign to Pi (EAT-R207) is absent from P00's deliverable list while P02 presupposes it.",
                 facets={'ownership and severity allocation (decision)': 'NON-EPISTEMIC', "embedded premise 'D6 is Pi-owned and not shared'": 'CONTESTED (two ledgers, two owners, two contents)', 'embedded premise: the D8/D10/D11/D12 gaps are real at 69cb016d': 'ESTABLISHED (mw-src executed D8/D10/D11; D12 by source read)', 'embedded premise: both programs assign lease authority to Pi': 'SUPPORTED', 'P0 definition (blocker, not exploit claim)': 'NON-EPISTEMIC'},
                 missing=None,
                 remediation=[('SURFACE_DISAGREEMENT', "list D6 as a two-part shared defect (Pi P04/P05 + MW H06) and record one owner ruling per disputed severity (D4, D10, D11, MW-I10, MW-I12) and the D7 label"), ('ADD_MISSING_PREMISE', "carry the lease-owner ruling (EAT-R207) and its external gate (wb-w8fk blocked on wb-1zn2) in P00")]),
    'C032': dict(status='REFUTED',
                 permitted_wording="The D-numbers are not described in the Pi corpus: D1, D2, D4, D7, D8, D10, D11 and D12 occur only as labels on README line 27 and are described only in the companion's 01-AUDIT-AND-PROOF.md ledger, where none of D8/D10/D11/D12 is marked shared (each a Mechanical P1/P2 item); D6 carries two owners with different content across the two ledgers; D3, D5, D6 and D9 are described in pi-01. The union of pi-01 section A and mw-01 gives every D-number at least one owner.",
                 facets={"(i) every D-number has a description a reader of 'this corpus' can find": 'REFUTED under the README reading order (01..05); SUPPORTED only under a joint Pi+MW corpus reading', '(ii) the corpus describes D8/D10/D11/D12 as shared or Mechanical-owned': 'REFUTED (described only in mw-01; none marked shared)', '(iii) one meaning and one owner per D-number across the two programs': 'REFUTED (D6; D7 label drift)'},
                 missing=None,
                 remediation=[('REPLACE_SOURCE', "replace 'as described in this corpus' with 'as described in the companion Mechanical program, 01-AUDIT-AND-PROOF.md (MW-I01..MW-I12)'"), ('SURFACE_DISAGREEMENT', "state D6 as a two-part shared defect with one owner per half and reconcile the D7 label")]),
    'C033': dict(status='ESTABLISHED',
                 permitted_wording="At MW 69cb016d the producer has the three gaps the README labels: live-gate.ts:205-208 classifies a frame as passed unless gate_passed === false and live-development.ts:387 credits that on a commit match while :414 feeds settlement the locally measured tree and cached manifest hash (D1/D7); effect-reconciliation.ts:98 returns not-occurred with retryPermitted (:79) for HEAD-at-base with clean status, missing ignored-path effects (D2); installed-host.ts:49-51 re-hashes the tarball, not the installed dist files, before the trusted import (D4). Read at source and reproduced by scratch probes at the pin (PROBE/out/defect-probe.jsonl), not yet by committed red tests; unchanged at 1be2b8dc and 0ffdc844.",
                 facets={'(i) D1/D7 Forge verification not strict': 'ESTABLISHED (source + executed probe)', '(ii) D2 negative-effect inference from clean HEAD': 'ESTABLISHED (source + executed probe with ignored-path effect)', '(iii) D4 executable closure not verified per installed file': 'ESTABLISHED (source + executed mutated dist/index.js probe)'},
                 missing=None,
                 remediation=[('ADD_SOURCE', "cite the lines behind each label in README L27 and in G01/G04/G05/G09 (live-gate.ts:205-208, live-development.ts:387/:414, effect-reconciliation.ts:79/:98, installed-host.ts:49-51); each still owes a committed red test in the producer repository per pi-01 L2")]),
    'C034': dict(status='NON-EPISTEMIC',
                 permitted_wording="The operating constraints are process rules for implementers in both repositories; they omit the landing-branch premise: the program documents, both requirement sets and the bead label map are master-only and absent from the gated trunk workbench/implementation-program (ce180d82) where machine lanes cut, so 'inspect current main/master' and 'update docs/skills in the same cut' need a stated branch rule.",
                 facets={'constraints (normative)': 'NON-EPISTEMIC', 'embedded current-state premises': 'see C035 (REFUTED as a conjunction; three facets ESTABLISHED)'},
                 missing=None,
                 remediation=[('ADD_MISSING_PREMISE', "name the landing trunk, the master-only document set and the merge direction in P00/P10; reuse M047/EAT-R140 wording for the CI sentence")]),
    'C035': dict(status='REFUTED',
                 permitted_wording="Of the five presupposed current-state facts, three hold at 69cb016d: Forge and Furnace are independent on the Mechanical side (Furnace lives in four opt-in modules absent from the develop/host path), Mechanical core imports no Pi package (structure gate LIBRARY_PROVIDER_IMPORT_FORBIDDEN names the Pi family; executed 'structure: pass'), and nothing requires Library; HX and RF exist as validated profile labels (hx-task-scope-v1, rf-committed-v1) that bind no behaviour, while no Furnace profile exists (Furnace is a hosting module, not a profile); and 'No GitHub CI' is false for Pi, whose .github/workflows/ci.yml triggers on push and pull_request to master at 0fb90672 under node-version 22 against engines node >=24 (true for Mechanical, which forbids foreign CI files). The repository's own row M047/EAT-R140 had already narrowed this sentence.",
                 facets={'(i) Forge/Furnace independence': 'ESTABLISHED (Mechanical side; Pi side not judged)', '(ii) Mechanical core has no Pi dependency': 'ESTABLISHED', '(iii) execution requires nothing from Library': 'ESTABLISHED', "(iv) HX/RF/Furnace exist as optional profiles": 'UNSUPPORTED for Furnace (no profile value); ESTABLISHED for HX/RF as labels only', "(v) no GitHub-hosted CI configured for either repository": 'REFUTED for Pi (ci.yml); ESTABLISHED for Mechanical', 'whether GitHub Actions ran the deposit and what it reported': 'UNDETERMINED'},
                 missing='for facet (v): a GitHub Actions run record for the master pushes 91d8fa8c/3fc0ead1 (none in the tree)',
                 remediation=[('SPLIT_CLAIM', "one sentence per presupposition so the three established facets are not carried by the refuted one"), ('NARROW_SCOPE', "reuse M047/EAT-R140: 'Do not add or rely on GitHub CI for this program (Pi's pre-existing .github/workflows/ci.yml is out of scope)'; write 'optional HX/RF profiles and the optional Furnace host' for 'HX/RF/Furnace profiles'")]),
    'C086': dict(status='NON-EPISTEMIC',
                 permitted_wording="pi-02 stipulates that its contents are a proposed v1 protocol to be versioned jointly with Mechanical, not a description of existing implementation.",
                 facets={}, missing=None, remediation=[]),
}

ARBITRATED = {
    'C107': dict(status='ESTABLISHED', status_audit='REFUTED',
                 permitted_wording="At Pi 0fb90672 FUNCTION_ACTION_CONTRACT is the frozen named export {state:'unadopted', blockedOn:'MW-CONTRACT'} (unchanged since 029dabca), no production module adopts a contract or calls the boundary, and a dispatch supplied that default refuses function-action-unadopted after the earlier checks; the helper dispatches when handed a contract minted by adoptFunctionActions (probe P7-adoption), so the ratification gate is a constant, not an enforced invariant, and production wires no function launcher.",
                 facets={'FUNCTION_ACTION_CONTRACT = {unadopted, blockedOn MW-CONTRACT}': 'ESTABLISHED', 'no action spelling adopted at the pin (no production adopter)': 'ESTABLISHED', "'so a dispatch that passes the earlier rules refuses function-action-unadopted' - for the exported default (the only contract reachable in a production process at the pin)": 'ESTABLISHED', 'the same sentence as a universal over the helper (any contract)': 'REFUTED (an adopted contract dispatches at the helper seam)', 'module states routing a launcher through the boundary is a later cut': 'ESTABLISHED'},
                 missing=None,
                 remediation=[('NARROW_SCOPE', "scope the refusal consequence to the exported default contract value, as the module comment does"), ('ADD_MISSING_PREMISE', "enforce MW-CONTRACT ratification at the production adoption site (adoptFunctionActions has no caller; any caller can mint an adopted contract)")],
                 ruling="Reading A (audit): REFUTED because dispatchFunctionWithAuthority reads options.contract, so a dispatch handed an adopted contract passes while the constant stays unadopted. Reading B (six lenses: lineage#0, negative-ev#6, contradict#24, mw-src#13, pi-src#9, joint#15): ESTABLISHED as a statement about the pin. Primary evidence re-read: the sentence is the module's own comment (function-authority.ts:105-107) about the exported default; adoptFunctionActions has no production caller, so no adopted contract can exist in a production process at the pin (negative-ev#6 detection: symbol search over all 124 src modules). The audit's probe establishes a real design finding (the gate is a constant, not an enforced invariant) that C050's ESTABLISHED row already carries in its permitted wording; grading the same facts REFUTED on C107 and ESTABLISHED on C050 is inconsistent. Ruling: ESTABLISHED with the scope narrowed to the exported default; the universal-helper reading recorded as a REFUTED facet; the enforcement caveat kept in the permitted wording.",
                 decisive=[E_VERIFY_C107]),
    'C173': dict(status='SUPPORTED', status_audit='ESTABLISHED',
                 permitted_wording="At Pi 0fb90672 workflow_control and workflow_reconcile are registered (control-tool.ts:138, reconcile-tool.ts:62) and a workflow journal exists; at MW 69cb016d effect-intent.ts and effect-reconciliation.ts export openEffectIntent, attachEffectRefs, settleEffectIntent, readEffectIntent, fileEffectIntentStore and reconcileUncertainEffect at module level only: neither module is in the rig's export map (an installed consumer gets ERR_PACKAGE_PATH_NOT_EXPORTED), the record carries intentId and invocationIdentitySha256 but no Pi invocation id, and reconcileUncertainEffect has no src caller, so an integrable 'effect-intent lookup' does not yet exist and depends on MW H02/H07 plus an export.",
                 facets={'Pi workflow_control/workflow_reconcile adapters and a journal exist': 'ESTABLISHED', 'MW effect-intent/effect-reconciliation functions exist at module level': 'ESTABLISHED', "MW 'exports' them (package export reachable by Pi)": 'REFUTED (ERR_PACKAGE_PATH_NOT_EXPORTED)', "a producer 'effect-intent lookup' keyed by invocation exists to integrate": 'UNSUPPORTED (path-addressed single-file reader; no index; no caller)', 'host journal and lease state from P02': 'NON-EPISTEMIC (future)'},
                 missing=None,
                 remediation=[('SPLIT_CLAIM', "separate the Pi adapters (exist) from the Mechanical lookup (module-level functions exist; no package export; no invocation-keyed lookup)"), ('ADD_MISSING_PREMISE', "P07 depends on a public authorized lookup/correlation contract exported from ./host (MW H02/H07) and on a shared intent identifier")],
                 ruling="Reading A (audit): ESTABLISHED, although all three of its attacks (module-vs-package-export, lookup-overclaim, joint-identity-gap) landed and its own permitted wording says Pi 'cannot yet import a producer lookup via the reviewed host subpath'. Reading B (mw-src#9): UNSUPPORTED for the Mechanical half. Primary evidence re-read: package.json exports only ./host and ./package.json; the installed-consumer probe shows ERR_PACKAGE_PATH_NOT_EXPORTED for dist/effect-intent.js and dist/effect-reconciliation.js; reconcileUncertainEffect has no caller outside its module and tests. The Pi half is entailed by source; the Mechanical half holds only at module level. Ruling: SUPPORTED for the row as a whole (existence premises hold, the 'exports'/'lookup' facet does not), with facet statuses recorded.",
                 decisive=[E_VERIFY_C173]),
}


def final_status(c):
    if c in ARBITRATED:
        return ARBITRATED[c]['status']
    if c in HAND:
        return HAND[c]['status']
    return audits[c]['finalStatus']


# ----------------------------------------------------------------------------- lens status parsing (for embedded premise flags + facet evidence)
STAT_WORDS = '(ESTABLISHED|SUPPORTED|PLAUSIBLE|UNSUPPORTED|CONTESTED|REFUTED|UNDETERMINED|NON-EPISTEMIC)'


def lens_flags_for(c):
    out = []
    for r in lens_rows:
        if c not in r['claimIds']:
            continue
        ps = r['proposedStatus'].strip()
        if ps in STAT_RANK or ps == 'NON-EPISTEMIC':
            flag = ps
        else:
            flag = None
            for m in re.finditer(r'(C\d{3}(?:\s*/\s*C\d{3}|,\s*C\d{3}|\s+and\s+C\d{3})*)[^;]*?\b' + STAT_WORDS + r'\b', ps):
                if c in re.findall(r'C\d{3}', m.group(1)):
                    flag = m.group(2)
                    break
            if flag is None:
                m = re.search(r'\b' + STAT_WORDS + r'\b', ps)
                flag = m.group(1) if m else 'UNGRADED'
        out.append({'lens': r['_key'], 'evidence_id': EV_BY_LENS[r['_key']], 'relation': r['relation'], 'proposed': flag,
                    'proposed_text': ps[:400], 'note': (r.get('note') or '')[:400]})
    return out


# ----------------------------------------------------------------------------- remediation class parsing
def parse_remediation(rem):
    texts = []
    if isinstance(rem, str):
        texts = [rem]
    elif isinstance(rem, list):
        for x in rem:
            texts.append((x.get('class', '') + ': ' + x.get('action', '')) if isinstance(x, dict) else str(x))
    else:
        texts = [text(rem)]
    classes = []
    for t in texts:
        for tok in re.findall(r'[A-Z_]{4,}', t):
            if tok in ALLOWED_REM and tok not in classes:
                classes.append(tok)
    joined = ' | '.join(texts)
    is_none = (not classes) and bool(re.match(r'\s*(none|NONE|No empirical correction)', joined))
    return classes, joined, is_none


# ----------------------------------------------------------------------------- propagation
def propagation_for(c):
    r = claims[c]
    st = final_status(c)
    deps = r['deps']
    if not deps:
        return {'dependencies': [], 'cap': None, 'binds': False, 'note': 'no recorded premise dependencies'}
    ds = {d: final_status(d) for d in deps}
    emp = {d: s for d, s in ds.items() if s != 'NON-EPISTEMIC'}
    if not emp:
        return {'dependencies': ds, 'cap': None, 'binds': False, 'note': 'all dependencies are normative; nothing to cap'}
    weakest_d = max(emp, key=lambda d: STAT_RANK[emp[d]])
    cap = emp[weakest_d]
    if st == 'NON-EPISTEMIC':
        return {'dependencies': ds, 'cap': cap, 'binds': False, 'note': f'normative row: embedded premises carry their own statuses (weakest {weakest_d}={cap}); requirement force is a separate dimension'}
    if STAT_RANK[st] < STAT_RANK[cap]:
        notes = {
            'C022': 'cap does not bind: the absence (nothing non-script launches through the registered tool) is warranted independently by C008/C009 (ESTABLISHED); C021 is an existence presupposition about the asset, not a necessary premise',
            'C033': 'cap does not bind: the three producer gaps are established by direct source reading and executed probes at 69cb016d independently of C032 (the D-ledger labelling, REFUTED) and C021',
            'C159': 'cap does not bind: the adoption mechanism exists by direct source reading; C145 (grant spelling jointly signed off, SUPPORTED) is a presupposition about the grant, not about the mechanism',
        }
        return {'dependencies': ds, 'cap': cap, 'binds': False, 'weakest_dependency': weakest_d,
                'note': notes.get(c, 'status exceeds the weakest dependency; independent warrant path recorded in the dossier')}
    return {'dependencies': ds, 'cap': cap, 'binds': STAT_RANK[st] == STAT_RANK[cap] and r['kind'] == 'INFERENCE', 'weakest_dependency': weakest_d,
            'note': 'status at or below the weakest necessary premise' if r['kind'] == 'INFERENCE' else 'status consistent with premises'}


# ----------------------------------------------------------------------------- build claim rows
STRENGTH = {'OBSERVATION': 'indicative', 'SOURCE_REPORT': 'attributed report', 'INFERENCE': 'indicative (inferred)', 'HYPOTHESIS': 'modal (may/could)',
            'PREDICTION': 'conditional', 'DEFINITION': 'stipulative', 'NORMATIVE': 'imperative (must/never)', 'PROPOSAL': 'proposal (propose/should)'}
SUPPORT_REL = {'SUPPORTS', 'ENTAILS', 'SPECIALIZES', 'QUALIFIES', 'DERIVED_FROM'}
COUNTER_REL = {'CONTRADICTS', 'CONFLICTS_WITH'}

claim_rows = []
patch_rows = []
rem_rows = []  # (claim, class, existing wording, repair text, why, evidence ids, tracker)
mismatch_rows = []

for c in CIDS:
    r = claims[c]
    st = final_status(c)
    support, counter, related = [], [], []
    for lr in lens_rows:
        if c not in lr['claimIds']:
            continue
        eid = EV_BY_LENS[lr['_key']]
        if lr['relation'] in SUPPORT_REL:
            support.append(eid)
        elif lr['relation'] in COUNTER_REL:
            counter.append(eid)
        else:
            related.append(eid)
    if c in audits:
        aid = EV_BY_AUDIT[c]
        (counter if audits[c]['finalStatus'] in ('REFUTED', 'UNSUPPORTED') else support).append(aid)
    if c in ARBITRATED:
        for e in ARBITRATED[c]['decisive']:
            (support if ARBITRATED[c]['status'] in ('ESTABLISHED', 'SUPPORTED') else counter).append(e)
    if c in ('C035', 'C032', 'C005', 'C026', 'C029', 'C006', 'C002', 'C003'):
        (counter if st in ('REFUTED', 'UNSUPPORTED') else support).append(E_VERIFY_README)
    # REFUTED/UNSUPPORTED rows: keep the strongest lens support as context but the ledger needs the counterevidence visible
    flags = lens_flags_for(c)
    prop = propagation_for(c)

    if c in ARBITRATED:
        A = ARBITRATED[c]
        pw, facets, missing, rems = A['permitted_wording'], A['facets'], A['missing'], A['remediation']
        rival = audits[c]['rivalReading']
        attacks = audits[c]['attacks']
        drift = audits[c]['driftAtDocCommit']
        vh = [GRADED.format(s=A['status_audit']) + ' (Phase 5 audit)', f"arbitration-{DATE8}:{A['status']}@{PIN_PI if c == 'C107' else PIN_MW}"]
        patch_rows.append({'id': c, 'status_A': A['status_audit'], 'status_B': A['status'], 'status': A['status'],
                           'verdict_history_entry': vh[1], 'evidence': [e for e in A['decisive']] + [EV_BY_AUDIT[c]],
                           'note': A['ruling'][:600]})
    elif c in HAND:
        H = HAND[c]
        pw, facets, missing, rems = H['permitted_wording'], H['facets'], H['missing'], H['remediation']
        rival = 'no Phase 5 audit row; graded at consolidation from the lens rows listed in support/counterevidence and the consolidation re-verification record'
        attacks = [f"{fl['lens']} ({fl['relation']}): {fl['proposed']} - {fl['proposed_text'][:200]}" for fl in flags]
        drift = 'pi 0fb90672 -> 3fc0ead1 (document pin): six program docs + .agents/skills/pi-mechanical-interop/SKILL.md only; src/test/qa/package.json/forge.toml unchanged. MW 69cb016d -> 1be2b8dc -> 6476372f -> 0ffdc844: test titles, one mapping row, companion docs and skill only.'
        vh = [GRADED.format(s=H['status'])]
    else:
        a = audits[c]
        pw = a['permittedWording'].strip()
        facets = {}
        missing = None
        classes, joined, is_none = parse_remediation(a['remediation'])
        rems = [(k, joined) for k in classes] if classes else ([] if is_none else [('ADD_MISSING_PREMISE', joined)] if joined and st == 'NON-EPISTEMIC' else [])
        rival, attacks, drift = a['rivalReading'], a['attacks'], a['driftAtDocCommit']
        vh = [GRADED.format(s=st)]
        # facet statuses where lenses graded a facet differently from the row
        for fl in flags:
            if fl['proposed'] in STAT_RANK and fl['proposed'] != st and st != 'NON-EPISTEMIC':
                facets[f"facet graded by {fl['lens']}"] = f"{fl['proposed']}: {fl['note'][:220]}"
        if st == 'UNDETERMINED':
            missing = 'see dossier'
        if c in ('C023', 'C024', 'C025'):
            missing = 'stores outside the two repositories (an OrchestrationEngineer ledger directory and home-directory Forge ledgers are cited by receipts) were not censused for a joined receipt; the two-repository absence stands'
        if c in ('C175', 'C185'):
            missing = 'one native gate.run envelope from the installed Forge on a clean committed disposable package showing execution_environment.pinned true with native commit, tree and gate definition'

    embedded_flags = [fl for fl in flags if fl['proposed'] in ('REFUTED', 'UNSUPPORTED', 'CONTESTED', 'UNDETERMINED')] if st == 'NON-EPISTEMIC' else []
    strength = STRENGTH[r['kind']]
    mismatch = None
    if st in ('REFUTED', 'UNSUPPORTED', 'PLAUSIBLE', 'UNDETERMINED', 'CONTESTED') and r['kind'] in ('OBSERVATION', 'INFERENCE', 'SOURCE_REPORT'):
        if re.match(r'\s*(Preserve|Use|Do not|Never|Keep|Deliver|Treat)\b', r['strongestWording']):
            mismatch = f"the imperative sentence ('{r['strongestWording'][:120]}') presupposes, as indicative premises, facts whose warrant is {st}"
        else:
            mismatch = f"artifact wording is {strength} ('{r['strongestWording'][:120]}') but the warrant is {st}"
        mismatch_rows.append((c, st, r['strongestWording'][:140], pw[:200]))
    if st == 'NON-EPISTEMIC' and embedded_flags and r['kind'] in ('NORMATIVE', 'PROPOSAL', 'DEFINITION'):
        if re.search(r'\b(is|are|has|have|exists|remains|accepts|ships)\b', r['strongestWording']) and not re.search(r'\b(must|never|require|propose|should)\b', r['strongestWording'], re.I):
            mismatch = f"indicative wording in a {r['kind']} row carries embedded premises graded {sorted(set(f['proposed'] for f in embedded_flags))}"
            mismatch_rows.append((c, st, r['strongestWording'][:140], pw[:200]))

    row = {
        'id': c,
        'proposition': r['text'],
        'verbatim': r['strongestWording'],
        'kind': r['kind'],
        'status': st,
        'material': r['material'],
        'scope': {'description': r['scope'], 'environment': r['timeContext']},
        'temporal_context': {'environment_pin': 'pi-0fb90672 / mw-69cb016d', 'document_pin': 'pi-3fc0ead1 (MW companion at 6476372f)', 'claim_time_context': r['timeContext'], 'as_of': DATE},
        'provenance': {'artifact': 'docs/' + r['doc'], 'location': r['loc'], 'cited_paths': r['citedPaths']},
        'root': ROOT,
        'support': support,
        'counterevidence': counter,
        'related_evidence': related,
        'dependencies': r['deps'],
        'assumptions': [],
        'linguistic_strength': strength,
        'permitted_language': PERMITTED_LANGUAGE[st],
        'permitted_wording': pw,
        'facet_statuses': facets,
        'embedded_premise_flags': [{'lens': f['lens'], 'evidence': f['evidence_id'], 'status': f['proposed'], 'what': f['proposed_text'][:300]} for f in embedded_flags],
        'propagation': prop,
        'rival_reading': rival,
        'attacks': attacks,
        'drift_at_document_pin': drift,
        'remediation_classes': [k for k, _ in rems],
        'wording_mismatch': mismatch,
        'missing_to_settle': missing,
        'verdict_history': vh,
        'graded_by': 'Phase 5 audit (' + audits[c]['_file'] + ')' if c in audits else 'Phase 6-9 consolidation (no Phase 5 row)',
    }
    claim_rows.append(row)
    for k, why in rems:
        rem_rows.append((c, k, r['strongestWording'][:160], why, st, (support + counter)[:4]))

# ----------------------------------------------------------------------------- permitted wording uniqueness (gate e)
seen = collections.defaultdict(list)
for row in claim_rows:
    seen[row['permitted_wording'].strip()].append(row['id'])
dups = {k: v for k, v in seen.items() if len(v) > 1}
assert not dups, dups

# ----------------------------------------------------------------------------- relations
relations = []
rn = 0


def rel(**kw):
    global rn
    rn += 1
    kw = dict(kw)
    kw['id'] = f"{kw.pop('prefix', 'R')}{rn:03d}"
    relations.append(kw)


for c in CIDS:
    for d in claims[c]['deps']:
        rel(type='DEPENDS_ON', tails=[c], heads=[d], notes=f'{c} presupposes or infers from {d} (Phase 1 deps)')
for c in CIDS:
    r = claims[c]
    if r['kind'] == 'INFERENCE' and r['deps']:
        st = final_status(c)
        ds = {d: final_status(d) for d in r['deps']}
        broken = any(s in ('REFUTED', 'UNSUPPORTED') for s in ds.values())
        rel(prefix='H', type='JOINTLY_SUPPORTS', tails=list(r['deps']), heads=[c], rule=r['text'][:300],
            status='BROKEN' if broken else 'VALID',
            notes=('derivation broken by a failed premise; conclusion recomputed from direct evidence -> ' + st) if broken else f'valid joint warrant; conclusion {st}')
for lr in lens_rows:
    eid = EV_BY_LENS[lr['_key']]
    t = lr['relation']
    if t == 'NO_DEFECT_FOUND':
        rel(type='SUPPORTS', tails=[eid], heads=list(lr['claimIds']), notes='contradiction lens found no defect for these baseline rows (failed attack preserved)')
    elif t in ('CONFLICTS_WITH', 'CONTRADICTS') and lr['_name'] in ('contradict', 'joint') and len(lr['claimIds']) > 1:
        rel(type='CONFLICTS_WITH', tails=list(lr['claimIds']), heads=list(lr['claimIds']), evidence=[eid], notes=(lr.get('note') or '')[:300])
    elif t == 'SAME_ORIGIN_AS':
        rel(type='SAME_ORIGIN_AS', tails=list(lr['claimIds']), heads=['MNI-2026-11-09 ledger rows (see SOURCE-MAP L3)' if lr['_name'] == 'lineage' else 'MW companion program docs/mw-*.md (same author, same evening)'], evidence=[eid], notes=(lr.get('note') or '')[:300])
    else:
        rel(type=t, tails=[eid], heads=list(lr['claimIds']), notes=(lr.get('note') or '')[:300])
for c, a in audits.items():
    rel(type='CONTRADICTS' if a['finalStatus'] in ('REFUTED', 'UNSUPPORTED') else 'SUPPORTS', tails=[EV_BY_AUDIT[c]], heads=[c], notes='Phase 5 decisive evidence; final status ' + a['finalStatus'])
rel(type='SUPERSEDES', tails=['MII program (docs/pi-README.md..pi-05)'], heads=['MNI-2026-11-09 program (docs/programs/mechanical-native-interoperability-2026-11-09)'],
    notes='claimed by the MII README (C005 facet i) and the MANIFEST; the routing surfaces at 3fc0ead1 still call MNI current (lineage#8), so supersession is asserted, not yet reflected in the repository')
rel(type='SAME_ORIGIN_AS', tails=['docs/pi-README.md..pi-05 (Pi 91d8fa8c/3fc0ead1)'], heads=['docs/mw-README.md..mw-05 (MW 6476372f)'],
    evidence=[EV_BY_LENS['joint#1']], notes='same author identity, committed within six minutes; companion agreement is one lineage, not corroboration')

# ----------------------------------------------------------------------------- write JSONL
dump_jsonl(OUT + 'CLAIMS.jsonl', claim_rows)
dump_jsonl(OUT + 'EVIDENCE.jsonl', evidence)
dump_jsonl(OUT + 'RELATIONS.jsonl', relations)
dump_jsonl(OUT + 'CLAIMS.patch.jsonl', patch_rows)

# ----------------------------------------------------------------------------- counts
status_counts = collections.Counter(r['status'] for r in claim_rows)
kind_counts = collections.Counter(r['kind'] for r in claim_rows)
mat_counts = collections.Counter(r['status'] for r in claim_rows if r['material'])
kind_status = collections.Counter((r['kind'], r['status']) for r in claim_rows)
doc_status = collections.defaultdict(collections.Counter)
for r in claim_rows:
    doc_status[r['provenance']['artifact']][r['status']] += 1

json.dump({'status_counts': status_counts, 'kind_counts': kind_counts, 'material_status_counts': mat_counts,
           'claims': len(claim_rows), 'evidence': len(evidence), 'relations': len(relations), 'patch_rows': len(patch_rows),
           'remediation_rows': len(rem_rows), 'mismatch_rows': len(mismatch_rows)},
          open(WORK + 'consolidation-counts.json', 'w'), indent=1)
print('claims', len(claim_rows), dict(status_counts))
print('evidence', len(evidence), 'relations', len(relations), 'remediation rows', len(rem_rows), 'patch', len(patch_rows), 'mismatch', len(mismatch_rows))

# expose for the markdown writer
json.dump({'rem_rows': rem_rows, 'mismatch_rows': mismatch_rows, 'kind_status': [[k[0], k[1], v] for k, v in kind_status.items()],
           'doc_status': {k: dict(v) for k, v in doc_status.items()}, 'EV_BY_LENS': EV_BY_LENS, 'EV_BY_AUDIT': EV_BY_AUDIT,
           'E_VERIFY': {'C107': E_VERIFY_C107, 'C173': E_VERIFY_C173, 'README': E_VERIFY_README}},
          open(WORK + 'consolidation-state.json', 'w'))
