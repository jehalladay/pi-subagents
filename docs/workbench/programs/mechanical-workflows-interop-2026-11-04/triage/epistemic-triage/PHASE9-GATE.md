# PHASE9-GATE — audit-the-audit over `epistemic-triage/`

- Run: 2026-11-06, read-only investigator (Phase 9 gate seat); writes confined to this output tree.
- Tree audited: `/workplace/jehallad/AgentEcosystem/ForgeWorkspaces/Pi/PiSubagents/OrchestrationEngineer/scratch/mw-interop-triage/out/epistemic-triage/` (durable copy per `MANIFEST.md`: pi-subagents master `docs/workbench/programs/mechanical-workflows-interop-2026-11-04/triage/`).
- Pins honored: `doc@7c80c34346c2`, `pi@b27829e6dfa7`, `mw@f7c0a9431d6c`, `mw@0c78e253` (via `git show` in the mw pin), `triage@self` (this tree; added by fix F4). Doc byte-identity re-verified: `git -C pins/pi-b27829e6 diff --stat 7c80c34346c2 b27829e6 -- docs/workbench/programs/mechanical-workflows-interop-2026-11-04/ .agents/skills/pi-mechanical-interop/` is empty.
- Not run: Forge, vitest, npm, any live provider. All probes were `git show/log/diff/cat-file`, `ls`, `grep`, and file reads in the pins.
- Verdict: **PASS_WITH_FIXES** (gate exit 0 after the mechanical repairs below; no substantive blocker).

## 1. Checklist results

| # | Check | Method (detection model) | Result |
|---|---|---|---|
| 1 | CLAIMS.jsonl / RELATIONS.jsonl parse | `python3 -I`, `json.loads` per line (EVIDENCE.jsonl and LENSES.jsonl included) | PASS — 490, 1494, 868, 246 rows; 0 parse errors |
| 2 | Ids unique and cross-referenced | set census over ids; `support/counterevidence/anchor/cited` ⊆ EVIDENCE ids; `depends_on`/`same_origin_as` ⊆ claim ids; evidence `claims[]` ⊆ claim ids; relation `from/to_evidence_id`, `evidence[]`, C/E tokens in `tails/heads` resolve; lens `claim_ids` resolve; id regex `C\d{4,5}` (ids run C0101–C03148; a first-pass `C\d{4}` regex produced two false gaps, retracted) | PASS — 0 dangling refs after F1 |
| 3 | Every material artifact claim has a ledger row | by-doc census of 490 rows over all 6 artifact files (179/99/114/34/23/41) matches the `EPISTEMIC-AUDIT.md` §2 inventory exactly; status/kind/material censuses re-computed from the ledger match §2; exhaustiveness of Phase-1 extraction not re-performed (out of gate scope, recorded as the detection limit) | PASS (census-level) |
| 4 | Every empirical status has inspectable evidence or a named missing artifact | ESTABLISHED/SUPPORTED/PLAUSIBLE ⇒ `support[]` non-empty (0 misses); REFUTED ⇒ `counterevidence[]` non-empty (0 misses); UNDETERMINED (2) ⇒ `missing_to_settle` named (2/2); UNSUPPORTED (2) ⇒ detection model on row (2/2); every cited path resolves at its pin (868/868: 785 files, 74 probes, 9 baseline blobs) | PASS after F2–F7 |
| 5 | Quote inspection, 12 random cited pin locations | seed 20261106 over path-resolvable rows; verbatim match (whitespace-normalized, explicit `...` elision honored) at the cited lines | PASS 12/12 (E0722, E0057, E0109, E0161, E0280, E0010, E0679, E0373, E0456, E0325, E0744, E0014); the 6 repaired rows (E0354, E0628, E0729, E0747, E0760, E0761) also re-verified |
| 6 | REFUTED/UNSUPPORTED/CONTESTED ⇒ REMEDIATION row | set difference of the 16 ids (14+2+0; the CONTESTED set KU10 lives between two NON-EPISTEMIC proposals, carried by M029/C0522) against the `Claim` column | PASS — gap = ∅; forward: all 50 rows name existing ledger ids; all 48 `overclaims=true` rows covered |
| 7 | Lineages de-duplicated | `SOURCE-MAP.md` L1–L12 with same-origin families A–U; 86 `SAME_ORIGIN_AS` edges resolve; independence map lists restatements as adding no warrant; no undeclared duplicate `permitted_wording` across different propositions (gate check e: 0) | PASS |
| 8 | Contradiction sets visible | `CONTRADICTIONS.md` KU01–KU18 absorb all part-level sets; every claim id in it exists in the ledger or is an explained part-level alias (`original_id`, e.g. part-02 C0286 → C0586); KU10 recorded CONTESTED with "what would settle it" | PASS |
| 9 | Propagation re-checked for changed premises | `.propagation-report.json`: violations 0; the one regrade (C0399 ESTABLISHED→SUPPORTED, `CLAIMS.patch.jsonl`) carries its `verdict_history` entry, matches the ledger row, and has zero dependants (reverse `depends_on` scan); the 7 asymmetries and 11 above-premise conclusions each carry an independent-warrant note on the edge/row (EPISTEMIC-AUDIT §7) | PASS |
| 10 | Linguistic strength matches status | permitted wordings are sentences (0 misses); §2 permitted-language table consistent with statuses; all overclaim rows remediated (check 6); REFUTED wordings are version-split ("at MW 0c78e253 … 1f29daa7 repaired") not bare negations | PASS |
| 11 | No auditor conclusion stronger than its evidence | read of `EPISTEMIC-AUDIT.md` §1–§11 against ledger statuses; "ESTABLISHED means established by source reading at the pins" stated; run-claims capped; audit limits (§11) name the undetectable surfaces | PASS |
| 12 | Skill gate (a)–(h) | (a) REFUTED/ESTABLISHED paths resolve 176/176; (b) wordings are sentences; (c) self-referential support 0 (doc lines live in `anchor`, never `support`); (d) file-not-directory 0 after F2; (e) undeclared duplicate wordings 0; (f) every row's pin maps to a declared durable root 868/868; (g) deliverables all present; (h) string-shaped support entries 0 | PASS |
| 13 | MANIFEST records the gate result | census counts + exit appended | PASS (F12) |

