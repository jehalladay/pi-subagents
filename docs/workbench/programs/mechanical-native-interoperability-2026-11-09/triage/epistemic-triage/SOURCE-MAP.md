# SOURCE-MAP — evidence lineages of the mechanical-native-interoperability-2026-11-09 ledger

Pins: Pi env `8e2fedeb8e3ce7d94c2d3724a6ef7e2c5eb02164`; MW env `62a10b5924ccb10db428999cb148fa23f732e4fe`; Pi doc commit `b085c34ed01cb71ce0d600ac98ade7ee18e832f0`; MW sibling doc commit `7f3809fd8d6f20d22b9b4b81b6dfdb917bcc3c73`.

## How evidence paths resolve (durable rule)

Every evidence string in `CLAIMS.jsonl`/`RELATIONS.jsonl` names a pinned object, so it resolves without the scratch worktrees:

- `pins/pi-8e2fedeb/<path>:<line>`, `pi-8e2fedeb <path>`, `Pi@8e2fedeb <path>` ≡ Pi-subagents `git show 8e2fedeb:<path>` (line numbers at that blob).
- `pins/mw-62a10b59/<path>`, `MW@62a10b59 <path>`, `mw-62a10b59 <path>` ≡ MechanicalWorkflows `git show 62a10b59:<path>`.
- `docs/pi-README.md`, `pi-01-AUDIT-AND-PROTOCOL.md:<n>`, `pi-02 L<n>`, ... ≡ Pi-subagents `git show b085c34e:docs/programs/mechanical-native-interoperability-2026-11-09/{README,01-AUDIT-AND-PROTOCOL,02-IMPLEMENTATION-PACKAGES,03-VERIFICATION-AND-RELEASE}.md` (sha256 prefixes 10c0c7d9fe95, 04daed2d2e6a, 4d9f748a12ca, 5495723c3d03 — verified byte-identical to the deposited copies, lens-temporal row 12).
- `docs/mw-README.md`, `mw-01-AUDIT-AND-CONTRACT.md:<n>`, `mw-02 L<n>`, ... ≡ MechanicalWorkflows `git show 7f3809fd:docs/programs/pi-native-interoperability-2026-11-09/{README,01-AUDIT-AND-CONTRACT,02-IMPLEMENTATION-PACKAGES,03-VERIFICATION-AND-RELEASE}.md`.
- `b085c34e <path>` / `pi-prog-b085c34e` ≡ Pi-subagents `git show b085c34e:<path>`; `7f3809fd <path>` ≡ MW `git show 7f3809fd:<path>`.
- `.work/run-8e2fedeb/vitest-c179-c261.log`, `vitest-c262.log`, `build.log`, `PIN_SHA.txt` ≡ `epistemic-triage/evidence/run-8e2fedeb/` (copied into the deliverable tree; sha256 prefixes 08a8655cf617e864, c115a0e47d373a0d, fa353a9b6457f8ab, f474eb4785b31840). The run used a scratch `git archive` of 8e2fedeb with the lock-matching node_modules and Node v24.20.0; it executed 9+9 selected suites, not the full gate.
- History doc paths (`docs/workbench/programs/mechanical-workflows-interop-2026-11-04/...`, `.../mechanical-interoperability-audit-2026-11-06/...`, `.../bead-machine-field-convergence-2026-11-07/...`, `docs/workbench/feature-matrix.md`, `docs/workbench/receipts/*.md`) resolve at Pi `8e2fedeb` unless the row says otherwise.
- Durable location of this ledger (MANIFEST): Pi-subagents `docs/workbench/programs/mechanical-native-interoperability-2026-11-09/epistemic-triage/` on a workbench docs branch pushed to origin. The scratch tree is not durable.

## Lineage census (one claim may rest on several lineages)

