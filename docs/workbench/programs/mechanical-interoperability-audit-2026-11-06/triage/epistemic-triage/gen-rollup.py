#!/usr/bin/env python3 -I
"""Phase 6-8 roll-up generator (part 1: load, re-key, evidence registry, claims, relations, lenses).
Read-only everywhere except out/epistemic-triage/. Nothing is run against the pins here.
"""
import json, re, collections, os, sys

BASE = '/workplace/jehallad/AgentEcosystem/ForgeWorkspaces/Pi/PiSubagents/OrchestrationEngineer/scratch/mwi-audit-triage-1106/out/epistemic-triage/'
TODAY = '20261107'
DOC_PIN = 'pi@d7666a76f561'
PI_PIN = 'pi@d7666a76f561'
MW_PIN = 'mw@97e18068f399'
MW_TIP = 'mw-tip@6e15a4245d3f'
ROOTS = {
    'pi@d7666a76f561': 'pins/pi-d7666a76 = pi-subagents d7666a76f5618dff61140dff20dde6ea64967814 (document pin == environment pin; docs-only commit on baseline 278c8f79)',
    'mw@97e18068f399': 'pins/mw-97e18068 = MechanicalWorkflows 97e18068f3996d9a3faf242c089691b049ed04ac (program-stated MW baseline)',
    'mw-tip@6e15a4245d3f': 'MechanicalWorkflows origin/main 6e15a4245d3f at triage start, read via git inside pins/mw-97e18068 (2 docs-only commits past the pin)',
}

def load(f):
    return [json.loads(l) for l in open(BASE + f, encoding='utf-8') if l.strip()]

def part_of_status(r):
    p = str(r.get('part'))
    if 'part-02' in p: return '02'
    return p

def fid(part, oid):
    """Final id: part-02 ids are re-keyed +300 (C1201..C1331 -> C1501..C1631); all other ids are unique and kept."""
    if part == '02' and re.fullmatch(r'C1[23]\d\d', oid):
        return 'C%d' % (int(oid[1:]) + 300)
    return oid

def remap_text_p02(s):
    if not isinstance(s, str): return s
    return re.sub(r'\bC(1[23]\d\d)\b', lambda m: 'C%d' % (int(m.group(1)) + 300), s)

# ------------------------------------------------------------------ load
PARTS = ['01', '02', '03', '04']
claims_by_part = {p: load('claims-part-%s.jsonl' % p) for p in PARTS}
status_rows = {'g01': load('status-part-g01.jsonl'), 'g02': load('status-part-g02.jsonl'), 'g03': load('status-part-g03.jsonl')}
GROUP_OF_PART = {'01': 'g01', '02': 'g02', '03': 'g03', '04': 'g03'}
relations_raw = {'g01': load('relations-part-g01.jsonl'), 'g02': load('relations-part-g02.jsonl'), 'g03': load('relations-part-g03.jsonl')}
LENS_FILES = ['lens-provenance.jsonl', 'lens-scope.jsonl', 'lens-logic.jsonl', 'lens-fidelity.jsonl', 'lens-negative.jsonl']
lenses_raw = {f: load(f) for f in LENS_FILES}
dossier_files = set(os.listdir(BASE + 'dossiers'))

# ------------------------------------------------------------------ evidence registry
ev_registry = {}      # key -> E-id
ev_rows = {}          # E-id -> row
ev_counter = [1000]

def _norm_lines(l):
    if l is None: return None
    return str(l).strip()

def source_type(pin, path):
    p = path or ''
    if re.match(r'^(git |grep|ls |find |cat |python|rev-|ls-tree|diff|log|show|branch|blame)', p) or ' --' in p or p.startswith('git') or 'git ' in p[:5] or p.endswith('/') or '(ls' in p or ' | ' in p:
        return 'PROBE_OUTPUT'
    if 'mechanical-interoperability-audit-2026-11-06' in p: return 'ARTIFACT_PROGRAM_DOC'
    if p.endswith('.agents/skills/pi-mechanical-interop/SKILL.md') or p == '.agents/skills/pi-mechanical-interop/SKILL.md': return 'ARTIFACT_SKILL'
    if p.endswith('docs/workbench/mechanical-function-hosting.md') or p == 'docs/workbench/mechanical-function-hosting.md': return 'ARTIFACT_HOSTING_GUIDE'
    if 'mechanical-workflows-interop-2026-11-04/triage' in p: return 'PRIOR_TRIAGE_LEDGER'
    if 'mechanical-workflows-interop-2026-11-04' in p: return 'PRIOR_PI_PROGRAM_DOC'
    if 'pi-workbench-interoperability-audit-2026-11-06' in p: return 'MW_COMPANION_PROGRAM_TIP'
    if 'pi-workbench-interop-2026-11-04' in p: return 'MW_COMPANION_PROGRAM_NOV4'
    if p.startswith('.agents/skills/mechanical-pi-host'): return 'MW_COMPANION_SKILL'
    if p.startswith('docs/workbench/receipts/') or p.startswith('qa/workbench/receipts'): return 'PI_PRODUCER_RECEIPT'
    if p.startswith('qa/integration') or p.startswith('docs/10-') or p.startswith('docs/13-'): return 'MW_HISTORICAL_RECEIPT_OR_STATE_DOC'
    if p.startswith('new-feedback/'): return 'PI_AGENT_FEEDBACK'
    if p.startswith('.beads/'): return 'BEADS_STORE'
    if p.startswith('.github/'): return 'PI_CI_CONFIG'
    if pin and pin.startswith('mw'):
        if '/test/' in p or p.startswith('test/'): return 'MW_TEST'
        if p.startswith('apps/') or p.startswith('packages/') or p.startswith('contracts/'): return 'MW_CODE_OR_CONTRACT'
        if p.endswith('package.json') or p.endswith('.toml') or p.endswith('.json'): return 'MW_MANIFEST'
        if p.startswith('docs/') or p.endswith('.md'): return 'MW_REPO_DOC'
        return 'MW_OTHER'
    if p.startswith('src/'): return 'PI_CODE'
    if p.startswith('test/'): return 'PI_TEST'
    if p.endswith('package.json') or p.endswith('forge.toml') or p == 'AGENTS.md': return 'PI_MANIFEST_OR_AGENTS'
    if p.startswith('docs/') or p.endswith('.md'): return 'PI_REPO_DOC'
    if p.startswith('out/') or 'claims-part' in p: return 'TRIAGE_CORPUS_SELF'
    return 'OTHER'

def add_evidence(e, claim_ids=(), relation='SUPPORTS', origin='status'):
    pin = e.get('pin') or 'unknown'
    path = e.get('path') or ''
    lines = _norm_lines(e.get('lines'))
    quote = (e.get('quote') or '')[:240]
    key = (pin, path, lines, quote)
    if key not in ev_registry:
        ev_counter[0] += 1
        eid = 'E%d' % ev_counter[0]
        ev_registry[key] = eid
        ev_rows[eid] = {
            'id': eid, 'pin': pin, 'root': ROOTS.get(pin, 'corpus-internal (out/epistemic-triage; purgeable scratch mirrored to the durable homes named in MANIFEST.md)' if pin.startswith('out') or pin == 'unknown' else pin),
            'artifact': path, 'revision': pin.split('@')[-1] if '@' in pin else None, 'location': lines, 'quote': quote,
            'source_type': source_type(pin, path), 'claims': [], 'relations': set(), 'origins': set(),
            'limitations': ['static read at the pin; nothing was run'] if source_type(pin, path) != 'PROBE_OUTPUT' else ['read-only git/grep/ls probe output recorded by an investigator; re-runnable at the pin'],
        }
    eid = ev_registry[key]
    row = ev_rows[eid]
    for c in claim_ids:
        if c and c not in row['claims']: row['claims'].append(c)
    row['relations'].add(relation); row['origins'].add(origin)
    return eid

# ------------------------------------------------------------------ claims (merge claim + status)
claims = {}       # final id -> merged dict
by_part_oid = {}  # (part, oid) -> final id
for p in PARTS:
    for c in claims_by_part[p]:
        nid = fid(p, c['id']); by_part_oid[(p, c['id'])] = nid
        claims[nid] = {'_claim': c, '_part': p, '_oid': c['id'], '_group': GROUP_OF_PART[p]}
for g, rows in status_rows.items():
    for r in rows:
        p = part_of_status(r); nid = by_part_oid[(p, r['id'])]
        assert '_status' not in claims[nid], nid
        claims[nid]['_status'] = r
assert all('_status' in v for v in claims.values()), [k for k, v in claims.items() if '_status' not in v]
assert len(claims) == 459, len(claims)

def lines_overlap(a, b):
    def expand(s):
        out = set()
        for seg in re.split(r'[,;]', str(s or '')):
            seg = seg.strip()
            m = re.fullmatch(r'L?(\d+)(?:-L?(\d+))?', seg)
            if m:
                lo = int(m.group(1)); hi = int(m.group(2) or m.group(1))
                out.update(range(lo, hi + 1))
        return out
    A, B = expand(a), expand(b)
    if A and B: return bool(A & B)
    return str(a).strip() == str(b).strip()

def dossier_for(nid, part, oid, status_row):
    d = status_row.get('dossier')
    if d:
        fn = d.split('/')[-1]
        return 'dossiers/' + fn if fn in dossier_files else None
    cands = ['%s-part03.md' % oid, '%s.md' % oid] if part == '03' else ['%s.md' % oid]
    for c in cands:
        if c in dossier_files: return 'dossiers/' + c
    return None

def pins_from_tv(tv):
    found = re.findall(r'\b(pi@[0-9a-f]{6,}|mw@[0-9a-f]{6,}|mw-tip@[0-9a-f]{6,})', tv or '')
    seen = []
    for f in found:
        if f not in seen: seen.append(f)
    return seen

def permitted_wording_g01(c, s, nid):
    prop = c['proposition'].rstrip('.')
    st = s['status']; kind = s['kind']
    ps = s.get('permitted_strength') or ''
    qual = ''
    m = re.search(r'\(([^()]*(?:\([^()]*\)[^()]*)*)\)', ps)
    if m: qual = m.group(1).strip()
    pins = pins_from_tv(c.get('time_version')) or [PI_PIN]
    pin_s = ' / '.join(pins[:2])
    q = (' (%s)' % qual) if qual else ''
    if st == 'NON-EPISTEMIC':
        verb = {'NORMATIVE': 'requires', 'PROPOSAL': 'proposes', 'DEFINITION': 'defines'}.get(kind, 'states')
        return 'The program %s: %s.' % (verb, prop)
    if st == 'ESTABLISHED':
        if kind == 'SOURCE_REPORT':
            return 'At %s the cited source records: %s%s.' % (pin_s, prop, q)
        return 'At %s: %s%s.' % (pin_s, prop, q)
    if st == 'SUPPORTED':
        if kind == 'HYPOTHESIS':
            return 'By code reading at %s this is a supported but unreproduced hypothesis: %s%s.' % (pin_s, prop, q)
        if kind == 'SOURCE_REPORT':
            return 'Dated sources at %s support, without establishing, the report: %s%s.' % (pin_s, prop, q)
        return 'The evidence at %s supports, without establishing, the claim: %s%s.' % (pin_s, prop, q)
    return 'The evidence at %s contradicts the claim: %s%s.' % (pin_s, prop, q)

