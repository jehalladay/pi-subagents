"""Consolidate the audited shards. Local reads; outputs confined to T/requirements.
Run with python3 -I <absolute-script-path> <T>. Never imports from the input directories.
"""
import collections
import datetime
import hashlib
import json
import pathlib
import re
import runpy
import shutil
import sys

T = pathlib.Path(sys.argv[1]).resolve()
Q = T / 'requirements'
W = Q / '.work'
C = W / 'consolidate'
C.mkdir(exist_ok=True)
D = runpy.run_path(str(C / 'edits.py'))
STAMP = datetime.datetime.now(datetime.UTC).strftime('%Y-%m-%dT%H:%M:%SZ')
claims = {r['id']: r for r in map(json.loads, (T / 'epistemic-triage/CLAIMS.jsonl').read_text().splitlines())}
assert len(claims) == 230 and claims['C107']['status'] == 'ESTABLISHED' and claims['C173']['status'] == 'SUPPORTED'
audit = (Q / 'REQUIREMENTS-AUDIT.md').read_text()
# Immutable input copy for re-runs; do not use a matrix already stamped by this script.
matrix_input = C / 'TDD-MATRIX.audit-input.md'
if not matrix_input.exists():
    shutil.copyfile(Q / 'TDD-MATRIX.md', matrix_input)
matrix = matrix_input.read_text()


def sha(p):
    return hashlib.sha256(p.read_bytes()).hexdigest()


def table_between(text, heading, end):
    return [x for x in text.split(heading, 1)[1].split(end, 1)[0].splitlines() if x.startswith('|')]


def cells(line):
    return [x.strip() for x in line.strip().strip('|').split(' | ')]


ma = {c[0]: c for c in map(cells, table_between(matrix, '## 4. Matrix A', '## 5. Matrix B')) if c[0].startswith('EAT-R')}
mb = {c[0]: c for c in map(cells, table_between(matrix, '## 5. Matrix B', '## 6. Falsifier')) if c[0].startswith('EAT-R')}
assert len(ma) == len(mb) == 80
raw_maps = {}
rows = {}
for cluster in ('core', 'exec', 'release'):
    for r in map(json.loads, (W / f'map-r-{cluster}.jsonl').read_text().splitlines()):
        raw_maps[r['requirement']] = r
    text = (W / f'req-r-{cluster}.md').read_text()
    for m in re.finditer(r'(?m)^## (EAT-R\d+) — (.+)$', text):
        rid, title = m.groups()
        start = m.end()
        nxt = re.search(r'(?m)^(?:#{1,3} |---\s*$)', text[start:])
        body = text[start:start + nxt.start()] if nxt else text[start:]
        f = {}
        for fm in re.finditer(r'(?m)^- ([^:\n]+):(?: (.*))?$', body):
            f[fm.group(1)] = (fm.group(2) or '').strip()
        cm = re.search(r'(?ms)^- (?:Executable acceptance criteria|Acceptance criteria):\s*\n(.*?)(?=^- [A-Z])', body)
        assert cm, rid
        criteria = [re.sub(r'^\s*(?:\d+\.|-)\s+', '', l).strip() for l in cm.group(1).splitlines() if re.match(r'^\s*(?:\d+\.|-)\s', l)]
        rows[rid] = dict(id=rid, title=title, cluster='r-' + cluster, type=f['Type'],
                         authority=f['Authority'].split(';')[0].split(' (')[0],
                         statement=f['Statement'], rationale=f['Rationale'], criteria=criteria,
                         tier=f.get('V-tier', f.get('Evidence tier target')),
                         conditions=f.get('Conditions / unresolved gates', f.get('Conditions', 'none.')),
                         mutant=f.get('Negative mutant', ''),
                         lineage=f.get('Predecessor lineage', ''), old_maps=f['Maps-to'])
assert set(rows) == {f'EAT-R{x}' for x in range(391, 471)} == set(raw_maps) == set(ma)
assert sum(len(r['criteria']) for r in rows.values()) > 200
ops = []


def record(rid, field, ra, note, before, after):
    ops.append(dict(requirement=rid, field=field, finding=ra, note=note, before=before, after=after))


for rid, field, kind, old, new, ra, note in D['E']:
    r = rows[rid]
    if field == 'criteria+':
        r['criteria'].append(new)
        record(rid, 'criteria:' + str(len(r['criteria']) - 1), ra, note, '', new)
        continue
    if field.startswith('criteria:'):
        idx = int(field.split(':')[1])
        before = r['criteria'][idx]
    else:
        before = r[field]
    if kind == 'set':
        assert old in before, (rid, field, old, before)
        after = new
    elif kind == 'replace':
        assert before.count(old) == 1, (rid, field, old, before)
        after = before.replace(old, new)
    elif kind == 'append':
        after = before + new
    else:
        raise AssertionError(kind)
    if field.startswith('criteria:'):
        r['criteria'][idx] = after
    else:
        r[field] = after
    record(rid, field, ra, note, before, after)

