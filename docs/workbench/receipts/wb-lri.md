# wb-lri: W07: HyperUnix provider

## 2026-11-11 receipt: the source-basis standing census and the installed-HX probe, cut 2 (machine seat ws-01; cures refusal #1, U1-U3)

- Surface: test, qa and docs only, no src change. `test/workbench-hyperunix-source-basis-standing.test.ts` is the census (17 rows: 12 cases, 4 shape and anchor rows and the registration row), `qa/workbench/hx-source-basis-probe.mjs` the native probe, `qa/workbench/receipts/wb-lri-hx-source-basis-probe.json` its committed record, and this file the receipt. Base trunk `ce180d82f938`.
- Census: wb-lri (W07) source-basis standing census: both hyperunix.find registrations of the provider module request no view and add no revision member (the injected one run over a recording reader, the native one read with the TypeScript parser), the injected output relays the runtime's view verbatim and projects no source basis, and the installed hx refuses a pinned find (HX-VIEW-013)
- History: cut 1 (`ca61b20c`, machine seat ws-09) was refused at gate run g10-gate-s289 (refusal #1, standing rule 16 LEG 2). It ran only the injected registration `registerHyperUnixFind`, which no src host registers, and read `nativeHyperUnixFind` (behind `registerNativeHyperUnixFind`, the registration Pi's hosts use) only through its find call's literal option names, so the gate's mutants G1, G2 and G3 left it 15 of 15 green. Cut 1 never landed; this entry replaces its entry, and cut 2 cures the three unmet items by pinning each gate-named member (pin-and-falsify), with G1, G2 and G3 planted verbatim into the provider text the census reads.
  - U1, G1 (a client default view in `HyperUnix.open`'s options): SB1d pins the module's only `HyperUnix.open` call to the one argument `realpathSync(workspaceRoot)`, the native `workspace` binding (once, const) to that call, the name `HyperUnix` to its import and that call, and no code token naming a view. G1 planted reads the options argument and three view names, and a planted raw find (`workspace.raw(["find","--view","git:HEAD"])`) names one view in a string literal; a planted constructed workspace (`new HyperUnix({}).workspace(...)`) reads as its binding.
  - U2, G2 (a view spread into the native find call through an identifier): the parser reader now fails closed. A spread it cannot resolve to object literals, parentheses and conditional branches reads as the member `<spread>`, a find call without one object-literal argument as `<options>`, a key it cannot name as `<computed>`. SB1c holds both find calls to exactly the five request members, a bound that is exactly `Bounds.create({wall:"30s"})`, the record's wait and best effort true, and the name find to three code tokens. G2, a call spread and a member-access spread planted into the native call each read `<spread>`, and a planted raw find makes find four.
  - U3, G3 (the native output relaying the SDK's revision member): SB2c pins `nativeHyperUnixFind`'s only return to `JSON.parse(JSON.stringify(...))` of exactly contract, source, workspaceRoot and runtime with their values (source `resultToJson(result)`, result bound once as const to the awaited `workspace.find`), and `registerNativeHyperUnixFind`'s invoke to that call itself. QUIET-DROPPED-RESOLUTION now also reads the provider code, which names no revision or resolved commit. G3 planted reads a revision member (SB2c) and three revision names (QUIET-DROPPED-RESOLUTION); a planted spread, early return, `let` result and wrapped invoke each read as planted (SB2c).
- The bead's source-basis half: "Typed HX query capability preserving source basis ... Verify actual installed HX SDK surface first; honest blocker if absent. Acceptance: real query coverage and source basis." Its notes leave "Full source basis/observer acceptance" open. The coverage half is landed and pinned elsewhere (the observer's H2 cases and the docs/07 census row H1).
- SDK surface, read from the vendored `@hyperunix/sdk` 0.1.0: a read's source basis travels only as `ReadResult.revision`, the runtime's own resolution of a pinned view (its `hx.view` frame: the requested revision and the resolved commit, null on a live read). `QueryResult` has no such member and `resultToJson` writes no such key, so the `hyperunix.find/v1` output, whose source is `resultToJson` of the result, carries none.
- Version pin, measured 2026-11-11: the runtime hx 0.1.0, binary SHA-256 `50b17a4b4c2ac5bc1f7a1cbf12652ff00271ac89726f025bf5184b82a3eebc90`, resolved from PATH, HXS 1.0, protocol hxs/1.0; `@hyperunix/sdk` 0.1.0, the vendored package.
- The two legs, as the producer answered the provider's find request (kind `hx.fs/regular-file`, root `src`, best effort, a 30 s wall bound, a 60 s wait) over a two-file scratch repository with a reproducible base revision `04eeeaaf6cfb`:
  - provider-live (the request exactly as the provider issues it, no view): exit 0, terminal complete over unknown completeness, absence not licensed, view `hx.view/workspace-head`, no pinned-view resolution (the SDK's revision member is null) and no runtime query digest.
  - provider-pinned (the same request pinned through GitView to the base revision, the SDK's only revision binding): refused with exit 2 (usage_refused), HX-CLI-USAGE-ERROR, reason view-binding-pending (the runtime says find binds no view in this build), requirements HX-VIEW-003, HX-VIEW-008 and HX-VIEW-013, zero frames: the demand is not answered from the live tree.
- Honest blocker: no source basis exists for a find at this build. Both registrations of the provider request no view in the forms the census reads (the injected one at run time, the native one with the TypeScript parser), add no revision member and keep the runtime's result as `resultToJson` serializes it, and the census pins exactly that. The remainder (a pinned find answered with the runtime's revision resolution, its relay through hyperunix.find and its projection as the snapshot's source basis) waits on HyperUnix-CLI binding a view for find (HX-VIEW-013), parked on the bead per standing rule 21(1).
- NOT CLAIMED: a pinned find's source basis; the observer's projection of a basis; hx verbs other than find (show under a view, git tree); hx builds other than the recorded binary; a live re-measure (the census reads the committed record); the hyperunix.find descriptor surface (its input schema and version); the native registration at run time (its output values and their projection: its code is read by the parser, never run); a view or option reaching the runtime by a route the parser does not read (the child environment, an hx configuration file, the runtime's own default view); SDK operations or hx processes of the provider other than its two find calls (the token pins red on any that names find or a view, and say nothing of the rest); the native find call's kind and root values (the parser reads its member names, bound, wait and best effort, never where kind and root come from); which host registers which registration (Pi's hosts register the native one).
- Residual, named and pinned by a quiet row (the residual table below): R-DROPPED-RESOLUTION. Both registrations serialize the result with `resultToJson`, which keeps no pinned-view resolution, so a result that carried one would reach the output without its source basis. QUIET-DROPPED-RESOLUTION pins that reading on both paths, at run time over the injected registration and with the parser over the provider code, and reds the day a resolution is relayed or projected.
- Frozen shape (standing rule 16): one row pins REQUEST:4, ENVELOPE:3, PROJECTION:1, MEASURED:3 and the residual family. Outside anchors: this entry's census line and its five tables below, which the census reads row by row; every row of the census states its exact assertion count, held by the Judged pins and Shape rows tables.
- Red first: the cut-2 census before this entry existed gave 3 failed | 14 passed (17): ANCHOR-RECEIPT and ANCHOR-RECORD (the receipt had no cut-2 heading yet) and the registration row; every case, FROZEN-SHAPE and TILING were green on the real provider. Against each of the gate's cut-1 survivors applied alone (the archive's mutants 01-03, on a replay tree of the entry commit carrying the cut-2 census and this receipt): G1 reds SB1d (`HyperUnix.open`'s arguments), SB1c and SB2c (their witnesses' anchors moved) and the registration row, 4 failed; G2 reds SB1c (the native call's members gain `<spread>`), SB1d (three view names) and the registration row, 3 failed; G3 reds SB2c (a fifth member, revision), QUIET-DROPPED-RESOLUTION (three revision names) and the registration row, 3 failed. The cut-1 census under the same three patches stays 15 of 15 green each, as the gate measured.
- CT battery (v2), each member applied alone on the replay tree (never the seat checkout), the census run there and the tree restored: CT1 red=4; CT1b red=4; CT2 red=2; CT3 red=3; CT4 red=4; CT5 red=3; CT6 red=3. CT1 takes SB1b out of the REQUEST row, CT1b SB5 out of the MEASURED row, CT2 shortens the REQUEST claim, CT3 swaps the ENVELOPE pin SB2b for SB4, and CT4 deletes the PROJECTION row and its case SB3. CT5 deletes that row and case and takes PROJECTION:1 out of the frozen-shape literal, and CT6 takes SB2b out of its case, its row's pins and the frozen-shape count together. Both are killed by this entry's Claims, Judged pins and Shape rows tables (ANCHOR-RECEIPT, outside the census), and TILING's exact assertion count reds beside them. The unplanted control reads 17 of 17 before and after.
- Mutants beyond the battery, on the same replay tree, each alone, as failed rows (each run also reds REGISTRATION). The gate's cut-1 members 04-11, 8 of 8 red: G4, a view spread into the injected call (SB1a, SB1b, SB1c, SB1d); G5, a runtime commit relay (QUIET-DROPPED-RESOLUTION); G6, an SB5 tautology with the record's exit edited, and G7, the record's requirements trimmed (ANCHOR-RECORD each); G8, a duplicate Claims section, and G9, an HTML comment in the Judged pins table, both ported to this entry's headings (ANCHOR-RECEIPT each); G10, SB4 skipped (REGISTRATION alone); G11, SB4 returning early (SB4). Seat probes, 21 of 21 red. On the provider: `HyperUnix.open` given an options identifier, and a constructed workspace (SB1d, SB2c); a call spread into the native find (SB1c, SB1d); an element-access find (SB1c); a raw find naming `--view`, a show read under a view, and a computed view key (SB1c, SB1d); source wrapped in a spread (SB2c, QUIET-DROPPED-RESOLUTION); a spread in the native return, a wrapped invoke, and an early return (SB2c); a `let` result (SB1c, SB1d, SB2c). On the census's own reader: spreads read as no member (SB1c, SB2c); string literals dropped from the tokens (SB1c, SB1d); the find, view and revision token helpers each hollowed (SB1c; SB1d; QUIET-DROPPED-RESOLUTION); `HyperUnix.open`'s arguments cut to one (SB1d); the invoke read and the binding kind made constant, and only a first return kept (SB2c).
- Green: 17 of 17.
- Record command: `node qa/workbench/hx-source-basis-probe.mjs --write qa/workbench/receipts/wb-lri-hx-source-basis-probe.json` (2026-11-11). The record is tied to the probe by its SHA-256, so an edit to the probe reds SB6 until the record is regenerated with this command. Two runs differ only in `utc`.
- Display paths added: none.

### Claims, wb-lri cut 2

| Row | Claim |
| --- | --- |
| REQUEST | the injected registration's request carries no view at run time, with a root and without one; read with the TypeScript parser, both find calls pass exactly the five request members, nativeHyperUnixFind opens its workspace with the realpath root alone, and no code token names a view |
| ENVELOPE | the injected registration's output carries exactly the contract, source, workspace root and runtime members, the runtime's view identity verbatim and no member naming a revision or a basis; read with the TypeScript parser, nativeHyperUnixFind returns exactly those four members, its source being resultToJson of its own find result |
| PROJECTION | hyperunixTopology over the injected registration's outputs states no subjectBasis, sourceRevision or definitionDigest, whatever view the runtime printed |
| MEASURED | the committed record, tied to its probe, measured the live view without a pinned-view resolution and the pinned request refused under HX-VIEW-013 |

### Judged pins, wb-lri cut 2

| Row | Pin | Assertions |
| --- | --- | --- |
| REQUEST | SB1a | 9 |
| REQUEST | SB1b | 3 |
| REQUEST | SB1c | 14 |
| REQUEST | SB1d | 8 |
| ENVELOPE | SB2a | 6 |
| ENVELOPE | SB2b | 2 |
| ENVELOPE | SB2c | 10 |
| PROJECTION | SB3 | 9 |
| MEASURED | SB4 | 10 |
| MEASURED | SB5 | 11 |
| MEASURED | SB6 | 10 |
| ENVELOPE | QUIET-DROPPED-RESOLUTION | 6 |

### Residuals, wb-lri cut 2

| Residual | Quiet row |
| --- | --- |
| R-DROPPED-RESOLUTION | QUIET-DROPPED-RESOLUTION |

### Shape rows, wb-lri cut 2

| Row | Assertions |
| --- | --- |
| FROZEN-SHAPE | 4 |
| TILING | 26 |
| ANCHOR-RECEIPT | 5 |
| ANCHOR-RECORD | 2 |
| REGISTRATION | 3 |

### Measured record, wb-lri cut 2

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