| Lineage | Claims | Count |
|---|---|---|
| Pi environment pin `8e2fedeb` (source/test/doc reads inside pins/pi-8e2fedeb) | C004, C005, C014, C015, C016, C017, C018, C019, C020, C021, C022, C023, C024, C025, C026, C031, C032, C033, C035, C036, C037, C038, C039, C042, C043, C044, C046, C047, C048, C051, C052, C053, C054, C055, C056, C057, C058, C059, C060, C061, C062, C063, C064, C065, C066, C067, C068, C069, C070, C071, C072, C073, C074, C075, C076, C077, C078, C079, C080, C081, C082, C083, C085, C086, C087, C088, C089, C090, C091, C092, C093, C094, C096, C097, C099, C100, C107, C115, C117, C118, C119, C121, C124, C126, C133, C134, C135, C142, C149, C150, C151, C153, C154, C155, C156, C157, C158, C161, C168, C170, C171, C172, C173, C175, C176, C177, C178, C179, C180, C182, C183, C184, C188, C189, C190, C191, C193, C194, C195, C197, C198, C201, C205, C209, C211, C213, C214, C216, C227, C234, C235, C237, C240, C246, C248, C253, C256, C257, C259, C261, C262, C264, C265, C274, C277, C280, C281, C282, C285, C287 | 150 |
| MW environment pin `62a10b59` (source/test/contract reads inside pins/mw-62a10b59) | C001, C002, C003, C027, C028, C029, C030, C031, C032, C033, C034, C036, C037, C041, C060, C077, C078, C081, C090, C091, C092, C095, C096, C097, C098, C100, C102, C103, C107, C110, C111, C113, C116, C130, C134, C135, C137, C151, C165, C169, C172, C184, C185, C186, C199, C202, C204, C205, C212, C216, C218, C236, C238, C239, C244, C254, C260, C266, C267, C275 | 60 |
| History docs and git objects (2026-11-04/-06/-07 program dirs, BEAD-PLAN, feature-matrix W11, receipts, named fix commits) | C022, C026, C027, C030, C032, C037, C039, C042, C043, C044, C045, C046, C047, C048, C049, C051, C062, C063, C064, C065, C067, C070, C076, C080, C081, C082, C083, C084, C085, C086, C087, C088, C089, C090, C093, C094, C095, C096, C097, C099, C100, C145, C146, C148, C153, C154, C155, C156, C157, C160, C161, C173, C180, C204, C216, C218, C275, C277, C280, C285, C287 | 61 |
| Git topology reads (rev-list, merge-base, first-parent chains, commit dates) across the Pi/MW pins | C009, C010, C012, C027, C049, C050, C067, C076, C082, C085, C097, C099, C145, C151, C170, C180 | 16 |
| MW sibling program text (mw-README/01/02/03 at 7f3809fd) — the only independent documentary witness for joint claims | C001, C002, C003, C008, C010, C027, C028, C029, C030, C031, C033, C034, C036, C037, C041, C050, C063, C090, C092, C095, C096, C097, C098, C102, C103, C108, C109, C111, C112, C113, C114, C116, C118, C130, C131, C147, C163, C164, C165, C166, C169, C172, C184, C185, C186, C192, C199, C202, C203, C204, C205, C212, C218, C219, C223, C236, C238, C239, C244, C254, C260, C266, C267, C268, C275, C278, C288 | 67 |
| The audited Pi program text itself (pi-README/01/02/03 at b085c34e) — same-origin with the claim; counts as provenance, not corroboration | C001, C004, C006, C007, C010, C011, C025, C033, C036, C040, C041, C042, C049, C050, C063, C083, C089, C093, C100, C102, C108, C109, C110, C112, C114, C116, C118, C131, C143, C147, C148, C151, C163, C164, C165, C166, C167, C186, C192, C203, C205, C207, C221, C223, C236, C239, C240, C254, C267, C275, C278, C280, C288 | 53 |
| Pi doc-commit tree `b085c34e` (drift checks only: blob identity, 25-path diff) | C001, C008, C009, C010, C012, C013, C015, C021, C031, C032, C037, C038, C039, C040, C042, C043, C046, C047, C048, C050, C051, C052, C053, C054, C055, C056, C057, C058, C059, C060, C061, C062, C063, C064, C065, C066, C067, C068, C069, C070, C071, C072, C073, C074, C075, C076, C077, C078, C079, C080, C081, C082, C083, C084, C085, C086, C087, C088, C089, C090, C091, C092, C093, C094, C096, C097, C099, C100, C106, C107, C109, C115, C117, C119, C121, C124, C126, C133, C134, C135, C137, C141, C142, C143, C144, C145, C146, C149, C151, C160, C161, C165, C171, C172, C184, C205, C240, C255, C261, C265, C268, C277, C283, C285 | 104 |
| Audit-side scratch run of selected vitest suites at 8e2fedeb (evidence/run-8e2fedeb/*.log) — audit evidence, not program evidence | C083, C179, C213, C260, C261, C262, C264, C281 | 8 |
| No evidence lineage (normative/proposal/definition rows graded NON-EPISTEMIC) | C101, C104, C105, C120, C122, C123, C125, C127, C128, C129, C132, C136, C138, C139, C140, C152, C159, C162, C174, C181, C187, C196, C200, C206, C208, C210, C215, C217, C220, C222, C224, C225, C226, C228, C229, C230, C231, C232, C233, C241, C242, C243, C245, C247, C249, C250, C251, C252, C258, C263, C269, C270, C271, C272, C273, C276, C279, C284, C286, C289 | 60 |

### Epistemic rows whose recorded evidence is documentary only (program text / sibling text), no pin read

C147, C164, C166, C207, C221

These rows are about what the documents say, about their mutual consistency, or are analytic inferences; their status is bounded to the documentary surface and none of them asserts anything ESTABLISHED about runtime behaviour.

## Which rows the two environment pins actually carry

- Pi pin only (127): C004, C005, C014, C015, C016, C017, C018, C019, C020, C021, C022, C023, C024, C025, C026, C035, C038, C039, C042, C043, C044, C046, C047, C048, C051, C052, C053, C054, C055, C056, C057, C058, C059, C061, C062, C063, C064, C065, C066, C067, C068, C069, C070, C071, C072, C073, C074, C075, C076, C079, C080, C082, C083, C085, C086, C087, C088, C089, C093, C094, C099, C115, C117, C118, C119, C121, C124, C126, C133, C142, C149, C150, C153, C154, C155, C156, C157, C158, C161, C168, C170, C171, C173, C175, C176, C177, C178, C179, C180, C182, C183, C188, C189, C190, C191, C193, C194, C195, C197, C198, C201, C209, C211, C213, C214, C227, C234, C235, C237, C240, C246, C248, C253, C256, C257, C259, C261, C262, C264, C265, C274, C277, C280, C281, C282, C285, C287
- MW pin only (37): C001, C002, C003, C027, C028, C029, C030, C034, C041, C095, C098, C102, C103, C110, C111, C113, C116, C130, C137, C165, C169, C185, C186, C199, C202, C204, C212, C218, C236, C238, C239, C244, C254, C260, C266, C267, C275
- Both pins (23): C031, C032, C033, C036, C037, C060, C077, C078, C081, C090, C091, C092, C096, C097, C100, C107, C134, C135, C151, C172, C184, C205, C216

## Apparent corroborations that are SAME_ORIGIN (count as one lineage)

### S01 — C036, C037, C108, C109, C116, C204, C218, C275
mechanical.pi-host/v1 contract name and the evidenceProfile/contextProfile vocabulary (git-census-v1, hx-task-scope-v1, plain-v1, rf-committed-v1) were first proposed in the 2026-11-06 MW/Pi program docs (mw-62a10b59 docs/programs/pi-workbench-interoperability-audit-2026-11-06/02-host-contract.md:7-17; .agents/skills/mechanical-pi-host/SKILL.md:24) and re-proposed by both 2026-11-09 programs: three doc generations, one lineage, zero code witnesses (lens-mw-side rows 15-16).

### S02 — C062, C063
mw-01:24 ('FUNCTION_ACTION_CONTRACT is unadopted pending joint action grammar') is a same-day report ABOUT Pi's function-authority.ts; it restates the Pi source fact and the BEAD-PLAN MW-CONTRACT label (lens-negative-ev row 5; audits inventory/joint-mw).

### S03 — C039, C093, C118
The miscount 'three-colon example' (pi-01:28) / 'three-part spelling' (pi-README:31) / 'no three-colon permission' (mw-02:35) is one shared wording defect across both programs about the two-colon example mechanical:develop:write (lens-mw-side row 17).

### S04 — C002, C028, C029
'reviewed' (pi-README:7), 'packed local host' (pi-README:24) and 'proven packaged host' (mw-README:26) are program designations repeated across the paired docs, not recorded review/packaging receipts; MW's SKILL.md:14-15 is the only producer-side self-description and bounds them.

### S05 — C049, C050, C147, C221
The evidence footer (pi-README:47), 'No commands in this plan were executed' (pi-03:3) and 'Current evidence is L0 plus historical...' (pi-01:134) are the same author's self-report of the program's own evidence base; they corroborate one another only as one lineage.

### S06 — C046, C080, C285
qa/workbench/mwi-release.mjs READS docs/workbench/feature-matrix.md's W11 row (lens-lineage rows 5-6): validator and matrix agree by construction, one lineage.

### S07 — C059, C091, C184
test/fixtures/mw-development-entrypoint-v1.json is a byte copy (sha256 68cc312b...) of mw-62a10b59 contracts/entrypoints/development.v1.json; Pi's descriptor tests and MW's descriptor are the same bytes (lens-mw-side row 3).

### S08 — C166, C203, C205
pi-02's P07 heading, gate and dependency list are one authorial lineage about M05/M06 and the live receipt; the MW program (mw-02:72-84) is the independent producer-side witness that contradicts them.

### S09 — C022, C023, C024, C026, C047, C082, C097, C180
The three 'historical defects' and their fixes are attested by Pi git history (e76448ea, 1c3cc1a4, 59da7d84/wb-a2g.5) and by the 11-04/11-06/11-07 program docs that described them open; the docs are downstream of the same repo history, so history+docs count as one lineage per defect, with the git objects as the primary witness.

## Independent witnesses that genuinely corroborate

- Pi refusal of `function` at the registered route (C015/C055) is witnessed by Pi source (`execute-tool.ts:218`), by Pi's own tests (`workbench-function-authority.test.ts:1669-1689`), by MW's skill (`SKILL.md:13` 'contains no registered Mechanical binding') and by MW's sibling doc (mw-01:24 'not called by registered function execution') — code and two separate-repo documents: three lineages.
- The four-callback / four-outcome contract (C003, C130) is witnessed by MW code (`contracts.ts:47-58`) and by the committed descriptor (`development.v1.json` bindings) — two artifacts of one repo at one pin; the descriptor is the producer's own declaration, so this is one lineage with two surfaces.
- The worktree/grants/abort fixes (C022–C024) are witnessed by git objects (fix commits), by tests at the pin, and by the audit-side scratch run — three evidence classes, one of which (the run) is independent of the program's authors.
- The descriptor repair (C027/C090/C097) is witnessed by MW commit 1f29daa7, by the committed bytes, and by Pi's byte-identical vendored fixture (the fixture is a copy, so Pi adds no independent witness).

## Negative-evidence rows and their detection models

Every 'no X exists' row in the ledger is bounded to a searched surface recorded in its evidence or in the lens row it cites (RELATIONS.jsonl `detectionModel`). Principal detectors: fixed-string/regex `git grep` over Pi `src/` (123 .ts files) and `test/`, `qa/`; symbol and module-specifier greps for importers; `ls` of `src/workbench/hosts/`; `git diff --name-status 8e2fedeb..b085c34e` (25 paths); MW `git grep` over apps/packages/contracts/scripts/qa/skills/.agents/examples; JSON parse of `apps/development-rig/package.json`. Rows that exceed any greppable surface (C068 'full crash/power-loss handling', C030 'stable' as a quality word, the 'host death' member of C089) are marked UNDETERMINED or carried as hedged wording, never promoted to ESTABLISHED absence.