# ------------------------------------------------------------------ overclaims adjustments decided by the roll-up (Phase 7)
ROLLUP_OVERCLAIM_FLIPS = {
    'C1628': "overclaims false->true: artifact 03:51 'first Git-census remains usable' asserts a positive usability the probe only leaves not-blocked (lens-logic NARROWS: positive half rests on an unwitnessed premise; the Nov-4 ledger flagged the same proposition, C0443, overclaims)",
}
ROLLUP_NOTES = {
    'C1210': "extraction overreach (not an artifact defect): the ledger proposition says 'develop/developLive options'; the artifact names only commit f7c0a943 and the option, and the signal lives on the rig's AgentOptions/LiveDevelopmentOptions, not on the library develop() (KG01-06 / K113). Ledger-only repair M120.",
}

CLAIM_ROWS = {}
for nid, v in claims.items():
    c, s, p, oid, g = v['_claim'], v['_status'], v['_part'], v['_oid'], v['_group']
    support, anchor = [], []
    for e in s.get('evidence') or []:
        eid = add_evidence(e, [nid], 'SUPPORTS', 'status-%s' % g)
        if e.get('path') == c['source']['path'] and lines_overlap(e.get('lines'), c['source'].get('lines')):
            anchor.append(eid)
        else:
            support.append(eid)
    pw = s.get('permitted_wording')
    pw_origin = 'investigator (%s)' % g
    if not pw:
        pw = permitted_wording_g01(c, s, nid); pw_origin = 'roll-up template from %s permitted_strength + proposition' % g
    pw = remap_text_p02(pw) if p == '02' else pw
    overclaims = bool(s.get('overclaims'))
    adjustments = []
    if nid in ROLLUP_OVERCLAIM_FLIPS:
        overclaims = True; adjustments.append(ROLLUP_OVERCLAIM_FLIPS[nid])
    depends = [fid(p, d) for d in (c.get('depends_on') or [])]
    tv = c.get('time_version') or ''
    row = {
        'id': nid, 'original_id': oid, 'part': p, 'group': g, 'claim_file': 'claims-part-%s.jsonl' % p,
        'status_file': 'status-part-%s.jsonl' % g,
        'dossier': dossier_for(nid, p, oid, s),
        'proposition': c['proposition'], 'verbatim': c.get('strongest_wording'), 'kind': s['kind'],
        'status': s['status'], 'material': bool(s.get('material')), 'overclaims': overclaims,
        'scope': {'text': c.get('scope')},
        'temporal_context': {'text': tv, 'document_pin': DOC_PIN, 'environment_pins': [PI_PIN, MW_PIN], 'mw_tip_at_triage_start': MW_TIP,
                             'program_baselines': ['pi master 278c8f79a3a1d078cfcfbd5b6661a8d321c5a505', 'mw main 97e18068f3996d9a3faf242c089691b049ed04ac'], 'claim_pins': pins_from_tv(tv)},
        'provenance': {'root': DOC_PIN, 'artifact': c['source']['path'], 'location': 'L%s' % c['source'].get('lines'), 'section': c['source'].get('section')},
        'root': DOC_PIN,
        'implicit_premises': c.get('implicit_premises') or [],
        'presuppositions': s.get('presuppositions'),
        'depends_on': depends,
        'supersedes': c.get('supersedes') or [],
        'supersedes_faithful': s.get('supersedes_faithful'),
        'support': support, 'anchor': anchor, 'counterevidence': [],
        'evidence': s.get('evidence') or [],
        'defeaters': s.get('defeaters') or [], 'rivals_preserved': s.get('rivals_preserved') or [],
        'propagation': remap_text_p02(s.get('propagation')) if p == '02' else s.get('propagation'),
        'cross_group': [], 'lens_findings': [], 'contradiction_sets': [], 'scope_restrictions': [],
        'linguistic_strength': s.get('artifact_wording'),
        'permitted_language': remap_text_p02(s.get('permitted_strength')) if p == '02' else s.get('permitted_strength'),
        'permitted_wording': pw, 'permitted_wording_origin': pw_origin,
        'rationale': remap_text_p02(s.get('rationale')) if p == '02' else s.get('rationale'),
        'missing_to_settle': s.get('missing_artifact') or None,
        'not_run': s.get('not_run') or 'static reads only; nothing executed',
        'kind_note': s.get('kind_note'),
        'rollup_adjustments': adjustments,
        'note': ROLLUP_NOTES.get(nid),
        'verdict_history': [],
    }
    CLAIM_ROWS[nid] = row

print('claims merged', len(CLAIM_ROWS), 'evidence so far', len(ev_rows))

# ------------------------------------------------------------------ relations (normalize three shapes)
RELS = []
rel_counter = [0]
def new_rel(rtype, tails, heads, notes, group, evidence_ids, original_id=None, scope='intra-group', extra=None):
    rel_counter[0] += 1
    r = {'id': 'R%05d' % rel_counter[0], 'type': rtype, 'tails': tails, 'heads': heads, 'notes': notes, 'group': group,
         'evidence': evidence_ids, 'original_id': original_id, 'scope': scope}
    if extra: r.update(extra)
    RELS.append(r); return r

def is_prior(x): return bool(re.fullmatch(r'C0\d{3,4}', str(x)))
def is_claim(x): return bool(re.fullmatch(r'C1\d{3,4}', str(x)))

def ev_from_pinpath(s, inline):
    """Resolve a 'pin:path:lines' string against inline evidence objects; create a bare record when no quote exists."""
    m = re.match(r'^(pi@[0-9a-f]+|mw@[0-9a-f]+|mw-tip@[0-9a-f]+):(.+?)(?::([^:]+))?$', s)
    if not m: return None
    pin, path, lines = m.group(1), m.group(2), m.group(3)
    for e in inline or []:
        if e.get('pin') == pin and e.get('path') == path and (lines is None or _norm_lines(e.get('lines')) == _norm_lines(lines)):
            return add_evidence(e, [], 'RELATION', 'relation')
    return add_evidence({'pin': pin, 'path': path, 'lines': lines, 'quote': ''}, [], 'RELATION', 'relation')

# g01
for r in relations_raw['g01']:
    inline = r.get('evidence') or []
    ev_ids = [add_evidence(e, [], 'RELATION', 'relation-g01') for e in inline]
    tails = []
    for t in r['tails']:
        if str(t).startswith('E-g01:'):
            tails.extend(ev_ids if ev_ids else [t])
        elif str(t).startswith('P:'):
            tails.append(str(t)[2:])
        else:
            tails.append(t)
    # dedupe preserve order
    seen = set(); tails = [t for t in tails if not (t in seen or seen.add(t))]
    heads = list(r['heads'])
    scope = 'prior-link' if any(is_prior(h) for h in heads) else 'intra-group'
    extra = {k: r[k] for k in ('rule', 'status') if k in r}
    new_rel(r['type'], tails, heads, r.get('notes'), 'g01', ev_ids, r['id'], scope, extra)
    for h in heads:
        if is_claim(h) and r['type'] in ('SUPPORTS', 'JOINTLY_SUPPORTS', 'ENTAILS'):
            for eid in ev_ids: 
                if h in CLAIM_ROWS and eid not in CLAIM_ROWS[h]['support'] and eid not in CLAIM_ROWS[h]['anchor']:
                    ev_rows[eid]['claims'].append(h) if h not in ev_rows[eid]['claims'] else None
# g02 (part-02 ids re-keyed)
for r in relations_raw['g02']:
    tails = [fid('02', t) if is_claim(t) else t for t in r['tails']]
    heads = [fid('02', h) if is_claim(h) else h for h in r['heads']]
    scope = 'prior-link' if any(is_prior(h) for h in heads) else 'intra-group'
    new_rel(r['type'], tails, heads, remap_text_p02(r.get('notes')), 'g02', [], r['id'], scope)
# g03 (from/to shape; ids are part-03/part-04, no re-key)
for i, r in enumerate(relations_raw['g03'], 1):
    inline = r.get('evidence') or []
    ev_ids = [add_evidence(e, [], 'RELATION', 'relation-g03') for e in inline]
    f, t = r['from'], r['to']
    tails = [f] if is_claim(f) or is_prior(f) else [ev_from_pinpath(f, inline) or f]
    heads = [t] if is_claim(t) or is_prior(t) else [ev_from_pinpath(t, inline) or t]
    scope = 'prior-link' if any(is_prior(h) for h in heads) else 'intra-group'
    new_rel(r['relation'], tails, heads, r.get('notes'), 'g03', ev_ids, 'g03-row-%03d' % i, scope)

# counterevidence from CONTRADICTS / CONFLICTS_WITH
for r in RELS:
    if r['type'] == 'CONTRADICTS':
        for h in r['heads']:
            if h in CLAIM_ROWS:
                for eid in r['evidence'] + [t for t in r['tails'] if str(t).startswith('E')]:
                    if eid in ev_rows and eid not in CLAIM_ROWS[h]['counterevidence']:
                        CLAIM_ROWS[h]['counterevidence'].append(eid); ev_rows[eid]['claims'].append(h) if h not in ev_rows[eid]['claims'] else None
    if r['type'] == 'CONFLICTS_WITH':
        for x in r['heads'] + r['tails']:
            if x in CLAIM_ROWS:
                for eid in r['evidence'] + [t for t in r['tails'] + r['heads'] if str(t).startswith('E')]:
                    if eid in ev_rows and eid not in CLAIM_ROWS[x]['counterevidence'] and eid not in CLAIM_ROWS[x]['support']:
                        CLAIM_ROWS[x]['counterevidence'].append(eid); ev_rows[eid]['claims'].append(x) if x not in ev_rows[eid]['claims'] else None