for rid, old, new, ra, note in D['LINEAGE_PATCH']:
    before = rows[rid]['lineage']
    assert before.count(old) == 1, (rid, old, before)
    rows[rid]['lineage'] = before.replace(old, new)
    record(rid, 'lineage', ra, note, before, rows[rid]['lineage'])
for rid, txt in D['LINEAGE_NEW'].items():
    rows[rid]['lineage'] = txt

# Fresh read if present; otherwise the exact audited live snapshot + owner-supplied status directives.
freshp = C / 'bd-status-consolidation.json'
fresh = json.loads(freshp.read_text()) if freshp.exists() else None
snap = json.loads((W / 'req-audit/bd-status-reread.json').read_text())
statuses = {k: v['status'] for k, v in snap['beads'].items()}
status_basis = 'audit live read 2026-11-11T10:29:12Z; owner 2026-11-11 directives (wb-w8fk OPEN; stated closed-bead repoints)'
if fresh:
    statuses.update({k: v['status'] for k, v in fresh['beads'].items() if v.get('status')})
    status_basis = f"read-only exact-id bd shows {fresh['read_start_utc']}..{fresh['read_end_utc']}; fallback for any failed id: audit live read 2026-11-11T10:29:12Z / owner directives"
statuses['wb-w8fk'] = 'open'   # binding owner directive; any newer conflict is reported by validate.py, not silently substituted
closed_repoints = {'wb-upad': 'wb-9a1o', 'wb-5a7k': 'wb-mwsy', 'wb-79k.1': 'wb-79k.3', 'wb-79k.2': 'wb-79k.3', 'wb-9x5.10': 'wb-9x5.11', 'wb-9x5.16': 'wb-9x5.11', 'wb-69g.7': 'wb-h8f.7', 'wb-752.12': 'wb-752.13'}
# Roles are derived from the audited carrier column, never from the draft Maps-to token census.
for rid, r in rows.items():
    a, b = ma[rid], mb[rid]
    r['packet'] = sorted(set(re.findall(r'\bP(?:0\d|1[0-2])\b', a[4])))
    carriers = a[5].split(' ←')[0]
    r['existingBeads'] = list(dict.fromkeys(re.findall(r'wb-[a-z0-9]+(?:\.\d+)?', carriers)))
    assert all(statuses.get(i) in ('open', 'in_progress') for i in r['existingBeads']), (rid, r['existingBeads'], statuses)
    r['extends'] = list(dict.fromkeys(re.findall(r'EAT-R\d{3}', a[6])))
    r['extends_verdict'] = a[6].split(' — ')[-1]
    r['extends_text'] = (', '.join(r['extends']) if r['extends'] else 'none — NEW (no EAT-R201..R310 predecessor)')
    remark = D['EXTENDS_NOTE'].get(rid)
    if remark:
        r['extends_text'] += '; ' + remark
    elif r['extends_verdict'] == 'ADD':
        r['extends_text'] += '; ADD — the draft stated no EAT lineage (RA-10).'
    elif r['extends_verdict'] == 'OK':
        r['extends_text'] += '; OK — audited lineage retained.'
    before = r.get('lineage', '')
    record(rid, 'extends', 'RA-10', 'audited Extends line copied from Matrix A', a[6], r['extends_text'])
    # Only actual tier targets; comments do not make another V-tier a target.
    tier_target = b[1].split('→')[-1]
    r['verification'] = sorted(set(re.findall(r'\bV[0-6]\b', tier_target)))
    r['tier_detail'] = r['tier']
    r['tier'] = ', '.join(r['verification'])
    r['linked'] = ['EAT-' + x for x in re.findall(r'\bR\d{3}\b', a[8])]
    r['gates'] = b[12]
    r['gate_status'] = b[13]
    if rid in ('EAT-R412', 'EAT-R441'):
        r['gate_status'] += '; launch-status clause BLOCKED on G-RATIFY until the EAT-R466 decision is recorded in the EAT-R405 ratification record (RA-09)'
    r['planned_evidence'] = b[14]
    r['prior_l0'] = a[9]
    blockers = {f'RA-{n:02d}' for n in range(1, 11)}
    tags = set(re.findall(r'RA-\d{2}', a[9]))
    r['resolved'] = sorted(tags & blockers | D['EXTRA_RESOLVED'].get(rid, set()))
    r['remaining'] = sorted(tags - blockers - D['EXTRA_RESOLVED'].get(rid, set()))
    # RA-19 items are next-text-cycle conditions; only the line-accurate text fixes above are cleared.
    if rid == 'EAT-R446':
        r['remaining'].append('RA-19: owner must still reconcile certificate field paths with EAT-R458')
    r['l0'] = 'TRACEABLE' + (' (conditions: ' + ', '.join(r['remaining']) + ')' if r['remaining'] else '')
    if r['resolved']:
        r['l0'] += '; text consolidated: ' + ', '.join(r['resolved'])
    if rid == 'EAT-R412':
        r['l0'] += '; launch-status clause BLOCKED on G-RATIFY (RA-09)'
    if rid == 'EAT-R441':
        r['l0'] += '; launch-status clause BLOCKED on G-RATIFY (RA-09)'
    mapval = '; '.join(f'{i} ({statuses[i]}; re-read at filing)' for i in r['existingBeads'])
    if not mapval:
        mapval = D['NEW_CARRIER'][rid]
    r['maps'] = 'MII ' + ' / '.join(r['packet']) + '; ' + mapval + '.'
    if rid == 'EAT-R432':
        r['maps'] = 'MII P08 / P10; new bead owed (containment wording; no live carrier).';
    if rid == 'EAT-R392':
        # Closed ids stay only in lineage, never on a Maps-to line.
        r['maps'] = 'MII P01; new bead owed (P01 canonical input; no MNI carrier).'
    oldclosed = [i for i in closed_repoints if re.search(r'(?<![\w.])' + re.escape(i) + r'(?![\w.])', r['old_maps'])]
    if oldclosed:
        record(rid, 'maps', 'RA-01', 'closed carrier repointed; old id retained only as lineage', r['old_maps'], r['maps'])
    if rid == 'EAT-R413':
        record(rid, 'maps', 'RA-08', 'TO-BE-FILED carrier (no id invented); repair legs and gate leg named', r['old_maps'], r['maps'])
    if rid in ('EAT-R469', 'EAT-R470'):
        record(rid, 'maps', 'RA-01', 'wb-w8fk now OPEN per owner directive / latest read', r['old_maps'], r['maps'])

