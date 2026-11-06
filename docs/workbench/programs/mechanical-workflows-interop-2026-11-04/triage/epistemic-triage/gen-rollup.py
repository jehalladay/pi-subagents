#!/usr/bin/env python3 -I
"""Phase 6-8 roll-up generator: merges claim/status/relation parts into CLAIMS.jsonl, EVIDENCE.jsonl,
RELATIONS.jsonl, LENSES.jsonl and CLAIMS.patch.jsonl; applies the cross-group propagation; emits a
propagation report (.propagation-report.json) consumed when the markdown deliverables are written.

Read-only everywhere except this directory. Nothing is run against the pins here.
"""
import json, re, collections, os, sys

BASE = '/workplace/jehallad/AgentEcosystem/ForgeWorkspaces/Pi/PiSubagents/OrchestrationEngineer/scratch/mw-interop-triage/out/epistemic-triage/'
TODAY = '20261106'
DOC_PIN = 'doc@7c80c34346c2'
PI_PIN = 'pi@b27829e6dfa7'
MW_PIN = 'mw@f7c0a9431d6c'
ROOTS = {
    'doc@7c80c34346c2': 'pi-subagents commit 7c80c34346c2e46b0f0201c3bf916274159c7cf7 (byte-identical in the pin worktree pins/pi-b27829e6)',
    'pi@b27829e6dfa7': 'pins/pi-b27829e6 = pi-subagents b27829e6dfa7d2c39e493095d963117d2d078d61',
    'mw@f7c0a9431d6c': 'pins/mw-main = MechanicalWorkflows f7c0a9431d6cc36a15b409b1788c945ef86ad5e2',
    'mw@0c78e253': 'MechanicalWorkflows 0c78e2530cbf5737a8bbb763475385a2f0f760cc read via git show inside pins/mw-main',
}

def load(f):
    return [json.loads(l) for l in open(BASE + f, encoding='utf-8') if l.strip()]

GROUPS = [
    ('g01', 'claims-part-01.jsonl', 'status-part-g01.jsonl', 'relations-part-g01.jsonl'),
    ('g02', 'claims-part-02.jsonl', 'status-part-g02.jsonl', 'relations-part-g02.jsonl'),
    ('g03', 'claims-part-03.jsonl', 'status-part-g03.jsonl', 'relations-part-g03.jsonl'),
]

# ---------------------------------------------------------------- id remap (part-02 -> C05xx)
def remap_id(group, cid):
    if group == 'g02' and re.fullmatch(r'C02\d\d', cid):
        return 'C05' + cid[3:]
    return cid

def remap_text_ids(group, s):
    if group != 'g02' or not isinstance(s, str):
        return s
    return re.sub(r'\bC02(\d\d)\b', r'C05\1', s)

def norm_pin(pin, path=None):
    if pin is None:
        return None
    if pin.startswith('mw@0c78e253') or (path and re.match(r'^0c78e253[0-9a-f]*:', path)):
        return 'mw@0c78e253'
    return pin

# ---------------------------------------------------------------- load everything
claims, statuses, relations = {}, {}, []
group_of = {}
dossier_of = {}
for g, cf, sf, rf in GROUPS:
    for c in load(cf):
        oid = c['id']; nid = remap_id(g, oid)
        c = dict(c); c['_group'] = g; c['_original_id'] = oid; c['_claim_file'] = cf
        c['depends_on'] = [remap_id(g, d) for d in (c.get('depends_on') or [])]
        claims[nid] = c; group_of[nid] = g
        if g == 'g01':
            dossier_of[nid] = f'dossiers/{oid}.md'
        elif g == 'g02':
            dossier_of[nid] = f'dossiers/{oid}.g02.md'
        else:
            dossier_of[nid] = f'dossiers/{oid}.json'
    for s in load(sf):
        oid = s['id']; nid = remap_id(g, oid)
        s = dict(s); s['_group'] = g
        s['depends_on'] = [remap_id(g, d) for d in (s.get('depends_on') or [])]
        for k in ('propagation', 'rationale', 'permitted_strength', 'note'):
            if k in s: s[k] = remap_text_ids(g, s[k])
        statuses[nid] = s
    for r in load(rf):
        r = dict(r); r['_group'] = g
        r['from'] = remap_id(g, r['from']) if r['from'].startswith('C0') else r['from']
        r['to'] = remap_id(g, r['to']) if str(r['to']).startswith('C0') else r['to']
        r['joint'] = [remap_id(g, j) for j in (r.get('joint') or [])]
        relations.append(r)

assert set(claims) == set(statuses), (set(claims) ^ set(statuses))
assert len(claims) == 490, len(claims)

# dossier existence check
missing_dossiers = [cid for cid, p in dossier_of.items() if not os.path.exists(BASE + p)]

# ---------------------------------------------------------------- evidence registry
ev_index = {}   # key -> E id
evidence = {}   # E id -> record
def ev_key(e):
    return (norm_pin(e.get('pin'), e.get('path')), e.get('path'), str(e.get('lines')), e.get('quote'))

PROBE_RE = re.compile(r'^(git |ls |grep |find |python|npm |cat |diff |wc |sha256)|^git diff|^git log|^git show|:-$')
def source_type(pin, path):
    p = path or ''
    if PROBE_RE.search(p) or ' ' in p.split('/')[0] and not p.endswith(('.ts', '.md', '.json', '.yml')):
        return 'PROBE_OUTPUT'
    if pin == DOC_PIN:
        return 'AUDITED_PROGRAM_DOC'
    if pin == 'mw@0c78e253':
        return 'PRIMARY_SOURCE_AT_BASELINE'
    if '/programs/pi-workbench-interop' in p or p.startswith('.agents/skills/'):
        return 'COUNTERPART_PROGRAM_DOC'
    if p.startswith('new-feedback/'):
        return 'FEEDBACK_REPORT'
    if p.startswith('qa/'):
        return 'HISTORICAL_RECEIPT'
    if re.search(r'(^|/)test/|\.test\.ts$|\.census\.ts$', p):
        return 'TEST_SOURCE'
    if p.endswith('.md'):
        return 'REPO_DOC'
    if p.endswith(('.ts', '.js', '.json', '.yml', '.yaml', '.toml')):
        return 'PRIMARY_CODE'
    return 'OTHER'

