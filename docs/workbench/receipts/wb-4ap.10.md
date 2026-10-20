# wb-4ap.10: [COLLECTIVE-ADAPTATION-R10] docs/workbench/07-native-integrations.md § Forge provider shall carry one falsifiable sentence: the gate.status reader echoes the producer's per-package derived-verdict basis (last_result_state.invalidation_basis.derived_from) as the package snapshot basis and quotes the producer's freshness word verbatim; it never recomputes freshness, never fabricates a basis when the descriptor is absent or malformed, and freshness never confers current autho...

## 2026-10-20 receipt: the Forge provider basis sentence and census row F4 (base c12b1d3, lands after wb-4ap.1)

- Sentence: `docs/workbench/07-native-integrations.md` § Forge provider now carries, right after "Preserve actual source basis, full verdict axes, reason codes, reuse/cache evidence and partial/unknown states.", the sentence "The gate.status reader echoes the producer's per-package derived-verdict basis (last_result_state.invalidation_basis.derived_from) as the package snapshot basis, distinct from the workspace basis of WB-025 (02-atomic-requirements.md), and quotes the producer's freshness word verbatim; it never recomputes freshness, never fabricates a basis when the descriptor is absent or malformed, and freshness never confers current authority (authoritative_current alone does)."
- Census: the wb-6hb.11 leg `test/workbench-docs07-provider-rules.census.ts` gains row F4, which quotes that sentence whole. It binds each clause to cases of `test/workbench-forge-observer.test.ts`, by file and verbatim title, in the sentence's order:
  - derived-basis-echoed: the four F9 (wb-4ap.1) cases.
  - workspace-basis-distinct: "wb-4ap.4 never-case: mixed [HISTORICAL, stale] under a workspace source_snapshot_id/gated_tree - only the described row has a basis, B, and the workspace digest appears nowhere".
  - freshness-quoted: F10 (wb-4ap.2).
  - never-recomputed: F14 (wb-4ap.6).
  - absent-no-basis: F12 (wb-4ap.4).
  - malformed-no-basis: the F11 (wb-4ap.3) it.each template, which must register at least 6 rows, and "F11 (wb-4ap.3): no malformed text reaches the result - neither the bad derived_from nor either digest of the withheld basis".
  - no-current-authority: F13 (wb-4ap.5).
- Frozen shape (standing rule 16): FROZEN_JUDGED_SHAPE gains the seven F4 halves. FROZEN_F4 freezes, as a hand-written literal, the row's whole sentence and its eleven pins by half, file and title.
- Forge pin, read at Forge `d4f96ad11f53b802e68dc354eb62ad32642fc229`:
  - `src/forge/application/operations.py:970` publishes each package row's `last_result_state` (`e.last_result_state.as_dict()`, or null).
  - `src/forge/contracts/state.py:1789-1806` is that `as_dict()` wire shape: `state_class`, `source_ref`, `invalidation_basis` and `freshness`, plus `semantic_owner`, `authoritative_read_source` and `note` when they are populated.
  - The producer computes the freshness word (`freshness_of(invalidation_basis)`); the reader only quotes it.
- WB-025 cross-reference: `docs/workbench/02-atomic-requirements.md:31` (WB-025, "Forge operation and workspace basis") names the workspace basis. The sentence distinguishes the per-package derived basis from it, and the workspace-basis-distinct half pins the case in which a workspace `source_snapshot_id`/`gated_tree` digest never becomes a package basis. `docs/workbench/02-atomic-requirements.md` is unchanged, because the frozen TRACEABILITY.md WB-025 row mirrors its text.
- Tier: every pinned case runs in the default test gate (`vitest.config.ts:17` includes `test/**/*.test.ts`; `forge.toml:9` puts the test step in the gate). The cases are hermetic, with no SDK process: the observer file mocks `@forge/sdk` at file level (`vi.mock` at :19), and the pinned cases call only the pure `forgeGateTopology`, `nativeEvidence` and `ObservationProjection` or read source text.
  - The STALE row is the SOURCE_WITH_STATE row that wb-4ap.11 measured from an installed forge (TRACEABILITY.md § "wb-4ap.11 native-read receipt", forge 0.2.1 rev 909bee0e2df8). Every other row is a synthetic mutation of it (`test/helpers/forge-last-result-state.ts`).
  - No pinned case reads an installed forge. The measured counterpart is wb-4ap.11's native-read tier.
- Status: experimental. The evidence is hermetic default-gate cases over a measured fixture, never `shipped` or `live-sdk`. `docs/workbench/feature-matrix.md:88` (forge.gate.status/v1, landed-gated) is unchanged and is not upgraded to a live claim.
- TRACEABILITY.md stays frozen (wb-xox), so this receipt is the new row the acceptance names, never an edit to TRACEABILITY.md. The wb-cax.1 validator `node qa/workbench/status-ledger.mjs` returns rc 0 on this tree (integrity [], vocabulary [], 50 rows).
- Lands after wb-4ap.1: the four F9 pins are wb-4ap.1's cases (delivered d44241f, gate-queued, not on trunk c12b1d3). On a tree that does not carry them, census half F4/derived-basis-echoed reads red, absent four times, by design.
- Red (census edited, docs/07 not yet edited): 3 failed | 57 passed (60).
  - AC1 table: the row F4 clause does not render in § Forge provider, and the section is not its frozen paragraph.
  - AC1 sections-render: § Forge provider.
  - AC2 F4/derived-basis-echoed: the F9 pins are absent.
  - Control at base c12b1d3: the census passes 50 of 50 over the same partial default-tier report (the 13 pinned files, 751 of 751 passed).
