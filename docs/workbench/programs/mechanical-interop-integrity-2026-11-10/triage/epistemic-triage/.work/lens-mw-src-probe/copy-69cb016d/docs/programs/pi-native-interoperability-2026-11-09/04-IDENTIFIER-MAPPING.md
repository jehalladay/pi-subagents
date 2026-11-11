# 04 — Identifier mapping and serialization edges (M00-C)

**Program type:** mapping and validator, not claimed delivery. **Owner:** MechanicalWorkflows. **Pin:** MechanicalWorkflows main `7f3809fd8d6f20d22b9b4b81b6dfdb917bcc3c73` (rows resolve against the tree at this commit; re-pin at work time) and Pi repository `8e2fedeb8e3ce7d94c2d3724a6ef7e2c5eb02164` (the `pi:` rows resolve to files at this Pi pin, per EAT claim C122). **Requirements:** EAT-R004 (mapping), EAT-R034 (serialization edges, graph half). **Validator:** `scripts/check-pi-native-id-mapping.ts`, with its tests in `scripts/check-pi-native-id-mapping.test.ts`.

This document maps every pre-existing requirement identifier that the four program documents (`README.md`, `01-AUDIT-AND-CONTRACT.md`, `02-IMPLEMENTATION-PACKAGES.md`, `03-VERIFICATION-AND-RELEASE.md`) reference. It renumbers nothing: each identifier keeps its original spelling, and the new packet labels M00 through M12 stay separate planning labels (see `02-IMPLEMENTATION-PACKAGES.md`).

## Status vocabulary

The status column holds exactly one of three words, and the validator refuses any other spelling.

- `defined` — the identifier resolves to a definition or mention at the in-repo source path at the pin. The receipt path names that same file. The status makes no delivery claim.
- `test-pinned` — the identifier resolves at the source path, and at least one in-repo test names it. The receipt path names that test file. The status says a test names the identifier, never that the requirement is delivered.
- `external-unverified` — the identifier lives in the Pi repository, which this cut did not read in full. The source path carries the `pi:` prefix and names a file at the Pi pin, the receipt path stays `-`, and no resolution is claimed.

The validator refuses a `defined` or `test-pinned` row in these cases, each under its own code:

- `ID_MAP_STATUS_NO_RECEIPT` — the receipt path is blank or names no existing file.
- `ID_MAP_RECEIPT_ID_ABSENT` — the receipt exists but never names the row id as a whole token (an id-character neighbour such as a letter, digit, underscore or hyphen means a longer identifier).
- `ID_MAP_RECEIPT_NOT_TEST` — a `test-pinned` receipt is not a test file. The admitted shapes are `*.test.ts`, `*.test.py`, `test_*.py`, any `.ts` file under the top-level `qa/` tree, and any file under a directory named exactly `test` or `tests`.
- `ID_MAP_RECEIPT_NOT_SOURCE` — a `defined` receipt path differs from its source path (compared after path normalisation, so `./` and doubled slashes do not matter).
- `ID_MAP_RECEIPT_SELF_REFERENTIAL` — the receipt is this mapping document or `scripts/check-pi-native-id-mapping.test.ts`, spelled directly or through a symlink alias that resolves to either, or a plain file elsewhere whose bytes equal the judged mapping document or that carries a content marker of either (the `## Mapping table` heading or the `judgeIdMapping` entry point); each names many ids by construction and proves none of them. The same code also refuses a plain file that names all resolved ids of the table as whole tokens when the table holds three or more resolved ids, so a table-rows-only partial copy of this document (rows without the heading, or the heading in another case) cannot serve as the receipt of any row. Below three resolved ids the guard stays silent, and a single-id or two-id receipt always stays admissible.
- `ID_MAP_PATH_OUTSIDE_ROOT` — the source or receipt path resolves outside the repository root, through `../` segments, an absolute path or a symlink. The validator does not read such a file.

The validator also refuses the document and table shapes below, each under its own code. A parity test extracts every code the validator emits and fails when this list omits one or when this list carries a code the validator no longer emits.