# Section 7 / Matrix A links: one table suffices for the filing-time ownership resolution, and
# Verifies / Verified-by lines make the mechanical consolidation useful without moving test ownership.
verifies = {
    'EAT-R446': [433,434,435,436], 'EAT-R447':[403,420,443], 'EAT-R448':[398,399,400,401],
    'EAT-R449':[392,393,406,407,409,410,421,422,424,427,465], 'EAT-R450':[402,420,445],
    'EAT-R451':[417,429,440,442], 'EAT-R452':[428], 'EAT-R453':[397,427], 'EAT-R454':[418,445],
    'EAT-R460':[421,422], 'EAT-R461':[412,426], 'EAT-R462':[425,430,431,457],
    'EAT-R463':[402,414,420,438,439,445], 'EAT-R464':[398,399,400,401,448],
    'EAT-R466':[412,441], 'EAT-R467':[403,418,419,427,428,445],
}
verifiedby = collections.defaultdict(list)
for rid, nums in verifies.items():
    rows[rid]['verifies'] = [f'EAT-R{n}' for n in nums]
    for n in nums:
        verifiedby[f'EAT-R{n}'].append(rid)
for rid, by in verifiedby.items():
    rows[rid]['verifiedby'] = by

# Preambles: keep the pin / execution conventions and oracle definitions, not stale status claims.
core = (W / 'req-r-core.md').read_text()
execshard = (W / 'req-r-exec.md').read_text()
core_rules = core.split('## Pinned basis and compilation rules',1)[1].split('## Execution and evidence conventions',1)[0].strip()
core_rules = core_rules.replace('REFUTED C095 contributes only to negative EAT-R395.', 'REFUTED C095 contributes only a negative budget regression (EAT-R395); EAT-R424 cites its surviving closed request/definition-keys facet, never the refuted raw-budget reading.')
core_conv = core.split('## Execution and evidence conventions',1)[1].split('Bead mapping is verified',1)[0].strip()
core_conv = core_conv.replace('V4 registered native Claude/Git/strict Forge;', 'V4 registered native Claude/Git/native Forge full gate (non-strict is valid; strict attainability remains EAT-R437);')
exec_def = execshard.split('## Shared definitions used by the acceptance criteria',1)[1].split('\n---',1)[0].strip()
# Definition says export only these names + guards; audited exact export count is a next-text-cycle condition.
head = f'''# Atomic Requirements — MII consolidation

Program: `mechanical-interop-integrity-2026-11-10`. Consolidation stamp: **{STAMP}**. Range: **EAT-R391..EAT-R470, 80 rows**, unique and contiguous. **P0 for the first release**; the optional P11 / P12 packets are P2 and explicitly deferred below. Requirement force and claim warrant remain separate. Acceptance is **NOT_RUN** for every row; L0 is traceability only, never implementation acceptance.

This is the requirement-set consolidation of `REQUIREMENTS-AUDIT.md` (FAIL AS DRAFTED, repairable at consolidation). RA-01..RA-10 are applied from section 4; RA-11..RA-22 remain filing-time or next-text-cycle conditions unless explicitly marked text-resolved in `CONSOLIDATION.md`. The upstream audit is immutable. Original shards and their maps are retained read-only in `.work/`. `TDD-MATRIX.md` keeps the audited tier cells and gate verdicts; former L0 text findings are cleared only after their fixes, with the prior verdicts retained in `.work/consolidate/TDD-MATRIX.audit-input.md` and recorded in `CONSOLIDATION.md`.

No new requirement id is allocated. **R471..R488 belong to DX** (epic wb-9d2g + 15 packets); requests that cannot fit an existing row go to the **RANGE-EXHAUSTED candidates** table for the owner. No bead mutation, commit, native launch, test, build or runtime gate is performed by this consolidation.

## Pinned basis and compilation rules

{core_rules}

## Execution and evidence conventions

{core_conv}

{exec_def}

## Carrier custody and filing-time status rule

Bead status is a `bd --readonly --json` read at filing time; the committed `.beads/issues.jsonl` is a passive export. Current consolidation basis: {status_basis}. A live carrier is a work-content correspondence, not permission to edit acceptance of an in-flight bead. RA-21 requires a successor blocked by the in-flight carrier plus append-only notes. MW-owned work is consumed, never built by a Pi bead; wb-1zn2 is the deferred external tracker, never a Pi implementation filing target.

`Maps-to:` lists live Pi carriers only (or an explicit new / TO-BE-FILED carrier). Closed ids appear only in lineage fields or lineage annotations, never as filing targets. The owner-supplied 2026-11-11 graph-audit repoints are binding; see `CONSOLIDATION.md`. wb-w8fk is OPEN (respin in flight); wb-rz62 and wb-xeej are new live W17 carve beads. The DX-overlap notes in `CONSOLIDATION.md` preserve both programs and require body-level reconciliation at filing; neither set is rewritten here.

| Live Pi carrier | Status basis (read again at filing) | Parent / role |
|---|---|---|
'''
parent1 = {'wb-w8fk','wb-4bxo','wb-9a1o','wb-mwsy','wb-p3i2','wb-zswl','wb-pxvv'}
parent2 = {'wb-y0n6','wb-2ukh','wb-xr1z','wb-9bof','wb-yiu4'}
for i in sorted(parent1|parent2):
    head += f'| {i} | {statuses[i]} | ' + ('wb-1a3t (MWI)' if i in parent1 else 'wb-rhyt (MNI)') + ' |\n'