def register_evidence(e):
    k = ev_key(e)
    if k in ev_index:
        return ev_index[k]
    eid = f'E{len(evidence)+1:04d}'
    pin = norm_pin(e.get('pin'), e.get('path'))
    rec = {
        'id': eid,
        'pin': pin,
        'pin_verbatim': e.get('pin'),
        'root': ROOTS.get(pin, 'UNDECLARED'),
        'artifact': e.get('path'),
        'location': ('L' + str(e.get('lines'))) if e.get('lines') not in (None, '', '-') else None,
        'quote': e.get('quote'),
        'source_type': source_type(pin, e.get('path')),
        'claims': [],          # [{claim, relation, via}]
    }
    ev_index[k] = eid; evidence[eid] = rec
    return eid

def pointer_to_eid(ptr):
    """'pin:path:lines' pointer (relation endpoint) -> E id if an exact (pin,path,lines) record exists."""
    if not isinstance(ptr, str) or ptr.startswith('C0'):
        return None
    m = re.match(r'^([a-z]+@[0-9a-f]+(?: \([^)]*\))?):(.*):([^:]*)$', ptr)
    if not m:
        return None
    pin, path, lines = norm_pin(m.group(1)), m.group(2), m.group(3)
    for k, eid in ev_index.items():
        if k[0] == pin and k[1] == path and k[2] == lines:
            return eid
    return None

# register all evidence from status rows and relations
for cid, s in statuses.items():
    for e in (s.get('evidence') or []):
        register_evidence(e)
for r in relations:
    for e in (r.get('evidence') or []):
        register_evidence(e)

def own_anchor(cid, e):
    c = claims[cid]
    return norm_pin(e.get('pin')) == DOC_PIN and e.get('path') == c['source'].get('path')

def doc_label(cid, eid, lab):
    """The audited artifact never supports its own claims: same-file doc@ evidence is the verbatim anchor, other program files are lineage."""
    rec = evidence[eid]
    if rec['pin'] == DOC_PIN:
        if rec['artifact'] == claims[cid]['source'].get('path'):
            return 'anchor'
        return 'lineage'
    return lab

# ---------------------------------------------------------------- relation normalisation
REL_SUPPORT = {'SUPPORTS', 'ENTAILS'}
REL_COUNTER = {'CONTRADICTS'}
rel_rows = []
claim_ev_label = collections.defaultdict(dict)   # cid -> {eid: label}
for i, r in enumerate(relations):
    rid = f'R{i+1:05d}'
    eids = [register_evidence(e) for e in (r.get('evidence') or [])]
    frm, to = r['from'], r['to']
    f_is_claim, t_is_claim = frm.startswith('C0'), str(to).startswith('C0')
    f_e, t_e = (None if f_is_claim else pointer_to_eid(frm)), (None if t_is_claim else pointer_to_eid(to))
    rtype = r['relation']
    normalized = rtype
    # labels for claim <-> evidence edges
    if not f_is_claim and t_is_claim:
        lab = 'support' if rtype in REL_SUPPORT else 'counter' if rtype in REL_COUNTER else 'lineage' if rtype in ('SAME_ORIGIN_AS', 'QUOTED_FROM', 'GENERALIZES') else 'other'
        for eid in (eids or ([f_e] if f_e else [])):
            if eid: claim_ev_label[to].setdefault(eid, doc_label(to, eid, lab))
    elif f_is_claim and not t_is_claim:
        # g03 CONFLICTS_WITH claim->evidence: doc@ targets are restatements (lineage), non-doc targets are counter/narrowing
        if rtype == 'CONFLICTS_WITH':
            if str(to).startswith(DOC_PIN):
                normalized = 'RESTATED_IN'; lab = 'lineage'
            else:
                normalized = 'NARROWED_BY'; lab = 'counter'
        elif rtype in ('QUOTED_FROM', 'SAME_ORIGIN_AS'):
            lab = 'lineage'
        else:
            lab = 'other'
        for eid in (eids or ([t_e] if t_e else [])):
            if eid: claim_ev_label[frm].setdefault(eid, doc_label(frm, eid, lab))
    rel_rows.append({
        'id': rid,
        'type': rtype,
        'normalized_type': normalized,
        'tails': [frm],
        'heads': [to],
        'from': frm, 'to': to,
        'from_evidence_id': f_e, 'to_evidence_id': t_e,
        'evidence': eids,
        'joint': r.get('joint') or [],
        'group': r['_group'],
        'notes': remap_text_ids(r['_group'], r.get('note')) if r.get('note') else None,
        'scope': 'intra-group',
    })

