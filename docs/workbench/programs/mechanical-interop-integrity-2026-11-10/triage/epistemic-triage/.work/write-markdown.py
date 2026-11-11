#!/usr/bin/env python3 -I
"""Writes the Markdown deliverables of the MII epistemic triage from CLAIMS/EVIDENCE/RELATIONS.jsonl.
Run after consolidate.py: python3 -I write-markdown.py
"""
import json, os, re, collections

ROOT = '/workplace/jehallad/AgentEcosystem/ForgeWorkspaces/Pi/PiSubagents/scratch/mii-triage-1110/'
WORK = ROOT + 'epistemic-triage/.work/'
OUT = ROOT + 'epistemic-triage/'
DATE = '2026-11-11'


def load(path):
    return [json.loads(l) for l in open(path, encoding='utf-8') if l.strip()]


claims = {r['id']: r for r in load(OUT + 'CLAIMS.jsonl')}
CIDS = sorted(claims, key=lambda s: int(s[1:]))
evidence = {e['id']: e for e in load(OUT + 'EVIDENCE.jsonl')}
relations = load(OUT + 'RELATIONS.jsonl')
patch = load(OUT + 'CLAIMS.patch.jsonl')
state = json.load(open(WORK + 'consolidation-state.json'))
counts = json.load(open(WORK + 'consolidation-counts.json'))
lens = {}
for f in ['lens-lineage.jsonl', 'lens-negative-ev.jsonl', 'lens-contradict.jsonl', 'lens-mw-src.jsonl', 'lens-pi-src.jsonl', 'lens-joint.jsonl']:
    name = f.replace('lens-', '').replace('.jsonl', '')
    for i, r in enumerate(load(WORK + f)):
        r['_key'] = f'{name}#{i}'
        lens[r['_key']] = r
EV_BY_LENS = state['EV_BY_LENS']


def esc(s):
    return str(s).replace('|', '\\|').replace('\n', ' ')


def short(s, n):
    s = str(s)
    return s if len(s) <= n else s[:n - 3].rstrip() + '...'


def cl(c):
    return claims[c]


# =============================================================================== CONTRADICTIONS.md
K_STATUS = {
    'contradict#0': ('DECISION-CONFLICT (NON-EPISTEMIC) with one REFUTED premise (C029)', 'high'),
    'contradict#1': ('CONTESTED (embedded label premise of C142/C163); C221 ESTABLISHED', 'high'),
    'contradict#2': ('DECISION-CONFLICT; prerequisite sets differ across the two programs', 'medium'),
    'contradict#3': ('CONTESTED (embedded premise: D6 owner); C031 NON-EPISTEMIC', 'medium'),
    'contradict#4': ('REFUTED premise (C032) under the README reading order', 'medium'),
    'contradict#17': ('RESOLVED (two adjacent MW baselines; delta touches no design claim)', 'low'),
    'contradict#22': ('RESOLVED-BY-SOURCE (Forge envelope fields documented; hedge is a conditional)', 'low'),
    'contradict#24': ('NO DEFECT (failed attack preserved)', 'none'),
}


def k_sets():
    out = []
    n = 0
    covered = []
    for key, r in lens.items():
        if not key.startswith('contradict#'):
            continue
        n += 1
        st, sev = K_STATUS.get(key, ('DECISION-CONFLICT (NON-EPISTEMIC): two stipulations of the same program or of the two paired programs disagree', r.get('severity', 'n/a')))
        out.append((f'K{n:03d}', key, r, st, sev))
        covered.append(frozenset(r['claimIds']))
    for key, r in lens.items():
        if not key.startswith('joint#') or r['relation'] not in ('CONFLICTS_WITH', 'CONTRADICTS') or len(r['claimIds']) < 2:
            continue
        s = frozenset(r['claimIds'])
        if any(s <= c for c in covered):
            continue
        n += 1
        out.append((f'K{n:03d}', key, r, 'DECISION-CONFLICT or document-vs-pin conflict (see statuses of the listed claims)', 'joint lens'))
        covered.append(s)
    return out


with open(OUT + 'CONTRADICTIONS.md', 'w', encoding='utf-8') as fh:
    fh.write(f'# CONTRADICTIONS - mechanical-interop-integrity-2026-11-10 (MII)\n\n')
    fh.write(f'Pins: Pi env 0fb90672, MW env 69cb016d, document pin Pi 3fc0ead1 (MW companion 6476372f). Graded {DATE}.\n\n')
    fh.write('Vocabulary. `CONTESTED` marks an embedded *empirical* premise on which the two paired programs\' ledgers conflict. `DECISION-CONFLICT` marks two stipulations (NORMATIVE/PROPOSAL/DEFINITION rows) that disagree; they are not graded true or false, but they cannot both be implemented, so each needs an owner ruling before a bead is cut. `RESOLVED` records a suspected contradiction that dissolved on inspection (kept so it is not re-raised). No contradiction set is collapsed by averaging; the two programs are one authoring lineage (SOURCE-MAP L1/L2), so their agreement elsewhere is consistency, not corroboration.\n\n')
    fh.write('## Index\n\n| K | Claims | Status | Lens row | Severity |\n|---|---|---|---|---|\n')
    ks = k_sets()
    for kid, key, r, st, sev in ks:
        fh.write(f"| {kid} | {', '.join(r['claimIds'])} | {esc(short(st, 90))} | {key} ({EV_BY_LENS[key]}) | {sev} |\n")
    fh.write('\n')
    for kid, key, r, st, sev in ks:
        ids = r['claimIds']
        title = short(r.get('drift') or r.get('note') or 'conflict', 110)
        fh.write(f'## {kid} - {esc(title)}\n\n')
        fh.write(f"Claims: {', '.join(f'{c} ({cl(c)['status']})' for c in ids)}\n\nStatus: {st}\n\nSeverity (lens): {sev}\n\n")
        fh.write('### Evidence (lens record ' + EV_BY_LENS[key] + ', ' + key + ')\n\n')
        ev = r['evidence'] if isinstance(r['evidence'], str) else json.dumps(r['evidence'], ensure_ascii=False)
        fh.write('- ' + esc(short(ev, 1800)) + '\n')
        fh.write(f"- Detection model: {esc(r.get('detectionModel') or 'n/a')}\n\n")
        fh.write('### Per-claim readings\n\n')
        for c in ids:
            fh.write(f"- {c} [{cl(c)['kind']}] {cl(c)['status']}: {esc(short(cl(c)['permitted_wording'], 320))}\n")
        fh.write('\n### Reconciliation attempts\n\n')
        fh.write(f"- Lens proposal: {esc(r['proposedStatus'])}\n")
        fh.write(f"- Note: {esc(r.get('note') or 'n/a')}\n")
        fh.write('\n### What would settle it\n\n')
        if 'RESOLVED' in st or 'NO DEFECT' in st:
            fh.write('- Nothing further; recorded so the question is not re-opened without new evidence.\n\n')
        elif 'CONTESTED' in st:
            fh.write('- An owner ruling recorded in the joint identifier table (P00/H00) naming one owner and one content per disputed label; until then both ledgers stay quoted and no bead is keyed by the bare label.\n\n')
        else:
            fh.write('- An owner ruling (Pi Workbench) choosing one stipulation, landed as an insert annotation after the pinned section of each affected document (REMEDIATION.md rows for the listed claims; pin advance deferred to the owner).\n\n')
    fh.write('## Document-versus-environment contradictions (not K-sets)\n\n')
    fh.write('These are claims the environment pins contradict, graded on the claim rows rather than as inter-claim sets:\n\n')
    for c in CIDS:
        r = cl(c)
        if r['status'] in ('REFUTED', 'UNSUPPORTED'):
            fh.write(f"- {c} {r['status']} - {esc(short(r['verbatim'], 100))}: {esc(short(r['permitted_wording'], 260))}\n")
    fh.write('\nAlso recorded (lineage lens): the deposit itself leaves a landed census red on master (test/workbench-mwi-docs-remediation-census.test.ts: trunk ce180d82 green 126/126; master 0fb90672 4 failed; master 3fc0ead1 8 failed), which contradicts the program\'s own protocol sentence that docs/skills are updated in the same cut as their readers (C220, C226, C036/C181; evidence E010, receipts epistemic-triage/.work/lineage-run/).\n')