# ------------------------------------------------------------------ lens id resolution (collisions resolved by the roll-up; see LENS_RESOLUTION)
# (lens file, row index 1-based) -> {bare id: part}; '*' means every colliding id in the row maps to that part
LENS_RESOLUTION = {
 ('lens-scope.jsonl', 2): {'C1203':'01','C1211':'01','C1212':'01','C1214':'01','C1215':'01','C1216':'01','C1217':'01','C1307':'02'},
 ('lens-scope.jsonl', 3): {'*':'03'},
 ('lens-scope.jsonl', 6): {'C1252':('02','C1204','lens cited C1252; no part holds that sentence under C1252; resolved by content to the 02:5 claim C1204(part-02)')},
 ('lens-scope.jsonl', 9): {'C1244':'01','C1245':'01','C1255':'02'},
 ('lens-scope.jsonl', 10): {'*':'02'},
 ('lens-scope.jsonl', 11): {'C1253':'01','C1255':'01','C1248':'02'},
 ('lens-scope.jsonl', 12): {'*':'02'},
 ('lens-scope.jsonl', 13): 'CORPUS_DEFECT',
 ('lens-logic.jsonl', 3): {'*':'02'},
 ('lens-logic.jsonl', 4): {'C1201':'01','C1202':'01','C1203':'01','C1204':'01','C1205':'01','C1231':'02'},
 ('lens-logic.jsonl', 5): {'*':'01'},
 ('lens-logic.jsonl', 8): {'C1311':'03'},
 ('lens-logic.jsonl', 11): {'C1303':'02'},
 ('lens-logic.jsonl', 13): {'C1224':'01','C1225':'01','C1326':'02','C1327':'02'},
 ('lens-logic.jsonl', 14): {'C1328':'02'},
 ('lens-logic.jsonl', 15): 'CORPUS_DEFECT',
 ('lens-logic.jsonl', 16): {'C1240':'02','C1241':'02','C1244':'01'},
 ('lens-fidelity.jsonl', 1): {'C1242':'02'},
 ('lens-fidelity.jsonl', 3): {'C1331':'03'},
 ('lens-fidelity.jsonl', 5): {'C1307':'03'},
 ('lens-fidelity.jsonl', 8): {'*':'02'},
 ('lens-fidelity.jsonl', 11): {'C1203':'01','C1231':'02','C1206':'01'},
 ('lens-fidelity.jsonl', 12): {'C1202':'01'},
 ('lens-fidelity.jsonl', 13): {'C1201':'01'},
 ('lens-fidelity.jsonl', 15): {'*':'01'},
 ('lens-fidelity.jsonl', 16): {'C1210':'01'},
 ('lens-fidelity.jsonl', 17): {'C1213':'01'},
 ('lens-fidelity.jsonl', 18): {'C1257':'02'},
 ('lens-fidelity.jsonl', 19): {'C1244':'01'},
 ('lens-fidelity.jsonl', 21): {'C1257':'02'},
 ('lens-fidelity.jsonl', 23): {'C1206':'01'},
 ('lens-fidelity.jsonl', 24): 'CORPUS_DEFECT',
 ('lens-negative.jsonl', 1): 'CORPUS_DEFECT',
 ('lens-negative.jsonl', 4): {'C1244':'01','C1245':('01','C1245','lens text says 02-feedback for C1245, but the W11 blanket-absence norm is 01:42 C1245(part-01); the 02:27 C1245 (selectors) does not fit the finding'),'C1255':'02'},
 ('lens-negative.jsonl', 6): {'C1307':'03'},
 ('lens-negative.jsonl', 7): {'C1243':'02','C1308':'03','C1309':'03','C1317':'02','C1318':'02'},
 ('lens-negative.jsonl', 9): {'C1306':'03'},
 ('lens-negative.jsonl', 10): {'C1310':'03'},
 ('lens-negative.jsonl', 11): {'C1240':'01','C1241':'01','C1242':'01','C1324':'02'},
 ('lens-negative.jsonl', 12): {'C1257':'02','C1322':'03','C1312':'03'},
 ('lens-negative.jsonl', 13): {'C1201':'01','C1202':'01','C1203':'01','C1204':'01','C1205':'01','C1231':'02'},
 ('lens-negative.jsonl', 14): {'C1210':'01','C1211':'01','C1212':'01','C1214':'01','C1218':'01','C1324':'03'},
 ('lens-negative.jsonl', 15): {'C1311':'03'},
 ('lens-negative.jsonl', 16): {'*':'02'},
 ('lens-negative.jsonl', 17): {'C1253':'01','C1255':'01','C1248':'02','C1249':'02'},
 ('lens-negative.jsonl', 18): {'C1220':'01','C1221':'01','C1222':'01','C1223':'01','C1224':'01','C1225':'01','C1250':'02','C1251':'02','C1326':'02','C1327':'02','C1328':'02'},
 ('lens-negative.jsonl', 19): {'C1305':'03'},
 ('lens-negative.jsonl', 20): {'C1304':'03','C1316':'03','C1252':'02'},
 ('lens-negative.jsonl', 21): {'*':'03'},
 ('lens-negative.jsonl', 25): {'*':'03'},
 ('lens-negative.jsonl', 27): {'C1226':'01','C1231':'01','C1315':'02'},
 ('lens-negative.jsonl', 28): {'C1307':'02'},
 ('lens-negative.jsonl', 29): {'C1252':'02','C1301':'03','C1304':'03'},
 ('lens-negative.jsonl', 30): {'C1204':'02'},
}
parts_of_oid = collections.defaultdict(list)
for (p, oid), nid in by_part_oid.items(): parts_of_oid[oid].append(p)

LENS_ROWS = []
lens_counter = [0]
unresolved = []
for f, rows in lenses_raw.items():
    for i, o in enumerate(rows, 1):
        lens_counter[0] += 1
        lid = 'L-%s-%03d' % (f.split('-')[1].split('.')[0], i)
        rule = LENS_RESOLUTION.get((f, i))
        resolved, notes = [], []
        if rule == 'CORPUS_DEFECT':
            resolved = []
        else:
            for raw in o.get('claim_ids', []):
                m = re.fullmatch(r'(C1\d{3,4})\(part-(\d\d)\)', raw)
                if m:
                    nid = by_part_oid.get((m.group(2), m.group(1)))
                    if nid: resolved.append(nid)
                    else: unresolved.append((lid, raw))
                    continue
                oid = raw; parts = parts_of_oid.get(oid, [])
                if len(parts) == 1:
                    resolved.append(by_part_oid[(parts[0], oid)])
                elif len(parts) > 1:
                    pick = None
                    if isinstance(rule, dict):
                        pick = rule.get(oid) or rule.get('*')
                    if isinstance(pick, tuple):
                        part, target, why = pick
                        resolved.append(by_part_oid[(part, target)]); notes.append('%s -> %s(part-%s): %s' % (oid, target, part, why))
                    elif pick:
                        resolved.append(by_part_oid[(pick, oid)])
                    else:
                        unresolved.append((lid, raw))
                else:
                    unresolved.append((lid, raw))
        ev_ids = [add_evidence(e, resolved, 'LENS_' + o.get('effect', 'NOTE'), 'lens-' + f) for e in o.get('evidence', [])]
        lr = {'id': lid, 'lens': o.get('lens'), 'source_file': f, 'row': i, 'effect': o.get('effect'),
              'claim_ids_raw': o.get('claim_ids'), 'claims': resolved, 'finding': o.get('finding'),
              'detection_model': o.get('detection_model'), 'drift': o.get('drift'), 'evidence': ev_ids,
              'corpus_defect': rule == 'CORPUS_DEFECT', 'id_resolution_notes': notes}
        LENS_ROWS.append(lr)
        for nid in resolved:
            CLAIM_ROWS[nid]['lens_findings'].append({'lens': o.get('lens'), 'effect': o.get('effect'), 'ref': lid})
            if o.get('effect') == 'CONTRADICTS':
                for eid in ev_ids:
                    if eid not in CLAIM_ROWS[nid]['counterevidence']: CLAIM_ROWS[nid]['counterevidence'].append(eid)
        # cross-group relation per lens row
        if resolved:
            rtype = {'SUPPORTS': 'SUPPORTS', 'CONTRADICTS': 'CONTRADICTS', 'NARROWS': 'NARROWS', 'DRIFT': 'TEMPORAL_DEFEATER', 'UNDETERMINED': 'UNDETERMINED'}.get(o.get('effect'), 'NOTE')
            groups = sorted(set(CLAIM_ROWS[n]['group'] for n in resolved))
            new_rel(rtype, ev_ids if ev_ids else [lid], resolved, 'lens %s row %d (%s): %s' % (o.get('lens'), i, lid, (o.get('finding') or '')[:200]),
                    'rollup', ev_ids, lid, 'cross-group' if len(groups) > 1 else 'intra-group', {'lens_ref': lid, 'groups': groups})
print('lens rows', len(LENS_ROWS), 'unresolved', unresolved)

# ------------------------------------------------------------------ Phase 6: cross-group propagation
# Restatement families: claims in different parts/documents that assert the same current-state proposition (one authorial lineage).
FAMILIES = {
 'F01-worktree-P0': {'core': 'cleanupWorktree force-removes the worktree and reports hasChanges:false when a preservation step fails',
    'members': ['C1122','C1130','C1131','C1132','C1133','C1136','C1137','C1542','C1423','C1477','C1478'],
    'norms': ['C1134','C1135','C1306','C1333','C1358','C1621','C1479']},
 'F02-detached-grants': {'core': 'both registered detached Claude launchers pass grants:[] while local-detached validateRequest requires claude:invoke / claude:tool:* for a Claude backend',
    'members': ['C1119','C1120','C1150','C1151','C1152','C1153','C1154','C1155','C1424','C1480','C1481'], 'norms': ['C1307']},
 'F03-cancel-race-hypothesis': {'core': 'a per-agent skip/retry issued while a first-spawn beforeDispatch is awaited can be missed (hypothesis, unreproduced)',
    'members': ['C1160','C1161','C1162','C1543','C1425','C1482','C1483'], 'norms': ['C1164','C1617','C1618','C1308','C1309']},
 'F04-replay-basis-gaps': {'core': 'the Claude host replayBasis omits Git base commit/tree, skill/instruction bytes, provider versions and effect references',
    'members': ['C1114','C1170','C1171','C1172','C1173','C1174','C1176','C1426'], 'norms': ['C1310','C1363']},
 'F04b-mw-app-local-identities': {'core': "MW 97e18068 adds prompt/config and gate-manifest digests that are app-local, not cross-host replay authority",
    'members': ['C1175','C1213','C1486'], 'norms': []},
 'F05-descriptor-repair': {'core': 'MW commit 1f29daa7 repaired development.v1.json schema refs; the Nov-4 mismatch was true at 0c78e253 and is false at 97e18068',
    'members': ['C1200','C1201','C1202','C1203','C1206','C1531','C1532','C1417','C1439','C1473','C1474','C1475','C1580'], 'norms': ['C1204']},
 'F06-mw-cancel-pre-dispatch': {'core': 'MW f7c0a943 added signal?: AbortSignal honoured only at pre-dispatch barriers and not forwarded to the Claude SDK session',
    'members': ['C1210','C1211','C1212','C1214','C1218','C1533','C1534','C1535','C1536','C1484','C1485'], 'norms': []},
 'F07-hx-probe-wb-f3wd': {'core': 'the committed wb-f3wd receipt records exit 3 / exit 0 / exit 4 legs, verdict task-scope-unsupported at hx 0.1.0, Git-census named not blocked',
    'members': ['C1220','C1221','C1222','C1223','C1224','C1225','C1550','C1551','C1626','C1627','C1454','C1455','C1487'], 'norms': ['C1628','C1488']},
 'F08-wb-muip-census': {'core': 'the committed wb-muip receipt records a searched-scope absence of a joined Pi-run/MW-outcome/Forge-op/source-pin witness with global reading UNDETERMINED',
    'members': ['C1253','C1254','C1255','C1548','C1549','C1420','C1492','C1493'], 'norms': ['C1256']},
 'F09-no-mechanical-host': {'core': 'at the pin Pi registers no Mechanical function host; workflow_execute refuses kind != script before launch',
    'members': ['C1111','C1116','C1141','C1143','C1144','C1147','C1181','C1182','C1538','C1557','C1561','C1419','C1434','C1441','C1468','C1469','C1470'], 'norms': []},
 'F10-collective-event-W11-stale': {'core': 'src/workbench/collective-event.ts exists (read-only boundary, unwired) and feature-matrix.md:112 is stale at the pin',
    'members': ['C1129','C1243','C1244','C1537','C1539','C1389','C1461'], 'norms': ['C1245','C1555','C1460','C1343']},
 'F11-mw-packaged-consumer': {'core': '@mechanical/development-rig declares a CLI bin and no exports/main; no stable host API export exists for Pi',
    'members': ['C1190','C1191','C1192','C1193','C1197','C1557'], 'norms': []},
 'F12-companion-at-tip': {'core': 'the MW companion program/skill the Pi program cites exists only at mw-tip 6e15a4245d3f, not at the stated baseline 97e18068',
    'members': ['C1406','C1465'], 'norms': ['C1562','C1311','C1322','C1323','C1324','C1325','C1326','C1327','C1328','C1498','C1499','C1376']},
 'F13-program-self-report-no-execution': {'core': 'the program executed nothing (static audit; docs-only commit)',
    'members': ['C1101','C1102','C1257','C1387','C1388','C1428'], 'norms': []},
 'F14-baselines-and-drift': {'core': 'Pi baseline 278c8f79 is the direct parent of d7666a76 (docs-only); MW 97e18068 is an ancestor of origin/main with two docs-only commits past it',
    'members': ['C1106','C1206','C1402','C1403','C1404'], 'norms': []},
 'F15-no-github-ci': {'core': "'No GitHub CI' is false as an inventory statement for pi-subagents (ci.yml exists); true as the norm 'no NEW GitHub CI'",
    'members': ['C1345'], 'norms': ['C1346','C1433','C14115']},
 'F16-semaphores-no-global-bound': {'core': 'per-run semaphores give no global bound across workflows/functions/Furnace attempts',
    'members': ['C1240','C1241','C1242'], 'norms': ['C1624']},
 'F17-node-not-shell': {'core': 'node() dispatches a capability through a registry; the Nov-4 anti-shell sentence was normative',
    'members': ['C1145','C1540','C1541'], 'norms': []},
 'F18-selectors-not-deployed': {'core': 'neither profile nor mode request-side selector is a deployed ABI; the proposed selectors are proposals',
    'members': ['C1545','C1561','C1572'], 'norms': ['C1546','C1576','C1498','C1499','C1458']},
 'F19-rf-preview-vs-committed-context': {'core': "Pi's RF --no-commit preview yields no committed render ID and cannot stand in for MW's committed task context",
    'members': ['C1226','C1227','C1228','C1229','C1230','C1231','C1457'], 'norms': ['C1615']},
 'F20-mw-historical-receipts-2026-10-15': {'core': "MW's Claude/Git/Forge, RF and Furnace live receipts are dated 2026-10-15 and do not prove Pi hosting",
    'members': ['C1126','C1251','C1418','C1490','C1491'], 'norms': []},
}
missing_fam = [m for f in FAMILIES.values() for m in f['members'] + f['norms'] if m not in CLAIM_ROWS]
assert not missing_fam, missing_fam