# ---------------------------------------------------------------- cross-group edges (Phase 6, hand-authored)
# (tail, head, type, family, note). tail depends on / restates head.
X = [
 # Family A - descriptor schema-ref mismatch (MW baseline defect, repaired at the pin by 1f29daa7)
 ('C0305','C0194','SAME_ORIGIN_AS','A','03:7 "reconcile descriptor canonicalization and host ABI" restates the 01:31 derivation; both REFUTED at mw@f7c0a943'),
 ('C0336','C0194','SAME_ORIGIN_AS','A','03:18 "Fix ... comparison" restates 01:31; REFUTED at the pin'),
 ('C0437','C0195','SAME_ORIGIN_AS','A','SKILL:14 "disagree" restates 01:29 heading; REFUTED at the pin'),
 ('C0338','C0193','SAME_ORIGIN_AS','A','03:18 "test exactly checked-in descriptor" presupposes 01:31 hand-built tests; REFUTED at the pin'),
 ('C0530','C0189','SAME_ORIGIN_AS','A','02:48 "ships relative schema paths" restates 01:31 input/output ../schemas refs; REFUTED at the pin'),
 ('C0529','C0191','SAME_ORIGIN_AS','A','02:48 "checks the descriptor schema names in invokePinnedDevelopment" restates 01:31 host side; ESTABLISHED, unchanged baseline->pin'),
 ('C0534','C0193','DEPENDS_ON','A','02:48 misattributes to Pi the hand-authored tests 01:31 locates in MW; premise REFUTED and misassigned'),
 ('C0302','C0194','DEPENDS_ON','A','PI-0 deliverable presupposes a current mismatch (C0194 REFUTED at pin); NON-EPISTEMIC, stale premise owes a temporal qualifier'),
 ('C0337','C0193','DEPENDS_ON','A','norm premise "tests use a constructed approximation" is REFUTED at the pin; the norm is already satisfied for the descriptor'),
 ('C0438','C0193','DEPENDS_ON','A','SKILL:14 norm premise REFUTED at the pin'),
 ('C03142','C0193','DEPENDS_ON','A','04:39 norm; premise REFUTED at the pin, norm stands as a rule'),
 ('C0277','C0194','SAME_ORIGIN_AS','A','01:65 meta-claim presupposes a current discrepancy; the check now yields MATCH'),
 # Family B - worktree P0
 ('C0346','C0170','SAME_ORIGIN_AS','B','03:21 drops the 01:21 modal: "may discard ... on preservation errors" -> "loss of modified worktrees"; SUPPORTED with scope narrowed, cannot exceed C0170'),
 ('C0349','C0165','SAME_ORIGIN_AS','B','existence of cleanupWorktree; ESTABLISHED both'),
 ('C0347','C0170','DEPENDS_ON','B','norm premise; consistent'),
 ('C0452','C0170','DEPENDS_ON','B','SKILL:24 "Failure to preserve a dirty worktree is P0" restates 01:21 priority; NON-EPISTEMIC'),
 ('C0366','C0168','DEPENDS_ON','B','QA negative "no false-clean" presupposes the hasChanges:false report (ESTABLISHED)'),
 ('C03146','C0168','DEPENDS_ON','B','04:42 norm presupposes the false-clean report (ESTABLISHED)'),
 # Family C - function kind refusal / no function dispatch
 ('C0310','C0179','SAME_ORIGIN_AS','C','03:8 restates 01:27 refusal; ESTABLISHED both'),
 ('C0339','C0162','SAME_ORIGIN_AS','C','03:19 restates 01:17 refusal; ESTABLISHED both'),
 ('C0430','C0162','SAME_ORIGIN_AS','C','SKILL:12 restates 01:17; ESTABLISHED both'),
 ('C0431','C0178','SAME_ORIGIN_AS','C','SKILL:12 "modelled" restates 01:27 execute.ts model; ESTABLISHED both'),
 ('C0432','C0179','SAME_ORIGIN_AS','C','SKILL:12 "refused" restates 01:27; ESTABLISHED both'),
 ('C0340','C0161','SAME_ORIGIN_AS','C','03:19 "no installed-host loader" is the narrower (invocation) reading of 01:17; ESTABLISHED vs SUPPORTED-with-scope on the wider table cell'),
 ('C0436','C0161','SAME_ORIGIN_AS','C','SKILL:13 "no registered Mechanical binding" is the narrower wording of 01:17 "no Mechanical SDK/host adapter"; grade difference is wording-driven (registered binding vs any Mechanical code), both permitted wordings carry the collective-event.ts qualifier'),
 ('C0435','C0160','SAME_ORIGIN_AS','C','SKILL:13 restates 01:17 "None registered"; ESTABLISHED both'),
 ('C03132','C0160','SAME_ORIGIN_AS','C','04:14 "(proposed)" hosts/mechanical-functions.ts; ESTABLISHED both'),
 # Family D - detached Claude empty-grants admission (P1)
 ('C0343','C0204','SAME_ORIGIN_AS','D','03:20 restates the 01:35 derivation; ESTABLISHED both (static, not run)'),
 ('C0439','C0201','SAME_ORIGIN_AS','D','SKILL:15 grants:[] restates 01:35; ESTABLISHED both'),
 ('C0440','C0202','SAME_ORIGIN_AS','D','SKILL:15 claude:invoke restates 01:35; ESTABLISHED both'),
 ('C0441','C0205','SAME_ORIGIN_AS','D','SKILL:15 inference restates 01:33; ESTABLISHED both'),
 ('C0345','C0202','SAME_ORIGIN_AS','D','03:20 validator exists; ESTABLISHED both'),
 ('C0586','C0205','SAME_ORIGIN_AS','D','02:73 "existing Claude empty-grants refusal" restates 01:33-35; label narrowed (mechanism = missing claude:invoke), ESTABLISHED both'),
 ('C0587','C0204','DEPENDS_ON','D','02:73 fix proposal depends on the 01:35 defect; NON-EPISTEMIC'),
 ('C0344','C0204','DEPENDS_ON','D','03:20 norm depends on the defect; NON-EPISTEMIC'),
 ('C0442','C0202','DEPENDS_ON','D','SKILL:15 norm; NON-EPISTEMIC'),
 # Family E - cancellation race at beforeDispatch (P1 hypothesis)
 ('C0350','C0210','SAME_ORIGIN_AS','E','03:22 "registers no abort token before beforeDispatch" restates 01:39; ESTABLISHED both'),
 ('C0351','C0210','SAME_ORIGIN_AS','E','03:22 async seam restates 01:39; ESTABLISHED both'),
 ('C0353','C0213','SAME_ORIGIN_AS','E','03:22 reading widens 01:39 (skip/retry) to "cancel/skip/retry" and to "unauthorized late SDK start"; PLAUSIBLE <= SUPPORTED, consistent; "cancel" is contradicted by the post-await signal re-check (C0214) and test F10'),
 ('C0352','C0213','DEPENDS_ON','E','03:22 test norm; NON-EPISTEMIC'),
 ('C0323','C0353','DEPENDS_ON','E','PI-4 closure "any unauthorized late SDK start" inherits C0353 over-broad scope (lens-logic); NON-EPISTEMIC'),
 ('C0372','C0213','DEPENDS_ON','E','03:36 QA negative; NON-EPISTEMIC; the named negative is absent from the pin test tree (lens-negative)'),
 ('C0453','C0214','DEPENDS_ON','E','SKILL:25 "Honor cancellation before beforeDispatch": run-level cancel already honoured before and after the await (C0214 ESTABLISHED); open only for per-agent skip/retry'),
 # Family G - git-census vocabulary (proposal -> observation drift)
 ('C0320','C0522','DEPENDS_ON','G','03:10 "explicit git-census profile" treats the 02:40 PROPOSED profile selector as shipped; a proposal cannot warrant an observation; REFUTED by the grep detector'),
 ('C0320','C0555','DEPENDS_ON','G','02:58 proposed git-census profile; same drift'),
 ('C0356','C0554','SAME_ORIGIN_AS','G','03:23 "current git-census mode" names the 02:58 existing journey (ESTABLISHED) with the proposed label; SUPPORTED with scope (developLive only)'),
 ('C0443','C0554','SAME_ORIGIN_AS','G','SKILL:16 "live Git-census mode is real": mechanism ESTABLISHED (C0554), label proposed, "operates" not run -> SUPPORTED'),
 ('C0444','C0242','SAME_ORIGIN_AS','G','SKILL:16 "not certified task-scoped HX" restates the 01:51 HX gap derivation; ESTABLISHED both'),
 ('C0355','C0245','DEPENDS_ON','G','03:23 norm restates 01:51 "ship an honestly named Git-census path"; NON-EPISTEMIC'),
 ('C03113','C0245','DEPENDS_ON','G','03:60 norm; NON-EPISTEMIC'),
 ('C0316','C0522','DEPENDS_ON','G','PI-3 deliverable names the proposed profile as if selectable; NON-EPISTEMIC, owes the missing premise'),
 # Family H - W11 feature-matrix row
 ('C0407','C0163','SAME_ORIGIN_AS','H','README:7 W11 row exists (ESTABLISHED); 01:17 source report of the row SUPPORTED because the row embedded detection sentence is stale'),
 ('C03124','C0163','SAME_ORIGIN_AS','H','04:8 W11 row exists; ESTABLISHED'),
 ('C0406','C0182','SAME_ORIGIN_AS','H','README:7 continues W11/VC-3; ESTABLISHED vs SUPPORTED on the planned-status report'),
 ('C0408','C0163','DEPENDS_ON','H','norm; NON-EPISTEMIC'),
 # Family I - RF preview vs committed render
 ('C0445','C0247','SAME_ORIGIN_AS','I','SKILL:16 restates 01:55 --no-commit; ESTABLISHED both'),
 ('C0419','C0253','DEPENDS_ON','I','README:22 definition; NON-EPISTEMIC'),
 ('C0559','C0253','DEPENDS_ON','I','02:58 definition; NON-EPISTEMIC'),
 ('C0370','C0253','DEPENDS_ON','I','03:34 QA negative; NON-EPISTEMIC'),
 # Family J - HX scope gap
 ('C03114','C0242','DEPENDS_ON','J','03:60 hypothesis inherits the 01:51 derivation (ESTABLISHED); PLAUSIBLE because the installed HX product is not pinned'),
 ('C0326','C0244','DEPENDS_ON','J','PI-5 proposal; NON-EPISTEMIC'),
 # Family K - node() 30 s deadline
 ('C0460','C0230','SAME_ORIGIN_AS','K','SKILL:32 restates 01:47; ESTABLISHED both (CAPABILITY_DEADLINE_MS)'),
 ('C0341','C0231','DEPENDS_ON','K','03:19 norm inherits the incomplete 01:47 argument (duration unmeasured, deadline configurable); NON-EPISTEMIC'),
 ('C03143','C0231','DEPENDS_ON','K','04:40 norm; NON-EPISTEMIC'),
 ('C0459','C0231','DEPENDS_ON','K','SKILL:32 norm; NON-EPISTEMIC'),
 # Family L - replay identity
 ('C0455','C0224','DEPENDS_ON','L','SKILL:25 norm; premise SUPPORTED'),
 ('C03147','C0224','DEPENDS_ON','L','04:43 norm; premise SUPPORTED'),
 ('C0324','C0224','DEPENDS_ON','L','PI-4 closure "no blind effect replay"; NON-EPISTEMIC'),
 ('C0550','C0224','DEPENDS_ON','L','02:56 definition of exact source identity answers the 01:43 omission; NON-EPISTEMIC'),
 # Family M - audit method / baseline self-reports
 ('C0409','C0271','SAME_ORIGIN_AS','M','README:7 "no new test ... ran" restates 01:63; SUPPORTED both (self-report; missing artifact = audit session log)'),
 ('C0402','C0101','SAME_ORIGIN_AS','M','README:4 baseline sha restates the 01:3 method baseline; SUPPORTED both; timezone qualifier owed'),
 ('C0403','C0101','SAME_ORIGIN_AS','M','README:4 MW baseline; SUPPORTED both'),
 ('C0427','C0101','DEPENDS_ON','M','SKILL:8 definition; NON-EPISTEMIC'),
 # Family N - feedback reports (one seat lineage)
 ('C0399','C0263','DEPENDS_ON','N','03:50 topic "shared census edit conflicts" = 01:59 (ESTABLISHED, bodies of the 11-01/11-03 files read)'),
 ('C0399','C0264','DEPENDS_ON','N','03:50 topic "tester timeout modes" = 01:59 "test deadline inflation": located by filename only (October files), bodies not read, "tester" appears in 0 of 44 bodies -> SUPPORTED cap'),
 ('C0399','C0266','DEPENDS_ON','N','03:50 topic "long preps" = 01:59 "prep bottlenecks" (ESTABLISHED)'),
 ('C03126','C0103','SAME_ORIGIN_AS','N','04:9 new-feedback/ exists; SUPPORTED both'),
 # Family O - no Pi->Mechanical run witnessed
 ('C0321','C0160','DEPENDS_ON','O','03:10 "first actual" presupposes no prior run anywhere; the repo-scoped premise (ESTABLISHED) cannot discharge the historical quantifier -> UNDETERMINED'),
 ('C0446','C0164','SAME_ORIGIN_AS','O','SKILL:16 "not witnessed" is the evidential form of 01:17 "Not implemented"; SUPPORTED (repo-scoped detector)'),
 # Family P - script workflows
 ('C03106','C0127','DEPENDS_ON','P','03:55 "working script workflows" inherits 01:11 "Script use implemented" (ESTABLISHED) + tests/receipts (C0113 ESTABLISHED, C0114 SUPPORTED); "currently work" not run -> SUPPORTED'),
 ('C03106','C0114','DEPENDS_ON','P','receipts half of the warrant is SUPPORTED only'),
 # Family Q - four outcome variants
 ('C03111','C0238','SAME_ORIGIN_AS','Q','03:59 restates 01:47 four variants; ESTABLISHED both'),
 ('C0369','C0238','DEPENDS_ON','Q','03:33 verified_candidate is one of the four; ESTABLISHED'),
 ('C0562','C0238','DEPENDS_ON','Q','02:62 observation terminal lists the four names; NON-EPISTEMIC, names match contracts.ts'),
 # Family R - installed host / descriptor artifact
 ('C0434','C0141','SAME_ORIGIN_AS','R','SKILL:13 "pinned installed tarball host" restates 01:14; ESTABLISHED both'),
 ('C0521','C0146','DEPENDS_ON','R','02:32 "installed verified descriptor" leans on the packed-tarball tests (ESTABLISHED) but the descriptor self-describes as descriptor-only -> SUPPORTED with overclaim'),
 # Family S - historical rig receipts
 ('C0381','C0152','SAME_ORIGIN_AS','S','03:42 "a previous standalone Mechanical rig receipt" exists (ESTABLISHED by ls) vs 01:15 "Recorded live producer receipts" as a current-state grade (SUPPORTED; receipts dated 2026-10-15)'),
 ('C0380','C0152','DEPENDS_ON','S','03:42 definition; NON-EPISTEMIC'),
 # Family U - shared existence facts
 ('C0433','C0137','SAME_ORIGIN_AS','U','SKILL:13 develop(services,request); ESTABLISHED both'),
 ('C0511','C0137','SAME_ORIGIN_AS','U','02:18 develop(services, request); ESTABLISHED both'),
 ('C0334','C0154','SAME_ORIGIN_AS','U','03:14 coordination package; ESTABLISHED both'),
 ('C0592','C0154','SAME_ORIGIN_AS','U','02:75 @mechanical/workflows-coordination pure evaluation; SUPPORTED (purity is the package self-description) vs ESTABLISHED export inventory'),
 ('C0516','C0153','SAME_ORIGIN_AS','U','02:24 MW takes no Pi dependency = 01:15 "not a Pi binding"; ESTABLISHED both'),
 ('C0428','C0107','SAME_ORIGIN_AS','U','SKILL:12 real Claude SDK host; ESTABLISHED both'),
 ('C0429','C0122','SAME_ORIGIN_AS','U','SKILL:12 four tools; ESTABLISHED both (list non-exhaustive: 9 workflow_* tools at the pin)'),
 ('C0588','C0134','SAME_ORIGIN_AS','U','02:74 FurnaceHostedExecutor one callback per Run restates 01:12 hosts/furnace-hosted.ts; ESTABLISHED both'),
 ('C0463','C0134','DEPENDS_ON','U','SKILL:34 Furnace ExecutorApp/Run/Attempt: Furnace product not pinned -> SUPPORTED'),
 ('C0554','C0147','SAME_ORIGIN_AS','U','02:58 existing journey restates 01:15 live rig path; ESTABLISHED both'),
 ('C0567','C0228','DEPENDS_ON','U','02:64 "effectful even if discover begins as a read" inherits 01:47 single-writer side effect (ESTABLISHED); SUPPORTED inference'),
 ('C0547','C0139','SAME_ORIGIN_AS','U','02:56 four DevelopmentServices callbacks and 01:13 develop outcome shape are read from the same contracts.ts; ESTABLISHED both'),
]
for t, h, *_ in X:
    assert t in claims, t; assert h in claims, h