- `ID_MAP_ROOT_MISSING` — the `--root` directory does not exist or is not a directory; the validator refuses before it reads any document, so the operator sees a root error and not a table refusal.
- `ID_MAP_TABLE_MISSING` — the document has no `## Mapping table` section with data rows, or no `## Serialization edges` section.
- `ID_MAP_ROW_MALFORMED` — a table row carries the wrong number of cells.
- `ID_MAP_ID_DUPLICATE` — one id appears in more than one row.
- `ID_MAP_SUFFIX_COLLISION` — two ids in one family share a numeric suffix (`MW-R01` and `MW-R1`).
- `ID_MAP_ID_UNMAPPED` — a program document references an id that the mapping table holds no row for.
- `ID_MAP_STATUS_UNKNOWN` — the status column holds a word outside the three listed above.
- `ID_MAP_SOURCE_PATH_MISSING` — a `defined` or `test-pinned` row has a blank or non-existent source path, or an `external-unverified` row does not name its source as `pi:<path in the Pi repository>`.
- `ID_MAP_EDGE_MISSING` — the serialization edges lack a required `blocked-by` edge (M03 blocked-by M02, M04 blocked-by M02).
- `ID_MAP_EDGE_FORBIDDEN` — the serialization edges join M01 to M02; M01 runs in parallel with M02.

## Content markers and their blast radius

The content guard refuses a receipt by three independent clauses, each under `ID_MAP_RECEIPT_SELF_REFERENTIAL`: bytes equal to the judged mapping document, a content marker, and a name for all resolved ids. The two markers are the case-sensitive text `## Mapping table` and the identifier `judgeIdMapping`, and the guard matches them anywhere in the receipt text. The refusal therefore reaches further than the two files it targets. A future test that wants to import `judgeIdMapping` to pin one requirement carries the marker and the validator refuses it as a receipt, and so does any document that carries a `## Mapping table` heading of its own. Such a test pins its requirement through a different id-bearing file, or the owner changes the marker clause in a later cut. The choice here keeps the markers as independent defenses: a byte copy of the validator test under another path meets the refusal from either marker alone, because the test file carries the `## Mapping table` literal in its fixture helper as well as the `judgeIdMapping` identifier, and a test names this documented refusal. The case-variant heading `## MAPPING TABLE` parses as the table but carries no marker, so only the byte-equality clause and the all-resolved-ids clause cover a copy of it.

## Mapping table