## 2. Mechanical fixes applied (156 instances, receipts in `.work-phase9/fixlog.json`)

| Fix | What was wrong | Repair | Rows/edits |
|---|---|---|---|
| F1 | 98 non-material claim rows pointed at dossier files that do not exist (dossiers are scoped to the 392 material rows, per EPISTEMIC-AUDIT §11) | `dossier: null` on exactly those rows; all 392 material dossiers verified present | 98 |
| F2 | 12 evidence rows cited a bare directory (`docs/workbench/receipts/`, `qa/integration/`, `new-feedback/`, …) with a listing as quote — skill gate (d) failure | artifact rewritten to the explicit probe `ls <dir>` (the audit's own PROBE convention); quotes unchanged | 12 |
| F3 | E0354/E0628 artifact double-encoded the revision (`0c78e253:contracts/…`), unresolvable as written | prefix stripped; quotes re-verified at `git show 0c78e253:<path>` L8-9 / L12 | 2 |
| F4 | E0760/E0761 cited this audit's own part files against the working directory under pin `doc@7c80c34346c2` / type `AUDITED_PROGRAM_DOC` (both wrong; violates the durable-root rule) | repinned to new declared root `triage@self` (this tree), artifact relative, `source_type: OTHER`; quotes match part-file line 1 | 2 |
| F5 | E0729 carried a baseline quote under the moving pin `mw@f7c0a9431d6c` with free-text location `L(git show 0c78e253: lines 8-9)` | repinned to `mw@0c78e253`, `L8-9`, baseline root; verified | 1 |
| F6 | E0747 location was a symbol name `L(CompiledContext)` | `L27-31`, verified at the mw pin | 1 |
| F7 | E0781 (probe `git diff --stat f67b6665 b27829e6 -- src`) had an empty quote while supporting 8 ESTABLISHED rows | probe re-run read-only: output is empty; quote now states that result explicitly (matches its twin E0002) | 1 |
| F8 | Relation tail/from strings embedding the F2/F3 rows' old locators | exact-string sync | 6 |
| F9 | 20 relation locator strings used a verbose pin gloss `mw@0c78e253 (program baseline, via git show):` diverging from the canonical `pin:artifact:loc` form | canonicalized | 20 |
| F10 | `SOURCE-MAP.md` censuses shifted by F4/F5 | 307 doc-anchors / 354 primary-code / 9 baseline reads / 6 other; L5 130 records, dev.v1.json (10); L6 9+1; roots table gains `triage@self` | 8 |
| F11 | `REMEDIATION.md` evidence glosses of F2 rows (E0022, E0084, E0694) showed the old directory spelling | synced to the probe form | 4 |
| F12 | `MANIFEST.md` lacked the schema-required Phase 9 gate record | record appended (exit 0 + census counts) | 1 |

Backups of all pre-fix files: `.work-phase9/backup/`. No pin worktree, repo, or ledger outside this tree was written. Statuses, propositions, propositions' wordings, relations' semantics, and all markdown analysis text are unchanged — every fix is a pointer, pin, census-count, or display-string repair.

## 3. Residual observations (not blockers)

- 74 evidence rows are probe commands by design; each declares its root and carries its output as quote (EPISTEMIC-AUDIT §11 announces this convention to downstream gates).
- 27 evidence records attach to no claim row (evidence-to-evidence lineage only), documented in SOURCE-MAP §4.
- Dossier file names for g02 rows keep their part-level names (`C02nn.g02.md`), mapped from the rows' `dossier` field; all resolve.
- The `claims-part-*.jsonl`, `gen-*.py`, `lens-*.jsonl`, `contradictions-part-*` and `.work-*` files are working intermediates retained beside the deliverables; `triage@self` evidence now cites the two part files that the ledger references, so they must land with the tree.
- Phase 10 (`requirements/`) is requested by MANIFEST but correctly absent at this gate: Phase 9 precedes it.

## 4. Handoff

The tree passes the Phase 9 gate (exit 0) and is clean for the durable landing recorded in `MANIFEST.md` (pi-subagents `master`, `docs/.../mechanical-workflows-interop-2026-11-04/triage/`) and for Phase 10 requirement compilation. Landing/merge is the owner lane's step, not this gate's; nothing was committed from this seat.