# =============================================================================== SOURCE-MAP.md
with open(OUT + 'SOURCE-MAP.md', 'w', encoding='utf-8') as fh:
    fh.write(f'# SOURCE-MAP - provenance and source-independence, MII triage ({DATE})\n\n')
    fh.write('Rule applied: descendants of one origin count as one evidentiary lineage. Every claim row\'s `support[]`/`counterevidence[]` cites EVIDENCE.jsonl records; each record names the lineage it belongs to through its `source_type`, `primary_artifacts` and `parents`.\n\n')
    fh.write('## Lineages\n\n')
    L = [
        ('L1', 'The audited artifact: Pi program docs/programs/mechanical-interop-integrity-2026-11-10/{README,01..05}.md at Pi 3fc0ead1 (deposit 91d8fa8c + link fix). Copies docs/pi-*.md are sha256-identical (joint#0, joint#4).', 'PRIMARY DOCUMENT (the thing graded). Its sentences are never evidence for themselves (gate check c).'),
        ('L2', 'Companion Mechanical program docs/programs/pi-host-integrity-2026-11-10/{README,01..05}.md at MW 6476372f. Same author identity, committed within six minutes of L1 (joint#1: James Halladay, 2026-11-10 20:22/20:27/20:27 -08:00).', 'SAME_ORIGIN_AS L1. Agreement between L1 and L2 is consistency of one lineage, not independent corroboration (joint#1, joint#44). Disagreements between them are DECISION-CONFLICTs (CONTRADICTIONS.md).'),
        ('L3', 'MNI-2026-11-09 program and its triage ledger (Pi docs/programs/mechanical-native-interoperability-2026-11-09, docs/workbench/programs/.../triage/epistemic-triage/CLAIMS.jsonl, EAT-R201..R310), env pin 8e2fedeb.', 'SAME_ORIGIN_AS the MII baseline rows: the eleven Pi src files MII describes have identical blob ids at 8e2fedeb and 0fb90672 (lineage#0), and the MII baseline bullets restate MNI ledger rows (C055/C058/C059/C062/C065/C067/C070/C085 ESTABLISHED there). MII inherits MNI vocabulary explicitly: see "Vocabulary inheritance" below.'),
        ('L4', 'Pi source, tests, fixtures, bead exports and docs at 0fb90672 (worktree pins/pi-0fb90672).', 'PRIMARY CODE. Independent of L1-L3 for every present-tense Pi claim. Read by the pi-src, negative-ev, lineage, joint lenses and the audits.'),
        ('L5', 'Mechanical source, contracts, manifests, QA receipts at 69cb016d (worktree pins/mw-69cb016d); unchanged through 1be2b8dc, 6476372f, 0ffdc844 for every cited path (mw-src#38).', 'PRIMARY CODE. Independent of L1-L3 for every present-tense Mechanical claim. Read by the mw-src, negative-ev, joint lenses and the audits.'),
        ('L6', 'Executions at the pins on scratch copies: pi-probe.jsonl/mw-probe.jsonl (audit-a-protocol), PROBE/out/* (mw-src: host suite 123/123, installed-consumer surface, defect probes D1/D2/D4/D8/D10/D11, forge-ledger corroboration), lineage-run census logs (trunk green, master red).', 'INDEPENDENT OBSERVATION of behaviour, distinct from source reading (L4/L5). Each probe names its runner, node version and detection power in the lens row.'),
        ('L7', 'Status registers: Pi docs/workbench/feature-matrix.md (W11 planned), test/fixtures/mechanical-historical-status-ledger.json (EAT-R202, 200 rows), .beads/issues.jsonl + archive, M046-M050 census rows (wb-12x1).', 'SECONDARY REGISTERS maintained by earlier programs; they corroborate absence claims (C001, C056, C216) and are the frozen readers the deposit broke (C220).'),
        ('L8', 'External references: Forge skill reference (~/.claude/skills/forge/references/commands-build.md: gated_commit, gated_tree, gate_passed, gate_definition, execution_environment), ~/.forge/ledger.jsonl root-gate rows for 69cb016d/1be2b8dc/6476372f/0ffdc844.', 'EXTERNAL AUTHORITY within its domain (Forge envelope semantics); used for C026/C185/C188 premises and for producer-side gate corroboration.'),
        ('L9', 'MWI-2026-11-04 program (Pi docs/workbench/programs/mechanical-workflows-interop-2026-11-04) and its beads wb-1a3t epic: wb-201v, wb-s8rm, wb-ocie, wb-0gbh, wb-5ik5, wb-wupg; MW 1f29daa7.', 'The actual origin of the seams and fixes the MII README attributes to "the November 9 program" (C006 UNSUPPORTED; C074/C075 attributed here). MW-CONTRACT is this program\'s label (BEAD-PLAN.md:73; function-authority.ts:135).'),
    ]
    fh.write('| Lineage | What | Independence ruling |\n|---|---|---|\n')
    for a, b, c in L:
        fh.write(f'| {a} | {esc(b)} | {esc(c)} |\n')
    fh.write('\n## Vocabulary inheritance MNI -> MII (explicit SAME_ORIGIN lineages)\n\n')
    V = [
        ('D1..D12 defect numbers', 'an "original deep-audit" that is in neither program directory (pi-01 L2); the companion mw-01 ledger describes D1, D2, D4, D6, D7, D8, D10, D11, D12; pi-01 describes D3, D5, D6, D9', 'C031, C032 (REFUTED), C033; a second D-namespace (D01..D14 decisions) already lives in Pi docs/workbench/18-decisions-and-risks.md (joint#4)'),
        ('P00..P12 packet labels', 'MNI-2026-11-09 packets and live beads (wb-w8fk P00, wb-y0n6 P02, wb-2ukh P03, wb-4bxo P04, ... wb-pxvv/669r P12); MII reuses the numbers for different work (P01, P02, P04-P09 denote different packets in the two programs)', 'C137 (mapping is not the identity on numbers), C139/C141/C143, lineage#13/#14'),
        ('H01..H05 handoff labels', 'three numberings: pi-05 (binding, callbacks, strict verification, effects, tests), mw-README (strict eligibility, effect law, ...), mw-03 (H00-H12 packets)', 'C221 SUPPORTED (collision established), C142/C163 UNSUPPORTED (referent undecidable), contradict#1, lineage#14'),
        ('L0..L5 evidence tiers', 'Mechanical 2026-11-09 interoperability ladder (mw-04 L5, receipts evidence_tier) and the standing QA ladder (MW docs/08); Pi defines V0..V6 and uses L2-L5 undefined', 'C005 (REFUTED facet ii), C067, C182, C210, negative-ev NE-28'),
        ('MW-CONTRACT', 'MWI-2026-11-04 BEAD-PLAN.md:73 external producer dependency; Pi function-authority.ts:135 FUNCTION_ACTION_BLOCKER; absent from every MW artifact at 69cb016d/6476372f (joint#15)', 'C050, C105, C107 (arbitrated), C135'),
        ("'self-contained' / 'next design revision'", 'MII README L7; the routing surfaces (skill, AGENTS.md, README.md, hosting page) still call MNI the current program at 3fc0ead1 (lineage#8)', 'C005 REFUTED, C220, C226, C057'),
        ("'No GitHub CI' / 'docs-only' / 'no joined receipt' sentences", 'wb-12x1 census rows M046 (EAT-R139), M047 (EAT-R140), M049 (EAT-R142), M050 (EAT-R143) had already narrowed these sentences; MII restates the bare forms', 'C035/C138 REFUTED (M047 regression), C023 (M050 form), C036/C181 (M046 form), C028 (M049 form)'),
        ('W11 / feature-matrix wording', 'Pi docs/workbench/feature-matrix.md W11 (planned; HX->RF->Claude SDK->Forge) and the EAT-R202 status ledger fixture', 'C056, C216, C217, C001'),
        ('mechanical:develop-write, git-census-v1/plain-v1, mechanical.pi-host/v1, mechanical.development.develop.v1', 'Mechanical host-binding.ts:9-14 (candidate, "not yet adopted jointly") and the shared descriptor; Pi carries the descriptor id in MECHANICAL_REVIEWED_ENTRYPOINTS and none of the profile/grant spellings in src', 'C027, C028, C087, C088, C093, C145'),
    ]
    fh.write('| Term family | Origin lineage | Claims carrying it |\n|---|---|---|\n')
    for a, b, c in V:
        fh.write(f'| {esc(a)} | {esc(b)} | {esc(c)} |\n')
    fh.write('\n## De-duplication rulings\n\n')
    fh.write('- Pi README baseline bullets (C007-C025) and the companion mw-README/mw-01 "already exists" rows describe the same facts from one authoring lineage; their agreement adds no witness. Each baseline row is graded on L4/L5 primary reads plus L6 executions (see each row\'s `support[]`).\n')
    fh.write('- The MNI ledger\'s ESTABLISHED rows for the eleven unchanged Pi modules transfer to MII by blob identity (lineage#0); they are the same evidence, re-read at 0fb90672, not a second confirmation.\n')
    fh.write('- The three program receipts under MW qa/integration/pi-native-interoperability-2026-11-09 are reports of a pack and a run (L2 tier); the M05 receipt is refused by the producer\'s own validator (C020, C068), so the executable tests, not the receipt, carry C019/C020.\n')
    fh.write('- Author self-reports (C036, C181) are SOURCE_REPORTs established as reports; no committed artifact can establish author inactivity (detection model: commit file lists see committed artifacts only).\n')
    fh.write('- The two "paired" Mechanical baselines (69cb016d in L1, 1be2b8dc in L2) differ by two test titles and one mapping row; every source verdict at 69cb016d transfers to 1be2b8dc and to 0ffdc844 (mw-src#38, contradict#17).\n')
    fh.write('\n## Evidence census\n\n')
    st_counts = collections.Counter(e['source_type'].split(' (')[0] for e in evidence.values())
    fh.write(f'EVIDENCE.jsonl holds {len(evidence)} records: ' + ', '.join(f'{k} {v}' for k, v in st_counts.items()) + '. ')
    fh.write(f"{sum(1 for e in evidence.values() if e['primary_artifacts'])} records resolve at least one primary pinned file on disk; {sum(1 for e in evidence.values() if e['unresolved_pointers'])} carry pointers that are commands, directories or external stores (listed in `unresolved_pointers`, kept as data).\n")