RANK = {'ESTABLISHED': 4, 'SUPPORTED': 3, 'PLAUSIBLE': 2, 'UNDETERMINED': 1, 'UNSUPPORTED': 1, 'REFUTED': 0, 'CONTESTED': 1, 'NON-EPISTEMIC': None}

# ---------------------------------------------------------------- Phase 6 regrades (cross-group caps)
PATCHES = [
    {
        'id': 'C0399',
        'status_before': 'ESTABLISHED',
        'status': 'SUPPORTED',
        'verdict_history_entry': f'correction-{TODAY}:SUPPORTED@b27829e6dfa7',
        'evidence': [],   # filled below with the E ids of the filename detector rows
        'note': ('Cross-group cap (Phase 6): 03:50 conjoins three feedback topics that 01:59 reports separately. '
                 'The "tester timeout modes" topic is the same lineage as C0264 (SUPPORTED: October-dated files located by filename, bodies not read, '
                 '"tester" appears in 0 of 44 new-feedback bodies and "deadline" in 0 of the 6 November bodies), so the conjunction cannot exceed its weakest member. '
                 'Topics "long preps" (C0266) and "census edit conflicts" (C0263) stay ESTABLISHED. No downstream row depends on C0399.'),
        'permitted_wording': ('Evidence indicates that Pi new-feedback/ files (one flywheel-seat lineage, dated 2026-10-20 through 2026-11-03) report long preps, Vitest timeout '
                              'reds and shared census edit conflicts; the timeout topic is located by filename in October files whose bodies were not read, and "tester timeout modes" is the program\'s paraphrase.'),
        'overclaims': False,
    },
]
for p in PATCHES:
    s = statuses[p['id']]
    assert s['status'] == p['status_before'], (p['id'], s['status'])

