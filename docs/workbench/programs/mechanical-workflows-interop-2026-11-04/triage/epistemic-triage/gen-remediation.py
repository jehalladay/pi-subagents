#!/usr/bin/env python3 -I
"""Writes REMEDIATION.md from CLAIMS.jsonl + the hand-authored repair table below (Phase 8).
Targets the program DOCS (what they may say), never the code. One row per REFUTED / UNSUPPORTED /
CONTESTED-set / overclaiming claim; the coverage check runs in both directions at the end."""
import json, re, collections
BASE = '/workplace/jehallad/AgentEcosystem/ForgeWorkspaces/Pi/PiSubagents/OrchestrationEngineer/scratch/mw-interop-triage/out/epistemic-triage/'
rows = {json.loads(l)['id']: json.loads(l) for l in open(BASE + 'CLAIMS.jsonl', encoding='utf-8')}
ev = {json.loads(l)['id']: json.loads(l) for l in open(BASE + 'EVIDENCE.jsonl', encoding='utf-8')}
SHORT = {'01-audit-and-evidence.md': '01', '02-host-architecture-and-protocol.md': '02', '03-implementation-and-qa.md': '03',
         '04-agent-handoff.md': '04', 'README.md': 'README', 'SKILL.md': 'SKILL'}

# (claim, class, existing wording (verbatim at the pin), repair, why sufficient)
R = [
 ('C0114', 'NARROW_SCOPE', 'Source implemented, tests and receipts recorded',
  'Source implemented, tests recorded; per-bead receipts under `docs/workbench/receipts/` reference the Claude host (no receipt is dedicated to the executor)',
  'Receipts exist (9 of 52 files mention the host) but none witnesses the executor as a feature; the narrowed cell says exactly what the pin holds.'),
 ('C0119', 'NARROW_SCOPE', 'nested functions', 'nested functions (one level; deeper nesting is refused)',
  'worker-source.ts refuses a second nesting level and caps the count; the qualifier restores the quantifier the cell dropped.'),
 ('C0139', 'NARROW_SCOPE', 'candidate basis and producer verification evidence',
  'candidate basis and a producer verification result (its `evidence` field is optional)',
  'contracts.ts types VerificationResult.evidence as optional; "evidence" as an unconditional output overstates the type.'),
 ('C0152', 'ADD_TEMPORAL_QUALIFIER', 'Recorded live producer receipts; not a Pi binding',
  'Recorded live producer receipts (dated 2026-10-15, three weeks before the baseline); not a Pi binding',
  'The receipts witness the rig at 2026-10-15 only; the date keeps the grade from reading as current.'),
 ('C0161', 'NARROW_SCOPE', 'None registered: no Mechanical SDK/host adapter;',
  'None registered: no Mechanical SDK dependency and no Mechanical function-host adapter (the only Mechanical-specific module is the read-only `collective.event.v1` envelope boundary `src/workbench/collective-event.ts`);',
  'The invocation-scoped absence is established at the pin; the unqualified cell invites the false reading "no Mechanical code at all".'),
 ('C0163', 'ADD_TEMPORAL_QUALIFIER', 'W11 row of `feature-matrix.md`',
  'W11 row of `feature-matrix.md` (status `planned`; the row\'s embedded grep sentence predates `collective-event.ts` and is stale)',
  'The status the audit relies on is accurate; flagging the stale detection sentence stops the row being re-cited as current evidence.'),
 ('C0167', 'DOWNGRADE_MODALITY', 'force-removes the worktree',
  'attempts to force-remove the worktree (`git worktree remove --force`, falling back to `git worktree prune`)',
  'removeWorktree swallows a failed removal and only prunes; the outcome is attempted, not guaranteed (the corrupted-link test shows a surviving directory).'),
 ('C0169', 'NARROW_SCOPE', 'The existing worktree tests explicitly exercise this outcome.',
  'The existing worktree tests assert the `hasChanges:false` report on this path and describe the destruction in comments; none asserts the removal, and they lock the lossy behaviour in rather than guard against it.',
  'Tests 413/432 assert the report half only; "exercise" must not be read as "protect against".'),
 ('C0182', 'ADD_TEMPORAL_QUALIFIER', 'W11 explicitly remains planned in the feature matrix.',
  'W11 explicitly remains `planned` in the feature matrix (bead wb-04s blocked; the row\'s detection sentence is stale at the pin).',
  'Same source report as C0163; the status is accurate and the inherited staleness is named.'),
 ('C0184', 'NARROW_SCOPE', 'accepts definition kind `function` in its model, but `src/workbench/execute-tool.ts:215-219` refuses all kinds except `script`.',
  'models definition kind `function`, while `src/workbench/execute-tool.ts:217-218` deliberately refuses all kinds except `script` (typed refusal `unsupported-definition-kind`; both halves are tested).',
  'The factual core is established; the tests on both sides show intentional model/host layering, so the "but" connotation of a defect is narrowed and the line drift (215-219 -> 217-218) is corrected.'),
 ('C0188', 'REMOVE_CLAIM', 'do not use a shell-backed `node()`',
  'ledger only: drop C0188 as an observation (the sentence is a prohibition on a remedy shape, not a description). Optional doc clarity: "do not route dispatch through `node()` (a bounded capability call) or any shell wrapper".',
  'node() dispatches a validated capabilityId through CapabilityRegistry.invoke; the doc never asserts that it is shell-backed, so the refuted proposition is the extractor\'s, not the artifact\'s.'),
 ('C0189', 'ADD_TEMPORAL_QUALIFIER', 'declares input/output schema refs as `../schemas/development-request.v1.schema.json` and `../schemas/development-outcome.v1.schema.json`',
  'declared (at MW `0c78e253`) input/output schema refs as `../schemas/development-request.v1.schema.json` and `../schemas/development-outcome.v1.schema.json`; MW `1f29daa7` (2026-11-05) rewrote them to the bare filenames',
  'True at the baseline, false at the pin (git show / git log); the version qualifier is the smallest delta that makes the sentence true at both revisions.'),
 ('C0190', 'ADD_TEMPORAL_QUALIFIER', 'and `../schemas/development-outcome.v1.schema.json`', 'same edit as C0189 (one sentence carries both refs)',
  'Same version split as C0189.'),
 ('C0193', 'ADD_TEMPORAL_QUALIFIER', 'tests construct matching descriptors by hand rather than loading the committed JSON',
  'tests constructed matching descriptors by hand at `0c78e253`; since `1f29daa7` three rig tests read the committed JSON and one drives both hosts from it over a packed tarball (not run here)',
  'The pin tests load the committed file; stating the baseline fact with its revision keeps the historical finding without asserting it of the pin.'),
 ('C0194', 'ADD_TEMPORAL_QUALIFIER', 'The as-committed descriptor therefore fails the host\'s descriptor check.',
  'At `0c78e253` the as-committed descriptor therefore failed the host\'s descriptor check; at `f7c0a943` the committed strings equal the host\'s strings.',
  'The derivation is valid at the baseline and its conclusion is contradicted at the pin by string equality; both facts belong in the sentence.'),
 ('C0195', 'ADD_TEMPORAL_QUALIFIER', '### P1: checked-in Mechanical descriptor conflicts with its own loader',
  '### P1 (repaired upstream by MW `1f29daa7`): checked-in Mechanical descriptor conflicted with its own loader at `0c78e253`',
  'The heading is read as current state; MW\'s SKILL and contracts/README record the repair at the pin.'),
 ('C0196', 'ADD_TEMPORAL_QUALIFIER', 'a descriptor built manually in tests does not establish compatibility with that file.',
  'a descriptor built manually in tests does not establish compatibility with that file (the `0c78e253` tests did this; the `f7c0a943` tests read the committed file).',
  'The conditional stays valid; its antecedent is gone at the pin, which the parenthetical records.'),
 ('C0218', 'NARROW_SCOPE', 'includes cwd/model/permissions/tools/roles/grants/principal',
  'includes cwd/model/permissions/settings/tools/roles/grants/principal',
  'replayBasis is an eight-element literal; the list omitted `settings` (settingSources names). Completing the enumeration is the whole repair.'),
 ('C0229', 'ADD_TEMPORAL_QUALIFIER', 'with no general host-supplied AbortSignal in its public options',
  'with (at `0c78e253`) no host-supplied AbortSignal in its public options; MW `f7c0a943` adds `signal?: AbortSignal` honoured only as a pre-dispatch barrier and not forwarded to the SDK, so mid-run cancellation is still absent',
  'The presence clause is false at the pin while the "no general (mid-run) cancellation" reading survives; the qualifier states both.'),
 ('C0231', 'ADD_MISSING_PREMISE', 'Pi\'s `node()` default registry deadline is 30 seconds and cannot substitute for an async, observable function launch.',
  'Pi\'s `node()` is a single bounded request/response capability call (default registry deadline 30 s, configurable) with no mid-run observation or control surface, so it cannot substitute for an async, observable function launch.',
  'The load-bearing premise (one value, no mid-run control) was unstated and the 30 s figure is adjustable; develop() duration is unmeasured, so the conclusion rests on the structural premise.'),
 ('C0248', 'NARROW_SCOPE', 'Mechanical `renderTaskContext` expects a nonempty committed `render_id`',
  'Mechanical `renderTaskContext` expects a nonempty `render_id` (a committed render: its rf argv omits `--no-commit`)',
  '"committed" is inferred from the argv shape, not checked explicitly; the parenthetical shows the inference.'),
 ('C0251', 'REPLACE_SOURCE', 'its documented proof contract',
  'the rig adapter\'s enforced RF-context requirements (`apps/development-rig/src/rf-context.ts`: nonempty `render_id`, task/revision text, provenance/budget witness; receipt rule in MW `docs/07`)',
  'No MW document names a "proof contract" for compileContext (grep 0 hits); the requirements exist in code in the rig adapter and are documented only as the RF-id receipt rule.'),
 ('C0252', 'NARROW_SCOPE', 'Reusing Pi\'s preview response as Mechanical\'s authoritative `compileContext` would break its documented proof contract.',
  'Reusing Pi\'s preview response as the rig\'s `renderTaskContext`-backed `compileContext` would fail its RF-context checks (`RF_CONTEXT_UNESTABLISHED`: `render_id` null); the `develop()` `compileContext` port itself checks only basis equality.',
  'The prediction is sound for the rig adapter and does not follow for the port; naming the referent removes the equivocation.'),
 ('C0261', 'NARROW_SCOPE', '`new Semaphore(options.concurrency ?? ...)` can otherwise accept zero',
  '`new Semaphore(options.concurrency ?? ...)` can otherwise accept zero (no production caller passes `options.concurrency` and the default clamps to [1,16]; the exposure is programmatic/test-only)',
  'The constructor fact is established; the scope note prevents a reader inferring a live misconfiguration path.'),
 ('C0264', 'ADD_TEMPORAL_QUALIFIER', 'Review recent `new-feedback/` findings on shared census edit conflicts, test deadline inflation, report-mode readers and prep bottlenecks',
  'Review `new-feedback/` findings (2026-10-20 to 2026-11-03, one flywheel-seat lineage) on shared census edit conflicts, Vitest default-timeout reds (October files), report-mode census readers (October files) and prep bottlenecks',
  'The deadline and report-mode topics are in October files outside the 11-01..03 window the method line names, and n=3/n=4 counts are one lineage; the dates and lineage make "recent" honest.'),
 ('C0265', 'ADD_TEMPORAL_QUALIFIER', 'report-mode readers', 'report-mode census readers (October files) -- same edit as C0264',
  'Same temporal and lineage defeaters as C0264.'),
 ('C0277', 'ADD_TEMPORAL_QUALIFIER', 'The Mechanical descriptor path discrepancy is independently checkable against the exact committed JSON and TypeScript host;',
  'The Mechanical descriptor path discrepancy (present at `0c78e253`, repaired by `1f29daa7`) is independently checkable against the exact committed JSON and TypeScript host, and at `f7c0a943` the check yields a match;',
  'The meta-claim is true; the sentence presupposes a current discrepancy that the pin refutes.'),
 ('C0521', 'NARROW_SCOPE', '// from installed verified descriptor',
  '// from the committed descriptor (`contracts/entrypoints/development.v1.json`, self-described `descriptor-only`; install flow verified in tests, not a standing installed artifact)',
  'The id exists verbatim in the committed file and host constant; "installed verified" overstates the descriptor\'s own status field.'),
 ('C0522', 'SURFACE_DISAGREEMENT', 'profile: "git-census" | "native-task-scope";',
  'profile: "git-census" | "native-task-scope"; // MW counterpart doc (02-binding-and-packaging-contract.md:25) names this field `mode`; choose one name before implementation',
  'Both halves of the program propose the same value set under different field names (KG02-03); the disagreement must be visible until one name is adopted. Tracker: program owner.'),
 ('C0530', 'ADD_TEMPORAL_QUALIFIER', 'Mechanical checks the descriptor schema names in `invokePinnedDevelopment` and ships relative schema paths.',
  'Mechanical checks the descriptor schema names in `invokePinnedDevelopment`; at `0c78e253` it shipped relative (`../schemas/`) paths, repaired to bare filenames by `1f29daa7` (2026-11-05), so the canonical grammar below is partly adopted upstream.',
  'Present-tense "ships" is false at the pin; the proposal that follows is partly realized, which the sentence should say.'),
 ('C0534', 'MARK_AS_DEFINITION', 'Pi consumes the canonical exported descriptor without hardcoded tests that substitute a hand-authored object.',
  'Pi must consume the canonical exported descriptor and must not add tests that substitute a hand-authored object (the hand-authored descriptor tests were MechanicalWorkflows\', made file-driven by `1f29daa7`; Pi has none).',
  'Stated as a requirement the sentence asserts nothing false; the implicit existence premise misattributes MW\'s baseline tests to Pi.'),
 ('C0305', 'ADD_TEMPORAL_QUALIFIER', 'Pin baseline, reconcile descriptor canonicalization and host ABI; signed-off audit inventory',
  'Pin baseline; confirm the descriptor/host schema-ref reconciliation that landed upstream (MW `1f29daa7`) and adopt its grammar; signed-off audit inventory',
  'The PI-0 deliverable presupposes a current mismatch; at the pin the strings match byte-for-byte.'),
 ('C0312', 'ADD_MISSING_PREMISE', 'Correct four callbacks',
  'ledger only: depends_on C03111 (four outcome variants) -> C0547 (DevelopmentServices declares discover/compileContext/implement/verify) and the descriptor `bindings` array; doc wording unchanged',
  'Outcomes and callbacks are distinct four-member sets; the callback count is established directly from contracts.ts 47-52 and development.v1.json 10-15.'),
 ('C0315', 'ADD_SOURCE', 'Versioned, independently importable `develop` host binding from its rig',
  'Versioned, independently importable `develop` host binding from its rig (today `@mechanical/development-rig` exposes only a `bin`, no `main`/`exports`; tests deep-import `dist/`)',
  'The deliverable presupposes the binding is not importable; citing the package.json fact grounds it and notes that deep imports already work.'),
 ('C0320', 'ADD_MISSING_PREMISE', 'using explicit `git-census` profile',
  'using the existing tracked-file census path of `developLive` (`discovery: "git-tracked-files"`), which this program labels `git-census` (no such selector ships at MW `f7c0a943`)',
  'No git-census identifier or profile selector exists in MW source; the mechanism exists and the label is the program\'s proposal.'),
 ('C0321', 'PRESERVE_AS_UNDETERMINED', 'First actual Pi → Mechanical `develop`',
  'First Pi → Mechanical `develop` witnessed in-repo (neither repository holds a receipt of any prior run; runs outside the repos were not checked)',
  'The repo detector supports the in-repo absence; the historical quantifier "first ever" needs a producer-side journal census that does not exist here.'),
 ('C0336', 'ADD_TEMPORAL_QUALIFIER', '1. Fix Mechanical checked-in descriptor versus `entrypoint-host.ts` comparison; test exactly checked-in descriptor and a packed tarball.',
  '1. Confirm the MW repair of the checked-in descriptor versus `entrypoint-host.ts` (`1f29daa7`: bare filenames; tests now read the committed file and a packed tarball, not run here) and keep the file-driven tests.',
  'The unblocker is already landed upstream; the pin strings match and three tests read the committed file.'),
 ('C0338', 'ADD_TEMPORAL_QUALIFIER', 'test exactly checked-in descriptor and a packed tarball', 'same edit as C0336 (one unblocker line)',
  'Three rig tests at the pin load development.v1.json; the "constructed approximation" existed only at the baseline.'),
 ('C0346', 'NARROW_SCOPE', '4. Fix loss of modified worktrees in `cleanupWorktree`',
  '4. Fix `cleanupWorktree`\'s failure path, which force-removes a modified worktree and reports `hasChanges:false` when the preservation commit or branch step fails (the normal path commits and branches before removal)',
  'Loss is conditional on a preservation error; 01 says "may discard ... on preservation errors" and 03 dropped the condition.'),
 ('C0353', 'NARROW_SCOPE', 'test skip/retry and workflow cancel while startup is parked',
  'test per-agent skip/retry (the suspected gap: no controller exists during the await) and workflow cancel (already re-checked after the await and covered by fault test F10; keep as a control) while startup is parked',
  'The race is per-agent only; run-level cancel is re-checked at claude-host.ts:215 and tested; the hypothesis stays unreproduced.'),
 ('C0356', 'NARROW_SCOPE', 'current git-census mode', 'current tracked-file census mode of `developLive` (called `git-census` here; the separate `live-composition` root wires HX task scope)',
  'The mode holds for developLive, not for every rig entrypoint, and the name is the program\'s label.'),
 ('C0368', 'PRESERVE_AS_UNDETERMINED', 'transport 0 with failed gate',
  'transport exit 0 with a failed gate (simulated mutant; whether native Forge ever produces this pairing is not established here)',
  'A QA negative may simulate an upstream combination; whether Forge realizes it needs the Forge producer contract or a live transcript, neither pinned here.'),
 ('C03106', 'DOWNGRADE_MODALITY', 'Working Pi *script* workflows do not regress',
  'Existing Pi *script* workflows (source implemented, tests recorded; not run for this audit) do not regress',
  '"Working" asserts current runtime success that the program itself says it did not run; the qualifier matches 01\'s own grade.'),
 ('C03141', 'REMOVE_CLAIM', 'A README that calls a future invocation runnable or hides its missing grant/host implementation.',
  'ledger only: drop C03141 as an existence observation; the line is a prohibited pattern. Doc unchanged. (Out of scope note: MW README:47 still states the descriptor mismatch in the present tense at mw@f7c0a943.)',
  'The handoff names no README instance; the surveyed READMEs disclaim runnable Pi integration.'),
 ('C0402', 'ADD_TEMPORAL_QUALIFIER', '**Audit baseline (2026-11-04):**',
  '**Audit baseline (2026-11-04 US-Pacific; Pi `f67b6665` committed 2026-11-05 05:57Z, MW `0c78e253` committed 2026-11-02 21:17Z):**',
  'The date holds only in the author\'s -0800 zone; a UTC reader finds no f67b6665 on 2026-11-04.'),
 ('C0409', 'DOWNGRADE_MODALITY', 'no new test, live integration, Forge gate or benchmark ran in preparation for these docs',
  'by the authors\' account no new test, live integration, Forge gate or benchmark ran in preparation for these docs (the program commit is docs-only)',
  'A self-report; the docs-only commit is consistent with it but cannot exclude unrecorded runs.'),
 ('C0422', 'NARROW_SCOPE', 'No GitHub CI; use Forge for the primary gate',
  'Do not add or rely on GitHub CI for this program (Pi\'s pre-existing `.github/workflows/ci.yml` is out of scope); use Forge for the primary gate',
  'Read as an inventory statement "No GitHub CI" is false for Pi at the pin; read as a program rule it is consistent with AGENTS.md.'),
 ('C0437', 'ADD_TEMPORAL_QUALIFIER', 'Mechanical\'s checked-in descriptor and its entrypoint host disagree about schema reference spelling. Test the checked-in file, not a constructed approximation.',
  'Mechanical\'s checked-in descriptor and its entrypoint host disagreed about schema reference spelling at `0c78e253`; they agree since MW `1f29daa7` (bare filenames). Keep testing the checked-in file, not a constructed approximation.',
  'The SKILL "Actual current state" bullet is stale against the MW pin and contradicts MW\'s own skill line 14.'),
 ('C0443', 'NARROW_SCOPE', 'The live Mechanical Git-census mode is real but not certified task-scoped HX.',
  'Mechanical\'s `developLive` tracked-file census (called Git-census here; no selectable profile ships) is implemented, with 2026-10-15 rig receipts, but it is not certified task-scoped HX.',
  '"real" is true of the mechanism, not of a named profile; "operates" rests on historical receipts, nothing was run.'),
 ('C0446', 'NARROW_SCOPE', 'No Pi-to-Mechanical end-to-end acceptance has been witnessed.',
  'No Pi-to-Mechanical end-to-end acceptance receipt exists in either repository.',
  'The detector is file-based over the two pins; external witnesses (ledger, S3 receipts, transcripts) were not searched.'),
]