# =============================================================================== REMEDIATION.md
TRACKER = {
    'C220': 'wb-12x1 (frozen census rows; owner append-only protocol)', 'C226': 'wb-12x1', 'C057': 'wb-12x1', 'C035': 'wb-12x1 row M047 / EAT-R140 wording', 'C138': 'wb-12x1 row M047 / EAT-R140 wording',
    'C023': 'wb-12x1 row M050 / EAT-R143 wording', 'C028': 'wb-12x1 row M049 / EAT-R142 wording', 'C036': 'wb-12x1 row M046 / EAT-R139', 'C181': 'wb-12x1 row M046 / EAT-R139',
    'C025': 'wb-w8fk (P00 ruling, blocked on wb-1zn2)', 'C031': 'wb-w8fk / wb-1zn2', 'C045': 'wb-w8fk / wb-1zn2', 'C146': 'wb-w8fk / wb-1zn2', 'C062': 'wb-w8fk / wb-1zn2', 'C051': 'wb-w8fk',
    'C017': 'wb-9v02 (pending cancellation defect)', 'C054': 'wb-9v02 / wb-7wkb', 'C207': 'wb-9v02 (EAT-R253)', 'C168': 'wb-9v02 (EAT-R253)',
    'C024': 'wb-7wkb (kill/verifier harness)', 'C075': 'wb-7wkb', 'C176': 'wb-7wkb / wb-xr1z', 'C143': 'wb-p3i2 / wb-xr1z / wb-9bof', 'C137': 'wb-y0n6 (append-correct)', 'C073': 'wb-y0n6 / wb-1zn2',
    'C179': 'wb-0gbh / wb-ub94 (landed observation-only boundary)',
}
OWNER = 'Pi Workbench (James Halladay)'
rem_rows = state['rem_rows']
with open(OUT + 'REMEDIATION.md', 'w', encoding='utf-8') as fh:
    fh.write(f'# REMEDIATION - MII triage ({DATE})\n\n')
    fh.write('The audited corpus is a hash-pinned fixture: the six program files are committed at Pi 3fc0ead1 and the interop skill is read by a frozen-shape census (test/workbench-mwi-docs-remediation-census.test.ts, wb-12x1 rows). Every repair below therefore lands as an **insert** (an annotation block after the complete pinned section, never a rewrite inside a pinned line), and every `Repair` cell reads `deferred:` with the reason: the pin advance awaits its owner, ' + OWNER + '. No repair agent advances the pin. Requirement compilation at EAT-R391+ is the tracker for rows marked `none`.\n\n')
    fh.write('Classes are restricted to the allowed set (ADD_SOURCE, REPLACE_SOURCE, NARROW_SCOPE, ADD_TEMPORAL_QUALIFIER, DOWNGRADE_MODALITY, SPLIT_CLAIM, MARK_AS_HYPOTHESIS, MARK_AS_DEFINITION, SURFACE_DISAGREEMENT, ADD_MISSING_PREMISE, REMOVE_CLAIM, PRESERVE_AS_UNDETERMINED). One row per (claim, class); the audit\'s full repair text is carried once per claim in the first row.\n\n')
    fh.write('## Inverse coverage (REFUTED / UNSUPPORTED / CONTESTED rows)\n\n')
    need = [c for c in CIDS if claims[c]['status'] in ('REFUTED', 'UNSUPPORTED', 'CONTESTED')]
    have = {row[0] for row in rem_rows}
    fh.write(f"Rows requiring coverage: {', '.join(need)}. Missing from the Claim column: {', '.join(sorted(set(need) - have)) or 'none'}.\n\n")
    fh.write('## Rows\n\n| ID | Claim | Status | Class | Existing wording | Repair | Why sufficient | Evidence | Tracker |\n|---|---|---|---|---|---|---|---|---|\n')
    n = 0
    seen_claim = set()
    for c, k, wording, why, st, ev in rem_rows:
        n += 1
        first = c not in seen_claim
        seen_claim.add(c)
        repair = f"insert: {short(why, 420)}; deferred: pin advance awaits its owner - {OWNER}" if first else f"insert (same annotation as the first {c} row); deferred: pin advance awaits its owner - {OWNER}"
        why_suff = {
            'NARROW_SCOPE': 'keeps the established core and removes the facet the pins do not warrant',
            'ADD_SOURCE': 'gives the sentence the primary witness it currently lacks',
            'REPLACE_SOURCE': 'points the sentence at the artifact that actually describes the referent',
            'ADD_TEMPORAL_QUALIFIER': 'binds the statement to the revision at which it was true',
            'DOWNGRADE_MODALITY': 'matches the verb to the warrant (proposal/requirement, not present state)',
            'SPLIT_CLAIM': 'lets facets with different warrants carry different statuses',
            'MARK_AS_HYPOTHESIS': 'keeps a useful but unobserved mechanism as a hypothesis',
            'SURFACE_DISAGREEMENT': 'makes the two programs\' conflicting stipulations visible until an owner rules',
            'ADD_MISSING_PREMISE': 'states the premise the proposal silently depends on so it can be tested or ruled',
            'PRESERVE_AS_UNDETERMINED': 'keeps the unknown as a named evidence-acquisition gate instead of a guess',
            'REMOVE_CLAIM': 'the sentence has no warrant path and no narrower true form',
            'MARK_AS_DEFINITION': 'a stipulation is evaluated for consistency, not truth',
        }[k]
        fh.write(f"| M{n:03d} | {c} | {st} | {k} | {esc(short(wording, 110))} | {esc(repair)} | {why_suff} | {', '.join(ev)} | {TRACKER.get(c, 'none (EAT-R391+)')} |\n")
    fh.write('\n## Repairs the consolidation routes to the owner as EMPIRICAL_REPAIR candidates (not document edits)\n\n')
    fh.write('- The deposit leaves test/workbench-mwi-docs-remediation-census.test.ts red on master (4 failures at 0fb90672 from the 2026-11-09 skill rewrite 4b219f24, 8 at 3fc0ead1 after 91d8fa8c moved M048 to SKILL:L17; trunk ce180d82 green). Repair = restore the M049/M050 standing text or re-pin the rows\' Where/wording through the census\'s own append-only receipt protocol, in the same cut as any further skill edit (C220, C226; evidence E010).\n')
    fh.write('- The three Mechanical producer gaps (C033: D1/D7, D2, D4) and D8/D10/D11 are reproduced by scratch probes only; each owes a committed red test in the producer repository before pi-01 L2 lets it count as more than a hypothesis.\n')
    fh.write('- The Pi CI workflow runs node-version 22 against engines node >=24 (negative-ev NE-21); out of this program\'s scope by M047, recorded for the Pi owner.\n')