# ---------------------------------------------------------------- cross-group relation rows + propagation check
prop_report = {'edges': [], 'violations': [], 'asymmetries': [], 'regrades': PATCHES}
for i, (t, h, typ, fam, note) in enumerate(X):
    rid = f'X{i+1:03d}'
    st_t = statuses[t]['status']; st_h = statuses[h]['status']
    for p in PATCHES:
        if p['id'] == t: st_t = p['status']
        if p['id'] == h: st_h = p['status']
    rt, rh = RANK[st_t], RANK[st_h]
    verdict = 'n/a (tail NON-EPISTEMIC: requirement force, no warrant to cap)' if rt is None else \
              'n/a (head NON-EPISTEMIC proposal: cannot warrant an observation; tail graded on its own detector)' if rh is None else \
              ('CONSISTENT' if rt <= rh else 'TAIL EXCEEDS HEAD')
    if rt is not None and rh is not None and rt > rh:
        if typ == 'SAME_ORIGIN_AS':
            prop_report['asymmetries'].append({'relation': rid, 'tail': t, 'tail_status': st_t, 'head': h, 'head_status': st_h, 'note': note})
            verdict = 'ASYMMETRY (same origin, different wording; see note)'
        else:
            prop_report['violations'].append({'relation': rid, 'tail': t, 'tail_status': st_t, 'head': h, 'head_status': st_h, 'note': note})
    rel_rows.append({
        'id': rid, 'type': typ, 'normalized_type': typ, 'tails': [t], 'heads': [h], 'from': t, 'to': h,
        'from_evidence_id': None, 'to_evidence_id': None, 'evidence': [], 'joint': [],
        'group': 'cross', 'scope': 'cross-group', 'family': fam, 'notes': note,
        'propagation': {'tail_status': st_t, 'head_status': st_h, 'verdict': verdict},
    })
    prop_report['edges'].append({'relation': rid, 'family': fam, 'tail': t, 'head': h, 'type': typ, 'tail_status': st_t, 'head_status': st_h, 'verdict': verdict})