- Green:
  - Tip alone: 1 failed | 59 passed (60). The one failure is F4/derived-basis-echoed, absent.
  - Probe with wb-4ap.1's observer test (merge-tree of c12b1d3 and d44241f is clean; that file's merged blob is 7123156): report 755 of 755 passed, census 60 of 60.
- Mutants, judged over the probe report (baseline 60/60), each restored after it ran:
  - CT1, delete a pin of a multi-pin half: 3 failed | 57.
  - CT1b, delete a pin of a second row (U4): 1 failed | 59.
  - CT1c, delete the second malformed-no-basis pin: 3 failed | 57.
  - CT2, shorten the sentence to its leading clause: 2 failed | 58.
  - CT2b, shorten a half label: 2 failed | 58.
  - CT3, swap the F10 pin for an unrelated passing case: 1 failed | 59.
  - Controls, which show what kills each mutant: without the F4 identity test, CT3 survives 59 of 59 and CT2 dies only by K4. Without both the F4 identity test and K4, CT2 survives 58 of 58.
  - Acceptance falsifiers, with the report regenerated for each: renaming F10 or F9 L3 reads absent, and `.skip` on F13, F12 or the F11 template reads skipped. Each fails exactly one F4 half (1 failed | 59) and names row F4 and that half.

## 2026-10-20 respin: census row F4 rejoined with row R4 on trunk a7fcfce (sweep-171 re-cut)

- Why: the queued cut f01e389 (base bc06f80) reads red on any trunk at or after 4939c97. Landing 171 (wb-693.9, merge 78a6500) added the ReactiveFiberCLI "SDK package + revision" sentence to docs/07 and census row R4, while f01e389's census still froze the older ReactiveFiberCLI paragraph. The re-cut was routed by the bead note of 2026-10-20T10:06:55Z (sweep-171 flag; knownRedAtLanding on the queue entry).
- Merge: trunk a7fcfce was merged into machine/flywheel/wb-4ap.10 (merge, never rebase). `docs/workbench/07-native-integrations.md` merged clean, so § Forge provider carries the basis sentence and § ReactiveFiberCLI provider carries the wb-693.9 sentence. The census conflicted in two hunks, the header row list and ROW_IDS. Both were resolved as the union: rows F1-F4 and R1-R4, 22 rows in all.
- Count: both cuts had moved AC1 from twenty to twenty-one with identical text, so that line merged silently while the union held 22 rows. AC1 now reads "twenty-two" and asserts `toHaveLength(22)`.
- Frozen shapes (standing rule 16), kept from both cuts: FROZEN_F4 (row F4's sentence and its eleven pins); FROZEN_IDENTITY_QUOTE and FROZEN_IDENTITY_BINDING (row R4, wb-693.9); and FROZEN_JUDGED_SHAPE, which holds the seven F4 halves and the two R4 halves.
- wb-4ap.1 landed at landing 169 (merge e5c480e). Trunk's `test/workbench-forge-observer.test.ts` is blob 7123156, so F4/derived-basis-echoed reads ok on trunk itself, with no probe. The first entry's "lands after wb-4ap.1" is now met.
- Every count below is judged over a partial default-tier report of the 13 census-pinned files, which passed 790 of 790 on the merged tree.
  - Base control: trunk a7fcfce's census over trunk's docs/07 passes 55 of 55.
  - Red, the known-red reproduced (f01e389's census over the merged docs/07): 2 failed | 58 passed (60). AC1 table fails on "§ ReactiveFiberCLI provider is not exactly its frozen paragraph", and AC1 sections-render fails on the ReactiveFiberCLI provider.
  - Red, the union with the stale count: 1 failed | 64 passed (65). AC1 table fails with "expected ... to have a length of 21 but got 22".
  - Green: 65 of 65.
- Mutants on the green census, each restored byte-identical and sha256-checked:
  - CT1, delete a pin of a multi-pin half: row F4 3 failed | 62; row R4 3 failed | 62.
  - CT1b, delete the U4 furnace-control pin: 1 failed | 64.
  - CT1c, delete the second F4 malformed-no-basis pin: 3 failed | 62.
  - CT2, shorten a row's quote to its leading clause: row F4 2 failed | 63; row R4 1 failed | 64.
  - CT2b, shorten the F4 malformed-no-basis label: 2 failed | 63.
  - CT3, swap a pin for an unrelated passing case of the same file: row F4 (F10 for F8) 1 failed | 64; row R4 (the round-trip pin for the producerRelease metadata case under the same describe) 1 failed | 64.
  - Drop a union row whole: row F4 4 failed | 54 (58); row R4 4 failed | 59 (63).
- Acceptance falsifiers, with the report regenerated for each:
  - Renaming F10, F9 L3, F14 or the wb-4ap.4 never-case reads absent. `.skip` on F13, on F12 or on the F11 it.each template reads skipped.
  - Each fails exactly one F4 half (1 failed | 64 passed) and names row F4 and that half, for example "row F4/freshness-quoted: absent: test/workbench-forge-observer.test.ts ...".
- The wb-cax.1 validator `node qa/workbench/status-ledger.mjs` returns rc 0 on the merged tree (50 rows, integrity [], vocabulary []).