head += '\nExternal tracker: wb-1zn2 (deferred, MW-owned). Both epics exist; the parent ruling for new MII beads is owed under RA-20.\n\n'

# Set-level dispositions required by RA-06 / RA-07. Tables are copied from the audit/matrix, not re-derived.
dtable = '\n'.join(table_between(audit, '### 6.1 D1-D12', 'Related companion'))
# One explicit current disposition per problematic item, while unmade rulings remain explicit.
dtable = dtable.replace('COVERED on both halves; ownership CONTESTED (K004)', 'OWNER-ROUTED through EAT-R469: one ruling proposed as two-part (Pi P04/P05 wiring + MW H06 composed host); ownership CONTESTED (K004) until that record exists')
dtable = dtable.replace('COVERED by content — **not named in any row**', 'ROW EDIT: named in EAT-R434 Conditions (RA-07)', 1)
dtable = dtable.replace('COVERED by content — **not named in any row**', 'ROW EDIT: named in EAT-R428 Conditions (RA-07)', 1)
dtable = dtable.replace('COVERED by content — **not named in any row**', 'ROW EDIT: named in EAT-R425 Conditions (RA-07)', 1)
dtable = dtable.replace('name it (RA-07)', 'named in EAT-R434; no additional Pi obligation')
dtable = dtable.replace('severity ruling; name it', 'severity ruling owner-routed through EAT-R469; named in EAT-R428')
pvtable = '\n'.join(table_between(matrix, '## 8. Explicit deferrals', '## 9. Matrix invariants')[:5])
# select table header + P11 P12 V6 rows (skip the intro)
all_def_lines = table_between(matrix, '## 8. Explicit deferrals', '## 9. Matrix invariants')
pvtable = '\n'.join([x for x in all_def_lines if x.startswith('| Program item') or x.startswith('|---') or x.startswith('| P11') or x.startswith('| P12') or x.startswith('| V6')])
pvtable = pvtable.replace('S — NOT_RUN; no MII row', 'S — NOT_RUN; explicit deferral record in CLAIM-REQUIREMENT-MAP.jsonl (RA-06)')
pvtable = pvtable.replace('no MII row targets V6', 'no first-release MII row targets V6; explicit deferral record (RA-06)')
pvtable = pvtable.replace('explicit deferral record in CLAIM-REQUIREMENT-MAP.jsonl (RA-06) targets V6', 'explicit deferral record in CLAIM-REQUIREMENT-MAP.jsonl (RA-06)')
pvtable = pvtable.replace('(open; wb-dlc6 closed into it)', '(open at audit read; lineage: wb-dlc6, closed into it)')
pvtable = pvtable.replace('(in_progress; wb-669r closed into it)', '(in_progress at audit read; lineage: wb-669r, closed into it)')
extra_def = '''
| Claim / item | Grade | Explicit disposition / reason | Carrier / condition |
|---|---|---|---|
| C005 | REFUTED | Wording insert (M005/M006) plus the RA-07 crosswalk rows; never a positive self-containment premise | R468 insert block (RA-14, filing-time condition); R469 D / tier / strict / MW-CONTRACT crosswalk (RA-07, text fixed) |
| C035 | REFUTED | Facets (i)-(iii) established, (iv) Furnace-profile wording insert (M038/M039, tracker lineage: wb-12x1 row M047), (v) CI → R456; the GitHub-Actions run record is routed to the Pi owner and is out of program scope | Pi owner; annotation block / owner routing under RA-14, never inferred CI absence |
| D6 owner (K004) | CONTESTED embedded premise | OWNER-ROUTED: one proposed two-part ruling (Pi P04/P05 wiring + MW H06 composed host); no bare D-label filing | R469 crosswalk; G-RATIFY until owner record exists |
| D4 / D10 / D11 / MW-I10 / MW-I12 severity; D7 label | Unmade owner decisions | OWNER-ROUTED: one severity ruling each and one D7 label; table reads CONTESTED until the record exists | R469 criterion 4 / G-RATIFY |
| EAT-R253 repair | Witnessed red; no live repair carrier in audit | TO-BE-FILED at bead filing by the owner (new bead, blocks every effectful arm per the audit); legs EAT-R213 / R214 / R253, authority EMPIRICAL_REPAIR; R413 gate leg | R413; red-first evidence test/workbench-mwi-cancel-repro.test.ts; lineage: wb-9v02 / wb-3121 (closed, not targets) |
| MW-owned D1/D2/D4/D7/D8/D10/D11/D12, MW-I10/MW-I11 repairs | External producer work | Consumed / guarded by Pi rows; no Pi cut edits a MW test or implementation | Companion mw-03 H01..H07 by content; tracker wb-1zn2 (deferred) |
'''
setsections = '\n## Explicit deferrals\n\n' + pvtable + '\n\n' + extra_def + '\n## D-number disposition table\n\nCompanion definition authority: pi-01 section A for D3, D5, D6 and D9; mw-01 defect ledger for the other D-numbers. D6 is contested ownership, not a silently shared bare label. The table is the audit section 6.1 table with the RA-07 dispositions applied.\n\n' + dtable + '\n\n'