ids = [r[0] for r in R]
assert len(ids) == len(set(ids)), 'duplicate remediation rows'
for cid in ids:
    assert cid in rows, cid

def ev_cell(r):
    pref = (r['counterevidence'] + r['support']) if r['status'] in ('REFUTED', 'UNSUPPORTED') else (r['support'] + r['counterevidence'])
    out = []
    for eid in pref:
        e = ev[eid]
        if e['pin'] == 'doc@7c80c34346c2':
            continue
        out.append(f"{eid} ({e['pin']}:{e['artifact']}{':' + e['location'][1:] if e['location'] else ''})".replace('|', '\\|'))
        if len(out) >= 3:
            break
    return '<br>'.join(out) if out else '(anchor only)'

lines = []
lines.append('# REMEDIATION — Pi ↔ MechanicalWorkflows interop design program (doc@7c80c34346c2)')
lines.append('')
lines.append('Scope: what the program DOCS may say. Every repair is a wording change to a pinned program file (or a ledger-only correction where the defect is the extraction, not the artifact); no row touches code. Pins: artifact `doc@7c80c34346c2`, environment `pi@b27829e6dfa7` / `mw@f7c0a9431d6c`; program baselines pi `f67b6665` / mw `0c78e253`. Nothing was run for this audit.')
lines.append('')
lines.append('Landing: the docs at `7c80c34346c2` live on pi-subagents `master`; the repairs below are exact replacement wordings for a docs-only follow-up commit. No tracker issue is filed by this roll-up (`Tracker` = `none`); Phase 10 is expected to file `wb-` beads. Rows whose `Repair` begins with `ledger only:` change `CLAIMS.jsonl` wording/edges and leave the artifact unchanged.')
lines.append('')
lines.append(f'Rows: {len(R)} = 14 REFUTED + 2 UNSUPPORTED + 1 CONTESTED set (C0522, KG02-03) + {len(R) - 17} further rows flagged `overclaims=true` (the REFUTED/UNSUPPORTED rows that also overclaim are counted once).')
lines.append('')
lines.append('| ID | Claim | Status | Class | Where | Existing wording | Repair | Why sufficient | Evidence | Tracker |')
lines.append('|---|---|---|---|---|---|---|---|---|---|')
for i, (cid, cls, existing, repair, why) in enumerate(R, 1):
    r = rows[cid]
    where = f"{SHORT[r['provenance']['artifact'].split('/')[-1]]}:{r['provenance']['location'] or ''}"
    st = r['status'] + (' (set KG02-03 CONTESTED)' if cid == 'C0522' else '') + (' / overclaims' if r['overclaims'] and r['status'] not in ('REFUTED', 'UNSUPPORTED') else '')
    esc = lambda s: s.replace('|', '\\|').replace('\n', ' ')
    lines.append(f"| M{i:03d} | {cid} | {st} | {cls} | {where} | {esc(existing)} | {esc(repair)} | {esc(why)} | {ev_cell(r)} | none |")