# same-origin sibling groups inside g03 (templated permitted wording on restatements of one 01 finding)
SIBLINGS = [
    (['C0305', 'C0336', 'C0437'], 'A', 'three g03 restatements of the 01:29-31 descriptor/loader mismatch (one lineage; same permitted wording)'),
    (['C0339', 'C0432'], 'C', '03:19 and SKILL:12 restate the 01:17/01:27 non-script refusal (one lineage)'),
    (['C0340', 'C0435'], 'C', '03:19 and SKILL:13 restate 01:17 "None registered" (one lineage)'),
    (['C0343', 'C0441'], 'D', '03:20 and SKILL:15 restate the 01:35 detached-grant derivation (one lineage)'),
    (['C0345', 'C0440'], 'D', '03:20 and SKILL:15 restate the 01:35 validator requirement (one lineage)'),
]
for n, (ids, fam, note) in enumerate(SIBLINGS):
    for a in ids:
        for b in ids:
            if a < b:
                rid = f'XS{len([r for r in rel_rows if r["id"].startswith("XS")])+1:03d}'
                rel_rows.append({'id': rid, 'type': 'SAME_ORIGIN_AS', 'normalized_type': 'SAME_ORIGIN_AS', 'tails': [a], 'heads': [b], 'from': a, 'to': b,
                                 'from_evidence_id': None, 'to_evidence_id': None, 'evidence': [], 'joint': [], 'group': 'g03', 'scope': 'intra-group (roll-up added)',
                                 'family': fam, 'notes': note, 'propagation': {'tail_status': statuses[a]['status'], 'head_status': statuses[b]['status'], 'verdict': 'same lineage'}})
same_origin = collections.defaultdict(set)
for r in rel_rows:
    if r['type'] == 'SAME_ORIGIN_AS' and r['from'].startswith('C0') and str(r['to']).startswith('C0'):
        same_origin[r['from']].add(r['to']); same_origin[r['to']].add(r['from'])

# intra-group dependency check (DEPENDS_ON / DERIVED_FROM / ASSUMES edges and depends_on lists)
intra = []
for cid, c in claims.items():
    st = statuses[cid]['status']
    for p in PATCHES:
        if p['id'] == cid: st = p['status']
    if RANK[st] is None: continue
    for d in c['depends_on']:
        sd = statuses[d]['status']
        for p in PATCHES:
            if p['id'] == d: sd = p['status']
        if RANK[sd] is None: continue
        if RANK[st] > RANK[sd]:
            intra.append({'claim': cid, 'status': st, 'premise': d, 'premise_status': sd, 'propagation_note': statuses[cid].get('propagation')})
prop_report['intra_group_tail_exceeds_premise'] = intra

# ---------------------------------------------------------------- lens attachment
LENS_FILES = ['fidelity', 'scope', 'logic', 'provenance', 'negative']
lens_rows = []
def resolve_lens_ids(o):
    ids = o.get('claim_ids') or []
    partinfo = ' '.join(str(o.get(k) or '') for k in ('claim_file', 'claim_files', 'claim_parts', 'part'))
    finding = o.get('finding') or ''
    explicit = {}
    # per-id markers like 'C0201#part01' / 'C0230#part02'
    clean = []
    for x in ids:
        m = re.match(r'^(C0\d{3,4})#part0?(\d)$', x)
        if m:
            explicit[m.group(1)] = 'g0' + m.group(2); clean.append(m.group(1))
        else:
            clean.append(x)
    # enumerations like 'part-02 C0230' / 'part-01 C0189/C0190'
    for m in re.finditer(r'part-0?(\d)\s+((?:C0\d{3,4}[/ ,]*)+)', partinfo):
        for cid in re.findall(r'C0\d{3,4}', m.group(2)):
            explicit.setdefault(cid, 'g0' + m.group(1))
    for m in re.finditer(r'\(part-0(\d) (C0\d{3,4}) is a different claim\)', partinfo):
        explicit[m.group(2)] = 'g01' if m.group(1) == '2' else 'g02'
    rest_default = None
    m = re.search(r'here ((?:C0\d{3,4}[/ ,]*)+) denote the part-02 claims', partinfo)
    if m:
        for cid in re.findall(r'C0\d{3,4}', m.group(1)):
            explicit[cid] = 'g02'
        rest_default = 'g01'
    # hand overrides for rows whose part the lens author did not mark (resolved from the finding text by the roll-up)
    for cid, g in LENS_OVERRIDES.get(o.get('_lid'), {}).items():
        explicit[cid] = g
    STOP = set('the a an of to in and or is are at for on by with as that this its it not no be from into than then so which when while only also but if'.split())
    def toks(t):
        return set(w for w in re.findall(r'[a-z0-9_:.-]+', (t or '').lower()) if w not in STOP and len(w) > 2)
    ftoks = toks(finding) | toks(o.get('detection_model')) | toks(o.get('drift'))
    def pick_by_overlap(cid):
        c1, c2 = claims.get(cid), claims.get('C05' + cid[3:])
        if c1 is None or c2 is None:
            return 'g01' if c1 is not None else 'g02'
        s1 = len(ftoks & toks(c1['proposition'] + ' ' + c1.get('strongest_wording', '')))
        s2 = len(ftoks & toks(c2['proposition'] + ' ' + c2.get('strongest_wording', '')))
        if s1 >= s2 + 2: return 'g01'
        if s2 >= s1 + 2: return 'g02'
        if s1 > s2: return 'g01?'
        if s2 > s1: return 'g02?'
        return None
    collision_meta = 'collision' in finding.lower() or 'assigned twice' in finding.lower()
    only02 = ('part-02' in partinfo or 'claims-part-02' in partinfo) and not any(k in partinfo for k in ('part-01', 'claims-part-01'))
    only01 = ('part-01' in partinfo or 'claims-part-01' in partinfo) and not any(k in partinfo for k in ('part-02', 'claims-part-02'))
    f02 = '(part-02)' in finding
    f01 = '(part-01)' in finding
    out, amb, soft = [], [], []
    for cid in clean:
        if re.fullmatch(r'C02\d\d', cid):
            if collision_meta:
                out.append(cid); out.append('C05' + cid[3:]); continue
            g = explicit.get(cid)
            if cid not in claims and ('C05' + cid[3:]) in claims:
                g = 'g02'          # C0280-C0299 exist only in part-02: no collision
            if g is None and rest_default:
                g = rest_default
            if g is None:
                if only02 or f02: g = 'g02'
                elif only01 or f01: g = 'g01'
                else:
                    g = pick_by_overlap(cid)
                    if g and g.endswith('?'):
                        soft.append((cid, g[:-1])); g = g[:-1]
            if g == 'g02':
                out.append('C05' + cid[3:])
            elif g == 'g01':
                out.append(cid)
            else:
                amb.append(cid); out.append(cid + '?ambiguous')
        else:
            out.append(cid)
    return out, amb, soft