mapping = []
rowtexts = []
for rid, r in sorted(rows.items()):
    raw = raw_maps[rid]
    ids = list(dict.fromkeys([x for x in raw.get('derived_from', []) if re.fullmatch(r'[CH]\d{3}', x)] + re.findall(r'\bC\d{3}\b', r['statement']+' '+r['rationale']+' '+r['conditions']+' '+' '.join(r['criteria']))))
    assert all(i in claims for i in ids), (rid, ids)
    basis = [{'id': i, 'status': claims[i]['status']} for i in ids]
    remediation = sorted(set(raw.get('remediation_ids', []) + raw.get('remediation_rows', []) + [x for x in raw.get('derived_from', []) if re.fullmatch(r'M\d{3}',x)] + re.findall(r'\bM\d{3}\b',r['rationale']+' '+r['conditions'])))
    if not r['mutant']:
        mut = [x for x in r['criteria'] if re.search('mutant|Negative:',x,re.I)]
        r['mutant'] = ' | '.join(mut) if mut else 'NOT_NAMED in the draft; owner must name the row-specific negative mutant at the next text cycle (RA-18); no mutant has been run.'
    deriv = {'NORMATIVE_DECISION':'ADOPT_NORMATIVE_DESIGN','RISK_CONTROL':'RISK_CONTROL','EVIDENCE_ACQUISITION':'VERIFY_UNCERTAINTY','LINGUISTIC_INTEGRITY':'REPAIR_REPRESENTATION'}[r['authority']]
    sec = raw.get('secondary_authorities', [])
    if not sec:
        # Original authority field supplies the secondary status in exec/core/release prose.
        orig = re.search(r'(?m)^- Authority: (.*)$', re.search(r'(?ms)^## '+rid+r' — .*?(?=^## EAT-R|\Z)', (W/f"req-r-{r['cluster'][2:]}.md").read_text()).group(0))
        if orig:
            sec = re.findall(r'secondary ([A-Z_]+)',orig.group(1))
    conditions = [r['conditions']]
    notes = r['remaining']
    if notes:
        conditions.append('Filing-time / next-text-cycle conditions: '+', '.join(notes)+'; exact audit fixes are restated in CONSOLIDATION.md.')
    oracle = {'route':'ORACLE-REG / DETECT-ZERO where required by the criteria; decision/census/receipt rows use their named validator', 'acceptance_criteria':r['criteria'], 'negative_mutant':r['mutant'], 'named_gates':r['gates'].split(', ')}
    out = dict(requirement=rid,type=r['type'],authority=r['authority'],derived_from=ids,epistemic_basis=basis,
               derivation=deriv,conditions=conditions,verification=r['verification'],packet=r['packet'],
               existingBeads=r['existingBeads'],extends=r['extends'],oracle=oracle,acceptanceState='NOT_RUN',
               scope={'program':'mechanical-interop-integrity-2026-11-10','document_pin':'3fc0ead1e99f854365fd4226f582eaf4f19f8858',
                      'pi_environment_pin':'0fb9067262532289104417d2b7f2f25704563a75','mw_environment_pin':'69cb016dd293a17bcc893f2baf410a51c226f4c9',
                      'as_of':STAMP,'first_release':'embedded same-machine participating Mechanical function writers',
                      'claim_scopes':{i:claims[i].get('scope') for i in ids},
                      'claim_temporal_contexts':{i:claims[i].get('temporal_context') for i in ids}},
               secondary_authorities=sec,priority='P0',remediation_ids=remediation,
               embedded_premise_flags={i:claims[i].get('embedded_premise_flags',[]) for i in ids if claims[i].get('embedded_premise_flags')},
               maps_to={'mii_packets':r['packet'],'live_beads':r['existingBeads'],'extends_eat':r['extends'],'carrier_disposition':r['maps']},
               tdd_levels=['L0']+[f'L{i}' for i, c in enumerate(mb[rid][2:12],1) if c.startswith('A')],
               planned_evidence=r['planned_evidence'],linked_rows=r['linked'],verifies=r.get('verifies',[]),verified_by=r.get('verifiedby',[]),
               compile_input_hashes={'CLAIMS.jsonl':sha(T/'epistemic-triage/CLAIMS.jsonl'), 'REQUIREMENTS-AUDIT.md':sha(Q/'REQUIREMENTS-AUDIT.md'),
                                    'TDD-MATRIX.audit-input.md':sha(matrix_input)},
               source_shard=r['cluster'],source_derivation=raw.get('derivation'),l0=r['l0'],prior_l0=r['prior_l0'],
               upstream_gate_status=r['gate_status'])
    mapping.append(out)
    x = [f"## {rid} — {r['title']}", '', f"- Type: {r['type']}", f"- Authority: {r['authority']}" + ('; secondary '+', '.join(sec) if sec else ''),
         f"- Statement: {r['statement']}", f"- Rationale: {r['rationale']}",
         '- Epistemic basis: ' + '; '.join(f"{i['id']} {i['status']}" for i in basis) + '.',
         '- Derived from / remediation: ' + ', '.join(ids) + ('; '+', '.join(remediation) if remediation else '')+'.',
         '- Executable acceptance criteria:']
    x.extend(f'  {n}. {v}' for n,v in enumerate(r['criteria'],1))
    x.extend([f"- Negative mutant: {r['mutant']}", f"- V-tier: {r['tier']}; {r['planned_evidence']}; target detail: {r['tier_detail']}",
              f"- Conditions / unresolved gates: {r['conditions']}" + (' Filing-time / next-text-cycle: '+', '.join(notes)+'.' if notes else ''),
              f"- Maps-to: {r['maps']}", f"- Extends: {r['extends_text']}", f"- Predecessor lineage: {r['lineage'] or 'No further lineage stated in the draft.'}",
              '- Linked rows: '+(', '.join(r['linked']) if r['linked'] else 'none stated in Matrix A')+'.',
              '- Verifies: '+(', '.join(r.get('verifies',[])) if r.get('verifies') else 'none (behaviour/contract or independent decision row)')+'.',
              '- Verified-by: '+(', '.join(r.get('verifiedby',[])) if r.get('verifiedby') else 'none stated in Matrix A; own gate / validator')+'.',
              f"- L0: {r['l0']}; acceptance NOT_RUN.", f"- Gate status (unexecuted): {r['gate_status']}", ''])
    rowtexts.append('\n'.join(x))