lines.append('')
lines.append('## Coverage check (both directions)')
req = sorted([c for c, r in rows.items() if r['status'] in ('REFUTED', 'UNSUPPORTED', 'CONTESTED')], key=lambda x: int(re.sub(r'\D', '', x)))
oc = sorted([c for c, r in rows.items() if r['overclaims']], key=lambda x: int(re.sub(r'\D', '', x)))
missing_req = [c for c in req if c not in ids]
missing_oc = [c for c in oc if c not in ids]
fwd_bad = [c for c in ids if c not in rows]
lines.append('')
lines.append(f'- Forward: every `Claim` id above is a `CLAIMS.jsonl` row: {"PASS" if not fwd_bad else "FAIL " + str(fwd_bad)}.')
lines.append(f'- Inverse (required set): REFUTED/UNSUPPORTED/CONTESTED ids in `CLAIMS.jsonl` ({len(req)}: {", ".join(req)}) minus `Claim` column = {missing_req if missing_req else "{} (empty) -> PASS"}.')
lines.append(f'- Inverse (overclaims): `overclaims=true` ids ({len(oc)}) minus `Claim` column = {missing_oc if missing_oc else "{} (empty) -> PASS"}.')
lines.append('- Re-entrancy: any later status change (Phase 9 overturn, regrade at a new pin, arbitration) re-runs both directions; new rows append here or to `REMEDIATION-ADDENDUM-<date>.md`.')
lines.append('')
lines.append('## Repairs grouped by artifact line (one edit can discharge several rows)')
by_line = collections.defaultdict(list)
for cid, cls, existing, repair, why in R:
    r = rows[cid]
    by_line[(SHORT[r['provenance']['artifact'].split('/')[-1]], r['provenance']['location'] or '')].append(cid)
