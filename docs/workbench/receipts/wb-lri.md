# wb-lri: W07: HyperUnix provider

## 2026-11-11 receipt: the source-basis standing census and the installed-HX probe, cut 1 (machine seat ws-09)

- Surface: test, qa and docs only, no src change. `test/workbench-hyperunix-source-basis-standing.test.ts` is the census (15 rows: 10 cases, 4 shape and anchor rows and the registration row), `qa/workbench/hx-source-basis-probe.mjs` the native probe, `qa/workbench/receipts/wb-lri-hx-source-basis-probe.json` its committed record, and this file the receipt. Base trunk `ce180d82f938`.
- Census: wb-lri (W07) source-basis standing census: Pi's registered hyperunix.find requests only the live view, relays the runtime's view identity verbatim and states no source basis, and the installed hx refuses a pinned find (HX-VIEW-013)
- The bead's source-basis half: "Typed HX query capability preserving source basis ... Verify actual installed HX SDK surface first; honest blocker if absent. Acceptance: real query coverage and source basis." Its notes leave "Full source basis/observer acceptance" open. The coverage half is landed and pinned elsewhere (the observer's H2 cases and the docs/07 census row H1).
- SDK surface, read from the vendored `@hyperunix/sdk` 0.1.0: a read's source basis travels only as `ReadResult.revision`, the runtime's own resolution of a pinned view (its `hx.view` frame: the requested revision and the resolved commit, null on a live read). `QueryResult` has no such member and `resultToJson` writes no such key, so the `hyperunix.find/v1` output, whose source is `resultToJson` of the result, carries none.
- Version pin, measured 2026-11-11: the runtime hx 0.1.0, binary SHA-256 `50b17a4b4c2ac5bc1f7a1cbf12652ff00271ac89726f025bf5184b82a3eebc90`, resolved from PATH, HXS 1.0, protocol hxs/1.0; `@hyperunix/sdk` 0.1.0, the vendored package.
- The two legs, as the producer answered the request the registered provider issues (kind `hx.fs/regular-file`, root `src`, best effort, a 30 s wall bound, a 60 s wait) over a two-file scratch repository with a reproducible base revision `04eeeaaf6cfb`:
  - provider-live (the request exactly as the provider issues it, no view): exit 0, terminal complete over unknown completeness, absence not licensed, view `hx.view/workspace-head`, no pinned-view resolution (the SDK's revision member is null) and no runtime query digest.
  - provider-pinned (the same request pinned through GitView to the base revision, the SDK's only revision binding): refused with exit 2 (usage_refused), HX-CLI-USAGE-ERROR, reason view-binding-pending (the runtime says find binds no view in this build), requirements HX-VIEW-003, HX-VIEW-008 and HX-VIEW-013, zero frames: the demand is not answered from the live tree.
- Honest blocker: no source basis exists for a find at this build. Pi's registered tool requests no view, relays the runtime's view identity verbatim and states no basis, and the census pins exactly that. The remainder (a pinned find answered with the runtime's revision resolution, its relay through hyperunix.find and its projection as the snapshot's source basis) waits on HyperUnix-CLI binding a view for find (HX-VIEW-013), parked on the bead per standing rule 21(1).
- NOT CLAIMED: a pinned find's source basis; the observer's projection of a basis; hx verbs other than find (show under a view, git tree); hx builds other than the recorded binary; a live re-measure (the census reads the committed record); the hyperunix.find descriptor surface (its input schema and version).
- Residual, named and pinned by a quiet row (the residual table below): R-DROPPED-RESOLUTION. The provider serializes the reader's result with `resultToJson`, which keeps no pinned-view resolution, so a result that carried one would reach the output without its source basis; QUIET-DROPPED-RESOLUTION reds the day a resolution is relayed or projected.
- Frozen shape (standing rule 16): one row pins REQUEST:3, ENVELOPE:2, PROJECTION:1, MEASURED:3 and the residual family. Outside anchors: this entry's census line and its five tables below, which the census reads row by row; every row of the census states its exact assertion count, held by the Judged pins and Shape rows tables.
- Red first: the census before the committed record and this receipt existed gave 11 failed | 4 passed (15): ENOENT on the record for SB1a, SB1b, SB1c, SB2a, SB3, SB4, SB5 and SB6, ENOENT on the receipt for ANCHOR-RECEIPT and ANCHOR-RECORD, and the registration row red on those ten. The 4 that pass read neither file: SB2b, QUIET-DROPPED-RESOLUTION, FROZEN-SHAPE and TILING.
- CT battery (v2), each member applied on a throwaway copy of the worktree (never the seat checkout), the census run there and the originals restored: CT1 red=4; CT1b red=4; CT2 red=2; CT3 red=3; CT4 red=4; CT5 red=3; CT6 red=3. CT1 takes SB1b out of the REQUEST row, CT1b SB5 out of the MEASURED row, CT2 shortens the REQUEST claim, CT3 swaps the ENVELOPE pin SB2b for SB4, and CT4 deletes the PROJECTION row and its case SB3. CT5 deletes that row and case and takes PROJECTION:1 out of the frozen-shape literal, and CT6 takes SB2b out of its case, its row's pins and the frozen-shape count together. Both are killed by this entry's Claims, Judged pins and Shape rows tables (ANCHOR-RECEIPT, outside the census), and TILING's exact assertion count reds beside them. The unplanted control reads 15 of 15 before and after the battery.
- Mutants beyond the battery, on the same copy, as failed rows (each run also reds REGISTRATION): a view passed on the injected reader's find (SB1a, SB1b, SB1c); a view passed on nativeHyperUnixFind's own find (SB1c); the reader's revision relayed into the output (SB2a, SB2b, QUIET-DROPPED-RESOLUTION); the view echoed as subjectBasis by the adapter (SB3, QUIET-DROPPED-RESOLUTION); the record's pinned exit edited to 0 (SB5, ANCHOR-RECORD); the record's live revision set (SB4, ANCHOR-RECORD); the probe edited after the record (SB6); this entry's measured exit edited to 4 (ANCHOR-RECORD); the record's live view edited (SB2a, SB4, ANCHOR-RECORD); one SB5 assertion deleted (SB5); a case dropped from the registration loop, and a case skipped (REGISTRATION alone); SB4 returning early (SB4); the quiet row's revision assertion deleted (QUIET-DROPPED-RESOLUTION); the last line naming the quiet row deleted (FROZEN-SHAPE); the REQUEST claim replaced by a vacuous sentence (ANCHOR-RECEIPT). 16 of 16 red.
- Green: 15 of 15.
- Record command: `node qa/workbench/hx-source-basis-probe.mjs --write qa/workbench/receipts/wb-lri-hx-source-basis-probe.json` (2026-11-11). The record is tied to the probe by its SHA-256, so an edit to the probe reds SB6 until the record is regenerated with this command. Two runs differ only in `utc`.
- Display paths added: none.

### Claims, wb-lri cut 1

| Row | Claim |
| --- | --- |
| REQUEST | the registered hyperunix.find issues every find without a view: the record's request with a root, the same request without one, and nativeHyperUnixFind's own call |
| ENVELOPE | the registered output carries exactly the contract, source, workspace root and runtime members, the runtime's view identity verbatim and no member naming a revision or a basis |
| PROJECTION | hyperunixTopology over those outputs states no subjectBasis, sourceRevision or definitionDigest, whatever view the runtime printed |
| MEASURED | the committed record, tied to its probe, measured the live view without a pinned-view resolution and the pinned request refused under HX-VIEW-013 |

### Judged pins, wb-lri cut 1

| Row | Pin | Assertions |
| --- | --- | --- |
| REQUEST | SB1a | 9 |
| REQUEST | SB1b | 3 |
| REQUEST | SB1c | 9 |
| ENVELOPE | SB2a | 6 |
| ENVELOPE | SB2b | 2 |
| PROJECTION | SB3 | 9 |
| MEASURED | SB4 | 10 |
| MEASURED | SB5 | 11 |
| MEASURED | SB6 | 10 |
| ENVELOPE | QUIET-DROPPED-RESOLUTION | 4 |

### Residuals, wb-lri cut 1

| Residual | Quiet row |
| --- | --- |
| R-DROPPED-RESOLUTION | QUIET-DROPPED-RESOLUTION |

### Shape rows, wb-lri cut 1

| Row | Assertions |
| --- | --- |
| FROZEN-SHAPE | 4 |
| TILING | 22 |
| ANCHOR-RECEIPT | 5 |
| ANCHOR-RECORD | 2 |
| REGISTRATION | 3 |

### Measured record, wb-lri cut 1

| Field | Value |
| --- | --- |
| producer.version | 0.1.0 |
| producer.binarySha256 | 50b17a4b4c2ac5bc1f7a1cbf12652ff00271ac89726f025bf5184b82a3eebc90 |
| producer.binaryOrigin | path |
| producer.sdk.version | 0.1.0 |
| repository.baseRevision | 04eeeaaf6cfb1db030ac3b1362e589c050d81f2a |
| provider-live.view | hx.view/workspace-head |
| provider-live.revision | null |
| provider-live.digestSource | absent |
| provider-pinned.exitCode | 2 |
| provider-pinned.code | HX-CLI-USAGE-ERROR |
| provider-pinned.requirements | HX-VIEW-003 HX-VIEW-008 HX-VIEW-013 |
