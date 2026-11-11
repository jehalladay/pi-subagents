#!/usr/bin/env python3 -I
"""Phase 9 gate for the MII epistemic-triage tree. Fail-closed: any hit, unreadable record or absent deliverable exits non-zero.
Checks (references/artifact-schemas-and-templates.md): (a) anchored, (b) sentence, (c) self-reference, (d) file-not-directory,
(e) duplicate wording, (f) declared roots, (g) deliverables, (h) one evidence shape; plus REMEDIATION inverse coverage.
"""
import json, os, re, sys, collections

OUT = '/workplace/jehallad/AgentEcosystem/ForgeWorkspaces/Pi/PiSubagents/scratch/mii-triage-1110/epistemic-triage/'
MANIFEST_ROOTS = None
failures = collections.Counter()
notes = []


def fail(cls, msg):
    failures[cls] += 1
    notes.append(f'[{cls}] {msg}')


def load(path):
    try:
        return [json.loads(l) for l in open(path, encoding='utf-8') if l.strip()]
    except Exception as e:  # unreadable record is a failure
        fail('unreadable', f'{path}: {e}')
        return []


claims = load(OUT + 'CLAIMS.jsonl')
evidence = load(OUT + 'EVIDENCE.jsonl')
EV = {e['id']: e for e in evidence}
manifest = open(OUT + 'MANIFEST.md', encoding='utf-8').read() if os.path.exists(OUT + 'MANIFEST.md') else ''
roots_in_manifest = set(re.findall(r'(/workplace/[^\s`)]+/mii-triage-1110/)', manifest))

REQUIRED = {'id', 'proposition', 'kind', 'status', 'provenance', 'root'}
for r in claims:
    miss = REQUIRED - set(r)
    if miss:
        fail('schema', f"{r.get('id')}: missing {sorted(miss)}")


def resolve(root, art):
    path = re.sub(r':\d+(-\d+)?$', '', art)
    return os.path.join(root, path)


# (f) declared roots + (d) file-not-directory for evidence
for e in evidence:
    root = e.get('root')
    if not root:
        fail('no-root', e['id'])
        continue
    if root not in roots_in_manifest:
        fail('root-not-in-manifest', f"{e['id']} root {root}")
    p = resolve(root, e['artifact'])
    if os.path.isdir(p):
        fail('directory', f"{e['id']} {e['artifact']}")
    elif not os.path.isfile(p):
        fail('unresolved', f"{e['id']} {e['artifact']}")

# per-claim checks
wordings = collections.defaultdict(list)
for r in claims:
    cid = r['id']
    if r['root'] not in roots_in_manifest:
        fail('root-not-in-manifest', f'{cid} root {r["root"]}')
    prov = r['provenance']
    ppath = os.path.join(r['root'], prov['artifact'])
    # (a) anchored: REFUTED/ESTABLISHED rows name an existing path
    if r['status'] in ('REFUTED', 'ESTABLISHED') and not os.path.isfile(ppath):
        fail('anchored', f'{cid} provenance {prov["artifact"]}')
    # (b) sentence
    pw = (r.get('permitted_wording') or '').strip()
    if len(pw.split()) < 4 or not re.search(r'[.!?)]$|\w$', pw):
        fail('sentence', f'{cid} permitted_wording not a sentence: {pw[:60]!r}')
    wordings[pw].append(cid)
    # (h) one shape
    for fld in ('support', 'counterevidence'):
        v = r.get(fld)
        if not isinstance(v, list):
            fail('shape', f'{cid}.{fld} not a list')
            continue
        for x in v:
            if not isinstance(x, str) or x not in EV:
                fail('shape', f'{cid}.{fld} entry {x!r} is not an EVIDENCE.jsonl id')
    # (c) self-reference
    if r['status'] in ('REFUTED', 'ESTABLISHED', 'SUPPORTED'):
        for x in r.get('support', []) + r.get('counterevidence', []):
            e = EV.get(x)
            if e and e['artifact'].split(':')[0] == prov['artifact'] and str(e.get('location')) == str(prov['location']):
                fail('self-reference', f'{cid} cites {x} at its own provenance')
        if not (r.get('support') or r.get('counterevidence')):
            fail('no-evidence', f'{cid} {r["status"]} without any cited evidence')