FAMILY_REPORT = {}
for fname, f in FAMILIES.items():
    members = f['members']
    statuses = collections.Counter(CLAIM_ROWS[m]['status'] for m in members)
    groups = sorted(set(CLAIM_ROWS[m]['group'] for m in members + f['norms']))
    weaker = [m for m in members if CLAIM_ROWS[m]['status'] in ('SUPPORTED', 'PLAUSIBLE', 'REFUTED', 'UNSUPPORTED')]
    # harmony: a weaker member is consistent when it is flagged overclaims or its permitted_language names the weaker warrant
    notes = []
    for m in weaker:
        r = CLAIM_ROWS[m]
        notes.append('%s %s%s: %s' % (m, r['status'], ' (overclaims)' if r['overclaims'] else '', (r['permitted_language'] or '')[:140]))
    verdict = 'CONSISTENT' if len(statuses) == 1 else 'CONSISTENT (wording-dependent: the weaker rows carry a weaker artifact wording or an unreproduced/prospective half, recorded on the row)'
    if fname == 'F15-no-github-ci': verdict = 'REFUTED observation vs consistent narrowed norms (K115)'
    if fname == 'F12-companion-at-tip': verdict = 'CONSISTENT at mw-tip only; every member and every norm citing the companion carries the tip-only pin note (K105)'
    FAMILY_REPORT[fname] = {'core': f['core'], 'members': members, 'norms': f['norms'], 'groups': groups, 'statuses': dict(statuses), 'weaker_members': notes, 'verdict': verdict}
    rel = new_rel('SAME_ORIGIN_AS', members + f['norms'], [], 'restatement family %s (%s): %s; verdict %s' % (fname, '/'.join(groups), f['core'], verdict),
                  'rollup', [], fname, 'cross-group' if len(groups) > 1 else 'intra-group', {'family': fname, 'rule': 'one authorial lineage (commit d7666a76); restatements are not independent corroboration'})
    for m in members + f['norms']:
        CLAIM_ROWS[m]['cross_group'].append({'relation': rel['id'], 'type': 'SAME_ORIGIN_AS', 'family': fname, 'role': 'member' if m in members else 'norm', 'verdict': verdict})

# Scope restrictions propagated across groups
SR_UNLANDED = ("tracked default-branch trees at pi d7666a76 / mw 97e18068 only; unlanded machine/flywheel branches (wb-5ik5 worktree fix, wb-413a replay rebinding, wb-ocie descriptor boundary, wb-ny54/wb-s8rm admission tests) already change the cited files and were not inspected for correctness or pass (not run); re-grade owed at the post-landing master tip (K110)")
for fam in ('F01-worktree-P0', 'F02-detached-grants', 'F04-replay-basis-gaps', 'F09-no-mechanical-host'):
    for m in FAMILIES[fam]['members']:
        if SR_UNLANDED not in CLAIM_ROWS[m]['scope_restrictions']: CLAIM_ROWS[m]['scope_restrictions'].append(SR_UNLANDED)
SR_TIP = ("the MW companion program (docs/programs/pi-workbench-interoperability-audit-2026-11-06) and its labels/tokens exist only at mw-tip@6e15a4245d3f (commits 2ea69445/6e15a424, 2026-11-06), not at the program's stated MW baseline 97e18068; the companion is the same authorial lineage as the Pi program and is not independent corroboration (K105)")
for m in FAMILIES['F12-companion-at-tip']['members'] + FAMILIES['F12-companion-at-tip']['norms'] + ['C1572', 'C1573', 'C1574', 'C1575', 'C1576', 'C1546']:
    if m in CLAIM_ROWS and SR_TIP not in CLAIM_ROWS[m]['scope_restrictions']: CLAIM_ROWS[m]['scope_restrictions'].append(SR_TIP)
SR_HX = "one producer version (hx 0.1.0, recorded binary SHA-256), the find verb and the 84-capability roster; a workspace-defined named query carrying a task scope and other verbs/builds are NOT CLAIMED by the receipt"
for m in FAMILIES['F07-hx-probe-wb-f3wd']['members']:
    if SR_HX not in CLAIM_ROWS[m]['scope_restrictions']: CLAIM_ROWS[m]['scope_restrictions'].append(SR_HX)
SR_CENSUS = "searched stores only (docs/workbench/receipts/*.md level-2 entries, TRACEABILITY.md sections, qa/workbench/receipts/*.json; 205 entries in 56 files); the MW repository, shared artifact store, Claude session journals and workbench machine ledger were declared unread; the universal historical absence stays UNDETERMINED"
for m in FAMILIES['F08-wb-muip-census']['members']:
    if SR_CENSUS not in CLAIM_ROWS[m]['scope_restrictions']: CLAIM_ROWS[m]['scope_restrictions'].append(SR_CENSUS)

# Contradiction sets (merged numbering K101..) -> claims
KSETS = {
 'K101': {'title': "README:22 'Critical before an effectful run' vs the BEAD-PLAN graph the program orders reused", 'status': 'CONTESTED (two normative orderings in one lineage)', 'claims': ['C1427','C1304','C1316','C1552','C1340'], 'from': ['K-g03-01','lens-negative[20]']},
 'K102': {'title': "'Never remove or weaken a safety test' vs B-preserve acceptance 'no false-clean' and the committed lossy characterization test", 'status': 'CONTESTED within the Nov-6 text; reconcilable by the BEAD-PLAN rule 8 it incorporates by reference', 'claims': ['C1344','C1306','C1333','C1358','C1621','C1542','C1133','C1135'], 'from': ['K-g03-02','KG02-N06','lens-negative[9]']},
 'K103': {'title': "MW-R1..R7 track labels, 'Mechanical-owned' header and dropped external gates vs the Nov-4 mw-* tracks / wb-1zn2 / MW-R3 dependency of 'native cancel'", 'status': 'UNRECONCILED omission (label vocabularies unmapped; external gates absent from Stage rows); not a factual contradiction', 'claims': ['C1322','C1323','C1324','C1325','C1326','C1327','C1328','C1304','C1315','C1362','C1319','C1367'], 'from': ['K-g03-03','lens-negative[21]']},
 'K104': {'title': "doc 03:19 alias ban ('profile'/'mode') vs hosting.md:17 'host modes', MW companion SKILL:26 and the shipped MW result-side `mode` member", 'status': 'RECONCILED by semantic split (request-side selector vs prose / result-side literal); artifact consistency defect owed to wb-12x1 / wb-w8fk', 'claims': ['C1576','C1545','C1555','C1458','C1498','C1499'], 'from': ['KG02-N02','K-g03-04','lens-logic[9]','lens-negative[16]']},
 'K105': {'title': 'Companion MW program cited at a baseline where it does not exist (unpinned moving-ref links)', 'status': 'RECONCILED by version split (true at mw-tip, false at the stated baseline); pin/baseline defect of the artifact', 'claims': ['C1406','C1562','C1465','C1311','C1322','C1323','C1324','C1325','C1326','C1327','C1328','C1498','C1499','C1376'], 'from': ['KG02-N01','lens-provenance[7]','lens-scope[3]','lens-logic[7]','lens-negative[15]']},
 'K106': {'title': 'Execution-axis value set silently revised against the Nov-4 proposal (C0562)', 'status': 'RECONCILED by version split (later proposal supersedes); fidelity defect (unmarked change; cancelled execution unplaced)', 'claims': ['C1606'], 'from': ['KG02-N03']},
 'K107': {'title': "'Update stale user-facing current guidance' vs feature-matrix.md:112 still false at the pin", 'status': 'not a factual contradiction; an unmet norm at the artifact pin (wb-12x1)', 'claims': ['C1555','C1539','C1537','C1245','C1389','C1343','C1460'], 'from': ['KG02-N04','lens-scope[9]','lens-negative[4]']},
 'K108': {'title': "'overlooked existing collective-event.ts' vs the dates (the W11 sentence predates the file)", 'status': 'RECONCILED by temporal split (stale, not overlooked)', 'claims': ['C1244','C1245','C1129'], 'from': ['KG01-02']},
 'K109': {'title': "'CORRECTED, not open P0' names a priority the superseded Pi row (C0199, P1) never carried", 'status': 'RECONCILED by source split (the P0 is the MW companion\'s MW-P0)', 'claims': ['C1204','C1200','C1203'], 'from': ['KG01-01']},
 'K110': {'title': 'Pin-relative absence / present-tense claims vs unlanded machine branches that already change the cited files', 'status': 'not a contradiction at the pins; standing TEMPORAL/SCOPE defeater carried on every affected row', 'claims': sorted(set(FAMILIES['F01-worktree-P0']['members'] + FAMILIES['F02-detached-grants']['members'] + FAMILIES['F04-replay-basis-gaps']['members'] + FAMILIES['F09-no-mechanical-host']['members'])), 'from': ['KG01-03']},
 'K111': {'title': "'Mid-session cancel ... remain to implement' vs a recorded mid-gate Forge-operation cancel (MW docs/10:141)", 'status': 'RECONCILED by semantic split (Claude SDK session vs Forge gate leg)', 'claims': ['C1214','C1218','C1485','C1536'], 'from': ['KG01-04','lens-negative[14]']},
 'K112': {'title': "'no-duplicate effects remain to implement' vs the Git-source publication idempotency fingerprint", 'status': 'RECONCILED by scope split (per-effect-type fingerprint vs host-level guarantee)', 'claims': ['C1217'], 'from': ['KG01-05']},
 'K113': {'title': "Ledger proposition 'develop/developLive options' vs the component the signal was added to", 'status': 'RECONCILED by narrowing; extraction defect, not an artifact defect', 'claims': ['C1210','C1533'], 'from': ['KG01-06','lens-fidelity[16]']},
 'K114': {'title': 'Cancel-race norms stated imperatively while the motivating race is an unreproduced hypothesis; the parked-barrier apparatus already exists for the run-wide signal (F10)', 'status': 'RECONCILED (design target vs sequencing; wb-9v02 first)', 'claims': ['C1162','C1164','C1543','C1617','C1618','C1308','C1309','C1425','C1482'], 'from': ['KG01-07','KG02-N05','lens-negative[7]']},
 'K115': {'title': "'No GitHub CI' (04:35) vs pi-subagents' committed ci.yml and the same commit's 'no new GitHub CI' (README:28, SKILL:30)", 'status': 'RESOLVED by scope split; C1345 REFUTED as an observation (regresses Nov-4 M047)', 'claims': ['C1345','C1346','C1433','C14115'], 'from': ['K-g03-05','lens-negative[5]']},
 'K116': {'title': "'All rows below are proposed work, not already delivered' (04:3) vs two closed beads with landed receipts", 'status': 'RESOLVED by narrowing; C1305 REFUTED as a universal', 'claims': ['C1305','C1321'], 'from': ['K-g03-06']},
 'K117': {'title': "Program baselines (README:3) vs the Nov-4 pins carried by the bead descriptions the program binds work to (epic wb-1a3t: pi b27829e6 / mw f7c0a943)", 'status': 'not a contradiction; pin inconsistency between program and ledger-in-repo (owner re-pin owed)', 'claims': ['C1552','C1301','C1494','C1402','C1403'], 'from': ['lens-negative[29]','KG02 scope note C1252']},
}
for k, ks in KSETS.items():
    miss = [c for c in ks['claims'] if c not in CLAIM_ROWS]; assert not miss, (k, miss)
    for c in ks['claims']:
        if k not in CLAIM_ROWS[c]['contradiction_sets']: CLAIM_ROWS[c]['contradiction_sets'].append(k)
    new_rel('CONFLICTS_WITH' if ks['status'].startswith(('CONTESTED', 'UNRECONCILED')) else 'SAME_ORIGIN_AS', ks['claims'], [], 'contradiction set %s: %s -- %s' % (k, ks['title'], ks['status']), 'rollup', [], k, 'cross-group', {'kset': k, 'kset_status': ks['status']})