# Null-requirement disposition records: required RA-06 extension without changing the 80-row 1:1 join.
defrecords = [
    dict(disposition='DEFERRED',item='P11',derived_from=['C178'],carrier='wb-zswl',extends_eat=[f'EAT-R{i}' for i in range(295,299)]+['EAT-R303'],reason='Optional detached function + Furnace; P2 after P10, not a first-release blocker; R404 c3 / R412 c2 refuse it; R438 c3 detached assertion deferred to P11.'),
    dict(disposition='DEFERRED',item='P12',derived_from=['C179'],carrier='wb-pxvv',extends_eat=[f'EAT-R{i}' for i in range(299,303)]+['EAT-R303'],reason='Optional HX / RF and further function families; in-flight MNI work, not an MII dependency; no development-write grant inheritance.'),
    dict(disposition='DEFERRED',item='P11/P12 optional order',derived_from=['C143'],carrier=['wb-zswl','wb-pxvv'],extends_eat=['EAT-R303'],reason='P08 → P09 → P10 order is a filing-time graph condition; optional P11/P12 follow their separate admission and evidence, not a first-release dependency.'),
    dict(disposition='DEFERRED',item='V6',derived_from=['C186'],carrier=['wb-zswl','wb-pxvv'],extends_eat=['EAT-R303'],reason='V6 second half of C186: optional detached / Furnace / HX / RF / fleet configurations deferred with P11/P12; V5 is compiled by R463.'),
    dict(disposition='WORDING_INSERT_AND_CROSSWALK',item='C005',derived_from=['C005'],carrier='wb-yiu4 / wb-w8fk (filing-time successor rule)',extends_eat=[],reason='REFUTED self-containment premise: M005/M006 wording insert under R468 (RA-14) plus RA-07 crosswalk rows under R469; never a positive premise.'),
    dict(disposition='OWNER_ROUTED',item='C035',derived_from=['C035'],carrier='Pi owner (GitHub-Actions run record out of program scope)',extends_eat=[],reason='Facets (i)-(iii) established, (iv) Furnace-profile wording insert M038/M039 (lineage: wb-12x1 row M047), (v) CI → R456; no CI absence claim.'),
]
for v in defrecords:
    v['requirement'] = None
    v['epistemic_basis'] = [{'id':i,'status':claims[i]['status']} for i in v['derived_from']]
    v['acceptanceState'] = 'NOT_RUN'
    v['scope'] = 'Disposition record, not an 81st MII requirement; claim status copied from patched ledger.'
