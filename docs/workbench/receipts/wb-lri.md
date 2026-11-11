# wb-lri: W07: HyperUnix provider

## 2026-11-11 receipt: the source-basis standing census and the installed-HX probe, cut 3 (machine seat ws-08; cures refusal #2, U1-U6)

- Surface: test and docs only, no src, qa or record change. `test/workbench-hyperunix-source-basis-standing.test.ts` is the census (19 rows: 14 cases, 4 shape and anchor rows and the registration row), `qa/workbench/hx-source-basis-probe.mjs` the native probe and `qa/workbench/receipts/wb-lri-hx-source-basis-probe.json` its committed record (both unchanged since cut 1), and this file the receipt. Base trunk `ce180d82f938`.
- Census: wb-lri (W07) source-basis standing census: the provider module's injected hyperunix.find registration, run over a recording reader, requests no view, relays the runtime's view verbatim and outputs and projects no source basis; its native registration, read with the TypeScript parser and binder in the read sets enumerated here, spells no view in its request and no revision member in its return; and the committed record, anchored leaf for leaf, holds the installed hx's refusal of a pinned find (HX-VIEW-013)
- History: cut 1 (`ca61b20c`, machine seat ws-09) was refused at gate run g10-gate-s289 (refusal #1, gate-prep-36: G1, G2 and G3). Cut 2 (`65cb9bff`, machine seat ws-01) cured those by reading the native registration with the TypeScript parser and was refused at the same gate run (refusal #2, gate-prep-160, standing rule 16 LEG 2: U1-U6; the class guard of record bound by R-B778). Neither landed; this entry replaces cut 2's. Cut 3 cures U1-U6 by pinning each gate-named member (pin-and-falsify), authored in the rule-14 enumerate-the-resolvable form, with each member planted verbatim into the text the census reads as a witness.
- U1, L01 (a parameter named `nativeHyperUnixFind`, defaulting to a relay, cut the invoke's tie by name): every name the bodies of `nativeHyperUnixFind` and `registerNativeHyperUnixFind` read now resolves through the landed `bindingOf` (test/helpers/hyperunix-custody-readers.ts: the TypeScript binder's own symbol at its use site), and SB2c and SB7 pin the invoke's callee to the module's one function declaration of that name. L01 planted resolves the callee as `parameter 2 of registerNativeHyperUnixFind`. SB7 also pins both registration names to one exported function declaration each in a module with no export declaration or assignment, and QUIET-RUNTIME-REWRITE reads a reassignment of `nativeHyperUnixFind`.
- U2, L02 (a function-local `resultToJson` relaying the resolution as `basis`): SB2c and SB7 resolve the native serializer to the `@hyperunix/sdk` import of `resultToJson`, and QUIET-DROPPED-RESOLUTION now holds both serializer calls to that import too, so the residual's quiet row reds when the quiet page is silenced this way. L02 planted resolves the native call as a const of `nativeHyperUnixFind` in all three cases; an aliased import (`resultFromJson as resultToJson`) reads its exported name.
- U3, L04 (a function-local `Bounds` adding an `externalProcesses` budget behind the pinned text): SB1c resolves the native call's `Bounds` to the SDK import, SB1d resolves `HyperUnix`, `realpathSync` and `workspaceRoot`, SB2c resolves `JSON`, `HYPERUNIX_FIND_CONTRACT`, `resultToJson`, `result` and `runtime`, and SB7 pins the full tables (17 names for `nativeHyperUnixFind`, 6 for `registerNativeHyperUnixFind`) with the function's own declarations and parameters. L04 planted, a local `realpathSync`, a `JSON` shadow and a block-level `client` shadow each read as planted.
- U4, L06-L08 (tautology-plus-record edits of facts outside the Measured record table): the Measured record table below is now every leaf of the committed record (54, path for path in record order, each with its JSON value), and ANCHOR-RECORD holds the record to it, so every fact SB4, SB5 and SB6 assert (live: requested view, outcome, revision member, result keys, digest, licensing, frames; pinned: requested view, outcome, terminal, reason, view, revision, rows, frames) is anchored outside the census.
- U5, L10 (a nested `Census:` bullet folded into the Surface item's text): ANCHOR-RECEIPT now reads this entry with the marked lexer census.ts uses and holds it to one flat list whose every item is a single text block (no nested list or block, no hard break), then its five table sections and nothing else. L10 planted reads `text+list`, a continuation paragraph `paragraph+paragraph`, a hard break `text:br`, and a census paragraph after the list an extra paragraph block.
- U6, L12 (the injected runtime relaying the requested revision as `pin`): QUIET-DROPPED-RESOLUTION now gives the resolution a distinctive requested revision, asserts the injected output over the resolution-carrying result equals, member for member, the output over the same result without it, holds the runtime member to exactly `version` and `binarySha256`, and asserts neither the requested revision nor the resolved commit appears in the output's text.
- The bead's source-basis half: "Typed HX query capability preserving source basis ... Verify actual installed HX SDK surface first; honest blocker if absent. Acceptance: real query coverage and source basis." Its notes leave "Full source basis/observer acceptance" open. The coverage half is landed and pinned elsewhere (the observer's H2 cases and the docs/07 census row H1).
- SDK surface, read from the vendored `@hyperunix/sdk` 0.1.0: a read's source basis travels only as `ReadResult.revision`, the runtime's own resolution of a pinned view (its `hx.view` frame: the requested revision and the resolved commit, null on a live read). `QueryResult` has no such member and `resultToJson` writes no such key, so the `hyperunix.find/v1` output, whose source is `resultToJson` of the result, carries none.
- Version pin, measured 2026-11-11: the runtime hx 0.1.0, binary SHA-256 `50b17a4b4c2ac5bc1f7a1cbf12652ff00271ac89726f025bf5184b82a3eebc90`, resolved from PATH, HXS 1.0, protocol hxs/1.0; `@hyperunix/sdk` 0.1.0, the vendored package.
- Leg provider-live (the provider's find request exactly as issued, no view: kind `hx.fs/regular-file`, root `src`, best effort, a 30 s wall bound, a 60 s wait, over a two-file scratch repository at base revision `04eeeaaf6cfb`): exit 0, terminal complete over unknown completeness, absence not licensed, view `hx.view/workspace-head`, no pinned-view resolution (the SDK's revision member is null) and no runtime query digest.
- Leg provider-pinned (the same request pinned through GitView to the base revision, the SDK's only revision binding): refused with exit 2 (usage_refused), HX-CLI-USAGE-ERROR, reason view-binding-pending (the runtime says find binds no view in this build), requirements HX-VIEW-003, HX-VIEW-008 and HX-VIEW-013, zero frames: the demand is not answered from the live tree.
- Honest blocker: no source basis exists for a find at this build. The injected registration requests no view, relays the runtime's view verbatim and outputs and projects no source basis at run time; the native registration, read with the TypeScript parser and binder in the census's enumerated read sets, spells no view in its request and no revision member in its return; and the census pins exactly that. The remainder (a pinned find answered with the runtime's revision resolution, its relay through hyperunix.find and its projection as the snapshot's source basis) waits on HyperUnix-CLI binding a view for find (HX-VIEW-013), parked on the bead per standing rule 21(1).
- NOT CLAIMED: a pinned find's source basis; the observer's projection of a basis; hx verbs other than find; hx builds other than the recorded binary; a live re-measure (the census reads the committed record); the hyperunix.find descriptor surface (its input schema and version; the BINDING table spells the input schema's declaration, so an edit reds SB7, but no claim is made of it); the native registration at run time (its code is read by the parser and the binder, never run); a view or option reaching the runtime by a route the parser does not read (the child environment, an hx or SDK configuration file, the runtime's own default view); SDK operations or hx processes other than the two find calls (the token pins red on any that names find or a view in an identifier or a plain string literal; a name split across a template literal says nothing); the native find call's kind and root values and the invoke's arguments; names under a type; a rewrite of an SDK export, a global or a provider binding made outside the provider module (another module's code, a test's spy); which host registers which registration.
- Residuals, each named and pinned by a quiet row (the residual table below). R-DROPPED-RESOLUTION: both registrations serialize with the SDK's `resultToJson`, which keeps no pinned-view resolution, so a result that carried one would reach the output without its source basis; QUIET-DROPPED-RESOLUTION pins it at run time over the injected registration (equal outputs with and without the resolution), with the parser over the provider's code (no revision or resolved-commit token) and with the binder (both serializer calls resolve to the SDK import). R-RUNTIME-REWRITE: a run-time rewrite of what a resolved binding holds leaves every parser and binder reading unchanged; QUIET-RUNTIME-REWRITE pins the provider module's code to no write in the read forms (assignment, update, delete, for-in or for-of target, or a call naming a landed MUTATORS member, const aliases followed), and any other rewrite form inside the module is a member of this family it does not read.
- Frozen shape (standing rule 16): one row pins REQUEST:4, ENVELOPE:3, BINDING:1, PROJECTION:1, MEASURED:3, the two residual families, the four anchor rows and the record's 54 leaves. Outside anchors: this entry's census line, its layout and its five tables below, which the census reads row by row; every row of the census states its exact assertion count, held by the Judged pins and Shape rows tables.
- Red first: the cut's new pins, written into the cut-2 census before their readers existed (13:45Z), gave 5 failed | 12 passed (17): SB2c, QUIET-DROPPED-RESOLUTION, FROZEN-SHAPE, ANCHOR-RECEIPT and the registration row. The final census before this entry existed (the receipt as cut 2 left it) gives 3 failed | 16 passed (19): ANCHOR-RECEIPT and ANCHOR-RECORD (no cut-3 heading yet) and the registration row; every case, FROZEN-SHAPE and TILING are green on the real provider. Against each of refusal #2's survivors applied alone (the archive's mutants 01-08, on a replay tree of the entry commit carrying the cut-3 census and this receipt; L10 ported to this entry's Surface item): L01 reds SB2c, SB7, QUIET-RUNTIME-REWRITE (its witnesses' anchor moved) and the registration row, 4 failed; L02 reds SB2c, QUIET-DROPPED-RESOLUTION, SB7 and the registration row, 4; L04 reds SB1c, SB7 and the registration row, 3; L06, L07 and L08 each red ANCHOR-RECORD and the registration row, 2; L10 reds ANCHOR-RECEIPT and the registration row, 2; L12 reds SB2a and SB2b (their envelope pins), QUIET-DROPPED-RESOLUTION and the registration row, 4. The cut-2 census and receipt under the same eight stay 17 of 17 green each, as the gate measured.
- CT battery (v2), each member applied alone on the replay tree (never the seat checkout), the census run there and the tree restored: CT1 red=4; CT1b red=4; CT2 red=2; CT3 red=3; CT4 red=4; CT5 red=3; CT6 red=3. CT1 takes SB1b out of the REQUEST row, CT1b SB5 out of the MEASURED row, CT2 shortens the REQUEST claim, CT3 swaps the ENVELOPE pin SB2b for SB4, and CT4 deletes the PROJECTION row and its case SB3. CT5 deletes that row and case and takes PROJECTION:1 out of the frozen-shape literal, and CT6 takes SB2b out of its case, its row's pins and the frozen-shape count together. Both are killed by this entry's Claims, Judged pins and Shape rows tables (ANCHOR-RECEIPT, outside the census), and TILING's exact assertion count reds beside them. The unplanted control reads 19 of 19.
- Mutants beyond the battery, on the same replay tree, each alone, as failed rows (each run also reds the registration row unless the file fails to load). Refusal #2's kills stay red: L03 (SB2c, QUIET-DROPPED-RESOLUTION, SB7), L05 (SB1a), L09 (SB5, ANCHOR-RECORD); its NOT CLAIMED boundary probe L11 stays 19 of 19 green, as that sentence scopes it. Refusal #1's plants stay red, 11 of 11 (failed rows counted with the registration row): G1 6, G2 5, G3 3, G4 5, G5 4, G6 2, G7 2, G8 and G9 (ported to this entry's headings) 2 each, G10 2, G11 2. Seat probes on the provider, 20 of 20 red: a module-level reassignment of `nativeHyperUnixFind` (QUIET-RUNTIME-REWRITE); `Object.defineProperty` of `Bounds.create` (SB1a, QUIET-RUNTIME-REWRITE); the same call through a const alias on `JSON.stringify`, guarded so it never executes (QUIET-RUNTIME-REWRITE) and unguarded (the file fails to load, `JSON.stringify` patched); a computed-key relay in the native return (SB2c); a block-level function shadowing `resultToJson` (SB2c, QUIET-DROPPED-RESOLUTION, SB7); an export re-route (SB2c, SB7, QUIET-RUNTIME-REWRITE); a second, unexported `nativeHyperUnixFind` (the file fails to load: a duplicate top-level declaration is an early error of an ES module); an aliased SDK import (10 rows); a `JSON` shadow (SB2c, SB7); `resultToJson` imported from a relay module, present (SB1c, SB1d, SB2c, QUIET-DROPPED-RESOLUTION, SB7) and absent (the file fails to load); a spread after invoke and a second register statement (SB2c, SB7 each); a delete of `Bounds.create` (7 rows); a for-of target write and an update expression (QUIET-RUNTIME-REWRITE each); a block-level shadow of `kind` before the native find (SB1c, SB7); and two injected relays of the resolution, encoded into `runtime.version` (QUIET-DROPPED-RESOLUTION) and inside `source.extensions` (SB2a, SB2b, QUIET-DROPPED-RESOLUTION). On the census's own new readers, 7 of 7 red: the resolution made constant (SB1c, SB1d, SB2c, QUIET-DROPPED-RESOLUTION, SB7), value names never read (SB1c, SB1d, SB2c, SB7), the write reader emptied (QUIET-RUNTIME-REWRITE), every entry item read as text (ANCHOR-RECEIPT), the record's leaves emptied (FROZEN-SHAPE, ANCHOR-RECORD), the module declarations made constant (SB7) and the serializer reading made constant (QUIET-DROPPED-RESOLUTION).
- Green: 19 of 19.
- Record command: `node qa/workbench/hx-source-basis-probe.mjs --write qa/workbench/receipts/wb-lri-hx-source-basis-probe.json` (2026-11-11). The record is tied to the probe by its SHA-256 (SB6) and to this receipt leaf for leaf (ANCHOR-RECORD), so an edit to the probe reds SB6 and a regenerated record (its `utc` at least) reds ANCHOR-RECORD until this table is re-cut with it.
- Display paths added: none.

### Claims, wb-lri cut 3

| Row | Claim |
| --- | --- |
| REQUEST | the injected registration's request carries no view at run time, with a root and without one; read with the TypeScript parser and binder, both find calls pass exactly the five request members with a bounds member spelled Bounds.create of the record's wall, nativeHyperUnixFind opens its workspace with the realpath root alone, the names those calls read resolve to the SDK and node:fs imports and the function's own parameters and consts, and no code token names a view |
| ENVELOPE | the injected registration's output carries exactly the contract, source, workspace root and runtime members, the runtime's view identity verbatim and no member naming a revision or a basis; read with the TypeScript parser and binder, nativeHyperUnixFind returns exactly those four members, its source being the SDK's resultToJson of its own find result, and registerNativeHyperUnixFind's one register call's invoke calls the module's nativeHyperUnixFind |
| BINDING | read with the TypeScript binder, every name the two native function bodies read resolves as this census's name tables pin, nativeHyperUnixFind's own declarations and parameters are exactly the pinned ones, and both registration names are each declared once, by an exported function, in a module with no export declaration or export assignment |
| PROJECTION | hyperunixTopology over the injected registration's outputs states no subjectBasis, sourceRevision or definitionDigest, whatever view the runtime printed |
| MEASURED | the committed record, tied to its probe and anchored leaf for leaf in the receipt, measured the live view without a pinned-view resolution and the pinned request refused under HX-VIEW-013 |

### Judged pins, wb-lri cut 3

| Row | Pin | Assertions |
| --- | --- | --- |
| REQUEST | SB1a | 9 |
| REQUEST | SB1b | 3 |
| REQUEST | SB1c | 18 |
| REQUEST | SB1d | 12 |
| ENVELOPE | SB2a | 7 |
| ENVELOPE | SB2b | 3 |
| ENVELOPE | SB2c | 21 |
| BINDING | SB7 | 10 |
| PROJECTION | SB3 | 9 |
| MEASURED | SB4 | 10 |
| MEASURED | SB5 | 11 |
| MEASURED | SB6 | 10 |
| ENVELOPE | QUIET-DROPPED-RESOLUTION | 11 |
| BINDING | QUIET-RUNTIME-REWRITE | 5 |

### Residuals, wb-lri cut 3

| Residual | Quiet row |
| --- | --- |
| R-DROPPED-RESOLUTION | QUIET-DROPPED-RESOLUTION |
| R-RUNTIME-REWRITE | QUIET-RUNTIME-REWRITE |

### Shape rows, wb-lri cut 3

| Row | Assertions |
| --- | --- |
| FROZEN-SHAPE | 4 |
| TILING | 30 |
| ANCHOR-RECEIPT | 11 |
| ANCHOR-RECORD | 2 |
| REGISTRATION | 3 |

### Measured record, wb-lri cut 3

| Field | Value |
| --- | --- |
| schema | "wb-lri.hx-source-basis-probe/1" |
| bead | "wb-lri" |
| utc | "2026-11-11T05:36:44.126Z" |
| probe.script | "qa/workbench/hx-source-basis-probe.mjs" |
| probe.scriptSha256 | "af09e069e0b56b0d793286b536df32ad4f8375c509a5224b2ee934affc8f41c9" |
| producer.name | "hx" |
| producer.version | "0.1.0" |
| producer.binarySha256 | "50b17a4b4c2ac5bc1f7a1cbf12652ff00271ac89726f025bf5184b82a3eebc90" |
| producer.binaryOrigin | "path" |
| producer.hxsVersion | "1.0" |
| producer.protocol | "hxs/1.0" |
| producer.sdk.name | "@hyperunix/sdk" |
| producer.sdk.version | "0.1.0" |
| repository.files | ["src/a.txt","src/b.txt"] |
| repository.baseRevision | "04eeeaaf6cfb1db030ac3b1362e589c050d81f2a" |
| request.kind | "hx.fs/regular-file" |
| request.root | "src" |
| request.bestEffort | true |
| request.wall | "30s" |
| request.timeoutMs | 60000 |
| legs.provider-live.id | "provider-live" |
| legs.provider-live.requestedView | null |
| legs.provider-live.outcome | "result" |
| legs.provider-live.exitCode | 0 |
| legs.provider-live.terminal | "complete" |
| legs.provider-live.statusKind | "complete" |
| legs.provider-live.diagnostics.0.code | "HX-COVERAGE-INCOMPLETE" |
| legs.provider-live.diagnostics.0.severity | "warning" |
| legs.provider-live.diagnostics.0.reason | null |
| legs.provider-live.diagnostics.0.requirements | [] |
| legs.provider-live.view | "hx.view/workspace-head" |
| legs.provider-live.revision | null |
| legs.provider-live.revisionMember | true |
| legs.provider-live.resultJsonKeys | ["representation","operation","rows","rows_retained","coverage","status","execution_status","diagnostics","view","cost","transport","workspace_root","terminal","truth","coverage_summary","evidence","digest","digest_source","local_digest","structural_digest","execution_id","budget_dimension","extensions"] |
| legs.provider-live.queryDigest | null |
| legs.provider-live.digestSource | "absent" |
| legs.provider-live.licensesAbsence | false |
| legs.provider-live.completeness | "unknown" |
| legs.provider-live.rows | 3 |
| legs.provider-live.frames | 18 |
| legs.provider-pinned.id | "provider-pinned" |
| legs.provider-pinned.requestedView | "git:04eeeaaf6cfb1db030ac3b1362e589c050d81f2a" |
| legs.provider-pinned.outcome | "process-failure" |
| legs.provider-pinned.errorCode | "SDK_PROCESS_FAILED" |
| legs.provider-pinned.exitCode | 2 |
| legs.provider-pinned.terminal | "usage_refused" |
| legs.provider-pinned.diagnostics.0.code | "HX-CLI-USAGE-ERROR" |
| legs.provider-pinned.diagnostics.0.severity | "fatal" |
| legs.provider-pinned.diagnostics.0.reason | "view-binding-pending: hx find under --view git:04eeeaaf6cfb1db030ac3b1362e589c050d81f2a" |
| legs.provider-pinned.diagnostics.0.requirements | ["HX-VIEW-003","HX-VIEW-008","HX-VIEW-013"] |
| legs.provider-pinned.view | null |
| legs.provider-pinned.revision | null |
| legs.provider-pinned.rows | null |
| legs.provider-pinned.frames | 0 |
