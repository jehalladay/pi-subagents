# PHASE 9 GATE — mechanical-interoperability-audit-2026-11-06 triage

Run 2026-11-07 by the Phase 9 gate investigator (read-only everywhere except this `out/` tree; nothing run beyond `python3 -I` over the triage records and read-only `git`/file reads at the pins — no Forge, no vitest, no npm, no live providers: not run).

- Inputs: `CLAIMS.jsonl` (459), `EVIDENCE.jsonl` (626), `RELATIONS.jsonl` (1458), `LENSES.jsonl` (99), `REMEDIATION.md` (23 rows M101–M123), `CONTRADICTIONS.md` (17 sets K101–K117), `dossiers/` (343), part/status/lens intermediates.
- Pins: document pin pi@d7666a76f561 (= environment pin, verified `git rev-parse HEAD` at `pins/pi-d7666a76`); mw@97e18068f399 (verified at `pins/mw-97e18068`); mw-tip@6e15a4245d3f (verified present in the mw pin's objects; file reads via `git show`). Prior ledger read AT THE PI PIN: `docs/workbench/programs/mechanical-workflows-interop-2026-11-04/triage/epistemic-triage/CLAIMS.jsonl` (490 rows).
- Gate scripts (`python3 -I`, fail-closed, each exits non-zero on a hit): `out/.phase9-work/gate01_parse_ids.py`, `gate02_wording.py`, `gate03_evidence.py`, `gate04_quotes.py`, `gate05_coverage.py`.

## Verdict: PASS (exit 0) — after 3 mechanical fixes, 0 blockers

## Checklist results

| Check | Script | Result |
|---|---|---|
| CLAIMS/RELATIONS/EVIDENCE/LENSES parse (`python3 -I`), unique ids, all cross-references resolve (support/counterevidence/anchor → E-ids; depends_on → claim ids; relation tails/heads; lens claims; evidence claims) | gate01 | PASS (after fix 1) |
| Every material claim has a ledger row: every claims-part id (123/128/87/121) maps to a merged row by (part, original_id); 459 = 459 | gate01 | PASS |
| SUPERSEDES links resolve to real C0xxx ids in the prior ledger at the pin: 626 relation edges + 621 claim-field entries → 328 distinct prior ids, all ∈ the 490-row prior ledger; tails all new-ledger ids; no prior id re-graded or renamed | gate01, gate05 | PASS |
| (h) one shape: `support[]`/`counterevidence[]` hold only EVIDENCE.jsonl ids (no bare strings/paths/objects) | gate01 | PASS — 0 string-shaped rows |
| (b) `permitted_wording` is a sentence on all 459 rows | gate02 | PASS |
| (e) duplicate wording across different propositions without a declared donor | gate02 | PASS — 0 undeclared (C1415/C1437 same-proposition pair is mutually `same_origin_as`-linked) |
| Linguistic strength matches status: SUPPORTED wordings hedged/attributive, REFUTED wordings negated, no absolute verbs on sub-ESTABLISHED rows, UNDETERMINED (none exist) would require `missing_to_settle` | gate02 | PASS |
| (a) every REFUTED/ESTABLISHED row names an existing path — extended: provenance of all 459 rows resolves at its declared pin | gate03 | PASS — anchored 459/459 |
| (c) self-reference: no ESTABLISHED/SUPPORTED/REFUTED row cites its own provenance (same artifact + overlapping location) in support/counterevidence | gate03 | PASS (after fix 2) — 0 self-referential |
| (d) evidence paths resolve to files, not directories | gate03 | PASS — FILE 549, PROBE 76 (recorded command + output quote, re-runnable), CORPUS 1, DIR 0, MISSING 0 (after fix 3) |
| (f) declared roots: every claim and evidence row declares `root`; every pin ∈ MANIFEST-recorded set {pi@d7666a76f561, mw@97e18068f399, mw-tip@6e15a4245d3f, out/epistemic-triage} | gate01, gate03 | PASS |
| Empirical statuses have inspectable evidence: ESTABLISHED/SUPPORTED ⇒ non-empty `support[]`; REFUTED ⇒ non-empty `counterevidence[]`; 21 rows carry a named `missing_to_settle` artifact | gate03 | PASS |
| Quote verification: 12 randomly chosen cited pin paths opened, quotes confirmed verbatim (seed 20261107 over the 370 cited file-backed quoted rows) | gate04 | PASS 12/12 (table below) |
| Every REFUTED/UNSUPPORTED/CONTESTED row maps to a REMEDIATION row (inverse), every REMEDIATION claim id is a ledger row (forward), `claims.remediation` ↔ row consistency; overclaims=true rows also covered | gate05 | PASS — REFUTED {C1305→M102, C1345→M101}; UNSUPPORTED/CONTESTED: none; 10 overclaims covered by rows or recorded non-action rulings |
| Lineages de-duplicated: 1 identical-proposition group (C1415/C1437), mutually linked; 60 SAME_ORIGIN_AS relations carry the one-authorial-lineage rule (Pi program / MW companion / SKILL / hosting guide) | gate05 | PASS |
| Contradiction sets visible: 17 K sets; all claim ids referenced resolve (merged ids; `(orig Cxxxx)` annotations are declared by the file header); all 87 CONTRADICTS/CONFLICTS_WITH relation endpoint pairs co-mentioned in a K set | gate05 | PASS |
| Propagation re-checked: no ESTABLISHED/SUPPORTED row `depends_on` a REFUTED row; no DERIVED_FROM/ENTAILS/JOINTLY_SUPPORTS edge from a REFUTED tail into an ESTABLISHED/SUPPORTED head (C1345's broken derivation into C1346 is re-based per its propagation note; C1305's nuance carried into C1321) | gate05 | PASS |
| (g) deliverables: MANIFEST.md, CLAIMS.jsonl, RELATIONS.jsonl, SOURCE-MAP.md, CONTRADICTIONS.md, dossiers/ (343 = 343 material, bijective), REMEDIATION.md, EPISTEMIC-AUDIT.md, EVIDENCE.jsonl all present; conditional ARBITRATION-<date>.md correctly absent (0 arbitration `verdict_history` entries; 0 rows ruled by this gate) | gate05 | PASS — 0 absent deliverables |

## Quote verification (seed 20261107, 12/12 confirmed)

| Evidence | Pin:path:loc | Result |
|---|---|---|
| E1346 | pi:…/04-implementation-program.md:35 | ok, in line window |
| E1402 | pi:docs/workbench/mechanical-function-hosting.md:13 | ok, in line window |
| E1241 | pi:qa/workbench/receipts/wb-f3wd-hx-task-scope-probe.json:observations[0] | ok (location is a JSON pointer, not a line) |
| E1277 | pi:src/workbench/execute.ts:53 | ok, in line window |
| E1024 | pi:…/01-current-system-audit.md:13 | ok, in line window |
| E1089 | pi:…/01-current-system-audit.md:34 | ok, in line window |
| E1370 | pi:…/05-qa-operator-guide.md:36 | ok, in line window |
| E1194 | mw:apps/development-rig/src/claude-implement.ts:91-92 | ok, in line window |
| E1149 | pi:…/mechanical-workflows-interop-2026-11-04/triage/epistemic-triage/CLAIMS.jsonl:C0163 | ok — structured ledger-row citation; proposition and permitted_wording segments verified field-verbatim against the C0163 row |
| E1134 | pi:…/01-current-system-audit.md:40 | ok, in line window |
| E1417 | pi:.agents/skills/pi-mechanical-interop/SKILL.md:25 | ok, in line window |
| E1044 | pi:src/workbench/collective-event.ts:2-3 | ok, in line window |

Probe reproducibility (read-only re-runs at the pins): E1002 `git diff --name-only 278c8f79 d7666a76` reproduced the recorded 10-file list exactly; E1249 `git ls-tree --name-only 97e18068 docs/programs/` reproduced the recorded 8 entries with no `pi-workbench-interoperability-audit-2026-11-06` directory at the MW baseline (the M109/K105 premise).

## Mechanical fixes applied in place (3; each repaired row carries a `phase9_fix` field)

1. `RELATIONS.jsonl` R00642/R00643/R00650/R00679: 8 g01-local evidence aliases (`E-g01:NM_89`, `E-g01:LD_531`, `E-g01:WT_GIT`, `E-g01:WT_DETACH`, `E-g01:CH_341`, `E-g01:RT_1215`, `E-g01:RT_879`, `E-g01:MW_NOV4_P0`) left un-re-keyed in hyperedge tails by the roll-up; re-keyed to E1029/E1028/E1034/E1054/E1015/E1075/E1073/E1110 by content-identical payload match (path+lines identical in `relations-part-g01.jsonl`; alias map unambiguous, 0 conflicts over 168 aliases).
2. `CLAIMS.jsonl` C14121: support id E1405 (SKILL.md:12) lies inside the row's own provenance span (SKILL.md L10-34); moved `support[]` → `anchor[]` per the roll-up's own anchor convention. 7 independent support ids remain; status unchanged (ESTABLISHED keeps independent diff/prior-text witnesses E1427–E1430, E1520). No re-grade — not an arbitration.
3. `EVIDENCE.jsonl` E1583 (TRIAGE_CORPUS_SELF): `pin`/`root` said pi@d7666a76f561 while the artifact names triage corpus files; corrected to `out/epistemic-triage` / corpus-internal, matching sibling E1582. Cited by no claim (lens-origin only).

## Non-blocking observations

- 5 SUPERSEDES relation edges have no matching claim-field entry (C1301→C03102, C1345→C0422, C1345→C0394, C1365→C0367, C1368→C0594): intentional analyzed links — the two C1345 edges carry the faithful=False regression analysis (M101/K115); all heads resolve in the prior ledger. Field (621) and relation (626) layers are deliberately asymmetric by these 5.
- `.rollup-report.json` is the roll-up's pre-gate snapshot: after fix 3 its `evidence_by_pin` is off by one (pi 481 / out 2, not 482 / 1); after fix 2, `anchor`-vs-`support` membership of E1405 likewise. Left as the roll-up's own record.
- `linguistic_strength` on claim rows holds the verbatim artifact strength marker (by design); the status-match check ran against `permitted_wording`/`permitted_language`.
- Supersession census unchanged by the gate: supersedes_faithful true 314 / false 3 / none 142; the 3 false rows (C1204, C1345, C1606) are covered by M103/M101/M111.

## Blockers

None.

## Census (recorded in MANIFEST.md)

anchored 459/459; self-referential 0 (1 found and repaired); string-shaped 0; duplicate-wording 0 undeclared (1 declared pair); absent deliverables 0. Gate exit status 0.