order = {'README': 0, '01': 1, '02': 2, '03': 3, '04': 4, 'SKILL': 5}
for (doc, loc), cids in sorted(by_line.items(), key=lambda kv: (order[kv[0][0]], int((re.findall(r'\d+', kv[0][1]) or ['0'])[0]))):
    lines.append(f'- `{doc}` {loc}: {", ".join(cids)}')
lines.append('')
lines.append('## Not repaired here (recorded for the owner)')
lines.append('- NON-EPISTEMIC rows whose motivating premise is stale or absent at the pin are discharged by the line edits above (same line): C0302/C0316 (03:7, 03:10), C0337 (03:18), C0438 (SKILL:14), C0531/C0535/C0536/C0533 (02:48), C0197/C0199 (01:29-31), C0347 (03:21). Their requirement force is unchanged.')
lines.append('- MW-side staleness is outside this artifact: `mw@f7c0a9431d6c` `README.md:47` still states the descriptor/loader mismatch in the present tense while `.agents/skills/mechanical-pi-host/SKILL.md:14` and `contracts/README.md:13` record the repair.')
lines.append('- The W11 row of `docs/workbench/feature-matrix.md:112` carries a detection sentence that is false at the pin (and was already false at the baseline); refreshing it is a feature-matrix edit, not a program-doc edit.')
lines.append('- C0399 (03:50) was regraded ESTABLISHED -> SUPPORTED by cross-group propagation (CLAIMS.patch.jsonl); its wording is a topic list without a time claim, so no doc edit is owed; the permitted wording on the row carries the dates and lineage.')

open(BASE + 'REMEDIATION.md', 'w', encoding='utf-8').write('\n'.join(lines) + '\n')
print('rows', len(R), 'required', len(req), 'missing_req', missing_req, 'missing_oc', missing_oc)