# =============================================================================== ARBITRATION
with open(OUT + f'ARBITRATION-{DATE}.md', 'w', encoding='utf-8') as fh:
    fh.write(f'# ARBITRATION-{DATE} - MII triage\n\n')
    fh.write('## Method\n\nTrigger: at consolidation (Phase 6-9) two Phase 5 audit verdicts did not reproduce against the lens findings and against the audits\' own recorded attack results. Arbiter: the Phase 6-9 consolidator. Rule: each row is decided from primary evidence re-read at the pin, never by preferring the later pass, the more conservative status or the majority of lenses. Both readings are kept; the losing ledger rows stay in the .work audit files as evidence.\n\n')
    fh.write('## Pinned rebuild\n\nDocument pin: Pi 3fc0ead1 (docs/pi-*.md sha256-identical to the commit). Environment pins: Pi 0fb9067262532289104417d2b7f2f25704563a75 (pins/pi-0fb90672), MW 69cb016dd293a17bcc893f2baf410a51c226f4c9 (pins/mw-69cb016d).\n\n')
    fh.write('## Re-run probes\n\nRead-only re-reads at the pins (no new execution; the executed probes are the Phase 3/5 records cited):\n\n| argv | rc | digest |\n|---|---|---|\n')
    fh.write('| sed -n 103,108p;133,136p;143,146p pins/pi-0fb90672/src/workbench/function-authority.ts | 0 | see E463 summary (module comment L105-L107, constant L145) |\n')
    fh.write('| grep -rln "adoptFunctionActions\\|FUNCTION_ACTION_CONTRACT\\|dispatchFunctionWithAuthority" pins/pi-0fb90672/src (excluding the module) | 1 (no match) | empty: no production caller |\n')
    fh.write('| grep -n P7 epistemic-triage/.work/audit-a-protocol.scratch/probe/pi-probe.jsonl | 0 | row 7: viaAdopted=dispatched, viaDefault=entry:function-action-unadopted |\n')
    fh.write('| sed -n 10,22p pins/mw-69cb016d/apps/development-rig/package.json | 0 | exports: ./host, ./package.json only |\n')
    fh.write('| grep -rn reconcileUncertainEffect pins/mw-69cb016d/apps pins/mw-69cb016d/packages (excluding tests and the module) | 1 (no match) | no src caller |\n')
    fh.write('| grep -c ERR_PACKAGE_PATH_NOT_EXPORTED epistemic-triage/.work/lens-mw-src-probe/out/installed-consumer-surface-probe.jsonl | 0 | 6 |\n\n')
    import importlib.util
    spec = importlib.util.spec_from_file_location('cons', WORK + 'consolidate.py')
    # ARBITRATED dict is reproduced here from the claims rows to avoid re-running the consolidation
    for p in patch:
        c = p['id']
        r = claims[c]
        fh.write(f"## {c}\n\n- Proposition: {esc(r['proposition'])}\n- Reading A (Phase 5 audit): {p['status_A']}\n- Reading B (consolidation, from the lenses and the primary evidence): {p['status_B']}\n- Evidence inspected: {', '.join(p['evidence'])} - {esc(evidence[p['evidence'][0]]['summary'])}\n- Ruling: {esc(p['note'])}\n- Final status: {p['status']}\n- verdict_history entry appended: `{p['verdict_history_entry']}`\n- Facet statuses now on the row: {esc(json.dumps(r['facet_statuses'], ensure_ascii=False))}\n\n")
    fh.write('## Remediation impact\n\n')
    for p in patch:
        c = p['id']
        rows = [f'M{i + 1:03d} ({k})' for i, (cc, k, *_rest) in enumerate(rem_rows) if cc == c]
        fh.write(f"- {c}: {p['status_A']} -> {p['status']}; REMEDIATION.md rows {', '.join(rows)}. {'Leaves the inverse-coverage set (no longer REFUTED/UNSUPPORTED); its NARROW_SCOPE/ADD_MISSING_PREMISE rows are forward repairs.' if c == 'C107' else 'Enters SUPPORTED; SPLIT_CLAIM/ADD_MISSING_PREMISE rows map the unsupported facet.'}\n")
    fh.write('\nNot arbitrated (recorded as facet statuses on the rows instead): C028, C030, C155, C022-C025, C075, C095, C142, C163, C214/C215, where the lens graded a facet or a reading the audit had already addressed in its permitted wording and remediation.\n')