| id | family | source_path | status | receipt_path |
| --- | --- | --- | --- | --- |
| MW-R0 | MW-R | docs/programs/pi-workbench-interoperability-audit-2026-11-06/03-delivery-program.md | test-pinned | scripts/check-mw-r0-confirm.test.ts |
| MW-R1 | MW-R | docs/programs/pi-workbench-interoperability-audit-2026-11-06/03-delivery-program.md | test-pinned | scripts/check-structure.test.ts |
| MW-R2 | MW-R | docs/programs/pi-workbench-interoperability-audit-2026-11-06/03-delivery-program.md | defined | docs/programs/pi-workbench-interoperability-audit-2026-11-06/03-delivery-program.md |
| MW-R3 | MW-R | docs/programs/pi-workbench-interoperability-audit-2026-11-06/03-delivery-program.md | defined | docs/programs/pi-workbench-interoperability-audit-2026-11-06/03-delivery-program.md |
| MW-R4 | MW-R | docs/programs/pi-workbench-interoperability-audit-2026-11-06/03-delivery-program.md | test-pinned | scripts/check-mw-r4-preflight.test.ts |
| MW-R5 | MW-R | docs/programs/pi-workbench-interoperability-audit-2026-11-06/03-delivery-program.md | test-pinned | apps/development-rig/test/hx-scope-develop.test.ts |
| MW-R6 | MW-R | docs/programs/pi-workbench-interoperability-audit-2026-11-06/03-delivery-program.md | test-pinned | apps/development-rig/test/furnace-adapter-boundary.test.ts |
| MW-R7 | MW-R | docs/programs/pi-workbench-interoperability-audit-2026-11-06/03-delivery-program.md | test-pinned | apps/development-rig/test/coordination-authority-census.test.ts |
| MW-R8 | MW-R | docs/programs/pi-workbench-interoperability-audit-2026-11-06/03-delivery-program.md | test-pinned | apps/development-rig/test/listing-robustness.test.ts |
| MW-BM-01 | MW-BM | docs/programs/bead-machine-field-convergence-2026-11-07/02-WORK-PACKAGES.md | defined | docs/programs/bead-machine-field-convergence-2026-11-07/02-WORK-PACKAGES.md |
| MW-BM-02 | MW-BM | docs/programs/bead-machine-field-convergence-2026-11-07/02-WORK-PACKAGES.md | defined | docs/programs/bead-machine-field-convergence-2026-11-07/02-WORK-PACKAGES.md |
| MW-BM-03 | MW-BM | docs/programs/bead-machine-field-convergence-2026-11-07/02-WORK-PACKAGES.md | defined | docs/programs/bead-machine-field-convergence-2026-11-07/02-WORK-PACKAGES.md |
| MW-BM-04 | MW-BM | docs/programs/bead-machine-field-convergence-2026-11-07/02-WORK-PACKAGES.md | defined | docs/programs/bead-machine-field-convergence-2026-11-07/02-WORK-PACKAGES.md |
| MW-BM-05 | MW-BM | docs/programs/bead-machine-field-convergence-2026-11-07/02-WORK-PACKAGES.md | defined | docs/programs/bead-machine-field-convergence-2026-11-07/02-WORK-PACKAGES.md |
| W11 | W | docs/programs/pi-workbench-interop-2026-11-04/01-audit-and-status.md | defined | docs/programs/pi-workbench-interop-2026-11-04/01-audit-and-status.md |
| VC-3 | VC | pi:docs/workbench/15-implementation-program.md | external-unverified | - |
| PI-BM | PI-BM | pi:docs/workbench/programs/bead-machine-field-convergence-2026-11-07/01-ARCHITECTURE.md | external-unverified | - |
| B-descriptor | B | pi:docs/workbench/programs/mechanical-workflows-interop-2026-11-04/triage/requirements/BEAD-PLAN.md | external-unverified | - |
| B-source | B | pi:docs/workbench/programs/mechanical-workflows-interop-2026-11-04/triage/requirements/BEAD-PLAN.md | external-unverified | - |
| B-authority | B | pi:docs/workbench/programs/mechanical-workflows-interop-2026-11-04/triage/requirements/BEAD-PLAN.md | external-unverified | - |
| B-dispatch | B | pi:docs/workbench/programs/mechanical-workflows-interop-2026-11-04/triage/requirements/BEAD-PLAN.md | external-unverified | - |
| B-outcomes | B | pi:docs/workbench/programs/mechanical-workflows-interop-2026-11-04/triage/requirements/BEAD-PLAN.md | external-unverified | - |
| B-effects | B | pi:docs/workbench/programs/mechanical-workflows-interop-2026-11-04/triage/requirements/BEAD-PLAN.md | external-unverified | - |
| B-observe | B | pi:docs/workbench/programs/mechanical-workflows-interop-2026-11-04/triage/requirements/BEAD-PLAN.md | external-unverified | - |
| B-git-census | B | pi:docs/workbench/programs/mechanical-workflows-interop-2026-11-04/triage/requirements/BEAD-PLAN.md | external-unverified | - |

## Notes on the rows

- The `MW-R` rows resolve to the delivery table in `pi-workbench-interoperability-audit-2026-11-06/03-delivery-program.md`. A `test-pinned` receipt is the first in-repo test whose header names the identifier; other tests may name it too.
- `W11` appears in `AGENTS.md`, `docs/10-current-state-and-gaps.md` and the November 4 program. The November 4 audit says Pi's W11 feature matrix remains planned, so the row carries `defined` and no shipping claim.
- The 2026-11-04 EAT-R set lives in the Pi repository under `docs/workbench/programs/mechanical-workflows-interop-2026-11-04/triage/requirements/`, not in this repository. It has no row here because the four program documents cite no individual identifier from it; cite it at that Pi path.
- `VC-3`, `PI-BM` and the eight `B-*` descriptors resolve only in the Pi repository. Each row names the Pi file at pin `8e2fedeb` where the identifier appears (EAT claim C122, evidence rows E434, E150 and E435), and claims nothing more until a cut reads the Pi pin.
- The validator tests the hypothesis that old rows carry duplicate numbering: it refuses two rows that share an id, and two rows that share a numeric suffix inside one family. At this pin no such collision exists among the rows above.

## Serialization edges

M02 lands first. M03 and M04 each restack and re-gate on the landed M02 tree, and M01 runs in parallel with M02, so no edge joins M01 and M02 (EAT-R034). The validator refuses a table that lacks either edge below and refuses any edge from M01 to M02.

| from | to | kind |
| --- | --- | --- |
| M03 | M02 | blocked-by |
| M04 | M02 | blocked-by |

The landing-precheck half of EAT-R034 (a check that each M03 and M04 candidate's parent tree contains the landed M02 commit) belongs to the landing tooling and stays outside this cut.