LENS_OVERRIDES = {
    'L-fidelity-028': {'C0252': 'g01', 'C0253': 'g01'},
    'L-scope-010': {'C0205': 'g01'},
    'L-scope-025': {'C0254': 'g02'},
    'L-provenance-002': {'C0204': 'g01', 'C0205': 'g01', 'C0213': 'g01', 'C0224': 'g01'},
    'L-provenance-003': {'C0252': 'g01', 'C0253': 'g01', 'C0238': 'g01', 'C0242': 'g01', 'C0229': 'g01'},
    'L-provenance-009': {'C0247': 'g01', 'C0248': 'g01', 'C0249': 'g01', 'C0250': 'g01', 'C0251': 'g01'},
    'L-provenance-010': {c: 'g01' for c in ('C0209', 'C0214', 'C0222', 'C0223', 'C0243', 'C0247', 'C0256', 'C0257', 'C0258', 'C0259')},
    'L-provenance-015': {c: 'g01' for c in ('C0218', 'C0219', 'C0220', 'C0221', 'C0224')},
    'L-provenance-018': {'C0256': 'g01'},
    'L-provenance-020': {'C0243': 'g01', 'C0240': 'g01'},
    'L-provenance-021': {'C0211': 'g02', 'C0247': 'g02', 'C0238': 'g01'},
    'L-provenance-025': {'C0263': 'g01'},
    'L-negative-014': {'C0205': 'g01'},
    'L-negative-025': {'C0229': 'g02'},
    'L-negative-031': {'C0231': 'g01', 'C0232': 'g01', 'C0229': 'g01'},
}
claim_lens = collections.defaultdict(list)
for lens in LENS_FILES:
    for i, o in enumerate(load(f'lens-{lens}.jsonl')):
        lid = f'L-{lens}-{i:03d}'
        o['_lid'] = lid
        rids, amb, soft = resolve_lens_ids(o)
        eids = [register_evidence(e) for e in (o.get('evidence') or [])]
        row = {'id': lid, 'lens': lens, 'claim_ids': rids, 'ambiguous_ids': amb, 'soft_resolved_ids': soft, 'effect': o.get('effect'), 'finding': o.get('finding'),
               'detection_model': o.get('detection_model'), 'drift': o.get('drift'), 'evidence': eids,
               'source_row': {'file': f'lens-{lens}.jsonl', 'index': i}}
        lens_rows.append(row)
        for cid in rids:
            if cid in claims:
                claim_lens[cid].append({'lens': lens, 'effect': o.get('effect'), 'ref': lid})
                for eid in eids:
                    lab = 'support' if o.get('effect') in ('SUPPORTS',) else 'counter' if o.get('effect') in ('CONTRADICTS', 'NARROWS', 'DRIFT') else 'other'
                    claim_ev_label[cid].setdefault(eid, doc_label(cid, eid, lab))

# ---------------------------------------------------------------- roll-up probe records (verified by the roll-up investigator at the pins; read-only)
EXTRA = [
    ('C0411', {'pin': PI_PIN, 'path': 'git show --stat --format= 7c80c34346c2', 'lines': '-',
               'quote': '.agents/skills/pi-mechanical-interop/SKILL.md | 35; AGENTS.md | 4; README.md | 2; docs/workbench/07-native-integrations.md | 6; docs/workbench/README.md | 6; .../01-audit-and-evidence.md | 66; .../02-host-architecture-and-protocol.md | 79; .../03-implementation-and-qa.md | 61; .../04-agent-handoff.md | 44; .../README.md | 24; 10 files changed, 325 insertions(+), 2 deletions(-)'}),
    ('C0501', {'pin': PI_PIN, 'path': "grep -rn 'mw\\.pi\\.' (full pi@b27829e6dfa7 and mw@f7c0a9431d6c worktrees, all file types)", 'lines': '-',
               'quote': "sole match: docs/workbench/programs/mechanical-workflows-interop-2026-11-04/02-host-architecture-and-protocol.md (lens-scope detection model, row L-scope-000); no match in any .ts/.json/.md of either repo outside the program doc"}),
]
for cid, e in EXTRA:
    eid = register_evidence(e)
    claim_ev_label[cid][eid] = 'support'

# ---------------------------------------------------------------- build CLAIMS rows
PERMITTED_LANGUAGE = {
    'ESTABLISHED': 'is / does / shows (inside the established scope and pin)',
    'SUPPORTED': 'evidence indicates / is supported by',
    'PLAUSIBLE': 'may / could / is consistent with',
    'UNSUPPORTED': 'has been asserted, but the available evidence does not establish it',
    'CONTESTED': 'sources disagree / the evidence supports incompatible readings',
    'REFUTED': 'the available evidence contradicts ... within <scope/pin>',
    'UNDETERMINED': 'is unknown from the available evidence; missing: <artifact>',
    'NON-EPISTEMIC': 'the program requires / proposes / defines',
}
BASELINE_PINS = {'mw@0c78e253'}
def classify_status_evidence(cid, e, st):
    eid = register_evidence(e)
    if own_anchor(cid, e):
        return 'anchor'
    pin = norm_pin(e.get('pin'), e.get('path'))
    if pin == DOC_PIN:
        return 'lineage'
    if eid in claim_ev_label[cid]:
        return claim_ev_label[cid][eid]
    if st == 'REFUTED':
        return 'support' if pin in BASELINE_PINS else 'counter'
    if st == 'UNSUPPORTED':
        return 'counter'
    if st in ('UNDETERMINED',):
        return 'other'
    return 'support'