# (e) duplicate wording
for pw, ids in wordings.items():
    if len(ids) > 1:
        props = {next(c['proposition'] for c in claims if c['id'] == i) for i in ids}
        if len(props) > 1:
            fail('duplicate-wording', f'{ids}')
# (g) deliverables
deliverables = ['MANIFEST.md', 'CLAIMS.jsonl', 'RELATIONS.jsonl', 'SOURCE-MAP.md', 'CONTRADICTIONS.md', 'REMEDIATION.md', 'EPISTEMIC-AUDIT.md', 'EVIDENCE.jsonl']
for d in deliverables:
    if not os.path.isfile(OUT + d):
        fail('absent-deliverable', d)
if not (os.path.isdir(OUT + 'dossiers') and any(f.endswith('.md') for f in os.listdir(OUT + 'dossiers'))):
    fail('absent-deliverable', 'dossiers/')
arb_dates = set()
for r in claims:
    for h in r.get('verdict_history', []):
        m = re.match(r'arbitration-(\d{8}):', h)
        if m:
            d = m.group(1)
            arb_dates.add(f'{d[:4]}-{d[4:6]}-{d[6:]}')
for d in arb_dates:
    if not os.path.isfile(OUT + f'ARBITRATION-{d}.md'):
        fail('absent-deliverable', f'ARBITRATION-{d}.md (trigger present)')
    if not os.path.isfile(OUT + 'CLAIMS.patch.jsonl'):
        fail('absent-deliverable', 'CLAIMS.patch.jsonl (arbitration present)')
for f in os.listdir(OUT):
    m = re.match(r'ARBITRATION-(\d{4}-\d{2}-\d{2})\.md$', f)
    if m and m.group(1) not in arb_dates:
        fail('absent-deliverable', f'{f} present without a verdict_history trigger')
# verdict_history grammar for arbitration entries
for r in claims:
    for h in r.get('verdict_history', []):
        if h.startswith(('regrade-', 'arbitration-', 'correction-')) and not re.match(r'^(regrade|arbitration|correction)-\d{8}:(ESTABLISHED|SUPPORTED|PLAUSIBLE|UNSUPPORTED|CONTESTED|REFUTED|UNDETERMINED|NON-EPISTEMIC|CONFIRMED)(@[0-9a-f]{7,40})?$', h):
            fail('history-grammar', f'{r["id"]}: {h}')
# REMEDIATION inverse coverage
rem = open(OUT + 'REMEDIATION.md', encoding='utf-8').read() if os.path.isfile(OUT + 'REMEDIATION.md') else ''
rem_claims = set(re.findall(r'^\| M\d{3} \| (C\d{3}) \|', rem, re.M))
need = {r['id'] for r in claims if r['status'] in ('REFUTED', 'UNSUPPORTED', 'CONTESTED')}
for c in sorted(need - rem_claims):
    fail('remediation-coverage', c)
all_ids = {r['id'] for r in claims}
for c in sorted(rem_claims - all_ids):
    fail('remediation-forward', f'{c} not a ledger row')

census = {
    'claims': len(claims), 'evidence': len(evidence),
    'anchored_failures': failures['anchored'], 'self_referential': failures['self-reference'], 'string_shaped': failures['shape'],
    'duplicate_wording': failures['duplicate-wording'], 'absent_deliverables': failures['absent-deliverable'],
    'directory_paths': failures['directory'], 'unresolved_paths': failures['unresolved'], 'root_failures': failures['no-root'] + failures['root-not-in-manifest'],
    'sentence_failures': failures['sentence'], 'no_evidence': failures['no-evidence'], 'history_grammar': failures['history-grammar'],
    'remediation_coverage': failures['remediation-coverage'] + failures['remediation-forward'], 'schema': failures['schema'] + failures['unreadable'],
    'arbitration_dates': sorted(arb_dates),
}
total = sum(failures.values())
print(json.dumps(census, indent=1))
for n in notes[:60]:
    print(n)
print('GATE', 'PASS' if total == 0 else f'FAIL ({total})')
sys.exit(0 if total == 0 else 1)