# =============================================================================== DOSSIERS
DOSSIER_IDS = ['C001', 'C005', 'C008', 'C011', 'C023', 'C032', 'C033', 'C035', 'C107', 'C173']
os.makedirs(OUT + 'dossiers', exist_ok=True)
indeg = collections.Counter()
for c in CIDS:
    for d in claims[c]['dependencies']:
        indeg[d] += 1
for c in DOSSIER_IDS:
    r = claims[c]
    with open(OUT + f'dossiers/{c}.md', 'w', encoding='utf-8') as fh:
        fh.write(f"# {c} - {short(r['proposition'], 140)}\n\n")
        fh.write(f"## Verbatim artifact wording\n\n> {r['verbatim']}\n\nAnchor: {r['provenance']['artifact']} - {r['provenance']['location']}\n\n")
        fh.write(f"## Claim type and scope\n\n- Kind: {r['kind']}\n- Material: {r['material']}\n- Scope: {r['scope']['description']}\n- Temporal/version context: environment pins {r['temporal_context']['environment_pin']}; document pin {r['temporal_context']['document_pin']}; claim context {r['scope']['environment']}\n\n")
        fh.write(f"## Warrant verdict\n\n- Status: {r['status']}\n- Permitted wording: {r['permitted_wording']}\n- Permitted language form: {r['permitted_language']}\n- verdict_history: {r['verdict_history']}\n")
        if r['facet_statuses']:
            fh.write('- Facet statuses:\n')
            for k, v in r['facet_statuses'].items():
                fh.write(f'  - {k}: {v}\n')
        fh.write('\n## Support\n\n| Evidence | Relation | What it establishes | Limits |\n|---|---|---|---|\n')
        for eid in r['support']:
            e = evidence[eid]
            fh.write(f"| {eid} ({esc(e['location'])}) | {e['relation']} | {esc(short(e['summary'], 700))} | {esc(short(e.get('detection_model') or '; '.join(e.get('limitations', [])), 240))} |\n")
        fh.write('\n## Counterevidence / defeaters\n\n| Evidence | Defeater type | Effect |\n|---|---|---|\n')
        for eid in r['counterevidence']:
            e = evidence[eid]
            kind = 'rebutting' if r['status'] in ('REFUTED',) else 'scope/undercutting'
            fh.write(f"| {eid} ({esc(e['location'])}) | {kind} | {esc(short(e['summary'], 700))} |\n")
        if not r['counterevidence']:
            fh.write('| none recorded | - | - |\n')
        fh.write(f"\n## Dependencies\n\n- Premises (DEPENDS_ON): {', '.join(f'{d} ({claims[d]['status']})' for d in r['dependencies']) or 'none'}\n- Propagation: {esc(json.dumps(r['propagation'], ensure_ascii=False))}\n- Downstream claims depending on this row: {', '.join(d for d in CIDS if c in claims[d]['dependencies']) or 'none'} (fan-in {indeg[c]})\n- Related evidence (context, same-origin, assumptions): {', '.join(r['related_evidence']) or 'none'}\n\n")
        fh.write(f"## Rival readings tested\n\n- Rival reading recorded: {esc(r['rival_reading'])}\n- Narrower proposition the evidence supports: see permitted wording.\n\n")
        fh.write('## Adversarial attacks\n\n')
        for a in r['attacks']:
            fh.write(f"- {esc(a if isinstance(a, str) else json.dumps(a, ensure_ascii=False))}\n")
        fh.write(f"\n## Drift at the document pin\n\n{esc(r['drift_at_document_pin'])}\n\n")
        fh.write(f"## Missing evidence\n\n{r['missing_to_settle'] or 'none'}\n\n")
        rows = [f"M{i + 1:03d} {k}: {short(why, 300)}" for i, (cc, k, w, why, st, ev) in enumerate(rem_rows) if cc == c]
        fh.write('## Remediation\n\n' + ('\n'.join(f'- {esc(x)}' for x in rows) if rows else '- none') + '\n')