rows = []
for cid in sorted(claims, key=lambda x: (int(re.sub(r'\D', '', x)), x)):
    c, s = claims[cid], statuses[cid]
    st = s['status']; patch = next((p for p in PATCHES if p['id'] == cid), None)
    vh = []
    permitted = s.get('permitted_strength'); overcl = bool(s.get('overclaims'))
    if patch:
        st = patch['status']; vh.append(patch['verdict_history_entry']); permitted = patch['permitted_wording']; overcl = patch['overclaims']
    support, counter, anchor, other = [], [], [], []
    for e in (s.get('evidence') or []):
        lab = classify_status_evidence(cid, e, st)
        eid = register_evidence(e)
        {'support': support, 'counter': counter, 'anchor': anchor, 'other': other, 'lineage': other}[lab].append(eid)
    for eid, lab in claim_ev_label[cid].items():
        tgt = {'support': support, 'counter': counter, 'anchor': anchor, 'other': other, 'lineage': other}[lab]
        if eid not in tgt:
            tgt.append(eid)
    for lst, lab in ((support, 'support'), (counter, 'counterevidence'), (anchor, 'anchor'), (other, 'cited')):
        for eid in lst:
            evidence[eid]['claims'].append({'claim': cid, 'relation': lab})
    defeaters = s.get('defeaters') or []
    missing = s.get('missing_artifact')
    if missing in ('', None, 'None', 'none'):
        missing = None
    lines = c['source'].get('lines')
    row = {
        'id': cid,
        'original_id': c['_original_id'],
        'group': c['_group'],
        'claim_file': c['_claim_file'],
        'dossier': dossier_of[cid],
        'proposition': c['proposition'],
        'verbatim': c.get('strongest_wording'),
        'kind': c['kind'],
        'status': st,
        'material': bool(c.get('material')),
        'overclaims': overcl,
        'scope': {'text': c.get('scope')},
        'temporal_context': {'text': c.get('time_version'), 'document_pin': DOC_PIN, 'environment_pins': [PI_PIN, MW_PIN],
                             'program_baselines': ['pi f67b6665', 'mw 0c78e253']},
        'provenance': {'root': DOC_PIN, 'artifact': c['source'].get('path'), 'location': f'L{lines}' if lines else None, 'section': c['source'].get('section')},
        'implicit_premises': c.get('implicit_premises') or [],
        'depends_on': c['depends_on'],
        'support': support,
        'counterevidence': counter,
        'anchor': anchor,
        'cited': other,
        'defeaters': defeaters,
        'rivals_preserved': s.get('rivals_preserved') or [],
        'presuppositions': s.get('presuppositions'),
        'propagation': s.get('propagation'),
        'same_origin_as': sorted(same_origin.get(cid, set()), key=lambda x: (int(re.sub(r'\D', '', x)), x)),
        'cross_group': [{'relation': r['id'], 'type': r['type'], 'other': (r['to'] if r['from'] == cid else r['from']), 'family': r['family'], 'verdict': r['propagation']['verdict']}
                        for r in rel_rows if r.get('scope') == 'cross-group' and cid in (r['from'], r['to'])],
        'lens_findings': claim_lens.get(cid, []),
        'linguistic_strength': s.get('artifact_wording'),
        'permitted_language': PERMITTED_LANGUAGE[st],
        'permitted_wording': permitted,
        'rationale': s.get('rationale'),
        'missing_to_settle': missing,
        'verdict_history': vh,
        'note': s.get('note'),
    }
    rows.append(row)

# ---------------------------------------------------------------- write outputs
def dump(path, items):
    with open(BASE + path, 'w', encoding='utf-8') as f:
        for it in items:
            f.write(json.dumps(it, ensure_ascii=False) + '\n')

dump('CLAIMS.jsonl', rows)
dump('EVIDENCE.jsonl', [evidence[k] for k in sorted(evidence, key=lambda x: int(x[1:]))])
dump('RELATIONS.jsonl', rel_rows)
dump('LENSES.jsonl', lens_rows)
for p in PATCHES:
    p['evidence'] = [eid for eid, r in evidence.items() if any(x['claim'] in ('C0264', 'C0399') for x in r['claims']) and r['source_type'] in ('PROBE_OUTPUT', 'FEEDBACK_REPORT')][:8]
dump('CLAIMS.patch.jsonl', PATCHES)

counts = collections.Counter(r['status'] for r in rows)
kinds = collections.Counter(r['kind'] for r in rows)
by_group = {g: collections.Counter(r['status'] for r in rows if r['group'] == g) for g in ('g01', 'g02', 'g03')}
by_doc = collections.Counter((r['provenance']['artifact'].split('/')[-1], r['status']) for r in rows)
overclaims = [r['id'] for r in rows if r['overclaims']]
material = sum(1 for r in rows if r['material'])
required = sorted([r['id'] for r in rows if r['status'] in ('REFUTED', 'UNSUPPORTED', 'CONTESTED')], key=lambda x: int(re.sub(r'\D', '', x)))
rem_set = sorted(set(required) | set(overclaims), key=lambda x: int(re.sub(r'\D', '', x)))
prop_report.update({
    'claims_total': len(rows), 'status_counts': dict(counts), 'kind_counts': dict(kinds), 'by_group': {g: dict(v) for g, v in by_group.items()},
    'by_doc': {f'{k[0]}|{k[1]}': v for k, v in by_doc.items()},
    'material': material, 'overclaims': overclaims, 'required_remediation_ids': required, 'remediation_candidate_ids': rem_set,
    'evidence_total': len(evidence), 'evidence_by_type': dict(collections.Counter(e['source_type'] for e in evidence.values())),
    'evidence_by_pin': dict(collections.Counter(e['pin'] for e in evidence.values())),
    'relations_total': len(rel_rows), 'relation_types': dict(collections.Counter(r['type'] for r in rel_rows)),
    'lens_rows': len(lens_rows), 'lens_ambiguous': [(l['id'], l['ambiguous_ids']) for l in lens_rows if l['ambiguous_ids']],
    'missing_dossiers': missing_dossiers,
    'missing_dossiers_material': [cid for cid in missing_dossiers if claims[cid].get('material')],
    'lens_soft': [(l['id'], l['soft_resolved_ids']) for l in lens_rows if l['soft_resolved_ids']],
    'rows_with_empty_support_epistemic': [r['id'] for r in rows if r['status'] in ('ESTABLISHED', 'SUPPORTED') and not r['support']],
    'self_anchor_in_support': [r['id'] for r in rows if any(evidence[e]['pin'] == DOC_PIN and evidence[e]['artifact'] == r['provenance']['artifact'] for e in r['support'])],
})
with open(BASE + '.propagation-report.json', 'w', encoding='utf-8') as f:
    json.dump(prop_report, f, indent=1, ensure_ascii=False)
print(json.dumps({k: prop_report[k] for k in ('claims_total', 'status_counts', 'by_group', 'material', 'evidence_total', 'relations_total', 'lens_rows')}, indent=1))
print('overclaims', len(overclaims), 'required', len(required), 'rem_set', len(rem_set))
print('violations', json.dumps(prop_report['violations'], indent=1))
print('asymmetries', json.dumps([(a['tail'], a['tail_status'], a['head'], a['head_status']) for a in prop_report['asymmetries']]))
print('intra tail>premise', json.dumps(prop_report['intra_group_tail_exceeds_premise'], indent=1)[:6000])
print('lens ambiguous', prop_report['lens_ambiguous'])
print('lens soft', prop_report['lens_soft'])
print('missing dossiers', len(missing_dossiers), 'material among them:', prop_report['missing_dossiers_material'])
print('empty support epistemic', prop_report['rows_with_empty_support_epistemic'])
print('self anchor in support', prop_report['self_anchor_in_support'])