mapfile = Q/'CLAIM-REQUIREMENT-MAP.jsonl'
mapfile.write_text(''.join(json.dumps(x,ensure_ascii=False)+'\n' for x in mapping+defrecords))
atomic = head + '\n'.join(rowtexts) + setsections
atomic += '''## RANGE-EXHAUSTED candidates and remaining filing conditions

No new requirement is allocated outside EAT-R391..R470. See CONSOLIDATION.md for the owner-routed table: the empirical EAT-R253 repair uses existing predecessor legs EAT-R213 / R214 / R253 plus R413, so it is not a new MII id. Clause-level splits are filing-time acceptance gate lines (RA-16), not new ids. RA-11..RA-22 are restated there as the owner's bead-filing checklist; each unperformed decision / external acquisition stays pending, never claimed complete.
'''
(Q/'ATOMIC-REQUIREMENTS.md').write_text(atomic)

# Matrix update: preserve cells / gate statuses, clear resolved text findings, preserve prior L0 in snapshot + notes.
lines = matrix.splitlines()
newlines = []
section = ''
for line in lines:
    if line.startswith('## '):
        section=line
    if line.startswith('| EAT-R'):
        c=cells(line); rid=c[0]
        if section.startswith('## 4.'):
            r=rows[rid]
            c[5] = '; '.join(f'{i} ({statuses[i]})' for i in r['existingBeads']) if r['existingBeads'] else ('**TO-BE-FILED** by owner — new EAT-R253 repair / R413 gate carrier' if rid=='EAT-R413' else '**new** (no live carrier)')
            c[6]=r['extends_text']
            c[9]=r['l0']
            line='| '+' | '.join(c)+' |'
        elif section.startswith('## 5.'):
            r=rows[rid]
            c[1]=','.join(r['verification'])
            # Gate status is not changed to PASS; only stale text markers are cleared.
            c[13]=c[13].replace('criterion 1 must be amended first (RA-02); then P05','criterion 1 text fixed (RA-02); launch-status clause BLOCKED on G-RATIFY until the EAT-R466 decision record (RA-09); then P05')
            c[13]=c[13].replace('row must be amended first (RA-03, RA-12)','text fixed (RA-03, RA-12); producer-side red is consumed, absent receipt records BLOCKED(producer-red-absent)')
            c[13]=c[13].replace('conditions must be amended first (RA-04)','conditions fixed (RA-04); EAT-R464 is downstream')
            c[13]=c[13].replace('EAT-R253 repair receipt (no live carrier)','EAT-R413 carrier of the EAT-R253 gate (new carrier TO-BE-FILED by owner)')
            c[13]=c[13].replace('the repair has no live carrier (RA-08)','the repair carrier is TO-BE-FILED at bead filing by the owner (RA-08; new bead, blocks every effectful arm)')
            if rid=='EAT-R412':
                c[13]+='; launch-status clause BLOCKED on G-RATIFY until the EAT-R466 decision record (RA-09)'
            line='| '+' | '.join(c)+' |'
    newlines.append(line)