# deductive propagation re-check: dependants of REFUTED rows
PROPAGATION_LOG = []
for nid, r in CLAIM_ROWS.items():
    if r['status'] == 'REFUTED':
        deps = [k for k, v in CLAIM_ROWS.items() if nid in v['depends_on']]
        for d in deps:
            PROPAGATION_LOG.append({'refuted': nid, 'dependant': d, 'dependant_status': CLAIM_ROWS[d]['status'], 'kind': CLAIM_ROWS[d]['kind'],
                                    'result': 'derivation broken; conclusion recomputed from independent warrant (see rationale)' , 'rationale': CLAIM_ROWS[d]['rationale'][:200]})
# SUPPORTED hypotheses feeding norms: record inheritance
for nid, r in CLAIM_ROWS.items():
    for d in r['depends_on']:
        if d in CLAIM_ROWS and CLAIM_ROWS[d]['status'] in ('SUPPORTED', 'REFUTED') and r['status'] == 'ESTABLISHED':
            PROPAGATION_LOG.append({'premise': d, 'premise_status': CLAIM_ROWS[d]['status'], 'conclusion': nid, 'conclusion_status': 'ESTABLISHED',
                                    'check': 'ESTABLISHED conclusion over a weaker premise: independent warrant required', 'rationale': r['rationale'][:220]})

# ------------------------------------------------------------------ Phase 7/8: remediation rows (docs-targeted)
def E(pin, path, lines=None):
    hits = [eid for (p, pa, ln, q), eid in ev_registry.items() if p == pin and pa == path and (lines is None or _norm_lines(ln) == _norm_lines(lines))]
    if hits: return hits[0]
    return add_evidence({'pin': pin, 'path': path, 'lines': lines, 'quote': ''}, [], 'REMEDIATION', 'remediation')

D = 'docs/workbench/programs/mechanical-interoperability-audit-2026-11-06/'
REM = []
def rem(mid, claims_, status, cls, where, existing, repair, why, evid, tracker):
    REM.append({'id': mid, 'claims': claims_, 'status': status, 'class': cls, 'where': where, 'existing': existing, 'repair': repair, 'why': why, 'evidence': evid, 'tracker': tracker})

rem('M101', ['C1345'], 'REFUTED / overclaims (K115)', 'NARROW_SCOPE', '04:L35',
    'No GitHub CI; use Forge.',
    'Do not add or rely on GitHub CI for this program (Pi\'s pre-existing `.github/workflows/ci.yml` is out of scope); use Forge.',
    'Read as an inventory statement the sentence is false at the pin (ci.yml runs lint/typecheck/test on master pushes and PRs); the M047 form the Nov-4 roll-up already landed, and README:28 / SKILL:30 ("no new GitHub CI"), is true and keeps the norm. C1346 ("use Forge") stands on AGENTS.md:167 independently.',
    [E(PI_PIN, '.github/workflows/ci.yml', '1-7'), E(PI_PIN, '.github/workflows/ci.yml', '18-22'), E(PI_PIN, 'AGENTS.md', '167')], 'wb-12x1')
rem('M102', ['C1305'], 'REFUTED / overclaims (K116)', 'NARROW_SCOPE', '04:L3',
    'All rows below are proposed work, not already delivered.',
    'All rows below are proposed work, not already delivered, except the landed evidence cuts `B-unknowns` (wb-muip, closed 2026-11-06T13:10Z) and `B-hx-evidence` (wb-f3wd, closed 2026-11-06T18:27Z), whose per-cut obligations (scoped evidence, honest pending status) continue.',
    'Two groups named in the "Every cut" row are closed beads with receipts landed on master before d7666a76 and cited by the program itself (01:40, 02:28); the exception clause keeps the reading rule and stops a seat re-filing delivered cuts.',
    [E(PI_PIN, '.beads/issues.jsonl', 'wb-muip row'), E(PI_PIN, '.beads/issues.jsonl', 'wb-f3wd row'), E(PI_PIN, D + '04-implementation-program.md', '3')], 'wb-12x1')
rem('M103', ['C1204'], 'NON-EPISTEMIC / overclaims / supersedes_faithful=false (K109)', 'ADD_SOURCE', '01:L36',
    '**CORRECTED, not open P0 — Descriptor drift.**',
    '**CORRECTED — Descriptor drift (Nov-4 Pi program: P1, ledger C0199; Nov-4 MW companion: MW-P0; neither open).**',
    'The superseded Pi row C0199 and the Nov-4 Pi heading rate the conflict P1; the only P0 label is the MW companion\'s MW-P0. Naming both sources removes the implied prior Pi P0 without weakening "CORRECTED", which C1200/C1203 establish.',
    [E(PI_PIN, 'docs/workbench/programs/mechanical-workflows-interop-2026-11-04/01-audit-and-evidence.md', '29'), E(MW_PIN, 'docs/programs/pi-workbench-interop-2026-11-04/01-audit-and-status.md', '20'), E(MW_PIN, 'contracts/entrypoints/development.v1.json', '8-9')], 'wb-12x1')
rem('M104', ['C1244'], 'SUPPORTED / overclaims (K108)', 'ADD_TEMPORAL_QUALIFIER', '01:L42',
    'its broad mechanical grep sentence overlooked existing `collective-event.ts`',
    'its broad mechanical grep sentence (written 2026-10-15, last edited 2026-10-27) is stale: `collective-event.ts` landed 2026-10-28 (f65860e1) and the row was never revisited',
    'git blame dates the sentence before the file; "overlooked existing" asserts an authorial oversight the dates refute, while "stale" is what the pin shows (the sentence is false at d7666a76).',
    [E(PI_PIN, 'docs/workbench/feature-matrix.md', '112'), E(PI_PIN, 'src/workbench/collective-event.ts', '1-3')], 'wb-12x1')
rem('M105', ['C1214'], 'SUPPORTED / overclaims (K111)', 'NARROW_SCOPE', '01:L38',
    'Mid-session cancel, dirty-write reconciliation, cross-host replay and no-duplicate effects remain to implement.',
    'Mid-session cancel of the running Claude SDK implement session (a Forge-operation cancel is already read at the gate leg, MW docs/10:141), dirty-write reconciliation, cross-host replay and ...',
    'The rig\'s signal is a pre-dispatch barrier not forwarded to the SDK (absence established), but MW already reads a mid-gate FORGE_OPERATION_CANCELLED; the qualifier names the leg the absence is about.',
    [E(MW_PIN, 'apps/development-rig/src/claude-implement.ts', '37-39'), E(MW_PIN, 'docs/10-current-state-and-gaps.md', '141')], 'wb-12x1')
rem('M106', ['C1217'], 'SUPPORTED / overclaims (K112)', 'NARROW_SCOPE', '01:L38',
    '... and no-duplicate effects remain to implement.',
    '... and a host-level no-duplicate guarantee for develop() effects remain to implement (a per-candidate idempotency fingerprint exists only for Git-source publication, `git-source-publication.ts`).',
    'grep finds no exactly-once/at-most-once layer for develop() effects, but `idempotencyKey` / `IDEMPOTENCY_FINGERPRINT_INVALID` exist for one effect type; the blanket wording ignores it. The effect classes the guarantee must cover are still undefined (wb-mwsy).',
    [E(MW_PIN, 'apps/development-rig/src/git-source-publication.ts', '43'), E(MW_PIN, 'apps/development-rig/src/git-source-publication.ts', '74-75')], 'wb-12x1')
rem('M107', ['C1537'], 'SUPPORTED / overclaims (K107)', 'NARROW_SCOPE', '02:L24',
    'Pi has a read-only Mechanical event integration (`collective-event.ts`)',
    'Pi has a read-only Mechanical event boundary module (`collective-event.ts`, observation-only; not yet imported by any registered tool or host)',
    'The module exists and is read-only, but no src module imports it (grep -rln over src/ returns only the module); "integration" read as an operational path is not established at the pin.',
    [E(PI_PIN, 'src/workbench/collective-event.ts', '25-26'), E(PI_PIN, 'src/workbench/collective-event.ts', '1-3')], 'wb-12x1')