# =============================================================================== EPISTEMIC-AUDIT.md
sc = counts['status_counts']
kc = counts['kind_counts']
mc = counts['material_status_counts']
kind_status = collections.defaultdict(dict)
for k, s, v in state['kind_status']:
    kind_status[k][s] = v
with open(OUT + 'EPISTEMIC-AUDIT.md', 'w', encoding='utf-8') as fh:
    fh.write(f'# EPISTEMIC-AUDIT - mechanical-interop-integrity-2026-11-10 (MII), graded {DATE}\n\n')
    fh.write('## 1. Pinned substrate\n\n')
    fh.write('- Artifact (document pin): Pi-subagents docs/programs/mechanical-interop-integrity-2026-11-10/{README,01..05}.md at origin/master 3fc0ead1e99f854365fd4226f582eaf4f19f8858 (deposit 91d8fa8c + link fix); 6 files, 41,393 bytes; triage copies docs/pi-*.md sha256-identical.\n')
    fh.write('- Companion (context, same authoring lineage): MechanicalWorkflows docs/programs/pi-host-integrity-2026-11-10/ at main 6476372f (copies docs/mw-*.md).\n')
    fh.write('- Environment pins (what the claims describe and were tested against): Pi master 0fb9067262532289104417d2b7f2f25704563a75 (worktree pins/pi-0fb90672); Mechanical main 69cb016dd293a17bcc893f2baf410a51c226f4c9 (worktree pins/mw-69cb016d).\n')
    fh.write('- Drift recorded: Pi 0fb90672 -> 3fc0ead1 changes the six program files and .agents/skills/pi-mechanical-interop/SKILL.md only (src/test/qa/package.json/forge.toml unchanged). MW 69cb016d -> 1be2b8dc (two test titles, one mapping row) -> 6476372f (companion docs + skill) -> 0ffdc844 (one more test-title/mapping edit): no path under apps/*/src, packages/*/src, contracts/, qa/ or any package.json changed, so every Mechanical source verdict transfers. Pi trunk workbench/implementation-program = ce180d82 is the code of 0fb90672; the program documents, the November 9 program, README.md, AGENTS.md and the rewritten skill are master-only.\n')
    fh.write('- Audit run: read-only on both repositories; executions only on scratch copies under epistemic-triage/.work (git archive + lock-pinned toolchain); outputs written under epistemic-triage/ (this tree) with durable destination per MANIFEST.md.\n')
    fh.write('- Inputs consolidated: 230 claims (claims-*.jsonl), 245 lens rows in six lenses, 217 Phase 5 audit rows; 13 rows (C001-C006, C026, C031-C035, C086) had no Phase 5 row and were graded at consolidation from the lens rows plus a consolidation re-verification record (E465).\n\n')
    fh.write('## 2. Claim inventory\n\n')
    fh.write('| Status | All rows | Material rows |\n|---|---|---|\n')
    for s in ['ESTABLISHED', 'SUPPORTED', 'PLAUSIBLE', 'UNSUPPORTED', 'CONTESTED', 'REFUTED', 'UNDETERMINED', 'NON-EPISTEMIC']:
        fh.write(f'| {s} | {sc.get(s, 0)} | {mc.get(s, 0)} |\n')
    fh.write(f"| total | {sum(sc.values())} | {sum(mc.values())} |\n\n")
    fh.write('| Kind | rows | statuses |\n|---|---|---|\n')
    for k in ['OBSERVATION', 'SOURCE_REPORT', 'INFERENCE', 'HYPOTHESIS', 'DEFINITION', 'NORMATIVE', 'PROPOSAL']:
        fh.write(f"| {k} | {kc.get(k, 0)} | {esc(json.dumps(kind_status.get(k, {})))} |\n")
    fh.write('\nBy document: ' + '; '.join(f"{d.replace('docs/', '')}: " + ', '.join(f'{s} {n}' for s, n in sorted(v.items())) for d, v in state['doc_status'].items()) + '.\n\n')
    fh.write('Counts are descriptive. The 124 NON-EPISTEMIC rows are the program\'s D1-D12 severity items, invariants I1-I10, packets P00-P12, falsifiers G01-G12/P13-P18 and handoffs: they are graded for consistency and for the status of their embedded empirical premises (`embedded_premise_flags` on each row), not for truth.\n\n')
    fh.write('## 3. Highest-impact defects\n\n')
    D = [
        ('C005 REFUTED', "'self-contained' fails: eight D-numbers, four L-tiers, 'strict' and MW-CONTRACT are defined only outside the six files; P04/P08 block on Mechanical H-work. Narrower true form: self-contained for Pi-owned work, Mechanical items by label."),
        ('C032 REFUTED', "'D8/D10/D11/D12 are shared or Mechanical-owned as described in this corpus' - described only in the companion's mw-01 (none marked shared); D6 has two owners with different content; D7's label differs between programs."),
        ('C035 / C138 REFUTED', "'No GitHub CI' is false for Pi (.github/workflows/ci.yml triggers on master; node 22 vs engines >=24); the repository had already narrowed this sentence (M047/EAT-R140), so the deposit regresses an existing remediation. Three of C035's five presuppositions hold; the Furnace 'profile' has no witness."),
        ('C029 REFUTED', "'attached or explicitly admitted same-machine execution' names a placement Pi does not have (EXECUTE_HOST_MODES = embedded, detached) and widens the first release beyond pi-02 L5 / pi-05 L41 (embedded first, detached deferred to P11)."),
        ('C095 REFUTED', "'raw JSON budgets using current workbench rules': the 64 KiB / 4096-byte budgets apply to canonicalized, notes-stripped function values; a function input whose notes alone exceed 64 KiB is admitted (probe P3-oversize-note)."),
        ('C006 UNSUPPORTED', "'its completed source changes must not be undone' has no Pi src/ referent for the November 9 program; the seams the README protects were landed by the November 4 program (wb-201v, wb-s8rm, wb-ocie, wb-0gbh, wb-5ik5) and MW 1f29daa7."),
        ('C142 / C163 / C140 UNSUPPORTED', "cross-repository dependencies keyed by H01/H02/H03 labels that denote different work in pi-05, mw-README and mw-03; the graph node 'P04 composed admission' and the section 'P04 reviewed installed host consumer' describe different work."),
        ('Landed census regression (C220, C226)', 'test/workbench-mwi-docs-remediation-census.test.ts is red on master (4 failures at 0fb90672, 8 at 3fc0ead1; trunk green) because the 2026-11-09 skill rewrite and the MII deposit moved frozen wb-12x1 rows; neither commit ran the landing gate (C036/C181 self-reports are consequential).'),
        ('Strict-native attainability (C026, C175, C185)', 'execution_environment.pinned is false in all 148 occurrences across committed MW evidence and true only in synthetic test fixtures: whether V4/P08 can ever yield a strict-native PASS in the first-release topology is UNDETERMINED; the release definition may be unsatisfiable rather than failed.'),
        ('Ratification gate is a constant (C050, C107)', 'FUNCTION_ACTION_CONTRACT is unadopted and read by nothing in production; adoptFunctionActions has no caller, and any caller can mint an adopted contract (probe P7), so "ONLY after MW-CONTRACT ratification" is not mechanically enforced and MW-CONTRACT names nothing in the Mechanical tree.'),
        ('Observe premise narrower than written (C030)', 'workflow_observe resolves an embedded launch in the same process/session only; a detached launch registers no task although the execute reply tells the model to observe it; nothing survives an extension restart.'),
        ('Effect-intent lookup does not exist as an export (C173, arbitrated)', 'effect-intent.ts/effect-reconciliation.ts are module-level only (ERR_PACKAGE_PATH_NOT_EXPORTED from an installed consumer), carry no Pi invocation id and have no caller; P07 depends on MW H02/H07 plus an export.'),
    ]
    for a, b in D:
        fh.write(f'- **{a}** - {b}\n')
    fh.write('\n## 4. Contradiction sets\n\n')
    ks = k_sets()
    fh.write(f'{len(ks)} sets in CONTRADICTIONS.md. Empirical CONTESTED premises: D6 ownership/content between the two ledgers (K004; C031/C032), the H01/H02 label referent (K002; C142/C163). Decision conflicts needing an owner ruling before any bead is keyed by the label: first-release placement (README L24 vs pi-02 L5 vs pi-05 L41), severity of D4/D10/D11/MW-I10/MW-I12 (Pi blocking vs MW P1/P2), the D7 label, lease authority vs fence enforcement (Pi vs MW Q18/Q20), the exclusivity scope (all writers vs Mechanical function invocations), refusal vocabulary (two spellings; two pi-05 codes without a pi-02 category), the V/L tier map, the Forge envelope fields behind G02/H01, the replay term (event vs effect), and three H-label numberings. Resolved on inspection: the two adjacent MW baselines (K018) and the Forge-envelope hedge (K023).\n\n')
    fh.write('## 5. Provenance / source-independence findings\n\n')
    fh.write('- The Pi program and the Mechanical companion are one authoring lineage (same author, six minutes apart); their mutual agreement is consistency, not corroboration (SOURCE-MAP L1/L2). Where they disagree, the disagreement is a decision conflict of one author, recorded in CONTRADICTIONS.md.\n')
    fh.write('- The MII baseline restates the MNI-2026-11-09 ledger over unchanged source (eleven Pi modules blob-identical between 8e2fedeb and 0fb90672); the MNI statuses transfer as the same evidence re-read, and every present-tense baseline row was re-established on the primary files and, where behaviour was claimed, on executed probes (SOURCE-MAP L3-L6).\n')
    fh.write('- Vocabulary inherited from MNI and from the November 4 program without its definitions: D-numbers, P/H labels (colliding numberings), L-tiers, MW-CONTRACT, W11, the census-narrowed sentences (SOURCE-MAP "Vocabulary inheritance").\n')
    fh.write('- Phantom-receipt and nonexistent-subpath lessons from MNI: not reproduced here - the host subpath exists and is importable (C019, C073, C214), the receipts cited exist, and the profile labels now have code witnesses (C028, C093); the surviving MNI-class defects are label-only vocabulary (profiles bind no behaviour), boundary-cell conjunction inflation (C005, C032, C035 are conjunctions with one failing conjunct each) and conflicting DAGs/labels across the two programs (C139, C141, C142, C163, C221).\n\n')
    fh.write('## 6. Propagation\n\n')
    fh.write('- Dependency hyperedges: valid joint warrants for C011 (C008+C009+C010), C033 (direct evidence independent of its REFUTED label premise C032), C048, C113, C118, C132; broken derivations for C005 (premises C006 UNSUPPORTED, C032 REFUTED; conclusion REFUTED by direct token census, not by the broken premise) and C163 (premise C142 UNSUPPORTED; conclusion UNSUPPORTED).\n')
    fh.write('- Caps checked for every row with dependencies (`propagation` field). Three rows exceed their weakest dependency on an independent warrant path, recorded on the row: C022 (absence warranted by C008/C009, not by C021), C033 (source + probes, not by C032), C159 (mechanism by source, not by C145). No status was changed by propagation.\n')
    ne_rows = [r for r in claims.values() if r['status'] == 'NON-EPISTEMIC']
    flagged = [r for r in ne_rows if r['embedded_premise_flags']]
    mix = collections.Counter(f['status'] for r in flagged for f in r['embedded_premise_flags'])
    mixtxt = ', '.join(f'{k} {v}' for k, v in mix.most_common())
    fh.write('- Normative rows (' + str(len(ne_rows)) + ') carry their embedded premises\' statuses in `embedded_premise_flags`: ' + str(len(flagged)) + ' rows carry at least one REFUTED/UNSUPPORTED/CONTESTED/UNDETERMINED premise flag from a lens (' + mixtxt + ' flags in all; for example C026/C175/C185 strict-PASS attainability UNDETERMINED, C031 D6 ownership CONTESTED, C116/C154/C156 "existing script helper behaviour" has no referent). Requirement force is a separate dimension: a mandatory guardrail may still be derived from them under RISK_CONTROL or NORMATIVE_DECISION authority, never by upgrading the premise.\n\n')
    fh.write('## 7. Linguistic-strength mismatches\n\n')
    fh.write(f"{len(state['mismatch_rows'])} rows carry a `wording_mismatch` (artifact wording stronger than its warrant, or indicative sentences in a normative row carrying flagged premises):\n\n| Claim | Status | Artifact wording | Permitted wording |\n|---|---|---|---|\n")
    for c, st, w, pw in state['mismatch_rows']:
        fh.write(f'| {c} | {st} | {esc(w)} | {esc(pw)} |\n')
    fh.write('\nRecurring promotions: documented -> implemented (H01/H02 indicative verbs in a blocking-dependency list, C227; "existing script helper behaviour", C154); some -> all (universal P03 Done "ANY stale axis", C162; "no route to an effect", C133/C134); historical -> current ("standalone native Git/Claude/Forge execution" rests on 2026-10-15 receipts, C021); label -> capability ("git-census-v1/plain-v1" validated labels, no selectable profile, C028); not found -> absent without a stated detection surface (C023-C025 bullets, cured by the M050 form).\n\n')
    fh.write('## 8. Remediation summary\n\n')
    rc = collections.Counter(k for _, k, *_r in rem_rows)
    fh.write(f"REMEDIATION.md has {len(rem_rows)} rows over {len({r[0] for r in rem_rows})} claims: " + ', '.join(f'{k} {v}' for k, v in rc.most_common()) + '. Every row is an insert annotation with the pin advance deferred to the owner (Pi Workbench). Inverse coverage: all REFUTED/UNSUPPORTED rows (C005, C006, C029, C032, C035, C095, C138, C140, C142, C163) have rows. Two EMPIRICAL_REPAIR candidates are routed to the owner (census regression; producer red tests).\n\n')
    fh.write('## 9. Unresolved / UNDETERMINED questions and what would settle them\n\n')
    fh.write('- Strict-native Forge PASS attainability in the first-release topology (C026/C175/C185 premise): one native gate.run envelope from the installed Forge on a clean committed disposable package with execution_environment.pinned true and native commit/tree/gate definition, or a joint decision that strict v1 does not require the environment pin.\n')
    fh.write('- Joined receipts beyond the two repositories (C023-C025 global reading): a census of the stores the standing census declares unread (OrchestrationEngineer ledger, home-directory Forge ledgers); the two-repository absence stands.\n')
    fh.write('- Whether GitHub Actions ran the master deposits and what it reported (C035 facet v): a run record; none in the tree.\n')
    fh.write('- The intended referent of "its completed source changes" (C006): an author file/bead list.\n')
    fh.write('- Author activity behind the self-reports (C036, C181): no committed artifact can settle it; they stay SOURCE_REPORTs.\n')
    fh.write('- Mechanical-side provenance of any Pi "November 9" source change (C006 facet ii, MW half): no Mechanical commit names a Pi November 9 bead; MW 1f29daa7 predates both programs.\n\n')
    fh.write('## 10. What the program may claim (permitted wording, consolidated)\n\n')
    for c in ['C001', 'C002', 'C003', 'C011', 'C017', 'C023', 'C033', 'C087', 'C088', 'C100', 'C117', 'C212']:
        fh.write(f"- {c}: {claims[c]['permitted_wording']}\n")
    fh.write('\nAnd may not claim, as written: that the corpus is self-contained (C005); that D8/D10/D11/D12 are described in it (C032); that there is no GitHub CI (C035, C138); that an "attached" placement exists or is in the first release (C029); that current workbench rules budget raw JSON (C095); that the November 9 program landed the protected source changes (C006); that P04 depends on "MW H01/H02" without a shared label table (C142, C163); that the strict-native first release is attainable (UNDETERMINED premise); that MW-CONTRACT ratification is enforced by the code (C050/C107 caveat).\n\n')
    fh.write('## 11. Audit limits\n\n')
    fh.write('- Verdicts are scoped to the environment pins; Pi trunk (L1089+) and MW main (0ffdc844+) continue to move; re-pin before implementation as the program itself demands (C034).\n')
    fh.write('- Executions ran on scratch copies with node v22.23.2/v24.20.0 on linux x86_64; no Forge gate was run by this audit; the installed Forge was not probed (mw-src#28).\n')
    fh.write('- Absence claims are graded over the stated surfaces only (committed trees of the two clones, tracked text, static import census); uncommitted work, other clones and dynamic code assembly are blind spots named on the rows.\n')
    fh.write('- The 13 README rows without a Phase 5 audit row were graded at consolidation from the lens rows plus spot re-verification (E465); they did not receive a separate Wave 2 rival-synthesis pass beyond what the lenses recorded.\n')
    fh.write('- Evidence records point at the Phase 3/5 lens and audit rows under epistemic-triage/.work and at the pin worktrees under pins/; both must travel with the tree (or the pins be rebuilt from the SHAs) for the `artifact` paths to resolve after the host cleaner purges scratch. Each record carries the full probe text in `summary`, so the content survives either way.\n')
    fh.write('- No numeric confidence is reported anywhere; counts by status are descriptive.\n')
    fh.write('- verdict_history entries use the workflow-specified form "graded <status> at pin pi-0fb90672/mw-69cb016d 2026-11-11"; the two arbitration entries use the skill grammar `arbitration-20261111:<STATUS>@<pin>` so the conditional ARBITRATION deliverable trigger is machine-detectable.\n')

print('markdown written')