newmatrix='\n'.join(newlines)+'\n'
newmatrix=newmatrix.replace('**Nothing in this matrix is a green claim.**', f'Consolidation stamp: **{STAMP}** — canonical 80 rows in `ATOMIC-REQUIREMENTS.md` / `CLAIM-REQUIREMENT-MAP.jsonl`; RA-01..RA-10 text fixes applied; RA-11..RA-22 filing-time / next-text-cycle conditions retained. Prior L0 custody verdicts are preserved verbatim in `.work/consolidate/TDD-MATRIX.audit-input.md`; the 24 resolved L0 text findings are itemized in `CONSOLIDATION.md`. No runtime acceptance was executed.\n\n**Nothing in this matrix is a green claim.**',1)
newmatrix=newmatrix.replace('L0: TRACEABLE 56, AMEND 24 (R401, R407, R410, R412, R413, R418, R429, R431, R436, R438, R439, R440, R441, R444, R445, R446, R448, R450, R462, R463, R464, R466, R469, R470).','L0 after consolidation: TRACEABLE 80, outstanding text-repair flags 0. Prior L0 text-repair verdicts: 24, preserved in the audit-input snapshot and CONSOLIDATION.md; 56 original TRACEABLE verdicts retained.')
newmatrix=newmatrix.replace('`V-tier` shows the draft\'s tiers and, in bold after the arrow, the audited tiers where the draft is wrong (RA-12).','`V-tier` now shows the consolidated audited tiers; the draft tiers and RA-12 adjudication remain in the audit-input snapshot.')
newmatrix=newmatrix.replace('The drafts neither cover nor explicitly defer these program items (RA-06, RA-07, RA-13). They are recorded here so that no cell is a silent skip; each needs the stated line in the consolidated ATOMIC-REQUIREMENTS.md.','P11, P12 and V6 now have explicit deferrals in ATOMIC-REQUIREMENTS.md and null-requirement disposition records in CLAIM-REQUIREMENT-MAP.jsonl (RA-06). D-number dispositions are in ATOMIC-REQUIREMENTS.md (RA-07). RA-13 rows below remain filing-time conditions; no gate is silently skipped.')
newmatrix=newmatrix.replace('| EAT-R253 repair (parked-beforeDispatch skip / retry loss; witnessed) | OWED: no live carrier (wb-9v02 closed as the repro bead; wb-3121 closed) |', '| EAT-R253 repair (parked-beforeDispatch skip / retry loss; witnessed) | TO-BE-FILED at bead filing by the owner (new bead, blocks every effectful arm per the audit); lineage: wb-9v02 closed as the repro bead; wb-3121 closed |')
# Fix stale status assertions only in the snapshot narrative; the filing read remains mandatory.
newmatrix=newmatrix.replace('8 rows name a closed bead in the draft and are retargeted in Matrix A (RA-01).','8 rows named a closed carrier in the draft; they are now retargeted in the consolidated Maps-to lines and Matrix A (RA-01).')
newmatrix=newmatrix.replace('The `Extends:` line owed under RA-10 is carried by Matrix A and does not by itself make a row `AMEND`.','The `Extends:` lines under RA-10 are now copied into every canonical row; Matrix A retains the audited lineage adjudication.')
(Q/'TDD-MATRIX.md').write_text(newmatrix)

# Machine receipts for the follow-up validators / notes generator.
(C/'edits-applied.json').write_text(json.dumps(ops,indent=1,ensure_ascii=False))
(C/'row-summary.json').write_text(json.dumps(rows,indent=1,ensure_ascii=False))
(C/'deferrals.json').write_text(json.dumps(defrecords,indent=1,ensure_ascii=False))
(C/'build-metadata.json').write_text(json.dumps(dict(stamp=STAMP,status_basis=status_basis,statuses=statuses,fresh_read_present=bool(fresh),
    input_hashes={str(p.relative_to(T)):sha(p) for p in [Q/'REQUIREMENTS-AUDIT.md',matrix_input,T/'epistemic-triage/CLAIMS.jsonl']+[W/f'{prefix}-r-{k}.{ext}' for k in ('core','exec','release') for prefix,ext in [('req','md'),('map','jsonl')]]}),indent=1))
print('Consolidated:',len(rows),'requirement rows;',len(defrecords),'null-requirement disposition records;',len(ops),'recorded edits')
print('L0:',collections.Counter(r['l0'].split()[0] for r in rows.values()))
print('Bead read:',status_basis)
print('Range:',min(rows),max(rows))