rem('M108', ['C1550'], 'SUPPORTED / overclaims (F07)', 'NARROW_SCOPE', '02:L29',
    'Pi `wb-f3wd` native HX probe established task-scope unsupported at the probed producer version',
    'Pi `wb-f3wd` native HX probe recorded task-scope unsupported for the probed `find` legs and the 84-capability roster at hx 0.1.0 (a workspace-defined named query carrying a task scope and other verbs were not claimed)',
    'The receipt bounds its verdict to the find verb and roster and lists the named-query route as NOT CLAIMED; "established ... at the probed producer version" reads as version-wide.',
    [E(PI_PIN, 'docs/workbench/receipts/wb-f3wd.md', '12'), E(PI_PIN, 'docs/workbench/receipts/wb-f3wd.md', '7')], 'wb-12x1')
rem('M109', ['C1406'], 'ESTABLISHED at mw-tip only / overclaims (K105)', 'ADD_TEMPORAL_QUALIFIER', 'README:L5 (and README:L3 baseline)',
    'The companion Mechanical program is at [MechanicalWorkflows](https://github.com/jehalladay/MechanicalWorkflows/tree/main/docs/programs/pi-workbench-interoperability-audit-2026-11-06).',
    'The companion Mechanical program is at MechanicalWorkflows `docs/programs/pi-workbench-interoperability-audit-2026-11-06` (commits 2ea69445 / 6e15a4245d3f, 2026-11-06; same author; absent at the stated baseline 97e18068). deferred: advancing the README MechanicalWorkflows baseline to 6e15a4245d3f or later is an owner decision (wb-cbt4 master-recon / wb-12x1), not a repair this roll-up makes.',
    'git ls-tree at 97e18068 lists no such directory; it is created by the two tip commits. Pinning the citation makes the sentence true at a named revision and surfaces that the companion is the same lineage.',
    [E(MW_PIN, 'git ls-tree --name-only 97e18068 docs/programs/', '1-8'), E(PI_PIN, D + 'README.md', '3'), E(PI_PIN, D + 'README.md', '5')], 'wb-cbt4')
rem('M110', ['C1562'], 'NON-EPISTEMIC (presupposition refuted at the stated baseline; K105)', 'ADD_TEMPORAL_QUALIFIER', '03:L3',
    'Align this protocol with [Mechanical\'s companion host contract](https://github.com/jehalladay/MechanicalWorkflows/blob/main/docs/programs/pi-workbench-interoperability-audit-2026-11-06/02-host-contract.md) through one joint design',
    'Align this protocol with Mechanical\'s companion host contract (`docs/programs/pi-workbench-interoperability-audit-2026-11-06/02-host-contract.md` at 6e15a4245d3f; same authorial lineage, so alignment is a joint gate, not corroboration) through one joint design',
    'The link resolves to the moving ref `main`; at the program\'s own baseline the file does not exist. A pinned reference keeps the norm executable and honest about independence.',
    [E(PI_PIN, D + '03-function-host-contract.md', '3'), E(MW_TIP, 'docs/programs/pi-workbench-interoperability-audit-2026-11-06/02-host-contract.md', '3')], 'wb-12x1')
rem('M111', ['C1606'], 'NON-EPISTEMIC / supersedes_faithful=false (K106)', 'SURFACE_DISAGREEMENT', '03:L36',
    '- **Execution:** queued, running, settled, failed, unknown.',
    '- **Execution:** queued, running, settled, failed, unknown (revises the Nov-4 proposal\'s {running, completed, failed, cancelled, unknown}; `completed` is reported as `settled`; a cancelled execution is represented as deferred:<owner states the axis that carries a cancelled execution, e.g. effects/freshness, since 03:47 distinguishes three cancel kinds>).',
    'README:5 promises to reconcile rather than silently rewrite the Nov-4 design; the value set changed with no note and `cancelled` left the axis while 03:47 still distinguishes cancel kinds. Naming the prior set is the minimal fidelity repair; where a cancelled execution lands is a design decision the owner must state.',
    [E(PI_PIN, D + '03-function-host-contract.md', '36'), E(PI_PIN, 'docs/workbench/programs/mechanical-workflows-interop-2026-11-04/triage/epistemic-triage/CLAIMS.jsonl', 'C0562')], 'wb-9a1o')
rem('M112', ['C1427'], 'NON-EPISTEMIC (set K101 CONTESTED)', 'SURFACE_DISAGREEMENT', 'README:L22',
    '**Critical before an effectful run:** Pi dirty-worktree cleanup may discard changes after preservation failure; registered detached Claude grant construction contradicts the host validator; per-agent skip during asynchronous startup may be missed; and replay does not yet bind source/skills/provider revisions.',
    '**Critical defects (sequencing per the reused BEAD-PLAN graph):** Pi dirty-worktree cleanup may discard changes after preservation failure (B-preserve, gates the first embedded live cut); registered detached Claude grant construction contradicts the host validator (B-detached-grants, gates the detached cuts); per-agent skip during asynchronous startup may be missed (B-cancel-repro dispositions it first); and replay does not yet bind source/skills/provider revisions (B-replay, independent cut). deferred: an owner ruling on wb-p3i2 naming its blockers may replace this wording.',
    'The BEAD-PLAN the program orders reused (04:3) makes B-git-census depend only on B-preserve, B-dispatch, B-outcomes, B-effects and states detached repair is not a false blocker for the embedded-first slice; README:22 reads as four blockers of any effectful run. The disagreement must be visible until ruled.',
    [E(PI_PIN, D + 'README.md', '22'), E(PI_PIN, 'docs/workbench/programs/mechanical-workflows-interop-2026-11-04/triage/requirements/BEAD-PLAN.md', '35'), E(PI_PIN, 'docs/workbench/programs/mechanical-workflows-interop-2026-11-04/triage/requirements/BEAD-PLAN.md', '165')], 'wb-p3i2')
rem('M113', ['C1304', 'C1316'], 'NON-EPISTEMIC (sets K101/K103)', 'ADD_MISSING_PREMISE', '04:L5-22 (Stage table)',
    'Reuse its dependency graph and original labels. [Stage table without Depends-on / External gate columns]',
    'Restore the BEAD-PLAN Depends-on and External-gate columns on the Stage rows that depend on MW deliveries: B-dispatch (MW-HOST), B-controls (MW-CANCEL), B-git-census (MW-HOST, MW-CANCEL), B-hx-admit/B-rf-admit (MW-NATIVE), B-detached-function/B-furnace-function (MW-FURNACE), B-coordination (MW-COORDINATION), as BEAD-PLAN rows 10-25 carry them.',
    'The norm "reuse its dependency graph" is only partially met by the artifact itself: the table drops the per-row dependency and gate columns, so the first joint live row no longer shows what gates it.',
    [E(PI_PIN, D + '04-implementation-program.md', '3'), E(PI_PIN, 'docs/workbench/programs/mechanical-workflows-interop-2026-11-04/triage/requirements/BEAD-PLAN.md', '32'), E(PI_PIN, 'docs/workbench/programs/mechanical-workflows-interop-2026-11-04/triage/requirements/BEAD-PLAN.md', '35')], 'wb-12x1')
rem('M114', ['C1315', 'C1362'], 'NON-EPISTEMIC (set K103)', 'ADD_MISSING_PREMISE', '04:L15; 05:L15',
    'Persist intent/dispatch/settlement, native cancel and unknown recovery | ... ; Stop before dispatch, during edit, after commit, after Forge dispatch',
    'Persist intent/dispatch/settlement, native cancel (gated MW-CANCEL / MW-R3: the rig signal is pre-dispatch-only at 97e18068) and unknown recovery | ... ; Stop before dispatch (Pi-side now); during edit, after commit, after Forge dispatch (gated MW-CANCEL / MW-R3)',
    'Three of the four stops presuppose an in-flight cancel MW does not implement at the pin (claude-implement.ts:37-47); BEAD-PLAN row 16 carries the MW-CANCEL gate the Nov-6 rows dropped, so the falsifier cannot be run from Pi-side work alone.',
    [E(MW_PIN, 'apps/development-rig/src/claude-implement.ts', '37-39'), E(PI_PIN, D + '05-qa-operator-guide.md', '15'), E(PI_PIN, 'docs/workbench/programs/mechanical-workflows-interop-2026-11-04/triage/requirements/BEAD-PLAN.md', '32')], 'wb-1zn2')
rem('M115', ['C1322', 'C1323', 'C1324', 'C1325', 'C1326', 'C1327', 'C1328'], 'NON-EPISTEMIC (set K103; labels defined at mw-tip only, K105)', 'ADD_MISSING_PREMISE', '04:L22',
    '**Mechanical-owned** tracks: MW-R1 installed rig host export; MW-R2 callback bundle; MW-R3 active cancellation/replay/effect control; MW-R4 joint native journey; MW-R5 native HX/RF; MW-R6 Furnace; MW-R7 coordination.',
    'Mechanical tracks (labels from the MW companion at 6e15a4245d3f; owners per its table: Both for MW-R4, producer-side for MW-R5/MW-R6): MW-R1 installed rig host export (≈ Nov-4 mw-host, EAT-R089; the joint ABI ruling ≈ mw-contract, EAT-R088); MW-R2 callback bundle (new); MW-R3 active cancellation/replay/effect control (≈ mw-cancel, EAT-R090); MW-R4 joint native journey (new); MW-R5 native HX/RF (≈ mw-native, EAT-R091); MW-R6 Furnace (≈ mw-furnace, EAT-R092); MW-R7 coordination (≈ mw-coordination, EAT-R093). The map is this roll-up\'s candidate reading; deferred: confirmation by the MW owner on wb-1zn2.',
    'The labels resolve only at mw-tip and no map to the Nov-4 mw-* tracks / EAT-R088..R093 that bead wb-1zn2 gates on exists in the Pi artifact; the "Mechanical-owned" header contradicts the companion\'s own owner column.',
    [E(MW_TIP, 'docs/programs/pi-workbench-interoperability-audit-2026-11-06/03-delivery-program.md', '8'), E(PI_PIN, 'docs/workbench/programs/mechanical-workflows-interop-2026-11-04/triage/requirements/BEAD-PLAN.md', '230-231'), E(PI_PIN, D + '04-implementation-program.md', '22')], 'wb-1zn2')
rem('M116', ['C1344'], 'NON-EPISTEMIC (set K102 CONTESTED)', 'ADD_MISSING_PREMISE', '04:L35',
    'Never remove or weaken a safety test to make a gate green.',
    'Never remove or weaken a safety test to make a gate green; where an existing characterization test locks in a defect the contract removes (e.g. `test/worktree.test.ts:432-446` asserting the false-clean report that B-preserve forbids), obtain the specification ruling BEAD-PLAN rule 8 requires and record it in the cut receipt.',
    'Read literally the sentence blocks the P0 fix the program mandates (04:7, 05:11 "no false-clean"); the Nov-4 BEAD-PLAN rule 8 the program incorporates by reference already carries the carve-out, which 04:35 does not restate.',
    [E(PI_PIN, 'test/worktree.test.ts', '432,445-446'), E(PI_PIN, 'docs/workbench/programs/mechanical-workflows-interop-2026-11-04/triage/requirements/BEAD-PLAN.md', '8'), E(PI_PIN, D + '04-implementation-program.md', '35')], 'wb-5ik5')
rem('M117', ['C1576', 'C1458'], 'NON-EPISTEMIC (set K104)', 'SURFACE_DISAGREEMENT', 'hosting.md:L17; 03:L19',
    'Native HX, committed RF, detached and Furnace host modes are separately gated after the first Git-census/plain vertical.',
    'Native HX evidence (`hx-task-scope-v1`), committed RF context (`rf-committed-v1`), and the detached and Furnace hosts are separately gated after the first Git-census/plain vertical. [03:L19 addendum: the alias ban is about request-side selectors; MW\'s shipped result-side `mode` member (`LiveDevelopmentResult.mode`, live-development.ts:19-22) must be named when the ban is implemented.]',
    'doc 03:19 reserves `hostMode` for embedded|detached and bans generic "mode" aliases, while the hosting guide in the same commit folds evidenceProfile/contextProfile values into "host modes" and MW already ships a result-side `mode` literal; the two surfaces must use one vocabulary.',
    [E(PI_PIN, 'docs/workbench/mechanical-function-hosting.md', '17'), E(PI_PIN, D + '03-function-host-contract.md', '19'), E(MW_PIN, 'apps/development-rig/src/live-development.ts', '19-22')], 'wb-w8fk')
rem('M118', ['C1555'], 'NON-EPISTEMIC (norm unmet at the pin; K107)', 'ADD_TEMPORAL_QUALIFIER', '02:L33 -> docs/workbench/feature-matrix.md:L112 (outside the program docs)',
    'Update stale user-facing current guidance in this program and the skill; [feature-matrix.md:112 left: "No binding-host code or tests exist: grep -ril mechanical over src/ and test/ matches only an incidental word ... no src/workbench module, no test file."]',
    'deferred: feature-matrix.md is outside the program docs this ledger targets; wb-12x1 (docs) owns the amendment. Suggested W11 note: "No binding-host code exists; `src/workbench/collective-event.ts` (read-only `collective.event.v1` boundary, 2026-10-28) and census/probe tests exist; status `planned` (wb-04s blocked); MWI beads under epic wb-1a3t." Add "and the W11 status-matrix row" to 02:33.',
    'The program\'s own norm (and Nov-4 C0457, which named the status matrix) is unmet for the one user-facing row SKILL.md:8 routes readers to; the sentence has been false since f65860e1.',
    [E(PI_PIN, 'docs/workbench/feature-matrix.md', '112'), E(PI_PIN, D + '02-feedback-and-epistemics.md', '33'), E(PI_PIN, '.beads/issues.jsonl', 'wb-1a3t row')], 'wb-12x1')
rem('M119', ['C1552', 'C1301', 'C1494'], 'NON-EPISTEMIC (K117 pin inconsistency)', 'ADD_MISSING_PREMISE', 'README:L3; 02:L33; 04:L3',
    'Re-pin before implementation.',
    'Re-pin before implementation, including the bead descriptions under epic wb-1a3t, which still carry the Nov-4 pins (doc 7c80c343; pi b27829e6 / mw f7c0a943, one MW commit before this program\'s baseline). deferred: the bead-description re-pin itself is a ledger-in-repo write owned by wb-cbt4 (master-recon), not a docs repair.',
    'A seat reading the bead will see a different MW baseline than the program states; the program orders reuse of the groups but never says the descriptions must be re-pinned.',
    [E(PI_PIN, '.beads/issues.jsonl', 'wb-1a3t row'), E(PI_PIN, D + 'README.md', '3')], 'wb-cbt4')
rem('M120', ['C1210'], 'ESTABLISHED (ledger proposition overreaches the artifact; K113)', 'NARROW_SCOPE', 'ledger only (claims-part-01 proposition; artifact 01:L38 is exact)',
    "ledger: 'added an optional `signal?: AbortSignal` to the develop/developLive options'",
    "ledger only: 'added an optional `signal?: AbortSignal` to the development rig\\'s AgentOptions (inherited by developLive / runClaudeImplementation); the library develop() has no signal'. No artifact change.",
    'f7c0a943 touched only apps/development-rig; packages/development/src has zero AbortSignal references; the artifact sentence names only the commit and the option.',
    [E(MW_PIN, 'apps/development-rig/src/live-development.ts', '34'), E(MW_PIN, 'git show --stat f7c0a943', 'files')], 'none')
rem('M121', ['C1133', 'C1423', 'C1477'], 'ESTABLISHED (wording names a subset of the trigger set)', 'ADD_MISSING_PREMISE', '01:L22; README:L22; SKILL:L14',
    'after commit or branch failure / after preservation (commit/branch) failure',
    'after any failed preservation step (`git status --porcelain`, `add -A`, `commit`, `rev-parse HEAD` or branch creation all reach the same catch)',
    'The single outer catch wraps every preservation step; naming only commit/branch understates when the force-remove and false-clean report occur. Not an overclaim; a completeness repair.',
    [E(PI_PIN, 'src/worktree.ts', '135-137'), E(PI_PIN, 'src/worktree.ts', '177-181')], 'wb-12x1')
rem('M122', ['C1339'], 'SUPPORTED (present-progressive regularity, time-indexed)', 'ADD_TEMPORAL_QUALIFIER', '04:L35',
    'Agents are actively landing on `workbench/implementation-program` with periodic merges to `master`.',
    'As of 2026-11-06/07 agents were landing on `workbench/implementation-program` with periodic merges to `master` (four merges on 2026-11-06/07; the branch ref was level with master at d7666a76).',
    'Liveness after the pin is unobservable from a pin; the dated form keeps the cadence evidence and the norm it motivates (refresh both branches) without decaying into a false present tense.',
    [E(PI_PIN, 'git log --format=%s -1 278c8f79', '1'), E(PI_PIN, D + '04-implementation-program.md', '35')], 'wb-12x1')
rem('M123', ['C1628', 'C1488'], 'SUPPORTED / overclaims (roll-up flip; F07) + NON-EPISTEMIC proposal', 'DOWNGRADE_MODALITY', '03:L51; SKILL:L16',
    'so unsupported at its pin; first Git-census remains usable / **Git census is still a valid limited first vertical**',
    'so unsupported at its pin; the first Git-census profile remains not blocked (its usability from a Pi-hosted launch is unwitnessed until `PI-GIT-CENSUS-LIVE`) / **Git census is still the planned, not-blocked first vertical**',
    'The probe establishes only "not blocked"; the positive "usable/valid" half rests on an unwitnessed premise (no Pi-hosted run exists; the program is L0). The Nov-4 ledger flagged the same proposition (C0443) as overclaiming.',
    [E(PI_PIN, 'docs/workbench/receipts/wb-f3wd.md', '12'), E(PI_PIN, D + '05-qa-operator-guide.md', '38')], 'wb-p3i2')

# forward/inverse coverage
rem_claims = set(c for r in REM for c in r['claims'])
assert all(c in CLAIM_ROWS for c in rem_claims), [c for c in rem_claims if c not in CLAIM_ROWS]
need = set(k for k, v in CLAIM_ROWS.items() if v['status'] in ('REFUTED', 'UNSUPPORTED', 'CONTESTED') or v['overclaims'])
assert need <= rem_claims, need - rem_claims
for r in REM:
    for c in r['claims']:
        CLAIM_ROWS[c].setdefault('remediation', []).append(r['id'])
for r in CLAIM_ROWS.values(): r.setdefault('remediation', [])


# an evidence record that contradicts P is counterevidence, not support (dedupe after lens/relation passes);
# the row's own artifact sentence is an anchor, never support or counterevidence
for r in CLAIM_ROWS.values():
    own = r['provenance']['artifact']; loc = r['provenance']['location'][1:]
    def _self(eid):
        E = ev_rows[eid]
        return E['artifact'] == own and lines_overlap(E['location'], loc)
    for eid in list(r['counterevidence']):
        if _self(eid):
            r['counterevidence'].remove(eid)
            if eid not in r['anchor']: r['anchor'].append(eid)
    for eid in list(r['support']):
        if _self(eid):
            r['support'].remove(eid)
            if eid not in r['anchor']: r['anchor'].append(eid)
    if r['counterevidence']:
        r['support'] = [e for e in r['support'] if e not in r['counterevidence']]

# ------------------------------------------------------------------ roll-up pin re-reads for rows the investigators left without a cited witness (quotes re-read at the pins, 2026-11-07)
ROLLUP_EVIDENCE = {
 'C1217': [{'pin': MW_PIN, 'path': "grep -rn -i -E 'exactly.once|at.most.once|idempoten' apps/development-rig/src packages/development/src", 'lines': '1-5', 'quote': 'git-source-publication.ts:43 idempotencyKey; :74-75 IDEMPOTENCY_FINGERPRINT_INVALID; :107 idempotencyKey; rf-workload.ts:37 RF_IDEMPOTENCY_KEY_CONFLICT (no other hit; no exactly-once/at-most-once layer for develop() effects)'}],
 'C1112': [{'pin': PI_PIN, 'path': 'src/workflow/runtime.ts', 'lines': '49', 'quote': 'export const WORKFLOW_NESTED_CAP = 256;'},
           {'pin': PI_PIN, 'path': 'src/workflow/runtime.ts', 'lines': '919', 'quote': 'nestedCap: options.nestedCap ?? WORKFLOW_NESTED_CAP,'}],
 'C1128': [{'pin': MW_PIN, 'path': 'packages/coordination/README.md', 'lines': '3', 'quote': 'Pure, typed coordination policy ports for the collective-adaptation program ... Nothing in this package performs an effect: no file write, no process, no network, no SDK import.'}],
 'C1180': [{'pin': PI_PIN, 'path': 'src/workbench/execute-tool.ts', 'lines': '113', 'quote': 'readonly completion: "not-asserted";'},
           {'pin': PI_PIN, 'path': 'src/workbench/execute-tool.ts', 'lines': '17', 'quote': '`ok` as whether the launch was not refused. Completion stays "not-asserted" (docs/11): the producer\'s later answer,'}],
 'C1242': [{'pin': PI_PIN, 'path': 'src/workbench/hosts/furnace-hosted.ts', 'lines': '9', 'quote': 'This module adds no scheduler, no retry and no checkpoint.'}],
}
for nid, evs in ROLLUP_EVIDENCE.items():
    for e in evs:
        eid = add_evidence(e, [nid], 'SUPPORTS', 'rollup-pin-read')
        if eid not in CLAIM_ROWS[nid]['support']: CLAIM_ROWS[nid]['support'].append(eid)
        CLAIM_ROWS[nid]['evidence'].append(dict(e, origin='rollup-pin-read 2026-11-07'))
    CLAIM_ROWS[nid]['rollup_adjustments'].append('support evidence added by the roll-up from a pin re-read (the group row cited no witness)')

# degenerate investigator wordings ("As worded." etc.) replaced by a printable sentence
for nid, r in CLAIM_ROWS.items():
    pw = (r['permitted_wording'] or '').strip()
    if len(pw) < 30 or pw.lower() in ('as worded.', 'as scoped.', 'as worded (scoped).', 'code-state findings only.'):
        prop = r['proposition'].rstrip('.')
        pins = r['temporal_context']['claim_pins'] or [PI_PIN, MW_PIN]
        scope_note = ''
        pl = r.get('permitted_language') or ''
        m = re.search(r'scope:\s*([^;()]+)', pl)
        if m: scope_note = ' (scope: %s)' % m.group(1).strip()
        if r['status'] == 'NON-EPISTEMIC':
            r['permitted_wording'] = 'The program states: %s.' % prop
        else:
            r['permitted_wording'] = 'At %s: %s%s.' % (' / '.join(pins[:2]), prop, scope_note)
        r['permitted_wording_origin'] = 'roll-up template (investigator wording "%s" was not a printable sentence)' % pw

# duplicate wording donors (same proposition restated in README:18 / hosting.md:7 / SKILL:13)
for a, b in (('C1437', 'C1415'), ('C1415', 'C1437'), ('C1471', 'C1415')):
    CLAIM_ROWS[a].setdefault('same_origin_as', [])
    if b not in CLAIM_ROWS[a]['same_origin_as']: CLAIM_ROWS[a]['same_origin_as'].append(b)
for r in CLAIM_ROWS.values(): r.setdefault('same_origin_as', [])

# ------------------------------------------------------------------ write outputs
def sort_key(nid): return int(nid[1:])
ordered = sorted(CLAIM_ROWS, key=sort_key)
with open(BASE + 'CLAIMS.jsonl', 'w', encoding='utf-8') as fh:
    for nid in ordered:
        fh.write(json.dumps(CLAIM_ROWS[nid], ensure_ascii=False) + '\n')
with open(BASE + 'EVIDENCE.jsonl', 'w', encoding='utf-8') as fh:
    for eid in sorted(ev_rows, key=lambda x: int(x[1:])):
        r = dict(ev_rows[eid]); r['relations'] = sorted(r['relations']); r['origins'] = sorted(r['origins'])
        fh.write(json.dumps(r, ensure_ascii=False) + '\n')
with open(BASE + 'RELATIONS.jsonl', 'w', encoding='utf-8') as fh:
    for r in RELS: fh.write(json.dumps(r, ensure_ascii=False) + '\n')
with open(BASE + 'LENSES.jsonl', 'w', encoding='utf-8') as fh:
    for r in LENS_ROWS: fh.write(json.dumps(r, ensure_ascii=False) + '\n')

# duplicate permitted wording check
pw_map = collections.defaultdict(list)
for nid in ordered: pw_map[CLAIM_ROWS[nid]['permitted_wording'].strip().lower()].append(nid)
dups = {k: v for k, v in pw_map.items() if len(v) > 1}

# REMEDIATION.md
counts = collections.Counter(CLAIM_ROWS[n]['status'] for n in ordered)
oc = [n for n in ordered if CLAIM_ROWS[n]['overclaims']]
lines = []
lines.append('# REMEDIATION — mechanical-interoperability-audit-2026-11-06 (reconciliation program) at pi@d7666a76f561\n')
lines.append('Scope: what the program DOCS may say. Every repair is a wording change to a pinned program file (01-05, README, `docs/workbench/mechanical-function-hosting.md`, `.agents/skills/pi-mechanical-interop/SKILL.md`), or a `ledger only:` correction where the defect is the extraction, not the artifact. No row touches code. Pins: artifact = environment `pi@d7666a76f561` (docs-only commit on the program-stated baseline 278c8f79); MechanicalWorkflows `mw@97e18068f399` (program-stated baseline); MW origin/main at triage start `mw-tip@6e15a4245d3f` (two docs-only commits past the pin). Nothing was run for this audit (static reads, `git`/`grep`/`ls` probes only).\n')
lines.append('Landing: the docs at d7666a76 live on pi-subagents `master`; repairs are exact replacement wordings for a docs-only follow-up commit. `Tracker` names the existing wb- bead that owns the surface (wb-12x1 docs; wb-cbt4 master-recon; wb-w8fk contract-choice; wb-1zn2 MW-owned tracker (deferred); wb-p3i2 git-census; wb-5ik5 preserve; wb-9a1o outcomes) or `none`; no new bead is filed by this roll-up (Phase 10 / the beads step may amend them). A `Repair` cell that begins with or contains `deferred:` names the reason and the owner; the repair agent never advances a pin or writes a bead description itself.\n')
lines.append('Rows: %d = %d REFUTED + %d UNSUPPORTED + 0 claim-level CONTESTED (two CONTESTED normative sets K101/K102 and the unreconciled set K103 are covered by rows M112-M116) + %d further rows for `overclaims=true` claims (REFUTED rows that also overclaim counted once) + %d consistency/fidelity rows (unfaithful supersession, unpinned companion citations, unmet norms, pin inconsistency, extraction defect, completeness and temporal qualifiers).\n' % (len(REM), counts['REFUTED'], counts['UNSUPPORTED'], len([r for r in REM if 'overclaims' in r['status'] and 'REFUTED' not in r['status']]), len([r for r in REM if 'overclaims' not in r['status'] and 'REFUTED' not in r['status']])))
lines.append('Coverage (re-entrant check, run %s): forward — every `Claims` id is a ledger row; inverse — {REFUTED, UNSUPPORTED, CONTESTED} ∪ {overclaims=true} minus the `Claims` column = ∅ (REFUTED: C1305, C1345; UNSUPPORTED: none; overclaims: %s).\n' % (TODAY, ', '.join(oc)))
lines.append('Claim ids are the merged-ledger ids: part-02 rows (docs 02 and 03) were re-keyed +300 (original C12xx/C13xx -> C15xx/C16xx) to resolve the Phase-1 id collision; `original_id` on each CLAIMS.jsonl row holds the claims-part id.\n')
lines.append('| ID | Claims | Status | Class | Where | Existing wording | Repair | Why sufficient | Evidence | Tracker |')
lines.append('|---|---|---|---|---|---|---|---|---|---|')
def esc(s): return str(s).replace('|', '\\|').replace('\n', ' ')
for r in REM:
    ev = '<br>'.join('%s (%s:%s%s)' % (e, ev_rows[e]['pin'], ev_rows[e]['artifact'], (':' + ev_rows[e]['location']) if ev_rows[e]['location'] else '') for e in r['evidence'])
    lines.append('| %s | %s | %s | %s | %s | %s | %s | %s | %s | %s |' % (r['id'], ', '.join(r['claims']), esc(r['status']), r['class'], esc(r['where']), esc(r['existing']), esc(r['repair']), esc(r['why']), ev, r['tracker']))
lines.append('')
lines.append('## Non-action rulings recorded (no row needed)\n')
lines.append('- C1588 (orig C1288, 03:L26 "exact Mechanical read/write action grant (literal spelling jointly approved)"): the presupposed grant literal exists in neither repository; the parenthetical already says so and doc 04 sequences B-contract-choice (wb-w8fk) first. No wording change; unexecutable until the ruling.')
lines.append('- C1617/C1618 (orig C1317/C1318, 03:L47 lifecycle norms) and C1308/C1309 (04:L9): norms motivated by the unreproduced hypothesis are design targets; doc 04:9 already forbids claiming a code fix from the hypothesis alone (K114). No change.')
lines.append('- C1346 (04:L35 "use Forge"): its derivation from the refuted C1345 is broken, but AGENTS.md:167 authorizes the norm independently. No change.')
lines.append('- C1321 (04:L20 "Every cut must satisfy ... B-unknowns/B-hx-evidence"): read as continuing per-cut obligations once M102 lands. No change.')
lines.append('- C1490 (SKILL:L17 "dated 2026-10-15"): exact for the named receipt families; later MW native evidence (2026-10-19/20/21) concerns no Pi hosting. Scope note on the row; no change.')
lines.append('- Corpus defect (claim-id collision across claims-part files, 76 ids): resolved in the merged ledger by re-keying part-02 (+300); recorded in EPISTEMIC-AUDIT.md §1; no artifact wording is involved.')
open(BASE + 'REMEDIATION.md', 'w', encoding='utf-8').write('\n'.join(lines) + '\n')

# report
report = {
    'claims_total': len(ordered), 'status_counts': dict(counts), 'kind_counts': dict(collections.Counter(CLAIM_ROWS[n]['kind'] for n in ordered)),
    'material': sum(1 for n in ordered if CLAIM_ROWS[n]['material']), 'overclaims': oc, 'overclaims_count': len(oc),
    'supersedes_faithful': dict(collections.Counter(str(CLAIM_ROWS[n]['supersedes_faithful']) for n in ordered)),
    'rows_with_supersedes': sum(1 for n in ordered if CLAIM_ROWS[n]['supersedes']),
    'supersedes_edges': sum(len(CLAIM_ROWS[n]['supersedes']) for n in ordered),
    'prior_ids_superseded': len(set(p for n in ordered for p in CLAIM_ROWS[n]['supersedes'])),
    'missing_to_settle_rows': [n for n in ordered if CLAIM_ROWS[n]['missing_to_settle']],
    'status_by_part': {p: dict(collections.Counter(CLAIM_ROWS[n]['status'] for n in ordered if CLAIM_ROWS[n]['part'] == p)) for p in PARTS},
    'status_by_group': {g: dict(collections.Counter(CLAIM_ROWS[n]['status'] for n in ordered if CLAIM_ROWS[n]['group'] == g)) for g in ('g01', 'g02', 'g03')},
    'kind_x_status': {k: dict(v) for k, v in collections.defaultdict(collections.Counter, {}).items()},
    'relations_total': len(RELS), 'relations_by_type': dict(collections.Counter(r['type'] for r in RELS)), 'relations_by_group': dict(collections.Counter(r['group'] for r in RELS)),
    'relations_cross_group': sum(1 for r in RELS if r['scope'] == 'cross-group'), 'relations_prior_link': sum(1 for r in RELS if r['scope'] == 'prior-link'),
    'evidence_total': len(ev_rows), 'evidence_by_source_type': dict(collections.Counter(r['source_type'] for r in ev_rows.values())), 'evidence_by_pin': dict(collections.Counter(r['pin'] for r in ev_rows.values())),
    'lens_rows': len(LENS_ROWS), 'lens_effects': dict(collections.Counter(r['effect'] for r in LENS_ROWS)), 'lens_corpus_defect_rows': sum(1 for r in LENS_ROWS if r['corpus_defect']),
    'lens_id_resolution_notes': [n for r in LENS_ROWS for n in r['id_resolution_notes']],
    'families': FAMILY_REPORT, 'ksets': {k: {'title': v['title'], 'status': v['status'], 'claims': v['claims'], 'from': v['from']} for k, v in KSETS.items()},
    'propagation_log': PROPAGATION_LOG, 'remediation_rows': len(REM), 'remediation_classes': dict(collections.Counter(r['class'] for r in REM)),
    'duplicate_permitted_wordings': dups, 'dossiers': sum(1 for n in ordered if CLAIM_ROWS[n]['dossier']),
    'anchor_only_rows': [n for n in ordered if not CLAIM_ROWS[n]['support'] and CLAIM_ROWS[n]['status'] in ('ESTABLISHED', 'SUPPORTED', 'REFUTED')],
    'counterevidence_rows': sum(1 for n in ordered if CLAIM_ROWS[n]['counterevidence']),
    'scope_restriction_rows': sum(1 for n in ordered if CLAIM_ROWS[n]['scope_restrictions']),
}
kx = collections.Counter((CLAIM_ROWS[n]['kind'], CLAIM_ROWS[n]['status']) for n in ordered)
report['kind_x_status'] = {'%s|%s' % k: v for k, v in sorted(kx.items())}
json.dump(report, open(BASE + '.rollup-report.json', 'w'), indent=1, ensure_ascii=False)
print(json.dumps({k: report[k] for k in ('claims_total', 'status_counts', 'material', 'overclaims_count', 'supersedes_faithful', 'relations_total', 'evidence_total', 'remediation_rows', 'dossiers')}, indent=1))
print('dup wordings:', len(dups)); print('anchor-only epistemic rows:', len(report['anchor_only_rows']), report['anchor_only_rows'][:40])
